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
  Star,
  Zap,
  Shield,
  Award,
  Globe,
  Smartphone,
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
                "��πολογισμός συνολικού κόστους προϊόντος",
                "Ανάλυση περιθωρίων κέρδους",
                "Διαχείριση φάσεων επεξεργασίας",
                "Υπολογισμός απωλειών και glazing",
                "Ανάλυση κόστους μεταφοράς",
                "Επαγγελματικές αναφορές PDF",
                "Export δεδομένων σε Excel/CSV",
                "Έξυπνες συμβουλές βελτίωσης",
                "Executive Dashboard με KPIs",
                "Οικονομικοί δείκτες και τάσεις",
                "Διαχείριση αποθεμάτων",
                "Ανάλυση ανταγωνισμού",
                "Πρόβλεψη εσόδων",
                "Οικονομικά μοντέλα NPV/IRR",
                "PWA υποστήριξη offline",
              ],
              keyBenefits: [
                "Αυξημένη ακρίβεια κοστολόγησης",
                "Βελτιωμένη κερδοφορία",
                "Γρήγορη λήψη αποφάσεων",
                "Επαγγελματικός έλεγχος κόστους",
                "Ολοκληρωμένη επιχειρηματική ανάλυση",
                "Έξυπνες προβλέψεις",
                "Ανταγωνιστικό πλεονέκτημα",
              ],
              whatsnew: [
                "🚀 Executive Dashboard με real-time KPIs",
                "📊 Προηγμένη οικονομική ανάλυση",
                "📱 Πλήρως responsive design",
                "🏆 Professional PDF reports",
                "⚡ Βελτιωμένη ταχύτητα",
                "🔒 Enhanced security",
                "🌐 PWA υποστήριξη",
                "🎯 Smart recommendations",
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
                "Executive Dashboard with KPIs",
                "Economic indicators and trends",
                "Inventory management",
                "Competitor analysis",
                "Revenue forecasting",
                "Financial models NPV/IRR",
                "PWA offline support",
              ],
              keyBenefits: [
                "Increased costing accuracy",
                "Improved profitability",
                "Quick decision making",
                "Professional cost control",
                "Comprehensive business analysis",
                "Smart predictions",
                "Competitive advantage",
              ],
              whatsnew: [
                "🚀 Executive Dashboard with real-time KPIs",
                "📊 Advanced financial analysis",
                "📱 Fully responsive design",
                "🏆 Professional PDF reports",
                "⚡ Improved performance",
                "🔒 Enhanced security",
                "🌐 PWA support",
                "🎯 Smart recommendations",
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
              description:
                "Εδώ εισάγετε τα βασικά στοιχεία του προϊόντος που θέλετε να κοστολογήσετε.",
              fields: [
                {
                  name: "Όνομα Προϊόντος",
                  description:
                    "Εισάγετε το όνομα του προϊόντος που κοστολογείτε (π.χ. 'Θράψαλο Block Αργεντίνης')",
                  required: true,
                  example: "Θράψαλο Block Αργεντίνης",
                },
                {
                  name: "Τύπος Προϊόντος",
                  description:
                    "Επιλέξτε κατηγορία: Ψάρι, Οστρακοειδή, Κεφαλόποδα, ή Επεξεργασμένο",
                  required: true,
                  example: "Ψάρι",
                },
                {
                  name: "Βάρος (kg)",
                  description:
                    "Το βάρος ανά ��εμάχιο σε κιλά. Για παράδειγμα, αν έχετε blocks των 10kg, εισάγετε 10",
                  required: true,
                  example: "10",
                },
                {
                  name: "Ποσότητα",
                  description:
                    "Πόσα τεμάχια θα επεξεργαστείτε (π.χ. 200 blocks = 2 τόνοι)",
                  required: true,
                  example: "200",
                },
                {
                  name: "Τιμή Αγοράς (€/kg)",
                  description: "Η τιμή που αγοράσατε το προϊόν ανά κιλό",
                  required: true,
                  example: "4.50",
                },
                {
                  name: "Στοχευμένη Τιμή Πώλησης (€/kg)",
                  description:
                    "Η τιμή που θέλετε να πουλήσετε το προϊόν ανά κιλό",
                  required: true,
                  example: "7.50",
                },
                {
                  name: "ΦΠΑ (%)",
                  description: "Το ποσοστό ΦΠΑ που εφαρμόζεται στο προϊόν",
                  required: false,
                  example: "24",
                },
              ],
              tips: [
                "Εισάγετε πάντα ακριβή στοιχεία για καλύτερους υπολογισμούς",
                "Το βάρος αναφέρεται στο αρχικό βάρος πριν την επεξεργασία",
                "Η τιμή αγοράς πρέπει να περιλαμβάνει τυχόν επιπρόσθετα κόστη",
                "Η στοχευμένη τιμή μπορεί να αλλάξει βάσει της ανάλυσης",
                "Χρησιμοποιήστε το κουμπί 'Παράδειγμα' για γρήγορη εκκίνηση",
              ],
              shortcuts: [
                "Ctrl+S: Αποθήκευση δεδομένων",
                "Ctrl+R: Επαναφορά φόρμας",
                "Ctrl+E: Φόρτωση παραδείγματος",
                "F1: Εμφάνιση βοήθειας",
              ],
            }
          : {
              title: "Product Information",
              description:
                "Here you enter the basic information about the product you want to cost.",
              fields: [
                {
                  name: "Product Name",
                  description:
                    "Enter the name of the product you're costing (e.g. 'Hake Block Argentina')",
                  required: true,
                  example: "Hake Block Argentina",
                },
                {
                  name: "Product Type",
                  description:
                    "Select category: Fish, Shellfish, Cephalopods, or Processed",
                  required: true,
                  example: "Fish",
                },
                {
                  name: "Weight (kg)",
                  description:
                    "Weight per piece in kg. For example, if you have 10kg blocks, enter 10",
                  required: true,
                  example: "10",
                },
                {
                  name: "Quantity",
                  description:
                    "How many pieces will you process (e.g. 200 blocks = 2 tons)",
                  required: true,
                  example: "200",
                },
                {
                  name: "Purchase Price (€/kg)",
                  description: "The price you bought the product per kg",
                  required: true,
                  example: "4.50",
                },
                {
                  name: "Target Selling Price (€/kg)",
                  description: "The price you want to sell the product per kg",
                  required: true,
                  example: "7.50",
                },
                {
                  name: "VAT (%)",
                  description: "The VAT percentage applied to the product",
                  required: false,
                  example: "24",
                },
              ],
              tips: [
                "Always enter accurate data for better calculations",
                "Weight refers to initial weight before processing",
                "Purchase price should include any additional costs",
                "Target price can be adjusted based on analysis",
                "Use the 'Example' button for quick start",
              ],
              shortcuts: [
                "Ctrl+S: Save data",
                "Ctrl+R: Reset form",
                "Ctrl+E: Load example",
                "F1: Show help",
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
                "Διαχειριστείτε τις φάσεις επεξεργασίας του προϊόντος σας και υπολογίστε τις απώλειες με ακρίβεια.",
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
                    "Υπεύθυνος",
                  ],
                  examples: [
                    "Καθάρισμα: 20% απώλεια, €0.50/kg",
                    "Φιλετάρισμα: 30% απώλεια, €1.20/kg",
                    "Πλύσιμο: 5% απώλεια, €0.10/kg",
                  ],
                },
                {
                  name: "Γενικές Απώλειες",
                  description:
                    "Απώλειες που δεν σχετίζονται με συγκεκριμένη φάση (π.χ. μεταφορά, αποθήκευση)",
                  fields: ["Ποσοστό γενικών απωλειών (%)"],
                  examples: [
                    "Απώλειες μεταφοράς: 2-5%",
                    "Απώλειες αποθήκευσης: 1-3%",
                    "Απώλειες χειρισμού: 1-2%",
                  ],
                },
                {
                  name: "Glazing",
                  description:
                    "Προσθήκη πάγου ή νερού για προστασία του προϊόντος",
                  fields: [
                    "Ποσοστό glazing (%)",
                    "Τύπος glazing (πάγος/νερό)",
                    "Κόστος glazing",
                  ],
                  examples: [
                    "Πάγος: 10-20% προσθήκη βάρους",
                    "Νερό: 5-15% προσθήκη βάρους",
                    "Μικτό (πάγος+νερό): 8-18%",
                  ],
                },
              ],
              calculations: [
                "Αρχικό Βάρος: 2000kg (200 x 10kg)",
                "Μετά καθάρισμα: 1600kg (-20%)",
                "Μετά φιλετάρισμα: 1120kg (-30%)",
                "Μετά glazing: 1288kg (+15%)",
                "Καθαρό βάρος για πώληση: 1288kg",
              ],
              bestPractices: [
                "Καταγράψτε ακριβώς τις απώλειες κάθε φάσης",
                "Υπολογίστε τον χρόνο επεξεργασίας",
                "Εκτιμήστε το κόστος εργατικών",
                "Προσθέστε κόστη ψύξης και αποθήκευσης",
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
                    "Responsible person",
                  ],
                  examples: [
                    "Cleaning: 20% loss, €0.50/kg",
                    "Filleting: 30% loss, €1.20/kg",
                    "Washing: 5% loss, €0.10/kg",
                  ],
                },
                {
                  name: "General Losses",
                  description:
                    "Losses not related to specific phase (e.g. transport, storage)",
                  fields: ["General loss percentage (%)"],
                  examples: [
                    "Transport losses: 2-5%",
                    "Storage losses: 1-3%",
                    "Handling losses: 1-2%",
                  ],
                },
                {
                  name: "Glazing",
                  description:
                    "Addition of ice or water for product protection",
                  fields: [
                    "Glazing percentage (%)",
                    "Glazing type (ice/water)",
                    "Glazing cost",
                  ],
                  examples: [
                    "Ice: 10-20% weight addition",
                    "Water: 5-15% weight addition",
                    "Mixed (ice+water): 8-18%",
                  ],
                },
              ],
              calculations: [
                "Initial Weight: 2000kg (200 x 10kg)",
                "After cleaning: 1600kg (-20%)",
                "After filleting: 1120kg (-30%)",
                "After glazing: 1288kg (+15%)",
                "Net weight for sale: 1288kg",
              ],
              bestPractices: [
                "Record exact losses for each phase",
                "Calculate processing time",
                "Estimate labor costs",
                "Add cooling and storage costs",
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
                    "Πρώτες ύλες: €4.50/kg",
                    "Εργατικά: €1.20/kg",
                    "Ενέργεια: €0.30/kg",
                    "Συσκευασία: €0.15/kg",
                    "Αναλώσιμα: €0.10/kg",
                  ],
                },
                {
                  type: "Έμμεσα Κόστη",
                  description: "Γενικά έξοδα που κατανέμονται στο προϊόν",
                  examples: [
                    "Γενικά έξοδα: €0.50/kg",
                    "Αποσβέσεις: €0.25/kg",
                    "Ασφάλιστρα: €0.15/kg",
                    "Ενοίκια: €0.20/kg",
                    "Διοίκηση: €0.30/kg",
                  ],
                },
                {
                  type: "Κόστη Μεταφοράς",
                  description:
                    "Όλα τα κόστη μεταφοράς από προμηθευτή έως πελάτη",
                  examples: [
                    "Καύσιμα: €150/500km",
                    "Διόδια: €25/διαδρομή",
                    "Μισθός οδηγού: €120/ημέρα",
                    "Ασφάλιση μεταφοράς: €50/φορτίο",
                    "Φορτοεκφόρτωση: €80/τόνο",
                  ],
                },
              ],
              calculationMethods: [
                {
                  method: "Ποσοστιαία Κατανομή",
                  description: "Έμμεσα κόστη ως % του συνολικού κόστους",
                  example: "Γενικά έξοδα = 15% του συνολικού κόστους",
                },
                {
                  method: "Κόστος ανά Μονάδα",
                  description: "Καθορισμός κόστους ανά κιλό ή τεμάχιο",
                  example: "Συσκευασία = €0.15 ανά κιλό",
                },
                {
                  method: "Κόστος ανά Ώρα",
                  description: "Εργατικά και άλλα κόστη βάσει χρόνου",
                  example: "Εργατικά = €15/ώρα × 2 ώρες = €30",
                },
              ],
              tips: [
                "Συμπεριλάβετε όλα τα κόστη, ακόμα και τα μικρά",
                "Κατανείμετε τα σταθερά κόστη ανάλογα με την παραγωγή",
                "Ενημερώνετε τακτικά τις τιμές καυσίμων και ενέργειας",
                "Μην ξεχάσετε τα κόστη αποθήκευσης και διαχείρισης",
                "Χρησιμοποιήστε ιστορικά δεδομένα για ακρίβεια",
              ],
              bestPractices: [
                "Τηρείτε αρχείο όλων των παραστατικών",
                "Προσθέστε 5-10% για απρόβλεπτα κόστη",
                "Ελέγχετε τακτικά τις τιμές προμηθευτών",
                "Συγκρίνετε κόστη με ανταγωνιστές",
                "Αναλύετε την κερδοφορία ανά προϊόν",
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
                    "Raw materials: €4.50/kg",
                    "Labor: €1.20/kg",
                    "Energy: €0.30/kg",
                    "Packaging: €0.15/kg",
                    "Consumables: €0.10/kg",
                  ],
                },
                {
                  type: "Indirect Costs",
                  description: "Overhead expenses allocated to the product",
                  examples: [
                    "General expenses: €0.50/kg",
                    "Depreciation: €0.25/kg",
                    "Insurance: €0.15/kg",
                    "Rent: €0.20/kg",
                    "Administration: €0.30/kg",
                  ],
                },
                {
                  type: "Transport Costs",
                  description: "All transport costs from supplier to customer",
                  examples: [
                    "Fuel: €150/500km",
                    "Tolls: €25/trip",
                    "Driver salary: €120/day",
                    "Transport insurance: €50/load",
                    "Loading/unloading: €80/ton",
                  ],
                },
              ],
              calculationMethods: [
                {
                  method: "Percentage Allocation",
                  description: "Indirect costs as % of total cost",
                  example: "Overhead = 15% of total cost",
                },
                {
                  method: "Cost per Unit",
                  description: "Define cost per kg or piece",
                  example: "Packaging = €0.15 per kg",
                },
                {
                  method: "Hourly Cost",
                  description: "Labor and other time-based costs",
                  example: "Labor = €15/hour × 2 hours = €30",
                },
              ],
              tips: [
                "Include all costs, even small ones",
                "Allocate fixed costs according to production",
                "Update fuel and energy prices regularly",
                "Don't forget storage and handling costs",
                "Use historical data for accuracy",
              ],
              bestPractices: [
                "Keep records of all invoices",
                "Add 5-10% for unexpected costs",
                "Check supplier prices regularly",
                "Compare costs with competitors",
                "Analyze profitability per product",
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
                  interpretation: "Όσο χαμηλότερο, τόσο καλύτερη η κερδοφορία",
                },
                {
                  name: "Κόστος ανά kg",
                  description: "Το κόστος παραγωγής ανά κιλό καθαρού προϊόντος",
                  formula: "Συνολικό κόστος ÷ Καθαρό βάρος",
                  interpretation: "Συγκρίνετε με τιμές αγοράς ανταγωνιστών",
                },
                {
                  name: "Περιθώριο Κέρδους",
                  description: "Το ποσοστό κέρδους επί των εσόδων",
                  formula: "(Έσοδα - Κόστος) ÷ Έσοδα × 100%",
                  interpretation:
                    ">20% = Εξαιρετικό, 10-20% = Καλό, <10% = Χαμηλό",
                },
                {
                  name: "Break-even Τιμή",
                  description: "Η ελάχιστη τιμή πώλησης για μηδενικό κέρδος",
                  formula: "Συνολικό κόστος ÷ Καθαρό βάρος",
                  interpretation: "Πρέπει να είναι κάτω από την τιμή αγοράς",
                },
                {
                  name: "ROI (Return on Investment)",
                  description: "Απόδοση επένδυσης",
                  formula: "(Κέρδος - Επένδυση) ÷ Επένδυση × 100%",
                  interpretation: ">15% = Εξαιρετικό, 5-15% = Καλό",
                },
              ],
              insights: [
                "Περιθώριο > 20%: Εξαιρετική κερδοφορία",
                "Περιθώριο 10-20%: Καλή κερδοφορία",
                "Περιθώριο < 10%: Χαμηλή κερδοφορία - εξετάστε βελτιώσεις",
                "Απώλειες > 25%: Χρειάζεται βελτίωση διαδικασιών",
                "Κόστος μεταφοράς > 10% συνολικού: Εξετάστε εναλλακτικές",
              ],
              recommendations: [
                "Συγκρίνετε με βιομηχανικούς μέσους όρους",
                "Αναλύστε τάσεις κόστους σε μηνιαία βάση",
                "Εντοπίστε τα κυριότερα κόστη για βελτιστοποίηση",
                "Εξετάστε bulk αγορές για καλύτερες τιμές",
                "Αξιολογήστε νέους προμηθευτές τακτικά",
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
                  interpretation: "Lower is better for profitability",
                },
                {
                  name: "Cost per kg",
                  description: "Production cost per kg of net product",
                  formula: "Total cost ÷ Net weight",
                  interpretation: "Compare with competitor purchase prices",
                },
                {
                  name: "Profit Margin",
                  description: "Percentage of profit on revenue",
                  formula: "(Revenue - Cost) ÷ Revenue × 100%",
                  interpretation: ">20% = Excellent, 10-20% = Good, <10% = Low",
                },
                {
                  name: "Break-even Price",
                  description: "Minimum selling price for zero profit",
                  formula: "Total cost ÷ Net weight",
                  interpretation: "Should be below market price",
                },
                {
                  name: "ROI (Return on Investment)",
                  description: "Return on investment",
                  formula: "(Profit - Investment) ÷ Investment × 100%",
                  interpretation: ">15% = Excellent, 5-15% = Good",
                },
              ],
              insights: [
                "Margin > 20%: Excellent profitability",
                "Margin 10-20%: Good profitability",
                "Margin < 10%: Low profitability - consider improvements",
                "Losses > 25%: Process improvement needed",
                "Transport cost > 10% of total: Consider alternatives",
              ],
              recommendations: [
                "Compare with industry averages",
                "Analyze cost trends monthly",
                "Identify major costs for optimization",
                "Consider bulk purchases for better prices",
                "Evaluate new suppliers regularly",
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
                    "Executive Summary με KPIs",
                    "Στοιχεία προϊόντος και προμηθευτή",
                    "Λεπτομερής ανάλυση κόστους",
                    "Φάσεις επεξεργασίας και απώλειες",
                    "Οικονομικά αποτελέσματα και δείκτες",
                    "Benchmarking με βιομηχανία",
                    "Ανάλυση κινδύνων",
                    "Έξυπνες συστάσεις βελτίωσης",
                    "Υπογραφές & εγκρίσεις",
                  ],
                  features: [
                    "Επαγγελματικό template",
                    "Υποστήριξη ελληνικών",
                    "Γραφήματα και διαγράμματα",
                    "4 σελίδες περιεχομένου",
                  ],
                },
                {
                  type: "Excel Export",
                  description:
                    "Δεδομένα σε μορφή spreadsheet για περαιτέρω ανάλυση",
                  includes: [
                    "Φύλλο συνοπτικών στοιχείων",
                    "Φύλλο λεπτομερούς ανάλυσης κόστους",
                    "Φύλλο φάσεων επεξεργασίας",
                    "Φύλλο οικονομικών δεικτών",
                    "Φορμαρισμένα κελιά με χρώματα",
                    "Τύποι υπολογισμού",
                    "Πίνακες και γραφήματα",
                  ],
                  features: [
                    "Πολλαπλά φύλλα εργασίας",
                    "Αυτόματοι υπολογισμοί",
                    "Έτοιμα για εκτύπωση",
                    "Συμβατό με Excel/Calc",
                  ],
                },
                {
                  type: "CSV Export",
                  description: "Απλή μορφή για import σε άλλα συστήματα",
                  includes: [
                    "UTF-8 encoding για ελληνικά",
                    "Όλα τα βασικά δεδομένα",
                    "Συμβατό με Excel",
                    "Εύκολη εισαγωγή σε ERP",
                  ],
                  features: [
                    "Lightweight format",
                    "Universal compatibility",
                    "Bulk data export",
                    "API integration ready",
                  ],
                },
              ],
              tips: [
                "Οι αναφορές PDF είναι ιδανικές για παρουσιάσεις",
                "Χρησιμοποιήστε Excel για περαιτέρω ανάλυση και modelling",
                "Το CSV είναι καλό για εισαγωγή σε ERP συστήματα",
                "Όλες οι εξαγωγές υποστηρίζουν ελληνικά χαρακτήρες",
                "Αποθηκεύστε τα αρχεία για μελλοντική αναφορά",
              ],
              automation: [
                "Προγραμματισμένες εξαγωγές",
                "Email αποστολή αναφορών",
                "Cloud backup",
                "API integration",
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
                    "Executive Summary with KPIs",
                    "Product and supplier information",
                    "Detailed cost analysis",
                    "Processing phases and losses",
                    "Financial results and indicators",
                    "Industry benchmarking",
                    "Risk analysis",
                    "Smart improvement recommendations",
                    "Signatures & approvals",
                  ],
                  features: [
                    "Professional template",
                    "Greek character support",
                    "Charts and diagrams",
                    "4 pages of content",
                  ],
                },
                {
                  type: "Excel Export",
                  description:
                    "Data in spreadsheet format for further analysis",
                  includes: [
                    "Summary sheet",
                    "Detailed cost analysis sheet",
                    "Processing phases sheet",
                    "Financial indicators sheet",
                    "Formatted cells with colors",
                    "Calculation formulas",
                    "Tables and charts",
                  ],
                  features: [
                    "Multiple worksheets",
                    "Automatic calculations",
                    "Print-ready format",
                    "Excel/Calc compatible",
                  ],
                },
                {
                  type: "CSV Export",
                  description: "Simple format for import to other systems",
                  includes: [
                    "UTF-8 encoding for Greek",
                    "All basic data",
                    "Excel compatible",
                    "Easy ERP import",
                  ],
                  features: [
                    "Lightweight format",
                    "Universal compatibility",
                    "Bulk data export",
                    "API integration ready",
                  ],
                },
              ],
              tips: [
                "PDF reports are ideal for presentations",
                "Use Excel for further analysis and modeling",
                "CSV is good for ERP system imports",
                "All exports support Greek characters",
                "Save files for future reference",
              ],
              automation: [
                "Scheduled exports",
                "Email report delivery",
                "Cloud backup",
                "API integration",
              ],
            },
    },
    premium: {
      title: language === "el" ? "Premium Χαρακτηριστικά" : "Premium Features",
      icon: Star,
      content:
        language === "el"
          ? {
              title: "Προηγμένα Χαρακτηριστικά",
              description:
                "Εξερευνήστε τα premium χαρακτηριστικά του KostoPro Enhanced.",
              features: [
                {
                  name: "Executive Dashboard",
                  description: "Real-time KPIs και επιχειρηματική ανάλυση",
                  benefits: [
                    "Real-time παρακολούθηση κόστους",
                    "Αυτόματες ειδοποιήσεις",
                    "Τάσεις και προβλέψεις",
                    "Benchmarking με βιομηχανία",
                  ],
                },
                {
                  name: "Οικονομικοί Δείκτες",
                  description: "Προηγμένη οικονομική ανάλυση και δείκτες",
                  benefits: [
                    "ROI, NPV, IRR υπολογισμοί",
                    "Sensitivity analysis",
                    "Risk assessment",
                    "Monte Carlo simulation",
                  ],
                },
                {
                  name: "Διαχείριση Αποθεμάτων",
                  description: "Πλήρης έλεγχος αποθεμάτων και batches",
                  benefits: [
                    "Batch tracking",
                    "Quality scoring",
                    "Expiry alerts",
                    "Supplier management",
                  ],
                },
                {
                  name: "Market Intelligence",
                  description: "Ανάλυση αγοράς και ανταγωνισμού",
                  benefits: [
                    "Competitor analysis",
                    "Price intelligence",
                    "Market trends",
                    "SWOT analysis",
                  ],
                },
              ],
              upcomingFeatures: [
                "🤖 AI-powered cost predictions",
                "🌐 Multi-language support",
                "📱 Mobile app",
                "🔗 ERP integrations",
                "📊 Advanced analytics",
              ],
            }
          : {
              title: "Advanced Features",
              description: "Explore the premium features of KostoPro Enhanced.",
              features: [
                {
                  name: "Executive Dashboard",
                  description: "Real-time KPIs and business analysis",
                  benefits: [
                    "Real-time cost monitoring",
                    "Automated alerts",
                    "Trends and forecasts",
                    "Industry benchmarking",
                  ],
                },
                {
                  name: "Financial Ratios",
                  description: "Advanced financial analysis and ratios",
                  benefits: [
                    "ROI, NPV, IRR calculations",
                    "Sensitivity analysis",
                    "Risk assessment",
                    "Monte Carlo simulation",
                  ],
                },
                {
                  name: "Inventory Management",
                  description: "Complete inventory and batch control",
                  benefits: [
                    "Batch tracking",
                    "Quality scoring",
                    "Expiry alerts",
                    "Supplier management",
                  ],
                },
                {
                  name: "Market Intelligence",
                  description: "Market and competitor analysis",
                  benefits: [
                    "Competitor analysis",
                    "Price intelligence",
                    "Market trends",
                    "SWOT analysis",
                  ],
                },
              ],
              upcomingFeatures: [
                "🤖 AI-powered cost predictions",
                "🌐 Multi-language support",
                "📱 Mobile app",
                "🔗 ERP integrations",
                "📊 Advanced analytics",
              ],
            },
    },
    mobile: {
      title: language === "el" ? "Χρήση σε Mobile" : "Mobile Usage",
      icon: Smartphone,
      content:
        language === "el"
          ? {
              title: "Βελτιστοποίηση για Mobile",
              description:
                "Το KostoPro είναι πλήρως βελτιστοποιημένο για mobile συσκευές.",
              features: [
                "📱 Responsive design για όλες τις συσκευές",
                "⚡ Γρήγορη φόρτωση και PWA υποστήριξη",
                "👆 Touch-friendly interface",
                "🔄 Offline λειτουργία",
                "💾 Τοπική αποθήκευση δεδομένων",
                "🔔 Push notifications",
                "📊 Mobile-optimized charts",
                "📁 Mobile file uploads",
              ],
              mobileFeatures: [
                {
                  feature: "Swipe Navigation",
                  description: "Εύκολη πλοήγηση με swipe gestures",
                },
                {
                  feature: "Collapsed Menus",
                  description: "Αυτόματη σύμπτυξη μενού σε mobile",
                },
                {
                  feature: "Touch Optimization",
                  description: "Μεγάλα buttons και touch targets",
                },
                {
                  feature: "Zoom Support",
                  description: "Υποστήριξη zoom σε charts και tables",
                },
              ],
              tips: [
                "Περιστρέψτε τη συσκευή για καλύτερη προβολή tables",
                "Χρησιμοποιήστε το floating help button",
                "Πατήστε και κρατήστε για περισσότερες επιλογές",
                "Swipe αριστερά/δεξιά για πλοήγηση tabs",
              ],
            }
          : {
              title: "Mobile Optimization",
              description: "KostoPro is fully optimized for mobile devices.",
              features: [
                "📱 Responsive design for all devices",
                "⚡ Fast loading and PWA support",
                "👆 Touch-friendly interface",
                "🔄 Offline functionality",
                "💾 Local data storage",
                "🔔 Push notifications",
                "📊 Mobile-optimized charts",
                "📁 Mobile file uploads",
              ],
              mobileFeatures: [
                {
                  feature: "Swipe Navigation",
                  description: "Easy navigation with swipe gestures",
                },
                {
                  feature: "Collapsed Menus",
                  description: "Automatic menu collapse on mobile",
                },
                {
                  feature: "Touch Optimization",
                  description: "Large buttons and touch targets",
                },
                {
                  feature: "Zoom Support",
                  description: "Zoom support for charts and tables",
                },
              ],
              tips: [
                "Rotate device for better table viewing",
                "Use the floating help button",
                "Tap and hold for more options",
                "Swipe left/right for tab navigation",
              ],
            },
    },
  };

  const currentSection = sections[activeTab as keyof typeof sections];
  const Icon = currentSection.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">
                {language === "el"
                  ? "Οδηγός Χρήσης KostoPro Enhanced"
                  : "KostoPro Enhanced User Guide"}
              </span>
              <span className="sm:hidden">
                {language === "el" ? "Οδηγός" : "Guide"}
              </span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 p-1 sm:p-2"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-hidden">
          <div className="flex flex-col sm:flex-row h-[calc(95vh-80px)] sm:h-[calc(90vh-120px)]">
            {/* Mobile Tab Selector */}
            <div className="sm:hidden bg-gray-50 border-b p-2">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full p-2 rounded border"
              >
                {Object.entries(sections).map(([key, section]) => (
                  <option key={key} value={key}>
                    {section.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Sidebar Navigation */}
            <div className="hidden sm:block w-64 bg-gray-50 border-r overflow-y-auto">
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
                      <span className="font-medium text-sm lg:text-base">
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {currentSection.title}
                    </h2>
                    {"subtitle" in currentSection.content && (
                      <p className="text-sm sm:text-base text-gray-600">
                        {currentSection.content.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Overview Section */}
                {activeTab === "overview" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-blue-800 mb-4 text-sm sm:text-base">
                        {currentSection.content.description}
                      </p>
                    </div>

                    {/* What's New Section */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-lg border border-purple-200">
                      <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        {language === "el"
                          ? "Νέα Χαρακτηριστικά"
                          : "What's New"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentSection.content.whatsnew.map(
                          (feature: string, index: number) => (
                            <div
                              key={index}
                              className="text-purple-800 text-sm"
                            >
                              {feature}
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 text-sm sm:text-base">
                                  {feature}
                                </span>
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
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 text-sm sm:text-base">
                                  {benefit}
                                </span>
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
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-green-800 text-sm sm:text-base">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {currentSection.content.fields.map(
                        (field: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-3 sm:p-4"
                          >
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
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
                              {field.example && (
                                <Badge variant="outline" className="text-xs">
                                  {language === "el" ? "π.χ." : "e.g."}{" "}
                                  {field.example}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm">
                              {field.description}
                            </p>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                              <li
                                key={index}
                                className="text-yellow-800 text-xs sm:text-sm"
                              >
                                • {tip}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          {language === "el"
                            ? "Συντομεύσεις"
                            : "Keyboard Shortcuts"}
                        </h4>
                        <ul className="space-y-1">
                          {currentSection.content.shortcuts.map(
                            (shortcut: string, index: number) => (
                              <li
                                key={index}
                                className="text-blue-800 text-xs sm:text-sm font-mono"
                              >
                                {shortcut}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Processing Section */}
                {activeTab === "processing" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-purple-50 p-4 sm:p-6 rounded-lg border border-purple-200">
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-purple-800 text-sm sm:text-base">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {currentSection.content.phases.map(
                        (phase: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-3 sm:p-4"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                              {phase.name}
                            </h4>
                            <p className="text-gray-600 text-xs sm:text-sm mb-3">
                              {phase.description}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                              {phase.fields.map(
                                (field: string, fieldIndex: number) => (
                                  <Badge
                                    key={fieldIndex}
                                    variant="outline"
                                    className="text-xs justify-center"
                                  >
                                    {field}
                                  </Badge>
                                ),
                              )}
                            </div>
                            {phase.examples && (
                              <div className="bg-gray-50 p-2 sm:p-3 rounded text-xs sm:text-sm">
                                <strong>
                                  {language === "el"
                                    ? "Παραδείγματα:"
                                    : "Examples:"}
                                </strong>
                                <ul className="mt-1 space-y-1">
                                  {phase.examples.map(
                                    (example: string, exIndex: number) => (
                                      <li key={exIndex}>• {example}</li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        ),
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2">
                          {language === "el" ? "Υπολογισμοί" : "Calculations"}
                        </h4>
                        <ul className="space-y-1">
                          {currentSection.content.calculations.map(
                            (calc: string, index: number) => (
                              <li
                                key={index}
                                className="text-green-800 text-xs sm:text-sm font-mono"
                              >
                                • {calc}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-orange-900 mb-2">
                          {language === "el"
                            ? "Καλές Πρακτικές"
                            : "Best Practices"}
                        </h4>
                        <ul className="space-y-1">
                          {currentSection.content.bestPractices.map(
                            (practice: string, index: number) => (
                              <li
                                key={index}
                                className="text-orange-800 text-xs sm:text-sm"
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

                {/* Costs Section */}
                {activeTab === "costs" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-orange-50 p-4 sm:p-6 rounded-lg border border-orange-200">
                      <h3 className="text-lg font-semibold text-orange-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-orange-800 text-sm sm:text-base">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {currentSection.content.costTypes.map(
                        (costType: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-3 sm:p-4"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                              {costType.type}
                            </h4>
                            <p className="text-gray-600 text-xs sm:text-sm mb-3">
                              {costType.description}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {costType.examples.map(
                                (example: string, exIndex: number) => (
                                  <Badge
                                    key={exIndex}
                                    variant="secondary"
                                    className="text-xs justify-start"
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

                    {/* Calculation Methods */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-600" />
                        {language === "el"
                          ? "Μέθοδοι Υπολογισμού"
                          : "Calculation Methods"}
                      </h4>
                      <div className="grid gap-3">
                        {currentSection.content.calculationMethods.map(
                          (method: any, index: number) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-3 sm:p-4 rounded-lg border"
                            >
                              <h5 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                                {method.method}
                              </h5>
                              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                                {method.description}
                              </p>
                              <div className="bg-white p-2 rounded text-xs sm:text-sm font-mono border">
                                {method.example}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          {language === "el" ? "Συμβουλές" : "Tips"}
                        </h4>
                        <ul className="space-y-1">
                          {currentSection.content.tips.map(
                            (tip: string, index: number) => (
                              <li
                                key={index}
                                className="text-blue-800 text-xs sm:text-sm"
                              >
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
                                className="text-green-800 text-xs sm:text-sm"
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
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-indigo-50 p-4 sm:p-6 rounded-lg border border-indigo-200">
                      <h3 className="text-lg font-semibold text-indigo-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-indigo-800 text-sm sm:text-base">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {currentSection.content.metrics.map(
                        (metric: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-3 sm:p-4"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                              {metric.name}
                            </h4>
                            <p className="text-gray-600 text-xs sm:text-sm mb-3">
                              {metric.description}
                            </p>
                            <div className="bg-gray-100 p-2 sm:p-3 rounded font-mono text-xs sm:text-sm mb-2">
                              {metric.formula}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-700 bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                              <strong>
                                {language === "el"
                                  ? "Ερμηνεία: "
                                  : "Interpretation: "}
                              </strong>
                              {metric.interpretation}
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                              <li
                                key={index}
                                className="text-yellow-800 text-xs sm:text-sm"
                              >
                                • {insight}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          {language === "el" ? "Συστάσεις" : "Recommendations"}
                        </h4>
                        <ul className="space-y-1">
                          {currentSection.content.recommendations.map(
                            (recommendation: string, index: number) => (
                              <li
                                key={index}
                                className="text-purple-800 text-xs sm:text-sm"
                              >
                                • {recommendation}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Export Section */}
                {activeTab === "export" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-teal-50 p-4 sm:p-6 rounded-lg border border-teal-200">
                      <h3 className="text-lg font-semibold text-teal-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-teal-800 text-sm sm:text-base">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {currentSection.content.exportTypes.map(
                        (exportType: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-3 sm:p-4"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                              {exportType.type}
                            </h4>
                            <p className="text-gray-600 text-xs sm:text-sm mb-3">
                              {exportType.description}
                            </p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-3 rounded">
                                <h5 className="font-medium text-gray-800 mb-2 text-xs sm:text-sm">
                                  {language === "el"
                                    ? "Περιλαμβάνει:"
                                    : "Includes:"}
                                </h5>
                                <ul className="space-y-1">
                                  {exportType.includes.map(
                                    (item: string, itemIndex: number) => (
                                      <li
                                        key={itemIndex}
                                        className="text-gray-700 text-xs flex items-center gap-2"
                                      >
                                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                                        {item}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>

                              <div className="bg-blue-50 p-3 rounded">
                                <h5 className="font-medium text-blue-800 mb-2 text-xs sm:text-sm">
                                  {language === "el"
                                    ? "Χαρακτηριστικά:"
                                    : "Features:"}
                                </h5>
                                <ul className="space-y-1">
                                  {exportType.features.map(
                                    (feature: string, featureIndex: number) => (
                                      <li
                                        key={featureIndex}
                                        className="text-blue-700 text-xs flex items-center gap-2"
                                      >
                                        <Star className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                        {feature}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                              <li
                                key={index}
                                className="text-blue-800 text-xs sm:text-sm"
                              >
                                • {tip}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          {language === "el" ? "Αυτοματισμός" : "Automation"}
                        </h4>
                        <ul className="space-y-1">
                          {currentSection.content.automation.map(
                            (item: string, index: number) => (
                              <li
                                key={index}
                                className="text-green-800 text-xs sm:text-sm"
                              >
                                • {item}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Premium Section */}
                {activeTab === "premium" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-lg border border-purple-200">
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-purple-800 text-sm sm:text-base">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {currentSection.content.features.map(
                        (feature: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gradient-to-r from-white to-gray-50"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                              <Award className="w-5 h-5 text-purple-600" />
                              {feature.name}
                            </h4>
                            <p className="text-gray-600 text-xs sm:text-sm mb-3">
                              {feature.description}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {feature.benefits.map(
                                (benefit: string, benefitIndex: number) => (
                                  <Badge
                                    key={benefitIndex}
                                    variant="secondary"
                                    className="text-xs justify-start bg-purple-100 text-purple-800"
                                  >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    {benefit}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        {language === "el"
                          ? "Επερχόμενα Χαρακτηριστικά"
                          : "Upcoming Features"}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentSection.content.upcomingFeatures.map(
                          (feature: string, index: number) => (
                            <div
                              key={index}
                              className="text-blue-800 text-sm bg-white p-2 rounded border"
                            >
                              {feature}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Section */}
                {activeTab === "mobile" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 sm:p-6 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">
                        {currentSection.content.title}
                      </h3>
                      <p className="text-green-800 text-sm sm:text-base">
                        {currentSection.content.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {currentSection.content.features.map(
                        (feature: string, index: number) => (
                          <div
                            key={index}
                            className="bg-white p-3 rounded-lg border border-gray-200 text-center"
                          >
                            <div className="text-2xl mb-2">
                              {feature.split(" ")[0]}
                            </div>
                            <div className="text-xs text-gray-600">
                              {feature.split(" ").slice(1).join(" ")}
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="grid gap-4">
                      {currentSection.content.mobileFeatures.map(
                        (feature: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-3 sm:p-4"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                              {feature.feature}
                            </h4>
                            <p className="text-gray-600 text-xs sm:text-sm">
                              {feature.description}
                            </p>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        {language === "el"
                          ? "Συμβουλές για Mobile"
                          : "Mobile Tips"}
                      </h4>
                      <ul className="space-y-1">
                        {currentSection.content.tips.map(
                          (tip: string, index: number) => (
                            <li
                              key={index}
                              className="text-yellow-800 text-xs sm:text-sm"
                            >
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
