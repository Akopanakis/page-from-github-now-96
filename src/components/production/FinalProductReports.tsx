import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Target, 
  Award,
  Calendar,
  Users,
  Scale,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { 
  ProductionReport, 
  DashboardStats, 
  FilterConfig, 
  FinalProductBatch, 
  SaleTransaction,
  FinalProductStock
} from '@/types/finalProduct';
import { finalProductDemoData, getDemoDataSummary } from '@/data/finalProductDemo';

const COLORS = ['#1F4E79', '#F29F05', '#4CB944', '#E53E3E', '#805AD5', '#3182CE'];

interface FinalProductReportsProps {
  batches?: FinalProductBatch[];
  sales?: SaleTransaction[];
  stock?: FinalProductStock[];
}

const FinalProductReports: React.FC<FinalProductReportsProps> = ({
  batches = finalProductDemoData.batches,
  sales = finalProductDemoData.sales,
  stock = finalProductDemoData.stock
}) => {
  // State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState<FilterConfig>({
    period: 'month',
    productIds: [],
    batchNumbers: [],
    customerNames: []
  });

  // Calculations
  const dashboardStats = useMemo(() => {
    const summary = getDemoDataSummary();
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    // Today's stats (mock for demo)
    const todayStats = {
      batchesProduced: 1,
      kgProduced: 50,
      revenue: 250,
      profit: 75
    };

    // This month's stats
    const monthlyBatches = batches.filter(batch => {
      const batchDate = new Date(batch.productionDate);
      return batchDate.getMonth() === thisMonth && batchDate.getFullYear() === thisYear;
    });

    const monthlySales = sales.filter(sale => {
      const saleDate = new Date(sale.saleDate);
      return saleDate.getMonth() === thisMonth && saleDate.getFullYear() === thisYear;
    });

    const monthlyStats = {
      batchesProduced: monthlyBatches.length,
      kgProduced: monthlyBatches.reduce((sum, batch) => sum + batch.finalProductKg, 0),
      revenue: monthlySales.reduce((sum, sale) => sum + sale.totalRevenue, 0),
      profit: monthlySales.reduce((sum, sale) => sum + sale.totalProfit, 0),
      profitMargin: 0
    };
    
    monthlyStats.profitMargin = monthlyStats.revenue > 0 
      ? (monthlyStats.profit / monthlyStats.revenue) * 100 
      : 0;

    // Stock stats
    const stockStats = {
      totalProducts: stock.length,
      totalKg: stock.reduce((sum, s) => sum + s.remainingKg, 0),
      totalValue: stock.reduce((sum, s) => sum + (s.remainingKg * s.costPerKg), 0),
      lowStockAlerts: stock.filter(s => s.remainingKg < 10).length
    };

    // Trends (mock data for demo)
    const trends = {
      productionTrend: [
        { date: '2024-01-15', kg: 160, revenue: 405 },
        { date: '2024-01-20', kg: 80, revenue: 260 },
        { date: '2024-01-25', kg: 180, revenue: 520 },
        { date: '2024-01-30', kg: 120, revenue: 380 }
      ],
      profitTrend: [
        { date: '2024-01-15', profit: 172, margin: 42.5 },
        { date: '2024-01-20', profit: 54, margin: 20.8 },
        { date: '2024-01-25', profit: 144, margin: 27.7 },
        { date: '2024-01-30', profit: 95, margin: 25.0 }
      ]
    };

    return {
      today: todayStats,
      thisMonth: monthlyStats,
      stock: stockStats,
      trends
    };
  }, [batches, sales, stock]);

  // Product performance analysis
  const productPerformance = useMemo(() => {
    const performance = batches.map(batch => {
      const batchSales = sales.filter(sale => 
        sale.items.some(item => item.batchId === batch.id)
      );
      
      const totalSold = batchSales.reduce((sum, sale) => 
        sum + sale.items
          .filter(item => item.batchId === batch.id)
          .reduce((itemSum, item) => itemSum + item.soldKg, 0), 0
      );

      const totalRevenue = batchSales.reduce((sum, sale) => 
        sum + sale.items
          .filter(item => item.batchId === batch.id)
          .reduce((itemSum, item) => itemSum + item.revenue, 0), 0
      );

      const totalCost = totalSold * batch.calculatedCostPerKg;
      const profit = totalRevenue - totalCost;
      const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

      return {
        batchNumber: batch.batchNumber,
        productName: batch.productName,
        producedKg: batch.finalProductKg,
        soldKg: totalSold,
        remainingKg: batch.finalProductKg - totalSold,
        sellThroughRate: (totalSold / batch.finalProductKg) * 100,
        revenue: totalRevenue,
        cost: totalCost,
        profit,
        profitMargin,
        yieldPercentage: batch.yieldPercentage,
        costPerKg: batch.calculatedCostPerKg
      };
    });

    return performance.sort((a, b) => b.profit - a.profit);
  }, [batches, sales]);

  // Chart data
  const yieldChartData = batches.map(batch => ({
    name: batch.batchNumber,
    yield: batch.yieldPercentage,
    target: 85
  }));

  const profitabilityData = productPerformance.map(perf => ({
    name: perf.batchNumber,
    profit: perf.profit,
    margin: perf.profitMargin,
    revenue: perf.revenue
  }));

  const salesTrendData = dashboardStats.trends.productionTrend;
  const profitTrendData = dashboardStats.trends.profitTrend;

  const exportReport = () => {
    const reportData = {
      summary: dashboardStats,
      productPerformance,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `final-product-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Header */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl">Αναφορές Τελικών Προϊόντων</span>
                <div className="text-sm text-muted-foreground mt-1">
                  Στατιστικά, απόδοση και κερδοφορία παρτίδων
                </div>
              </div>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={exportReport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Ανανέωση
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="performance">Απόδοση</TabsTrigger>
          <TabsTrigger value="profitability">Κερδοφορία</TabsTrigger>
          <TabsTrigger value="detailed">Λεπτομερείς</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Σημερινή Παραγωγή</p>
                    <p className="text-2xl font-bold">{dashboardStats.today.kgProduced} kg</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">+12%</span>
                    </div>
                  </div>
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Μηνιαίο Κέρδος</p>
                    <p className="text-2xl font-bold">€{dashboardStats.thisMonth.profit.toFixed(0)}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">{dashboardStats.thisMonth.profitMargin.toFixed(1)}%</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Stock Αξία</p>
                    <p className="text-2xl font-bold">€{dashboardStats.stock.totalValue.toFixed(0)}</p>
                    <div className="flex items-center mt-1">
                      <Scale className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-sm text-blue-600">{dashboardStats.stock.totalKg.toFixed(0)} kg</span>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Yield</p>
                    <p className="text-2xl font-bold">84%</p>
                    <div className="flex items-center mt-1">
                      <Award className="w-4 h-4 text-orange-600 mr-1" />
                      <span className="text-sm text-orange-600">Target: 85%</span>
                    </div>
                  </div>
                  <Scale className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Τάση Πωλήσεων</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('el-GR', { month: 'short', day: 'numeric' })} />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString('el-GR')}
                        formatter={(value, name) => [
                          name === 'kg' ? `${value} kg` : `€${value}`,
                          name === 'kg' ? 'Παραγωγή' : 'Έσοδα'
                        ]}
                      />
                      <Area type="monotone" dataKey="kg" stackId="1" stroke="#1F4E79" fill="#1F4E79" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="revenue" stackId="2" stroke="#F29F05" fill="#F29F05" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Profit Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Κερδοφορία</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={profitTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('el-GR', { month: 'short', day: 'numeric' })} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString('el-GR')}
                        formatter={(value, name) => [
                          name === 'profit' ? `€${value}` : `${value}%`,
                          name === 'profit' ? 'Κέρδος' : 'Περιθώριο'
                        ]}
                      />
                      <Line yAxisId="left" type="monotone" dataKey="profit" stroke="#4CB944" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#E53E3E" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">🏆 Πιο Κερδοφόρα</h4>
                  {productPerformance.slice(0, 3).map((perf, index) => (
                    <div key={index} className="flex justify-between text-sm mb-1">
                      <span>#{perf.batchNumber}</span>
                      <span className="font-medium">€{perf.profit.toFixed(0)}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">📈 Καλύτερη Απόδοση</h4>
                  {batches
                    .sort((a, b) => b.yieldPercentage - a.yieldPercentage)
                    .slice(0, 3)
                    .map((batch, index) => (
                      <div key={index} className="flex justify-between text-sm mb-1">
                        <span>#{batch.batchNumber}</span>
                        <span className="font-medium">{batch.yieldPercentage.toFixed(1)}%</span>
                      </div>
                    ))}
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-800 mb-2">📦 Μεγαλύτερο Όγκο</h4>
                  {batches
                    .sort((a, b) => b.finalProductKg - a.finalProductKg)
                    .slice(0, 3)
                    .map((batch, index) => (
                      <div key={index} className="flex justify-between text-sm mb-1">
                        <span>#{batch.batchNumber}</span>
                        <span className="font-medium">{batch.finalProductKg.toFixed(0)}kg</span>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Yield Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Απόδοση ανά Παρτίδα</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yieldChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="yield" fill="#1F4E79" />
                      <Bar dataKey="target" fill="#F29F05" fillOpacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Λεπτομερής Απόδοση</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Παρτίδα</TableHead>
                      <TableHead>Προϊόν</TableHead>
                      <TableHead>Yield</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batches.map(batch => (
                      <TableRow key={batch.id}>
                        <TableCell>#{batch.batchNumber}</TableCell>
                        <TableCell>{batch.productName}</TableCell>
                        <TableCell>
                          <Badge variant={batch.yieldPercentage >= 85 ? "default" : batch.yieldPercentage >= 70 ? "secondary" : "destructive"}>
                            {batch.yieldPercentage.toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{batch.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profitability Tab */}
        <TabsContent value="profitability" className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Profit Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Κέρδος ανά Παρτίδα</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profitabilityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'profit' ? `€${value}` : `${value}%`,
                          name === 'profit' ? 'Κέρδος' : 'Περιθώριο'
                        ]}
                      />
                      <Bar dataKey="profit" fill="#4CB944" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Margin Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Ανάλυση Περιθωρίων</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productPerformance.map((perf, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">#{perf.batchNumber}</div>
                        <div className="text-sm text-muted-foreground">{perf.productName}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          €{perf.profit.toFixed(2)}
                        </div>
                        <div className={`text-sm ${
                          perf.profitMargin >= 30 ? 'text-green-600' :
                          perf.profitMargin >= 15 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {perf.profitMargin.toFixed(1)}% margin
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Detailed Tab */}
        <TabsContent value="detailed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Λεπτομερής Ανάλυση Παρτίδων</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Παρτίδα</TableHead>
                    <TableHead>Προϊόν</TableHead>
                    <TableHead>Παραγωγή</TableHead>
                    <TableHead>Πωλήσεις</TableHead>
                    <TableHead>Yield</TableHead>
                    <TableHead>Κέρδος</TableHead>
                    <TableHead>Margin</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPerformance.map((perf, index) => (
                    <TableRow key={index}>
                      <TableCell>#{perf.batchNumber}</TableCell>
                      <TableCell>{perf.productName}</TableCell>
                      <TableCell>{perf.producedKg.toFixed(1)} kg</TableCell>
                      <TableCell>{perf.soldKg.toFixed(1)} kg</TableCell>
                      <TableCell>
                        <Badge variant={perf.yieldPercentage >= 85 ? "default" : "secondary"}>
                          {perf.yieldPercentage.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">€{perf.profit.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={perf.profitMargin >= 25 ? "default" : "secondary"}>
                          {perf.profitMargin.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={perf.sellThroughRate >= 80 ? "default" : "destructive"}>
                          {perf.sellThroughRate.toFixed(0)}% sold
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinalProductReports;
