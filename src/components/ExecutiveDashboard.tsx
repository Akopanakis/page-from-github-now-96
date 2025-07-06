import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Users,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle,
  Award,
  Activity,
  Zap,
  Star,
} from "lucide-react";
import FinancialRatios from "./FinancialRatios";
import EconomicTrends from "./EconomicTrends";
import type { CalculationResults, FormData } from "@/utils/calc";

interface ExecutiveDashboardProps {
  results: CalculationResults;
  formData: FormData;
  className?: string;
}

interface KPICard {
  id: string;
  title: string;
  value: string;
  change: number;
  target: number;
  unit: string;
  icon: any;
  color: string;
  description: string;
  status: "excellent" | "good" | "warning" | "critical";
}

const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  results,
  formData,
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeView, setActiveView] = useState("overview");

  const formatCurrency = (amount: number) => {
    const safeAmount = isFinite(amount) ? amount : 0;
    return `€${safeAmount.toLocaleString("el-GR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const formatPercentage = (value: number, decimals = 1) => {
    const safeValue = isFinite(value) ? value : 0;
    return `${safeValue.toFixed(decimals)}%`;
  };

  const kpiCards: KPICard[] = useMemo(() => {
    if (!results) return [];

    const totalRevenue = (results.finalPrice || 0) * (formData.quantity || 1);
    const profitMargin = results.profitMargin || 0;
    const efficiency = (1 - (results.totalLossPercentage || 0) / 100) * 100;
    const costPerKg = results.costPerKg || 0;

    return [
      {
        id: "revenue",
        title: language === "el" ? "Συνολικά Έσοδα" : "Total Revenue",
        value: formatCurrency(totalRevenue),
        change: 8.5,
        target: 50000,
        unit: "€",
        icon: DollarSign,
        color: "green",
        description:
          language === "el"
            ? "Προβλεπόμενα έσοδα από πωλήσεις"
            : "Projected sales revenue",
        status:
          totalRevenue > 40000
            ? "excellent"
            : totalRevenue > 30000
              ? "good"
              : totalRevenue > 20000
                ? "warning"
                : "critical",
      },
      {
        id: "profitability",
        title: language === "el" ? "Κερδοφορία" : "Profitability",
        value: formatPercentage(profitMargin),
        change: 2.3,
        target: 25,
        unit: "%",
        icon: TrendingUp,
        color: "blue",
        description:
          language === "el" ? "Περιθώριο καθαρού κέρδους" : "Net profit margin",
        status:
          profitMargin > 20
            ? "excellent"
            : profitMargin > 15
              ? "good"
              : profitMargin > 10
                ? "warning"
                : "critical",
      },
      {
        id: "efficiency",
        title: language === "el" ? "Αποδοτικότητα" : "Efficiency",
        value: formatPercentage(efficiency),
        change: -1.2,
        target: 90,
        unit: "%",
        icon: Target,
        color: "purple",
        description:
          language === "el"
            ? "Απόδοση διαδικασίας επεξεργασίας"
            : "Processing efficiency",
        status:
          efficiency > 85
            ? "excellent"
            : efficiency > 80
              ? "good"
              : efficiency > 75
                ? "warning"
                : "critical",
      },
      {
        id: "cost_control",
        title: language === "el" ? "Έλεγχος Κόστους" : "Cost Control",
        value: formatCurrency(costPerKg),
        change: -3.1,
        target: 8,
        unit: "€/kg",
        icon: BarChart3,
        color: "orange",
        description:
          language === "el"
            ? "Κόστος παραγωγής ανά κιλό"
            : "Production cost per kilogram",
        status:
          costPerKg < 6
            ? "excellent"
            : costPerKg < 8
              ? "good"
              : costPerKg < 10
                ? "warning"
                : "critical",
      },
    ];
  }, [results, formData, language]);

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: "bg-green-100 text-green-800 border-green-300",
      good: "bg-blue-100 text-blue-800 border-blue-300",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
      critical: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status as keyof typeof colors] || colors.warning;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "good":
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCardGradient = (color: string) => {
    const gradients = {
      green: "from-green-500 to-emerald-600",
      blue: "from-blue-500 to-indigo-600",
      purple: "from-purple-500 to-pink-600",
      orange: "from-orange-500 to-red-600",
    };
    return gradients[color as keyof typeof gradients] || gradients.blue;
  };

  const renderKPICard = (kpi: KPICard) => {
    const Icon = kpi.icon;
    const progress =
      kpi.target > 0
        ? Math.min(
            (parseFloat(kpi.value.replace(/[^0-9.-]/g, "")) / kpi.target) * 100,
            100,
          )
        : 0;

    return (
      <Card
        key={kpi.id}
        className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group"
      >
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getCardGradient(kpi.color)} opacity-10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300`}
        />

        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${getCardGradient(kpi.color)} text-white shadow-lg`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{kpi.title}</h3>
                <p className="text-sm text-gray-600">{kpi.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {getStatusIcon(kpi.status)}
              <Badge className={`text-xs ${getStatusColor(kpi.status)}`}>
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
              </Badge>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {kpi.value}
              </span>
              <div className="flex items-center space-x-1">
                {kpi.change > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${kpi.change > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {kpi.change > 0 ? "+" : ""}
                  {kpi.change}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {language === "el" ? "Στόχος:" : "Target:"} {kpi.target}
                  {kpi.unit === "€" ? "€" : kpi.unit}
                </span>
                <span>
                  {progress.toFixed(0)}%{" "}
                  {language === "el" ? "στόχου" : "of target"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {language === "el" ? "Τελευταία ενημέρωση" : "Last updated"}
            </span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderAlerts = () => {
    const alerts: { type: string; severity: string; title: string; message: string; }[] = [];

    kpiCards.forEach((kpi) => {
      if (kpi.status === "critical") {
        alerts.push({
          type: "critical",
          severity: "critical",
          title: `${kpi.title} ${language === "el" ? "Κρίσιμο" : "Critical"}`,
          message: `${kpi.title} ${language === "el" ? "χρειάζεται άμεση προσοχή" : "requires immediate attention"}`,
        });
      } else if (kpi.status === "warning") {
        alerts.push({
          type: "warning",
          severity: "warning",
          title: `${kpi.title} ${language === "el" ? "Προσοχή" : "Warning"}`,
          message: `${kpi.title} ${language === "el" ? "κάτω από τον στόχο" : "below target"}`,
        });
      }
    });

    if (alerts.length === 0) {
      return (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-medium text-green-800">
                  {language === "el" ? "Όλα σε Τάξη" : "All Systems Normal"}
                </h4>
                <p className="text-green-700 text-sm">
                  {language === "el"
                    ? "Όλοι οι δείκτες εντός αποδεκτών ορίων"
                    : "All KPIs within acceptable ranges"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <Card
            key={index}
            className={`${alert.type === "critical" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle
                  className={`w-5 h-5 ${alert.type === "critical" ? "text-red-600" : "text-yellow-600"}`}
                />
                <div>
                  <h4
                    className={`font-medium ${alert.type === "critical" ? "text-red-800" : "text-yellow-800"}`}
                  >
                    {alert.title}
                  </h4>
                  <p
                    className={`text-sm ${alert.type === "critical" ? "text-red-700" : "text-yellow-700"}`}
                  >
                    {alert.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  if (!results) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {language === "el" ? "Executive Dashboard" : "Executive Dashboard"}
          </h3>
          <p className="text-gray-600">
            {language === "el"
              ? "Πραγματοποιήστε υπολογισμό για να δείτε τα διοικητικά δεδομένα"
              : "Perform calculation to view executive data"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <Card className="mb-6">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6" />
              <span>
                {language === "el"
                  ? "Executive Dashboard"
                  : "Executive Dashboard"}
              </span>
            </div>
            <Badge className="bg-white text-indigo-600">
              <Star className="w-3 h-3 mr-1" />
              {language === "el"
                ? "Διοικητική Επισκόπηση"
                : "Executive Overview"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs
            value={activeView}
            onValueChange={setActiveView}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                {language === "el" ? "Επισκόπηση" : "Overview"}
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                {language === "el" ? "Οικονομικά" : "Financial"}
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {language === "el" ? "Αγορά" : "Market"}
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {language === "el" ? "Ειδοποιήσεις" : "Alerts"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {kpiCards.map(renderKPICard)}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>
                      {language === "el"
                        ? "Σύνοψη Απόδοσης"
                        : "Performance Summary"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-800">
                        {
                          kpiCards.filter(
                            (k) =>
                              k.status === "excellent" || k.status === "good",
                          ).length
                        }
                      </div>
                      <div className="text-sm text-green-700">
                        {language === "el"
                          ? "Δείκτες σε Καλή Κατάσταση"
                          : "Healthy KPIs"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                      <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-800">
                        {kpiCards.filter((k) => k.status === "warning").length}
                      </div>
                      <div className="text-sm text-yellow-700">
                        {language === "el"
                          ? "Χρειάζονται Προσοχή"
                          : "Need Attention"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg">
                      <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-800">
                        {kpiCards.filter((k) => k.status === "critical").length}
                      </div>
                      <div className="text-sm text-red-700">
                        {language === "el" ? "Κρίσιμα" : "Critical"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <FinancialRatios results={results} formData={formData} />
            </TabsContent>

            <TabsContent value="market" className="space-y-6">
              <EconomicTrends productType={formData.productType} />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === "el"
                    ? "Ειδοποιήσεις Συστήματος"
                    : "System Alerts"}
                </h3>
                <p className="text-gray-600">
                  {language === "el"
                    ? "Παρακολουθήστε τις κρίσιμες μετρήσεις και λάβετε ειδοποιήσεις"
                    : "Monitor critical metrics and receive notifications"}
                </p>
              </div>
              {renderAlerts()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveDashboard;
