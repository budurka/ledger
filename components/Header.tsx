
import { Moon, Sun, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { formatCurrency } from "@/utils/storage";

interface Props {
  balance: number;
  onExport: () => void;
}

export default function Header({ balance, onExport }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="backdrop-blur-md bg-white/40 dark:bg-black/30 shadow-md rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
    >
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Ledger Balance:{" "}
        <span className="font-mono text-primary">{formatCurrency(balance)}</span>
      </h1>

      <div className="flex gap-3 justify-end">
        <button
          onClick={onExport}
          className="px-4 py-2 rounded-xl font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition text-sm"
        >
          <Download className="inline-block mr-2 w-4 h-4" />
          Export CSV
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-800" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>
      </div>
    </header>
  );
}
