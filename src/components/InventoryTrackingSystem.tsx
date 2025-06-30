import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer,
  Scale,
  MapPin,
  Calendar,
  BarChart3,
  Users,
  Truck,
  Building,
  Fish,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";

interface BatchRecord {
  id: string;
  batchNumber: string;
  productName: string;
  productType: "fish" | "shellfish" | "cephalopods" | "processed";
  supplier: string;
  purchaseDate: string;
  expiryDate: string;
  initialWeight: number;
  currentWeight: number;
  purchasePrice: number;
  currentValue: number;
  temperature: number;
  location: string;
  quality: "A" | "B" | "C";
  status: "fresh" | "processing" | "processed" | "sold" | "expired";
  traceabilityCode: string;
  certifications: string[];
  notes: string;
}

interface InventoryAlert {
  id: string;
  type: "expiry" | "temperature" | "quality" | "stock";
  severity: "high" | "medium" | "low";
  batchId: string;
  message: string;
  timestamp: string;
}

const InventoryTrackingSystem: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [batches, setBatches] = useState<BatchRecord[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(null);
  const [isAddingBatch, setIsAddingBatch] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    const sampleBatches: BatchRecord[] = [
      {
        id: "1",
        batchNumber: "TH-ARG-2024-001",
        productName: "Θράψαλο Block Αργεντίνης",
        productType: "fish",
        supplier: "Κοπανάκης A.E.",
        purchaseDate: "2024-01-15",
        expiryDate: "2024-03-15",
        initialWeight: 2000,
        currentWeight: 1800,
        purchasePrice: 4.5,
        currentValue: 8100,
        temperature: -18,
        location: "Κατάψυξη A1",
        quality: "A",
        status: "fresh",
        traceabilityCode: "ARG-TH-240115-001",
        certifications: ["MSC", "HACCP", "BRC"],
        notes: "Premium quality from sustainable fishery",
      },
      {
        id: "2",
        batchNumber: "GA-GRE-2024-002",
        productName: "Γαρίδες Μεσογείου",
        productType: "shellfish",
        supplier: "Αλιεύματα Αιγαίου",
        purchaseDate: "2024-01-20",
        expiryDate: "2024-02-20",
        initialWeight: 500,
        currentWeight: 450,
        purchasePrice: 12.0,
        currentValue: 5400,
        temperature: -20,
        location: "Κατάψυξη B2",
        quality: "A",
        status: "processing",
        traceabilityCode: "GRE-GA-240120-002",
        certifications: ["Organic", "HACCP"],
        notes: "Local catch, excellent freshness",
      },
    ];

    setBatches(sampleBatches);
    generateAlerts(sampleBatches);
  }, []);

  const generateAlerts = (batchData: BatchRecord[]) => {
    const newAlerts: InventoryAlert[] = [];
    const now = new Date();

    batchData.forEach((batch) => {
      const expiryDate = new Date(batch.expiryDate);
      const daysToExpiry = Math.ceil(
        (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );

      // Expiry alerts
      if (daysToExpiry <= 7 && daysToExpiry > 0) {
        newAlerts.push({
          id: `exp-${batch.id}`,
          type: "expiry",
          severity: daysToExpiry <= 3 ? "high" : "medium",
          batchId: batch.id,
          message:
            language === "el"
              ? `Παρτίδα ${batch.batchNumber} λήγει σε ${daysToExpiry} ημέρες`
              : `Batch ${batch.batchNumber} expires in ${daysToExpiry} days`,
          timestamp: now.toISOString(),
        });
      }

      // Temperature alerts
      if (batch.temperature > -15) {
        newAlerts.push({
          id: `temp-${batch.id}`,
          type: "temperature",
          severity: "high",
          batchId: batch.id,
          message:
            language === "el"
              ? `Θερμοκρασία παρτίδας ${batch.batchNumber} εκτός ορίων (${batch.temperature}°C)`
              : `Batch ${batch.batchNumber} temperature out of range (${batch.temperature}°C)`,
          timestamp: now.toISOString(),
        });
      }

      // Stock level alerts
      const stockRatio = batch.currentWeight / batch.initialWeight;
      if (stockRatio < 0.2) {
        newAlerts.push({
          id: `stock-${batch.id}`,
          type: "stock",
          severity: "medium",
          batchId: batch.id,
          message:
            language === "el"
              ? `Χαμηλό απόθεμα για παρτίδα ${batch.batchNumber} (${(stockRatio * 100).toFixed(1)}%)`
              : `Low stock for batch ${batch.batchNumber} (${(stockRatio * 100).toFixed(1)}%)`,
          timestamp: now.toISOString(),
        });
      }
    });

    setAlerts(newAlerts);
  };

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      fresh: "bg-green-500",
      processing: "bg-blue-500",
      processed: "bg-purple-500",
      sold: "bg-gray-500",
      expired: "bg-red-500",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      fresh: language === "el" ? "Φρέσκο" : "Fresh",
      processing: language === "el" ? "Επεξεργασία" : "Processing",
      processed: language === "el" ? "Επεξεργασμένο" : "Processed",
      sold: language === "el" ? "Πωλήθηκε" : "Sold",
      expired: language === "el" ? "Ληγμένο" : "Expired",
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getAlertIcon = (type: string) => {
    const icons = {
      expiry: Clock,
      temperature: Thermometer,
      quality: AlertTriangle,
      stock: Package,
    };
    return icons[type as keyof typeof icons] || AlertTriangle;
  };

  const getTotalValue = () => {
    return batches.reduce((total, batch) => total + batch.currentValue, 0);
  };

  const getTotalWeight = () => {
    return batches.reduce((total, batch) => total + batch.currentWeight, 0);
  };

  const getAverageQuality = () => {
    const qualityScores = { A: 100, B: 75, C: 50 };
    const avgScore =
      batches.reduce(
        (total, batch) => total + qualityScores[batch.quality],
        0,
      ) / batches.length;
    return avgScore;
  };

  const addNewBatch = () => {
    const newBatch: BatchRecord = {
      id: Date.now().toString(),
      batchNumber: `NEW-${Date.now().toString().slice(-6)}`,
      productName: "",
      productType: "fish",
      supplier: "",
      purchaseDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      initialWeight: 0,
      currentWeight: 0,
      purchasePrice: 0,
      currentValue: 0,
      temperature: -18,
      location: "",
      quality: "A",
      status: "fresh",
      traceabilityCode: "",
      certifications: [],
      notes: "",
    };

    setSelectedBatch(newBatch);
    setIsAddingBatch(true);
  };

  const saveBatch = () => {
    if (selectedBatch) {
      if (isAddingBatch) {
        setBatches([...batches, selectedBatch]);
      } else {
        setBatches(
          batches.map((b) => (b.id === selectedBatch.id ? selectedBatch : b)),
        );
      }
      setSelectedBatch(null);
      setIsAddingBatch(false);
      generateAlerts(batches);
    }
  };

  const deleteBatch = (id: string) => {
    setBatches(batches.filter((b) => b.id !== id));
    generateAlerts(batches.filter((b) => b.id !== id));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>
            {language === "el"
              ? "Σύστημα Παρακολούθησης Αποθέματος"
              : "Inventory Tracking System"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              {language === "el" ? "Επισκόπηση" : "Overview"}
            </TabsTrigger>
            <TabsTrigger value="batches" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              {language === "el" ? "Παρτίδες" : "Batches"}
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {language === "el" ? "Ειδοποιήσεις" : "Alerts"}
              {alerts.length > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {alerts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {language === "el" ? "Αναλυτικά" : "Analytics"}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">
                        {language === "el" ? "Σύνολο Αξίας" : "Total Value"}
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        {formatCurrency(getTotalValue())}
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">
                        {language === "el" ? "Συνολικό Βάρος" : "Total Weight"}
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        {getTotalWeight().toFixed(0)} kg
                      </p>
                    </div>
                    <Scale className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600">
                        {language === "el" ? "Παρτίδες" : "Batches"}
                      </p>
                      <p className="text-2xl font-bold text-purple-900">
                        {batches.length}
                      </p>
                    </div>
                    <Fish className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600">
                        {language === "el" ? "Μέση Ποιότητα" : "Avg Quality"}
                      </p>
                      <p className="text-2xl font-bold text-orange-900">
                        {getAverageQuality().toFixed(0)}%
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Button onClick={addNewBatch} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {language === "el" ? "Νέα Παρτίδα" : "New Batch"}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                {language === "el" ? "Εισαγωγή" : "Import"}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                {language === "el" ? "Εξαγωγή" : "Export"}
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => generateAlerts(batches)}
              >
                <RefreshCw className="w-4 h-4" />
                {language === "el" ? "Ανανέωση" : "Refresh"}
              </Button>
            </div>

            {/* Recent Batches */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {language === "el" ? "Πρόσφατες Παρτίδες" : "Recent Batches"}
              </h3>
              <div className="space-y-3">
                {batches.slice(0, 3).map((batch) => (
                  <Card key={batch.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${getStatusColor(batch.status)}`}
                          ></div>
                          <div>
                            <h4 className="font-medium">{batch.productName}</h4>
                            <p className="text-sm text-gray-600">
                              {batch.batchNumber}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(batch.currentValue)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {batch.currentWeight} kg
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Batches Tab */}
          <TabsContent value="batches" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {language === "el" ? "Όλες οι Παρτίδες" : "All Batches"}
                </h3>
                <Button onClick={addNewBatch}>
                  <Plus className="w-4 h-4 mr-2" />
                  {language === "el" ? "Προσθήκη Παρτίδας" : "Add Batch"}
                </Button>
              </div>

              <div className="grid gap-4">
                {batches.map((batch) => (
                  <Card
                    key={batch.id}
                    className="border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div>
                          <h4 className="font-medium">{batch.productName}</h4>
                          <p className="text-sm text-gray-600">
                            {batch.batchNumber}
                          </p>
                          <Badge
                            className={`text-xs ${getStatusColor(batch.status)} text-white`}
                          >
                            {getStatusLabel(batch.status)}
                          </Badge>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">
                            {language === "el" ? "Προμηθευτής" : "Supplier"}
                          </p>
                          <p className="font-medium">{batch.supplier}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">
                            {language === "el" ? "Βάρος" : "Weight"}
                          </p>
                          <p className="font-medium">
                            {batch.currentWeight} / {batch.initialWeight} kg
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${(batch.currentWeight / batch.initialWeight) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">
                            {language === "el" ? "Αξία" : "Value"}
                          </p>
                          <p className="font-medium">
                            {formatCurrency(batch.currentValue)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {language === "el" ? "Λήγει:" : "Expires:"}{" "}
                            {new Date(batch.expiryDate).toLocaleDateString(
                              "el-GR",
                            )}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedBatch(batch)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedBatch(batch);
                              setIsAddingBatch(false);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteBatch(batch.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {language === "el" ? "Ενεργές Ειδοποιήσεις" : "Active Alerts"}
                <Badge variant="outline" className="ml-2">
                  {alerts.length}
                </Badge>
              </h3>

              {alerts.length > 0 ? (
                <div className="space-y-3">
                  {alerts.map((alert) => {
                    const AlertIcon = getAlertIcon(alert.type);
                    const severityColors = {
                      high: "border-red-500 bg-red-50 text-red-800",
                      medium: "border-yellow-500 bg-yellow-50 text-yellow-800",
                      low: "border-blue-500 bg-blue-50 text-blue-800",
                    };

                    return (
                      <Card
                        key={alert.id}
                        className={`border-2 ${severityColors[alert.severity]}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <AlertIcon className="w-5 h-5 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {alert.severity.toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {alert.type.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="font-medium">{alert.message}</p>
                              <p className="text-xs opacity-75">
                                {new Date(alert.timestamp).toLocaleString(
                                  "el-GR",
                                )}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-green-800 mb-2">
                      {language === "el"
                        ? "Δεν υπάρχουν ειδοποιήσεις"
                        : "No alerts"}
                    </h4>
                    <p className="text-green-700">
                      {language === "el"
                        ? "Όλες οι παρτίδες είναι σε καλή κατάσταση"
                        : "All batches are in good condition"}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                {language === "el"
                  ? "Αναλυτικά Στοιχεία Αποθέματος"
                  : "Inventory Analytics"}
              </h3>

              {/* Product Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {language === "el"
                      ? "Κατανομή ανά Τύπο Προϊόντος"
                      : "Distribution by Product Type"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["fish", "shellfish", "cephalopods", "processed"].map(
                      (type) => {
                        const typeCount = batches.filter(
                          (b) => b.productType === type,
                        ).length;
                        const percentage =
                          batches.length > 0
                            ? (typeCount / batches.length) * 100
                            : 0;

                        return (
                          <div key={type} className="flex items-center gap-3">
                            <div className="w-20 text-sm">
                              {type === "fish"
                                ? language === "el"
                                  ? "Ψάρια"
                                  : "Fish"
                                : type === "shellfish"
                                  ? language === "el"
                                    ? "Οστρακοειδή"
                                    : "Shellfish"
                                  : type === "cephalopods"
                                    ? language === "el"
                                      ? "Κεφαλόποδα"
                                      : "Cephalopods"
                                    : language === "el"
                                      ? "Επεξεργασμένα"
                                      : "Processed"}
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-4">
                              <div
                                className="bg-blue-500 h-4 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="w-16 text-sm text-right">
                              {typeCount} ({percentage.toFixed(0)}%)
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {language === "el" ? "Κατάσταση Παρτίδων" : "Batch Status"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      "fresh",
                      "processing",
                      "processed",
                      "sold",
                      "expired",
                    ].map((status) => {
                      const statusCount = batches.filter(
                        (b) => b.status === status,
                      ).length;

                      return (
                        <div key={status} className="text-center">
                          <div
                            className={`w-12 h-12 rounded-full ${getStatusColor(status)} mx-auto mb-2 flex items-center justify-center text-white font-bold`}
                          >
                            {statusCount}
                          </div>
                          <p className="text-xs text-gray-600">
                            {getStatusLabel(status)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Value Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {language === "el" ? "Τάσεις Αξίας" : "Value Trends"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(getTotalValue())}
                        </p>
                        <p className="text-sm text-gray-600">
                          {language === "el" ? "Συνολική Αξία" : "Total Value"}
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(
                            batches.length > 0
                              ? getTotalValue() / batches.length
                              : 0,
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          {language === "el" ? "Μέση Αξία" : "Average Value"}
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">
                          {formatCurrency(getTotalValue() / getTotalWeight())}
                        </p>
                        <p className="text-sm text-gray-600">
                          {language === "el" ? "Αξία/kg" : "Value/kg"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Batch Details Modal */}
        {selectedBatch && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {isAddingBatch
                      ? language === "el"
                        ? "Νέα Παρτίδα"
                        : "New Batch"
                      : language === "el"
                        ? "Στοιχεία Παρτίδας"
                        : "Batch Details"}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedBatch(null);
                      setIsAddingBatch(false);
                    }}
                    className="text-white hover:bg-white/20"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>
                      {language === "el" ? "Αριθμός Παρτίδας" : "Batch Number"}
                    </Label>
                    <Input
                      value={selectedBatch.batchNumber}
                      onChange={(e) =>
                        setSelectedBatch({
                          ...selectedBatch,
                          batchNumber: e.target.value,
                        })
                      }
                      disabled={!isAddingBatch}
                    />
                  </div>
                  <div>
                    <Label>
                      {language === "el" ? "Όνομα Προϊόντος" : "Product Name"}
                    </Label>
                    <Input
                      value={selectedBatch.productName}
                      onChange={(e) =>
                        setSelectedBatch({
                          ...selectedBatch,
                          productName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>
                      {language === "el" ? "Τύπος Προϊόντος" : "Product Type"}
                    </Label>
                    <Select
                      value={selectedBatch.productType}
                      onValueChange={(value: any) =>
                        setSelectedBatch({
                          ...selectedBatch,
                          productType: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fish">
                          {language === "el" ? "Ψάρια" : "Fish"}
                        </SelectItem>
                        <SelectItem value="shellfish">
                          {language === "el" ? "Οστρακοειδή" : "Shellfish"}
                        </SelectItem>
                        <SelectItem value="cephalopods">
                          {language === "el" ? "Κεφαλόποδα" : "Cephalopods"}
                        </SelectItem>
                        <SelectItem value="processed">
                          {language === "el" ? "Επεξεργασμένα" : "Processed"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>
                      {language === "el" ? "Προμηθευτής" : "Supplier"}
                    </Label>
                    <Input
                      value={selectedBatch.supplier}
                      onChange={(e) =>
                        setSelectedBatch({
                          ...selectedBatch,
                          supplier: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>
                      {language === "el"
                        ? "Αρχικό Βάρος (kg)"
                        : "Initial Weight (kg)"}
                    </Label>
                    <Input
                      type="number"
                      value={selectedBatch.initialWeight}
                      onChange={(e) =>
                        setSelectedBatch({
                          ...selectedBatch,
                          initialWeight: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>
                      {language === "el"
                        ? "Τρέχον Βάρος (kg)"
                        : "Current Weight (kg)"}
                    </Label>
                    <Input
                      type="number"
                      value={selectedBatch.currentWeight}
                      onChange={(e) =>
                        setSelectedBatch({
                          ...selectedBatch,
                          currentWeight: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>
                      {language === "el"
                        ? "Τιμή Αγοράς (€/kg)"
                        : "Purchase Price (€/kg)"}
                    </Label>
                    <Input
                      type="number"
                      value={selectedBatch.purchasePrice}
                      onChange={(e) =>
                        setSelectedBatch({
                          ...selectedBatch,
                          purchasePrice: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>
                      {language === "el"
                        ? "Θερμοκρασία (°C)"
                        : "Temperature (°C)"}
                    </Label>
                    <Input
                      type="number"
                      value={selectedBatch.temperature}
                      onChange={(e) =>
                        setSelectedBatch({
                          ...selectedBatch,
                          temperature: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button onClick={saveBatch}>
                    {language === "el" ? "Αποθήκευση" : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedBatch(null);
                      setIsAddingBatch(false);
                    }}
                  >
                    {language === "el" ? "Ακύρωση" : "Cancel"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryTrackingSystem;
