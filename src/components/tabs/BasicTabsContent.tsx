
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ProductBasics from '@/components/ProductBasics';
import CostsTab from '@/components/CostsTab';
import TransportTab from '@/components/TransportTab';
import AnalysisTab from '@/components/AnalysisTab';

interface BasicTabsContentProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const BasicTabsContent: React.FC<BasicTabsContentProps> = ({
  formData,
  updateFormData
}) => {
  return (
    <>
      <TabsContent value="basics" className="mt-0">
        <ProductBasics 
          formData={formData} 
          updateFormData={updateFormData}
        />
      </TabsContent>

      <TabsContent value="costs" className="mt-0">
        <CostsTab formData={formData} updateFormData={updateFormData} />
      </TabsContent>

      <TabsContent value="transport" className="mt-0">
        <TransportTab formData={formData} updateFormData={updateFormData} />
      </TabsContent>

      <TabsContent value="analysis" className="mt-0">
        <AnalysisTab formData={formData} updateFormData={updateFormData} />
      </TabsContent>
    </>
  );
};

export default BasicTabsContent;
