import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { addDays } from 'date-fns';
import { DateRange } from "react-day-picker"

interface AnalyticsRecord {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: string;
  color: string;
  description: string;
  name?: string;
  unit?: string;
  variance?: number;
  target?: number;
  benchmark?: number;
  period?: string;
  category?: string;
}

const FinancialAnalytics: React.FC = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  })
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Mock data fetching or API calls can be simulated here
    // For example:
    // fetch('/api/expenses')
    //   .then(response => response.json())
    //   .then(data => setExpenses(data));
  }, []);

  const mockExpenses = [
    {
      id: '1',
      description: 'Fresh Salmon',
      amount: 150,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      supplier: 'Ocean Fresh Ltd'
    },
    {
      id: '2',
      description: 'Packaging Materials',
      amount: 80,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      supplier: 'EcoPack Solutions'
    },
    {
      id: '3',
      description: 'Transportation Costs',
      amount: 220,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      supplier: 'Swift Logistics'
    },
  ];

  const financialMetrics: AnalyticsRecord[] = [
    {
      id: '1',
      title: 'Total Revenue',
      value: '€45,230',
      change: '+12.5%',
      trend: 'up' as const,
      icon: 'trending-up',
      color: 'green',
      description: 'Monthly revenue growth',
      name: 'Total Revenue',
      unit: '€',
      variance: 12.5,
      target: 50000,
      benchmark: 42000,
      period: 'monthly',
      category: 'revenue'
    },
    {
      id: '2',
      title: 'Cost of Goods Sold',
      value: '€28,750',
      change: '-6.8%',
      trend: 'down' as const,
      icon: 'shopping-cart',
      color: 'red',
      description: 'Decrease in production costs',
      name: 'Cost of Goods Sold',
      unit: '€',
      variance: -6.8,
      target: 27000,
      benchmark: 30000,
      period: 'monthly',
      category: 'cost'
    },
    {
      id: '3',
      title: 'Net Profit Margin',
      value: '18.3%',
      change: '+3.2%',
      trend: 'up' as const,
      icon: 'dollar-sign',
      color: 'green',
      description: 'Improved profitability',
      name: 'Net Profit Margin',
      unit: '%',
      variance: 3.2,
      target: 20,
      benchmark: 15,
      period: 'monthly',
      category: 'profit'
    },
    {
      id: '4',
      title: 'Customer Acquisition Cost',
      value: '€35',
      change: '-15%',
      trend: 'down' as const,
      icon: 'user-plus',
      color: 'blue',
      description: 'Efficient marketing campaigns',
      name: 'Customer Acquisition Cost',
      unit: '€',
      variance: -15,
      target: 30,
      benchmark: 40,
      period: 'monthly',
      category: 'marketing'
    },
  ];

  const performanceIndicators = financialMetrics.map(metric => ({
    ...metric,
    name: metric.name || metric.title,
    unit: metric.unit || '',
    variance: metric.variance || 0,
    target: metric.target || 0,
    benchmark: metric.benchmark || 0,
    period: metric.period || 'monthly',
    category: metric.category || 'general'
  }));

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Financial Analytics</h1>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {performanceIndicators.map((metric) => (
          <Card key={metric.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {metric.title}
                <Avatar>
                  <AvatarImage src={`/icons/${metric.icon}.svg`} alt={metric.title} />
                  <AvatarFallback>{metric.title.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change}
              </div>
              <div className="text-sm text-muted-foreground">{metric.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{expense.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='w-full mt-4'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              pagedNavigation
              className="border-0 rounded-md"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FinancialAnalytics;
