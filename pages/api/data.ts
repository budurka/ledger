import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { Transaction } from '@/utils/storage';

const SHEET_ID = process.env.SHEET_ID!;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');

const auth = new google.auth.JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function getTransactions(): Promise<Transaction[]> {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A2:F',
    });

    const rows = res.data.values || [];
    return rows.map((row) => ({
      id: row[0],
      date: row[1],
      amount: parseFloat(row[2]),
      description: row[3],
      category: row[4],
      type: row[5],
    }));
  } catch (error) {
    console.error("Error fetching transactions from Google Sheets:", error);
    return [];
  }
}

async function addTransaction(tx: Transaction) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[tx.id, tx.date, tx.amount, tx.description, tx.category, tx.type]],
      },
    });
  } catch (error) {
    console.error("Error adding transaction to Google Sheets:", error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const transactions = await getTransactions();
      const balance = transactions.reduce((sum, t) => {
        return t.type === 'credit' ? sum + t.amount : sum - t.amount;
      }, 0);
      res.status(200).json({ transactions, balance });
    } else if (req.method === 'POST') {
      const tx: Transaction = req.body;
      await addTransaction(tx);
      const transactions = await getTransactions();
      const balance = transactions.reduce((sum, t) => {
        return t.type === 'credit' ? sum + t.amount : sum - t.amount;
      }, 0);
      res.status(201).json({ transactions, balance });
    } else {
      res.status(405).end();
    }
  } catch (err) {
    console.error("API handler error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
