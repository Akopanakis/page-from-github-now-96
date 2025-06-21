import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Calculator, Box, Coins, Truck, BarChart3, Tag, Users, Clock, Archive, Package, Route, Percent, Shield, FileText, Save, FolderOpen, RotateCcw, Brain } from 'lucide-react';
import ProductBasics from '@/components/ProductBasics';
import CostsTab from '@/components/CostsTab';
import TransportTab from '@/components/TransportTab';
import AnalysisTab from '@/components/AnalysisTab';
import AdvancedAnalysisTab from '@/components/AdvancedAnalysisTab';
import ResultsSection from '@/components/ResultsSection';
import { useCalculation } from '@/hooks/useCalculation';
import { useLanguage } from '@/contexts/LanguageContext';
import PDFExport from '@/components/PDFExport';

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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{t('calculator.title')}</h1>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{t('calculator.subtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'el' ? 'en' : 'el')}
              >
                {language === 'el' ? '🇬🇧 EN' : '🇬🇷 ΕΛ'}
              </Button>
              <Button variant="outline" size="sm" onClick={loadThrapsaloExample}>
                <Package className="w-4 h-4 mr-2" />
                {t('example.thrapsalo')}
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                {t('save')}
              </Button>
              <Button variant="outline" size="sm" onClick={handleLoad}>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="basic" className="flex items-center space-x-2">
              <Box className="w-4 h-4" />
              <span className="hidden sm:inline">{t('tab.basic')}</span>
            </TabsTrigger>
            <TabsTrigger value="costs" className="flex items-center space-x-2">
              <Coins className="w-4 h-4" />
              <span className="hidden sm:inline">{t('tab.costs')}</span>
            </TabsTrigger>
            <TabsTrigger value="transport" className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span className="hidden sm:inline">{t('tab.transport')}</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">{t('tab.analysis')}</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">{t('tab.advanced')}</span>
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
        </Tabs>

        {/* Calculate Section */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleCalculate} 
                size="lg"
                disabled={isCalculating}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {isCalculating ? t('calculating') : t('calculate.costing')}
              </Button>
              <Button variant="outline" size="lg" onClick={handleReset}>
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-500">
            <p className="flex items-center justify-center space-x-2">
              <Calculator className="w-4 h-4" />
              <span>Υπολογιστής Κοστολόγησης Pro - Όλα τα δικαιώματα διατηρούνται</span>
            </p>
            <p className="text-sm mt-2">Version 2.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
