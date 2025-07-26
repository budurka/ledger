import Head from "next/head";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { useEffect, useState } from "react";
import { Transaction, getStoredTransactions, storeTransactions } from "@/utils/storage";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(getStoredTransactions());
  }, []);

  const handleNewTransaction = (tx: Transaction) => {
    const newTx = [...transactions, tx];
    setTransactions(newTx);
    storeTransactions(newTx);
  };

  const handleDeleteTransaction = (id: string) => {
    const newTx = transactions.filter((tx) => tx.id !== id);
    setTransactions(newTx);
    storeTransactions(newTx);
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Date,Description,Amount,Category,Type"]
        .concat(transactions.map((t) => `${t.date},"${t.description}",${t.amount},${t.category},${t.type}`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const balance = transactions.reduce((acc, tx) => {
    return tx.type === "credit" ? acc + tx.amount : acc - tx.amount;
  }, 0);

  return (
    <>
      <Head>
        <title>Checkbook Ledger</title>
        <meta name="description" content="Track your finances with style" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <main className="min-h-screen p-4 max-w-4xl mx-auto text-gray-900 dark:text-white">
          <Header balance={balance} onExport={handleExport} />
          <TransactionForm onAdd={handleNewTransaction} />
          <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
        </main>
      </ThemeProvider>
    </>
  );
}
