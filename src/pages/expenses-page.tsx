import { ExpenseTable } from "@/components/expense-table";
import type { Expense } from "@/services/api";

interface ExpensesPageProps {
  expenses: Expense[];
  onAddExpense: (expense: Expense) => void;
  onUpdateExpense: (expense: Expense) => void;
  onDeleteExpense: (id: number) => void;
}

export function ExpensesPage({
  expenses,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
}: ExpensesPageProps) {
  return (
    <div className="px-4 lg:px-6 py-4 md:py-6">
      <ExpenseTable
        expenses={expenses}
        onAddExpense={onAddExpense}
        onUpdateExpense={onUpdateExpense}
        onDeleteExpense={onDeleteExpense}
      />
    </div>
  );
}
