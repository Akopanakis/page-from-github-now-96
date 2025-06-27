
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { useCalculation } from '@/hooks/useCalculation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainTabs from '@/components/MainTabs';
import PremiumInfoCard from '@/components/PremiumInfoCard';
import FileUpload from '@/components/FileUpload';
import ResultsSection from '@/components/ResultsSection';
import PDFExport from '@/components/PDFExport';
import ExcelExport from '@/components/ExcelExport';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Index = () => {
  const { formData, updateFormData, calculate, resetForm, results, isCalculating } = useCalculation();
  const [activeTab, setActiveTab] = useState('basics');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [reportTheme, setReportTheme] = useState<'classic' | 'modern' | 'minimal'>('classic');
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const companyInfo = {
    logoUrl: '/placeholder.svg',
    companyName: 'CostPro Inc.',
    contact: 'info@costpro.local'
  };

  const handleFileUpload = (data: any) => {
    updateFormData(data);
    setShowFileUpload(false);
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
                      Στοιχεία Κοστολόγησης
                    </span>
                  </div>
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

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Report Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Theme</Label>
                <Select value={reportTheme} onValueChange={(v) => setReportTheme(v as 'classic' | 'modern' | 'minimal')}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="previewToggle" checked={previewEnabled} onCheckedChange={setPreviewEnabled} />
                <Label htmlFor="previewToggle">Preview before download</Label>
              </div>
            </CardContent>
          </Card>
            
            {results && (
              <PDFExport
                formData={formData}
                results={results}
                theme={reportTheme}
                companyInfo={companyInfo}
                previewEnabled={previewEnabled}
              />
            )}

            {results && (
              <ExcelExport
                formData={formData}
                results={results}
              />
            )}

            {/* Premium Info Card */}
            {!isPremium && (
              <PremiumInfoCard onUpgrade={() => setIsPremium(true)} />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
