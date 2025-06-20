
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Calculator, Box, Coins, Truck, BarChart3, Tag, Users, Clock, Archive, Package, Route, Percent, Shield, FileText, Save, FolderOpen, RotateCcw } from 'lucide-react';
import ProductBasics from '@/components/ProductBasics';
import CostsTab from '@/components/CostsTab';
import TransportTab from '@/components/TransportTab';
import AnalysisTab from '@/components/AnalysisTab';
import ResultsSection from '@/components/ResultsSection';
import { useCalculation } from '@/hooks/useCalculation';

const Index = () => {
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

  const handleCalculate = async () => {
    if (!formData.productName || !formData.purchasePrice || !formData.quantity) {
      toast.error('Παρακαλώ συμπληρώστε τα βασικά στοιχεία προϊόντος');
      return;
    }

    setShowResults(false);
    await calculate();
    setShowResults(true);
    toast.success('Η κοστολόγηση ολοκληρώθηκε!');
  };

  const handleReset = () => {
    resetForm();
    setShowResults(false);
    setActiveTab('basic');
    toast.info('Η φόρμα επαναφέρθηκε');
  };

  const handleSave = () => {
    const templateName = prompt('Όνομα προτύπου:');
    if (templateName) {
      localStorage.setItem(`template_${Date.now()}`, JSON.stringify({
        name: templateName,
        data: formData,
        createdAt: new Date().toISOString()
      }));
      toast.success('Το πρότυπο αποθηκεύτηκε!');
    }
  };

  const handleLoad = () => {
    const templates = Object.keys(localStorage)
      .filter(key => key.startsWith('template_'))
      .map(key => JSON.parse(localStorage.getItem(key)!));
    
    if (templates.length === 0) {
      toast.info('Δεν βρέθηκαν αποθηκευμένα πρότυπα');
      return;
    }

    const templateNames = templates.map(t => t.name).join('\n');
    const selectedName = prompt(`Διαθέσιμα πρότυπα:\n${templateNames}\n\nΕισάγετε όνομα:`);
    
    if (selectedName) {
      const template = templates.find(t => t.name === selectedName);
      if (template) {
        updateFormData(template.data);
        toast.success('Το πρότυπο φορτώθηκε!');
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
                <h1 className="text-2xl font-bold text-slate-900">Υπολογιστής Κοστολόγησης</h1>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Professional Edition</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Αποθήκευση
              </Button>
              <Button variant="outline" size="sm" onClick={handleLoad}>
                <FolderOpen className="w-4 h-4 mr-2" />
                Φόρτωση
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Εξαγωγή PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="basic" className="flex items-center space-x-2">
              <Box className="w-4 h-4" />
              <span className="hidden sm:inline">Βασικά Στοιχεία</span>
            </TabsTrigger>
            <TabsTrigger value="costs" className="flex items-center space-x-2">
              <Coins className="w-4 h-4" />
              <span className="hidden sm:inline">Κόστη</span>
            </TabsTrigger>
            <TabsTrigger value="transport" className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span className="hidden sm:inline">Μεταφορά</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Ανάλυση</span>
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
                {isCalculating ? 'Υπολογισμός...' : 'Υπολογισμός Κοστολόγησης'}
              </Button>
              <Button variant="outline" size="lg" onClick={handleReset}>
                <RotateCcw className="w-5 h-5 mr-2" />
                Επαναφορά
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
