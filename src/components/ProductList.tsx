import React, { useState } from "react";
import { getStatusColor } from "../utils/dateUtils";

interface Product {
  name: string;
  amount: number;
  expiry: string;
  category?: string;
}

interface Props {
  products: Product[];
  onDelete: (index: number) => void;
}

const ProductList: React.FC<Props> = ({ products, onDelete }) => {
  const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
    const category = product.category || "Inne";
    acc[category] = acc[category] || [];
    acc[category].push(product);
    return acc;
  }, {});

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="mt-6 space-y-6">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <button
            onClick={() => toggleCategory(category)}
            className="text-left w-full font-bold text-lg mb-2 flex justify-between items-center"
          >
            <span>{category} ({items.length})</span>
            <span>{expanded[category] ? "▾" : "▸"}</span>
          </button>

          {expanded[category] && (
            <div className="space-y-2">
              {items.map((product) => {
                const index = products.indexOf(product);
                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded ${getStatusColor(
                      product.expiry
                    )}`}
                  >
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm">Ilość: {product.amount}</p>
                      <p className="text-sm">Ważne do: {product.expiry}</p>
                    </div>
                    <button
                      className="text-red-500 font-bold"
                      onClick={() => onDelete(index)}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
