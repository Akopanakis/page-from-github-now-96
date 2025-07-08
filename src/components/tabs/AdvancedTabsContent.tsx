
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdvancedAnalysisTab from '@/components/AdvancedAnalysisTab';
import ScenarioAnalysis from '@/components/ScenarioAnalysis';
import RevenueForecasting from '@/components/RevenueForecasting';
import AdvancedFinancialModels from '@/components/AdvancedFinancialModels';
import PremiumUpgrade from './PremiumUpgrade';

interface AdvancedTabsContentProps {
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  formData: any;
  updateFormData: (updates: any) => void;
  results: any;
}

const AdvancedTabsContent: React.FC<AdvancedTabsContentProps> = ({
  isPremium,
  setIsPremium,
  formData,
  updateFormData,
  results
}) => {
  const { language } = useLanguage();

  return (
    <TabsContent value="advanced" className="mt-0">
      <div className="space-y-6">
        {!isPremium ? (
          <PremiumUpgrade setIsPremium={setIsPremium} />
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
            
            {results && (
              <ScenarioAnalysis 
                formData={formData} 
                results={results}
              />
            )}
            
            <RevenueForecasting formData={formData} results={results} />

            <AdvancedFinancialModels />
          </>
        )}
      </div>
    </TabsContent>
  );
};

export default AdvancedTabsContent;
