import { createRequire } from 'module';
const require = createRequire('/opt/npm-tools/node_modules/');
const { chromium } = require('playwright');
const URL='http://localhost:4173/';
const browser = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
let fails=0;
const check=(name,got,want)=>{const ok=got===want;if(!ok)fails++;console.log(ok?'PASS':'FAIL',name,'got',got,'want',want);};

// read the servings dropdown on step 1 (the select whose options are 2..14)
async function servings(page){
  return await page.evaluate(()=>{
    const sel=[...document.querySelectorAll('select')].find(s=>[...s.options].map(o=>o.value).join()==='2,3,4,5,6,7,8,9,10,11,12,13,14');
    return sel?sel.value:null;
  });
}
async function setServings(page,v){
  await page.evaluate((v)=>{
    const sel=[...document.querySelectorAll('select')].find(s=>[...s.options].map(o=>o.value).join()==='2,3,4,5,6,7,8,9,10,11,12,13,14');
    const setter=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set;
    setter.call(sel,String(v));sel.dispatchEvent(new Event('change',{bubbles:true}));
  },v);
  await page.waitForTimeout(300);
}

// Test 1: every serving size 2..14 survives 3 reloads
for (const v of [2,3,4,5,6,13,14]) {
  const ctx=await browser.newContext(); const page=await ctx.newPage();
  await page.goto(URL); await page.waitForTimeout(800);
  check(`fresh default (v=${v} run)`, await servings(page), '6');
  await setServings(page,v);
  check(`set ${v}`, await servings(page), String(v));
  for (let i=1;i<=3;i++){ await page.reload(); await page.waitForTimeout(800); check(`${v} after reload ${i}`, await servings(page), String(v)); }
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('meal-planner-v3')));
  check(`saved _v for ${v}`, saved._v, 9);
  await ctx.close();
}

// Test 2: wife's exact scenario - legacy save with NO _v and defaultPortion 5
{
  const ctx=await browser.newContext(); const page=await ctx.newPage();
  await page.goto(URL); await page.waitForTimeout(800);
  await page.evaluate(()=>{const d=JSON.parse(localStorage.getItem('meal-planner-v3'));delete d._v;d.defaultPortion=5;d.portions={"1":4};localStorage.setItem('meal-planner-v3',JSON.stringify(d));});
  for (let i=1;i<=3;i++){ await page.reload(); await page.waitForTimeout(800); check(`legacy unversioned 5, reload ${i}`, await servings(page), '5'); }
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('meal-planner-v3')));
  check('per-meal override 4 untouched', saved.portions["1"], 4);
  await ctx.close();
}

// Test 3: genuine old lbs-era save (_v 6, 3 lbs) still converts to 8 servings once
{
  const ctx=await browser.newContext(); const page=await ctx.newPage();
  await page.goto(URL); await page.waitForTimeout(800);
  await page.evaluate(()=>{const d=JSON.parse(localStorage.getItem('meal-planner-v3'));d._v=6;d.defaultPortion=3;localStorage.setItem('meal-planner-v3',JSON.stringify(d));});
  await page.reload(); await page.waitForTimeout(800);
  check('old lbs save 3 lbs -> 8', await servings(page), '8');
  await page.reload(); await page.waitForTimeout(800);
  check('and stays 8 afterwards', await servings(page), '8');
  await ctx.close();
}
await browser.close();
console.log(fails?`\n${fails} FAILED`:'\nALL PASSED');
process.exit(fails?1:0);
