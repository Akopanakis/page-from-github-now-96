import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BadgeCheck,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Globe,
  Users,
  Target,
  Award,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { complianceAPI } from "@/api/compliance";
import { ISOStandard } from "@/types/compliance";

const ISOPage: React.FC = () => {
  const { language } = useLanguage();
  const [standards, setStandards] = useState<ISOStandard[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadStandards();
  }, []);

  const loadStandards = () => {
    const data = complianceAPI.iso.get();
    setStandards(data);
  };

  const getComplianceColor = (level: string) => {
    switch (level) {
      case "Full":
        return "bg-green-100 text-green-800 border-green-200";
      case "Partial":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Non-Compliant":
        return "bg-red-100 text-red-800 border-red-200";
      case "Not Assessed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getComplianceIcon = (level: string) => {
    switch (level) {
      case "Full":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Partial":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "Non-Compliant":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "Not Assessed":
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Superseded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateOverallCompliance = () => {
    if (standards.length === 0) return 0;

    const scores = standards.map((standard) => {
      switch (standard.complianceLevel) {
        case "Full":
          return 100;
        case "Partial":
          return 50;
        case "Non-Compliant":
          return 0;
        case "Not Assessed":
          return 0;
        default:
          return 0;
      }
    });

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) / scores.length,
    );
  };

  const overallCompliance = calculateOverallCompliance();

  const isoLinks = [
    {
      code: "ISO 22000:2018",
      title: "Food Safety Management Systems",
      url: "https://www.iso.org/standard/65464.html",
      description:
        language === "el"
          ? "Συστήματα διαχείρισης ασφάλειας τροφίμων - Απαιτήσεις για οποιονδήποτε οργανισμό στην αλυσίδα τροφίμων"
          : "Food safety management systems — Requirements for any organization in the food chain",
    },
    {
      code: "ISO 22005:2007",
      title: "Traceability in the Feed and Food Chain",
      url: "https://www.iso.org/standard/36220.html",
      description:
        language === "el"
          ? "Ιχνηλασιμότητα στην αλυσίδα ζωοτροφών και τροφίμων"
          : "General principles and basic requirements for system design and implementation",
    },
    {
      code: "ISO/TS 22002-1:2009",
      title: "Prerequisite programmes on food safety",
      url: "https://www.iso.org/standard/44001.html",
      description:
        language === "el"
          ? "Προαπαιτούμενα προγράμματα για την ασφάλεια τροφίμων - Μέρος 1: Παραγωγή τροφίμων"
          : "Part 1: Food manufacturing",
    },
    {
      code: "ISO 9001:2015",
      title: "Quality Management Systems",
      url: "https://www.iso.org/standard/62085.html",
      description:
        language === "el"
          ? "Συστήματα διαχείρισης ποιότητας - Απαιτήσεις"
          : "Requirements for quality management systems",
    },
    {
      code: "ISO 14001:2015",
      title: "Environmental Management Systems",
      url: "https://www.iso.org/standard/60857.html",
      description:
        language === "el"
          ? "Συστήματα περιβαλλοντικής διαχείρισης - Απαιτήσεις με οδηγίες για χρήση"
          : "Requirements with guidance for use",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BadgeCheck className="w-8 h-8 text-blue-600" />
            {language === "el" ? "Πρότυπα ISO" : "ISO Standards"}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === "el"
              ? "Διαχείριση και παρακολούθηση συμμόρφωσης με διεθνή πρότυπα"
              : "Management and monitoring of international standards compliance"}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {overallCompliance}%
          </div>
          <div className="text-sm text-gray-600">
            {language === "el" ? "Συνολική Συμμόρφωση" : "Overall Compliance"}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="standards" className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4" />
            {language === "el" ? "Πρότυπα" : "Standards"}
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            {language === "el" ? "Πόροι" : "Resources"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Compliance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {language === "el"
                  ? "Επισκόπηση Συμμόρφωσης"
                  : "Compliance Overview"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {language === "el"
                      ? "Συνολική Πρόοδος"
                      : "Overall Progress"}
                  </span>
                  <span className="text-sm text-gray-600">
                    {overallCompliance}%
                  </span>
                </div>
                <Progress value={overallCompliance} className="w-full" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      standards.filter((s) => s.complianceLevel === "Full")
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === "el" ? "Πλήρη" : "Full Compliance"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {
                      standards.filter((s) => s.complianceLevel === "Partial")
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === "el" ? "Μερική" : "Partial"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {
                      standards.filter(
                        (s) => s.complianceLevel === "Non-Compliant",
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === "el" ? "Μη Συμμόρφωση" : "Non-Compliant"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {
                      standards.filter(
                        (s) => s.complianceLevel === "Not Assessed",
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === "el" ? "Μη Αξιολογημένα" : "Not Assessed"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {language === "el"
                  ? "Χρονοδιάγραμμα Υλοποίησης"
                  : "Implementation Timeline"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {standards.map((standard, index) => (
                  <div
                    key={standard.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Certificate className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{standard.code}</h4>
                      <p className="text-sm text-gray-600">{standard.title}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge className={getStatusColor(standard.status)}>
                          {standard.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getComplianceColor(
                            standard.complianceLevel,
                          )}
                        >
                          {getComplianceIcon(standard.complianceLevel)}
                          <span className="ml-1">
                            {standard.complianceLevel}
                          </span>
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div>
                        {language === "el" ? "Υλοποιήθηκε:" : "Implemented:"}{" "}
                        {new Date(
                          standard.implementationDate,
                        ).toLocaleDateString()}
                      </div>
                      <div>
                        {language === "el"
                          ? "Επόμενη αναθεώρηση:"
                          : "Next review:"}{" "}
                        {new Date(standard.nextReview).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="space-y-6">
          {standards.map((standard) => (
            <Card key={standard.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Certificate className="w-5 h-5" />
                      {standard.code} - {standard.title}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{standard.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(standard.status)}>
                      {standard.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getComplianceColor(standard.complianceLevel)}
                    >
                      {getComplianceIcon(standard.complianceLevel)}
                      <span className="ml-1">{standard.complianceLevel}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {language === "el" ? "Απαιτήσεις" : "Requirements"}
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {standard.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {language === "el" ? "Αποδεικτικά Στοιχεία" : "Evidence"}
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {standard.evidence.map((evidence, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {evidence}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {standard.gaps.length > 0 && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {language === "el"
                        ? "Κενά Συμμόρφωσης"
                        : "Compliance Gaps"}
                    </h4>
                    <ul className="space-y-1 text-sm text-red-700">
                      {standard.gaps.map((gap, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {standard.actions.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      {language === "el" ? "Ενέργειες" : "Actions"}
                    </h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      {standard.actions.map((action, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">
                        {language === "el" ? "Υπεύθυνος:" : "Responsible:"}
                      </span>
                      <span className="ml-2">{standard.responsible}</span>
                    </div>
                    <div>
                      <span className="font-medium">
                        {language === "el" ? "Έκδοση:" : "Version:"}
                      </span>
                      <span className="ml-2">{standard.version}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {language === "el"
                  ? "Επίσημα Πρότυπα ISO"
                  : "Official ISO Standards"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                {language === "el"
                  ? "Παρακάτω βρίσκεται η επίσημη τεκμηρίωση και οι σύνδεσμοι προς τα πρότυπα ISO που σχετίζονται με την ασφάλεια τροφίμων και την ιχνηλασιμότητα."
                  : "Below you will find official documentation and links to ISO standards related to food safety and traceability."}
              </p>

              <div className="space-y-4">
                {isoLinks.map((link, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-600 flex items-center gap-2">
                          <Certificate className="w-4 h-4" />
                          {link.code}
                        </h4>
                        <h5 className="font-medium text-gray-900 mt-1">
                          {link.title}
                        </h5>
                        <p className="text-sm text-gray-600 mt-2">
                          {link.description}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {language === "el" ? "Περισσότερα" : "Learn More"}
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ISO Documentation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {language === "el" ? "Πρόσθετοι Πόροι" : "Additional Resources"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {language === "el"
                      ? "Οδηγός Υλοποίησης"
                      : "Implementation Guide"}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === "el"
                      ? "Βήμα προς βήμα οδηγός για την υλοποίηση προτύπων ISO στην επιχείρησή σας."
                      : "Step-by-step guide for implementing ISO standards in your business."}
                  </p>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    {language === "el" ? "Προβολή Οδηγού" : "View Guide"}
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {language === "el"
                      ? "Φόρμες & Πρότυπα"
                      : "Forms & Templates"}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === "el"
                      ? "Έτοιμες φόρμες και πρότυπα για την τεκμηρίωση συμμόρφωσης."
                      : "Ready-made forms and templates for compliance documentation."}
                  </p>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    {language === "el" ? "Λήψη Προτύπων" : "Download Templates"}
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {language === "el"
                      ? "Εκπαίδευση Προσωπικού"
                      : "Staff Training"}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === "el"
                      ? "Υλικό εκπαίδευσης για την ευαισθητοποίηση του προσωπικού."
                      : "Training materials for staff awareness and compliance."}
                  </p>
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    {language === "el"
                      ? "Υλικό Εκπαίδευσης"
                      : "Training Materials"}
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {language === "el"
                      ? "Εσωτερικοί Έλεγχοι"
                      : "Internal Audits"}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === "el"
                      ? "Εργαλεία και λίστες ελέγχου για εσωτερικούς ελέγχους."
                      : "Tools and checklists for internal auditing processes."}
                  </p>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {language === "el" ? "Εργαλεία Ελέγχου" : "Audit Tools"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ISOPage;
