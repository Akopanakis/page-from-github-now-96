
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
import DataExport from '@/components/DataExport';
import SmartInsightsPanel from '@/components/SmartInsightsPanel';

const Index = () => {
  const { formData, updateFormData, calculate, resetForm, results, isCalculating } = useCalculation();
  const [activeTab, setActiveTab] = useState('basics');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

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

            {results && (
              <SmartInsightsPanel results={results} formData={formData} />
            )}

            {results && (
              <PDFExport
                formData={formData}
                results={results}
              />
            )}

            {results && (
              <DataExport
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
