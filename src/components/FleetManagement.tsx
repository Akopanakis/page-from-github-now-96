import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Ship,
  MapPin,
  Fuel,
  Users,
  Calendar,
  Clock,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
  Anchor,
  Navigation,
  Thermometer,
  Waves,
  Wind,
  Eye,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  MoreVertical,
  Activity,
  DollarSign,
  Settings,
  FileText,
  Download,
  Upload,
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Shield,
  Star,
  Zap,
  Globe,
  Radio,
  Compass,
  Timer,
  BookOpen,
  ClipboardCheck,
  AlertCircle,
  Info,
  RefreshCw,
  Package,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  realisticSeafoodData,
  getVesselsByStatus,
  getCatchesByVessel,
} from "@/mock/realisticSeafoodData";

interface FleetManagementProps {
  className?: string;
}

const FleetManagement: React.FC<FleetManagementProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [realTimeData, setRealTimeData] = useState(true);

  // Real-time updates simulation
  useEffect(() => {
    if (realTimeData) {
      const interval = setInterval(() => {
        // Simulate real-time position updates
        console.log("Updating vessel positions...");
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [realTimeData]);

  const vessels = realisticSeafoodData.vessels;
  const filteredVessels = vessels.filter((vessel) => {
    const matchesSearch =
      vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.captain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || vessel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR")}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      fishing: "bg-green-100 text-green-800",
      docked: "bg-blue-100 text-blue-800",
      maintenance: "bg-orange-100 text-orange-800",
      active: "bg-green-100 text-green-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "fishing":
        return <Activity className="w-3 h-3" />;
      case "docked":
        return <Anchor className="w-3 h-3" />;
      case "maintenance":
        return <Wrench className="w-3 h-3" />;
      default:
        return <Ship className="w-3 h-3" />;
    }
  };

  // Fleet Overview Widget
  const FleetOverviewWidget = () => {
    const stats = {
      total: vessels.length,
      fishing: getVesselsByStatus("fishing").length,
      docked: getVesselsByStatus("docked").length,
      maintenance: getVesselsByStatus("maintenance").length,
      avgEfficiency: 87.5,
      totalCapacity: vessels.reduce((sum, v) => sum + v.capacity, 0),
      activeCrew: vessels.reduce(
        (sum, v) => sum + (v.status === "fishing" ? v.crew : 0),
        0,
      ),
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Συνολικά Σκάφη" : "Total Vessels"}
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Ship className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Ενεργά" : "Active"}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.fishing}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el"
                    ? "Συνολική Χωρητικότητα"
                    : "Total Capacity"}
                </p>
                <p className="text-2xl font-bold">{stats.totalCapacity}t</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Ενεργό Πλήρωμα" : "Active Crew"}
                </p>
                <p className="text-2xl font-bold">{stats.activeCrew}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Vessel Details Modal/Panel
  const VesselDetailsPanel = ({ vesselId }: { vesselId: string }) => {
    const vessel = vessels.find((v) => v.id === vesselId);
    if (!vessel) return null;

    const catches = getCatchesByVessel(vesselId);
    const totalCatch = catches.reduce((sum, c) => sum + c.quantity, 0);
    const totalValue = catches.reduce(
      (sum, c) => sum + c.quantity * c.price,
      0,
    );

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Ship className="w-5 h-5 mr-2" />
              {vessel.name}
            </span>
            <Badge className={getStatusColor(vessel.status)}>
              {getStatusIcon(vessel.status)}
              <span className="ml-1">
                {language === "el"
                  ? vessel.status === "fishing"
                    ? "Αλιεύει"
                    : vessel.status === "docked"
                      ? "Στο Λιμάνι"
                      : "Συντήρηση"
                  : vessel.status.charAt(0).toUpperCase() +
                    vessel.status.slice(1)}
              </span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">
                {language === "el" ? "Στοιχεία" : "Info"}
              </TabsTrigger>
              <TabsTrigger value="location">
                {language === "el" ? "Θέση" : "Location"}
              </TabsTrigger>
              <TabsTrigger value="performance">
                {language === "el" ? "Επιδόσεις" : "Performance"}
              </TabsTrigger>
              <TabsTrigger value="maintenance">
                {language === "el" ? "Συντήρηση" : "Maintenance"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el" ? "Πλοίαρχος:" : "Captain:"}{" "}
                      {vessel.captain}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Ship className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el" ? "Τύπος:" : "Type:"} {vessel.type}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el" ? "Μήκος:" : "Length:"} {vessel.length}
                      m
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el" ? "Πλήρωμα:" : "Crew:"} {vessel.crew}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Anchor className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el" ? "Λιμάνι Βάσης:" : "Home Port:"}{" "}
                      {vessel.homePort}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el" ? "Άδεια:" : "License:"}{" "}
                      {vessel.license}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el" ? "Χωρητικότητα:" : "Capacity:"}{" "}
                      {vessel.capacity}t
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el" ? "Κατανάλωση:" : "Fuel:"}{" "}
                      {vessel.fuelConsumption}L/h
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">
                  {language === "el" ? "Εξοπλισμός" : "Equipment"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {vessel.equipment.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el" ? "Γεωγραφικό Πλάτος:" : "Latitude:"}{" "}
                      {vessel.location.lat.toFixed(4)}°
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Navigation className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el" ? "Γεωγραφικό Μήκος:" : "Longitude:"}{" "}
                      {vessel.location.lng.toFixed(4)}°
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {language === "el"
                        ? "Τελευταία Ενημέρωση:"
                        : "Last Update:"}{" "}
                      {vessel.location.timestamp.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Globe className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">
                      {language === "el"
                        ? "Χάρτης θα εμφανιστεί εδώ"
                        : "Map will appear here"}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Package className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">{totalCatch}kg</div>
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Συνολικό Ψάρεμα" : "Total Catch"}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">
                      {formatCurrency(totalValue)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Αξία Ψαριού" : "Catch Value"}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold">87%</div>
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Αποδοτικότητα" : "Efficiency"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">
                  {language === "el" ? "Ημερήσια Κόστη" : "Daily Costs"}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {language === "el" ? "Καύσιμα:" : "Fuel:"}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(vessel.operatingCosts.fuel)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {language === "el" ? "Πλήρωμα:" : "Crew:"}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(vessel.operatingCosts.crew)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {language === "el" ? "Συντήρηση:" : "Maintenance:"}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(vessel.operatingCosts.maintenance)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">
                      {language === "el" ? "Σύνολο:" : "Total:"}
                    </span>
                    <span className="font-bold">
                      {formatCurrency(vessel.operatingCosts.daily)}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      {language === "el"
                        ? "Τελευταίος Έλεγχος"
                        : "Last Inspection"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">
                      {vessel.lastInspection.toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {Math.ceil(
                        (new Date().getTime() -
                          vessel.lastInspection.getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      {language === "el" ? "ημέρες πριν" : "days ago"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <Wrench className="w-4 h-4 mr-2 text-orange-600" />
                      {language === "el"
                        ? "Επόμενη Συντήρηση"
                        : "Next Maintenance"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">
                      {vessel.nextMaintenance.toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {Math.ceil(
                        (vessel.nextMaintenance.getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      {language === "el" ? "ημέρες" : "days"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">
                  {language === "el" ? "Πιστοποιήσεις" : "Certifications"}
                </h4>
                <div className="space-y-2">
                  {vessel.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">{cert}</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {language === "el" ? "Ενεργό" : "Active"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el" ? "Διαχείριση Στόλου" : "Fleet Management"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Παρακολούθηση και διαχείριση του αλιευτικού στόλου"
              : "Monitor and manage your fishing fleet"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {realTimeData
              ? language === "el"
                ? "Ζωντανά"
                : "Live"
              : language === "el"
                ? "Στατικά"
                : "Static"}
          </Badge>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέο Σκάφος" : "Add Vessel"}
          </Button>
        </div>
      </div>

      {/* Fleet Overview */}
      <FleetOverviewWidget />

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="vessels">
            {language === "el" ? "Σκάφη" : "Vessels"}
          </TabsTrigger>
          <TabsTrigger value="tracking">
            {language === "el" ? "Παρακολούθηση" : "Tracking"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === "el" ? "Αναλυτικά" : "Analytics"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Vessels Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el" ? "Θέσεις Σκαφών" : "Vessel Positions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Χάρτης με ζωντανές θέσεις"
                        : "Live vessel tracking map"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fleet Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el" ? "Κατάσταση Στόλου" : "Fleet Status"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      status: "fishing",
                      count: getVesselsByStatus("fishing").length,
                      color: "green",
                    },
                    {
                      status: "docked",
                      count: getVesselsByStatus("docked").length,
                      color: "blue",
                    },
                    {
                      status: "maintenance",
                      count: getVesselsByStatus("maintenance").length,
                      color: "orange",
                    },
                  ].map((item) => (
                    <div
                      key={item.status}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        {getStatusIcon(item.status)}
                        <span className="ml-2 text-sm">
                          {language === "el"
                            ? item.status === "fishing"
                              ? "Αλιεύουν"
                              : item.status === "docked"
                                ? "Στο Λιμάνι"
                                : "Συντήρηση"
                            : item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold mr-2">{item.count}</span>
                        <div
                          className={`w-16 h-2 bg-${item.color}-200 rounded-full`}
                        >
                          <div
                            className={`h-2 bg-${item.color}-500 rounded-full`}
                            style={{
                              width: `${(item.count / vessels.length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vessels" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">
                    {language === "el" ? "Αναζήτηση" : "Search"}
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder={
                        language === "el"
                          ? "Όνομα σκάφους ή πλοιάρχου..."
                          : "Vessel name or captain..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">
                    {language === "el" ? "Κατάσταση" : "Status"}
                  </Label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">
                      {language === "el" ? "Όλα" : "All"}
                    </option>
                    <option value="fishing">
                      {language === "el" ? "Αλιεύουν" : "Fishing"}
                    </option>
                    <option value="docked">
                      {language === "el" ? "Στο Λιμάνι" : "Docked"}
                    </option>
                    <option value="maintenance">
                      {language === "el" ? "Συντήρηση" : "Maintenance"}
                    </option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vessels Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Ship className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el" ? "Λίστα Σκαφών" : "Vessels List"}
                </span>
                <Badge variant="outline">
                  {filteredVessels.length}{" "}
                  {language === "el" ? "σκάφη" : "vessels"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {language === "el" ? "Όνομα" : "Name"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Πλοίαρχος" : "Captain"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Τύπος" : "Type"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Κατάσταση" : "Status"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Θέση" : "Location"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Ενέργειες" : "Actions"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVessels.map((vessel) => (
                    <TableRow
                      key={vessel.id}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">
                        {vessel.name}
                      </TableCell>
                      <TableCell>{vessel.captain}</TableCell>
                      <TableCell>{vessel.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vessel.status)}>
                          {getStatusIcon(vessel.status)}
                          <span className="ml-1">
                            {language === "el"
                              ? vessel.status === "fishing"
                                ? "Αλιεύει"
                                : vessel.status === "docked"
                                  ? "Στο Λιμάνι"
                                  : "Συντήρηση"
                              : vessel.status.charAt(0).toUpperCase() +
                                vessel.status.slice(1)}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          {vessel.location.lat.toFixed(2)}°,{" "}
                          {vessel.location.lng.toFixed(2)}°
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedVessel(vessel.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Vessel Details */}
          {selectedVessel && <VesselDetailsPanel vesselId={selectedVessel} />}
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el" ? "Ζωντανή Παρακολούθηση" : "Live Tracking"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Globe className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">
                    {language === "el"
                      ? "Ζωντανός Χάρτης Παρακολούθησης"
                      : "Live Tracking Map"}
                  </p>
                  <p>
                    {language === "el"
                      ? "Παρακολουθείτε τη θέση και την κίνηση των σκαφών σε πραγματικό χρόνο"
                      : "Track vessel positions and movements in real-time"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el"
                    ? "Αποδοτικότητα Στόλου"
                    : "Fleet Efficiency"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Γράφημα αποδοτικότητας"
                        : "Efficiency chart"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el" ? "Κόστη Λειτουργίας" : "Operating Costs"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el" ? "Ανάλυση κόστους" : "Cost analysis"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FleetManagement;
