import React from 'react';
import { Moon, Sun, Download } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { formatCurrency } from '@/utils/storage';

interface HeaderProps {
  balance: number;
  onExportCSV: () => void;
}

export const Header: React.FC<HeaderProps> = ({ balance, onExportCSV }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass-card p-6 mb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-shadow">
            Checkbook Ledger
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Track your finances with style
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Balance</p>
            <p className={`text-2xl font-bold ${
              balance >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {formatCurrency(balance)}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onExportCSV}
              className="glass-button flex items-center gap-2 text-gray-700 dark:text-gray-300"
              title="Export to CSV"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="glass-button text-gray-700 dark:text-gray-300"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};