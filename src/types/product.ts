// Allowed categories
export type Category = "shoes" | "cars" | "electronics" | "clothes";

// Hex color like #RRGGBB
export type HexColor = `#${string}`;

// Product shape
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;        // >= 0 (ن enforced بالتحقق قبل الحفظ)
  imageUrl: string;     // URL
  category: Category;
  colors?: HexColor[];  // optional
}
