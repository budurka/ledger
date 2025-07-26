"use client";

import React from "react";
import { Moon, Sun, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { formatCurrency } from "@/utils/storage";

interface Props {
  balance: number;
  onExport: () => void;
}

const Header: React.FC<Props> = ({ balance, onExport }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="glassmorphic p-6 rounded-2xl shadow-lg mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-semibold text-white">Joint Checkbook</h1>
        <p className="text-white/80 mt-1">Current Balance:</p>
        <div className="text-3xl font-bold text-green-300 mt-1">{formatCurrency(balance)}</div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-white hover:text-yellow-300 transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <button
          onClick={onExport}
          className="text-white hover:text-blue-400 transition"
          aria-label="Export to CSV"
        >
          <Download size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;
