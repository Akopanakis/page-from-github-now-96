
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import StatisticalModels from '@/components/StatisticalModels';
import FinancialGlossary from '@/components/FinancialGlossary';
import SeafoodProcessingFeatures from '@/components/SeafoodProcessingFeatures';

interface ToolsTabsContentProps {
  formData: any;
  results: any;
}

const ToolsTabsContent: React.FC<ToolsTabsContentProps> = ({
  formData,
  results
}) => {
  return (
    <TabsContent value="tools" className="mt-0">
      <div className="space-y-6">
        <StatisticalModels formData={formData} results={results} />
        <FinancialGlossary />
        <SeafoodProcessingFeatures />
      </div>
    </TabsContent>
  );
};

export default ToolsTabsContent;
