
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, BarChart3, DollarSign, Target, PieChart, Activity, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdvancedFinancialModelsProps {
  formData: any;
  results: any;
}

const AdvancedFinancialModels: React.FC<AdvancedFinancialModelsProps> = ({ formData, results }) => {
  const { language } = useLanguage();
  const [growthData, setGrowthData] = useState({
    initialValue: 0,
    finalValue: 0,
    periods: 1
  });
  
  const [presentValueData, setPresentValueData] = useState({
    futureValue: 0,
    discountRate: 5,
    periods: 1
  });

  const [breakEvenData, setBreakEvenData] = useState({
    fixedCosts: 0,
    variableCostPerUnit: 0,
    pricePerUnit: 0
  });

  // Growth Rate Calculation
  const calculateGrowthRate = () => {
    if (growthData.initialValue === 0) return 0;
    return ((growthData.finalValue / growthData.initialValue) - 1) * 100;
  };

  // Present Value Calculation
  const calculatePresentValue = () => {
    const rate = presentValueData.discountRate / 100;
    return presentValueData.futureValue / Math.pow(1 + rate, presentValueData.periods);
  };

  // Break-Even Analysis
  const calculateBreakEven = () => {
    const contributionMargin = breakEvenData.pricePerUnit - breakEvenData.variableCostPerUnit;
    if (contributionMargin === 0) return 0;
    return breakEvenData.fixedCosts / contributionMargin;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
          <Zap className="w-4 h-4 mr-2" />
          {language === 'el' ? 'Προηγμένα Οικονομικά Μοντέλα' : 'Advanced Financial Models'}
        </Badge>
      </div>

      <Tabs defaultValue="growth" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth" className="text-xs">
            {language === 'el' ? 'Ανάπτυξη' : 'Growth'}
          </TabsTrigger>
          <TabsTrigger value="present" className="text-xs">
            {language === 'el' ? 'Παρ. Αξία' : 'Present Val.'}
          </TabsTrigger>
          <TabsTrigger value="breakeven" className="text-xs">
            {language === 'el' ? 'Νεκρό Σημείο' : 'Break-Even'}
          </TabsTrigger>
          <TabsTrigger value="concepts" className="text-xs">
            {language === 'el' ? 'Έννοιες' : 'Concepts'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>{language === 'el' ? 'Υπολογισμός Ρυθμού Ανάπτυξης' : 'Growth Rate Calculation'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>{language === 'el' ? 'Αρχική Αξία (€)' : 'Initial Value (€)'}</Label>
                  <Input
                    type="number"
                    value={growthData.initialValue}
                    onChange={(e) => setGrowthData(prev => ({ ...prev, initialValue: parseFloat(e.target.value) || 0 }))}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label>{language === 'el' ? 'Τελική Αξία (€)' : 'Final Value (€)'}</Label>
                  <Input
                    type="number"
                    value={growthData.finalValue}
                    onChange={(e) => setGrowthData(prev => ({ ...prev, finalValue: parseFloat(e.target.value) || 0 }))}
                    placeholder="1200"
                  />
                </div>
                <div>
                  <Label>{language === 'el' ? 'Περίοδοι' : 'Periods'}</Label>
                  <Input
                    type="number"
                    value={growthData.periods}
                    onChange={(e) => setGrowthData(prev => ({ ...prev, periods: parseFloat(e.target.value) || 1 }))}
                    placeholder="1"
                  />
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">
                  {language === 'el' ? 'Αποτέλεσμα:' : 'Result:'}
                </h4>
                <p className="text-2xl font-bold text-green-600">
                  {calculateGrowthRate().toFixed(2)}%
                </p>
                <p className="text-sm text-green-700 mt-2">
                  {language === 'el' 
                    ? 'Τύπος: (Τελική Αξία / Αρχική Αξία) - 1' 
                    : 'Formula: (Final Value / Initial Value) - 1'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="present" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span>{language === 'el' ? 'Παρούσα Αξία (PV)' : 'Present Value (PV)'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>{language === 'el' ? 'Μελλοντική Αξία (€)' : 'Future Value (€)'}</Label>
                  <Input
                    type="number"
                    value={presentValueData.futureValue}
                    onChange={(e) => setPresentValueData(prev => ({ ...prev, futureValue: parseFloat(e.target.value) || 0 }))}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label>{language === 'el' ? 'Επιτόκιο (%)' : 'Discount Rate (%)'}</Label>
                  <Input
                    type="number"
                    value={presentValueData.discountRate}
                    onChange={(e) => setPresentValueData(prev => ({ ...prev, discountRate: parseFloat(e.target.value) || 0 }))}
                    placeholder="5"
                  />
                </div>
                <div>
                  <Label>{language === 'el' ? 'Περίοδοι' : 'Periods'}</Label>
                  <Input
                    type="number"
                    value={presentValueData.periods}
                    onChange={(e) => setPresentValueData(prev => ({ ...prev, periods: parseFloat(e.target.value) || 1 }))}
                    placeholder="1"
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === 'el' ? 'Παρούσα Αξία:' : 'Present Value:'}
                </h4>
                <p className="text-2xl font-bold text-blue-600">
                  €{calculatePresentValue().toFixed(2)}
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  {language === 'el' 
                    ? 'Τύπος: PV = FV / (1 + r)^n' 
                    : 'Formula: PV = FV / (1 + r)^n'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakeven" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span>{language === 'el' ? 'Ανάλυση Νεκρού Σημείου' : 'Break-Even Analysis'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>{language === 'el' ? 'Σταθερά Κόστη (€)' : 'Fixed Costs (€)'}</Label>
                  <Input
                    type="number"
                    value={breakEvenData.fixedCosts}
                    onChange={(e) => setBreakEvenData(prev => ({ ...prev, fixedCosts: parseFloat(e.target.value) || 0 }))}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label>{language === 'el' ? 'Μεταβλητό Κόστος/Μονάδα (€)' : 'Variable Cost/Unit (€)'}</Label>
                  <Input
                    type="number"
                    value={breakEvenData.variableCostPerUnit}
                    onChange={(e) => setBreakEvenData(prev => ({ ...prev, variableCostPerUnit: parseFloat(e.target.value) || 0 }))}
                    placeholder="5"
                  />
                </div>
                <div>
                  <Label>{language === 'el' ? 'Τιμή/Μονάδα (€)' : 'Price/Unit (€)'}</Label>
                  <Input
                    type="number"
                    value={breakEvenData.pricePerUnit}
                    onChange={(e) => setBreakEvenData(prev => ({ ...prev, pricePerUnit: parseFloat(e.target.value) || 0 }))}
                    placeholder="10"
                  />
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">
                  {language === 'el' ? 'Νεκρό Σημείο:' : 'Break-Even Point:'}
                </h4>
                <p className="text-2xl font-bold text-orange-600">
                  {calculateBreakEven().toFixed(0)} {language === 'el' ? 'μονάδες' : 'units'}
                </p>
                <p className="text-sm text-orange-700 mt-2">
                  {language === 'el' 
                    ? 'Τύπος: Σταθερά Κόστη / (Τιμή - Μεταβλητό Κόστος)' 
                    : 'Formula: Fixed Costs / (Price - Variable Cost)'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'el' ? 'Κόστος Ευκαιρίας' : 'Opportunity Cost'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {language === 'el' 
                    ? 'Η απόδοση που χάνετε επιλέγοντας μια επένδυση αντί για την καλύτερη εναλλακτική.'
                    : 'The return you give up by choosing one investment over the best alternative.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'el' ? 'Αντίστροφη Συσχέτιση' : 'Inverse Correlation'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {language === 'el' 
                    ? 'Όταν δύο μεταβλητές κινούνται σε αντίθετες κατευθύνσεις. Χρήσιμο για τη διαφοροποίηση του χαρτοφυλακίου.'
                    : 'When two variables move in opposite directions. Useful for portfolio diversification.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'el' ? 'Οικονομικές Προβλέψεις' : 'Financial Forecasting'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {language === 'el' 
                    ? 'Εκτίμηση μελλοντικών οικονομικών αποτελεσμάτων με βάση ιστορικά δεδομένα και τάσεις αγοράς.'
                    : 'Estimating future financial results based on historical data and market trends.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'el' ? 'Επενδυτική Στρατηγική' : 'Investment Strategy'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {language === 'el' 
                    ? 'Λήψη επενδυτικών αποφάσεων με βάση τον υπολογισμό του ποσοστού ανάπτυξης και την ανάλυση κινδύνου.'
                    : 'Making investment decisions based on growth rate calculation and risk analysis.'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedFinancialModels;
