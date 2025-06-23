
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Calculator, History, TrendingUp, Users, Moon, Sun, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCalculation } from '../hooks/useCalculation';
import ModernInputForm from '../components/ModernInputForm';
import ResultsSection from '../components/ResultsSection';
import AnalysisTab from '../components/AnalysisTab';
import BatchManagement from '../components/BatchManagement';
import AdvancedFinancialModels from '../components/AdvancedFinancialModels';

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
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">
            {language === 'el' ? 'Κοστολόγηση Πρώτων Υλών' : 'Raw Material Costing'}
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={toggleLanguage}>
              <Languages className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="calculation" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculation" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              {language === 'el' ? 'Υπολογισμός' : 'Calculate'}
            </TabsTrigger>
            <TabsTrigger value="batches" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              {language === 'el' ? 'Παρτίδες' : 'Batches'}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {language === 'el' ? 'Ανάλυση' : 'Analytics'}
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {language === 'el' ? 'Προηγμένα' : 'Advanced'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculation" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    {language === 'el' ? 'Δεδομένα Προϊόντος' : 'Product Data'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ModernInputForm
                    formData={formData}
                    updateFormData={updateFormData}
                    onCalculate={calculate}
                    onReset={resetForm}
                    isCalculating={isCalculating}
                    language={language}
                  />
                </CardContent>
              </Card>

              {results && (
                <ResultsSection
                  results={results}
                  isCalculating={isCalculating}
                  isPremium={isPremium}
                  onCalculate={calculate}
                  onReset={resetForm}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="batches">
            <BatchManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalysisTab />
          </TabsContent>

          <TabsContent value="advanced">
            <AdvancedFinancialModels />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
