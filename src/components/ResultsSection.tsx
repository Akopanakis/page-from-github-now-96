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
    return new Intl.NumberFormat(language === "el" ? "el-GR" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
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
                      {language === "el" ? "Τιμή Πώλησης" : "Selling Price"}
                    </span>
                    <span className="text-lg font-bold text-green-800">
                      {formatCurrency(results.sellingPrice)}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">
                      {language === "el" ? "Συνολικό Κόστος" : "Total Cost"}
                    </span>
                    <span className="text-lg font-bold text-blue-800">
                      {formatCurrency(results.totalCostWithVat)}
                    </span>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-700">
                      {language === "el" ? "Κέρδος/kg" : "Profit/kg"}
                    </span>
                    <span className="text-lg font-bold text-purple-800">
                      {formatCurrency(results.profitPerKg)}
                    </span>
                  </div>
                </div>
              </div>

              {results.costBreakdown && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">
                    {language === "el" ? "Ανάλυση Κόστους" : "Cost Breakdown"}
                  </h4>
                  {results.costBreakdown.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.category}</span>
                      <span>
                        {formatCurrency(item.amount)} (
                        {item.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  ))}
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
