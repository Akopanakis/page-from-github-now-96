
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdvancedFinancialModelsProps {
  formData?: any;
  results?: any;
}

const AdvancedFinancialModels: React.FC<AdvancedFinancialModelsProps> = ({ formData, results }) => {
  const { language } = useLanguage();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>
            {language === 'el' ? 'Προχωρημένα Χρηματοοικονομικά Μοντέλα' : 'Advanced Financial Models'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-blue-800">
                {language === 'el' ? 'Ανάλυση Κερδοφορίας' : 'Profitability Analysis'}
              </h4>
            </div>
            <p className="text-sm text-blue-600">
              {language === 'el' 
                ? 'Προχωρημένη ανάλυση περιθωρίων κέρδους και ROI'
                : 'Advanced analysis of profit margins and ROI'
              }
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-green-600" />
              <h4 className="font-semibold text-green-800">
                {language === 'el' ? 'Πρόβλεψη Τάσεων' : 'Trend Forecasting'}
              </h4>
            </div>
            <p className="text-sm text-green-600">
              {language === 'el' 
                ? 'AI-powered προβλέψεις για μελλοντικές τιμές'
                : 'AI-powered predictions for future pricing'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFinancialModels;
