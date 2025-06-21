
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Euro, Percent } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductBasicsProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const ProductBasics: React.FC<ProductBasicsProps> = ({ formData, updateFormData }) => {
  const { t } = useLanguage();

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
        <CardTitle className="flex items-center space-x-2 text-slate-800">
          <Package className="w-5 h-5 text-blue-600" />
          <span>{t('tab.basic')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div>
          <Label className="text-slate-700 font-medium">{t('product.name')}</Label>
          <Input
            placeholder="π.χ. Θράψαλο Block"
            value={formData.productName || ''}
            onChange={(e) => updateFormData({ productName: e.target.value })}
            className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="flex items-center space-x-2 text-slate-700 font-medium">
              <Euro className="w-4 h-4 text-green-600" />
              <span>{t('purchase.price')}</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.purchasePrice || ''}
              onChange={(e) => updateFormData({ purchasePrice: parseFloat(e.target.value) || 0 })}
              className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
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
              className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="flex items-center space-x-2 text-slate-700 font-medium">
              <Percent className="w-4 h-4 text-orange-600" />
              <span>{t('waste.percent')}</span>
            </Label>
            <Input
              type="number"
              step="0.1"
              placeholder="0.0"
              value={formData.waste || ''}
              onChange={(e) => updateFormData({ waste: parseFloat(e.target.value) || 0 })}
              className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2 text-slate-700 font-medium">
              <Percent className="w-4 h-4 text-cyan-600" />
              <span>{t('ice.percent')}</span>
            </Label>
            <Input
              type="number"
              step="0.1"
              placeholder="0.0"
              value={formData.icePercent || ''}
              onChange={(e) => updateFormData({ icePercent: parseFloat(e.target.value) || 0 })}
              className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2 text-slate-700 font-medium">
              <Percent className="w-4 h-4 text-purple-600" />
              <span>{t('vat.percent')}</span>
            </Label>
            <Select
              value={formData.vatPercent?.toString() || '24'}
              onValueChange={(value) => updateFormData({ vatPercent: parseFloat(value) })}
            >
              <SelectTrigger className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0% (Αφορολόγητο)</SelectItem>
                <SelectItem value="6">6% (Μειωμένος)</SelectItem>
                <SelectItem value="13">13% (Μειωμένος)</SelectItem>
                <SelectItem value="24">24% (Κανονικός)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBasics;
