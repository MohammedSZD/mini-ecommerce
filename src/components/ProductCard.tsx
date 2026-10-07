import ProductImage from "./ProductImage";
import { formatPrice } from "../lib/format";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const iconButton =
  "flex size-11 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900";

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const { title, description, price, imageUrl, category, colors } = product;

  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="overflow-hidden bg-slate-100">
        <ProductImage
          src={imageUrl}
          alt={title}
          className="aspect-[4/3] w-full transition duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{category}</span>
        <h3 className="mt-2 break-words text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 line-clamp-2 break-words text-sm text-slate-600">{description || "No description."}</p>

        {colors.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className="sr-only">Available colors: {colors.map((c) => c.name).join(", ")}</span>
            {colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                aria-hidden="true"
                className="size-4 rounded-full ring-1 ring-inset ring-slate-900/20"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <p className="text-lg font-semibold tabular-nums text-slate-900">{formatPrice(price)}</p>
          <div className="-mr-2 flex">
            <button type="button" onClick={() => onEdit(product)} aria-label={`Edit ${title}`} title="Edit" className={iconButton}>
              <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13.5 3.5l3 3L7 16H4v-3z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onDelete(product)}
              aria-label={`Delete ${title}`}
              title="Delete"
              className={`${iconButton} hover:!bg-red-50 hover:!text-red-600`}
            >
              <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
