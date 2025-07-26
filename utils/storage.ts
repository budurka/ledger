
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: "debit" | "credit";
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
