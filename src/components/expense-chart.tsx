import * as React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Expense = {
  id?: number;
  amount: number;
  category: string;
  description?: string | null;
  date: string;
  payment_method: string;
};

interface ExpenseChartProps {
  expenses?: Expense[];
}

const COLORS = {
  Food: "#ef4444",
  Transport: "#f97316",
  Utilities: "#eab308",
  Shopping: "#84cc16",
  Entertainment: "#22c55e",
  Health: "#10b981",
  Education: "#06b6d4",
  Other: "#8b5cf6",
};

export function ExpenseChart({ expenses = [] }: ExpenseChartProps) {
  const [chartType, setChartType] = React.useState<
    "trend" | "category" | "method"
  >("trend");

  // Prepare trend data (by date)
  const trendData = React.useMemo(() => {
    const sortedExpenses = [...expenses].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const grouped: Record<string, number> = {};

    sortedExpenses.forEach((exp) => {
      const date = new Date(exp.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      grouped[date] = (grouped[date] || 0) + exp.amount;
    });

    return Object.entries(grouped).map(([date, amount]) => ({
      date,
      amount: parseFloat(amount.toFixed(2)),
    }));
  }, [expenses]);

  // Prepare category breakdown
  const categoryData = React.useMemo(() => {
    const grouped: Record<string, number> = {};
    expenses.forEach((exp) => {
      grouped[exp.category] = (grouped[exp.category] || 0) + exp.amount;
    });
    return Object.entries(grouped)
      .map(([name, value]) => ({
        name,
        value: parseFloat(value.toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  // Prepare payment method breakdown
  const methodData = React.useMemo(() => {
    const grouped: Record<string, number> = {};
    expenses.forEach((exp) => {
      grouped[exp.payment_method] =
        (grouped[exp.payment_method] || 0) + exp.amount;
    });
    return Object.entries(grouped)
      .map(([name, value]) => ({
        name,
        value: parseFloat(value.toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const categoryColors = Object.values(COLORS);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0 pb-4 md:flex-row">
        <div className="space-y-1">
          <CardTitle>Expense Analytics</CardTitle>
          <CardDescription>
            {chartType === "trend" && "Expense trend over time"}
            {chartType === "category" && "Spending by category"}
            {chartType === "method" && "Spending by payment method"}
          </CardDescription>
        </div>
        <Select
          value={chartType}
          onValueChange={(value) =>
            setChartType(value as "trend" | "category" | "method")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trend">Trend</SelectItem>
            <SelectItem value="category">By Category</SelectItem>
            <SelectItem value="method">By Method</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {expenses.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No expenses yet. Add some expenses to see the chart.
          </div>
        ) : (
          <>
            {chartType === "trend" && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#3b82f6"
                    name="Amount"
                    dot={{ fill: "#3b82f6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {chartType === "category" && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[entry.name as keyof typeof COLORS] ||
                          categoryColors[index % categoryColors.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            )}

            {chartType === "method" && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={methodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Amount" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
