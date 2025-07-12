
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Fish, Package, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BasicInfoTabProps {
  formData: any;
  updateFormData: (data: any) => void;
  isPremium?: boolean;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ formData, updateFormData, isPremium }) => {
  const { language } = useLanguage();

  const handleChange = (field: string, value: any) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Fish className="w-5 h-5" />
            <span>{language === 'el' ? 'Βασικά Στοιχεία Προϊόντος' : 'Basic Product Information'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="productName">
                {language === 'el' ? 'Όνομα Προϊόντος' : 'Product Name'}
              </Label>
              <Input
                id="productName"
                value={formData.productName || ''}
                onChange={(e) => handleChange('productName', e.target.value)}
                placeholder={language === 'el' ? 'π.χ. Φρέσκο Τσιπούρα' : 'e.g. Fresh Sea Bream'}
              />
            </div>
            
            <div>
              <Label htmlFor="productType">
                {language === 'el' ? 'Τύπος Προϊόντος' : 'Product Type'}
              </Label>
              <Select value={formData.productType || 'fish'} onValueChange={(value) => handleChange('productType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fish">{language === 'el' ? 'Ψάρι' : 'Fish'}</SelectItem>
                  <SelectItem value="shellfish">{language === 'el' ? 'Όστρακα' : 'Shellfish'}</SelectItem>
                  <SelectItem value="crustacean">{language === 'el' ? 'Καρκινοειδή' : 'Crustaceans'}</SelectItem>
                  <SelectItem value="mollusks">{language === 'el' ? 'Μαλάκια' : 'Mollusks'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="weight">
                {language === 'el' ? 'Βάρος (kg)' : 'Weight (kg)'}
              </Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight || ''}
                onChange={(e) => handleChange('weight', parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="quantity">
                {language === 'el' ? 'Ποσότητα' : 'Quantity'}
              </Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity || ''}
                onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                placeholder="1"
              />
            </div>

            <div>
              <Label htmlFor="purchasePrice">
                {language === 'el' ? 'Τιμή Αγοράς (€)' : 'Purchase Price (€)'}
              </Label>
              <Input
                id="purchasePrice"
                type="number"
                step="0.01"
                value={formData.purchasePrice || ''}
                onChange={(e) => handleChange('purchasePrice', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="origin">
                {language === 'el' ? 'Προέλευση' : 'Origin'}
              </Label>
              <Input
                id="origin"
                value={formData.origin || ''}
                onChange={(e) => handleChange('origin', e.target.value)}
                placeholder={language === 'el' ? 'π.χ. Μεσόγειος' : 'e.g. Mediterranean'}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">
              {language === 'el' ? 'Σημειώσεις' : 'Notes'}
            </Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder={language === 'el' ? 'Πρόσθετες πληροφορίες...' : 'Additional information...'}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoTab;
