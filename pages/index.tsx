import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { 
  Transaction, 
  CheckbookData, 
  getStoredData, 
  saveData, 
  calculateBalance 
} from '@/utils/storage';
import { exportToCSV } from '@/utils/csvExport';

const HomePage: React.FC = () => {
  const [data, setData] = useState<CheckbookData>({
    transactions: [],
    balance: 0,
    categories: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Load existing data on mount.  We first attempt to fetch the
     * transaction data from the API route which proxies Google Drive or
     * other persistence layers.  If that request fails we fall back to
     * whatever is stored in local storage.  Regardless of the source
     * we compute the current balance when populating state.
     */
    const loadData = async () => {
      try {
        const res = await fetch('/api/data');
        if (res.ok) {
          const remote = await res.json();
          // remote may not include balance; compute it here
          const calculatedBalance = calculateBalance(remote.transactions || []);
          // If the remote payload doesn’t include categories (e.g. empty array)
          // fall back to categories from local storage so that the user still
          // has a starting set of category options.
          const localFallback = getStoredData();
          const remoteCategories = Array.isArray(remote.categories) && remote.categories.length
            ? remote.categories
            : localFallback.categories;
          setData({
            transactions: remote.transactions || [],
            categories: remoteCategories,
            balance: calculatedBalance
          });
          setLoading(false);
          return;
        }
      } catch (err) {
        // ignore error and fall back to local storage
        console.warn('Failed to load remote data, falling back to local storage', err);
      }
      const storedData = getStoredData();
      const calculatedBalance = calculateBalance(storedData.transactions);
      setData({
        ...storedData,
        balance: calculatedBalance
      });
      setLoading(false);
    };
    loadData();
  }, []);

  const updateDataAndSave = (newData: Partial<CheckbookData>) => {
    const updatedData = { ...data, ...newData };
    const calculatedBalance = calculateBalance(updatedData.transactions);
    const finalData = { ...updatedData, balance: calculatedBalance };
    
    setData(finalData);
    // persist locally for offline use
    saveData(finalData);
    // persist remotely via API.  This call is fire-and-forget; we don’t
    // await it here because failure shouldn’t block the UI.  The API
    // implementation can be swapped out for Google Drive integration.
    try {
      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactions: finalData.transactions,
          categories: finalData.categories
        })
      });
    } catch (err) {
      console.warn('Failed to persist data remotely', err);
    }
  };

  const handleAddTransaction = (transaction: Transaction) => {
    const newTransactions = [...data.transactions, transaction];
    updateDataAndSave({ transactions: newTransactions });
  };

  const handleDeleteTransaction = (id: string) => {
    const newTransactions = data.transactions.filter(t => t.id !== id);
    updateDataAndSave({ transactions: newTransactions });
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    const newTransactions = data.transactions.map(t => 
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    updateDataAndSave({ transactions: newTransactions });
  };

  const handleAddCategory = (category: string) => {
    if (!data.categories.includes(category)) {
      const newCategories = [...data.categories, category].sort();
      updateDataAndSave({ categories: newCategories });
    }
  };

  const handleExportCSV = () => {
    exportToCSV(data.transactions);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="glass-card p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 gradient-bg dark:gradient-bg-dark">
        <Head>
          <title>Checkbook Ledger - Track Your Finances</title>
          <meta name="description" content="A modern checkbook ledger application with Apple Liquid Glass design" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Header 
            balance={data.balance}
            onExportCSV={handleExportCSV}
          />
          
          <TransactionForm
            categories={data.categories}
            onAddTransaction={handleAddTransaction}
            onAddCategory={handleAddCategory}
          />
          
          <TransactionList
            transactions={data.transactions}
            onDeleteTransaction={handleDeleteTransaction}
            onUpdateTransaction={handleUpdateTransaction}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;