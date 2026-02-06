import * as React from "react";
import {
  IconEdit,
  IconTrash,
  IconSearch,
  IconChevronDown,
  IconPlus,
  IconLayoutColumns,
  IconDotsVertical,
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExpenseForm } from "@/components/expense-form";
import { getCurrencySymbol } from "@/lib/utils";
import { useNav } from "@/context/nav-context";

type Expense = {
  id?: number;
  amount: number;
  category: string;
  description?: string | null;
  date: string;
  payment_method: string;
  created_at?: string;
  updated_at?: string;
  converted_amount?: number;
  target_currency?: string;
};

interface ExpenseTableProps {
  expenses: Expense[];
  onAddExpense: (expense: Expense) => void;
  onUpdateExpense: (expense: Expense) => void;
  onDeleteExpense: (id: number) => void;
}

const categoryColors: Record<string, string> = {
  Food: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  Transport:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  Utilities:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  Shopping: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  Entertainment:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  Health:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
  Education: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100",
  Other:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
};

export function ExpenseTable({
  expenses,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
}: ExpenseTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "date", desc: true }, // Sort by date descending (recent first)
    { id: "created_at", desc: true }, // Then by created_at descending for same date
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      created_at: false, // Hiding created_at column by default
    });
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterValue, setFilterValue] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [editingExpense, setEditingExpense] = React.useState<Expense | null>(
    null,
  );
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const columns: ColumnDef<Expense>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted"
        >
          Date
          <IconChevronDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("description");
        return (
          <span className="text-sm">
            {description ? (
              <span>{String(description)}</span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </span>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = String(row.getValue("category"));
        return (
          <Badge
            className={categoryColors[category] || "bg-gray-100 text-gray-800"}
          >
            {category}
          </Badge>
        );
      },
    },
    {
      accessorKey: "payment_method",
      header: "Payment Method",
      cell: ({ row }) => (
        <span className="text-sm">
          {String(row.getValue("payment_method"))}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <IconChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const { selectedCurrency } = useNav();
        const expense = row.original;

        // Show converted amount if available, otherwise show original amount
        const displayAmount = expense.converted_amount ?? expense.amount;
        const displayCurrency = expense.target_currency ?? selectedCurrency;
        const symbol = getCurrencySymbol(displayCurrency);

        return (
          <div className="text-right font-medium">
            {symbol} {Number(displayAmount).toFixed(2)}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => {
        const created = row.getValue("created_at");
        if (!created) return "";
        const date = new Date(String(created));
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const expense = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <IconDotsVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setEditingExpense(expense);
                  setDrawerOpen(true);
                }}
              >
                <IconEdit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  if (expense.id) {
                    onDeleteExpense(expense.id);
                    toast.success("Expense deleted successfully");
                  }
                }}
              >
                <IconTrash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredExpenses = React.useMemo(() => {
    let result = expenses;

    if (categoryFilter !== "all") {
      result = result.filter((exp) => exp.category === categoryFilter);
    }

    if (filterValue) {
      result = result.filter((exp) => {
        const searchLower = filterValue.toLowerCase();
        return (
          exp.description?.toLowerCase().includes(searchLower) ||
          exp.category.toLowerCase().includes(searchLower) ||
          exp.payment_method.toLowerCase().includes(searchLower)
        );
      });
    }

    return result;
  }, [expenses, categoryFilter, filterValue]);

  const table = useReactTable({
    data: filteredExpenses,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleAddExpense = (expense: Expense) => {
    onAddExpense(expense);
    toast.success("Expense added successfully");
  };

  const handleUpdateExpense = (expense: Expense) => {
    onUpdateExpense(expense);
    toast.success("Expense updated successfully");
    setEditingExpense(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Food">Food & Dining</SelectItem>
            <SelectItem value="Transport">Transport</SelectItem>
            <SelectItem value="Utilities">Utilities</SelectItem>
            <SelectItem value="Shopping">Shopping</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
            <SelectItem value="Health">Health & Medical</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Drawer
          open={drawerOpen}
          onOpenChange={(open) => {
            setDrawerOpen(open);
            // Reset editing state when drawer closes
            if (!open) {
              setEditingExpense(null);
            }
          }}
        >
          <DrawerTrigger asChild>
            <Button
              onClick={() => {
                setEditingExpense(null);
                setDrawerOpen(true);
              }}
            >
              <IconPlus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </DrawerTrigger>
          <ExpenseForm
            expense={editingExpense || undefined}
            onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
            onOpenChange={setDrawerOpen}
          />
        </Drawer>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <IconLayoutColumns className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No expenses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} expense(s) selected.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
