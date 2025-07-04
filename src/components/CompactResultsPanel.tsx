import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Calculator,
  TrendingUp,
  PieChart,
  BarChart3,
  Target,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Package,
  TrendingDown,
  Activity,
  Award,
  Zap,
} from "lucide-react";
import type { CalculationResults, FormData } from "@/utils/calc";

interface CompactResultsPanelProps {
  results: CalculationResults;
  formData: FormData;
  onCalculate: () => void;
  onReset: () => void;
  isCalculating: boolean;
}

const CompactResultsPanel: React.FC<CompactResultsPanelProps> = ({
  results,
  formData,
  onCalculate,
  onReset,
  isCalculating,
}) => {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount: number) => {
    const safeAmount = isFinite(amount) ? amount : 0;
    return `€${safeAmount.toLocaleString(
      language === "el" ? "el-GR" : "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    )}`;
  };

  const formatPercentage = (value: number, decimals = 1) => {
    const safeValue = isFinite(value) ? value : 0;
    return `${safeValue.toFixed(decimals)}%`;
  };

  const formatWeight = (weight: number) => {
    const safeWeight = isFinite(weight) ? weight : 0;
    return `${safeWeight.toLocaleString(language === "el" ? "el-GR" : "en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} kg`;
  };

  // Key metrics for overview
  const keyMetrics = [
    {
      label: t("results.total.cost"),
      value: formatCurrency(results?.totalCosts || 0),
      icon: Calculator,
      color: "blue",
      trend: (results?.totalCosts || 0) > 5000 ? "high" : "normal",
      description:
        language === "el"
          ? "Συνολικά έξοδα παραγωγής"
          : "Total production expenses",
    },
    {
      label: t("results.cost.per.kg"),
      value: formatCurrency(results?.costPerKg || 0),
      icon: DollarSign,
      color: "green",
      trend: (results?.costPerKg || 0) > 10 ? "high" : "normal",
      description:
        language === "el"
          ? "Κόστος ανά κιλό προϊόντος"
          : "Cost per kilogram of product",
    },
    {
      label: t("results.profit.margin"),
      value: formatPercentage(results?.profitMargin || 0),
      icon: Target,
      color: "purple",
      trend: (results?.profitMargin || 0) > 15 ? "good" : "warning",
      description:
        language === "el"
          ? "Ποσοστό κέρδους επί των πωλήσεων"
          : "Percentage profit on sales",
    },
    {
      label: t("results.net.profit"),
      value: formatCurrency(results?.grossProfit || 0),
      icon: TrendingUp,
      color: "orange",
      trend: (results?.grossProfit || 0) > 0 ? "good" : "warning",
      description:
        language === "el"
          ? "Καθαρό κέρδος μετά από έξοδα"
          : "Net profit after expenses",
    },
  ];

  // Additional metrics for breakdown
  const additionalMetrics = [
    {
      label: t("results.break.even"),
      value: formatCurrency(results?.breakEvenPrice || 0),
      icon: Activity,
      color: "indigo",
      description:
        language === "el"
          ? "Τιμή για μηδενικό κέρδος"
          : "Price for zero profit",
    },
    {
      label: t("results.recommended.price"),
      value: formatCurrency(results?.recommendedPrice || 0),
      icon: Award,
      color: "pink",
      description:
        language === "el"
          ? "Προτεινόμενη τιμή πώλησης"
          : "Suggested selling price",
    },
    {
      label: language === "el" ? "Αρχικό Βάρος" : "Initial Weight",
      value: formatWeight(results?.rawWeight || 0),
      icon: Package,
      color: "cyan",
      description:
        language === "el"
          ? "Βάρος πριν την επεξεργασία"
          : "Weight before processing",
    },
    {
      label: language === "el" ? "Τελικό Βάρος" : "Final Weight",
      value: formatWeight(results?.netWeight || 0),
      icon: Zap,
      color: "emerald",
      description:
        language === "el"
          ? "Βάρος μετά την επεξεργασία"
          : "Weight after processing",
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "good":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "high":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "good":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "high":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50 border-blue-200",
      green: "text-green-600 bg-green-50 border-green-200",
      purple: "text-purple-600 bg-purple-50 border-purple-200",
      orange: "text-orange-600 bg-orange-50 border-orange-200",
      indigo: "text-indigo-600 bg-indigo-50 border-indigo-200",
      pink: "text-pink-600 bg-pink-50 border-pink-200",
      cyan: "text-cyan-600 bg-cyan-50 border-cyan-200",
      emerald: "text-emerald-600 bg-emerald-50 border-emerald-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const costBreakdown = [
    {
      label: language === "el" ? "Υλικά" : "Materials",
      value: results?.breakdown?.materials || 0,
      percentage:
        results?.totalCosts > 0
          ? ((results?.breakdown?.materials || 0) / results.totalCosts) * 100
          : 0,
      color: "blue",
    },
    {
      label: language === "el" ? "Επεξεργασία" : "Processing",
      value: results?.breakdown?.processing || 0,
      percentage:
        results?.totalCosts > 0
          ? ((results?.breakdown?.processing || 0) / results.totalCosts) * 100
          : 0,
      color: "green",
    },
    {
      label: language === "el" ? "Μεταφορά" : "Transport",
      value: results?.breakdown?.transport || 0,
      percentage:
        results?.totalCosts > 0
          ? ((results?.breakdown?.transport || 0) / results.totalCosts) * 100
          : 0,
      color: "orange",
    },
    {
      label: language === "el" ? "Λοιπά Κόστη" : "Overhead",
      value: results?.breakdown?.overhead || 0,
      percentage:
        results?.totalCosts > 0
          ? ((results?.breakdown?.overhead || 0) / results.totalCosts) * 100
          : 0,
      color: "purple",
    },
  ];

  if (!results || Object.keys(results).length === 0) {
    return (
      <Card className="w-full shadow-lg border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-blue-600" />
            {language === "el"
              ? "Αποτελέσματα Κοστολόγησης"
              : "Costing Results"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">
              {language === "el"
                ? "Συμπληρώστε τα στοιχεία και πατήστε υπολογισμό για να δείτε τα αποτελέσματα"
                : "Fill in the details and click calculate to see results"}
            </p>
            <Button
              onClick={onCalculate}
              disabled={isCalculating}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  {t("message.calculating")}
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  {t("action.calculate")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="shadow-lg border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-blue-600" />
              {language === "el"
                ? "Αποτελέσματα Κοστολόγησης"
                : "Costing Results"}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="border-blue-200 hover:bg-blue-50"
              >
                {isExpanded ? (
                  <>
                    <Minimize2 className="w-4 h-4 mr-2" />
                    {language === "el" ? "Σύμπτυξη" : "Collapse"}
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4 mr-2" />
                    {language === "el" ? "Επέκταση" : "Expand"}
                  </>
                )}
              </Button>
              <Button
                onClick={onCalculate}
                disabled={isCalculating}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    {t("message.calculating")}
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4 mr-2" />
                    {t("action.calculate")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Quick Overview - Always Visible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {keyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getColorClasses(metric.color)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5" />
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="font-bold text-xl mb-1">{metric.value}</div>
                  <div className="text-sm font-medium mb-1">{metric.label}</div>
                  <div className="text-xs opacity-75">{metric.description}</div>
                </div>
              );
            })}
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {language === "el" ? "Επισκόπηση" : "Overview"}
                </TabsTrigger>
                <TabsTrigger
                  value="breakdown"
                  className="flex items-center gap-2"
                >
                  <PieChart className="w-4 h-4" />
                  {language === "el" ? "Ανάλυση" : "Breakdown"}
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  {language === "el" ? "Συμβουλές" : "Insights"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {additionalMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${getColorClasses(metric.color)}`}
                      >
                        <div className="flex items-center mb-2">
                          <Icon className="w-5 h-5 mr-2" />
                          <div className="text-sm font-medium">
                            {metric.label}
                          </div>
                        </div>
                        <div className="font-bold text-lg mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs opacity-75">
                          {metric.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="breakdown" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-blue-600" />
                      {language === "el" ? "Ανάλυση Κόστους" : "Cost Breakdown"}
                    </h4>
                    {costBreakdown.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{item.label}</span>
                          <Badge variant="outline">
                            {formatPercentage(item.percentage)}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-gray-800 mb-2">
                          {formatCurrency(item.value)}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${
                              item.color === "blue"
                                ? "from-blue-400 to-blue-600"
                                : item.color === "green"
                                  ? "from-green-400 to-green-600"
                                  : item.color === "orange"
                                    ? "from-orange-400 to-orange-600"
                                    : "from-purple-400 to-purple-600"
                            }`}
                            style={{
                              width: `${Math.min(item.percentage, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      {language === "el"
                        ? "Δείκτες Απόδοσης"
                        : "Performance Metrics"}
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                        <div className="text-sm text-green-700 mb-1">
                          {language === "el"
                            ? "Αποδοτικότητα Παραγωγής"
                            : "Production Efficiency"}
                        </div>
                        <div className="text-2xl font-bold text-green-800">
                          {formatPercentage(
                            results?.netWeight && results?.rawWeight
                              ? (results.netWeight / results.rawWeight) * 100
                              : 0,
                          )}
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                        <div className="text-sm text-blue-700 mb-1">
                          {language === "el"
                            ? "Περιθώριο Ασφαλείας"
                            : "Safety Margin"}
                        </div>
                        <div className="text-2xl font-bold text-blue-800">
                          {formatPercentage(
                            results?.finalPrice && results?.breakEvenPrice
                              ? ((results.finalPrice - results.breakEvenPrice) /
                                  results.finalPrice) *
                                  100
                              : 0,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="font-semibold text-lg text-yellow-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {language === "el" ? "Έξυπνες Συμβουλές" : "Smart Insights"}
                  </h4>
                  <div className="space-y-3">
                    {(results?.profitMargin || 0) < 15 && (
                      <div className="flex items-start gap-3 p-3 bg-yellow-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-yellow-800">
                            {language === "el"
                              ? "Χαμηλό Περιθώριο Κέρδους"
                              : "Low Profit Margin"}
                          </div>
                          <div className="text-sm text-yellow-700">
                            {language === "el"
                              ? "Το περιθώριο κέρδους είναι κάτω από 15%. Εξετάστε τη βελτιστοποίηση των κοστών ή την αύξηση της τιμής."
                              : "Profit margin is below 15%. Consider optimizing costs or increasing price."}
                          </div>
                        </div>
                      </div>
                    )}
                    {results?.netWeight &&
                      results?.rawWeight &&
                      results.netWeight / results.rawWeight < 0.8 && (
                        <div className="flex items-start gap-3 p-3 bg-orange-100 rounded-lg">
                          <TrendingDown className="w-5 h-5 text-orange-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-orange-800">
                              {language === "el"
                                ? "Υψηλές Απώλειες"
                                : "High Losses"}
                            </div>
                            <div className="text-sm text-orange-700">
                              {language === "el"
                                ? "Οι απώλειες στην επεξεργασία είναι άνω του 20%. Εξετάστε τη βελτίωση των διαδικασιών."
                                : "Processing losses are above 20%. Consider improving processes."}
                            </div>
                          </div>
                        </div>
                      )}
                    {(results?.profitMargin || 0) > 25 && (
                      <div className="flex items-start gap-3 p-3 bg-green-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-green-800">
                            {language === "el"
                              ? "Εξαιρετική Κερδοφορία"
                              : "Excellent Profitability"}
                          </div>
                          <div className="text-sm text-green-700">
                            {language === "el"
                              ? "Το περιθώριο κέρδους είναι άνω του 25%. Πολύ καλή απόδοση!"
                              : "Profit margin is above 25%. Excellent performance!"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 mb-2">
                      {language === "el"
                        ? "Συμβουλές Βελτιστοποίησης"
                        : "Optimization Tips"}
                    </h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>
                        •{" "}
                        {language === "el"
                          ? "Ελαχιστοποιήστε τις απώλειες επεξεργασίας"
                          : "Minimize processing losses"}
                      </li>
                      <li>
                        •{" "}
                        {language === "el"
                          ? "Βελτιστοποιήστε τα κόστη μεταφοράς"
                          : "Optimize transport costs"}
                      </li>
                      <li>
                        •{" "}
                        {language === "el"
                          ? "Εξετάστε εναλλακτικούς προμηθευτές"
                          : "Consider alternative suppliers"}
                      </li>
                      <li>
                        •{" "}
                        {language === "el"
                          ? "Αυτοματοποιήστε τις διαδικασίες"
                          : "Automate processes"}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-medium text-green-800 mb-2">
                      {language === "el"
                        ? "Ευκαιρίες Κέρδους"
                        : "Profit Opportunities"}
                    </h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>
                        •{" "}
                        {language === "el"
                          ? "Αξιοποιήστε την εποχικότητα"
                          : "Leverage seasonality"}
                      </li>
                      <li>
                        •{" "}
                        {language === "el"
                          ? "Προσθέστε υπηρεσίες αξίας"
                          : "Add value-added services"}
                      </li>
                      <li>
                        •{" "}
                        {language === "el"
                          ? "Διερευνήστε premium αγορές"
                          : "Explore premium markets"}
                      </li>
                      <li>
                        •{" "}
                        {language === "el"
                          ? "Βελτιώστε την ποιότητα"
                          : "Improve quality"}
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button
              onClick={onCalculate}
              disabled={isCalculating}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  {t("message.calculating")}
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  {t("action.calculate")}
                </>
              )}
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <TrendingDown className="w-4 h-4 mr-2" />
              {t("action.reset")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactResultsPanel;
