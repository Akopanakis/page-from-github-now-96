import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Ship,
  Package,
  DollarSign,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  Zap,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Settings,
  Star,
  Gauge,
  Timer,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Fish,
  Anchor,
  Waves,
  Fuel,
  ThermometerSun,
  Scale,
  Truck,
  Factory,
  Globe,
  Leaf,
  Shield,
  FileText,
  Calculator,
  Navigation,
  Container,
  Heart,
  Briefcase,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface KPI {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  previousValue: number;
  change: number;
  trend: "up" | "down" | "stable";
  category:
    | "financial"
    | "operational"
    | "quality"
    | "sustainability"
    | "safety";
  status: "excellent" | "good" | "warning" | "critical";
  benchmark?: number;
  description: string;
}

interface PerformanceMetric {
  id: string;
  department: string;
  metric: string;
  current: number;
  target: number;
  unit: string;
  variance: number;
  trend: "up" | "down" | "stable";
  lastUpdated: Date;
}

interface PerformanceDashboardProps {
  className?: string;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Comprehensive KPI data
  const kpis: KPI[] = [
    {
      id: "revenue_growth",
      name: language === "el" ? "Αύξηση Εσόδων" : "Revenue Growth",
      value: 12.5,
      unit: "%",
      target: 15.0,
      previousValue: 11.2,
      change: 11.6,
      trend: "up",
      category: "financial",
      status: "good",
      benchmark: 10.8,
      description:
        language === "el"
          ? "Μηνιαίος ρυθμός αύξησης εσόδων"
          : "Monthly revenue growth rate",
    },
    {
      id: "profit_margin",
      name: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
      value: 23.8,
      unit: "%",
      target: 25.0,
      previousValue: 24.1,
      change: -1.2,
      trend: "down",
      category: "financial",
      status: "warning",
      benchmark: 22.5,
      description:
        language === "el" ? "Καθαρό περιθώριο κέρδους" : "Net profit margin",
    },
    {
      id: "catch_efficiency",
      name: language === "el" ? "Αποδοτικότητα Αλιείας" : "Catch Efficiency",
      value: 87.3,
      unit: "%",
      target: 90.0,
      previousValue: 85.6,
      change: 2.0,
      trend: "up",
      category: "operational",
      status: "good",
      benchmark: 84.2,
      description:
        language === "el"
          ? "Ποσοστό επιτυχημένης αλιείας"
          : "Successful catch percentage",
    },
    {
      id: "vessel_utilization",
      name: language === "el" ? "Αξιοποίηση Στόλου" : "Fleet Utilization",
      value: 82.1,
      unit: "%",
      target: 85.0,
      previousValue: 79.8,
      change: 2.9,
      trend: "up",
      category: "operational",
      status: "good",
      benchmark: 80.0,
      description:
        language === "el"
          ? "Ποσοστό αξιοποίησης στόλου"
          : "Fleet utilization rate",
    },
    {
      id: "quality_score",
      name: language === "el" ? "Δείκτης Ποιότητας" : "Quality Score",
      value: 94.2,
      unit: "%",
      target: 95.0,
      previousValue: 93.8,
      change: 0.4,
      trend: "up",
      category: "quality",
      status: "excellent",
      benchmark: 91.5,
      description:
        language === "el"
          ? "Συνολικός δείκτης ποιότητας"
          : "Overall quality index",
    },
    {
      id: "customer_satisfaction",
      name: language === "el" ? "Ικανοποίηση Πελατών" : "Customer Satisfaction",
      value: 91.7,
      unit: "%",
      target: 90.0,
      previousValue: 90.3,
      change: 1.5,
      trend: "up",
      category: "quality",
      status: "excellent",
      benchmark: 88.9,
      description:
        language === "el"
          ? "Ικανοποίηση πελατών"
          : "Customer satisfaction rating",
    },
    {
      id: "fuel_efficiency",
      name: language === "el" ? "Απόδοση Καυσίμων" : "Fuel Efficiency",
      value: 2.34,
      unit: "L/kg",
      target: 2.2,
      previousValue: 2.41,
      change: -2.9,
      trend: "up",
      category: "sustainability",
      status: "warning",
      benchmark: 2.45,
      description:
        language === "el"
          ? "Κατανάλωση καυσίμων ανά κιλό"
          : "Fuel consumption per kg caught",
    },
    {
      id: "sustainability_score",
      name: language === "el" ? "Δείκτης Βιωσιμότητας" : "Sustainability Score",
      value: 78.6,
      unit: "%",
      target: 80.0,
      previousValue: 76.2,
      change: 3.1,
      trend: "up",
      category: "sustainability",
      status: "good",
      benchmark: 75.3,
      description:
        language === "el"
          ? "Συνολικός δείκτης βιωσιμότητας"
          : "Overall sustainability index",
    },
    {
      id: "safety_incidents",
      name: language === "el" ? "Ατυχήματα Ασφαλείας" : "Safety Incidents",
      value: 2,
      unit: "incidents",
      target: 0,
      previousValue: 4,
      change: -50.0,
      trend: "up",
      category: "safety",
      status: "warning",
      benchmark: 3,
      description:
        language === "el"
          ? "Αριθμός ατυχημάτων τον μήνα"
          : "Number of safety incidents this month",
    },
    {
      id: "employee_productivity",
      name:
        language === "el"
          ? "Παραγωγικότητα Εργαζομένων"
          : "Employee Productivity",
      value: 115.8,
      unit: "%",
      target: 110.0,
      previousValue: 112.4,
      change: 3.0,
      trend: "up",
      category: "operational",
      status: "excellent",
      benchmark: 108.5,
      description:
        language === "el"
          ? "Παραγωγικότητα σε σχέση με στόχο"
          : "Productivity relative to target",
    },
    {
      id: "inventory_turnover",
      name: language === "el" ? "Κύκλος Αποθέματος" : "Inventory Turnover",
      value: 6.8,
      unit: "times/year",
      target: 7.0,
      previousValue: 6.5,
      change: 4.6,
      trend: "up",
      category: "operational",
      status: "good",
      benchmark: 6.2,
      description:
        language === "el"
          ? "Κύκλος αποθέματος ετησίως"
          : "Inventory turnover per year",
    },
    {
      id: "waste_reduction",
      name: language === "el" ? "Μείωση Απωλειών" : "Waste Reduction",
      value: 3.2,
      unit: "%",
      target: 3.0,
      previousValue: 3.6,
      change: -11.1,
      trend: "up",
      category: "sustainability",
      status: "warning",
      benchmark: 3.8,
      description:
        language === "el"
          ? "Ποσοστό απωλειών παραγωγής"
          : "Production waste percentage",
    },
  ];

  // Department performance metrics
  const departmentMetrics: PerformanceMetric[] = [
    {
      id: "production_volume",
      department: language === "el" ? "Παραγωγή" : "Production",
      metric: language === "el" ? "Όγκος Παραγωγής" : "Production Volume",
      current: 12847,
      target: 15000,
      unit: "kg",
      variance: -14.4,
      trend: "down",
      lastUpdated: new Date(),
    },
    {
      id: "fleet_performance",
      department: language === "el" ? "Στόλος" : "Fleet",
      metric: language === "el" ? "Επίδοση Στόλου" : "Fleet Performance",
      current: 87.3,
      target: 90.0,
      unit: "%",
      variance: -3.0,
      trend: "up",
      lastUpdated: new Date(),
    },
    {
      id: "sales_performance",
      department: language === "el" ? "Πωλήσεις" : "Sales",
      metric: language === "el" ? "Επίδοση Πωλήσεων" : "Sales Performance",
      current: 105.2,
      target: 100.0,
      unit: "%",
      variance: 5.2,
      trend: "up",
      lastUpdated: new Date(),
    },
    {
      id: "quality_control",
      department: language === "el" ? "Ποιότητα" : "Quality",
      metric: language === "el" ? "Έλεγχος Ποιότητας" : "Quality Control",
      current: 94.2,
      target: 95.0,
      unit: "%",
      variance: -0.8,
      trend: "stable",
      lastUpdated: new Date(),
    },
    {
      id: "logistics_efficiency",
      department: language === "el" ? "Logistics" : "Logistics",
      metric:
        language === "el" ? "Αποδοτικότητα Logistics" : "Logistics Efficiency",
      current: 91.5,
      target: 90.0,
      unit: "%",
      variance: 1.7,
      trend: "up",
      lastUpdated: new Date(),
    },
  ];

  // Auto refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const formatValue = (value: number, unit: string) => {
    if (unit === "%") {
      return `${value.toFixed(1)}%`;
    } else if (unit === "€") {
      return `€${value.toLocaleString("el-GR")}`;
    } else if (unit === "kg") {
      return `${value.toLocaleString("el-GR")}kg`;
    } else if (unit === "L/kg") {
      return `${value.toFixed(2)}L/kg`;
    } else if (unit === "times/year") {
      return `${value.toFixed(1)}x/year`;
    } else if (unit === "incidents") {
      return `${value} ${language === "el" ? "ατυχήματα" : "incidents"}`;
    }
    return `${value} ${unit}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: "text-green-600 bg-green-100",
      good: "text-blue-600 bg-blue-100",
      warning: "text-yellow-600 bg-yellow-100",
      critical: "text-red-600 bg-red-100",
    };
    return colors[status as keyof typeof colors] || "text-gray-600 bg-gray-100";
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") {
      return change > 0 ? (
        <ArrowUpRight className="w-4 h-4 text-green-600" />
      ) : (
        <ArrowDownRight className="w-4 h-4 text-red-600" />
      );
    } else if (trend === "down") {
      return change < 0 ? (
        <ArrowDownRight className="w-4 h-4 text-red-600" />
      ) : (
        <ArrowUpRight className="w-4 h-4 text-green-600" />
      );
    } else {
      return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "financial":
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case "operational":
        return <Activity className="w-5 h-5 text-blue-600" />;
      case "quality":
        return <Shield className="w-5 h-5 text-purple-600" />;
      case "sustainability":
        return <Leaf className="w-5 h-5 text-green-600" />;
      case "safety":
        return <Heart className="w-5 h-5 text-red-600" />;
      default:
        return <Target className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredKPIs =
    selectedCategory === "all"
      ? kpis
      : kpis.filter((kpi) => kpi.category === selectedCategory);

  // KPI Card Component
  const KPICard = ({ kpi }: { kpi: KPI }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getCategoryIcon(kpi.category)}
            <div>
              <h3 className="font-medium text-sm">{kpi.name}</h3>
              <p className="text-xs text-gray-500">{kpi.description}</p>
            </div>
          </div>
          <Badge className={getStatusColor(kpi.status)}>{kpi.status}</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold">
                {formatValue(kpi.value, kpi.unit)}
              </div>
              <div className="text-xs text-gray-500">
                {language === "el" ? "Στόχος:" : "Target:"}{" "}
                {formatValue(kpi.target, kpi.unit)}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {getTrendIcon(kpi.trend, kpi.change)}
              <span
                className={`text-sm font-medium ${
                  kpi.change > 0
                    ? "text-green-600"
                    : kpi.change < 0
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {Math.abs(kpi.change).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{language === "el" ? "Πρόοδος:" : "Progress:"}</span>
              <span>{((kpi.value / kpi.target) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={(kpi.value / kpi.target) * 100} className="h-2" />
          </div>

          {kpi.benchmark && (
            <div className="text-xs text-gray-500 pt-1 border-t">
              {language === "el" ? "Benchmark:" : "Benchmark:"}{" "}
              {formatValue(kpi.benchmark, kpi.unit)}
              <span
                className={`ml-2 ${
                  kpi.value > kpi.benchmark ? "text-green-600" : "text-red-600"
                }`}
              >
                ({kpi.value > kpi.benchmark ? "+" : ""}
                {(((kpi.value - kpi.benchmark) / kpi.benchmark) * 100).toFixed(
                  1,
                )}
                %)
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Category Summary Widget
  const CategorySummaryWidget = () => {
    const categories = [
      "financial",
      "operational",
      "quality",
      "sustainability",
      "safety",
    ];

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm">
            <Target className="w-4 h-4 mr-2 text-blue-600" />
            {language === "el" ? "Επισκόπηση Κατηγοριών" : "Category Overview"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => {
            const categoryKPIs = kpis.filter(
              (kpi) => kpi.category === category,
            );
            const avgScore =
              categoryKPIs.reduce(
                (sum, kpi) => sum + (kpi.value / kpi.target) * 100,
                0,
              ) / categoryKPIs.length;
            const excellentCount = categoryKPIs.filter(
              (kpi) => kpi.status === "excellent",
            ).length;

            return (
              <div key={category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(category)}
                    <span className="text-sm font-medium capitalize">
                      {language === "el"
                        ? category === "financial"
                          ? "Οικονομικά"
                          : category === "operational"
                            ? "Λειτουργικά"
                            : category === "quality"
                              ? "Ποιότητα"
                              : category === "sustainability"
                                ? "Βιωσιμότητα"
                                : "Ασφάλεια"
                        : category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold">
                      {avgScore.toFixed(1)}%
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {excellentCount}/{categoryKPIs.length}
                    </Badge>
                  </div>
                </div>
                <Progress value={avgScore} className="h-1" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  // Top Performers Widget
  const TopPerformersWidget = () => {
    const topPerformers = kpis
      .filter((kpi) => kpi.status === "excellent")
      .sort((a, b) => b.value / b.target - a.value / a.target)
      .slice(0, 5);

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm">
            <Award className="w-4 h-4 mr-2 text-yellow-600" />
            {language === "el" ? "Κορυφαίες Επιδόσεις" : "Top Performers"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {topPerformers.map((kpi, index) => (
            <div
              key={kpi.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-xs font-bold text-yellow-800">
                  {index + 1}
                </div>
                <span className="font-medium">{kpi.name}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">
                  {((kpi.value / kpi.target) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">
                  {formatValue(kpi.value, kpi.unit)}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  // Alerts Widget
  const AlertsWidget = () => {
    const criticalKPIs = kpis.filter(
      (kpi) => kpi.status === "critical" || kpi.status === "warning",
    );

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm">
            <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
            {language === "el" ? "Ειδοποιήσεις" : "Alerts"}
            <Badge variant="destructive" className="ml-2 text-xs">
              {criticalKPIs.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {criticalKPIs.slice(0, 5).map((kpi) => (
            <Alert
              key={kpi.id}
              className={
                kpi.status === "critical"
                  ? "border-red-200 bg-red-50"
                  : "border-yellow-200 bg-yellow-50"
              }
            >
              <AlertTriangle
                className={`h-4 w-4 ${
                  kpi.status === "critical" ? "text-red-600" : "text-yellow-600"
                }`}
              />
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{kpi.name}</span>
                  <span className="text-sm">
                    {formatValue(kpi.value, kpi.unit)}
                  </span>
                </div>
                <div className="text-xs mt-1">
                  {((kpi.value / kpi.target) * 100).toFixed(1)}%{" "}
                  {language === "el" ? "του στόχου" : "of target"}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el"
              ? "Dashboard Επιδόσεων"
              : "Performance Dashboard"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Παρακολούθηση KPIs και επιδόσεων σε πραγματικό χρόνο"
              : "Real-time KPI monitoring and performance tracking"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {language === "el" ? "Τελευταία ενημέρωση:" : "Last updated:"}{" "}
            {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLastUpdate(new Date())}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {language === "el" ? "Ανανέωση" : "Refresh"}
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Εξαγωγή" : "Export"}
          </Button>
          <Button size="sm">
            <Settings className="w-4 h-4 mr-2" />
            {language === "el" ? "Ρυθμίσεις" : "Settings"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="kpis">
            {language === "el" ? "KPIs" : "KPIs"}
          </TabsTrigger>
          <TabsTrigger value="departments">
            {language === "el" ? "Τμήματα" : "Departments"}
          </TabsTrigger>
          <TabsTrigger value="trends">
            {language === "el" ? "Τάσεις" : "Trends"}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {language === "el" ? "Αναφορές" : "Reports"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Summary Cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{kpis.length}</div>
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Συνολικά KPIs" : "Total KPIs"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">
                      {kpis.filter((kpi) => kpi.status === "excellent").length}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Εξαιρετικά" : "Excellent"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <div className="text-2xl font-bold text-yellow-600">
                      {kpis.filter((kpi) => kpi.status === "warning").length}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Προειδοποίηση" : "Warning"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-600">
                      {(
                        kpis.reduce(
                          (sum, kpi) => sum + (kpi.value / kpi.target) * 100,
                          0,
                        ) / kpis.length
                      ).toFixed(1)}
                      %
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Μέση Επίδοση" : "Avg Performance"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    {language === "el"
                      ? "Επισκόπηση Επιδόσεων"
                      : "Performance Overview"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Γράφημα επιδόσεων KPIs"
                          : "KPI performance chart"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <CategorySummaryWidget />
              <TopPerformersWidget />
              <AlertsWidget />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-6">
          {/* KPI Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="category">
                    {language === "el" ? "Κατηγορί��:" : "Category:"}
                  </Label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1 border rounded"
                  >
                    <option value="all">
                      {language === "el" ? "Όλες" : "All"}
                    </option>
                    <option value="financial">
                      {language === "el" ? "Οικονομικά" : "Financial"}
                    </option>
                    <option value="operational">
                      {language === "el" ? "Λειτουργικά" : "Operational"}
                    </option>
                    <option value="quality">
                      {language === "el" ? "Ποιότητα" : "Quality"}
                    </option>
                    <option value="sustainability">
                      {language === "el" ? "Βιωσιμότητα" : "Sustainability"}
                    </option>
                    <option value="safety">
                      {language === "el" ? "Ασφάλεια" : "Safety"}
                    </option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setViewMode(viewMode === "grid" ? "list" : "grid")
                    }
                  >
                    {viewMode === "grid" ? (
                      <BarChart3 className="w-4 h-4 mr-2" />
                    ) : (
                      <Package className="w-4 h-4 mr-2" />
                    )}
                    {viewMode === "grid"
                      ? language === "el"
                        ? "Λίστα"
                        : "List"
                      : language === "el"
                        ? "Πλέγμα"
                        : "Grid"}
                  </Button>
                  <Badge variant="outline">
                    {filteredKPIs.length} {language === "el" ? "KPIs" : "KPIs"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPIs Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredKPIs.map((kpi) => (
                <KPICard key={kpi.id} kpi={kpi} />
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el" ? "Λίστα KPIs" : "KPI List"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === "el" ? "KPI" : "KPI"}</TableHead>
                      <TableHead>
                        {language === "el" ? "Τρέχουσα Αξία" : "Current Value"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Στόχος" : "Target"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Πρόοδος" : "Progress"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Μεταβολή" : "Change"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Κατάσταση" : "Status"}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKPIs.map((kpi) => (
                      <TableRow key={kpi.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getCategoryIcon(kpi.category)}
                            <div>
                              <div className="font-medium">{kpi.name}</div>
                              <div className="text-xs text-gray-500">
                                {kpi.category}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold">
                          {formatValue(kpi.value, kpi.unit)}
                        </TableCell>
                        <TableCell>
                          {formatValue(kpi.target, kpi.unit)}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {((kpi.value / kpi.target) * 100).toFixed(1)}%
                            </div>
                            <Progress
                              value={(kpi.value / kpi.target) * 100}
                              className="h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(kpi.trend, kpi.change)}
                            <span
                              className={`text-sm font-medium ${
                                kpi.change > 0
                                  ? "text-green-600"
                                  : kpi.change < 0
                                    ? "text-red-600"
                                    : "text-gray-500"
                              }`}
                            >
                              {Math.abs(kpi.change).toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(kpi.status)}>
                            {kpi.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {departmentMetrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                      {metric.department}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {metric.lastUpdated.toLocaleTimeString()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{metric.metric}</span>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(metric.trend, metric.variance)}
                          <span
                            className={`text-sm font-medium ${
                              metric.variance > 0
                                ? "text-green-600"
                                : metric.variance < 0
                                  ? "text-red-600"
                                  : "text-gray-500"
                            }`}
                          >
                            {Math.abs(metric.variance).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">
                        {formatValue(metric.current, metric.unit)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {language === "el" ? "Στόχος:" : "Target:"}{" "}
                        {formatValue(metric.target, metric.unit)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>
                          {language === "el" ? "Πρόοδος:" : "Progress:"}
                        </span>
                        <span>
                          {((metric.current / metric.target) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={(metric.current / metric.target) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el"
                    ? "Τάσεις Επιδόσεων"
                    : "Performance Trends"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <LineChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Γράφημα τάσεων επιδόσεων"
                        : "Performance trends chart"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-purple-600" />
                  {language === "el"
                    ? "Κατανομή Κατηγοριών"
                    : "Category Distribution"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Κατανομή επιδόσεων ανά κατηγορία"
                        : "Performance distribution by category"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el"
                  ? "Αναφορές Επιδόσεων"
                  : "Performance Reports"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Δημιουργία και εξαγωγή αναφορών"
                      : "Generate and export reports"}
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

export default PerformanceDashboard;
