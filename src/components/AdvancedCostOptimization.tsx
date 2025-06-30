import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingDown,
  Target,
  DollarSign,
  Calculator,
  BarChart3,
  LineChart,
  PieChart,
  ArrowUp,
  ArrowDown,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle,
  Settings,
  TrendingUp,
  Activity,
  Layers,
} from "lucide-react";

interface AdvancedCostOptimizationProps {
  formData: any;
  results: any;
  onUpdateFormData: (updates: any) => void;
}

const AdvancedCostOptimization: React.FC<AdvancedCostOptimizationProps> = ({
  formData,
  results,
  onUpdateFormData,
}) => {
  const { language, t } = useLanguage();
  const [optimizationResults, setOptimizationResults] = useState<any>(null);
  const [pricingScenarios, setPricingScenarios] = useState<any[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState("margin");

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

  // ABC Analysis for cost optimization
  const performABCAnalysis = () => {
    const costItems = [
      {
        name: language === "el" ? "Αγορά Προϊόντος" : "Product Purchase",
        value: results?.breakdown?.purchase || 0,
        category: "A",
      },
      {
        name: language === "el" ? "Εργασία" : "Labor",
        value: results?.breakdown?.labor || 0,
        category: "B",
      },
      {
        name: language === "el" ? "Μεταφορά" : "Transport",
        value: results?.breakdown?.transport || 0,
        category: "B",
      },
      {
        name: language === "el" ? "Συσκευασία" : "Packaging",
        value: results?.breakdown?.packaging || 0,
        category: "C",
      },
      {
        name: language === "el" ? "Ενέργεια" : "Energy",
        value: results?.breakdown?.energy || 0,
        category: "C",
      },
      {
        name: language === "el" ? "Λοιπά" : "Other",
        value: results?.breakdown?.other || 0,
        category: "C",
      },
    ].filter((item) => item.value > 0);

    const totalCost = costItems.reduce((sum, item) => sum + item.value, 0);

    return costItems
      .map((item) => ({
        ...item,
        percentage: totalCost > 0 ? (item.value / totalCost) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value)
      .map((item, index) => ({
        ...item,
        category: index < 2 ? "A" : index < 5 ? "B" : "C",
        priority: index < 2 ? "high" : index < 5 ? "medium" : "low",
      }));
  };

  // Dynamic pricing models
  const calculatePricingModels = () => {
    const baseCost = results?.totalCosts || 0;
    const baseWeight = results?.netWeight || 1;
    const costPerKg = baseCost / baseWeight;

    const models = [
      {
        name: language === "el" ? "Κοστοποίηση-Plus" : "Cost-Plus Pricing",
        description:
          language === "el"
            ? "Κόστος + σταθερό περιθώριο"
            : "Cost + fixed margin",
        margins: [15, 20, 25, 30],
        type: "standard",
        icon: Calculator,
        color: "blue",
      },
      {
        name: language === "el" ? "Τιμολόγηση Αξίας" : "Value-Based Pricing",
        description:
          language === "el"
            ? "Βάσει αντιληπτής αξίας"
            : "Based on perceived value",
        margins: [25, 35, 45, 55],
        type: "premium",
        icon: Award,
        color: "purple",
      },
      {
        name: language === "el" ? "Ανταγωνιστική" : "Competitive Pricing",
        description:
          language === "el" ? "Βάσει τιμών αγοράς" : "Based on market prices",
        margins: [12, 18, 22, 28],
        type: "market",
        icon: Target,
        color: "green",
      },
      {
        name: language === "el" ? "Διείσδυση Αγοράς" : "Penetration Pricing",
        description:
          language === "el"
            ? "Χαμηλή τιμή για είσοδο"
            : "Low price for market entry",
        margins: [8, 12, 16, 20],
        type: "penetration",
        icon: TrendingDown,
        color: "orange",
      },
      {
        name: language === "el" ? "Premium Positioning" : "Premium Positioning",
        description:
          language === "el"
            ? "Υψηλή τιμή για premium brand"
            : "High price for premium brand",
        margins: [40, 50, 60, 70],
        type: "luxury",
        icon: TrendingUp,
        color: "pink",
      },
    ];

    return models.map((model) => ({
      ...model,
      scenarios: model.margins.map((margin) => {
        const price = costPerKg * (1 + margin / 100);
        const revenue = price * baseWeight;
        const profit = revenue - baseCost;
        const profitPerKg = profit / baseWeight;

        return {
          margin,
          price,
          revenue,
          profit,
          profitPerKg,
          breakEven: baseWeight,
          roi: baseCost > 0 ? (profit / baseCost) * 100 : 0,
        };
      }),
    }));
  };

  // Cost optimization suggestions
  const generateOptimizationSuggestions = () => {
    const abcAnalysis = performABCAnalysis();
    const suggestions = [];

    // High-impact suggestions (Category A)
    abcAnalysis
      .filter((item) => item.category === "A")
      .forEach((item) => {
        if (item.percentage > 50) {
          suggestions.push({
            category: "critical",
            title:
              language === "el"
                ? `Βελτιστοποίηση ${item.name}`
                : `Optimize ${item.name}`,
            impact: "high",
            effort: "medium",
            savings: item.value * 0.1, // 10% potential savings
            actions: [
              language === "el"
                ? "Διαπραγμάτευση με προμηθευτές"
                : "Negotiate with suppliers",
              language === "el"
                ? "Εύρεση εναλλακτικών προμηθευτών"
                : "Find alternative suppliers",
              language === "el" ? "Αγορές μεγάλου όγκου" : "Bulk purchasing",
            ],
          });
        }
      });

    // Medium-impact suggestions (Category B)
    abcAnalysis
      .filter((item) => item.category === "B")
      .forEach((item) => {
        suggestions.push({
          category: "important",
          title:
            language === "el"
              ? `Εξοικονόμηση ${item.name}`
              : `Save on ${item.name}`,
          impact: "medium",
          effort: "low",
          savings: item.value * 0.05, // 5% potential savings
          actions: [
            language === "el"
              ? "Αυτοματοποίηση διαδικασιών"
              : "Process automation",
            language === "el"
              ? "Βελτίωση αποδοτικότητας"
              : "Efficiency improvements",
            language === "el" ? "Εκπαίδευση προσωπικού" : "Staff training",
          ],
        });
      });

    // Process improvements
    if (results?.netWeight && results?.rawWeight) {
      const efficiency = (results.netWeight / results.rawWeight) * 100;
      if (efficiency < 80) {
        suggestions.push({
          category: "opportunity",
          title:
            language === "el"
              ? "Βελτίωση Απόδοσης Επεξεργασίας"
              : "Improve Processing Efficiency",
          impact: "high",
          effort: "medium",
          savings: (results?.totalCosts || 0) * 0.15, // 15% potential savings
          actions: [
            language === "el"
              ? "Βελτίωση τεχνικών επεξεργασίας"
              : "Improve processing techniques",
            language === "el" ? "Ανανέωση εξοπλισμού" : "Equipment upgrade",
            language === "el" ? "Μείωση απωλειών" : "Reduce waste",
          ],
        });
      }
    }

    // Energy optimization
    if (results?.breakdown?.energy > (results?.totalCosts || 0) * 0.1) {
      suggestions.push({
        category: "sustainable",
        title:
          language === "el"
            ? "Ενεργειακή Βελτιστοποίηση"
            : "Energy Optimization",
        impact: "medium",
        effort: "high",
        savings: (results?.breakdown?.energy || 0) * 0.25, // 25% potential savings
        actions: [
          language === "el" ? "LED φωτισμός" : "LED lighting",
          language === "el"
            ? "Ενεργειακά αποδοτικός εξοπλισμός"
            : "Energy-efficient equipment",
          language === "el"
            ? "Ανανεώσιμες πηγές ενέργειας"
            : "Renewable energy sources",
        ],
      });
    }

    return suggestions.sort((a, b) => b.savings - a.savings);
  };

  // Real-time market analysis
  const performMarketAnalysis = () => {
    const currentPrice = results?.finalPrice || 0;
    const marketRanges = {
      budget: { min: currentPrice * 0.7, max: currentPrice * 0.9 },
      standard: { min: currentPrice * 0.9, max: currentPrice * 1.2 },
      premium: { min: currentPrice * 1.2, max: currentPrice * 1.8 },
      luxury: { min: currentPrice * 1.8, max: currentPrice * 2.5 },
    };

    return Object.entries(marketRanges).map(([segment, range]) => ({
      segment,
      minPrice: range.min,
      maxPrice: range.max,
      recommendedPrice: (range.min + range.max) / 2,
      marketShare:
        segment === "standard"
          ? 45
          : segment === "budget"
            ? 30
            : segment === "premium"
              ? 20
              : 5,
      growth:
        segment === "premium"
          ? 8
          : segment === "luxury"
            ? 12
            : segment === "standard"
              ? 3
              : -2,
    }));
  };

  useEffect(() => {
    if (results) {
      const optimizations = generateOptimizationSuggestions();
      const pricing = calculatePricingModels();

      setOptimizationResults({
        abcAnalysis: performABCAnalysis(),
        suggestions: optimizations,
        totalSavings: optimizations.reduce((sum, s) => sum + s.savings, 0),
      });

      setPricingScenarios(pricing);
    }
  }, [results, language]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "important":
        return <Activity className="w-5 h-5 text-orange-600" />;
      case "opportunity":
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case "sustainable":
        return <Zap className="w-5 h-5 text-green-600" />;
      default:
        return <Settings className="w-5 h-5 text-gray-600" />;
    }
  };

  const getModelColor = (color: string) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      green: "bg-green-50 border-green-200 text-green-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      pink: "bg-pink-50 border-pink-200 text-pink-800",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (!results) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <TrendingDown className="w-6 h-6 text-blue-600" />
            {language === "el" ? "Βελτιστοποίηση Κόστους" : "Cost Optimization"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {language === "el"
                ? "Εκτελέστε υπολογισμούς για να δείτε προτάσεις βελτιστοποίησης"
                : "Run calculations to see optimization suggestions"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-3">
            <TrendingDown className="w-6 h-6 text-blue-600" />
            {language === "el"
              ? "Προχωρημένη Βελτιστοποίηση Κόστους"
              : "Advanced Cost Optimization"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={selectedStrategy} onValueChange={setSelectedStrategy}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="margin">
                {language === "el" ? "Ανάλυση ABC" : "ABC Analysis"}
              </TabsTrigger>
              <TabsTrigger value="pricing">
                {language === "el" ? "Μοντέλα Τιμολόγησης" : "Pricing Models"}
              </TabsTrigger>
              <TabsTrigger value="optimization">
                {language === "el" ? "Βελτιστοποίηση" : "Optimization"}
              </TabsTrigger>
              <TabsTrigger value="market">
                {language === "el" ? "Ανάλυση Αγοράς" : "Market Analysis"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="margin" className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  {language === "el"
                    ? "Ανάλυση ABC Κόστους"
                    : "ABC Cost Analysis"}
                </h4>
                <p className="text-blue-700 text-sm mb-4">
                  {language === "el"
                    ? "Κατηγοριοποίηση κοστών βάσει επίδρασης για στοχευμένη βελτιστοποίηση"
                    : "Cost categorization by impact for targeted optimization"}
                </p>
              </div>

              {optimizationResults?.abcAnalysis && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["A", "B", "C"].map((category) => {
                    const items = optimizationResults.abcAnalysis.filter(
                      (item: any) => item.category === category,
                    );
                    const categoryTotal = items.reduce(
                      (sum: number, item: any) => sum + item.value,
                      0,
                    );
                    const categoryColor =
                      category === "A"
                        ? "red"
                        : category === "B"
                          ? "orange"
                          : "green";

                    return (
                      <div
                        key={category}
                        className={`p-4 rounded-lg border-2 ${
                          category === "A"
                            ? "bg-red-50 border-red-200"
                            : category === "B"
                              ? "bg-orange-50 border-orange-200"
                              : "bg-green-50 border-green-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5
                            className={`font-bold text-lg ${
                              category === "A"
                                ? "text-red-800"
                                : category === "B"
                                  ? "text-orange-800"
                                  : "text-green-800"
                            }`}
                          >
                            {language === "el" ? "Κατηγορία" : "Category"}{" "}
                            {category}
                          </h5>
                          <Badge
                            variant="outline"
                            className={
                              category === "A"
                                ? "border-red-300 text-red-700"
                                : category === "B"
                                  ? "border-orange-300 text-orange-700"
                                  : "border-green-300 text-green-700"
                            }
                          >
                            {category === "A"
                              ? language === "el"
                                ? "Κρίσιμα"
                                : "Critical"
                              : category === "B"
                                ? language === "el"
                                  ? "Σημαντικά"
                                  : "Important"
                                : language === "el"
                                  ? "Λοιπά"
                                  : "Others"}
                          </Badge>
                        </div>

                        <div
                          className={`text-2xl font-bold mb-2 ${
                            category === "A"
                              ? "text-red-900"
                              : category === "B"
                                ? "text-orange-900"
                                : "text-green-900"
                          }`}
                        >
                          {formatCurrency(categoryTotal)}
                        </div>

                        <div className="space-y-2">
                          {items.map((item: any, index: number) => (
                            <div
                              key={index}
                              className="bg-white/70 p-2 rounded"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">
                                  {item.name}
                                </span>
                                <span className="text-sm">
                                  {formatPercentage(item.percentage)}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    category === "A"
                                      ? "bg-red-400"
                                      : category === "B"
                                        ? "bg-orange-400"
                                        : "bg-green-400"
                                  }`}
                                  style={{
                                    width: `${Math.min(item.percentage, 100)}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div
                          className={`mt-3 p-2 rounded text-xs ${
                            category === "A"
                              ? "bg-red-100 text-red-700"
                              : category === "B"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {category === "A"
                            ? language === "el"
                              ? "80% της προσοχής"
                              : "80% of attention"
                            : category === "B"
                              ? language === "el"
                                ? "15% της προσοχής"
                                : "15% of attention"
                              : language === "el"
                                ? "5% της προσοχής"
                                : "5% of attention"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {language === "el"
                    ? "Στρατηγικές Τιμολόγησης"
                    : "Pricing Strategies"}
                </h4>
                <p className="text-purple-700 text-sm">
                  {language === "el"
                    ? "Διαφορετικά μοντέλα τιμολόγησης για βελτιστοποίηση κερδοφορίας"
                    : "Different pricing models for profitability optimization"}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pricingScenarios.map((model, modelIndex) => {
                  const Icon = model.icon;
                  return (
                    <Card
                      key={modelIndex}
                      className={`border-2 ${getModelColor(model.color)}`}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Icon className="w-5 h-5" />
                          {model.name}
                        </CardTitle>
                        <p className="text-sm opacity-80">
                          {model.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {model.scenarios.map(
                            (scenario: any, scenarioIndex: number) => (
                              <div
                                key={scenarioIndex}
                                className="bg-white/70 p-3 rounded border"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <Badge variant="outline">
                                    {formatPercentage(scenario.margin)}{" "}
                                    {language === "el" ? "περιθώριο" : "margin"}
                                  </Badge>
                                  <span className="font-bold text-lg">
                                    {formatCurrency(scenario.price)}/kg
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-gray-600">
                                      {language === "el"
                                        ? "Έσοδα:"
                                        : "Revenue:"}
                                    </span>
                                    <span className="font-medium ml-1">
                                      {formatCurrency(scenario.revenue)}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      {language === "el"
                                        ? "Κέρδος:"
                                        : "Profit:"}
                                    </span>
                                    <span className="font-medium ml-1">
                                      {formatCurrency(scenario.profit)}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">ROI:</span>
                                    <span className="font-medium ml-1">
                                      {formatPercentage(scenario.roi)}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      {language === "el"
                                        ? "€/kg κέρδος:"
                                        : "€/kg profit:"}
                                    </span>
                                    <span className="font-medium ml-1">
                                      {formatCurrency(scenario.profitPerKg)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="optimization" className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {language === "el"
                    ? "Προτάσεις Βελτιστοποίησης"
                    : "Optimization Suggestions"}
                </h4>
                {optimizationResults?.totalSavings && (
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-green-900">
                      {formatCurrency(optimizationResults.totalSavings)}
                    </div>
                    <div className="text-green-700">
                      {language === "el"
                        ? "Δυνητικές εξοικονομήσεις"
                        : "Potential savings"}
                    </div>
                  </div>
                )}
              </div>

              {optimizationResults?.suggestions && (
                <div className="space-y-4">
                  {optimizationResults.suggestions.map(
                    (suggestion: any, index: number) => (
                      <Card
                        key={index}
                        className="border-l-4 border-l-blue-500"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              {getCategoryIcon(suggestion.category)}
                              <div>
                                <h5 className="font-medium">
                                  {suggestion.title}
                                </h5>
                                <div className="flex items-center gap-4 mt-1">
                                  <Badge
                                    variant="outline"
                                    className={getImpactColor(
                                      suggestion.impact,
                                    )}
                                  >
                                    {language === "el"
                                      ? "Επίδραση:"
                                      : "Impact:"}{" "}
                                    {suggestion.impact}
                                  </Badge>
                                  <Badge variant="outline">
                                    {language === "el"
                                      ? "Προσπάθεια:"
                                      : "Effort:"}{" "}
                                    {suggestion.effort}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">
                                {formatCurrency(suggestion.savings)}
                              </div>
                              <div className="text-sm text-gray-600">
                                {language === "el" ? "εξοικονόμηση" : "savings"}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h6 className="font-medium text-sm">
                              {language === "el"
                                ? "Προτεινόμενες ενέργειες:"
                                : "Recommended actions:"}
                            </h6>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {suggestion.actions.map(
                                (action: string, actionIndex: number) => (
                                  <li
                                    key={actionIndex}
                                    className="flex items-center gap-2"
                                  >
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {action}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="market" className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-medium text-indigo-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {language === "el"
                    ? "Ανάλυση Τμημάτων Αγοράς"
                    : "Market Segment Analysis"}
                </h4>
                <p className="text-indigo-700 text-sm">
                  {language === "el"
                    ? "Τιμολογιακή στρατηγική βάσει τμημάτων αγοράς"
                    : "Pricing strategy based on market segments"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {performMarketAnalysis().map((segment, index) => (
                  <Card key={index} className="border-2 border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span className="capitalize">{segment.segment}</span>
                        <Badge
                          variant={
                            segment.growth > 0 ? "default" : "destructive"
                          }
                        >
                          {segment.growth > 0 ? (
                            <ArrowUp className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDown className="w-3 h-3 mr-1" />
                          )}
                          {formatPercentage(Math.abs(segment.growth))}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {language === "el" ? "Μερίδιο:" : "Share:"}
                          </span>
                          <span className="font-medium">
                            {formatPercentage(segment.marketShare)}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {language === "el"
                              ? "Εύρος τιμών:"
                              : "Price range:"}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(segment.minPrice)} -{" "}
                            {formatCurrency(segment.maxPrice)}
                          </span>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">
                              {formatCurrency(segment.recommendedPrice)}/kg
                            </div>
                            <div className="text-sm text-gray-600">
                              {language === "el"
                                ? "Προτεινόμενη τιμή"
                                : "Recommended price"}
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() =>
                            onUpdateFormData({
                              targetSellingPrice: segment.recommendedPrice,
                            })
                          }
                        >
                          {language === "el" ? "Εφαρμογή Τιμής" : "Apply Price"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedCostOptimization;
