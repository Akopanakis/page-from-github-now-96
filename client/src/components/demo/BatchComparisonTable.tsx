import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ArrowUpDown, Search, Filter, BarChart3, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchBatches, Batch } from "@/mock/batch";

type SortField =
  | "date"
  | "productName"
  | "profit"
  | "profitMargin"
  | "quantity";
type SortDirection = "asc" | "desc";

const BatchComparisonTable: React.FC = () => {
  const { language, currency } = useLanguage();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [filteredBatches, setFilteredBatches] = useState<Batch[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBatches().then((data) => {
      setBatches(data);
      setFilteredBatches(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    let filtered = batches.filter((batch) => {
      const matchesSearch =
        batch.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batch.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || batch.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort the filtered data
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortField) {
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "productName":
          aValue = a.productName;
          bValue = b.productName;
          break;
        case "profit":
          aValue = a.totalProfit;
          bValue = b.totalProfit;
          break;
        case "profitMargin":
          aValue = a.profitMargin;
          bValue = b.profitMargin;
          break;
        case "quantity":
          aValue = a.quantity;
          bValue = b.quantity;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    setFilteredBatches(filtered);
  }, [batches, searchTerm, statusFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === "el" ? "el-GR" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "el" ? "el-GR" : "en-US",
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "sold":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return language === "el" ? "Ολοκληρώθηκε" : "Completed";
      case "processing":
        return language === "el" ? "Επεξεργασία" : "Processing";
      case "sold":
        return language === "el" ? "Πουλήθηκε" : "Sold";
      default:
        return status;
    }
  };

  const totalStats = filteredBatches.reduce(
    (acc, batch) => ({
      totalRevenue: acc.totalRevenue + batch.totalRevenue,
      totalCost: acc.totalCost + batch.totalCost,
      totalProfit: acc.totalProfit + batch.totalProfit,
      totalQuantity: acc.totalQuantity + batch.quantity,
    }),
    { totalRevenue: 0, totalCost: 0, totalProfit: 0, totalQuantity: 0 },
  );

  const avgMargin =
    totalStats.totalRevenue > 0
      ? (totalStats.totalProfit / totalStats.totalRevenue) * 100
      : 0;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-600">
              {language === "el" ? "Συνολικός Τζίρος" : "Total Revenue"}
            </div>
            <div className="text-xl font-bold text-green-600">
              {formatCurrency(totalStats.totalRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-600">
              {language === "el" ? "Συνολικό Κόστος" : "Total Cost"}
            </div>
            <div className="text-xl font-bold text-red-600">
              {formatCurrency(totalStats.totalCost)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-600">
              {language === "el" ? "Συνολικό Κέρδος" : "Total Profit"}
            </div>
            <div className="text-xl font-bold text-blue-600">
              {formatCurrency(totalStats.totalProfit)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-600">
              {language === "el" ? "Μέσο Περιθώριο" : "Avg Margin"}
            </div>
            <div className="text-xl font-bold text-purple-600">
              {avgMargin.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>
              {language === "el" ? "Σύγκριση Παρτίδων" : "Batch Comparison"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder={
                  language === "el"
                    ? "Αναζήτηση παρτίδας..."
                    : "Search batches..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === "el" ? "Όλες" : "All"}
                  </SelectItem>
                  <SelectItem value="processing">
                    {language === "el" ? "Επεξεργασία" : "Processing"}
                  </SelectItem>
                  <SelectItem value="completed">
                    {language === "el" ? "Ολοκληρώθηκε" : "Completed"}
                  </SelectItem>
                  <SelectItem value="sold">
                    {language === "el" ? "Πουλήθηκε" : "Sold"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("date")}
                      className="h-auto p-0 font-semibold"
                    >
                      {language === "el" ? "Ημερομηνία" : "Date"}
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("productName")}
                      className="h-auto p-0 font-semibold"
                    >
                      {language === "el" ? "Προϊόν" : "Product"}
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-center">
                    {language === "el" ? "Κατάσταση" : "Status"}
                  </TableHead>
                  <TableHead className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("quantity")}
                      className="h-auto p-0 font-semibold"
                    >
                      {language === "el" ? "Ποσότητα" : "Quantity"}
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "el" ? "Κόστος/kg" : "Cost/kg"}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === "el" ? "Τιμή/kg" : "Price/kg"}
                  </TableHead>
                  <TableHead className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("profit")}
                      className="h-auto p-0 font-semibold"
                    >
                      {language === "el" ? "Συνολικό Κέρδος" : "Total Profit"}
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("profitMargin")}
                      className="h-auto p-0 font-semibold"
                    >
                      {language === "el" ? "Περιθώριο" : "Margin"}
                      <ArrowUpDown className="ml-2 w-4 h-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.length > 0 ? (
                  filteredBatches.map((batch) => (
                    <TableRow key={batch.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {formatDate(batch.date)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{batch.productName}</div>
                          <div className="text-sm text-gray-500">
                            {batch.id}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(batch.status)}>
                          {getStatusLabel(batch.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {batch.quantity} kg
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(batch.costPerKg)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(batch.pricePerKg)}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        {formatCurrency(batch.totalProfit)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-semibold ${batch.profitMargin > 30 ? "text-green-600" : batch.profitMargin > 20 ? "text-yellow-600" : "text-red-600"}`}
                        >
                          {batch.profitMargin.toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-gray-500"
                    >
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Δεν βρέθηκαν παρτίδες που να ταιριάζουν με τα κριτήρια αναζήτησης"
                          : "No batches found matching the search criteria"}
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchComparisonTable;
