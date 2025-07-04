import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Fish,
  Ship,
  Users,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Thermometer,
  Waves,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Globe,
  Anchor,
  Target,
  Zap,
  Star,
  Award,
  Shield,
  Leaf,
  Timer,
  Truck,
  ShoppingCart,
  FileText,
  CloudRain,
  Sun,
  Wind,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  realisticSeafoodData,
  getVesselsByStatus,
  getActiveOrders,
  getInventoryByStatus,
  getKPIsByCategory,
  getCurrentMarketPrices,
} from "@/mock/realisticSeafoodData";

interface DashboardProps {
  className?: string;
}

const ComprehensiveDashboard: React.FC<DashboardProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeWidget, setActiveWidget] = useState("overview");
  const [timeRange, setTimeRange] = useState("today");
  const [refreshTime, setRefreshTime] = useState(new Date());

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  // Format percentage
  const formatPercentage = (value: number, decimals = 1) => {
    return `${value.toFixed(decimals)}%`;
  };

  // Real-time data calculations
  const dashboardData = {
    vessels: {
      total: realisticSeafoodData.vessels.length,
      fishing: getVesselsByStatus("fishing").length,
      docked: getVesselsByStatus("docked").length,
      maintenance: getVesselsByStatus("maintenance").length,
    },

    inventory: {
      total: realisticSeafoodData.inventory.reduce(
        (sum, item) => sum + item.quantity,
        0,
      ),
      available: getInventoryByStatus("available").reduce(
        (sum, item) => sum + item.quantity,
        0,
      ),
      reserved: getInventoryByStatus("reserved").reduce(
        (sum, item) => sum + item.quantity,
        0,
      ),
      value: realisticSeafoodData.inventory.reduce(
        (sum, item) => sum + item.quantity * item.costPrice,
        0,
      ),
    },

    orders: {
      active: getActiveOrders().length,
      pending: realisticSeafoodData.orders.filter((o) => o.status === "pending")
        .length,
      processing: realisticSeafoodData.orders.filter(
        (o) => o.status === "processing",
      ).length,
      totalValue: getActiveOrders().reduce(
        (sum, order) => sum + order.total,
        0,
      ),
    },

    financial: {
      revenue: 125000,
      profit: 30625,
      profitMargin: 24.5,
      costs: 94375,
    },

    production: {
      dailyCatch: realisticSeafoodData.catches
        .filter((c) => c.date.toDateString() === new Date().toDateString())
        .reduce((sum, c) => sum + c.quantity, 0),
      weeklyTarget: 5000,
      efficiency: 87.5,
      wastage: 3.2,
    },

    quality: {
      avgScore: 9.2,
      passedChecks: 98.5,
      certifications: realisticSeafoodData.certifications.filter(
        (c) => c.status === "active",
      ).length,
      compliance: 96.8,
    },

    weather: {
      condition: "moderate",
      temperature: 12,
      windSpeed: 15,
      waveHeight: 1.2,
      fishingConditions: "good",
    },

    sustainability: {
      carbonFootprint: 2.1,
      mscCertified: 85,
      localSource: 78,
      sustainabilityScore: 87,
    },
  };

  // KPI Cards Configuration
  const kpiCards = [
    {
      id: "revenue",
      title: language === "el" ? "Συνολικά Έσοδα" : "Total Revenue",
      value: formatCurrency(dashboardData.financial.revenue),
      change: 8.5,
      target: 150000,
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      status: "excellent",
    },
    {
      id: "profit",
      title: language === "el" ? "Καθαρό Κέρδος" : "Net Profit",
      value: formatCurrency(dashboardData.financial.profit),
      change: 12.3,
      target: 42000,
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
      status: "good",
    },
    {
      id: "vessels",
      title: language === "el" ? "Ενεργά Σκάφη" : "Active Vessels",
      value: dashboardData.vessels.fishing.toString(),
      change: 0,
      target: dashboardData.vessels.total,
      icon: Ship,
      color: "from-purple-500 to-pink-600",
      status: "good",
    },
    {
      id: "inventory",
      title: language === "el" ? "Απόθεμα" : "Inventory",
      value: `${dashboardData.inventory.available}kg`,
      change: -2.1,
      target: 5000,
      icon: Package,
      color: "from-orange-500 to-red-600",
      status: "warning",
    },
  ];

  // Status indicators
  const getStatusColor = (status: string) => {
    const colors = {
      excellent: "text-green-600 bg-green-100",
      good: "text-blue-600 bg-blue-100",
      warning: "text-yellow-600 bg-yellow-100",
      critical: "text-red-600 bg-red-100",
    };
    return colors[status as keyof typeof colors] || colors.good;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4" />;
      case "good":
        return <CheckCircle className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  // Weather Widget
  const WeatherWidget = () => (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <CloudRain className="w-4 h-4 mr-2 text-blue-600" />
            {language === "el" ? "Καιρικές Συνθήκες" : "Weather Conditions"}
          </span>
          <Badge className="bg-blue-100 text-blue-800">
            {language === "el" ? "Ζωντανά" : "Live"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <Thermometer className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm">
              {dashboardData.weather.temperature}°C
            </span>
          </div>
          <div className="flex items-center">
            <Wind className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm">
              {dashboardData.weather.windSpeed} km/h
            </span>
          </div>
          <div className="flex items-center">
            <Waves className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm">{dashboardData.weather.waveHeight}m</span>
          </div>
          <div className="flex items-center">
            <Fish className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm">
              {language === "el" ? "Καλές" : "Good"}
            </span>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">
              {language === "el" ? "Συνθήκες Αλιείας" : "Fishing Conditions"}
            </span>
            <Badge className="bg-green-100 text-green-800 text-xs">
              {language === "el" ? "Ευνοϊκές" : "Favorable"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Fleet Status Widget
  const FleetStatusWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Ship className="w-4 h-4 mr-2 text-blue-600" />
          {language === "el" ? "Κατάσταση Στόλου" : "Fleet Status"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-600">
              {language === "el" ? "Αλιεύουν" : "Fishing"}
            </span>
            <span className="font-semibold">
              {dashboardData.vessels.fishing}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-600">
              {language === "el" ? "Στο Λιμάνι" : "Docked"}
            </span>
            <span className="font-semibold">
              {dashboardData.vessels.docked}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-600">
              {language === "el" ? "Συντήρηση" : "Maintenance"}
            </span>
            <span className="font-semibold">
              {dashboardData.vessels.maintenance}
            </span>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {language === "el" ? "Σύνολο" : "Total"}
            </span>
            <span className="font-bold text-lg">
              {dashboardData.vessels.total}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Production Metrics Widget
  const ProductionWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Fish className="w-4 h-4 mr-2 text-green-600" />
          {language === "el" ? "Παραγωγή Σήμερα" : "Today's Production"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {dashboardData.production.dailyCatch}kg
          </div>
          <div className="text-sm text-gray-600">
            {language === "el" ? "Συνολικό Ψάρεμα" : "Total Catch"}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              {language === "el" ? "Στόχος Εβδομάδας" : "Weekly Target"}
            </span>
            <span>
              {(
                (dashboardData.production.dailyCatch /
                  dashboardData.production.weeklyTarget) *
                100
              ).toFixed(1)}
              %
            </span>
          </div>
          <Progress
            value={
              (dashboardData.production.dailyCatch /
                dashboardData.production.weeklyTarget) *
              100
            }
            className="h-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t text-xs">
          <div>
            <span className="text-gray-600">
              {language === "el" ? "Αποδοτικότητα" : "Efficiency"}
            </span>
            <div className="font-semibold text-green-600">
              {formatPercentage(dashboardData.production.efficiency)}
            </div>
          </div>
          <div>
            <span className="text-gray-600">
              {language === "el" ? "Απώλειες" : "Wastage"}
            </span>
            <div className="font-semibold text-orange-600">
              {formatPercentage(dashboardData.production.wastage)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Quick Actions Widget
  const QuickActionsWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Zap className="w-4 h-4 mr-2 text-yellow-600" />
          {language === "el" ? "Γρήγορες Ενέργειες" : "Quick Actions"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button size="sm" variant="outline" className="w-full justify-start">
          <ShoppingCart className="w-4 h-4 mr-2" />
          {language === "el" ? "Νέα Παραγγελία" : "New Order"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Package className="w-4 h-4 mr-2" />
          {language === "el" ? "Καταγραφή Ψαριού" : "Record Catch"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <FileText className="w-4 h-4 mr-2" />
          {language === "el" ? "Νέο Τιμολόγιο" : "Create Invoice"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Truck className="w-4 h-4 mr-2" />
          {language === "el"
            ? "Προγραμματισμός Παράδοσης"
            : "Schedule Delivery"}
        </Button>
      </CardContent>
    </Card>
  );

  // Alerts Widget
  const AlertsWidget = () => {
    const alerts = [
      {
        type: "warning",
        message:
          language === "el"
            ? "Απόθεμα τσιπούρας ��αμηλό"
            : "Sea bream stock low",
        time: "10 min ago",
        icon: Package,
      },
      {
        type: "info",
        message:
          language === "el"
            ? "Νέα παραγγελία από Εστιατόριο Θαλασσινά"
            : "New order from Thalassina Restaurant",
        time: "25 min ago",
        icon: ShoppingCart,
      },
      {
        type: "success",
        message:
          language === "el"
            ? "Ψάρι παραδόθηκε στον πελάτη"
            : "Fish delivered to customer",
        time: "1 hour ago",
        icon: CheckCircle,
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
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-2 rounded-lg bg-gray-50"
              >
                <Icon
                  className={`w-4 h-4 mt-0.5 ${
                    alert.type === "warning"
                      ? "text-orange-500"
                      : alert.type === "info"
                        ? "text-blue-500"
                        : "text-green-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            );
          })}
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
            {language === "el" ? "Κέντρο Ελέγχου" : "Control Center"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Επισκόπηση της δραστηριότητας και των επιδόσεων σας"
              : "Overview of your operations and performance"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {language === "el" ? "Ζωντανά Δεδομένα" : "Live Data"}
          </Badge>
          <Button size="sm" variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            {timeRange === "today"
              ? language === "el"
                ? "Σήμερα"
                : "Today"
              : language === "el"
                ? "Αυτή την εβδομάδα"
                : "This Week"}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          const progress =
            kpi.target > 0
              ? Math.min(
                  (parseFloat(kpi.value.replace(/[^0-9.-]/g, "")) /
                    kpi.target) *
                    100,
                  100,
                )
              : 0;

          return (
            <Card
              key={kpi.id}
              className="relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${kpi.color} opacity-10 rounded-full transform translate-x-6 -translate-y-6`}
              />

              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${kpi.color} text-white`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div
                    className={`flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(kpi.status)}`}
                  >
                    {getStatusIcon(kpi.status)}
                    <span className="ml-1">
                      {language === "el"
                        ? kpi.status === "excellent"
                          ? "Άριστο"
                          : kpi.status === "good"
                            ? "Καλό"
                            : kpi.status === "warning"
                              ? "Προσοχή"
                              : "Κρίσιμο"
                        : kpi.status === "excellent"
                          ? "Excellent"
                          : kpi.status === "good"
                            ? "Good"
                            : kpi.status === "warning"
                              ? "Warning"
                              : "Critical"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {kpi.title}
                    </h3>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {kpi.value}
                      </span>
                      {kpi.change !== 0 && (
                        <div className="flex items-center text-sm">
                          {kpi.change > 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                          )}
                          <span
                            className={
                              kpi.change > 0 ? "text-green-600" : "text-red-600"
                            }
                          >
                            {kpi.change > 0 ? "+" : ""}
                            {kpi.change}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {kpi.target > 0 && (
                    <div className="space-y-1">
                      <Progress value={progress} className="h-1.5" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          {progress.toFixed(0)}%{" "}
                          {language === "el" ? "στόχου" : "of target"}
                        </span>
                        <span>{formatCurrency(kpi.target)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Charts Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el"
                    ? "Αναλυτικά Στοιχεία"
                    : "Analytics Overview"}
                </span>
                <Tabs
                  value={activeWidget}
                  onValueChange={setActiveWidget}
                  className="ml-auto"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="revenue" className="text-xs">
                      {language === "el" ? "Έσοδα" : "Revenue"}
                    </TabsTrigger>
                    <TabsTrigger value="production" className="text-xs">
                      {language === "el" ? "Παραγωγή" : "Production"}
                    </TabsTrigger>
                    <TabsTrigger value="efficiency" className="text-xs">
                      {language === "el" ? "Αποδοτικότητα" : "Efficiency"}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Γράφημα θα εμφανιστεί εδώ"
                      : "Chart will appear here"}
                  </p>
                  <p className="text-sm">
                    {language === "el" ? "Δεδομένα: " : "Data: "}
                    {activeWidget}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Production Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductionWidget />
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Star className="w-4 h-4 mr-2 text-yellow-600" />
                  {language === "el" ? "Ποιότητα" : "Quality Metrics"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {language === "el" ? "Μέσος Βαθμός" : "Average Score"}
                    </span>
                    <span className="font-semibold text-green-600">
                      {dashboardData.quality.avgScore}/10
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {language === "el"
                        ? "Επιτυχείς Έλεγχοι"
                        : "Passed Checks"}
                    </span>
                    <span className="font-semibold text-green-600">
                      {formatPercentage(dashboardData.quality.passedChecks)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {language === "el" ? "Πιστοποιήσεις" : "Certifications"}
                    </span>
                    <span className="font-semibold">
                      {dashboardData.quality.certifications}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {language === "el" ? "Συμμόρφωση" : "Compliance"}
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      {formatPercentage(dashboardData.quality.compliance)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <WeatherWidget />
          <FleetStatusWidget />
          <QuickActionsWidget />
          <AlertsWidget />

          {/* Sustainability Widget */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm">
                <Leaf className="w-4 h-4 mr-2 text-green-600" />
                {language === "el" ? "Βιωσιμότητα" : "Sustainability"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-green-600">
                    {dashboardData.sustainability.carbonFootprint}
                  </div>
                  <div className="text-xs text-gray-600">kg CO₂/kg</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">
                    {formatPercentage(
                      dashboardData.sustainability.mscCertified,
                    )}
                  </div>
                  <div className="text-xs text-gray-600">MSC</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">
                    {formatPercentage(dashboardData.sustainability.localSource)}
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === "el" ? "Τοπικό" : "Local"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">
                    {dashboardData.sustainability.sustainabilityScore}
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === "el" ? "Βαθμός" : "Score"}
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <Badge className="w-full justify-center bg-green-100 text-green-800">
                  <Award className="w-3 h-3 mr-1" />
                  {language === "el"
                    ? "Εξαιρετική Επίδοση"
                    : "Excellent Performance"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer with last update time */}
      <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
        <span>
          {language === "el" ? "Τελευταία ενημέρωση:" : "Last updated:"}{" "}
          {refreshTime.toLocaleTimeString()}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setRefreshTime(new Date())}
        >
          <Activity className="w-4 h-4 mr-2" />
          {language === "el" ? "Ανανέωση" : "Refresh"}
        </Button>
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;
