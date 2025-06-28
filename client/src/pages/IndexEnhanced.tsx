import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  Euro,
  TrendingUp,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCalculation } from "@/hooks/useCalculation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainTabs from "@/components/MainTabs";
import CostAnalysisChart from "@/components/charts/CostAnalysisChart";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchAnalysisData, AnalysisData } from "@/mock/analysis";
import { useLocation } from "wouter";

const IndexEnhanced = () => {
  const {
    formData,
    updateFormData,
    calculate,
    resetForm,
    results,
    isCalculating,
  } = useCalculation();
  const { language, currency } = useLanguage();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("basics");
  const [isPremium, setIsPremium] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [showFileUpload, setShowFileUpload] = useState(false);

  useEffect(() => {
    fetchAnalysisData().then(setAnalysisData);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === "el" ? "el-GR" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const mockResults = results || {
    totalCost: 2850.75,
    sellingPrice: 4275.5,
    profit: 1424.75,
    profitMargin: 33.3,
    netWeight: 184.5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header
        isPremium={isPremium}
        setIsPremium={setIsPremium}
        showFileUpload={showFileUpload}
        setShowFileUpload={setShowFileUpload}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with responsive cards */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              {language === "el"
                ? "Επαγγελματική Κοστολόγηση Θαλασσινών"
                : "Professional Seafood Costing"}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {language === "el"
                ? "Υπολογίστε με ακρίβεια το κόστος και τα κέρδη των προϊόντων σας"
                : "Calculate accurately the cost and profits of your products"}
            </p>
          </div>

          {/* Main KPI Cards - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Total Cost Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {language === "el" ? "Κόστος" : "Cost"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-blue-700">
                    {language === "el" ? "Συνολικό Κόστος" : "Total Cost"}
                  </h3>
                  <div className="text-2xl md:text-3xl font-bold text-blue-900">
                    {formatCurrency(mockResults.totalCost)}
                  </div>
                  <p className="text-xs text-blue-600">
                    {language === "el" ? "ανά παρτίδα" : "per batch"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Selling Price Card */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Euro className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {language === "el" ? "Τιμή" : "Price"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-green-700">
                    {language === "el" ? "Τιμή Πώλησης" : "Selling Price"}
                  </h3>
                  <div className="text-2xl md:text-3xl font-bold text-green-900">
                    {formatCurrency(mockResults.sellingPrice)}
                  </div>
                  <p className="text-xs text-green-600">
                    {mockResults.profitMargin.toFixed(1)}%{" "}
                    {language === "el" ? "περιθώριο" : "margin"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Profit Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800"
                  >
                    {language === "el" ? "Κέρδος" : "Profit"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-purple-700">
                    {language === "el" ? "Μικτό Κέρδος" : "Gross Profit"}
                  </h3>
                  <div className="text-2xl md:text-3xl font-bold text-purple-900">
                    {formatCurrency(mockResults.profit)}
                  </div>
                  <p className="text-xs text-purple-600">
                    {formatCurrency(
                      mockResults.profit / (mockResults.netWeight || 1),
                    )}{" "}
                    / kg
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form (2/3 width on large screens) */}
          <div className="lg:col-span-2" data-tour="form">
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calculator className="w-6 h-6" />
                    <span className="text-lg md:text-xl">
                      {language === "el"
                        ? "Στοιχεία Κοστολόγησης"
                        : "Costing Details"}
                    </span>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {language === "el" ? "Βήμα" : "Step"}{" "}
                    {activeTab === "basics"
                      ? "1/4"
                      : activeTab === "transport"
                        ? "2/4"
                        : activeTab === "workers"
                          ? "3/4"
                          : "4/4"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <MainTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isPremium={isPremium}
                  setIsPremium={setIsPremium}
                  formData={formData}
                  updateFormData={updateFormData}
                  results={results}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Chart and Actions */}
          <div className="space-y-6">
            {/* Cost Analysis Chart */}
            <div data-tour="chart">
              <CostAnalysisChart
                data={
                  analysisData
                    ? {
                        costBreakdown: analysisData.costBreakdown,
                        profitabilityTrends: analysisData.profitabilityTrends,
                      }
                    : undefined
                }
              />
            </div>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    onClick={calculate}
                    disabled={isCalculating}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        <span>
                          {language === "el"
                            ? "Υπολογισμός..."
                            : "Calculating..."}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>
                          {language === "el" ? "Υπολογισμός" : "Calculate"}
                        </span>
                      </div>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={resetForm}
                    size="lg"
                    className="w-full"
                  >
                    {language === "el" ? "Επαναφορά" : "Reset"}
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    variant="ghost"
                    onClick={() => setLocation("/builder-examples")}
                    className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {language === "el"
                          ? "Δοκιμάστε Προηγμένα Εργαλεία"
                          : "Try Advanced Tools"}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  {language === "el" ? "Γρήγορα Στατιστικά" : "Quick Stats"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {language === "el" ? "Καθαρό Βάρος" : "Net Weight"}
                  </span>
                  <span className="font-semibold">
                    {mockResults.netWeight} kg
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {language === "el" ? "Κόστος/kg" : "Cost/kg"}
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(
                      mockResults.totalCost / (mockResults.netWeight || 1),
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {language === "el" ? "Τιμή/kg" : "Price/kg"}
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(
                      mockResults.sellingPrice / (mockResults.netWeight || 1),
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm text-gray-600">
                    {language === "el" ? "Κέρδος/kg" : "Profit/kg"}
                  </span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(
                      mockResults.profit / (mockResults.netWeight || 1),
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IndexEnhanced;
