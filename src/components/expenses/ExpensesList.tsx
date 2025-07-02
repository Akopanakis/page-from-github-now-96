import React, { useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { expenseAPI } from "@/api/expenses";
import { Expense } from "@/types/expense";
import { useFormatCurrency } from "@/utils/exportUtils";

type SortField = "description" | "amount" | "date";
type SortDirection = "asc" | "desc";

interface ExpensesListProps {
  expenses: Expense[];
  onExpenseEdit?: (expense: Expense) => void;
  onExpenseDeleted?: () => void;
}

export default function ExpensesList({
  expenses,
  onExpenseEdit,
  onExpenseDeleted,
}: ExpensesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const formatCurrency = useFormatCurrency();

  // Debounced search functionality
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and sort expenses
  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses;

    // Apply search filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = expenses.filter((expense) =>
        expense.description.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "description":
          comparison = a.description.localeCompare(b.description);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [expenses, debouncedSearchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = useCallback(
    async (expense: Expense) => {
      try {
        expenseAPI.remove(expense.id);
        toast.success("Η δαπάνη διαγράφηκε επιτυχώς!");
        if (onExpenseDeleted) {
          onExpenseDeleted();
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
        toast.error("Σφάλμα κατά τη διαγραφή της δαπάνης");
      }
    },
    [onExpenseDeleted],
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("el-GR");
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  const totalAmount = useMemo(() => {
    return filteredAndSortedExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
  }, [filteredAndSortedExpenses]);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Λίστα Δαπανών</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Αναζήτηση δαπανών..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Badge variant="secondary" className="text-sm">
            Σύνολο: {formatCurrency(totalAmount)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {filteredAndSortedExpenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {debouncedSearchQuery
                ? "Δεν βρέθηκαν δαπάνες"
                : "Δεν υπάρχουν δαπάνες"}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleSort("description")}
                  >
                    <div className="flex items-center gap-2">
                      Περιγραφή
                      {getSortIcon("description")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center gap-2">
                      Ποσό
                      {getSortIcon("amount")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center gap-2">
                      Ημερομηνία
                      {getSortIcon("date")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Ενέργειες</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">
                      {expense.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {formatCurrency(expense.amount)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(expense.date)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onExpenseEdit?.(expense)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Διαγραφή Δαπάνης
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Είστε σίγουροι ότι θέλετε να διαγράψετε την
                                δαπάνη "{expense.description}"; Αυτή η ενέργεια
                                δεν μπορεί να αναιρεθεί.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Ακύρωση</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(expense)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Διαγραφή
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
