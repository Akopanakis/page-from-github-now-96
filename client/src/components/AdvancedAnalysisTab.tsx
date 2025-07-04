import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { Brain, TrendingUp, Users, Package, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Target, Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import IntelligentPricing from './IntelligentPricing';
import LaborOptimization from './LaborOptimization';
import PackagingCalculator from './PackagingCalculator';
import CostForecast from './CostForecast';

interface AdvancedAnalysisTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
  results: any;
}

const AdvancedAnalysisTab: React.FC<AdvancedAnalysisTabProps> = ({ formData, updateFormData, results }) => {
  const [activeAnalysis, setActiveAnalysis] = useState('pricing');
  const [visibleSections, setVisibleSections] = useState({
    pricing: true,
    labor: false,
    packaging: false,
    charts: false
  });

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

  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
          {/* Section Visibility Controls */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-700 mb-3 flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Επιλέξτε τις ενότητες που θέλετε να δείτε:</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(visibleSections).map(([key, visible]) => {
                const labels = {
                  pricing: 'Έξυπνη Τιμολόγηση',
                  labor: 'Βελτιστοποίηση Εργασίας',
                  packaging: 'Συσκευασία',
                  charts: 'Αναλυτικά Γραφήματα'
                };
                
                return (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox 
                      id={key}
                      checked={visible}
                      onCheckedChange={() => toggleSection(key as keyof typeof visibleSections)}
                    />
                    <Label htmlFor={key} className="text-sm text-slate-700 cursor-pointer">
                      {labels[key as keyof typeof labels]}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Intelligent Pricing Section */}
          {visibleSections.pricing && (
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-800">Έξυπνη Τιμολόγηση</h3>
              </div>
              {results && <IntelligentPricing results={results} formData={formData} />}
            </div>
          )}

          {/* Labor Optimization Section */}
          {visibleSections.labor && (
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-slate-800">Βελτιστοποίηση Εργασίας</h3>
              </div>
              <LaborOptimization formData={formData} updateFormData={updateFormData} />
            </div>
          )}

          {/* Packaging Calculator Section */}
          {visibleSections.packaging && (
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-slate-800">Υπολογιστής Συσκευασίας</h3>
              </div>
              <PackagingCalculator formData={formData} updateFormData={updateFormData} />
            </div>
          )}

          {/* Advanced Charts Section */}
          {visibleSections.charts && results && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-slate-800">Αναλυτικά Γραφήματα</h3>
              </div>
              
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
                    <div className="w-full h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={createCostBreakdownData()}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            innerRadius={40}
                            dataKey="value"
                            label={renderCustomizedLabel}
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
                    </div>
                    
                    {/* Chart Explanation */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-semibold text-blue-800 mb-2">Τι δείχνει:</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Την κατανομή του συνολικού κόστους ανά κατηγορία</li>
                        <li>• Ποιες κατηγορίες επηρεάζουν περισσότερο το τελικό κόστος</li>
                        <li>• Περιοχές εστίασης για εξοικονόμηση κόστους</li>
                      </ul>
                    </div>
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
                    <div className="w-full h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={createMarginAnalysisData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    </div>
                    
                    {/* Chart Explanation */}
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h5 className="font-semibold text-green-800 mb-2">Τι δείχνει:</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Πώς αλλάζει η τιμή και το κέρδος με διαφορετικά περιθώρια</li>
                        <li>• Το βέλτιστο περιθώριο για μέγιστη κερδοφορία</li>
                        <li>• Την ανταγωνιστικότητα σε κάθε επίπεδο περιθωρίου</li>
                      </ul>
                    </div>
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
                  <div className="w-full h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={createProfitabilityData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  </div>
                  
                  {/* Chart Explanation */}
                  <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <h5 className="font-semibold text-purple-800 mb-2">Τι δείχνει:</h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Πώς αλλάζει η κερδοφορία με διαφορετικές ποσότητες παραγωγής</li>
                      <li>• Τις οικονομίες κλίμακας και το βέλτιστο μέγεθος παραγωγής</li>
                      <li>• Τη σχέση κόστους-εσόδων-κέρδους σε διαφορετικά επίπεδα</li>
                      <li>• Το σημείο όπου η παραγωγή γίνεται πιο αποδοτική</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <CostForecast />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalysisTab;