
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, DollarSign, Percent, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TooltipHelper from './TooltipHelper';

interface ProductBasicsProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const ProductBasics: React.FC<ProductBasicsProps> = ({ formData, updateFormData }) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Package className="w-5 h-5 text-blue-600" />
            <span>{language === 'el' ? 'Βασικά Στοιχεία Προϊόντος' : 'Basic Product Information'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label className="text-slate-700 font-medium">{t('product.name')}</Label>
            <Input
              type="text"
              placeholder={language === 'el' ? 'π.χ. Φρέσκο Ψάρι' : 'e.g. Fresh Fish'}
              value={formData.productName || ''}
              onChange={(e) => updateFormData({ productName: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-slate-700 font-medium flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>{t('purchase.price')}</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.purchasePrice || ''}
                onChange={(e) => updateFormData({ purchasePrice: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-slate-700 font-medium">{t('quantity')}</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="0.0"
                value={formData.quantity || ''}
                onChange={(e) => updateFormData({ quantity: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-slate-700 font-medium flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span>{t('waste')}</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="0.0"
                value={formData.waste || ''}
                onChange={(e) => updateFormData({ waste: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-slate-700 font-medium flex items-center space-x-2">
                <Percent className="w-4 h-4 text-blue-600" />
                <span>{t('glazing.percent')}</span>
                <TooltipHelper tooltipKey="tooltip.glazing.percentage" />
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="0.0"
                value={formData.glazingPercent || ''}
                onChange={(e) => updateFormData({ glazingPercent: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-slate-700 font-medium flex items-center space-x-2">
                <Percent className="w-4 h-4 text-red-600" />
                <span>{t('vat.percent')}</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="24.0"
                value={formData.vatPercent || ''}
                onChange={(e) => updateFormData({ vatPercent: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductBasics;
