import type { Category, Product, SortKey } from "../types/product";

interface Options {
  query: string;
  category: Category | "All";
  sort: SortKey;
}

export function filterProducts(products: Product[], { query, category, sort }: Options) {
  const q = query.trim().toLowerCase();

  const result = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (q === "" || p.title.toLowerCase().includes(q)),
  );

  switch (sort) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    case "name":
      return result.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return result;
  }
}
