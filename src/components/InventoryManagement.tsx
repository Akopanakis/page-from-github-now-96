import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer,
  Droplets,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Download,
  Upload,
  QrCode,
  Eye,
  Settings,
  Zap,
  Star,
  Award,
  Shield,
  RefreshCw,
  FileText,
  Truck,
  DollarSign,
  Users,
  Factory,
  Archive,
  Timer,
  Target,
  Activity,
  Globe,
  Leaf,
  BookOpen,
  ClipboardCheck,
  MousePointer,
  ArrowUpDown,
  MoreVertical,
  ExternalLink,
  Bell,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  realisticSeafoodData,
  getInventoryByStatus,
  getActiveOrders,
} from "@/mock/realisticSeafoodData";

interface InventoryManagementProps {
  className?: string;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortField, setSortField] = useState("receivedDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showLowStock, setShowLowStock] = useState(false);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  const inventory = realisticSeafoodData.inventory;
  const products = realisticSeafoodData.products;
  const orders = getActiveOrders();

  // Real-time simulation
  useEffect(() => {
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        console.log("Updating inventory levels...");
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [realTimeUpdates]);

  // Filter and sort inventory
  const filteredInventory = inventory
    .filter((item) => {
      const product = products.find((p) => p.id === item.productId);
      const matchesSearch =
        product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      const matchesLocation =
        locationFilter === "all" || item.location === locationFilter;

      if (showLowStock) {
        return (
          matchesSearch &&
          matchesStatus &&
          matchesLocation &&
          item.quantity < 100
        );
      }

      return matchesSearch && matchesStatus && matchesLocation;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getDaysUntilExpiry = (expiryDate: Date) => {
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status: string) => {
    const colors = {
      available: "bg-green-100 text-green-800",
      reserved: "bg-blue-100 text-blue-800",
      quarantine: "bg-yellow-100 text-yellow-800",
      expired: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getExpiryStatusColor = (days: number) => {
    if (days < 0) return "text-red-600";
    if (days <= 2) return "text-orange-600";
    if (days <= 5) return "text-yellow-600";
    return "text-green-600";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-3 h-3" />;
      case "reserved":
        return <Clock className="w-3 h-3" />;
      case "quarantine":
        return <AlertTriangle className="w-3 h-3" />;
      case "expired":
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  // Calculate inventory metrics
  const inventoryMetrics = {
    totalItems: inventory.length,
    totalValue: inventory.reduce(
      (sum, item) => sum + item.quantity * item.costPrice,
      0,
    ),
    totalQuantity: inventory.reduce((sum, item) => sum + item.quantity, 0),
    available: getInventoryByStatus("available").length,
    reserved: getInventoryByStatus("reserved").length,
    expiringSoon: inventory.filter((item) => {
      const days = getDaysUntilExpiry(item.expiryDate);
      return days >= 0 && days <= 5;
    }).length,
    expired: getInventoryByStatus("expired").length,
    lowStock: inventory.filter((item) => item.quantity < 100).length,
    avgDaysToExpiry:
      inventory.reduce((sum, item) => {
        const days = getDaysUntilExpiry(item.expiryDate);
        return sum + Math.max(0, days);
      }, 0) / inventory.length,
  };

  // Inventory Overview Widget
  const InventoryOverviewWidget = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el" ? "Συνολικά Στοιχεία" : "Total Items"}
              </p>
              <p className="text-2xl font-bold">
                {inventoryMetrics.totalItems}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el" ? "Συνολική Αξία" : "Total Value"}
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(inventoryMetrics.totalValue)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el" ? "Διαθέσιμα" : "Available"}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {inventoryMetrics.available}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el" ? "Χαμηλό Απόθεμα" : "Low Stock"}
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {inventoryMetrics.lowStock}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Expiry Alerts Widget
  const ExpiryAlertsWidget = () => {
    const expiringSoonItems = inventory.filter((item) => {
      const days = getDaysUntilExpiry(item.expiryDate);
      return days >= 0 && days <= 5;
    });

    const expiredItems = inventory.filter((item) => {
      const days = getDaysUntilExpiry(item.expiryDate);
      return days < 0;
    });

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
              {language === "el" ? "Ειδοποιήσεις Λήξης" : "Expiry Alerts"}
            </span>
            <Badge variant="destructive" className="text-xs">
              {expiringSoonItems.length + expiredItems.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {expiredItems.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>{expiredItems.length}</strong>{" "}
                {language === "el"
                  ? "προϊόντα έχουν λήξει"
                  : "items have expired"}
              </AlertDescription>
            </Alert>
          )}

          {expiringSoonItems.length > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>{expiringSoonItems.length}</strong>{" "}
                {language === "el"
                  ? "προϊόντα λήγουν σύντομα"
                  : "items expiring soon"}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2 max-h-32 overflow-y-auto">
            {[...expiredItems, ...expiringSoonItems].slice(0, 5).map((item) => {
              const product = products.find((p) => p.id === item.productId);
              const days = getDaysUntilExpiry(item.expiryDate);

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product?.name}</p>
                    <p className="text-xs text-gray-500">{item.batchNumber}</p>
                  </div>
                  <div
                    className={`text-xs font-medium ${getExpiryStatusColor(days)}`}
                  >
                    {days < 0
                      ? language === "el"
                        ? "Ληγμένο"
                        : "Expired"
                      : `${days} ${language === "el" ? "ημέρες" : "days"}`}
                  </div>
                </div>
              );
            })}
          </div>

          {expiringSoonItems.length + expiredItems.length > 5 && (
            <Button size="sm" variant="outline" className="w-full text-xs">
              {language === "el" ? "Προβολή Όλων" : "View All"} (
              {expiringSoonItems.length + expiredItems.length - 5}{" "}
              {language === "el" ? "περισσότερα" : "more"})
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  // Stock Movement Widget
  const StockMovementWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Activity className="w-4 h-4 mr-2 text-blue-600" />
          {language === "el" ? "Κίνηση Αποθέματος" : "Stock Movement"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-600">
              {language === "el" ? "Εισαγωγές σήμερα" : "Incoming today"}
            </span>
            <span className="font-semibold">450kg</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-red-600">
              {language === "el" ? "Εξαγωγές σήμερα" : "Outgoing today"}
            </span>
            <span className="font-semibold">280kg</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-blue-600">
              {language === "el" ? "Κρατήσεις" : "Reserved"}
            </span>
            <span className="font-semibold">150kg</span>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {language === "el" ? "Καθαρή Κίνηση" : "Net Movement"}
            </span>
            <span className="font-bold text-green-600">+170kg</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Storage Conditions Widget
  const StorageConditionsWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Thermometer className="w-4 h-4 mr-2 text-blue-600" />
          {language === "el" ? "Συνθήκες Αποθήκευσης" : "Storage Conditions"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-blue-50 rounded">
            <Thermometer className="w-5 h-5 mx-auto mb-1 text-blue-600" />
            <div className="text-lg font-bold text-blue-800">2.1°C</div>
            <div className="text-xs text-blue-600">
              {language === "el" ? "Θερμοκρασία" : "Temperature"}
            </div>
          </div>
          <div className="text-center p-2 bg-cyan-50 rounded">
            <Droplets className="w-5 h-5 mx-auto mb-1 text-cyan-600" />
            <div className="text-lg font-bold text-cyan-800">85%</div>
            <div className="text-xs text-cyan-600">
              {language === "el" ? "Υγρασία" : "Humidity"}
            </div>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>
              {language === "el" ? "Cold Storage A" : "Cold Storage A"}
            </span>
            <Badge className="bg-green-100 text-green-800 text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              {language === "el" ? "Καλό" : "Good"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>
              {language === "el" ? "Cold Storage B" : "Cold Storage B"}
            </span>
            <Badge className="bg-green-100 text-green-800 text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              {language === "el" ? "Καλό" : "Good"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>{language === "el" ? "Freezer Unit" : "Freezer Unit"}</span>
            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {language === "el" ? "Έλεγχος" : "Check"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Quick Actions Widget
  const QuickActionsWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Zap className="w-4 h-4 mr-2 text-yellow-600" />
          {language === "el" ? "Γρήγορες Ενέργειες" : "Quick Actions"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Plus className="w-4 h-4 mr-2" />
          {language === "el" ? "Νέα Εισαγωγή" : "New Stock Entry"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <QrCode className="w-4 h-4 mr-2" />
          {language === "el" ? "Σάρωση Barcode" : "Scan Barcode"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Truck className="w-4 h-4 mr-2" />
          {language === "el" ? "Εξερχόμενη Παραγγελία" : "Outbound Order"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <ClipboardCheck className="w-4 h-4 mr-2" />
          {language === "el" ? "Έλεγχος Ποιότητας" : "Quality Check"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <FileText className="w-4 h-4 mr-2" />
          {language === "el" ? "Αναφορά Αποθέματος" : "Stock Report"}
        </Button>
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
              ? "Διαχείριση Αποθέματος"
              : "Inventory Management"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Παρακολούθηση και διαχείριση του αποθέματος σας"
              : "Track and manage your inventory in real-time"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {realTimeUpdates
              ? language === "el"
                ? "Ζωντανά"
                : "Live"
              : language === "el"
                ? "Στατικά"
                : "Static"}
          </Badge>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Εξαγωγή" : "Export"}
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέο Στοιχείο" : "Add Item"}
          </Button>
        </div>
      </div>

      {/* Inventory Overview */}
      <InventoryOverviewWidget />

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="items">
            {language === "el" ? "Στοιχεία" : "Items"}
          </TabsTrigger>
          <TabsTrigger value="locations">
            {language === "el" ? "Τοποθεσίες" : "Locations"}
          </TabsTrigger>
          <TabsTrigger value="movements">
            {language === "el" ? "Κινήσεις" : "Movements"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === "el" ? "Αναλυτικά" : "Analytics"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main charts area */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    {language === "el" ? "Επίπεδα Αποθέματος" : "Stock Levels"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Γράφημα επιπέδων αποθέματος"
                          : "Stock levels chart"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {language === "el"
                        ? "Κατανομή Κατηγοριών"
                        : "Category Distribution"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-48">
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">
                          {language === "el" ? "Pie chart" : "Pie chart"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {language === "el" ? "Τάσεις Αποθέματος" : "Stock Trends"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-48">
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">
                          {language === "el" ? "Trend chart" : "Trend chart"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right sidebar widgets */}
            <div className="space-y-6">
              <ExpiryAlertsWidget />
              <StockMovementWidget />
              <StorageConditionsWidget />
              <QuickActionsWidget />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">
                    {language === "el" ? "Αναζήτηση" : "Search"}
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder={
                        language === "el"
                          ? "Προϊόν, batch, προμηθευτής..."
                          : "Product, batch, supplier..."
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
                      {language === "el" ? "Όλες" : "All"}
                    </option>
                    <option value="available">
                      {language === "el" ? "Διαθέσιμο" : "Available"}
                    </option>
                    <option value="reserved">
                      {language === "el" ? "Κρατημένο" : "Reserved"}
                    </option>
                    <option value="quarantine">
                      {language === "el" ? "Καραντίνα" : "Quarantine"}
                    </option>
                    <option value="expired">
                      {language === "el" ? "Ληγμένο" : "Expired"}
                    </option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="location">
                    {language === "el" ? "Τοποθεσία" : "Location"}
                  </Label>
                  <select
                    id="location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">
                      {language === "el" ? "Όλες" : "All"}
                    </option>
                    <option value="Cold Storage A">Cold Storage A</option>
                    <option value="Cold Storage B">Cold Storage B</option>
                    <option value="Freezer Unit">Freezer Unit</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant={showLowStock ? "default" : "outline"}
                    onClick={() => setShowLowStock(!showLowStock)}
                    className="w-full"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {language === "el" ? "Χαμηλό Απόθεμα" : "Low Stock"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el"
                    ? "Στοιχεία Αποθέματος"
                    : "Inventory Items"}
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {filteredInventory.length}{" "}
                    {language === "el" ? "στοιχεία" : "items"}
                  </Badge>
                  <Button size="sm" variant="ghost">
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Προϊόν" : "Product"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Batch" : "Batch"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Ποσότητα" : "Quantity"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Τοποθεσία" : "Location"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Κατάσταση" : "Status"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Λήξη" : "Expiry"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Αξία" : "Value"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Ενέργειες" : "Actions"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => {
                    const product = products.find(
                      (p) => p.id === item.productId,
                    );
                    const daysToExpiry = getDaysUntilExpiry(item.expiryDate);
                    const itemValue = item.quantity * item.costPrice;

                    return (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell>
                          <input
                            type="checkbox"
                            className="rounded"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems([...selectedItems, item.id]);
                              } else {
                                setSelectedItems(
                                  selectedItems.filter((id) => id !== item.id),
                                );
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product?.name}</div>
                            <div className="text-xs text-gray-500">
                              {product?.species}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-mono text-sm">
                              {item.batchNumber}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.supplier}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{item.quantity}kg</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                            {item.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1">
                              {language === "el"
                                ? item.status === "available"
                                  ? "Διαθέσιμο"
                                  : item.status === "reserved"
                                    ? "Κρατημένο"
                                    : item.status === "quarantine"
                                      ? "Καραντίνα"
                                      : "Ληγμένο"
                                : item.status.charAt(0).toUpperCase() +
                                  item.status.slice(1)}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`text-sm font-medium ${getExpiryStatusColor(daysToExpiry)}`}
                          >
                            {daysToExpiry < 0
                              ? language === "el"
                                ? "Ληγμένο"
                                : "Expired"
                              : `${daysToExpiry} ${language === "el" ? "ημέρες" : "days"}`}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {formatCurrency(itemValue)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <QrCode className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Cold Storage A
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Θερμοκρασία:" : "Temperature:"}
                    </span>
                    <div className="font-medium">2.1°C</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Υγρασία:" : "Humidity:"}
                    </span>
                    <div className="font-medium">85%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Χωρητικότητα:" : "Capacity:"}
                    </span>
                    <div className="font-medium">500t</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Χρησιμοποιημένο:" : "Used:"}
                    </span>
                    <div className="font-medium">320t</div>
                  </div>
                </div>
                <Progress value={64} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>64% {language === "el" ? "πληρότητα" : "full"}</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {language === "el" ? "Καλό" : "Good"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Cold Storage B
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Θερμοκρασία:" : "Temperature:"}
                    </span>
                    <div className="font-medium">1.8°C</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Υγρασία:" : "Humidity:"}
                    </span>
                    <div className="font-medium">87%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Χωρητικότητα:" : "Capacity:"}
                    </span>
                    <div className="font-medium">300t</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Χρησιμοποιημένο:" : "Used:"}
                    </span>
                    <div className="font-medium">180t</div>
                  </div>
                </div>
                <Progress value={60} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>60% {language === "el" ? "πληρότητα" : "full"}</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {language === "el" ? "Καλό" : "Good"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Freezer Unit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Θερμοκρασία:" : "Temperature:"}
                    </span>
                    <div className="font-medium">-18°C</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Υγρασία:" : "Humidity:"}
                    </span>
                    <div className="font-medium">90%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Χωρητικότητα:" : "Capacity:"}
                    </span>
                    <div className="font-medium">200t</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === "el" ? "Χρησιμοποιημένο:" : "Used:"}
                    </span>
                    <div className="font-medium">150t</div>
                  </div>
                </div>
                <Progress value={75} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>75% {language === "el" ? "πληρότητα" : "full"}</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {language === "el" ? "Έλεγχος" : "Check"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="movements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el" ? "Κινήσεις Αποθέματος" : "Stock Movements"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Ιστορικό κινήσεων αποθέματος"
                      : "Stock movement history"}
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
                    ? "Ανάλυση Αποθέματος"
                    : "Inventory Analysis"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Αναλυτικά γραφήματα"
                        : "Analytics charts"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el" ? "Προβλέψεις" : "Forecasting"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Προβλέψεις ζήτησης"
                        : "Demand forecasting"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Selected Items Actions */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">
              {selectedItems.length}{" "}
              {language === "el" ? "επιλεγμένα στοιχεία" : "items selected"}
            </span>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Truck className="w-4 h-4 mr-2" />
                {language === "el" ? "Παραγγελία" : "Ship"}
              </Button>
              <Button size="sm" variant="outline">
                <ClipboardCheck className="w-4 h-4 mr-2" />
                {language === "el" ? "Έλεγχος" : "Check"}
              </Button>
              <Button size="sm" variant="outline">
                <Archive className="w-4 h-4 mr-2" />
                {language === "el" ? "Αρχειοθέτηση" : "Archive"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedItems([])}
              >
                {language === "el" ? "Ακύρωση" : "Cancel"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
