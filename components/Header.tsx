"use client";

import { Moon, Sun, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { formatCurrency } from "@/utils/storage";

interface HeaderProps {
  balance: number;
  onExport: () => void;
}

export default function Header({ balance, onExport }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glassmorphic flex items-center justify-between p-4 rounded-2xl shadow-lg mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white dark:text-white">
          Checkbook Ledger
        </h1>
        <p className="text-sm text-gray-200 dark:text-gray-300">
          Track your finances with style
        </p>
      </div>
      <div className="text-right space-y-2">
        <p className="text-sm text-gray-300 dark:text-gray-400">Current Balance</p>
        <p className="text-xl font-bold text-green-400">{formatCurrency(balance)}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onExport}
            className="glassmorphic px-3 py-1 rounded-lg text-white flex items-center gap-1"
            title="Export"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={toggleTheme}
            className="glassmorphic p-2 rounded-lg text-white"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
    );
}
