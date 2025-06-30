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
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount: number) => {
    const safeAmount = isFinite(amount) ? amount : 0;
    return `€${safeAmount.toLocaleString("el-GR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatPercentage = (value: number, decimals = 1) => {
    const safeValue = isFinite(value) ? value : 0;
    return `${safeValue.toFixed(decimals)}%`;
  };

  // Key metrics for overview
  const keyMetrics = [
    {
      label: language === "el" ? "Συνολικό Κόστος" : "Total Cost",
      value: formatCurrency(results?.totalCosts || 0),
      icon: Calculator,
      color: "blue",
      trend: (results?.totalCosts || 0) > 5000 ? "high" : "normal",
    },
    {
      label: language === "el" ? "Κόστος/kg" : "Cost per kg",
      value: formatCurrency(results?.costPerKg || 0),
      icon: DollarSign,
      color: "green",
      trend: (results?.costPerKg || 0) > 10 ? "high" : "normal",
    },
    {
      label: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
      value: formatPercentage(results?.profitMargin || 0),
      icon: Target,
      color: "purple",
      trend: (results?.profitMargin || 0) > 15 ? "good" : "warning",
    },
    {
      label: language === "el" ? "Καθαρό Κέρδος" : "Net Profit",
      value: formatCurrency(results?.grossProfit || 0),
      icon: TrendingUp,
      color: "orange",
      trend: (results?.grossProfit || 0) > 0 ? "good" : "warning",
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

  const getCardStyle = (color: string) => {
    const styles = {
      blue: "border-blue-200 bg-blue-50 hover:bg-blue-100",
      green: "border-green-200 bg-green-50 hover:bg-green-100",
      purple: "border-purple-200 bg-purple-50 hover:bg-purple-100",
      orange: "border-orange-200 bg-orange-50 hover:bg-orange-100",
    };
    return styles[color as keyof typeof styles] || styles.blue;
  };

  if (!results) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-600 to-slate-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>{language === "el" ? "Αποτελέσματα" : "Results"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              {language === "el"
                ? "Συμπληρώστε τα στοιχεία και πατήστε υπολογισμός"
                : "Fill in the details and press calculate"}
            </p>
            <Button
              onClick={onCalculate}
              disabled={isCalculating}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Calculator className="w-4 h-4 mr-2" />
              {isCalculating
                ? language === "el"
                  ? "Υπολογισμός..."
                  : "Calculating..."
                : language === "el"
                  ? "Υπολογισμός"
                  : "Calculate"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Compact Overview Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>{language === "el" ? "Αποτελέσματα" : "Results"}</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:bg-white/20"
              >
                {isExpanded ? (
                  <>
                    <Minimize2 className="w-4 h-4 mr-1" />
                    {language === "el" ? "Σύμπτυξη" : "Collapse"}
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4 mr-1" />
                    {language === "el" ? "Επέκταση" : "Expand"}
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-white hover:bg-white/20"
              >
                {language === "el" ? "Επαναφορά" : "Reset"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {keyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${getCardStyle(metric.color)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-600">{metric.label}</div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={onCalculate} disabled={isCalculating} size="sm">
              <Calculator className="w-4 h-4 mr-2" />
              {isCalculating
                ? language === "el"
                  ? "Υπολογισμός..."
                  : "Calculating..."
                : language === "el"
                  ? "Επανυπολογισμός"
                  : "Recalculate"}
            </Button>
            <Badge variant="outline" className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {results.competitivePosition || "Average"}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <PieChart className="w-3 h-3" />
              {formatPercentage(results.efficiencyScore || 0)}{" "}
              {language === "el" ? "Απόδοση" : "Efficiency"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Expanded Analysis */}
      {isExpanded && (
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
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
                  <TrendingUp className="w-4 h-4" />
                  {language === "el" ? "Συμβουλές" : "Insights"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700">
                      {language === "el" ? "Βασικά Στοιχεία" : "Key Figures"}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>
                          {language === "el"
                            ? "Αρχικό Βάρος:"
                            : "Initial Weight:"}
                        </span>
                        <span className="font-medium">
                          {(results.rawWeight || 0).toFixed(1)} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          {language === "el" ? "Καθαρό Βάρος:" : "Net Weight:"}
                        </span>
                        <span className="font-medium">
                          {(results.netWeight || 0).toFixed(1)} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          {language === "el"
                            ? "Συνολικές Απώλειες:"
                            : "Total Losses:"}
                        </span>
                        <span className="font-medium">
                          {formatPercentage(results.totalLossPercentage || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          {language === "el" ? "Break-even:" : "Break-even:"}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(results.breakEvenPrice || 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700">
                      {language === "el" ? "Κερδοφορία" : "Profitability"}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>
                          {language === "el" ? "Καθαρή Τιμή:" : "Net Price:"}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(results.netPrice || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === "el" ? "ΦΠΑ:" : "VAT:"}</span>
                        <span className="font-medium">
                          {formatCurrency(results.vatAmount || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          {language === "el" ? "Τελική Τιμή:" : "Final Price:"}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(results.finalPrice || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          {language === "el" ? "Συνιστώμενη:" : "Recommended:"}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(results.recommendedPrice || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="breakdown" className="mt-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">
                    {language === "el" ? "Ανάλυση Κόστους" : "Cost Breakdown"}
                  </h4>
                  {results.breakdown && (
                    <div className="space-y-2">
                      {Object.entries(results.breakdown).map(([key, value]) => {
                        const percentage =
                          results.totalCosts > 0
                            ? (value / results.totalCosts) * 100
                            : 0;
                        const labels: {
                          [key: string]: { el: string; en: string };
                        } = {
                          materials: { el: "Πρώτες Ύλες", en: "Materials" },
                          labor: { el: "Εργατικά", en: "Labor" },
                          processing: { el: "Επεξεργασία", en: "Processing" },
                          transport: { el: "Μεταφορά", en: "Transport" },
                          overhead: { el: "Γενικ�� Έξοδα", en: "Overhead" },
                          packaging: { el: "Συσκευασία", en: "Packaging" },
                        };
                        return (
                          <div
                            key={key}
                            className="flex justify-between items-center text-sm"
                          >
                            <span>
                              {labels[key]?.[language as "el" | "en"] || key}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 transition-all duration-300"
                                  style={{
                                    width: `${Math.min(percentage, 100)}%`,
                                  }}
                                />
                              </div>
                              <span className="font-medium min-w-[60px] text-right">
                                {formatCurrency(value || 0)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="insights" className="mt-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">
                    {language === "el"
                      ? "Συμβουλές Βελτίωσης"
                      : "Improvement Suggestions"}
                  </h4>
                  <div className="space-y-2">
                    {(results.profitMargin || 0) < 10 && (
                      <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <span className="text-sm text-yellow-800">
                          {language === "el"
                            ? "Χαμηλό περιθώριο κέρδους - εξετάστε αύξηση τιμής ή μείωση κόστους"
                            : "Low profit margin - consider price increase or cost reduction"}
                        </span>
                      </div>
                    )}

                    {(results.totalLossPercentage || 0) > 20 && (
                      <div className="flex items-start gap-2 p-2 bg-red-50 rounded border-l-4 border-red-400">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                        <span className="text-sm text-red-800">
                          {language === "el"
                            ? "Υψηλές απώλειες - βελτιώστε τις διαδικασίες επεξεργασίας"
                            : "High losses - improve processing procedures"}
                        </span>
                      </div>
                    )}

                    {(results.profitMargin || 0) > 20 && (
                      <div className="flex items-start gap-2 p-2 bg-green-50 rounded border-l-4 border-green-400">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <span className="text-sm text-green-800">
                          {language === "el"
                            ? "Εξαιρετικό περιθώριο κέρδους - καλή κερδοφορία"
                            : "Excellent profit margin - good profitability"}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                      <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span className="text-sm text-blue-800">
                        {language === "el"
                          ? "Παρακολουθήστε τακτικά τις τιμές των ανταγωνιστών"
                          : "Monitor competitor prices regularly"}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompactResultsPanel;
