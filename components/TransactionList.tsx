import React, { useState } from 'react';
import { Trash2, Filter, User, Users } from 'lucide-react';
import { Transaction, formatCurrency, formatDate } from '@/utils/storage';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onUpdateTransaction: (transaction: Transaction) => void;
}

type FilterType = 'all' | 'pending' | 'posted' | 'user' | 'partner' | 'debit' | 'credit';

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDeleteTransaction,
  onUpdateTransaction
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'description'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTransactions = transactions.filter(transaction => {
    switch (filter) {
      case 'pending':
        return transaction.status === 'pending';
      case 'posted':
        return transaction.status === 'posted';
      case 'user':
        return transaction.user === 'user';
      case 'partner':
        return transaction.user === 'partner';
      case 'debit':
        return transaction.type === 'debit';
      case 'credit':
        return transaction.type === 'credit';
      default:
        return true;
    }
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'description':
        comparison = a.description.localeCompare(b.description);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (newSortBy: 'date' | 'amount' | 'description') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const toggleStatus = (transaction: Transaction) => {
    const updatedTransaction = {
      ...transaction,
      status: transaction.status === 'pending' ? 'posted' as const : 'pending' as const
    };
    onUpdateTransaction(updatedTransaction);
  };

  if (transactions.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No transactions yet. Add your first transaction to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Transactions ({sortedTransactions.length})
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="glass-select text-sm text-gray-800 dark:text-white"
          >
            <option value="all">All Transactions</option>
            <option value="pending">Pending</option>
            <option value="posted">Posted</option>
            <option value="user">User</option>
            <option value="partner">Partner</option>
            <option value="debit">Debits</option>
            <option value="credit">Credits</option>
          </select>
          
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-');
              setSortBy(newSortBy as 'date' | 'amount' | 'description');
              setSortOrder(newSortOrder as 'asc' | 'desc');
            }}
            className="glass-select text-sm text-gray-800 dark:text-white"
          >
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="amount-desc">Amount (High to Low)</option>
            <option value="amount-asc">Amount (Low to High)</option>
            <option value="description-asc">Description (A-Z)</option>
            <option value="description-desc">Description (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="glass-card p-4 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-800 dark:text-white truncate">
                    {transaction.description}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    {transaction.user === 'user' ? <User size={12} /> : <Users size={12} />}
                    {transaction.user}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span>{formatDate(transaction.date)}</span>
                  <span className="px-2 py-1 rounded-full bg-gray-200/50 dark:bg-gray-700/50">
                    {transaction.category}
                  </span>
                  <button
                    onClick={() => toggleStatus(transaction)}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      transaction.status === 'posted'
                        ? 'bg-green-200/50 text-green-700 dark:bg-green-800/50 dark:text-green-300 hover:bg-green-200/70 dark:hover:bg-green-800/70'
                        : 'bg-yellow-200/50 text-yellow-700 dark:bg-yellow-800/50 dark:text-yellow-300 hover:bg-yellow-200/70 dark:hover:bg-yellow-800/70'
                    }`}
                  >
                    {transaction.status}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`text-lg font-semibold ${
                    transaction.type === 'credit'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.type}
                  </div>
                </div>
                
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="glass-button p-2 text-red-600 dark:text-red-400 hover:bg-red-500/20"
                  title="Delete transaction"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};