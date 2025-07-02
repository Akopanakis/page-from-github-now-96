import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Fish,
  BarChart3,
  Activity,
  Users,
  Target,
  Calendar,
  MapPin,
  Anchor,
  Waves,
  Timer,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Plus,
  Filter,
  Download,
  Share,
  Eye,
} from "lucide-react";
import {
  MobileLayout,
  ResponsiveContainer,
  MobileCardGrid,
  MobileSection,
} from "@/components/layout/MobileLayout";
import { useCalculation } from "@/hooks/useCalculation";
import { motion } from "framer-motion";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
  color?: string;
}

function KPICard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color = "blue",
}: KPICardProps) {
  const trendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Activity;
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
        ? "text-red-600"
        : "text-gray-600";

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`h-10 w-10 bg-${color}-100 dark:bg-${color}-900 rounded-lg flex items-center justify-center`}
              >
                <Icon
                  className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`}
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {title}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {value}
                </p>
              </div>
            </div>
            <div
              className={`flex items-center space-x-1 text-sm ${trendColor}`}
            >
              <trendIcon className="h-4 w-4" />
              <span>{change}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  color?: string;
}

function QuickActionCard({
  title,
  description,
  icon: Icon,
  action,
  color = "blue",
}: QuickActionProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={action}
    >
      <CardContent className="p-4 text-center">
        <div
          className={`h-12 w-12 bg-${color}-100 dark:bg-${color}-900 rounded-xl flex items-center justify-center mx-auto mb-3`}
        >
          <Icon
            className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`}
          />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function RecentActivityItem({ activity }: { activity: any }) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
        <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {activity.title}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {activity.time} • {activity.type}
        </p>
      </div>
      <Badge variant="secondary" className="text-xs">
        €{activity.amount}
      </Badge>
    </div>
  );
}

export default function MobileDashboard() {
  const { isCalculating } = useCalculation();
  const [activeTab, setActiveTab] = useState("overview");

  const kpiData = [
    {
      title: "Total Revenue",
      value: "€45,230",
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Total Costs",
      value: "€32,145",
      change: "+8.2%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "red",
    },
    {
      title: "Net Profit",
      value: "€13,085",
      change: "+18.3%",
      trend: "up" as const,
      icon: Target,
      color: "blue",
    },
    {
      title: "Active Boats",
      value: "12",
      change: "+2",
      trend: "up" as const,
      icon: Anchor,
      color: "purple",
    },
  ];

  const quickActions = [
    {
      title: "New Calculation",
      description: "Calculate costs for a new trip",
      icon: Calculator,
      action: () => console.log("Navigate to calculator"),
      color: "blue",
    },
    {
      title: "Add Expense",
      description: "Record a new expense",
      icon: Plus,
      action: () => console.log("Navigate to expenses"),
      color: "green",
    },
    {
      title: "View Reports",
      description: "Access detailed analytics",
      icon: BarChart3,
      action: () => console.log("Navigate to reports"),
      color: "purple",
    },
    {
      title: "Fleet Status",
      description: "Check boat locations",
      icon: MapPin,
      action: () => console.log("Navigate to fleet"),
      color: "orange",
    },
  ];

  const recentActivities = [
    {
      title: "Trip to North Sea",
      time: "2 hours ago",
      type: "Calculation",
      amount: "1,245",
    },
    {
      title: "Fuel Expense",
      time: "4 hours ago",
      type: "Expense",
      amount: "890",
    },
    {
      title: "Equipment Maintenance",
      time: "6 hours ago",
      type: "Expense",
      amount: "456",
    },
    {
      title: "Weekly Report Generated",
      time: "1 day ago",
      type: "Report",
      amount: "0",
    },
  ];

  return (
    <MobileLayout title="Dashboard">
      <ResponsiveContainer className="py-6 space-y-6">
        {/* Welcome Section */}
        <MobileSection>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="text-blue-100">Here's your business overview</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Fish className="h-6 w-6" />
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4" />
                <span>All systems operational</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </MobileSection>

        {/* KPI Cards */}
        <MobileSection title="Key Metrics">
          <MobileCardGrid cols={{ sm: 1, md: 2, lg: 4 }}>
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </MobileCardGrid>
        </MobileSection>

        {/* Quick Actions */}
        <MobileSection
          title="Quick Actions"
          subtitle="Common tasks and shortcuts"
        >
          <MobileCardGrid cols={{ sm: 2, md: 4 }}>
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </MobileCardGrid>
        </MobileSection>

        {/* Tabs Content */}
        <MobileSection>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-6">
              {/* Fleet Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Fleet Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-sm text-green-600">Active</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">4</div>
                      <div className="text-sm text-gray-600">Docked</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Today's Efficiency</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Weather & Conditions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        18°C
                      </div>
                      <div className="text-xs text-gray-600">Temperature</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        Good
                      </div>
                      <div className="text-xs text-gray-600">Sea State</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-600">
                        15km/h
                      </div>
                      <div className="text-xs text-gray-600">Wind</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profit Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Chart visualization would be here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <RecentActivityItem key={index} activity={activity} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </MobileSection>

        {/* Alerts */}
        <MobileSection title="Alerts & Notifications">
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Fuel cost alert
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-300">
                  Prices increased 15% this week
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Timer className="h-5 w-5 text-blue-600 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Maintenance due
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  Boat #3 service required
                </p>
              </div>
            </div>
          </div>
        </MobileSection>
      </ResponsiveContainer>
    </MobileLayout>
  );
}
