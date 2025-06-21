
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, BarChart3, TrendingUp, FileText, Globe2, Crown, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCalculation } from '@/hooks/useCalculation';
import ProductBasics from '@/components/ProductBasics';
import CostsTab from '@/components/CostsTab';
import TransportTab from '@/components/TransportTab';
import AnalysisTab from '@/components/AnalysisTab';
import AdvancedAnalysisTab from '@/components/AdvancedAnalysisTab';
import ScenarioAnalysis from '@/components/ScenarioAnalysis';
import RevenueForecasting from '@/components/RevenueForecasting';
import FinancialGlossary from '@/components/FinancialGlossary';
import StatisticalModels from '@/components/StatisticalModels';
import FileUpload from '@/components/FileUpload';
import ResultsSection from '@/components/ResultsSection';
import PDFExport from '@/components/PDFExport';

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const { formData, updateFormData, calculate, resetForm, results, isCalculating } = useCalculation();
  const [activeTab, setActiveTab] = useState('basics');
  const [showFileUpload, setShowFileUpload] = useState(false);

  const handleFileUpload = (data: any) => {
    updateFormData(data);
    setShowFileUpload(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {language === 'el' ? 'Υπολογιστής Κόστους & Τιμολόγησης' : 'Cost & Pricing Calculator'}
                </h1>
                <p className="text-sm text-gray-500">
                  {language === 'el' ? 'Επαγγελματική κοστολόγηση προϊόντων' : 'Professional product costing'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* File Upload Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFileUpload(!showFileUpload)}
                className="flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>{language === 'el' ? 'Αρχεία' : 'Files'}</span>
              </Button>

              {/* Language Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={language === 'el' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('el')}
                  className="h-8 px-3"
                >
                  ΕΛ
                </Button>
                <Button
                  variant={language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className="h-8 px-3"
                >
                  EN
                </Button>
              </div>
              
              <Globe2 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* File Upload Section */}
        {showFileUpload && (
          <div className="mb-8">
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>{language === 'el' ? 'Στοιχεία Κοστολόγησης' : 'Costing Details'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-6 bg-gray-50 border-b">
                    <TabsTrigger value="basics" className="text-xs sm:text-sm">
                      {language === 'el' ? 'Βασικά' : 'Basics'}
                    </TabsTrigger>
                    <TabsTrigger value="costs" className="text-xs sm:text-sm">
                      {language === 'el' ? 'Κόστη' : 'Costs'}
                    </TabsTrigger>
                    <TabsTrigger value="transport" className="text-xs sm:text-sm">
                      {language === 'el' ? 'Μεταφορά' : 'Transport'}
                    </TabsTrigger>
                    <TabsTrigger value="analysis" className="text-xs sm:text-sm">
                      {language === 'el' ? 'Ανάλυση' : 'Analysis'}
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="text-xs sm:text-sm flex items-center space-x-1">
                      <Crown className="w-3 h-3" />
                      <span>{language === 'el' ? 'Προχωρημένα' : 'Advanced'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="tools" className="text-xs sm:text-sm flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{language === 'el' ? 'Εργαλεία' : 'Tools'}</span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-6">
                    <TabsContent value="basics" className="mt-0">
                      <ProductBasics formData={formData} updateFormData={updateFormData} />
                    </TabsContent>

                    <TabsContent value="costs" className="mt-0">
                      <CostsTab formData={formData} updateFormData={updateFormData} />
                    </TabsContent>

                    <TabsContent value="transport" className="mt-0">
                      <TransportTab formData={formData} updateFormData={updateFormData} />
                    </TabsContent>

                    <TabsContent value="analysis" className="mt-0">
                      <AnalysisTab formData={formData} updateFormData={updateFormData} />
                    </TabsContent>

                    <TabsContent value="advanced" className="mt-0">
                      <div className="space-y-6">
                        {/* Premium Badge */}
                        <div className="flex items-center justify-center mb-6">
                          <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
                            <Crown className="w-4 h-4 mr-2" />
                            {language === 'el' ? 'Προχωρημένες Δυνατότητες' : 'Advanced Features'}
                          </Badge>
                        </div>
                        
                        <AdvancedAnalysisTab 
                          formData={formData} 
                          updateFormData={updateFormData} 
                          results={results} 
                        />
                        
                        <ScenarioAnalysis baseResults={results} formData={formData} />
                        
                        <RevenueForecasting formData={formData} results={results} />
                      </div>
                    </TabsContent>

                    <TabsContent value="tools" className="mt-0">
                      <div className="space-y-6">
                        <StatisticalModels formData={formData} results={results} />
                        <FinancialGlossary />
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <ResultsSection 
              results={results} 
              isCalculating={isCalculating} 
              onCalculate={calculate} 
              onReset={resetForm}
            />
            
            {results && (
              <PDFExport 
                formData={formData} 
                results={results} 
                language={language}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {language === 'el' 
                ? 'Σχεδιασμός και Ανάπτυξη από τον Αλέξανδρο Κοπανάκη' 
                : 'Designed and Developed by Alexandros Kopanakis'
              }
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © 2024 Professional Cost Calculator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
