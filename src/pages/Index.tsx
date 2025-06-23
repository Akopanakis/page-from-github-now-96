
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Calculator, History, TrendingUp, Users, Moon, Sun, Languages, FileText, Database, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCalculation } from '../hooks/useCalculation';
import ModernInputForm from '../components/ModernInputForm';
import ResultsSection from '../components/ResultsSection';
import AnalysisTab from '../components/AnalysisTab';
import BatchManagement from '../components/BatchManagement';
import AdvancedFinancialModels from '../components/AdvancedFinancialModels';
import PDFExport from '../components/PDFExport';
import ScenarioAnalysis from '../components/ScenarioAnalysis';
import RevenueForecasting from '../components/RevenueForecasting';

export default function Index() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { formData, results, isCalculating, updateFormData, calculate, resetForm } = useCalculation();
  const [isPremium] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'el' ? 'en' : 'el');
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container max-w-7xl mx-auto p-4 space-y-6">
        {/* Enhanced Header with Modern Design */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'el' ? 'Κοστολόγηση Πρώτων Υλών Pro' : 'Raw Material Costing Pro'}
            </h1>
            <p className="text-blue-100 mt-2">
              {language === 'el' ? 'Προηγμένο σύστημα διαχείρισης κόστους' : 'Advanced cost management system'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" onClick={toggleLanguage} className="bg-white/20 hover:bg-white/30">
              <Languages className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={toggleTheme} className="bg-white/20 hover:bg-white/30">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Main Dashboard with Enhanced Tabs */}
        <Tabs defaultValue="calculation" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="calculation" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calculator className="h-4 w-4" />
              {language === 'el' ? 'Υπολογισμός' : 'Calculate'}
            </TabsTrigger>
            <TabsTrigger value="batches" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <History className="h-4 w-4" />
              {language === 'el' ? 'Παρτίδες' : 'Batches'}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
              {language === 'el' ? 'Ανάλυση' : 'Analytics'}
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Database className="h-4 w-4" />
              {language === 'el' ? 'Σενάρια' : 'Scenarios'}
            </TabsTrigger>
            <TabsTrigger value="forecasting" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
              {language === 'el' ? 'Προβλέψεις' : 'Forecasting'}
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="h-4 w-4" />
              {language === 'el' ? 'Προηγμένα' : 'Advanced'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculation" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <ModernInputForm
                  formData={formData}
                  updateFormData={updateFormData}
                  onCalculate={calculate}
                  onReset={resetForm}
                  isCalculating={isCalculating}
                />
                
                {results && (
                  <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <FileText className="h-5 w-5" />
                        {language === 'el' ? 'Εξαγωγή & Αναφορές' : 'Export & Reports'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PDFExport results={results} formData={formData} />
                    </CardContent>
                  </Card>
                )}
              </div>

              {results && (
                <div className="space-y-6">
                  <ResultsSection results={results} />
                  
                  {/* Quick KPIs Dashboard */}
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                        <TrendingUp className="h-5 w-5" />
                        {language === 'el' ? 'Βασικοί Δείκτες' : 'Key Metrics'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {((results.cleanWeight / formData.initialWeight) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {language === 'el' ? 'Απόδοση' : 'Yield'}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          €{results.costPerKgFinal.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {language === 'el' ? 'Κόστος/κιλό' : 'Cost/kg'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="batches" className="animate-fade-in">
            <BatchManagement />
          </TabsContent>

          <TabsContent value="analytics" className="animate-fade-in">
            <AnalysisTab />
          </TabsContent>

          <TabsContent value="scenarios" className="animate-fade-in">
            <ScenarioAnalysis formData={formData} results={results} />
          </TabsContent>

          <TabsContent value="forecasting" className="animate-fade-in">
            <RevenueForecasting formData={formData} results={results} />
          </TabsContent>

          <TabsContent value="advanced" className="animate-fade-in">
            <AdvancedFinancialModels formData={formData} results={results} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
