import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  HelpCircle,
  BookOpen,
  Calculator,
  FileText,
  BarChart3,
  DollarSign,
  Target,
  Truck,
  Factory,
  PieChart,
  TrendingUp,
  Download,
  Settings,
  Users,
  AlertCircle,
  CheckCircle,
  Info,
  Lightbulb,
  Play,
  X,
} from "lucide-react";

interface UserGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserGuide: React.FC<UserGuideProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen) return null;

  const sections = {
    overview: {
      title: language === "el" ? "Γενική Επισκόπηση" : "Overview",
      icon: BookOpen,
      content:
        language === "el"
          ? {
              title: "Καλώς ήρθατε στο KostoPro Enhanced",
              subtitle:
                "Επαγγελματικό Σύστημα Κοστολόγησης Αλιευτικών Προϊόντων",
              description:
                "Το KostoPro είναι μια προηγμένη εφαρμογή κοστολόγησης σχεδιασμένη ειδικά για τη βιομηχανία των θαλασσινών. Παρέχει ακριβείς υπολογισμούς κόστους, ανάλυση κερδοφορίας και λεπτομερείς αναφορές.",
              features: [
                "Υπολογισμός συνολικού κόστους προϊόντος",
                "Ανάλυση περιθωρίων κέρδους",
                "Διαχείριση φάσεων επεξεργασίας",
                "Υπολογισμός απωλειών και glazing",
                "Ανάλυση κόστους μεταφοράς",
                "Επαγγελματικές αναφορές PDF",
                "Export δεδομένων σε Excel/CSV",
                "Έξυπνες συμβουλές βελτίωσης",
              ],
              keyBenefits: [
                "Αυξημένη ακρίβεια κοστολόγησης",
                "Βελτιωμένη κερδοφορία",
                "Γρήγορη λήψη αποφάσεων",
                "Επαγγελματικός έλεγχος κόστους",
              ],
            }
          : {
              title: "Welcome to KostoPro Enhanced",
              subtitle: "Professional Seafood Costing System",
              description:
                "KostoPro is an advanced costing application designed specifically for the seafood industry. It provides accurate cost calculations, profitability analysis, and detailed reporting.",
              features: [
                "Calculate total product cost",
                "Profit margin analysis",
                "Processing phases management",
                "Loss and glazing calculations",
                "Transport cost analysis",
                "Professional PDF reports",
                "Export data to Excel/CSV",
                "Smart improvement insights",
              ],
              keyBenefits: [
                "Increased costing accuracy",
                "Improved profitability",
                "Quick decision making",
                "Professional cost control",
              ],
            },
    },
    basics: {
      title: language === "el" ? "Βασικά Στοιχεία" : "Basic Information",
      icon: Calculator,
      content:
        language === "el"
          ? {
              title: "Πληροφορίες Προϊόντος",
              fields: [
                {
                  name: "Όνομα Προϊόντος",
                  description:
                    "Εισάγετε το όνομα του προϊόντος που κοστολογείτε (π.χ. 'Θράψαλο Block Αργεντίνης')",
                  required: true,
                },
                {
                  name: "Τύπος Προϊόντος",
                  description:
                    "Επιλέξτε κατηγορία: Ψάρι, Οστρακοειδή, Κεφαλόποδα, ή Επεξεργασμένο",
                  required: true,
                },
                {
                  name: "Βάρος (kg)",
                  description:
                    "Το βάρος ανά τεμάχιο σε κιλά. Για παράδειγμα, αν έχετε blocks των 10kg, εισάγετε 10",
                  required: true,
                },
                {
                  name: "Ποσότητα",
                  description:
                    "Πόσα τεμάχια θα επεξεργαστείτε (π.χ. 200 blocks = 2 τόνοι)",
                  required: true,
                },
                {
                  name: "Τιμή Αγοράς (€/kg)",
                  description: "Η τιμή που αγοράσατε το προϊόν ανά κιλό",
                  required: true,
                },
                {
                  name: "Στοχευμένη Τιμή Πώλησης (€/kg)",
                  description:
                    "Η τιμή που θέλετε να πουλήσετε το προϊόν ανά κιλό",
                  required: true,
                },
              ],
              tips: [
                "Εισάγετε πάντα ακριβή στοιχεία για καλύτερους υπολογισμούς",
                "Το βάρος αναφέρεται στο αρχικό βάρος πριν την επεξεργασία",
                "Η τιμή αγοράς πρέπει να περιλαμβάνει τυχόν επιπρόσθετα κόστη",
                "Η στοχευμένη τιμή μπορεί να αλλάξει βάσει της ανάλυσης",
              ],
            }
          : {
              title: "Product Information",
              fields: [
                {
                  name: "Product Name",
                  description:
                    "Enter the name of the product you're costing (e.g. 'Hake Block Argentina')",
                  required: true,
                },
                {
                  name: "Product Type",
                  description:
                    "Select category: Fish, Shellfish, Cephalopods, or Processed",
                  required: true,
                },
                {
                  name: "Weight (kg)",
                  description:
                    "Weight per piece in kg. For example, if you have 10kg blocks, enter 10",
                  required: true,
                },
                {
                  name: "Quantity",
                  description:
                    "How many pieces will you process (e.g. 200 blocks = 2 tons)",
                  required: true,
                },
                {
                  name: "Purchase Price (€/kg)",
                  description: "The price you bought the product per kg",
                  required: true,
                },
                {
                  name: "Target Selling Price (€/kg)",
                  description: "The price you want to sell the product per kg",
                  required: true,
                },
              ],
              tips: [
                "Always enter accurate data for better calculations",
                "Weight refers to initial weight before processing",
                "Purchase price should include any additional costs",
                "Target price can be adjusted based on analysis",
              ],
            },
    },
    processing: {
      title: language === "el" ? "Επεξεργασία" : "Processing",
      icon: Factory,
      content:
        language === "el"
          ? {
              title: "Φάσεις Επεξεργασίας & Απώλειες",
              description:
                "Διαχειριστείτε τις φάσεις ��πεξεργασίας του προϊόντος σας και υπολογίστε τις απώλειες με ακρίβεια.",
              phases: [
                {
                  name: "Φάσεις Επεξεργασίας",
                  description:
                    "Προσθέστε κάθε βήμα επεξεργασίας (π.χ. καθάρισμα, φιλετάρισμα)",
                  fields: [
                    "Όνομα φάσης",
                    "Ποσοστό απώλειας (%)",
                    "Κόστος/kg",
                    "Διάρκεια",
                    "Θερμοκρασία",
                  ],
                },
                {
                  name: "Γενικές Απώλειες",
                  description:
                    "Απώλειες που δεν σχετίζονται με συγκεκριμένη φάση (π.χ. μεταφορά, αποθήκευση)",
                  fields: ["Ποσοστό γενικών απωλειών (%)"],
                },
                {
                  name: "Glazing",
                  description:
                    "Προσθήκη πάγου ή νερού για προστασία του προϊόντος",
                  fields: ["Ποσοστό glazing (%)", "Τύπος glazing (πάγος/νερό)"],
                },
              ],
              examples: [
                "Καθάρισμα ψαριού: 20% απώλεια",
                "Φιλετάρισμα: 30% απώλεια",
                "Glazing: 15% προσθήκη βάρους",
              ],
              calculations: [
                "Αρχικό Βάρος: 2000kg (200 x 10kg)",
                "Μετά καθάρισμα: 1600kg (-20%)",
                "Μετά glazing: 1840kg (+15%)",
                "Καθαρό βάρος για πώληση: 1840kg",
              ],
            }
          : {
              title: "Processing Phases & Losses",
              description:
                "Manage your product processing phases and calculate losses accurately.",
              phases: [
                {
                  name: "Processing Phases",
                  description:
                    "Add each processing step (e.g. cleaning, filleting)",
                  fields: [
                    "Phase name",
                    "Loss percentage (%)",
                    "Cost/kg",
                    "Duration",
                    "Temperature",
                  ],
                },
                {
                  name: "General Losses",
                  description:
                    "Losses not related to specific phase (e.g. transport, storage)",
                  fields: ["General loss percentage (%)"],
                },
                {
                  name: "Glazing",
                  description:
                    "Addition of ice or water for product protection",
                  fields: [
                    "Glazing percentage (%)",
                    "Glazing type (ice/water)",
                  ],
                },
              ],
              examples: [
                "Fish cleaning: 20% loss",
                "Filleting: 30% loss",
                "Glazing: 15% weight addition",
              ],
              calculations: [
                "Initial Weight: 2000kg (200 x 10kg)",
                "After cleaning: 1600kg (-20%)",
                "After glazing: 1840kg (+15%)",
                "Net weight for sale: 1840kg",
              ],
            },
    },
    costs: {
      title: language === "el" ? "Κόστη" : "Costs",
      icon: DollarSign,
      content:
        language === "el"
          ? {
              title: "Διαχείριση Κόστων",
              description:
                "Καταγράψτε όλα τα άμεσα και έμμεσα κόστη για ακριβή κοστολόγηση.",
              costTypes: [
                {
                  type: "Άμεσα Κόστη",
                  description: "Κόστη που σχετίζονται άμεσα με την παραγωγή",
                  examples: [
                    "Πρώτες ύλες",
                    "Εργατικά",
                    "Ενέργεια",
                    "Συσκευασία",
                    "Αναλώσιμα",
                  ],
                },
                {
                  type: "Έμμεσα Κόστη",
                  description: "Γενικά έξοδα που κατανέμονται στο προϊόν",
                  examples: [
                    "Γενικά έξοδα",
                    "Αποσβέσεις",
                    "Ασφάλιστρα",
                    "Ενοίκια",
                    "Διοίκηση",
                  ],
                },
                {
                  type: "Κόστη Μεταφοράς",
                  description:
                    "Όλα τα κόστη μεταφοράς από προμηθευτή έως πελάτη",
                  examples: [
                    "Καύσιμα",
                    "Διόδια",
                    "Μισθός οδηγού",
                    "Ασφάλιση μεταφοράς",
                    "Φορτοεκφόρτωση",
                  ],
                },
              ],
              tips: [
                "Συμπεριλάβετε όλα τα κόστη, ακόμα και τα μικρά",
                "Κατανείμετε τα σταθερά κόστη ανάλογα με την παραγωγή",
                "Ενημερώνετε τακτικά τις τιμές καυσίμων και ενέργειας",
                "Μην ξεχάσετε τα κόστη αποθήκευσης και διαχείρισης",
              ],
              bestPractices: [
                "Χρησιμοποιήστε ιστορικά δεδομένα για ακρίβεια",
                "Προσθέστε 5-10% για απρόβλεπτα κόστη",
                "Ελέγχετε τακτικά τις τιμές προμηθευτών",
                "Τηρείτε αρχείο όλων των παραστατικών",
              ],
            }
          : {
              title: "Cost Management",
              description:
                "Record all direct and indirect costs for accurate costing.",
              costTypes: [
                {
                  type: "Direct Costs",
                  description: "Costs directly related to production",
                  examples: [
                    "Raw materials",
                    "Labor",
                    "Energy",
                    "Packaging",
                    "Consumables",
                  ],
                },
                {
                  type: "Indirect Costs",
                  description: "Overhead expenses allocated to the product",
                  examples: [
                    "General expenses",
                    "Depreciation",
                    "Insurance",
                    "Rent",
                    "Administration",
                  ],
                },
                {
                  type: "Transport Costs",
                  description: "All transport costs from supplier to customer",
                  examples: [
                    "Fuel",
                    "Tolls",
                    "Driver salary",
                    "Transport insurance",
                    "Loading/unloading",
                  ],
                },
              ],
              tips: [
                "Include all costs, even small ones",
                "Allocate fixed costs according to production",
                "Update fuel and energy prices regularly",
                "Don't forget storage and handling costs",
              ],
              bestPractices: [
                "Use historical data for accuracy",
                "Add 5-10% for unexpected costs",
                "Check supplier prices regularly",
                "Keep records of all invoices",
              ],
            },
    },
    analysis: {
      title: language === "el" ? "Ανάλυση" : "Analysis",
      icon: BarChart3,
      content:
        language === "el"
          ? {
              title: "Ανάλυση Αποτελεσμάτων",
              description:
                "Κατανοήστε τα αποτελέσματα της κοστολόγησης και τις βασικές μετρήσεις.",
              metrics: [
                {
                  name: "Συνολικό Κόστος",
                  description:
                    "Το συνολικό κόστος παραγωγής συμπεριλαμβανομένων όλων των εξόδων",
                  formula:
                    "Πρώτες ύλες + Εργατικά + Επεξεργασία + Μεταφορά + Γενικά έξοδα",
                },
                {
                  name: "Κόστος ανά kg",
                  description: "Το κόστος παραγωγής ανά κιλό καθαρού προϊόντος",
                  formula: "Συνολικό κόστος ÷ Καθαρό βάρος",
                },
                {
                  name: "Περιθώριο Κέρδους",
                  description: "Το ποσοστό κέρδους επί των εσόδων",
                  formula: "(Έσοδα - Κόστος) ÷ Έσοδα × 100%",
                },
                {
                  name: "Break-even Τιμή",
                  description: "Η ελάχιστη τιμή πώλησης για μηδενικό κέρδος",
                  formula: "Συνολικό κόστος ÷ Καθαρό βάρος",
                },
              ],
              insights: [
                "Περιθώριο > 20%: Εξαιρετική κερδοφορία",
                "Περιθώριο 10-20%: Καλή κερδοφορία",
                "Περιθώριο < 10%: Χαμηλή κερδοφορία",
                "Απώλειες > 25%: Χρειάζεται βελτίωση",
              ],
            }
          : {
              title: "Results Analysis",
              description: "Understand costing results and key metrics.",
              metrics: [
                {
                  name: "Total Cost",
                  description: "Total production cost including all expenses",
                  formula:
                    "Raw materials + Labor + Processing + Transport + Overhead",
                },
                {
                  name: "Cost per kg",
                  description: "Production cost per kg of net product",
                  formula: "Total cost ÷ Net weight",
                },
                {
                  name: "Profit Margin",
                  description: "Percentage of profit on revenue",
                  formula: "(Revenue - Cost) ÷ Revenue × 100%",
                },
                {
                  name: "Break-even Price",
                  description: "Minimum selling price for zero profit",
                  formula: "Total cost ÷ Net weight",
                },
              ],
              insights: [
                "Margin > 20%: Excellent profitability",
                "Margin 10-20%: Good profitability",
                "Margin < 10%: Low profitability",
                "Losses > 25%: Needs improvement",
              ],
            },
    },
    export: {
      title: language === "el" ? "Εξαγωγή" : "Export",
      icon: Download,
      content:
        language === "el"
          ? {
              title: "Εξαγωγή Δεδομένων & Αναφορών",
              description:
                "Δημιουργήστε επαγγελματικές αναφορές και εξάγετε δεδομένα.",
              exportTypes: [
                {
                  type: "PDF Αναφορά",
                  description:
                    "Πλήρης επαγγελματική αναφορά με όλα τα στοιχεία",
                  includes: [
                    "Στοιχεία προϊόντος",
                    "Ανάλυση κόστους",
                    "Φάσεις επεξεργασίας",
                    "Οικονομικά αποτελέσματα",
                    "Συστάσεις βελτίωσης",
                    "Υπογραφές & εγκρίσεις",
                  ],
                },
                {
                  type: "Excel Export",
                  description:
                    "Δεδομένα σε μορφή spreadsheet για περαιτέρω ανάλυση",
                  includes: [
                    "Φύλλο συνοπτικών στοιχείων",
                    "Φύλλο κόστων",
                    "Φύλλο επεξεργασίας",
                    "Φορμαρισμένα κελιά",
                    "Τύποι υπολογισμού",
                  ],
                },
                {
                  type: "CSV Export",
                  description: "Απλή μορφή για import σε άλλα συστήματα",
                  includes: [
                    "UTF-8 encoding για ελληνικά",
                    "Όλα τα βασικά δεδομένα",
                    "Συμβατό με Excel",
                  ],
                },
              ],
              tips: [
                "Οι αναφορές PDF είναι ιδανικές για παρουσιάσεις",
                "Χρησιμοποιήστε Excel για περαιτέρω ανάλυση",
                "Το CSV είναι καλό για εισαγωγή σε ERP συστήματα",
                "Όλες οι εξαγωγές υποστηρίζουν ελληνικά",
              ],
            }
          : {
              title: "Data Export & Reports",
              description: "Create professional reports and export data.",
              exportTypes: [
                {
                  type: "PDF Report",
                  description: "Complete professional report with all details",
                  includes: [
                    "Product information",
                    "Cost analysis",
                    "Processing phases",
                    "Financial results",
                    "Improvement recommendations",
                    "Signatures & approvals",
                  ],
                },
                {
                  type: "Excel Export",
                  description:
                    "Data in spreadsheet format for further analysis",
                  includes: [
                    "Summary sheet",
                    "Costs sheet",
                    "Processing sheet",
                    "Formatted cells",
                    "Calculation formulas",
                  ],
                },
                {
                  type: "CSV Export",
                  description: "Simple format for import to other systems",
                  includes: [
                    "UTF-8 encoding for Greek",
                    "All basic data",
                    "Excel compatible",
                  ],
                },
              ],
              tips: [
                "PDF reports are ideal for presentations",
                "Use Excel for further analysis",
                "CSV is good for ERP system imports",
                "All exports support Greek characters",
              ],
            },
    },
  };

  const currentSection = sections[activeTab as keyof typeof sections];
  const Icon = currentSection.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="w-6 h-6" />
              <span>
                {language === "el"
                  ? "Οδηγός Χρήσης KostoPro"
                  : "KostoPro User Guide"}
              </span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-hidden">
          <div className="flex h-[calc(90vh-120px)]">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-gray-50 border-r overflow-y-auto">
              <div className="p-4 space-y-2">
                {Object.entries(sections).map(([key, section]) => {
                  const SectionIcon = section.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        activeTab === key
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <SectionIcon className="w-5 h-5" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentSection.title}
                    </h2>
                    {"subtitle" in currentSection.content && (
                      <p className="text-gray-600">
                        {currentSection.content.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Overview Section */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-blue-800 mb-4">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          {language === "el"
                            ? "Βασικά Χαρακτηριστικά"
                            : "Key Features"}
                        </h4>
                        <ul className="space-y-2">
                          {currentSection.content.features.map(
                            (feature: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          {language === "el" ? "Βασικά Οφέλη" : "Key Benefits"}
                        </h4>
                        <ul className="space-y-2">
                          {currentSection.content.keyBenefits.map(
                            (benefit: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Basics Section */}
                {activeTab === "basics" && (
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {currentSection.content.fields.map(
                        (field: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {field.name}
                              </h4>
                              {field.required && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  {language === "el"
                                    ? "Υποχρεωτικό"
                                    : "Required"}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">
                              {field.description}
                            </p>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        {language === "el"
                          ? "Χρήσιμες Συμβουλές"
                          : "Helpful Tips"}
                      </h4>
                      <ul className="space-y-1">
                        {currentSection.content.tips.map(
                          (tip: string, index: number) => (
                            <li key={index} className="text-yellow-800 text-sm">
                              • {tip}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Processing Section */}
                {activeTab === "processing" && (
                  <div className="space-y-6">
                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-purple-800">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {currentSection.content.phases.map(
                        (phase: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {phase.name}
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              {phase.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {phase.fields.map(
                                (field: string, fieldIndex: number) => (
                                  <Badge
                                    key={fieldIndex}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {field}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          {language === "el" ? "Παραδείγματα" : "Examples"}
                        </h4>
                        <ul className="space-y-1">
                          {currentSection.content.examples.map(
                            (example: string, index: number) => (
                              <li key={index} className="text-blue-800 text-sm">
                                • {example}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2">
                          {language === "el" ? "Υπολογισμοί" : "Calculations"}
                        </h4>
                        <ul className="space-y-1">
                          {currentSection.content.calculations.map(
                            (calc: string, index: number) => (
                              <li
                                key={index}
                                className="text-green-800 text-sm"
                              >
                                • {calc}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other sections follow similar pattern... */}
                {activeTab === "costs" && (
                  <div className="space-y-6">
                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h3 className="text-lg font-semibold text-orange-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-orange-800">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {currentSection.content.costTypes.map(
                        (costType: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {costType.type}
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              {costType.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {costType.examples.map(
                                (example: string, exIndex: number) => (
                                  <Badge
                                    key={exIndex}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {example}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          {language === "el" ? "Συμβουλές" : "Tips"}
                        </h4>
                        <ul className="space-y-1">
                          {currentSection.content.tips.map(
                            (tip: string, index: number) => (
                              <li key={index} className="text-blue-800 text-sm">
                                • {tip}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          {language === "el"
                            ? "Καλές Πρακτικές"
                            : "Best Practices"}
                        </h4>
                        <ul className="space-y-1">
                          {currentSection.content.bestPractices.map(
                            (practice: string, index: number) => (
                              <li
                                key={index}
                                className="text-green-800 text-sm"
                              >
                                • {practice}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Analysis Section */}
                {activeTab === "analysis" && (
                  <div className="space-y-6">
                    <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                      <h3 className="text-lg font-semibold text-indigo-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-indigo-800">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {currentSection.content.metrics.map(
                        (metric: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {metric.name}
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              {metric.description}
                            </p>
                            <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                              {metric.formula}
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        {language === "el"
                          ? "Κλειδιά Ερμηνείας"
                          : "Interpretation Keys"}
                      </h4>
                      <ul className="space-y-1">
                        {currentSection.content.insights.map(
                          (insight: string, index: number) => (
                            <li key={index} className="text-yellow-800 text-sm">
                              • {insight}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Export Section */}
                {activeTab === "export" && (
                  <div className="space-y-6">
                    <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
                      <h3 className="text-lg font-semibold text-teal-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-teal-800">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {currentSection.content.exportTypes.map(
                        (exportType: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {exportType.type}
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              {exportType.description}
                            </p>
                            <div className="bg-gray-50 p-3 rounded">
                              <h5 className="font-medium text-gray-800 mb-2">
                                {language === "el"
                                  ? "Περιλαμβάνει:"
                                  : "Includes:"}
                              </h5>
                              <ul className="space-y-1">
                                {exportType.includes.map(
                                  (item: string, itemIndex: number) => (
                                    <li
                                      key={itemIndex}
                                      className="text-gray-700 text-sm flex items-center gap-2"
                                    >
                                      <CheckCircle className="w-3 h-3 text-green-600" />
                                      {item}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        {language === "el"
                          ? "Συμβουλές Εξαγωγής"
                          : "Export Tips"}
                      </h4>
                      <ul className="space-y-1">
                        {currentSection.content.tips.map(
                          (tip: string, index: number) => (
                            <li key={index} className="text-blue-800 text-sm">
                              • {tip}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGuide;
