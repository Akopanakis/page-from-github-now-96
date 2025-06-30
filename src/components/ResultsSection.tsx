import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, RotateCcw, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultsSectionProps {
  results: any;
  formData: any;
  isCalculating: boolean;
  isPremium: boolean;
  onCalculate: () => void;
  onReset: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  formData,
  isCalculating,
  isPremium,
  onCalculate,
  onReset,
}) => {
  const { language, currency } = useLanguage();

  const formatCurrency = (amount: number) => {
    const safeAmount = isFinite(amount) ? amount : 0;
    return new Intl.NumberFormat(language === "el" ? "el-GR" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(safeAmount);
  };

  const formatNumber = (amount: number, decimals = 2) => {
    const safeAmount = isFinite(amount) ? amount : 0;
    return safeAmount.toFixed(decimals);
  };

  return (
    <Card data-tour="results">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="w-5 h-5" />
          <span>{language === "el" ? "Αποτελέσματα" : "Results"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button
              onClick={onCalculate}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
            <Button variant="outline" onClick={onReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {results && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-700">
                      {language === "el" ? "Τελική Τιμή" : "Final Price"}
                    </span>
                    <span className="text-lg font-bold text-green-800">
                      {formatCurrency(results.finalPrice || 0)}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">
                      {language === "el" ? "Συνολικό Κόστος" : "Total Cost"}
                    </span>
                    <span className="text-lg font-bold text-blue-800">
                      {formatCurrency(results.totalCosts || 0)}
                    </span>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-700">
                      {language === "el" ? "Κόστος/kg" : "Cost/kg"}
                    </span>
                    <span className="text-lg font-bold text-purple-800">
                      {formatCurrency(results.costPerKg || 0)}
                    </span>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange-700">
                      {language === "el" ? "Καθαρό Κέρδος" : "Net Profit"}
                    </span>
                    <span className="text-lg font-bold text-orange-800">
                      {formatCurrency(results.grossProfit || 0)}
                    </span>
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-indigo-700">
                      {language === "el"
                        ? "Περιθώριο Κέρδους"
                        : "Profit Margin"}
                    </span>
                    <span className="text-lg font-bold text-indigo-800">
                      {formatNumber(results.profitMargin || 0, 1)}%
                    </span>
                  </div>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-teal-700">
                      {language === "el" ? "Καθαρό Βάρος" : "Net Weight"}
                    </span>
                    <span className="text-lg font-bold text-teal-800">
                      {formatNumber(results.netWeight || 0, 1)} kg
                    </span>
                  </div>
                </div>
              </div>

              {results.breakdown && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {language === "el" ? "Ανάλυση Κόστους" : "Cost Breakdown"}
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(results.breakdown).map(
                      ([key, value]: [string, any]) => {
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
                          overhead: { el: "Γενικά Έξοδα", en: "Overhead" },
                          packaging: { el: "Συσκευασία", en: "Packaging" },
                        };
                        return (
                          <div
                            key={key}
                            className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                          >
                            <span>
                              {labels[key]?.[language as "el" | "en"] || key}
                            </span>
                            <span className="font-medium">
                              {formatCurrency(value || 0)} (
                              {formatNumber(percentage, 1)}%)
                            </span>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsSection;
