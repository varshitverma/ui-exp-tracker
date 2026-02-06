import "./App.css";
import * as React from "react";
import { Toaster } from "sonner";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { DashboardPage } from "@/pages/dashboard-page";
import { ExpensesPage } from "@/pages/expenses-page";
import { AnalyticsPage } from "@/pages/analytics-page";
import { NavProvider, useNav } from "@/context/nav-context";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { expenseApi, type Expense } from "@/services/api";
import { ExpenseForm } from "@/components/expense-form";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "sonner";

// Generated mock data for initial expense s
const mockExpenses: Expense[] = [
  {
    id: 1,
    amount: 45.5,
    category: "Food",
    description: "Lunch at restaurant",
    date: "2026-02-01",
    payment_method: "Credit Card",
    created_at: "2026-02-01T12:30:00Z",
    updated_at: "2026-02-01T12:30:00Z",
  },
  {
    id: 2,
    amount: 120.0,
    category: "Transport",
    description: "Gas",
    date: "2026-02-02",
    payment_method: "Debit Card",
    created_at: "2026-02-02T08:00:00Z",
    updated_at: "2026-02-02T08:00:00Z",
  },
  {
    id: 3,
    amount: 65.99,
    category: "Shopping",
    description: "Groceries",
    date: "2026-02-03",
    payment_method: "Debit Card",
    created_at: "2026-02-03T16:45:00Z",
    updated_at: "2026-02-03T16:45:00Z",
  },
  {
    id: 4,
    amount: 35.0,
    category: "Entertainment",
    description: "Movie tickets",
    date: "2026-02-04",
    payment_method: "Credit Card",
    created_at: "2026-02-04T19:00:00Z",
    updated_at: "2026-02-04T19:00:00Z",
  },
  {
    id: 5,
    amount: 150.0,
    category: "Utilities",
    description: "Electricity bill",
    date: "2026-02-05",
    payment_method: "Bank Transfer",
    created_at: "2026-02-05T10:00:00Z",
    updated_at: "2026-02-05T10:00:00Z",
  },
  {
    id: 6,
    amount: 89.0,
    category: "Health",
    description: "Doctor appointment",
    date: "2026-02-05",
    payment_method: "Cash",
    created_at: "2026-02-05T14:30:00Z",
    updated_at: "2026-02-05T14:30:00Z",
  },
];

function AppContent() {
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showExpenseForm, setShowExpenseForm] = React.useState(false);

  React.useEffect(() => {
    const loadExpenses = async () => {
      try {
        setLoading(true);
        const apiExpenses = await expenseApi.fetchExpenses();
        // Always use API response (empty array if not available)
        // Only fall back to mock if both API fails AND we have no expenses
        setExpenses(apiExpenses.length > 0 ? apiExpenses : mockExpenses);
      } catch (error) {
        console.error("Failed to load expenses:", error);
        setExpenses(mockExpenses);
      } finally {
        setLoading(false);
      }
    };
    loadExpenses();
  }, []);

  const handleAddExpense = async (expense: Expense) => {
    try {
      const newExpense = await expenseApi.createExpense({
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date,
        payment_method: expense.payment_method,
      });
      setExpenses([...expenses, newExpense]);
      setShowExpenseForm(false);
      toast.success("Expense added successfully");
    } catch (error) {
      toast.error("Failed to add the expense");
    }
  };

  const handleUpdateExpense = async (updatedExpense: Expense) => {
    if (!updatedExpense.id) return;
    try {
      const updated = await expenseApi.updateExpense(updatedExpense.id, {
        amount: updatedExpense.amount,
        category: updatedExpense.category,
        description: updatedExpense.description,
        date: updatedExpense.date,
        payment_method: updatedExpense.payment_method,
        updated_at: new Date().toISOString(),
      });
      setExpenses(
        expenses.map((exp) => (exp.id === updatedExpense.id ? updated : exp)),
      );
      toast.success("Expense updated Successfully");
    } catch (error) {
      toast.error("Failed to update expense");
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await expenseApi.deleteExpense(id);
      setExpenses(expenses.filter((exp) => exp.id !== id));
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  const { currentPage } = useNav();

  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading expenses...</p>
        </div>
      );
    }

    switch (currentPage) {
      case "dashboard":
        return <DashboardPage expenses={expenses} />;
      case "expenses":
        return (
          <ExpensesPage
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onUpdateExpense={handleUpdateExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        );
      case "analytics":
        return <AnalyticsPage expenses={expenses} />;
      default:
        return <DashboardPage expenses={expenses} />;
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        onCreateExpense={() => setShowExpenseForm(true)}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {renderPage()}
          </div>
        </div>
      </SidebarInset>

      <Drawer open={showExpenseForm} onOpenChange={setShowExpenseForm}>
        <ExpenseForm
          expense={undefined}
          onSubmit={async (newExpense) => {
            await handleAddExpense(newExpense);
          }}
          onOpenChange={setShowExpenseForm}
        />
      </Drawer>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <NavProvider>
      <AppContent />
      <Toaster />
    </NavProvider>
  );
}
