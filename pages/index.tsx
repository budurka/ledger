
import Head from "next/head";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { useEffect, useState } from "react";
import { Transaction } from "@/utils/storage";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/data");
        const { transactions } = await res.json();
        setTransactions(transactions);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  const handleNewTransaction = async (tx: Transaction) => {
    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tx),
      });
      const { transactions } = await res.json();
      setTransactions(transactions);
    } catch (err) {
      console.error("Failed to save transaction:", err);
    }
  };

  const handleDeleteTransaction = (id: string) => {
    const newTx = transactions.filter((tx) => tx.id !== id);
    setTransactions(newTx);
    // This should eventually call a backend endpoint too
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
