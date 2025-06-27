
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Package, Tag, Percent, Weight, Droplets, Fish, Crown, Building2, Calendar, Thermometer } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TooltipHelper from './TooltipHelper';

interface ProductBasicsProps {
  formData: any;
  updateFormData: (data: any) => void;
  isPremium?: boolean;
}

const ProductBasics: React.FC<ProductBasicsProps> = ({ formData, updateFormData, isPremium = false }) => {
  const { language } = useLanguage();

  const schema = z.object({
    productName: z
      .string()
      .nonempty(language === 'el' ? 'Απαιτείται όνομα προϊόντος' : 'Product name is required'),
    purchasePrice: z
      .number({ invalid_type_error: language === 'el' ? 'Απαιτείται τιμή αγοράς' : 'Purchase price is required' })
      .positive(language === 'el' ? 'Απαιτείται τιμή αγοράς' : 'Purchase price is required'),
    quantity: z
      .number({ invalid_type_error: language === 'el' ? 'Απαιτείται ποσότητα' : 'Quantity is required' })
      .positive(language === 'el' ? 'Απαιτείται ποσότητα' : 'Quantity is required')
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      productName: formData.productName || '',
      purchasePrice: formData.purchasePrice || 0,
      quantity: formData.quantity || 0
    }
  });

  const productTypes = [
    { value: 'fish', label: language === 'el' ? 'Ψάρι (Θράψαλο, Τσιπούρα κλπ)' : 'Fish (Tuna, Sea Bream etc)' },
    { value: 'squid', label: language === 'el' ? 'Καλαμάρι' : 'Squid' },
    { value: 'octopus', label: language === 'el' ? 'Χταπόδι' : 'Octopus' },
    { value: 'other', label: language === 'el' ? 'Άλλο' : 'Other' }
  ];

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center justify-between text-slate-800">
            <div className="flex items-center space-x-2">
              <Fish className="w-5 h-5 text-blue-600" />
              <span>{language === 'el' ? 'Στοιχεία Προϊόντος' : 'Product Information'}</span>
            </div>
            {isPremium && (
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>{language === 'el' ? 'Όνομα Προϊόντος' : 'Product Name'}</span>
                    <TooltipHelper tooltipKey="tooltip.product.name" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="productName"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        updateFormData({ productName: e.target.value });
                      }}
                      placeholder={language === 'el' ? 'π.χ. Θράψαλο Block Premium' : 'e.g. Tuna Block Premium'}
                      className="border-slate-300 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="productType" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>{language === 'el' ? 'Τύπος Προϊόντος' : 'Product Type'}</span>
                <TooltipHelper tooltipKey="tooltip.product.type" />
              </Label>
              <Select
                value={formData.productType || 'fish'}
                onValueChange={(value) => updateFormData({ productType: value })}
              >
                <SelectTrigger className="border-slate-300 focus:border-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isPremium && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="space-y-2">
                <Label htmlFor="batchNumber" className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>{language === 'el' ? 'Αριθμός Παρτίδας' : 'Batch Number'}</span>
                </Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber || ''}
                  onChange={(e) => updateFormData({ batchNumber: e.target.value })}
                  placeholder={language === 'el' ? 'π.χ. BTH-2024-001' : 'e.g. BTH-2024-001'}
                  className="border-purple-300 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplierName" className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>{language === 'el' ? 'Προμηθευτής' : 'Supplier'}</span>
                </Label>
                <Input
                  id="supplierName"
                  value={formData.supplierName || ''}
                  onChange={(e) => updateFormData({ supplierName: e.target.value })}
                  placeholder={language === 'el' ? 'π.χ. Θαλάσσια Τρόφιμα ΑΕ' : 'e.g. Ocean Foods Ltd'}
                  className="border-purple-300 focus:border-purple-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="purchasePrice"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center space-x-2">
                    <span>{language === 'el' ? 'Τιμή Αγοράς (€/κιλό)' : 'Purchase Price (€/kg)'}</span>
                    <TooltipHelper tooltipKey="tooltip.purchase.price" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="purchasePrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(+e.target.value);
                        updateFormData({ purchasePrice: parseFloat(e.target.value) || 0 });
                      }}
                      placeholder="4.50"
                      className="border-slate-300 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center space-x-2">
                    <Weight className="w-4 h-4" />
                    <span>{language === 'el' ? 'Ποσότητα (κιλά)' : 'Quantity (kg)'}</span>
                    <TooltipHelper tooltipKey="tooltip.quantity" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(+e.target.value);
                        updateFormData({ quantity: parseFloat(e.target.value) || 0 });
                      }}
                      placeholder="500.0"
                      className="border-slate-300 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!isPremium && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="waste" className="flex items-center space-x-2">
                  <Percent className="w-4 h-4" />
                  <span>{language === 'el' ? 'Απώλεια Καθαρίσματος (%)' : 'Cleaning Waste (%)'}</span>
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
                  placeholder="20.0"
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
                  placeholder="15.0"
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {isPremium && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <div className="space-y-2">
                <Label htmlFor="storageTemperature" className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4" />
                  <span>{language === 'el' ? 'Θερμοκρασία Αποθήκευσης (°C)' : 'Storage Temperature (°C)'}</span>
                </Label>
                <Input
                  id="storageTemperature"
                  type="number"
                  step="1"
                  value={formData.storageTemperature || ''}
                  onChange={(e) => updateFormData({ storageTemperature: parseFloat(e.target.value) || -18 })}
                  placeholder="-18"
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shelfLife" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'el' ? 'Διάρκεια Ζωής (ημέρες)' : 'Shelf Life (days)'}</span>
                </Label>
                <Input
                  id="shelfLife"
                  type="number"
                  step="1"
                  min="1"
                  value={formData.shelfLife || ''}
                  onChange={(e) => updateFormData({ shelfLife: parseFloat(e.target.value) || 365 })}
                  placeholder="365"
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seasonalMultiplier" className="flex items-center space-x-2">
                  <Percent className="w-4 h-4" />
                  <span>{language === 'el' ? 'Εποχιακός Συντελεστής' : 'Seasonal Multiplier'}</span>
                </Label>
                <Input
                  id="seasonalMultiplier"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="3"
                  value={formData.seasonalMultiplier || ''}
                  onChange={(e) => updateFormData({ seasonalMultiplier: parseFloat(e.target.value) || 1 })}
                  placeholder="1.0"
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Percent className="w-5 h-5 text-green-600" />
            <span>{language === 'el' ? 'Φορολογία & Στόχοι' : 'Tax & Targets'}</span>
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

          {isPremium && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="space-y-2">
                <Label htmlFor="minimumMargin" className="flex items-center space-x-2">
                  <span>{language === 'el' ? 'Ελάχιστο Περιθώριο (%)' : 'Minimum Margin (%)'}</span>
                </Label>
                <Input
                  id="minimumMargin"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.minimumMargin || ''}
                  onChange={(e) => updateFormData({ minimumMargin: parseFloat(e.target.value) || 15 })}
                  placeholder="15.0"
                  className="border-green-300 focus:border-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetSellingPrice" className="flex items-center space-x-2">
                  <span>{language === 'el' ? 'Στόχος Τιμής Πώλησης (€/κιλό)' : 'Target Selling Price (€/kg)'}</span>
                </Label>
                <Input
                  id="targetSellingPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.targetSellingPrice || ''}
                  onChange={(e) => updateFormData({ targetSellingPrice: parseFloat(e.target.value) || 0 })}
                  placeholder="6.50"
                  className="border-green-300 focus:border-green-500"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      </form>
    </Form>
  );
};

export default ProductBasics;
