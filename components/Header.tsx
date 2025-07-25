import React from 'react';
import { Moon, Sun, Download } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { formatCurrency } from '@/utils/storage';

interface HeaderProps {
  balance: number;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ balance, onExport }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass-card text-center mb-6 p-4">
      <h1 className="text-3xl font-bold mb-1">Checkbook Ledger</h1>
      <p className="mb-3">Track your finances with style ✨</p>
      <div className="flex justify-center items-center gap-4">
        <span className="text-lg">Current Balance</span>
        <span className={`text-xl font-semibold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {formatCurrency(balance)}
        </span>
        <button onClick={onExport} className="glass-button" aria-label="Export transactions">
          <Download size={20} />
        </button>
        <button onClick={toggleTheme} className="glass-button" aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};
