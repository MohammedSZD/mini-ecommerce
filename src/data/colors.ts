import type { ProductColor } from "../types/product";

/** Preset palette offered by the product form. */
export const COLOR_OPTIONS: ProductColor[] = [
  { name: "Black", hex: "#111827" },
  { name: "Graphite", hex: "#4b5563" },
  { name: "Silver", hex: "#d1d5db" },
  { name: "White", hex: "#f9fafb" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Green", hex: "#10b981" },
  { name: "Red", hex: "#ef4444" },
  { name: "Gold", hex: "#d4a95b" },
];

const byName = (name: string): ProductColor => {
  const color = COLOR_OPTIONS.find((c) => c.name === name);
  if (!color) throw new Error(`Unknown color: ${name}`);
  return color;
};

export const colors = (...names: string[]): ProductColor[] => names.map(byName);
