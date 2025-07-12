import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  AlertTriangle,
  Target,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Search
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/layout/PageLayout';

// Mock data for business intelligence
const mockSalesData = [
  { month: 'Jan', revenue: 45000, profit: 12000, orders: 156 },
  { month: 'Feb', revenue: 52000, profit: 15600, orders: 189 },
  { month: 'Mar', revenue: 48000, profit: 14400, orders: 167 },
  { month: 'Apr', revenue: 61000, profit: 18300, orders: 203 },
  { month: 'May', revenue: 55000, profit: 16500, orders: 178 },
  { month: 'Jun', revenue: 67000, profit: 20100, orders: 234 }
];

const mockProductData = [
  { name: 'Fresh Salmon', value: 35, color: '#0088FE' },
  { name: 'Frozen Cod', value: 25, color: '#00C49F' },
  { name: 'Shrimp', value: 20, color: '#FFBB28' },
  { name: 'Tuna', value: 15, color: '#FF8042' },
  { name: 'Other', value: 5, color: '#8884D8' }
];

const mockKPIs = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '€328,000',
    change: '+12.5%',
    trend: 'up' as const,
    icon: 'dollar-sign',
    color: 'text-green-600',
    description: 'Monthly revenue growth'
  },
  {
    id: 'orders',
    title: 'Total Orders',
    value: '1,127',
    change: '+8.3%',
    trend: 'up' as const,
    icon: 'package',
    color: 'text-blue-600',
    description: 'Order volume increase'
  },
  {
    id: 'customers',
    title: 'Active Customers',
    value: '456',
    change: '+15.2%',
    trend: 'up' as const,
    icon: 'users',
    color: 'text-purple-600',
    description: 'Customer base growth'
  },
  {
    id: 'margin',
    title: 'Profit Margin',
    value: '24.8%',
    change: '-2.1%',
    trend: 'down' as const,
    icon: 'target',
    color: 'text-orange-600',
    description: 'Average profit margin'
  }
];

const BusinessIntelligence: React.FC = () => {
  const { language } = useLanguage();
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleExport = () => {
    // Export functionality
    console.log('Exporting business intelligence data...');
  };

  return (
    <PageLayout title="Business Intelligence Dashboard">
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === 'el' ? 'Επιχειρηματική Ευφυΐα' : 'Business Intelligence'}
            </h1>
            <p className="text-gray-600">
              {language === 'el' 
                ? 'Ολοκληρωμένη ανάλυση επιδόσεων και τάσεων'
                : 'Comprehensive performance analysis and trends'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {language === 'el' ? 'Ανανέωση' : 'Refresh'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Εξαγωγή' : 'Export'}
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockKPIs.map((kpi) => (
            <Card key={kpi.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${kpi.color}`}>
                    {kpi.icon === 'dollar-sign' && <DollarSign className="w-6 h-6" />}
                    {kpi.icon === 'package' && <Package className="w-6 h-6" />}
                    {kpi.icon === 'users' && <Users className="w-6 h-6" />}
                    {kpi.icon === 'target' && <Target className="w-6 h-6" />}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {kpi.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              {language === 'el' ? 'Επισκόπηση' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="sales">
              {language === 'el' ? 'Πωλήσεις' : 'Sales'}
            </TabsTrigger>
            <TabsTrigger value="products">
              {language === 'el' ? 'Προϊόντα' : 'Products'}
            </TabsTrigger>
            <TabsTrigger value="trends">
              {language === 'el' ? 'Τάσεις' : 'Trends'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    {language === 'el' ? 'Έσοδα & Κέρδη' : 'Revenue & Profit'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockSalesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                      <Bar dataKey="profit" fill="#10B981" name="Profit" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Product Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="w-5 h-5 mr-2" />
                    {language === 'el' ? 'Κατανομή Προϊόντων' : 'Product Distribution'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockProductData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {mockProductData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'el' ? 'Ανάλυση Πωλήσεων' : 'Sales Analysis'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={mockSalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Revenue"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockProductData.map((product, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">Market Share</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: product.color }}>
                          {product.value}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${product.value}%`, 
                            backgroundColor: product.color 
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'el' ? 'Τάσεις Αγοράς' : 'Market Trends'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={mockSalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.6}
                      name="Profit"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default BusinessIntelligence;
