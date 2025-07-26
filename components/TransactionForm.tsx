import React, { useState } from 'react';
import { Transaction } from '@/utils/storage';

interface Props {
  onAdd: (transaction: Transaction) => void;
}

export const TransactionForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Transaction>({
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    description: '',
    category: 'General',
    type: 'debit',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      description: '',
      category: 'General',
      type: 'debit',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-4 mb-6">
      <h2 className="text-lg font-bold mb-2">Add New Transaction</h2>
      <div className="grid grid-cols-2 gap-2">
        <input name="date" type="date" value={form.date} onChange={handleChange} required className="glass-input" />
        <input name="amount" type="number" value={form.amount} onChange={handleChange} required className="glass-input" placeholder="Amount" />
        <input name="description" value={form.description} onChange={handleChange} required className="glass-input col-span-2" placeholder="Description" />
        <input name="category" value={form.category} onChange={handleChange} className="glass-input" placeholder="Category" />
        <select name="type" value={form.type} onChange={handleChange} className="glass-input">
          <option value="debit">Debit (-)</option>
          <option value="credit">Credit (+)</option>
        </select>
      </div>
      <button type="submit" className="glass-button mt-3 w-full">Add Transaction</button>
    </form>
  );
};
