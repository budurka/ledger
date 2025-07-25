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
    const storedData = getStoredData();
    const calculatedBalance = calculateBalance(storedData.transactions);
    setData({
      ...storedData,
      balance: calculatedBalance
    });
    setLoading(false);
  }, []);

  const updateDataAndSave = (newData: Partial<CheckbookData>) => {
    const updatedData = { ...data, ...newData };
    const calculatedBalance = calculateBalance(updatedData.transactions);
    const finalData = { ...updatedData, balance: calculatedBalance };
    
    setData(finalData);
    saveData(finalData);
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