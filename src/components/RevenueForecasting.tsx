
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Calendar, DollarSign, Package, Target, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FormData, CalculationResults } from '../types';

interface RevenueForecastingProps {
  formData: FormData;
  results: CalculationResults | null;
}

interface ForecastData {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
  volume: number;
}

const RevenueForecasting: React.FC<RevenueForecastingProps> = ({ formData, results }) => {
  const { language } = useLanguage();
  const [forecastParams, setForecastParams] = useState({
    monthlyVolume: 1000, // kg per month
    growthRate: 5, // % per month
    seasonalityFactor: 1.0,
    marketTrend: 'stable' as 'growing' | 'stable' | 'declining'
  });

  const generateForecast = (): ForecastData[] => {
    if (!results) return [];

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return months.map((month, index) => {
      let volumeMultiplier = 1;
      
      // Apply growth rate
      if (forecastParams.marketTrend === 'growing') {
        volumeMultiplier = Math.pow(1 + forecastParams.growthRate / 100, index);
      } else if (forecastParams.marketTrend === 'declining') {
        volumeMultiplier = Math.pow(1 - forecastParams.growthRate / 100, index);
      }

      // Apply seasonality (higher in winter months for food products)
      const seasonalMultiplier = [1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.7, 0.8, 0.9, 1.0, 1.1, 1.3][index];
      
      const monthlyVolume = forecastParams.monthlyVolume * volumeMultiplier * seasonalMultiplier;
      const monthlyRevenue = (results.sellingPrice / results.finalWeight) * monthlyVolume;
      const monthlyCost = (results.totalCost / results.finalWeight) * monthlyVolume;
      const monthlyProfit = monthlyRevenue - monthlyCost;

      return {
        month,
        revenue: monthlyRevenue,
        cost: monthlyCost,
        profit: monthlyProfit,
        volume: monthlyVolume
      };
    });
  };

  const forecastData = generateForecast();
  const totalYearlyRevenue = forecastData.reduce((sum, month) => sum + month.revenue, 0);
  const totalYearlyProfit = forecastData.reduce((sum, month) => sum + month.profit, 0);
  const totalYearlyVolume = forecastData.reduce((sum, month) => sum + month.volume, 0);

  return (
    <div className="space-y-6">
      {/* Forecast Parameters */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {language === 'el' ? 'Παράμετροι Πρόβλεψης' : 'Forecast Parameters'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>{language === 'el' ? 'Μηνιαίος Όγκος (kg)' : 'Monthly Volume (kg)'}</Label>
              <Input
                type="number"
                value={forecastParams.monthlyVolume}
                onChange={(e) => setForecastParams(prev => ({ 
                  ...prev, 
                  monthlyVolume: parseInt(e.target.value) || 0 
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'el' ? 'Ρυθμός Ανάπτυξης (%)' : 'Growth Rate (%)'}</Label>
              <Input
                type="number"
                step="0.1"
                value={forecastParams.growthRate}
                onChange={(e) => setForecastParams(prev => ({ 
                  ...prev, 
                  growthRate: parseFloat(e.target.value) || 0 
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'el' ? 'Τάση Αγοράς' : 'Market Trend'}</Label>
              <select 
                className="w-full p-2 border rounded-md bg-background"
                value={forecastParams.marketTrend}
                onChange={(e) => setForecastParams(prev => ({ 
                  ...prev, 
                  marketTrend: e.target.value as 'growing' | 'stable' | 'declining'
                }))}
              >
                <option value="growing">{language === 'el' ? 'Ανοδική' : 'Growing'}</option>
                <option value="stable">{language === 'el' ? 'Σταθερή' : 'Stable'}</option>
                <option value="declining">{language === 'el' ? 'Καθοδική' : 'Declining'}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>{language === 'el' ? 'Εποχικότητα' : 'Seasonality'}</Label>
              <Input
                type="number"
                step="0.1"
                min="0.1"
                max="2.0"
                value={forecastParams.seasonalityFactor}
                onChange={(e) => setForecastParams(prev => ({ 
                  ...prev, 
                  seasonalityFactor: parseFloat(e.target.value) || 1.0 
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">
              €{(totalYearlyRevenue / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">
              {language === 'el' ? 'Ετήσια Έσοδα' : 'Annual Revenue'}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">
              €{(totalYearlyProfit / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">
              {language === 'el' ? 'Ετήσιο Κέρδος' : 'Annual Profit'}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200">
          <CardContent className="p-6 text-center">
            <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">
              {(totalYearlyVolume / 1000).toFixed(1)}T
            </div>
            <div className="text-sm text-muted-foreground">
              {language === 'el' ? 'Ετήσιος Όγκος' : 'Annual Volume'}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">
              {((totalYearlyProfit / totalYearlyRevenue) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">
              {language === 'el' ? 'Περιθώριο Κέρδους' : 'Profit Margin'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Forecast Chart */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {language === 'el' ? 'Πρόβλεψη Εσόδων 12 Μηνών' : '12-Month Revenue Forecast'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `€${value.toFixed(0)}`,
                  name === 'revenue' ? (language === 'el' ? 'Έσοδα' : 'Revenue') :
                  name === 'cost' ? (language === 'el' ? 'Κόστος' : 'Cost') :
                  (language === 'el' ? 'Κέρδος' : 'Profit')
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Volume Forecast */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {language === 'el' ? 'Πρόβλεψη Όγκου Παραγωγής' : 'Production Volume Forecast'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [
                  `${value.toFixed(0)} kg`,
                  language === 'el' ? 'Όγκος' : 'Volume'
                ]}
              />
              <Bar 
                dataKey="volume" 
                fill="url(#volumeGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {language === 'el' ? 'Μηνιαία Ανάλυση' : 'Monthly Breakdown'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {forecastData.map((month) => (
              <div key={month.month} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg hover:shadow-md transition-shadow">
                <div className="font-medium">{month.month}</div>
                <div className="flex gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">€{month.revenue.toFixed(0)}</div>
                    <div className="text-muted-foreground">{language === 'el' ? 'Έσοδα' : 'Revenue'}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-red-600">€{month.cost.toFixed(0)}</div>
                    <div className="text-muted-foreground">{language === 'el' ? 'Κόστος' : 'Cost'}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">€{month.profit.toFixed(0)}</div>
                    <div className="text-muted-foreground">{language === 'el' ? 'Κέρδος' : 'Profit'}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">{month.volume.toFixed(0)} kg</div>
                    <div className="text-muted-foreground">{language === 'el' ? 'Όγκος' : 'Volume'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueForecasting;
