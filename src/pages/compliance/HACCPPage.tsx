import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  Shield,
  FileText,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Clock,
  Target,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { complianceAPI } from "@/api/compliance";
import { ComplianceStats } from "@/types/compliance";
import HazardList from "@/components/compliance/HazardList";
import CCPList from "@/components/compliance/CCPList";
import AuditTrail from "@/components/compliance/AuditTrail";

const HACCPPage: React.FC = () => {
  const { language } = useLanguage();
  const [stats, setStats] = useState<ComplianceStats | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const data = complianceAPI.stats.get();
    setStats(data);
  };

  const getComplianceStatus = (score: number) => {
    if (score >= 90)
      return {
        status: "excellent",
        color: "text-green-600",
        bgColor: "bg-green-50",
      };
    if (score >= 75)
      return { status: "good", color: "text-blue-600", bgColor: "bg-blue-50" };
    if (score >= 60)
      return {
        status: "fair",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      };
    return { status: "poor", color: "text-red-600", bgColor: "bg-red-50" };
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      excellent: language === "el" ? "Άριστη" : "Excellent",
      good: language === "el" ? "Καλή" : "Good",
      fair: language === "el" ? "Μέτρια" : "Fair",
      poor: language === "el" ? "Κακή" : "Poor",
    };
    return labels[status as keyof typeof labels] || status;
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">
            {language === "el" ? "Φόρτωση..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  const complianceStatus = getComplianceStatus(stats.complianceScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            {language === "el" ? "Μονάδα HACCP" : "HACCP Module"}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === "el"
              ? "Διαχείριση συστήματος HACCP και κρίσιμων σημείων ελέγχου"
              : "HACCP system management and critical control points"}
          </p>
        </div>
        <Badge
          variant="outline"
          className={`${complianceStatus.color} ${complianceStatus.bgColor} border text-lg px-4 py-2`}
        >
          {getStatusLabel(complianceStatus.status)}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="hazards" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {language === "el" ? "Κίνδυνοι" : "Hazards"}
          </TabsTrigger>
          <TabsTrigger value="ccps" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            CCP
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {language === "el" ? "Ιχνηλάτης" : "Audit Trail"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overall Compliance Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {language === "el"
                  ? "Συνολική Συμμόρφωση HACCP"
                  : "Overall HACCP Compliance"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {stats.complianceScore}%
                  </div>
                  <div className={`text-sm ${complianceStatus.color}`}>
                    {getStatusLabel(complianceStatus.status)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {stats.complianceScore >= 75 ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500" />
                  )}
                </div>
              </div>
              <Progress value={stats.complianceScore} className="w-full" />
              <p className="text-sm text-gray-600 mt-2">
                {language === "el"
                  ? "Βάσει συμμόρφωσης των κρίσιμων σημείων ελέγχου"
                  : "Based on Critical Control Point compliance"}
              </p>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === "el"
                        ? "Ενεργοί Κίνδυνοι"
                        : "Active Hazards"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.activeHazards}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {stats.criticalHazards}{" "}
                  {language === "el" ? "κρίσιμοι" : "critical"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === "el" ? "Συνολικά CCP" : "Total CCPs"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalCCPs}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {stats.compliantCCPs}{" "}
                  {language === "el" ? "συμμορφώνονται" : "compliant"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === "el" ? "Μη Συμμορφούμενα" : "Non-Compliant"}
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {stats.nonCompliantCCPs}
                    </p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {language === "el"
                    ? "Απαιτείται ενέργεια"
                    : "Action required"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === "el"
                        ? "Εκκρεμείς Έλεγχοι"
                        : "Pending Audits"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.pendingAudits}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {language === "el" ? "Προγραμματισμένοι" : "Scheduled"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          {stats.nonCompliantCCPs > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {language === "el"
                  ? `Υπάρχουν ${stats.nonCompliantCCPs} μη συμμορφούμενα κρίσιμα σημεία ελέγχου που απαιτούν άμεση προσοχή.`
                  : `There are ${stats.nonCompliantCCPs} non-compliant Critical Control Points requiring immediate attention.`}
              </AlertDescription>
            </Alert>
          )}

          {/* HACCP Principles Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {language === "el" ? "Αρχές HACCP" : "HACCP Principles"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    principle: 1,
                    title:
                      language === "el"
                        ? "Ανάλυση Κινδύνων"
                        : "Hazard Analysis",
                    description:
                      language === "el"
                        ? "Εντοπισμός και αξιολόγηση κινδύνων"
                        : "Identify and assess hazards",
                  },
                  {
                    principle: 2,
                    title:
                      language === "el"
                        ? "Κρίσιμα Σημεία Ελέγχου"
                        : "Critical Control Points",
                    description:
                      language === "el"
                        ? "Προσδιορισμός CCP για τον έλεγχο κινδύνων"
                        : "Determine CCPs to control hazards",
                  },
                  {
                    principle: 3,
                    title:
                      language === "el" ? "Κρίσιμα Όρια" : "Critical Limits",
                    description:
                      language === "el"
                        ? "Καθορισμός μετρήσιμων ορίων"
                        : "Establish measurable limits",
                  },
                  {
                    principle: 4,
                    title: language === "el" ? "Παρακολούθηση" : "Monitoring",
                    description:
                      language === "el"
                        ? "Συστήματα παρακολούθησης CCP"
                        : "Monitoring systems for CCPs",
                  },
                  {
                    principle: 5,
                    title:
                      language === "el"
                        ? "Διορθωτικές Ενέργειες"
                        : "Corrective Actions",
                    description:
                      language === "el"
                        ? "Ενέργειες όταν τα όρια παραβιάζονται"
                        : "Actions when limits are exceeded",
                  },
                  {
                    principle: 6,
                    title: language === "el" ? "Επαλήθευση" : "Verification",
                    description:
                      language === "el"
                        ? "Επιβεβαίωση λειτουργίας συστήματος"
                        : "Confirm system effectiveness",
                  },
                  {
                    principle: 7,
                    title:
                      language === "el" ? "Τήρηση Αρχείων" : "Record Keeping",
                    description:
                      language === "el"
                        ? "Τεκμηρίωση και αρχειοθέτηση"
                        : "Documentation and filing",
                  },
                ].map((item) => (
                  <div key={item.principle} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {item.principle}
                      </div>
                      <h4 className="font-semibold">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hazards">
          <HazardList />
        </TabsContent>

        <TabsContent value="ccps">
          <CCPList />
        </TabsContent>

        <TabsContent value="audit">
          <AuditTrail />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HACCPPage;
