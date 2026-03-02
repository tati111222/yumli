import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Plus, Check, ChevronDown } from "lucide-react";

// ── Image assets (served from Figma local asset server) ───────────────────────
const img1 = "http://localhost:3845/assets/09dbb76c8e5f9c6f456f7e3d2d79c761e8171f5e.png";
const img2 = "http://localhost:3845/assets/09e9dcc1e1ce386e07407965503da7ee8833d849.png";
const img3 = "http://localhost:3845/assets/677cf8df5dcb9b12ddb25b8235fb10cd0a8effc7.png";
const img4 = "http://localhost:3845/assets/7eafe77cab681009e34f2a6c268e5208c48a47a2.png";
const img5 = "http://localhost:3845/assets/3a630bc86571e7b07509b1af6982bb76e8560e22.png";
const img6 = "http://localhost:3845/assets/1d68b8b41ee5eb25c73323808cedae7121c9521a.png";
const img7 = "http://localhost:3845/assets/125e631d97b21886ee993a90f03919c7fd19fc5f.png";

// ── Types ─────────────────────────────────────────────────────────────────────
type Age = "4m+" | "6m+" | "9m+" | "12m+" | "18m+" | "2y+" | "3y+";

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  tags: string[];
  age: Age;
  image: string;
}

// ── Sample data ───────────────────────────────────────────────────────────────
const RECIPES: Recipe[] = [
  { id: 1,  title: "Avocado puree",         ingredients: "Avocado, olive oil",       tags: ["Breakfast", "Sesame"], age: "6m+",  image: img1 },
  { id: 2,  title: "Chickpea bowl",         ingredients: "Chickpeas, tahini",         tags: ["Lunch", "Protein"],    age: "9m+",  image: img2 },
  { id: 3,  title: "Corn & pea medley",     ingredients: "Corn, green peas",          tags: ["Dinner", "Veggies"],   age: "12m+", image: img3 },
  { id: 4,  title: "Hummus toast",          ingredients: "Hummus, whole wheat",       tags: ["Breakfast", "Sesame"], age: "6m+",  image: img4 },
  { id: 5,  title: "Chicken & plantain",    ingredients: "Chicken breast, plantain",  tags: ["Lunch", "Protein"],    age: "9m+",  image: img5 },
  { id: 6,  title: "Carrot & pea stew",     ingredients: "Carrots, green peas",       tags: ["Dinner", "Veggies"],   age: "9m+",  image: img6 },
  { id: 7,  title: "Yoghurt dip plate",     ingredients: "Greek yoghurt, herbs",      tags: ["Snack", "Dairy"],      age: "2y+",  image: img7 },
  { id: 8,  title: "Broccoli mash",         ingredients: "Broccoli, avocado",         tags: ["Breakfast", "Veggies"],age: "4m+",  image: img1 },
];

// ── Age badge ─────────────────────────────────────────────────────────────────
const AGE_STYLES: Record<Age, { bg: string; text: string }> = {
  "4m+":  { bg: "bg-[#e8b931]", text: "text-[#401b01]" },
  "6m+":  { bg: "bg-[#14ae5c]", text: "text-[#ebffee]" },
  "9m+":  { bg: "bg-[#ec221f]", text: "text-[#fee9e7]" },
  "12m+": { bg: "bg-[#8a8cff]", text: "text-white"      },
  "18m+": { bg: "bg-[#8a8cff]", text: "text-white"      },
  "2y+":  { bg: "bg-[#ce1277]", text: "text-[#fff3f9]"  },
  "3y+":  { bg: "bg-[#ce1277]", text: "text-[#fff3f9]"  },
};

function AgeBadge({ age }: { age: Age }) {
  const { bg, text } = AGE_STYLES[age];
  return (
    <span className={`${bg} ${text} text-sm px-2 py-1 rounded-lg leading-none`}>
      {age}
    </span>
  );
}

// ── Recipe detail modal ───────────────────────────────────────────────────────
function RecipeDetailModal({ recipe, onClose }: { recipe: Recipe | null; onClose: () => void }) {
  useEffect(() => {
    if (!recipe) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [recipe, onClose]);

  if (!recipe) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-xl w-[560px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[280px] object-cover rounded-t-xl"
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[#2c2c2c] text-[#f5f5f5] rounded-full text-sm leading-none hover:bg-[#1a1a1a] transition-colors"
        >
          ✕
        </button>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Title + age badge */}
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-[#1e1e1e] leading-[1.3] m-0">{recipe.title}</h2>
            <AgeBadge age={recipe.age} />
          </div>

          {/* Ingredients */}
          <p className="text-sm text-[#757575] leading-[1.5] m-0">{recipe.ingredients}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#d9d9d9] text-[#1e1e1e] text-sm px-2 py-1 rounded-lg leading-none"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Recipe card ───────────────────────────────────────────────────────────────
function RecipeCard({ recipe, onClick }: { recipe: Recipe; onClick: () => void }) {
  return (
    <div
      className="bg-white border border-[#d9d9d9] rounded-lg flex flex-col gap-4 p-4 min-w-0 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-[208px] rounded-md overflow-hidden flex items-start justify-end p-2 shrink-0">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <AgeBadge age={recipe.age} />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2">
        <p className="text-base font-semibold text-[#1e1e1e] leading-[1.4]">{recipe.title}</p>
        <p className="text-sm text-[#757575] leading-[1.4]">{recipe.ingredients}</p>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#d9d9d9] text-[#1e1e1e] text-sm px-2 py-1 rounded-lg leading-none"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Cards grid ────────────────────────────────────────────────────────────────
function CardsGrid({ recipes, onSelect }: { recipes: Recipe[]; onSelect: (r: Recipe) => void }) {
  return (
    <div className="flex-1 bg-[#fdfaf6] p-6 grid grid-cols-4 gap-4 items-start content-start">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onClick={() => onSelect(r)} />
      ))}
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex-1 bg-[#fdfaf6] flex flex-col items-center justify-center gap-4">
      <span className="text-[60px] leading-none">👶</span>
      <div className="flex flex-col items-center gap-4 max-w-[475px] text-center">
        <h2 className="text-2xl font-semibold text-[#1e1e1e] tracking-[-0.48px] leading-[1.2] m-0">
          No recipes yet
        </h2>
        <p className="text-base text-[#757575] m-0">
          No public recipes to show. Start by making your recipes public!
        </p>
      </div>
    </div>
  );
}

// ── NavBar ────────────────────────────────────────────────────────────────────
function NavBar() {
  return (
    <header className="bg-white border-b border-[#d9d9d9] flex items-center justify-between px-6 py-[17px] shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-[28px] leading-none">👶</span>
        <span className="text-[20px] font-semibold text-[#0a0a0a] tracking-[-0.45px]">Yumli</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-[#2c2c2c] text-[#f5f5f5] px-3 py-[10px] rounded-lg text-sm hover:bg-[#1a1a1a] transition-colors">
          <Plus size={16} strokeWidth={2} />
          Add recipe
        </button>
        <div className="w-10 h-10 rounded-full bg-[#2c2c2c] flex items-center justify-center text-[#f5f5f5] text-[18px] select-none">
          T
        </div>
      </div>
    </header>
  );
}

// ── Filter tabs ───────────────────────────────────────────────────────────────
type Tab = "All recipes" | "Feed" | "My recipes" | "Saved";
const TABS: Tab[] = ["All recipes", "Feed", "My recipes", "Saved"];

function FilterTabs({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="flex gap-2">
      {TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-colors ${
              isActive
                ? "bg-[#2c2c2c] text-[#f5f5f5]"
                : "bg-white border border-[#d9d9d9] text-[#1e1e1e] hover:bg-gray-50"
            }`}
          >
            {isActive && <Check size={14} strokeWidth={2.5} />}
            {tab}
          </button>
        );
      })}
    </div>
  );
}

// ── Search bar ────────────────────────────────────────────────────────────────
interface SearchBarProps {
  activeTab: Tab;
  onTabChange: (t: Tab) => void;
  query: string;
  onQueryChange: (q: string) => void;
  mealType: string;
  onMealTypeChange: (m: string) => void;
}

function SearchBar({ activeTab, onTabChange, query, onQueryChange, mealType, onMealTypeChange }: SearchBarProps) {
  return (
    <div className="bg-white border-b border-[#d9d9d9] px-6 py-4 flex flex-col gap-4 shrink-0">
      <FilterTabs active={activeTab} onChange={onTabChange} />
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575]" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search recipes"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full h-10 pl-9 pr-4 border border-[#d9d9d9] rounded-lg text-sm text-[#1e1e1e] placeholder:text-[#757575] outline-none focus:border-[#2c2c2c] transition-colors"
          />
        </div>
        <div className="relative">
          <select
            value={mealType}
            onChange={(e) => onMealTypeChange(e.target.value)}
            className="appearance-none h-10 pl-4 pr-9 border border-[#d9d9d9] rounded-lg text-sm text-[#1e1e1e] bg-white outline-none focus:border-[#2c2c2c] transition-colors cursor-pointer w-[170px]"
          >
            <option>All</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e1e1e] pointer-events-none" strokeWidth={2} />
        </div>
        <button className="h-10 w-10 flex items-center justify-center border border-[#d9d9d9] rounded-lg bg-white hover:bg-gray-50 transition-colors">
          <SlidersHorizontal size={16} className="text-[#1e1e1e]" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("All recipes");
  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filtered = RECIPES.filter((r) => {
    const matchesQuery =
      query === "" ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.ingredients.toLowerCase().includes(query.toLowerCase());
    const matchesMeal =
      mealType === "All" || r.tags.some((t) => t === mealType);
    return matchesQuery && matchesMeal;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <NavBar />
      <SearchBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        query={query}
        onQueryChange={setQuery}
        mealType={mealType}
        onMealTypeChange={setMealType}
      />
      {filtered.length > 0 ? (
        <CardsGrid recipes={filtered} onSelect={setSelectedRecipe} />
      ) : (
        <EmptyState />
      )}
      <RecipeDetailModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  );
}
