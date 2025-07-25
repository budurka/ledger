import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Transaction, generateId } from '@/utils/storage';

interface TransactionFormProps {
  categories: string[];
  onAddTransaction: (transaction: Transaction) => void;
  onAddCategory: (category: string) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  categories,
  onAddTransaction,
  onAddCategory
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: categories[0] || '',
    /**
     * Note: in the simplified ledger all transactions are considered
     * immediately posted and there is no concept of per‑user ownership.
     */
    type: 'debit' as 'debit' | 'credit'
  });
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim() || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const transaction: Transaction = {
      id: generateId(),
      date: formData.date,
      description: formData.description.trim(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type
    };

    onAddTransaction(transaction);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: categories[0] || '',
      type: 'debit'
    });
    
    setIsOpen(false);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      onAddCategory(newCategory.trim());
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="glass-button flex items-center gap-2 text-gray-700 dark:text-gray-300 w-full sm:w-auto justify-center"
        >
          <Plus size={20} />
          Add Transaction
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 mb-8 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Add New Transaction
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="glass-input w-full text-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="glass-input w-full text-gray-800 dark:text-white"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description *
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="glass-input w-full text-gray-800 dark:text-white"
            placeholder="Enter transaction description"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <div className="flex gap-2">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="glass-select flex-1 text-gray-800 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowNewCategory(!showNewCategory)}
                className="glass-button px-3"
                title="Add new category"
              >
                <Plus size={16} />
              </button>
            </div>
            {showNewCategory && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="glass-input flex-1 text-gray-800 dark:text-white"
                  placeholder="New category name"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="glass-button px-3"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'debit' | 'credit' })}
              className="glass-select w-full text-gray-800 dark:text-white"
            >
              <option value="debit">Debit (-)</option>
              <option value="credit">Credit (+)</option>
            </select>
          </div>

        </div>

        {/*
          The user dropdown has been removed.  Transactions are no longer
          associated with a particular person since this is a joint account.
        */}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="glass-button bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 dark:text-blue-300 flex-1 sm:flex-none"
          >
            Add Transaction
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="glass-button text-gray-700 dark:text-gray-300 flex-1 sm:flex-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};