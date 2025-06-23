
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calculator, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FormData } from '../types';

interface ProductBasicsProps {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: number) => void;
  onCalculate: () => void;
  onReset: () => void;
}

export default function ProductBasics({ formData, onUpdate, onCalculate, onReset }: ProductBasicsProps) {
  const { t } = useLanguage();

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onUpdate(field, value);
  };

  const validateAndCalculate = () => {
    // Basic validation
    if (formData.initialWeight <= 0) {
      alert(t('message.invalidInput'));
      return;
    }
    if (formData.cleaningLoss < 0 || formData.cleaningLoss > 100) {
      alert(t('message.invalidInput'));
      return;
    }
    if (formData.processingLoss < 0 || formData.processingLoss > 100) {
      alert(t('message.invalidInput'));
      return;
    }
    if (formData.costPerKg <= 0) {
      alert(t('message.invalidInput'));
      return;
    }
    
    onCalculate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          {t('nav.calculation')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="initialWeight">{t('form.initialWeight')}</Label>
            <Input
              id="initialWeight"
              type="number"
              min="0"
              step="0.1"
              placeholder={t('placeholder.weight')}
              value={formData.initialWeight || ''}
              onChange={handleInputChange('initialWeight')}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cleaningLoss">{t('form.cleaningLoss')}</Label>
            <Input
              id="cleaningLoss"
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder={t('placeholder.percentage')}
              value={formData.cleaningLoss || ''}
              onChange={handleInputChange('cleaningLoss')}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="processingLoss">{t('form.processingLoss')}</Label>
            <Input
              id="processingLoss"
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder={t('placeholder.percentage')}
              value={formData.processingLoss || ''}
              onChange={handleInputChange('processingLoss')}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="glazingWeight">{t('form.glazingWeight')}</Label>
            <Input
              id="glazingWeight"
              type="number"
              min="0"
              step="0.1"
              placeholder={t('placeholder.percentage')}
              value={formData.glazingWeight || ''}
              onChange={handleInputChange('glazingWeight')}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="costPerKg">{t('form.costPerKg')}</Label>
            <Input
              id="costPerKg"
              type="number"
              min="0"
              step="0.01"
              placeholder={t('placeholder.cost')}
              value={formData.costPerKg || ''}
              onChange={handleInputChange('costPerKg')}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profitMargin">{t('form.profitMargin')}</Label>
            <Input
              id="profitMargin"
              type="number"
              min="0"
              step="0.1"
              placeholder={t('placeholder.percentage')}
              value={formData.profitMargin || ''}
              onChange={handleInputChange('profitMargin')}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={validateAndCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" />
            {t('form.calculate')}
          </Button>
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            {t('form.reset')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
