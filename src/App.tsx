import { useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Button from "./components/Button";
import ConfirmDialog from "./components/ConfirmDialog";
import EmptyState from "./components/EmptyState";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Modal from "./components/Modal";
import ProductCard from "./components/ProductCard";
import ProductForm, { PRODUCT_FORM_ID } from "./components/ProductForm";
import Toolbar from "./components/Toolbar";
import { INITIAL_PRODUCTS } from "./data/products";
import { filterProducts } from "./lib/filterProducts";
import type { Category, Product, ProductInput, SortKey } from "./types/product";

function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [sort, setSort] = useState<SortKey>("featured");

  // The product is kept separately from `open` so dialog content doesn't change while it animates out.
  const [form, setForm] = useState<{ open: boolean; product: Product | null }>({ open: false, product: null });
  const [deleting, setDeleting] = useState<{ open: boolean; product: Product | null }>({ open: false, product: null });

  const visible = useMemo(() => filterProducts(products, { query, category, sort }), [products, query, category, sort]);
  const hasFilters = query.trim() !== "" || category !== "All";

  const closeForm = () => setForm((f) => ({ ...f, open: false }));
  const closeDelete = () => setDeleting((d) => ({ ...d, open: false }));

  const handleSubmit = (input: ProductInput) => {
    const editing = form.product;
    if (editing) {
      setProducts((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...input } : p)));
      toast.success("Product updated");
    } else {
      setProducts((prev) => [{ ...input, id: Math.max(0, ...prev.map((p) => p.id)) + 1 }, ...prev]);
      toast.success("Product added");
    }
    closeForm();
  };

  const handleConfirmDelete = () => {
    const target = deleting.product;
    if (target) {
      setProducts((prev) => prev.filter((p) => p.id !== target.id));
      toast.success("Product deleted");
    }
    closeDelete();
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <Toaster position="bottom-center" toastOptions={{ className: "!text-sm" }} />
      <Header onAdd={() => setForm({ open: true, product: null })} />

      <main className="flex-1">
        <Hero />

        <section id="catalog" aria-labelledby="catalog-heading" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-8 sm:px-6 sm:py-10">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="catalog-heading" className="text-xl font-semibold text-slate-900">
              Products
            </h2>
            <p role="status" className="text-sm text-slate-500">
              {visible.length} {visible.length === 1 ? "product" : "products"}
            </p>
          </div>

          <Toolbar query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} sort={sort} onSortChange={setSort} />

          <div className="mt-6">
            {visible.length > 0 ? (
              <ul className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((p) => (
                  <li key={p.id} className="flex">
                    <ProductCard
                      product={p}
                      onEdit={(product) => setForm({ open: true, product })}
                      onDelete={(product) => setDeleting({ open: true, product })}
                    />
                  </li>
                ))}
              </ul>
            ) : hasFilters ? (
              <EmptyState
                title="No products found"
                message="Nothing matches your search or filter. Try a different name or category."
                action={
                  <Button variant="secondary" onClick={clearFilters}>
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <EmptyState
                title="Your catalog is empty"
                message="Add your first product to get started."
                action={<Button onClick={() => setForm({ open: true, product: null })}>Add product</Button>}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />

      <Modal
        open={form.open}
        onClose={closeForm}
        title={form.product ? "Edit product" : "Add product"}
        description={form.product ? "Update the details below." : "Fill in the details of the new product."}
        footer={
          <>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button type="submit" form={PRODUCT_FORM_ID}>
              {form.product ? "Save changes" : "Add product"}
            </Button>
          </>
        }
      >
        <ProductForm product={form.product} onSubmit={handleSubmit} />
      </Modal>

      <ConfirmDialog
        open={deleting.open}
        title="Delete product?"
        message={`“${deleting.product?.title ?? ""}” will be removed from the catalog. This can't be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={closeDelete}
      />
    </div>
  );
}

export default App;
