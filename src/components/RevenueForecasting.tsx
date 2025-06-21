
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Calendar, Users, Euro, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ForecastData {
  month: string;
  revenue: number;
  optimistic: number;
  pessimistic: number;
  customers: number;
}

interface RevenueParams {
  avgCustomersPerMonth: number;
  avgOrderValue: number;
  seasonalityFactor: number;
  growthRate: number;
  marketTrend: 'up' | 'stable' | 'down';
}

const RevenueForecasting: React.FC = () => {
  const { t } = useLanguage();
  const [params, setParams] = useState<RevenueParams>({
    avgCustomersPerMonth: 100,
    avgOrderValue: 50,
    seasonalityFactor: 1,
    growthRate: 5,
    marketTrend: 'stable'
  });

  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  const months = [
    'Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν',
    'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'
  ];

  const seasonalFactors = {
    'Ιαν': 0.85, 'Φεβ': 0.90, 'Μαρ': 1.05, 'Απρ': 1.10,
    'Μαϊ': 1.15, 'Ιουν': 1.20, 'Ιουλ': 1.25, 'Αυγ': 1.15,
    'Σεπ': 1.10, 'Οκτ': 1.05, 'Νοε': 0.95, 'Δεκ': 1.00
  };

  useEffect(() => {
    calculateForecast();
  }, [params]);

  const calculateForecast = () => {
    const data: ForecastData[] = months.map((month, index) => {
      const monthlyGrowth = Math.pow(1 + params.growthRate / 100, index / 12);
      const seasonal = seasonalFactors[month as keyof typeof seasonalFactors] * params.seasonalityFactor;
      
      let trendMultiplier = 1;
      if (params.marketTrend === 'up') trendMultiplier = 1 + (index * 0.02);
      else if (params.marketTrend === 'down') trendMultiplier = 1 - (index * 0.01);

      const baseCustomers = params.avgCustomersPerMonth * monthlyGrowth * seasonal * trendMultiplier;
      const baseRevenue = baseCustomers * params.avgOrderValue;

      return {
        month,
        revenue: Math.round(baseRevenue),
        optimistic: Math.round(baseRevenue * 1.2),
        pessimistic: Math.round(baseRevenue * 0.8),
        customers: Math.round(baseCustomers)
      };
    });

    setForecastData(data);
  };

  const totalRevenue = forecastData.reduce((sum, month) => sum + month.revenue, 0);
  const avgMonthlyRevenue = totalRevenue / 12;

  return (
    <div className="space-y-6">
      {/* Parameters Input */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Calculator className="w-5 h-5 text-blue-600" />
            <span>Παράμετροι Πρόβλεψης</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label className="flex items-center space-x-2 text-slate-700 font-medium">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Μέσος Αριθμός Πελατών/Μήνα</span>
              </Label>
              <Input
                type="number"
                value={params.avgCustomersPerMonth}
                onChange={(e) => setParams({...params, avgCustomersPerMonth: parseInt(e.target.value) || 0})}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="flex items-center space-x-2 text-slate-700 font-medium">
                <Euro className="w-4 h-4 text-green-600" />
                <span>Μέση Αξία Παραγγελίας (€)</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                value={params.avgOrderValue}
                onChange={(e) => setParams({...params, avgOrderValue: parseFloat(e.target.value) || 0})}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-slate-700 font-medium">Ρυθμός Ανάπτυξης (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={params.growthRate}
                onChange={(e) => setParams({...params, growthRate: parseFloat(e.target.value) || 0})}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-slate-700 font-medium">Εποχικότητα</Label>
              <Input
                type="number"
                step="0.1"
                min="0.5"
                max="2"
                value={params.seasonalityFactor}
                onChange={(e) => setParams({...params, seasonalityFactor: parseFloat(e.target.value) || 1})}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-slate-700 font-medium">Τάση Αγοράς</Label>
              <Select 
                value={params.marketTrend} 
                onValueChange={(value: 'up' | 'stable' | 'down') => setParams({...params, marketTrend: value})}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="up">📈 Ανοδική</SelectItem>
                  <SelectItem value="stable">➡️ Σταθερή</SelectItem>
                  <SelectItem value="down">📉 Καθοδική</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-600 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Ετήσια Έσοδα</p>
                <p className="text-3xl font-bold text-blue-600">{totalRevenue.toLocaleString()}€</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Μέσα Μηνιαία Έσοδα</p>
                <p className="text-3xl font-bold text-green-600">{Math.round(avgMonthlyRevenue).toLocaleString()}€</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Συνολικοί Πελάτες</p>
                <p className="text-3xl font-bold text-purple-600">
                  {forecastData.reduce((sum, month) => sum + month.customers, 0).toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Chart */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span>Πρόβλεψη Εσόδων - 12 Μήνες</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="optimisticGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${value.toLocaleString()}€`, '']}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="optimistic" 
                stroke="#10b981" 
                fill="url(#optimisticGradient)"
                strokeWidth={2}
                name="Αισιόδοξο Σενάριο"
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                fill="url(#revenueGradient)"
                strokeWidth={3}
                name="Βασική Πρόβλεψη"
              />
              <Line 
                type="monotone" 
                dataKey="pessimistic" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Απαισιόδοξο Σενάριο"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueForecasting;
