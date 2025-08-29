import React from "react";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  colors: string[];
  category: string;
  onEdit: () => void;
  onRemove: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  imageUrl,
  colors,
  category,
  onEdit,
  onRemove,
}) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
      <img className="w-full h-40 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <div className="flex gap-2 mt-2">
          {colors.map((color) => (
            <div
              key={color}
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Category: {category}</p>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <span className="text-blue-500 font-semibold">${price}</span>
        <div className="space-x-3">
          <button
            onClick={onEdit}
            className="text-sm text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={onRemove}
            className="text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
