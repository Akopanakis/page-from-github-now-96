import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Calculator,
  Lightbulb,
} from "lucide-react";
import type { CalculationResults, FormData } from "@/utils/calc";

interface ProfitabilityAnalysisProps {
  results: CalculationResults;
  formData: FormData;
}

const ProfitabilityAnalysis: React.FC<ProfitabilityAnalysisProps> = ({
  results,
  formData,
}) => {
  const { language } = useLanguage();

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

  // Profitability scenarios
  const scenarios = [
    {
      name: language === "el" ? "Πεσιμιστικό" : "Pessimistic",
      multiplier: 0.85,
      color: "bg-red-500",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
    },
    {
      name: language === "el" ? "Ρεαλιστικό" : "Realistic",
      multiplier: 1.0,
      color: "bg-blue-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
    },
    {
      name: language === "el" ? "Αισιόδοξο" : "Optimistic",
      multiplier: 1.15,
      color: "bg-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
    },
  ];

  // Calculate scenarios
  const scenarioResults = scenarios.map((scenario) => {
    const adjustedPrice = (results.finalPrice || 0) * scenario.multiplier;
    const revenue = adjustedPrice * (results.netWeight || 0);
    const profit = revenue - (results.totalCost || 0);
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

    return {
      ...scenario,
      price: adjustedPrice,
      revenue,
      profit,
      margin,
    };
  });

  // Profitability metrics
  const metrics = [
    {
      label: language === "el" ? "Μικτό Κέρδος" : "Gross Profit",
      value: formatCurrency(results.grossProfit || 0),
      percentage:
        results.finalPrice > 0
          ? ((results.grossProfit || 0) /
              ((results.finalPrice || 0) * (results.netWeight || 0))) *
            100
          : 0,
      icon: DollarSign,
      good: (results.grossProfit || 0) > 0,
    },
    {
      label: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
      value: formatPercentage(results.profitMargin || 0),
      percentage: results.profitMargin || 0,
      icon: Target,
      good: (results.profitMargin || 0) > 15,
    },
    {
      label: language === "el" ? "ROI" : "ROI",
      value: formatPercentage(
        results.totalCost > 0
          ? ((results.grossProfit || 0) / results.totalCost) * 100
          : 0,
      ),
      percentage:
        results.totalCost > 0
          ? ((results.grossProfit || 0) / results.totalCost) * 100
          : 0,
      icon: TrendingUp,
      good:
        results.totalCost > 0
          ? ((results.grossProfit || 0) / results.totalCost) * 100 > 20
          : false,
    },
    {
      label: language === "el" ? "Break-even Volume" : "Break-even Volume",
      value: `${((results.totalCost || 0) / (results.costPerKg || 1)).toFixed(0)} kg`,
      percentage: 0,
      icon: Calculator,
      good: true,
    },
  ];

  // Price recommendations
  const currentPrice = results.finalPrice || 0;
  const breakEvenPrice = results.breakEvenPrice || 0;
  const recommendedPrice = results.recommendedPrice || 0;

  const priceAnalysis = [
    {
      label: language === "el" ? "Τρέχουσα Τιμή" : "Current Price",
      price: currentPrice,
      status: currentPrice > breakEvenPrice ? "good" : "bad",
      description:
        language === "el"
          ? currentPrice > breakEvenPrice
            ? "Κερδοφόρα τιμή"
            : "Ζημιογόνα τιμή"
          : currentPrice > breakEvenPrice
            ? "Profitable price"
            : "Loss-making price",
    },
    {
      label: language === "el" ? "Break-even Τιμή" : "Break-even Price",
      price: breakEvenPrice,
      status: "neutral",
      description:
        language === "el" ? "Ισοσκελιστική τιμ" : "No profit/loss price",
    },
    {
      label: language === "el" ? "Συνιστώμενη Τιμή" : "Recommended Price",
      price: recommendedPrice,
      status: "good",
      description:
        language === "el"
          ? `${formatPercentage(formData.profitMargin || 20)} περιθώριο`
          : `${formatPercentage(formData.profitMargin || 20)} margin target`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profitability Overview */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            {language === "el"
              ? "Επισκόπηση Κερδοφορίας"
              : "Profitability Overview"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    metric.good
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5 text-gray-600" />
                    {metric.good ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {metric.label}
                  </div>
                  {metric.percentage !== 0 && (
                    <Progress
                      value={Math.min(Math.max(metric.percentage, 0), 100)}
                      className="h-2"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Scenario Analysis */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            {language === "el" ? "Ανάλυση Σεναρίων" : "Scenario Analysis"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarioResults.map((scenario, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 border-gray-200 ${scenario.bgColor} hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-3 h-3 rounded-full ${scenario.color}`}
                  ></div>
                  <h4 className={`font-semibold ${scenario.textColor}`}>
                    {scenario.name}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {scenario.multiplier < 1 ? "-" : "+"}
                    {Math.abs((scenario.multiplier - 1) * 100).toFixed(0)}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {language === "el" ? "Τιμή:" : "Price:"}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(scenario.price)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {language === "el" ? "Έσοδα:" : "Revenue:"}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(scenario.revenue)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {language === "el" ? "Κέρδος:" : "Profit:"}
                    </span>
                    <span
                      className={`font-medium ${
                        scenario.profit > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(scenario.profit)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-gray-600">
                      {language === "el" ? "Περιθώριο:" : "Margin:"}
                    </span>
                    <span
                      className={`font-bold ${
                        scenario.margin > 15
                          ? "text-green-600"
                          : scenario.margin > 5
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {formatPercentage(scenario.margin)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Analysis */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            {language === "el" ? "Ανάλυση Τιμολόγησης" : "Pricing Analysis"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {priceAnalysis.map((item, index) => {
              const statusColor =
                item.status === "good"
                  ? "border-green-200 bg-green-50"
                  : item.status === "bad"
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200 bg-gray-50";

              const priceMargin =
                breakEvenPrice > 0
                  ? ((item.price - breakEvenPrice) / breakEvenPrice) * 100
                  : 0;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${statusColor} transition-all hover:shadow-md`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.label}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(item.price)}
                      </div>
                      {item.price !== breakEvenPrice && (
                        <div
                          className={`text-sm ${priceMargin > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {priceMargin > 0 ? "+" : ""}
                          {formatPercentage(priceMargin, 0)}
                        </div>
                      )}
                    </div>
                  </div>
                  {item.price !== breakEvenPrice && (
                    <Progress
                      value={Math.min(Math.max(priceMargin + 50, 0), 100)}
                      className="h-2"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Price Recommendations */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === "el"
                    ? "Συστάσεις Τιμολόγησης"
                    : "Pricing Recommendations"}
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  {currentPrice < breakEvenPrice && (
                    <li>
                      •{" "}
                      {language === "el"
                        ? "Η τρέχουσα τιμή είναι κάτω από το break-even - αυξήστε την τιμή"
                        : "Current price is below break-even - increase pricing"}
                    </li>
                  )}
                  {(results.profitMargin || 0) < 10 && (
                    <li>
                      •{" "}
                      {language === "el"
                        ? "Χαμηλό περιθώριο κέρδους - εξετάστε μείωση κόστων ή αύξηση τιμής"
                        : "Low profit margin - consider cost reduction or price increase"}
                    </li>
                  )}
                  {(results.profitMargin || 0) > 30 && (
                    <li>
                      •{" "}
                      {language === "el"
                        ? "Υψηλό περιθώριο - ευκαιρία για ανταγωνιστική τιμολόγηση"
                        : "High margin - opportunity for competitive pricing"}
                    </li>
                  )}
                  <li>
                    •{" "}
                    {language === "el"
                      ? `Ιδανική τιμή για ${formatPercentage(formData.profitMargin || 20)} περιθώριο: ${formatCurrency(recommendedPrice)}`
                      : `Optimal price for ${formatPercentage(formData.profitMargin || 20)} margin: ${formatCurrency(recommendedPrice)}`}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitabilityAnalysis;
