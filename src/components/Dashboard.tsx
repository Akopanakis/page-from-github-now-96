
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, DollarSign, Calendar, Fish, AlertTriangle, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BatchData {
  id: string;
  date: string;
  product: string;
  supplier: string;
  initialWeightKg: number;
  cleanLossPercent: number;
  glazingPercent: number;
  buyPricePerKg: number;
  finalCostPerKg: number;
  sellingPricePerKg: number;
  estimatedProfitPercent: number;
}

const Dashboard = () => {
  const { language } = useLanguage();

  // Mock data for demonstration
  const [batches] = useState<BatchData[]>([
    {
      id: '1',
      date: '2024-01-15',
      product: 'Θράψαλο Block',
      supplier: 'Αιγαίο Α.Ε.',
      initialWeightKg: 500,
      cleanLossPercent: 20,
      glazingPercent: 15,
      buyPricePerKg: 4.5,
      finalCostPerKg: 5.29,
      sellingPricePerKg: 7.0,
      estimatedProfitPercent: 24.7
    },
    {
      id: '2',
      date: '2024-01-20',
      product: 'Σφυρίδα Φιλέτα',
      supplier: 'Θάλασσα Β.Ε.',
      initialWeightKg: 300,
      cleanLossPercent: 15,
      glazingPercent: 10,
      buyPricePerKg: 6.2,
      finalCostPerKg: 7.15,
      sellingPricePerKg: 9.5,
      estimatedProfitPercent: 24.9
    },
    {
      id: '3',
      date: '2024-02-01',
      product: 'Καλαμάρι Κύκλοι',
      supplier: 'Αιγαίο Α.Ε.',
      initialWeightKg: 200,
      cleanLossPercent: 25,
      glazingPercent: 20,
      buyPricePerKg: 8.0,
      finalCostPerKg: 9.85,
      sellingPricePerKg: 13.0,
      estimatedProfitPercent: 24.2
    }
  ]);

  // Statistical data calculations
  const stats = useMemo(() => {
    const totalBatches = batches.length;
    const avgCost = batches.reduce((sum, b) => sum + b.finalCostPerKg, 0) / totalBatches;
    const avgProfit = batches.reduce((sum, b) => sum + b.estimatedProfitPercent, 0) / totalBatches;
    const totalWeight = batches.reduce((sum, b) => sum + b.initialWeightKg, 0);
    const lowProfitBatches = batches.filter(b => b.estimatedProfitPercent < 20).length;

    return { totalBatches, avgCost, avgProfit, totalWeight, lowProfitBatches };
  }, [batches]);

  // Chart data
  const costChart = useMemo(() => 
    batches.map(b => ({
      product: b.product.slice(0, 15),
      cost: b.finalCostPerKg,
      selling: b.sellingPricePerKg,
      profit: b.estimatedProfitPercent
    })), [batches]
  );

  const supplierChart = useMemo(() => {
    const supplierStats = batches.reduce((acc, b) => {
      if (!acc[b.supplier]) {
        acc[b.supplier] = { totalWeight: 0, avgLoss: 0, count: 0 };
      }
      acc[b.supplier].totalWeight += b.initialWeightKg;
      acc[b.supplier].avgLoss += b.cleanLossPercent;
      acc[b.supplier].count += 1;
      return acc;
    }, {} as Record<string, { totalWeight: number; avgLoss: number; count: number }>);

    return Object.entries(supplierStats).map(([supplier, data]) => ({
      supplier: supplier.slice(0, 15),
      avgLoss: data.avgLoss / data.count,
      totalWeight: data.totalWeight
    }));
  }, [batches]);

  const monthlyChart = useMemo(() => {
    const monthlyData = batches.reduce((acc, b) => {
      const month = b.date.slice(0, 7);
      if (!acc[month]) {
        acc[month] = { totalCost: 0, totalProfit: 0, count: 0 };
      }
      acc[month].totalCost += b.finalCostPerKg * b.initialWeightKg;
      acc[month].totalProfit += b.estimatedProfitPercent;
      acc[month].count += 1;
      return acc;
    }, {} as Record<string, { totalCost: number; totalProfit: number; count: number }>);

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      cost: data.totalCost,
      avgProfit: data.totalProfit / data.count
    }));
  }, [batches]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'el' ? 'Ταμπλό Αναλυτικών' : 'Analytics Dashboard'}
          </h2>
          <p className="text-gray-600">
            {language === 'el' ? 'Επισκόπηση απόδοσης και στατιστικών' : 'Performance overview and statistics'}
          </p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>{language === 'el' ? 'Εξαγωγή Αναφοράς' : 'Export Report'}</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'el' ? 'Συνολικές Παρτίδες' : 'Total Batches'}
            </CardTitle>
            <Fish className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBatches}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'el' ? '+12% από τον προηγούμενο μήνα' : '+12% from last month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'el' ? 'Μ.Ο. Κόστους/Kg' : 'Avg Cost/Kg'}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.avgCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'el' ? '-2.1% από την προηγούμενη εβδομάδα' : '-2.1% from last week'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'el' ? 'Μ.Ο. Κέρδους' : 'Avg Profit'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgProfit.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {language === 'el' ? '+5.4% από τον προηγούμενο μήνα' : '+5.4% from last month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'el' ? 'Χαμηλό Κέρδος' : 'Low Profit Alert'}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.lowProfitBatches}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'el' ? 'παρτίδες με <20% κέρδος' : 'batches with <20% profit'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="cost-analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cost-analysis">
            {language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Analysis'}
          </TabsTrigger>
          <TabsTrigger value="supplier-performance">
            {language === 'el' ? 'Απόδοση Προμηθευτών' : 'Supplier Performance'}
          </TabsTrigger>
          <TabsTrigger value="monthly-trends">
            {language === 'el' ? 'Μηνιαίες Τάσεις' : 'Monthly Trends'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cost-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>{language === 'el' ? 'Κόστος vs Τιμή Πώλησης ανά Προϊόν' : 'Cost vs Selling Price by Product'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={costChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cost" fill="#3b82f6" name={language === 'el' ? 'Κόστος/Kg' : 'Cost/Kg'} />
                  <Bar dataKey="selling" fill="#10b981" name={language === 'el' ? 'Πώληση/Kg' : 'Selling/Kg'} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplier-performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>{language === 'el' ? 'Μέσο Ποσοστό Απώλειας ανά Προμηθευτή' : 'Average Loss Percentage by Supplier'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={supplierChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="supplier" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgLoss" fill="#f59e0b" name={language === 'el' ? 'Μ.Ο. Απώλεια %' : 'Avg Loss %'} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly-trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span>{language === 'el' ? 'Μηνιαίες Τάσεις Κόστους και Κέρδους' : 'Monthly Cost and Profit Trends'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name={language === 'el' ? 'Συνολικό Κόστος' : 'Total Cost'}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgProfit" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name={language === 'el' ? 'Μ.Ο. Κέρδος %' : 'Avg Profit %'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Batches Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'el' ?  'Πρόσφατες Παρτίδες' : 'Recent Batches'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">{language === 'el' ? 'Ημερομηνία' : 'Date'}</th>
                  <th className="text-left p-2">{language === 'el' ? 'Προϊόν' : 'Product'}</th>
                  <th className="text-left p-2">{language === 'el' ? 'Προμηθευτής' : 'Supplier'}</th>
                  <th className="text-right p-2">{language === 'el' ? 'Κόστος/Kg' : 'Cost/Kg'}</th>
                  <th className="text-right p-2">{language === 'el' ? 'Κέρδος %' : 'Profit %'}</th>
                  <th className="text-center p-2">{language === 'el' ? 'Κατάσταση' : 'Status'}</th>
                </tr>
              </thead>
              <tbody>
                {batches.slice(0, 5).map((batch) => (
                  <tr key={batch.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{batch.date}</td>
                    <td className="p-2 font-medium">{batch.product}</td>
                    <td className="p-2">{batch.supplier}</td>
                    <td className="p-2 text-right">€{batch.finalCostPerKg.toFixed(2)}</td>
                    <td className="p-2 text-right">{batch.estimatedProfitPercent.toFixed(1)}%</td>
                    <td className="p-2 text-center">
                      <Badge variant={batch.estimatedProfitPercent >= 20 ? "default" : "destructive"}>
                        {batch.estimatedProfitPercent >= 20 
                          ? (language === 'el' ? 'Καλό' : 'Good')
                          : (language === 'el' ? 'Χαμηλό' : 'Low')
                        }
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
