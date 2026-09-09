import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Flame, Dumbbell, UtensilsCrossed, Salad, ShoppingCart, LineChart as LineChartIcon,
  ChevronRight, ChevronLeft, Check, X, Menu, Info, Fish, Egg, Beef, Wheat, Milk,
  Apple, Leaf, Sparkles, Share2, Printer, Download, RefreshCw, Plus, Minus,
  Clock, IndianRupee, ShieldCheck, ArrowRight, CircleCheck, TriangleAlert,
  ChevronDown, Trash2, Home as HomeIcon, Target, Scale, Calendar
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot
} from "recharts";

/* ============================================================
   DESIGN TOKENS (rendered as CSS variables in <GlobalStyles/>)
   ============================================================ */
const GlobalStyles = () => (
  <style>{`
    .kf-root {
      --green-900:#123028; --green-800:#16382E; --green-700:#1E4E3D; --green-600:#2A6B52;
      --green-500:#3D8A67; --green-100:#E4EFE6; --green-50:#F1F6EE;
      --cream:#FBF7EE; --cream-2:#F4EEDF; --card:#FFFFFF;
      --spice:#C1712B; --spice-dark:#8F5217; --spice-100:#F6E4CC; --spice-50:#FBF1E3;
      --ink:#211F1A; --ink-soft:#5C594E; --ink-faint:#8A8676;
      --line:#E7E0D0; --line-strong:#D8CFB8;
      --danger:#B3462C; --danger-bg:#FBEAE4;
      --radius-sm:10px; --radius-md:16px; --radius-lg:24px;
      --shadow-card: 0 1px 2px rgba(30,25,10,0.04), 0 8px 24px rgba(30,25,10,0.06);
      --font-display: 'Fraunces', Georgia, serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--cream);
      color: var(--ink);
      font-family: var(--font-body);
      min-height: 100vh;
      width: 100%;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    .kf-root *{box-sizing:border-box;}
    .kf-root h1,.kf-root h2,.kf-root h3{font-family:var(--font-display); color:var(--green-900); margin:0; font-weight:600;}
    .kf-root p{margin:0;}
    .kf-root button{font-family:var(--font-body); cursor:pointer;}
    .kf-root a{color:inherit; text-decoration:none;}
    .kf-root ::selection{background:var(--spice-100);}
    .kf-num{font-family:var(--font-display); font-variant-numeric:tabular-nums; font-weight:600;}
    .kf-focus:focus-visible{outline:2px solid var(--spice); outline-offset:2px; border-radius:6px;}
    .kf-btn{
      display:inline-flex; align-items:center; justify-content:center; gap:8px;
      border-radius:999px; font-weight:600; font-size:15px; padding:13px 24px;
      border:1.5px solid transparent; transition:transform .12s ease, background .15s ease, border-color .15s ease;
      white-space:nowrap;
    }
    .kf-btn:active{transform:scale(0.97);}
    .kf-btn-primary{ background:var(--green-800); color:#fff; }
    .kf-btn-primary:hover{ background:var(--green-700); }
    .kf-btn-secondary{ background:var(--spice); color:#fff; }
    .kf-btn-secondary:hover{ background:var(--spice-dark); }
    .kf-btn-outline{ background:transparent; color:var(--green-900); border-color:var(--line-strong); }
    .kf-btn-outline:hover{ background:var(--green-50); border-color:var(--green-600); }
    .kf-btn-ghost{ background:transparent; color:var(--green-900); padding:10px 14px; }
    .kf-btn-ghost:hover{ background:var(--green-50); }
    .kf-btn-danger{ background:transparent; color:var(--danger); border-color:#E7C6B9; padding:10px 16px; font-size:14px;}
    .kf-btn-danger:hover{ background:var(--danger-bg); }
    .kf-btn:disabled{opacity:.4; cursor:not-allowed;}
    .kf-card{ background:var(--card); border-radius:var(--radius-md); box-shadow:var(--shadow-card); border:1px solid rgba(30,25,10,0.04); }
    .kf-container{ max-width:1180px; margin:0 auto; padding:0 20px; }
    @media(min-width:768px){ .kf-container{ padding:0 32px; } }
    .kf-input, .kf-select{
      width:100%; padding:13px 14px; border-radius:12px; border:1.5px solid var(--line-strong);
      background:#fff; font-size:16px; color:var(--ink); font-family:var(--font-body);
      transition:border-color .15s ease;
    }
    .kf-input:focus, .kf-select:focus{ outline:none; border-color:var(--green-600); }
    .kf-label{ font-size:13px; font-weight:600; color:var(--ink-soft); margin-bottom:6px; display:block; }
    .kf-choice{
      border:1.5px solid var(--line-strong); border-radius:var(--radius-md); padding:16px 18px;
      background:#fff; text-align:left; width:100%; transition:border-color .15s ease, background .15s ease;
      display:flex; align-items:flex-start; gap:12px;
    }
    .kf-choice:hover{ border-color:var(--green-500); }
    .kf-choice.active{ border-color:var(--green-800); background:var(--green-50); }
    .kf-badge{ display:inline-flex; align-items:center; gap:6px; padding:4px 11px; border-radius:999px; font-size:12.5px; font-weight:600; }
    .kf-badge-green{ background:var(--green-100); color:var(--green-800); }
    .kf-badge-spice{ background:var(--spice-50); color:var(--spice-dark); }
    .kf-fade-in{ animation:kfFade .4s ease both; }
    @keyframes kfFade{ from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:none;} }
    .kf-scrollbar-hide::-webkit-scrollbar{display:none;}
    .kf-scrollbar-hide{-ms-overflow-style:none; scrollbar-width:none;}
    @media print {
      .kf-noprint{ display:none !important; }
      .kf-root{ background:#fff; }
    }
  `}</style>
);

/* ============================================================
   STORAGE (persistent, personal — window.storage)
   ============================================================ */
async function kfSave(key, value) {
  try { await window.storage.set(key, JSON.stringify(value), false); return true; }
  catch (e) { console.error("KeralaFit storage save failed", key, e); return false; }
}
async function kfLoad(key) {
  try {
    const res = await window.storage.get(key, false);
    if (!res || res.value == null) return null;
    return JSON.parse(res.value);
  } catch (e) { return null; }
}
async function kfDelete(key) {
  try { await window.storage.delete(key, false); } catch (e) {}
}

/* ============================================================
   FOOD DATABASE
   unit: 'g' | 'ml' | 'pc' — amount = quantity of that unit per 1 base serving
   ============================================================ */
const FOODS = [
  { id:"puttu", name:"Puttu", local:"പുട്ട്", category:"Breakfast", shopGroup:"Rice & Grains", serving:"1 medium serving", calories:200, protein:4, carbs:44, fat:1, veg:true, vegan:true, mealTypes:["breakfast"], tags:["rice"], unit:"g", amount:100 },
  { id:"kadala_curry", name:"Kadala Curry", local:"കടല കറി", category:"Vegetarian", shopGroup:"Protein", serving:"1 cup", calories:180, protein:9, carbs:24, fat:6, veg:true, vegan:true, mealTypes:["breakfast","lunch","dinner"], tags:["legume","coconut"], unit:"g", amount:150 },
  { id:"appam", name:"Appam", local:"അപ്പം", category:"Breakfast", shopGroup:"Rice & Grains", serving:"2 pieces", calories:240, protein:4, carbs:46, fat:4, veg:true, vegan:true, mealTypes:["breakfast","dinner"], tags:["rice","coconut"], unit:"g", amount:120 },
  { id:"idiyappam", name:"Idiyappam", local:"ഇടിയപ്പം", category:"Breakfast", shopGroup:"Rice & Grains", serving:"1 cup", calories:180, protein:3, carbs:40, fat:1, veg:true, vegan:true, mealTypes:["breakfast","dinner"], tags:["rice"], unit:"g", amount:100 },
  { id:"dosa", name:"Dosa", local:"ദോശ", category:"Breakfast", shopGroup:"Rice & Grains", serving:"1 medium", calories:133, protein:3, carbs:25, fat:2, veg:true, vegan:true, mealTypes:["breakfast","dinner"], tags:["rice"], unit:"g", amount:80 },
  { id:"idli", name:"Idli", local:"ഇഡ്ഡലി", category:"Breakfast", shopGroup:"Rice & Grains", serving:"2 pieces", calories:140, protein:4, carbs:30, fat:0.5, veg:true, vegan:true, mealTypes:["breakfast","dinner"], tags:["rice"], unit:"g", amount:120 },
  { id:"sambar", name:"Sambar", local:"സാമ്പാർ", category:"Vegetarian", shopGroup:"Vegetables", serving:"1 cup", calories:120, protein:6, carbs:18, fat:3, veg:true, vegan:true, mealTypes:["breakfast","lunch","dinner"], tags:["legume"], unit:"g", amount:200 },
  { id:"matta_rice", name:"Matta Rice", local:"മട്ട അരി", category:"Rice", shopGroup:"Rice & Grains", serving:"1 cup cooked", calories:220, protein:4, carbs:48, fat:1, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["rice"], unit:"g", amount:150 },
  { id:"white_rice", name:"White Rice", local:"", category:"Rice", shopGroup:"Rice & Grains", serving:"1 cup cooked", calories:205, protein:4, carbs:45, fat:0.5, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["rice"], unit:"g", amount:150 },
  { id:"chicken_curry", name:"Chicken Curry", local:"", category:"Chicken", shopGroup:"Protein", serving:"1 cup", calories:260, protein:25, carbs:6, fat:15, veg:false, vegan:false, mealTypes:["lunch","dinner"], tags:["chicken"], unit:"g", amount:150 },
  { id:"chicken_breast", name:"Grilled Chicken Breast", local:"", category:"Chicken", shopGroup:"Protein", serving:"100 g", calories:165, protein:31, carbs:0, fat:3.6, veg:false, vegan:false, mealTypes:["lunch","dinner"], tags:["chicken"], unit:"g", amount:100 },
  { id:"fish_curry", name:"Fish Curry", local:"മീൻ കറി", category:"Fish", shopGroup:"Protein", serving:"1 cup", calories:220, protein:20, carbs:6, fat:13, veg:false, vegan:false, mealTypes:["lunch","dinner"], tags:["fish","coconut"], unit:"g", amount:150 },
  { id:"sardine", name:"Sardine / Mathi (grilled)", local:"മത്തി", category:"Fish", shopGroup:"Protein", serving:"100 g", calories:208, protein:25, carbs:0, fat:11, veg:false, vegan:false, mealTypes:["lunch","dinner"], tags:["fish"], unit:"g", amount:100 },
  { id:"mackerel", name:"Mackerel / Ayala (grilled)", local:"അയല", category:"Fish", shopGroup:"Protein", serving:"100 g", calories:205, protein:24, carbs:0, fat:12, veg:false, vegan:false, mealTypes:["lunch","dinner"], tags:["fish"], unit:"g", amount:100 },
  { id:"neymeen", name:"Neymeen Curry", local:"നെയ്മീൻ", category:"Fish", shopGroup:"Protein", serving:"100 g", calories:190, protein:22, carbs:4, fat:9, veg:false, vegan:false, mealTypes:["lunch","dinner"], tags:["fish","coconut"], unit:"g", amount:100 },
  { id:"tuna", name:"Tuna (cooked)", local:"", category:"Fish", shopGroup:"Protein", serving:"100 g", calories:132, protein:28, carbs:0, fat:1.3, veg:false, vegan:false, mealTypes:["lunch","dinner"], tags:["fish"], unit:"g", amount:100 },
  { id:"prawns_curry", name:"Prawns Curry", local:"ചെമ്മീൻ കറി", category:"Fish", shopGroup:"Protein", serving:"1 cup", calories:190, protein:20, carbs:6, fat:9, veg:false, vegan:false, mealTypes:["lunch","dinner"], tags:["fish","coconut"], unit:"g", amount:150 },
  { id:"boiled_egg", name:"Boiled Egg", local:"", category:"Eggs", shopGroup:"Protein", serving:"1 egg", calories:78, protein:6, carbs:0.6, fat:5, veg:true, vegan:false, mealTypes:["breakfast","snack","lunch","dinner"], tags:["egg"], unit:"pc", amount:1 },
  { id:"egg_curry", name:"Egg Curry", local:"മുട്ട കറി", category:"Eggs", shopGroup:"Protein", serving:"2 eggs curry", calories:300, protein:14, carbs:10, fat:22, veg:true, vegan:false, mealTypes:["breakfast","lunch","dinner"], tags:["egg","coconut"], unit:"pc", amount:2 },
  { id:"omelette", name:"Omelette", local:"", category:"Eggs", shopGroup:"Protein", serving:"2 eggs", calories:190, protein:13, carbs:2, fat:14, veg:true, vegan:false, mealTypes:["breakfast","snack"], tags:["egg"], unit:"pc", amount:2 },
  { id:"egg_bhurji", name:"Egg Bhurji", local:"", category:"Eggs", shopGroup:"Protein", serving:"2 eggs", calories:210, protein:13, carbs:4, fat:15, veg:true, vegan:false, mealTypes:["breakfast"], tags:["egg"], unit:"pc", amount:2 },
  { id:"chapati", name:"Chapati", local:"ചപ്പാത്തി", category:"Vegetarian", shopGroup:"Rice & Grains", serving:"1 piece", calories:104, protein:3, carbs:18, fat:2.5, veg:true, vegan:true, mealTypes:["breakfast","lunch","dinner"], tags:["wheat"], unit:"pc", amount:1 },
  { id:"parotta", name:"Parotta", local:"പൊറോട്ട", category:"Vegetarian", shopGroup:"Rice & Grains", serving:"1 piece", calories:260, protein:5, carbs:40, fat:9, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["wheat"], unit:"pc", amount:1 },
  { id:"cherupayar", name:"Cherupayar Curry", local:"ചെറുപയർ", category:"Vegetarian", shopGroup:"Protein", serving:"1 cup", calories:150, protein:10, carbs:22, fat:2, veg:true, vegan:true, mealTypes:["breakfast","lunch","dinner"], tags:["legume"], unit:"g", amount:150 },
  { id:"kadala_boiled", name:"Kadala (boiled)", local:"കടല", category:"Vegetarian", shopGroup:"Protein", serving:"1 cup", calories:180, protein:10, carbs:28, fat:3, veg:true, vegan:true, mealTypes:["breakfast","snack"], tags:["legume"], unit:"g", amount:150 },
  { id:"dal", name:"Dal", local:"പരിപ്പ്", category:"Vegetarian", shopGroup:"Protein", serving:"1 cup", calories:150, protein:9, carbs:22, fat:3, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["legume"], unit:"g", amount:200 },
  { id:"soy_chunks", name:"Soy Chunks Curry", local:"", category:"Vegetarian", shopGroup:"Protein", serving:"1 cup cooked", calories:180, protein:22, carbs:12, fat:5, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["soy"], unit:"g", amount:150 },
  { id:"paneer_curry", name:"Paneer Curry", local:"", category:"Dairy", shopGroup:"Dairy", serving:"100 g", calories:265, protein:14, carbs:6, fat:20, veg:true, vegan:false, mealTypes:["lunch","dinner"], tags:["dairy"], unit:"g", amount:100 },
  { id:"tofu", name:"Tofu Stir-fry", local:"", category:"Vegetarian", shopGroup:"Protein", serving:"150 g", calories:150, protein:15, carbs:6, fat:8, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["soy"], unit:"g", amount:150 },
  { id:"curd", name:"Curd", local:"തൈര്", category:"Dairy", shopGroup:"Dairy", serving:"1 cup", calories:120, protein:7, carbs:9, fat:6, veg:true, vegan:false, mealTypes:["lunch","dinner","snack"], tags:["dairy"], unit:"g", amount:200 },
  { id:"greek_yogurt", name:"Greek Yogurt", local:"", category:"Dairy", shopGroup:"Dairy", serving:"1 cup", calories:146, protein:20, carbs:8, fat:4, veg:true, vegan:false, mealTypes:["breakfast","snack"], tags:["dairy"], unit:"g", amount:200 },
  { id:"milk", name:"Milk (toned)", local:"പാൽ", category:"Dairy", shopGroup:"Dairy", serving:"1 cup", calories:120, protein:8, carbs:11, fat:5, veg:true, vegan:false, mealTypes:["breakfast","snack"], tags:["dairy"], unit:"ml", amount:240 },
  { id:"buttermilk", name:"Buttermilk", local:"സംഭാരം", category:"Drinks", shopGroup:"Dairy", serving:"1 glass", calories:40, protein:3, carbs:4, fat:1, veg:true, vegan:false, mealTypes:["lunch","snack"], tags:["dairy"], unit:"ml", amount:250 },
  { id:"thoran", name:"Vegetable Thoran", local:"തോരൻ", category:"Vegetables", shopGroup:"Vegetables", serving:"1 cup", calories:90, protein:3, carbs:10, fat:5, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["coconut","vegetable"], unit:"g", amount:100 },
  { id:"avial", name:"Avial", local:"അവിയൽ", category:"Vegetables", shopGroup:"Vegetables", serving:"1 cup", calories:140, protein:4, carbs:14, fat:8, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["coconut","vegetable"], unit:"g", amount:150 },
  { id:"moru_curry", name:"Moru Curry", local:"മോര് കറി", category:"Vegetables", shopGroup:"Vegetables", serving:"1 cup", calories:90, protein:4, carbs:8, fat:5, veg:true, vegan:false, mealTypes:["lunch","dinner"], tags:["dairy","coconut"], unit:"g", amount:150 },
  { id:"rasam", name:"Rasam", local:"രസം", category:"Vegetables", shopGroup:"Vegetables", serving:"1 cup", calories:60, protein:2, carbs:10, fat:1, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["vegetable"], unit:"g", amount:200 },
  { id:"veg_stew", name:"Vegetable Stew", local:"", category:"Vegetables", shopGroup:"Vegetables", serving:"1 cup", calories:150, protein:3, carbs:14, fat:9, veg:true, vegan:true, mealTypes:["breakfast","dinner"], tags:["coconut","vegetable"], unit:"g", amount:150 },
  { id:"beef_curry", name:"Beef Curry", local:"", category:"Fish", shopGroup:"Protein", serving:"1 cup", calories:280, protein:24, carbs:6, fat:18, veg:false, vegan:false, mealTypes:["lunch","dinner"], tags:["beef"], unit:"g", amount:150 },
  { id:"lean_beef", name:"Lean Beef (grilled)", local:"", category:"Fish", shopGroup:"Protein", serving:"100 g", calories:190, protein:26, carbs:0, fat:9, veg:false, vegan:false, mealTypes:["lunch","dinner"], tags:["beef"], unit:"g", amount:100 },
  { id:"banana", name:"Banana", local:"ഏത്തപ്പഴം", category:"Fruits", shopGroup:"Fruits", serving:"1 medium", calories:105, protein:1, carbs:27, fat:0.3, veg:true, vegan:true, mealTypes:["snack","breakfast"], tags:["fruit"], unit:"pc", amount:1 },
  { id:"papaya", name:"Papaya", local:"", category:"Fruits", shopGroup:"Fruits", serving:"1 cup cubed", calories:55, protein:0.6, carbs:14, fat:0.2, veg:true, vegan:true, mealTypes:["snack"], tags:["fruit"], unit:"g", amount:140 },
  { id:"guava", name:"Guava", local:"", category:"Fruits", shopGroup:"Fruits", serving:"1 medium", calories:68, protein:2.6, carbs:14, fat:1, veg:true, vegan:true, mealTypes:["snack"], tags:["fruit"], unit:"pc", amount:1 },
  { id:"apple", name:"Apple", local:"", category:"Fruits", shopGroup:"Fruits", serving:"1 medium", calories:78, protein:0.4, carbs:21, fat:0.3, veg:true, vegan:true, mealTypes:["snack"], tags:["fruit"], unit:"pc", amount:1 },
  { id:"watermelon", name:"Watermelon", local:"", category:"Fruits", shopGroup:"Fruits", serving:"1 cup", calories:45, protein:1, carbs:11, fat:0.2, veg:true, vegan:true, mealTypes:["snack"], tags:["fruit"], unit:"g", amount:150 },
  { id:"pineapple", name:"Pineapple", local:"", category:"Fruits", shopGroup:"Fruits", serving:"1 cup", calories:82, protein:0.9, carbs:21, fat:0.2, veg:true, vegan:true, mealTypes:["snack"], tags:["fruit"], unit:"g", amount:150 },
  { id:"oats", name:"Oats (cooked)", local:"", category:"Breakfast", shopGroup:"Rice & Grains", serving:"1 cup", calories:150, protein:5, carbs:27, fat:3, veg:true, vegan:true, mealTypes:["breakfast"], tags:["grain"], unit:"g", amount:200 },
  { id:"peanuts", name:"Peanuts (roasted)", local:"കപ്പലണ്ടി", category:"Snacks", shopGroup:"Protein", serving:"30 g", calories:170, protein:7, carbs:5, fat:14, veg:true, vegan:true, mealTypes:["snack"], tags:["nut"], unit:"g", amount:30 },
  { id:"roasted_chana", name:"Roasted Chana", local:"", category:"Snacks", shopGroup:"Protein", serving:"30 g", calories:120, protein:7, carbs:20, fat:2, veg:true, vegan:true, mealTypes:["snack"], tags:["legume"], unit:"g", amount:30 },
  { id:"sprouts_salad", name:"Sprouts Salad", local:"", category:"Snacks", shopGroup:"Protein", serving:"1 cup", calories:130, protein:9, carbs:20, fat:1, veg:true, vegan:true, mealTypes:["snack"], tags:["legume"], unit:"g", amount:150 },
  { id:"tea", name:"Tea (less sugar)", local:"ചായ", category:"Drinks", shopGroup:"Spices & Essentials", serving:"1 cup", calories:40, protein:1, carbs:6, fat:1, veg:true, vegan:false, mealTypes:["breakfast","snack"], tags:["dairy"], unit:"ml", amount:150 },
  { id:"coffee", name:"Black Coffee", local:"", category:"Drinks", shopGroup:"Spices & Essentials", serving:"1 cup", calories:5, protein:0, carbs:1, fat:0, veg:true, vegan:true, mealTypes:["breakfast","snack"], tags:[], unit:"ml", amount:150 },
  { id:"coconut_water", name:"Coconut Water", local:"", category:"Drinks", shopGroup:"Fruits", serving:"1 glass", calories:45, protein:1.7, carbs:9, fat:0.5, veg:true, vegan:true, mealTypes:["snack"], tags:["coconut"], unit:"ml", amount:250 },
  { id:"cucumber_salad", name:"Cucumber Salad", local:"", category:"Vegetables", shopGroup:"Vegetables", serving:"1 cup", calories:30, protein:1, carbs:6, fat:0.2, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["vegetable"], unit:"g", amount:120 },
  { id:"mixed_veg_curry", name:"Mixed Vegetable Curry", local:"", category:"Vegetables", shopGroup:"Vegetables", serving:"1 cup", calories:110, protein:3, carbs:14, fat:5, veg:true, vegan:true, mealTypes:["lunch","dinner"], tags:["vegetable"], unit:"g", amount:150 },
];
const foodById = Object.fromEntries(FOODS.map(f => [f.id, f]));

const PANTRY_ESSENTIALS = ["Coconut oil","Mustard seeds","Curry leaves","Turmeric powder","Chilli powder","Salt","Onions","Garlic","Ginger","Black pepper"];

/* ============================================================
   MEAL TEMPLATES (curated, realistic combinations)
   ============================================================ */
const TEMPLATES = {
  breakfast: [
    { diet:"any", items:["puttu","kadala_curry","boiled_egg"] },
    { diet:"any", items:["dosa","egg_bhurji"] },
    { diet:"any", items:["idli","sambar","boiled_egg"] },
    { diet:"any", items:["idiyappam","egg_curry"] },
    { diet:"veg", items:["appam","kadala_curry"] },
    { diet:"veg", items:["oats","banana","milk"] },
    { diet:"veg", items:["idli","sambar"] },
    { diet:"vegan", items:["idiyappam","sambar"] },
    { diet:"vegan", items:["puttu","kadala_curry"] },
    { diet:"vegan", items:["oats","banana"] },
    { diet:"any", items:["dosa","boiled_egg","banana"] },
  ],
  lunch: [
    { diet:"any", items:["matta_rice","fish_curry","thoran"] },
    { diet:"any", items:["matta_rice","chicken_curry","avial"] },
    { diet:"any", items:["matta_rice","beef_curry","mixed_veg_curry"] },
    { diet:"any", items:["white_rice","prawns_curry","rasam"] },
    { diet:"any", items:["matta_rice","sardine","thoran"] },
    { diet:"any", items:["chapati","egg_curry","cucumber_salad"] },
    { diet:"veg", items:["matta_rice","sambar","thoran","curd"] },
    { diet:"veg", items:["chapati","paneer_curry","cucumber_salad"] },
    { diet:"veg", items:["matta_rice","dal","avial"] },
    { diet:"veg", items:["matta_rice","kadala_curry","moru_curry"] },
    { diet:"vegan", items:["matta_rice","sambar","thoran"] },
    { diet:"vegan", items:["matta_rice","soy_chunks","mixed_veg_curry"] },
    { diet:"vegan", items:["chapati","dal","cucumber_salad"] },
    { diet:"vegan", items:["matta_rice","tofu","rasam"] },
  ],
  dinner: [
    { diet:"any", items:["chapati","fish_curry","thoran"] },
    { diet:"any", items:["idiyappam","chicken_curry"] },
    { diet:"any", items:["appam","egg_curry"] },
    { diet:"any", items:["matta_rice","mackerel","cucumber_salad"] },
    { diet:"any", items:["chapati","neymeen","rasam"] },
    { diet:"veg", items:["chapati","dal","thoran"] },
    { diet:"veg", items:["veg_stew","appam"] },
    { diet:"veg", items:["matta_rice","sambar","moru_curry"] },
    { diet:"vegan", items:["veg_stew","idiyappam"] },
    { diet:"vegan", items:["chapati","soy_chunks","mixed_veg_curry"] },
    { diet:"vegan", items:["matta_rice","dal","rasam"] },
  ],
  snack: [
    { diet:"any", items:["boiled_egg","banana"] },
    { diet:"any", items:["greek_yogurt","guava"] },
    { diet:"any", items:["buttermilk","banana"] },
    { diet:"veg", items:["roasted_chana"] },
    { diet:"veg", items:["peanuts","apple"] },
    { diet:"veg", items:["sprouts_salad"] },
    { diet:"vegan", items:["banana","peanuts"] },
    { diet:"vegan", items:["roasted_chana","apple"] },
    { diet:"vegan", items:["coconut_water","papaya"] },
    { diet:"any", items:["kadala_boiled"] },
  ],
};

function templateAllowed(tpl, dietPref, excludedTags) {
  if (dietPref === "vegan" && tpl.diet !== "vegan") return false;
  if (dietPref === "vegetarian" && tpl.diet === "nonveg") return false;
  const foods = tpl.items.map(id => foodById[id]);
  if (dietPref !== "nonveg") {
    if (foods.some(f => !f.vegan && dietPref === "vegan")) return false;
    if (foods.some(f => !f.veg && dietPref === "vegetarian")) return false;
  }
  if (excludedTags && excludedTags.length) {
    if (foods.some(f => f.tags.some(t => excludedTags.includes(t)))) return false;
  }
  return true;
}

const SLOT_DEFS = [
  { key:"breakfast", label:"Breakfast", type:"breakfast", pct:0.26 },
  { key:"morningSnack", label:"Mid-morning snack", type:"snack", pct:0.09 },
  { key:"lunch", label:"Lunch", type:"lunch", pct:0.32 },
  { key:"eveningSnack", label:"Evening snack", type:"snack", pct:0.09 },
  { key:"dinner", label:"Dinner", type:"dinner", pct:0.24 },
];

function buildSlot(slotDef, dietPref, excludedTags, rotationSeed) {
  const pool = TEMPLATES[slotDef.type].filter(t => templateAllowed(t, dietPref, excludedTags));
  const list = pool.length ? pool : TEMPLATES[slotDef.type];
  const tplIndex = list.length ? rotationSeed % list.length : 0;
  const tpl = list[tplIndex] || list[0];
  return { tpl, tplList: list, tplIndex };
}

function computeItems(tpl, qtyMap) {
  return tpl.items.map(id => {
    const f = foodById[id];
    const qty = qtyMap[id] ?? 1;
    return {
      id, food: f, qty,
      calories: Math.round(f.calories * qty),
      protein: Math.round(f.protein * qty * 10) / 10,
      carbs: Math.round(f.carbs * qty * 10) / 10,
      fat: Math.round(f.fat * qty * 10) / 10,
    };
  });
}

function scaleTemplate(tpl, targetCal) {
  const baseCal = tpl.items.reduce((s, id) => s + foodById[id].calories, 0);
  const rawScale = baseCal > 0 ? targetCal / baseCal : 1;
  const scale = Math.min(1.6, Math.max(0.7, rawScale));
  const qtyMap = {};
  tpl.items.forEach(id => {
    const q = Math.max(0.5, Math.round(scale * 2) / 2);
    qtyMap[id] = q;
  });
  return qtyMap;
}

function sumItems(items) {
  return items.reduce((acc, it) => ({
    calories: acc.calories + it.calories,
    protein: Math.round((acc.protein + it.protein) * 10) / 10,
    carbs: Math.round((acc.carbs + it.carbs) * 10) / 10,
    fat: Math.round((acc.fat + it.fat) * 10) / 10,
  }), { calories:0, protein:0, carbs:0, fat:0 });
}

function generateDayPlan(targetCal, targetProtein, dietPref, excludedTags, dayIndex) {
  const slots = SLOT_DEFS.map((def, slotIdx) => {
    const seed = dayIndex * 3 + slotIdx * 5 + 1;
    const { tpl, tplList, tplIndex } = buildSlot(def, dietPref, excludedTags, seed);
    const targetSlotCal = targetCal * def.pct;
    const qtyMap = scaleTemplate(tpl, targetSlotCal);
    const items = computeItems(tpl, qtyMap);
    const totals = sumItems(items);
    return { ...def, tplIndex, tplListLength: tplList.length, items, ...totals };
  });

  let day = { slots };
  let totals = sumItems(slots.flatMap(s => s.items));

  // protein booster if under target
  if (totals.protein < targetProtein * 0.9) {
    const gap = targetProtein - totals.protein;
    const boosterFood = excludedTags.includes("egg") ? foodById["greek_yogurt"] : (excludedTags.includes("dairy") ? foodById["boiled_egg"] : foodById["boiled_egg"]);
    const boosterOk = !excludedTags.some(t => boosterFood.tags.includes(t));
    if (boosterOk) {
      const extraQty = Math.max(1, Math.round(gap / boosterFood.protein));
      const lunchSlot = day.slots.find(s => s.key === "lunch");
      lunchSlot.items = [...lunchSlot.items, {
        id: boosterFood.id, food: boosterFood, qty: extraQty,
        calories: Math.round(boosterFood.calories * extraQty),
        protein: Math.round(boosterFood.protein * extraQty * 10) / 10,
        carbs: Math.round(boosterFood.carbs * extraQty * 10) / 10,
        fat: Math.round(boosterFood.fat * extraQty * 10) / 10,
      }];
      const t = sumItems(lunchSlot.items);
      lunchSlot.calories = t.calories; lunchSlot.protein = t.protein; lunchSlot.carbs = t.carbs; lunchSlot.fat = t.fat;
    }
  }
  totals = sumItems(day.slots.flatMap(s => s.items));
  day.totals = totals;
  return day;
}

const DAY_NAMES = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function generateWeekPlan(targetCal, targetProtein, dietPref, excludedTags) {
  return DAY_NAMES.map((name, i) => ({
    day: name,
    ...generateDayPlan(targetCal, targetProtein, dietPref, excludedTags, i),
  }));
}

function swapSlot(day, slotKey, dietPref, excludedTags, targetCal) {
  const slotDef = SLOT_DEFS.find(s => s.key === slotKey);
  const slot = day.slots.find(s => s.key === slotKey);
  const pool = TEMPLATES[slotDef.type].filter(t => templateAllowed(t, dietPref, excludedTags));
  const list = pool.length ? pool : TEMPLATES[slotDef.type];
  const nextIndex = (slot.tplIndex + 1) % list.length;
  const tpl = list[nextIndex];
  const targetSlotCal = targetCal * slotDef.pct;
  const qtyMap = scaleTemplate(tpl, targetSlotCal);
  const items = computeItems(tpl, qtyMap);
  const totals = sumItems(items);
  const newSlot = { ...slotDef, tplIndex: nextIndex, tplListLength: list.length, items, ...totals };
  const newSlots = day.slots.map(s => s.key === slotKey ? newSlot : s);
  const newDay = { ...day, slots: newSlots, totals: sumItems(newSlots.flatMap(s => s.items)) };
  return newDay;
}

function getSwapAlternatives(day, slotKey, dietPref, excludedTags, targetCal, count=3) {
  const slotDef = SLOT_DEFS.find(s => s.key === slotKey);
  const slot = day.slots.find(s => s.key === slotKey);
  const pool = TEMPLATES[slotDef.type].filter(t => templateAllowed(t, dietPref, excludedTags));
  const list = pool.length ? pool : TEMPLATES[slotDef.type];
  const targetSlotCal = targetCal * slotDef.pct;
  const alts = [];
  for (let i = 1; i <= list.length && alts.length < count; i++) {
    const idx = (slot.tplIndex + i) % list.length;
    if (idx === slot.tplIndex) continue;
    const tpl = list[idx];
    const qtyMap = scaleTemplate(tpl, targetSlotCal);
    const items = computeItems(tpl, qtyMap);
    const totals = sumItems(items);
    alts.push({ idx, tpl, items, totals });
  }
  return alts;
}

/* ============================================================
   SHOPPING LIST
   ============================================================ */
function generateShoppingList(weekPlan) {
  const totals = {};
  weekPlan.forEach(day => {
    day.slots.forEach(slot => {
      slot.items.forEach(it => {
        const f = it.food;
        if (!totals[f.id]) totals[f.id] = { food: f, qty: 0 };
        totals[f.id].qty += it.qty;
      });
    });
  });
  const groups = {};
  Object.values(totals).forEach(({ food, qty }) => {
    const group = food.shopGroup;
    if (!groups[group]) groups[group] = [];
    let amount = food.amount * qty;
    let display;
    if (food.unit === "g") {
      display = amount >= 1000 ? `${(amount/1000).toFixed(1)} kg` : `${Math.round(amount)} g`;
    } else if (food.unit === "ml") {
      display = amount >= 1000 ? `${(amount/1000).toFixed(1)} L` : `${Math.round(amount)} ml`;
    } else {
      display = `${Math.round(amount)} pc${Math.round(amount) !== 1 ? "s" : ""}`;
    }
    groups[group].push({ name: food.name, display, id: food.id });
  });
  groups["Spices & Essentials"] = [
    ...(groups["Spices & Essentials"] || []),
    ...PANTRY_ESSENTIALS.map(name => ({ name, display: "as needed", id: "pantry-"+name })),
  ];
  return groups;
}

/* ============================================================
   NUTRITION CALCULATIONS
   ============================================================ */
const ACTIVITY_LEVELS = [
  { id:"sedentary", label:"Sedentary", desc:"Little or no exercise", factor:1.2 },
  { id:"light", label:"Lightly Active", desc:"Exercise 1–3 days/week", factor:1.375 },
  { id:"moderate", label:"Moderately Active", desc:"Exercise 3–5 days/week", factor:1.55 },
  { id:"very", label:"Very Active", desc:"Exercise 6–7 days/week", factor:1.725 },
  { id:"extreme", label:"Extremely Active", desc:"Hard training or physically demanding work", factor:1.9 },
];

function calculateBMR({ sex, weightKg, heightCm, age }) {
  const base = 10*weightKg + 6.25*heightCm - 5*age;
  return Math.round(sex === "male" ? base + 5 : base - 161);
}
function calculateTDEE(bmr, activityId) {
  const level = ACTIVITY_LEVELS.find(l => l.id === activityId) || ACTIVITY_LEVELS[2];
  return Math.round(bmr * level.factor);
}
function calculateCalorieTarget(tdee, goal, pace) {
  let pct = 0;
  if (goal === "lose") pct = pace === "slow" ? -0.10 : pace === "faster" ? -0.20 : -0.15;
  if (goal === "gain") pct = pace === "slow" ? 0.10 : 0.15;
  return Math.round(tdee * (1 + pct));
}
function calculateProteinRange(weightKg, goal) {
  const ranges = { lose:[1.6,2.0], maintain:[1.4,1.8], gain:[1.6,2.2] };
  const [lo, hi] = ranges[goal] || ranges.maintain;
  return { min: Math.round(lo*weightKg), max: Math.round(hi*weightKg), recommended: Math.round(((lo+hi)/2)*weightKg) };
}
function calculateMacros(calories, proteinG) {
  const proteinCal = proteinG * 4;
  const remaining = Math.max(calories - proteinCal, calories * 0.25);
  const fatCal = remaining * 0.35;
  const carbCal = remaining * 0.65;
  return {
    protein: proteinG,
    carbs: Math.round(carbCal / 4),
    fat: Math.round(fatCal / 9),
  };
}

/* ============================================================
   SMALL UI PRIMITIVES
   ============================================================ */
const Button = ({ variant="primary", children, className="", icon:Icon, iconRight, ...props }) => (
  <button className={`kf-btn kf-btn-${variant} kf-focus ${className}`} {...props}>
    {Icon && !iconRight && <Icon size={17} strokeWidth={2.2} />}
    {children}
    {iconRight && <ChevronRight size={17} strokeWidth={2.2} />}
  </button>
);

const Field = ({ label, children, hint, error }) => (
  <div style={{ marginBottom: 18 }}>
    {label && <label className="kf-label">{label}</label>}
    {children}
    {hint && !error && <p style={{ fontSize:12.5, color:"var(--ink-faint)", marginTop:6 }}>{hint}</p>}
    {error && <p style={{ fontSize:12.5, color:"var(--danger)", marginTop:6, display:"flex", alignItems:"center", gap:5 }}><TriangleAlert size={13}/>{error}</p>}
  </div>
);

const SegToggle = ({ options, value, onChange }) => (
  <div style={{ display:"flex", background:"var(--cream-2)", borderRadius:12, padding:4, gap:4 }}>
    {options.map(opt => (
      <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
        className="kf-focus"
        style={{
          flex:1, padding:"9px 12px", borderRadius:9, border:"none", fontSize:13.5, fontWeight:600,
          background: value === opt.value ? "#fff" : "transparent",
          color: value === opt.value ? "var(--green-800)" : "var(--ink-soft)",
          boxShadow: value === opt.value ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
        }}>
        {opt.label}
      </button>
    ))}
  </div>
);

function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title} style={{
      position:"fixed", inset:0, background:"rgba(20,20,15,0.45)", zIndex:200,
      display:"flex", alignItems:"flex-end", justifyContent:"center", padding:0,
    }} onClick={onClose}>
      <div className="kf-card kf-fade-in" style={{
        width:"100%", maxWidth:520, margin: "auto 0 0 0", borderRadius:"20px 20px 0 0", padding:24,
        maxHeight:"85vh", overflowY:"auto",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <h3 style={{ fontSize:19 }}>{title}</h3>
          <button onClick={onClose} aria-label="Close" className="kf-btn-ghost kf-focus" style={{ borderRadius:999, padding:6 }}><X size={20}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ProgressRing({ value, max, size=180, label, sub }) {
  const pct = Math.min(1, value/max);
  const r = (size-20)/2, c = 2*Math.PI*r;
  return (
    <div style={{ position:"relative", width:size, height:size }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--cream-2)" strokeWidth="14" fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--spice)" strokeWidth="14" fill="none"
          strokeDasharray={c} strokeDashoffset={c*(1-pct)} strokeLinecap="round"
          style={{ transition:"stroke-dashoffset 0.6s ease" }} />
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <span className="kf-num" style={{ fontSize:34, color:"var(--green-900)" }}>{Math.round(value).toLocaleString()}</span>
        <span style={{ fontSize:12.5, color:"var(--ink-faint)", fontWeight:600 }}>{label}</span>
        {sub && <span style={{ fontSize:11.5, color:"var(--ink-faint)" }}>{sub}</span>}
      </div>
    </div>
  );
}

function BarProgress({ value, max, color="var(--green-600)" }) {
  const pct = Math.min(100, Math.round((value/max)*100));
  return (
    <div style={{ height:12, background:"var(--cream-2)", borderRadius:999, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:999, transition:"width 0.5s ease" }} />
    </div>
  );
}

const IconCircle = ({ icon:Icon, bg="var(--green-100)", color="var(--green-800)", size=44 }) => (
  <div style={{ width:size, height:size, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
    <Icon size={size*0.46} color={color} strokeWidth={2.2} />
  </div>
);

/* ============================================================
   HERO ILLUSTRATION (stylized Kerala plate, pure SVG)
   ============================================================ */
function HeroPlate() {
  return (
    <svg viewBox="0 0 420 420" width="100%" height="100%" role="img" aria-label="Illustration of a Kerala meal plate with rice, fish curry, puttu, egg and vegetables">
      <circle cx="210" cy="210" r="200" fill="#F6EFDC" />
      <circle cx="210" cy="210" r="170" fill="#FFFFFF" />
      <circle cx="210" cy="210" r="170" fill="none" stroke="#EFE6CC" strokeWidth="2" />
      <ellipse cx="150" cy="180" rx="62" ry="46" fill="#F4F1E4" />
      <ellipse cx="150" cy="180" rx="62" ry="46" fill="none" stroke="#E2DCC0" strokeWidth="1.5" />
      <ellipse cx="290" cy="165" rx="54" ry="40" fill="var(--spice-50)" />
      <path d="M255 165 q35 -28 70 0 q-10 24 -35 26 q-25 -2 -35 -26 Z" fill="var(--spice)" opacity="0.85"/>
      <ellipse cx="290" cy="165" rx="54" ry="40" fill="none" stroke="var(--spice-dark)" strokeOpacity="0.25" strokeWidth="1.5" />
      <ellipse cx="255" cy="270" rx="55" ry="42" fill="#EFF6EA" />
      <ellipse cx="255" cy="270" rx="55" ry="42" fill="none" stroke="var(--green-500)" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M228 262 q27 -18 54 0 q-4 16 -27 18 q-23 -2 -27 -18Z" fill="var(--green-600)" opacity="0.55" />
      <ellipse cx="140" cy="285" rx="30" ry="30" fill="#FFF9EC" stroke="#EAD9AF" strokeWidth="1.5" />
      <circle cx="140" cy="285" r="18" fill="#FDEFCB" />
      <circle cx="140" cy="285" r="8" fill="var(--spice)" />
      <ellipse cx="90" cy="195" rx="20" ry="20" fill="#FFFDF6" stroke="#EDE7D2" strokeWidth="1.5" />
      <ellipse cx="90" cy="195" rx="9" ry="12" fill="#FBF3DD" />
      <circle cx="90" cy="195" r="4" fill="#F0B429" />
      <circle cx="330" cy="255" r="10" fill="#E7C87A" />
      <circle cx="342" cy="248" r="7" fill="#E7C87A" />
      <circle cx="322" cy="248" r="7" fill="#E7C87A" />
    </svg>
  );
}

/* ============================================================
   NAV + FOOTER
   ============================================================ */
const NAV_LINKS = [
  { id:"home", label:"Home" },
  { id:"calculator", label:"Calculator" },
  { id:"meal-plan", label:"Meal Plans" },
  { id:"foods", label:"Kerala Foods" },
  { id:"progress", label:"Progress" },
];

function Logo({ small }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
      <div style={{ width:34, height:34, borderRadius:10, background:"var(--green-800)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Leaf size={18} color="#F6EFDC" strokeWidth={2.3} />
      </div>
      {!small && <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:20, color:"var(--green-900)" }}>KeralaFit</span>}
    </div>
  );
}

function NavBar({ page, navigate }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="kf-noprint" style={{ position:"sticky", top:0, zIndex:100, background:"rgba(251,247,238,0.92)", backdropFilter:"blur(8px)", borderBottom:"1px solid var(--line)" }}>
      <div className="kf-container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <button onClick={() => navigate("home")} className="kf-focus" style={{ background:"none", border:"none", padding:0 }} aria-label="KeralaFit home">
          <Logo />
        </button>
        <nav style={{ display:"none", gap:6 }} className="kf-desktop-nav">
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => navigate(l.id)} className="kf-focus"
              style={{
                background: page===l.id ? "var(--green-100)" : "transparent", border:"none",
                padding:"9px 15px", borderRadius:999, fontSize:14.5, fontWeight:600,
                color: page===l.id ? "var(--green-800)" : "var(--ink-soft)",
              }}>{l.label}</button>
          ))}
        </nav>
        <div style={{ display:"none" }} className="kf-desktop-cta">
          <Button variant="secondary" onClick={() => navigate("calculator")}>Calculate My Plan</Button>
        </div>
        <button className="kf-focus kf-mobile-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu" style={{ background:"none", border:"none", padding:8 }}>
          <Menu size={24} color="var(--green-900)" />
        </button>
      </div>
      {open && (
        <div style={{ position:"fixed", inset:0, background:"var(--cream)", zIndex:150, padding:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
            <Logo />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="kf-focus" style={{ background:"none", border:"none", padding:8 }}><X size={26}/></button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {[...NAV_LINKS, {id:"about",label:"About"}].map(l => (
              <button key={l.id} onClick={() => { navigate(l.id); setOpen(false); }} className="kf-focus"
                style={{ textAlign:"left", background:"none", border:"none", padding:"16px 4px", fontSize:20, fontWeight:600,
                  fontFamily:"var(--font-display)", color: page===l.id ? "var(--spice)" : "var(--green-900)", borderBottom:"1px solid var(--line)" }}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ marginTop:32 }}>
            <Button variant="secondary" style={{ width:"100%" }} onClick={() => { navigate("calculator"); setOpen(false); }}>Calculate My Plan</Button>
          </div>
        </div>
      )}
      <style>{`
        @media(min-width:900px){
          .kf-desktop-nav{ display:flex !important; }
          .kf-desktop-cta{ display:block !important; }
          .kf-mobile-menu-btn{ display:none !important; }
        }
      `}</style>
    </header>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="kf-noprint" style={{ background:"var(--green-900)", color:"#DCE9DF", marginTop:80 }}>
      <div className="kf-container" style={{ padding:"56px 20px 32px", display:"grid", gap:32, gridTemplateColumns:"1fr" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:12 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:"rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Leaf size={18} color="#F6EFDC" strokeWidth={2.3} />
            </div>
            <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:19, color:"#fff" }}>KeralaFit</span>
          </div>
          <p style={{ fontSize:14, color:"#B7C9BC", maxWidth:320 }}>Your Calories. Your Protein. Your Kerala Food.</p>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"12px 28px" }}>
          {[["Calculator","calculator"],["Meal Plans","meal-plan"],["Kerala Foods","foods"],["About","about"],["Privacy","privacy"],["Disclaimer","disclaimer"]].map(([label,id]) => (
            <button key={id} onClick={() => navigate(id)} className="kf-focus" style={{ background:"none", border:"none", padding:0, color:"#CFE0D3", fontSize:14.5 }}>{label}</button>
          ))}
        </div>
        <p style={{ fontSize:12.5, color:"#8AA292", borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:20 }}>© 2026 KeralaFit. General estimates only — not medical advice.</p>
      </div>
    </footer>
  );
}

function DisclaimerStrip() {
  return (
    <div style={{ background:"var(--spice-50)", borderTop:"1px solid var(--spice-100)", borderBottom:"1px solid var(--spice-100)" }}>
      <div className="kf-container" style={{ padding:"11px 20px", display:"flex", alignItems:"center", gap:10 }}>
        <Info size={15} color="var(--spice-dark)" style={{ flexShrink:0 }} />
        <p style={{ fontSize:12.5, color:"var(--spice-dark)" }}>General estimates for healthy adults — not medical advice. See our <u>disclaimer</u> for details.</p>
      </div>
    </div>
  );
}

/* ============================================================
   HOMEPAGE
   ============================================================ */
const WHAT_YOU_GET = [
  { icon:Flame, title:"Daily Calories", desc:"A clear daily target based on your body and goal." },
  { icon:Dumbbell, title:"Protein Target", desc:"A practical protein range so you keep muscle while you change." },
  { icon:UtensilsCrossed, title:"Kerala Meal Plan", desc:"Real meals — puttu, fish curry, rice — built around your numbers." },
  { icon:Salad, title:"Food Suggestions", desc:"Easy swaps and snacks that fit your day." },
  { icon:ShoppingCart, title:"Shopping List", desc:"Auto-built from your 7-day plan, grouped and ready to print." },
  { icon:LineChartIcon, title:"Progress Tracking", desc:"Log your weight and see your trend over time." },
];

const POPULAR_FOOD_IDS = ["puttu","kadala_curry","matta_rice","sardine","mackerel","boiled_egg","chicken_curry","appam","dosa","idli","chapati","cherupayar"];

function FoodMiniCard({ food, showLocal }) {
  return (
    <div className="kf-card" style={{ padding:16, minWidth:150 }}>
      <p style={{ fontWeight:600, fontSize:14.5, color:"var(--green-900)" }}>{food.name}</p>
      {showLocal && food.local && <p style={{ fontSize:12.5, color:"var(--ink-faint)", marginTop:1 }}>{food.local}</p>}
      <div style={{ display:"flex", gap:14, marginTop:10 }}>
        <div>
          <p className="kf-num" style={{ fontSize:17, color:"var(--spice-dark)" }}>{food.calories}</p>
          <p style={{ fontSize:11, color:"var(--ink-faint)" }}>kcal</p>
        </div>
        <div>
          <p className="kf-num" style={{ fontSize:17, color:"var(--green-700)" }}>{food.protein}g</p>
          <p style={{ fontSize:11, color:"var(--ink-faint)" }}>protein</p>
        </div>
      </div>
      <p style={{ fontSize:11.5, color:"var(--ink-faint)", marginTop:8 }}>{food.serving}</p>
    </div>
  );
}

function Section({ children, bg, style }) {
  return <section style={{ padding:"64px 0", background:bg, ...style }}><div className="kf-container">{children}</div></section>;
}

function Home({ navigate }) {
  return (
    <div>
      <Section style={{ paddingTop:48 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:40, alignItems:"center" }} className="kf-hero-grid">
          <div className="kf-fade-in">
            <span className="kf-badge kf-badge-spice" style={{ marginBottom:18 }}><Sparkles size={13}/> Built for Kerala &amp; Indian food</span>
            <h1 style={{ fontSize:"clamp(32px,5.5vw,52px)", lineHeight:1.08, marginBottom:18, letterSpacing:"-0.01em" }}>
              Eat better. Without giving up Kerala food.
            </h1>
            <p style={{ fontSize:17, color:"var(--ink-soft)", maxWidth:480, marginBottom:28, lineHeight:1.6 }}>
              Get your daily calorie and protein targets, plus a practical Kerala-style meal plan built around your goal.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
              <Button variant="secondary" onClick={() => navigate("calculator")} icon={Flame}>Calculate My Calories</Button>
              <Button variant="outline" onClick={() => navigate("foods")}>Explore Kerala Foods</Button>
            </div>
            <p style={{ fontSize:13, color:"var(--ink-faint)", marginTop:20 }}>Free. No account needed. Takes about 2 minutes.</p>
          </div>
          <div style={{ maxWidth:420, margin:"0 auto", width:"100%" }}>
            <HeroPlate />
          </div>
        </div>
      </Section>

      <Section bg="var(--cream-2)">
        <h2 style={{ fontSize:28, marginBottom:8, textAlign:"center" }}>How it works</h2>
        <p style={{ textAlign:"center", color:"var(--ink-soft)", marginBottom:36 }}>Three steps to your plan.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
          {[
            { n:1, title:"Enter your details", desc:"Age, sex, height, weight, activity and goal — no complicated forms." },
            { n:2, title:"Get your targets", desc:"See your calorie and protein numbers, explained simply." },
            { n:3, title:"Get your Kerala meal plan", desc:"Real meals built from your numbers, ready for the week." },
          ].map(s => (
            <div key={s.n} className="kf-card" style={{ padding:26 }}>
              <div className="kf-num" style={{ fontSize:15, color:"var(--spice)", marginBottom:14 }}>Step {s.n}</div>
              <h3 style={{ fontSize:18, marginBottom:8 }}>{s.title}</h3>
              <p style={{ fontSize:14.5, color:"var(--ink-soft)", lineHeight:1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 style={{ fontSize:28, marginBottom:8, textAlign:"center" }}>What you get</h2>
        <p style={{ textAlign:"center", color:"var(--ink-soft)", marginBottom:36 }}>Everything you need, nothing you don't.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:20 }}>
          {WHAT_YOU_GET.map((item,i) => (
            <div key={i} className="kf-card" style={{ padding:24 }}>
              <IconCircle icon={item.icon} />
              <h3 style={{ fontSize:16.5, marginTop:14, marginBottom:6 }}>{item.title}</h3>
              <p style={{ fontSize:14, color:"var(--ink-soft)", lineHeight:1.55 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="var(--green-900)">
        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:28 }} className="kf-philosophy-grid">
          <div>
            <h2 style={{ color:"#fff", fontSize:28, marginBottom:14 }}>Kerala food, made practical</h2>
            <p style={{ color:"#C9DACD", fontSize:16, lineHeight:1.65, maxWidth:460 }}>
              You don't have to give up rice, puttu, appam or fish curry to eat better. KeralaFit focuses on portion control, protein, balanced meals and habits you can actually keep — not restriction.
            </p>
          </div>
          <div style={{ display:"grid", gap:14 }}>
            {[
              ["Rice can absolutely fit your plan.", "Adjust the portion and pair it with protein and vegetables."],
              ["Coconut-based dishes can fit your diet.", "Because coconut and oil add calories quickly, portion size matters."],
              ["Parotta is calorie-dense.", "Enjoy it occasionally and balance the meal with protein and vegetables."],
            ].map(([a,b],i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.06)", borderRadius:14, padding:18, borderLeft:"3px solid var(--spice)" }}>
                <p style={{ color:"#fff", fontWeight:600, fontSize:14.5, marginBottom:5 }}>{a}</p>
                <p style={{ color:"#B7C9BC", fontSize:13.5, lineHeight:1.5 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <h2 style={{ fontSize:28, marginBottom:8, textAlign:"center" }}>Popular Kerala foods</h2>
        <p style={{ textAlign:"center", color:"var(--ink-soft)", marginBottom:32 }}>A taste of the food database inside your meal plan.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:14 }}>
          {POPULAR_FOOD_IDS.map(id => <FoodMiniCard key={id} food={foodById[id]} />)}
        </div>
        <div style={{ textAlign:"center", marginTop:28 }}>
          <Button variant="outline" onClick={() => navigate("foods")}>See the full food database</Button>
        </div>
      </Section>

      <Section bg="var(--cream-2)">
        <div style={{ textAlign:"center" }}>
          <h2 style={{ fontSize:30, marginBottom:14 }}>Ready to find your numbers?</h2>
          <p style={{ color:"var(--ink-soft)", marginBottom:24 }}>It takes about two minutes.</p>
          <Button variant="secondary" onClick={() => navigate("calculator")} icon={Flame}>Calculate My Plan</Button>
        </div>
      </Section>

      <style>{`
        @media(min-width:860px){
          .kf-hero-grid{ grid-template-columns: 1.1fr 0.9fr !important; }
          .kf-philosophy-grid{ grid-template-columns: 1fr 1fr !important; align-items:center; }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   CALCULATOR (4-step wizard)
   ============================================================ */
const EXCLUDE_OPTIONS = [
  { tag:"fish", label:"Fish" }, { tag:"chicken", label:"Chicken" }, { tag:"egg", label:"Eggs" },
  { tag:"beef", label:"Beef" }, { tag:"dairy", label:"Dairy" }, { tag:"coconut", label:"Coconut" },
  { tag:"rice", label:"Rice" },
];

function Stepper({ step, total }) {
  return (
    <div style={{ marginBottom:28 }}>
      <p style={{ fontSize:12.5, fontWeight:600, color:"var(--ink-faint)", marginBottom:10 }}>Step {step} of {total}</p>
      <div style={{ display:"flex", gap:6 }}>
        {Array.from({length:total}).map((_,i) => (
          <div key={i} style={{ flex:1, height:5, borderRadius:99, background: i < step ? "var(--green-700)" : "var(--line-strong)" }} />
        ))}
      </div>
    </div>
  );
}

function Tooltip({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position:"relative", display:"inline-block" }}>
      <button type="button" aria-label="More info" onClick={() => setOpen(o=>!o)} className="kf-focus"
        style={{ background:"none", border:"none", padding:2, verticalAlign:"middle", color:"var(--ink-faint)" }}>
        <Info size={15} />
      </button>
      {open && (
        <div role="tooltip" className="kf-card" style={{ position:"absolute", zIndex:20, bottom:"120%", left:"50%", transform:"translateX(-50%)",
          width:240, padding:12, fontSize:12.5, color:"var(--ink-soft)", fontWeight:400, lineHeight:1.5 }}>
          {text}
        </div>
      )}
    </span>
  );
}

function CalculatorPage({ navigate, onComplete }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    age:"", sex:"male", heightUnit:"cm", heightCm:"", heightFt:"", heightIn:"",
    weightUnit:"kg", weightKg:"", weightLbs:"",
    activity:"moderate",
    goal:"lose", pace:"moderate",
    diet:"nonveg", excluded:[],
  });
  const set = (k,v) => setForm(f => ({ ...f, [k]: v }));

  const heightCmResolved = form.heightUnit === "cm"
    ? parseFloat(form.heightCm)
    : (parseFloat(form.heightFt||0)*12 + parseFloat(form.heightIn||0)) * 2.54;
  const weightKgResolved = form.weightUnit === "kg" ? parseFloat(form.weightKg) : parseFloat(form.weightLbs||0) * 0.453592;

  function validateStep1() {
    const e = {};
    const age = parseFloat(form.age);
    if (!age || age < 18 || age > 100) e.age = "Please enter a valid age (18–100).";
    if (!heightCmResolved || heightCmResolved < 100 || heightCmResolved > 250) e.height = "Please enter a valid height.";
    if (!weightKgResolved || weightKgResolved < 30 || weightKgResolved > 300) e.weight = "Please enter a valid weight.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 1 && !validateStep1()) return;
    if (step < 4) setStep(step+1);
    else finish();
  }
  function back() { if (step > 1) setStep(step-1); else navigate("home"); }

  function finish() {
    const age = parseFloat(form.age);
    const bmr = calculateBMR({ sex:form.sex, weightKg:weightKgResolved, heightCm:heightCmResolved, age });
    const tdee = calculateTDEE(bmr, form.activity);
    const pace = form.goal === "maintain" ? null : form.pace;
    const targetCalories = calculateCalorieTarget(tdee, form.goal, pace);
    const goalKey = form.goal === "lose" ? "lose" : form.goal === "gain" ? "gain" : "maintain";
    const proteinRange = calculateProteinRange(weightKgResolved, goalKey);
    const macros = calculateMacros(targetCalories, proteinRange.recommended);
    const dietPref = form.diet;
    const profile = {
      age, sex:form.sex, heightCm: Math.round(heightCmResolved), weightKg: Math.round(weightKgResolved*10)/10,
      activity: form.activity, goal: form.goal, pace, diet: dietPref, excluded: form.excluded,
      bmr, tdee, targetCalories, proteinRange, macros,
      lowCalorieWarning: targetCalories < 1200,
      createdAt: Date.now(),
    };
    onComplete(profile);
    navigate("results");
  }

  const toggleExclude = (tag) => {
    setForm(f => ({ ...f, excluded: f.excluded.includes(tag) ? f.excluded.filter(t=>t!==tag) : [...f.excluded, tag] }));
  };

  return (
    <Section style={{ paddingTop:36, minHeight:"70vh" }}>
      <div style={{ maxWidth:560, margin:"0 auto" }}>
        <Stepper step={step} total={4} />

        {step === 1 && (
          <div className="kf-fade-in">
            <h2 style={{ fontSize:26, marginBottom:6 }}>About you</h2>
            <p style={{ color:"var(--ink-soft)", marginBottom:26 }}>Let's build your plan.</p>

            <Field label="Age" error={errors.age}>
              <input className="kf-input" type="number" inputMode="numeric" placeholder="e.g. 30" value={form.age}
                onChange={e => set("age", e.target.value)} min={18} max={100} aria-label="Age in years" />
            </Field>

            <Field label="Sex">
              <SegToggle value={form.sex} onChange={v=>set("sex",v)} options={[{value:"male",label:"Male"},{value:"female",label:"Female"}]} />
            </Field>

            <Field label="Height" error={errors.height}>
              <div style={{ marginBottom:10 }}>
                <SegToggle value={form.heightUnit} onChange={v=>set("heightUnit",v)} options={[{value:"cm",label:"cm"},{value:"ft",label:"ft / in"}]} />
              </div>
              {form.heightUnit === "cm" ? (
                <input className="kf-input" type="number" inputMode="numeric" placeholder="e.g. 175" value={form.heightCm}
                  onChange={e=>set("heightCm", e.target.value)} aria-label="Height in centimeters" />
              ) : (
                <div style={{ display:"flex", gap:10 }}>
                  <input className="kf-input" type="number" inputMode="numeric" placeholder="feet" value={form.heightFt}
                    onChange={e=>set("heightFt", e.target.value)} aria-label="Height feet" />
                  <input className="kf-input" type="number" inputMode="numeric" placeholder="inches" value={form.heightIn}
                    onChange={e=>set("heightIn", e.target.value)} aria-label="Height inches" />
                </div>
              )}
            </Field>

            <Field label="Weight" error={errors.weight}>
              <div style={{ marginBottom:10 }}>
                <SegToggle value={form.weightUnit} onChange={v=>set("weightUnit",v)} options={[{value:"kg",label:"kg"},{value:"lbs",label:"lbs"}]} />
              </div>
              <input className="kf-input" type="number" inputMode="numeric"
                placeholder={form.weightUnit==="kg" ? "e.g. 80" : "e.g. 176"}
                value={form.weightUnit==="kg" ? form.weightKg : form.weightLbs}
                onChange={e => set(form.weightUnit==="kg" ? "weightKg" : "weightLbs", e.target.value)}
                aria-label={`Weight in ${form.weightUnit}`} />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="kf-fade-in">
            <h2 style={{ fontSize:26, marginBottom:2, display:"flex", alignItems:"center", gap:6 }}>How active are you? <Tooltip text="This estimates the energy you burn from daily movement and exercise, on top of what your body burns at rest." /></h2>
            <p style={{ color:"var(--ink-soft)", marginBottom:22 }}>Pick what matches most weeks — not your best week.</p>
            <div style={{ display:"grid", gap:12 }}>
              {ACTIVITY_LEVELS.map(l => (
                <button key={l.id} type="button" onClick={()=>set("activity", l.id)}
                  className={`kf-choice kf-focus ${form.activity===l.id?"active":""}`}>
                  <div style={{ flex:1 }}>
                    <p style={{ fontWeight:600, fontSize:15.5, color:"var(--green-900)" }}>{l.label}</p>
                    <p style={{ fontSize:13.5, color:"var(--ink-soft)", marginTop:2 }}>{l.desc}</p>
                  </div>
                  {form.activity===l.id && <CircleCheck size={20} color="var(--green-700)" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="kf-fade-in">
            <h2 style={{ fontSize:26, marginBottom:22 }}>What's your goal?</h2>
            <div style={{ display:"grid", gap:12, marginBottom:22 }}>
              {[
                {id:"lose", icon:Flame, label:"Lose Weight"},
                {id:"maintain", icon:Scale, label:"Maintain Weight"},
                {id:"gain", icon:Dumbbell, label:"Gain Weight / Build Muscle"},
              ].map(g => (
                <button key={g.id} type="button" onClick={()=>set("goal", g.id)} className={`kf-choice kf-focus ${form.goal===g.id?"active":""}`}>
                  <IconCircle icon={g.icon} size={38} />
                  <div style={{ flex:1, display:"flex", alignItems:"center" }}>
                    <p style={{ fontWeight:600, fontSize:15.5, color:"var(--green-900)" }}>{g.label}</p>
                  </div>
                  {form.goal===g.id && <CircleCheck size={20} color="var(--green-700)" />}
                </button>
              ))}
            </div>

            {form.goal === "lose" && (
              <div className="kf-fade-in">
                <p style={{ fontWeight:600, fontSize:15, marginBottom:10 }}>How aggressively do you want to lose weight?</p>
                <SegToggle value={form.pace} onChange={v=>set("pace",v)} options={[{value:"slow",label:"Slow"},{value:"moderate",label:"Moderate"},{value:"faster",label:"Faster"}]} />
                <p style={{ fontSize:12.5, color:"var(--ink-faint)", marginTop:8 }}>We never recommend extreme calorie restriction.</p>
              </div>
            )}
            {form.goal === "gain" && (
              <div className="kf-fade-in">
                <p style={{ fontWeight:600, fontSize:15, marginBottom:10 }}>How quickly do you want to gain?</p>
                <SegToggle value={form.pace==="faster"?"moderate":form.pace} onChange={v=>set("pace",v)} options={[{value:"slow",label:"Slow"},{value:"moderate",label:"Moderate"}]} />
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="kf-fade-in">
            <h2 style={{ fontSize:26, marginBottom:22 }}>What kind of food do you eat?</h2>
            <div style={{ display:"grid", gap:12, marginBottom:28 }}>
              {[{id:"nonveg",label:"Non-Vegetarian"},{id:"vegetarian",label:"Vegetarian"},{id:"vegan",label:"Vegan"}].map(d => (
                <button key={d.id} type="button" onClick={()=>set("diet", d.id)} className={`kf-choice kf-focus ${form.diet===d.id?"active":""}`}>
                  <div style={{ flex:1 }}><p style={{ fontWeight:600, fontSize:15.5, color:"var(--green-900)" }}>{d.label}</p></div>
                  {form.diet===d.id && <CircleCheck size={20} color="var(--green-700)" />}
                </button>
              ))}
            </div>
            <p style={{ fontWeight:600, fontSize:15, marginBottom:4 }}>Foods you don't eat</p>
            <p style={{ fontSize:13, color:"var(--ink-faint)", marginBottom:12 }}>Optional — we'll build your plan around these.</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:9 }}>
              {EXCLUDE_OPTIONS.map(opt => {
                const active = form.excluded.includes(opt.tag);
                return (
                  <button key={opt.tag} type="button" onClick={()=>toggleExclude(opt.tag)} className="kf-focus"
                    style={{ padding:"9px 15px", borderRadius:999, border:`1.5px solid ${active?"var(--green-800)":"var(--line-strong)"}`,
                      background: active ? "var(--green-800)" : "#fff", color: active ? "#fff" : "var(--ink-soft)", fontSize:13.5, fontWeight:600 }}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display:"flex", justifyContent:"space-between", marginTop:32, gap:12 }}>
          <Button variant="outline" onClick={back} icon={ChevronLeft}>Back</Button>
          <Button variant="primary" onClick={next}>{step===4 ? "See My Plan" : "Continue"}</Button>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   RESULTS PAGE
   ============================================================ */
function ResultCardStat({ label, value, unit }) {
  return (
    <div className="kf-card" style={{ padding:20, textAlign:"center" }}>
      <p style={{ fontSize:12.5, fontWeight:600, color:"var(--ink-faint)", marginBottom:6 }}>{label}</p>
      <p className="kf-num" style={{ fontSize:26, color:"var(--green-900)" }}>{value.toLocaleString()}<span style={{ fontSize:14, fontWeight:500, marginLeft:3 }}>{unit}</span></p>
    </div>
  );
}

function ResultsPage({ profile, navigate, weekPlan, regenerateWeek }) {
  if (!profile) {
    return (
      <Section style={{ textAlign:"center", minHeight:"60vh" }}>
        <h2 style={{ fontSize:24, marginBottom:12 }}>No results yet</h2>
        <p style={{ color:"var(--ink-soft)", marginBottom:20 }}>Run the calculator to see your daily targets.</p>
        <Button variant="secondary" onClick={()=>navigate("calculator")}>Go to calculator</Button>
      </Section>
    );
  }
  const goalLabel = { lose:"Lose Weight", maintain:"Maintain Weight", gain:"Gain Weight / Build Muscle" }[profile.goal];
  const activityLabel = ACTIVITY_LEVELS.find(a=>a.id===profile.activity)?.label;
  const macroTotal = profile.macros.protein*4 + profile.macros.carbs*4 + profile.macros.fat*9;

  return (
    <Section style={{ paddingTop:36 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <h1 style={{ fontSize:"clamp(28px,4vw,38px)", marginBottom:6 }}>Your KeralaFit plan</h1>
        <p style={{ color:"var(--ink-soft)", marginBottom:28 }}>Here's your starting nutrition target.</p>

        {profile.lowCalorieWarning && (
          <div className="kf-card" style={{ padding:16, marginBottom:24, borderLeft:"4px solid var(--danger)", display:"flex", gap:12, background:"var(--danger-bg)" }}>
            <TriangleAlert size={20} color="var(--danger)" style={{ flexShrink:0 }} />
            <p style={{ fontSize:13.5, color:"var(--danger)", lineHeight:1.5 }}>
              Your calculated target is quite low. Please consider speaking with a healthcare professional before following a very low-calorie plan.
            </p>
          </div>
        )}

        <div className="kf-card" style={{ padding:"32px 28px", marginBottom:20, background:"var(--green-900)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            <div>
              <p style={{ fontSize:13, color:"#B7C9BC", fontWeight:600, marginBottom:6 }}>DAILY TARGET</p>
              <p className="kf-num" style={{ fontSize:"clamp(34px,6vw,50px)", color:"#fff" }}>{profile.targetCalories.toLocaleString()}<span style={{ fontSize:18, marginLeft:4 }}>kcal/day</span></p>
            </div>
            <div>
              <p style={{ fontSize:13, color:"#B7C9BC", fontWeight:600, marginBottom:6 }}>PROTEIN TARGET</p>
              <p className="kf-num" style={{ fontSize:"clamp(34px,6vw,50px)", color:"#F0DCC4" }}>{profile.proteinRange.recommended}<span style={{ fontSize:18, marginLeft:4 }}>g/day</span></p>
            </div>
          </div>
          <p style={{ color:"#C9DACD", fontSize:13, marginTop:16 }}>Goal: {goalLabel} · Activity: {activityLabel}</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:32 }}>
          <ResultCardStat label="BMR" value={profile.bmr} unit="kcal" />
          <ResultCardStat label="Maintenance (TDEE)" value={profile.tdee} unit="kcal" />
          <ResultCardStat label="Target" value={profile.targetCalories} unit="kcal" />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:20, marginBottom:32 }} className="kf-dash-grid">
          <div className="kf-card" style={{ padding:24, display:"flex", flexDirection:"column", alignItems:"center" }}>
            <p style={{ fontWeight:600, fontSize:15, marginBottom:16, alignSelf:"flex-start" }}>Daily calorie target</p>
            <ProgressRing value={profile.targetCalories} max={profile.tdee} label="kcal / day" sub={`of ${profile.tdee} maintenance`} />
          </div>
          <div className="kf-card" style={{ padding:24 }}>
            <p style={{ fontWeight:600, fontSize:15, marginBottom:6 }}>Protein target</p>
            <p style={{ fontSize:13, color:"var(--ink-soft)", marginBottom:14 }}>
              Your protein range: <strong>{profile.proteinRange.min}–{profile.proteinRange.max} g/day</strong>. Recommended: <strong>{profile.proteinRange.recommended} g/day</strong>.
            </p>
            <BarProgress value={profile.proteinRange.recommended} max={profile.proteinRange.max} color="var(--spice)" />
            <p style={{ fontSize:12, color:"var(--ink-faint)", marginTop:16 }}>This is an estimated target based on your body weight and goal — not a medical prescription.</p>

            <p style={{ fontWeight:600, fontSize:15, margin:"22px 0 12px" }}>Macro breakdown</p>
            {[
              ["Protein", profile.macros.protein, "g", profile.macros.protein*4, "var(--green-700)"],
              ["Carbohydrates", profile.macros.carbs, "g", profile.macros.carbs*4, "var(--spice)"],
              ["Fat", profile.macros.fat, "g", profile.macros.fat*9, "var(--ink-faint)"],
            ].map(([label,val,unit,cal,color]) => (
              <div key={label} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}>
                  <span style={{ color:"var(--ink-soft)" }}>{label}</span>
                  <span style={{ fontWeight:600 }}>{val}{unit} · {cal} kcal</span>
                </div>
                <BarProgress value={cal} max={macroTotal} color={color} />
              </div>
            ))}
            <p style={{ fontSize:11.5, color:"var(--ink-faint)", marginTop:10 }}>Macros are estimates and will vary meal to meal.</p>
          </div>
        </div>

        <div className="kf-card" style={{ padding:24, marginBottom:32, display:"flex", flexWrap:"wrap", gap:24, justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ fontWeight:600, fontSize:15 }}>Your Kerala meal plan is ready</p>
            <p style={{ fontSize:13.5, color:"var(--ink-soft)", marginTop:4 }}>7 days of real meals, built from your numbers.</p>
          </div>
          <Button variant="secondary" onClick={()=>navigate("meal-plan")} iconRight>View meal plan</Button>
        </div>

        <ShareExportBar profile={profile} weekPlan={weekPlan} />
      </div>
      <style>{`
        @media(min-width:760px){ .kf-dash-grid{ grid-template-columns: 0.9fr 1.1fr !important; } }
      `}</style>
    </Section>
  );
}

function ShareExportBar({ profile, weekPlan }) {
  const [copied, setCopied] = useState(false);
  const goalLabel = { lose:"Weight Loss", maintain:"Maintenance", gain:"Weight Gain / Muscle" }[profile.goal];
  const summary = `My KeralaFit target:\n${profile.targetCalories.toLocaleString()} kcal/day\n${profile.proteinRange.recommended} g protein/day\nGoal: ${goalLabel}`;

  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title:"My KeralaFit Plan", text: summary }); return; } catch(e) {}
    }
    try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(()=>setCopied(false), 2200); } catch(e) {}
  }
  return (
    <div className="kf-noprint" style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
      <Button variant="outline" icon={Printer} onClick={()=>window.print()}>Download / print plan</Button>
      <Button variant="outline" icon={Share2} onClick={share}>{copied ? "Copied to clipboard" : "Share plan"}</Button>
    </div>
  );
}

/* ============================================================
   MEAL PLAN PAGE (7-day)
   ============================================================ */
const SLOT_ICONS = { breakfast:UtensilsCrossed, morningSnack:Apple, lunch:Salad, eveningSnack:Apple, dinner:UtensilsCrossed };

function MealCard({ slot, onSwap, langMode }) {
  const Icon = SLOT_ICONS[slot.key] || UtensilsCrossed;
  return (
    <div className="kf-card" style={{ padding:20, marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <IconCircle icon={Icon} size={36} />
          <p style={{ fontWeight:600, fontSize:15.5, color:"var(--green-900)" }}>{slot.label}</p>
        </div>
        <button onClick={onSwap} className="kf-btn-ghost kf-focus" style={{ display:"flex", alignItems:"center", gap:5, fontSize:13, fontWeight:600, borderRadius:999, border:"1px solid var(--line-strong)", padding:"7px 12px" }}>
          <RefreshCw size={13} /> Swap
        </button>
      </div>
      <ul style={{ listStyle:"none", padding:0, margin:0, display:"grid", gap:8 }}>
        {slot.items.map((it,i) => (
          <li key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:14, borderBottom: i<slot.items.length-1 ? "1px dashed var(--line)" : "none", paddingBottom:8 }}>
            <span style={{ color:"var(--ink)" }}>
              {it.food.name}{langMode==="ml" && it.food.local ? ` (${it.food.local})` : ""}
              <span style={{ color:"var(--ink-faint)" }}> · {it.qty === 1 ? it.food.serving : `${it.qty}× ${it.food.serving}`}</span>
            </span>
          </li>
        ))}
      </ul>
      <div style={{ display:"flex", gap:16, marginTop:12, paddingTop:12, borderTop:"1px solid var(--line)" }}>
        <span style={{ fontSize:13, fontWeight:600, color:"var(--spice-dark)" }}>{slot.calories} kcal</span>
        <span style={{ fontSize:13, fontWeight:600, color:"var(--green-700)" }}>{slot.protein} g protein</span>
      </div>
    </div>
  );
}

function SwapModal({ open, onClose, day, slotKey, profile, applySwap }) {
  if (!open || !day) return null;
  const alts = getSwapAlternatives(day, slotKey, profile.diet, profile.excluded, profile.targetCalories, 4);
  return (
    <Modal open={open} onClose={onClose} title="Swap this meal">
      <p style={{ fontSize:13.5, color:"var(--ink-soft)", marginBottom:16 }}>Similar calories and protein, different food.</p>
      <div style={{ display:"grid", gap:10 }}>
        {alts.length === 0 && <p style={{ fontSize:13.5, color:"var(--ink-faint)" }}>No alternatives match your preferences right now.</p>}
        {alts.map((alt,i) => (
          <button key={i} onClick={() => { applySwap(alt.idx); onClose(); }} className="kf-choice kf-focus" style={{ display:"block" }}>
            <p style={{ fontWeight:600, fontSize:14.5, color:"var(--green-900)", marginBottom:4 }}>
              {alt.items.map(it=>it.food.name).join(" + ")}
            </p>
            <p style={{ fontSize:12.5, color:"var(--ink-faint)" }}>{alt.totals.calories} kcal · {alt.totals.protein} g protein</p>
          </button>
        ))}
      </div>
    </Modal>
  );
}

function MealPlanPage({ profile, navigate, weekPlan, setWeekPlan, regenerateWeek }) {
  const [dayIdx, setDayIdx] = useState(0);
  const [swapState, setSwapState] = useState(null);
  const [langMode, setLangMode] = useState("en");

  if (!profile || !weekPlan) {
    return (
      <Section style={{ textAlign:"center", minHeight:"60vh" }}>
        <h2 style={{ fontSize:24, marginBottom:12 }}>No meal plan yet</h2>
        <p style={{ color:"var(--ink-soft)", marginBottom:20 }}>Run the calculator first to generate your personalized 7-day plan.</p>
        <Button variant="secondary" onClick={()=>navigate("calculator")}>Go to calculator</Button>
      </Section>
    );
  }

  const day = weekPlan[dayIdx];

  function regenerateDay() {
    const newDay = generateDayPlan(profile.targetCalories, profile.proteinRange.recommended, profile.diet, profile.excluded, dayIdx + Math.floor(Math.random()*7)+1);
    const copy = [...weekPlan]; copy[dayIdx] = { ...newDay, day: day.day };
    setWeekPlan(copy);
  }
  function applySwap(altIdx) {
    const slotDef = SLOT_DEFS.find(s=>s.key===swapState.slotKey);
    const pool = TEMPLATES[slotDef.type].filter(t => templateAllowed(t, profile.diet, profile.excluded));
    const list = pool.length ? pool : TEMPLATES[slotDef.type];
    const tpl = list[altIdx];
    const targetSlotCal = profile.targetCalories * slotDef.pct;
    const qtyMap = scaleTemplate(tpl, targetSlotCal);
    const items = computeItems(tpl, qtyMap);
    const totals = sumItems(items);
    const newSlot = { ...slotDef, tplIndex: altIdx, items, ...totals };
    const newSlots = day.slots.map(s => s.key===swapState.slotKey ? newSlot : s);
    const newDay = { ...day, slots:newSlots, totals: sumItems(newSlots.flatMap(s=>s.items)) };
    const copy = [...weekPlan]; copy[dayIdx] = newDay;
    setWeekPlan(copy);
  }

  return (
    <Section style={{ paddingTop:36 }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:20 }}>
          <div>
            <h1 style={{ fontSize:"clamp(26px,4vw,34px)" }}>Your Kerala meal plan</h1>
            <p style={{ color:"var(--ink-soft)", marginTop:6 }}>Enjoy your rice. Keep your protein consistent.</p>
          </div>
          <div className="kf-noprint">
            <SegToggle value={langMode} onChange={setLangMode} options={[{value:"en",label:"English"},{value:"ml",label:"English + Malayalam"}]} />
          </div>
        </div>

        <div className="kf-noprint kf-scrollbar-hide" style={{ display:"flex", gap:8, overflowX:"auto", marginBottom:20, paddingBottom:4 }}>
          {DAY_NAMES.map((d,i) => (
            <button key={d} onClick={()=>setDayIdx(i)} className="kf-focus" style={{
              padding:"10px 18px", borderRadius:999, whiteSpace:"nowrap", fontSize:14, fontWeight:600, border:"1.5px solid",
              borderColor: i===dayIdx ? "var(--green-800)" : "var(--line-strong)",
              background: i===dayIdx ? "var(--green-800)" : "#fff",
              color: i===dayIdx ? "#fff" : "var(--ink-soft)",
            }}>{d}</button>
          ))}
        </div>

        <div className="kf-card" style={{ padding:18, marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", gap:24 }}>
            <div><p style={{ fontSize:11.5, color:"var(--ink-faint)", fontWeight:600 }}>DAILY CALORIES</p><p className="kf-num" style={{ fontSize:22, color:"var(--spice-dark)" }}>{day.totals.calories}</p></div>
            <div><p style={{ fontSize:11.5, color:"var(--ink-faint)", fontWeight:600 }}>DAILY PROTEIN</p><p className="kf-num" style={{ fontSize:22, color:"var(--green-700)" }}>{day.totals.protein}g</p></div>
          </div>
          <button onClick={regenerateDay} className="kf-noprint kf-btn-outline kf-btn kf-focus" style={{ fontSize:13.5, padding:"9px 16px" }}>
            <RefreshCw size={14} /> Regenerate day
          </button>
        </div>

        {day.slots.map(slot => (
          <MealCard key={slot.key} slot={slot} langMode={langMode} onSwap={()=>setSwapState({ slotKey: slot.key })} />
        ))}

        <SwapModal open={!!swapState} onClose={()=>setSwapState(null)} day={day} slotKey={swapState?.slotKey} profile={profile} applySwap={applySwap} />

        <div className="kf-noprint" style={{ display:"flex", flexWrap:"wrap", gap:12, marginTop:28 }}>
          <Button variant="secondary" onClick={()=>navigate("shopping-list")} icon={ShoppingCart}>Get shopping list</Button>
          <Button variant="outline" icon={Printer} onClick={()=>window.print()}>Print week plan</Button>
          <Button variant="outline" icon={RefreshCw} onClick={regenerateWeek}>Regenerate full week</Button>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   SHOPPING LIST PAGE
   ============================================================ */
function ShoppingListPage({ profile, navigate, weekPlan, purchased, setPurchased }) {
  if (!profile || !weekPlan) {
    return (
      <Section style={{ textAlign:"center", minHeight:"60vh" }}>
        <h2 style={{ fontSize:24, marginBottom:12 }}>No shopping list yet</h2>
        <p style={{ color:"var(--ink-soft)", marginBottom:20 }}>Generate your meal plan first.</p>
        <Button variant="secondary" onClick={()=>navigate("calculator")}>Go to calculator</Button>
      </Section>
    );
  }
  const groups = useMemo(() => generateShoppingList(weekPlan), [weekPlan]);
  const order = ["Protein","Rice & Grains","Vegetables","Fruits","Dairy","Spices & Essentials"];

  function toggle(id) {
    const next = { ...purchased, [id]: !purchased[id] };
    setPurchased(next);
  }

  return (
    <Section style={{ paddingTop:36 }}>
      <div style={{ maxWidth:640, margin:"0 auto" }}>
        <h1 style={{ fontSize:"clamp(26px,4vw,34px)", marginBottom:6 }}>Your weekly shopping list</h1>
        <p style={{ color:"var(--ink-soft)", marginBottom:28 }}>Auto-built from your 7-day meal plan.</p>
        {order.filter(g=>groups[g]).map(group => (
          <div key={group} className="kf-card" style={{ padding:20, marginBottom:16 }}>
            <p style={{ fontWeight:600, fontSize:15.5, marginBottom:12, color:"var(--green-900)" }}>{group}</p>
            <div style={{ display:"grid", gap:2 }}>
              {groups[group].map(item => (
                <label key={item.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 4px", borderBottom:"1px solid var(--line)", cursor:"pointer" }}>
                  <input type="checkbox" checked={!!purchased[item.id]} onChange={()=>toggle(item.id)} style={{ width:18, height:18, accentColor:"var(--green-700)" }} />
                  <span style={{ flex:1, fontSize:14.5, textDecoration: purchased[item.id] ? "line-through" : "none", color: purchased[item.id] ? "var(--ink-faint)" : "var(--ink)" }}>{item.name}</span>
                  <span style={{ fontSize:13.5, fontWeight:600, color:"var(--ink-soft)" }}>{item.display}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="kf-noprint" style={{ display:"flex", gap:12, marginTop:20 }}>
          <Button variant="outline" icon={Printer} onClick={()=>window.print()}>Print shopping list</Button>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   FOODS PAGE (database + easy meals + swaps)
   ============================================================ */
const CATEGORIES = ["All","Breakfast","Rice","Fish","Chicken","Eggs","Vegetarian","Dairy","Snacks","Fruits","Vegetables","Drinks"];

function FoodDbCard({ food, langMode }) {
  return (
    <div className="kf-card" style={{ padding:18 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <p style={{ fontWeight:600, fontSize:15, color:"var(--green-900)" }}>{food.name}</p>
          {langMode==="ml" && food.local && <p style={{ fontSize:12.5, color:"var(--ink-faint)" }}>{food.local}</p>}
        </div>
        <span className="kf-badge kf-badge-green" style={{ fontSize:11 }}>{food.category}</span>
      </div>
      <p style={{ fontSize:12.5, color:"var(--ink-faint)", marginTop:8 }}>{food.serving}</p>
      <div style={{ display:"flex", gap:18, marginTop:10 }}>
        <div><p className="kf-num" style={{ fontSize:16, color:"var(--spice-dark)" }}>{food.calories}</p><p style={{ fontSize:10.5, color:"var(--ink-faint)" }}>kcal</p></div>
        <div><p className="kf-num" style={{ fontSize:16, color:"var(--green-700)" }}>{food.protein}g</p><p style={{ fontSize:10.5, color:"var(--ink-faint)" }}>protein</p></div>
        <div><p className="kf-num" style={{ fontSize:16, color:"var(--ink-soft)" }}>{food.carbs}g</p><p style={{ fontSize:10.5, color:"var(--ink-faint)" }}>carbs</p></div>
        <div><p className="kf-num" style={{ fontSize:16, color:"var(--ink-soft)" }}>{food.fat}g</p><p style={{ fontSize:10.5, color:"var(--ink-faint)" }}>fat</p></div>
      </div>
      <div style={{ display:"flex", gap:6, marginTop:10 }}>
        {food.vegan && <span className="kf-badge" style={{ background:"#EAF3DE", color:"#3B6D11" }}>Vegan</span>}
        {!food.vegan && food.veg && <span className="kf-badge" style={{ background:"#EAF3DE", color:"#3B6D11" }}>Vegetarian</span>}
        {!food.veg && <span className="kf-badge" style={{ background:"var(--spice-50)", color:"var(--spice-dark)" }}>Non-veg</span>}
      </div>
    </div>
  );
}

const EASY_MEALS = [
  { name:"Egg + chapati", time:15, protein:"high", budget:true, veg:false, tags:["under15"] },
  { name:"Dosa + egg bhurji", time:15, protein:"high", budget:true, veg:false, tags:["under15"] },
  { name:"Puttu + kadala", time:20, protein:"medium", budget:true, veg:true, tags:["under30"] },
  { name:"Idli + sambar + eggs", time:20, protein:"high", budget:true, veg:false, tags:["under30"] },
  { name:"Matta rice + fish curry + vegetables", time:30, protein:"high", budget:true, veg:false, tags:["under30"] },
  { name:"Curd rice + eggs", time:10, protein:"medium", budget:true, veg:false, tags:["under15"] },
  { name:"Chicken + chapati", time:25, protein:"high", budget:true, veg:false, tags:["under30"] },
  { name:"Green gram salad + eggs", time:15, protein:"high", budget:true, veg:false, tags:["under15"] },
  { name:"Oats + banana + milk", time:10, protein:"medium", budget:true, veg:true, tags:["under15"] },
  { name:"Tuna + rice + vegetables", time:20, protein:"high", budget:false, veg:false, tags:["under30"] },
];
const EASY_FILTERS = [
  { id:"under15", label:"Under 15 minutes" }, { id:"under30", label:"Under 30 minutes" },
  { id:"protein", label:"High protein" }, { id:"budget", label:"Budget-friendly" },
  { id:"veg", label:"Vegetarian" }, { id:"nonveg", label:"Non-vegetarian" },
];
const SWAPS = [
  { from:"Parotta", to:"Chapati", why:"Chapati has far less oil and fewer calories while still pairing well with curry." },
  { from:"Large rice portion", to:"Controlled rice portion", why:"Same meal, smaller serving — pair with extra protein and vegetables to stay full." },
  { from:"Deep-fried fish", to:"Grilled or pan-cooked fish", why:"Keeps the protein, cuts a large share of added oil calories." },
  { from:"Sugary tea", to:"Less-sugar tea", why:"Small daily calories add up — this is an easy, low-effort swap." },
  { from:"Fried chicken", to:"Grilled or air-fried chicken", why:"Similar protein, meaningfully fewer calories from oil." },
  { from:"Large snack", to:"Fruit + protein source", why:"More filling for fewer calories, and supports your protein target." },
];

function FoodsPage() {
  const [tab, setTab] = useState("database");
  const [cat, setCat] = useState("All");
  const [langMode, setLangMode] = useState("en");
  const [easyFilters, setEasyFilters] = useState([]);

  const filteredFoods = FOODS.filter(f => cat === "All" || f.category === cat);
  const toggleFilter = (id) => setEasyFilters(f => f.includes(id) ? f.filter(x=>x!==id) : [...f, id]);
  const filteredMeals = EASY_MEALS.filter(m => {
    if (easyFilters.includes("under15") && m.time > 15) return false;
    if (easyFilters.includes("under30") && m.time > 30) return false;
    if (easyFilters.includes("protein") && m.protein !== "high") return false;
    if (easyFilters.includes("budget") && !m.budget) return false;
    if (easyFilters.includes("veg") && !m.veg) return false;
    if (easyFilters.includes("nonveg") && m.veg) return false;
    return true;
  });

  return (
    <Section style={{ paddingTop:36 }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <h1 style={{ fontSize:"clamp(26px,4vw,36px)", marginBottom:6 }}>Kerala foods</h1>
        <p style={{ color:"var(--ink-soft)", marginBottom:24 }}>A full food database, easy everyday meals, and smart swaps.</p>

        <div style={{ display:"flex", gap:8, marginBottom:28, borderBottom:"1px solid var(--line)" }}>
          {[["database","Food database"],["easy","Easy meals"],["swaps","Smart swaps"]].map(([id,label]) => (
            <button key={id} onClick={()=>setTab(id)} className="kf-focus" style={{
              background:"none", border:"none", padding:"12px 6px", fontSize:15, fontWeight:600,
              color: tab===id ? "var(--green-900)" : "var(--ink-faint)",
              borderBottom: tab===id ? "2.5px solid var(--spice)" : "2.5px solid transparent", marginRight:16,
            }}>{label}</button>
          ))}
        </div>

        {tab === "database" && (
          <div className="kf-fade-in">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12, marginBottom:16 }}>
              <div className="kf-scrollbar-hide" style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
                {CATEGORIES.map(c => (
                  <button key={c} onClick={()=>setCat(c)} className="kf-focus" style={{
                    padding:"8px 15px", borderRadius:999, whiteSpace:"nowrap", fontSize:13.5, fontWeight:600, border:"1.5px solid",
                    borderColor: cat===c ? "var(--green-800)" : "var(--line-strong)",
                    background: cat===c ? "var(--green-800)" : "#fff", color: cat===c ? "#fff" : "var(--ink-soft)",
                  }}>{c}</button>
                ))}
              </div>
              <SegToggle value={langMode} onChange={setLangMode} options={[{value:"en",label:"English"},{value:"ml",label:"+ Malayalam"}]} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:14 }}>
              {filteredFoods.map(f => <FoodDbCard key={f.id} food={f} langMode={langMode} />)}
            </div>
          </div>
        )}

        {tab === "easy" && (
          <div className="kf-fade-in">
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
              {EASY_FILTERS.map(f => {
                const active = easyFilters.includes(f.id);
                return (
                  <button key={f.id} onClick={()=>toggleFilter(f.id)} className="kf-focus" style={{
                    padding:"9px 15px", borderRadius:999, fontSize:13.5, fontWeight:600, border:`1.5px solid ${active?"var(--green-800)":"var(--line-strong)"}`,
                    background: active ? "var(--green-800)" : "#fff", color: active ? "#fff" : "var(--ink-soft)",
                  }}>{f.label}</button>
                );
              })}
            </div>
            {filteredMeals.length === 0 ? (
              <EmptyState title="No meals match your preferences." subtitle="Try removing one filter." />
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14 }}>
                {filteredMeals.map((m,i) => (
                  <div key={i} className="kf-card" style={{ padding:18 }}>
                    <p style={{ fontWeight:600, fontSize:15, color:"var(--green-900)", marginBottom:10 }}>{m.name}</p>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      <span className="kf-badge kf-badge-green"><Clock size={11}/>{m.time} min</span>
                      {m.protein==="high" && <span className="kf-badge kf-badge-spice"><Dumbbell size={11}/>High protein</span>}
                      {m.budget && <span className="kf-badge" style={{ background:"var(--cream-2)", color:"var(--ink-soft)" }}><IndianRupee size={11}/>Budget</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "swaps" && (
          <div className="kf-fade-in">
            <h2 style={{ fontSize:20, marginBottom:4 }}>Make your meal fit your goal</h2>
            <p style={{ color:"var(--ink-soft)", marginBottom:22, fontSize:14.5 }}>Small, realistic changes — not restriction.</p>
            <div style={{ display:"grid", gap:14 }}>
              {SWAPS.map((s,i) => (
                <div key={i} className="kf-card" style={{ padding:20, display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:14, alignItems:"center" }} >
                  <div>
                    <p style={{ fontSize:11.5, color:"var(--ink-faint)", fontWeight:600, marginBottom:4 }}>ORIGINAL</p>
                    <p style={{ fontWeight:600, fontSize:15 }}>{s.from}</p>
                  </div>
                  <ArrowRight size={20} color="var(--spice)" />
                  <div>
                    <p style={{ fontSize:11.5, color:"var(--green-700)", fontWeight:600, marginBottom:4 }}>BETTER OPTION</p>
                    <p style={{ fontWeight:600, fontSize:15, color:"var(--green-800)" }}>{s.to}</p>
                  </div>
                  <p style={{ gridColumn:"1 / -1", fontSize:13.5, color:"var(--ink-soft)", borderTop:"1px solid var(--line)", paddingTop:12, lineHeight:1.5 }}>{s.why}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

function EmptyState({ title, subtitle, icon:Icon=Salad, action }) {
  return (
    <div style={{ textAlign:"center", padding:"48px 20px" }}>
      <IconCircle icon={Icon} size={54} />
      <p style={{ fontWeight:600, fontSize:16, marginTop:16, color:"var(--green-900)" }}>{title}</p>
      {subtitle && <p style={{ fontSize:14, color:"var(--ink-soft)", marginTop:6 }}>{subtitle}</p>}
      {action}
    </div>
  );
}

/* ============================================================
   PROGRESS PAGE
   ============================================================ */
function ProgressPage({ profile, entries, setEntries }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ weight:"", date: new Date().toISOString().slice(0,10) });
  const [startWeight, setStartWeight] = useState(profile?.weightKg?.toString() || "");
  const [targetWeight, setTargetWeight] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  function addEntry() {
    const w = parseFloat(form.weight);
    if (!w || w < 30 || w > 300) return;
    const next = [...entries, { weight:w, date:form.date }].sort((a,b)=>a.date.localeCompare(b.date));
    setEntries(next);
    setModalOpen(false);
    setForm({ weight:"", date:new Date().toISOString().slice(0,10) });
  }
  function clearAll() { setEntries([]); setConfirmReset(false); }

  const current = entries.length ? entries[entries.length-1].weight : null;
  const start = entries.length ? entries[0].weight : (parseFloat(startWeight) || null);
  const change = current != null && start != null ? Math.round((current - start)*10)/10 : null;
  const target = parseFloat(targetWeight) || null;
  let progressPct = null;
  if (start != null && target != null && current != null && start !== target) {
    progressPct = Math.max(0, Math.min(100, Math.round(((start-current)/(start-target))*100)));
  }

  const chartData = entries.map(e => ({ date: e.date.slice(5), weight: e.weight }));

  return (
    <Section style={{ paddingTop:36 }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>
        <h1 style={{ fontSize:"clamp(26px,4vw,34px)", marginBottom:6 }}>Progress</h1>
        <p style={{ color:"var(--ink-soft)", marginBottom:28 }}>Small changes. Better consistency.</p>

        <div className="kf-card" style={{ padding:22, marginBottom:20 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16, marginBottom:18 }}>
            <Field label="Starting weight (kg)"><input className="kf-input" type="number" value={startWeight} onChange={e=>setStartWeight(e.target.value)} placeholder="e.g. 82" /></Field>
            <Field label="Target weight (kg)"><input className="kf-input" type="number" value={targetWeight} onChange={e=>setTargetWeight(e.target.value)} placeholder="e.g. 72" /></Field>
          </div>
          <Button variant="secondary" icon={Plus} onClick={()=>setModalOpen(true)}>Log today's weight</Button>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14, marginBottom:24 }}>
          <ResultCardStat label="Current weight" value={current ?? 0} unit="kg" />
          <ResultCardStat label="Change" value={change ?? 0} unit="kg" />
          {progressPct != null && <ResultCardStat label="Progress to goal" value={progressPct} unit="%" />}
        </div>

        {entries.length === 0 ? (
          <EmptyState title="No progress entries yet." subtitle="Add your first weight entry to start tracking."
            action={<div style={{ marginTop:18 }}><Button variant="secondary" icon={Plus} onClick={()=>setModalOpen(true)}>Add entry</Button></div>} />
        ) : (
          <div className="kf-card" style={{ padding:20, marginBottom:24, height:280 }}>
            <p style={{ fontWeight:600, fontSize:15, marginBottom:14 }}>Weight over time</p>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={chartData} margin={{ top:5, right:10, left:-20, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                <XAxis dataKey="date" tick={{ fontSize:11, fill:"var(--ink-faint)" }} />
                <YAxis tick={{ fontSize:11, fill:"var(--ink-faint)" }} domain={["dataMin - 2","dataMax + 2"]} />
                <Tooltip contentStyle={{ borderRadius:10, border:"1px solid var(--line)", fontSize:12.5 }} />
                <Line type="monotone" dataKey="weight" stroke="var(--spice)" strokeWidth={2.5} dot={{ r:4, fill:"var(--spice)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {entries.length > 0 && (
          <div className="kf-card" style={{ padding:20, marginBottom:24 }}>
            <p style={{ fontWeight:600, fontSize:15, marginBottom:12 }}>Entries</p>
            <div style={{ display:"grid", gap:2 }}>
              {[...entries].reverse().map((e,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"9px 2px", borderBottom:"1px solid var(--line)", fontSize:14 }}>
                  <span style={{ color:"var(--ink-soft)" }}>{e.date}</span>
                  <span style={{ fontWeight:600 }}>{e.weight} kg</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {entries.length > 0 && (
          confirmReset ? (
            <div className="kf-card" style={{ padding:18, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
              <p style={{ fontSize:14, fontWeight:600 }}>Clear all progress entries? This can't be undone.</p>
              <div style={{ display:"flex", gap:10 }}>
                <Button variant="outline" onClick={()=>setConfirmReset(false)}>Cancel</Button>
                <Button variant="danger" onClick={clearAll}>Clear</Button>
              </div>
            </div>
          ) : (
            <button onClick={()=>setConfirmReset(true)} className="kf-btn-danger kf-btn kf-focus"><Trash2 size={14}/> Clear all entries</button>
          )
        )}

        <Modal open={modalOpen} onClose={()=>setModalOpen(false)} title="Log today's weight">
          <Field label="Weight (kg)"><input className="kf-input" type="number" value={form.weight} onChange={e=>setForm(f=>({...f,weight:e.target.value}))} placeholder="e.g. 79.5" autoFocus /></Field>
          <Field label="Date"><input className="kf-input" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} /></Field>
          <Button variant="secondary" style={{ width:"100%" }} onClick={addEntry}>Save entry</Button>
        </Modal>
      </div>
    </Section>
  );
}

/* ============================================================
   ABOUT / DISCLAIMER / PRIVACY
   ============================================================ */
function StaticPage({ title, children }) {
  return (
    <Section style={{ paddingTop:36, minHeight:"60vh" }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <h1 style={{ fontSize:"clamp(26px,4vw,36px)", marginBottom:20 }}>{title}</h1>
        <div style={{ fontSize:15.5, color:"var(--ink-soft)", lineHeight:1.75, display:"grid", gap:16 }}>{children}</div>
      </div>
    </Section>
  );
}

function AboutPage() {
  return (
    <StaticPage title="About KeralaFit">
      <p>KeralaFit was created to make nutrition planning practical for people who enjoy Kerala and Indian food. Most calorie calculators assume a Western pantry — chicken breast, oats, broccoli. KeralaFit works with the food people in Kerala and the wider Indian diaspora actually cook and eat.</p>
      <p>The calculator uses the Mifflin-St Jeor equation, a well-established method for estimating basal metabolic rate, combined with standard activity multipliers and protein guidance used widely in nutrition science. The results are estimates, built to give you a sensible, practical starting point — not a diagnosis or a guarantee.</p>
      <p>Our core belief: you don't need to stop eating Kerala food to reach your goals. You need to understand portions, protein, calories and balance — and build habits you can actually keep.</p>
      <p>KeralaFit runs entirely in your browser. Your details are stored on your device so the app works without an account.</p>
    </StaticPage>
  );
}

function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer">
      <p>This calculator provides general estimates for healthy adults and is not medical advice. Individual calorie and protein needs vary based on many factors this tool cannot measure.</p>
      <p>If you are pregnant, breastfeeding, under 18, have a medical condition, have an eating disorder, or have specific dietary requirements, please consult a qualified healthcare professional before making significant dietary changes.</p>
      <p>KeralaFit does not diagnose any condition, does not recommend dangerous calorie restriction, does not guarantee weight loss or muscle gain, and does not claim that any specific food "burns fat". Nutrition values for foods are typical estimates and will vary by recipe, portion and preparation.</p>
      <p>Use this tool as a practical starting point, and adjust based on how your body responds over time.</p>
    </StaticPage>
  );
}

function PrivacyPage() {
  return (
    <StaticPage title="Privacy">
      <p>KeralaFit does not require an account. The details you enter — your age, height, weight, goals and meal preferences — are stored so your plan and progress are there next time you open the app.</p>
      <p>We don't sell your personal data, and we don't share it with advertisers. KeralaFit currently shows no third-party advertisements.</p>
      <p>You're always in control: you can reset your calculator inputs, clear your progress entries, or stop using the app at any time from within the product.</p>
    </StaticPage>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
const PAGE_TITLES = {
  home:"KeralaFit — Calorie & Protein Calculator for Kerala Food",
  calculator:"Calculator — KeralaFit",
  results:"Your Plan — KeralaFit",
  "meal-plan":"7-Day Meal Plan — KeralaFit",
  "shopping-list":"Shopping List — KeralaFit",
  foods:"Kerala Foods — KeralaFit",
  progress:"Progress — KeralaFit",
  about:"About — KeralaFit",
  disclaimer:"Disclaimer — KeralaFit",
  privacy:"Privacy — KeralaFit",
};

export default function App() {
  const [page, setPage] = useState(() => (typeof window !== "undefined" && window.location.hash.replace("#","")) || "home");
  const [profile, setProfile] = useState(null);
  const [weekPlan, setWeekPlanState] = useState(null);
  const [progressEntries, setProgressEntries] = useState([]);
  const [purchased, setPurchasedState] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const [p, w, pr, pu] = await Promise.all([
        kfLoad("kf_profile"), kfLoad("kf_weekplan"), kfLoad("kf_progress"), kfLoad("kf_purchased"),
      ]);
      if (p) setProfile(p);
      if (w) setWeekPlanState(w);
      if (pr) setProgressEntries(pr);
      if (pu) setPurchasedState(pu);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    const onHash = () => setPage(window.location.hash.replace("#","") || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((p) => {
    setPage(p);
    if (typeof window !== "undefined") window.location.hash = p;
    window.scrollTo({ top:0, behavior:"instant" in window ? "instant" : "auto" });
  }, []);

  function handleComplete(newProfile) {
    setProfile(newProfile);
    kfSave("kf_profile", newProfile);
    const wp = generateWeekPlan(newProfile.targetCalories, newProfile.proteinRange.recommended, newProfile.diet, newProfile.excluded);
    setWeekPlanState(wp);
    kfSave("kf_weekplan", wp);
    setPurchasedState({});
    kfSave("kf_purchased", {});
  }
  function setWeekPlan(wp) { setWeekPlanState(wp); kfSave("kf_weekplan", wp); }
  function setPurchased(p) { setPurchasedState(p); kfSave("kf_purchased", p); }
  function setEntries(e) { setProgressEntries(e); kfSave("kf_progress", e); }
  function regenerateWeek() {
    if (!profile) return;
    const wp = generateWeekPlan(profile.targetCalories, profile.proteinRange.recommended, profile.diet, profile.excluded);
    setWeekPlan(wp);
  }

  const [resetOpen, setResetOpen] = useState(false);
  function resetAll() {
    setProfile(null); setWeekPlanState(null); setPurchasedState({});
    kfDelete("kf_profile"); kfDelete("kf_weekplan"); kfDelete("kf_purchased");
    setResetOpen(false);
    navigate("home");
  }

  return (
    <div className="kf-root">
      <GlobalStyles />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <NavBar page={page} navigate={navigate} />
      <DisclaimerStrip />
      <main>
        {page === "home" && <Home navigate={navigate} />}
        {page === "calculator" && <CalculatorPage navigate={navigate} onComplete={handleComplete} />}
        {page === "results" && <ResultsPage profile={profile} navigate={navigate} weekPlan={weekPlan} regenerateWeek={regenerateWeek} />}
        {page === "meal-plan" && <MealPlanPage profile={profile} navigate={navigate} weekPlan={weekPlan} setWeekPlan={setWeekPlan} regenerateWeek={regenerateWeek} />}
        {page === "shopping-list" && <ShoppingListPage profile={profile} navigate={navigate} weekPlan={weekPlan} purchased={purchased} setPurchased={setPurchased} />}
        {page === "foods" && <FoodsPage />}
        {page === "progress" && <ProgressPage profile={profile} entries={progressEntries} setEntries={setEntries} />}
        {page === "about" && <AboutPage />}
        {page === "disclaimer" && <DisclaimerPage />}
        {page === "privacy" && <PrivacyPage />}
      </main>

      {profile && page !== "home" && (
        <div className="kf-noprint kf-container" style={{ paddingBottom:8 }}>
          <div style={{ maxWidth:900, margin:"0 auto", textAlign:"right" }}>
            <button onClick={()=>setResetOpen(true)} className="kf-focus" style={{ background:"none", border:"none", color:"var(--ink-faint)", fontSize:12.5, textDecoration:"underline" }}>Reset calculator</button>
          </div>
        </div>
      )}
      <Modal open={resetOpen} onClose={()=>setResetOpen(false)} title="Reset your plan?">
        <p style={{ fontSize:14.5, color:"var(--ink-soft)", marginBottom:20 }}>Are you sure you want to reset your plan? This clears your saved targets, meal plan and shopping list. Progress entries are kept.</p>
        <div style={{ display:"flex", gap:10 }}>
          <Button variant="outline" style={{ flex:1 }} onClick={()=>setResetOpen(false)}>Cancel</Button>
          <Button variant="danger" style={{ flex:1 }} onClick={resetAll}>Reset</Button>
        </div>
      </Modal>

      <Footer navigate={navigate} />
    </div>
  );
}
