
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  Calculator, 
  PieChart, 
  Activity,
  DollarSign,
  Percent,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdvancedFinancialModelsProps {
  formData?: any;
  results?: any;
  onUpdateFormData?: (updates: any) => void;
}

const AdvancedFinancialModels: React.FC<AdvancedFinancialModelsProps> = ({
  formData = {},
  results = {},
  onUpdateFormData = () => {},
}) => {
  const { language } = useLanguage();
  const [activeModel, setActiveModel] = useState("dcf");

  // Calculate DCF Model
  const calculateDCF = () => {
    if (!results.sellingPrice) return null;
    
    const revenue = results.sellingPrice * (formData.quantity || 1000);
    const costs = results.totalCost || 0;
    const cashFlow = revenue - costs;
    const discountRate = 0.10; // 10%
    const years = 5;
    
    let npv = 0;
    for (let year = 1; year <= years; year++) {
      const growthRate = year === 1 ? 0 : 0.05; // 5% growth after first year
      const projectedCashFlow = cashFlow * Math.pow(1 + growthRate, year - 1);
      npv += projectedCashFlow / Math.pow(1 + discountRate, year);
    }
    
    return {
      npv: npv,
      irr: ((revenue / costs) - 1) * 100,
      paybackPeriod: costs / (cashFlow / 12), // in months
      profitabilityIndex: npv / costs
    };
  };

  // Calculate Break-even Analysis
  const calculateBreakEven = () => {
    if (!results.totalCost) return null;
    
    const fixedCosts = (results.additionalCosts || 0) + (results.laborCost || 0) * 0.6;
    const variableCosts = (results.purchaseCost || 0) + (results.transportCost || 0);
    const sellingPrice = results.sellingPrice || 0;
    const variableCostPerUnit = variableCosts / (formData.quantity || 1);
    
    const breakEvenUnits = fixedCosts / (sellingPrice - variableCostPerUnit);
    const breakEvenRevenue = breakEvenUnits * sellingPrice;
    const marginOfSafety = ((formData.quantity || 1) - breakEvenUnits) / (formData.quantity || 1) * 100;
    
    return {
      breakEvenUnits: Math.round(breakEvenUnits),
      breakEvenRevenue: breakEvenRevenue,
      marginOfSafety: marginOfSafety,
      contributionMargin: sellingPrice - variableCostPerUnit,
      contributionMarginRatio: ((sellingPrice - variableCostPerUnit) / sellingPrice) * 100
    };
  };

  // Calculate Sensitivity Analysis
  const calculateSensitivity = () => {
    if (!results.sellingPrice) return null;
    
    const baseProfit = (results.sellingPrice - (results.totalCost / (formData.quantity || 1))) * (formData.quantity || 1);
    const scenarios = [
      { name: language === 'el' ? 'Αισιόδοξο' : 'Optimistic', priceChange: 0.1, costChange: -0.05 },
      { name: language === 'el' ? 'Βάση' : 'Base', priceChange: 0, costChange: 0 },
      { name: language === 'el' ? 'Απαισιόδοξο' : 'Pessimistic', priceChange: -0.1, costChange: 0.1 }
    ];
    
    return scenarios.map(scenario => {
      const newPrice = results.sellingPrice * (1 + scenario.priceChange);
      const newCost = (results.totalCost / (formData.quantity || 1)) * (1 + scenario.costChange);
      const newProfit = (newPrice - newCost) * (formData.quantity || 1);
      const profitChange = ((newProfit - baseProfit) / baseProfit) * 100;
      
      return {
        ...scenario,
        newProfit,
        profitChange: isFinite(profitChange) ? profitChange : 0
      };
    });
  };

  const dcfData = calculateDCF();
  const breakEvenData = calculateBreakEven();
  const sensitivityData = calculateSensitivity();

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <CardTitle className="flex items-center space-x-2 text-slate-800">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>
            {language === 'el' ? 'Προχωρημένα Χρηματοοικονομικά Μοντέλα' : 'Advanced Financial Models'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeModel} onValueChange={setActiveModel}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dcf" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>{language === 'el' ? 'DCF Ανάλυση' : 'DCF Analysis'}</span>
            </TabsTrigger>
            <TabsTrigger value="breakeven" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>{language === 'el' ? 'Νεκρό Σημείο' : 'Break-Even'}</span>
            </TabsTrigger>
            <TabsTrigger value="sensitivity" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>{language === 'el' ? 'Ευαισθησία' : 'Sensitivity'}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dcf" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>{language === 'el' ? 'Ανάλυση Προεξοφλημένων Ταμειακών Ροών' : 'Discounted Cash Flow Analysis'}</span>
              </h3>
              
              {dcfData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <h4 className="font-semibold text-green-800">NPV</h4>
                    </div>
                    <p className="text-2xl font-bold text-green-600">€{dcfData.npv.toLocaleString('el-GR')}</p>
                    <p className="text-sm text-green-600">
                      {language === 'el' ? 'Καθαρή Παρούσα Αξία' : 'Net Present Value'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Percent className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">IRR</h4>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{dcfData.irr.toFixed(1)}%</p>
                    <p className="text-sm text-blue-600">
                      {language === 'el' ? 'Εσωτερικός Συντελεστής Απόδοσης' : 'Internal Rate of Return'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <h4 className="font-semibold text-purple-800">
                        {language === 'el' ? 'Περίοδος Επαναπλήρωσης' : 'Payback Period'}
                      </h4>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{dcfData.paybackPeriod.toFixed(1)}</p>
                    <p className="text-sm text-purple-600">
                      {language === 'el' ? 'μήνες' : 'months'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <PieChart className="w-4 h-4 text-orange-600" />
                      <h4 className="font-semibold text-orange-800">PI</h4>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{dcfData.profitabilityIndex.toFixed(2)}</p>
                    <p className="text-sm text-orange-600">
                      {language === 'el' ? 'Δείκτης Κερδοφορίας' : 'Profitability Index'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{language === 'el' 
                    ? 'Εκτελέστε πρώτα τον υπολογισμό για να δείτε την DCF ανάλυση'
                    : 'Run calculation first to see DCF analysis'
                  }</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="breakeven" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>{language === 'el' ? 'Ανάλυση Νεκρού Σημείου' : 'Break-Even Analysis'}</span>
              </h3>
              
              {breakEvenData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-red-600" />
                      <h4 className="font-semibold text-red-800">
                        {language === 'el' ? 'Μονάδες Νεκρού Σημείου' : 'Break-Even Units'}
                      </h4>
                    </div>
                    <p className="text-2xl font-bold text-red-600">{breakEvenData.breakEvenUnits.toLocaleString('el-GR')}</p>
                    <p className="text-sm text-red-600">{language === 'el' ? 'μονάδες' : 'units'}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <h4 className="font-semibold text-green-800">
                        {language === 'el' ? 'Έσοδα Νεκρού Σημείου' : 'Break-Even Revenue'}
                      </h4>
                    </div>
                    <p className="text-2xl font-bold text-green-600">€{breakEvenData.breakEvenRevenue.toLocaleString('el-GR')}</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Percent className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">
                        {language === 'el' ? 'Περιθώριο Ασφαλείας' : 'Margin of Safety'}
                      </h4>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{breakEvenData.marginOfSafety.toFixed(1)}%</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                      <h4 className="font-semibold text-purple-800">
                        {language === 'el' ? 'Περιθώριο Συνεισφοράς' : 'Contribution Margin'}
                      </h4>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">€{breakEvenData.contributionMargin.toFixed(2)}</p>
                    <p className="text-sm text-purple-600">
                      {breakEvenData.contributionMarginRatio.toFixed(1)}% {language === 'el' ? 'ποσοστό' : 'ratio'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{language === 'el' 
                    ? 'Εκτελέστε πρώτα τον υπολογισμό για να δείτε την ανάλυση νεκρού σημείου'
                    : 'Run calculation first to see break-even analysis'
                  }</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="sensitivity" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>{language === 'el' ? 'Ανάλυση Ευαισθησίας' : 'Sensitivity Analysis'}</span>
              </h3>
              
              {sensitivityData ? (
                <div className="space-y-3">
                  {sensitivityData.map((scenario, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            scenario.profitChange > 5 ? 'bg-green-500' : 
                            scenario.profitChange < -5 ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                          <h4 className="font-semibold">{scenario.name}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">€{scenario.newProfit.toLocaleString('el-GR')}</p>
                          <div className="flex items-center space-x-1">
                            {scenario.profitChange > 0 ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : scenario.profitChange < 0 ? (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            ) : null}
                            <span className={`text-sm ${
                              scenario.profitChange > 0 ? 'text-green-600' : 
                              scenario.profitChange < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {scenario.profitChange > 0 ? '+' : ''}{scenario.profitChange.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{language === 'el' 
                    ? 'Εκτελέστε πρώτα τον υπολογισμό για να δείτε την ανάλυση ευαισθησίας'
                    : 'Run calculation first to see sensitivity analysis'
                  }</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedFinancialModels;
