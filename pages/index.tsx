import Head from 'next/head';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { useEffect, useState } from 'react';
import { Transaction } from '@/utils/storage';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch('/api/data');
      const data = await res.json();
      setTransactions(data.transactions);
      setBalance(data.balance);
    };
    fetchTransactions();
  }, []);

  const handleNewTransaction = async (tx: Transaction) => {
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tx),
    });
    const data = await res.json();
    setTransactions(data.transactions);
    setBalance(data.balance);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleExport = () => {
    const csv = [
      ['Date', 'Amount', 'Description', 'Category', 'Type'],
      ...transactions.map(t =>
        [t.date, t.amount, t.description, t.category, t.type].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
  };

  return (
    <>
      <Head>
        <title>Checkbook Ledger</title>
      </Head>
      <ThemeProvider>
        <main className="min-h-screen p-4 max-w-2xl mx-auto">
          <Header balance={balance} onExport={handleExport} />
          <TransactionForm onAdd={handleNewTransaction} />
          <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
        </main>
      </ThemeProvider>
    </>
  );
}
