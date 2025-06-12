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
  const [amount, setAmount] = useState<number>(1);
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !expiry || amount < 1) return;

    onAdd({
      name,
      amount,
      expiry,
      category: category.trim() || "Inne",
    });

    setName("");
    setAmount(1);
    setExpiry("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow"
    >
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
        value={amount === 0 ? "" : amount}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "") {
            setAmount(0);
          } else {
            const num = Number(val);
            if (num >= 0) setAmount(num);
          }
        }}
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
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Dodaj
      </button>
    </form>
  );
};

export default ProductForm;
