import { Transaction, formatCurrency, formatDate } from './storage';

export const exportToCSV = (transactions: Transaction[]): void => {
  if (transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  // CSV headers
  const headers = [
    'Date',
    'Description',
    'Category',
    'Amount',
    'Type'
  ];

  // Convert transactions to CSV rows
  const csvRows = transactions.map(transaction => [
    formatDate(transaction.date),
    `"${transaction.description.replace(/"/g, '""')}"`, // Escape quotes
    transaction.category,
    transaction.amount.toFixed(2),
    transaction.type
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => row.join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `checkbook-ledger-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};