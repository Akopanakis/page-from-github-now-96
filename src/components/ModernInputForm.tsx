
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FormData } from '@/types';
import ValidationHelper from './ValidationHelper';
import LoadingSpinner from './LoadingSpinner';

interface ModernInputFormProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: number) => void;
  onCalculate: () => void;
  onReset: () => void;
  isCalculating: boolean;
}

const ModernInputForm: React.FC<ModernInputFormProps> = ({
  formData,
  updateFormData,
  onCalculate,
  onReset,
  isCalculating
}) => {
  const { language } = useLanguage();

  return (
    <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="w-6 h-6" />
          <span>{language === 'el' ? 'Στοιχεία Προϊόντος' : 'Product Details'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidationHelper
            label={language === 'el' ? 'Αρχικό Βάρος (kg)' : 'Initial Weight (kg)'}
            value={formData.initialWeight}
            onChange={(value) => updateFormData('initialWeight', value)}
            type="weight"
            placeholder={language === 'el' ? 'π.χ. 100' : 'e.g. 100'}
            required
          />

          <ValidationHelper
            label={language === 'el' ? 'Κόστος ανά Κιλό (€)' : 'Cost per Kg (€)'}
            value={formData.costPerKg}
            onChange={(value) => updateFormData('costPerKg', value)}
            placeholder={language === 'el' ? 'π.χ. 8.50' : 'e.g. 8.50'}
            required
          />

          <ValidationHelper
            label={language === 'el' ? 'Απώλεια Καθαρισμού (%)' : 'Cleaning Loss (%)'}
            value={formData.cleaningLoss}
            onChange={(value) => updateFormData('cleaningLoss', value)}
            type="percentage"
            placeholder={language === 'el' ? 'π.χ. 15' : 'e.g. 15'}
            max={100}
          />

          <ValidationHelper
            label={language === 'el' ? 'Απώλεια Επεξεργασίας (%)' : 'Processing Loss (%)'}
            value={formData.processingLoss}
            onChange={(value) => updateFormData('processingLoss', value)}
            type="percentage"
            placeholder={language === 'el' ? 'π.χ. 10' : 'e.g. 10'}
            max={100}
          />

          <ValidationHelper
            label={language === 'el' ? 'Γλασάρισμα (%)' : 'Glazing (%)'}
            value={formData.glazingWeight}
            onChange={(value) => updateFormData('glazingWeight', value)}
            type="percentage"
            placeholder={language === 'el' ? 'π.χ. 5' : 'e.g. 5'}
            max={200}
          />

          <ValidationHelper
            label={language === 'el' ? 'Περιθώριο Κέρδους (%)' : 'Profit Margin (%)'}
            value={formData.profitMargin}
            onChange={(value) => updateFormData('profitMargin', value)}
            type="percentage"
            placeholder={language === 'el' ? 'π.χ. 25' : 'e.g. 25'}
            max={1000}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            onClick={onCalculate}
            disabled={isCalculating}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            {isCalculating ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                {language === 'el' ? 'Υπολογισμός...' : 'Calculating...'}
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5 mr-2" />
                {language === 'el' ? 'Υπολόγισε' : 'Calculate'}
              </>
            )}
          </Button>
          
          <Button 
            onClick={onReset}
            variant="outline"
            className="flex-1 sm:flex-initial px-6 py-3 border-2 border-gray-300 hover:border-gray-400 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {language === 'el' ? 'Επαναφορά' : 'Reset'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernInputForm;
