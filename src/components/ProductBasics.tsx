
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Euro, Percent } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import WorkersList from './WorkersList';

interface ProductBasicsProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const ProductBasics: React.FC<ProductBasicsProps> = ({ formData, updateFormData }) => {
  const { t } = useLanguage();

  const workers = formData.workers || [{ id: '1', hourlyRate: 4.5, hours: 1 }];

  const updateWorkers = (newWorkers: any[]) => {
    updateFormData({ workers: newWorkers });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>{t('tab.basic')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>{t('product.name')}</Label>
            <Input
              placeholder="π.χ. Θράψαλο Block"
              value={formData.productName || ''}
              onChange={(e) => updateFormData({ productName: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="flex items-center space-x-2">
                <Euro className="w-4 h-4" />
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
              <Label>{t('quantity')}</Label>
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
              <Label className="flex items-center space-x-2">
                <Percent className="w-4 h-4" />
                <span>{t('waste.percent')}</span>
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
              <Label className="flex items-center space-x-2">
                <Percent className="w-4 h-4" />
                <span>{t('ice.percent')}</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="0.0"
                value={formData.icePercent || ''}
                onChange={(e) => updateFormData({ icePercent: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="flex items-center space-x-2">
                <Percent className="w-4 h-4" />
                <span>{t('vat.percent')}</span>
              </Label>
              <Select
                value={formData.vatPercent?.toString() || '24'}
                onValueChange={(value) => updateFormData({ vatPercent: parseFloat(value) })}
              >
                <SelectTrigger className="mt-2">
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

      <WorkersList workers={workers} updateWorkers={updateWorkers} />
    </div>
  );
};

export default ProductBasics;
