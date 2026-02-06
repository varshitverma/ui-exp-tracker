import * as React from "react";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const expenseFormSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  payment_method: z.string().min(1, "Payment method is required"),
});

type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

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

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: (data: Expense) => void;
  onOpenChange?: (open: boolean) => void;
}

export function ExpenseForm({
  expense,
  onSubmit,
  onOpenChange,
}: ExpenseFormProps) {
  const [formData, setFormData] = React.useState<ExpenseFormValues>({
    amount: expense?.amount?.toString() || "",
    category: expense?.category || "",
    description: expense?.description || "",
    date: expense?.date || new Date().toISOString().split("T")[0],
    payment_method: expense?.payment_method || "",
  });

  const [errors, setErrors] = React.useState<Partial<ExpenseFormValues>>({});

  // Update form data when expense prop changes
  React.useEffect(() => {
    // Extract date in YYYY-MM-DD format from any format
    let dateValue = new Date().toISOString().split("T")[0];
    if (expense?.date) {
      // Handle both "2026-02-06" and "2026-02-06T00:00:00" formats
      dateValue = expense.date.includes("T")
        ? expense.date.split("T")[0]
        : expense.date;
    }
    setFormData({
      amount: expense?.amount?.toString() || "",
      category: expense?.category || "",
      description: expense?.description || "",
      date: dateValue,
      payment_method: expense?.payment_method || "",
    });
    setErrors({});
  }, [expense]);

  const handleChange = (field: keyof ExpenseFormValues, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = expenseFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const newErrors: Partial<ExpenseFormValues> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ExpenseFormValues;
        newErrors[field] = issue.message as never;
      });
      setErrors(newErrors);
      return;
    }

    const expenseData: Expense = {
      ...(expense?.id && { id: expense.id }),
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description || null,
      date: formData.date,
      payment_method: formData.payment_method,
    };

    onSubmit(expenseData);
    onOpenChange?.(false);
  };

  return (
    <DrawerContent>
      <DrawerHeader className="border-b">
        <DrawerTitle className="text-2xl">
          {expense?.id ? "Edit" : "Add"} Expense
        </DrawerTitle>
        <DrawerDescription className="text-base">
          {expense?.id
            ? "Update the expense details below"
            : "Fill in the details to create a new expense"}
        </DrawerDescription>
      </DrawerHeader>

      <form
        onSubmit={handleSubmit}
        className="px-4 py-4 space-y-4 max-h-[60vh] overflow-y-auto"
      >
        {/* Amount and Date - Side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-semibold">
              Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className={`pl-6 text-lg font-semibold ${errors.amount ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-red-500 font-medium">
                {errors.amount}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-semibold">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className={`${errors.date ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {errors.date && (
              <p className="text-xs text-red-500 font-medium">{errors.date}</p>
            )}
          </div>
        </div>

        {/* Category and Payment Method */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger
                id="category"
                className={`${errors.category ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">🍔 Food & Dining</SelectItem>
                <SelectItem value="Transport">🚗 Transport</SelectItem>
                <SelectItem value="Utilities">💡 Utilities</SelectItem>
                <SelectItem value="Shopping">🛍️ Shopping</SelectItem>
                <SelectItem value="Entertainment">🎬 Entertainment</SelectItem>
                <SelectItem value="Health">🏥 Health & Medical</SelectItem>
                <SelectItem value="Education">📚 Education</SelectItem>
                <SelectItem value="Other">📌 Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-500 font-medium">
                {errors.category}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_method" className="text-sm font-semibold">
              Payment Method
            </Label>
            <Select
              value={formData.payment_method}
              onValueChange={(value) => handleChange("payment_method", value)}
            >
              <SelectTrigger
                id="payment_method"
                className={`${errors.payment_method ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              >
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">💵 Cash</SelectItem>
                <SelectItem value="Credit Card">💳 Credit Card</SelectItem>
                <SelectItem value="Debit Card">💳 Debit Card</SelectItem>
                <SelectItem value="Bank Transfer">🏦 Bank Transfer</SelectItem>
                <SelectItem value="Mobile Wallet">📱 Mobile Wallet</SelectItem>
              </SelectContent>
            </Select>
            {errors.payment_method && (
              <p className="text-xs text-red-500 font-medium">
                {errors.payment_method}
              </p>
            )}
          </div>
        </div>

        {/* Description - Full width */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-semibold">
            Description (Optional)
          </Label>
          <Input
            id="description"
            placeholder="E.g., Lunch at restaurant with team"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="h-10 resize-none"
          />
        </div>
      </form>

      <DrawerFooter className="border-t gap-2 p-4">
        <Button
          onClick={handleSubmit}
          className="w-full h-10 text-sm font-semibold"
        >
          {expense?.id ? "Update Expense" : "Add Expense"}
        </Button>
        <DrawerClose asChild>
          <Button variant="outline" className="w-full h-10 text-sm">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
