export interface Transaction {
  id: string
  date: string
  amount: number
  description: string
  category: string
  type: 'debit' | 'credit'
}

const STORAGE_KEY = 'transactions'

export function getStoredTransactions(): Transaction[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function storeTransactions(transactions: Transaction[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
