import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Calculator, Box, Coins, Truck, BarChart3, Tag, Users, Clock, Archive, Package, Route, Percent, Shield, FileText, Save, FolderOpen, RotateCcw, Brain, Sparkles, TrendingUp, BookOpen, Target } from 'lucide-react';
import ProductBasics from '@/components/ProductBasics';
import CostsTab from '@/components/CostsTab';
import TransportTab from '@/components/TransportTab';
import AnalysisTab from '@/components/AnalysisTab';
import AdvancedAnalysisTab from '@/components/AdvancedAnalysisTab';
import ResultsSection from '@/components/ResultsSection';
import { useCalculation } from '@/hooks/useCalculation';
import { useLanguage } from '@/contexts/LanguageContext';
import PDFExport from '@/components/PDFExport';
import ScenarioAnalysis from '@/components/ScenarioAnalysis';
import RevenueForecasting from '@/components/RevenueForecasting';
import FinancialGlossary from '@/components/FinancialGlossary';

const Index = () => {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('basic');
  const [showResults, setShowResults] = useState(false);
  const {
    formData,
    updateFormData,
    calculate,
    resetForm,
    results,
    isCalculating
  } = useCalculation();

  const loadThrapsaloExample = () => {
    updateFormData({
      productName: 'Θράψαλο Block',
      purchasePrice: 4.5,
      quantity: 500,
      waste: 25,
      icePercent: 15,
      vatPercent: 24,
      workers: [
        { id: '1', hourlyRate: 5, hours: 1 },
        { id: '2', hourlyRate: 4.5, hours: 1 },
        { id: '3', hourlyRate: 4.5, hours: 1 },
        { id: '4', hourlyRate: 4.5, hours: 1 },
        { id: '5', hourlyRate: 4.5, hours: 1 }
      ],
      distance: 150,
      fuelCost: 0.15,
      profitMargin: 25,
      originAddress: 'Καβάλα, Ελλάδα',
      destinationAddress: 'Θεσσαλονίκη, Ελλάδα'
    });
    toast.success(language === 'el' ? 'Φορτώθηκε το παράδειγμα του θράψαλου!' : 'Thrapsalo example loaded!');
  };

  const handleCalculate = async () => {
    if (!formData.productName || !formData.purchasePrice || !formData.quantity) {
      toast.error(language === 'el' ? 'Παρακαλώ συμπληρώστε τα βασικά στοιχεία προϊόντος' : 'Please fill in the basic product details');
      return;
    }

    setShowResults(false);
    await calculate();
    setShowResults(true);
    toast.success(language === 'el' ? 'Η κοστολόγηση ολοκληρώθηκε!' : 'Costing completed!');
  };

  const handleReset = () => {
    resetForm();
    setShowResults(false);
    setActiveTab('basic');
    toast.info(language === 'el' ? 'Η φόρμα επαναφέρθηκε' : 'The form has been reset');
  };

  const handleSave = () => {
    const templateName = prompt(language === 'el' ? 'Όνομα προτύπου:' : 'Template name:');
    if (templateName) {
      localStorage.setItem(`template_${Date.now()}`, JSON.stringify({
        name: templateName,
        data: formData,
        createdAt: new Date().toISOString()
      }));
      toast.success(language === 'el' ? 'Το πρότυπο αποθηκεύτηκε!' : 'Template saved!');
    }
  };

  const handleLoad = () => {
    const templates = Object.keys(localStorage)
      .filter(key => key.startsWith('template_'))
      .map(key => JSON.parse(localStorage.getItem(key)!));
    
    if (templates.length === 0) {
      toast.info(language === 'el' ? 'Δεν βρέθηκαν αποθηκευμένα πρότυπα' : 'No saved templates found');
      return;
    }

    const templateNames = templates.map(t => t.name).join('\n');
    const selectedName = prompt((language === 'el' ? 'Διαθέσιμα πρότυπα:\n' : 'Available templates:\n') + templateNames + (language === 'el' ? '\n\nΕισάγετε όνομα:' : '\n\nEnter name:'));
    
    if (selectedName) {
      const template = templates.find(t => t.name === selectedName);
      if (template) {
        updateFormData(template.data);
        toast.success(language === 'el' ? 'Το πρότυπο φορτώθηκε!' : 'Template loaded!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl flex items-center justify-center shadow-2xl">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  {t('calculator.title')} Pro
                </h1>
                <p className="text-sm text-slate-600 font-medium uppercase tracking-wide flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Επαγγελματική Πλατφόρμα Οικονομικής Ανάλυσης</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'el' ? 'en' : 'el')}
                className="border-slate-300 hover:bg-slate-50 shadow-md"
              >
                {language === 'el' ? '🇬🇧 EN' : '🇬🇷 ΕΛ'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadThrapsaloExample}
                className="border-blue-300 text-blue-700 hover:bg-blue-50 shadow-md"
              >
                <Package className="w-4 h-4 mr-2" />
                {t('example.thrapsalo')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSave}
                className="border-green-300 text-green-700 hover:bg-green-50 shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                {t('save')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLoad}
                className="border-purple-300 text-purple-700 hover:bg-purple-50 shadow-md"
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                {t('load')}
              </Button>
              {showResults && results && (
                <PDFExport results={results} formData={formData} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto lg:grid-cols-8 bg-white/60 backdrop-blur-sm border border-slate-200 shadow-xl p-1 rounded-2xl">
            <TabsTrigger value="basic" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl">
              <Box className="w-4 h-4" />
              <span className="hidden sm:inline">{t('tab.basic')}</span>
            </TabsTrigger>
            <TabsTrigger value="costs" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl">
              <Coins className="w-4 h-4" />
              <span className="hidden sm:inline">{t('tab.costs')}</span>
            </TabsTrigger>
            <TabsTrigger value="transport" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl">
              <Truck className="w-4 h-4" />
              <span className="hidden sm:inline">{t('tab.transport')}</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">{t('tab.analysis')}</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Προχωρημένα</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Σενάρια</span>
            </TabsTrigger>
            <TabsTrigger value="forecasting" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Πρόβλεψη</span>
            </TabsTrigger>
            <TabsTrigger value="glossary" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Λεξικό</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <ProductBasics formData={formData} updateFormData={updateFormData} />
          </TabsContent>

          <TabsContent value="costs">
            <CostsTab formData={formData} updateFormData={updateFormData} />
          </TabsContent>

          <TabsContent value="transport">
            <TransportTab formData={formData} updateFormData={updateFormData} />
          </TabsContent>

          <TabsContent value="analysis">
            <AnalysisTab formData={formData} updateFormData={updateFormData} />
          </TabsContent>

          <TabsContent value="advanced">
            <AdvancedAnalysisTab formData={formData} updateFormData={updateFormData} results={results} />
          </TabsContent>

          <TabsContent value="scenarios">
            {results ? (
              <ScenarioAnalysis baseResults={results} formData={formData} />
            ) : (
              <Card className="border-slate-200 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Target className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">Απαιτείται Κοστολόγηση</h3>
                  <p className="text-slate-500">Παρακαλώ εκτελέστε πρώτα μια κοστολόγηση για να χρησιμοποιήσετε την ανάλυση σεναρίων.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="forecasting">
            <RevenueForecasting />
          </TabsContent>

          <TabsContent value="glossary">
            <FinancialGlossary />
          </TabsContent>
        </Tabs>

        {/* Enhanced Calculate Section */}
        <Card className="mt-8 border-slate-200 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-10 text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Εκτέλεση Κοστολόγησης</h2>
              <p className="text-slate-600">Υπολογίστε το κόστος και τη βέλτιστη τιμή για το προϊόν σας</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleCalculate} 
                size="lg"
                disabled={isCalculating}
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg"
              >
                <Calculator className="w-6 h-6 mr-3" />
                {isCalculating ? t('calculating') : t('calculate.costing')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleReset}
                className="border-slate-300 hover:bg-slate-50 shadow-lg px-8 py-4"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                {t('reset')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && results && (
          <ResultsSection results={results} formData={formData} />
        )}
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Υπολογιστής Κοστολόγησης Pro
              </span>
            </div>
            <p className="text-slate-600 mb-2">Επαγγελματική Λύση για Ακριβή Κοστολόγηση & Οικονομική Ανάλυση</p>
            <p className="text-sm text-slate-500">Version 3.0 - Professional Edition με Προχωρημένα Εργαλεία</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
