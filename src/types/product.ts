export const CATEGORIES = [
  "Smartphones",
  "Laptops",
  "Audio",
  "Wearables",
  "Accessories",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  colors: ProductColor[];
}

/** Fields the user edits in the add/edit form (everything except the id). */
export type ProductInput = Omit<Product, "id">;

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";
