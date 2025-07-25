import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Transaction } from '@/utils/storage';
import fs from 'fs';

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;
const CREDENTIALS_PATH = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const auth = await google.auth.getClient({
        credentials: JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8')),
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const result = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1',
      });

      const rows = result.data.values || [];

      const [header, ...data] = rows;
      const transactions: Transaction[] = data.map((row) => {
        const [id, date, description, amount, category, type] = row;
        return {
          id,
          date,
          description,
          amount: parseFloat(amount),
          category,
          type: type as 'debit' | 'credit',
        };
      });

      const categories = Array.from(new Set(transactions.map((t) => t.category)));

      res.status(200).json({ transactions, categories });
    } catch (error) {
      console.error('GET error:', error);
      res.status(500).json({ error: 'Failed to load data from Google Sheets' });
    }
  }

  else if (req.method === 'POST') {
    try {
      const body = req.body;
      const auth = await google.auth.getClient({
        credentials: JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8')),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const values = body.transactions.map((t: Transaction) => [
        t.id,
        t.date,
        t.description,
        t.amount,
        t.category,
        t.type,
      ]);

      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A2',
        valueInputOption: 'RAW',
        requestBody: { values },
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('POST error:', error);
      res.status(500).json({ error: 'Failed to save data to Google Sheets' });
    }
  }

  else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
