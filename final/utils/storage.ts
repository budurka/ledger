export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  status: 'pending' | 'posted';
  user: 'user' | 'partner';
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

export const calculateBalance = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.status === 'posted')
    .reduce((balance, transaction) => {
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