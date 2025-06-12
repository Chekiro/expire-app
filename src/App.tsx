import React, { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

interface Product {
  name: string;
  amount: number;
  expiry: string;
  category?: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, isInitialized]);

  const handleAdd = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleDelete = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

 const handleEditCategoryName = (oldName: string, newName: string) => {
  setProducts((prev) =>
    prev.map((p) =>
      p.category === oldName ? { ...p, category: newName } : p
    )
  );
};

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Monitor Daty Ważności</h1>
      <ProductForm onAdd={handleAdd} />
      <ProductList
        products={products}
        onDelete={handleDelete}
        onEditCategoryName={handleEditCategoryName}
      />
    </div>
  );
};

export default App;
