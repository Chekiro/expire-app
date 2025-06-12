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
  const [productToDelete, setProductToDelete] = useState<{ index: number; product: Product } | null>(null);

  const toggleCategory = (category: string) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const confirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete.index);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
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
                      onClick={() => setProductToDelete({ index, product })}
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
      {productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-bold mb-4">Usuń przedmiot?</h2>
            <p className="mb-4">
              Czy na pewno chcesz usunąć <strong>{productToDelete.product.name}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Anuluj
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
