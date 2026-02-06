import {
  IconTrendingDown,
  IconTrendingUp,
  IconWallet,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Expense = {
  id?: number;
  amount: number;
  category: string;
  description?: string | null;
  date: string;
  payment_method: string;
  created_at?: string;
  updated_at?: string;
};

interface SectionCardsProps {
  expenses?: Expense[];
}

export function SectionCards({ expenses = [] }: SectionCardsProps) {
  // Calculate metrics
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const thisMonthExpenses = expenses
    .filter((exp) => {
      const expDate = new Date(exp.date);
      const now = new Date();
      return (
        expDate.getMonth() === now.getMonth() &&
        expDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  const lastMonthExpenses = expenses
    .filter((exp) => {
      const expDate = new Date(exp.date);
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return (
        expDate.getMonth() === lastMonth.getMonth() &&
        expDate.getFullYear() === lastMonth.getFullYear()
      );
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  const percentageChange =
    lastMonthExpenses === 0
      ? 0
      : ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

  const percentageChangeFormatted = percentageChange.toFixed(1);

  const categoryBreakdown = expenses.reduce(
    (acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topCategory = Object.entries(categoryBreakdown).reduce(
    (a, b) => (a[1] > b[1] ? a : b),
    ["None", 0] as [string, number],
  );

  const avgExpense =
    expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : "0.00";

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${totalExpenses.toFixed(2)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconWallet className="size-3" />
              Overall
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {expenses.length} expenses tracked
          </div>
          <div className="text-muted-foreground">Across all time</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${thisMonthExpenses.toFixed(2)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {percentageChange > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {percentageChange > 0 ? "+" : ""}
              {percentageChangeFormatted}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {thisMonthExpenses > lastMonthExpenses ? "Increased" : "Decreased"}{" "}
            from last month
            {thisMonthExpenses > lastMonthExpenses ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Last month: ${lastMonthExpenses.toFixed(2)}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Top Category</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {topCategory[0]}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">${topCategory[1].toFixed(2)}</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Highest spending category
          </div>
          <div className="text-muted-foreground">
            {Object.keys(categoryBreakdown).length} categories total
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Expense</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${avgExpense}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Per expense</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Based on {expenses.length} expenses
          </div>
          <div className="text-muted-foreground">Average spending amount</div>
        </CardFooter>
      </Card>
    </div>
  );
}
