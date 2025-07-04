import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Activity,
  Users,
  Package,
  Truck,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Zap,
  RefreshCw,
  Settings,
  Play,
  Pause,
  Eye,
  BarChart3,
  PieChart,
  Target,
  Award,
  Factory,
  Thermometer,
  Gauge,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateOperationalData } from "@/utils/stubData";
import PageLayout from "@/components/layout/PageLayout";

const OperationsCenter: React.FC = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [operationsData, setOperationsData] = useState<any[]>([]);
  const [realTimeMetrics, setRealTimeMetrics] = useState<any>({});
  const [alerts, setAlerts] = useState<any[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "hour" | "day" | "week"
  >("day");

  useEffect(() => {
    loadData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      updateRealTimeMetrics();
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedTimeframe]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load operational data
      const data = generateOperationalData(45);
      setOperationsData(data);

      // Generate real-time metrics
      const metrics = {
        activeOperations: Math.floor(Math.random() * 8) + 3,
        totalWorkers: Math.floor(Math.random() * 50) + 25,
        averageEfficiency: Math.round((85 + Math.random() * 10) * 10) / 10,
        completedToday: Math.floor(Math.random() * 20) + 10,
        temperature: Math.round((2 + Math.random() * 4) * 10) / 10,
        humidity: Math.round((65 + Math.random() * 10) * 10) / 10,
        energyConsumption: Math.round((45 + Math.random() * 15) * 10) / 10,
        productionRate: Math.round((92 + Math.random() * 8) * 10) / 10,
        qualityScore: Math.round((88 + Math.random() * 10) * 10) / 10,
        equipmentStatus: {
          operational: Math.floor(Math.random() * 15) + 10,
          maintenance: Math.floor(Math.random() * 3) + 1,
          offline: Math.floor(Math.random() * 2),
        },
      };
      setRealTimeMetrics(metrics);

      // Generate alerts
      const alertsData = [
        {
          id: 1,
          type: "warning",
          title: language === "el" ? "Χαμηλή Απόδοση" : "Low Efficiency",
          message:
            language === "el"
              ? "Η απόδοση στη γραμμή παραγωγής Α έπεσε κάτω από 80%"
              : "Production line A efficiency dropped below 80%",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          resolved: false,
        },
        {
          id: 2,
          type: "info",
          title:
            language === "el"
              ? "Συντήρηση Εξοπλισμού"
              : "Equipment Maintenance",
          message:
            language === "el"
              ? "Προγραμματισμένη συντήρηση για μηχάνημα #3 σε 2 ώρες"
              : "Scheduled maintenance for equipment #3 in 2 hours",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          resolved: false,
        },
        {
          id: 3,
          type: "success",
          title: language === "el" ? "Στόχος Ολοκληρώθηκε" : "Target Completed",
          message:
            language === "el"
              ? "Ημερήσιος στόχος παραγωγής επιτεύχθηκε"
              : "Daily production target achieved",
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          resolved: true,
        },
      ];
      setAlerts(alertsData);
    } catch (error) {
      console.error("Error loading operations data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRealTimeMetrics = () => {
    setRealTimeMetrics((prev: any) => ({
      ...prev,
      averageEfficiency: Math.round((85 + Math.random() * 10) * 10) / 10,
      temperature: Math.round((2 + Math.random() * 4) * 10) / 10,
      humidity: Math.round((65 + Math.random() * 10) * 10) / 10,
      energyConsumption: Math.round((45 + Math.random() * 15) * 10) / 10,
      productionRate: Math.round((92 + Math.random() * 8) * 10) / 10,
    }));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return AlertTriangle;
      case "success":
        return CheckCircle;
      case "error":
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "success":
        return "text-green-600 bg-green-100";
      case "error":
        return "text-red-600 bg-red-100";
      default:
        return "text-blue-600 bg-blue-100";
    }
  };

  // Generate efficiency chart data
  const efficiencyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    efficiency: Math.round((80 + Math.random() * 20) * 10) / 10,
    target: 85,
  }));

  if (loading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-600" />
              {language === "el" ? "Κέντρο Λειτουργιών" : "Operations Center"}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === "el"
                ? "Real-time παρακολούθηση και έλεγχος λειτουργιών"
                : "Real-time operations monitoring and control"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">
                {language === "el" ? "Live" : "Live"}
              </span>
            </div>
            <Button variant="outline" onClick={loadData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              {language === "el" ? "Ανανέωση" : "Refresh"}
            </Button>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === "el"
                      ? "Ενεργές Λειτουργίες"
                      : "Active Operations"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {realTimeMetrics.activeOperations}
                  </p>
                  <p className="text-sm text-gray-500">
                    {realTimeMetrics.totalWorkers}{" "}
                    {language === "el" ? "εργαζόμενοι" : "workers"}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Factory className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === "el" ? "Μέση Απόδοση" : "Average Efficiency"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {realTimeMetrics.averageEfficiency}%
                  </p>
                  <Progress
                    value={realTimeMetrics.averageEfficiency}
                    className="mt-2"
                  />
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === "el" ? "Θερμοκρασία" : "Temperature"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {realTimeMetrics.temperature}°C
                  </p>
                  <p className="text-sm text-gray-500">
                    {realTimeMetrics.humidity}%{" "}
                    {language === "el" ? "υγρασία" : "humidity"}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Thermometer className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === "el" ? "Ρυθμός Παραγωγής" : "Production Rate"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {realTimeMetrics.productionRate}%
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      +2.5%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Gauge className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Alerts */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {language === "el" ? "Ειδοποιήσεις" : "Alerts"}
                <Badge variant="secondary">
                  {alerts.filter((a) => !a.resolved).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {alerts.map((alert) => {
                  const Icon = getAlertIcon(alert.type);

                  return (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border ${
                        alert.resolved ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-1 rounded-full ${getAlertColor(alert.type)}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {alert.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {alert.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Efficiency Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {language === "el" ? "Απόδοση 24ώρου" : "24-Hour Efficiency"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip
                    formatter={(value: any, name: string) => [
                      `${value}%`,
                      name === "efficiency" ? "Efficiency" : "Target",
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Current Efficiency"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#EF4444"
                    strokeDasharray="5 5"
                    strokeWidth={1}
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Equipment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              {language === "el" ? "Κατάσταση Εξοπλισμού" : "Equipment Status"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {realTimeMetrics.equipmentStatus?.operational || 0}
                </p>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Λειτουργικά" : "Operational"}
                </p>
              </div>

              <div className="text-center">
                <div className="p-4 bg-yellow-100 rounded-full w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                  <Settings className="w-10 h-10 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {realTimeMetrics.equipmentStatus?.maintenance || 0}
                </p>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Συντήρηση" : "Maintenance"}
                </p>
              </div>

              <div className="text-center">
                <div className="p-4 bg-red-100 rounded-full w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {realTimeMetrics.equipmentStatus?.offline || 0}
                </p>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Εκτός Λειτουργίας" : "Offline"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default OperationsCenter;
