
import React from 'react';
import GoogleMapsTransport from './GoogleMapsTransport';
import { FormData } from '../types';

interface TransportTabProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const TransportTab: React.FC<TransportTabProps> = ({ formData, updateFormData }) => {
  return <GoogleMapsTransport formData={formData} updateFormData={updateFormData} />;
};

export default TransportTab;
