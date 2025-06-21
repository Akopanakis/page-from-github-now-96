
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { Brain, TrendingUp, Users, Package, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Target } from 'lucide-react';
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

  // Enhanced chart configurations
  const chartConfig = {
    cost: {
      label: "Κόστος",
      color: "#ef4444",
    },
    revenue: {
      label: "Έσοδα", 
      color: "#10b981",
    },
    profit: {
      label: "Κέρδος",
      color: "#f59e0b",
    },
    margin: {
      label: "Περιθώριο",
      color: "#8b5cf6",
    }
  };

  const createCostBreakdownData = () => {
    if (!results) return [];
    
    return [
      { name: 'Αγορά Πρώτης Ύλης', value: results.purchaseCost, color: '#3b82f6', percentage: 0 },
      { name: 'Κόστος Εργασίας', value: results.laborCost, color: '#ef4444', percentage: 0 },
      { name: 'Συσκευασία', value: results.packagingCost, color: '#f59e0b', percentage: 0 },
      { name: 'Μεταφορικά', value: results.transportCost, color: '#8b5cf6', percentage: 0 },
      { name: 'Επιπλέον Κόστη', value: results.additionalCosts, color: '#06b6d4', percentage: 0 }
    ].filter(item => item.value > 0).map(item => {
      const total = results.totalCost;
      return {
        ...item,
        percentage: ((item.value / total) * 100).toFixed(1)
      };
    });
  };

  const createMarginAnalysisData = () => {
    if (!results) return [];
    
    const basePrice = results.totalCost / results.netWeight;
    const margins = [10, 15, 20, 25, 30, 35, 40, 45, 50];
    
    return margins.map(margin => ({
      margin: margin,
      marginLabel: `${margin}%`,
      price: basePrice * (1 + margin / 100),
      profit: (basePrice * (1 + margin / 100)) - basePrice,
      competitiveness: margin <= 25 ? 'Υψηλή' : margin <= 35 ? 'Μέτρια' : 'Χαμηλή'
    }));
  };

  const createProfitabilityData = () => {
    if (!results) return [];
    
    const quantities = [100, 250, 500, 750, 1000, 1500, 2000];
    const baseUnitCost = results.totalCost / (formData.quantity || 1);
    
    return quantities.map(qty => {
      const totalCost = baseUnitCost * qty;
      const revenue = results.sellingPrice * qty;
      const profit = revenue - totalCost;
      return {
        quantity: qty,
        cost: totalCost,
        revenue: revenue,
        profit: profit,
        margin: ((profit / revenue) * 100).toFixed(1)
      };
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Προχωρημένη Ανάλυση & Οπτικοποίηση</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeAnalysis} onValueChange={setActiveAnalysis}>
            <TabsList className="grid w-full grid-cols-4 bg-slate-100">
              <TabsTrigger value="pricing" className="flex items-center space-x-2 data-[state=active]:bg-white">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Έξυπνη Τιμολόγηση</span>
              </TabsTrigger>
              <TabsTrigger value="labor" className="flex items-center space-x-2 data-[state=active]:bg-white">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Βελτιστοποίηση Εργασίας</span>
              </TabsTrigger>
              <TabsTrigger value="packaging" className="flex items-center space-x-2 data-[state=active]:bg-white">
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Συσκευασία</span>
              </TabsTrigger>
              <TabsTrigger value="charts" className="flex items-center space-x-2 data-[state=active]:bg-white">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Αναλυτικά Γραφήματα</span>
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
                    {/* Enhanced Cost Breakdown Chart */}
                    <Card className="border-slate-200 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-slate-200">
                        <CardTitle className="flex items-center space-x-2 text-slate-800">
                          <PieChartIcon className="w-5 h-5 text-blue-600" />
                          <span>Ανάλυση Κόστους παρ Κατηγορία</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <ChartContainer config={chartConfig} className="h-[350px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={createCostBreakdownData()}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                innerRadius={40}
                                dataKey="value"
                                label={({ name, percentage }) => `${name}: ${percentage}%`}
                                labelLine={false}
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

                    {/* Enhanced Margin Analysis Chart */}
                    <Card className="border-slate-200 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
                        <CardTitle className="flex items-center space-x-2 text-slate-800">
                          <LineChartIcon className="w-5 h-5 text-green-600" />
                          <span>Ανάλυση Περιθωρίων Κέρδους</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <ChartContainer config={chartConfig} className="h-[350px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={createMarginAnalysisData()}>
                              <defs>
                                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                </linearGradient>
                                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="marginLabel" />
                              <YAxis />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Area 
                                type="monotone" 
                                dataKey="price" 
                                stroke="#3b82f6" 
                                strokeWidth={3}
                                fill="url(#priceGradient)"
                                name="Τιμή πώλησης (€/κg)"
                              />
                              <Area 
                                type="monotone" 
                                dataKey="profit" 
                                stroke="#10b981" 
                                strokeWidth={3}
                                fill="url(#profitGradient)"
                                name="Κέρδος (€/κg)"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Profitability Analysis Chart */}
                  <Card className="border-slate-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-200">
                      <CardTitle className="flex items-center space-x-2 text-slate-800">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <span>Ανάλυση Κερδοφορίας ανά Ποσότητα</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ChartContainer config={chartConfig} className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={createProfitabilityData()}>
                            <defs>
                              <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.6}/>
                              </linearGradient>
                              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.6}/>
                              </linearGradient>
                              <linearGradient id="profitGradient2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.6}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="quantity" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar 
                              dataKey="cost" 
                              fill="url(#costGradient)" 
                              name="Συνολικό Κόστος (€)"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar 
                              dataKey="revenue" 
                              fill="url(#revenueGradient)" 
                              name="Έσοδα (€)"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar 
                              dataKey="profit" 
                              fill="url(#profitGradient2)" 
                              name="Κέρδος (€)"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
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
