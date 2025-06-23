
import React from 'react';
import GoogleMapsTransport from './GoogleMapsTransport';
import { FormData } from '../types';

interface TransportTabProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: number) => void;
}

const TransportTab: React.FC<TransportTabProps> = ({ formData, updateFormData }) => {
  // Convert the single field update to the format expected by GoogleMapsTransport
  const handleUpdateFormData = (updates: Partial<FormData>) => {
    Object.entries(updates).forEach(([key, value]) => {
      if (typeof value === 'number') {
        updateFormData(key as keyof FormData, value);
      }
    });
  };

  return <GoogleMapsTransport formData={formData} updateFormData={handleUpdateFormData} />;
};

export default TransportTab;
