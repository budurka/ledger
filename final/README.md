# Checkbook Ledger

A modern, responsive checkbook ledger application built with Next.js and featuring Apple Liquid Glass design language. Track your finances with style using glassmorphism effects, dark/light mode, and intuitive transaction management.

## Features

- ✨ **Apple Liquid Glass Design** - Modern glassmorphism UI with beautiful visual effects
- 🌓 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 💰 **Transaction Management** - Add, edit, delete, and categorize transactions
- 👥 **Multi-User Support** - Track transactions for user and partner
- 📊 **Real-time Balance** - Automatic balance calculation with pending/posted status
- 📁 **Categories** - Organize transactions with customizable categories
- 📤 **CSV Export** - Export transaction data for external analysis
- 💾 **Local Storage** - Data persistence without external dependencies
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance** - Built with Next.js for optimal loading speeds

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **Icons**: Lucide React
- **Storage**: Browser Local Storage
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd checkbook-ledger
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Adding Transactions

1. Click the "Add Transaction" button
2. Fill in the transaction details:
   - **Date**: Transaction date
   - **Amount**: Transaction amount (positive number)
   - **Description**: Brief description of the transaction
   - **Category**: Select from existing categories or create new ones
   - **Type**: Debit (-) or Credit (+)
   - **Status**: Pending or Posted (only posted transactions affect balance)
   - **User**: User or Partner

### Managing Transactions

- **View Transactions**: All transactions are displayed in a sortable, filterable list
- **Filter**: Use the dropdown to filter by status, user, or transaction type
- **Sort**: Sort by date, amount, or description in ascending/descending order
- **Toggle Status**: Click on the status badge to toggle between pending/posted
- **Delete**: Click the trash icon to remove a transaction

### Categories

- Use predefined categories or create custom ones
- Categories help organize and analyze spending patterns
- New categories are automatically saved and available for future transactions

### Export Data

- Click the "Export" button in the header to download a CSV file
- CSV includes all transaction data with proper formatting
- File is named with the current date for easy organization

### Theme Toggle

- Click the sun/moon icon in the header to switch between light and dark modes
- Theme preference is automatically saved and restored on next visit

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure deployment
   - Click "Deploy"

3. **Automatic Deployments**
   - Future pushes to the main branch will automatically trigger new deployments
   - Preview deployments are created for pull requests

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

### Environment Variables

No environment variables are required for basic functionality. All data is stored locally in the browser.

## Project Structure

```
checkbook-ledger/
├── components/           # React components
│   ├── Header.tsx       # Header with balance and controls
│   ├── ThemeProvider.tsx # Dark/light mode context
│   ├── TransactionForm.tsx # Add transaction form
│   └── TransactionList.tsx # Transaction display and management
├── pages/               # Next.js pages
│   ├── _app.tsx        # App wrapper with global styles
│   └── index.tsx       # Main application page
├── styles/              # Styling files
│   └── globals.css     # Global styles and Tailwind imports
├── utils/               # Utility functions
│   ├── csvExport.ts    # CSV export functionality
│   └── storage.ts      # Local storage management
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── vercel.json          # Vercel deployment configuration
└── README.md           # This file
```

## Customization

### Styling

The application uses Tailwind CSS with custom glassmorphism effects defined in `styles/globals.css`. Key classes:

- `.glass-card` - Main glassmorphism container
- `.glass-button` - Interactive button with glass effect
- `.glass-input` - Form input with glass styling
- `.gradient-bg` - Background gradient

### Categories

Default categories are defined in `utils/storage.ts`. You can modify the `defaultCategories` array to change the initial category list.

### Data Structure

Transaction data structure is defined in `utils/storage.ts`:

```typescript
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  status: 'pending' | 'posted';
  user: 'user' | 'partner';
  type: 'debit' | 'credit';
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using Next.js and Tailwind CSS