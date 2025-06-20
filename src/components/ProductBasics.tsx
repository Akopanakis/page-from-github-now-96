
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tag, Euro, Weight, Trash2, Snowflake } from 'lucide-react';

interface ProductBasicsProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const ProductBasics: React.FC<ProductBasicsProps> = ({ formData, updateFormData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Tag className="w-5 h-5" />
          <span>Στοιχεία Προϊόντος</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="flex items-center space-x-2">
            <Tag className="w-4 h-4" />
            <span>Όνομα Προϊόντος</span>
          </Label>
          <Input
            placeholder="π.χ. Σουπιά"
            value={formData.productName || ''}
            onChange={(e) => updateFormData({ productName: e.target.value })}
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="flex items-center space-x-2">
              <Euro className="w-4 h-4" />
              <span>Τιμή Αγοράς (€/κιλό)</span>
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
            <Label className="flex items-center space-x-2">
              <Weight className="w-4 h-4" />
              <span>Ποσότητα (κιλά)</span>
            </Label>
            <Input
              type="number"
              step="0.1"
              value={formData.quantity || 1}
              onChange={(e) => updateFormData({ quantity: parseFloat(e.target.value) || 1 })}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label className="flex items-center space-x-2">
            <Trash2 className="w-4 h-4" />
            <span>Φύρα (%)</span>
          </Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-4">
              <Slider
                value={[formData.waste || 0]}
                onValueChange={(value) => updateFormData({ waste: value[0] })}
                max={50}
                step={1}
                className="flex-1"
              />
              <span className="w-16 text-center bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                {formData.waste || 0}%
              </span>
            </div>
          </div>
        </div>

        <div>
          <Label className="flex items-center space-x-2">
            <Snowflake className="w-4 h-4" />
            <span>Πάγος (% επί του καθαρού βάρους)</span>
          </Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-4">
              <Slider
                value={[formData.icePercent || 0]}
                onValueChange={(value) => updateFormData({ icePercent: value[0] })}
                max={30}
                step={1}
                className="flex-1"
              />
              <span className="w-16 text-center bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                {formData.icePercent || 0}%
              </span>
            </div>
            <p className="text-sm text-slate-500">Το ποσοστό πάγου που προστίθεται στο τελικό προϊόν</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBasics;
