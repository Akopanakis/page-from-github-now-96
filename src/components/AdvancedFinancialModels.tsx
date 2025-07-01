import React from "react";
import EnhancedFinancialModels from "./EnhancedFinancialModels";

interface AdvancedFinancialModelsProps {
  formData: any;
  results: any;
  onUpdateFormData?: (updates: any) => void;
}

const AdvancedFinancialModels: React.FC<AdvancedFinancialModelsProps> = ({
  formData,
  results,
  onUpdateFormData = () => {},
}) => {
  return (
    <EnhancedFinancialModels
      formData={formData}
      results={results}
      onUpdateFormData={onUpdateFormData}
    />
  );
};

export default AdvancedFinancialModels;
