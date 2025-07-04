import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  Target,
  Activity,
  Globe,
  Zap,
  Brain,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Award,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Calendar,
  MapPin,
  PieChart,
  LineChart,
  BarChart,
  Layers,
  Database,
  Cpu,
  TrendingUp as TrendingLeftUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  Calculator,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { realisticSeafoodData } from "@/mock/realisticSeafoodData";

interface BusinessIntelligenceDashboardProps {
  className?: string;
}

const BusinessIntelligenceDashboard: React.FC<
  BusinessIntelligenceDashboardProps
> = ({ className = "" }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR")}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Advanced KPI calculations
  const businessMetrics = {
    // Financial KPIs
    revenue: {
      current: 2450000,
      previous: 2280000,
      target: 2600000,
      growth: ((2450000 - 2280000) / 2280000) * 100,
    },
    profit: {
      current: 490000,
      previous: 456000,
      margin: (490000 / 2450000) * 100,
      growth: ((490000 - 456000) / 456000) * 100,
    },
    costs: {
      current: 1960000,
      previous: 1824000,
      perUnit: 1960000 / 2450,
      growth: ((1960000 - 1824000) / 1824000) * 100,
    },

    // Operational KPIs
    efficiency: {
      current: 87.5,
      previous: 85.2,
      target: 90.0,
      trend: "improving",
    },
    quality: {
      current: 94.2,
      previous: 92.8,
      target: 95.0,
      rejectRate: 5.8,
    },
    inventory: {
      turnover: 6.8,
      daysOnHand: 53.7,
      value: 450000,
      accuracy: 96.5,
    },

    // Customer KPIs
    customerSatisfaction: 4.6,
    retention: 89.2,
    acquisition: 15.8,
    lifetime: 18500,

    // Market KPIs
    marketShare: 12.5,
    competitiveIndex: 78.2,
    brandValue: 3200000,

    // Sustainability KPIs
    carbonFootprint: 2.1,
    sustainabilityScore: 87,
    wasteReduction: 23.5,
    energyEfficiency: 91.2,
  };

  // Advanced widgets
  const KPICard = ({
    title,
    value,
    previous,
    target,
    unit,
    icon: Icon,
    color,
    trend,
  }: any) => {
    const change = previous ? ((value - previous) / previous) * 100 : 0;
    const targetProgress = target ? (value / target) * 100 : 0;

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              {change > 0 ? (
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              ) : change < 0 ? (
                <ArrowDownRight className="w-4 h-4 text-red-600" />
              ) : (
                <Minus className="w-4 h-4 text-gray-400" />
              )}
              <span
                className={`text-sm font-medium ${
                  change > 0
                    ? "text-green-600"
                    : change < 0
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {change > 0 ? "+" : ""}
                {change.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="mb-3">
            <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
            <div className="text-2xl font-bold text-gray-900">
              {typeof value === "number"
                ? unit === "€"
                  ? formatCurrency(value)
                  : unit === "%"
                    ? formatPercentage(value)
                    : `${value.toLocaleString()}${unit || ""}`
                : value}
            </div>
          </div>

          {target && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {language === "el" ? "Στόχος:" : "Target:"}{" "}
                  {unit === "€"
                    ? formatCurrency(target)
                    : `${target}${unit || ""}`}
                </span>
                <span>{targetProgress.toFixed(0)}%</span>
              </div>
              <Progress value={Math.min(targetProgress, 100)} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const TrendChart = ({ title, data, color = "blue" }: any) => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-32">
        <div className="flex items-end justify-between h-full space-x-1">
          {data.map((value: number, index: number) => (
            <div
              key={index}
              className={`bg-${color}-500 rounded-t`}
              style={{
                height: `${(value / Math.max(...data)) * 100}%`,
                minHeight: "2px",
                width: `${100 / data.length - 1}%`,
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const MetricComparison = ({
    title,
    current,
    previous,
    unit,
    icon: Icon,
  }: any) => {
    const change = ((current - previous) / previous) * 100;

    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-gray-600" />
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-sm text-gray-600">
              {unit === "€"
                ? formatCurrency(current)
                : `${current}${unit || ""}`}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div
            className={`flex items-center ${
              change > 0
                ? "text-green-600"
                : change < 0
                  ? "text-red-600"
                  : "text-gray-500"
            }`}
          >
            {change > 0 ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : change < 0 ? (
              <TrendingDown className="w-4 h-4 mr-1" />
            ) : (
              <Minus className="w-4 h-4 mr-1" />
            )}
            <span className="font-medium">
              {change > 0 ? "+" : ""}
              {change.toFixed(1)}%
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {language === "el" ? "vs προηγ." : "vs prev"}
          </div>
        </div>
      </div>
    );
  };

  const AlertsWidget = () => {
    const alerts = [
      {
        type: "warning",
        title: language === "el" ? "Χαμηλό Απόθεμα" : "Low Inventory",
        message:
          language === "el"
            ? "Τσιπούρα κάτω από 100kg"
            : "Sea bream below 100kg",
        time: "5 min ago",
        severity: "medium",
      },
      {
        type: "success",
        title: language === "el" ? "Στόχος Επιτεύχθηκε" : "Target Achieved",
        message:
          language === "el"
            ? "Μηνιαίος στόχος πωλήσεων"
            : "Monthly sales target",
        time: "1 hour ago",
        severity: "low",
      },
      {
        type: "error",
        title: language === "el" ? "Ποιοτικό Πρόβλημα" : "Quality Issue",
        message:
          language === "el"
            ? "Παρτίδα SB-2024-003 απορρίφθηκε"
            : "Batch SB-2024-003 rejected",
        time: "2 hours ago",
        severity: "high",
      },
    ];

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
              {language === "el" ? "Ειδοποιήσεις" : "Alerts"}
            </span>
            <Badge variant="secondary">{alerts.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert, index) => (
            <Alert
              key={index}
              className={
                alert.type === "error"
                  ? "border-red-200 bg-red-50"
                  : alert.type === "warning"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-green-200 bg-green-50"
              }
            >
              <div className="flex items-start space-x-3">
                {alert.type === "error" ? (
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                ) : alert.type === "warning" ? (
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{alert.title}</div>
                  <AlertDescription className="text-xs mt-1">
                    {alert.message}
                  </AlertDescription>
                  <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                </div>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>
    );
  };

  const PredictiveAnalytics = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Brain className="w-4 h-4 mr-2 text-purple-600" />
          {language === "el" ? "Προβλεπτική Ανάλυση" : "Predictive Analytics"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {language === "el"
                ? "Πρόβλεψη Πωλήσεων (30 ημέρες)"
                : "Sales Forecast (30 days)"}
            </span>
            <span className="font-semibold">{formatCurrency(890000)}</span>
          </div>
          <Progress value={73} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>73% {language === "el" ? "βεβαιότητα" : "confidence"}</span>
            <span>
              +8.5% {language === "el" ? "vs τρέχων μήνας" : "vs current month"}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {language === "el"
                ? "Πιθανότητα Στόχου Q1"
                : "Q1 Target Probability"}
            </span>
            <span className="font-semibold text-green-600">86%</span>
          </div>
          <Progress value={86} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {language === "el" ? "Κίνδυνος Inventory" : "Inventory Risk"}
            </span>
            <span className="font-semibold text-yellow-600">
              {language === "el" ? "Μέτριος" : "Medium"}
            </span>
          </div>
          <Progress value={45} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );

  const CompetitiveAnalysis = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Target className="w-4 h-4 mr-2 text-blue-600" />
          {language === "el" ? "Ανταγωνιστική Ανάλυση" : "Competitive Analysis"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {language === "el" ? "Μερίδιο Αγοράς" : "Market Share"}
            </span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">12.5%</span>
              <TrendingUp className="w-3 h-3 text-green-600" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">
              {language === "el"
                ? "Ανταγωνιστικός Δείκτης"
                : "Competitive Index"}
            </span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">78.2</span>
              <Badge className="bg-green-100 text-green-800 text-xs">
                {language === "el" ? "Καλό" : "Good"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">
              {language === "el" ? "Τιμολογιακή Θέση" : "Price Position"}
            </span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">+5.2%</span>
              <Badge className="bg-blue-100 text-blue-800 text-xs">
                {language === "el" ? "Premium" : "Premium"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="text-xs text-gray-600 mb-2">
            {language === "el" ? "Κορυφαίοι Ανταγωνιστές" : "Top Competitors"}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Nireus</span>
              <span>18.5%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Selonda</span>
              <span>12.3%</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-blue-600">
              <span>KostoPro</span>
              <span>12.5%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el"
              ? "Business Intelligence"
              : "Business Intelligence"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Προχωρημένη ανάλυση και επιχειρηματική νοημοσύνη"
              : "Advanced analytics and business intelligence"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {language === "el" ? "Τελευταία ενημέρωση:" : "Last update:"}{" "}
            {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`}
            />
            {autoRefresh
              ? language === "el"
                ? "Auto"
                : "Auto"
              : language === "el"
                ? "Manual"
                : "Manual"}
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Εξαγωγή" : "Export"}
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {language === "el" ? "Χρονικό Διάστημα:" : "Time Range:"}
              </span>
              <div className="flex space-x-1">
                {[
                  { id: "day", label: language === "el" ? "Ημέρα" : "Day" },
                  {
                    id: "week",
                    label: language === "el" ? "Εβδομάδα" : "Week",
                  },
                  { id: "month", label: language === "el" ? "Μήνας" : "Month" },
                  {
                    id: "quarter",
                    label: language === "el" ? "Τρίμηνο" : "Quarter",
                  },
                  { id: "year", label: language === "el" ? "Έτος" : "Year" },
                ].map((range) => (
                  <Button
                    key={range.id}
                    size="sm"
                    variant={timeRange === range.id ? "default" : "outline"}
                    onClick={() => setTimeRange(range.id)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost">
                <Filter className="w-4 h-4 mr-2" />
                {language === "el" ? "Φίλτρα" : "Filters"}
              </Button>
              <Button size="sm" variant="ghost">
                <Settings className="w-4 h-4 mr-2" />
                {language === "el" ? "Ρυθμίσεις" : "Settings"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="financial">
            {language === "el" ? "Οικονομικά" : "Financial"}
          </TabsTrigger>
          <TabsTrigger value="operational">
            {language === "el" ? "Λειτουργικά" : "Operational"}
          </TabsTrigger>
          <TabsTrigger value="predictive">
            {language === "el" ? "Προβλεπτικά" : "Predictive"}
          </TabsTrigger>
          <TabsTrigger value="competitive">
            {language === "el" ? "Ανταγωνισμός" : "Competitive"}
          </TabsTrigger>
          <TabsTrigger value="insights">
            {language === "el" ? "Insights" : "Insights"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Executive KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title={language === "el" ? "Συνολικά Έσοδα" : "Total Revenue"}
              value={businessMetrics.revenue.current}
              previous={businessMetrics.revenue.previous}
              target={businessMetrics.revenue.target}
              unit="€"
              icon={DollarSign}
              color="from-green-500 to-emerald-600"
            />
            <KPICard
              title={language === "el" ? "Καθαρό Κέρδος" : "Net Profit"}
              value={businessMetrics.profit.current}
              previous={businessMetrics.profit.previous}
              unit="€"
              icon={TrendingUp}
              color="from-blue-500 to-indigo-600"
            />
            <KPICard
              title={language === "el" ? "Αποδοτικότητα" : "Efficiency"}
              value={businessMetrics.efficiency.current}
              previous={businessMetrics.efficiency.previous}
              target={businessMetrics.efficiency.target}
              unit="%"
              icon={Target}
              color="from-purple-500 to-pink-600"
            />
            <KPICard
              title={
                language === "el"
                  ? "Ικανοποίηση Πελατών"
                  : "Customer Satisfaction"
              }
              value={businessMetrics.customerSatisfaction}
              target={5.0}
              unit="/5"
              icon={Star}
              color="from-orange-500 to-red-600"
            />
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    {language === "el"
                      ? "Τάσεις Επιδόσεων"
                      : "Performance Trends"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Διαδραστικό γράφημα επιδόσεων"
                          : "Interactive performance chart"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TrendChart
                  title={language === "el" ? "Πωλήσεις" : "Sales"}
                  data={[65, 72, 68, 75, 82, 79, 88]}
                  color="green"
                />
                <TrendChart
                  title={language === "el" ? "Κόστη" : "Costs"}
                  data={[45, 48, 52, 49, 46, 51, 47]}
                  color="red"
                />
                <TrendChart
                  title={language === "el" ? "Κέρδη" : "Profits"}
                  data={[20, 24, 16, 26, 36, 28, 41]}
                  color="blue"
                />
              </div>
            </div>

            <div className="space-y-6">
              <AlertsWidget />
              <PredictiveAnalytics />
              <CompetitiveAnalysis />
            </div>
          </div>

          {/* Key Metrics Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-green-600" />
                {language === "el"
                  ? "Σύγκριση Μετρήσεων"
                  : "Metrics Comparison"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetricComparison
                  title={
                    language === "el" ? "Μηνιαία Έσοδα" : "Monthly Revenue"
                  }
                  current={businessMetrics.revenue.current}
                  previous={businessMetrics.revenue.previous}
                  unit="€"
                  icon={DollarSign}
                />
                <MetricComparison
                  title={
                    language === "el"
                      ? "Κύκλωση Αποθέματος"
                      : "Inventory Turnover"
                  }
                  current={businessMetrics.inventory.turnover}
                  previous={6.2}
                  unit=" φορές"
                  icon={Package}
                />
                <MetricComparison
                  title={language === "el" ? "Νέοι Πελάτες" : "New Customers"}
                  current={47}
                  previous={42}
                  unit=""
                  icon={Users}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title={language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin"}
              value={businessMetrics.profit.margin}
              unit="%"
              icon={TrendingUp}
              color="from-green-500 to-emerald-600"
            />
            <KPICard
              title={language === "el" ? "ROI" : "ROI"}
              value={23.5}
              unit="%"
              icon={Target}
              color="from-blue-500 to-indigo-600"
            />
            <KPICard
              title={language === "el" ? "Κόστος ανά Μονάδα" : "Cost per Unit"}
              value={businessMetrics.costs.perUnit}
              unit="€"
              icon={Calculator}
              color="from-orange-500 to-red-600"
            />
            <KPICard
              title={language === "el" ? "Ταμειακές Ροές" : "Cash Flow"}
              value={245000}
              unit="€"
              icon={DollarSign}
              color="from-purple-500 to-pink-600"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el"
                  ? "Χρηματοοικονομική Ανάλυση"
                  : "Financial Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <LineChart className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Λεπτομερή χρηματοοικονομικά γραφήματα"
                      : "Detailed financial charts"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title={
                language === "el" ? "Ποιότητα Προϊόντων" : "Product Quality"
              }
              value={businessMetrics.quality.current}
              target={businessMetrics.quality.target}
              unit="%"
              icon={Award}
              color="from-green-500 to-emerald-600"
            />
            <KPICard
              title={
                language === "el" ? "Ημέρε�� Αποθέματος" : "Inventory Days"
              }
              value={businessMetrics.inventory.daysOnHand}
              unit=" ημέρες"
              icon={Package}
              color="from-blue-500 to-indigo-600"
            />
            <KPICard
              title={
                language === "el"
                  ? "Ενεργειακή Αποδοτικότητα"
                  : "Energy Efficiency"
              }
              value={businessMetrics.energyEfficiency}
              unit="%"
              icon={Zap}
              color="from-yellow-500 to-orange-600"
            />
            <KPICard
              title={
                language === "el"
                  ? "Διαθεσιμότητα Στόλου"
                  : "Fleet Availability"
              }
              value={92.5}
              unit="%"
              icon={Activity}
              color="from-purple-500 to-pink-600"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el"
                  ? "Λειτουργική Ανάλυση"
                  : "Operational Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Settings className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Αναλυτικά λειτουργικών μετρήσεων"
                      : "Detailed operational metrics"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                {language === "el" ? "AI Προβλέψεις" : "AI Predictions"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Brain className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Προηγμένες AI προβλέψεις και μοντέλα"
                      : "Advanced AI predictions and models"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el"
                  ? "Ανταγωνιστική Ανάλυση"
                  : "Competitive Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Globe className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Λεπτομερής ανταγωνιστική ανάλυση"
                      : "Detailed competitive analysis"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-green-600" />
                {language === "el"
                  ? "Επιχειρηματικά Insights"
                  : "Business Insights"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Eye className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Αυτοματοποιημένα επιχειρηματικά insights"
                      : "Automated business insights"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessIntelligenceDashboard;
