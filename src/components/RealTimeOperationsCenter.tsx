import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Activity,
  Radio,
  MapPin,
  Ship,
  Thermometer,
  Waves,
  Wind,
  Anchor,
  Navigation,
  Fuel,
  Users,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Zap,
  Globe,
  Satellite,
  Monitor,
  Eye,
  Target,
  Crosshair,
  Radar,
  Signal,
  WifiOff,
  Wifi,
  Battery,
  Gauge,
  Timer,
  Play,
  Pause,
  Square,
  RotateCcw,
  Settings,
  Filter,
  Download,
  Bell,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RefreshCw,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  DollarSign,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { realisticSeafoodData } from "@/mock/realisticSeafoodData";

interface RealTimeOperationsCenterProps {
  className?: string;
}

const RealTimeOperationsCenter: React.FC<RealTimeOperationsCenterProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [updateInterval, setUpdateInterval] = useState(30); // seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState("all");

  // Simulate real-time data updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, updateInterval * 1000);

    return () => clearInterval(interval);
  }, [isLive, updateInterval]);

  // Real-time operational data
  const operationalData = {
    vessels: {
      total: 8,
      active: 6,
      docked: 2,
      maintenance: 0,
      emergency: 0,
    },

    production: {
      dailyTarget: 5000, // kg
      currentProgress: 3250, // kg
      efficiency: 87.5,
      qualityScore: 94.2,
      wastePercentage: 3.8,
    },

    inventory: {
      totalStock: 45000, // kg
      available: 38500, // kg
      reserved: 4200, // kg
      critical: 2300, // kg (low stock items)
      turnoverRate: 6.8,
    },

    weather: {
      temperature: 14, // °C
      windSpeed: 22, // km/h
      waveHeight: 1.8, // m
      visibility: 8.5, // km
      condition: "moderate",
      forecast: "improving",
    },

    orders: {
      pending: 12,
      processing: 8,
      readyToShip: 5,
      shipped: 23,
      totalValue: 89500, // €
    },

    alerts: [
      {
        id: "alert-001",
        type: "warning",
        priority: "medium",
        title: language === "el" ? "Χαμηλό Απόθεμα" : "Low Stock Alert",
        message:
          language === "el"
            ? "Τσιπούρα κάτω από 100kg"
            : "Sea bream below 100kg",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        vessel: null,
        acknowledged: false,
      },
      {
        id: "alert-002",
        type: "success",
        priority: "low",
        title:
          language === "el" ? "Παραγγελία Ολοκληρώθηκε" : "Order Completed",
        message:
          language === "el"
            ? "Παραγγελία #ORD-2024-045 παραδόθηκε"
            : "Order #ORD-2024-045 delivered",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        vessel: null,
        acknowledged: true,
      },
      {
        id: "alert-003",
        type: "error",
        priority: "high",
        title: language === "el" ? "Σφάλμα Εξοπλισμού" : "Equipment Error",
        message:
          language === "el"
            ? "Ψυκτική μονάδα Α - υψηλή θερμοκρασία"
            : "Cooling unit A - high temperature",
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        vessel: null,
        acknowledged: false,
      },
    ],

    liveMetrics: {
      activeUsers: 24,
      systemLoad: 67,
      networkStatus: "online",
      dataLatency: 250, // ms
      uptime: 99.8, // %
    },
  };

  const vesselData = realisticSeafoodData.vessels.map((vessel, index) => ({
    ...vessel,
    liveData: {
      speed: Math.random() * 15 + 5, // knots
      heading: Math.floor(Math.random() * 360), // degrees
      fuel: Math.random() * 40 + 60, // %
      catch: Math.floor(Math.random() * 300 + 100), // kg today
      lastContact: new Date(Date.now() - Math.random() * 3600000), // last hour
      signalStrength: Math.floor(Math.random() * 30 + 70), // %
      temperature: Math.random() * 5 + 12, // °C
      engineStatus: Math.random() > 0.1 ? "normal" : "warning",
      crewStatus: "safe",
    },
  }));

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR")}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      normal: "text-green-600",
      warning: "text-yellow-600",
      error: "text-red-600",
      critical: "text-red-600",
      safe: "text-green-600",
      moderate: "text-yellow-600",
    };
    return colors[status as keyof typeof colors] || "text-gray-600";
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  const StatusIndicator = ({
    status,
    label,
  }: {
    status: string;
    label: string;
  }) => (
    <div className="flex items-center space-x-2">
      <div
        className={`w-3 h-3 rounded-full ${
          status === "online" || status === "normal" || status === "safe"
            ? "bg-green-500"
            : status === "warning" || status === "moderate"
              ? "bg-yellow-500"
              : "bg-red-500"
        } ${status === "online" ? "animate-pulse" : ""}`}
      />
      <span className="text-sm">{label}</span>
    </div>
  );

  const MetricCard = ({
    title,
    value,
    unit,
    change,
    icon: Icon,
    color,
  }: any) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Icon className={`w-5 h-5 ${color}`} />
          {change !== undefined && (
            <div
              className={`flex items-center text-sm ${
                change > 0
                  ? "text-green-600"
                  : change < 0
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {change > 0 ? (
                <ArrowUpRight className="w-3 h-3 mr-1" />
              ) : change < 0 ? (
                <ArrowDownRight className="w-3 h-3 mr-1" />
              ) : (
                <Minus className="w-3 h-3 mr-1" />
              )}
              {Math.abs(change).toFixed(1)}%
            </div>
          )}
        </div>
        <div className="text-2xl font-bold">
          {value}
          {unit}
        </div>
        <div className="text-xs text-gray-600">{title}</div>
      </CardContent>
    </Card>
  );

  const VesselCard = ({ vessel }: any) => (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        selectedVessel === vessel.id ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={() => setSelectedVessel(vessel.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Ship className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{vessel.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${
                vessel.status === "fishing"
                  ? "bg-green-500 animate-pulse"
                  : vessel.status === "docked"
                    ? "bg-blue-500"
                    : "bg-yellow-500"
              }`}
            />
            <Signal
              className={`w-3 h-3 ${
                vessel.liveData.signalStrength > 80
                  ? "text-green-600"
                  : vessel.liveData.signalStrength > 50
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-600">
              {language === "el" ? "Ταχύτητα:" : "Speed:"}
            </span>
            <div className="font-medium">
              {vessel.liveData.speed.toFixed(1)} kn
            </div>
          </div>
          <div>
            <span className="text-gray-600">
              {language === "el" ? "Καύσιμα:" : "Fuel:"}
            </span>
            <div className="font-medium">
              {vessel.liveData.fuel.toFixed(0)}%
            </div>
          </div>
          <div>
            <span className="text-gray-600">
              {language === "el" ? "Ψάρεμα:" : "Catch:"}
            </span>
            <div className="font-medium">{vessel.liveData.catch}kg</div>
          </div>
          <div>
            <span className="text-gray-600">
              {language === "el" ? "Κατάσταση:" : "Status:"}
            </span>
            <div
              className={`font-medium ${getStatusColor(vessel.liveData.engineStatus)}`}
            >
              {vessel.liveData.engineStatus}
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-500">
          {language === "el" ? "Τελευταία επικοινωνία:" : "Last contact:"}{" "}
          {vessel.liveData.lastContact.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );

  const AlertsPanel = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <Bell className="w-4 h-4 mr-2 text-orange-600" />
            {language === "el" ? "Ειδοποιήσεις Ζωντανά" : "Live Alerts"}
          </span>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {operationalData.alerts.filter((a) => !a.acknowledged).length}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setAlertsEnabled(!alertsEnabled)}
            >
              {alertsEnabled ? (
                <Volume2 className="w-3 h-3" />
              ) : (
                <VolumeX className="w-3 h-3" />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-64 overflow-y-auto">
        {operationalData.alerts.map((alert) => (
          <Alert
            key={alert.id}
            className={
              alert.type === "error"
                ? "border-red-200 bg-red-50"
                : alert.type === "warning"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-green-200 bg-green-50"
            }
          >
            <div className="flex items-start space-x-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{alert.title}</div>
                <AlertDescription className="text-xs">
                  {alert.message}
                </AlertDescription>
                <div className="text-xs text-gray-500 mt-1">
                  {alert.timestamp.toLocaleTimeString()}
                </div>
              </div>
              {!alert.acknowledged && (
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <CheckCircle className="w-3 h-3" />
                </Button>
              )}
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );

  const WeatherWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Waves className="w-4 h-4 mr-2 text-blue-600" />
          {language === "el" ? "Καιρικές Συνθήκες" : "Weather Conditions"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <Thermometer className="w-6 h-6 mx-auto mb-1 text-orange-500" />
            <div className="text-lg font-bold">
              {operationalData.weather.temperature}°C
            </div>
            <div className="text-xs text-gray-600">
              {language === "el" ? "Θερμοκρασία" : "Temperature"}
            </div>
          </div>
          <div className="text-center">
            <Wind className="w-6 h-6 mx-auto mb-1 text-gray-500" />
            <div className="text-lg font-bold">
              {operationalData.weather.windSpeed} km/h
            </div>
            <div className="text-xs text-gray-600">
              {language === "el" ? "Άνεμος" : "Wind"}
            </div>
          </div>
          <div className="text-center">
            <Waves className="w-6 h-6 mx-auto mb-1 text-blue-500" />
            <div className="text-lg font-bold">
              {operationalData.weather.waveHeight}m
            </div>
            <div className="text-xs text-gray-600">
              {language === "el" ? "Κύματα" : "Waves"}
            </div>
          </div>
          <div className="text-center">
            <Eye className="w-6 h-6 mx-auto mb-1 text-green-500" />
            <div className="text-lg font-bold">
              {operationalData.weather.visibility}km
            </div>
            <div className="text-xs text-gray-600">
              {language === "el" ? "Ορατότητα" : "Visibility"}
            </div>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {language === "el" ? "Συνθήκες:" : "Conditions:"}
            </span>
            <Badge
              className={
                operationalData.weather.condition === "good"
                  ? "bg-green-100 text-green-800"
                  : operationalData.weather.condition === "moderate"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }
            >
              {operationalData.weather.condition}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SystemStatusWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Monitor className="w-4 h-4 mr-2 text-purple-600" />
          {language === "el" ? "Κατάσταση Συστήματος" : "System Status"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <StatusIndicator
            status="online"
            label={`${language === "el" ? "Δίκτυο" : "Network"} (${operationalData.liveMetrics.dataLatency}ms)`}
          />
          <StatusIndicator
            status="normal"
            label={`${language === "el" ? "Ενεργοί χρήστες" : "Active users"}: ${operationalData.liveMetrics.activeUsers}`}
          />
          <StatusIndicator
            status={
              operationalData.liveMetrics.systemLoad > 80 ? "warning" : "normal"
            }
            label={`${language === "el" ? "Φορτίο συστήματος" : "System load"}: ${operationalData.liveMetrics.systemLoad}%`}
          />
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span>{language === "el" ? "Uptime:" : "Uptime:"}</span>
            <span className="font-medium text-green-600">
              {operationalData.liveMetrics.uptime}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el"
              ? "Κέντρο Ελέγχου Λειτουργιών"
              : "Operations Control Center"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Παρακολούθηση λειτουργιών σε πραγματικό χρόνο"
              : "Real-time operations monitoring"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity
              className={`w-3 h-3 mr-1 ${isLive ? "text-green-600 animate-pulse" : "text-gray-400"}`}
            />
            {isLive
              ? language === "el"
                ? "Ζωντανά"
                : "Live"
              : language === "el"
                ? "Παύση"
                : "Paused"}
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? (
              <Pause className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isLive
              ? language === "el"
                ? "Παύση"
                : "Pause"
              : language === "el"
                ? "Έναρξη"
                : "Start"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Control Panel */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {language === "el" ? "Ανανέωση κάθε:" : "Update every:"}
                </span>
                <select
                  value={updateInterval}
                  onChange={(e) => setUpdateInterval(Number(e.target.value))}
                  className="px-2 py-1 border rounded text-sm"
                >
                  <option value={10}>10s</option>
                  <option value={30}>30s</option>
                  <option value={60}>1min</option>
                  <option value={300}>5min</option>
                </select>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLastUpdate(new Date())}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {language === "el" ? "Ανανέωση" : "Refresh"}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost">
                <Filter className="w-4 h-4 mr-2" />
                {language === "el" ? "Φίλτρα" : "Filters"}
              </Button>
              <Button size="sm" variant="ghost">
                <Settings className="w-4 h-4 mr-2" />
                {language === "el" ? "Ρυθμίσεις" : "Settings"}
              </Button>
              <Button size="sm" variant="ghost">
                <Download className="w-4 h-4 mr-2" />
                {language === "el" ? "Εξαγωγή" : "Export"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <MetricCard
          title={language === "el" ? "Ενεργά Σκάφη" : "Active Vessels"}
          value={operationalData.vessels.active}
          unit={`/${operationalData.vessels.total}`}
          icon={Ship}
          color="text-blue-600"
        />
        <MetricCard
          title={language === "el" ? "Παραγωγή Σήμερα" : "Today's Production"}
          value={operationalData.production.currentProgress}
          unit="kg"
          change={8.5}
          icon={Target}
          color="text-green-600"
        />
        <MetricCard
          title={language === "el" ? "Διαθέσιμο Απόθεμα" : "Available Stock"}
          value={Math.floor(operationalData.inventory.available / 1000)}
          unit="t"
          change={-2.1}
          icon={Package}
          color="text-purple-600"
        />
        <MetricCard
          title={language === "el" ? "Εκκρεμείς Παραγγελίες" : "Pending Orders"}
          value={operationalData.orders.pending}
          unit=""
          icon={Clock}
          color="text-orange-600"
        />
        <MetricCard
          title={language === "el" ? "Αποδοτικότητα" : "Efficiency"}
          value={operationalData.production.efficiency}
          unit="%"
          change={1.2}
          icon={Activity}
          color="text-indigo-600"
        />
        <MetricCard
          title={language === "el" ? "Αξία Παραγγελιών" : "Orders Value"}
          value={Math.floor(operationalData.orders.totalValue / 1000)}
          unit="k€"
          change={5.8}
          icon={DollarSign}
          color="text-green-600"
        />
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Fleet Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Ship className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el" ? "Κατάσταση Στόλου" : "Fleet Status"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vesselData.slice(0, 4).map((vessel) => (
                  <VesselCard key={vessel.id} vessel={vessel} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Production Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600" />
                {language === "el"
                  ? "Πρόοδος Παραγωγής"
                  : "Production Progress"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    {language === "el" ? "Ημερήσιος Στόχος" : "Daily Target"}
                  </span>
                  <span className="font-bold">
                    {operationalData.production.currentProgress}kg /{" "}
                    {operationalData.production.dailyTarget}kg
                  </span>
                </div>
                <Progress
                  value={
                    (operationalData.production.currentProgress /
                      operationalData.production.dailyTarget) *
                    100
                  }
                  className="h-3"
                />
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">
                      {operationalData.production.efficiency}%
                    </div>
                    <div className="text-gray-600">
                      {language === "el" ? "Αποδοτικότητα" : "Efficiency"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">
                      {operationalData.production.qualityScore}%
                    </div>
                    <div className="text-gray-600">
                      {language === "el" ? "Ποιότητα" : "Quality"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">
                      {operationalData.production.wastePercentage}%
                    </div>
                    <div className="text-gray-600">
                      {language === "el" ? "Απώλειες" : "Waste"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <AlertsPanel />
          <WeatherWidget />
          <SystemStatusWidget />

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm">
                <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                {language === "el" ? "Γρήγορες Ενέργειες" : "Quick Actions"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start"
              >
                <Radio className="w-4 h-4 mr-2" />
                {language === "el" ? "Επικοινωνία με Στόλο" : "Contact Fleet"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                {language === "el" ? "Έκτακτη Ανάγκη" : "Emergency Alert"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start"
              >
                <Anchor className="w-4 h-4 mr-2" />
                {language === "el" ? "Κλήση Λιμένα" : "Port Call"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {language === "el" ? "Αναφορά Βάρδιας" : "Shift Report"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gauge className="w-5 h-5 mr-2 text-purple-600" />
            {language === "el" ? "Επιδόσεις Συστήματος" : "System Performance"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {operationalData.liveMetrics.uptime}%
              </div>
              <div className="text-sm text-gray-600">
                {language === "el" ? "Διαθεσιμότητα" : "Uptime"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {operationalData.liveMetrics.dataLatency}ms
              </div>
              <div className="text-sm text-gray-600">
                {language === "el" ? "Καθυστέρηση" : "Latency"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {operationalData.liveMetrics.activeUsers}
              </div>
              <div className="text-sm text-gray-600">
                {language === "el" ? "Ενεργοί Χρήστες" : "Active Users"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {operationalData.liveMetrics.systemLoad}%
              </div>
              <div className="text-sm text-gray-600">
                {language === "el" ? "Φορτίο CPU" : "CPU Load"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeOperationsCenter;
