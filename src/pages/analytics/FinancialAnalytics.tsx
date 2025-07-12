import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useLanguage } from "@/contexts/LanguageContext";

interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  supplier?: string;
}

interface AnalyticsRecord {
  id: string;
  date: string;
  value: number;
  category: string;
}

const FinancialAnalytics = () => {
  const { language } = useLanguage();

  const expenses: Expense[] = [
    { id: '1', date: '2024-01-01', amount: 150, category: 'Supplies', supplier: 'Office Depot' },
    { id: '2', date: '2024-01-05', amount: 300, category: 'Marketing', supplier: 'Ad Agency' },
    { id: '3', date: '2024-01-10', amount: 75, category: 'Utilities' },
    { id: '4', date: '2024-01-15', amount: 200, category: 'Rent' },
    { id: '5', date: '2024-01-20', amount: 100, category: 'Travel' },
  ];

  const analyticsData: AnalyticsRecord[] = [
    { id: '1', date: '2024-01-01', value: 1500, category: 'Revenue' },
    { id: '2', date: '2024-01-05', value: 1650, category: 'Revenue' },
    { id: '3', date: '2024-01-10', value: 1800, category: 'Revenue' },
    { id: '4', date: '2024-01-15', value: 1700, category: 'Revenue' },
    { id: '5', date: '2024-01-20', value: 1900, category: 'Revenue' },
    { id: '6', date: '2024-01-01', value: 800, category: 'Expenses' },
    { id: '7', date: '2024-01-05', value: 850, category: 'Expenses' },
    { id: '8', date: '2024-01-10', value: 900, category: 'Expenses' },
    { id: '9', date: '2024-01-15', value: 880, category: 'Expenses' },
    { id: '10', date: '2024-01-20', value: 950, category: 'Expenses' },
  ];

  const metrics = [
    {
      id: 'revenue',
      title: language === 'el' ? 'Έσοδα' : 'Revenue',
      value: '$19,500',
      change: '+12%',
      trend: 'up' as const,
      icon: 'lucide-icons/dollar-sign',
      color: 'green',
      description: language === 'el' ? 'Συνολικά έσοδα από πωλήσεις' : 'Total revenue from sales'
    },
    {
      id: 'expenses',
      title: language === 'el' ? 'Έξοδα' : 'Expenses',
      value: '$8,500',
      change: '-5%',
      trend: 'down' as const,
      icon: 'lucide-icons/credit-card',
      color: 'red',
      description: language === 'el' ? 'Συνολικά έξοδα λειτουργίας' : 'Total operating expenses'
    },
    {
      id: 'profit',
      title: language === 'el' ? 'Κέρδος' : 'Profit',
      value: '$11,000',
      change: '+18%',
      trend: 'up' as const,
      icon: 'lucide-icons/trending-up',
      color: 'blue',
      description: language === 'el' ? 'Συνολικό καθαρό κέρδος' : 'Total net profit'
    },
  ];

  const performanceData = [
    { id: 'sales', title: language === 'el' ? 'Πωλήσεις' : 'Sales', value: '85%', change: '+3%', trend: 'up' as const },
    { id: 'marketing', title: language === 'el' ? 'Μάρκετινγκ' : 'Marketing', value: '72%', change: '-1%', trend: 'down' as const },
    { id: 'operations', title: language === 'el' ? 'Λειτουργίες' : 'Operations', value: '91%', change: '+5%', trend: 'up' as const },
  ];

  const kpiData = [
    {
      id: 'customer-satisfaction',
      title: language === 'el' ? 'Ικανοποίηση Πελατών' : 'Customer Satisfaction',
      value: '4.5',
      unit: '/5',
      variance: '+0.2',
      target: '4.7',
      benchmark: '4.3',
      name: language === 'el' ? 'Μέση βαθμολογία ικανοποίησης πελατών' : 'Average customer satisfaction score',
      period: language === 'el' ? 'Τρέχων μήνας' : 'Current month',
      category: 'Customer Experience'
    },
    {
      id: 'market-share',
      title: language === 'el' ? 'Μερίδιο Αγοράς' : 'Market Share',
      value: '22',
      unit: '%',
      variance: '+1',
      target: '23',
      benchmark: '21',
      name: language === 'el' ? 'Τρέχον μερίδιο αγοράς' : 'Current market share',
      period: language === 'el' ? 'Τρέχον τρίμηνο' : 'Current quarter',
      category: 'Market Position'
    },
    {
      id: 'employee-retention',
      title: language === 'el' ? 'Διατήρηση Υπαλλήλων' : 'Employee Retention',
      value: '90',
      unit: '%',
      variance: '+2',
      target: '92',
      benchmark: '88',
      name: language === 'el' ? 'Ποσοστό διατήρησης υπαλλήλων' : 'Employee retention rate',
      period: language === 'el' ? 'Τρέχον έτος' : 'Current year',
      category: 'Human Resources'
    },
  ];

  const teamMembers = [
    { id: '1', name: 'Alice Johnson', role: 'Financial Analyst', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: '2', name: 'Bob Smith', role: 'Accountant', avatarUrl: 'https://i.pravatar.cc/150?img=6' },
    { id: '3', name: 'Charlie Brown', role: 'Finance Manager', avatarUrl: 'https://i.pravatar.cc/150?img=7' },
  ];

  const renderLineChart = (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={analyticsData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" name="Value" />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <PageLayout title="Financial Analytics Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map(metric => (
            <div key={metric.id} className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium text-gray-900">{metric.title}</h4>
              <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.description}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-green-600">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{language === 'el' ? 'Ανάλυση Εσόδων-Εξόδων' : 'Revenue vs Expenses'}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderLineChart}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{language === 'el' ? 'Τελευταίες Κινήσεις' : 'Recent Expenses'}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{language === 'el' ? 'Ημερομηνία' : 'Date'}</TableHead>
                    <TableHead>{language === 'el' ? 'Κατηγορία' : 'Category'}</TableHead>
                    <TableHead>{language === 'el' ? 'Ποσό' : 'Amount'}</TableHead>
                    <TableHead>{language === 'el' ? 'Προμηθευτής' : 'Supplier'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.date}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.amount}</TableCell>
                      <TableCell>
                        {expense.supplier && (
                          <span className="text-sm text-gray-500">
                            from {expense.supplier}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === 'el' ? 'Απόδοση' : 'Performance'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {performanceData.map(item => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className={`text-xs ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {item.change}
                    </span>
                  </div>
                  <Progress value={item.value} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{language === 'el' ? 'Βασικοί Δείκτες Απόδοσης (KPIs)' : 'Key Performance Indicators (KPIs)'}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kpiData.map(kpi => (
              <div key={kpi.id} className="p-4 rounded-lg shadow">
                <h4 className="font-medium text-gray-900">{kpi.title}</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {kpi.value}
                  <span className="text-sm text-gray-500">{kpi.unit}</span>
                </p>
                <p className="text-sm text-gray-500">{kpi.name}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{language === 'el' ? 'Διακύμανση' : 'Variance'}</span>
                    <span className="text-xs text-green-600">{kpi.variance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{language === 'el' ? 'Στόχος' : 'Target'}</span>
                    <span className="text-xs text-blue-600">{kpi.target}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{language === 'el' ? 'Αναφορά' : 'Benchmark'}</span>
                    <span className="text-xs text-purple-600">{kpi.benchmark}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{language === 'el' ? 'Περίοδος' : 'Period'}</span>
                    <span className="text-xs text-orange-600">{kpi.period}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{language === 'el' ? 'Κατηγορία' : 'Category'}</span>
                    <span className="text-xs text-teal-600">{kpi.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{language === 'el' ? 'Ομάδα Οικονομικών' : 'Financial Team'}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default FinancialAnalytics;
