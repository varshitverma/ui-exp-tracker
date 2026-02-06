import { ExpenseChart } from "@/components/expense-chart";
import { SectionCards } from "@/components/section-cards";
import type { Expense } from "@/services/api";

interface DashboardPageProps {
  expenses: Expense[];
}

export function DashboardPage({ expenses }: DashboardPageProps) {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards expenses={expenses} />
      <div className="px-4 lg:px-6">
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  );
}
