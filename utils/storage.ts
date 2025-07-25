/**
 * Describes a single ledger transaction.
 *
 * The original implementation stored a `status` (pending/posted) and
 * tracked who entered the transaction (`user` or `partner`).  For a
 * joint account where everything is considered posted immediately,
 * those properties add unnecessary complexity.  The simplified
 * `Transaction` type now includes only the data required to
 * calculate balances and display records: an ID, date, description,
 * amount, category and whether it’s a debit (money out) or credit
 * (money in).
 */
export interface Transaction {
  id: string;
  /** ISO-8601 date string (YYYY-MM-DD) */
  date: string;
  /** Brief description of the transaction */
  description: string;
  /** Monetary amount of the transaction */
  amount: number;
  /** Category under which this transaction is filed */
  category: string;
  /**
   * Transaction type.  A debit represents money leaving the account and
   * will be subtracted from the balance.  A credit represents money
   * coming into the account and will be added to the balance.
   */
  type: 'debit' | 'credit';
}

export interface CheckbookData {
  transactions: Transaction[];
  balance: number;
  categories: string[];
}

const STORAGE_KEY = 'checkbook-ledger-data';

const defaultCategories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Income',
  'Transfer',
  'Other'
];

export const getStoredData = (): CheckbookData => {
  if (typeof window === 'undefined') {
    return {
      transactions: [],
      balance: 0,
      categories: defaultCategories
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        transactions: data.transactions || [],
        balance: data.balance || 0,
        categories: data.categories || defaultCategories
      };
    }
  } catch (error) {
    console.error('Error loading stored data:', error);
  }

  return {
    transactions: [],
    balance: 0,
    categories: defaultCategories
  };
};

export const saveData = (data: CheckbookData): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

/**
 * Calculate the running balance for a list of transactions.
 *
 * Transactions marked as debits decrease the balance while credits
 * increase it.  Since we’ve removed the pending/posted distinction,
 * every transaction affects the balance immediately.
 */
export const calculateBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((balance, transaction) => {
    return transaction.type === 'credit'
      ? balance + transaction.amount
      : balance - transaction.amount;
  }, 0);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};