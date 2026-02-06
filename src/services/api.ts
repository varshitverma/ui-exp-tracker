export type Expense = {
  id?: number;
  amount: number;
  category: string;
  description?: string | null;
  date: string;
  payment_method: string;
  created_at?: string;
  updated_at?: string;
  original_amount?: number;
  original_currency?: string;
  converted_amount?: number;
  target_currency?: string;
};

export type ConversionResponse = {
  success: boolean;
  data: Expense[];
};

const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export const expenseApi = {
  async fetchExpenses(): Promise<Expense[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`);
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error("Failed to fetch expenses");
      }
      const data = await response.json();
      return Array.isArray(data) ? data : data.data || [];
    } catch {
      console.log("API not available, using local data only");
      return [];
    }
  },

  async convertCurrency(targetCurrency: string): Promise<Expense[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/expenses/convert/${targetCurrency}`,
      );
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error("Failed to convert currency");
      }
      const data = await response.json();
      return data.data || data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("Currency conversion failed, using non-converted data");
      return [];
    }
  },

  async createExpense(
    expense: Omit<Expense, "id" | "created_at" | "updated_at">,
  ): Promise<Expense> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
      if (!response.ok) throw new Error("Failed to create expense");
      const data = await response.json();
      return data.data || data;
    } catch {
      console.log("Create failed, storing locally");
      // Return the expense with a temporary ID
      return {
        ...expense,
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  },

  async updateExpense(
    id: number,
    expense: Omit<Expense, "id" | "created_at">,
  ): Promise<Expense> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
      if (!response.ok) throw new Error("Failed to update expense");
      const data = await response.json();
      return data.data || data;
    } catch {
      console.log("Update failed, updating locally");
      return {
        id,
        ...expense,
        created_at: new Date().toISOString(),
      };
    }
  },

  async deleteExpense(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete expense");
    } catch {
      console.log("Delete failed, removing locally");
    }
  },
};
