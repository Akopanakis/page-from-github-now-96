
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Calculator, Target, BarChart3, PieChart, DollarSign, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TooltipHelper from './TooltipHelper';

interface AdvancedFinancialModelsProps {
  formData: any;
  results: any;
}

const AdvancedFinancialModels: React.FC<AdvancedFinancialModelsProps> = ({ formData, results }) => {
  const { language } = useLanguage();
  const [activeModel, setActiveModel] = useState<string>('growth');

  // Growth Rate Analysis
  const calculateGrowthRate = () => {
    if (!results) return null;
    
    const initialValue = results.totalCost;
    const finalValue = results.sellingPrice * (formData.quantity || 1);
    const growthRate = ((finalValue / initialValue) - 1) * 100;
    
    return {
      initialValue,
      finalValue,
      growthRate,
      recommendation: growthRate > 20 ? 'excellent' : growthRate > 10 ? 'good' : 'needs_improvement'
    };
  };

  // Present Value Analysis
  const calculatePresentValue = () => {
    if (!results) return null;
    
    const futureValue = results.sellingPrice * (formData.quantity || 1);
    const discountRate = 0.08; // 8% discount rate
    const periods = 1;
    const presentValue = futureValue / Math.pow(1 + discountRate, periods);
    
    return {
      futureValue,
      presentValue,
      discountRate: discountRate * 100,
      netPresentValue: presentValue - results.totalCost
    };
  };

  // Break-even Analysis (Enhanced)
  const calculateBreakEvenAnalysis = () => {
    if (!results) return null;

    const fixedCosts = results.additionalCosts + (results.laborCost * 0.6);
    const variableCosts = results.purchaseCost + results.transportCost + (results.laborCost * 0.4);
    const variableCostPerUnit = variableCosts / (formData.quantity || 1);
    const sellingPricePerUnit = results.sellingPrice;
    
    const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
    const breakEvenUnits = fixedCosts / contributionMargin;
    const marginOfSafety = ((formData.quantity || 1) - breakEvenUnits) / (formData.quantity || 1) * 100;
    
    return {
      fixedCosts,
      variableCostPerUnit,
      contributionMargin,
      breakEvenUnits: Math.max(0, breakEvenUnits),
      marginOfSafety,
      breakEvenRevenue: breakEvenUnits * sellingPricePerUnit
    };
  };

  // Opportunity Cost Analysis
  const calculateOpportunityCost = () => {
    if (!results) return null;
    
    const currentReturn = results.profitPerKg * (formData.quantity || 1);
    const riskFreeRate = 0.03; // 3% risk-free rate
    const alternativeReturn = results.totalCost * riskFreeRate;
    const opportunityCost = currentReturn - alternativeReturn;
    
    return {
      currentReturn,
      alternativeReturn,
      opportunityCost,
      efficiency: opportunityCost > 0 ? 'profitable' : 'unprofitable'
    };
  };

  // Financial Forecasting
  const calculateFinancialForecast = () => {
    if (!results) return null;
    
    const months = [1, 3, 6, 12];
    const monthlyGrowthRate = 0.02; // 2% monthly growth
    
    return months.map(month => ({
      month,
      projectedRevenue: results.sellingPrice * (formData.quantity || 1) * Math.pow(1 + monthlyGrowthRate, month),
      projectedCosts: results.totalCost * Math.pow(1.01, month), // 1% cost inflation
      projectedProfit: (results.sellingPrice * (formData.quantity || 1) * Math.pow(1 + monthlyGrowthRate, month)) - 
                      (results.totalCost * Math.pow(1.01, month))
    }));
  };

  // Correlation Analysis
  const calculateCorrelationAnalysis = () => {
    if (!results || !formData.competitor1) return null;
    
    const priceCorrelation = Math.abs(results.sellingPrice - formData.competitor1) / results.sellingPrice;
    const marketPosition = priceCorrelation < 0.1 ? 'similar' : priceCorrelation < 0.2 ? 'competitive' : 'differentiated';
    
    return {
      priceCorrelation,
      marketPosition,
      competitiveAdvantage: results.sellingPrice < formData.competitor1 ? 'price_leader' : 'premium_positioning'
    };
  };

  const models = [
    {
      id: 'growth',
      title: language === 'el' ? 'Ανάλυση Ρυθμού Ανάπτυξης' : 'Growth Rate Analysis',
      icon: <TrendingUp className="w-5 h-5" />,
      data: calculateGrowthRate()
    },
    {
      id: 'pv',
      title: language === 'el' ? 'Παρούσα Αξία (PV)' : 'Present Value (PV)',
      icon: <DollarSign className="w-5 h-5" />,
      data: calculatePresentValue()
    },
    {
      id: 'breakeven',
      title: language === 'el' ? 'Εκτεταμένη Ανάλυση Νεκρού Σημείου' : 'Extended Break-Even Analysis',
      icon: <BarChart3 className="w-5 h-5" />,
      data: calculateBreakEvenAnalysis()
    },
    {
      id: 'opportunity',
      title: language === 'el' ? 'Κόστος Ευκαιρίας' : 'Opportunity Cost',
      icon: <Target className="w-5 h-5" />,
      data: calculateOpportunityCost()
    },
    {
      id: 'forecast',
      title: language === 'el' ? 'Οικονομικές Προβλέψεις' : 'Financial Forecasting',
      icon: <Calculator className="w-5 h-5" />,
      data: calculateFinancialForecast()
    },
    {
      id: 'correlation',
      title: language === 'el' ? 'Ανάλυση Συσχέτισης' : 'Correlation Analysis',
      icon: <PieChart className="w-5 h-5" />,
      data: calculateCorrelationAnalysis()
    }
  ];

  const renderModelContent = (model: any) => {
    if (!model.data) return null;

    switch (model.id) {
      case 'growth':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === 'el' ? 'Αρχική Αξία' : 'Initial Value'}
                </h4>
                <p className="text-2xl font-bold text-blue-600">{model.data.initialValue.toFixed(2)}€</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  {language === 'el' ? 'Τελική Αξία' : 'Final Value'}
                </h4>
                <p className="text-2xl font-bold text-green-600">{model.data.finalValue.toFixed(2)}€</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">
                  {language === 'el' ? 'Ρυθμός Ανάπτυξης' : 'Growth Rate'}
                </h4>
                <p className="text-2xl font-bold text-purple-600">{model.data.growthRate.toFixed(1)}%</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">
                {language === 'el' ? 'Εξήγηση:' : 'Explanation:'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'el' 
                  ? 'Ο ρυθμός ανάπτυξης υπολογίζεται με τον τύπο: (Τελική Αξία / Αρχική Αξία) - 1. Δείχνει την αποδοτικότητα της επένδυσης.'
                  : 'Growth rate is calculated using: (Final Value / Initial Value) - 1. It shows the profitability of the investment.'
                }
              </p>
            </div>
          </div>
        );

      case 'pv':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === 'el' ? 'Παρούσα Αξία' : 'Present Value'}
                </h4>
                <p className="text-2xl font-bold text-blue-600">{model.data.presentValue.toFixed(2)}€</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  {language === 'el' ? 'Καθαρή Παρούσα Αξία' : 'Net Present Value'}
                </h4>
                <p className="text-2xl font-bold text-green-600">{model.data.netPresentValue.toFixed(2)}€</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">
                {language === 'el' ? 'Εξήγηση:' : 'Explanation:'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'el' 
                  ? `Η παρούσα αξία υπολογίζεται με προεξόφληση ${model.data.discountRate}%. Θετική ΚΠΑ δείχνει κερδοφόρα επένδυση.`
                  : `Present value calculated with ${model.data.discountRate}% discount rate. Positive NPV indicates profitable investment.`
                }
              </p>
            </div>
          </div>
        );

      case 'breakeven':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">
                  {language === 'el' ? 'Νεκρό Σημείο' : 'Break-Even Units'}
                </h4>
                <p className="text-2xl font-bold text-red-600">{model.data.breakEvenUnits.toFixed(0)}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  {language === 'el' ? 'Περιθώριο Ασφαλείας' : 'Margin of Safety'}
                </h4>
                <p className="text-2xl font-bold text-green-600">{model.data.marginOfSafety.toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === 'el' ? 'Έσοδα Νεκρού Σημείου' : 'Break-Even Revenue'}
                </h4>
                <p className="text-2xl font-bold text-blue-600">{model.data.breakEvenRevenue.toFixed(2)}€</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">
                {language === 'el' ? 'Εξήγηση:' : 'Explanation:'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'el' 
                  ? 'Το νεκρό σημείο δείχνει τις μονάδες που πρέπει να πουληθούν για να καλυφθούν όλα τα κόστη. Υψηλό περιθώριο ασφαλείας σημαίνει μικρότερο κίνδυνο.'
                  : 'Break-even point shows units needed to be sold to cover all costs. High margin of safety means lower risk.'
                }
              </p>
            </div>
          </div>
        );

      case 'opportunity':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === 'el' ? 'Τρέχουσα Απόδοση' : 'Current Return'}
                </h4>
                <p className="text-2xl font-bold text-blue-600">{model.data.currentReturn.toFixed(2)}€</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">
                  {language === 'el' ? 'Κόστος Ευκαιρίας' : 'Opportunity Cost'}
                </h4>
                <p className="text-2xl font-bold text-orange-600">{model.data.opportunityCost.toFixed(2)}€</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">
                {language === 'el' ? 'Εξήγηση:' : 'Explanation:'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'el' 
                  ? 'Το κόστος ευκαιρίας είναι η απόδοση που χάνετε επιλέγοντας αυτή την επένδυση αντί για την καλύτερη εναλλακτική.'
                  : 'Opportunity cost is the return you give up by choosing this investment over the best alternative.'
                }
              </p>
            </div>
          </div>
        );

      case 'forecast':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {model.data.map((forecast: any, index: number) => (
                <div key={index} className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">
                    {forecast.month} {language === 'el' ? 'Μήνας' : 'Month'}
                  </h4>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-gray-600">{language === 'el' ? 'Έσοδα:' : 'Revenue:'}</span>
                      <span className="font-bold ml-2">{forecast.projectedRevenue.toFixed(2)}€</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">{language === 'el' ? 'Κέρδος:' : 'Profit:'}</span>
                      <span className="font-bold ml-2">{forecast.projectedProfit.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">
                {language === 'el' ? 'Εξήγηση:' : 'Explanation:'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'el' 
                  ? 'Οι προβλέψεις βασίζονται σε 2% μηνιαία αύξηση εσόδων και 1% αύξηση κόστους. Χρησιμοποιήστε τα για σχεδιασμό.'
                  : 'Forecasts based on 2% monthly revenue growth and 1% cost increase. Use these for planning purposes.'
                }
              </p>
            </div>
          </div>
        );

      case 'correlation':
        return model.data ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">
                  {language === 'el' ? 'Θέση στην Αγορά' : 'Market Position'}
                </h4>
                <p className="text-2xl font-bold text-purple-600 capitalize">
                  {model.data.marketPosition}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  {language === 'el' ? 'Ανταγωνιστικό Πλεονέκτημα' : 'Competitive Advantage'}
                </h4>
                <p className="text-lg font-bold text-green-600">
                  {model.data.competitiveAdvantage === 'price_leader' 
                    ? (language === 'el' ? 'Ηγέτης Τιμής' : 'Price Leader')
                    : (language === 'el' ? 'Premium Positioning' : 'Premium Positioning')
                  }
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">
                {language === 'el' ? 'Εξήγηση:' : 'Explanation:'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'el' 
                  ? 'Η ανάλυση συσχέτισης δείχνει πώς οι τιμές σας σχετίζονται με τον ανταγωνισμό και τη στρατηγική τοποθέτηση.'
                  : 'Correlation analysis shows how your prices relate to competition and strategic positioning.'
                }
              </p>
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  if (!results) {
    return (
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Crown className="w-5 h-5 text-purple-600" />
            <span>{language === 'el' ? 'Προχωρημένα Οικονομικά Μοντέλα' : 'Advanced Financial Models'}</span>
            <TooltipHelper tooltipKey="tooltip.advanced.models" />
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-gray-500">
            {language === 'el' 
              ? 'Εκτελέστε πρώτα τον υπολογισμό για να δείτε τα προχωρημένα μοντέλα'
              : 'Run the calculation first to see advanced models'
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-200">
        <CardTitle className="flex items-center space-x-2 text-slate-800">
          <Crown className="w-5 h-5 text-purple-600" />
          <span>{language === 'el' ? 'Προχωρημένα Οικονομικά Μοντέλα' : 'Advanced Financial Models'}</span>
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Premium
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeModel} onValueChange={setActiveModel}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
            {models.map((model) => (
              <TabsTrigger key={model.id} value={model.id} className="text-xs">
                <div className="flex items-center space-x-1">
                  {model.icon}
                  <span className="hidden sm:inline">{model.title.split(' ')[0]}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {models.map((model) => (
            <TabsContent key={model.id} value={model.id}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{model.title}</h3>
                {renderModelContent(model)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedFinancialModels;
