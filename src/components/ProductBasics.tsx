
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Tag, Percent, Weight, Droplets } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TooltipHelper from './TooltipHelper';

interface ProductBasicsProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const ProductBasics: React.FC<ProductBasicsProps> = ({ formData, updateFormData }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Package className="w-5 h-5 text-blue-600" />
            <span>{language === 'el' ? 'Πληροφορίες Προϊόντος' : 'Product Information'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName" className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>{language === 'el' ? 'Όνομα Προϊόντος' : 'Product Name'}</span>
                <TooltipHelper tooltipKey="tooltip.product.name" />
              </Label>
              <Input
                id="productName"
                value={formData.productName || ''}
                onChange={(e) => updateFormData({ productName: e.target.value })}
                placeholder={language === 'el' ? 'π.χ. Φρέσκα Ψάρια' : 'e.g. Fresh Fish'}
                className="border-slate-300 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchasePrice" className="flex items-center space-x-2">
                <span>{language === 'el' ? 'Τιμή Αγοράς (€/κιλό)' : 'Purchase Price (€/kg)'}</span>
                <TooltipHelper tooltipKey="tooltip.purchase.price" />
              </Label>
              <Input
                id="purchasePrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.purchasePrice || ''}
                onChange={(e) => updateFormData({ purchasePrice: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className="border-slate-300 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="flex items-center space-x-2">
                <Weight className="w-4 h-4" />
                <span>{language === 'el' ? 'Ποσότητα (κιλά)' : 'Quantity (kg)'}</span>
                <TooltipHelper tooltipKey="tooltip.quantity" />
              </Label>
              <Input
                id="quantity"
                type="number"
                step="0.1"
                min="0.1"
                value={formData.quantity || ''}
                onChange={(e) => updateFormData({ quantity: parseFloat(e.target.value) || 0 })}
                placeholder="1.0"
                className="border-slate-300 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="waste" className="flex items-center space-x-2">
                <Percent className="w-4 h-4" />
                <span>{language === 'el' ? 'Απώλεια (%)' : 'Waste (%)'}</span>
                <TooltipHelper tooltipKey="tooltip.waste" />
              </Label>
              <Input
                id="waste"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.waste || ''}
                onChange={(e) => updateFormData({ waste: parseFloat(e.target.value) || 0 })}
                placeholder="0.0"
                className="border-slate-300 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="glazingPercent" className="flex items-center space-x-2">
                <Droplets className="w-4 h-4" />
                <span>{language === 'el' ? 'Ποσοστό Γλασσαρίσματος (%)' : 'Glazing Percentage (%)'}</span>
                <TooltipHelper tooltipKey="tooltip.glazing" />
              </Label>
              <Input
                id="glazingPercent"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.glazingPercent || ''}
                onChange={(e) => updateFormData({ glazingPercent: parseFloat(e.target.value) || 0 })}
                placeholder="0.0"
                className="border-slate-300 focus:border-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Percent className="w-5 h-5 text-green-600" />
            <span>{language === 'el' ? 'Φορολογία & Κέρδος' : 'Tax & Profit'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vatPercent" className="flex items-center space-x-2">
                <span>{language === 'el' ? 'ΦΠΑ (%)' : 'VAT (%)'}</span>
                <TooltipHelper tooltipKey="tooltip.vat" />
              </Label>
              <Select
                value={formData.vatPercent?.toString() || '24'}
                onValueChange={(value) => updateFormData({ vatPercent: parseFloat(value) })}
              >
                <SelectTrigger className="border-slate-300 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% - {language === 'el' ? 'Απαλλαγή' : 'Exempt'}</SelectItem>
                  <SelectItem value="6">6% - {language === 'el' ? 'Μειωμένος' : 'Reduced'}</SelectItem>
                  <SelectItem value="13">13% - {language === 'el' ? 'Μειωμένος' : 'Reduced'}</SelectItem>
                  <SelectItem value="24">24% - {language === 'el' ? 'Κανονικός' : 'Standard'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profitMargin" className="flex items-center space-x-2">
                <span>{language === 'el' ? 'Περιθώριο Κέρδους (%)' : 'Profit Margin (%)'}</span>
                <TooltipHelper tooltipKey="tooltip.profit.margin" />
              </Label>
              <Input
                id="profitMargin"
                type="number"
                step="0.1"
                min="0"
                value={formData.profitMargin || ''}
                onChange={(e) => updateFormData({ profitMargin: parseFloat(e.target.value) || 0 })}
                placeholder="20.0"
                className="border-slate-300 focus:border-green-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductBasics;
