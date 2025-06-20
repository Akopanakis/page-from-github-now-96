
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Brain, TrendingUp, Users, Package, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import IntelligentPricing from './IntelligentPricing';
import LaborOptimization from './LaborOptimization';
import PackagingCalculator from './PackagingCalculator';

interface AdvancedAnalysisTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
  results: any;
}

const AdvancedAnalysisTab: React.FC<AdvancedAnalysisTabProps> = ({ formData, updateFormData, results }) => {
  const [activeAnalysis, setActiveAnalysis] = useState('pricing');

  // Chart configurations
  const chartConfig = {
    cost: {
      label: "Κόστος",
      color: "#3b82f6",
    },
    revenue: {
      label: "Έσοδα", 
      color: "#10b981",
    },
    profit: {
      label: "Κέρδος",
      color: "#f59e0b",
    },
  };

  const createCostBreakdownData = () => {
    if (!results) return [];
    
    return [
      { name: 'Αγορά', value: results.purchaseCost, color: '#3b82f6' },
      { name: 'Εργασία', value: results.laborCost, color: '#ef4444' },
      { name: 'Συσκευασία', value: results.packagingCost, color: '#f59e0b' },
      { name: 'Μεταφορά', value: results.transportCost, color: '#8b5cf6' },
      { name: 'Επιπλέον', value: results.additionalCosts, color: '#06b6d4' }
    ].filter(item => item.value > 0);
  };

  const createMarginAnalysisData = () => {
    if (!results) return [];
    
    const basePrice = results.sellingPrice;
    const margins = [10, 15, 20, 25, 30, 35, 40];
    
    return margins.map(margin => ({
      margin: `${margin}%`,
      price: (results.totalCost / results.netWeight) * (1 + margin / 100),
      profit: ((results.totalCost / results.netWeight) * (1 + margin / 100)) - (results.totalCost / results.netWeight)
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Προχωρημένη Ανάλυση</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeAnalysis} onValueChange={setActiveAnalysis}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pricing" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Τιμολόγηση</span>
              </TabsTrigger>
              <TabsTrigger value="labor" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Εργασία</span>
              </TabsTrigger>
              <TabsTrigger value="packaging" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Συσκευασία</span>
              </TabsTrigger>
              <TabsTrigger value="charts" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Γραφήματα</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pricing" className="space-y-6">
              {results && <IntelligentPricing results={results} formData={formData} />}
            </TabsContent>

            <TabsContent value="labor" className="space-y-6">
              <LaborOptimization formData={formData} updateFormData={updateFormData} />
            </TabsContent>

            <TabsContent value="packaging" className="space-y-6">
              <PackagingCalculator formData={formData} updateFormData={updateFormData} />
            </TabsContent>

            <TabsContent value="charts" className="space-y-6">
              {results && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <PieChartIcon className="w-5 h-5" />
                          <span>Κατανομή Κόστους</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={createCostBreakdownData()}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {createCostBreakdownData().map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <ChartTooltip 
                                content={<ChartTooltipContent />}
                                formatter={(value: any) => [`${Number(value).toFixed(2)}€`, '']}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <LineChartIcon className="w-5 h-5" />
                          <span>Ανάλυση Περιθωρίων</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={createMarginAnalysisData()}>
                              <XAxis dataKey="margin" />
                              <YAxis />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Line 
                                type="monotone" 
                                dataKey="price" 
                                stroke="#3b82f6" 
                                strokeWidth={2}
                                name="Τιμή πώλησης"
                              />
                              <Line 
                                type="monotone" 
                                dataKey="profit" 
                                stroke="#10b981" 
                                strokeWidth={2}
                                name="Κέρδος/κιλό"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalysisTab;
