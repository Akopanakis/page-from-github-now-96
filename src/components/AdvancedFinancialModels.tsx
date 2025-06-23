
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, PieChart as PieChartIcon, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FormData, CalculationResults } from '@/types';

interface AdvancedFinancialModelsProps {
  formData: Partial<FormData>;
  results: CalculationResults;
}

const AdvancedFinancialModels: React.FC<AdvancedFinancialModelsProps> = ({ formData, results }) => {
  const { language } = useLanguage();
  const [growthData, setGrowthData] = useState({
    initialValue: 1000,
    finalValue: 1200,
    periods: 1
  });
  
  const [presentValueData, setPresentValueData] = useState({
    futureValue: 1000,
    discountRate: 5,
    periods: 1
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

  // Memoized chart data for growth analysis
  const growthChartData = useMemo(() => {
    const periods = Math.max(growthData.periods, 1);
    const growthRate = calculateGrowthRate() / 100;
    
    return Array.from({ length: periods + 1 }, (_, i) => ({
      period: i,
      value: growthData.initialValue * Math.pow(1 + growthRate, i),
      target: i === periods ? growthData.finalValue : null
    }));
  }, [growthData]);

  // Memoized chart data for present value analysis
  const presentValueChartData = useMemo(() => {
    const periods = Math.max(presentValueData.periods, 1);
    const rate = presentValueData.discountRate / 100;
    
    return Array.from({ length: periods + 1 }, (_, i) => ({
      period: i,
      futureValue: presentValueData.futureValue,
      presentValue: presentValueData.futureValue / Math.pow(1 + rate, i),
      discountFactor: 1 / Math.pow(1 + rate, i)
    }));
  }, [presentValueData]);

  // Portfolio allocation data
  const portfolioData = useMemo(() => {
    if (!results) return [];
    
    const totalInvestment = 10000;
    return [
      { name: language === 'el' ? 'Μετοχές' : 'Stocks', value: totalInvestment * 0.6, color: '#3b82f6' },
      { name: language === 'el' ? 'Ομόλογα' : 'Bonds', value: totalInvestment * 0.3, color: '#10b981' },
      { name: language === 'el' ? 'Μετρητά' : 'Cash', value: totalInvestment * 0.1, color: '#f59e0b' }
    ];
  }, [results, language]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
              {entry.name.includes('Return') || entry.name.includes('Απόδοση') ? '%' : '€'}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="growth">
            {language === 'el' ? 'Ανάπτυξη' : 'Growth'}
          </TabsTrigger>
          <TabsTrigger value="present">
            {language === 'el' ? 'Παρ. Αξία' : 'Present Val.'}
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            {language === 'el' ? 'Χαρτοφυλάκιο' : 'Portfolio'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>{language === 'el' ? 'Ανάλυση Ρυθμού Ανάπτυξης' : 'Growth Rate Analysis'}</span>
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
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={growthChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name={language === 'el' ? 'Προβλεπόμενη Αξία' : 'Projected Value'}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name={language === 'el' ? 'Στόχος' : 'Target'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="present" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span>{language === 'el' ? 'Ανάλυση Παρούσας Αξίας' : 'Present Value Analysis'}</span>
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
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={presentValueChartData}>
                  <defs>
                    <linearGradient id="pvGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="presentValue" 
                    stroke="#3b82f6" 
                    fill="url(#pvGradient)"
                    name={language === 'el' ? 'Παρούσα Αξία' : 'Present Value'}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChartIcon className="w-5 h-5 text-purple-600" />
                <span>{language === 'el' ? 'Κατανομή Χαρτοφυλακίου' : 'Portfolio Allocation'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedFinancialModels;
