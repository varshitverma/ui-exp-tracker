# Expense Tracker Frontend

A modern, responsive expense tracking application built with React, TypeScript, and Tailwind CSS. Manage your expenses with ease using features like add, edit, delete, search, filter, and visualize spending patterns with interactive charts.

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "d:\exp tracker app\frontend"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup (Optional)

Create a `.env.local` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

If not provided, the app uses mock data by default.

### 4. Run Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── App.tsx                          # Main app with state management
├── main.tsx                         # Entry point
├── App.css                          # Global styles
├── index.css                        # Tailwind setup
│
├── components/
│   ├── app-sidebar.tsx             # Navigation sidebar
│   ├── site-header.tsx             # Page header
│   ├── section-cards.tsx           # Metric cards (Dashboard)
│   ├── expense-form.tsx            # Add/Edit expense form
│   ├── expense-table.tsx           # Expenses list with CRUD
│   ├── expense-chart.tsx           # Charts and analytics
│   ├── nav-main.tsx                # Main navigation menu
│   ├── nav-secondary.tsx           # Secondary navigation
│   ├── nav-user.tsx                # User profile section
│   └── ui/                         # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── drawer.tsx
│       ├── table.tsx
│       └── ... (other UI components)
│
├── pages/
│   ├── dashboard-page.tsx          # Dashboard view
│   ├── expenses-page.tsx           # Expenses management view
│   └── analytics-page.tsx          # Analytics view
│
├── services/
│   └── api.ts                      # API service layer
│
├── context/
│   └── nav-context.tsx             # Navigation context
│
├── hooks/
│   └── use-mobile.ts               # Mobile detection hook
│
└── lib/
    └── utils.ts                    # Utility functions
```

## Features

### 📊 Dashboard

- **Metric Cards**: Total expenses, monthly spending, top category, average expense
- **Interactive Charts**: View spending trends with multiple visualization modes
- **Real-time Updates**: Metrics update as you add/edit expenses

### 💰 Expense Management

- **Add Expenses**: Quick form to create new expense entries
- **Edit Expenses**: Modify existing expenses with pre-filled data
- **Delete Expenses**: Remove expenses with confirmation
- **Search**: Find expenses by description, category, or payment method
- **Filter**: Filter by category or payment method
- **Sort**: Sort by date or amount
- **Pagination**: Navigate through large expense lists

### 📈 Analytics

- **Trend Chart**: Line chart showing spending over time
- **Category Breakdown**: Pie chart showing spending by category
- **Payment Method Analysis**: Bar chart showing payment method usage
- **Monthly Statistics**: Detailed breakdown by month

### 🎨 User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode Support**: Auto-detects system preference
- **Form Validation**: Real-time validation with error messages
- **Toast Notifications**: User feedback for all actions
- **Collapsible Sidebar**: Optimized for mobile viewing

## Core Technologies

- **React** 19.2.0 - UI framework
- **TypeScript** 5.9 - Type safety
- **Tailwind CSS** 4.1.18 - Styling
- **Recharts** 2.15.4 - Data visualization
- **React Table** 8.21.3 - Advanced table features
- **Zod** 4.3.6 - Form validation
- **Sonner** 2.0.7 - Toast notifications
- **shadcn/ui** - Component library
- **Tabler Icons** 3.36.1 - Icons
- **Vite** - Build tool

## How to Use

### Adding an Expense

1. Click **"Create Expense"** button in the sidebar OR
2. Go to Expenses page and click **"Add Expense"**
3. Fill in the form:
   - Amount (required)
   - Category (required)
   - Description (optional)
   - Date (required)
   - Payment Method (required)
4. Click **"Add Expense"**
5. Form closes and expense appears in the table

### Editing an Expense

1. Open Expenses page
2. Find the expense in the table
3. Click the three-dot menu (⋮) on the right
4. Select **"Edit"**
5. Form opens with current data
6. Update any fields
7. Click **"Update Expense"**

### Deleting an Expense

1. Open Expenses page
2. Find the expense in the table
3. Click the three-dot menu (⋮) on the right
4. Select **"Delete"**
5. Expense is removed immediately

### Navigating Pages

Use the sidebar to switch between:

- **Dashboard** - Overview with charts
- **Expenses** - Manage all expenses
- **Analytics** - Detailed analytics views

## Data Model

### Expense Object

```typescript
{
  id: number; // Auto-generated ID
  amount: number; // Expense amount
  category: string; // Food, Transport, Utilities, etc.
  description: string | null; // Optional note
  date: string; // YYYY-MM-DD format
  payment_method: string; // Cash, Credit Card, etc.
  created_at: string; // Timestamp
  updated_at: string; // Timestamp
}
```

### Valid Categories

- Food & Dining
- Transport
- Utilities
- Shopping
- Entertainment
- Health & Medical
- Education
- Other

### Valid Payment Methods

- Cash
- Credit Card
- Debit Card
- Bank Transfer
- Mobile Wallet

## Backend Integration

The app works with or without a backend. Sample data is pre-loaded for testing.

### To Connect Your Backend

1. Set environment variable:

   ```bash
   VITE_API_BASE_URL=http://{backend-url}/api/v1
   ```

2. Your backend should provide these endpoints:

   ```
   GET    /api/expenses           # Get all expenses
   POST   /api/expenses           # Create expense
   PUT    /api/expenses/:id       # Update expense
   DELETE /api/expenses/:id       # Delete expense
   ```

3. Request/Response format:
   ```json
   {
     "amount": 45.5,
     "category": "Food",
     "description": "Lunch",
     "date": "2026-02-01",
     "payment_method": "Credit Card"
   }
   ```

### API Service

All API calls go through `src/services/api.ts`. This service:

- Handles network requests
- Manages error responses
- Shows toast notifications
- Falls back to mock data if API unavailable

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Sample Data

The app includes 6 pre-loaded sample expenses for testing. You can:

- Add more expenses
- Edit sample expenses
- Delete all of them
- Refresh page to restore sample data

## Troubleshooting

### Form Won't Submit

- Check all required fields are filled
- Verify amount is a valid number
- Ensure date is selected
- Red error messages indicate which field is invalid

### Data Resets After Refresh

- Expected behavior - app uses local state by default
- Connect to backend for data persistence
- See Backend Integration section above

### Search Not Working

- Ensure search terms match expense data
- Search is case-insensitive
- Can search by description, category, or payment method

### Charts Not Showing Data

- Ensure you have expenses added
- Try switching between different chart types
- Wait for data to load if using API

## Features Explained

### Search

Real-time search box filters expenses by:

- Description (e.g., "lunch", "gas")
- Category (e.g., "food", "transport")
- Payment method (e.g., "cash", "card")

### Filter

Category dropdown filters the table to show only expenses from selected category.

### Sort

Click column headers to sort:

- Date: Ascending/descending by date
- Amount: Ascending/descending by amount

### Pagination

Navigate large expense lists:

- First/Last - Jump to first/last page
- Previous/Next - Page by page navigation
- Page indicator shows current position

### Column Visibility

Click "View" button to toggle which columns appear in table.

## Keyboard Shortcuts

- `Tab` - Navigate form fields
- `Enter` - Submit form
- `Escape` - Close drawer/modal

## Performance Notes

- Charts are optimized for 1000+ expenses
- Search filters in real-time
- Pagination for efficient rendering
- Lazy loading ready for future optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Planned features:

- Budget goals and alerts
- Recurring expenses
- Export to CSV/PDF
- Multi-user support
- Mobile app
- Advanced analytics
- Expense categories customization

## Known Limitations

- Data persists only in browser memory (no refresh persistence without backend)
- No undo functionality
- Maximum 10,000 expenses before performance impact
- Single user only

## Contributing

To contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review inline code comments
3. Check component prop types for usage
4. Open an issue with detailed description

## Getting Help

- **Components**: Check `src/components` for implementation examples
- **API**: See `src/services/api.ts` for backend integration
- **Navigation**: See `src/context/nav-context.tsx` for page navigation
- **Types**: All components are fully TypeScript typed

---

**Ready to start?** Run `npm run dev` and open http://localhost:5173!

**Happy tracking!** 💰📊
