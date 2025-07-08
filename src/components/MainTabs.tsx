
import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import MainTabsList from '@/components/tabs/TabsList';
import BasicTabsContent from '@/components/tabs/BasicTabsContent';
import PremiumTabsContent from '@/components/tabs/PremiumTabsContent';
import AdvancedTabsContent from '@/components/tabs/AdvancedTabsContent';
import ToolsTabsContent from '@/components/tabs/ToolsTabsContent';

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
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <MainTabsList isPremium={isPremium} />

      <div className="p-6">
        <BasicTabsContent 
          formData={formData} 
          updateFormData={updateFormData} 
        />

        {isPremium && (
          <PremiumTabsContent 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        )}

        <AdvancedTabsContent 
          isPremium={isPremium}
          setIsPremium={setIsPremium}
          formData={formData}
          updateFormData={updateFormData}
          results={results}
        />

        <ToolsTabsContent 
          formData={formData}
          results={results}
        />
      </div>
    </Tabs>
  );
};

export default MainTabs;
