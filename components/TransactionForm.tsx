import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: "debit" | "credit";
}

interface Props {
  onAdd: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Omit<Transaction, "id">>({
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    description: "",
    category: "",
    type: "debit",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = { id: uuidv4(), ...form };
    onAdd(newTransaction);
    setForm({ ...form, amount: 0, description: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="glassmorphic p-4 rounded-2xl shadow-md mb-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm mb-1">Date</label>
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Amount</label>
          <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: parseFloat(e.target.value) })} className="input" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm mb-1">Description</label>
          <input type="text" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Category</label>
          <input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Type</label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as "debit" | "credit" })} className="input">
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>
      </div>
      <button type="submit" className="button-primary mt-4 w-full">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
