
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calculator, BarChart3, TrendingUp, FileText, Globe2, Crown, Sparkles, Fish, Zap, Target, Database } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCalculation } from '@/hooks/useCalculation';
import ProductBasics from '@/components/ProductBasics';
import ProcessingPhases from '@/components/ProcessingPhases';
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
import AdvancedFinancialModels from '@/components/AdvancedFinancialModels';
import Dashboard from '@/components/Dashboard';
import BatchManagement from '@/components/BatchManagement';

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const { formData, updateFormData, calculate, resetForm, results, isCalculating } = useCalculation();
  const [activeTab, setActiveTab] = useState('basics');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const handleFileUpload = (data: any) => {
    updateFormData(data);
    setShowFileUpload(false);
  };

  const premiumFeatures = [
    language === 'el' ? 'Φάσεις Επεξεργασίας' : 'Processing Phases',
    language === 'el' ? 'Διαχείριση Παρτίδων' : 'Batch Management',
    language === 'el' ? 'Προχωρημένη Ανάλυση' : 'Advanced Analysis',
    language === 'el' ? 'Εποχιακοί Συντελεστές' : 'Seasonal Factors',
    language === 'el' ? 'AI Προβλέψεις' : 'AI Predictions'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Fish className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  KostoPro
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  {language === 'el' ? 'Επαγγελματική Κοστολόγηση Θαλασσινών' : 'Professional Seafood Costing'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Premium Toggle */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-xl border border-purple-200">
                <Label htmlFor="premium-mode" className="text-sm font-medium text-purple-700">
                  {language === 'el' ? 'Λειτουργία Premium' : 'Premium Mode'}
                </Label>
                <Switch
                  id="premium-mode"
                  checked={isPremium}
                  onCheckedChange={setIsPremium}
                />
                {isPremium && <Crown className="w-4 h-4 text-purple-600" />}
              </div>

              {/* File Upload Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFileUpload(!showFileUpload)}
                className="flex items-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
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

        {/* Premium Features Banner */}
        {isPremium && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Crown className="w-5 h-5" />
                  <span className="font-medium">
                    {language === 'el' ? 'Λειτουργία Premium Ενεργή' : 'Premium Mode Active'}
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-1 opacity-90">
                      <Zap className="w-3 h-3" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calculator className="w-6 h-6" />
                    <span className="text-xl">
                      {language === 'el' ? 'Στοιχεία Κοστολόγησης' : 'Costing Details'}
                    </span>
                  </div>
                  {isPremium && (
                    <Badge className="bg-white text-purple-600 font-semibold">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-8 bg-gray-50 border-b">
                    <TabsTrigger value="basics" className="text-xs sm:text-sm flex items-center space-x-1">
                      <Fish className="w-3 h-3" />
                      <span>{language === 'el' ? 'Προϊόν' : 'Product'}</span>
                    </TabsTrigger>
                    {isPremium && (
                      <>
                        <TabsTrigger value="processing" className="text-xs sm:text-sm flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{language === 'el' ? 'Επεξεργασία' : 'Processing'}</span>
                        </TabsTrigger>
                        <TabsTrigger value="batches" className="text-xs sm:text-sm flex items-center space-x-1">
                          <Database className="w-3 h-3" />
                          <span>{language === 'el' ? 'Παρτίδες' : 'Batches'}</span>
                        </TabsTrigger>
                        <TabsTrigger value="dashboard" className="text-xs sm:text-sm flex items-center space-x-1">
                          <BarChart3 className="w-3 h-3" />
                          <span>{language === 'el' ? 'Dashboard' : 'Dashboard'}</span>
                        </TabsTrigger>
                      </>
                    )}
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
                      <ProductBasics 
                        formData={formData} 
                        updateFormData={updateFormData} 
                        isPremium={isPremium}
                      />
                    </TabsContent>

                    {isPremium && (
                      <>
                        <TabsContent value="processing" className="mt-0">
                          <ProcessingPhases 
                            formData={formData} 
                            updateFormData={updateFormData}
                          />
                        </TabsContent>

                        <TabsContent value="batches" className="mt-0">
                          <BatchManagement />
                        </TabsContent>

                        <TabsContent value="dashboard" className="mt-0">
                          <Dashboard />
                        </TabsContent>
                      </>
                    )}

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
                        {!isPremium ? (
                          <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                            <Crown className="w-16 h-16 mx-auto text-purple-400 mb-4" />
                            <h3 className="text-xl font-bold text-purple-800 mb-2">
                              {language === 'el' ? 'Αναβάθμιση σε Premium' : 'Upgrade to Premium'}
                            </h3>
                            <p className="text-purple-600 mb-4">
                              {language === 'el' 
                                ? 'Ξεκλειδώστε προχωρημένες λειτουργίες κοστολόγησης'
                                : 'Unlock advanced costing features'
                              }
                            </p>
                            <Button 
                              onClick={() => setIsPremium(true)}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            >
                              <Crown className="w-4 h-4 mr-2" />
                              {language === 'el' ? 'Ενεργοποίηση Premium' : 'Enable Premium'}
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-center mb-6">
                              <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 text-lg">
                                <Crown className="w-5 h-5 mr-2" />
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

                            {results && (
                              <AdvancedFinancialModels />
                            )}
                          </>
                        )}
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
              formData={formData}
              isCalculating={isCalculating}
              isPremium={isPremium}
              onCalculate={calculate} 
              onReset={resetForm}
            />
            
            {results && (
              <PDFExport 
                formData={formData} 
                results={results} 
              />
            )}

            {/* Premium Info Card */}
            {!isPremium && (
              <Card className="shadow-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2 text-purple-800">
                    <Crown className="w-6 h-6" />
                    <span>{language === 'el' ? 'KostoPro Premium' : 'KostoPro Premium'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-purple-800 mb-1">€9.90</div>
                    <div className="text-sm text-purple-600">{language === 'el' ? 'ανά μήνα' : 'per month'}</div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {[
                      language === 'el' ? '✓ Πολλαπλές φάσεις επεξεργασίας' : '✓ Multiple processing phases',
                      language === 'el' ? '✓ Διαχείριση παρτίδων & ιχνηλασιμότητα' : '✓ Batch management & traceability',
                      language === 'el' ? '✓ AI προβλέψεις τιμολόγησης' : '✓ AI pricing predictions',
                      language === 'el' ? '✓ Προχωρημένες αναφορές' : '✓ Advanced reports',
                      language === 'el' ? '✓ Εξαγωγή ετικετών & barcode' : '✓ Label & barcode export',
                      language === 'el' ? '✓ Cloud backup & sync' : '✓ Cloud backup & sync'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-purple-700">
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => setIsPremium(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    {language === 'el' ? 'Δοκιμή Premium (Δωρεάν)' : 'Try Premium (Free)'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Fish className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">KostoPro</h3>
                  <p className="text-sm text-gray-600">
                    {language === 'el' ? 'Επαγγελματική Κοστολόγηση' : 'Professional Costing'}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {language === 'el' 
                  ? 'Η πλήρης λύση για την κοστολόγηση και τιμολόγηση προϊόντων θαλασσινών. Από την αρχική επεξεργασία μέχρι την τελική πώληση.'
                  : 'The complete solution for seafood product costing and pricing. From initial processing to final sale.'
                }
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === 'el' ? 'Χαρακτηριστικά' : 'Features'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>{language === 'el' ? 'Υπολογισμός κόστους' : 'Cost calculation'}</li>
                <li>{language === 'el' ? 'Ανάλυση κερδοφορίας' : 'Profitability analysis'}</li>
                <li>{language === 'el' ? 'Διαχείριση παρτίδων' : 'Batch management'}</li>
                <li>{language === 'el' ? 'Εξαγωγή αναφορών' : 'Report export'}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === 'el' ? 'Υποστήριξη' : 'Support'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>{language === 'el' ? 'Οδηγός χρήσης' : 'User guide'}</li>
                <li>{language === 'el' ? 'Βίντεο tutorials' : 'Video tutorials'}</li>
                <li>{language === 'el' ? 'Email υποστήριξη' : 'Email support'}</li>
                <li>{language === 'el' ? 'FAQ' : 'FAQ'}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600">
                {language === 'el' 
                  ? 'Σχεδιασμός και Ανάπτυξη από τον Αλέξανδρο Κοπανάκη' 
                  : 'Designed and Developed by Alexandros Kopanakis'
                }
              </p>
              <p className="text-xs text-gray-400 mt-2 md:mt-0">
                © 2024 KostoPro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
