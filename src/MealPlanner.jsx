import { useState, useEffect, useRef } from "react";

// ============ MEAL POOL (60 meals) ============
const MEALS = [
  { id: 1, name: "Lemon Garlic Chicken, Rice & Broccoli", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF4B", tags: ["chicken", "rice"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"lemon",qty:"2",aisle:"Produce"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"broccoli",qty:"2 heads",aisle:"Produce"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"salt",qty:"to taste",aisle:"Pantry"},{item:"black pepper",qty:"to taste",aisle:"Pantry"}], steps:["Cook rice per package directions.","Season chicken with salt, pepper, garlic powder.","Heat olive oil in skillet, cook chicken 6-7 min per side.","Steam broccoli 5 min.","Melt butter, add garlic and lemon juice.","Pour over chicken, serve with rice and broccoli."], baby:"Shred small pieces of chicken, soft broccoli florets, rice bits." },
  { id: 2, name: "Beef Veggie Stir-Fry & Rice", time: "25 min", protein: "3 lbs sirloin strips", emoji: "\uD83E\uDD69", tags: ["beef", "rice"], ingredients: [{item:"sirloin steak strips",qty:"3 lbs",aisle:"Proteins"},{item:"bell peppers",qty:"3",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"cornstarch",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Slice veggies.","Toss beef with cornstarch and soy sauce.","Heat sesame oil, sear beef 3 min, remove.","Stir-fry veggies 5 min.","Return beef, add sauce, toss 2 min. Serve over rice."], baby:"Soft-cooked carrots and rice, tiny beef pieces." },
  { id: 3, name: "Turkey Taco Bowls", time: "20 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF2E", tags: ["turkey", "rice"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"corn",qty:"1 bag",aisle:"Frozen"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"}], steps:["Cook rice.","Brown turkey 8 min.","Add taco seasoning and 1/2 cup water, simmer 5 min.","Heat beans and corn.","Build bowls: rice, turkey, beans, corn, cheese, sour cream."], baby:"Plain rice with shredded cheese and soft black beans." },
  { id: 4, name: "One-Pot Chicken Pasta with Spinach", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF5D", tags: ["chicken", "pasta"], ingredients: [{item:"chicken thighs (boneless)",qty:"3 lbs",aisle:"Proteins"},{item:"penne pasta",qty:"1 lb",aisle:"Grains"},{item:"spinach",qty:"6 oz bag",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"chicken broth",qty:"4 cups",aisle:"Canned"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"heavy cream",qty:"1 cup",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cube chicken, season with salt/pepper.","Heat oil in pot, brown chicken 6 min.","Add garlic, cook 1 min.","Add broth, cream, pasta. Simmer 12 min covered.","Stir in spinach and parmesan. Serve."], baby:"Plain pasta pieces with a little cream sauce." },
  { id: 5, name: "Sheet Pan Steak & Sweet Potato Fries", time: "30 min", protein: "3 lbs steak", emoji: "\uD83E\uDD69", tags: ["steak", "potato"], ingredients: [{item:"steak (sirloin or strip)",qty:"3 lbs",aisle:"Proteins"},{item:"sweet potatoes",qty:"4 large",aisle:"Produce"},{item:"green beans",qty:"1 lb",aisle:"Produce"},{item:"olive oil",qty:"4 tbsp",aisle:"Pantry"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"paprika",qty:"2 tsp",aisle:"Pantry"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"}], steps:["Preheat oven 425F.","Cut sweet potatoes into fries, toss with oil and paprika.","Bake 15 min.","Add green beans and steak to pan.","Roast 10-12 min more.","Top steak with butter and rest 5 min. Slice."], baby:"Soft sweet potato pieces, tiny steak bits." },
  { id: 6, name: "Chicken & Black Bean Burritos", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF2F", tags: ["chicken", "tortilla"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"bell pepper",qty:"2",aisle:"Produce"},{item:"taco seasoning",qty:"1 packet",aisle:"Pantry"},{item:"salsa",qty:"1 jar",aisle:"Canned"}], steps:["Cook rice.","Dice chicken, season with taco seasoning.","Cook chicken 8 min in skillet.","Add peppers and beans, heat through.","Warm tortillas.","Fill with rice, chicken, cheese, salsa. Roll up."], baby:"Rice, shredded cheese, soft black beans on the side." },
  { id: 7, name: "Ground Beef & Potato Skillet", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83E\uDD54", tags: ["beef", "potato"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"yukon potatoes",qty:"2 lbs",aisle:"Produce"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"shredded cheese",qty:"1.5 cups",aisle:"Dairy"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"paprika",qty:"2 tsp",aisle:"Pantry"}], steps:["Dice potatoes small.","Heat oil in big skillet, cook potatoes covered 12 min, stirring.","Push to side, brown beef 8 min.","Add peppers and garlic, cook 3 min.","Mix together, season with paprika, salt, pepper.","Top with cheese, cover 2 min to melt."], baby:"Soft potato pieces, tiny crumbles of beef." },
  { id: 8, name: "Turkey Meatball Pasta", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF5D", tags: ["turkey", "pasta"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"spaghetti",qty:"1 lb",aisle:"Grains"},{item:"marinara sauce",qty:"2 jars",aisle:"Canned"},{item:"breadcrumbs",qty:"1 cup",aisle:"Grains"},{item:"eggs",qty:"2",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Mix turkey, breadcrumbs, eggs, parmesan, garlic powder, salt.","Roll into ~20 meatballs.","Heat oil, brown meatballs 8 min total.","Add marinara, simmer 10 min.","Cook pasta.","Serve meatballs over pasta with parmesan."], baby:"Cut meatball into tiny pieces, short pasta with a little sauce." },
  { id: 9, name: "Egg Fried Rice & Veggies", time: "20 min", protein: "12 eggs", emoji: "\uD83C\uDF5B", tags: ["eggs", "rice"], ingredients: [{item:"eggs",qty:"12",aisle:"Dairy"},{item:"white rice",qty:"3 cups dry",aisle:"Grains"},{item:"frozen peas and carrots",qty:"2 cups",aisle:"Frozen"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Cook rice ahead or use leftover.","Scramble eggs in big skillet, set aside.","Melt butter, add garlic and frozen veggies, cook 4 min.","Add rice, break up clumps, stir 3 min.","Add soy sauce and sesame oil.","Fold in eggs, serve."], baby:"Plain scrambled egg pieces and soft rice." },
  { id: 10, name: "Chicken Veggie Quesadillas + Sweet Potato", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDDC0", tags: ["chicken", "tortilla"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"spinach",qty:"4 oz",aisle:"Produce"},{item:"sweet potatoes",qty:"3 large",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"taco seasoning",qty:"1 packet",aisle:"Pantry"}], steps:["Preheat oven 425F. Cut sweet potatoes into wedges, toss with oil.","Bake 20 min.","Dice chicken, season. Cook in skillet 8 min.","Add peppers and spinach, cook 3 min.","Layer tortilla with cheese, chicken mix, cheese. Top with tortilla.","Cook in dry skillet 2 min per side. Cut into wedges."], baby:"Soft sweet potato mashed, small cheese and chicken bits." },
  { id: 11, name: "Garlic Butter Chicken & Mashed Potatoes", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDDC8", tags: ["chicken", "potato"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"yukon potatoes",qty:"3 lbs",aisle:"Produce"},{item:"butter",qty:"1 stick",aisle:"Dairy"},{item:"milk",qty:"1/2 cup",aisle:"Dairy"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"green beans",qty:"1 lb",aisle:"Produce"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"},{item:"parsley",qty:"small bunch",aisle:"Produce"}], steps:["Boil potatoes 15 min until tender.","Season chicken, cook in oil 6 min per side.","Steam green beans 5 min.","Mash potatoes with butter, milk, salt.","Melt butter with garlic, pour over chicken.","Sprinkle parsley, serve."], baby:"Mashed potato with no seasoning, soft green beans." },
  { id: 12, name: "Beef & Rice Taco Skillet", time: "25 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF36", tags: ["beef", "rice"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"diced tomatoes",qty:"2 cans",aisle:"Canned"},{item:"black beans",qty:"1 can",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"bell pepper",qty:"1",aisle:"Produce"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"}], steps:["Brown beef 8 min, drain.","Add taco seasoning, tomatoes, beans, rice, 2 cups water.","Bring to boil, cover, simmer 18 min.","Add bell pepper last 3 min.","Top with cheese, cover 2 min.","Serve with sour cream."], baby:"Scoop rice and beans with a little cheese." },
  { id: 13, name: "Chicken Alfredo Pasta", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF5D", tags: ["chicken", "pasta"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"fettuccine",qty:"1 lb",aisle:"Grains"},{item:"heavy cream",qty:"2 cups",aisle:"Dairy"},{item:"parmesan",qty:"2 cups",aisle:"Dairy"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook pasta, reserve 1 cup water.","Season chicken, cook 6 min per side. Slice.","Steam broccoli 5 min.","Melt butter, saute garlic 1 min.","Add cream and parmesan, whisk until smooth.","Toss pasta and broccoli in sauce, top with chicken."], baby:"Plain pasta pieces with a little sauce, soft broccoli." },
  { id: 14, name: "Turkey Stuffed Peppers", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF36", tags: ["turkey", "rice"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"bell peppers",qty:"8 large",aisle:"Produce"},{item:"white rice",qty:"1.5 cups",aisle:"Grains"},{item:"diced tomatoes",qty:"1 can",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Preheat oven 400F. Cook rice.","Halve peppers, remove seeds.","Brown turkey with garlic and seasoning 8 min.","Mix turkey, rice, tomatoes.","Fill peppers, top with cheese.","Bake 18 min covered, 5 min uncovered."], baby:"Scoop filling, mash pepper piece, small cheese bits." },
  { id: 15, name: "Steak Fajita Bowls", time: "25 min", protein: "3 lbs steak", emoji: "\uD83C\uDF2F", tags: ["steak", "rice"], ingredients: [{item:"flank or skirt steak",qty:"3 lbs",aisle:"Proteins"},{item:"bell peppers",qty:"3",aisle:"Produce"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"black beans",qty:"1 can",aisle:"Canned"},{item:"lime",qty:"2",aisle:"Produce"},{item:"fajita seasoning",qty:"2 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"shredded cheese",qty:"1 cup",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"}], steps:["Cook rice with lime juice.","Season steak with fajita seasoning.","Sear steak 4 min per side, rest.","Saute peppers 5 min.","Slice steak against grain.","Build bowls: rice, beans, steak, peppers, cheese, sour cream."], baby:"Rice with soft pepper pieces, tiny steak bits." },
  { id: 16, name: "Chicken Fried Rice", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF5A", tags: ["chicken", "rice"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"3 cups dry",aisle:"Grains"},{item:"eggs",qty:"4",aisle:"Dairy"},{item:"frozen peas and carrots",qty:"2 cups",aisle:"Frozen"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Cook rice, cool slightly.","Dice chicken, cook 8 min in oil.","Scramble eggs, set aside.","Melt butter, add garlic and veggies, 4 min.","Add rice, chicken, soy sauce, sesame oil.","Fold in eggs, serve."], baby:"Plain rice and scrambled egg bits." },
  { id: 17, name: "Beef & Broccoli Over Rice", time: "25 min", protein: "3 lbs sirloin", emoji: "\uD83E\uDD66", tags: ["beef", "rice"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"broccoli",qty:"2 heads",aisle:"Produce"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"brown sugar",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"},{item:"cornstarch",qty:"2 tbsp",aisle:"Pantry"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Slice beef thin, toss with cornstarch.","Whisk soy sauce, brown sugar, garlic, ginger, 1/2 cup water.","Sear beef 3 min in sesame oil, remove.","Stir-fry broccoli 4 min.","Add sauce and beef, thicken 2 min. Serve over rice."], baby:"Soft broccoli florets with rice." },
  { id: 18, name: "Turkey Burgers & Sweet Potato Fries", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF54", tags: ["turkey", "potato"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"burger buns",qty:"8",aisle:"Grains"},{item:"sweet potatoes",qty:"3 large",aisle:"Produce"},{item:"cheese slices",qty:"8",aisle:"Dairy"},{item:"lettuce",qty:"1 head",aisle:"Produce"},{item:"tomato",qty:"2",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"}], steps:["Preheat oven 425F. Cut fries, toss with oil, salt.","Bake 20 min.","Form turkey into 6-8 patties, season.","Cook in skillet 5 min per side, add cheese last minute.","Toast buns.","Build with lettuce and tomato."], baby:"Soft sweet potato piece, crumbled plain burger." },
  { id: 19, name: "Chicken Tortilla Soup Bowls", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF5C", tags: ["chicken", "tortilla"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"chicken broth",qty:"6 cups",aisle:"Canned"},{item:"diced tomatoes",qty:"2 cans",aisle:"Canned"},{item:"black beans",qty:"1 can",aisle:"Canned"},{item:"corn",qty:"1 bag",aisle:"Frozen"},{item:"tortilla chips",qty:"1 bag",aisle:"Grains"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"taco seasoning",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"}], steps:["Dice chicken.","Cook chicken with garlic 6 min.","Add broth, tomatoes, beans, corn, taco seasoning.","Simmer 15 min.","Ladle into bowls, top with chips, cheese, sour cream."], baby:"Small chicken pieces with soft beans, skip chips." },
  { id: 20, name: "Beef Pasta Skillet", time: "25 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF5D", tags: ["beef", "pasta"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"penne pasta",qty:"1 lb",aisle:"Grains"},{item:"marinara sauce",qty:"2 jars",aisle:"Canned"},{item:"shredded mozzarella",qty:"2 cups",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"},{item:"parmesan",qty:"1/2 cup",aisle:"Dairy"}], steps:["Cook pasta.","Brown beef with garlic 8 min.","Add marinara, italian seasoning, simmer 5 min.","Toss pasta with sauce.","Top with mozzarella, cover 2 min to melt.","Sprinkle parmesan."], baby:"Plain pasta with a little sauce, skip cheese if melted." },
  { id: 21, name: "BBQ Chicken Wraps", time: "20 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF2F", tags: ["chicken", "tortilla"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"bbq sauce",qty:"1 bottle",aisle:"Pantry"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"lettuce",qty:"1 head",aisle:"Produce"},{item:"ranch dressing",qty:"1 cup",aisle:"Dairy"},{item:"corn",qty:"1 bag",aisle:"Frozen"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Dice chicken, season.","Cook chicken 8 min in oil.","Toss with bbq sauce.","Heat corn.","Warm tortillas.","Fill with chicken, corn, cheese, lettuce, ranch. Roll."], baby:"Plain chicken pieces and corn, no sauce." },
  { id: 22, name: "Steak & Cheese Rice Bowls", time: "25 min", protein: "3 lbs steak", emoji: "\uD83E\uDDC0", tags: ["steak", "rice"], ingredients: [{item:"flank steak",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"soy sauce",qty:"3 tbsp",aisle:"Pantry"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"}], steps:["Cook rice.","Slice steak, season.","Sear steak 3 min per side.","Saute peppers 4 min with garlic.","Build bowls: rice, steak, peppers, cheese.","Drizzle soy and top with butter."], baby:"Soft rice with melted cheese, tiny steak bits." },
  { id: 23, name: "Turkey Chili with Cornbread", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF36", tags: ["turkey", "bread"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"cornbread mix",qty:"2 boxes",aisle:"Grains"},{item:"kidney beans",qty:"2 cans",aisle:"Canned"},{item:"black beans",qty:"1 can",aisle:"Canned"},{item:"diced tomatoes",qty:"2 cans",aisle:"Canned"},{item:"tomato sauce",qty:"1 can",aisle:"Canned"},{item:"chili powder",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"bell pepper",qty:"1",aisle:"Produce"}], steps:["Prep cornbread per box, bake per instructions.","Brown turkey with garlic 8 min.","Add bell pepper, 3 min.","Add beans, tomatoes, sauce, chili powder.","Simmer 15 min.","Serve with cornbread."], baby:"Crumble cornbread, mash beans." },
  { id: 24, name: "Chicken Parmesan & Spaghetti", time: "30 min", protein: "3 lbs chicken cutlets", emoji: "\uD83C\uDF5D", tags: ["chicken", "pasta"], ingredients: [{item:"chicken cutlets",qty:"3 lbs",aisle:"Proteins"},{item:"spaghetti",qty:"1 lb",aisle:"Grains"},{item:"marinara sauce",qty:"2 jars",aisle:"Canned"},{item:"mozzarella",qty:"2 cups shredded",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"breadcrumbs",qty:"1.5 cups",aisle:"Grains"},{item:"eggs",qty:"3",aisle:"Dairy"},{item:"olive oil",qty:"1/2 cup",aisle:"Pantry"}], steps:["Preheat oven 425F. Cook pasta.","Dip cutlets in egg, then breadcrumbs.","Pan-fry 3 min per side.","Place on sheet, top with sauce and cheeses.","Bake 8 min.","Serve over pasta with more sauce."], baby:"Plain pasta, small crumbs of chicken (no crust)." },
  { id: 25, name: "Egg & Cheese Breakfast Burritos", time: "20 min", protein: "14 eggs", emoji: "\uD83C\uDF2F", tags: ["eggs", "tortilla"], ingredients: [{item:"eggs",qty:"14",aisle:"Dairy"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"bell pepper",qty:"2",aisle:"Produce"},{item:"potatoes",qty:"3",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Dice potatoes small, fry in oil 12 min until crispy.","Add peppers last 3 min.","Scramble eggs in butter.","Warm tortillas.","Fill with eggs, potatoes, peppers, cheese, salsa. Roll."], baby:"Plain scrambled eggs with cheese." },
  { id: 26, name: "Chicken Rice Casserole", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDD58", tags: ["chicken", "rice"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"cream of chicken soup",qty:"2 cans",aisle:"Canned"},{item:"chicken broth",qty:"2 cups",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"frozen peas and carrots",qty:"2 cups",aisle:"Frozen"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Preheat oven 375F.","Dice chicken.","Mix rice, soup, broth, veggies, chicken, seasoning in baking dish.","Dot with butter, cover with foil.","Bake 25 min covered.","Top with cheese, bake 5 min uncovered."], baby:"Soft rice with mashed veggies and chicken pieces." },
  { id: 27, name: "Ground Beef Tacos", time: "20 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF2E", tags: ["beef", "tortilla"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"taco shells",qty:"16",aisle:"Grains"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"lettuce",qty:"1 head",aisle:"Produce"},{item:"tomato",qty:"2",aisle:"Produce"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"}], steps:["Brown beef 8 min.","Add taco seasoning and 1/2 cup water, simmer 5 min.","Warm shells per package.","Prep toppings.","Fill shells with beef, cheese, lettuce, tomato, sour cream."], baby:"Crumbled beef with shredded cheese, soft tomato." },
  { id: 28, name: "Chicken Pesto Pasta", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF3F", tags: ["chicken", "pasta"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"penne pasta",qty:"1 lb",aisle:"Grains"},{item:"pesto",qty:"1 jar",aisle:"Canned"},{item:"cherry tomatoes",qty:"2 pints",aisle:"Produce"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"spinach",qty:"4 oz",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"}], steps:["Cook pasta, reserve 1/2 cup water.","Dice chicken, season and cook 8 min.","Halve tomatoes, add with garlic, 3 min.","Toss pasta with pesto, chicken, tomatoes, spinach.","Add pasta water if dry.","Top with parmesan."], baby:"Plain pasta pieces with small chicken bits." },
  { id: 29, name: "Steak Tips, Rice & Corn", time: "25 min", protein: "3 lbs steak tips", emoji: "\uD83C\uDF3D", tags: ["steak", "rice"], ingredients: [{item:"steak tips (sirloin)",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"corn",qty:"1 bag frozen",aisle:"Frozen"},{item:"soy sauce",qty:"1/4 cup",aisle:"Pantry"},{item:"worcestershire",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Marinate steak tips in soy and worcestershire 10 min.","Heat oil, sear tips 5 min, add garlic.","Cook 3 more min, remove.","Heat corn with butter.","Serve tips over rice with corn."], baby:"Soft corn kernels and rice, tiny steak bits." },
  { id: 30, name: "Turkey Sloppy Joes & Fries", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF5F", tags: ["turkey", "bread"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"burger buns",qty:"8",aisle:"Grains"},{item:"frozen fries",qty:"2 bags",aisle:"Frozen"},{item:"tomato sauce",qty:"1 can",aisle:"Canned"},{item:"ketchup",qty:"1/2 cup",aisle:"Pantry"},{item:"brown sugar",qty:"3 tbsp",aisle:"Pantry"},{item:"worcestershire",qty:"2 tbsp",aisle:"Pantry"},{item:"bell pepper",qty:"1",aisle:"Produce"},{item:"garlic",qty:"2 cloves",aisle:"Produce"}], steps:["Bake fries per package.","Brown turkey with bell pepper and garlic 8 min.","Add sauce, ketchup, sugar, worcestershire.","Simmer 10 min.","Toast buns.","Spoon onto buns, serve with fries."], baby:"Soft bun pieces with a little plain turkey." },
  { id: 31, name: "Chicken Teriyaki Rice Bowls", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF5A", tags: ["chicken", "rice"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"teriyaki sauce",qty:"1 bottle",aisle:"Pantry"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"sesame seeds",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Dice chicken, cook in sesame oil 8 min.","Add garlic, 1 min.","Pour in teriyaki, simmer 3 min.","Steam broccoli and carrots 5 min.","Serve over rice, top with sesame seeds."], baby:"Plain rice with soft broccoli and carrot." },
  { id: 32, name: "Beef Enchilada Bowls", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF36", tags: ["beef", "rice"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"enchilada sauce",qty:"2 cans",aisle:"Canned"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"shredded cheese",qty:"2.5 cups",aisle:"Dairy"},{item:"bell pepper",qty:"2",aisle:"Produce"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"taco seasoning",qty:"1 packet",aisle:"Pantry"}], steps:["Cook rice.","Brown beef 8 min, add seasoning.","Add peppers, 3 min.","Stir in enchilada sauce, simmer 5 min.","Heat beans.","Layer bowls: rice, beef, beans, cheese, sour cream."], baby:"Rice with soft beans and cheese." },
  { id: 33, name: "Chicken & Corn Pasta", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF3D", tags: ["chicken", "pasta"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"bowtie pasta",qty:"1 lb",aisle:"Grains"},{item:"corn",qty:"2 cups frozen",aisle:"Frozen"},{item:"heavy cream",qty:"1.5 cups",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook pasta.","Dice chicken, cook in oil 8 min.","Add garlic, 1 min.","Stir in cream and corn, simmer 3 min.","Add parmesan and butter.","Toss with pasta."], baby:"Plain pasta with corn and small chicken pieces." },
  { id: 34, name: "Steak & Potato Hash", time: "30 min", protein: "3 lbs steak", emoji: "\uD83E\uDD54", tags: ["steak", "potato"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"yukon potatoes",qty:"2 lbs",aisle:"Produce"},{item:"bell pepper",qty:"2",aisle:"Produce"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"eggs",qty:"6",aisle:"Dairy"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"},{item:"paprika",qty:"1 tsp",aisle:"Pantry"}], steps:["Dice potatoes small, fry in oil 12 min covered.","Dice steak, add with peppers and garlic, 6 min.","Season with paprika and salt.","Make wells, crack eggs in.","Cover, cook 3 min until eggs set.","Top with butter."], baby:"Soft potato pieces and scrambled egg." },
  { id: 35, name: "Turkey Taco Pasta", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF5D", tags: ["turkey", "pasta"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"rotini pasta",qty:"1 lb",aisle:"Grains"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"diced tomatoes",qty:"2 cans",aisle:"Canned"},{item:"tomato sauce",qty:"1 can",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"bell pepper",qty:"1",aisle:"Produce"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"}], steps:["Cook pasta.","Brown turkey with pepper 8 min.","Add seasoning, tomatoes, sauce, 1 cup water.","Simmer 8 min.","Toss with pasta.","Top with cheese, cover 2 min. Serve with sour cream."], baby:"Plain pasta with a little sauce and cheese." },
  { id: 36, name: "Chicken Sweet Potato Sheet Pan", time: "30 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF60", tags: ["chicken", "potato"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"sweet potatoes",qty:"3 large",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"paprika",qty:"1 tsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"honey",qty:"2 tbsp",aisle:"Pantry"}], steps:["Preheat oven 425F.","Cube sweet potatoes, toss with oil and spices.","Roast 10 min.","Add chicken and broccoli, drizzle with honey.","Roast 18 min more.","Top chicken with butter, rest 3 min."], baby:"Mashed sweet potato and soft chicken pieces." },
  { id: 37, name: "Beef & Rice Stuffed Peppers", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF36", tags: ["beef", "rice"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"bell peppers",qty:"8 large",aisle:"Produce"},{item:"white rice",qty:"1.5 cups",aisle:"Grains"},{item:"diced tomatoes",qty:"1 can",aisle:"Canned"},{item:"tomato sauce",qty:"1 can",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"}], steps:["Preheat oven 400F. Cook rice.","Halve peppers.","Brown beef with garlic 8 min.","Mix beef, rice, tomatoes, sauce, seasoning.","Fill peppers, top with cheese.","Bake 18 min covered, 5 uncovered."], baby:"Scoop soft filling and pepper piece." },
  { id: 38, name: "Egg Veggie Scramble & Toast", time: "20 min", protein: "14 eggs", emoji: "\uD83C\uDF5E", tags: ["eggs", "bread"], ingredients: [{item:"eggs",qty:"14",aisle:"Dairy"},{item:"sourdough bread",qty:"1 loaf",aisle:"Grains"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"spinach",qty:"4 oz",aisle:"Produce"},{item:"shredded cheese",qty:"1.5 cups",aisle:"Dairy"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"garlic",qty:"2 cloves",aisle:"Produce"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Heat oil, saute peppers and garlic 5 min.","Add spinach, 1 min.","Pour beaten eggs, scramble 4 min.","Stir in cheese.","Toast bread with butter.","Serve eggs over toast."], baby:"Plain scrambled egg pieces and soft toast strips." },
  { id: 39, name: "Chicken Burrito Bowls", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDD51", tags: ["chicken", "rice"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"corn",qty:"1 bag",aisle:"Frozen"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"lime",qty:"2",aisle:"Produce"},{item:"taco seasoning",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice with lime juice.","Dice chicken, season.","Cook chicken 8 min.","Heat beans and corn.","Build bowls: rice, chicken, beans, corn, cheese, salsa, sour cream."], baby:"Plain rice with soft beans and corn." },
  { id: 40, name: "Beef & Green Bean Stir-Fry", time: "25 min", protein: "3 lbs sirloin", emoji: "\uD83E\uDD57", tags: ["beef", "rice"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"green beans",qty:"1.5 lbs",aisle:"Produce"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"cornstarch",qty:"2 tbsp",aisle:"Pantry"},{item:"brown sugar",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Slice beef, toss with cornstarch.","Whisk soy, garlic, ginger, sugar, 1/2 cup water.","Sear beef 3 min in sesame oil, remove.","Stir-fry green beans 5 min.","Add sauce and beef, thicken. Serve over rice."], baby:"Soft green beans and rice." },
  { id: 41, name: "Chicken Bacon Ranch Wraps", time: "20 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF2F", tags: ["chicken", "tortilla"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"turkey bacon",qty:"12 slices",aisle:"Proteins"},{item:"ranch dressing",qty:"1 cup",aisle:"Dairy"},{item:"lettuce",qty:"1 head",aisle:"Produce"},{item:"tomato",qty:"2",aisle:"Produce"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook turkey bacon in skillet 8 min, drain, crumble.","Dice chicken, season, cook 8 min.","Warm tortillas.","Spread ranch on tortilla.","Add chicken, bacon, lettuce, tomato, cheese.","Roll up tightly."], baby:"Plain chicken pieces and cheese, no wrap." },
  { id: 42, name: "Ground Turkey Sweet Potato Skillet", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF60", tags: ["turkey", "potato"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"sweet potatoes",qty:"3 large",aisle:"Produce"},{item:"spinach",qty:"4 oz",aisle:"Produce"},{item:"bell pepper",qty:"1",aisle:"Produce"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"paprika",qty:"2 tsp",aisle:"Pantry"},{item:"shredded cheese",qty:"1.5 cups",aisle:"Dairy"}], steps:["Dice sweet potatoes small.","Heat oil, cook potatoes covered 12 min.","Push aside, brown turkey with garlic 6 min.","Add pepper and spinach, 3 min.","Season with paprika.","Top with cheese, cover 2 min."], baby:"Soft sweet potato mashed with a little turkey." },
  { id: 43, name: "Beef & Cheese Quesadillas", time: "20 min", protein: "3 lbs ground beef", emoji: "\uD83E\uDDC0", tags: ["beef", "tortilla"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"bell pepper",qty:"2",aisle:"Produce"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Brown beef 8 min.","Add seasoning and peppers, cook 4 min.","Layer tortilla with cheese, beef, cheese, tortilla.","Cook in dry skillet 2 min per side.","Cut into wedges.","Serve with sour cream and salsa."], baby:"Small cheese pieces and crumbled beef." },
  { id: 44, name: "Chicken Spinach Rice Bake", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDD58", tags: ["chicken", "rice"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"spinach",qty:"6 oz",aisle:"Produce"},{item:"cream of chicken soup",qty:"2 cans",aisle:"Canned"},{item:"chicken broth",qty:"2 cups",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Preheat oven 375F.","Dice chicken.","Mix rice, soup, broth, chicken, spinach, seasoning in dish.","Dot with butter, cover with foil.","Bake 25 min covered.","Top with cheese, bake 5 min."], baby:"Soft rice with a little cheese, small chicken pieces." },
  { id: 45, name: "Steak Quesadillas", time: "25 min", protein: "3 lbs steak", emoji: "\uD83E\uDDC0", tags: ["steak", "tortilla"], ingredients: [{item:"flank steak",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"bell pepper",qty:"2",aisle:"Produce"},{item:"fajita seasoning",qty:"2 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"}], steps:["Season steak.","Sear in oil 4 min per side, rest, slice thin.","Saute peppers 5 min.","Layer tortilla, cheese, steak, peppers, cheese, tortilla.","Cook 2 min per side in dry skillet.","Cut into wedges."], baby:"Small tortilla pieces with melted cheese." },
  { id: 46, name: "Turkey & Pea Pasta", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF5D", tags: ["turkey", "pasta"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"rotini pasta",qty:"1 lb",aisle:"Grains"},{item:"frozen peas",qty:"2 cups",aisle:"Frozen"},{item:"heavy cream",qty:"1.5 cups",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook pasta.","Brown turkey with garlic 8 min.","Add cream and peas, simmer 5 min.","Stir in parmesan and butter.","Toss with pasta.","Season with salt and pepper."], baby:"Plain pasta with soft peas." },
  { id: 47, name: "Chicken Carrot Rice Bowls", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83E\uDD55", tags: ["chicken", "rice"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"carrots",qty:"5",aisle:"Produce"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"honey",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"sesame seeds",qty:"1 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Slice carrots thin.","Dice chicken, cook in sesame oil 8 min.","Add carrots and garlic, 4 min.","Whisk soy and honey, pour in, simmer 2 min.","Serve over rice with sesame seeds."], baby:"Soft carrots and rice with plain chicken." },
  { id: 48, name: "Beef Stroganoff Pasta", time: "30 min", protein: "3 lbs sirloin strips", emoji: "\uD83C\uDF5D", tags: ["beef", "pasta"], ingredients: [{item:"sirloin steak strips",qty:"3 lbs",aisle:"Proteins"},{item:"egg noodles",qty:"1 lb",aisle:"Grains"},{item:"mushrooms",qty:"12 oz",aisle:"Produce"},{item:"sour cream",qty:"1.5 cups",aisle:"Dairy"},{item:"beef broth",qty:"2 cups",aisle:"Canned"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"flour",qty:"3 tbsp",aisle:"Pantry"}], steps:["Cook noodles.","Sear beef 4 min in butter, remove.","Saute mushrooms and garlic 5 min.","Sprinkle flour, cook 1 min.","Add broth, simmer 5 min.","Stir in sour cream and beef, toss with noodles."], baby:"Plain noodles with a little sour cream." },
  { id: 49, name: "Turkey Corn Quesadillas", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83E\uDDC0", tags: ["turkey", "tortilla"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"corn",qty:"2 cups frozen",aisle:"Frozen"},{item:"bell pepper",qty:"1",aisle:"Produce"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Brown turkey 8 min.","Add seasoning, corn, pepper, 4 min.","Layer tortilla with cheese, turkey mix, cheese, tortilla.","Cook dry skillet 2 min per side.","Cut into wedges.","Serve with sour cream."], baby:"Small cheese pieces and soft corn." },
  { id: 50, name: "Chicken Pot Pie Bowls", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83E\uDD58", tags: ["chicken", "bread"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"refrigerated biscuits",qty:"2 cans",aisle:"Dairy"},{item:"frozen peas and carrots",qty:"2 cups",aisle:"Frozen"},{item:"cream of chicken soup",qty:"2 cans",aisle:"Canned"},{item:"chicken broth",qty:"1 cup",aisle:"Canned"},{item:"milk",qty:"1/2 cup",aisle:"Dairy"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"}], steps:["Bake biscuits per package.","Dice chicken, cook in butter 8 min.","Add soup, broth, milk, seasoning, veggies.","Simmer 8 min.","Ladle into bowls.","Top with biscuit."], baby:"Soft biscuit pieces with veggies and chicken." },
  { id: 51, name: "Lemon Herb Chicken & Roasted Potatoes", time: "30 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF4B", tags: ["chicken", "potato"], ingredients: [{item:"chicken thighs bone-in",qty:"3 lbs",aisle:"Proteins"},{item:"baby potatoes",qty:"2 lbs",aisle:"Produce"},{item:"lemon",qty:"2",aisle:"Produce"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"rosemary",qty:"2 sprigs",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"green beans",qty:"1 lb",aisle:"Produce"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"}], steps:["Preheat oven 425F.","Halve potatoes, toss with oil, garlic, rosemary.","Place chicken on top, squeeze lemon.","Roast 22 min.","Add green beans, roast 8 min.","Dot with butter, serve."], baby:"Soft potato pieces and plain chicken shreds." },
  { id: 52, name: "Shepherd's Pie", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83E\uDD58", tags: ["beef", "potato"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"potatoes",qty:"3 lbs",aisle:"Produce"},{item:"frozen peas and carrots",qty:"2 cups",aisle:"Frozen"},{item:"beef broth",qty:"1 cup",aisle:"Canned"},{item:"butter",qty:"1 stick",aisle:"Dairy"},{item:"milk",qty:"1/2 cup",aisle:"Dairy"},{item:"shredded cheese",qty:"1.5 cups",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"flour",qty:"2 tbsp",aisle:"Pantry"}], steps:["Boil potatoes 15 min, mash with butter, milk, salt.","Brown beef with garlic 8 min.","Sprinkle flour, add broth and veggies, simmer 5 min.","Transfer to baking dish.","Top with mashed potatoes and cheese.","Broil 4 min until golden."], baby:"Plain mashed potato with soft veggies." },
  { id: 53, name: "Baked Ziti", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF5D", tags: ["beef", "pasta"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"ziti pasta",qty:"1 lb",aisle:"Grains"},{item:"marinara sauce",qty:"2 jars",aisle:"Canned"},{item:"ricotta",qty:"15 oz",aisle:"Dairy"},{item:"mozzarella",qty:"2 cups shredded",aisle:"Dairy"},{item:"parmesan",qty:"1/2 cup",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"}], steps:["Preheat oven 400F. Cook pasta.","Brown beef with garlic 8 min.","Add marinara and seasoning.","Mix pasta with beef sauce and ricotta.","Transfer to dish, top with mozzarella and parmesan.","Bake 18 min."], baby:"Plain pasta with a little cheese." },
  { id: 54, name: "Pancakes, Eggs & Turkey Bacon", time: "25 min", protein: "12 eggs + turkey bacon", emoji: "\uD83E\uDD5E", tags: ["eggs", "bread"], ingredients: [{item:"eggs",qty:"12",aisle:"Dairy"},{item:"turkey bacon",qty:"16 slices",aisle:"Proteins"},{item:"pancake mix",qty:"1 box",aisle:"Grains"},{item:"milk",qty:"2 cups",aisle:"Dairy"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"syrup",qty:"1 bottle",aisle:"Pantry"},{item:"berries",qty:"1 pint",aisle:"Produce"},{item:"vanilla",qty:"1 tsp",aisle:"Pantry"}], steps:["Mix pancake batter per box with vanilla.","Cook turkey bacon in skillet 8 min.","Cook pancakes on griddle 2 min per side.","Scramble eggs in butter.","Plate with berries and syrup.","Keep warm in oven as you go."], baby:"Small pancake pieces, soft scrambled eggs, berries cut small." },
  { id: 55, name: "Honey Garlic Chicken & Rice", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF6F", tags: ["chicken", "rice"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"honey",qty:"1/2 cup",aisle:"Pantry"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"cornstarch",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Dice chicken, cook in butter 8 min.","Whisk honey, soy sauce, garlic, cornstarch, 1/2 cup water.","Pour over chicken, simmer 3 min until thick.","Steam broccoli 5 min.","Serve chicken over rice with broccoli."], baby:"Plain rice with soft broccoli, tiny chicken bits rinsed." },
  { id: 56, name: "Classic Lasagna", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF5D", tags: ["beef", "pasta"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"lasagna noodles (no-boil)",qty:"1 box",aisle:"Grains"},{item:"marinara sauce",qty:"2 jars",aisle:"Canned"},{item:"ricotta",qty:"15 oz",aisle:"Dairy"},{item:"mozzarella",qty:"3 cups shredded",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"eggs",qty:"2",aisle:"Dairy"},{item:"garlic",qty:"3 cloves",aisle:"Produce"}], steps:["Preheat oven 400F.","Brown beef with garlic, add marinara 10 min.","Mix ricotta with eggs and parmesan.","Layer: sauce, noodles, ricotta, mozzarella. Repeat 3 times.","Top with mozzarella.","Cover foil, bake 25 min. Uncover 5 min."], baby:"Small soft noodle piece with cheese." },
  { id: 57, name: "Korean Ground Beef Bowls", time: "20 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF5A", tags: ["beef", "rice"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"brown sugar",qty:"1/3 cup",aisle:"Pantry"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"sesame seeds",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Brown beef 8 min, drain.","Add garlic and ginger, 1 min.","Whisk soy, brown sugar, sesame oil.","Pour over beef, simmer 3 min.","Steam broccoli. Serve over rice with sesame seeds."], baby:"Plain rice with soft broccoli." },
  { id: 58, name: "Turkey Meatloaf & Mashed Potatoes", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83E\uDD58", tags: ["turkey", "potato"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"potatoes",qty:"3 lbs",aisle:"Produce"},{item:"breadcrumbs",qty:"1 cup",aisle:"Grains"},{item:"eggs",qty:"2",aisle:"Dairy"},{item:"ketchup",qty:"1/2 cup",aisle:"Pantry"},{item:"butter",qty:"1 stick",aisle:"Dairy"},{item:"milk",qty:"1/2 cup",aisle:"Dairy"},{item:"garlic powder",qty:"1 tbsp",aisle:"Pantry"},{item:"green beans",qty:"1 lb",aisle:"Produce"}], steps:["Preheat oven 425F.","Mix turkey, breadcrumbs, eggs, garlic powder, 1/4 cup ketchup.","Form loaf on sheet pan, top with ketchup.","Bake 25 min.","Boil potatoes 15 min, mash with butter, milk.","Steam green beans 5 min. Serve."], baby:"Mashed potato and soft crumbled meatloaf." },
  { id: 59, name: "Chicken Noodle Soup", time: "30 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF5C", tags: ["chicken", "pasta"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"egg noodles",qty:"12 oz",aisle:"Grains"},{item:"chicken broth",qty:"10 cups",aisle:"Canned"},{item:"carrots",qty:"4",aisle:"Produce"},{item:"celery",qty:"4 stalks",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"parsley",qty:"small bunch",aisle:"Produce"},{item:"bay leaves",qty:"2",aisle:"Pantry"}], steps:["Melt butter in pot, saute carrots, celery, garlic 5 min.","Add broth and whole chicken breasts, bay leaves.","Simmer 15 min, remove chicken and shred.","Add noodles, cook 8 min.","Return chicken, season.","Top with parsley."], baby:"Soft noodles with tiny chicken and carrots." },
  { id: 60, name: "Steak & Pasta Plate", time: "30 min", protein: "3 lbs steak", emoji: "\uD83C\uDF5D", tags: ["steak", "pasta"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"penne pasta",qty:"1 lb",aisle:"Grains"},{item:"butter",qty:"6 tbsp",aisle:"Dairy"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"spinach",qty:"4 oz",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"cherry tomatoes",qty:"1 pint",aisle:"Produce"}], steps:["Cook pasta, reserve 1/2 cup water.","Season steak, sear 4 min per side in oil. Rest, slice.","Melt butter with garlic, add tomatoes 3 min.","Toss pasta with butter sauce, spinach, parmesan.","Plate pasta with sliced steak on top.","Drizzle with pan juices."], baby:"Plain pasta with a little butter and small tomato pieces." },

  // ===== QUICK 15-MIN MEALS (61-70) =====
  { id: 61, name: "15-Min Garlic Butter Chicken Bites", time: "15 min", protein: "3 lbs chicken tenders", emoji: "\uD83C\uDF57", tags: ["chicken", "rice", "quick"], ingredients: [{item:"chicken tenders",qty:"3 lbs",aisle:"Proteins"},{item:"white rice (microwave)",qty:"4 pouches",aisle:"Grains"},{item:"butter",qty:"6 tbsp",aisle:"Dairy"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"lemon",qty:"1",aisle:"Produce"},{item:"frozen broccoli",qty:"1 bag",aisle:"Frozen"},{item:"parsley",qty:"small bunch",aisle:"Produce"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Microwave rice pouches.","Cut tenders in half. Heat oil, cook 3 min per side.","Microwave frozen broccoli 4 min.","Melt butter with minced garlic, 1 min.","Squeeze lemon, toss chicken in sauce.","Serve over rice with broccoli, sprinkle parsley."], baby:"Plain rice and soft broccoli florets, tiny chicken pieces." },
  { id: 62, name: "Quick Egg & Cheese Toast Stacks", time: "15 min", protein: "14 eggs", emoji: "\uD83C\uDF5E", tags: ["eggs", "bread", "quick"], ingredients: [{item:"eggs",qty:"14",aisle:"Dairy"},{item:"english muffins",qty:"8",aisle:"Grains"},{item:"cheese slices",qty:"10",aisle:"Dairy"},{item:"turkey bacon",qty:"12 slices",aisle:"Proteins"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"avocado",qty:"2",aisle:"Produce"}], steps:["Cook turkey bacon in skillet 6 min.","Toast english muffins, butter them.","Scramble eggs in butter 3 min.","Layer muffin, cheese, eggs, bacon, avocado.","Top with other muffin half."], baby:"Plain scrambled egg pieces and soft muffin." },
  { id: 63, name: "15-Min Beef & Rice Bowls", time: "15 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF5A", tags: ["beef", "rice", "quick"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice (microwave)",qty:"4 pouches",aisle:"Grains"},{item:"frozen stir-fry veggies",qty:"1 bag",aisle:"Frozen"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"sesame oil",qty:"2 tbsp",aisle:"Pantry"},{item:"shredded cheese",qty:"1 cup",aisle:"Dairy"}], steps:["Microwave rice.","Brown beef 6 min, drain.","Add garlic powder and soy sauce.","Microwave frozen veggies 4 min.","Build bowls: rice, beef, veggies, cheese.","Drizzle sesame oil."], baby:"Plain rice with soft veggies." },
  { id: 64, name: "Quick Turkey Ranch Wraps", time: "15 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDF2F", tags: ["turkey", "tortilla", "quick"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"large tortillas",qty:"10",aisle:"Grains"},{item:"ranch dressing",qty:"1 cup",aisle:"Dairy"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"lettuce",qty:"1 head",aisle:"Produce"},{item:"tomato",qty:"2",aisle:"Produce"},{item:"taco seasoning",qty:"1 packet",aisle:"Pantry"}], steps:["Brown turkey 6 min.","Add taco seasoning and 1/3 cup water, simmer 3 min.","Warm tortillas.","Spread ranch, add turkey, cheese, lettuce, tomato.","Roll tightly.","Cut in half."], baby:"Plain turkey and shredded cheese, no wrap." },
  { id: 65, name: "15-Min Chicken Caprese", time: "15 min", protein: "3 lbs chicken cutlets", emoji: "\uD83C\uDF45", tags: ["chicken", "quick", "italian"], ingredients: [{item:"chicken cutlets (thin)",qty:"3 lbs",aisle:"Proteins"},{item:"fresh mozzarella",qty:"16 oz",aisle:"Dairy"},{item:"tomato",qty:"4",aisle:"Produce"},{item:"fresh basil",qty:"1 bunch",aisle:"Produce"},{item:"balsamic glaze",qty:"1 bottle",aisle:"Pantry"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"},{item:"crusty bread",qty:"1 loaf",aisle:"Grains"}], steps:["Season cutlets with salt, pepper, garlic powder.","Sear in oil 3 min per side.","Top each with mozzarella and tomato slices.","Cover 2 min to melt cheese.","Drizzle balsamic glaze, top with basil.","Serve with bread."], baby:"Soft bread pieces with melted cheese." },
  { id: 66, name: "Quick Breakfast Burrito Bowls", time: "15 min", protein: "12 eggs", emoji: "\uD83E\uDD5A", tags: ["eggs", "rice", "quick"], ingredients: [{item:"eggs",qty:"12",aisle:"Dairy"},{item:"white rice (microwave)",qty:"3 pouches",aisle:"Grains"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"avocado",qty:"2",aisle:"Produce"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"}], steps:["Microwave rice.","Heat black beans 3 min.","Scramble eggs in butter.","Build bowls: rice, beans, eggs, cheese, salsa.","Top with avocado and sour cream."], baby:"Rice with scrambled egg and soft beans." },
  { id: 67, name: "15-Min Steak Salad Bowls", time: "15 min", protein: "3 lbs steak", emoji: "\uD83E\uDD57", tags: ["steak", "quick"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"mixed greens",qty:"10 oz",aisle:"Produce"},{item:"cherry tomatoes",qty:"1 pint",aisle:"Produce"},{item:"bell pepper",qty:"2",aisle:"Produce"},{item:"shredded cheese",qty:"1 cup",aisle:"Dairy"},{item:"ranch dressing",qty:"1 cup",aisle:"Dairy"},{item:"crusty bread",qty:"1 loaf",aisle:"Grains"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Season steak heavily with salt, pepper.","Sear in hot oil 4 min per side.","Rest 3 min, slice thin.","Build bowls: greens, tomatoes, peppers, steak, cheese.","Drizzle ranch, serve with bread."], baby:"Small steak bits and soft bread." },
  { id: 68, name: "Quick Chicken Bacon Ranch Pasta", time: "20 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF5D", tags: ["chicken", "pasta", "quick"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"rotini pasta",qty:"1 lb",aisle:"Grains"},{item:"turkey bacon",qty:"12 slices",aisle:"Proteins"},{item:"ranch dressing",qty:"1 cup",aisle:"Dairy"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"frozen peas",qty:"1.5 cups",aisle:"Frozen"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook pasta, add peas last 2 min.","Dice chicken, season, cook in oil 6 min.","Cook turkey bacon 6 min, chop.","Drain pasta, return to pot.","Toss with chicken, ranch, cheese, bacon.","Stir until cheese melts."], baby:"Plain pasta pieces with a little cheese." },
  { id: 69, name: "15-Min Loaded Nachos", time: "15 min", protein: "3 lbs ground beef", emoji: "\uD83E\uDDC0", tags: ["beef", "tortilla", "quick"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"tortilla chips",qty:"2 bags",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"taco seasoning",qty:"2 packets",aisle:"Pantry"},{item:"jalapenos",qty:"1 jar pickled",aisle:"Canned"}], steps:["Preheat oven 425F.","Brown beef 6 min, add seasoning.","Spread chips on sheet pan.","Top with beef, beans, cheese.","Bake 6 min until cheese melts.","Top with salsa, sour cream, jalapenos."], baby:"Soft beans with a little cheese, no chips." },
  { id: 70, name: "Quick Honey Mustard Chicken", time: "20 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDF6F", tags: ["chicken", "potato", "quick"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"baby potatoes (microwave)",qty:"2 bags",aisle:"Produce"},{item:"honey",qty:"1/3 cup",aisle:"Pantry"},{item:"dijon mustard",qty:"1/4 cup",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"green beans (frozen)",qty:"1 bag",aisle:"Frozen"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Microwave potato bags per package.","Dice chicken, cook in oil 8 min.","Microwave green beans 4 min.","Whisk honey, mustard, garlic.","Pour over chicken, simmer 2 min.","Toss potatoes in butter. Serve."], baby:"Soft potato pieces and small chicken bits." },

  // ===== GLOBAL FLAVORS (71-85) =====
  { id: 71, name: "Chicken Piccata & Pasta", time: "25 min", protein: "3 lbs chicken cutlets", emoji: "\uD83C\uDDEE\uD83C\uDDF9", tags: ["chicken", "pasta", "italian"], ingredients: [{item:"chicken cutlets",qty:"3 lbs",aisle:"Proteins"},{item:"angel hair pasta",qty:"1 lb",aisle:"Grains"},{item:"butter",qty:"6 tbsp",aisle:"Dairy"},{item:"lemon",qty:"3",aisle:"Produce"},{item:"capers",qty:"1 jar",aisle:"Canned"},{item:"chicken broth",qty:"1.5 cups",aisle:"Canned"},{item:"flour",qty:"1/2 cup",aisle:"Pantry"},{item:"parsley",qty:"small bunch",aisle:"Produce"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Cook pasta.","Dredge cutlets in flour, salt, pepper.","Sear in oil 3 min per side, remove.","Saute garlic 1 min in butter.","Add broth, lemon juice, capers, simmer 4 min.","Return chicken, top with parsley. Serve over pasta."], baby:"Plain pasta with a little butter." },
  { id: 72, name: "Beef Ragu Pappardelle", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDDEE\uD83C\uDDF9", tags: ["beef", "pasta", "italian"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"pappardelle pasta",qty:"1 lb",aisle:"Grains"},{item:"crushed tomatoes",qty:"2 cans",aisle:"Canned"},{item:"tomato paste",qty:"3 tbsp",aisle:"Canned"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"butter",qty:"2 tbsp",aisle:"Dairy"}], steps:["Cook pasta.","Grate carrots fine.","Brown beef with carrots and garlic 8 min.","Add tomato paste, cook 2 min.","Add crushed tomatoes, seasoning, simmer 12 min.","Toss with pasta, butter, parmesan."], baby:"Plain pasta with a little sauce." },
  { id: 73, name: "Chicken Tikka Masala", time: "30 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDDEE\uD83C\uDDF3", tags: ["chicken", "rice", "indian"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"basmati rice",qty:"2 cups",aisle:"Grains"},{item:"tikka masala simmer sauce",qty:"2 jars",aisle:"Canned"},{item:"heavy cream",qty:"1/2 cup",aisle:"Dairy"},{item:"naan bread",qty:"8",aisle:"Grains"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"peas (frozen)",qty:"1 cup",aisle:"Frozen"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook basmati rice.","Dice chicken, cook in oil 8 min with garlic.","Add tikka masala sauce and cream.","Stir in peas, simmer 8 min.","Warm naan.","Serve over rice with naan on side."], baby:"Plain rice with small chicken pieces, skip sauce if spicy." },
  { id: 74, name: "Korean Bulgogi Beef Bowls", time: "25 min", protein: "3 lbs sirloin", emoji: "\uD83C\uDDF0\uD83C\uDDF7", tags: ["beef", "rice", "korean"], ingredients: [{item:"sirloin steak",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"brown sugar",qty:"1/3 cup",aisle:"Pantry"},{item:"pear",qty:"1",aisle:"Produce"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"sesame seeds",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Slice steak thin.","Grate pear, mix with soy, sugar, garlic.","Marinate beef 10 min.","Julienne carrots, saute 3 min.","Sear beef 4 min in sesame oil. Serve over rice with sesame seeds."], baby:"Plain rice with soft carrot and tiny beef." },
  { id: 75, name: "Chicken Souvlaki Plates", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDDEC\uD83C\uDDF7", tags: ["chicken", "bread", "greek"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"pita bread",qty:"8",aisle:"Grains"},{item:"greek yogurt",qty:"16 oz",aisle:"Dairy"},{item:"cucumber",qty:"2",aisle:"Produce"},{item:"tomato",qty:"3",aisle:"Produce"},{item:"feta cheese",qty:"8 oz",aisle:"Dairy"},{item:"lemon",qty:"2",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"oregano",qty:"1 tbsp",aisle:"Pantry"}], steps:["Cube chicken, toss with oil, lemon, garlic, oregano.","Cook in skillet 10 min.","Grate cucumber, mix with yogurt, garlic for tzatziki.","Warm pita.","Dice tomato.","Build plates: pita, chicken, tzatziki, tomato, feta."], baby:"Soft pita pieces, plain chicken bits." },
  { id: 76, name: "Chicken Yakisoba Noodles", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDDEF\uD83C\uDDF5", tags: ["chicken", "pasta", "japanese"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"yakisoba noodles",qty:"3 packs",aisle:"Grains"},{item:"cabbage",qty:"1 small head",aisle:"Produce"},{item:"carrots",qty:"2",aisle:"Produce"},{item:"bell pepper",qty:"2",aisle:"Produce"},{item:"yakisoba sauce",qty:"1 bottle",aisle:"Pantry"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"soy sauce",qty:"2 tbsp",aisle:"Pantry"}], steps:["Prep noodles per package.","Dice chicken, cook in sesame oil 6 min.","Add garlic, shredded cabbage, carrots, peppers, 4 min.","Add noodles and yakisoba sauce.","Toss 3 min to combine.","Drizzle soy sauce."], baby:"Soft noodle pieces and cabbage." },
  { id: 77, name: "Chicken Gyros with Rice", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDDEC\uD83C\uDDF7", tags: ["chicken", "rice", "greek"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"basmati rice",qty:"2 cups",aisle:"Grains"},{item:"pita bread",qty:"8",aisle:"Grains"},{item:"greek yogurt",qty:"16 oz",aisle:"Dairy"},{item:"cucumber",qty:"2",aisle:"Produce"},{item:"tomato",qty:"3",aisle:"Produce"},{item:"lemon",qty:"2",aisle:"Produce"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"oregano",qty:"1 tbsp",aisle:"Pantry"}], steps:["Cook rice with a little oil and lemon.","Slice chicken, toss with oil, garlic, oregano, lemon.","Cook in skillet 10 min.","Grate cucumber for tzatziki with yogurt, garlic.","Warm pita.","Serve: rice, chicken, pita, tzatziki, tomato."], baby:"Soft rice and small chicken pieces." },
  { id: 78, name: "Beef Carne Asada Tacos", time: "25 min", protein: "3 lbs skirt steak", emoji: "\uD83C\uDDF2\uD83C\uDDFD", tags: ["steak", "tortilla", "mexican"], ingredients: [{item:"skirt steak",qty:"3 lbs",aisle:"Proteins"},{item:"corn tortillas",qty:"16",aisle:"Grains"},{item:"lime",qty:"3",aisle:"Produce"},{item:"cilantro",qty:"1 bunch",aisle:"Produce"},{item:"garlic",qty:"6 cloves",aisle:"Produce"},{item:"cumin",qty:"2 tsp",aisle:"Pantry"},{item:"avocado",qty:"3",aisle:"Produce"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"salsa",qty:"1 jar",aisle:"Canned"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"}], steps:["Marinate steak in oil, lime, garlic, cumin 10 min.","Sear 4 min per side in hot pan.","Rest 5 min, chop fine.","Warm tortillas.","Mash avocado with lime.","Build tacos: tortilla, steak, avocado, cheese, cilantro, salsa."], baby:"Soft tortilla pieces with avocado." },
  { id: 79, name: "Chicken Pad Thai", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDDF9\uD83C\uDDED", tags: ["chicken", "pasta", "thai"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"rice noodles",qty:"14 oz",aisle:"Grains"},{item:"eggs",qty:"4",aisle:"Dairy"},{item:"pad thai sauce",qty:"1 jar",aisle:"Canned"},{item:"bean sprouts",qty:"8 oz",aisle:"Produce"},{item:"carrots",qty:"2",aisle:"Produce"},{item:"peanuts",qty:"1/2 cup",aisle:"Pantry"},{item:"lime",qty:"2",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Soak noodles in hot water 8 min.","Dice chicken, cook in sesame oil 6 min.","Push aside, scramble eggs.","Add garlic, carrots, noodles, pad thai sauce.","Toss 3 min.","Top with sprouts, peanuts, lime."], baby:"Plain noodles with scrambled egg bits." },
  { id: 80, name: "Chicken Cacciatore & Polenta", time: "30 min", protein: "3 lbs chicken thighs", emoji: "\uD83C\uDDEE\uD83C\uDDF9", tags: ["chicken", "italian"], ingredients: [{item:"chicken thighs bone-in",qty:"3 lbs",aisle:"Proteins"},{item:"instant polenta",qty:"2 cups",aisle:"Grains"},{item:"crushed tomatoes",qty:"2 cans",aisle:"Canned"},{item:"bell peppers",qty:"2",aisle:"Produce"},{item:"mushrooms",qty:"8 oz",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Sear chicken in oil 5 min per side, remove.","Saute peppers, mushrooms, garlic 5 min.","Add tomatoes, seasoning.","Return chicken, simmer 15 min.","Cook polenta per package.","Stir butter and parmesan into polenta. Serve."], baby:"Plain polenta with butter." },
  { id: 81, name: "Beef Bibimbap Bowls", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDDF0\uD83C\uDDF7", tags: ["beef", "rice", "korean"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"eggs",qty:"6",aisle:"Dairy"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"spinach",qty:"6 oz",aisle:"Produce"},{item:"bean sprouts",qty:"8 oz",aisle:"Produce"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"brown sugar",qty:"2 tbsp",aisle:"Pantry"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"sriracha",qty:"small bottle",aisle:"Pantry"}], steps:["Cook rice.","Brown beef with garlic, soy, sugar 8 min.","Julienne carrots, saute 3 min in sesame oil.","Wilt spinach 2 min.","Fry eggs sunny-side.","Build bowls: rice, beef, veggies, sprouts, egg on top. Sriracha optional."], baby:"Plain rice, soft carrots, scrambled egg." },
  { id: 82, name: "Chicken Fajitas with Rice", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDDF2\uD83C\uDDFD", tags: ["chicken", "tortilla", "mexican"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"flour tortillas",qty:"10",aisle:"Grains"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"bell peppers",qty:"3",aisle:"Produce"},{item:"fajita seasoning",qty:"2 tbsp",aisle:"Pantry"},{item:"lime",qty:"2",aisle:"Produce"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Cook rice with lime juice.","Slice chicken and peppers.","Toss chicken with fajita seasoning.","Cook in oil 8 min.","Add peppers, 5 min.","Warm tortillas. Serve with rice, cheese, sour cream."], baby:"Plain rice with small chicken pieces." },
  { id: 83, name: "Turkey Chorizo-Style Rice", time: "25 min", protein: "3 lbs ground turkey", emoji: "\uD83C\uDDF2\uD83C\uDDFD", tags: ["turkey", "rice", "mexican"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"black beans",qty:"2 cans",aisle:"Canned"},{item:"diced tomatoes",qty:"1 can",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"paprika",qty:"1 tbsp",aisle:"Pantry"},{item:"cumin",qty:"2 tsp",aisle:"Pantry"},{item:"garlic",qty:"3 cloves",aisle:"Produce"},{item:"chili powder",qty:"1 tbsp",aisle:"Pantry"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Brown turkey with paprika, cumin, chili, garlic 8 min.","Add tomatoes, simmer 5 min.","Heat beans.","Build bowls: rice, turkey, beans, cheese.","Drizzle extra tomato juice."], baby:"Rice with soft beans and cheese." },
  { id: 84, name: "Chicken Chow Mein", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDDE8\uD83C\uDDF3", tags: ["chicken", "pasta", "chinese"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"chow mein noodles",qty:"14 oz",aisle:"Grains"},{item:"cabbage",qty:"1 small head",aisle:"Produce"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"celery",qty:"3 stalks",aisle:"Produce"},{item:"soy sauce",qty:"1/2 cup",aisle:"Pantry"},{item:"hoisin sauce",qty:"3 tbsp",aisle:"Pantry"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"}], steps:["Cook noodles per package.","Dice chicken, cook in sesame oil 6 min.","Add garlic, ginger 1 min.","Add shredded cabbage, carrots, celery 4 min.","Add noodles, soy, hoisin sauce.","Toss 3 min to coat."], baby:"Soft noodle pieces and shredded cabbage." },
  { id: 85, name: "Cajun Chicken Pasta", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF36", tags: ["chicken", "pasta", "cajun"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"penne pasta",qty:"1 lb",aisle:"Grains"},{item:"heavy cream",qty:"2 cups",aisle:"Dairy"},{item:"parmesan",qty:"1 cup",aisle:"Dairy"},{item:"bell pepper",qty:"2",aisle:"Produce"},{item:"cajun seasoning",qty:"2 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"butter",qty:"4 tbsp",aisle:"Dairy"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Cook pasta.","Slice chicken, toss with cajun seasoning (use less for mild).","Cook chicken in oil 8 min.","Saute peppers and garlic in butter 4 min.","Add cream and parmesan, simmer 3 min.","Toss pasta, chicken in sauce."], baby:"Plain pasta with a little cream sauce." },

  // ===== NEW FORMATS & VARIETY (86-100) =====
  { id: 86, name: "Loaded Baked Potatoes", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83E\uDD54", tags: ["beef", "potato"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"large russet potatoes",qty:"8",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"sour cream",qty:"1 cup",aisle:"Dairy"},{item:"butter",qty:"6 tbsp",aisle:"Dairy"},{item:"turkey bacon",qty:"10 slices",aisle:"Proteins"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"}], steps:["Microwave potatoes 8-10 min until soft.","Brown beef with garlic powder 8 min.","Cook turkey bacon 6 min, crumble.","Steam broccoli 5 min, chop.","Split potatoes open, fluff with butter.","Top with beef, broccoli, cheese, turkey bacon. Dollop sour cream."], baby:"Mashed potato inside with butter." },
  { id: 87, name: "Chicken Parm Sliders", time: "25 min", protein: "3 lbs chicken tenders", emoji: "\uD83C\uDF54", tags: ["chicken", "bread", "italian"], ingredients: [{item:"chicken tenders",qty:"3 lbs",aisle:"Proteins"},{item:"slider buns",qty:"16",aisle:"Grains"},{item:"marinara sauce",qty:"1 jar",aisle:"Canned"},{item:"mozzarella",qty:"2 cups shredded",aisle:"Dairy"},{item:"parmesan",qty:"1/2 cup",aisle:"Dairy"},{item:"breadcrumbs",qty:"1 cup",aisle:"Grains"},{item:"eggs",qty:"2",aisle:"Dairy"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"garlic powder",qty:"1 tsp",aisle:"Pantry"}], steps:["Preheat oven 425F.","Dip tenders in egg, then breadcrumbs with parm and garlic.","Pan-fry 3 min per side in oil.","Place on slider buns, top with sauce and mozzarella.","Bake 5 min to melt.","Top with bun."], baby:"Soft bun with a little cheese." },
  { id: 88, name: "Breakfast-for-Dinner: Waffles & Eggs", time: "25 min", protein: "14 eggs + turkey bacon", emoji: "\uD83E\uDDC7", tags: ["eggs", "bread", "breakfast"], ingredients: [{item:"eggs",qty:"14",aisle:"Dairy"},{item:"turkey bacon",qty:"16 slices",aisle:"Proteins"},{item:"frozen waffles",qty:"2 boxes",aisle:"Frozen"},{item:"syrup",qty:"1 bottle",aisle:"Pantry"},{item:"butter",qty:"1 stick",aisle:"Dairy"},{item:"berries",qty:"2 pints",aisle:"Produce"},{item:"whipped cream",qty:"1 can",aisle:"Dairy"}], steps:["Toast waffles.","Cook turkey bacon in skillet 8 min.","Scramble eggs in butter.","Butter waffles generously.","Plate with eggs, bacon, berries.","Top waffles with syrup and whipped cream."], baby:"Small waffle pieces, scrambled eggs, soft berries." },
  { id: 89, name: "Cheeseburger Rice Skillet", time: "25 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDF54", tags: ["beef", "rice"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"shredded cheese",qty:"3 cups",aisle:"Dairy"},{item:"beef broth",qty:"2 cups",aisle:"Canned"},{item:"ketchup",qty:"1/3 cup",aisle:"Pantry"},{item:"mustard",qty:"2 tbsp",aisle:"Pantry"},{item:"pickles",qty:"1 jar",aisle:"Canned"},{item:"garlic powder",qty:"2 tsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Brown beef 8 min, drain.","Add rice, broth, ketchup, mustard, garlic, 2 cups water.","Simmer covered 18 min.","Stir in cheese and butter.","Top with chopped pickles.","Serve."], baby:"Plain rice and small pieces of beef." },
  { id: 90, name: "Chicken Shawarma Bowls", time: "25 min", protein: "3 lbs chicken thighs", emoji: "\uD83E\uDD59", tags: ["chicken", "rice", "middle-eastern"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"basmati rice",qty:"2 cups",aisle:"Grains"},{item:"greek yogurt",qty:"16 oz",aisle:"Dairy"},{item:"cucumber",qty:"2",aisle:"Produce"},{item:"tomato",qty:"3",aisle:"Produce"},{item:"hummus",qty:"1 tub",aisle:"Dairy"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"lemon",qty:"2",aisle:"Produce"},{item:"paprika",qty:"1 tbsp",aisle:"Pantry"},{item:"cumin",qty:"2 tsp",aisle:"Pantry"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"}], steps:["Cook rice.","Slice chicken, toss with oil, paprika, cumin, garlic, lemon.","Cook in skillet 10 min.","Dice cucumber and tomato.","Mix yogurt with garlic, lemon.","Build bowls: rice, chicken, veggies, hummus, yogurt sauce."], baby:"Plain rice with soft chicken pieces and hummus." },
  { id: 91, name: "Turkey Zucchini Boats", time: "30 min", protein: "3 lbs ground turkey", emoji: "\uD83E\uDD52", tags: ["turkey", "italian"], ingredients: [{item:"ground turkey",qty:"3 lbs",aisle:"Proteins"},{item:"zucchini",qty:"6 large",aisle:"Produce"},{item:"marinara sauce",qty:"1 jar",aisle:"Canned"},{item:"mozzarella",qty:"2 cups shredded",aisle:"Dairy"},{item:"parmesan",qty:"1/2 cup",aisle:"Dairy"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"},{item:"crusty bread",qty:"1 loaf",aisle:"Grains"},{item:"olive oil",qty:"2 tbsp",aisle:"Pantry"}], steps:["Preheat oven 400F.","Halve zucchini, scoop centers.","Brown turkey with garlic, seasoning 8 min.","Mix with half the marinara.","Fill zucchini, top with remaining sauce and cheeses.","Bake 20 min. Serve with bread."], baby:"Soft zucchini scooped out, bread pieces." },
  { id: 92, name: "Steak Frites", time: "25 min", protein: "3 lbs steak", emoji: "\uD83C\uDDEB\uD83C\uDDF7", tags: ["steak", "potato", "french"], ingredients: [{item:"sirloin or ribeye",qty:"3 lbs",aisle:"Proteins"},{item:"frozen fries",qty:"2 bags",aisle:"Frozen"},{item:"butter",qty:"6 tbsp",aisle:"Dairy"},{item:"garlic",qty:"5 cloves",aisle:"Produce"},{item:"green beans",qty:"1 lb",aisle:"Produce"},{item:"parsley",qty:"small bunch",aisle:"Produce"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"parmesan",qty:"1/2 cup",aisle:"Dairy"}], steps:["Bake fries per package.","Season steak heavily.","Sear in oil 4 min per side, rest.","Melt butter with garlic, parsley.","Steam green beans 5 min.","Slice steak, drizzle with garlic butter. Fries with parm."], baby:"Soft fry pieces and green beans." },
  { id: 93, name: "Chicken Lettuce Wraps", time: "20 min", protein: "3 lbs ground chicken", emoji: "\uD83E\uDD57", tags: ["chicken", "asian"], ingredients: [{item:"ground chicken",qty:"3 lbs",aisle:"Proteins"},{item:"white rice (microwave)",qty:"3 pouches",aisle:"Grains"},{item:"butter lettuce",qty:"2 heads",aisle:"Produce"},{item:"water chestnuts",qty:"2 cans",aisle:"Canned"},{item:"hoisin sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"soy sauce",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Microwave rice.","Cook chicken in sesame oil 6 min with garlic, ginger.","Add drained water chestnuts, chopped, 2 min.","Stir in hoisin and soy.","Separate lettuce leaves.","Serve filling in lettuce cups over rice."], baby:"Plain rice with small chicken pieces." },
  { id: 94, name: "Baked Chicken Drumsticks & Roasted Veggies", time: "30 min", protein: "3.5 lbs drumsticks", emoji: "\uD83C\uDF57", tags: ["chicken", "potato"], ingredients: [{item:"chicken drumsticks",qty:"3.5 lbs",aisle:"Proteins"},{item:"baby potatoes",qty:"2 lbs",aisle:"Produce"},{item:"carrots",qty:"6",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"garlic powder",qty:"1 tbsp",aisle:"Pantry"},{item:"paprika",qty:"2 tsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"},{item:"parsley",qty:"small bunch",aisle:"Produce"}], steps:["Preheat oven 425F.","Halve potatoes, chunk carrots.","Toss all with oil, garlic, paprika, salt.","Spread on sheet pan, drumsticks on top.","Bake 30 min.","Toss veggies with butter and parsley."], baby:"Soft potato and carrot pieces, shredded chicken." },
  { id: 95, name: "Beef Stir-Fry with Noodles", time: "25 min", protein: "3 lbs flank steak", emoji: "\uD83C\uDF5C", tags: ["beef", "pasta", "asian"], ingredients: [{item:"flank steak",qty:"3 lbs",aisle:"Proteins"},{item:"lo mein noodles",qty:"1 lb",aisle:"Grains"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"carrots",qty:"3",aisle:"Produce"},{item:"bell pepper",qty:"2",aisle:"Produce"},{item:"stir-fry sauce",qty:"1 bottle",aisle:"Pantry"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"ginger",qty:"1 tbsp",aisle:"Produce"}], steps:["Cook noodles.","Slice steak thin.","Heat sesame oil, sear beef 3 min, remove.","Stir-fry veggies with garlic, ginger 5 min.","Add noodles, beef, stir-fry sauce.","Toss 3 min."], baby:"Soft noodles with carrots." },
  { id: 96, name: "Chicken Ranch Potato Bake", time: "30 min", protein: "3 lbs chicken thighs", emoji: "\uD83E\uDD58", tags: ["chicken", "potato"], ingredients: [{item:"chicken thighs boneless",qty:"3 lbs",aisle:"Proteins"},{item:"baby potatoes",qty:"2.5 lbs",aisle:"Produce"},{item:"ranch seasoning",qty:"2 packets",aisle:"Pantry"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"turkey bacon",qty:"10 slices",aisle:"Proteins"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"olive oil",qty:"1/4 cup",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Preheat oven 425F.","Halve potatoes, cube chicken, toss with oil and ranch.","Spread on sheet pan.","Bake 20 min.","Add broccoli, top with cheese and crumbled cooked bacon.","Bake 8 min more."], baby:"Soft potato and broccoli pieces." },
  { id: 97, name: "Orange Chicken & Rice", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDF4A", tags: ["chicken", "rice", "chinese"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"white rice",qty:"2 cups",aisle:"Grains"},{item:"orange juice",qty:"1 cup",aisle:"Dairy"},{item:"soy sauce",qty:"1/3 cup",aisle:"Pantry"},{item:"brown sugar",qty:"1/3 cup",aisle:"Pantry"},{item:"cornstarch",qty:"3 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"broccoli",qty:"1 head",aisle:"Produce"},{item:"sesame oil",qty:"3 tbsp",aisle:"Pantry"}], steps:["Cook rice.","Cube chicken, toss with 2 tbsp cornstarch.","Pan-fry in sesame oil 8 min until crispy.","Whisk OJ, soy, sugar, garlic, 1 tbsp cornstarch.","Pour over chicken, simmer 3 min until thick.","Steam broccoli. Serve over rice."], baby:"Plain rice with soft broccoli, rinsed chicken bits." },
  { id: 98, name: "Lemon Dill Chicken & Orzo", time: "25 min", protein: "3 lbs chicken breast", emoji: "\uD83C\uDDEC\uD83C\uDDF7", tags: ["chicken", "pasta", "greek"], ingredients: [{item:"chicken breast",qty:"3 lbs",aisle:"Proteins"},{item:"orzo pasta",qty:"1 lb",aisle:"Grains"},{item:"lemon",qty:"3",aisle:"Produce"},{item:"dill",qty:"1 bunch",aisle:"Produce"},{item:"feta cheese",qty:"8 oz",aisle:"Dairy"},{item:"spinach",qty:"6 oz",aisle:"Produce"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"chicken broth",qty:"4 cups",aisle:"Canned"},{item:"olive oil",qty:"3 tbsp",aisle:"Pantry"},{item:"butter",qty:"3 tbsp",aisle:"Dairy"}], steps:["Dice chicken, season.","Cook in oil 8 min with garlic.","Add orzo and broth, simmer 12 min.","Stir in spinach, lemon juice, butter.","Top with crumbled feta and fresh dill.","Serve."], baby:"Plain orzo with a little butter." },
  { id: 99, name: "Beef Goulash", time: "30 min", protein: "3 lbs ground beef", emoji: "\uD83C\uDDED\uD83C\uDDFA", tags: ["beef", "pasta"], ingredients: [{item:"ground beef",qty:"3 lbs",aisle:"Proteins"},{item:"elbow macaroni",qty:"1 lb",aisle:"Grains"},{item:"diced tomatoes",qty:"2 cans",aisle:"Canned"},{item:"tomato sauce",qty:"1 can",aisle:"Canned"},{item:"beef broth",qty:"2 cups",aisle:"Canned"},{item:"shredded cheese",qty:"2 cups",aisle:"Dairy"},{item:"paprika",qty:"1 tbsp",aisle:"Pantry"},{item:"garlic",qty:"4 cloves",aisle:"Produce"},{item:"italian seasoning",qty:"1 tbsp",aisle:"Pantry"}], steps:["Brown beef in large pot 8 min.","Add garlic, paprika, italian seasoning.","Pour in tomatoes, sauce, broth.","Add uncooked macaroni, simmer 14 min.","Stir in cheese until melted.","Serve."], baby:"Plain pasta pieces with a little sauce and cheese." },
  { id: 100, name: "Chicken & Waffle Dinner", time: "25 min", protein: "3 lbs chicken tenders", emoji: "\uD83E\uDDC7", tags: ["chicken", "bread"], ingredients: [{item:"chicken tenders",qty:"3 lbs",aisle:"Proteins"},{item:"frozen waffles",qty:"2 boxes",aisle:"Frozen"},{item:"flour",qty:"1 cup",aisle:"Pantry"},{item:"eggs",qty:"3",aisle:"Dairy"},{item:"breadcrumbs",qty:"1.5 cups",aisle:"Grains"},{item:"syrup",qty:"1 bottle",aisle:"Pantry"},{item:"butter",qty:"1 stick",aisle:"Dairy"},{item:"hot sauce",qty:"small bottle",aisle:"Pantry"},{item:"olive oil",qty:"1/2 cup",aisle:"Pantry"}], steps:["Dredge tenders in flour, egg, breadcrumbs.","Pan-fry in oil 3 min per side.","Toast waffles, butter them.","Drizzle hot sauce on chicken (optional).","Stack chicken on waffle.","Drizzle syrup."], baby:"Soft waffle pieces and chicken without crust." },
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

// Default portion options (lbs or eggs)
function portionOptions(protein) {
  const { unit } = getProteinBase(protein);
  if (unit === "egg") return [6, 8, 10, 12, 14, 16, 18, 20];
  return [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
}

// Scale an ingredient qty string by a factor. Handles fractions, ranges, and text like "small bunch".
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

  // Match leading number (possibly with fraction) at start
  const m = qty.match(/^([\d./\s]+?)(\s|$)(.*)/);
  if (!m) return qty;
  const numPart = m[1].trim();
  const rest = (m[3] || "").trim();
  const parsed = parseNum(numPart);
  if (parsed === null) return qty;

  const scaled = parsed * factor;
  const formatted = formatNum(scaled);
  return rest ? `${formatted} ${rest}` : formatted;
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

  const R = useRef({ step: 1, week: [], selected: [], locked: false, pantry: [], checkedShop: [], portions: {} });
  const loaded = useRef(false);

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
      setPortions(data.portions || {});
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
              setPortions(d.portions || {});
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

  function startNewWeek() {
    const fresh = pickDiverseWeek(R.current.week);
    R.current = { step: 1, week: fresh, selected: [], locked: false, pantry: [], checkedShop: [], portions: {} };
    setStep(1);
    setWeek(fresh);
    setSelected([]);
    setLocked(false);
    setPantry([]);
    setCheckedShop([]);
    setPortions({});
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
      _ts: Date.now(),
      _v: 4,
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
        portions: d.portions || {},
      };
      setStep(R.current.step);
      setWeek(R.current.week);
      setSelected(R.current.selected);
      setLocked(R.current.locked);
      setPantry(R.current.pantry);
      setCheckedShop(R.current.checkedShop);
      setPortions(R.current.portions);
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
    const defaultAmount = base.unit === "egg" ? base.amount : 3; // default 3 lbs for meat, or meal's egg count
    const chosen = portions[meal.id] !== undefined ? portions[meal.id] : defaultAmount;
    return chosen / base.amount;
  }

  // Shopping list aggregation (with scaling)
  const shoppingMap = {};
  selectedMeals.forEach(meal => {
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
    toast: { position: "fixed", bottom: 100, left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", color: "white", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, zIndex: 200, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" },
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
        <h1 style={s.headerTitle}>Weekly Meals</h1>
        <div style={s.headerSub}>
          {step === 1 && "Pick your meals"}
          {step === 2 && "Set portion sizes"}
          {step === 3 && "What's in your pantry?"}
          {step === 4 && "Shop & cook"}
        </div>
        <div style={{ position: "absolute", top: 16, right: 12, display: "flex", gap: 8, alignItems: "center" }}>
          <button style={s.syncBtn} onClick={() => setShowImport(true)}>{E.cloud} Sync</button>
          <button style={{ ...s.syncBtn, padding: "4px 10px", fontSize: 18, lineHeight: 1 }} onClick={() => setMenuOpen(true)}>⋯</button>
        </div>
      </div>

      {/* PROGRESS */}
      <div style={s.progress}>
        <div style={s.dot(step === 1, step > 1)}>1</div>
        <div style={s.line(step > 1)}></div>
        <div style={s.dot(step === 2, step > 2)}>2</div>
        <div style={s.line(step > 2)}></div>
        <div style={s.dot(step === 3, step > 3)}>3</div>
        <div style={s.line(step > 3)}></div>
        <div style={s.dot(step === 4, false)}>4</div>
      </div>

      <div style={s.container}>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div style={s.sectionTitle}>This week's options</div>
            {weekMeals.map(meal => {
              const sel = selected.includes(meal.id);
              const dim = locked && !sel;
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
            {selectedMeals.map(meal => {
              const base = getProteinBase(meal.protein);
              const defaultAmount = base.unit === "egg" ? base.amount : 3;
              const current = portions[meal.id] !== undefined ? portions[meal.id] : defaultAmount;
              const options = portionOptions(meal.protein);
              const proteinName = meal.protein.replace(/^[\d.]+\s*(lbs?|eggs?)\s*/i, "").trim();
              const unitLabel = base.unit === "egg" ? "" : "lbs";
              return (
                <div key={meal.id} style={{ ...s.card(false, false), cursor: "default" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>
                      {meal.emoji}
                      {meal.tags.includes("quick") && <span style={{ fontSize: 14, marginLeft: 2 }}>{"\u26A1"}</span>}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3 }}>{meal.name}</div>
                      <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{proteinEmoji(meal.protein)} {proteinName}</div>
                    </div>
                    <select
                      value={current}
                      onChange={e => setPortion(meal.id, parseFloat(e.target.value))}
                      style={{ fontSize: 14, fontWeight: 700, padding: "8px 10px", border: "2px solid #2d6a4f", borderRadius: 8, background: "white", color: "#2d6a4f", cursor: "pointer", appearance: "auto" }}
                    >
                      {options.map(o => <option key={o} value={o}>{o} {unitLabel}</option>)}
                    </select>
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
                          <div style={s.qty}>{x.qtys.join(" + ")}</div>
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
                          <div style={s.qty}>{x.qtys.join(" + ")}</div>
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

        {step === 4 && viewMode === "recipes" && (
          <>
            <div style={s.sectionTitle}>Your recipes</div>
            {selectedMeals.map(meal => {
              const open = openRecipe === meal.id;
              return (
                <div key={meal.id} style={s.recipeCard}>
                  <div style={s.recipeHead} onClick={() => setOpenRecipe(open ? null : meal.id)}>
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
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#2d6a4f", marginTop: 10, marginBottom: 6 }}>INGREDIENTS</div>
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
                      <div style={s.babyBox}>
                        <div style={s.babyTitle}>{E.baby} For baby</div>
                        <div style={s.babyText}>{meal.baby}</div>
                      </div>
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
            <button style={s.btn(viewMode === "shop" ? "primary" : "secondary")} onClick={() => setViewMode("shop")}>{E.list} List</button>
            <button style={s.btn(viewMode === "recipes" ? "amber" : "secondary")} onClick={() => setViewMode("recipes")}>{E.chef} Recipes</button>
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

      {/* TOAST */}
      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  );
}
