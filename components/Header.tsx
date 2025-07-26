import React from 'react';
import { Moon, Sun, Download } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { formatCurrency } from '@/utils/storage';

interface HeaderProps {
  balance: number;
  onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ balance, onExport }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="backdrop-blur-md bg-white/30 dark:bg-black/30 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkbook Ledger</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Track your finances with style</p>
      </div>
      <div className="mt-4 sm:mt-0 flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-300">Current Balance</p>
          <p className="text-xl font-bold text-green-500">{formatCurrency(balance)}</p>
        </div>
        <button
          className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-xl shadow flex items-center space-x-2"
          onClick={onExport}
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
        <button
          className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-xl shadow"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;