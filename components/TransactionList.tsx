import React from 'react';
import { Transaction, formatCurrency, formatDate } from '@/utils/storage';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="glass-card">
      <h2 className="text-lg font-bold mb-2">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{tx.description}</p>
                <p className="text-sm text-gray-400">
                  {formatDate(tx.date)} · {tx.category}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${tx.type === 'debit' ? 'text-red-500' : 'text-green-500'}`}>
                  {tx.type === 'debit' ? '-' : '+'}{formatCurrency(tx.amount)}
                </span>
                <button onClick={() => onDeleteTransaction(tx.id)} className="text-sm text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
