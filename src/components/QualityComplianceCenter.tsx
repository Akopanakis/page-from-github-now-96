import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Award,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Eye,
  FileText,
  Clipboard,
  Thermometer,
  Droplets,
  Microscope,
  TestTube,
  Scale,
  Calendar,
  User,
  MapPin,
  Barcode,
  QrCode,
  Camera,
  Upload,
  Download,
  Print,
  Share,
  Bell,
  Settings,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Star,
  Leaf,
  Truck,
  Package,
  Fish,
  Factory,
  Globe,
  Activity,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Brain,
  Database,
  Layers,
  BarChart3,
  PieChart,
  LineChart,
  Timer,
  RefreshCw,
  Archive,
  BookOpen,
  ClipboardCheck,
  Gauge,
  Radio,
  Wifi,
  Bluetooth,
  Smartphone,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { realisticSeafoodData } from "@/mock/realisticSeafoodData";

interface QualityComplianceCenterProps {
  className?: string;
}

const QualityComplianceCenter: React.FC<QualityComplianceCenterProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);

  // Quality and compliance data
  const qualityData = {
    // Overall quality metrics
    overview: {
      overallScore: 94.2,
      target: 95.0,
      trend: "stable",
      lastMonth: 93.8,
      passRate: 96.5,
      rejectRate: 3.5,
      reworkRate: 2.1,
    },

    // Quality checks performed today
    dailyChecks: {
      total: 45,
      passed: 42,
      failed: 2,
      pending: 1,
      critical: 0,
    },

    // Temperature monitoring
    temperature: {
      current: 2.1,
      min: 1.8,
      max: 2.5,
      target: 2.0,
      variance: 0.1,
      alerts: 0,
      locations: [
        { id: "cold-a", name: "Cold Storage A", temp: 2.1, status: "normal" },
        { id: "cold-b", name: "Cold Storage B", temp: 1.9, status: "normal" },
        { id: "freezer", name: "Freezer Unit", temp: -18.2, status: "normal" },
        {
          id: "processing",
          name: "Processing Area",
          temp: 4.1,
          status: "normal",
        },
      ],
    },

    // Product testing
    testing: {
      microbiological: {
        passed: 48,
        failed: 2,
        pending: 3,
        lastFailure: "2 days ago",
      },
      chemical: {
        passed: 35,
        failed: 0,
        pending: 2,
        lastFailure: "1 week ago",
      },
      physical: {
        passed: 52,
        failed: 1,
        pending: 1,
        lastFailure: "3 days ago",
      },
    },

    // Compliance status
    compliance: {
      haccp: {
        status: "compliant",
        lastAudit: "2024-01-15",
        nextAudit: "2024-04-15",
        score: 98.5,
      },
      iso22000: {
        status: "compliant",
        lastAudit: "2023-12-01",
        nextAudit: "2024-12-01",
        score: 96.8,
      },
      brc: {
        status: "minor-nonconformance",
        lastAudit: "2024-01-10",
        nextAudit: "2024-03-10",
        score: 94.2,
      },
      msc: {
        status: "compliant",
        lastAudit: "2023-11-20",
        nextAudit: "2024-11-20",
        score: 97.1,
      },
      organic: {
        status: "compliant",
        lastAudit: "2024-01-05",
        nextAudit: "2024-07-05",
        score: 95.7,
      },
    },

    // Recent quality issues
    issues: [
      {
        id: "issue-001",
        type: "temperature",
        severity: "medium",
        description: "Cold storage A temperature spike",
        batch: "SB-2024-015",
        timestamp: new Date("2024-01-15T14:30:00"),
        status: "resolved",
        assignedTo: "Quality Manager",
        rootCause: "Thermostat malfunction",
        correctiveAction: "Thermostat replaced, monitoring increased",
      },
      {
        id: "issue-002",
        type: "contamination",
        severity: "high",
        description: "Foreign object detected in batch",
        batch: "SB-2024-012",
        timestamp: new Date("2024-01-14T09:15:00"),
        status: "investigating",
        assignedTo: "QA Inspector",
        rootCause: "Under investigation",
        correctiveAction: "Batch quarantined, investigation ongoing",
      },
    ],

    // Audit schedule
    audits: [
      {
        id: "audit-001",
        type: "Internal HACCP",
        date: new Date("2024-01-20"),
        auditor: "Maria Papadopoulos",
        areas: ["Processing", "Storage", "Hygiene"],
        status: "scheduled",
        priority: "high",
      },
      {
        id: "audit-002",
        type: "BRC External",
        date: new Date("2024-03-10"),
        auditor: "TÜV HELLAS",
        areas: ["Full facility"],
        status: "pending",
        priority: "critical",
      },
    ],

    // Training records
    training: {
      total: 24,
      current: 22,
      expired: 2,
      upcoming: 5,
      completion: 91.7,
    },

    // Documentation
    documents: {
      total: 156,
      current: 148,
      expired: 8,
      pending: 12,
      completion: 94.9,
    },
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("el-GR");
  };

  const getStatusColor = (status: string) => {
    const colors = {
      compliant: "bg-green-100 text-green-800",
      "minor-nonconformance": "bg-yellow-100 text-yellow-800",
      "major-nonconformance": "bg-red-100 text-red-800",
      "non-compliant": "bg-red-100 text-red-800",
      normal: "text-green-600",
      warning: "text-yellow-600",
      critical: "text-red-600",
      resolved: "bg-green-100 text-green-800",
      investigating: "bg-yellow-100 text-yellow-800",
      open: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const QualityMetricCard = ({
    title,
    value,
    target,
    unit,
    icon: Icon,
    status,
  }: any) => {
    const percentage = target ? (value / target) * 100 : 0;
    const isOnTarget = Math.abs(value - target) <= target * 0.02; // Within 2%

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Icon
              className={`w-6 h-6 ${isOnTarget ? "text-green-600" : "text-yellow-600"}`}
            />
            <Badge
              className={getStatusColor(isOnTarget ? "normal" : "warning")}
            >
              {isOnTarget
                ? language === "el"
                  ? "Στόχος"
                  : "On Target"
                : language === "el"
                  ? "Προσοχή"
                  : "Attention"}
            </Badge>
          </div>

          <div className="mb-3">
            <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
            <div className="text-3xl font-bold text-gray-900">
              {value.toFixed(1)}
              {unit}
            </div>
          </div>

          {target && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {language === "el" ? "Στόχος:" : "Target:"} {target}
                  {unit}
                </span>
                <span>{percentage.toFixed(0)}%</span>
              </div>
              <Progress value={Math.min(percentage, 100)} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const TemperatureMonitorWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <Thermometer className="w-4 h-4 mr-2 text-blue-600" />
            {language === "el"
              ? "Παρακολούθηση Θερμοκρασίας"
              : "Temperature Monitoring"}
          </span>
          <Badge
            className={
              realTimeMonitoring
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }
          >
            {realTimeMonitoring
              ? language === "el"
                ? "Ζωντανά"
                : "Live"
              : language === "el"
                ? "Offline"
                : "Offline"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {qualityData.temperature.locations.map((location) => (
          <div
            key={location.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="font-medium text-sm">{location.name}</div>
              <div className="text-xs text-gray-500">
                {language === "el" ? "Στόχος:" : "Target:"}{" "}
                {location.id === "freezer"
                  ? "-18°C"
                  : location.id === "processing"
                    ? "4°C"
                    : "2°C"}
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-lg font-bold ${
                  location.status === "normal"
                    ? "text-green-600"
                    : location.status === "warning"
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {location.temp}°C
              </div>
              <div
                className={`w-3 h-3 rounded-full mx-auto ${
                  location.status === "normal"
                    ? "bg-green-500"
                    : location.status === "warning"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const ComplianceStatusWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Shield className="w-4 h-4 mr-2 text-green-600" />
          {language === "el" ? "Κατάσταση Συμμόρφωσης" : "Compliance Status"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(qualityData.compliance).map(
          ([standard, data]: [string, any]) => (
            <div
              key={standard}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div>
                <div className="font-medium text-sm uppercase">{standard}</div>
                <div className="text-xs text-gray-500">
                  {language === "el" ? "Επόμενος έλεγχος:" : "Next audit:"}{" "}
                  {formatDate(new Date(data.nextAudit))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{data.score}%</div>
                <Badge className={getStatusColor(data.status)}>
                  {data.status === "compliant"
                    ? language === "el"
                      ? "Συμμορφώνεται"
                      : "Compliant"
                    : language === "el"
                      ? "Μη συμμόρφωση"
                      : "Non-compliant"}
                </Badge>
              </div>
            </div>
          ),
        )}
      </CardContent>
    </Card>
  );

  const QualityIssuesWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
            {language === "el" ? "Ζητήματα Ποιότητας" : "Quality Issues"}
          </span>
          <Badge variant="secondary">{qualityData.issues.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {qualityData.issues.map((issue) => (
          <div key={issue.id} className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    issue.severity === "critical"
                      ? "bg-red-500"
                      : issue.severity === "high"
                        ? "bg-orange-500"
                        : issue.severity === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                  }`}
                />
                <span className="font-medium text-sm">{issue.description}</span>
              </div>
              <Badge className={getStatusColor(issue.status)}>
                {issue.status}
              </Badge>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>
                {language === "el" ? "Batch:" : "Batch:"} {issue.batch}
              </div>
              <div>
                {language === "el" ? "Ανατέθηκε σε:" : "Assigned to:"}{" "}
                {issue.assignedTo}
              </div>
              <div>{issue.timestamp.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const TestingOverviewWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <TestTube className="w-4 h-4 mr-2 text-purple-600" />
          {language === "el" ? "Επισκόπηση Ελέγχων" : "Testing Overview"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(qualityData.testing).map(
          ([type, data]: [string, any]) => (
            <div key={type} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium capitalize">{type}</span>
                <span className="text-xs text-gray-500">
                  {data.passed + data.failed + data.pending}{" "}
                  {language === "el" ? "έλεγχοι" : "tests"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="font-bold text-green-600">{data.passed}</div>
                  <div>{language === "el" ? "Πέρασαν" : "Passed"}</div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <div className="font-bold text-red-600">{data.failed}</div>
                  <div>{language === "el" ? "Απέτυχαν" : "Failed"}</div>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded">
                  <div className="font-bold text-yellow-600">
                    {data.pending}
                  </div>
                  <div>{language === "el" ? "Εκκρεμείς" : "Pending"}</div>
                </div>
              </div>
              {data.lastFailure && (
                <div className="text-xs text-gray-500">
                  {language === "el" ? "Τελευταία αποτυχία:" : "Last failure:"}{" "}
                  {data.lastFailure}
                </div>
              )}
            </div>
          ),
        )}
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
              ? "Κέντρο Ποιότητας & Συμμόρφωσης"
              : "Quality & Compliance Center"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Διαχείριση ποιότητας και κανονιστική συμμόρφωση"
              : "Quality management and regulatory compliance"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity
              className={`w-3 h-3 mr-1 ${realTimeMonitoring ? "text-green-600 animate-pulse" : "text-gray-400"}`}
            />
            {realTimeMonitoring
              ? language === "el"
                ? "Ζωντανή Παρακολούθηση"
                : "Live Monitoring"
              : language === "el"
                ? "Offline"
                : "Offline"}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setRealTimeMonitoring(!realTimeMonitoring)}
          >
            <Radio className="w-4 h-4 mr-2" />
            {realTimeMonitoring
              ? language === "el"
                ? "Παύση"
                : "Pause"
              : language === "el"
                ? "Έναρξη"
                : "Start"}
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Αναφορά" : "Report"}
          </Button>
        </div>
      </div>

      {/* Key Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QualityMetricCard
          title={language === "el" ? "Συνολική Ποιότητα" : "Overall Quality"}
          value={qualityData.overview.overallScore}
          target={qualityData.overview.target}
          unit="%"
          icon={Award}
          status="normal"
        />
        <QualityMetricCard
          title={language === "el" ? "Ποσοστό Επιτυχίας" : "Pass Rate"}
          value={qualityData.overview.passRate}
          target={95.0}
          unit="%"
          icon={CheckCircle}
          status="normal"
        />
        <QualityMetricCard
          title={language === "el" ? "Έλεγχοι Σήμερα" : "Checks Today"}
          value={qualityData.dailyChecks.total}
          target={50}
          unit=""
          icon={Clipboard}
          status="normal"
        />
        <QualityMetricCard
          title={language === "el" ? "Συμμόρφωση" : "Compliance"}
          value={96.2}
          target={95.0}
          unit="%"
          icon={Shield}
          status="normal"
        />
      </div>

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
          <TabsTrigger value="monitoring">
            {language === "el" ? "Παρακολούθηση" : "Monitoring"}
          </TabsTrigger>
          <TabsTrigger value="testing">
            {language === "el" ? "Έλεγχοι" : "Testing"}
          </TabsTrigger>
          <TabsTrigger value="compliance">
            {language === "el" ? "Συμμόρφωση" : "Compliance"}
          </TabsTrigger>
          <TabsTrigger value="audits">
            {language === "el" ? "Έλεγχοι" : "Audits"}
          </TabsTrigger>
          <TabsTrigger value="training">
            {language === "el" ? "Εκπαίδευση" : "Training"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main overview area */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    {language === "el" ? "Τάσεις Ποιότητας" : "Quality Trends"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Γράφημα τάσεων ποιότητας"
                          : "Quality trends chart"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Check Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClipboardCheck className="w-5 h-5 mr-2 text-green-600" />
                    {language === "el"
                      ? "Ημερήσια Σύνοψη Ελέγχων"
                      : "Daily Check Summary"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <div className="text-2xl font-bold text-green-600">
                        {qualityData.dailyChecks.passed}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === "el" ? "Πέρασαν" : "Passed"}
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      <div className="text-2xl font-bold text-red-600">
                        {qualityData.dailyChecks.failed}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === "el" ? "Απέτυχαν" : "Failed"}
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                      <div className="text-2xl font-bold text-yellow-600">
                        {qualityData.dailyChecks.pending}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === "el" ? "Εκκρεμείς" : "Pending"}
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="text-2xl font-bold text-purple-600">
                        {qualityData.dailyChecks.critical}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === "el" ? "Κρίσιμα" : "Critical"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right sidebar widgets */}
            <div className="space-y-6">
              <TemperatureMonitorWidget />
              <ComplianceStatusWidget />
              <QualityIssuesWidget />
              <TestingOverviewWidget />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el"
                  ? "Πραγματικός Χρόνος Παρακολούθησης"
                  : "Real-time Monitoring"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Monitor className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Παρακολούθηση σε πραγματικό χρόνο όλων των παραμέτρων"
                      : "Real-time monitoring of all parameters"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TestTube className="w-5 h-5 mr-2 text-purple-600" />
                {language === "el"
                  ? "Εργαστηριακοί Έλεγχοι"
                  : "Laboratory Testing"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <TestTube className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Διαχείριση εργαστηριακών ελέγχων και αποτελεσμάτων"
                      : "Laboratory testing management and results"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                {language === "el"
                  ? "Διαχείριση Συμμόρφωσης"
                  : "Compliance Management"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Shield className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Διαχείριση κανονιστικής συμμόρφωσης και πιστοποιήσεων"
                      : "Regulatory compliance and certification management"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-orange-600" />
                {language === "el"
                  ? "Προγραμματισμός Ελέγχων"
                  : "Audit Scheduling"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Eye className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Προγραμματισμός και διαχείριση εσωτερικών και εξωτερικών ελέγχων"
                      : "Internal and external audit scheduling and management"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el" ? "Εκπαίδευση Προσωπικού" : "Staff Training"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <BookOpen className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Διαχείριση εκπαίδευσης και πιστοποίησης προσωπικού"
                      : "Staff training and certification management"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QualityComplianceCenter;
