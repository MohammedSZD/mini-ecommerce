// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/Modal";
import Button from "./components/Button";
import FormInput from "./components/FormInput";
import { Toaster, toast } from "react-hot-toast";

// 📌 استيراد الصور المحلية
import nikeImg from "./assets/img/nike.jpg";
import carImg from "./assets/img/car.jpeg";
import laptopImg from "./assets/img/laptop.jpeg";
import iphoneImg from "./assets/img/iphone.jpeg";
import homeImg from "./assets/img/home.jpeg";
import samsongImg from "./assets/img/samsong.jpeg";


type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  colors: string[];
  category: string;
};

function App() {
  const initialProducts = useMemo<Product[]>(
    () => [
      {
        id: 1,
        title: "Nike Shoes",
        description: "A pair of stylish red shoes.",
        price: 100,
        imageUrl: nikeImg, // صورة محلية
        colors: ["red", "black"],
        category: "clothes",
      },
      {
        id: 2,
        title: "Car Model X",
        description: "A sleek sports car.",
        price: 50000,
        imageUrl: carImg, // صورة محلية
        colors: ["blue"],
        category: "cars",
      },
      {
        id: 3,
        title: "Laptop",
        description: "Perfect for study and work.",
        price: 1500,
        imageUrl: laptopImg, // صورة محلية
        colors: ["gray", "black"],
        category: "electronics",
      },
      {
        id: 4,
        title: "iPhone",
        description: "Latest Apple smartphone.",
        price: 1200,
        imageUrl: iphoneImg, // صورة محلية
        colors: ["white", "black"],
        category: "electronics",
      },
      {
        id: 5,
        title: "Home",
        description: "Home smart-home.",
        price: 120000,
        imageUrl: homeImg, // صورة محلية
        colors: ["white", "red"],
        category: "electronics",
      },
      {
        id: 6,
        title: "Samsong",
        description: "Latest Samsong smartphone.",
        price: 1150,
        imageUrl: samsongImg, // صورة محلية
        colors: ["blue", "black"],
        category: "electronics",
      },
    ],
    []
  );

  const [products, setProducts] = useState<Product[]>(initialProducts);

  // ✏️ Edit Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formCategory, setFormCategory] = useState("clothes");
  const [errors, setErrors] = useState<{ title?: string; price?: string }>({});

  useEffect(() => {
    if (!selectedProduct) return;
    setFormTitle(selectedProduct.title);
    setFormPrice(String(selectedProduct.price));
    setFormDescription(selectedProduct.description);
    setFormImageUrl(selectedProduct.imageUrl);
    setFormCategory(selectedProduct.category);
    setErrors({});
  }, [selectedProduct]);

  const validateProduct = (title: string, price: string) => {
    const newErrors: { title?: string; price?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    const priceNum = Number(price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      newErrors.price = "Price must be a number ≥ 0.";
    }
    return newErrors;
  };

  const handleSave = () => {
    if (!selectedProduct) return;
    const newErrors = validateProduct(formTitle, formPrice);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const priceNum = Number(formPrice);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              title: formTitle.trim(),
              price: priceNum,
              description: formDescription.trim(),
              imageUrl: formImageUrl.trim(),
              category: formCategory,
            }
          : p
      )
    );
    toast.success("Product updated!");
    closeEdit();
  };

  const openEdit = (p: Product) => {
    setSelectedProduct(p);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedProduct(null);
    setErrors({});
  };

  const handleRemove = (p: Product) => {
    setProducts((prev) => prev.filter((x) => x.id !== p.id));
    toast.success("Product removed!");
  };

  // ➕ Add Product Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCategory, setNewCategory] = useState("clothes");
  const [newErrors, setNewErrors] = useState<{ title?: string; price?: string }>(
    {}
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateProduct(newTitle, newPrice);
    setNewErrors(err);
    if (Object.keys(err).length > 0) return;

    const nextId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const product: Product = {
      id: nextId,
      title: newTitle.trim(),
      description: newDescription.trim(),
      price: Number(newPrice),
      imageUrl: newImageUrl || "https://via.placeholder.com/320x200",
      colors: ["gray"],
      category: newCategory,
    };

    setProducts((prev) => [product, ...prev]);
    toast.success("Product created!");
    setIsAddOpen(false);
    setNewTitle("");
    setNewPrice("");
    setNewDescription("");
    setNewImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold text-center p-5 text-blue-600">
        Mini E-commerce Home Page
      </h1>

      <div className="max-w-6xl mx-auto px-4 pb-10">
        <Button variant="primary" onClick={() => setIsAddOpen(true)}>
          Build a Product
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              title={p.title}
              description={p.description}
              price={p.price}
              imageUrl={p.imageUrl}
              colors={p.colors}
              category={p.category}
              onEdit={() => openEdit(p)}
              onRemove={() => handleRemove(p)}
            />
          ))}
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Build a Product"
        actions={
          <>
            <Button variant="secondary" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="add-form">
              Create
            </Button>
          </>
        }
      >
        <form id="add-form" onSubmit={handleAdd} className="space-y-4">
          <FormInput
            label="Title"
            name="new-title"
            value={newTitle}
            onChange={setNewTitle}
            placeholder="Product title"
            error={newErrors.title}
          />
          <FormInput
            label="Price"
            name="new-price"
            type="number"
            step="0.01"
            min={0}
            value={newPrice}
            onChange={setNewPrice}
            placeholder="0.00"
            error={newErrors.price}
          />
          <FormInput
            label="Image URL"
            name="new-image"
            value={newImageUrl}
            onChange={setNewImageUrl}
            placeholder="https://… or leave empty"
          />
          <div>
            <label className="mb-1 block text-sm text-gray-600">Description</label>
            <textarea
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Short product description"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="clothes">Clothes</option>
              <option value="cars">Cars</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={isEditOpen}
        onClose={closeEdit}
        title={selectedProduct ? `Edit: ${selectedProduct.title}` : "Edit Product"}
        actions={
          <>
            <Button variant="secondary" onClick={closeEdit}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="edit-form">
              Save
            </Button>
          </>
        }
      >
        <form
          id="edit-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          <FormInput
            label="Title"
            name="title"
            value={formTitle}
            onChange={setFormTitle}
            placeholder="Product title"
            error={errors.title}
          />
          <FormInput
            label="Price"
            name="price"
            type="number"
            step="0.01"
            min={0}
            value={formPrice}
            onChange={setFormPrice}
            placeholder="0.00"
            error={errors.price}
          />
          <FormInput
            label="Image URL"
            name="image"
            value={formImageUrl}
            onChange={setFormImageUrl}
            placeholder="https://..."
          />
          <div>
            <label className="mb-1 block text-sm text-gray-600">Description</label>
            <textarea
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Short product description"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">Category</label>
            <select
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="clothes">Clothes</option>
              <option value="cars">Cars</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;
