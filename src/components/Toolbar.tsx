import { CATEGORIES } from "../types/product";
import type { Category, SortKey } from "../types/product";

interface ToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: Category | "All";
  onCategoryChange: (value: Category | "All") => void;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name (A–Z)" },
];

const control =
  "min-h-11 w-full rounded-lg border border-slate-300 bg-white text-base text-slate-900 transition hover:border-slate-400 sm:text-sm";

function Toolbar({ query, onQueryChange, category, onCategoryChange, sort, onSortChange }: ToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="search" className="sr-only">
            Search products by name
          </label>
          <svg
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="9" r="5.5" />
            <path d="M13.5 13.5L17 17" />
          </svg>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search products"
            className={`${control} pl-10 pr-3 placeholder:text-slate-400`}
          />
        </div>

        <div className="sm:w-56">
          <label htmlFor="sort" className="sr-only">
            Sort products
          </label>
          <select id="sort" value={sort} onChange={(e) => onSortChange(e.target.value as SortKey)} className={`${control} px-3`}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => onCategoryChange(c)}
              className={`min-h-11 rounded-full border px-4 text-sm font-medium transition ${
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Toolbar;
