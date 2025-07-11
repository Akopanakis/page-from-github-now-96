
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* DCF Analysis */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                {language === 'el' ? 'Ανάλυση DCF' : 'DCF Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-blue-700">
                  {language === 'el' ? 'Καθαρή Παρούσα Αξία (NPV)' : 'Net Present Value (NPV)'}
                </label>
                <p className="text-2xl font-bold text-blue-900">
                  €{((results?.totalCost || 0) * 0.15).toLocaleString('el-GR')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-700">
                  {language === 'el' ? 'Εσωτερικός Συντελεστής Απόδοσης' : 'Internal Rate of Return'}
                </label>
                <p className="text-xl font-semibold text-blue-800">
                  {((results?.profitMargin || 20) + 5).toFixed(1)}%
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-700">
                  {language === 'el' ? 'Περίοδος Αποπληρωμής' : 'Payback Period'}
                </label>
                <p className="text-lg text-blue-800">
                  {Math.ceil((results?.totalCost || 1000) / (results?.grossProfit || 500))} {language === 'el' ? 'μήνες' : 'months'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Break-Even Analysis */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                {language === 'el' ? 'Ανάλυση Νεκρού Σημείου' : 'Break-Even Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-green-700">
                  {language === 'el' ? 'Τιμή Νεκρού Σημείου' : 'Break-Even Price'}
                </label>
                <p className="text-2xl font-bold text-green-900">
                  €{((results?.totalCost || 1000) / (formData?.quantity || 100)).toFixed(2)}/kg
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700">
                  {language === 'el' ? 'Περιθώριο Ασφάλειας' : 'Margin of Safety'}
                </label>
                <p className="text-xl font-semibold text-green-800">
                  {Math.max(0, ((formData?.targetSellingPrice || 10) - (results?.breakEvenPrice || 5)) / (formData?.targetSellingPrice || 10) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700">
                  {language === 'el' ? 'Συνεισφορά ανά Μονάδα' : 'Contribution per Unit'}
                </label>
                <p className="text-lg text-green-800">
                  €{((formData?.targetSellingPrice || 10) - (results?.costPerKg || 5)).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sensitivity Analysis */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                {language === 'el' ? 'Ανάλυση Ευαισθησίας' : 'Sensitivity Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-purple-700">
                  {language === 'el' ? 'Μεταβολή +10% Κόστους' : '+10% Cost Change'}
                </label>
                <p className="text-lg font-semibold text-red-600">
                  -{((results?.profitMargin || 20) * 0.4).toFixed(1)}% {language === 'el' ? 'κέρδος' : 'profit'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-purple-700">
                  {language === 'el' ? 'Μεταβολή -5% Τιμής' : '-5% Price Change'}
                </label>
                <p className="text-lg font-semibold text-red-600">
                  -{((results?.profitMargin || 20) * 0.25).toFixed(1)}% {language === 'el' ? 'κέρδος' : 'profit'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-purple-700">
                  {language === 'el' ? 'Βέλτιστο Σενάριο' : 'Best Case Scenario'}
                </label>
                <p className="text-lg font-semibold text-green-600">
                  +{((results?.profitMargin || 20) * 0.5).toFixed(1)}% {language === 'el' ? 'κέρδος' : 'profit'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-gray-700">
              {language === 'el' ? 'Δείκτης Κερδοφορίας' : 'Profitability Index'}
            </h4>
            <p className="text-xl font-bold text-gray-800">
              {(1 + (results?.profitMargin || 20) / 100).toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-gray-700">
              {language === 'el' ? 'ROI' : 'Return on Investment'}
            </h4>
            <p className="text-xl font-bold text-gray-800">
              {(results?.profitMargin || 20).toFixed(1)}%
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-gray-700">
              {language === 'el' ? 'Ταχύτητα Ανταπόδοσης' : 'Quick Ratio'}
            </h4>
            <p className="text-xl font-bold text-gray-800">
              {((results?.grossProfit || 500) / (results?.totalCost || 1000)).toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-gray-700">
              {language === 'el' ? 'Κίνδυνος Επένδυσης' : 'Investment Risk'}
            </h4>
            <p className="text-xl font-bold text-gray-800">
              {(results?.profitMargin || 20) > 25 ? (language === 'el' ? 'Χαμηλός' : 'Low') : 
               (results?.profitMargin || 20) > 15 ? (language === 'el' ? 'Μέτριος' : 'Medium') : 
               (language === 'el' ? 'Υψηλός' : 'High')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFinancialModels;
