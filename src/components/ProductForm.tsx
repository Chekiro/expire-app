import React, { useState } from "react";

interface Product {
  name: string;
  amount: number;
  expiry: string;
  category?: string;
}

interface Props {
  onAdd: (product: Product) => void;
}

const ProductForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !expiry) return;

    onAdd({
      name,
      amount,
      expiry,
      category: category.trim() || "Inne"
    });

    setName("");
    setAmount(1);
    setExpiry("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-xl shadow">
      <input
        type="text"
        placeholder="Nazwa produktu"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Ilość"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 border rounded"
        required
        min={1}
      />
      <input
        type="date"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Kategoria (opcjonalnie)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
        Dodaj produkt
      </button>
    </form>
  );
};

export default ProductForm;
