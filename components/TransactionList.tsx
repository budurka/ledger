"use client";

import React from "react";
import { Trash } from "lucide-react";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: "debit" | "credit";
}

interface Props {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<Props> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="glassmorphic p-6 rounded-2xl shadow-lg space-y-4 mb-12">
      <h2 className="text-white text-xl font-semibold mb-4">Transaction History</h2>
      <ul className="divide-y divide-white/20">
        {transactions.map((tx) => (
          <li key={tx.id} className="py-4 flex justify-between items-start gap-2">
            <div className="flex-1 text-white">
              <div className="font-medium">{tx.description}</div>
              <div className="text-sm text-white/80">{tx.category} • {tx.date}</div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`text-right font-semibold ${
                  tx.type === "credit" ? "text-green-400" : "text-red-400"
                }`}
              >
                {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
              </div>
              <button
                onClick={() => onDeleteTransaction(tx.id)}
                className="text-white/60 hover:text-red-400 transition"
                aria-label="Delete transaction"
              >
                <Trash size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
