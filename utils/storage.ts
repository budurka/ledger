import type { Transaction } from "@/types";

export function getStoredTransactions(): Transaction[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("transactions");
  return stored ? JSON.parse(stored) : [];
}

export function storeTransactions(transactions: Transaction[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
