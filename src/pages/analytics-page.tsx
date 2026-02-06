import { ExpenseChart } from "@/components/expense-chart";
import { SectionCards } from "@/components/section-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Expense } from "@/services/api";

interface AnalyticsPageProps {
  expenses: Expense[];
}

export function AnalyticsPage({ expenses }: AnalyticsPageProps) {
  // Calculate category breakdown
  const categoryBreakdown = expenses.reduce(
    (acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Calculate monthly breakdown
  const monthlyBreakdown = expenses.reduce(
    (acc, exp) => {
      const month = new Date(exp.date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
      });
      acc[month] = (acc[month] || 0) + exp.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Calculate payment method breakdown
  const methodBreakdown = expenses.reduce(
    (acc, exp) => {
      acc[exp.payment_method] = (acc[exp.payment_method] || 0) + exp.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6 px-4 lg:px-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Detailed Analytics</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spending by Category</CardTitle>
            <CardDescription>Top categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(categoryBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([category, amount]) => (
                  <div key={category} className="flex justify-between">
                    <span className="text-sm">{category}</span>
                    <span className="font-semibold">${amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Spending by Payment Method
            </CardTitle>
            <CardDescription>Payment methods used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(methodBreakdown).map(([method, amount]) => (
                <div key={method} className="flex justify-between">
                  <span className="text-sm">{method}</span>
                  <span className="font-semibold">${amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Breakdown</CardTitle>
            <CardDescription>Spending by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(monthlyBreakdown).map(([month, amount]) => (
                <div key={month} className="flex justify-between">
                  <span className="text-sm">{month}</span>
                  <span className="font-semibold">${amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Visualizations</h3>
          <ExpenseChart expenses={expenses} />
        </div>
      </div>

      <SectionCards expenses={expenses} />
    </div>
  );
}
