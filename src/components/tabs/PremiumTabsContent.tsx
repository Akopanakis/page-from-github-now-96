
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ProcessingPhases from '@/components/ProcessingPhases';
import BatchManagement from '@/components/BatchManagement';
import Dashboard from '@/components/Dashboard';

interface PremiumTabsContentProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const PremiumTabsContent: React.FC<PremiumTabsContentProps> = ({
  formData,
  updateFormData
}) => {
  return (
    <>
      <TabsContent value="processing" className="mt-0">
        <ProcessingPhases 
          formData={formData} 
          updateFormData={updateFormData}
        />
      </TabsContent>

      <TabsContent value="batches" className="mt-0" data-tour="batch">
        <BatchManagement />
      </TabsContent>

      <TabsContent value="dashboard" className="mt-0">
        <Dashboard />
      </TabsContent>
    </>
  );
};

export default PremiumTabsContent;
