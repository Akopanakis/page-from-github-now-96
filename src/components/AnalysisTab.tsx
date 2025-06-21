import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, BarChart3, LineChart as LineChartIcon, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TooltipHelper from './TooltipHelper';
import ChartExplanation from './ChartExplanation';

interface AnalysisTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({ formData, updateFormData }) => {
  const { t, language } = useLanguage();
  const [selectedCharts, setSelectedCharts] = useState({
    costBreakdown: true,
    marginAnalysis: false,
    profitabilityChart: false
  });

  const [useProfitTarget, setUseProfitTarget] = useState(false);

  // Calculate profit margin from target profit if enabled
  const calculateMarginFromTarget = () => {
    if (useProfitTarget && formData.profitTarget && formData.purchasePrice && formData.quantity) {
      const totalCost = (formData.purchasePrice || 0) * (formData.quantity || 0);
      const targetMargin = ((formData.profitTarget || 0) / totalCost) * 100;
      updateFormData({ profitMargin: targetMargin });
    }
  };

  // Replace pie chart with more readable bar chart
  const costData = [
    { name: language === 'el' ? 'Κόστος Αγοράς' : 'Purchase Cost', value: (formData.purchasePrice || 0) * (formData.quantity || 0), color: '#3b82f6' },
    { name: language === 'el' ? 'Εργασία' : 'Labor', value: (formData.workers || []).reduce((sum: number, w: any) => sum + (w.hourlyRate * w.hours), 0), color: '#10b981' },
    { name: language === 'el' ? 'Μεταφορά' : 'Transport', value: ((formData.distance || 0) * (formData.fuelCost || 0)) + (formData.tolls || 0) + (formData.parkingCost || 0) + (formData.driverSalary || 0), color: '#f59e0b' },
    { name: language === 'el' ? 'Λοιπά' : 'Other', value: (formData.electricityCost || 0) + (formData.equipmentCost || 0) + (formData.insuranceCost || 0) + (formData.rentCost || 0) + (formData.communicationCost || 0) + (formData.otherCosts || 0), color: '#ef4444' }
  ];

  const marginData = [
    {
      category: language === 'el' ? 'Κόστος' : 'Cost',
      value: costData.reduce((sum, item) => sum + item.value, 0),
      color: '#ef4444'
    },
    {
      category: language === 'el' ? 'Κέρδος' : 'Profit',
      value: (costData.reduce((sum, item) => sum + item.value, 0) * (formData.profitMargin || 0)) / 100,
      color: '#10b981'
    }
  ];

  const profitabilityData = Array.from({ length: 12 }, (_, i) => ({
    month: language === 'el' ? ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'][i] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    revenue: (costData.reduce((sum, item) => sum + item.value, 0) * 1.2) * (1 + Math.sin(i / 2) * 0.1),
    cost: costData.reduce((sum, item) => sum + item.value, 0) * (1 + Math.random() * 0.05),
    profit: (costData.reduce((sum, item) => sum + item.value, 0) * 0.2) * (1 + Math.sin(i / 2) * 0.15)
  }));

  const handleChartToggle = (chartKey: string) => {
    setSelectedCharts(prev => ({ ...prev, [chartKey]: !prev[chartKey] }));
  };

  const handleProfitTargetChange = (checked: boolean | 'indeterminate') => {
    setUseProfitTarget(checked === true);
  };

  return (
    <div className="space-y-6">
      {/* Profit Configuration */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span>{language === 'el' ? 'Ρύθμιση Κερδοφορίας' : 'Profitability Settings'}</span>
            <TooltipHelper tooltipKey="tooltip.profit.margin" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="use-profit-target"
                checked={useProfitTarget}
                onCheckedChange={handleProfitTargetChange}
              />
              <Label htmlFor="use-profit-target" className="text-slate-700 flex items-center space-x-2">
                <span>{language === 'el' ? 'Χρήση στόχου κέρδους αντί ποσοστού' : 'Use profit target instead of percentage'}</span>
                <TooltipHelper tooltipKey="tooltip.profit.target" />
              </Label>
            </div>
            
            {useProfitTarget ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t('profit.target')}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.profitTarget || ''}
                    onChange={(e) => updateFormData({ profitTarget: parseFloat(e.target.value) || 0 })}
                    onBlur={calculateMarginFromTarget}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>{language === 'el' ? 'Υπολογισμένο Ποσοστό (%)' : 'Calculated Percentage (%)'}</Label>
                  <Input
                    type="number"
                    value={formData.profitMargin?.toFixed(2) || '0.00'}
                    disabled
                    className="mt-2 bg-gray-50"
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label>{t('profit.margin')}</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="20.0"
                  value={formData.profitMargin || ''}
                  onChange={(e) => updateFormData({ profitMargin: parseFloat(e.target.value) || 0 })}
                  className="mt-2"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chart Selection */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Eye className="w-5 h-5 text-blue-600" />
            <span>{language === 'el' ? 'Επιλογή Γραφημάτων' : 'Chart Selection'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(selectedCharts).map(([key, selected]) => {
              const labels = {
                costBreakdown: language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Breakdown',
                marginAnalysis: language === 'el' ? 'Ανάλυση Περιθωρίων' : 'Margin Analysis',
                profitabilityChart: language === 'el' ? 'Γράφημα Κερδοφορίας' : 'Profitability Chart'
              };
              
              return (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={key}
                    checked={selected}
                    onCheckedChange={(checked) => handleChartToggle(key)}
                  />
                  <Label htmlFor={key} className="text-slate-700">
                    {labels[key as keyof typeof labels]}
                  </Label>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown Chart - Replaced pie with horizontal bar */}
      {selectedCharts.costBreakdown && (
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>{t('cost.analysis')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartExplanation 
              type="cost" 
              data={{ 
                directCost: costData[0].value + costData[1].value, 
                indirectCost: costData[2].value + costData[3].value 
              }} 
            />
            <ResponsiveContainer width="100%" height={400} className="mt-4">
              <BarChart data={costData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={100} />
                <Tooltip formatter={(value: number) => [`${value.toFixed(2)}€`, '']} />
                <Legend />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Margin Analysis Chart */}
      {selectedCharts.marginAnalysis && (
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span>{t('margin.analysis')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartExplanation 
              type="margin" 
              data={{ margin: formData.profitMargin || 0 }} 
            />
            <ResponsiveContainer width="100%" height={400} className="mt-4">
              <BarChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip formatter={(value: number) => [`${value.toFixed(2)}€`, '']} />
                <Legend />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {marginData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Profitability Chart */}
      {selectedCharts.profitabilityChart && (
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-200">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <LineChartIcon className="w-5 h-5 text-purple-600" />
              <span>{t('profitability.analysis')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartExplanation type="profitability" />
            <ResponsiveContainer width="100%" height={400} className="mt-4">
              <AreaChart data={profitabilityData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip formatter={(value: number) => [`${value.toFixed(2)}€`, '']} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  fill="url(#revenueGradient)"
                  strokeWidth={3}
                  name={language === 'el' ? 'Έσοδα' : 'Revenue'}
                />
                <Area 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#ef4444" 
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name={language === 'el' ? 'Κόστος' : 'Cost'}
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  fill="url(#profitGradient)"
                  strokeWidth={3}
                  name={language === 'el' ? 'Κέρδος' : 'Profit'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
      
      {/* Competitor Analysis */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span>{language === 'el' ? 'Ανάλυση Ανταγωνισμού' : 'Competitor Analysis'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>{language === 'el' ? 'Τιμή Ανταγωνιστή 1 (€)' : 'Competitor 1 Price (€)'}</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.competitor1 || ''}
                onChange={(e) => updateFormData({ competitor1: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>
            <div>
              <Label>{language === 'el' ? 'Τιμή Ανταγωνιστή 2 (€)' : 'Competitor 2 Price (€)'}</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.competitor2 || ''}
                onChange={(e) => updateFormData({ competitor2: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisTab;
