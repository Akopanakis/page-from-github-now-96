import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Target,
  DollarSign,
  Percent,
  Calculator,
  Award,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  TrendingDown,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SmartInsightsPanelProps {
  results: any;
  formData: any;
}

const SmartInsightsPanel: React.FC<SmartInsightsPanelProps> = ({
  results,
  formData,
}) => {
  const { language } = useLanguage();

  // Generate comprehensive insights based on calculation results
  const generateInsights = () => {
    const insights: Insight[] = [];

    if (!results) return insights;

    // Profit Margin Analysis
    if (results.profitMargin) {
      if (results.profitMargin > 30) {
        insights.push({
          type: "success",
          icon: Award,
          title:
            language === "el"
              ? "Εξαιρετικό Περιθώριο Κέρδους"
              : "Excellent Profit Margin",
          content:
            language === "el"
              ? `Το περιθώριο κέρδους ${results.profitMargin.toFixed(1)}% είναι πολύ καλό για τη βιομηχανία θαλασσινών.`
              : `The profit margin of ${results.profitMargin.toFixed(1)}% is excellent for the seafood industry.`,
          value: `${results.profitMargin.toFixed(1)}%`,
          trend: "up",
        });
      } else if (results.profitMargin > 15) {
        insights.push({
          type: "info",
          icon: Target,
          title:
            language === "el" ? "Καλό Περιθώριο Κέρδους" : "Good Profit Margin",
          content:
            language === "el"
              ? `Το περιθώριο κέρδους ${results.profitMargin.toFixed(1)}% είναι στο μέσο όρο της αγοράς.`
              : `The profit margin of ${results.profitMargin.toFixed(1)}% is within market average.`,
          value: `${results.profitMargin.toFixed(1)}%`,
          trend: "stable",
        });
      } else {
        insights.push({
          type: "warning",
          icon: AlertTriangle,
          title:
            language === "el"
              ? "Χαμηλό Περιθώριο Κέρδους"
              : "Low Profit Margin",
          content:
            language === "el"
              ? `Το περιθώριο κέρδους ${results.profitMargin.toFixed(1)}% είναι χαμηλό. Εξετάστε μείωση κόστους ή αύξηση τιμής.`
              : `The profit margin of ${results.profitMargin.toFixed(1)}% is low. Consider cost reduction or price increase.`,
          value: `${results.profitMargin.toFixed(1)}%`,
          trend: "down",
        });
      }
    }

    // Loss Analysis
    if (results.totalLossPercentage !== undefined) {
      if (results.totalLossPercentage > 25) {
        insights.push({
          type: "error",
          icon: TrendingDown,
          title: language === "el" ? "Υψηλές Απώλειες" : "High Losses",
          content:
            language === "el"
              ? `Οι απώλειες ${results.totalLossPercentage.toFixed(1)}% είναι πολύ υψηλές. Βελτιώστε τις διαδικασίες επεξεργασίας.`
              : `Losses of ${results.totalLossPercentage.toFixed(1)}% are very high. Improve processing procedures.`,
          value: `${results.totalLossPercentage.toFixed(1)}%`,
          trend: "down",
        });
      } else if (results.totalLossPercentage > 15) {
        insights.push({
          type: "warning",
          icon: AlertCircle,
          title: language === "el" ? "Μέτριες Απώλειες" : "Moderate Losses",
          content:
            language === "el"
              ? `Οι απώλειες ${results.totalLossPercentage.toFixed(1)}% είναι στο μέσο όρο. Υπάρχει περιθώριο βελτίωσης.`
              : `Losses of ${results.totalLossPercentage.toFixed(1)}% are average. There's room for improvement.`,
          value: `${results.totalLossPercentage.toFixed(1)}%`,
          trend: "stable",
        });
      } else {
        insights.push({
          type: "success",
          icon: CheckCircle,
          title: language === "el" ? "Χαμηλές Απώλειες" : "Low Losses",
          content:
            language === "el"
              ? `Εξαιρετική διαχείριση απωλειών στο ${results.totalLossPercentage.toFixed(1)}%. Συνεχίστε τις καλές πρακτικές.`
              : `Excellent loss management at ${results.totalLossPercentage.toFixed(1)}%. Continue the good practices.`,
          value: `${results.totalLossPercentage.toFixed(1)}%`,
          trend: "up",
        });
      }
    }

    // Cost per Kg Analysis
    if (results.costPerKg && formData.productType) {
      const avgCosts = {
        fish: { min: 8, max: 15 },
        shellfish: { min: 12, max: 25 },
        cephalopods: { min: 10, max: 20 },
        processed: { min: 15, max: 30 },
      };

      const productAvg =
        avgCosts[formData.productType as keyof typeof avgCosts] ||
        avgCosts.fish;

      if (results.costPerKg < productAvg.min) {
        insights.push({
          type: "success",
          icon: DollarSign,
          title:
            language === "el" ? "Ανταγωνιστικό Κόστος" : "Competitive Cost",
          content:
            language === "el"
              ? `Το κόστος €${results.costPerKg.toFixed(2)}/kg είναι κάτω από τον μέσο όρο της κατηγορίας.`
              : `The cost of €${results.costPerKg.toFixed(2)}/kg is below category average.`,
          value: `€${results.costPerKg.toFixed(2)}/kg`,
          trend: "up",
        });
      } else if (results.costPerKg > productAvg.max) {
        insights.push({
          type: "warning",
          icon: TrendingUp,
          title: language === "el" ? "Υψηλό Κόστος" : "High Cost",
          content:
            language === "el"
              ? `Το κόστος €${results.costPerKg.toFixed(2)}/kg είναι πάνω από τον μέσο όρο. Εξετάστε βε��τιστοποίηση.`
              : `The cost of €${results.costPerKg.toFixed(2)}/kg is above average. Consider optimization.`,
          value: `€${results.costPerKg.toFixed(2)}/kg`,
          trend: "down",
        });
      }
    }

    // VAT Analysis
    if (formData.vatRate !== undefined) {
      if (formData.vatRate === 0) {
        insights.push({
          type: "info",
          icon: Percent,
          title: language === "el" ? "Απαλλαγή ΦΠΑ" : "VAT Exempt",
          content:
            language === "el"
              ? "Το προϊόν έχει απαλλαγή ΦΠΑ, που βελτιώνει την ανταγωνιστικότητα."
              : "The product is VAT exempt, which improves competitiveness.",
          value: "0%",
          trend: "up",
        });
      } else if (formData.vatRate > 20) {
        insights.push({
          type: "warning",
          icon: Calculator,
          title: language === "el" ? "Υψηλός ΦΠΑ" : "High VAT",
          content:
            language === "el"
              ? `Ο ΦΠΑ ${formData.vatRate}% επηρεάζει την τελική τιμή. Εξετάστε αν εφαρμόζεται σωστά.`
              : `VAT of ${formData.vatRate}% affects final price. Check if correctly applied.`,
          value: `${formData.vatRate}%`,
          trend: "down",
        });
      }
    }

    // Break-even Analysis
    if (results.breakEvenPrice && results.finalPrice) {
      const margin =
        ((results.finalPrice - results.breakEvenPrice) /
          results.breakEvenPrice) *
        100;

      if (margin > 50) {
        insights.push({
          type: "success",
          icon: Target,
          title:
            language === "el"
              ? "Μεγάλο Περιθώριο Ασφαλείας"
              : "Large Safety Margin",
          content:
            language === "el"
              ? `Η τιμή πώλησης είναι ${margin.toFixed(1)}% πάνω από το break-even point.`
              : `Selling price is ${margin.toFixed(1)}% above break-even point.`,
          value: `+${margin.toFixed(1)}%`,
          trend: "up",
        });
      } else if (margin < 20) {
        insights.push({
          type: "warning",
          icon: AlertTriangle,
          title:
            language === "el"
              ? "Μικρό Περιθώριο Ασφαλείας"
              : "Small Safety Margin",
          content:
            language === "el"
              ? `Η τιμή είναι μόλις ${margin.toFixed(1)}% πάνω από το break-even. Προσοχή στα κόστη.`
              : `Price is only ${margin.toFixed(1)}% above break-even. Watch costs carefully.`,
          value: `+${margin.toFixed(1)}%`,
          trend: "down",
        });
      }
    }

    // Quality-Price Analysis
    if (formData.quality && results.finalPrice) {
      const qualityBenchmarks = {
        A: { min: 15, name: "Εξαιρετική" },
        B: { min: 12, name: "Καλή" },
        C: { min: 8, name: "Μέτρια" },
      };

      const qualityData =
        qualityBenchmarks[formData.quality as keyof typeof qualityBenchmarks];
      if (qualityData && results.finalPrice >= qualityData.min) {
        insights.push({
          type: "success",
          icon: Award,
          title:
            language === "el"
              ? "Ποιότητα-Τιμή Ισορροπημένη"
              : "Quality-Price Balanced",
          content:
            language === "el"
              ? `Η τιμή €${results.finalPrice.toFixed(2)} αντιστοιχεί στην ποιότητα "${qualityData.name}".`
              : `Price €${results.finalPrice.toFixed(2)} matches "${qualityData.name}" quality.`,
          value: formData.quality,
          trend: "up",
        });
      }
    }

    // Market recommendations
    insights.push({
      type: "info",
      icon: BarChart3,
      title: language === "el" ? "Σύσταση Αγοράς" : "Market Recommendation",
      content:
        language === "el"
          ? "Βάσει της ανάλυσης, εξετάστε bulk αγορές για καλύτερες τιμές και μακροχρόνιες συμφωνίες με προμηθευτές."
          : "Based on analysis, consider bulk purchases for better prices and long-term supplier agreements.",
      value: "Market",
      trend: "stable",
    });

    return insights;
  };

  const insights = generateInsights();

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case "stable":
        return <BarChart3 className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  if (!results || insights.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>
              {language === "el" ? "Έξυπνες Συμβουλές" : "Smart Insights"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>
              {language === "el"
                ? "Εκτελέστε υπολογισμό για να δείτε έξυπνες συμβουλές και αναλύσεις"
                : "Run calculation to see smart insights and analysis"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <span>
            {language === "el" ? "Έξυπνες Συμβουλές" : "Smart Insights"}
          </span>
          <Badge variant="secondary" className="ml-2">
            {insights.length} {language === "el" ? "συμβουλές" : "insights"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${getBgColor(insight.type)} transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${getIconColor(insight.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {insight.title}
                      </h4>
                      {insight.value && (
                        <Badge variant="outline" className="text-xs">
                          {insight.value}
                        </Badge>
                      )}
                      {insight.trend && getTrendIcon(insight.trend)}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {insight.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Summary Section */}
        {results && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                {language === "el" ? "Σύνοψη Απόδοσης" : "Performance Summary"}
              </h5>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Efficiency Score */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
                      {isFinite(results.efficiencyScore)
                        ? results.efficiencyScore.toFixed(0)
                        : "0"}
                      %
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-500 font-medium">
                      {language === "el" ? "Απόδοση" : "Efficiency"}
                    </div>
                  </div>
                </div>

                {/* Profit Margin */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
                      {isFinite(results.profitMargin)
                        ? results.profitMargin.toFixed(1)
                        : "0.0"}
                      %
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500 font-medium">
                      {language === "el" ? "Περιθώριο" : "Margin"}
                    </div>
                  </div>
                </div>

                {/* Competitive Position */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="text-sm font-bold text-purple-700 dark:text-purple-400 mb-1">
                      {language === "el"
                        ? results.competitivePosition === "Competitive"
                          ? "Ανταγωνιστικό"
                          : results.competitivePosition === "Premium"
                            ? "Premium"
                            : "Μέτριο"
                        : results.competitivePosition || "Average"}
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-500 font-medium">
                      {language === "el" ? "Θέση" : "Position"}
                    </div>
                  </div>
                </div>

                {/* Total Costs */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-700 dark:text-orange-400 mb-1">
                      €
                      {isFinite(results.totalCosts)
                        ? (results.totalCosts / 1000).toFixed(1)
                        : "0.0"}
                      k
                    </div>
                    <div className="text-xs text-orange-600 dark:text-orange-500 font-medium">
                      {language === "el" ? "Συν. Κόστος" : "Total Cost"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartInsightsPanel;
