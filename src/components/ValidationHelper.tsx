
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface ValidatedInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  type?: 'number' | 'percentage' | 'weight';
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

const ValidationHelper: React.FC<ValidatedInputProps> = ({
  label,
  value,
  onChange,
  type = 'number',
  placeholder,
  required = true,
  min = 0,
  max
}) => {
  const { language } = useLanguage();

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (type) {
      case 'weight':
        return language === 'el' ? 'Εισάγετε βάρος σε kg' : 'Enter weight in kg';
      case 'percentage':
        return language === 'el' ? 'Ποσοστό %' : 'Percentage %';
      default:
        return language === 'el' ? 'Εισάγετε αριθμό' : 'Enter number';
    }
  };

  const getMaxValue = () => {
    if (max !== undefined) return max;
    if (type === 'percentage') return 100;
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value) || 0;
    const maxVal = getMaxValue();
    
    // Validation logic
    if (inputValue < min) {
      onChange(min);
      return;
    }
    
    if (maxVal && inputValue > maxVal) {
      onChange(maxVal);
      return;
    }
    
    onChange(inputValue);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={getPlaceholder()}
        min={min}
        max={getMaxValue()}
        required={required}
        className="w-full"
        step={type === 'percentage' ? '0.1' : '0.01'}
      />
    </div>
  );
};

export default ValidationHelper;
