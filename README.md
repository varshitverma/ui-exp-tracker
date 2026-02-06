# Expense Tracker Frontend

A modern, responsive expense tracking application built with React, TypeScript, and Tailwind CSS. Manage your expenses with ease using features like add, edit, delete, search, filter, visualize spending patterns with interactive charts, and convert currencies in real-time.

## ⚠️ Prerequisites

Before starting the frontend setup, ensure you have:

1. **Node.js** (v16+) and npm installed
2. **Backend Server** running (see Backend Requirements section below)
3. **API Keys/Environment Variables** configured

## Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/varshitverma/ui-exp-tracker
cd "d:\exp tracker app\frontend"
```

### Step 2: API Keys & Environment Setup (IMPORTANT - DO THIS FIRST)

Before installing dependencies, create a `.env.local` file in the root directory:

```bash
# Required: Backend API URL
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

**Environment Variables:**

| Variable            | Value       | Required | Notes                                |
| ------------------- | ----------- | -------- | ------------------------------------ |
| `VITE_API_BASE_URL` | Backend URL | ✅ Yes   | E.g., `http://localhost:3000/api/v1` |

**Important:**

- The app **requires a backend server** to store expenses persistently
- Without `VITE_API_BASE_URL`, the app uses sample data only
- Update the URL based on your backend deployment (local dev, staging, production)

### Backend Requirements

Your backend must provide these API endpoints:

```
GET    /api/v1/expenses                    # Get all expenses
POST   /api/v1/expenses                    # Create expense
PUT    /api/v1/expenses/:id                # Update expense
DELETE /api/v1/expenses/:id                # Delete expense
GET    /api/v1/expenses/convert/:currency  # Convert to target currency
```

**Currency Conversion:**

- The frontend expects the backend to provide exchange rate conversion
- Backend should use ExchangeRate-API or similar service for live rates
- Default currency: **INR** (Indian Rupees)

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### Step 5: Build for Production

```bash
npm run build
```

## Environment Configuration Details

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
- **Currency Display**: All amounts shown in selected currency

### 💰 Expense Management

- **Add Expenses**: Quick form to create new expense entries (always in INR)
- **Edit Expenses**: Modify existing expenses with pre-filled data
- **Delete Expenses**: Remove expenses with confirmation
- **Search**: Find expenses by description, category, or payment method
- **Filter**: Filter by category
- **Sort**: Sort by date or amount
- **Pagination**: Navigate through large expense lists

### 💱 Currency Conversion

- **180+ Supported Currencies**: USD, EUR, GBP, JPY, INR, and many more
- **Live Exchange Rates**: Real-time rates powered by ExchangeRate-API
- **Instant Conversion**: Switch currencies from sidebar dropdown
- **All Views Updated**: Dashboard, charts, tables show selected currency
- **Symbol Display**: Each currency shows its symbol (₹, $, €, £, etc.)
- **Default INR**: All data stored in INR, conversion on-the-fly

### 📈 Analytics

- **Trend Chart**: Line chart showing spending over time
- **Category Breakdown**: Pie chart showing spending by category
- **Payment Method Analysis**: Bar chart showing payment method usage
- **Monthly Statistics**: Detailed breakdown by month
- **Currency-Aware**: Charts update with selected currency

### 🎨 User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode Support**: Auto-detects system preference
- **Form Validation**: Real-time validation with error messages
- **Toast Notifications**: User feedback for all actions
- **Collapsible Sidebar**: Optimized for mobile viewing
- **Currency Selector**: Easy currency switching in sidebar

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

### Converting Currencies

1. Look at the **Sidebar** (bottom section, above user menu)
2. Click the **"Exchange Rate"** dropdown
3. Select any currency from 180+ options
   - Search by currency code (USD, EUR, GBP, etc.)
   - Or scroll to find currency name
4. **Conversion happens instantly**:
   - Exchange rates fetched from ExchangeRate-API
   - All expenses instantly shown in new currency
   - Charts and cards update with new amounts
5. **Important Notes**:
   - All data stored in INR in the database
   - Conversion is display-only (no data change)
   - Refreshing page returns to last selected currency
   - Free tier limited to 500 requests/month (ExchangeRate-API)

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

### Required Backend Setup

This frontend **requires a backend API** to function properly. Follow these steps:

#### 1. Start Backend Server

Ensure your backend is running before starting the frontend:

```bash
# Example: If backend is in parent directory
cd ../backend
npm install
npm run dev
```

Backend should be accessible at: `http://localhost:3000` (or your configured port)

#### 2. Configure Frontend API URL

Make sure `.env.local` has correct backend URL:

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

#### 3. Backend API Endpoints Required

Your backend must implement these endpoints:

**Get All Expenses**

```
GET /api/v1/expenses
Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "amount": 1200.5,
      "category": "Food",
      "description": "Lunch",
      "date": "2026-01-15T12:00:00",
      "payment_method": "Credit Card",
      "created_at": "2026-01-15T12:00:00",
      "updated_at": "2026-01-15T12:00:00"
    }
  ]
}
```

**Create Expense**

```
POST /api/v1/expenses
Body:
{
  "amount": 1200.5,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-01-15T12:00:00",
  "payment_method": "Credit Card"
}
Response: Returns created expense with ID
```

**Update Expense**

```
PUT /api/v1/expenses/:id
Body: Same as create
Response: Returns updated expense
```

**Delete Expense**

```
DELETE /api/v1/expenses/:id
Response: Success message
```

**Currency Conversion (IMPORTANT)**

```
GET /api/v1/expenses/convert/:target_currency
Example: GET /api/v1/expenses/convert/USD

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "amount": 1200.5,
      "category": "Food",
      "description": "Lunch",
      "date": "2026-01-15T12:00:00",
      "payment_method": "Credit Card",
      "original_amount": 1200.5,
      "original_currency": "INR",
      "converted_amount": 14.42,
      "target_currency": "USD",
      "created_at": "2026-01-15T12:00:00",
      "updated_at": "2026-01-15T12:00:00"
    }
  ]
}
```

#### 4. Currency Conversion Backend Requirements

The frontend supports **180+ currencies** with live exchange rates. Your backend must:

1. **Use ExchangeRate-API** (Recommended)
   - Signup: https://www.exchangerate-api.com
   - Get free tier API key
   - Set environment variable: `EXCHANGE_RATE_API_KEY=your_key_here`

2. **Supported Currencies:**
   - Default: **INR** (Indian Rupees ₹)
   - All ISO 4217 currency codes supported
   - Live rates updated automatically

3. **Backend Implementation Tips:**
   - Cache exchange rates (refresh every 24 hours)
   - Always store amounts in INR in database
   - Return conversion for requested currency only
   - Include original_currency and target_currency in response

### API Service Layer

All API calls are managed in `src/services/api.ts`:

```typescript
export const expenseApi = {
  async fetchExpenses(): Promise<Expense[]> { ... }
  async createExpense(expense: Omit<Expense, 'id'>): Promise<Expense> { ... }
  async updateExpense(id: number, expense: Omit<Expense, 'id'>): Promise<Expense> { ... }
  async deleteExpense(id: number): Promise<void> { ... }
  async convertCurrency(targetCurrency: string): Promise<Expense[]> { ... }
}
```

### Error Handling

The API service automatically:

- ✅ Handles network errors gracefully
- ✅ Shows error toast notifications
- ✅ Falls back to cached data when available
- ✅ Logs errors to console for debugging

### Troubleshooting Backend Connection

**Problem: "API not available, using local data only"**

1. Check backend is running: `curl http://localhost:3000/api/v1/expenses`
2. Verify `VITE_API_BASE_URL` is correct in `.env.local`
3. Check browser console for CORS errors
4. Ensure backend has proper CORS configuration

**Problem: Currency conversion not working**

1. Verify backend has ExchangeRate-API key configured
2. Test endpoint: `curl http://localhost:3000/api/v1/expenses/convert/USD`
3. Check backend logs for API call failures
4. Ensure backend can access external APIs

### Production Deployment

For production:

1. Update `VITE_API_BASE_URL` to your deployed backend URL
2. Ensure backend is on HTTPS
3. Configure CORS properly for your domain
4. Use environment secrets for sensitive data
5. Enable rate limiting on backend

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

## 🚀 Deployment Guide

This section covers deploying the Expense Tracker frontend to a production server with full HTTPS support.

### Step 1: Configure Production Environment

Create a `.env.production` file in the root directory for production builds:

```bash
# Production API URL - use relative path or your domain
VITE_API_BASE_URL=/api/v1
```

**Important Notes:**

- Never hardcode IP addresses - use relative paths or domain names
- The API is served under `/api/v1` path on the same domain
- Nginx will proxy `/api/*` requests to the backend server

### Step 2: Build Frontend for Production

Prepare the frontend build locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates an optimized `dist/` folder with minified code, ready for deployment.

### Step 3: Upload Build to Server

Choose one of the following methods:

#### Method A: Using SCP (Remote Copy)

```bash
# From your local machine
scp -i your-key.pem -r dist/* ubuntu@yourdomain.com:/var/www/html/
```

#### Method B: Direct Copy on Server

```bash
# If already on the server
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
```

**Permissions:**

```bash
# Ensure Nginx can read the files
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### Step 4: Configure Nginx

Update Nginx configuration to serve the frontend and proxy API requests:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Serve static files from React build
    root /var/www/html;
    index index.html;

    # Handle all requests, default to index.html for SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Disable caching for HTML (allow cache busting via file hash)
    location ~* \.html?$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Cache static assets (JS, CSS, images)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Step 5: Connect Domain and DNS

Using Hostinger or similar DNS provider:

**Add these DNS records:**

| Type  | Name | Value          |
| ----- | ---- | -------------- |
| A     | @    | YOUR_EC2_IP    |
| CNAME | www  | yourdomain.com |

**Steps:**

1. Go to your domain's DNS management
2. Add the A record pointing to your server IP
3. Add the CNAME record for www subdomain
4. Wait for DNS propagation (can take 15-30 minutes)

### Step 6: Enable HTTPS with Let's Encrypt

Secure your domain with free SSL certificates.

#### Install Certbot

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

#### Generate SSL Certificate

```bash
# For single domain
sudo certbot --nginx -d yourdomain.com

# For multiple domains (recommended)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**When prompted:**

- Enter email for important notices
- Accept terms and conditions
- Choose **Option 2: Redirect traffic to HTTPS** (recommended)

#### Verify Auto-Renewal

```bash
# Check renewal timer is active
sudo systemctl status certbot.timer

# Test automatic renewal
sudo certbot renew --dry-run
```

Certbot automatically renews certificates 30 days before expiration.

### Step 7: Verify Deployment

Test all endpoints to ensure everything works:

#### Test Frontend

```bash
https://yourdomain.com
```

You should see the Expense Tracker interface loading.

#### Test API Endpoint

```bash
curl https://yourdomain.com/api/v1/expenses
```

Should return your expenses (or empty array if none exist).

#### Test Swagger Documentation

```bash
https://yourdomain.com/api/docs
```

Should display the API documentation (if backend includes Swagger).

### Step 8: Deployment Update Workflow

#### Backend Updates

```bash
# SSH into your server
ssh -i your-key.pem ubuntu@yourdomain.com

# Navigate to backend directory
cd ~/backend

# Pull latest changes
git pull

# Install new dependencies if needed
source env/bin/activate
pip install -r requirements.txt
deactivate

# Restart the service
sudo systemctl restart fastapi

# Verify restart
sudo systemctl status fastapi
```

#### Frontend Updates

```bash
# On your local machine, build the latest version
npm run build

# Upload to server
scp -i your-key.pem -r dist/* ubuntu@yourdomain.com:/var/www/html/

# Or use direct copy if on server:
# sudo cp -r dist/* /var/www/html/
```

No restart needed for frontend - Nginx automatically serves new files.

### Final Architecture

Your deployed system has this architecture:

```
Internet (HTTPS)
    ↓
Nginx (Port 443)
    ├── / → React Frontend (Static Files)
    │       └── /index.html for all routes (SPA routing)
    │
    └── /api/* → FastAPI Backend (Gunicorn)
                └── Proxied to 127.0.0.1:8000
```

**Data Flow:**

1. User requests `https://yourdomain.com` → Nginx serves React app
2. React app makes API call to `/api/v1/expenses` → Nginx proxies to FastAPI backend
3. Backend processes request and returns JSON
4. Frontend displays data to user

### Security Checklist

- ✅ HTTPS enabled with valid SSL certificate
- ✅ DNS records properly configured
- ✅ Nginx firewall rules (if using AWS security groups)
- ✅ Backend running on localhost only (127.0.0.1:8000)
- ✅ Environment variables not hardcoded
- ✅ API rate limiting enabled (optional)
- ✅ CORS configured for your domain only
- ✅ Auto-renewal certificate timer active

### Troubleshooting Deployment

**Problem: Certificate renewal failing**

```bash
# Check renewal logs
sudo journalctl -u certbot.timer -n 50

# Force renewal (use sparingly)
sudo certbot renew --force-renewal
```

**Problem: API returning 502 Bad Gateway**

- Check backend is running: `sudo systemctl status fastapi`
- Verify backend listening on 127.0.0.1:8000
- Check Nginx error logs: `sudo tail -n 50 /var/log/nginx/error.log`

**Problem: Frontend showing blank page**

- Check browser console for errors
- Verify files exist: `ls -la /var/www/html/`
- Check Nginx access logs: `sudo tail -n 50 /var/log/nginx/access.log`

**Problem: DNS not resolving**

- Wait for propagation (can take up to 48 hours)
- Check: `nslookup yourdomain.com`
- Or: `dig yourdomain.com`

---

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
