"use client";

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
  onAdd: (tx: Transaction) => void;
}

export const TransactionForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    description: "",
    category: "",
    type: "debit",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...form, id: uuidv4() });
    setForm({
      date: new Date().toISOString().split("T")[0],
      amount: 0,
      description: "",
      category: "",
      type: "debit",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glassmorphic p-6 rounded-2xl shadow-lg mb-6 space-y-4 text-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-white mb-1">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-white mb-1">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-white mb-1">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Coffee at Ristretto"
            className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-white mb-1">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Food, Rent"
            className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-white mb-1">Type</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
          >
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-white/10 border border-white/20 text-white py-2 rounded-xl hover:bg-white/20 transition"
      >
        Add Transaction
      </button>
    </form>
  );
};
