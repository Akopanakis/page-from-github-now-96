import React from 'react';
import ComprehensiveBatchForm from '@/components/ComprehensiveBatchForm';

interface BasicInfoTabProps {
  formData: any;
  updateFormData: (data: any) => void;
  isPremium?: boolean;
  onCalculate?: () => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ formData, updateFormData, isPremium, onCalculate }) => {
  return (
    <ComprehensiveBatchForm
      formData={formData}
      updateFormData={updateFormData}
      isPremium={isPremium}
      onCalculate={onCalculate}
    />
  );
};

export default BasicInfoTab;
