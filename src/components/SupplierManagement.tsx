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
  Building2,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Download,
  Upload,
  FileText,
  Send,
  Activity,
  Target,
  Zap,
  Globe,
  Package,
  CreditCard,
  ShoppingCart,
  Truck,
  Scale,
  ThermometerSun,
  Shield,
  Leaf,
  Factory,
  Users,
  Settings,
  MoreVertical,
  ExternalLink,
  Copy,
  Archive,
  RefreshCw,
  Timer,
  Percent,
  ArrowUpDown,
  Trophy,
  HandHeart,
  AlertCircle,
  XCircle,
  Briefcase,
  Calculator,
  UserCheck,
  Bell,
  Navigation,
  ClipboardCheck,
  BookOpen,
  Anchor,
  Fish,
  Waves,
  Fuel,
  Container,
  QrCode,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Supplier {
  id: string;
  name: string;
  type: "fisherman" | "processor" | "distributor" | "equipment" | "services";
  status: "active" | "pending" | "suspended" | "blacklisted";
  contact: {
    person: string;
    email: string;
    phone: string;
    address: string;
    website?: string;
  };
  financial: {
    paymentTerms: number;
    creditLimit: number;
    currentBalance: number;
    totalPurchases: number;
    avgOrderValue: number;
    lastPayment: Date;
  };
  performance: {
    qualityScore: number;
    reliabilityScore: number;
    deliveryScore: number;
    overallRating: number;
    totalOrders: number;
    onTimeDeliveries: number;
    qualityIssues: number;
  };
  certifications: string[];
  specialties: string[];
  regions: string[];
  registrationDate: Date;
  lastOrder: Date;
  preferences: {
    minOrderQuantity: number;
    maxOrderQuantity: number;
    leadTime: number;
    seasonalAvailability: string[];
  };
  documents: {
    name: string;
    type: string;
    uploadDate: Date;
    expiryDate?: Date;
    status: "valid" | "expired" | "pending";
  }[];
}

interface SupplierManagementProps {
  className?: string;
}

const SupplierManagement: React.FC<SupplierManagementProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("overallRating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Realistic Greek supplier data
  const suppliers: Supplier[] = [
    {
      id: "SUP-001",
      name: "Κωστόπουλος Αλιεία ΑΕ",
      type: "fisherman",
      status: "active",
      contact: {
        person: "Γιάννης Κωστόπουλος",
        email: "info@kostopoulos-fishing.gr",
        phone: "+30 210 555 0123",
        address: "Λιμάνι Πειραιά, Πειραιάς 18540",
        website: "www.kostopoulos-fishing.gr",
      },
      financial: {
        paymentTerms: 30,
        creditLimit: 50000,
        currentBalance: 12500,
        totalPurchases: 285000,
        avgOrderValue: 4200,
        lastPayment: new Date("2024-11-15"),
      },
      performance: {
        qualityScore: 94,
        reliabilityScore: 92,
        deliveryScore: 88,
        overallRating: 91,
        totalOrders: 68,
        onTimeDeliveries: 60,
        qualityIssues: 2,
      },
      certifications: ["MSC", "HACCP", "ISO 22000", "BRC"],
      specialties: ["Τσιπούρα", "Λαβράκι", "Σαρδέλες", "Αντζούγιες"],
      regions: ["Αιγαίο", "Ιόνιο"],
      registrationDate: new Date("2022-03-15"),
      lastOrder: new Date("2024-11-20"),
      preferences: {
        minOrderQuantity: 100,
        maxOrderQuantity: 2000,
        leadTime: 2,
        seasonalAvailability: ["Άνοιξη", "Καλοκαίρι", "Φθινόπωρο"],
      },
      documents: [
        {
          name: "Άδεια Αλιείας",
          type: "license",
          uploadDate: new Date("2024-01-15"),
          expiryDate: new Date("2025-01-15"),
          status: "valid",
        },
        {
          name: "Πιστοποίηση MSC",
          type: "certification",
          uploadDate: new Date("2024-02-10"),
          expiryDate: new Date("2025-02-10"),
          status: "valid",
        },
      ],
    },
    {
      id: "SUP-002",
      name: "Θαλάσσιος Κόσμος ΕΠΕ",
      type: "processor",
      status: "active",
      contact: {
        person: "Μαρία Παπαδοπούλου",
        email: "orders@thalassios-kosmos.gr",
        phone: "+30 2310 123456",
        address: "Βιομηχανική Περιοχή, Θεσσαλονίκη 57022",
        website: "www.thalassios-kosmos.gr",
      },
      financial: {
        paymentTerms: 45,
        creditLimit: 75000,
        currentBalance: 8300,
        totalPurchases: 420000,
        avgOrderValue: 6500,
        lastPayment: new Date("2024-11-18"),
      },
      performance: {
        qualityScore: 96,
        reliabilityScore: 95,
        deliveryScore: 94,
        overallRating: 95,
        totalOrders: 65,
        onTimeDeliveries: 61,
        qualityIssues: 1,
      },
      certifications: ["HACCP", "ISO 22000", "BRC", "IFS", "Organic"],
      specialties: ["Φιλέτα", "Καπνιστά", "Κατεψυγμένα", "Μαριναρισμένα"],
      regions: ["Βόρεια Ελλάδα", "Μακεδονία"],
      registrationDate: new Date("2021-08-20"),
      lastOrder: new Date("2024-11-19"),
      preferences: {
        minOrderQuantity: 500,
        maxOrderQuantity: 5000,
        leadTime: 5,
        seasonalAvailability: ["Όλο το χρόνο"],
      },
      documents: [
        {
          name: "Άδεια Λειτουργίας",
          type: "license",
          uploadDate: new Date("2024-01-10"),
          expiryDate: new Date("2025-01-10"),
          status: "valid",
        },
        {
          name: "Πιστοποίηση HACCP",
          type: "certification",
          uploadDate: new Date("2024-03-15"),
          expiryDate: new Date("2025-03-15"),
          status: "valid",
        },
      ],
    },
    {
      id: "SUP-003",
      name: "Αιγαίο Fisheries",
      type: "fisherman",
      status: "active",
      contact: {
        person: "Νίκος Αντωνίου",
        email: "contact@aegean-fisheries.gr",
        phone: "+30 22840 55123",
        address: "Νάξος, Κυκλάδες 84300",
      },
      financial: {
        paymentTerms: 15,
        creditLimit: 25000,
        currentBalance: 3200,
        totalPurchases: 156000,
        avgOrderValue: 2800,
        lastPayment: new Date("2024-11-10"),
      },
      performance: {
        qualityScore: 89,
        reliabilityScore: 85,
        deliveryScore: 79,
        overallRating: 84,
        totalOrders: 56,
        onTimeDeliveries: 44,
        qualityIssues: 4,
      },
      certifications: ["HACCP", "MSC"],
      specialties: ["Μπαρμπούνια", "Σκάρος", "Μύδια", "Καλαμάρια"],
      regions: ["Κυκλάδες", "Αιγαίο"],
      registrationDate: new Date("2023-01-10"),
      lastOrder: new Date("2024-11-16"),
      preferences: {
        minOrderQuantity: 50,
        maxOrderQuantity: 1000,
        leadTime: 1,
        seasonalAvailability: ["Καλοκαίρι", "Φθινόπωρο"],
      },
      documents: [
        {
          name: "Άδεια Αλιείας",
          type: "license",
          uploadDate: new Date("2024-01-05"),
          expiryDate: new Date("2024-12-31"),
          status: "expired",
        },
      ],
    },
    {
      id: "SUP-004",
      name: "Mediterranean Cold Chain",
      type: "services",
      status: "active",
      contact: {
        person: "Σωτήρης Καραμανλής",
        email: "logistics@med-coldchain.com",
        phone: "+30 210 987 6543",
        address: "Ασπρόπυργος, Αττική 19300",
        website: "www.med-coldchain.com",
      },
      financial: {
        paymentTerms: 30,
        creditLimit: 40000,
        currentBalance: 5600,
        totalPurchases: 89000,
        avgOrderValue: 1500,
        lastPayment: new Date("2024-11-12"),
      },
      performance: {
        qualityScore: 92,
        reliabilityScore: 88,
        deliveryScore: 96,
        overallRating: 92,
        totalOrders: 59,
        onTimeDeliveries: 57,
        qualityIssues: 0,
      },
      certifications: ["ISO 9001", "ATP", "HACCP"],
      specialties: ["Ψυγείο Μεταφορά", "Αποθήκευση", "Logistics", "Διανομή"],
      regions: ["Αττική", "Πελοπόννησος", "Στερεά Ελλάδα"],
      registrationDate: new Date("2022-11-05"),
      lastOrder: new Date("2024-11-17"),
      preferences: {
        minOrderQuantity: 1,
        maxOrderQuantity: 100,
        leadTime: 1,
        seasonalAvailability: ["Όλο το χρόνο"],
      },
      documents: [
        {
          name: "Άδεια Μεταφοράς",
          type: "license",
          uploadDate: new Date("2024-02-01"),
          expiryDate: new Date("2025-02-01"),
          status: "valid",
        },
      ],
    },
    {
      id: "SUP-005",
      name: "Hellas Fishing Equipment",
      type: "equipment",
      status: "pending",
      contact: {
        person: "Αλέξανδρος Νικολάου",
        email: "sales@hellas-fishing-eq.gr",
        phone: "+30 2310 789456",
        address: "Βιομηχανική Περιοχή, Θεσσαλονίκη 57008",
      },
      financial: {
        paymentTerms: 60,
        creditLimit: 15000,
        currentBalance: 0,
        totalPurchases: 23000,
        avgOrderValue: 3800,
        lastPayment: new Date("2024-10-15"),
      },
      performance: {
        qualityScore: 87,
        reliabilityScore: 82,
        deliveryScore: 85,
        overallRating: 85,
        totalOrders: 6,
        onTimeDeliveries: 5,
        qualityIssues: 0,
      },
      certifications: ["CE", "ISO 9001"],
      specialties: [
        "Δίχτυα",
        "Παραγάδια",
        "Εξοπλισμός Σκάφους",
        "Ανταλλακτικά",
      ],
      regions: ["Βόρεια Ελλάδα"],
      registrationDate: new Date("2024-09-01"),
      lastOrder: new Date("2024-10-20"),
      preferences: {
        minOrderQuantity: 1,
        maxOrderQuantity: 50,
        leadTime: 14,
        seasonalAvailability: ["Όλο το χρόνο"],
      },
      documents: [
        {
          name: "Άδεια Λειτουργίας",
          type: "license",
          uploadDate: new Date("2024-09-01"),
          expiryDate: new Date("2025-09-01"),
          status: "pending",
        },
      ],
    },
  ];

  // Filter and sort suppliers
  const filteredSuppliers = suppliers
    .filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contact.person
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        supplier.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || supplier.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || supplier.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      const aValue =
        a.performance[sortField as keyof typeof a.performance] ||
        a[sortField as keyof typeof a];
      const bValue =
        b.performance[sortField as keyof typeof b.performance] ||
        b[sortField as keyof typeof b];

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

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-orange-100 text-orange-800",
      blacklisted: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (type: string) => {
    const colors = {
      fisherman: "bg-blue-100 text-blue-800",
      processor: "bg-purple-100 text-purple-800",
      distributor: "bg-green-100 text-green-800",
      equipment: "bg-orange-100 text-orange-800",
      services: "bg-cyan-100 text-cyan-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "text-green-600";
    if (rating >= 80) return "text-blue-600";
    if (rating >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "fisherman":
        return <Fish className="w-4 h-4" />;
      case "processor":
        return <Factory className="w-4 h-4" />;
      case "distributor":
        return <Truck className="w-4 h-4" />;
      case "equipment":
        return <Settings className="w-4 h-4" />;
      case "services":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  // Calculate supplier metrics
  const supplierMetrics = {
    total: suppliers.length,
    active: suppliers.filter((s) => s.status === "active").length,
    pending: suppliers.filter((s) => s.status === "pending").length,
    avgRating:
      suppliers.reduce((sum, s) => sum + s.performance.overallRating, 0) /
      suppliers.length,
    totalSpend: suppliers.reduce(
      (sum, s) => sum + s.financial.totalPurchases,
      0,
    ),
    avgPaymentTerms:
      suppliers.reduce((sum, s) => sum + s.financial.paymentTerms, 0) /
      suppliers.length,
    topSuppliers: suppliers.filter((s) => s.performance.overallRating >= 90)
      .length,
    certifiedSuppliers: suppliers.filter((s) => s.certifications.length >= 3)
      .length,
  };

  // Supplier Overview Widget
  const SupplierOverviewWidget = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el"
                  ? "Συνολικοί Προμηθευτές"
                  : "Total Suppliers"}
              </p>
              <p className="text-2xl font-bold">{supplierMetrics.total}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el" ? "Ενεργοί" : "Active"}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {supplierMetrics.active}
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
                {language === "el" ? "Μέσος Βαθμός" : "Avg Rating"}
              </p>
              <p
                className={`text-2xl font-bold ${getRatingColor(supplierMetrics.avgRating)}`}
              >
                {supplierMetrics.avgRating.toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el" ? "Συνολικές Δαπάνες" : "Total Spend"}
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(supplierMetrics.totalSpend)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Supplier Types Widget
  const SupplierTypesWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Building2 className="w-4 h-4 mr-2 text-blue-600" />
          {language === "el" ? "Τύποι Προμηθευτών" : "Supplier Types"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          {
            type: "fisherman",
            label: language === "el" ? "Αλιείς" : "Fishermen",
          },
          {
            type: "processor",
            label: language === "el" ? "Επεξεργαστές" : "Processors",
          },
          {
            type: "distributor",
            label: language === "el" ? "Διανομείς" : "Distributors",
          },
          {
            type: "equipment",
            label: language === "el" ? "Εξοπλισμός" : "Equipment",
          },
          {
            type: "services",
            label: language === "el" ? "Υπηρεσίες" : "Services",
          },
        ].map((item) => {
          const count = suppliers.filter((s) => s.type === item.type).length;
          return (
            <div key={item.type} className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge className={getTypeColor(item.type)}>
                  {getTypeIcon(item.type)}
                  <span className="ml-1">{item.label}</span>
                </Badge>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-2">{count}</span>
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{
                      width: `${(count / supplierMetrics.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );

  // Top Suppliers Widget
  const TopSuppliersWidget = () => {
    const topSuppliers = suppliers
      .sort((a, b) => b.performance.overallRating - a.performance.overallRating)
      .slice(0, 5);

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm">
            <Trophy className="w-4 h-4 mr-2 text-yellow-600" />
            {language === "el" ? "Κορυφαίοι Προμηθευτές" : "Top Suppliers"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {topSuppliers.map((supplier, index) => (
            <div
              key={supplier.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
            >
              <div className="flex items-center flex-1 min-w-0">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-800 mr-2">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{supplier.name}</p>
                  <p className="text-xs text-gray-500">
                    {supplier.specialties.slice(0, 2).join(", ")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-medium ${getRatingColor(supplier.performance.overallRating)}`}
                >
                  {supplier.performance.overallRating}
                </div>
                <Badge className={getStatusColor(supplier.status)}>
                  {supplier.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  // Performance Analytics Widget
  const PerformanceAnalyticsWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <BarChart3 className="w-4 h-4 mr-2 text-green-600" />
          {language === "el" ? "Ανάλυση Επιδόσεων" : "Performance Analytics"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{language === "el" ? "Ποιότητα" : "Quality"}</span>
            <span className="font-medium">
              {(
                suppliers.reduce(
                  (sum, s) => sum + s.performance.qualityScore,
                  0,
                ) / suppliers.length
              ).toFixed(1)}
              %
            </span>
          </div>
          <Progress
            value={
              suppliers.reduce(
                (sum, s) => sum + s.performance.qualityScore,
                0,
              ) / suppliers.length
            }
            className="h-2"
          />

          <div className="flex justify-between text-sm">
            <span>{language === "el" ? "Αξιοπιστία" : "Reliability"}</span>
            <span className="font-medium">
              {(
                suppliers.reduce(
                  (sum, s) => sum + s.performance.reliabilityScore,
                  0,
                ) / suppliers.length
              ).toFixed(1)}
              %
            </span>
          </div>
          <Progress
            value={
              suppliers.reduce(
                (sum, s) => sum + s.performance.reliabilityScore,
                0,
              ) / suppliers.length
            }
            className="h-2"
          />

          <div className="flex justify-between text-sm">
            <span>{language === "el" ? "Παράδοση" : "Delivery"}</span>
            <span className="font-medium">
              {(
                suppliers.reduce(
                  (sum, s) => sum + s.performance.deliveryScore,
                  0,
                ) / suppliers.length
              ).toFixed(1)}
              %
            </span>
          </div>
          <Progress
            value={
              suppliers.reduce(
                (sum, s) => sum + s.performance.deliveryScore,
                0,
              ) / suppliers.length
            }
            className="h-2"
          />
        </div>

        <div className="pt-2 border-t text-xs text-gray-500">
          <div className="flex justify-between">
            <span>
              {language === "el" ? "Εξαιρετικοί (90+):" : "Excellent (90+):"}
            </span>
            <span className="font-medium">{supplierMetrics.topSuppliers}</span>
          </div>
          <div className="flex justify-between">
            <span>{language === "el" ? "Πιστοποιημένοι:" : "Certified:"}</span>
            <span className="font-medium">
              {supplierMetrics.certifiedSuppliers}
            </span>
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
          {language === "el" ? "Νέος Προμηθευτής" : "New Supplier"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Calculator className="w-4 h-4 mr-2" />
          {language === "el" ? "Ανάλυση Τιμών" : "Price Analysis"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <ClipboardCheck className="w-4 h-4 mr-2" />
          {language === "el" ? "Έλεγχος Ποιότητας" : "Quality Review"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <FileText className="w-4 h-4 mr-2" />
          {language === "el" ? "Αναφορά Επιδόσεων" : "Performance Report"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Send className="w-4 h-4 mr-2" />
          {language === "el" ? "RFQ Αίτημα" : "Send RFQ"}
        </Button>
      </CardContent>
    </Card>
  );

  // Supplier Card Component
  const SupplierCard = ({ supplier }: { supplier: Supplier }) => (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        selectedSupplier === supplier.id ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={() => setSelectedSupplier(supplier.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getTypeIcon(supplier.type)}
            <div>
              <h3 className="font-medium text-sm">{supplier.name}</h3>
              <p className="text-xs text-gray-500">{supplier.contact.person}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge className={getStatusColor(supplier.status)}>
              {supplier.status}
            </Badge>
            <div
              className={`text-sm font-bold ${getRatingColor(supplier.performance.overallRating)}`}
            >
              {supplier.performance.overallRating}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {language === "el" ? "Τύπος:" : "Type:"}
            </span>
            <Badge className={getTypeColor(supplier.type)}>
              {supplier.type}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {language === "el" ? "Παραγγελίες:" : "Orders:"}
            </span>
            <span className="font-medium">
              {supplier.performance.totalOrders}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {language === "el" ? "Αξία:" : "Value:"}
            </span>
            <span className="font-medium">
              {formatCurrency(supplier.financial.totalPurchases)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {language === "el" ? "Τελευταία:" : "Last:"}
            </span>
            <span className="font-medium">
              {supplier.lastOrder.toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">
              {language === "el" ? "Ειδικότητες:" : "Specialties:"}
            </span>
            <span className="text-right">
              {supplier.specialties.slice(0, 2).join(", ")}
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
              ? "Διαχείριση Προμηθευτών"
              : "Supplier Management"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Διαχείριση σχέσεων και επιδόσεων προμηθευτών"
              : "Manage supplier relationships and performance"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {supplierMetrics.active} {language === "el" ? "ενεργοί" : "active"}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? (
              <BarChart3 className="w-4 h-4 mr-2" />
            ) : (
              <Package className="w-4 h-4 mr-2" />
            )}
            {viewMode === "grid"
              ? language === "el"
                ? "Λίστα"
                : "List"
              : language === "el"
                ? "Πλέγμα"
                : "Grid"}
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Εξαγωγή" : "Export"}
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέος Προμηθευτής" : "New Supplier"}
          </Button>
        </div>
      </div>

      {/* Supplier Overview */}
      <SupplierOverviewWidget />

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="suppliers">
            {language === "el" ? "Προμηθευτές" : "Suppliers"}
          </TabsTrigger>
          <TabsTrigger value="performance">
            {language === "el" ? "Επιδόσεις" : "Performance"}
          </TabsTrigger>
          <TabsTrigger value="procurement">
            {language === "el" ? "Προμήθειες" : "Procurement"}
          </TabsTrigger>
          <TabsTrigger value="quality">
            {language === "el" ? "Ποιότητα" : "Quality"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === "el" ? "Αναλυτικά" : "Analytics"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                    {language === "el"
                      ? "Κατανομή Προμηθευτών"
                      : "Supplier Distribution"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Γράφημα κατανομής προμηθευτών"
                          : "Supplier distribution chart"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    {language === "el"
                      ? "Τάσεις Επιδόσεων"
                      : "Performance Trends"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Γράφημα τάσεων επιδόσεων"
                          : "Performance trends chart"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <SupplierTypesWidget />
              <TopSuppliersWidget />
              <PerformanceAnalyticsWidget />
              <QuickActionsWidget />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                          ? "Όνομα, επικοινωνία..."
                          : "Name, contact..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">
                    {language === "el" ? "Τύπος" : "Type"}
                  </Label>
                  <select
                    id="type"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">
                      {language === "el" ? "Όλοι" : "All"}
                    </option>
                    <option value="fisherman">
                      {language === "el" ? "Αλιείς" : "Fishermen"}
                    </option>
                    <option value="processor">
                      {language === "el" ? "Επεξεργαστές" : "Processors"}
                    </option>
                    <option value="distributor">
                      {language === "el" ? "Διανομείς" : "Distributors"}
                    </option>
                    <option value="equipment">
                      {language === "el" ? "Εξοπλισμός" : "Equipment"}
                    </option>
                    <option value="services">
                      {language === "el" ? "Υπηρεσίες" : "Services"}
                    </option>
                  </select>
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
                    <option value="active">
                      {language === "el" ? "Ενεργοί" : "Active"}
                    </option>
                    <option value="pending">
                      {language === "el" ? "Εκκρεμείς" : "Pending"}
                    </option>
                    <option value="suspended">
                      {language === "el" ? "Αναστολή" : "Suspended"}
                    </option>
                    <option value="blacklisted">
                      {language === "el" ? "Μαύρη Λίστα" : "Blacklisted"}
                    </option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="sort">
                    {language === "el" ? "Ταξινόμηση" : "Sort By"}
                  </Label>
                  <select
                    id="sort"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="overallRating">
                      {language === "el" ? "Βαθμολογία" : "Rating"}
                    </option>
                    <option value="totalPurchases">
                      {language === "el"
                        ? "Συνολικές Αγορές"
                        : "Total Purchases"}
                    </option>
                    <option value="name">
                      {language === "el" ? "Όνομα" : "Name"}
                    </option>
                    <option value="registrationDate">
                      {language === "el" ? "Ημ. Εγγραφής" : "Registration Date"}
                    </option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    {sortOrder === "asc"
                      ? language === "el"
                        ? "Αύξουσα"
                        : "Ascending"
                      : language === "el"
                        ? "Φθίνουσα"
                        : "Descending"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suppliers Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el" ? "Λίστα Προμηθευτών" : "Supplier List"}
                </span>
                <Badge variant="outline">
                  {filteredSuppliers.length}{" "}
                  {language === "el" ? "προμηθευτές" : "suppliers"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSuppliers.map((supplier) => (
                    <SupplierCard key={supplier.id} supplier={supplier} />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {language === "el" ? "Προμηθευτής" : "Supplier"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Τύπος" : "Type"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Κατάσταση" : "Status"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Βαθμολογία" : "Rating"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Παραγγελίες" : "Orders"}
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
                    {filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{supplier.name}</div>
                            <div className="text-xs text-gray-500">
                              {supplier.contact.person}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(supplier.type)}>
                            {getTypeIcon(supplier.type)}
                            <span className="ml-1">{supplier.type}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(supplier.status)}>
                            {supplier.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`font-bold ${getRatingColor(supplier.performance.overallRating)}`}
                          >
                            {supplier.performance.overallRating}
                          </div>
                        </TableCell>
                        <TableCell>
                          {supplier.performance.totalOrders}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(supplier.financial.totalPurchases)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedSupplier(supplier.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Mail className="w-4 h-4" />
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el"
                    ? "Ανάλυση Επιδόσεων"
                    : "Performance Analysis"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Αναλυτικό γράφημα επιδόσεων"
                        : "Detailed performance analytics"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el" ? "KPI Προμηθευτών" : "Supplier KPIs"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Δείκτες απόδοσης προμηθευτών"
                        : "Supplier performance indicators"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="procurement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-purple-600" />
                {language === "el"
                  ? "Διαχείριση Προμηθειών"
                  : "Procurement Management"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Συστήματα προμηθειών και παραγγελιών"
                      : "Procurement and ordering systems"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-red-600" />
                {language === "el" ? "Έλεγχος Ποιότητας" : "Quality Control"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Διασφάλιση ποιότητας προμηθευτών"
                      : "Supplier quality assurance"}
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
                  <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el" ? "Ανάλυση Δαπανών" : "Spend Analysis"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Ανάλυση δαπανών προμηθευτών"
                        : "Supplier spend analysis"}
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
                        ? "Προβλέψεις προμηθειών"
                        : "Supply forecasting"}
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

export default SupplierManagement;
