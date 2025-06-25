
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Fish, 
  Target, 
  Database, 
  BarChart3, 
  Crown, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
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
import AdvancedFinancialModels from '@/components/AdvancedFinancialModels';
import Dashboard from '@/components/Dashboard';
import BatchManagement from '@/components/BatchManagement';

interface MainTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  formData: any;
  updateFormData: (updates: any) => void;
  results: any;
}

const MainTabs: React.FC<MainTabsProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  setIsPremium,
  formData,
  updateFormData,
  results
}) => {
  const { language } = useLanguage();

  return (
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
                  <AdvancedFinancialModels formData={formData} results={results} />
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
  );
};

export default MainTabs;
