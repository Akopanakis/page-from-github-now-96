import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Search,
  Calendar,
  Target,
  Award,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/layout/PageLayout";
import MetricCard from "@/components/ui/MetricCard";
import {
  LineChart,
  AreaChart,
  BarChart,
  PieChart as PieChartComponent,
  ChartGrid,
} from "@/components/charts/EnhancedCharts";
import { generateAllStubData } from "@/utils/stubData";

const FinancialAnalytics: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Generate realistic data
  const [allData] = useState(() => generateAllStubData());
  const [kpis] = useState(() => [
    {
      id: "revenue",
      title: language === "el" ? "Συνολικά Έσοδα" : "Total Revenue",
      value: "€850,000",
      change: "+12.5%",
      trend: "up" as const,
      icon: "euro",
      color: "blue",
      description: language === "el" ? "Μηνιαίος τζίρος" : "Monthly turnover",
    },
    {
      id: "costs",
      title: language === "el" ? "Συνολικά Κόστη" : "Total Costs",
      value: "€680,000",
      change: "+8.2%",
      trend: "up" as const,
      icon: "trending-down",
      color: "red",
      description:
        language === "el" ? "Λειτουργικά έξοδα" : "Operating expenses",
    },
    {
      id: "profit",
      title: language === "el" ? "Καθαρό Κέρδος" : "Net Profit",
      value: "€170,000",
      change: "+20.1%",
      trend: "up" as const,
      icon: "trending-up",
      color: "green",
      description: language === "el" ? "Μετά από φόρους" : "After taxes",
    },
    {
      id: "margin",
      title: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
      value: "20.0%",
      change: "+2.1%",
      trend: "up" as const,
      icon: "percent",
      color: "purple",
      description:
        language === "el" ? "Ποσοστό κερδοφορίας" : "Profitability ratio",
    },
    {
      id: "customers",
      title: language === "el" ? "Ενεργοί Πελάτες" : "Active Customers",
      value: "245",
      change: "+15.3%",
      trend: "up" as const,
      icon: "users",
      color: "cyan",
      description: language === "el" ? "Μηνιαίοι πελάτες" : "Monthly customers",
    },
    {
      id: "orders",
      title: language === "el" ? "Παραγγελίες" : "Orders",
      value: "1,240",
      change: "+18.7%",
      trend: "up" as const,
      icon: "shopping-cart",
      color: "orange",
      description: language === "el" ? "Σύνολο παραγγελιών" : "Total orders",
    },
    {
      id: "volume",
      title: language === "el" ? "Όγκος Πωλήσεων" : "Sales Volume",
      value: "12.5 tons",
      change: "+5.2%",
      trend: "up" as const,
      icon: "package",
      color: "indigo",
      description: language === "el" ? "Φυσικός όγκος" : "Physical volume",
    },
  ]);
  const [expenses] = useState(() => allData.expenses);
  const [forecastData] = useState(() => allData.analytics);
  const [chartData] = useState(() => ({
    line: allData.analytics,
    bar: allData.analytics,
    pie: allData.analytics,
    area: allData.analytics,
  }));

  const pageNavItems = [
    {
      id: "overview",
      label: language === "el" ? "Επισκόπηση" : "Overview",
      href: "#overview",
      icon: BarChart3,
      badge: "8",
    },
    {
      id: "trends",
      label: language === "el" ? "Τάσεις" : "Trends",
      href: "#trends",
      icon: TrendingUp,
      badge: "12M",
    },
    {
      id: "breakdown",
      label: language === "el" ? "Ανάλυση" : "Breakdown",
      href: "#breakdown",
      icon: PieChart,
    },
    {
      id: "forecast",
      label: language === "el" ? "Προβλέψεις" : "Forecast",
      href: "#forecast",
      icon: Target,
    },
    {
      id: "transactions",
      label: language === "el" ? "Συναλλαγές" : "Transactions",
      href: "#transactions",
      icon: DollarSign,
      badge: expenses.length.toString(),
    },
  ];

  const breadcrumbItems = [
    { id: "analytics", label: language === "el" ? "Αναλυτικά" : "Analytics" },
    {
      id: "financial",
      label: language === "el" ? "Χρηματοοικονομικά" : "Financial",
      isActive: true,
    },
  ];

  // Filter expenses based on search and category
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const exportData = (type: "pdf" | "excel" | "csv") => {
    // Implementation for data export
    console.log(`Exporting ${type} format`);
  };

  return (
    <PageLayout
      title={
        language === "el"
          ? "Χρηματοοικονομικά Analytics"
          : "Financial Analytics"
      }
      subtitle={
        language === "el"
          ? "Προχωρημένη ανάλυση οικονομικών δεδομένων ��αι προβλέψεις"
          : "Advanced financial data analysis and forecasting"
      }
      pageNavItems={pageNavItems}
      breadcrumbItems={breadcrumbItems}
      showTOC={true}
      onNavigate={(href) => {
        const tab = href.replace("#", "");
        setActiveTab(tab);
      }}
    >
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">
                  {language === "el" ? "Τρέχων Μήνας" : "Current Month"}
                </SelectItem>
                <SelectItem value="last-month">
                  {language === "el" ? "Προηγούμενος Μήνας" : "Last Month"}
                </SelectItem>
                <SelectItem value="quarter">
                  {language === "el" ? "Τρίμηνο" : "Quarter"}
                </SelectItem>
                <SelectItem value="year">
                  {language === "el" ? "Έτος" : "Year"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportData("excel")}>
              <Download className="w-4 h-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline" onClick={() => exportData("pdf")}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              {language === "el" ? "Επισκόπηση" : "Overview"}
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {language === "el" ? "Τάσεις" : "Trends"}
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              {language === "el" ? "Ανάλυση" : "Breakdown"}
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              {language === "el" ? "Προβλέψεις" : "Forecast"}
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              {language === "el" ? "Συναλλαγές" : "Transactions"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div id="overview">
              <h2 className="text-2xl font-bold mb-4">
                {language === "el"
                  ? "Επισκόπηση Επιδόσεων"
                  : "Performance Overview"}
              </h2>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {kpis.slice(0, 4).map((kpi) => (
                  <MetricCard
                    key={kpi.id}
                    title={kpi.name}
                    value={kpi.value}
                    unit={kpi.unit}
                    change={kpi.variance}
                    trend={kpi.trend}
                    color={kpi.variance >= 0 ? "success" : "danger"}
                    target={kpi.target}
                    benchmark={kpi.benchmark}
                    tooltip={`${kpi.name} για την περίοδο ${kpi.period}`}
                    icon={
                      kpi.category === "financial"
                        ? DollarSign
                        : kpi.category === "operational"
                          ? BarChart3
                          : kpi.category === "quality"
                            ? Award
                            : TrendingUp
                    }
                  />
                ))}
              </div>

              {/* Performance Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <div>
                        <h4 className="font-semibold text-red-900">
                          {language === "el"
                            ? "Απόκλιση από Στόχου��"
                            : "Target Deviation"}
                        </h4>
                        <p className="text-sm text-red-700">
                          {language === "el"
                            ? "Τα έσοδα είναι 8.7% κάτω από τον στόχο"
                            : "Revenue is 8.7% below target"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Info className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-semibold text-blue-900">
                          {language === "el"
                            ? "Βελτίωση Ποιότητας"
                            : "Quality Improvement"}
                        </h4>
                        <p className="text-sm text-blue-700">
                          {language === "el"
                            ? "Ο δείκτης ποιότητας αυξήθηκε κατά 2.1%"
                            : "Quality score increased by 2.1%"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Grid */}
              <ChartGrid cols={2}>
                <LineChart
                  title={
                    language === "el"
                      ? "Μηνιαία Χρηματοοικονομικά Δεδομένα"
                      : "Monthly Financial Data"
                  }
                  data={chartData.line}
                  dataKeys={[
                    {
                      key: "έσοδα",
                      color: "#10b981",
                      name: language === "el" ? "Έσοδα" : "Revenue",
                    },
                    {
                      key: "κόστος",
                      color: "#ef4444",
                      name: language === "el" ? "Κόστος" : "Costs",
                    },
                    {
                      key: "κέρδος",
                      color: "#3b82f6",
                      name: language === "el" ? "Κέρδος" : "Profit",
                    },
                  ]}
                />

                <BarChart
                  title={
                    language === "el"
                      ? "Κόστος ανά Κατηγορία"
                      : "Costs by Category"
                  }
                  data={chartData.bar}
                  dataKey="amount"
                  compareKey="budget"
                  barColor="#3b82f6"
                  compareColor="#e5e7eb"
                />
              </ChartGrid>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div id="trends">
              <h2 className="text-2xl font-bold mb-4">
                {language === "el" ? "Ανάλυση Τάσεων" : "Trend Analysis"}
              </h2>

              <ChartGrid cols={1}>
                <AreaChart
                  title={
                    language === "el"
                      ? "Πραγματικά vs Προβλέψεις"
                      : "Actual vs Forecast"
                  }
                  data={chartData.area}
                  dataKeys={[
                    {
                      key: "actual",
                      color: "#10b981",
                      name: language === "el" ? "Πραγματικά" : "Actual",
                    },
                    {
                      key: "forecast",
                      color: "#3b82f6",
                      name: language === "el" ? "Πρόβλεψη" : "Forecast",
                    },
                    {
                      key: "target",
                      color: "#f59e0b",
                      name: language === "el" ? "Στόχος" : "Target",
                    },
                  ]}
                />
              </ChartGrid>

              {/* Trend KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {kpis.slice(4, 7).map((kpi) => (
                  <MetricCard
                    key={kpi.id}
                    title={kpi.name}
                    value={kpi.value}
                    unit={kpi.unit}
                    change={kpi.variance}
                    trend={kpi.trend}
                    color={kpi.variance >= 0 ? "success" : "warning"}
                    size="sm"
                    gradient={true}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-6">
            <div id="breakdown">
              <h2 className="text-2xl font-bold mb-4">
                {language === "el" ? "Ανάλυση Κατανομής" : "Breakdown Analysis"}
              </h2>

              <ChartGrid cols={2}>
                <PieChartComponent
                  title={
                    language === "el"
                      ? "Κατανομή Εξόδων"
                      : "Expense Distribution"
                  }
                  data={chartData.pie}
                  dataKey="value"
                  nameKey="name"
                />

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "el"
                        ? "Κατηγορίες Εξόδων"
                        : "Expense Categories"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {chartData.pie.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{item.value}%</div>
                            <div className="text-sm text-gray-500">
                              €{(item.value * 1000).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ChartGrid>
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <div id="forecast">
              <h2 className="text-2xl font-bold mb-4">
                {language === "el"
                  ? "Προβλέψεις & Προγραμματισμός"
                  : "Forecasting & Planning"}
              </h2>

              {/* Forecast accuracy metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <MetricCard
                  title={
                    language === "el"
                      ? "Ακρίβεια Πρόβλεψης"
                      : "Forecast Accuracy"
                  }
                  value={87.3}
                  unit="%"
                  change={2.1}
                  trend="up"
                  color="success"
                  icon={Target}
                />
                <MetricCard
                  title={
                    language === "el"
                      ? "Εμπιστοσύνη Μοντέλου"
                      : "Model Confidence"
                  }
                  value={92.8}
                  unit="%"
                  change={-0.5}
                  trend="stable"
                  color="info"
                  icon={Award}
                />
                <MetricCard
                  title={
                    language === "el"
                      ? "Απόκλιση από Πρόβλεψη"
                      : "Forecast Variance"
                  }
                  value={4.7}
                  unit="%"
                  change={-1.2}
                  trend="down"
                  color="warning"
                  icon={TrendingDown}
                />
              </div>

              <LineChart
                title={
                  language === "el" ? "Πρόβλεψη 12 Μηνών" : "12-Month Forecast"
                }
                data={forecastData.filter((item) => item.category === "Έσοδα")}
                dataKeys={[
                  {
                    key: "actual",
                    color: "#10b981",
                    name: language === "el" ? "Πραγματικά" : "Actual",
                  },
                  {
                    key: "forecast",
                    color: "#3b82f6",
                    name: language === "el" ? "Πρόβλεψη" : "Forecast",
                  },
                ]}
                height={400}
              />
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div id="transactions">
              <h2 className="text-2xl font-bold mb-4">
                {language === "el"
                  ? "Ιστορικό Συναλλαγών"
                  : "Transaction History"}
              </h2>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder={
                      language === "el"
                        ? "Αναζήτηση συναλλαγών..."
                        : "Search transactions..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {language === "el"
                        ? "Όλες οι κατηγορίες"
                        : "All categories"}
                    </SelectItem>
                    <SelectItem value="Πρώτες Ύλες">Πρώτες Ύλες</SelectItem>
                    <SelectItem value="Εργατικά">Εργατικά</SelectItem>
                    <SelectItem value="Ενέργεια">Ενέργεια</SelectItem>
                    <SelectItem value="Μεταφορά">Μεταφορά</SelectItem>
                    <SelectItem value="Συσκευασία">Συσκευασία</SelectItem>
                    <SelectItem value="Λειτουργικά">Λειτουργικά</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Transactions Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          {language === "el" ? "Ημερομηνία" : "Date"}
                        </TableHead>
                        <TableHead>
                          {language === "el" ? "Περιγραφή" : "Description"}
                        </TableHead>
                        <TableHead>
                          {language === "el" ? "Κατηγορία" : "Category"}
                        </TableHead>
                        <TableHead>
                          {language === "el" ? "Προμηθευτής" : "Supplier"}
                        </TableHead>
                        <TableHead className="text-right">
                          {language === "el" ? "Ποσό" : "Amount"}
                        </TableHead>
                        <TableHead>
                          {language === "el" ? "Κατάσταση" : "Status"}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExpenses.slice(0, 20).map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell className="font-medium">
                            {new Date(expense.date).toLocaleDateString("el-GR")}
                          </TableCell>
                          <TableCell>{expense.description}</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell>{expense.supplier}</TableCell>
                          <TableCell className="text-right font-medium">
                            €{expense.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                expense.status === "paid"
                                  ? "default"
                                  : expense.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {expense.status === "paid"
                                ? language === "el"
                                  ? "Πληρώθηκε"
                                  : "Paid"
                                : expense.status === "pending"
                                  ? language === "el"
                                    ? "Εκκρεμεί"
                                    : "Pending"
                                  : language === "el"
                                    ? "Ληξιπρόθεσμη"
                                    : "Overdue"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Pagination info */}
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>
                  {language === "el"
                    ? `Εμφάνιση 1-20 από ${filteredExpenses.length} συναλλαγές`
                    : `Showing 1-20 of ${filteredExpenses.length} transactions`}
                </span>
                <Button variant="outline" size="sm">
                  {language === "el" ? "Φόρτωση περισσότερ��ν" : "Load more"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default FinancialAnalytics;
