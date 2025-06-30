import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Calculator,
  TrendingUp,
  BarChart3,
  Target,
  DollarSign,
  Zap,
  Clock,
  Calendar,
  Percent,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  TrendingDown,
  Scale,
  Package,
  Truck,
  Factory,
  Globe,
  Users,
  Building,
} from "lucide-react";
import type { CalculationResults, FormData } from "@/utils/calc";

interface AdvancedCostingFeaturesProps {
  formData: FormData;
  results?: CalculationResults;
  onUpdateFormData: (updates: Partial<FormData>) => void;
}

const AdvancedCostingFeatures: React.FC<AdvancedCostingFeaturesProps> = ({
  formData,
  results,
  onUpdateFormData,
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("competitor");

  // Competitor analysis state
  const [competitors, setCompetitors] = useState([
    { id: 1, name: "Competitor A", price: 0, marketShare: 0 },
    { id: 2, name: "Competitor B", price: 0, marketShare: 0 },
    { id: 3, name: "Competitor C", price: 0, marketShare: 0 },
  ]);

  // Market factors state
  const [marketFactors, setMarketFactors] = useState({
    seasonalMultiplier: 1.0,
    demandLevel: 1.0,
    supplyCost: 1.0,
    currencyRate: 1.0,
  });

  // Quality factors state
  const [qualityFactors, setQualityFactors] = useState({
    freshness: 100,
    size: 100,
    appearance: 100,
    packaging: 100,
  });

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

  // Calculate competitive position
  const getCompetitivePosition = () => {
    const ourPrice = results?.finalPrice || 0;
    const competitorPrices = competitors
      .filter((c) => c.price > 0)
      .map((c) => c.price);

    if (competitorPrices.length === 0) return "N/A";

    const avgCompetitorPrice =
      competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
    const priceRatio = ourPrice / avgCompetitorPrice;

    if (priceRatio < 0.9)
      return language === "el" ? "Πολύ Ανταγωνιστικό" : "Very Competitive";
    if (priceRatio < 1.1)
      return language === "el" ? "Ανταγωνιστικό" : "Competitive";
    if (priceRatio < 1.3) return language === "el" ? "Premium" : "Premium";
    return language === "el" ? "Πολύ Ακριβό" : "Very Expensive";
  };

  // Calculate quality score
  const calculateQualityScore = () => {
    const scores = Object.values(qualityFactors);
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  };

  // Market insights
  const getMarketInsights = () => {
    const insights = [];
    const ourPrice = results?.finalPrice || 0;
    const avgCompetitorPrice =
      competitors.length > 0
        ? competitors.reduce((sum, c) => sum + c.price, 0) / competitors.length
        : 0;

    if (ourPrice > avgCompetitorPrice * 1.2) {
      insights.push({
        type: "warning",
        icon: AlertTriangle,
        title: language === "el" ? "Υψηλή Τιμή" : "High Price",
        message:
          language === "el"
            ? "Η τιμή σας είναι 20%+ πάνω από τον ανταγωνισμό"
            : "Your price is 20%+ above competition",
      });
    }

    if (marketFactors.seasonalMultiplier > 1.2) {
      insights.push({
        type: "success",
        icon: TrendingUp,
        title: language === "el" ? "Υψηλή Εποχή" : "High Season",
        message:
          language === "el"
            ? "Ευνοϊκή εποχή για αυξημένες τιμές"
            : "Favorable season for increased pricing",
      });
    }

    const qualityScore = calculateQualityScore();
    if (qualityScore > 90) {
      insights.push({
        type: "success",
        icon: CheckCircle,
        title: language === "el" ? "Υψηλή Ποιότητα" : "High Quality",
        message:
          language === "el"
            ? "Εξαιρετική ποιότητα προϊόντος δικαιολογεί premium τιμή"
            : "Excellent product quality justifies premium pricing",
      });
    }

    return insights;
  };

  const updateCompetitor = (id: number, field: string, value: number) => {
    setCompetitors((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, [field]: value } : comp)),
    );
  };

  const updateMarketFactor = (factor: string, value: number) => {
    setMarketFactors((prev) => ({
      ...prev,
      [factor]: value,
    }));
  };

  const updateQualityFactor = (factor: string, value: number) => {
    setQualityFactors((prev) => ({
      ...prev,
      [factor]: value,
    }));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>
            {language === "el"
              ? "Προχωρημένα Εργαλεία Κοστολόγησης"
              : "Advanced Costing Tools"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="competitor" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              {language === "el" ? "Ανταγωνισμός" : "Competition"}
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {language === "el" ? "Αγορά" : "Market"}
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              {language === "el" ? "Ποιότητα" : "Quality"}
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              {language === "el" ? "Συμβουλές" : "Insights"}
            </TabsTrigger>
          </TabsList>

          {/* Competitor Analysis Tab */}
          <TabsContent value="competitor" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                {language === "el"
                  ? "Ανάλυση Ανταγωνισμού"
                  : "Competitive Analysis"}
              </h3>

              <div className="grid gap-4">
                {competitors.map((competitor) => (
                  <div
                    key={competitor.id}
                    className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <Label className="text-sm">
                        {language === "el" ? "Ανταγωνιστής" : "Competitor"}
                      </Label>
                      <Input
                        value={competitor.name}
                        onChange={(e) =>
                          updateCompetitor(
                            competitor.id,
                            "name",
                            e.target.value as any,
                          )
                        }
                        placeholder={`Competitor ${competitor.id}`}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">
                        {language === "el" ? "Τιμή (€/kg)" : "Price (€/kg)"}
                      </Label>
                      <Input
                        type="number"
                        value={competitor.price}
                        onChange={(e) =>
                          updateCompetitor(
                            competitor.id,
                            "price",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        placeholder="0.00"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">
                        {language === "el" ? "Μερίδιο (%)" : "Market Share (%)"}
                      </Label>
                      <Input
                        type="number"
                        value={competitor.marketShare}
                        onChange={(e) =>
                          updateCompetitor(
                            competitor.id,
                            "marketShare",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        placeholder="0"
                        max="100"
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {results && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">
                    {language === "el"
                      ? "Ανταγωνιστική Θέση"
                      : "Competitive Position"}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-blue-600">
                        {language === "el" ? "Η Τιμή Μας:" : "Our Price:"}
                      </span>
                      <div className="text-lg font-bold text-blue-900">
                        {formatCurrency(results.finalPrice || 0)}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-blue-600">
                        {language === "el" ? "Θέση:" : "Position:"}
                      </span>
                      <div className="text-lg font-bold text-blue-900">
                        {getCompetitivePosition()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Market Factors Tab */}
          <TabsContent value="market" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                {language === "el" ? "Παράγοντες Αγοράς" : "Market Factors"}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === "el"
                      ? "Εποχιακός Συντελεστής"
                      : "Seasonal Factor"}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="2.0"
                      value={marketFactors.seasonalMultiplier}
                      onChange={(e) =>
                        updateMarketFactor(
                          "seasonalMultiplier",
                          parseFloat(e.target.value) || 1.0,
                        )
                      }
                    />
                    <Badge variant="outline">
                      {((marketFactors.seasonalMultiplier - 1) * 100).toFixed(
                        0,
                      )}
                      %
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    {language === "el" ? "Επίπεδο Ζήτησης" : "Demand Level"}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="2.0"
                      value={marketFactors.demandLevel}
                      onChange={(e) =>
                        updateMarketFactor(
                          "demandLevel",
                          parseFloat(e.target.value) || 1.0,
                        )
                      }
                    />
                    <Badge variant="outline">
                      {((marketFactors.demandLevel - 1) * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    {language === "el" ? "Κόστος Προμήθειας" : "Supply Cost"}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="2.0"
                      value={marketFactors.supplyCost}
                      onChange={(e) =>
                        updateMarketFactor(
                          "supplyCost",
                          parseFloat(e.target.value) || 1.0,
                        )
                      }
                    />
                    <Badge variant="outline">
                      {((marketFactors.supplyCost - 1) * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    {language === "el"
                      ? "Συναλλαγματική Ισοτιμία"
                      : "Currency Rate"}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.01"
                      min="0.5"
                      max="2.0"
                      value={marketFactors.currencyRate}
                      onChange={(e) =>
                        updateMarketFactor(
                          "currencyRate",
                          parseFloat(e.target.value) || 1.0,
                        )
                      }
                    />
                    <Badge variant="outline">
                      {((marketFactors.currencyRate - 1) * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Market Summary */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">
                  {language === "el"
                    ? "Συνολικός Αντίκτυπος Αγοράς"
                    : "Total Market Impact"}
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-green-600">
                      {language === "el"
                        ? "Συνολικός Πολλαπλασιαστής:"
                        : "Total Multiplier:"}
                    </span>
                    <div className="text-lg font-bold text-green-900">
                      {Object.values(marketFactors)
                        .reduce((a, b) => a * b, 1)
                        .toFixed(2)}
                      x
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-green-600">
                      {language === "el"
                        ? "Προσαρμοσμένη Τιμή:"
                        : "Adjusted Price:"}
                    </span>
                    <div className="text-lg font-bold text-green-900">
                      {formatCurrency(
                        (results?.finalPrice || 0) *
                          Object.values(marketFactors).reduce(
                            (a, b) => a * b,
                            1,
                          ),
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-green-600">
                      {language === "el" ? "Αλλαγή:" : "Change:"}
                    </span>
                    <div className="text-lg font-bold text-green-900">
                      {formatPercentage(
                        (Object.values(marketFactors).reduce(
                          (a, b) => a * b,
                          1,
                        ) -
                          1) *
                          100,
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Quality Factors Tab */}
          <TabsContent value="quality" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-600" />
                {language === "el" ? "Παράγοντες Ποιότητας" : "Quality Factors"}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(qualityFactors).map(([factor, value]) => {
                  const labels: { [key: string]: { el: string; en: string } } =
                    {
                      freshness: { el: "Φρεσκάδα", en: "Freshness" },
                      size: { el: "Μέγεθος", en: "Size" },
                      appearance: { el: "Εμφάνιση", en: "Appearance" },
                      packaging: { el: "Συσκευασία", en: "Packaging" },
                    };

                  return (
                    <div key={factor} className="space-y-2">
                      <Label>
                        {labels[factor]?.[language as "el" | "en"] || factor}{" "}
                        (%)
                      </Label>
                      <div className="space-y-2">
                        <Input
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          onChange={(e) =>
                            updateQualityFactor(
                              factor,
                              parseInt(e.target.value),
                            )
                          }
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>0%</span>
                          <span className="font-medium">{value}%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quality Summary */}
              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-3">
                  {language === "el"
                    ? "Συνολική Βαθμολογία Ποιότητας"
                    : "Overall Quality Score"}
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-orange-600">
                      {language === "el" ? "Βαθμολογία:" : "Score:"}
                    </span>
                    <div className="text-2xl font-bold text-orange-900">
                      {calculateQualityScore().toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-orange-600">
                      {language === "el" ? "Κατηγορία:" : "Grade:"}
                    </span>
                    <div className="text-lg font-bold text-orange-900">
                      {calculateQualityScore() >= 90
                        ? "A+"
                        : calculateQualityScore() >= 80
                          ? "A"
                          : calculateQualityScore() >= 70
                            ? "B"
                            : calculateQualityScore() >= 60
                              ? "C"
                              : "D"}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-orange-600">
                      {language === "el" ? "Premium:" : "Premium:"}
                    </span>
                    <div className="text-lg font-bold text-orange-900">
                      {calculateQualityScore() >= 85
                        ? formatPercentage((calculateQualityScore() - 80) / 4)
                        : "0%"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Market Insights Tab */}
          <TabsContent value="insights" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                {language === "el" ? "Έξυπνες Συμβουλές" : "Smart Insights"}
              </h3>

              <div className="space-y-3">
                {getMarketInsights().map((insight, index) => {
                  const Icon = insight.icon;
                  const bgColor =
                    insight.type === "success"
                      ? "bg-green-50 border-green-200"
                      : insight.type === "warning"
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-blue-50 border-blue-200";
                  const textColor =
                    insight.type === "success"
                      ? "text-green-800"
                      : insight.type === "warning"
                        ? "text-yellow-800"
                        : "text-blue-800";
                  const iconColor =
                    insight.type === "success"
                      ? "text-green-600"
                      : insight.type === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600";

                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${bgColor}`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 mt-0.5 ${iconColor}`} />
                        <div>
                          <h4 className={`font-semibold ${textColor}`}>
                            {insight.title}
                          </h4>
                          <p className={`text-sm ${textColor} mt-1`}>
                            {insight.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {getMarketInsights().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Info className="w-8 h-8 mx-auto mb-2" />
                    <p>
                      {language === "el"
                        ? "Συμπληρώστε τα στοιχεία ανταγωνισμού για περισσότερες συμβουλές"
                        : "Fill in competitor data for more insights"}
                    </p>
                  </div>
                )}
              </div>

              {/* General recommendations */}
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-3">
                  {language === "el"
                    ? "Γενικές Συστάσεις"
                    : "General Recommendations"}
                </h4>
                <ul className="space-y-2 text-sm text-indigo-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5" />
                    {language === "el"
                      ? "Παρακολουθήστε τακτικά τις τιμές των ανταγωνιστών"
                      : "Monitor competitor prices regularly"}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5" />
                    {language === "el"
                      ? "Προσαρμόστε τις τιμές βάσει εποχιακών παραγόντων"
                      : "Adjust prices based on seasonal factors"}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5" />
                    {language === "el"
                      ? "Επενδύστε στην ποιότητα για premium τιμολόγηση"
                      : "Invest in quality for premium pricing"}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5" />
                    {language === "el"
                      ? "Ελέγχετε τακτικά τη συναλλαγματική ισοτιμία"
                      : "Monitor currency exchange rates regularly"}
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedCostingFeatures;
