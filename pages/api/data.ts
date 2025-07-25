import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

/**
 * Simple API endpoint to load and persist transaction data.  This is a
 * placeholder for Google Drive or Google Sheets integration.  In a
 * production deployment you could replace the file system access here
 * with calls to the Google Drive API using appropriate credentials and
 * token management.  The endpoint accepts a JSON body with the
 * structure `{ transactions: Transaction[], categories: string[] }` on
 * POST, writes it to a local JSON file and echoes a success flag.
 * On GET it returns the persisted data if available or a default
 * structure if not.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dataDir = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDir, 'transactions.json');

  if (req.method === 'POST') {
    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }
      const body = req.body;
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf8');
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error writing transaction data', error);
      return res.status(500).json({ success: false, error: 'Failed to save data' });
    }
  }

  if (req.method === 'GET') {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        return res.status(200).json(JSON.parse(content));
      }
    } catch (error) {
      console.error('Error reading transaction data', error);
      // fall through to return default
    }
    // default structure if no data has been saved yet
    return res.status(200).json({ transactions: [], categories: [] });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}