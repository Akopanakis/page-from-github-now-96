
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Globe, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SettingsTabProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ formData, updateFormData }) => {
  const { language, setLanguage, currency, setCurrency } = useLanguage();

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>{language === 'el' ? 'Ρυθμίσεις Εφαρμογής' : 'Application Settings'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>{language === 'el' ? 'Γλώσσα και Περιοχή' : 'Language and Region'}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{language === 'el' ? 'Γλώσσα' : 'Language'}</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="el">Ελληνικά</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{language === 'el' ? 'Νόμισμα' : 'Currency'}</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Calculator className="w-4 h-4" />
              <span>{language === 'el' ? 'Ρυθμίσεις Υπολογισμών' : 'Calculation Settings'}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="defaultVat">
                  {language === 'el' ? 'Προεπιλεγμένος ΦΠΑ (%)' : 'Default VAT (%)'}
                </Label>
                <Input
                  id="defaultVat"
                  type="number"
                  step="0.1"
                  value={formData.vatPercent || 24}
                  onChange={(e) => updateFormData({ vatPercent: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div>
                <Label htmlFor="defaultMargin">
                  {language === 'el' ? 'Προεπιλεγμένο Περιθώριο Κέρδους (%)' : 'Default Profit Margin (%)'}
                </Label>
                <Input
                  id="defaultMargin"
                  type="number"
                  step="0.1"
                  value={formData.profitMargin || 20}
                  onChange={(e) => updateFormData({ profitMargin: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="autoCalculate"
                checked={formData.autoCalculate || false}
                onCheckedChange={(checked) => updateFormData({ autoCalculate: checked })}
              />
              <Label htmlFor="autoCalculate">
                {language === 'el' ? 'Αυτόματος Υπολογισμός' : 'Auto Calculate'}
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
