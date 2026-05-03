import { useState, useEffect, useRef } from "react";

// ============ MEAL POOL (60 meals) ============
const MEALS = [
  { id: 1, name: "Lemon Garlic Chicken, Rice & Broccoli", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF4B", tags: ["chicken", "rice"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"lemon",qty:"2",aisle:"Produce"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"broccoli",qty:"2 heads",aisle:"Produce"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"salt",qty:"to taste",aisle:"Pantry"},{item:"black pepper",qty:"to taste",aisle:"Pantry"}], steps:["Start the rice first since it takes the longest. Cook per package (usually 1 cup rice + 2 cups water, simmer 18 min). Set a timer. While the rice cooks, move on to the next step right away — they'll finish around the same time.","While rice cooks, pat chicken dry with paper towels. Season both sides generously with 1 tsp salt, 1/2 tsp black pepper, 1 tsp garlic powder.","Heat 3 tbsp olive oil in a large skillet over medium-high heat until shimmering (2 min). Rice should have ~13 min left.","Add chicken, don't move it. Cook 6-7 min per side until deep golden brown and internal temp hits 165F (12-14 min total). When you flip, start the broccoli (next step).","With about 5 min left on the rice, steam broccoli in a covered pot with 1 inch water, 5 min until bright green and tender-crisp. By now rice is nearly done.","Once chicken is done, transfer to a plate. Reduce skillet heat to medium. Add 4 tbsp butter and minced garlic, stir 1 min until fragrant (don't let garlic brown).","Squeeze juice of 2 lemons into pan, scrape up browned bits with a wooden spoon. Rice timer should beep right around now.","Return chicken to pan, spoon sauce over top. Fluff rice with a fork, drain broccoli. Plate everything together."], baby:"Shred small pieces of chicken, soft broccoli florets, rice bits." },
  { id: 2, name: "Beef Veggie Stir-Fry & Rice", time: "25 min", protein: "3 lbs sirloin strips", emoji: "\uD83E\uDD69", tags: ["beef", "rice"], ingredients: [{item:"sirloin steak strips",qty:"3 lbs",aisle:"Proteins"},{item:"bell peppers",qty:"3",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"cornstarch",qty:"2 tbsp",aisle:"Pantry"}], steps:["Start rice first (1 cup rice + 2 cups water, simmer 18 min). Set a timer. While the rice cooks, move on to the next step right away — they'll finish around the same time.","While rice cooks, slice bell peppers into thin strips, cut broccoli into small florets, peel and slice carrots thin on a diagonal. Aim to finish prep in 5-7 min.","In a bowl, toss beef strips with 2 tbsp cornstarch, 2 tbsp soy sauce, and a pinch of salt until coated. Let sit while pan heats — this is your marinade.","Heat 2 tbsp sesame oil in a large skillet or wok over high heat until just starting to smoke (about 2 min). Rice has ~10 min left.","Add beef in a single layer (don't crowd — do in 2 batches if needed). Sear 2-3 min undisturbed, then stir 1 min until browned. Remove to a plate.","Add vegetables to the same pan. Stir-fry 4-5 min until peppers soften but still have crunch.","Add minced garlic, cook 30 seconds until fragrant. Return beef to pan. Rice should be done by now — fluff with a fork.","Pour in remaining 6 tbsp soy sauce, toss everything 1-2 min until glossy. Serve over rice."], baby:"Soft-cooked carrots and rice, tiny beef pieces." },
  { id: 3, name: "Turkey Taco Bowls", time: "20 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF2E", tags: ["turkey", "rice"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"corn",qty:"1 bag",aisle:"Frozen"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"}], steps:["Start rice first (2 cups rice + 4 cups water, 18 min). Set a timer.","While rice cooks, dice bell peppers small. Rinse and drain black beans. Open the corn bag.","Heat a large skillet over medium-high heat, add turkey. Break up with a wooden spoon and cook 8 min until no pink remains, stirring occasionally. Rice has ~10 min left.","Sprinkle 2 packets taco seasoning over turkey, add 1/2 cup water. Simmer on medium-low 5 min until thickened, stirring to coat.","While turkey simmers: heat beans in a small saucepan over low 3-4 min. Microwave corn per bag (3-4 min). Rice timer should beep around now.","Fluff rice with a fork. Warm bowls if you want — layer rice on bottom, then turkey, beans, peppers, corn.","Top with shredded cheese (residual heat melts it) and a dollop of sour cream. Salt to taste."], baby:"Plain rice with shredded cheese and soft black beans." },
  { id: 4, name: "One-Pot Chicken Pasta with Spinach", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF5D", tags: ["chicken", "pasta"], ingredients: [{item:"chicken thighs (boneless)",qty:"3 lbs",aisle:"Proteins"},{item:"penne pasta",qty:"1 lb",aisle:"Grains"},{item:"spinach",qty:"6 oz bag",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"chicken broth",qty:"4 cups",aisle:"Canned"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"heavy cream",qty:"1 cup",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cut chicken thighs into 1-inch cubes. Season with 1 tsp salt and 1/2 tsp black pepper. (One-pot meal — no parallel cooking needed.)","Heat 2 tbsp olive oil in a large Dutch oven or deep pot over medium-high heat.","Add chicken in a single layer, cook 5-6 min stirring occasionally until golden on all sides.","Add minced garlic, cook 30 seconds until fragrant.","Pour in broth and heavy cream, stir to combine. Add pasta, pushing it down into the liquid.","Bring to a gentle boil, then reduce to medium-low. Cover and simmer 12 min, stirring every few minutes so pasta doesn't stick. (Use this time to set the table.)","While that simmers, test pasta — it should be al dente. Stir in spinach handful by handful until wilted (1-2 min).","Turn off heat, stir in parmesan. Let sit 2 min to thicken — sauce coats pasta as it rests. Salt to taste."], baby:"Plain pasta pieces with a little cream sauce." },
  { id: 5, name: "Sheet Pan Steak & Sweet Potato Fries", time: "30 min", protein: "3 lbs steak", emoji: "\uD83E\uDD69", tags: ["steak", "potato"], ingredients: [{item:"steak (sirloin or strip)",qty:"3 lbs",aisle:"Proteins"},{item:"sweet potatoes",qty:"4 large",aisle:"Produce"},{item:"green beans",qty:"1 lb",aisle:"Produce"},{item:"olive oil",qty:"4 tbsp",aisle:"Pantry"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"paprika",qty:"2 tsp",aisle:"Pantry"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"}], steps:["Preheat oven to 425F. Line a large sheet pan with parchment or foil. (Total time ~30 min, mostly hands-off.). The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Cut sweet potatoes into 1/2-inch fries. Toss in a bowl with 2 tbsp olive oil, 1 tsp paprika, 1 tsp garlic powder, 1 tsp salt.","Spread fries on sheet pan in a single layer (don't overcrowd). Bake 15 min — they get a head start since they take longer than steak.","While fries bake, pat steak dry and season both sides with 1 tsp salt, 1/2 tsp pepper, 1 tsp garlic powder. Trim green beans.","After 15 min, pull sheet pan out. Push fries to one side, add green beans tossed with remaining oil to the pan, and place steak on the other side.","Return to oven for 10-12 min (medium-rare: 130F internal; medium: 140F). Use this time to plate or set the table.","Remove steak to a cutting board, top with 2 tbsp butter, tent loosely with foil and rest 5 min — critical for juicy steak.","Slice steak against the grain into thin strips. Serve with fries and green beans straight from the pan."], baby:"Soft sweet potato pieces, tiny steak bits." },
  { id: 6, name: "Chicken & Black Bean Burritos", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF2F", tags: ["chicken", "tortilla"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"taco seasoning",qty:"1 packet",aisle:"Pantry"},{item:"salsa",qty:"1 jar",aisle:"Canned"}], steps:["Start rice first (1 cup rice + 2 cups water, 18 min). Set a timer.","While rice cooks, dice chicken into 1/2-inch cubes. Toss with taco seasoning and 2 tbsp water in a bowl until coated.","Heat 2 tbsp olive oil in a large skillet over medium-high heat. Add chicken, spread in a single layer. Rice has ~12 min left.","Cook chicken 8 min, stirring every 2 min, until cooked through and slightly browned (165F internal).","While chicken cooks, dice bell peppers and drain the beans. Add both to the chicken pan once chicken is done. Cook 3-4 min until peppers soften slightly.","By now rice should be done — fluff with a fork. Warm tortillas in microwave (wrap stack in damp paper towel, 30 sec) or dry skillet 15 sec per side.","Assemble: lay tortilla flat, add 1/3 cup rice, 1/2 cup chicken mix, cheese, salsa down the center.","Fold sides in, then roll tightly from the bottom. Optional: toast seam-side down in dry skillet 1 min for crispy finish."], baby:"Rice, shredded cheese, soft black beans on the side." },
  { id: 7, name: "Ground Beef & Potato Skillet", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83E\uDD54", tags: ["beef", "potato"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"yukon potatoes",qty:"6",aisle:"Produce"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"shredded cheese",qty:"1.5 cups",aisle:"Dairy"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"paprika",qty:"2 tsp",aisle:"Pantry"}], steps:["Dice potatoes into 1/2-inch cubes (smaller = faster cooking). One-pan meal — everything goes in the same skillet sequentially.","Heat 3 tbsp olive oil in a large cast iron or nonstick skillet over medium heat.","Add potatoes, sprinkle with 1 tsp salt. Cover and cook 12 min, stirring every 3 min, until fork-tender and golden. While they cook, dice the bell peppers so they're ready.","Push potatoes to one side of pan. Add beef to the empty side, break up and cook 6-8 min over medium-high until browned.","Drain excess fat if needed. (Peppers should already be diced from step 3.)","Add peppers and minced garlic to the pan. Stir everything together, cook 3 min until peppers soften.","Season with 2 tsp paprika, 1/2 tsp salt, 1/4 tsp pepper. Stir to coat.","Top with shredded cheese, cover with lid 2 min until cheese melts. Serve straight from skillet."], baby:"Soft potato pieces, tiny crumbles of beef." },
  { id: 8, name: "Turkey Meatball Pasta", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF5D", tags: ["turkey", "pasta"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"spaghetti",qty:"1 lb",aisle:"Grains"},{item:"marinara sauce",qty:"2 jars",aisle:"Canned"},{item:"breadcrumbs",qty:"1 cup",aisle:"Grains"},{item:"eggs",qty:"2",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["In a large bowl, combine turkey, breadcrumbs, 2 lightly beaten eggs, 1/2 cup parmesan, 2 tsp garlic powder, 1 tsp salt, 1/2 tsp pepper. Mix gently with hands just until combined (don't overmix or meatballs get tough).","Roll into ~20 golf-ball-sized meatballs, place on a plate.","Heat 2 tbsp olive oil in a large deep skillet over medium-high heat. Also: start a pot of heavily salted water boiling for the pasta — you'll add it later.","Add meatballs, don't crowd. Cook 2 min per side (about 8 min total) to brown on all sides — they won't be cooked through yet.","Pour marinara sauce into the skillet, reduce heat to medium-low. Cover and simmer 10 min, gently turning meatballs halfway, until cooked through (165F internal).","While meatballs simmer, drop pasta into boiling water and cook per package (usually 9-11 min for al dente). Both finish around the same time.","While that simmers, drain pasta, reserving 1/2 cup pasta water in case you need to loosen the sauce.","Toss pasta with a ladle of sauce, plate with meatballs on top, extra sauce, and remaining parmesan."], baby:"Cut meatball into tiny pieces, short pasta with a little sauce." },
  { id: 9, name: "Egg Fried Rice & Veggies", time: "20 min", protein: "12 eggs", emoji: "\uD83C\uDF5B", tags: ["eggs", "rice"], ingredients: [{item:"eggs",qty:"12",aisle:"Dairy"},{item:"white rice",qty:"3 cups dry",aisle:"Grains"},{item:"frozen peas and carrots",qty:"2 cups",aisle:"Frozen"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Cook rice per package and spread on a sheet pan to cool (or use day-old rice — fresh rice is too sticky). Cool 10 min in the freezer for fastest results, or use leftover rice for instant start.","While rice cools (or right away if using leftover), crack all eggs into a bowl, whisk with a pinch of salt.","Heat a large nonstick skillet or wok over medium-high heat, add 1 tbsp butter.","Pour in eggs, stir gently 2-3 min until just set but still slightly glossy. Transfer to a plate.","Add 2 tbsp butter to pan, then minced garlic and frozen peas/carrots (no need to thaw). Cook 4 min until carrots are tender.","Add rice to pan, breaking up clumps with a spatula. Press down and let sit 1 min to get slightly crispy, then stir. Repeat 2-3 times (3 min total).","Pour soy sauce and sesame oil around edges of pan, toss to coat evenly.","Fold in scrambled eggs. Taste and add more soy if needed."], baby:"Plain scrambled egg pieces and soft rice." },
  { id: 10, name: "Chicken Veggie Quesadillas + Sweet Potato", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDDC0", tags: ["chicken", "tortilla"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"spinach",qty:"4 oz",aisle:"Produce"},{item:"sweet potatoes",qty:"3 large",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"taco seasoning",qty:"1 packet",aisle:"Pantry"}], steps:["Preheat oven to 425F. Cut sweet potatoes into 1-inch wedges, toss with 2 tbsp olive oil, 1 tsp salt, 1 tsp garlic powder. Spread on a sheet pan. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Bake sweet potatoes 20 min, flipping halfway. They run on autopilot while you make quesadillas.","While sweet potatoes bake, dice chicken into 1/2-inch cubes. Toss with taco seasoning and 2 tbsp water in a bowl.","Heat 1 tbsp olive oil in a large skillet over medium-high heat. Cook chicken 8 min, stirring every 2 min, until cooked through (165F internal).","Dice bell peppers (do this while chicken is searing). Add peppers and spinach to chicken pan. Cook 3 min until peppers soften and spinach wilts.","Assemble each quesadilla: tortilla, layer of cheese, chicken mix, another layer of cheese, top tortilla.","Wipe skillet, heat over medium. Cook quesadilla 2-3 min per side until golden brown and cheese is melted. Press down with spatula for even contact. (Sweet potatoes should be done around now.)","Rest quesadilla 1 min on cutting board, then slice into wedges with a pizza cutter. Serve with sweet potato wedges."], baby:"Soft sweet potato mashed, small cheese and chicken bits." },
  { id: 11, name: "Garlic Butter Chicken & Mashed Potatoes", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDDC8", tags: ["chicken", "potato"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"yukon potatoes",qty:"9",aisle:"Produce"},{item:"butter",qty:"1 stick",aisle:"Dairy"},{item:"milk",qty:"1/2 cup",aisle:"Dairy"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"green beans",qty:"1 lb",aisle:"Produce"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"},{item:"parsley",qty:"small bunch",aisle:"Produce"}], steps:["Peel and quarter potatoes. Place in a large pot, cover with cold water and 1 tbsp salt. Bring to a boil, then simmer 15-18 min until fork-tender. While potatoes boil, move on to the next step.","Meanwhile, pat chicken dry and season both sides with 1 tsp salt, 1/2 tsp pepper, 1 tsp garlic powder.","Heat 2 tbsp olive oil in a large skillet over medium-high heat until shimmering.","Add chicken, cook 6-7 min per side until deep golden brown and 165F internal. Transfer to a plate.","Trim green beans and steam in a covered pot with 1 inch water, 5 min until tender-crisp.","Drain potatoes, return to pot. Add 6 tbsp butter, 1/2 cup milk, 1 tsp salt. Mash with a potato masher until smooth but with some texture.","In the chicken pan, reduce heat to medium-low, add 2 tbsp butter and minced garlic. Stir 1 min until fragrant (don't let garlic brown).","Pour garlic butter over chicken, top with chopped parsley. Serve with mashed potatoes and green beans."], baby:"Mashed potato with no seasoning, soft green beans." },
  { id: 12, name: "Beef & Rice Taco Skillet", time: "25 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF36", tags: ["beef", "rice"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"diced tomatoes",qty:"2 cans",aisle:"Canned"},{item:"black beans",qty:"1 can",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"bell peppers",qty:"1",aisle:"Produce"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"}], steps:["Heat a large deep skillet over medium-high heat. Add beef, break up with wooden spoon.","Cook 8 min until browned, stirring to crumble. Drain excess fat.","Sprinkle taco seasoning over beef, add diced tomatoes with juice, drained beans, uncooked rice, and 2 cups water. Stir to combine.","Bring to a boil, then reduce heat to low. Cover and simmer 18 min without stirring (this cooks the rice evenly).","Dice bell pepper while it cooks.","Remove lid, add bell pepper, stir gently. Cover 3 more min.","Top with shredded cheese in an even layer, cover 2 min until cheese melts.","Serve with a dollop of sour cream. Salt to taste."], baby:"Scoop rice and beans with a little cheese." },
  { id: 13, name: "Chicken Alfredo Pasta", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF5D", tags: ["chicken", "pasta"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"fettuccine",qty:"1 lb",aisle:"Grains"},{item:"heavy cream",qty:"2 cups",aisle:"Dairy"},{item:"parmesan",qty:"2 cups",aisle:"Dairy"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Bring a large pot of heavily salted water to a boil. Cook pasta per package (usually 10-11 min for al dente). Reserve 1 cup pasta water before draining. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Meanwhile, slice chicken horizontally into thinner cutlets if thick. Season with 1 tsp salt, 1/2 tsp pepper, 1 tsp garlic powder.","Heat 2 tbsp olive oil in a large skillet over medium-high heat. Cook chicken 6 min per side until golden brown and 165F internal.","Transfer chicken to a cutting board, rest 5 min, then slice into strips.","Steam broccoli florets in a covered pot with 1 inch water, 5 min until tender-crisp.","In the chicken pan over medium heat, melt 4 tbsp butter. Add minced garlic, stir 1 min.","Pour in heavy cream and whisk. Simmer 2 min, then whisk in parmesan until smooth. Add pasta water as needed for creamy consistency.","Toss pasta and broccoli in sauce. Plate, top with sliced chicken and more parmesan."], baby:"Plain pasta pieces with a little sauce, soft broccoli." },
  { id: 14, name: "Turkey Stuffed Peppers", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF36", tags: ["turkey", "rice"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"bell peppers",qty:"8 large",aisle:"Produce"},{item:"white rice",qty:"1.5 cups",aisle:"Grains"},{item:"diced tomatoes",qty:"1 can",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Preheat oven to 400F. Cook rice per package (3/4 cup rice + 1.5 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Halve bell peppers lengthwise, remove stems and seeds. Place cut-side up in a baking dish.","Heat 2 tbsp olive oil in a large skillet over medium-high heat. Add turkey and minced garlic. Cook 8 min, breaking up with spoon, until no pink remains.","Season with italian seasoning, 1 tsp salt, 1/2 tsp pepper.","In a large bowl, combine cooked rice, turkey, drained diced tomatoes, and 1 cup of the cheese.","Spoon filling into pepper halves, mounding slightly. Top with remaining cheese.","Cover dish with foil, bake 18 min.","Uncover, bake 5 more min until cheese is bubbly and slightly golden. Let rest 3 min before serving."], baby:"Scoop filling, mash pepper piece, small cheese bits." },
  { id: 15, name: "Steak Fajita Bowls", time: "25 min", protein: "3 lbs steak", emoji: "\uD83C\uDF2F", tags: ["steak", "rice"], ingredients: [{item:"flank or skirt steak",qty:"3 lbs",aisle:"Proteins"},{item:"bell peppers",qty:"3",aisle:"Produce"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"black beans",qty:"1 can",aisle:"Canned"},{item:"lime",qty:"2",aisle:"Produce"},{item:"fajita seasoning",qty:"2 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"shredded cheese",qty:"1 cup",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"}], steps:["Cook rice per package, squeezing in juice of 1 lime and 1 tbsp olive oil while cooking for flavor.","Pat steak dry with paper towels — this is key for a good sear. Season both sides generously with fajita seasoning.","Slice bell peppers into thin strips.","Heat 2 tbsp olive oil in a large cast iron or heavy skillet over high heat until just smoking.","Add steak, don't move it. Sear 4 min, flip, sear 4 min on other side (medium-rare). Transfer to cutting board, rest 5 min.","Add 1 tbsp oil to the same pan, reduce to medium-high. Add peppers, cook 5 min until slightly charred but still crisp.","Slice steak thinly against the grain (look for the muscle fibers, cut perpendicular).","Build bowls: rice on bottom, drained beans, steak, peppers, cheese, dollop of sour cream. Squeeze second lime over top."], baby:"Rice with soft pepper pieces, tiny steak bits." },
  { id: 16, name: "Chicken Fried Rice", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF5A", tags: ["chicken", "rice"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"white rice",qty:"3 cups dry",aisle:"Grains"},{item:"eggs",qty:"4",aisle:"Dairy"},{item:"frozen peas and carrots",qty:"2 cups",aisle:"Frozen"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Cook rice per package and spread on a sheet pan to cool 10 min (day-old is even better — fresh rice gets mushy).","Dice chicken into 1/2-inch cubes. Season with 1/2 tsp salt.","Whisk eggs in a small bowl with a pinch of salt.","Heat 1 tbsp sesame oil in a large nonstick skillet or wok over medium-high heat. Add chicken, cook 6-7 min until golden and 165F. Transfer to a plate.","Add 1 tbsp butter to pan, pour in eggs. Scramble softly 2 min, set aside with chicken.","Melt remaining 2 tbsp butter, add minced garlic and frozen peas/carrots. Cook 4 min until carrots tender.","Add rice, break up clumps. Press down and let sit 1 min, stir. Repeat for 3 min total.","Pour soy sauce and remaining 1 tbsp sesame oil around pan edges. Return chicken and eggs, toss everything 1 min."], baby:"Plain rice and scrambled egg bits." },
  { id: 17, name: "Beef & Broccoli Over Rice", time: "25 min", protein: "3 lbs sirloin", emoji: "\uD83E\uDD66", tags: ["beef", "rice"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"broccoli",qty:"2 heads",aisle:"Produce"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"brown sugar",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"},{item:"cornstarch",qty:"2 tbsp",aisle:"Pantry"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Slice beef into thin strips against the grain. Toss with 2 tbsp cornstarch in a bowl until coated.","In a small bowl whisk: soy sauce, brown sugar, minced garlic, grated ginger, and 1/2 cup water.","Cut broccoli into bite-sized florets.","Heat 2 tbsp sesame oil in a large skillet or wok over high heat until just smoking.","Add beef in a single layer, sear undisturbed 2 min, then stir 1 min. Transfer to a plate.","Add broccoli to same pan, stir-fry 4 min until bright green and starting to char slightly.","Pour in sauce, return beef. Simmer 2 min until sauce thickens and coats everything glossy. Serve over rice."], baby:"Soft broccoli florets with rice." },
  { id: 18, name: "Turkey Burgers & Sweet Potato Fries", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF54", tags: ["turkey", "potato"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"burger buns",qty:"8",aisle:"Grains"},{item:"sweet potatoes",qty:"3 large",aisle:"Produce"},{item:"cheese slices",qty:"8",aisle:"Dairy"},{item:"lettuce",qty:"1 head",aisle:"Produce"},{item:"tomato",qty:"2",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"}], steps:["Preheat oven to 425F. Cut sweet potatoes into 1/2-inch fries. Toss with 3 tbsp olive oil, 1 tsp salt, 1 tsp paprika on a sheet pan. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Spread fries in a single layer (don't overcrowd or they'll steam). Bake 20 min, flipping halfway.","Meanwhile, in a large bowl combine turkey, garlic powder, 1 tsp salt, 1/2 tsp pepper. Mix gently (don't overwork).","Form into 6-8 patties, about 3/4-inch thick. Press a thumbprint in the center of each (prevents puffing).","Heat a large skillet over medium-high heat with 1 tbsp olive oil. Cook burgers 5 min per side — don't press down or juices escape.","In the last minute, top each burger with a cheese slice. Cover with lid or foil to melt.","Toast buns cut-side down in a dry skillet or toaster, 1-2 min until golden.","Assemble: bottom bun, lettuce leaf, burger with cheese, tomato slice, top bun. Serve with fries."], baby:"Soft sweet potato piece, crumbled plain burger." },
  { id: 19, name: "Chicken Tortilla Soup Bowls", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF5C", tags: ["chicken", "tortilla"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"chicken broth",qty:"6 cups",aisle:"Canned"},{item:"diced tomatoes",qty:"2 cans",aisle:"Canned"},{item:"black beans",qty:"1 can",aisle:"Canned"},{item:"corn",qty:"1 bag",aisle:"Frozen"},{item:"tortilla chips",qty:"1 bag",aisle:"Grains"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"taco seasoning",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"}], steps:["Dice chicken into 1/2-inch cubes.","Heat 2 tbsp olive oil in a large pot or Dutch oven over medium-high heat.","Add chicken and minced garlic. Cook 6 min, stirring, until chicken turns golden on the outside.","Pour in chicken broth, diced tomatoes with juice, drained beans, frozen corn (no need to thaw), and taco seasoning. Stir well.","Bring to a boil, then reduce to low. Simmer uncovered 15 min to let flavors meld and soup slightly reduce.","While that simmers, taste and adjust salt (taco seasoning varies).","Crush a handful of tortilla chips into the bottom of each bowl. Ladle hot soup over chips.","Top with shredded cheese, dollop of sour cream, and more crushed chips."], baby:"Small chicken pieces with soft beans, skip chips." },
  { id: 20, name: "Beef Pasta Skillet", time: "25 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF5D", tags: ["beef", "pasta"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"penne pasta",qty:"1 lb",aisle:"Grains"},{item:"marinara sauce",qty:"2 jars",aisle:"Canned"},{item:"shredded mozzarella",qty:"2 cups",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"},{item:"parmesan",qty:"1/2 cup",aisle:"Dairy"}], steps:["Bring a large pot of heavily salted water to a boil. Cook pasta per package (9-11 min for al dente). Reserve 1/2 cup pasta water, drain. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Meanwhile, heat 2 tbsp olive oil in a large deep skillet over medium-high heat.","Add beef and minced garlic. Break up beef with a wooden spoon, cook 8 min until browned. Drain excess fat.","Add italian seasoning, 1 tsp salt, 1/2 tsp pepper, and marinara. Bring to a simmer on medium-low.","Simmer 5 min to blend flavors.","Add cooked pasta to the skillet, toss to coat. Add a splash of pasta water if too thick.","Top evenly with shredded mozzarella. Cover with lid 2 min until cheese melts.","Sprinkle parmesan over top. Serve straight from skillet."], baby:"Plain pasta with a little sauce, skip cheese if melted." },
  { id: 21, name: "BBQ Chicken Wraps", time: "20 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF2F", tags: ["chicken", "tortilla"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"bbq sauce",qty:"1 bottle",aisle:"Pantry"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"lettuce",qty:"1 head",aisle:"Produce"},{item:"ranch dressing",qty:"1 cup",aisle:"Dairy"},{item:"corn",qty:"1 bag",aisle:"Frozen"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Dice chicken into 1/2-inch cubes. Season with 1 tsp salt, 1/2 tsp pepper, 1 tsp garlic powder.","Heat 2 tbsp olive oil in a large skillet over medium-high heat. Add chicken in a single layer.","Cook 8 min, stirring every 2 min, until cooked through (165F internal) and slightly charred.","Reduce heat to low, pour in BBQ sauce. Toss to coat, simmer 2 min until sauce thickens slightly.","Microwave corn per bag (3-4 min) or heat in a small pan.","Warm tortillas in microwave (wrap stack in damp paper towel, 30 sec) or dry skillet 15 sec per side.","Assemble wrap: tortilla, layer of cheese, shredded lettuce, BBQ chicken, corn, drizzle of ranch.","Fold sides in, roll tightly from bottom. Cut in half on a diagonal."], baby:"Plain chicken pieces and corn, no sauce." },
  { id: 22, name: "Steak & Cheese Rice Bowls", time: "25 min", protein: "3 lbs steak", emoji: "\uD83E\uDDC0", tags: ["steak", "rice"], ingredients: [{item:"flank steak",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"soy sauce",qty:"3 tbsp",aisle:"Pantry"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Slice steak into thin strips against the grain. Season with 1 tsp salt, 1/2 tsp pepper, 1 tsp garlic powder.","Slice bell peppers into thin strips.","Heat 2 tbsp olive oil in a large skillet over high heat until shimmering. Add steak in a single layer.","Sear 2-3 min without stirring, then flip and cook 1 min. Transfer to a plate.","Reduce heat to medium-high, add 1 tbsp oil. Cook peppers and minced garlic 4 min until peppers soften.","Return steak to pan, pour in soy sauce and 2 tbsp butter. Toss 1 min until glossy.","Build bowls: rice, steak/peppers, top with shredded cheese and a pat of butter to melt."], baby:"Soft rice with melted cheese, tiny steak bits." },
  { id: 23, name: "Turkey Chili with Cornbread", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF36", tags: ["turkey", "bread"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"cornbread mix",qty:"2 boxes",aisle:"Grains"},{item:"kidney beans",qty:"2 cans",aisle:"Canned"},{item:"black beans",qty:"1 can",aisle:"Canned"},{item:"diced tomatoes",qty:"2 cans",aisle:"Canned"},{item:"tomato sauce",qty:"1 can",aisle:"Canned"},{item:"chili powder",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"bell peppers",qty:"1",aisle:"Produce"}], steps:["Preheat oven per cornbread mix (usually 400F). Mix cornbread batter per box, pour into a greased 9x9 pan. Bake per package (usually 20-25 min until golden and a toothpick comes out clean). The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Meanwhile, heat 2 tbsp olive oil in a large pot or Dutch oven over medium-high heat.","Add turkey and minced garlic. Break up with a spoon, cook 8 min until no pink remains.","Dice bell pepper, add to pot and cook 3 min until starting to soften.","Add drained kidney beans, drained black beans, diced tomatoes with juice, tomato sauce, chili powder, 1 tsp salt, 1/2 tsp cumin if you have it.","Bring to a simmer, reduce heat to low. Simmer 15 min uncovered, stirring occasionally, until thickened.","While that simmers, taste and adjust salt.","Serve chili in bowls with warm cornbread on the side. Optional toppings: shredded cheese, sour cream."], baby:"Crumble cornbread, mash beans." },
  { id: 24, name: "Chicken Parmesan & Spaghetti", time: "30 min", protein: "3 lbs chicken cutlets", emoji: "\uD83C\uDF5D", tags: ["chicken", "pasta"], ingredients: [{item:"chicken cutlets",qty:"3 lbs",aisle:"Proteins"},{item:"spaghetti",qty:"1 lb",aisle:"Grains"},{item:"marinara sauce",qty:"2 jars",aisle:"Canned"},{item:"mozzarella",qty:"2 cups shredded",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"breadcrumbs",qty:"1.5 cups",aisle:"Grains"},{item:"eggs",qty:"3",aisle:"Dairy"},{item:"olive oil",qty:"1/2 cup",aisle:"Pantry"}], steps:["Preheat oven to 425F. Bring a large pot of heavily salted water to a boil for pasta. The oven takes ~7 min to preheat — start prepping while it heats up.","Set up a breading station: one bowl with 3 beaten eggs, another bowl with breadcrumbs mixed with 1/2 cup parmesan and 1 tsp garlic powder.","Pat cutlets dry, season lightly with salt and pepper.","Dip each cutlet in egg (let excess drip off), then press firmly into breadcrumbs, coating both sides.","Heat 1/4 cup olive oil in a large skillet over medium heat. Pan-fry cutlets 3 min per side until golden brown. Drain on paper towels.","Cook pasta per package (9-11 min).","Arrange cutlets on a sheet pan. Spoon marinara over each, top generously with mozzarella.","Bake 8 min until cheese is melted and bubbly. Drain pasta, toss with remaining marinara. Plate pasta with chicken on top."], baby:"Plain pasta, small crumbs of chicken (no crust)." },
  { id: 25, name: "Egg & Cheese Breakfast Burritos", time: "20 min", protein: "14 eggs", emoji: "\uD83C\uDF2F", tags: ["eggs", "tortilla"], ingredients: [{item:"eggs",qty:"14",aisle:"Dairy"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"potatoes",qty:"3",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Dice potatoes into 1/4-inch cubes (small = fast cooking).","Heat 2 tbsp olive oil in a large skillet over medium heat. Add potatoes, sprinkle with 1 tsp salt.","Cover and cook 10 min, stirring every 3 min, until fork-tender and golden.","Dice bell peppers, add to potatoes. Cook uncovered 3 min until peppers soften.","Transfer potato mixture to a plate. Reduce heat to medium-low.","Melt 3 tbsp butter in the same pan. Crack eggs in, scramble gently with a spatula 3-4 min until just set (still slightly glossy).","Warm tortillas in microwave (wrap stack in damp paper towel, 30 sec) or dry skillet 15 sec per side.","Assemble burritos: cheese on tortilla (helps glue), eggs, potato mix, salsa. Fold sides in, roll tightly from bottom."], baby:"Plain scrambled eggs with cheese." },
  { id: 26, name: "Chicken Rice Casserole", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDD58", tags: ["chicken", "rice"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"cream of chicken soup",qty:"2 cans",aisle:"Canned"},{item:"chicken broth",qty:"2 cups",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"frozen peas and carrots",qty:"2 cups",aisle:"Frozen"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Preheat oven to 375F. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Dice chicken into 1/2-inch cubes.","In a 9x13 baking dish, stir together: uncooked rice, cream of chicken soup, broth, frozen veggies (no need to thaw), chicken, garlic powder, 1 tsp salt, 1/2 tsp pepper.","Dot surface evenly with butter pieces. Cover tightly with foil.","Bake covered 25 min — don't peek (this steams the rice).","Remove foil, sprinkle cheese evenly over top. Bake 5 min uncovered until cheese melts and edges bubble.","Let rest 5 min — this lets the rice finish absorbing moisture.","Fluff gently with a fork before serving."], baby:"Soft rice with mashed veggies and chicken pieces." },
  { id: 27, name: "Ground Beef Tacos", time: "20 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF2E", tags: ["beef", "tortilla"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"taco shells",qty:"16",aisle:"Grains"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"lettuce",qty:"1 head",aisle:"Produce"},{item:"tomato",qty:"2",aisle:"Produce"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"}], steps:["Heat a large skillet over medium-high heat. Add beef, break up with wooden spoon.","Cook 8 min until browned, stirring occasionally to crumble evenly. Drain excess fat.","Sprinkle taco seasoning over beef, add 1/2 cup water. Reduce heat to medium-low, simmer 5 min until sauce thickens and coats beef.","Meanwhile, warm taco shells per package (usually 5 min in 350F oven — makes them crispier than package says).","Shred lettuce thin. Dice tomatoes into 1/4-inch cubes.","Set up a taco bar: beef, cheese, lettuce, tomato, sour cream, salsa.","Build tacos: shell, beef, cheese (put on while hot so it melts), lettuce, tomato, sour cream, salsa."], baby:"Crumbled beef with shredded cheese, soft tomato." },
  { id: 28, name: "Chicken Pesto Pasta", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF3F", tags: ["chicken", "pasta"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"penne pasta",qty:"1 lb",aisle:"Grains"},{item:"pesto",qty:"1 jar",aisle:"Canned"},{item:"cherry tomatoes",qty:"2 pints",aisle:"Produce"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"spinach",qty:"4 oz",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"}], steps:["Bring a large pot of heavily salted water to a boil. Cook pasta per package (9-11 min for al dente). Reserve 1/2 cup pasta water, drain. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Dice chicken into 1/2-inch cubes. Season with 1 tsp salt, 1/2 tsp pepper, 1 tsp garlic powder.","Heat 3 tbsp olive oil in a large skillet over medium-high heat. Add chicken in a single layer.","Cook 8 min, stirring every 2 min, until golden and 165F internal.","Halve cherry tomatoes. Add to pan with minced garlic, cook 3 min until tomatoes start to burst.","Turn heat off. Add drained pasta, pesto, and spinach to the skillet.","Toss everything together, splashing in pasta water 1 tbsp at a time until creamy (residual heat wilts the spinach).","Top with parmesan. Serve warm."], baby:"Plain pasta pieces with small chicken bits." },
  { id: 29, name: "Steak Tips, Rice & Corn", time: "25 min", protein: "3 lbs steak tips", emoji: "\uD83C\uDF3D", tags: ["steak", "rice"], ingredients: [{item:"steak tips (sirloin)",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"corn",qty:"1 bag frozen",aisle:"Frozen"},{item:"soy sauce",qty:"1/4 cup",aisle:"Pantry"},{item:"worcestershire",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Cut steak tips into 1-inch chunks if not already. In a bowl, toss with soy sauce and worcestershire. Let marinate while rice cooks (minimum 10 min).","Pat steak pieces dry (keep the marinade for later) — dry meat = better sear.","Heat 2 tbsp olive oil in a large skillet over high heat until just smoking.","Add steak tips in a single layer, don't crowd. Sear undisturbed 3 min, then toss and cook 2 more min.","Add minced garlic, toss 1 min until fragrant. Remove to a plate.","In the same pan, melt 2 tbsp butter, add frozen corn. Cook 4 min over medium heat until heated through.","Plate: rice, steak tips, corn. Drizzle pan juices over everything."], baby:"Soft corn kernels and rice, tiny steak bits." },
  { id: 30, name: "Turkey Sloppy Joes & Fries", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF5F", tags: ["turkey", "bread"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"burger buns",qty:"8",aisle:"Grains"},{item:"frozen fries",qty:"2 bags",aisle:"Frozen"},{item:"tomato sauce",qty:"1 can",aisle:"Canned"},{item:"ketchup",qty:"1/2 cup",aisle:"Pantry"},{item:"brown sugar",qty:"3 tbsp",aisle:"Pantry"},{item:"worcestershire",qty:"2 tbsp",aisle:"Pantry"},{item:"bell peppers",qty:"1",aisle:"Produce"},{item:"garlic",qty:"2 cloves",aisle:"Produce"}], steps:["Preheat oven per fries package (usually 425F). Bake fries per package instructions, flipping halfway. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Dice bell pepper into small pieces.","Heat a large skillet over medium-high heat. Add turkey, pepper, and minced garlic. Break up turkey with spoon.","Cook 8 min until turkey is no longer pink and peppers soften.","Reduce heat to medium. Add tomato sauce, ketchup, brown sugar, worcestershire, 1 tsp salt, 1/2 tsp pepper. Stir to combine.","Simmer 10 min over medium-low, stirring occasionally, until sauce thickens and clings to the meat.","While that simmers, toast buns cut-side down in a dry skillet or toaster, 1-2 min until golden.","Spoon generous portion onto bottom bun, top with other half. Serve with fries."], baby:"Soft bun pieces with a little plain turkey." },
  { id: 31, name: "Chicken Teriyaki Rice Bowls", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF5A", tags: ["chicken", "rice"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"teriyaki sauce",qty:"1 bottle",aisle:"Pantry"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"sesame seeds",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Dice chicken into 1/2-inch cubes.","Heat 2 tbsp sesame oil in a large skillet over medium-high heat.","Add chicken, spread in single layer. Cook 4 min without stirring to get golden crust, then stir and cook 4 more min until 165F internal.","Add minced garlic, stir 1 min until fragrant.","Pour in teriyaki sauce, reduce heat to medium-low. Simmer 3 min until sauce thickens and glazes chicken.","Meanwhile, cut broccoli into florets and slice carrots thin. Steam in a covered pot with 1 inch water, 5 min until tender-crisp.","Build bowls: rice, veggies, chicken with extra sauce spooned over. Top with sesame seeds."], baby:"Plain rice with soft broccoli and carrot." },
  { id: 32, name: "Beef Enchilada Bowls", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF36", tags: ["beef", "rice"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"enchilada sauce",qty:"2 cans",aisle:"Canned"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"shredded cheese",qty:"2.5 cups",aisle:"Dairy"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"taco seasoning",qty:"1 packet",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Dice bell peppers small.","Heat a large skillet over medium-high heat. Add beef, break up with spoon.","Cook 8 min until browned. Drain excess fat.","Add taco seasoning, stir to coat beef evenly.","Add peppers, cook 3 min until softened but still have some crunch.","Pour in enchilada sauce, reduce to medium-low. Simmer 5 min to meld flavors.","Heat drained beans in microwave 1 min. Build bowls: rice, beef mix, beans, generous cheese, dollop of sour cream."], baby:"Rice with soft beans and cheese." },
  { id: 33, name: "Chicken & Corn Pasta", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF3D", tags: ["chicken", "pasta"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"bowtie pasta",qty:"1 lb",aisle:"Grains"},{item:"corn",qty:"2 cups frozen",aisle:"Frozen"},{item:"heavy cream",qty:"1.5 cups",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Bring a large pot of heavily salted water to a boil. Cook pasta per package (9-11 min for al dente). Drain. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Dice chicken into 1/2-inch cubes. Season with 1 tsp salt, 1/2 tsp pepper, 1 tsp garlic powder.","Heat 2 tbsp olive oil in a large skillet over medium-high heat.","Cook chicken 8 min, stirring every 2 min, until golden and 165F internal.","Add minced garlic, stir 1 min until fragrant.","Pour in heavy cream and frozen corn (no need to thaw). Bring to a gentle simmer, 3 min until corn is heated through.","Reduce heat to low. Stir in parmesan and butter until melted and sauce is smooth.","Add pasta, toss until fully coated. Serve immediately — sauce thickens as it sits."], baby:"Plain pasta with corn and small chicken pieces." },
  { id: 34, name: "Steak & Potato Hash", time: "30 min", protein: "3 lbs steak", emoji: "\uD83E\uDD54", tags: ["steak", "potato"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"yukon potatoes",qty:"6",aisle:"Produce"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"eggs",qty:"6",aisle:"Dairy"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"},{item:"paprika",qty:"1 tsp",aisle:"Pantry"}], steps:["Dice potatoes into 1/4-inch cubes (small = fast cooking). Dice steak into 1/2-inch cubes. Dice bell pepper.","Heat 3 tbsp olive oil in a large cast iron or nonstick skillet over medium heat.","Add potatoes, sprinkle with 1 tsp salt. Cover and cook 12 min, stirring every 3 min, until fork-tender and golden on edges.","Push potatoes to one side. Add steak to empty side with peppers and minced garlic. Increase heat to medium-high.","Cook steak 6 min, stirring occasionally, until browned on outside but still juicy inside.","Season everything with paprika, 1/2 tsp salt, 1/4 tsp pepper. Mix together in the pan.","Use a spoon to make 6 wells in the hash. Crack 1 egg into each well. Season eggs with a pinch of salt.","Cover with lid, cook 3 min until whites are set but yolks are still runny. Top with butter pats. Serve straight from skillet."], baby:"Soft potato pieces and scrambled egg." },
  { id: 35, name: "Turkey Taco Pasta", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF5D", tags: ["turkey", "pasta"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"rotini pasta",qty:"1 lb",aisle:"Grains"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"diced tomatoes",qty:"2 cans",aisle:"Canned"},{item:"tomato sauce",qty:"1 can",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"bell peppers",qty:"1",aisle:"Produce"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"}], steps:["Bring a large pot of heavily salted water to a boil. Cook pasta per package (9-11 min for al dente). Drain. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Dice bell pepper small.","Heat a large deep skillet over medium-high heat. Add turkey and bell pepper. Break up turkey with wooden spoon.","Cook 8 min until turkey is no longer pink.","Sprinkle taco seasoning over turkey, stir to coat.","Pour in diced tomatoes with juice, tomato sauce, and 1 cup water. Bring to a simmer.","Simmer 8 min on medium-low until slightly thickened.","While that simmers, add drained pasta to the skillet, toss to coat. Top with cheese, cover with lid 2 min until melted. Serve with dollop of sour cream."], baby:"Plain pasta with a little sauce and cheese." },
  { id: 36, name: "Chicken Sweet Potato Sheet Pan", time: "30 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF60", tags: ["chicken", "potato"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"sweet potatoes",qty:"3 large",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"paprika",qty:"1 tsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"honey",qty:"2 tbsp",aisle:"Pantry"}], steps:["Preheat oven to 425F. Line a large sheet pan with parchment. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Cube sweet potatoes into 1-inch pieces. Toss on sheet pan with 3 tbsp olive oil, garlic powder, paprika, 1 tsp salt.","Roast 10 min.","Meanwhile, cut broccoli into florets. Pat chicken dry, season with 1 tsp salt and 1/2 tsp pepper.","Remove pan, push sweet potatoes to one side. Add chicken and broccoli to the other. Drizzle with remaining olive oil.","Whisk honey with 1 tbsp water, drizzle over chicken.","Return to oven, roast 18 min — chicken should be 165F internal, broccoli charred in spots.","Top chicken with butter pats, rest 3 min. Serve everything straight from the pan."], baby:"Mashed sweet potato and soft chicken pieces." },
  { id: 37, name: "Beef & Rice Stuffed Peppers", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF36", tags: ["beef", "rice"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"bell peppers",qty:"8 large",aisle:"Produce"},{item:"white rice",qty:"1.5 cups",aisle:"Grains"},{item:"diced tomatoes",qty:"1 can",aisle:"Canned"},{item:"tomato sauce",qty:"1 can",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"}], steps:["Preheat oven to 400F. Cook rice per package (3/4 cup rice + 1.5 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Halve peppers lengthwise, remove seeds. Place cut-side up in a baking dish.","Heat a large skillet over medium-high heat. Add beef and minced garlic. Break up with spoon.","Cook 8 min until browned. Drain excess fat.","Add italian seasoning, 1 tsp salt, 1/2 tsp pepper, stir to coat.","In a large bowl, combine: cooked rice, beef, drained diced tomatoes, tomato sauce, and 1 cup of the cheese.","Spoon mixture into pepper halves, mounding slightly. Top with remaining cheese.","Cover with foil, bake 18 min. Uncover, bake 5 min until cheese bubbles and edges brown. Rest 3 min before serving."], baby:"Scoop soft filling and pepper piece." },
  { id: 38, name: "Egg Veggie Scramble & Toast", time: "20 min", protein: "14 eggs", emoji: "\uD83C\uDF5E", tags: ["eggs", "bread"], ingredients: [{item:"eggs",qty:"14",aisle:"Dairy"},{item:"sourdough bread",qty:"1 loaf",aisle:"Grains"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"spinach",qty:"4 oz",aisle:"Produce"},{item:"shredded cheese",qty:"1.5 cups",aisle:"Dairy"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"garlic",qty:"2 cloves",aisle:"Produce"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Dice bell peppers into 1/4-inch pieces.","Heat 2 tbsp olive oil in a large nonstick skillet over medium heat.","Add peppers and minced garlic, cook 5 min until peppers soften.","Add spinach handful at a time, stir 1 min until wilted.","Meanwhile, crack eggs into a bowl, add 2 tbsp milk or water and a pinch of salt. Whisk until uniform pale yellow.","Reduce heat to medium-low. Pour eggs over veggies. Let sit 20 seconds, then gently push from edges to center with spatula, making soft curds. Continue 3-4 min until just set but still glossy.","Sprinkle cheese over eggs, remove from heat (residual heat melts cheese).","Toast bread slices, butter them generously. Serve eggs alongside or on top of toast."], baby:"Plain scrambled egg pieces and soft toast strips." },
  { id: 39, name: "Chicken Burrito Bowls", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDD51", tags: ["chicken", "rice"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"corn",qty:"1 bag",aisle:"Frozen"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"lime",qty:"2",aisle:"Produce"},{item:"taco seasoning",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice per package, stirring in juice of 1 lime and 1 tbsp olive oil while cooking.","Dice chicken into 1/2-inch cubes. Toss in a bowl with taco seasoning and 2 tbsp water until coated.","Heat 2 tbsp olive oil in a large skillet over medium-high heat.","Cook chicken 8 min, stirring every 2 min, until 165F internal.","Meanwhile heat drained beans and frozen corn in separate small pans (3-4 min each).","Build bowls: lime rice on the bottom, then chicken, beans, corn.","Top with cheese, generous dollop of salsa, and sour cream.","Squeeze the second lime over everything right before eating."], baby:"Plain rice with soft beans and corn." },
  { id: 40, name: "Beef & Green Bean Stir-Fry", time: "25 min", protein: "3 lbs sirloin", emoji: "\uD83E\uDD57", tags: ["beef", "rice"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"green beans",qty:"1.5 lbs",aisle:"Produce"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"cornstarch",qty:"2 tbsp",aisle:"Pantry"},{item:"brown sugar",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Slice beef into thin strips against the grain. Toss with 2 tbsp cornstarch in a bowl until coated.","In a small bowl whisk: soy sauce, minced garlic, grated ginger, brown sugar, and 1/2 cup water.","Trim ends off green beans.","Heat 2 tbsp sesame oil in a large skillet or wok over high heat until just smoking.","Add beef in a single layer (do in 2 batches if needed). Sear 2 min undisturbed, then stir 1 min. Remove to a plate.","Add 1 tbsp oil, then green beans. Stir-fry 5 min until bright green and slightly blistered.","Pour in sauce, return beef. Toss 2 min until sauce thickens and coats everything glossy. Serve over rice."], baby:"Soft green beans and rice." },
  { id: 41, name: "Chicken Bacon Ranch Wraps", time: "20 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF2F", tags: ["chicken", "tortilla"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"turkey bacon",qty:"12 slices",aisle:"Proteins"},{item:"ranch dressing",qty:"1 cup",aisle:"Dairy"},{item:"lettuce",qty:"1 head",aisle:"Produce"},{item:"tomato",qty:"2",aisle:"Produce"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Heat a large skillet over medium heat. Add turkey bacon strips (no oil needed).","Cook 8 min, flipping halfway, until crispy. Transfer to paper towels, let cool, then crumble.","Dice chicken into 1/2-inch cubes. Season with 1 tsp salt, 1/2 tsp pepper, 1 tsp garlic powder.","In the same skillet, add 2 tbsp olive oil, heat over medium-high.","Cook chicken 8 min, stirring every 2 min, until 165F internal.","Warm tortillas in microwave (wrap stack in damp paper towel, 30 sec) or dry skillet 15 sec per side.","Shred lettuce thin, dice tomatoes.","Build wraps: tortilla, ranch smeared down center, chicken, bacon, cheese, lettuce, tomato. Fold sides in, roll tightly from bottom."], baby:"Plain chicken pieces and cheese, no wrap." },
  { id: 42, name: "Ground Turkey Sweet Potato Skillet", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF60", tags: ["turkey", "potato"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"sweet potatoes",qty:"3 large",aisle:"Produce"},{item:"spinach",qty:"4 oz",aisle:"Produce"},{item:"bell peppers",qty:"1",aisle:"Produce"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"paprika",qty:"2 tsp",aisle:"Pantry"},{item:"shredded cheese",qty:"1.5 cups",aisle:"Dairy"}], steps:["Dice sweet potatoes into 1/4-inch cubes (small = fast cooking).","Heat 3 tbsp olive oil in a large cast iron or nonstick skillet over medium heat.","Add sweet potatoes, sprinkle with 1 tsp salt. Cover and cook 12 min, stirring every 3 min, until fork-tender and slightly caramelized.","Push potatoes to one side, increase heat to medium-high. Add turkey and minced garlic to empty side.","Break up turkey with spoon, cook 6 min until no pink remains.","Dice bell pepper. Add to pan with spinach.","Stir everything together, cook 3 min until pepper softens and spinach wilts.","Season with paprika, 1/2 tsp salt, 1/4 tsp pepper. Top with cheese, cover 2 min until melted."], baby:"Soft sweet potato mashed with a little turkey." },
  { id: 43, name: "Beef & Cheese Quesadillas", time: "20 min", protein: "3 lbs ground beef", emoji: "\uD83E\uDDC0", tags: ["beef", "tortilla"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Dice bell peppers small.","Heat a large skillet over medium-high heat. Add beef, break up with spoon.","Cook 8 min until browned. Drain excess fat.","Add taco seasoning, stir to coat. Add peppers, cook 4 min until softened.","Wipe out or use a second skillet. Heat over medium heat.","Assemble each quesadilla: tortilla, generous layer of cheese, spoonful of beef mix, more cheese (cheese on both sides glues it together), top with tortilla.","Cook in dry skillet 2 min per side until golden and crispy. Press down with spatula for even contact.","Rest 1 min on cutting board, then cut into wedges with a pizza cutter. Serve with sour cream and salsa."], baby:"Small cheese pieces and crumbled beef." },
  { id: 44, name: "Chicken Spinach Rice Bake", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDD58", tags: ["chicken", "rice"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"spinach",qty:"6 oz",aisle:"Produce"},{item:"cream of chicken soup",qty:"2 cans",aisle:"Canned"},{item:"chicken broth",qty:"2 cups",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Preheat oven to 375F. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Dice chicken into 1/2-inch cubes.","In a 9x13 baking dish, combine: uncooked rice, cream of chicken soup, broth, chicken, chopped spinach, garlic powder, 1 tsp salt, 1/2 tsp pepper. Stir well.","Dot top with butter pieces. Cover tightly with foil.","Bake covered 25 min — don't peek (this steams the rice).","Remove foil, sprinkle cheese evenly over top.","Bake 5 min uncovered until cheese melts and edges bubble.","Rest 5 min to let rice finish absorbing liquid. Fluff gently with a fork before serving."], baby:"Soft rice with a little cheese, small chicken pieces." },
  { id: 45, name: "Steak Quesadillas", time: "25 min", protein: "3 lbs steak", emoji: "\uD83E\uDDC0", tags: ["steak", "tortilla"], ingredients: [{item:"flank steak",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"fajita seasoning",qty:"2 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"}], steps:["Pat steak dry with paper towels. Season both sides with fajita seasoning.","Slice bell peppers into thin strips.","Heat 2 tbsp olive oil in a large skillet over high heat until just smoking.","Add steak, sear 4 min per side (medium-rare). Transfer to cutting board, rest 5 min.","Add 1 tbsp oil to same pan, reduce heat to medium-high. Add peppers, cook 5 min until slightly charred but still crisp.","Slice steak thinly against the grain into strips.","Assemble each quesadilla: tortilla, layer of cheese, steak, peppers, more cheese, top tortilla.","Cook in dry skillet (wipe first) 2 min per side over medium heat until golden. Rest 1 min, cut into wedges. Serve with sour cream and salsa."], baby:"Small tortilla pieces with melted cheese." },
  { id: 46, name: "Turkey & Pea Pasta", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF5D", tags: ["turkey", "pasta"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"rotini pasta",qty:"1 lb",aisle:"Grains"},{item:"frozen peas",qty:"2 cups",aisle:"Frozen"},{item:"heavy cream",qty:"1.5 cups",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Bring a large pot of heavily salted water to a boil. Cook pasta per package (9-11 min for al dente). Drain. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Heat 2 tbsp olive oil in a large skillet over medium-high heat.","Add turkey and minced garlic, break up with spoon. Cook 8 min until no pink remains.","Season with 1 tsp salt, 1/2 tsp pepper.","Reduce heat to medium. Pour in heavy cream and frozen peas (no need to thaw). Simmer 5 min, stirring occasionally, until sauce starts to thicken.","Turn heat to low. Stir in butter and parmesan until melted and sauce is smooth.","Add drained pasta, toss to coat. If too thick, splash in a bit of pasta water.","Taste, adjust salt. Serve immediately with extra parmesan."], baby:"Plain pasta with soft peas." },
  { id: 47, name: "Chicken Carrot Rice Bowls", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83E\uDD55", tags: ["chicken", "rice"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"carrots",qty:"5",aisle:"Produce"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"honey",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"sesame seeds",qty:"1 tbsp",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Peel and slice carrots thin on a diagonal (1/4-inch thick).","Dice chicken into 1/2-inch cubes. Season with 1/2 tsp salt.","Heat 2 tbsp sesame oil in a large skillet over medium-high heat.","Add chicken, spread in a single layer. Cook 4 min without stirring, then flip and cook 4 min more until 165F internal.","Add carrots and minced garlic. Toss, cook 4 min until carrots are tender-crisp.","In a small bowl whisk: soy sauce, honey, and 2 tbsp water. Pour over chicken, simmer 2 min until sauce thickens and glazes everything.","Serve over rice, sprinkle with sesame seeds."], baby:"Soft carrots and rice with plain chicken." },
  { id: 48, name: "Beef Stroganoff Pasta", time: "30 min", protein: "3 lbs sirloin strips", emoji: "\uD83C\uDF5D", tags: ["beef", "pasta"], ingredients: [{item:"sirloin steak strips",qty:"3 lbs",aisle:"Proteins"},{item:"egg noodles",qty:"1 lb",aisle:"Grains"},{item:"mushrooms",qty:"12 oz",aisle:"Produce"},{item:"sour cream",qty:"1.5 cups",aisle:"Dairy"},{item:"beef broth",qty:"2 cups",aisle:"Canned"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"flour",qty:"3 tbsp",aisle:"Pantry"}], steps:["Bring a large pot of heavily salted water to a boil. Cook egg noodles per package (usually 7-8 min). Drain. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Slice mushrooms into 1/4-inch thick pieces.","Heat 2 tbsp butter in a large skillet over high heat until foaming subsides.","Add beef strips in a single layer, sear 3 min without stirring, then flip and cook 1 min more. Transfer to a plate.","Reduce heat to medium. Add 2 tbsp butter, mushrooms, and minced garlic. Cook 5 min until mushrooms release liquid and brown.","Sprinkle flour over mushrooms, stir 1 min to cook out raw taste.","Slowly whisk in beef broth, bring to a simmer, cook 5 min until thickened.","Turn off heat. Stir in sour cream (off heat prevents curdling) and return beef. Add 1 tsp salt. Toss with noodles and serve immediately."], baby:"Plain noodles with a little sour cream." },
  { id: 49, name: "Turkey Corn Quesadillas", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83E\uDDC0", tags: ["turkey", "tortilla"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"corn",qty:"2 cups frozen",aisle:"Frozen"},{item:"bell peppers",qty:"1",aisle:"Produce"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Dice bell pepper small.","Heat a large skillet over medium-high heat. Add turkey, break up with spoon.","Cook 8 min until no pink remains.","Add taco seasoning, stir to coat. Add bell pepper and frozen corn (no need to thaw), cook 4 min until pepper softens and corn is heated through.","Wipe skillet or use a second one. Heat over medium heat.","Assemble each quesadilla: tortilla, layer of cheese, spoonful of turkey-corn mix, more cheese (cheese on both sides glues it), top with tortilla.","Cook in dry skillet 2 min per side until golden brown and crispy. Press down with spatula for even contact.","Rest 1 min on cutting board, cut into wedges with a pizza cutter. Serve with sour cream."], baby:"Small cheese pieces and soft corn." },
  { id: 50, name: "Chicken Pot Pie Bowls", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDD58", tags: ["chicken", "bread"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"refrigerated biscuits",qty:"2 cans",aisle:"Dairy"},{item:"frozen peas and carrots",qty:"2 cups",aisle:"Frozen"},{item:"cream of chicken soup",qty:"2 cans",aisle:"Canned"},{item:"chicken broth",qty:"1 cup",aisle:"Canned"},{item:"milk",qty:"1/2 cup",aisle:"Dairy"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"}], steps:["Preheat oven and bake biscuits per package instructions (usually 375F for 12-15 min until golden). The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Dice chicken into 1/2-inch cubes. Season with 1 tsp salt, 1/2 tsp pepper.","Heat 3 tbsp butter in a large pot or Dutch oven over medium-high heat.","Add chicken, cook 8 min stirring occasionally until golden and 165F internal.","Reduce heat to medium. Add cream of chicken soup, broth, milk, garlic powder, and frozen veggies (no need to thaw).","Stir everything together, bring to a gentle simmer.","Simmer 8 min, stirring occasionally, until sauce thickens slightly and veggies are tender.","While that simmers, ladle into bowls, top each with a warm biscuit (or split biscuit over top). Serve immediately."], baby:"Soft biscuit pieces with veggies and chicken." },
  { id: 51, name: "Lemon Herb Chicken & Roasted Potatoes", time: "30 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF4B", tags: ["chicken", "potato"], ingredients: [{item:"chicken thighs bone-in",qty:"3 lbs",aisle:"Proteins"},{item:"baby potatoes",qty:"20",aisle:"Produce"},{item:"lemon",qty:"2",aisle:"Produce"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"rosemary",qty:"2 sprigs",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"green beans",qty:"1 lb",aisle:"Produce"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"}], steps:["Preheat oven to 425F. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Halve baby potatoes. On a large sheet pan, toss potatoes with 3 tbsp olive oil, minced garlic, torn rosemary leaves, 1 tsp salt, 1/2 tsp pepper.","Pat chicken thighs dry, season both sides with 1 tsp salt, 1/2 tsp pepper. Place on top of potatoes, skin-side up.","Squeeze juice of 2 lemons over chicken, tuck the squeezed lemon halves onto the pan.","Roast 22 min — chicken should be mostly cooked, potatoes starting to crisp.","Trim green beans. Add them to the pan, tossing with any oil. Roast 8 more min.","Chicken should be 165F internal and skin crispy. Potatoes fork-tender.","Dot green beans with butter, toss. Serve everything straight from the pan."], baby:"Soft potato pieces and plain chicken shreds." },
  { id: 52, name: "Shepherd's Pie", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83E\uDD58", tags: ["beef", "potato"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"potatoes",qty:"9",aisle:"Produce"},{item:"frozen peas and carrots",qty:"2 cups",aisle:"Frozen"},{item:"beef broth",qty:"1 cup",aisle:"Canned"},{item:"butter",qty:"1 stick",aisle:"Dairy"},{item:"milk",qty:"1/2 cup",aisle:"Dairy"},{item:"shredded cheese",qty:"1.5 cups",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"flour",qty:"2 tbsp",aisle:"Pantry"}], steps:["Peel and quarter potatoes. Place in a large pot, cover with cold water plus 1 tbsp salt. Bring to a boil, then simmer 15 min until fork-tender. While potatoes boil, move on to the next step.","Meanwhile, heat a large skillet over medium-high heat. Add beef and minced garlic. Cook 8 min until browned, breaking up with spoon. Drain excess fat.","Sprinkle flour over beef, stir 1 min to cook out raw taste.","Add broth and frozen veggies (no need to thaw). Simmer 5 min until thickened. Season with 1 tsp salt, 1/2 tsp pepper.","Drain potatoes, return to pot. Add butter, milk, 1 tsp salt. Mash until smooth.","Transfer beef mixture to a 9x13 baking dish, spread evenly.","Top with mashed potatoes, spreading to cover beef completely. Sprinkle cheese over top.","Broil 4 min on high rack until cheese bubbles and potatoes golden in spots. Rest 5 min before serving."], baby:"Plain mashed potato with soft veggies." },
  { id: 53, name: "Baked Ziti", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF5D", tags: ["beef", "pasta"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"ziti pasta",qty:"1 lb",aisle:"Grains"},{item:"marinara sauce",qty:"2 jars",aisle:"Canned"},{item:"ricotta",qty:"15 oz",aisle:"Dairy"},{item:"mozzarella",qty:"2 cups shredded",aisle:"Dairy"},{item:"parmesan",qty:"1/2 cup",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"}], steps:["Preheat oven to 400F. Bring a large pot of heavily salted water to a boil. Cook pasta per package 2 min less than directions (it finishes in the oven). Drain. The oven takes ~7 min to preheat — start prepping while it heats up.","Heat a large skillet over medium-high heat. Add beef and minced garlic. Break up with spoon, cook 8 min until browned. Drain excess fat.","Add marinara sauce and italian seasoning, simmer 3 min.","In a large bowl, combine cooked pasta with beef sauce. Stir in ricotta until distributed (some streaks are fine).","Transfer half the mixture to a 9x13 baking dish. Top with half the mozzarella.","Add remaining pasta mixture, top with remaining mozzarella and all the parmesan.","Bake uncovered 18 min until cheese is bubbling and golden in spots.","Rest 5 min before serving — this lets it set so slices hold their shape."], baby:"Plain pasta with a little cheese." },
  { id: 54, name: "Pancakes, Eggs & Turkey Bacon", time: "25 min", protein: "12 eggs + turkey bacon", emoji: "\uD83E\uDD5E", tags: ["eggs", "bread"], ingredients: [{item:"eggs",qty:"12",aisle:"Dairy"},{item:"turkey bacon",qty:"16 slices",aisle:"Proteins"},{item:"pancake mix",qty:"1 box",aisle:"Grains"},{item:"milk",qty:"2 cups",aisle:"Dairy"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"syrup",qty:"1 bottle",aisle:"Pantry"},{item:"berries",qty:"1 pint",aisle:"Produce"},{item:"vanilla",qty:"1 tsp",aisle:"Pantry"}], steps:["Preheat oven to 200F (for keeping pancakes warm). The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","In a large bowl, whisk pancake mix with milk and vanilla per package directions until just combined (some lumps are fine — overmixing = tough pancakes).","Heat a large skillet or griddle over medium heat. Add turkey bacon, cook 8 min flipping halfway until crispy. Transfer to a plate, keep warm in oven.","Lightly grease griddle with butter. Pour 1/4 cup batter per pancake (cook 3-4 at a time).","Cook 2-3 min per side — flip when bubbles form on top and edges look set. Transfer to oven with bacon.","Whisk eggs in a bowl with a pinch of salt. Melt butter in a clean pan over medium-low heat.","Pour in eggs, gently push from edges to center with spatula to make soft curds. Cook 3-4 min until just set.","Plate: stack of pancakes, eggs, bacon, and berries. Pass syrup at the table."], baby:"Small pancake pieces, soft scrambled eggs, berries cut small." },
  { id: 55, name: "Honey Garlic Chicken & Rice", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF6F", tags: ["chicken", "rice"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"honey",qty:"1/2 cup",aisle:"Pantry"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"cornstarch",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Dice chicken into 1/2-inch cubes. Season with 1/2 tsp salt.","Heat 3 tbsp butter in a large skillet over medium-high heat until foamy.","Add chicken, spread in a single layer. Cook 4 min without stirring, then flip and cook 4 min more until golden and 165F internal.","In a small bowl whisk: honey, soy sauce, minced garlic, cornstarch, and 1/2 cup water until smooth.","Pour sauce over chicken, stir constantly 3 min until sauce thickens and glazes chicken beautifully.","Meanwhile, cut broccoli into florets. Steam in a covered pot with 1 inch water, 5 min until tender-crisp.","Serve chicken over rice with broccoli, spooning extra sauce from pan over everything."], baby:"Plain rice with soft broccoli, tiny chicken bits rinsed." },
  { id: 56, name: "Classic Lasagna", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF5D", tags: ["beef", "pasta"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"lasagna noodles (no-boil)",qty:"1 box",aisle:"Grains"},{item:"marinara sauce",qty:"2 jars",aisle:"Canned"},{item:"ricotta",qty:"15 oz",aisle:"Dairy"},{item:"mozzarella",qty:"3 cups shredded",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"eggs",qty:"2",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"}], steps:["Preheat oven to 400F. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Heat a large skillet over medium-high heat. Add beef and minced garlic. Break up with spoon, cook 8 min until browned. Drain excess fat.","Stir marinara into beef, simmer 3 min.","In a medium bowl, whisk ricotta with 2 eggs and 1/2 cup of the parmesan. Season with 1 tsp salt.","In a 9x13 baking dish: 1 cup meat sauce on the bottom, layer of noodles (break to fit), half the ricotta mix spread over noodles, layer of mozzarella, more meat sauce.","Repeat: noodles, remaining ricotta, mozzarella, sauce. Top with a final layer of noodles and remaining sauce.","Sprinkle rest of mozzarella and parmesan on top. Cover tightly with foil (spray foil with oil to prevent cheese sticking).","Bake covered 25 min, then uncover and bake 5 min until bubbly and golden. Rest 10 min before cutting (important — otherwise it slides apart)."], baby:"Small soft noodle piece with cheese." },
  { id: 57, name: "Korean Ground Beef Bowls", time: "20 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF5A", tags: ["beef", "rice"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"brown sugar",qty:"1/3 cup",aisle:"Pantry"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"sesame seeds",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Heat a large skillet over medium-high heat. Add beef, break up with spoon.","Cook 8 min until browned. Drain excess fat.","Add minced garlic and grated ginger, stir 1 min until fragrant.","In a small bowl whisk: soy sauce, brown sugar, sesame oil, and 2 tbsp water.","Pour over beef, reduce heat to medium-low. Simmer 3 min, stirring, until sauce thickens and coats beef.","Meanwhile, cut broccoli into florets. Steam in a covered pot with 1 inch water, 5 min until bright green and tender-crisp.","Build bowls: rice, beef, broccoli. Sprinkle generously with sesame seeds."], baby:"Plain rice with soft broccoli." },
  { id: 58, name: "Turkey Meatloaf & Mashed Potatoes", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83E\uDD58", tags: ["turkey", "potato"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"potatoes",qty:"9",aisle:"Produce"},{item:"breadcrumbs",qty:"1 cup",aisle:"Grains"},{item:"eggs",qty:"2",aisle:"Dairy"},{item:"ketchup",qty:"1/2 cup",aisle:"Pantry"},{item:"butter",qty:"1 stick",aisle:"Dairy"},{item:"milk",qty:"1/2 cup",aisle:"Dairy"},{item:"garlic powder",qty:"1 tbsp",aisle:"Pantry"},{item:"green beans",qty:"1 lb",aisle:"Produce"}], steps:["Preheat oven to 425F. Peel and quarter potatoes, place in a large pot, cover with cold water plus 1 tbsp salt. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","In a large bowl, combine turkey, breadcrumbs, 2 lightly beaten eggs, garlic powder, 1 tsp salt, 1/2 tsp pepper, and 1/4 cup ketchup. Mix gently just until combined.","Shape mixture into a loaf on a parchment-lined sheet pan (free-form, about 9x5 inches, 2 inches tall).","Spread remaining ketchup over the top and sides.","Bake 25 min until internal temp hits 165F and top is glazed.","Meanwhile, bring potato pot to a boil, simmer 15 min until fork-tender.","While that simmers, trim green beans, steam in a covered pot with 1 inch water, 5 min until tender-crisp.","Drain potatoes, return to pot. Mash with butter, milk, 1 tsp salt. Rest meatloaf 5 min, slice thick. Plate with potatoes and green beans."], baby:"Mashed potato and soft crumbled meatloaf." },
  { id: 59, name: "Chicken Noodle Soup", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF5C", tags: ["chicken", "pasta"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"egg noodles",qty:"12 oz",aisle:"Grains"},{item:"chicken broth",qty:"10 cups",aisle:"Canned"},{item:"carrots",qty:"4",aisle:"Produce"},{item:"celery",qty:"4 stalks",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"parsley",qty:"small bunch",aisle:"Produce"},{item:"bay leaves",qty:"2",aisle:"Pantry"}], steps:["Peel carrots and slice into 1/4-inch coins. Slice celery thin.","Melt 3 tbsp butter in a large pot or Dutch oven over medium heat.","Add carrots, celery, and minced garlic. Cook 5 min, stirring, until softened but not browned.","Add whole chicken breasts (they'll shred later), broth, bay leaves, 1 tsp salt, 1/2 tsp pepper.","Bring to a boil, then reduce to low. Simmer 15 min until chicken is cooked through (165F internal).","While that simmers, remove chicken to a plate, shred with 2 forks.","Increase heat to medium. Add egg noodles, cook 8 min until tender.","Return shredded chicken to pot. Remove bay leaves. Taste and adjust salt. Top each bowl with chopped parsley."], baby:"Soft noodles with tiny chicken and carrots." },
  { id: 60, name: "Steak & Pasta Plate", time: "30 min", protein: "3 lbs steak", emoji: "\uD83C\uDF5D", tags: ["steak", "pasta"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"penne pasta",qty:"1 lb",aisle:"Grains"},{item:"butter",qty:"6 tbsp",aisle:"Dairy"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"spinach",qty:"4 oz",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"cherry tomatoes",qty:"1 pint",aisle:"Produce"}], steps:["Bring a large pot of heavily salted water to a boil. Cook pasta per package (9-11 min for al dente). Reserve 1/2 cup pasta water, drain. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Pat steak dry with paper towels. Season generously with 1 tsp salt and 1/2 tsp pepper on both sides.","Heat 3 tbsp olive oil in a large cast iron skillet over high heat until just smoking.","Add steak, don't move it. Sear 4 min, flip, cook 4 more min (medium-rare). Transfer to cutting board, rest 5 min, then slice thinly against the grain.","In the same pan, reduce heat to medium. Melt 6 tbsp butter with minced garlic, stir 1 min until fragrant.","Halve cherry tomatoes, add to pan. Cook 3 min until tomatoes soften and start to burst.","Turn heat to low. Add drained pasta, spinach, and parmesan to the pan. Toss together, splashing in pasta water as needed until silky.","Plate pasta, top with sliced steak. Drizzle any resting juices from the cutting board over everything."], baby:"Plain pasta with a little butter and small tomato pieces." },

  // ===== QUICK 15-MIN MEALS (61-70) =====
  { id: 61, name: "15-Min Garlic Butter Chicken Bites", time: "15 min", protein: "3 lbs chicken tenders", emoji: "\uD83C\uDF57", tags: ["chicken", "rice", "quick"], ingredients: [{item:"chicken tenders",qty:"3 lbs",aisle:"Proteins"},{item:"white rice (microwave)",qty:"4 pouches",aisle:"Grains"},{item:"butter",qty:"6 tbsp",aisle:"Dairy"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"lemon",qty:"1",aisle:"Produce"},{item:"frozen broccoli",qty:"1 bag",aisle:"Frozen"},{item:"parsley",qty:"small bunch",aisle:"Produce"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Microwave rice pouches per package (usually 90 seconds each). Pop these in while you start step 2 — only 90 sec each.","Cut chicken tenders in half crosswise for faster cooking. Pat dry, season with 1 tsp salt, 1/2 tsp pepper.","Heat 2 tbsp olive oil in a large skillet over medium-high heat until shimmering.","Add chicken in a single layer, don't crowd. Sear 3 min without moving, then flip and cook 3 min more until golden and 165F internal.","Microwave frozen broccoli per bag (usually 4 min).","Reduce heat to medium-low. Push chicken to one side, add butter and minced garlic to empty space. Stir 1 min until fragrant.","Squeeze juice of 1 lemon into pan, toss chicken in the garlic butter sauce.","Serve over rice with broccoli, top with chopped parsley."], baby:"Plain rice and soft broccoli florets, tiny chicken pieces." },
  { id: 62, name: "Quick Egg & Cheese Toast Stacks", time: "15 min", protein: "14 eggs", emoji: "\uD83C\uDF5E", tags: ["eggs", "bread", "quick"], ingredients: [{item:"eggs",qty:"14",aisle:"Dairy"},{item:"english muffins",qty:"8",aisle:"Grains"},{item:"cheese slices",qty:"10",aisle:"Dairy"},{item:"turkey bacon",qty:"12 slices",aisle:"Proteins"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"avocado",qty:"2",aisle:"Produce"}], steps:["Heat a large skillet over medium heat. Add turkey bacon strips, cook 6 min flipping halfway until crispy. Transfer to paper towels.","Meanwhile, toast english muffins (split them first, cut-side up, in toaster or under broiler 2 min).","Butter muffins generously while hot so butter melts in.","Wipe the bacon pan, reduce to medium-low. Melt 2 tbsp butter.","Whisk eggs with a pinch of salt, pour into pan. Stir gently with spatula from edges to center, 3 min until just set but still slightly glossy.","Slice avocado.","Build stacks: bottom muffin, cheese slice, eggs, 2 bacon strips, avocado slices, top muffin.","Serve immediately while everything's hot."], baby:"Plain scrambled egg pieces and soft muffin." },
  { id: 63, name: "15-Min Beef & Rice Bowls", time: "15 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF5A", tags: ["beef", "rice", "quick"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice (microwave)",qty:"4 pouches",aisle:"Grains"},{item:"frozen stir-fry veggies",qty:"1 bag",aisle:"Frozen"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"shredded cheese",qty:"1 cup",aisle:"Dairy"}], steps:["Microwave rice pouches per package (usually 90 seconds each). Pop these in while you start step 2 — only 90 sec each.","Heat a large skillet over medium-high heat. Add beef, break up with spoon.","Cook 6 min until browned. Drain excess fat.","Season beef with garlic powder, 1 tsp salt. Pour in soy sauce, toss to coat. Cook 1 min more.","Meanwhile, microwave frozen stir-fry veggies per bag (usually 4 min).","Build bowls: rice on bottom, beef, veggies.","Top with shredded cheese (residual heat melts it).","Drizzle sesame oil over top for flavor."], baby:"Plain rice with soft veggies." },
  { id: 64, name: "Quick Turkey Ranch Wraps", time: "15 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF2F", tags: ["turkey", "tortilla", "quick"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"ranch dressing",qty:"1 cup",aisle:"Dairy"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"lettuce",qty:"1 head",aisle:"Produce"},{item:"tomato",qty:"2",aisle:"Produce"},{item:"taco seasoning",qty:"1 packet",aisle:"Pantry"}], steps:["Heat a large skillet over medium-high heat. Add turkey, break up with spoon.","Cook 6 min until no pink remains.","Sprinkle taco seasoning over turkey, add 1/3 cup water. Reduce heat to medium-low, simmer 3 min until sauce thickens and coats turkey.","Warm tortillas in microwave (wrap stack in damp paper towel, 30 sec).","Shred lettuce thin, dice tomatoes into 1/4-inch cubes.","Build each wrap: tortilla, ranch smeared down center, generous turkey mix, cheese, lettuce, tomato.","Fold sides in, roll tightly from the bottom.","Cut in half on a diagonal and serve."], baby:"Plain turkey and shredded cheese, no wrap." },
  { id: 65, name: "15-Min Chicken Caprese", time: "15 min", protein: "3 lbs chicken cutlets", emoji: "\uD83C\uDF45", tags: ["chicken", "quick", "italian"], ingredients: [{item:"chicken cutlets (thin)",qty:"3 lbs",aisle:"Proteins"},{item:"fresh mozzarella",qty:"16 oz",aisle:"Dairy"},{item:"tomato",qty:"4",aisle:"Produce"},{item:"fresh basil",qty:"1 bunch",aisle:"Produce"},{item:"balsamic glaze",qty:"1 bottle",aisle:"Pantry"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"},{item:"crusty bread",qty:"1 loaf",aisle:"Grains"}], steps:["Pat chicken cutlets dry. Season both sides with 1 tsp salt, 1/2 tsp pepper, garlic powder.","Heat 3 tbsp olive oil in a large skillet over medium-high heat.","Add cutlets (don't crowd, do in 2 batches if needed). Sear 3 min per side until deep golden brown and 165F internal.","Slice tomatoes and fresh mozzarella into 1/4-inch rounds.","Reduce heat to low. Top each cutlet with a tomato slice and a mozzarella slice.","Cover skillet with lid for 2 min until cheese melts and sauce-like juice forms.","Tear fresh basil over top.","Drizzle with balsamic glaze, serve with crusty bread to mop up the juices."], baby:"Soft bread pieces with melted cheese." },
  { id: 66, name: "Quick Breakfast Burrito Bowls", time: "15 min", protein: "12 eggs", emoji: "\uD83E\uDD5A", tags: ["eggs", "rice", "quick"], ingredients: [{item:"eggs",qty:"12",aisle:"Dairy"},{item:"white rice (microwave)",qty:"3 pouches",aisle:"Grains"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"avocado",qty:"2",aisle:"Produce"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"}], steps:["Microwave rice pouches per package (usually 90 seconds each). Pop these in while you start step 2 — only 90 sec each.","Heat drained black beans in a small saucepan over medium-low, 3-4 min until warmed through. Season with a pinch of salt.","Melt 2 tbsp butter in a large nonstick skillet over medium-low heat.","Whisk eggs with a pinch of salt. Pour into pan, push gently from edges to center with spatula, 3-4 min until just set but still glossy.","Slice avocados.","Build bowls: rice, beans, eggs.","Top with shredded cheese (residual heat melts it), generous spoonfuls of salsa, avocado slices.","Finish with a dollop of sour cream."], baby:"Rice with scrambled egg and soft beans." },
  { id: 67, name: "15-Min Steak Salad Bowls", time: "15 min", protein: "3 lbs steak", emoji: "\uD83E\uDD57", tags: ["steak", "quick"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"mixed greens",qty:"10 oz",aisle:"Produce"},{item:"cherry tomatoes",qty:"1 pint",aisle:"Produce"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"shredded cheese",qty:"1 cup",aisle:"Dairy"},{item:"ranch dressing",qty:"1 cup",aisle:"Dairy"},{item:"crusty bread",qty:"1 loaf",aisle:"Grains"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Pat steak dry with paper towels — crucial for a good sear. Season both sides heavily with 1.5 tsp salt and 1 tsp pepper.","Heat 3 tbsp olive oil in a large cast iron or heavy skillet over high heat until just smoking.","Add steak, don't move it. Sear 4 min, flip, cook 4 more min (medium-rare: 130F internal).","Transfer to cutting board, rest 3 min — this redistributes juices.","Slice thin against the grain (perpendicular to muscle fibers).","Meanwhile, halve cherry tomatoes and slice bell peppers into thin strips.","Build bowls: mixed greens on bottom, then tomatoes, peppers, steak strips.","Top with shredded cheese, drizzle with ranch. Serve with warm crusty bread."], baby:"Small steak bits and soft bread." },
  { id: 68, name: "Quick Chicken Bacon Ranch Pasta", time: "20 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF5D", tags: ["chicken", "pasta", "quick"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"rotini pasta",qty:"1 lb",aisle:"Grains"},{item:"turkey bacon",qty:"12 slices",aisle:"Proteins"},{item:"ranch dressing",qty:"1 cup",aisle:"Dairy"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"frozen peas",qty:"1.5 cups",aisle:"Frozen"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Bring a large pot of heavily salted water to a boil. Cook pasta per package (usually 9 min). Add frozen peas in the last 2 min of cooking (no need to thaw). Drain, reserving 1/2 cup pasta water. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Meanwhile, heat a skillet over medium heat. Add turkey bacon, cook 6 min flipping halfway until crispy. Transfer to paper towels, chop.","Dice chicken into 1/2-inch cubes. Season with 1 tsp salt, 1/2 tsp pepper, 1 tsp garlic powder.","In the same skillet, add 2 tbsp olive oil, heat over medium-high.","Cook chicken 6 min, stirring every 2 min, until golden and 165F internal.","Reduce heat to low. Add drained pasta and peas to the skillet.","Pour in ranch and add cheese. Toss until cheese melts and coats pasta (splash in pasta water if too thick).","Fold in bacon, serve immediately."], baby:"Plain pasta pieces with a little cheese." },
  { id: 69, name: "15-Min Loaded Nachos", time: "15 min", protein: "3 lbs ground beef", emoji: "\uD83E\uDDC0", tags: ["beef", "tortilla", "quick"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"tortilla chips",qty:"2 bags",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"jalapenos",qty:"1 jar pickled",aisle:"Canned"}], steps:["Preheat oven to 425F. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Heat a large skillet over medium-high heat. Add beef, break up with spoon.","Cook 6 min until browned. Drain excess fat, then sprinkle taco seasoning over beef, stir to coat.","Spread tortilla chips in an even layer on a large sheet pan — don't overlap too much or middle chips get soggy.","Top with beef, drained beans, then an even layer of cheese.","Bake 6 min until cheese is fully melted and bubbly.","Remove from oven. Drizzle with salsa and sour cream (don't bake these — they'd burn).","Scatter pickled jalapenos over top. Serve immediately — nachos wait for no one."], baby:"Soft beans with a little cheese, no chips." },
  { id: 70, name: "Quick Honey Mustard Chicken", time: "20 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF6F", tags: ["chicken", "potato", "quick"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"baby potatoes (microwave)",qty:"2 bags",aisle:"Produce"},{item:"honey",qty:"1/3 cup",aisle:"Pantry"},{item:"dijon mustard",qty:"1/4 cup",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"green beans (frozen)",qty:"1 bag",aisle:"Frozen"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Microwave potato bags per package (usually 5-6 min).","Dice chicken into 1/2-inch cubes. Season with 1 tsp salt, 1/2 tsp pepper.","Heat 2 tbsp olive oil in a large skillet over medium-high heat.","Add chicken, spread in a single layer. Cook 8 min, stirring every 2 min, until golden and 165F internal.","Microwave frozen green beans per package (usually 4 min).","In a small bowl whisk: honey, dijon mustard, minced garlic.","Pour sauce over chicken, reduce heat to medium. Simmer 2 min, stirring, until sauce thickens and glazes chicken.","Halve cooked potatoes, toss with butter and a pinch of salt. Plate potatoes, chicken, and green beans."], baby:"Soft potato pieces and small chicken bits." },

  // ===== GLOBAL FLAVORS (71-85) =====
  { id: 71, name: "Chicken Piccata & Pasta", time: "25 min", protein: "3 lbs chicken cutlets", emoji: "\uD83C\uDDEE\uD83C\uDDF9", tags: ["chicken", "pasta", "italian"], ingredients: [{item:"chicken cutlets",qty:"3 lbs",aisle:"Proteins"},{item:"angel hair pasta",qty:"1 lb",aisle:"Grains"},{item:"butter",qty:"6 tbsp",aisle:"Dairy"},{item:"lemon",qty:"3",aisle:"Produce"},{item:"capers",qty:"1 jar",aisle:"Canned"},{item:"chicken broth",qty:"1.5 cups",aisle:"Canned"},{item:"flour",qty:"1/2 cup",aisle:"Pantry"},{item:"parsley",qty:"small bunch",aisle:"Produce"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Bring a large pot of heavily salted water to a boil. Cook angel hair per package (only 3-4 min — it cooks fast). Drain. Once the water is on, jump to the next step — work in parallel while pasta cooks.","On a plate, mix flour with 1 tsp salt and 1/2 tsp pepper. Dredge each cutlet in flour, shaking off excess.","Heat 3 tbsp olive oil in a large skillet over medium-high heat until shimmering.","Add cutlets (don't crowd — do in 2 batches). Sear 3 min per side until deep golden brown. Transfer to a plate.","Reduce heat to medium. Melt 4 tbsp butter, add minced garlic, cook 1 min until fragrant.","Pour in chicken broth and juice of 2-3 lemons. Add drained capers. Bring to a simmer, scraping browned bits with wooden spoon, 4 min until slightly reduced.","Whisk in remaining 2 tbsp cold butter for a silky sauce.","Return cutlets to sauce to rewarm. Serve over pasta, top with chopped parsley and extra sauce."], baby:"Plain pasta with a little butter." },
  { id: 72, name: "Beef Ragu Pappardelle", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDDEE\uD83C\uDDF9", tags: ["beef", "pasta", "italian"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"pappardelle pasta",qty:"1 lb",aisle:"Grains"},{item:"crushed tomatoes",qty:"2 cans",aisle:"Canned"},{item:"tomato paste",qty:"3 tbsp",aisle:"Canned"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"}], steps:["Bring a large pot of heavily salted water to a boil. Cook pappardelle per package (usually 7-8 min). Reserve 1 cup pasta water, drain. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Grate carrots on the fine side of a box grater (they'll melt into the sauce for natural sweetness).","Heat 3 tbsp olive oil in a large deep skillet or Dutch oven over medium-high heat.","Add beef, grated carrots, and minced garlic. Break up beef with spoon, cook 8 min until browned. Drain excess fat.","Push beef to one side, add tomato paste to empty space. Stir and cook 2 min until it darkens slightly — this deepens the flavor.","Stir tomato paste into beef. Add crushed tomatoes, italian seasoning, 1 tsp salt, 1/2 tsp pepper.","Reduce heat to medium-low, simmer uncovered 12 min, stirring occasionally, until thickened.","While that simmers, add pasta and butter to the sauce, toss to coat (splash in pasta water if needed). Serve with generous parmesan."], baby:"Plain pasta with a little sauce." },
  { id: 73, name: "Chicken Tikka Masala", time: "30 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDDEE\uD83C\uDDF3", tags: ["chicken", "rice", "indian"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"basmati rice",qty:"2 cups",aisle:"Grains"},{item:"tikka masala simmer sauce",qty:"2 jars",aisle:"Canned"},{item:"heavy cream",qty:"1/2 cup",aisle:"Dairy"},{item:"naan bread",qty:"8",aisle:"Grains"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"peas (frozen)",qty:"1 cup",aisle:"Frozen"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook basmati rice per package (usually 1 cup rice + 1.75 cups water, simmer 18 min covered, then rest 5 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Dice chicken into 1-inch cubes. Season with 1/2 tsp salt.","Heat 2 tbsp olive oil in a large deep skillet over medium-high heat.","Add chicken and minced garlic. Cook 8 min, stirring occasionally, until chicken is golden on outside and cooked through (165F internal).","Pour in simmer sauce and heavy cream. Stir to combine, bring to a gentle simmer.","Add frozen peas (no need to thaw). Reduce heat to medium-low, simmer 8 min, stirring occasionally, until sauce thickens slightly.","While that simmers, stir in butter at the end for extra richness.","Warm naan under broiler 1-2 min or in a dry skillet 30 sec per side until charred in spots. Serve chicken over rice with naan for scooping."], baby:"Plain rice with small chicken pieces, skip sauce if spicy." },
  { id: 74, name: "Korean Bulgogi Beef Bowls", time: "25 min", protein: "3 lbs sirloin", emoji: "\uD83C\uDDF0\uD83C\uDDF7", tags: ["beef", "rice", "korean"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"brown sugar",qty:"1/3 cup",aisle:"Pantry"},{item:"pear",qty:"1",aisle:"Produce"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"sesame seeds",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Slice steak very thin against the grain (freezing for 15 min first makes this easier).","Grate the pear on the fine side of a box grater (its enzymes tenderize the beef — traditional Korean trick).","In a large bowl whisk: grated pear, soy sauce, brown sugar, minced garlic.","Add steak to marinade, toss to coat. Let sit 10 min while you prep other things.","Julienne carrots into matchsticks. Heat 1 tbsp sesame oil in a skillet over medium heat, saute carrots 3 min until tender-crisp. Remove to a plate.","Heat 2 tbsp sesame oil in same skillet over high heat until just smoking. Add beef in a single layer (discard excess marinade). Sear 2 min without stirring, then toss and cook 2 more min.","Build bowls: rice, beef, carrots. Top with sesame seeds."], baby:"Plain rice with soft carrot and tiny beef." },
  { id: 75, name: "Chicken Souvlaki Plates", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDDEC\uD83C\uDDF7", tags: ["chicken", "bread", "greek"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"pita bread",qty:"8",aisle:"Grains"},{item:"greek yogurt",qty:"16 oz",aisle:"Dairy"},{item:"cucumber",qty:"2",aisle:"Produce"},{item:"tomato",qty:"3",aisle:"Produce"},{item:"feta cheese",qty:"8 oz",aisle:"Dairy"},{item:"lemon",qty:"2",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"oregano",qty:"1 tbsp",aisle:"Pantry"}], steps:["Cube chicken into 1-inch pieces. In a large bowl, toss with 3 tbsp olive oil, juice of 1 lemon, minced garlic, oregano, 1 tsp salt, 1/2 tsp pepper.","Let chicken marinate 10 min while you prep sides.","Grate cucumbers on a box grater. Squeeze out water with your hands (key step — prevents watery tzatziki).","In a bowl, mix grated cucumber with greek yogurt, 1 tbsp minced garlic, juice of 1/2 lemon, pinch of salt.","Heat a large skillet over medium-high heat, add 1 tbsp olive oil. Cook chicken 10 min, turning occasionally, until charred on edges and 165F internal.","Dice tomatoes into 1/2-inch cubes.","Warm pitas in a dry skillet 30 sec per side, or wrap in foil and warm in 300F oven 5 min.","Plate: pita, chicken, tzatziki, tomatoes, crumbled feta. Drizzle extra olive oil over top."], baby:"Soft pita pieces, plain chicken bits." },
  { id: 76, name: "Chicken Yakisoba Noodles", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDDEF\uD83C\uDDF5", tags: ["chicken", "pasta", "japanese"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"yakisoba noodles",qty:"3 packs",aisle:"Grains"},{item:"cabbage",qty:"1 small head",aisle:"Produce"},{item:"carrots",qty:"2",aisle:"Produce"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"yakisoba sauce",qty:"1 bottle",aisle:"Pantry"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"soy sauce",qty:"2 tbsp",aisle:"Pantry"}], steps:["Prep yakisoba noodles per package (most just need a warm water rinse to loosen).","Dice chicken into 1/2-inch cubes. Season with 1/2 tsp salt.","Heat 2 tbsp sesame oil in a large skillet or wok over medium-high heat.","Add chicken, cook 6 min, stirring occasionally, until golden and 165F internal.","Meanwhile, shred cabbage thin, julienne carrots, slice bell peppers into strips.","Add minced garlic to chicken, stir 30 seconds until fragrant. Add cabbage, carrots, peppers.","Stir-fry 4 min until cabbage wilts and vegetables are tender-crisp.","Add noodles and yakisoba sauce, tossing with tongs to coat everything. Cook 3 min to heat through and let sauce glaze noodles. Drizzle with soy sauce."], baby:"Soft noodle pieces and cabbage." },
  { id: 77, name: "Chicken Gyros with Rice", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDDEC\uD83C\uDDF7", tags: ["chicken", "rice", "greek"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"basmati rice",qty:"2 cups",aisle:"Grains"},{item:"pita bread",qty:"8",aisle:"Grains"},{item:"greek yogurt",qty:"16 oz",aisle:"Dairy"},{item:"cucumber",qty:"2",aisle:"Produce"},{item:"tomato",qty:"3",aisle:"Produce"},{item:"lemon",qty:"2",aisle:"Produce"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"oregano",qty:"1 tbsp",aisle:"Pantry"}], steps:["Cook basmati rice per package (1 cup rice + 1.75 cups water), stirring in 1 tbsp olive oil and juice of 1 lemon.","Slice chicken into thin strips. In a bowl, toss with 3 tbsp olive oil, minced garlic, oregano, juice of 1 lemon, 1 tsp salt, 1/2 tsp pepper.","Heat a large skillet over medium-high heat. Add chicken with marinade, spread in single layer.","Cook 10 min, stirring every 2-3 min, until edges are charred and chicken is 165F internal.","Meanwhile, grate cucumbers on a box grater. Squeeze out water with your hands. Mix with greek yogurt and 1 tbsp minced garlic for tzatziki.","Dice tomatoes into 1/2-inch cubes.","Warm pitas in a dry skillet 30 sec per side, or wrap in foil and heat in 300F oven 5 min.","Serve plates: rice, chicken, pita folded on side, tzatziki, diced tomatoes."], baby:"Soft rice and small chicken pieces." },
  { id: 78, name: "Beef Carne Asada Tacos", time: "25 min", protein: "3 lbs skirt steak", emoji: "\uD83C\uDDF2\uD83C\uDDFD", tags: ["steak", "tortilla", "mexican"], ingredients: [{item:"skirt steak",qty:"3 lbs",aisle:"Proteins"},{item:"corn tortillas",qty:"16",aisle:"Grains"},{item:"lime",qty:"3",aisle:"Produce"},{item:"cilantro",qty:"1 bunch",aisle:"Produce"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"cumin",qty:"2 tsp",aisle:"Pantry"},{item:"avocado",qty:"3",aisle:"Produce"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"}], steps:["In a shallow dish, whisk 1/4 cup olive oil with juice of 2 limes, minced garlic, cumin, 1 tsp salt, 1/2 tsp pepper.","Add steak to marinade, flip to coat both sides. Let sit 10 min (or longer if you can).","Heat a large cast iron pan over high heat until smoking. Add 1 tbsp oil.","Add steak (shake off excess marinade first). Sear 4 min per side — you want a dark char.","Transfer to cutting board, rest 5 min — this is critical for juicy meat.","Chop steak into small bite-sized pieces (traditional carne asada style).","Warm corn tortillas 15 sec per side in a dry skillet until pliable and charred in spots. Stack and cover with a towel.","Mash avocado with juice of 1 lime and a pinch of salt. Build tacos: 2 stacked tortillas, steak, avocado, cheese, torn cilantro, salsa."], baby:"Soft tortilla pieces with avocado." },
  { id: 79, name: "Chicken Pad Thai", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDDF9\uD83C\uDDED", tags: ["chicken", "pasta", "thai"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"rice noodles",qty:"14 oz",aisle:"Grains"},{item:"eggs",qty:"4",aisle:"Dairy"},{item:"pad thai sauce",qty:"1 jar",aisle:"Canned"},{item:"bean sprouts",qty:"8 oz",aisle:"Produce"},{item:"carrots",qty:"2",aisle:"Produce"},{item:"peanuts",qty:"1/2 cup",aisle:"Pantry"},{item:"lime",qty:"2",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Soak rice noodles in a large bowl of hot tap water for 8 min until pliable but still firm. Drain. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Dice chicken into 1/2-inch cubes. Julienne carrots.","Heat 2 tbsp sesame oil in a large wok or skillet over medium-high heat.","Add chicken, cook 6 min until golden and 165F internal.","Push chicken to one side. Add 1 tbsp oil to empty side, crack eggs in, scramble 1 min.","Stir eggs into chicken. Add minced garlic and carrots, stir-fry 2 min.","Add drained noodles and pad thai sauce, toss with tongs for 3 min until noodles are tender and sauce coats everything.","Plate and top with bean sprouts, chopped peanuts, and lime wedges to squeeze."], baby:"Plain noodles with scrambled egg bits." },
  { id: 80, name: "Chicken Cacciatore & Polenta", time: "30 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDDEE\uD83C\uDDF9", tags: ["chicken", "italian"], ingredients: [{item:"chicken thighs bone-in",qty:"3 lbs",aisle:"Proteins"},{item:"instant polenta",qty:"2 cups",aisle:"Grains"},{item:"crushed tomatoes",qty:"2 cans",aisle:"Canned"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"mushrooms",qty:"8 oz",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Pat chicken thighs dry, season both sides with 1 tsp salt and 1/2 tsp pepper.","Heat 3 tbsp olive oil in a large deep skillet over medium-high heat.","Add chicken skin-side down, sear 5 min per side until deeply golden. Transfer to a plate.","Slice bell peppers into strips, quarter mushrooms.","Reduce heat to medium. Add peppers, mushrooms, and minced garlic to the pan, cook 5 min until softened and mushrooms release liquid.","Add crushed tomatoes and italian seasoning, 1 tsp salt. Return chicken to pan, nestling into sauce.","Reduce to medium-low, cover and simmer 15 min until chicken reaches 165F internal.","Meanwhile, cook polenta per package (usually whisk into boiling water, 5 min). Stir in butter and parmesan. Plate polenta, top with chicken and sauce."], baby:"Plain polenta with butter." },
  { id: 81, name: "Beef Bibimbap Bowls", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDDF0\uD83C\uDDF7", tags: ["beef", "rice", "korean"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"eggs",qty:"6",aisle:"Dairy"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"spinach",qty:"6 oz",aisle:"Produce"},{item:"bean sprouts",qty:"8 oz",aisle:"Produce"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"brown sugar",qty:"2 tbsp",aisle:"Pantry"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"sriracha",qty:"small bottle",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","In a small bowl whisk: soy sauce, brown sugar, and 2 tbsp water.","Heat 1 tbsp sesame oil in a large skillet over medium-high heat. Add beef and minced garlic.","Cook 8 min, breaking up with spoon, until browned. Pour in sauce, toss 1 min until glazed.","Julienne carrots into matchsticks. In another pan, heat 1 tbsp sesame oil over medium heat, saute carrots 3 min with a pinch of salt until tender-crisp.","Add spinach to same pan, wilt 2 min. Season with pinch of salt.","In a clean pan with 1 tsp oil, fry eggs sunny-side up until whites are set but yolks are still runny, 3-4 min.","Build bowls: rice, arranged sections of beef, carrots, spinach, bean sprouts, with an egg on top. Offer sriracha on the side (skip for baby/mom if mild)."], baby:"Plain rice, soft carrots, scrambled egg." },
  { id: 82, name: "Chicken Fajitas with Rice", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDDF2\uD83C\uDDFD", tags: ["chicken", "tortilla", "mexican"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"flour tortillas",qty:"10",aisle:"Grains"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"bell peppers",qty:"3",aisle:"Produce"},{item:"fajita seasoning",qty:"2 tbsp",aisle:"Pantry"},{item:"lime",qty:"2",aisle:"Produce"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Cook rice per package, stirring in juice of 1 lime and 1 tsp olive oil while cooking.","Slice chicken into 1/2-inch-thick strips. Slice bell peppers into similar-sized strips.","In a bowl, toss chicken with fajita seasoning and 1 tbsp oil until coated.","Heat 2 tbsp olive oil in a large cast iron or heavy skillet over medium-high heat until shimmering.","Add chicken in a single layer. Cook 8 min, stirring every 2 min, until charred on edges and 165F internal.","Push chicken to one side, add peppers to empty side. Cook 5 min until slightly charred but still crisp.","Warm tortillas 15 sec per side in a dry skillet until pliable. Stack and wrap in a towel to keep warm.","Serve family-style: rice, chicken, peppers, tortillas, cheese, sour cream. Let everyone build their own."], baby:"Plain rice with small chicken pieces." },
  { id: 83, name: "Turkey Chorizo-Style Rice", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDDF2\uD83C\uDDFD", tags: ["turkey", "rice", "mexican"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"diced tomatoes",qty:"1 can",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"paprika",qty:"1 tbsp",aisle:"Pantry"},{item:"cumin",qty:"2 tsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"chili powder",qty:"1 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Heat 2 tbsp olive oil in a large skillet over medium-high heat.","Add turkey and minced garlic. Break up with spoon, cook 8 min until no pink remains.","Season with paprika, cumin, chili powder, 1 tsp salt. Stir to coat — this creates the chorizo-style flavor without actual chorizo.","Add diced tomatoes with juice, simmer 5 min on medium-low until most liquid evaporates.","Meanwhile heat drained black beans in a small pan over medium-low, 3-4 min.","Build bowls: rice, turkey, beans, shredded cheese.","Spoon any remaining tomato juice over top for extra flavor."], baby:"Rice with soft beans and cheese." },
  { id: 84, name: "Chicken Chow Mein", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDDE8\uD83C\uDDF3", tags: ["chicken", "pasta", "chinese"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"chow mein noodles",qty:"14 oz",aisle:"Grains"},{item:"cabbage",qty:"1 small head",aisle:"Produce"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"celery",qty:"3 stalks",aisle:"Produce"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"hoisin sauce",qty:"3 tbsp",aisle:"Pantry"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"}], steps:["Cook chow mein noodles per package (usually 3-4 min in boiling water). Drain and rinse under cold water to stop cooking.","Dice chicken into 1/2-inch cubes. Season with 1/2 tsp salt.","Heat 2 tbsp sesame oil in a large wok or skillet over medium-high heat.","Add chicken, cook 6 min, stirring occasionally, until golden and 165F internal.","Add minced garlic and grated ginger, stir 30 seconds until fragrant.","Shred cabbage thin, julienne carrots, slice celery thin. Add all to pan, stir-fry 4 min until cabbage wilts and veggies are tender-crisp.","Add drained noodles. Pour in soy sauce and hoisin, tossing with tongs to coat everything.","Cook 3 min, stirring, until noodles are heated through and sauce clings to everything glossy."], baby:"Soft noodle pieces and shredded cabbage." },
  { id: 85, name: "Cajun Chicken Pasta", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF36", tags: ["chicken", "pasta", "cajun"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"penne pasta",qty:"1 lb",aisle:"Grains"},{item:"heavy cream",qty:"2 cups",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"cajun seasoning",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Bring a large pot of heavily salted water to a boil. Cook pasta per package (9-11 min for al dente). Drain. Once the water is on, jump to step 2 — you'll work in parallel while pasta cooks.","Slice chicken into 1/2-inch strips. Toss in a bowl with cajun seasoning (start with 1 tbsp for mild — add more if spicier is OK) and 1 tbsp olive oil.","Heat remaining olive oil in a large skillet over medium-high heat. Add chicken, spread in single layer.","Cook 8 min, stirring every 2-3 min, until blackened on edges and 165F internal. Transfer to a plate.","Slice bell peppers into thin strips.","Reduce heat to medium. Melt butter in same pan, add peppers and minced garlic. Cook 4 min until peppers soften.","Pour in heavy cream, simmer 2 min to reduce slightly. Stir in parmesan until smooth.","Return chicken to pan with pasta, toss to coat. If too thick, splash in a bit of water. Serve immediately."], baby:"Plain pasta with a little cream sauce." },

  // ===== NEW FORMATS & VARIETY (86-100) =====
  { id: 86, name: "Loaded Baked Potatoes", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83E\uDD54", tags: ["beef", "potato"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"large russet potatoes",qty:"8",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"butter",qty:"6 tbsp",aisle:"Dairy"},{item:"turkey bacon",qty:"10 slices",aisle:"Proteins"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"}], steps:["Pierce each potato 4-5 times with a fork. Place on a microwave-safe plate, microwave on high 8-10 min, flipping halfway, until fork-tender all the way through.","Meanwhile, heat a large skillet over medium heat. Add turkey bacon, cook 6 min flipping halfway until crispy. Transfer to paper towels, let cool, then crumble.","In the same skillet over medium-high heat, add beef. Season with garlic powder, 1 tsp salt, 1/2 tsp pepper.","Break up with spoon and cook 8 min until browned. Drain excess fat.","Meanwhile, cut broccoli into small florets. Steam in a covered pot with 1 inch water, 5 min until tender-crisp. Chop into smaller pieces.","Split each hot potato lengthwise (careful — steam). Fluff the insides with a fork and add a pat of butter to each so it melts in.","Pile on the toppings: beef, broccoli, generous shredded cheese.","Let cheese melt 1 min from residual heat, then add crumbled turkey bacon and a dollop of sour cream."], baby:"Mashed potato inside with butter." },
  { id: 87, name: "Chicken Parm Sliders", time: "25 min", protein: "3 lbs chicken tenders", emoji: "\uD83C\uDF54", tags: ["chicken", "bread", "italian"], ingredients: [{item:"chicken tenders",qty:"3 lbs",aisle:"Proteins"},{item:"slider buns",qty:"16",aisle:"Grains"},{item:"marinara sauce",qty:"1 jar",aisle:"Canned"},{item:"mozzarella",qty:"2 cups shredded",aisle:"Dairy"},{item:"parmesan",qty:"1/2 cup",aisle:"Dairy"},{item:"breadcrumbs",qty:"1 cup",aisle:"Grains"},{item:"eggs",qty:"2",aisle:"Dairy"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"}], steps:["Preheat oven to 425F. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Set up a breading station: one shallow bowl with 2 beaten eggs, another with breadcrumbs mixed with 1/2 cup parmesan and 1 tsp garlic powder.","Pat tenders dry with paper towels, season lightly with salt and pepper.","Dip each tender in egg (let excess drip off), then press firmly into breadcrumbs to coat both sides.","Heat 1/4 cup olive oil in a large skillet over medium heat. Pan-fry tenders 3 min per side until deeply golden. Drain on paper towels.","Slice slider buns in half horizontally (keep the 12 tops/bottoms connected as one slab if possible).","Place tender halves on the bottom buns, spoon a little marinara over each, then top with mozzarella.","Bake 5 min until cheese is fully melted and bubbly. Top with bun halves, serve immediately."], baby:"Soft bun with a little cheese." },
  { id: 88, name: "Breakfast-for-Dinner: Waffles & Eggs", time: "25 min", protein: "14 eggs + turkey bacon", emoji: "\uD83E\uDDC7", tags: ["eggs", "bread", "breakfast"], ingredients: [{item:"eggs",qty:"14",aisle:"Dairy"},{item:"turkey bacon",qty:"16 slices",aisle:"Proteins"},{item:"frozen waffles",qty:"2 boxes",aisle:"Frozen"},{item:"syrup",qty:"1 bottle",aisle:"Pantry"},{item:"butter",qty:"1 stick",aisle:"Dairy"},{item:"berries",qty:"2 pints",aisle:"Produce"},{item:"whipped cream",qty:"1 can",aisle:"Dairy"}], steps:["Preheat oven to 200F (for keeping everything warm as you go). The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Heat a large skillet over medium heat. Add turkey bacon, cook 8 min flipping halfway until crispy. Transfer to a plate and keep warm in oven.","Toast waffles per package (usually 3-4 min in toaster) in batches. Butter them generously while hot and transfer to oven.","Crack all eggs into a bowl, whisk with a pinch of salt until uniform pale yellow.","Wipe the bacon pan, reduce heat to medium-low. Melt 4 tbsp butter.","Pour in eggs. Let sit 30 seconds, then gently push from edges to center with spatula, making soft curds. Cook 3-4 min until just set but still glossy.","Rinse berries and pat dry. Quarter any large strawberries.","Plate: stack of buttery waffles, eggs, bacon, berries. Pass syrup and whipped cream at the table."], baby:"Small waffle pieces, scrambled eggs, soft berries." },
  { id: 89, name: "Cheeseburger Rice Skillet", time: "25 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF54", tags: ["beef", "rice"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"beef broth",qty:"2 cups",aisle:"Canned"},{item:"ketchup",qty:"1/3 cup",aisle:"Pantry"},{item:"mustard",qty:"2 tbsp",aisle:"Pantry"},{item:"pickles",qty:"1 jar",aisle:"Canned"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Heat a large deep skillet over medium-high heat. Add beef, break up with wooden spoon.","Cook 8 min until browned, stirring to crumble. Drain excess fat.","Season with garlic powder, 1 tsp salt, 1/2 tsp pepper.","Add uncooked rice, beef broth, ketchup, mustard, and 2 cups water. Stir everything to combine.","Bring to a boil, then reduce heat to low. Cover and simmer 18 min without stirring (this cooks the rice evenly).","While that simmers, remove lid — rice should be tender and liquid absorbed. If still wet, cover 2 more min.","Turn off heat. Stir in butter and 2 cups of the cheese until melted and creamy.","Top with remaining cheese, cover with lid 2 min until melted. Scatter chopped pickles over top for the classic cheeseburger tang."], baby:"Plain rice and small pieces of beef." },
  { id: 90, name: "Chicken Shawarma Bowls", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83E\uDD59", tags: ["chicken", "rice", "middle-eastern"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"basmati rice",qty:"2 cups",aisle:"Grains"},{item:"greek yogurt",qty:"16 oz",aisle:"Dairy"},{item:"cucumber",qty:"2",aisle:"Produce"},{item:"tomato",qty:"3",aisle:"Produce"},{item:"hummus",qty:"1 tub",aisle:"Dairy"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"lemon",qty:"2",aisle:"Produce"},{item:"paprika",qty:"1 tbsp",aisle:"Pantry"},{item:"cumin",qty:"2 tsp",aisle:"Pantry"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"}], steps:["Cook basmati rice per package (1 cup rice + 1.75 cups water, 18 min covered, rest 5 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Slice chicken into 1/2-inch-thick strips. In a bowl, toss with 1/4 cup olive oil, paprika, cumin, minced garlic, juice of 1 lemon, 1 tsp salt, 1/2 tsp pepper.","Let marinate 10 min while rice cooks.","Heat a large skillet over medium-high heat (no extra oil needed — marinade has enough).","Add chicken, spread in single layer. Cook 10 min, stirring every 2-3 min, until edges are charred and 165F internal.","Meanwhile, dice cucumber and tomato into 1/4-inch cubes.","In a small bowl, mix greek yogurt with 1 tbsp minced garlic, juice of 1/2 lemon, pinch of salt for a quick yogurt sauce.","Build bowls: rice, chicken, cucumber, tomato, big scoop of hummus, drizzle of yogurt sauce."], baby:"Plain rice with soft chicken pieces and hummus." },
  { id: 91, name: "Turkey Zucchini Boats", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83E\uDD52", tags: ["turkey", "italian"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"zucchini",qty:"6 large",aisle:"Produce"},{item:"marinara sauce",qty:"1 jar",aisle:"Canned"},{item:"mozzarella",qty:"2 cups shredded",aisle:"Dairy"},{item:"parmesan",qty:"1/2 cup",aisle:"Dairy"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"},{item:"crusty bread",qty:"1 loaf",aisle:"Grains"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Preheat oven to 400F. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Halve zucchini lengthwise. Using a spoon, scoop out the seed-y middle, leaving about 1/4-inch of flesh as a wall (don't dig too deep or they fall apart).","Place zucchini boats cut-side up in a 9x13 baking dish.","Heat 2 tbsp olive oil in a large skillet over medium-high heat. Add turkey and minced garlic, break up with spoon.","Cook 8 min until turkey is no longer pink. Season with italian seasoning, 1 tsp salt, 1/2 tsp pepper.","Stir in half the marinara, simmer 2 min to combine.","Spoon filling into zucchini boats, mounding slightly. Top with remaining marinara, then mozzarella and parmesan.","Bake 20 min until cheese is bubbly and golden and zucchini is fork-tender. Serve with crusty bread to soak up juices."], baby:"Soft zucchini scooped out, bread pieces." },
  { id: 92, name: "Steak Frites", time: "25 min", protein: "3 lbs steak", emoji: "\uD83C\uDDEB\uD83C\uDDF7", tags: ["steak", "potato", "french"], ingredients: [{item:"sirloin or ribeye",qty:"3 lbs",aisle:"Proteins"},{item:"frozen fries",qty:"2 bags",aisle:"Frozen"},{item:"butter",qty:"6 tbsp",aisle:"Dairy"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"green beans",qty:"1 lb",aisle:"Produce"},{item:"parsley",qty:"small bunch",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"parmesan",qty:"1/2 cup",aisle:"Dairy"}], steps:["Bake frozen fries per package (usually 20 min at 425F, flipping halfway). Pop the fries in, then start the next step right away — they'll cook while you work.","Meanwhile, pat steak dry with paper towels — critical for a good sear. Season both sides heavily with 1 tsp salt and 1/2 tsp pepper.","Heat 3 tbsp olive oil in a large cast iron skillet over high heat until just smoking.","Add steak, don't move it. Sear 4 min, flip, cook 4 min more (medium-rare: 130F internal).","Transfer to cutting board, rest 5 min — this is non-negotiable for juicy meat.","Meanwhile, melt 4 tbsp butter in a small pan over low heat with minced garlic and chopped parsley. Warm 2 min (don't brown garlic).","Trim green beans, steam in a covered pot with 1 inch water, 5 min until tender-crisp.","Slice steak against the grain. Plate: fries tossed with parmesan, steak drizzled with garlic-parsley butter, green beans. Add 2 tbsp extra butter to steak resting juices, spoon over top."], baby:"Soft fry pieces and green beans." },
  { id: 93, name: "Chicken Lettuce Wraps", time: "20 min", protein: "3 lbs ground chicken", emoji: "\uD83E\uDD57", tags: ["chicken", "asian"], ingredients: [{item:"ground chicken",qty:"3 lbs",aisle:"Proteins"},{item:"white rice (microwave)",qty:"3 pouches",aisle:"Grains"},{item:"butter lettuce",qty:"2 heads",aisle:"Produce"},{item:"water chestnuts",qty:"2 cans",aisle:"Canned"},{item:"hoisin sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"soy sauce",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Microwave rice pouches per package (usually 90 seconds each). Pop these in while you start step 2 — only 90 sec each.","Heat 2 tbsp sesame oil in a large skillet over medium-high heat.","Add ground chicken, break up with a wooden spoon. Cook 6 min until no pink remains.","Add minced garlic and grated ginger, stir 1 min until fragrant.","Drain and chop water chestnuts (they add great crunch). Add to chicken, cook 2 min.","Reduce heat to medium-low. Pour in hoisin sauce and soy sauce, toss for 1 min to coat everything.","Meanwhile, separate butter lettuce leaves and rinse under cold water, pat dry with a towel.","Serve family-style: rice in bowls, chicken mixture, stack of lettuce cups. Each person scoops chicken + rice into a lettuce cup to eat like a taco."], baby:"Plain rice with small chicken pieces." },
  { id: 94, name: "Baked Chicken Drumsticks & Roasted Veggies", time: "30 min", protein: "3.5 lbs drumsticks", emoji: "\uD83C\uDF57", tags: ["chicken", "potato"], ingredients: [{item:"chicken drumsticks",qty:"3.5 lbs",aisle:"Proteins"},{item:"baby potatoes",qty:"20",aisle:"Produce"},{item:"carrots",qty:"6",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"garlic powder",qty:"1 tbsp",aisle:"Pantry"},{item:"paprika",qty:"2 tsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"parsley",qty:"small bunch",aisle:"Produce"}], steps:["Preheat oven to 425F. Line a large sheet pan with parchment or foil. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Halve baby potatoes, peel and chunk carrots into 1-inch pieces.","On the sheet pan, toss potatoes and carrots with 3 tbsp olive oil, garlic powder, paprika, 1 tsp salt.","Pat drumsticks very dry with paper towels (this is key for crispy skin). Rub with remaining 1 tbsp olive oil, season with 1 tsp salt, 1/2 tsp pepper, remaining paprika.","Arrange drumsticks on top of the vegetables.","Roast 30 min until drumsticks are 175F internal with golden, crispy skin, and veggies are fork-tender and caramelized on edges.","Remove from oven. Dot veggies with butter and toss with chopped parsley.","Serve family-style from the sheet pan."], baby:"Soft potato and carrot pieces, shredded chicken." },
  { id: 95, name: "Beef Stir-Fry with Noodles", time: "25 min", protein: "3 lbs flank steak", emoji: "\uD83C\uDF5C", tags: ["beef", "pasta", "asian"], ingredients: [{item:"flank steak",qty:"3 lbs",aisle:"Proteins"},{item:"lo mein noodles",qty:"1 lb",aisle:"Grains"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"stir-fry sauce",qty:"1 bottle",aisle:"Pantry"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"}], steps:["Bring a large pot of water to a boil. Cook lo mein noodles per package (usually 4-5 min). Drain, toss with 1 tsp sesame oil to prevent sticking. Once the water is on, jump to the next step — work in parallel while pasta cooks.","Slice steak very thin against the grain (easier if you freeze it 15 min first).","Cut broccoli into small florets, julienne carrots, slice bell peppers into strips.","Heat 2 tbsp sesame oil in a large wok or skillet over high heat until just smoking.","Add beef in a single layer, sear 2 min undisturbed, then stir 1 min. Transfer to a plate.","Add 1 tbsp oil to same pan. Add broccoli, carrots, peppers with minced garlic and grated ginger.","Stir-fry 5 min until veggies are tender-crisp and slightly charred.","Add noodles, beef, and stir-fry sauce. Toss with tongs 3 min until everything is glossy and heated through."], baby:"Soft noodles with carrots." },
  { id: 96, name: "Chicken Ranch Potato Bake", time: "30 min", protein: "3 lbs chicken thighs", emoji: "\uD83E\uDD58", tags: ["chicken", "potato"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"baby potatoes",qty:"24",aisle:"Produce"},{item:"ranch seasoning",qty:"2 packets",aisle:"Pantry"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"turkey bacon",qty:"10 slices",aisle:"Proteins"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Preheat oven to 425F. Line a large sheet pan with parchment. The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Halve baby potatoes, cube chicken into 1-inch pieces.","In a large bowl, toss chicken and potatoes with 1/4 cup olive oil and both packets of ranch seasoning until coated.","Spread in a single layer on sheet pan — don't overcrowd or they'll steam instead of roast.","Bake 20 min until chicken is 165F internal and potatoes are fork-tender.","Meanwhile, cook turkey bacon in a skillet over medium heat 6 min flipping halfway until crispy. Drain on paper towels, crumble.","Cut broccoli into florets.","Pull pan from oven, add broccoli, sprinkle cheese and turkey bacon crumbles over top. Dot with butter. Return to oven 8 min until cheese is melted and broccoli tender-crisp."], baby:"Soft potato and broccoli pieces." },
  { id: 97, name: "Orange Chicken & Rice", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF4A", tags: ["chicken", "rice", "chinese"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"orange juice",qty:"1 cup",aisle:"Dairy"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"brown sugar",qty:"1/3 cup",aisle:"Pantry"},{item:"cornstarch",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Cook rice per package (1 cup rice + 2 cups water, 18 min). While the rice cooks, move on to the next step right away — they'll finish around the same time.","Cube chicken into 1-inch pieces. Place in a bowl, toss with 2 tbsp cornstarch until fully coated — this is what makes it crispy.","Heat 3 tbsp sesame oil in a large skillet over medium-high heat.","Add chicken in a single layer (don't crowd — do in 2 batches if needed). Pan-fry 8 min, flipping pieces occasionally, until golden and crispy on all sides and 165F internal.","In a bowl whisk: orange juice, soy sauce, brown sugar, minced garlic, and 1 tbsp cornstarch until smooth.","Pour sauce over chicken, stir constantly over medium heat 3 min until it thickens into a glossy glaze that coats everything.","Meanwhile, cut broccoli into florets. Steam in a covered pot with 1 inch water, 5 min until bright green and tender-crisp.","Serve chicken over rice with broccoli on the side."], baby:"Plain rice with soft broccoli, rinsed chicken bits." },
  { id: 98, name: "Lemon Dill Chicken & Orzo", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDDEC\uD83C\uDDF7", tags: ["chicken", "pasta", "greek"], ingredients: [{item:"chicken breasts",qty:"6 breasts (3 lbs)",aisle:"Proteins"},{item:"orzo pasta",qty:"1 lb",aisle:"Grains"},{item:"lemon",qty:"3",aisle:"Produce"},{item:"dill",qty:"1 bunch",aisle:"Produce"},{item:"feta cheese",qty:"8 oz",aisle:"Dairy"},{item:"spinach",qty:"6 oz",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"chicken broth",qty:"4 cups",aisle:"Canned"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Dice chicken into 1/2-inch cubes. Season with 1 tsp salt, 1/2 tsp pepper.","Heat 3 tbsp olive oil in a large deep skillet over medium-high heat.","Add chicken and minced garlic. Cook 8 min, stirring every 2 min, until golden and 165F internal.","Add uncooked orzo, stir for 1 min to toast slightly (adds nutty flavor).","Pour in chicken broth. Bring to a boil, then reduce to medium-low. Cover and simmer 12 min, stirring occasionally, until orzo is tender and most liquid is absorbed.","While that simmers, add spinach handful by handful, stirring until wilted (2 min).","Turn off heat. Stir in juice of 2 lemons, butter, and half the dill.","Top with crumbled feta and remaining fresh dill. Serve with lemon wedges."], baby:"Plain orzo with a little butter." },
  { id: 99, name: "Beef Goulash", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDDED\uD83C\uDDFA", tags: ["beef", "pasta"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"elbow macaroni",qty:"1 lb",aisle:"Grains"},{item:"diced tomatoes",qty:"2 cans",aisle:"Canned"},{item:"tomato sauce",qty:"1 can",aisle:"Canned"},{item:"beef broth",qty:"2 cups",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"paprika",qty:"1 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"}], steps:["Heat a large Dutch oven or deep skillet over medium-high heat. Add beef and minced garlic, break up with wooden spoon.","Cook 8 min until browned. Drain excess fat.","Add paprika and italian seasoning, stir 1 min to bloom the spices (makes them more fragrant).","Pour in diced tomatoes with juice, tomato sauce, beef broth, and 1 tsp salt. Stir well.","Add uncooked macaroni, stirring to submerge in liquid.","Bring to a boil, then reduce heat to medium-low. Cover and simmer 14 min, stirring every 4-5 min so pasta doesn't stick.","While that simmers, pasta should be tender, sauce thickened. If soupy, simmer uncovered 2-3 more min.","Turn off heat, stir in cheese until melted and creamy. Rest 5 min (sauce thickens as it sits)."], baby:"Plain pasta pieces with a little sauce and cheese." },
  { id: 100, name: "Chicken & Waffle Dinner", time: "25 min", protein: "3 lbs chicken tenders", emoji: "\uD83E\uDDC7", tags: ["chicken", "bread"], ingredients: [{item:"chicken tenders",qty:"3 lbs",aisle:"Proteins"},{item:"frozen waffles",qty:"2 boxes",aisle:"Frozen"},{item:"flour",qty:"1 cup",aisle:"Pantry"},{item:"eggs",qty:"3",aisle:"Dairy"},{item:"breadcrumbs",qty:"1.5 cups",aisle:"Grains"},{item:"syrup",qty:"1 bottle",aisle:"Pantry"},{item:"butter",qty:"1 stick",aisle:"Dairy"},{item:"hot sauce",qty:"small bottle",aisle:"Pantry"},{item:"olive oil",qty:"1/2 cup",aisle:"Pantry"}], steps:["Preheat oven to 200F (for keeping waffles warm). The oven will take ~7 min to preheat — start prepping the next steps while it heats up.","Set up a breading station: one shallow bowl with flour seasoned with 1 tsp salt and 1/2 tsp pepper, one bowl with 3 beaten eggs, one with breadcrumbs.","Pat tenders dry. Dredge each tender in flour (shake off excess), then egg (let excess drip), then press firmly into breadcrumbs.","Heat 1/2 cup olive oil in a large skillet over medium heat until shimmering (a breadcrumb should sizzle immediately).","Pan-fry tenders 3 min per side until deeply golden and 165F internal. Drain on paper towels.","Toast waffles per package (usually 3-4 min in toaster). Butter them generously while hot, transfer to oven to keep warm.","Plate: buttered waffle as base, chicken tenders on top.","Drizzle with syrup. Add a few dashes of hot sauce on the side (for adults — skip for baby)."], baby:"Soft waffle pieces and chicken without crust." },
];

// ============ DIVERSITY METADATA ============
const MEAL_META = {
  1:{cat:"plate",type:"lemon-garlic",protein:"chicken",carb:"rice"},2:{cat:"bowl",type:"stir-fry",protein:"beef",carb:"rice"},3:{cat:"bowl",type:"taco-bowl",protein:"turkey",carb:"rice"},4:{cat:"pasta",type:"one-pot-pasta",protein:"chicken",carb:"pasta"},5:{cat:"plate",type:"sheet-pan",protein:"steak",carb:"potato"},6:{cat:"handheld",type:"burrito",protein:"chicken",carb:"tortilla"},7:{cat:"skillet",type:"hash",protein:"beef",carb:"potato"},8:{cat:"pasta",type:"meatball-pasta",protein:"turkey",carb:"pasta"},9:{cat:"skillet",type:"fried-rice",protein:"eggs",carb:"rice"},10:{cat:"handheld",type:"quesadilla",protein:"chicken",carb:"tortilla"},
  11:{cat:"plate",type:"garlic-butter",protein:"chicken",carb:"potato"},12:{cat:"skillet",type:"taco-skillet",protein:"beef",carb:"rice"},13:{cat:"pasta",type:"alfredo-pasta",protein:"chicken",carb:"pasta"},14:{cat:"bake",type:"stuffed-pepper",protein:"turkey",carb:"rice"},15:{cat:"bowl",type:"fajita-bowl",protein:"steak",carb:"rice"},16:{cat:"skillet",type:"fried-rice",protein:"chicken",carb:"rice"},17:{cat:"bowl",type:"stir-fry",protein:"beef",carb:"rice"},18:{cat:"handheld",type:"burger",protein:"turkey",carb:"potato"},19:{cat:"soup",type:"tortilla-soup",protein:"chicken",carb:"tortilla"},20:{cat:"skillet",type:"pasta-skillet",protein:"beef",carb:"pasta"},
  21:{cat:"handheld",type:"wrap",protein:"chicken",carb:"tortilla"},22:{cat:"bowl",type:"cheese-bowl",protein:"steak",carb:"rice"},23:{cat:"soup",type:"chili",protein:"turkey",carb:"bread"},24:{cat:"pasta",type:"chicken-parm",protein:"chicken",carb:"pasta"},25:{cat:"handheld",type:"burrito",protein:"eggs",carb:"tortilla"},26:{cat:"bake",type:"casserole",protein:"chicken",carb:"rice"},27:{cat:"handheld",type:"taco",protein:"beef",carb:"tortilla"},28:{cat:"pasta",type:"pesto-pasta",protein:"chicken",carb:"pasta"},29:{cat:"plate",type:"steak-tips",protein:"steak",carb:"rice"},30:{cat:"handheld",type:"sloppy-joe",protein:"turkey",carb:"bread"},
  31:{cat:"bowl",type:"teriyaki-bowl",protein:"chicken",carb:"rice"},32:{cat:"bowl",type:"enchilada-bowl",protein:"beef",carb:"rice"},33:{cat:"pasta",type:"cream-pasta",protein:"chicken",carb:"pasta"},34:{cat:"skillet",type:"hash",protein:"steak",carb:"potato"},35:{cat:"pasta",type:"taco-pasta",protein:"turkey",carb:"pasta"},36:{cat:"plate",type:"sheet-pan",protein:"chicken",carb:"potato"},37:{cat:"bake",type:"stuffed-pepper",protein:"beef",carb:"rice"},38:{cat:"breakfast",type:"scramble",protein:"eggs",carb:"bread"},39:{cat:"bowl",type:"burrito-bowl",protein:"chicken",carb:"rice"},40:{cat:"bowl",type:"stir-fry",protein:"beef",carb:"rice"},
  41:{cat:"handheld",type:"wrap",protein:"chicken",carb:"tortilla"},42:{cat:"skillet",type:"hash",protein:"turkey",carb:"potato"},43:{cat:"handheld",type:"quesadilla",protein:"beef",carb:"tortilla"},44:{cat:"bake",type:"casserole",protein:"chicken",carb:"rice"},45:{cat:"handheld",type:"quesadilla",protein:"steak",carb:"tortilla"},46:{cat:"pasta",type:"cream-pasta",protein:"turkey",carb:"pasta"},47:{cat:"bowl",type:"honey-bowl",protein:"chicken",carb:"rice"},48:{cat:"pasta",type:"stroganoff",protein:"beef",carb:"pasta"},49:{cat:"handheld",type:"quesadilla",protein:"turkey",carb:"tortilla"},50:{cat:"bowl",type:"pot-pie",protein:"chicken",carb:"bread"},
  51:{cat:"plate",type:"roasted",protein:"chicken",carb:"potato"},52:{cat:"bake",type:"shepherds",protein:"beef",carb:"potato"},53:{cat:"bake",type:"baked-pasta",protein:"beef",carb:"pasta"},54:{cat:"breakfast",type:"pancakes",protein:"eggs",carb:"bread"},55:{cat:"plate",type:"honey-garlic",protein:"chicken",carb:"rice"},56:{cat:"bake",type:"baked-pasta",protein:"beef",carb:"pasta"},57:{cat:"bowl",type:"korean-bowl",protein:"beef",carb:"rice"},58:{cat:"bake",type:"meatloaf",protein:"turkey",carb:"potato"},59:{cat:"soup",type:"noodle-soup",protein:"chicken",carb:"pasta"},60:{cat:"plate",type:"steak-pasta",protein:"steak",carb:"pasta"},
  61:{cat:"plate",type:"garlic-butter-quick",protein:"chicken",carb:"rice"},62:{cat:"breakfast",type:"egg-stack",protein:"eggs",carb:"bread"},63:{cat:"bowl",type:"quick-bowl",protein:"beef",carb:"rice"},64:{cat:"handheld",type:"wrap",protein:"turkey",carb:"tortilla"},65:{cat:"plate",type:"caprese",protein:"chicken",carb:"bread"},66:{cat:"bowl",type:"breakfast-bowl",protein:"eggs",carb:"rice"},67:{cat:"bowl",type:"steak-salad",protein:"steak",carb:"bread"},68:{cat:"pasta",type:"ranch-pasta",protein:"chicken",carb:"pasta"},69:{cat:"handheld",type:"nachos",protein:"beef",carb:"tortilla"},70:{cat:"plate",type:"honey-mustard",protein:"chicken",carb:"potato"},
  71:{cat:"pasta",type:"piccata",protein:"chicken",carb:"pasta"},72:{cat:"pasta",type:"ragu",protein:"beef",carb:"pasta"},73:{cat:"bowl",type:"tikka",protein:"chicken",carb:"rice"},74:{cat:"bowl",type:"bulgogi",protein:"beef",carb:"rice"},75:{cat:"plate",type:"souvlaki",protein:"chicken",carb:"bread"},76:{cat:"pasta",type:"yakisoba",protein:"chicken",carb:"pasta"},77:{cat:"plate",type:"gyros",protein:"chicken",carb:"rice"},78:{cat:"handheld",type:"carne-asada",protein:"steak",carb:"tortilla"},79:{cat:"pasta",type:"pad-thai",protein:"chicken",carb:"pasta"},80:{cat:"plate",type:"cacciatore",protein:"chicken",carb:"bread"},
  81:{cat:"bowl",type:"bibimbap",protein:"beef",carb:"rice"},82:{cat:"handheld",type:"fajita",protein:"chicken",carb:"tortilla"},83:{cat:"bowl",type:"chorizo-rice",protein:"turkey",carb:"rice"},84:{cat:"pasta",type:"chow-mein",protein:"chicken",carb:"pasta"},85:{cat:"pasta",type:"cajun-pasta",protein:"chicken",carb:"pasta"},86:{cat:"plate",type:"baked-potato",protein:"beef",carb:"potato"},87:{cat:"handheld",type:"slider",protein:"chicken",carb:"bread"},88:{cat:"breakfast",type:"waffles",protein:"eggs",carb:"bread"},89:{cat:"skillet",type:"cheeseburger-rice",protein:"beef",carb:"rice"},90:{cat:"bowl",type:"shawarma",protein:"chicken",carb:"rice"},
  91:{cat:"bake",type:"zucchini-boat",protein:"turkey",carb:"bread"},92:{cat:"plate",type:"steak-frites",protein:"steak",carb:"potato"},93:{cat:"handheld",type:"lettuce-wrap",protein:"chicken",carb:"rice"},94:{cat:"plate",type:"drumsticks",protein:"chicken",carb:"potato"},95:{cat:"pasta",type:"lo-mein",protein:"beef",carb:"pasta"},96:{cat:"bake",type:"ranch-bake",protein:"chicken",carb:"potato"},97:{cat:"bowl",type:"orange-chicken",protein:"chicken",carb:"rice"},98:{cat:"pasta",type:"lemon-orzo",protein:"chicken",carb:"pasta"},99:{cat:"pasta",type:"goulash",protein:"beef",carb:"pasta"},100:{cat:"plate",type:"chicken-waffle",protein:"chicken",carb:"bread"},
};

// ============ DIVERSITY PICKER ============
// Cuisine tags we want to keep varied (not stack multiple Italian, Mexican, etc.)
const CUISINE_TAGS = ["italian","mexican","asian","korean","japanese","chinese","thai","indian","greek","french","middle-eastern","cajun"];

function cuisineOf(meal) {
  return meal.tags.find(t => CUISINE_TAGS.includes(t)) || null;
}

function tryPick(meal, picked, counts, caps) {
  const meta = MEAL_META[meal.id];
  if (caps.cat      && (counts.cat[meta.cat]         || 0) >= caps.cat)      return false;
  if (caps.type     && (counts.type[meta.type]       || 0) >= caps.type)     return false;
  if (caps.protein  && (counts.protein[meta.protein] || 0) >= caps.protein)  return false;
  if (caps.carb     && (counts.carb[meta.carb]       || 0) >= caps.carb)     return false;
  const cuisine = cuisineOf(meal);
  if (cuisine && caps.cuisine && (counts.cuisine[cuisine] || 0) >= caps.cuisine) return false;
  picked.push(meal);
  counts.cat[meta.cat]         = (counts.cat[meta.cat]         || 0) + 1;
  counts.type[meta.type]       = (counts.type[meta.type]       || 0) + 1;
  counts.protein[meta.protein] = (counts.protein[meta.protein] || 0) + 1;
  counts.carb[meta.carb]       = (counts.carb[meta.carb]       || 0) + 1;
  if (cuisine) counts.cuisine[cuisine] = (counts.cuisine[cuisine] || 0) + 1;
  return true;
}

function pickDiverseWeek(excludeIds = []) {
  const pool = MEALS.filter(m => !excludeIds.includes(m.id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked = [];
  const counts = { cat: {}, type: {}, protein: {}, carb: {}, cuisine: {} };

  // Step 1: Guarantee at least ONE quick meal (tag: "quick")
  const quicks = shuffled.filter(m => m.tags.includes("quick"));
  for (const m of quicks) {
    if (tryPick(m, picked, counts, { cat: 2, type: 1, protein: 4, carb: 3, cuisine: 2 })) break;
  }

  // Step 2: Strict pass — diverse cats, proteins, carbs, cuisines
  for (const m of shuffled) {
    if (picked.length >= 10) break;
    if (picked.find(p => p.id === m.id)) continue;
    tryPick(m, picked, counts, { cat: 2, type: 1, protein: 4, carb: 3, cuisine: 2 });
  }

  // Step 3: Relax cuisine + cat caps if still short
  for (const m of shuffled) {
    if (picked.length >= 10) break;
    if (picked.find(p => p.id === m.id)) continue;
    tryPick(m, picked, counts, { type: 1, protein: 5, carb: 4 });
  }

  // Step 4: Fill any remaining spots (just avoid exact type duplicates)
  for (const m of shuffled) {
    if (picked.length >= 10) break;
    if (picked.find(p => p.id === m.id)) continue;
    tryPick(m, picked, counts, { type: 1 });
  }

  // Step 5: Last resort — fill whatever
  for (const m of shuffled) {
    if (picked.length >= 10) break;
    if (picked.find(p => p.id === m.id)) continue;
    picked.push(m);
  }

  return picked.map(m => m.id);
}

// ============ AISLE ORDER ============
const AISLE_ORDER = ["Proteins","Produce","Dairy","Grains","Canned","Frozen","Pantry"];
const AISLE_EMOJI = {Proteins:"\uD83E\uDD69",Produce:"\uD83E\uDD55",Dairy:"\uD83E\uDDC0",Grains:"\uD83C\uDF5E",Canned:"\uD83E\uDD6B",Frozen:"\u2744\uFE0F",Pantry:"\uD83E\uDDC2"};

const STORAGE_KEY = "meal-planner-v3";

// Emoji constants (JSX doesn't interpret \u escapes in text nodes)
const E = {
  check: "\u2713",
  minus: "\u2212",
  clock: "\u23F1",
  bullet: "\u2022",
  ellipsis: "\u2026",
  arrUp: "\u2B06",
  arrDn: "\u2B07",
  arrR: "\u2192",
  arrL: "\u2190",
  meat: "\uD83E\uDD69",
  shuffle: "\uD83D\uDD04",
  cloud: "\u2601",
  baby: "\uD83D\uDC76",
  list: "\uD83D\uDCDD",
  chef: "\uD83D\uDC68\u200D\uD83C\uDF73",
};

// Return the right emoji for a protein string like "3 lbs chicken breast"
function proteinEmoji(protein) {
  const p = protein.toLowerCase();
  if (p.includes("chicken")) return "\uD83C\uDF57";     // poultry leg
  if (p.includes("turkey"))  return "\uD83E\uDD83";     // turkey
  if (p.includes("steak") || p.includes("sirloin") || p.includes("flank") || p.includes("skirt") || p.includes("ribeye")) return "\uD83E\uDD69"; // cut of meat
  if (p.includes("beef"))    return "\uD83C\uDF54";     // burger (ground beef)
  if (p.includes("egg"))     return "\uD83E\uDD5A";     // egg
  return "\uD83E\uDD69"; // default meat
}

// Extract the numeric lbs (or egg count) from protein string like "3 lbs chicken" or "12 eggs"
function getProteinBase(protein) {
  const m = protein.match(/([\d.]+)\s*(lbs?|eggs?)/i);
  if (m) return { amount: parseFloat(m[1]), unit: m[2].toLowerCase().replace(/s$/, "") };
  return { amount: 3, unit: "lb" };
}

// Default portion options — now in SERVINGS (6oz protein per serving)
function portionOptions(protein) {
  const { unit } = getProteinBase(protein);
  if (unit === "egg") return [4, 6, 8, 10, 12, 14, 16, 18, 20]; // eggs stay as count
  return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // servings
}

// Convert servings -> lbs for meats (6 oz per serving)
function servingsToLbs(servings) {
  return Math.round((servings * 6 / 16) * 4) / 4; // round to nearest 0.25 lb
}

// Grams of protein per unit (lb of meat, or per egg)
function proteinGramsPer(proteinStr) {
  const p = proteinStr.toLowerCase();
  if (p.includes("egg")) return 6;                // per egg
  if (p.includes("chicken breast")) return 115;   // per lb
  if (p.includes("ground chicken")) return 100;
  if (p.includes("ground turkey")) return 100;
  if (p.includes("ground beef")) return 95;
  if (p.includes("steak") || p.includes("sirloin") || p.includes("flank") || p.includes("skirt") || p.includes("ribeye")) return 100;
  if (p.includes("chicken")) return 110;          // generic chicken
  return 100;                                      // generic meat
}

// Calorie lookup: item (lowercase, substring match) -> { kcal per 1 of unit, unit }
// Unit types: "lb", "cup", "tbsp", "tsp", "each", "oz", "can", "jar", "bottle", "packet", "slice", "clove"
// Special: protein items priced per lb. "each" items assume standard size.
const CAL_DB = [
  // Proteins (per lb)
  { match: ["chicken breast"], per: "lb", kcal: 750 },
  { match: ["chicken tender"], per: "lb", kcal: 750 },
  { match: ["chicken cutlet"], per: "lb", kcal: 750 },
  { match: ["chicken thigh"], per: "lb", kcal: 900 },
  { match: ["chicken drumstick"], per: "lb", kcal: 760 },
  { match: ["ground chicken"], per: "lb", kcal: 700 },
  { match: ["ground turkey"], per: "lb", kcal: 760 },
  { match: ["ground beef"], per: "lb", kcal: 1200 }, // 80/20
  { match: ["steak", "sirloin", "flank", "skirt", "ribeye"], per: "lb", kcal: 1100 },
  { match: ["turkey bacon"], per: "slice", kcal: 35 },

  // Dairy & eggs
  { match: ["eggs"], per: "each", kcal: 72 },
  { match: ["butter"], per: "tbsp", kcal: 100 },
  { match: ["heavy cream"], per: "cup", kcal: 800 },
  { match: ["sour cream"], per: "cup", kcal: 450 },
  { match: ["greek yogurt"], per: "cup", kcal: 150 },
  { match: ["milk"], per: "cup", kcal: 150 },
  { match: ["shredded cheese", "mozzarella", "cheese slice", "fresh mozzarella"], per: "cup", kcal: 440 },
  { match: ["parmesan"], per: "cup", kcal: 430 },
  { match: ["feta"], per: "cup", kcal: 400 },
  { match: ["ricotta"], per: "cup", kcal: 400 },

  // Grains & starches (per cup dry / per piece)
  { match: ["white rice", "basmati rice"], per: "cup", kcal: 675 }, // dry
  { match: ["pouch", "microwave"], per: "each", kcal: 200 }, // rice pouch
  { match: ["penne", "spaghetti", "rotini", "fettuccine", "ziti", "macaroni", "bowtie", "pappardelle", "lasagna", "orzo", "egg noodle", "lo mein", "chow mein", "yakisoba", "angel hair", "rice noodle"], per: "box", kcal: 1600 },
  { match: ["large tortilla"], per: "each", kcal: 210 },
  { match: ["tortilla"], per: "each", kcal: 140 },
  { match: ["buns", "slider"], per: "each", kcal: 150 },
  { match: ["english muffin"], per: "each", kcal: 130 },
  { match: ["pita"], per: "each", kcal: 170 },
  { match: ["sourdough", "crusty bread"], per: "loaf", kcal: 1600 },
  { match: ["waffle"], per: "each", kcal: 95 },
  { match: ["pancake mix"], per: "box", kcal: 2200 },
  { match: ["biscuit"], per: "each", kcal: 180 },
  { match: ["cornbread"], per: "box", kcal: 1500 },
  { match: ["polenta"], per: "lb", kcal: 620 },
  { match: ["breadcrumb"], per: "cup", kcal: 430 },
  { match: ["tortilla chips"], per: "bag", kcal: 1800 },

  // Potatoes (whole)
  { match: ["baby potato", "yukon potato", "russet potato"], per: "each", kcal: 110 },
  { match: ["potatoes"], per: "each", kcal: 160 },
  { match: ["sweet potato"], per: "each", kcal: 130 },
  { match: ["frozen fries"], per: "bag", kcal: 2400 },

  // Veggies
  { match: ["broccoli"], per: "head", kcal: 150 },
  { match: ["bell pepper"], per: "each", kcal: 35 },
  { match: ["carrot"], per: "each", kcal: 25 },
  { match: ["spinach"], per: "cup", kcal: 10 },
  { match: ["green bean"], per: "cup", kcal: 35 },
  { match: ["zucchini"], per: "each", kcal: 35 },
  { match: ["mushroom"], per: "cup", kcal: 20 },
  { match: ["cabbage"], per: "head", kcal: 230 },
  { match: ["cherry tomato"], per: "pint", kcal: 80 },
  { match: ["tomato"], per: "each", kcal: 25 },
  { match: ["lettuce"], per: "head", kcal: 50 },
  { match: ["cucumber"], per: "each", kcal: 45 },
  { match: ["avocado"], per: "each", kcal: 240 },
  { match: ["corn"], per: "bag", kcal: 400 },
  { match: ["peas"], per: "cup", kcal: 120 },
  { match: ["celery"], per: "stalk", kcal: 10 },
  { match: ["pear"], per: "each", kcal: 100 },
  { match: ["lemon", "lime"], per: "each", kcal: 20 },

  // Frozen items
  { match: ["frozen broccoli"], per: "bag", kcal: 280 },
  { match: ["frozen stir-fry"], per: "bag", kcal: 280 },
  { match: ["frozen veggie"], per: "bag", kcal: 280 },
  { match: ["frozen peas"], per: "cup", kcal: 120 },

  // Cans / jars / beans / sauces
  { match: ["black beans"], per: "can", kcal: 350 },
  { match: ["kidney bean", "white bean", "pinto"], per: "can", kcal: 400 },
  { match: ["crushed tomato", "diced tomato", "tomato sauce", "tomato paste"], per: "can", kcal: 100 },
  { match: ["marinara"], per: "jar", kcal: 400 },
  { match: ["salsa"], per: "jar", kcal: 120 },
  { match: ["pesto"], per: "jar", kcal: 900 },
  { match: ["bbq sauce"], per: "bottle", kcal: 800 },
  { match: ["teriyaki", "stir-fry sauce", "pad thai", "yakisoba", "tikka masala", "simmer sauce"], per: "bottle", kcal: 500 },
  { match: ["ranch"], per: "bottle", kcal: 2000 },
  { match: ["cream of chicken"], per: "can", kcal: 260 },
  { match: ["soy sauce"], per: "tbsp", kcal: 10 },
  { match: ["hoisin"], per: "tbsp", kcal: 35 },
  { match: ["fish sauce"], per: "tbsp", kcal: 10 },
  { match: ["vinegar"], per: "tbsp", kcal: 5 },
  { match: ["syrup"], per: "bottle", kcal: 1800 },
  { match: ["honey"], per: "tbsp", kcal: 65 },
  { match: ["balsamic glaze"], per: "bottle", kcal: 1200 },
  { match: ["capers"], per: "jar", kcal: 30 },
  { match: ["pickles", "jalapenos"], per: "jar", kcal: 50 },
  { match: ["water chestnut"], per: "can", kcal: 120 },
  { match: ["hummus"], per: "cup", kcal: 400 },

  // Fats & oils
  { match: ["olive oil", "sesame oil", "vegetable oil"], per: "tbsp", kcal: 120 },

  // Seasonings (mostly negligible)
  { match: ["salt", "pepper", "garlic powder", "paprika", "cumin", "oregano", "italian seasoning", "chili powder", "cajun", "fajita seasoning", "taco seasoning"], per: "packet", kcal: 30 },
  { match: ["brown sugar", "sugar"], per: "cup", kcal: 770 },
  { match: ["flour"], per: "cup", kcal: 455 },
  { match: ["cornstarch"], per: "tbsp", kcal: 30 },
  { match: ["cocoa powder"], per: "tbsp", kcal: 12 },

  // Nuts, herbs, misc
  { match: ["peanuts"], per: "cup", kcal: 830 },
  { match: ["sesame seeds"], per: "tbsp", kcal: 50 },
  { match: ["bean sprouts"], per: "cup", kcal: 30 },
  { match: ["parsley", "basil", "cilantro", "dill", "rosemary", "thyme"], per: "bunch", kcal: 10 },
  { match: ["ginger"], per: "each", kcal: 5 }, // per piece/knob
  { match: ["garlic"], per: "clove", kcal: 5 },

  // Broth (mostly water)
  { match: ["broth"], per: "cup", kcal: 15 },
  { match: ["bay leaves"], per: "bunch", kcal: 5 },

  // Condiments & misc
  { match: ["ketchup"], per: "tbsp", kcal: 20 },
  { match: ["mustard", "dijon"], per: "tbsp", kcal: 10 },
  { match: ["worcestershire"], per: "tbsp", kcal: 15 },
  { match: ["hot sauce", "sriracha"], per: "tbsp", kcal: 5 },
  { match: ["enchilada sauce"], per: "can", kcal: 200 },
  { match: ["orange juice"], per: "cup", kcal: 110 },
  { match: ["vanilla"], per: "tsp", kcal: 12 },
  { match: ["whipped cream"], per: "cup", kcal: 400 },
  { match: ["berries"], per: "cup", kcal: 60 },
  { match: ["mixed greens"], per: "cup", kcal: 15 },
  { match: ["naan"], per: "each", kcal: 260 },
  { match: ["taco shell"], per: "each", kcal: 60 },
];

// Parse a quantity string into { count, unit } — unit normalized to match CAL_DB
function parseQtyAmount(qtyStr) {
  if (!qtyStr || typeof qtyStr !== "string") return { count: 1, unit: "each" };
  const q = qtyStr.toLowerCase().trim();

  // Parse leading number (fraction, mixed, decimal)
  function parseNum(str) {
    str = str.trim();
    const mixed = str.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (mixed) return parseInt(mixed[1]) + parseInt(mixed[2]) / parseInt(mixed[3]);
    const frac = str.match(/^(\d+)\/(\d+)$/);
    if (frac) return parseInt(frac[1]) / parseInt(frac[2]);
    const n = parseFloat(str);
    return isNaN(n) ? null : n;
  }
  const m = q.match(/^([\d./\s]+?)(\s|$)(.*)/);
  if (!m) return { count: 1, unit: "each" };
  const count = parseNum(m[1].trim()) ?? 1;
  const rest = (m[3] || "").trim();

  // Map rest string to a unit
  if (!rest) return { count, unit: "each" };
  if (/^lb/i.test(rest)) return { count, unit: "lb" };
  if (/^oz/i.test(rest)) return { count: count / 16, unit: "lb" }; // convert oz to lb
  if (/^cup/i.test(rest)) return { count, unit: "cup" };
  if (/^tbsp/i.test(rest)) return { count, unit: "tbsp" };
  if (/^tsp/i.test(rest)) return { count, unit: "tsp" };
  if (/^can/i.test(rest)) return { count, unit: "can" };
  if (/^jar/i.test(rest)) return { count, unit: "jar" };
  if (/^bottle/i.test(rest)) return { count, unit: "bottle" };
  if (/^bag/i.test(rest)) return { count, unit: "bag" };
  if (/^box/i.test(rest)) return { count, unit: "box" };
  if (/^packet/i.test(rest)) return { count, unit: "packet" };
  if (/^pouch/i.test(rest)) return { count, unit: "each" };
  if (/^slice/i.test(rest)) return { count, unit: "slice" };
  if (/^clove/i.test(rest)) return { count, unit: "clove" };
  if (/^head/i.test(rest)) return { count, unit: "head" };
  if (/^stalk/i.test(rest)) return { count, unit: "stalk" };
  if (/^pint/i.test(rest)) return { count, unit: "pint" };
  if (/^loaf|loaves/i.test(rest)) return { count, unit: "loaf" };
  if (/^stick/i.test(rest)) return { count: count * 8, unit: "tbsp" }; // 1 stick butter = 8 tbsp
  if (/^bunch/i.test(rest)) return { count, unit: "bunch" };
  if (/^pack/i.test(rest)) return { count, unit: "bag" }; // treat as bag
  if (/^large|small|medium/i.test(rest)) return { count, unit: "each" };
  if (/^pinch/i.test(rest)) return { count: 0.05, unit: "tsp" };
  return { count, unit: "each" };
}

// Estimate kcal for one ingredient given its qty string
function ingredientKcal(item, qtyStr) {
  if (!item || !qtyStr) return 0;
  const itemLower = item.toLowerCase();

  // Find matching CAL_DB entry
  let entry = null;
  for (const e of CAL_DB) {
    if (e.match.some(m => itemLower.includes(m))) { entry = e; break; }
  }
  if (!entry) return 0; // unknown — skip

  const { count, unit } = parseQtyAmount(qtyStr);

  // If units match, simple multiplication
  if (unit === entry.per) return Math.round(count * entry.kcal);

  // Some unit conversions we can handle
  if (entry.per === "tbsp" && unit === "tsp") return Math.round(count / 3 * entry.kcal);
  if (entry.per === "tbsp" && unit === "cup") return Math.round(count * 16 * entry.kcal);
  if (entry.per === "cup" && unit === "tbsp") return Math.round(count / 16 * entry.kcal);
  if (entry.per === "cup" && unit === "tsp") return Math.round(count / 48 * entry.kcal);

  // Fallback: count * entry kcal (rough)
  return Math.round(count * entry.kcal);
}

// For certain "countable" meals (burritos, burgers, tacos, stuffed things), compute how many 
// individual items are produced at a given scaling factor. Returns { count, label } or null.
function mealYield(meal, factor) {
  const name = meal.name.toLowerCase();
  const findIng = (keywords) => meal.ingredients.find(ing => {
    const it = ing.item.toLowerCase();
    return keywords.some(k => it.includes(k));
  });
  const parseCount = (qty) => {
    const m = qty.match(/^([\d.]+)/);
    return m ? parseFloat(m[1]) : 0;
  };

  if ((name.includes("burrito") && !name.includes("bowl")) || name.includes("wrap")) {
    const tort = findIng(["tortilla"]);
    if (tort) return { count: Math.ceil(parseCount(tort.qty) * factor), label: name.includes("wrap") ? "wraps" : "burritos" };
  }
  if (name.includes("quesadilla")) {
    const tort = findIng(["tortilla"]);
    if (tort) return { count: Math.floor(parseCount(tort.qty) * factor / 2), label: "quesadillas" };
  }
  if (name.includes("taco") && !name.includes("bowl") && !name.includes("skillet") && !name.includes("pasta")) {
    const shells = findIng(["taco shell", "corn tortilla"]);
    if (shells) return { count: Math.ceil(parseCount(shells.qty) * factor), label: "tacos" };
    const tort = findIng(["tortilla"]);
    if (tort) return { count: Math.ceil(parseCount(tort.qty) * factor), label: "tacos" };
  }
  if (name.includes("burger") || name.includes("sloppy joe")) {
    const buns = findIng(["bun"]);
    if (buns) return { count: Math.ceil(parseCount(buns.qty) * factor), label: name.includes("sloppy") ? "sloppy joes" : "burgers" };
  }
  if (name.includes("slider")) {
    const sliderBuns = findIng(["slider"]);
    if (sliderBuns) return { count: Math.ceil(parseCount(sliderBuns.qty) * factor), label: "sliders" };
  }
  if (name.includes("stuffed pepper")) {
    const peppers = meal.ingredients.find(ing => ing.item.toLowerCase().includes("bell pepper") && /large/i.test(ing.qty));
    if (peppers) return { count: Math.ceil(parseCount(peppers.qty) * factor), label: "stuffed peppers" };
  }
  if (name.includes("zucchini boat")) {
    const z = findIng(["zucchini"]);
    if (z) return { count: Math.ceil(parseCount(z.qty) * factor) * 2, label: "boats" };
  }
  if (name.includes("drumstick")) {
    const d = findIng(["drumstick"]);
    if (d) {
      const lbs = parseCount(d.qty) * factor;
      return { count: Math.round(lbs * 2), label: "drumsticks" };
    }
  }
  return null;
}

// Estimate number of "normal" 6oz servings this meal produces at a given scale
// Eggs = ~2 per serving (so 12 eggs = 6 servings)
function mealServings(meal, factor) {
  const base = getProteinBase(meal.protein);
  if (base.unit === "egg") {
    return Math.max(1, Math.round((base.amount * factor) / 2));
  }
  // Meat: 1 lb = 16 oz, 6 oz per serving = ~2.67 servings per lb
  return Math.max(1, Math.round((base.amount * factor * 16) / 6));
}

// Total calories for a meal given scaling factor
function mealKcal(meal, factor) {
  let total = 0;
  meal.ingredients.forEach(ing => {
    const scaled = scaleQty(ing.qty, factor);
    total += ingredientKcal(ing.item, scaled);
  });
  return total;
}

// Scale an ingredient qty string by a factor. Handles fractions, ranges, and text like "small bunch".
// Try to extract a cook-time duration from a step string. Returns seconds or null.
// Picks the LONGEST time mentioned (e.g. "cook 8 min" -> 480). If the step says something
// like "2 min per side" we take 2 min. Ignores ranges by taking the upper number.
function extractTimerSeconds(step) {
  if (!step) return null;
  const lower = step.toLowerCase();
  // Skip "rest X min" and "marinate X min" - those aren't active cooking but are still timer-worthy
  // actually those ARE timer-worthy, keep them
  const matches = [...lower.matchAll(/(\d+)(?:\s*-\s*(\d+))?\s*(min|minute|minutes|sec|second|seconds|hr|hour|hours)/g)];
  if (matches.length === 0) return null;
  let best = 0;
  for (const m of matches) {
    const upper = m[2] ? parseInt(m[2]) : parseInt(m[1]);
    let secs = upper;
    if (/min/.test(m[3])) secs = upper * 60;
    else if (/hr|hour/.test(m[3])) secs = upper * 3600;
    if (secs > best) best = secs;
  }
  return best > 0 ? best : null;
}

function scaleQty(qty, factor) {
  if (factor === 1) return qty;
  if (!qty || typeof qty !== "string") return qty;

  // Don't scale "to taste", "small bunch", etc.
  if (/^(to taste|small bunch|pinch|small|large)/i.test(qty.trim())) return qty;

  // Handle fractions like "1/2", "1 1/2"
  function parseNum(str) {
    str = str.trim();
    const mixed = str.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (mixed) return parseInt(mixed[1]) + parseInt(mixed[2]) / parseInt(mixed[3]);
    const frac = str.match(/^(\d+)\/(\d+)$/);
    if (frac) return parseInt(frac[1]) / parseInt(frac[2]);
    const n = parseFloat(str);
    return isNaN(n) ? null : n;
  }

  function formatNum(n) {
    if (n >= 1 && Math.abs(n - Math.round(n)) < 0.05) return String(Math.round(n));
    // common fractions
    const fracs = [[0.25,"1/4"],[0.33,"1/3"],[0.5,"1/2"],[0.67,"2/3"],[0.75,"3/4"]];
    const whole = Math.floor(n);
    const rem = n - whole;
    for (const [val, str] of fracs) {
      if (Math.abs(rem - val) < 0.06) return whole > 0 ? `${whole} ${str}` : str;
    }
    // round to 1 decimal
    return (Math.round(n * 10) / 10).toString().replace(/\.0$/, "");
  }

  // Round a number to nearest half (for cups) - smoother than fractions
  function roundHalf(n) {
    return Math.round(n * 2) / 2;
  }

  // Match leading number (possibly with fraction) at start
  const m = qty.match(/^([\d./\s]+?)(\s|$)(.*)/);
  if (!m) return qty;
  const numPart = m[1].trim();
  const rest = (m[3] || "").trim();
  const parsed = parseNum(numPart);
  if (parsed === null) return qty;

  const scaled = parsed * factor;

  // "Capacity" units - one container is usually plenty for multiple meals.
  // Only scale up when factor demands a full additional container (>= 1.75x).
  const capacityUnits = /^(jar|jars|bottle|bottles|packet|packets|bag|bags|box|boxes|loaf|loaves|stick|sticks|head|heads|pack|packs)/i;
  if (capacityUnits.test(rest) && parsed === 1) {
    if (factor < 1.75) return `1 ${rest}`; // don't scale up
    const containerCount = Math.ceil(factor / 1);
    return `${containerCount} ${rest}`;
  }

  // Round up to whole number for count-like quantities (you can't buy half a potato)
  const wholeItemUnits = /^(clove|cloves|stalk|stalks|pint|pints|can|cans|slice|slices|sprig|sprigs|bunch|bunches|large|medium|small)/i;
  if (!rest || wholeItemUnits.test(rest)) {
    return rest ? `${Math.ceil(scaled)} ${rest}` : String(Math.ceil(scaled));
  }

  // Cups, tbsp, tsp - round cups to nearest 1/2 for readability (not exotic fractions like 2 2/3)
  if (/^cup/i.test(rest)) {
    const halved = roundHalf(scaled);
    return `${formatNum(halved)} ${rest}`;
  }

  // Also scale any number inside parens, e.g. "6 breasts (3 lbs)" -> "8 breasts (4 lbs)"
  let restOut = rest;
  restOut = restOut.replace(/\((\d+(?:\.\d+)?(?:\s+\d+\/\d+)?|\d+\/\d+)\s*([a-zA-Z]*)\)/g, (full, numStr, unit) => {
    const inner = parseNum(numStr);
    if (inner === null) return full;
    const innerScaled = inner * factor;
    return `(${formatNum(innerScaled)}${unit ? " " + unit : ""})`;
  });

  const formatted = formatNum(scaled);
  return `${formatted} ${restOut}`;
}

// ============ MAIN COMPONENT ============
export default function MealPlanner() {
  const [step, setStep] = useState(1);
  const [week, setWeek] = useState([]);
  const [selected, setSelected] = useState([]);
  const [locked, setLocked] = useState(false);
  const [pantry, setPantry] = useState([]);
  const [checkedShop, setCheckedShop] = useState([]);
  const [portions, setPortions] = useState({});
  const [viewMode, setViewMode] = useState("shop");
  const [openRecipe, setOpenRecipe] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [toast, setToast] = useState("");
  const [confirmNew, setConfirmNew] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [browseSearch, setBrowseSearch] = useState("");
  const [browseFilter, setBrowseFilter] = useState("all");
  const [browseDetail, setBrowseDetail] = useState(null);
  const [finderOpen, setFinderOpen] = useState(false);
  const [finderIngredients, setFinderIngredients] = useState([]);
  const [cameFromFinder, setCameFromFinder] = useState(false);
  const [babyMode, setBabyMode] = useState(true);
  const [defaultPortion, setDefaultPortion] = useState(6);
  const [customItems, setCustomItems] = useState([]);
  const [showCustomAdd, setShowCustomAdd] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [haveAllForMeals, setHaveAllForMeals] = useState([]);
  const [cookMealId, setCookMealId] = useState(null);
  const [cookStep, setCookStep] = useState(0);
  const [cookTimers, setCookTimers] = useState([]); // array of { id, label, seconds, startedAt }
  const [cookTimerTick, setCookTimerTick] = useState(0);

  const R = useRef({ step: 1, week: [], selected: [], locked: false, pantry: [], checkedShop: [], portions: {} });
  const loaded = useRef(false);

  // Tick the cook timer every second when any timer is active
  useEffect(() => {
    if (cookTimers.length === 0) return;
    const id = setInterval(() => setCookTimerTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [cookTimers.length]);

  // Beep when ANY timer reaches zero (only once per timer)
  const beepedTimersRef = useRef(new Set());
  useEffect(() => {
    if (cookTimers.length === 0) return;
    cookTimers.forEach(t => {
      const elapsed = Math.floor((Date.now() - t.startedAt) / 1000);
      const remaining = t.seconds - elapsed;
      if (remaining <= 0 && !beepedTimersRef.current.has(t.id)) {
        beepedTimersRef.current.add(t.id);
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 880;
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.5);
          if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        } catch (e) {}
      }
    });
  }, [cookTimerTick, cookTimers]);

  // ESC key closes the topmost overlay
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (cookMealId !== null) { closeCookMode(); return; }
      if (browseDetail !== null) { setBrowseDetailAndPersist(null); return; }
      if (browseOpen) { setBrowseOpenAndPersist(false); setBrowseSearch(""); setCameFromFinder(false); return; }
      if (finderOpen) { setFinderOpen(false); return; }
      if (showImport) { setShowImport(false); setImportText(""); return; }
      if (menuOpen) { setMenuOpen(false); return; }
      if (confirmNew) { setConfirmNew(false); return; }
      if (confirmReset) { setConfirmReset(false); return; }
      if (showCustomAdd) { setShowCustomAdd(false); setCustomInput(""); return; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cookMealId, browseDetail, browseOpen, finderOpen, showImport, menuOpen, confirmNew, confirmReset, showCustomAdd]);

  // Migration: v6 and earlier stored portions in LBS; v7+ stores in SERVINGS.
  // Convert lbs -> servings (1 lb = ~2.67 servings at 6oz) for meats only.
  // Snap to available dropdown values to avoid odd numbers.
  function snapToOptions(n, options) {
    let best = options[0];
    let bestDiff = Math.abs(n - best);
    for (const o of options) {
      const d = Math.abs(n - o);
      if (d < bestDiff) { best = o; bestDiff = d; }
    }
    return best;
  }
  function migrateDefault(val, ver) {
    if (val === undefined || val === null) return 6;
    if (ver && ver >= 7) return val; // already servings
    // Old lbs options were only 1.5 to 5. So any value > 5 must already be servings.
    if (val > 5) return val;
    // Actual old lbs -> convert to servings
    return snapToOptions(val * 16 / 6, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  }
  function migratePortions(pmap, ver) {
    if (!pmap) return {};
    if (ver && ver >= 7) return pmap;
    const out = {};
    Object.keys(pmap).forEach(k => {
      const v = pmap[k];
      // Old meat lbs range: 1.5-5. New servings range: 2-14. Old eggs range: 6-20.
      // Values > 5 are either new servings or egg counts - leave alone
      if (v <= 5) {
        out[k] = snapToOptions(v * 16 / 6, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
      } else {
        out[k] = v;
      }
    });
    return out;
  }

  // Load on mount
  useEffect(() => {
    let data = null;
    try {
      const ls = localStorage.getItem(STORAGE_KEY);
      if (ls) data = JSON.parse(ls);
    } catch (e) {}
    if (data && data.week && data.week.length) {
      R.current = { ...R.current, ...data };
      setStep(data.step || 1);
      setWeek(data.week || []);
      setSelected(data.selected || []);
      setLocked(!!data.locked);
      setPantry(data.pantry || []);
      setCheckedShop(data.checkedShop || []);
      setPortions(migratePortions(data.portions || {}, data._v));
      setBabyMode(data.babyMode !== undefined ? data.babyMode : true);
      R.current.babyMode = data.babyMode !== undefined ? data.babyMode : true;
      setDefaultPortion(migrateDefault(data.defaultPortion, data._v));
      R.current.defaultPortion = migrateDefault(data.defaultPortion, data._v);
      setCustomItems(data.customItems || []);
      R.current.customItems = data.customItems || [];
      setViewMode(data.viewMode || "shop");
      R.current.viewMode = data.viewMode || "shop";
      setOpenRecipe(data.openRecipe !== undefined ? data.openRecipe : null);
      R.current.openRecipe = data.openRecipe !== undefined ? data.openRecipe : null;
      setBrowseOpen(!!data.browseOpen);
      R.current.browseOpen = !!data.browseOpen;
      setBrowseDetail(data.browseDetail !== undefined ? data.browseDetail : null);
      R.current.browseDetail = data.browseDetail !== undefined ? data.browseDetail : null;
      setHaveAllForMeals(data.haveAllForMeals || []);
      R.current.haveAllForMeals = data.haveAllForMeals || [];
      loaded.current = true;
      return;
    }
    // Try window.storage async
    (async () => {
      try {
        if (window.storage) {
          const r = await window.storage.get(STORAGE_KEY);
          if (r && r.value) {
            const d = JSON.parse(r.value);
            if (d && d.week && d.week.length) {
              R.current = { ...R.current, ...d };
              setStep(d.step || 1);
              setWeek(d.week || []);
              setSelected(d.selected || []);
              setLocked(!!d.locked);
              setPantry(d.pantry || []);
              setCheckedShop(d.checkedShop || []);
              setPortions(migratePortions(d.portions || {}, d._v));
              setBabyMode(d.babyMode !== undefined ? d.babyMode : true);
              R.current.babyMode = d.babyMode !== undefined ? d.babyMode : true;
              setDefaultPortion(migrateDefault(d.defaultPortion, d._v));
              R.current.defaultPortion = migrateDefault(d.defaultPortion, d._v);
              setCustomItems(d.customItems || []);
              R.current.customItems = d.customItems || [];
              setViewMode(d.viewMode || "shop");
              R.current.viewMode = d.viewMode || "shop";
              setOpenRecipe(d.openRecipe !== undefined ? d.openRecipe : null);
              R.current.openRecipe = d.openRecipe !== undefined ? d.openRecipe : null;
              setBrowseOpen(!!d.browseOpen);
              R.current.browseOpen = !!d.browseOpen;
              setBrowseDetail(d.browseDetail !== undefined ? d.browseDetail : null);
              R.current.browseDetail = d.browseDetail !== undefined ? d.browseDetail : null;
              setHaveAllForMeals(d.haveAllForMeals || []);
              R.current.haveAllForMeals = d.haveAllForMeals || [];
              loaded.current = true;
              return;
            }
          }
        }
      } catch (e) {}
      // Fresh start
      const fresh = pickDiverseWeek();
      R.current.week = fresh;
      setWeek(fresh);
      loaded.current = true;
      persist();
    })();
  }, []);

  function persist() {
    const data = { ...R.current, _ts: Date.now() };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
    try {
      if (window.storage) window.storage.set(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  // === HANDLERS ===
  function toggleSelect(id) {
    if (R.current.locked) return;
    const cur = R.current.selected;
    const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
    R.current.selected = next;
    setSelected(next);
    persist();
  }

  function shuffle() {
    if (R.current.locked) return;
    const fresh = pickDiverseWeek(R.current.week);
    R.current.week = fresh;
    R.current.selected = [];
    setWeek(fresh);
    setSelected([]);
    persist();
  }

  function saveSelections() {
    if (R.current.selected.length === 0) { showToast("Pick at least one meal"); return; }
    R.current.locked = true;
    setLocked(true);
    persist();
  }

  function unlock() {
    R.current.locked = false;
    setLocked(false);
    persist();
  }

  function goToStep(n) {
    R.current.step = n;
    setStep(n);
    persist();
  }

  function togglePantry(item) {
    const cur = R.current.pantry;
    const next = cur.includes(item) ? cur.filter(x => x !== item) : [...cur, item];
    R.current.pantry = next;
    setPantry(next);
    persist();
  }

  function toggleShop(item) {
    const cur = R.current.checkedShop;
    const next = cur.includes(item) ? cur.filter(x => x !== item) : [...cur, item];
    R.current.checkedShop = next;
    setCheckedShop(next);
    persist();
  }

  function setPortion(mealId, amount) {
    const next = { ...R.current.portions, [mealId]: amount };
    R.current.portions = next;
    setPortions(next);
    persist();
  }

  function addMealToWeek(mealId) {
    const curWeek = R.current.week;
    const curSel = R.current.selected;
    const nextWeek = curWeek.includes(mealId) ? curWeek : [...curWeek, mealId];
    const nextSel = curSel.includes(mealId) ? curSel : [...curSel, mealId];
    R.current.week = nextWeek;
    R.current.selected = nextSel;
    setWeek(nextWeek);
    setSelected(nextSel);
    persist();
    showToast("Added to your week");
  }

  function removeMealFromWeek(mealId) {
    const nextSel = R.current.selected.filter(id => id !== mealId);
    R.current.selected = nextSel;
    setSelected(nextSel);
    persist();
    showToast("Removed from your week");
  }

  function shareMeal(meal) {
    const factor = factorFor(meal);
    const text = [
      meal.name,
      "",
      "Ingredients:",
      ...meal.ingredients.map(ing => `- ${scaleQty(ing.qty, factor)} ${ing.item}`),
      "",
      "Steps:",
      ...meal.steps.map((s, i) => `${i+1}. ${s}`),
    ].join("\n");
    if (navigator.share) {
      navigator.share({ title: meal.name, text }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => showToast("Recipe copied!"),
        () => showToast("Couldn't copy — try sharing manually")
      );
    } else {
      showToast("Sharing not supported on this browser");
    }
  }

  function toggleBabyMode() {
    const next = !R.current.babyMode;
    R.current.babyMode = next;
    setBabyMode(next);
    persist();
  }

  function setDefaultPortionValue(amount) {
    R.current.defaultPortion = amount;
    setDefaultPortion(amount);
    persist();
  }

  function setViewModeAndPersist(mode) {
    R.current.viewMode = mode;
    setViewMode(mode);
    persist();
  }

  function setOpenRecipeAndPersist(id) {
    R.current.openRecipe = id;
    setOpenRecipe(id);
    persist();
  }

  function setBrowseOpenAndPersist(v) {
    R.current.browseOpen = v;
    setBrowseOpen(v);
    persist();
  }

  function setBrowseDetailAndPersist(id) {
    R.current.browseDetail = id;
    setBrowseDetail(id);
    persist();
  }

  function addCustomItem(text) {
    const trimmed = (text || "").trim();
    if (!trimmed) return;
    // Support multi-line: split on newlines and commas
    const items = trimmed.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    const existing = R.current.customItems || [];
    const next = [...existing];
    items.forEach(it => {
      if (!next.some(x => x.text.toLowerCase() === it.toLowerCase())) {
        next.push({ text: it, id: Date.now() + Math.random() });
      }
    });
    R.current.customItems = next;
    setCustomItems(next);
    persist();
  }

  function removeCustomItem(id) {
    const next = (R.current.customItems || []).filter(x => x.id !== id);
    R.current.customItems = next;
    setCustomItems(next);
    persist();
  }

  function toggleHaveAll(mealId) {
    const cur = R.current.haveAllForMeals || [];
    const next = cur.includes(mealId) ? cur.filter(id => id !== mealId) : [...cur, mealId];
    R.current.haveAllForMeals = next;
    setHaveAllForMeals(next);
    persist();
  }

  function openCookMode(mealId) {
    setCookMealId(mealId);
    setCookStep(0);
    setCookTimers([]);
    beepedTimersRef.current = new Set();
  }

  function closeCookMode() {
    setCookMealId(null);
    setCookStep(0);
    setCookTimers([]);
    beepedTimersRef.current = new Set();
  }

  function startCookTimer(seconds, label) {
    const newTimer = { id: Date.now() + Math.random(), label: label || "Timer", seconds, startedAt: Date.now() };
    setCookTimers(prev => [...prev, newTimer]);
    setCookTimerTick(0);
  }

  function dismissCookTimer(timerId) {
    setCookTimers(prev => prev.filter(t => t.id !== timerId));
    beepedTimersRef.current.delete(timerId);
  }

  function startNewWeek() {
    const fresh = pickDiverseWeek(R.current.week);
    // Preserve "settings" type values across weeks
    const keepBaby = R.current.babyMode !== undefined ? R.current.babyMode : true;
    const keepDefault = R.current.defaultPortion !== undefined ? R.current.defaultPortion : 6;
    const keepCustom = R.current.customItems || [];
    R.current = { step: 1, week: fresh, selected: [], locked: false, pantry: [], checkedShop: [], portions: {}, babyMode: keepBaby, defaultPortion: keepDefault, customItems: keepCustom, viewMode: "shop", openRecipe: null, browseOpen: false, browseDetail: null, haveAllForMeals: [] };
    setStep(1);
    setWeek(fresh);
    setSelected([]);
    setLocked(false);
    setPantry([]);
    setCheckedShop([]);
    setPortions({});
    setViewMode("shop");
    setOpenRecipe(null);
    setHaveAllForMeals([]);
    setConfirmNew(false);
    setMenuOpen(false);
    persist();
  }

  function resetWeek() {
    R.current.pantry = [];
    R.current.checkedShop = [];
    setPantry([]);
    setCheckedShop([]);
    setConfirmReset(false);
    setMenuOpen(false);
    showToast("Pantry & shopping reset");
    persist();
  }

  // === BACKUP / RESTORE (copy-paste, works in sandbox) ===
  function generateBackupText() {
    const data = {
      step: R.current.step,
      week: R.current.week,
      selected: R.current.selected,
      locked: R.current.locked,
      pantry: R.current.pantry,
      checkedShop: R.current.checkedShop,
      portions: R.current.portions || {},
      babyMode: R.current.babyMode !== undefined ? R.current.babyMode : true,
      defaultPortion: R.current.defaultPortion !== undefined ? R.current.defaultPortion : 6,
      customItems: R.current.customItems || [],
      viewMode: R.current.viewMode || "shop",
      openRecipe: R.current.openRecipe !== undefined ? R.current.openRecipe : null,
      browseOpen: !!R.current.browseOpen,
      browseDetail: R.current.browseDetail !== undefined ? R.current.browseDetail : null,
      haveAllForMeals: R.current.haveAllForMeals || [],
      _ts: Date.now(),
      _v: 9,
    };
    return JSON.stringify(data);
  }

  function copyBackup() {
    const text = generateBackupText();
    setImportText(text);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          () => showToast("Copied! Paste into Drive/Notes"),
          () => showToast("Tap text below to copy manually")
        );
      } else {
        showToast("Tap text below to copy manually");
      }
    } catch (e) {
      showToast("Tap text below to copy manually");
    }
  }

  function restoreFromText() {
    const text = importText.trim();
    if (!text) { showToast("Paste your backup code first"); return; }
    try {
      const d = JSON.parse(text);
      if (!d || !d.week || !Array.isArray(d.week)) {
        showToast("Invalid backup code");
        return;
      }
      R.current = {
        step: d.step || 1,
        week: d.week || [],
        selected: d.selected || [],
        locked: !!d.locked,
        pantry: d.pantry || [],
        checkedShop: d.checkedShop || [],
        portions: migratePortions(d.portions || {}, d._v),
        babyMode: d.babyMode !== undefined ? d.babyMode : true,
        defaultPortion: migrateDefault(d.defaultPortion, d._v),
        customItems: d.customItems || [],
        viewMode: d.viewMode || "shop",
        openRecipe: d.openRecipe !== undefined ? d.openRecipe : null,
        browseOpen: !!d.browseOpen,
        browseDetail: d.browseDetail !== undefined ? d.browseDetail : null,
        haveAllForMeals: d.haveAllForMeals || [],
      };
      setStep(R.current.step);
      setWeek(R.current.week);
      setSelected(R.current.selected);
      setLocked(R.current.locked);
      setPantry(R.current.pantry);
      setCheckedShop(R.current.checkedShop);
      setPortions(R.current.portions);
      setBabyMode(R.current.babyMode);
      setDefaultPortion(R.current.defaultPortion);
      setCustomItems(R.current.customItems);
      setViewMode(R.current.viewMode);
      setOpenRecipe(R.current.openRecipe);
      setBrowseOpen(R.current.browseOpen);
      setBrowseDetail(R.current.browseDetail);
      setHaveAllForMeals(R.current.haveAllForMeals);
      persist();
      showToast("Restored!");
      setShowImport(false);
      setImportText("");
    } catch (err) {
      showToast("Couldn't read that code");
    }
  }

  // === DERIVED DATA ===
  const weekMeals = week.map(id => MEALS.find(m => m.id === id)).filter(Boolean);
  const selectedMeals = selected.map(id => MEALS.find(m => m.id === id)).filter(Boolean);

  // Get scaling factor for a meal based on user's portion selection
  function factorFor(meal) {
    const base = getProteinBase(meal.protein);
    // Eggs: value stored is egg count. Meats: value stored is SERVINGS.
    if (base.unit === "egg") {
      const chosen = portions[meal.id] !== undefined ? portions[meal.id] : base.amount;
      return chosen / base.amount;
    }
    // Meats: defaultPortion = servings, individual portions also in servings
    const chosenServings = portions[meal.id] !== undefined ? portions[meal.id] : defaultPortion;
    const chosenLbs = servingsToLbs(chosenServings);
    return chosenLbs / base.amount;
  }

// Combine multiple qty strings into ONE summed display.
// e.g. ["1 cup rice", "1 cup", "2 cups"] -> "4 cups"
// e.g. ["3 lbs", "1 lb"] -> "4 lbs"
// If units mismatch (e.g. "1 cup" + "2 tbsp"), show with " + ".
function combineQtys(qtys) {
  if (!qtys || qtys.length === 0) return "";
  if (qtys.length === 1) return qtys[0];

  // Group by unit
  function parseNum(str) {
    str = str.trim();
    const mixed = str.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (mixed) return parseInt(mixed[1]) + parseInt(mixed[2]) / parseInt(mixed[3]);
    const frac = str.match(/^(\d+)\/(\d+)$/);
    if (frac) return parseInt(frac[1]) / parseInt(frac[2]);
    const n = parseFloat(str);
    return isNaN(n) ? null : n;
  }
  function formatNum(n) {
    if (n >= 1 && Math.abs(n - Math.round(n)) < 0.05) return String(Math.round(n));
    const fracs = [[0.25,"1/4"],[0.33,"1/3"],[0.5,"1/2"],[0.67,"2/3"],[0.75,"3/4"]];
    const whole = Math.floor(n);
    const rem = n - whole;
    for (const [val, str] of fracs) {
      if (Math.abs(rem - val) < 0.06) return whole > 0 ? `${whole} ${str}` : str;
    }
    return (Math.round(n * 10) / 10).toString().replace(/\.0$/, "");
  }

  // Parse each qty into { count, unit, parens }
  function parseOne(qtyStr) {
    if (!qtyStr) return null;
    const m = qtyStr.match(/^([\d./\s]+?)(\s|$)(.*)/);
    if (!m) return null;
    const count = parseNum(m[1].trim());
    if (count === null) return null;
    let rest = (m[3] || "").trim();
    // Strip parenthetical hints like "(2 1/2 lbs)" - keep them out of the unit
    let parenHint = "";
    rest = rest.replace(/\s*\(([^)]+)\)/, (full, p) => { parenHint = p; return ""; }).trim();
    // Split rest into "unit" (first word) and "noun" (the rest)
    // e.g. "lbs chicken breasts" -> unit "lb", noun "chicken breasts"
    const restParts = rest.split(/\s+/);
    const firstWord = (restParts[0] || "").toLowerCase();
    const remainingNoun = restParts.slice(1).join(" ");
    const unitNorm = firstWord
      .replace(/^lbs?$/, "lb")
      .replace(/^cups?$/, "cup")
      .replace(/^tbsps?$/, "tbsp")
      .replace(/^tsps?$/, "tsp")
      .replace(/^cans?$/, "can")
      .replace(/^jars?$/, "jar")
      .replace(/^bottles?$/, "bottle")
      .replace(/^bags?$/, "bag")
      .replace(/^boxes?$/, "box")
      .replace(/^packets?$/, "packet")
      .replace(/^pouches?$/, "pouch")
      .replace(/^slices?$/, "slice")
      .replace(/^cloves?$/, "clove")
      .replace(/^heads?$/, "head")
      .replace(/^stalks?$/, "stalk")
      .replace(/^pints?$/, "pint")
      .replace(/^loaves$/, "loaf")
      .replace(/^sticks?$/, "stick")
      .replace(/^bunch(es)?$/, "bunch")
      .replace(/^packs?$/, "pack")
      .replace(/^breasts?$/, "breast");
    // If firstWord is a recognized unit, keep noun separate; else treat whole rest as noun
    const KNOWN_UNITS = ["lb","cup","tbsp","tsp","can","jar","bottle","bag","box","packet","pouch","slice","clove","head","stalk","pint","loaf","stick","bunch","pack","breast","large","medium","small"];
    if (KNOWN_UNITS.includes(unitNorm)) {
      return { count, unit: unitNorm, noun: remainingNoun, parenHint };
    }
    // Whole rest is the "noun" with no unit (e.g. "bell peppers", "lemon")
    return { count, unit: "", noun: rest.toLowerCase(), parenHint };
  }

  const parsed = qtys.map(parseOne).filter(Boolean);
  if (parsed.length !== qtys.length) {
    // Fallback: comma list of original strings
    return qtys.join(" + ");
  }

  // Group by (unit, noun) so we sum "1 lb chicken" + "2 lbs chicken" = "3 lbs chicken"
  // Normalize noun by stripping trailing 's' so "lemon" and "lemons" group together.
  const byKey = {};
  let parenSums = {};
  function normNoun(n) {
    if (!n) return "";
    // Naive: strip trailing 's' but not 'ss' (e.g. "glass" stays "glass")
    if (n.endsWith("s") && !n.endsWith("ss") && n.length > 2) return n.slice(0, -1);
    return n;
  }
  parsed.forEach(p => {
    const normalized = normNoun(p.noun);
    const key = p.unit + "::" + normalized;
    if (!byKey[key]) byKey[key] = { count: 0, unit: p.unit, noun: p.noun, normNoun: normalized };
    byKey[key].count += p.count;
    // Keep the longest noun spelling (which is usually the plural form)
    if (p.noun.length > byKey[key].noun.length) byKey[key].noun = p.noun;
    if (p.parenHint) {
      const hm = p.parenHint.match(/^([\d./\s]+?)(\s|$)(.*)/);
      if (hm) {
        const hCount = parseNum(hm[1].trim());
        const hRest = (hm[3] || "").trim().toLowerCase().replace(/^lbs?$/, "lb");
        if (hCount !== null) {
          const hKey = key + "||" + hRest;
          if (!parenSums[hKey]) parenSums[hKey] = { count: 0, rest: hRest, key };
          parenSums[hKey].count += hCount;
        }
      }
    }
  });

  // Pluralize units when count > 1. NOTE: tbsp/tsp don't pluralize in cooking.
  function pluralize(unit, count) {
    if (count <= 1) return unit;
    if (unit === "tbsp" || unit === "tsp") return unit; // unchanged
    if (["lb","cup","can","jar","bottle","bag","box","packet","pouch","slice","clove","head","stalk","pint","stick","bunch","pack","breast"].includes(unit)) return unit + "s";
    if (unit === "loaf") return "loaves";
    return unit;
  }

  const parts = Object.values(byKey).map(({ count, unit, noun }) => {
    const fmt = formatNum(count);
    if (!unit && !noun) return fmt;
    if (!unit) return `${fmt} ${noun}`;
    const pUnit = pluralize(unit, count);
    return noun ? `${fmt} ${pUnit} ${noun}` : `${fmt} ${pUnit}`;
  });

  // Append summed paren hints if all parts share one
  const phKeys = Object.keys(parenSums);
  let parenStr = "";
  if (phKeys.length === 1 && Object.keys(byKey).length === 1) {
    const ph = parenSums[phKeys[0]];
    const fmt = formatNum(ph.count);
    // Pluralize "lb" to "lbs" if count > 1
    let restOut = ph.rest;
    if (restOut === "lb" && ph.count > 1) restOut = "lbs";
    parenStr = ` (${fmt} ${restOut})`;
  }

  return parts.join(" + ") + parenStr;
}
  const shoppingMap = {};
  selectedMeals.forEach(meal => {
    if (haveAllForMeals.includes(meal.id)) return; // user already has everything for this meal
    const factor = factorFor(meal);
    meal.ingredients.forEach(ing => {
      const key = ing.item;
      const scaledQty = scaleQty(ing.qty, factor);
      if (!shoppingMap[key]) {
        shoppingMap[key] = { item: ing.item, qtys: [scaledQty], aisle: ing.aisle, mealCount: 1 };
      } else {
        shoppingMap[key].qtys.push(scaledQty);
        shoppingMap[key].mealCount += 1;
      }
    });
  });
  const byAisle = {};
  Object.values(shoppingMap).forEach(x => {
    if (pantry.includes(x.item)) return;
    if (!byAisle[x.aisle]) byAisle[x.aisle] = [];
    byAisle[x.aisle].push(x);
  });

  // All ingredients for pantry step (with scaled qtys, before pantry filter)
  const allIngredients = {};
  Object.values(shoppingMap).forEach(x => {
    if (!allIngredients[x.aisle]) allIngredients[x.aisle] = [];
    allIngredients[x.aisle].push(x);
  });

  // ============ STYLES ============
  const s = {
    app: { fontFamily: "'Nunito', -apple-system, sans-serif", background: "#FAFAF7", minHeight: "100vh", paddingBottom: 120 },
    header: { background: "linear-gradient(135deg,#2d6a4f 0%,#40916c 50%,#52b788 100%)", color: "white", padding: "20px 16px 24px", position: "relative" },
    headerTitle: { fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.3px" },
    headerSub: { fontSize: 13, opacity: 0.9, marginTop: 4 },
    syncBtn: { background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", color: "white", padding: "6px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" },
    progress: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px 0 0", background: "white" },
    dot: (active, done) => ({ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, background: done ? "#2d6a4f" : active ? "#2d6a4f" : "#e5e5e0", color: done || active ? "white" : "#888", transition: "all 0.25s" }),
    line: (done) => ({ width: 32, height: 2, background: done ? "#2d6a4f" : "#e5e5e0" }),
    container: { padding: "16px" },
    sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: "4px 0 12px" },
    card: (sel, dim) => ({ background: "white", border: sel ? "2px solid #2d6a4f" : "2px solid #eee", borderRadius: 14, padding: 14, marginBottom: 10, cursor: "pointer", opacity: dim ? 0.4 : 1, transition: "all 0.15s", boxShadow: sel ? "0 2px 8px rgba(45,106,79,0.15)" : "none" }),
    cardRow: { display: "flex", alignItems: "flex-start", gap: 12 },
    checkbox: (on) => ({ minWidth: 22, height: 22, borderRadius: 6, border: on ? "none" : "2px solid #bbb", background: on ? "#2d6a4f" : "white", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 900, marginTop: 2 }),
    mealName: { fontSize: 15, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3 },
    mealMeta: { fontSize: 12, color: "#666", marginTop: 4, display: "flex", gap: 10, flexWrap: "wrap" },
    tags: { display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" },
    tag: { fontSize: 10, background: "#e9f5ef", color: "#2d6a4f", padding: "2px 8px", borderRadius: 10, fontWeight: 700, textTransform: "uppercase" },
    emoji: { fontSize: 28, marginRight: 2 },
    btn: (variant) => ({
      padding: "14px 20px", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer", flex: 1,
      background: variant === "primary" ? "#2d6a4f" : variant === "amber" ? "#b45309" : variant === "ghost" ? "transparent" : "white",
      color: variant === "primary" || variant === "amber" ? "white" : "#2d6a4f",
      border: (variant === "ghost" || variant === "secondary") ? "2px solid #2d6a4f" : "none",
    }),
    stickyBar: { position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #eee", padding: "12px 16px", display: "flex", gap: 10, zIndex: 50, boxShadow: "0 -4px 12px rgba(0,0,0,0.04)" },
    aisleHeader: { fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#2d6a4f", padding: "12px 0 6px", borderBottom: "2px solid #2d6a4f", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 },
    shopRow: (checked) => ({ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: "1px solid #f2f2ef", cursor: "pointer", textDecoration: checked ? "line-through" : "none", opacity: checked ? 0.5 : 1 }),
    shopItem: { flex: 1, fontSize: 14, color: "#222" },
    qty: { fontSize: 12, color: "#888" },
    badge: { fontSize: 10, background: "#fff4e6", color: "#b45309", padding: "2px 6px", borderRadius: 8, fontWeight: 700 },
    recipeCard: { background: "white", borderRadius: 12, marginBottom: 10, overflow: "hidden", border: "1px solid #eee" },
    recipeHead: { padding: 14, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" },
    recipeBody: { padding: "0 14px 14px", borderTop: "1px solid #f2f2ef" },
    stepNum: { minWidth: 24, height: 24, borderRadius: "50%", background: "#b45309", color: "white", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8 },
    stepRow: { display: "flex", alignItems: "flex-start", padding: "6px 0", fontSize: 14, color: "#222", lineHeight: 1.4 },
    babyBox: { background: "#fff4e6", border: "1px solid #f4c77e", borderRadius: 10, padding: 12, marginTop: 12 },
    babyTitle: { fontSize: 12, fontWeight: 800, color: "#b45309", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 },
    babyText: { fontSize: 13, color: "#5a3a0a" },
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 },
    modalBox: { background: "white", borderRadius: 16, padding: 20, maxWidth: 420, width: "100%", maxHeight: "85vh", overflow: "auto" },
    toast: { position: "fixed", bottom: 100, left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", color: "white", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, zIndex: 300, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" },
    fontLink: {},
  };

  if (!loaded.current && week.length === 0) {
    return (
      <div style={s.app}>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
        <div style={{ padding: 40, textAlign: "center", color: "#666" }}>{"Loading\u2026"}</div>
      </div>
    );
  }

  return (
    <div style={s.app}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={s.header}>
        <h1 style={{ ...s.headerTitle, maxWidth: "40%" }}>Weekly Meals</h1>
        <div style={{ ...s.headerSub, maxWidth: "40%" }}>
          {step === 1 && "Pick your meals"}
          {step === 2 && "Set portion sizes"}
          {step === 3 && "What's in your pantry?"}
          {step === 4 && "Shop & cook"}
        </div>
        <div style={{ position: "absolute", top: 14, right: 10, display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap", maxWidth: "58%", justifyContent: "flex-end" }}>
          <button style={{ ...s.syncBtn, padding: "6px 9px", fontSize: 14 }} onClick={() => setFinderOpen(true)} title="What can I make?">{"\uD83E\uDD58"}</button>
          <button style={{ ...s.syncBtn, padding: "6px 9px", fontSize: 14 }} onClick={() => setBrowseOpenAndPersist(true)} title="Browse all meals">{"\uD83D\uDD0D"}</button>
          <button style={s.syncBtn} onClick={() => setShowImport(true)}>{E.cloud} Sync</button>
          <button style={{ ...s.syncBtn, padding: "4px 10px", fontSize: 18, lineHeight: 1 }} onClick={() => setMenuOpen(true)}>⋯</button>
        </div>
      </div>

      {/* PROGRESS */}
      <div style={s.progress}>
        <div style={{ ...s.dot(step === 1, step > 1), cursor: "pointer" }} onClick={() => goToStep(1)}>1</div>
        <div style={s.line(step > 1)}></div>
        <div style={{ ...s.dot(step === 2, step > 2), cursor: locked ? "pointer" : "default", opacity: locked ? 1 : 0.5 }} onClick={() => locked && goToStep(2)}>2</div>
        <div style={s.line(step > 2)}></div>
        <div style={{ ...s.dot(step === 3, step > 3), cursor: locked ? "pointer" : "default", opacity: locked ? 1 : 0.5 }} onClick={() => locked && goToStep(3)}>3</div>
        <div style={s.line(step > 3)}></div>
        <div style={{ ...s.dot(step === 4, false), cursor: locked ? "pointer" : "default", opacity: locked ? 1 : 0.5 }} onClick={() => locked && goToStep(4)}>4</div>
      </div>

      <div style={s.container}>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div style={s.sectionTitle}>This week's options</div>
            {weekMeals.map(meal => {
              const sel = selected.includes(meal.id);
              const dim = locked && !sel;
              const haveAll = haveAllForMeals.includes(meal.id);
              return (
                <div key={meal.id} style={s.card(sel, dim)} onClick={() => toggleSelect(meal.id)}>
                  <div style={s.cardRow}>
                    <div style={s.checkbox(sel)}>{sel ? "\u2713" : ""}</div>
                    <span style={s.emoji}>
                      {meal.emoji}
                      {meal.tags.includes("quick") && <span style={{ fontSize: 18, marginLeft: 2 }}>{"\u26A1"}</span>}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={s.mealName}>{meal.name}</div>
                      <div style={s.mealMeta}>
                        <span>{E.clock} {meal.time}</span>
                        <span>{proteinEmoji(meal.protein)} {meal.protein.replace(/^[\d.]+\s*(lbs?|eggs?)\s*/i, "")}</span>
                      </div>
                      <div style={s.tags}>{meal.tags.map(t => <span key={t} style={s.tag}>{t}</span>)}</div>
                    </div>
                  </div>
                  {sel && (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleHaveAll(meal.id); }}
                      style={{ marginTop: 10, width: "100%", padding: "8px 12px", background: haveAll ? "#2d6a4f" : "transparent", border: haveAll ? "2px solid #2d6a4f" : "2px dashed #b8b8b3", color: haveAll ? "white" : "#666", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                    >{haveAll ? "\u2713 Already have ingredients" : "+ Already have ingredients"}</button>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* STEP 2 - PORTIONS */}
        {step === 2 && (
          <>
            <div style={s.sectionTitle}>How much protein per meal?</div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 14 }}>All ingredients scale to match.</div>

            {/* Baby mode toggle */}
            <div
              onClick={toggleBabyMode}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: babyMode ? "#fff4e6" : "white", border: babyMode ? "2px solid #f4c77e" : "2px solid #eee", borderRadius: 12, marginBottom: 10, cursor: "pointer" }}
            >
              <div style={s.checkbox(babyMode)}>{babyMode ? "\u2713" : ""}</div>
              <span style={{ fontSize: 24 }}>{E.baby}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>Include baby portions</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{babyMode ? "Baby portion guide shown on recipes" : "Baby portion guide hidden"}</div>
              </div>
            </div>

            {/* Default portion size */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: "#e9f5ef", border: "2px solid #b8dec9", borderRadius: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 24 }}>{"\u2696\uFE0F"}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>Default servings (meats)</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{defaultPortion} servings {"\u2248"} {servingsToLbs(defaultPortion)} lbs {"\u2022"} 6 oz per serving</div>
              </div>
              <select
                value={defaultPortion}
                onChange={e => setDefaultPortionValue(parseInt(e.target.value))}
                style={{ fontSize: 14, fontWeight: 700, padding: "10px 12px", border: "2px solid #2d6a4f", borderRadius: 8, background: "white", color: "#2d6a4f", cursor: "pointer", appearance: "auto" }}
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(o => <option key={o} value={o}>{o} servings</option>)}
              </select>
            </div>

            {/* Week total */}
            {selectedMeals.length > 0 && (() => {
              let totalGrams = 0;
              let totalKcal = 0;
              selectedMeals.forEach(meal => {
                const base = getProteinBase(meal.protein);
                const f = factorFor(meal);
                const proteinAmt = base.unit === "egg" ? base.amount * f : servingsToLbs((portions[meal.id] !== undefined ? portions[meal.id] : defaultPortion));
                totalGrams += proteinAmt * proteinGramsPer(meal.protein);
                totalKcal += mealKcal(meal, f);
              });
              return (
                <div style={{ padding: "10px 14px", marginBottom: 16, textAlign: "center", fontSize: 12, color: "#2d6a4f", fontWeight: 700 }}>
                  Week total: ~{totalKcal.toLocaleString()} cal {"\u2022"} ~{Math.round(totalGrams).toLocaleString()}g protein {"\u2022"} {selectedMeals.length} meals
                </div>
              );
            })()}
            {selectedMeals.map(meal => {
              const base = getProteinBase(meal.protein);
              const defaultAmount = base.unit === "egg" ? base.amount : defaultPortion;
              const current = portions[meal.id] !== undefined ? portions[meal.id] : defaultAmount;
              const options = portionOptions(meal.protein);
              const proteinName = meal.protein.replace(/^[\d.]+\s*(lbs?|eggs?)\s*/i, "").trim();
              const unitLabel = base.unit === "egg" ? "" : "lbs";
              const isOverridden = portions[meal.id] !== undefined && base.unit !== "egg";
              return (
                <div key={meal.id} style={{ background: "white", borderRadius: 12, padding: 14, marginBottom: 10, borderLeft: isOverridden ? "4px solid #b45309" : "4px solid #2d6a4f", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 26 }}>
                      {meal.emoji}
                      {meal.tags.includes("quick") && <span style={{ fontSize: 14, marginLeft: 2 }}>{"\u26A1"}</span>}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3 }}>{meal.name}</div>
                      <div style={{ fontSize: 12, color: "#666", marginTop: 2, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span>{proteinEmoji(meal.protein)} {proteinName}</span>
                        {isOverridden && <span style={{ fontSize: 10, background: "#fff4e6", color: "#b45309", padding: "2px 6px", borderRadius: 8, fontWeight: 700 }}>custom</span>}
                      </div>
                    </div>
                    <select
                      value={current}
                      onChange={e => setPortion(meal.id, parseFloat(e.target.value))}
                      style={{ fontSize: 14, fontWeight: 700, padding: "10px 12px", border: isOverridden ? "2px solid #b45309" : "2px solid #2d6a4f", borderRadius: 8, background: "white", color: isOverridden ? "#b45309" : "#2d6a4f", cursor: "pointer", appearance: "auto" }}
                    >
                      {options.map(o => <option key={o} value={o}>{o} {base.unit === "egg" ? "eggs" : "servings"}</option>)}
                    </select>
                  </div>
                  {(() => {
                    const f = factorFor(meal);
                    const servings = current; // for meats this IS servings; for eggs this is egg count
                    const displayServings = base.unit === "egg" ? Math.max(1, Math.round(current / 2)) : current;
                    const lbsRef = base.unit === "egg" ? null : servingsToLbs(current);
                    const totalKcal = mealKcal(meal, f);
                    const perServingKcal = Math.round(totalKcal / displayServings / 10) * 10;
                    const totalProtein = base.unit === "egg"
                      ? Math.round(current * proteinGramsPer(meal.protein))
                      : Math.round(lbsRef * proteinGramsPer(meal.protein));
                    const perServingProtein = Math.round(totalProtein / displayServings);
                    return (
                      <div style={{ marginTop: 10 }}>
                        {(() => {
                          const yld = mealYield(meal, f);
                          return yld ? (
                            <div style={{ fontSize: 13, color: "#2d6a4f", marginBottom: 4, textAlign: "center", fontWeight: 800 }}>{"\uD83C\uDF7D\uFE0F"} Makes ~{yld.count} {yld.label}</div>
                          ) : null;
                        })()}
                        {lbsRef !== null && (
                          <div style={{ fontSize: 11, color: "#888", marginBottom: 6, textAlign: "center", fontWeight: 600 }}>{"\u2248"} {lbsRef} lbs {proteinName}</div>
                        )}
                        <div style={{ padding: 10, background: "#f7f7f2", borderRadius: 8, display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12 }}>
                          <div style={{ textAlign: "center", flex: 1 }}>
                            <div style={{ fontWeight: 800, color: "#2d6a4f", fontSize: 13 }}>~{perServingKcal}</div>
                            <div style={{ color: "#888", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3 }}>cal ea</div>
                          </div>
                          <div style={{ textAlign: "center", flex: 1, borderLeft: "1px solid #e0e0db" }}>
                            <div style={{ fontWeight: 800, color: "#2d6a4f", fontSize: 13 }}>~{perServingProtein}g</div>
                            <div style={{ color: "#888", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3 }}>protein ea</div>
                          </div>
                          <div style={{ textAlign: "center", flex: 1, borderLeft: "1px solid #e0e0db" }}>
                            <div style={{ fontWeight: 800, color: "#2d6a4f", fontSize: 13 }}>~{totalKcal.toLocaleString()}</div>
                            <div style={{ color: "#888", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3 }}>cal total</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    <button onClick={() => { setBrowseDetailAndPersist(meal.id); setBrowseOpenAndPersist(true); }} style={{ flex: 1, padding: "8px 12px", background: "transparent", border: "1px solid #ddd", color: "#555", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>View recipe</button>
                    <button onClick={() => openCookMode(meal.id)} style={{ flex: 1, padding: "8px 12px", background: "#b45309", border: "none", color: "white", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{"\uD83D\uDC68\u200D\uD83C\uDF73"} Cook</button>
                    {isOverridden && <button onClick={() => { const next = { ...R.current.portions }; delete next[meal.id]; R.current.portions = next; setPortions(next); persist(); }} style={{ flex: "none", padding: "8px 12px", background: "transparent", border: "1px solid #b45309", color: "#b45309", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Reset</button>}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* STEP 3 - PANTRY */}
        {step === 3 && (
          <>
            <div style={s.sectionTitle}>Tap anything you already have</div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 14 }}>It'll be skipped on your shopping list.</div>
            {AISLE_ORDER.map(aisle => {
              const items = allIngredients[aisle];
              if (!items || items.length === 0) return null;
              return (
                <div key={aisle}>
                  <div style={s.aisleHeader}><span>{AISLE_EMOJI[aisle]}</span>{aisle}</div>
                  {items.sort((a,b) => a.item.localeCompare(b.item)).map(x => {
                    const have = pantry.includes(x.item);
                    return (
                      <div key={x.item} style={s.shopRow(have)} onClick={() => togglePantry(x.item)}>
                        <div style={s.checkbox(have)}>{have ? "\u2713" : ""}</div>
                        <div style={s.shopItem}>
                          <div style={{ fontWeight: 600 }}>{x.item}</div>
                          <div style={s.qty}>{combineQtys(x.qtys)}</div>
                        </div>
                        {x.mealCount > 1 && <span style={s.badge}>x{x.mealCount} meals</span>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </>
        )}

        {/* STEP 4 - SHOPPING + RECIPES */}
        {step === 4 && viewMode === "shop" && (
          <>
            <div style={s.sectionTitle}>Shopping list</div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 14 }}>Tap to check off as you shop.</div>

            {/* Add custom item button - top */}
            {!showCustomAdd && (
              <button
                onClick={() => setShowCustomAdd(true)}
                style={{ ...s.btn("secondary"), width: "100%", flex: "none", marginBottom: 14, borderStyle: "dashed", padding: "12px 20px" }}
              >+ Add extras to your list</button>
            )}

            {showCustomAdd && (
              <div style={{ marginBottom: 14, padding: 14, background: "white", border: "2px solid #2d6a4f", borderRadius: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#2d6a4f", marginBottom: 8 }}>Add to your list</div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 10 }}>One per line, or separate with commas</div>
                <textarea
                  value={customInput}
                  onChange={e => setCustomInput(e.target.value)}
                  placeholder={"Paper towels\nMilk\nDish soap"}
                  rows={4}
                  autoFocus
                  style={{ width: "100%", padding: 10, fontSize: 14, border: "1px solid #ddd", borderRadius: 8, boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }}
                />
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button
                    onClick={() => { setShowCustomAdd(false); setCustomInput(""); }}
                    style={{ ...s.btn("ghost"), flex: 1 }}
                  >Cancel</button>
                  <button
                    onClick={() => { addCustomItem(customInput); setCustomInput(""); setShowCustomAdd(false); }}
                    disabled={!customInput.trim()}
                    style={{ ...s.btn("primary"), flex: 1, opacity: customInput.trim() ? 1 : 0.5 }}
                  >Add</button>
                </div>
              </div>
            )}

            {/* Custom items - shown near top since user added them */}
            {customItems.length > 0 && (
              <div>
                <div style={s.aisleHeader}><span>{"\u2728"}</span>My Extras</div>
                {customItems.map(x => {
                  const key = "custom:" + x.id;
                  const done = checkedShop.includes(key);
                  return (
                    <div key={x.id} style={s.shopRow(done)}>
                      <div style={s.checkbox(done)} onClick={() => toggleShop(key)}>{done ? "\u2713" : ""}</div>
                      <div style={s.shopItem} onClick={() => toggleShop(key)}>
                        <div style={{ fontWeight: 600 }}>{x.text}</div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeCustomItem(x.id); }}
                        style={{ background: "transparent", border: "none", color: "#b45309", fontSize: 20, cursor: "pointer", padding: "4px 10px", fontWeight: 700, minWidth: 36 }}
                        title="Remove"
                      >{"\u00D7"}</button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Recipe-driven aisles */}
            {AISLE_ORDER.map(aisle => {
              const items = byAisle[aisle];
              if (!items || items.length === 0) return null;
              return (
                <div key={aisle}>
                  <div style={s.aisleHeader}><span>{AISLE_EMOJI[aisle]}</span>{aisle}</div>
                  {items.sort((a,b) => a.item.localeCompare(b.item)).map(x => {
                    const done = checkedShop.includes(x.item);
                    return (
                      <div key={x.item} style={s.shopRow(done)} onClick={() => toggleShop(x.item)}>
                        <div style={s.checkbox(done)}>{done ? "\u2713" : ""}</div>
                        <div style={s.shopItem}>
                          <div style={{ fontWeight: 600 }}>{x.item}</div>
                          <div style={s.qty}>{combineQtys(x.qtys)}</div>
                        </div>
                        {x.mealCount > 1 && <span style={s.badge}>x{x.mealCount} meals</span>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </>
        )}

        {step === 4 && viewMode === "shop" && (
          <button
            onClick={() => setConfirmNew(true)}
            style={{ ...s.btn("ghost"), width: "100%", flex: "none", marginTop: 30, marginBottom: 8, padding: "14px 20px", borderColor: "#b45309", color: "#b45309" }}
          >{"\uD83D\uDD04"} Start New Week</button>
        )}
        {step === 4 && viewMode === "shop" && (
          <div style={{ fontSize: 11, color: "#888", textAlign: "center", marginBottom: 8 }}>Done shopping? Reset and pick next week's meals.</div>
        )}

        {step === 4 && viewMode === "recipes" && (
          <>
            <div style={s.sectionTitle}>Your recipes</div>
            {selectedMeals.map(meal => {
              const open = openRecipe === meal.id;
              return (
                <div key={meal.id} style={s.recipeCard}>
                  <div style={s.recipeHead} onClick={() => setOpenRecipeAndPersist(open ? null : meal.id)}>
                    <span style={{ fontSize: 24 }}>
                      {meal.emoji}
                      {meal.tags.includes("quick") && <span style={{ fontSize: 16, marginLeft: 2 }}>{"\u26A1"}</span>}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{meal.name}</div>
                      <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{E.clock} {meal.time}</div>
                    </div>
                    <div style={{ fontSize: 20, color: "#888" }}>{open ? "\u2212" : "+"}</div>
                  </div>
                  {open && (
                    <div style={s.recipeBody}>
                      <button
                        onClick={(e) => { e.stopPropagation(); openCookMode(meal.id); }}
                        style={{ ...s.btn("amber"), width: "100%", flex: "none", marginTop: 12, marginBottom: 4 }}
                      >{"\uD83D\uDC68\u200D\uD83C\uDF73"} Start Cook Mode</button>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#2d6a4f", marginTop: 14, marginBottom: 6 }}>INGREDIENTS</div>
                      {meal.ingredients.map((ing, i) => (
                        <div key={i} style={{ fontSize: 13, padding: "3px 0", color: "#333" }}>{E.bullet} {scaleQty(ing.qty, factorFor(meal))} {ing.item}</div>
                      ))}
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#b45309", marginTop: 14, marginBottom: 6 }}>STEPS</div>
                      {meal.steps.map((step, i) => (
                        <div key={i} style={s.stepRow}>
                          <div style={s.stepNum}>{i + 1}</div>
                          <div>{step}</div>
                        </div>
                      ))}
                      {babyMode && (
                        <div style={s.babyBox}>
                          <div style={s.babyTitle}>{E.baby} For baby</div>
                          <div style={s.babyText}>{meal.baby}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* STICKY BOTTOM */}
      <div style={s.stickyBar}>
        {step === 1 && !locked && (
          <>
            <button style={s.btn("secondary")} onClick={shuffle}>{E.shuffle} Shuffle</button>
            <button style={s.btn("primary")} onClick={saveSelections}>Save ({selected.length})</button>
          </>
        )}
        {step === 1 && locked && (
          <>
            <button style={s.btn("secondary")} onClick={unlock}>Edit</button>
            <button style={s.btn("ghost")} onClick={() => setConfirmNew(true)}>New Week</button>
            <button style={s.btn("primary")} onClick={() => goToStep(2)}>Next {E.arrR}</button>
          </>
        )}
        {step === 2 && (
          <>
            <button style={s.btn("secondary")} onClick={() => goToStep(1)}>{E.arrL} Back</button>
            <button style={s.btn("primary")} onClick={() => goToStep(3)}>Next {E.arrR}</button>
          </>
        )}
        {step === 3 && (
          <>
            <button style={s.btn("secondary")} onClick={() => goToStep(2)}>{E.arrL} Back</button>
            <button style={s.btn("primary")} onClick={() => goToStep(4)}>Next {E.arrR}</button>
          </>
        )}
        {step === 4 && (
          <>
            <button style={s.btn("secondary")} onClick={() => goToStep(3)}>{E.arrL} Back</button>
            <button style={s.btn(viewMode === "shop" ? "primary" : "secondary")} onClick={() => setViewModeAndPersist("shop")}>{E.list} List</button>
            <button style={s.btn(viewMode === "recipes" ? "amber" : "secondary")} onClick={() => setViewModeAndPersist("recipes")}>{E.chef} Recipes</button>
          </>
        )}
      </div>

      {/* SYNC MODAL */}
      {showImport && (
        <div style={s.modal} onClick={() => { setShowImport(false); setImportText(""); }}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Backup & Restore</div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.4 }}>Copy your backup code and paste it into Google Drive, Notes, or anywhere safe. Paste it back here to restore.</div>

            <div style={{ background: "#e9f5ef", borderRadius: 10, padding: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#2d6a4f", marginBottom: 10 }}>{E.arrDn} BACKUP</div>
              <button style={{ ...s.btn("primary"), width: "100%", flex: "none", marginBottom: 8 }} onClick={copyBackup}>Copy Backup Code</button>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 6, lineHeight: 1.3 }}>Or long-press this text to copy manually:</div>
              <textarea
                readOnly
                value={generateBackupText()}
                onClick={e => e.target.select()}
                style={{ width: "100%", height: 70, fontSize: 11, fontFamily: "monospace", padding: 8, border: "1px solid #cde5d5", borderRadius: 8, background: "white", resize: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ background: "#fff4e6", borderRadius: 10, padding: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#b45309", marginBottom: 10 }}>{E.arrUp} RESTORE</div>
              <div style={{ fontSize: 12, color: "#333", marginBottom: 8, lineHeight: 1.4 }}>Paste your backup code:</div>
              <textarea
                value={importText}
                onChange={e => setImportText(e.target.value)}
                placeholder='Paste code here...'
                style={{ width: "100%", height: 70, fontSize: 11, fontFamily: "monospace", padding: 8, border: "1px solid #f4c77e", borderRadius: 8, background: "white", resize: "none", boxSizing: "border-box", marginBottom: 10 }}
              />
              <button style={{ ...s.btn("amber"), width: "100%", flex: "none" }} onClick={restoreFromText}>Restore</button>
            </div>

            <button style={{ ...s.btn("ghost"), width: "100%", flex: "none" }} onClick={() => { setShowImport(false); setImportText(""); }}>Close</button>
          </div>
        </div>
      )}

      {/* OPTIONS MENU */}
      {menuOpen && (
        <div style={s.modal} onClick={() => setMenuOpen(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Options</div>

            <button style={{ ...s.btn("secondary"), width: "100%", flex: "none", marginBottom: 10, textAlign: "left", padding: "16px 18px" }} onClick={() => { setMenuOpen(false); setConfirmReset(true); }}>
              <div style={{ fontSize: 15, fontWeight: 800 }}>Reset This Week</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#666", marginTop: 2 }}>Clears pantry & shopping checkmarks. Keeps your meal picks.</div>
            </button>

            <button style={{ ...s.btn("secondary"), width: "100%", flex: "none", marginBottom: 14, textAlign: "left", padding: "16px 18px", borderColor: "#b45309", color: "#b45309" }} onClick={() => { setMenuOpen(false); setConfirmNew(true); }}>
              <div style={{ fontSize: 15, fontWeight: 800 }}>Start New Week</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#8a5a0a", marginTop: 2 }}>Fresh meals. Clears everything.</div>
            </button>

            <button style={{ ...s.btn("ghost"), width: "100%", flex: "none" }} onClick={() => setMenuOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* CONFIRM RESET */}
      {confirmReset && (
        <div style={s.modal} onClick={() => setConfirmReset(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Reset this week?</div>
            <div style={{ fontSize: 14, color: "#555", marginBottom: 18, lineHeight: 1.4 }}>This clears your pantry and shopping checkmarks. Your meal picks stay.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={s.btn("ghost")} onClick={() => setConfirmReset(false)}>Cancel</button>
              <button style={s.btn("primary")} onClick={resetWeek}>Yes, reset</button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM NEW WEEK */}
      {confirmNew && (
        <div style={s.modal} onClick={() => setConfirmNew(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Start new week?</div>
            <div style={{ fontSize: 14, color: "#555", marginBottom: 18, lineHeight: 1.4 }}>This clears your picks, pantry, and shopping checkmarks. Save a backup first if you want to keep this week.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={s.btn("ghost")} onClick={() => setConfirmNew(false)}>Cancel</button>
              <button style={s.btn("primary")} onClick={startNewWeek}>Yes, new week</button>
            </div>
          </div>
        </div>
      )}

      {/* BROWSE ALL MEALS */}
      {browseOpen && (
        <div style={{ position: "fixed", inset: 0, background: "#FAFAF7", zIndex: 150, overflow: "auto", paddingBottom: 40 }}>
          <div style={{ ...s.header, position: "sticky", top: 0, zIndex: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => { setBrowseOpenAndPersist(false); setBrowseDetailAndPersist(null); setBrowseSearch(""); setCameFromFinder(false); }} style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)", color: "white", padding: "8px 12px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{E.arrL} Back</button>
              <h2 style={{ ...s.headerTitle, fontSize: 22 }}>Browse Meals</h2>
            </div>
          </div>

          {/* Detail view */}
          {browseDetail !== null && (() => {
            const meal = MEALS.find(m => m.id === browseDetail);
            if (!meal) return null;
            const alreadyAdded = selected.includes(meal.id);
            const base = getProteinBase(meal.protein);
            const defaultAmount = base.unit === "egg" ? base.amount : defaultPortion;
            const currentPortion = portions[meal.id] !== undefined ? portions[meal.id] : defaultAmount;
            const portionOpts = portionOptions(meal.protein);
            const unitLabel = base.unit === "egg" ? "" : "lbs";
            const factor = factorFor(meal);

            // Similar meals: same protein + cat, or same cuisine (exclude self)
            const meta = MEAL_META[meal.id];
            const cuisine = meal.tags.find(t => ["italian","mexican","chinese","japanese","korean","thai","indian","greek","french","middle-eastern","cajun"].includes(t));
            const similar = MEALS
              .filter(m => m.id !== meal.id)
              .map(m => {
                const mMeta = MEAL_META[m.id];
                let score = 0;
                if (mMeta.protein === meta.protein) score += 2;
                if (mMeta.cat === meta.cat) score += 2;
                if (mMeta.carb === meta.carb) score += 1;
                if (cuisine && m.tags.includes(cuisine)) score += 3;
                return { m, score };
              })
              .filter(x => x.score >= 3)
              .sort((a,b) => b.score - a.score)
              .slice(0, 3)
              .map(x => x.m);

            return (
              <div style={{ padding: 16 }}>
                {/* Top nav: Back + Share */}
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  <button onClick={() => {
                    if (cameFromFinder) {
                      setBrowseDetailAndPersist(null);
                      setBrowseOpenAndPersist(false);
                      setFinderOpen(true);
                      setCameFromFinder(false);
                    } else {
                      setBrowseDetailAndPersist(null);
                    }
                  }} style={{ ...s.btn("secondary"), flex: 1 }}>{E.arrL} {cameFromFinder ? "Finder" : "List"}</button>
                  <button onClick={() => shareMeal(meal)} style={{ ...s.btn("secondary"), flex: "none", padding: "14px 18px" }} title="Share recipe">{"\uD83D\uDCE4"} Share</button>
                </div>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: 32 }}>
                    {meal.emoji}
                    {meal.tags.includes("quick") && <span style={{ fontSize: 20, marginLeft: 2 }}>{"\u26A1"}</span>}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700 }}>{meal.name}</div>
                    <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{E.clock} {meal.time}  {proteinEmoji(meal.protein)} {meal.protein.replace(/^[\d.]+\s*(lbs?|eggs?)\s*/i, "")}</div>
                  </div>
                </div>
                <div style={s.tags}>{meal.tags.map(t => <span key={t} style={s.tag}>{t}</span>)}</div>

                {/* Portion selector */}
                <div style={{ marginTop: 16, padding: 12, background: "#e9f5ef", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#2d6a4f" }}>Portion size</div>
                    <select
                      value={currentPortion}
                      onChange={e => setPortion(meal.id, parseFloat(e.target.value))}
                      style={{ fontSize: 14, fontWeight: 700, padding: "8px 12px", border: "2px solid #2d6a4f", borderRadius: 8, background: "white", color: "#2d6a4f", cursor: "pointer" }}
                    >
                      {portionOpts.map(o => <option key={o} value={o}>{o} {base.unit === "egg" ? "eggs" : "servings"}</option>)}
                    </select>
                  </div>
                  {(() => {
                    const yld = mealYield(meal, factor);
                    return yld ? (
                      <div style={{ fontSize: 13, color: "#2d6a4f", fontWeight: 800, marginBottom: 6, textAlign: "center" }}>{"\uD83C\uDF7D\uFE0F"} Makes ~{yld.count} {yld.label}</div>
                    ) : null;
                  })()}
                  {base.unit !== "egg" && (
                    <div style={{ fontSize: 11, color: "#2d6a4f", fontWeight: 600, marginBottom: 10, textAlign: "right", opacity: 0.8 }}>{"\u2248"} {servingsToLbs(currentPortion)} lbs {meal.protein.replace(/^[\d.]+\s*(lbs?|eggs?)\s*/i, "").trim()}</div>
                  )}
                  {(() => {
                    const displayServings = base.unit === "egg" ? Math.max(1, Math.round(currentPortion / 2)) : currentPortion;
                    const totalKcal = mealKcal(meal, factor);
                    const perServingKcal = Math.round(totalKcal / displayServings / 10) * 10;
                    const lbsRef = base.unit === "egg" ? null : servingsToLbs(currentPortion);
                    const totalProtein = base.unit === "egg"
                      ? Math.round(currentPortion * proteinGramsPer(meal.protein))
                      : Math.round(lbsRef * proteinGramsPer(meal.protein));
                    const perServingProtein = Math.round(totalProtein / displayServings);
                    return (
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12 }}>
                        <div style={{ textAlign: "center", flex: 1 }}>
                          <div style={{ fontWeight: 800, color: "#2d6a4f", fontSize: 13 }}>~{perServingKcal}</div>
                          <div style={{ color: "#2d6a4f", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3, opacity: 0.7 }}>cal ea</div>
                        </div>
                        <div style={{ textAlign: "center", flex: 1, borderLeft: "1px solid #b8dec9" }}>
                          <div style={{ fontWeight: 800, color: "#2d6a4f", fontSize: 13 }}>~{perServingProtein}g</div>
                          <div style={{ color: "#2d6a4f", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3, opacity: 0.7 }}>protein ea</div>
                        </div>
                        <div style={{ textAlign: "center", flex: 1, borderLeft: "1px solid #b8dec9" }}>
                          <div style={{ fontWeight: 800, color: "#2d6a4f", fontSize: 13 }}>~{totalKcal.toLocaleString()}</div>
                          <div style={{ color: "#2d6a4f", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3, opacity: 0.7 }}>cal total</div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div style={{ fontSize: 13, fontWeight: 800, color: "#2d6a4f", marginTop: 18, marginBottom: 6 }}>INGREDIENTS</div>
                {meal.ingredients.map((ing, i) => (
                  <div key={i} style={{ fontSize: 13, padding: "3px 0", color: "#333" }}>{E.bullet} {scaleQty(ing.qty, factor)} {ing.item}</div>
                ))}

                <div style={{ fontSize: 13, fontWeight: 800, color: "#b45309", marginTop: 16, marginBottom: 6 }}>STEPS</div>
                {meal.steps.map((step, i) => (
                  <div key={i} style={s.stepRow}>
                    <div style={s.stepNum}>{i + 1}</div>
                    <div>{step}</div>
                  </div>
                ))}

                {babyMode && (
                  <div style={s.babyBox}>
                    <div style={s.babyTitle}>{E.baby} For baby</div>
                    <div style={s.babyText}>{meal.baby}</div>
                  </div>
                )}

                {/* Add or Remove button */}
                {alreadyAdded ? (
                  <button
                    onClick={() => { removeMealFromWeek(meal.id); }}
                    style={{ ...s.btn("ghost"), width: "100%", flex: "none", marginTop: 20, borderColor: "#b45309", color: "#b45309" }}
                  >{"\u2212"} Remove from this week</button>
                ) : (
                  <button
                    onClick={() => { addMealToWeek(meal.id); setBrowseDetailAndPersist(null); }}
                    style={{ ...s.btn("primary"), width: "100%", flex: "none", marginTop: 20 }}
                  >+ Add to this week</button>
                )}

                <button
                  onClick={() => openCookMode(meal.id)}
                  style={{ ...s.btn("amber"), width: "100%", flex: "none", marginTop: 10 }}
                >{"\uD83D\uDC68\u200D\uD83C\uDF73"} Start Cook Mode</button>

                {/* Similar meals */}
                {similar.length > 0 && (
                  <>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#2d6a4f", marginTop: 28, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>You might also like</div>
                    {similar.map(sm => (
                      <div key={sm.id} style={{ ...s.card(false, false), cursor: "pointer" }} onClick={() => { setBrowseDetailAndPersist(sm.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 22 }}>
                            {sm.emoji}
                            {sm.tags.includes("quick") && <span style={{ fontSize: 13, marginLeft: 2 }}>{"\u26A1"}</span>}
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{sm.name}</div>
                            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{E.clock} {sm.time}</div>
                          </div>
                          <span style={{ fontSize: 18, color: "#bbb" }}>{E.arrR}</span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })()}

          {/* List view */}
          {browseDetail === null && (
            <div style={{ padding: 16 }}>
              <input
                type="text"
                value={browseSearch}
                onChange={e => setBrowseSearch(e.target.value)}
                placeholder="Search meals..."
                style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "2px solid #ddd", borderRadius: 10, boxSizing: "border-box", marginBottom: 10, fontFamily: "inherit" }}
              />
              <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 14, paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
                {["all","quick","chicken","beef","turkey","steak","eggs","pasta","rice","tortilla","potato","italian","mexican","asian"].map(f => (
                  <button
                    key={f}
                    onClick={() => setBrowseFilter(f)}
                    style={{ padding: "6px 14px", borderRadius: 16, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", background: browseFilter === f ? "#2d6a4f" : "#e9e9e4", color: browseFilter === f ? "white" : "#555", textTransform: "capitalize", whiteSpace: "nowrap", flexShrink: 0 }}
                  >{f}</button>
                ))}
              </div>

              {(() => {
                const search = browseSearch.toLowerCase();
                const asianTags = ["asian","chinese","japanese","korean","thai","indian"];
                const filtered = MEALS.filter(m => {
                  if (browseFilter !== "all") {
                    if (browseFilter === "asian") {
                      if (!m.tags.some(t => asianTags.includes(t))) return false;
                    } else if (!m.tags.includes(browseFilter)) return false;
                  }
                  if (search && !m.name.toLowerCase().includes(search)) return false;
                  return true;
                });
                if (filtered.length === 0) return <div style={{ padding: 20, textAlign: "center", color: "#888" }}>No meals match your search.</div>;
                return filtered.map(meal => {
                  const isSelected = selected.includes(meal.id);
                  return (
                    <div key={meal.id} style={{ ...s.card(false, false), cursor: "pointer" }} onClick={() => setBrowseDetailAndPersist(meal.id)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 24 }}>
                          {meal.emoji}
                          {meal.tags.includes("quick") && <span style={{ fontSize: 14, marginLeft: 2 }}>{"\u26A1"}</span>}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3 }}>{meal.name}</div>
                          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{E.clock} {meal.time}</div>
                        </div>
                        {isSelected && <span style={{ fontSize: 20, color: "#2d6a4f", fontWeight: 900 }}>{E.check}</span>}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      )}

      {/* WHAT CAN I MAKE */}
      {finderOpen && (
        <div style={{ position: "fixed", inset: 0, background: "#FAFAF7", zIndex: 150, overflow: "auto", paddingBottom: 40 }}>
          <div style={{ ...s.header, position: "sticky", top: 0, zIndex: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => { setFinderOpen(false); }} style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)", color: "white", padding: "8px 12px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{E.arrL} Back</button>
              <h2 style={{ ...s.headerTitle, fontSize: 20 }}>What Can I Make?</h2>
            </div>
          </div>

          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 14, lineHeight: 1.4 }}>Check off what you have. Meals that use your ingredients will show below, best matches first.</div>

            {/* Curated ingredient groups - items that define a meal, not pantry staples */}
            {(() => {
              // Groups: each entry = [label, keywords that match in ingredient names]
              const GROUPS = [
                { title: "Proteins", items: [
                  { label: "chicken breast", match: ["chicken breast","chicken tender","chicken cutlet"] },
                  { label: "chicken thighs", match: ["chicken thigh","chicken drumstick"] },
                  { label: "ground chicken", match: ["ground chicken"] },
                  { label: "ground beef", match: ["ground beef"] },
                  { label: "steak", match: ["steak","sirloin","flank","skirt","ribeye"] },
                  { label: "ground turkey", match: ["ground turkey"] },
                  { label: "turkey bacon", match: ["turkey bacon"] },
                  { label: "eggs", match: ["eggs"] },
                ]},
                { title: "Veggies", items: [
                  { label: "broccoli", match: ["broccoli"] },
                  { label: "bell peppers", match: ["bell pepper"] },
                  { label: "carrots", match: ["carrot"] },
                  { label: "spinach", match: ["spinach"] },
                  { label: "green beans", match: ["green bean"] },
                  { label: "sweet potatoes", match: ["sweet potato"] },
                  { label: "potatoes", match: ["yukon potato","russet potato","baby potato"," potato"] },
                  { label: "zucchini", match: ["zucchini"] },
                  { label: "mushrooms", match: ["mushroom"] },
                  { label: "cabbage", match: ["cabbage"] },
                  { label: "tomatoes", match: ["tomato","cherry tomato"] },
                  { label: "lettuce", match: ["lettuce"] },
                  { label: "cucumber", match: ["cucumber"] },
                  { label: "avocado", match: ["avocado"] },
                  { label: "corn", match: ["corn"] },
                  { label: "peas", match: ["peas"] },
                ]},
                { title: "Carbs", items: [
                  { label: "rice", match: ["white rice","basmati rice"] },
                  { label: "pasta", match: ["penne","spaghetti","rotini","fettuccine","ziti","macaroni","bowtie","pappardelle","lasagna","orzo","egg noodle","lo mein","chow mein","rice noodle","yakisoba","angel hair"] },
                  { label: "tortillas", match: ["tortilla"] },
                  { label: "bread", match: ["buns","english muffin","pita","sourdough","slider","crusty bread"] },
                  { label: "polenta", match: ["polenta"] },
                  { label: "cornbread", match: ["cornbread"] },
                  { label: "waffles", match: ["waffle"] },
                  { label: "biscuits", match: ["biscuit"] },
                ]},
                { title: "Dairy & Sauces", items: [
                  { label: "cheese", match: ["shredded cheese","mozzarella","parmesan","feta","cheese slice","fresh mozzarella","ricotta"] },
                  { label: "sour cream", match: ["sour cream"] },
                  { label: "greek yogurt", match: ["greek yogurt"] },
                  { label: "heavy cream", match: ["heavy cream"] },
                  { label: "ranch", match: ["ranch"] },
                  { label: "salsa", match: ["salsa"] },
                  { label: "marinara", match: ["marinara"] },
                  { label: "pesto", match: ["pesto"] },
                  { label: "BBQ sauce", match: ["bbq sauce"] },
                ]},
              ];

              return GROUPS.map(group => (
                <div key={group.title} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#2d6a4f", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{group.title}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {group.items.map(opt => {
                      const on = finderIngredients.includes(opt.label);
                      return (
                        <button
                          key={opt.label}
                          onClick={() => {
                            setFinderIngredients(on ? finderIngredients.filter(x => x !== opt.label) : [...finderIngredients, opt.label]);
                          }}
                          style={{ padding: "7px 12px", borderRadius: 16, border: on ? "2px solid #2d6a4f" : "2px solid #ddd", fontSize: 12, fontWeight: 700, cursor: "pointer", background: on ? "#2d6a4f" : "white", color: on ? "white" : "#555" }}
                        >{on ? `${E.check} ` : ""}{opt.label}</button>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}

            {/* Clear button */}
            {finderIngredients.length > 0 && (
              <button onClick={() => setFinderIngredients([])} style={{ ...s.btn("ghost"), flex: "none", marginBottom: 14 }}>Clear all ({finderIngredients.length})</button>
            )}

            {/* Matched meals - uses same GROUPS logic to score */}
            {finderIngredients.length === 0 ? (
              <div style={{ padding: 20, textAlign: "center", color: "#888", fontSize: 14 }}>Pick at least one ingredient above to find meals.</div>
            ) : (() => {
              // Rebuild GROUPS lookup for scoring
              const GROUPS = [
                { title: "Proteins", items: [
                  { label: "chicken breast", match: ["chicken breast","chicken tender","chicken cutlet"] },
                  { label: "chicken thighs", match: ["chicken thigh","chicken drumstick"] },
                  { label: "ground chicken", match: ["ground chicken"] },
                  { label: "ground beef", match: ["ground beef"] },
                  { label: "steak", match: ["steak","sirloin","flank","skirt","ribeye"] },
                  { label: "ground turkey", match: ["ground turkey"] },
                  { label: "turkey bacon", match: ["turkey bacon"] },
                  { label: "eggs", match: ["eggs"] },
                ]},
                { title: "Veggies", items: [
                  { label: "broccoli", match: ["broccoli"] },
                  { label: "bell peppers", match: ["bell pepper"] },
                  { label: "carrots", match: ["carrot"] },
                  { label: "spinach", match: ["spinach"] },
                  { label: "green beans", match: ["green bean"] },
                  { label: "sweet potatoes", match: ["sweet potato"] },
                  { label: "potatoes", match: ["yukon potato","russet potato","baby potato"," potato"] },
                  { label: "zucchini", match: ["zucchini"] },
                  { label: "mushrooms", match: ["mushroom"] },
                  { label: "cabbage", match: ["cabbage"] },
                  { label: "tomatoes", match: ["tomato","cherry tomato"] },
                  { label: "lettuce", match: ["lettuce"] },
                  { label: "cucumber", match: ["cucumber"] },
                  { label: "avocado", match: ["avocado"] },
                  { label: "corn", match: ["corn"] },
                  { label: "peas", match: ["peas"] },
                ]},
                { title: "Carbs", items: [
                  { label: "rice", match: ["white rice","basmati rice"] },
                  { label: "pasta", match: ["penne","spaghetti","rotini","fettuccine","ziti","macaroni","bowtie","pappardelle","lasagna","orzo","egg noodle","lo mein","chow mein","rice noodle","yakisoba","angel hair"] },
                  { label: "tortillas", match: ["tortilla"] },
                  { label: "bread", match: ["buns","english muffin","pita","sourdough","slider","crusty bread"] },
                  { label: "polenta", match: ["polenta"] },
                  { label: "cornbread", match: ["cornbread"] },
                  { label: "waffles", match: ["waffle"] },
                  { label: "biscuits", match: ["biscuit"] },
                ]},
                { title: "Dairy & Sauces", items: [
                  { label: "cheese", match: ["shredded cheese","mozzarella","parmesan","feta","cheese slice","fresh mozzarella","ricotta"] },
                  { label: "sour cream", match: ["sour cream"] },
                  { label: "greek yogurt", match: ["greek yogurt"] },
                  { label: "heavy cream", match: ["heavy cream"] },
                  { label: "ranch", match: ["ranch"] },
                  { label: "salsa", match: ["salsa"] },
                  { label: "marinara", match: ["marinara"] },
                  { label: "pesto", match: ["pesto"] },
                  { label: "BBQ sauce", match: ["bbq sauce"] },
                ]},
              ];
              const labelToMatches = {};
              GROUPS.forEach(g => g.items.forEach(i => labelToMatches[i.label] = i.match));

              function mealMatchesLabel(meal, label) {
                const patterns = labelToMatches[label] || [label];
                return meal.ingredients.some(ing => {
                  const name = ing.item.toLowerCase();
                  return patterns.some(p => name.includes(p.toLowerCase()));
                });
              }

              const scored = MEALS.map(meal => {
                const matched = finderIngredients.filter(f => mealMatchesLabel(meal, f));
                return { meal, matchCount: matched.length, matched };
              })
                .filter(x => x.matchCount > 0)
                .sort((a,b) => b.matchCount - a.matchCount);

              if (scored.length === 0) return <div style={{ padding: 20, textAlign: "center", color: "#888" }}>No meals match those ingredients.</div>;

              return scored.map(({ meal, matchCount, matched }) => {
                const isSelected = selected.includes(meal.id);
                return (
                  <div key={meal.id} style={{ ...s.card(false, false), cursor: "pointer" }} onClick={() => { setBrowseDetailAndPersist(meal.id); setBrowseOpenAndPersist(true); setFinderOpen(false); setCameFromFinder(true); }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 24 }}>
                        {meal.emoji}
                        {meal.tags.includes("quick") && <span style={{ fontSize: 14, marginLeft: 2 }}>{"\u26A1"}</span>}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3 }}>{meal.name}</div>
                        <div style={{ fontSize: 12, color: "#2d6a4f", marginTop: 2, fontWeight: 700 }}>Uses {matchCount} of your ingredients</div>
                        <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{matched.join(", ")}</div>
                      </div>
                      {isSelected && <span style={{ fontSize: 20, color: "#2d6a4f", fontWeight: 900 }}>{E.check}</span>}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* COOK MODE */}
      {cookMealId !== null && (() => {
        const meal = MEALS.find(m => m.id === cookMealId);
        if (!meal) return null;
        const totalSteps = meal.steps.length;
        const currentStepText = meal.steps[cookStep];
        const timerSecs = extractTimerSeconds(currentStepText);
        const fmt = (s) => {
          const m = Math.floor(s / 60);
          const sec = s % 60;
          return `${m}:${sec.toString().padStart(2, "0")}`;
        };

        // Compute remaining time for each running timer
        const now = Date.now();
        const activeTimers = cookTimers.map(t => {
          const elapsed = Math.floor((now - t.startedAt) / 1000);
          const remaining = Math.max(0, t.seconds - elapsed);
          return { ...t, remaining };
        });
        // Has the user already started a timer for THIS step? (don't show start button if so)
        const currentStepTimerStarted = cookTimers.some(t => t.stepIndex === cookStep);

        // Try to derive a friendly label for a new timer based on the step text
        function deriveLabel(stepText) {
          if (!stepText) return "Timer";
          const lower = stepText.toLowerCase();
          if (lower.includes("rice")) return "\uD83C\uDF5A Rice";
          if (lower.includes("pasta") || lower.includes("noodle")) return "\uD83C\uDF5D Pasta";
          if (lower.includes("bake") || lower.includes("oven") || lower.includes("roast")) return "\uD83D\uDD25 Oven";
          if (lower.includes("simmer")) return "\uD83C\uDF72 Simmer";
          if (lower.includes("steam")) return "\uD83D\uDCA8 Steam";
          if (lower.includes("rest")) return "\u23F8\uFE0F Rest";
          if (lower.includes("marinate")) return "\uD83C\uDFAF Marinate";
          if (lower.includes("boil")) return "\uD83D\uDCA7 Boil";
          if (lower.includes("chicken")) return "\uD83D\uDC14 Chicken";
          if (lower.includes("beef") || lower.includes("steak")) return "\uD83E\uDD69 Beef";
          if (lower.includes("turkey")) return "\uD83E\uDD83 Turkey";
          return "\u23F1 Timer";
        }

        return (
          <div style={{ position: "fixed", inset: 0, background: "#1a1a1a", color: "white", zIndex: 200, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <button
                onClick={closeCookMode}
                style={{ background: "transparent", border: "1px solid #555", color: "white", padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >Exit</button>
              <div style={{ flex: 1, textAlign: "center", fontSize: 13, color: "#aaa" }}>
                Step {cookStep + 1} of {totalSteps}
              </div>
              <span style={{ fontSize: 24 }}>{meal.emoji}</span>
            </div>

            {/* Progress bar */}
            <div style={{ height: 4, background: "#333" }}>
              <div style={{ width: `${((cookStep + 1) / totalSteps) * 100}%`, height: "100%", background: "#52b788", transition: "width 0.3s" }}></div>
            </div>

            {/* Active timer chips - shown across all steps */}
            {activeTimers.length > 0 && (
              <div style={{ padding: "10px 12px", background: "#0f0f0f", borderBottom: "1px solid #333", display: "flex", gap: 8, overflowX: "auto", flexShrink: 0 }}>
                {activeTimers.map(t => {
                  const done = t.remaining === 0;
                  return (
                    <div key={t.id} style={{ flexShrink: 0, padding: "8px 12px", background: done ? "#52b788" : "#2a2a2a", borderRadius: 999, display: "flex", alignItems: "center", gap: 8, border: done ? "2px solid #52b788" : "1px solid #444" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: done ? "white" : "#ccc" }}>{t.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "monospace", color: done ? "white" : "#52b788" }}>{done ? "DONE!" : fmt(t.remaining)}</span>
                      <button
                        onClick={() => dismissCookTimer(t.id)}
                        style={{ background: "transparent", border: "none", color: done ? "white" : "#888", fontSize: 16, cursor: "pointer", padding: "0 4px", fontWeight: 700, lineHeight: 1 }}
                        title="Dismiss"
                      >{"\u00D7"}</button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Meal title */}
            <div style={{ padding: "16px 20px 0", fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#aaa" }}>{meal.name}</div>

            {/* Current step - big text */}
            <div style={{ flex: 1, padding: "24px 20px", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "auto" }}>
              <div style={{ fontSize: 22, lineHeight: 1.5, fontWeight: 500, color: "white" }}>{currentStepText}</div>

              {/* Add timer button if this step has a duration and timer not yet started */}
              {timerSecs && !currentStepTimerStarted && (
                <button
                  onClick={() => {
                    const newTimer = { id: Date.now() + Math.random(), label: deriveLabel(currentStepText), seconds: timerSecs, startedAt: Date.now(), stepIndex: cookStep };
                    setCookTimers(prev => [...prev, newTimer]);
                    setCookTimerTick(0);
                  }}
                  style={{ marginTop: 28, padding: "16px 20px", background: "#b45309", color: "white", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer", alignSelf: "flex-start" }}
                >{"\u23F1"} Start {fmt(timerSecs)} timer ({deriveLabel(currentStepText)})</button>
              )}
            </div>

            {/* Nav buttons */}
            <div style={{ padding: "16px 20px 28px", borderTop: "1px solid #333", display: "flex", gap: 10 }}>
              <button
                onClick={() => { if (cookStep > 0) { setCookStep(cookStep - 1); } }}
                disabled={cookStep === 0}
                style={{ flex: 1, padding: "16px 20px", background: "transparent", border: "2px solid #555", color: cookStep === 0 ? "#555" : "white", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: cookStep === 0 ? "default" : "pointer" }}
              >{E.arrL} Back</button>
              {cookStep < totalSteps - 1 ? (
                <button
                  onClick={() => { setCookStep(cookStep + 1); }}
                  style={{ flex: 2, padding: "16px 20px", background: "#52b788", border: "none", color: "white", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer" }}
                >Next {E.arrR}</button>
              ) : (
                <button
                  onClick={() => { showToast("Nice work! \uD83C\uDF89 Enjoy your meal"); closeCookMode(); }}
                  style={{ flex: 2, padding: "16px 20px", background: "#52b788", border: "none", color: "white", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer" }}
                >{E.check} Done!</button>
              )}
            </div>
          </div>
        );
      })()}

      {/* TOAST */}
      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  );
}
