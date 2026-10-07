import { useState } from "react";
import type { FormEvent } from "react";
import FormField from "./FormField";
import ProductImage from "./ProductImage";
import { COLOR_OPTIONS } from "../data/colors";
import { CATEGORIES } from "../types/product";
import type { Category, Product, ProductInput } from "../types/product";
import { validateProduct } from "../lib/validateProduct";
import type { ProductFormErrors } from "../lib/validateProduct";

export const PRODUCT_FORM_ID = "product-form";

interface ProductFormProps {
  product: Product | null;
  onSubmit: (input: ProductInput) => void;
}

function ProductForm({ product, onSubmit }: ProductFormProps) {
  const [title, setTitle] = useState(product?.title ?? "");
  const [category, setCategory] = useState<Category>(product?.category ?? CATEGORIES[0]);
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [colorNames, setColorNames] = useState<string[]>(product?.colors.map((c) => c.name) ?? []);
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const toggleColor = (name: string) =>
    setColorNames((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateProduct({ title, description, price, imageUrl });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      imageUrl: imageUrl.trim(),
      category,
      colors: COLOR_OPTIONS.filter((c) => colorNames.includes(c.name)),
    });
  };

  return (
    <form id={PRODUCT_FORM_ID} onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormField label="Product name" error={errors.title}>
        {(p) => (
          <input {...p} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Orbit One 5G" maxLength={80} />
        )}
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Category">
          {(p) => (
            <select {...p} value={category} onChange={(e) => setCategory(e.target.value as Category)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </FormField>

        <FormField label="Price (USD)" error={errors.price}>
          {(p) => (
            <input {...p} type="number" inputMode="decimal" min={0} step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
          )}
        </FormField>
      </div>

      <FormField label="Description" error={errors.description} hint={`${description.trim().length}/160`}>
        {(p) => (
          <textarea {...p} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short summary of the product" />
        )}
      </FormField>

      <FormField label="Image URL (optional)" error={errors.imageUrl} hint="Leave empty to use a placeholder.">
        {(p) => (
          <input {...p} type="url" inputMode="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…" />
        )}
      </FormField>

      {imageUrl.trim() && !errors.imageUrl && (
        <ProductImage key={imageUrl} src={imageUrl.trim()} alt="Preview of the entered image" className="aspect-[4/3] w-full rounded-lg bg-slate-100" />
      )}

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-slate-700">Available colors</legend>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((c) => {
            const selected = colorNames.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleColor(c.name)}
                className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm transition ${
                  selected ? "border-indigo-600 bg-indigo-50 text-indigo-900" : "border-slate-300 text-slate-700 hover:border-slate-400"
                }`}
              >
                <span className="size-4 rounded-full ring-1 ring-inset ring-slate-900/20" style={{ backgroundColor: c.hex }} aria-hidden="true" />
                {c.name}
              </button>
            );
          })}
        </div>
      </fieldset>
    </form>
  );
}

export default ProductForm;
