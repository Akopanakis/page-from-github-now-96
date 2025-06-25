
import React from 'react';
import GoogleMapsTransport from './GoogleMapsTransport';

interface TransportTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const TransportTab: React.FC<TransportTabProps> = ({ formData, updateFormData }) => {
  return <GoogleMapsTransport formData={formData} updateFormData={updateFormData} />;
};

export default TransportTab;
