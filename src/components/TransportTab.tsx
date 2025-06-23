
import React from 'react';
import GoogleMapsTransport from './GoogleMapsTransport';
import { FormData } from '../types';

interface TransportTabProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: number) => void;
}

const TransportTab: React.FC<TransportTabProps> = ({ formData, updateFormData }) => {
  // GoogleMapsTransport is currently a standalone component that doesn't accept props
  // In the future, it could be enhanced to integrate with the form data
  return <GoogleMapsTransport />;
};

export default TransportTab;
