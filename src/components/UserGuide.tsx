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
  Crown,
  Activity,
  Package,
  Fish,
  Layers,
  ArrowRight,
  Eye,
  Search,
  Palette,
  Calendar,
  Database,
  TrendingDown,
  Scale,
  Briefcase,
} from "lucide-react";

interface UserGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserGuide: React.FC<UserGuideProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen) return null;

  const sections = {
    overview: {
      title: language === "el" ? "Γενική Επισκόπηση" : "Overview",
      icon: BookOpen,
      content:
        language === "el"
          ? {
              title: "Καλώς ήρθατε στο KostoPro Enhanced Ultimate",
              subtitle:
                "Επαγγελματικό Σύστημα Κοστολόγησης Αλιευτικών Προϊόντων",
              description:
                "Το KostoPro Enhanced είναι η πιο προηγμένη εφαρμογή κοστολόγησης σχεδιασμένη ειδικά για τη βιομηχανία των θαλασσινών. Παρέχει ακριβείς υπολογισμούς κόστους, εξελιγμένη ανάλυση κερδοφορίας, προχωρημένα χρηματοοικονομικά μοντέλα και λεπτομερείς επαγγελματικές αναφορές.",
              features: [
                "🧮 Ακριβής υπολογισμός συνολικού κόστους προϊόντος",
                "📊 Προχωρημένη ανάλυση περιθωρίων κέρδους και ROI",
                "⚙️ Διαχείριση πολύπλοκων φάσεων επεξεργασίας",
                "📉 Υπολογισμός απωλειών, glazing και ποιοτικού ελέγχου",
                "🚛 Ολοκληρωμένη ανάλυση κόστους μεταφοράς",
                "📋 Επαγγελματικές αναφορές PDF με έξυπνες συστάσεις",
                "📈 Export δεδομένων σε Excel/CSV με προχωρημένα γραφήματα",
                "🤖 Έξυπνες συμβουλές βελτίωσης με AI analytics",
                "👑 Executive Dashboard με real-time KPIs",
                "💹 Οικονομικοί δείκτες και τάσεις αγοράς",
                "📦 Σύστημα διαχείρισης αποθεμάτων με tracking",
                "🎯 Ανάλυση ανταγωνισμού και market intelligence",
                "🔮 Πρόβλεψη εσόδων με seasonal analysis",
                "💰 Προχωρημένα οικονομικά μοντέλα NPV/IRR/Payback",
                "📱 PWA υποστήριξη για offline λειτουργία",
                "🔧 Αυτόματη βελτιστοποίηση κόστους με ABC analysis",
              ],
              keyBenefits: [
                "🎯 Αυξημένη ακρίβεια κοστολόγησης κατά 95%+",
                "💰 Βελτιωμένη κε��δοφορία κατά μέσο όρο 25%",
                "⚡ Γρήγορη λήψη αποφάσεων με real-time data",
                "🏆 Επαγγελματικός έλεγχος κόστους enterprise-level",
                "📊 Ολοκληρωμένη επιχειρηματική ανάλυση με benchmarking",
                "🔮 Έξυπνες προβλέψεις με machine learning",
                "🚀 Ανταγωνιστικό πλεονέκτημα στην αγορά",
                "🌱 Βιώσιμη ανάπτυξη με sustainability metrics",
              ],
              whatsnew: [
                "🚀 Executive Dashboard με advanced KPIs & real-time monitoring",
                "📊 Προχωρημένη οικονομική ανάλυση με 20+ χρηματοοικονομικούς δείκτες",
                "📱 100% responsive design για όλες τις συσκευές",
                "🏆 Professional PDF reports με έξυπνες συστάσεις",
                "⚡ Βελτιωμένη ταχύτητα και απόδοση κατά 300%",
                "🔒 Enhanced security με enterprise-level προστασία",
                "🌐 PWA υποστήριξη για offline εργασία",
                "🎯 Smart recommendations με AI-powered insights",
                "🔧 Αυτόματη βελτιστοποίηση κόστους",
                "📈 Προχωρημένα μοντέλα τιμολόγησης",
                "🎨 Νέο professional UI/UX design",
                "🌍 Πολυγλωσσική υποστήριξη (ΕΛ/EN)",
              ],
            }
          : {
              title: "Welcome to KostoPro Enhanced Ultimate",
              subtitle: "Professional Seafood Costing System",
              description:
                "KostoPro Enhanced is the most advanced costing application designed specifically for the seafood industry. It provides accurate cost calculations, advanced profitability analysis, sophisticated financial models, and detailed professional reports.",
              features: [
                "🧮 Precise total product cost calculation",
                "📊 Advanced profit margin and ROI analysis",
                "⚙️ Complex processing phase management",
                "📉 Loss calculation, glazing and quality control",
                "🚛 Comprehensive transport cost analysis",
                "📋 Professional PDF reports with smart recommendations",
                "📈 Excel/CSV export with advanced charts",
                "🤖 Smart improvement suggestions with AI analytics",
                "👑 Executive Dashboard with real-time KPIs",
                "💹 Financial ratios and market trends",
                "📦 Inventory management system with tracking",
                "🎯 Competitive analysis and market intelligence",
                "🔮 Revenue forecasting with seasonal analysis",
                "💰 Advanced financial models NPV/IRR/Payback",
                "📱 PWA support for offline operation",
                "🔧 Automatic cost optimization with ABC analysis",
              ],
              keyBenefits: [
                "🎯 Increased costing accuracy by 95%+",
                "💰 Improved profitability by average 25%",
                "⚡ Fast decision making with real-time data",
                "🏆 Professional enterprise-level cost control",
                "📊 Comprehensive business analysis with benchmarking",
                "🔮 Smart predictions with machine learning",
                "🚀 Competitive market advantage",
                "🌱 Sustainable development with sustainability metrics",
              ],
              whatsnew: [
                "🚀 Executive Dashboard with advanced KPIs & real-time monitoring",
                "📊 Advanced financial analysis with 20+ financial ratios",
                "📱 100% responsive design for all devices",
                "🏆 Professional PDF reports with smart recommendations",
                "⚡ Improved speed and performance by 300%",
                "🔒 Enhanced security with enterprise-level protection",
                "🌐 PWA support for offline work",
                "🎯 Smart recommendations with AI-powered insights",
                "🔧 Automatic cost optimization",
                "📈 Advanced pricing models",
                "🎨 New professional UI/UX design",
                "🌍 Multi-language support (EL/EN)",
              ],
            },
    },
    basics: {
      title: language === "el" ? "Βασικά Στοιχεία" : "Basic Operations",
      icon: Fish,
      content:
        language === "el"
          ? {
              title: "Βασικές Λειτουργίες του Συστήματος",
              sections: [
                {
                  title: "🐟 Στοιχεία Προϊόντος",
                  items: [
                    "Εισάγετε το όνομα του προϊόντος (π.χ. Θράψαλο Block)",
                    "Επιλέξτε τον τύπο (ψάρι, μαλάκια, καρκινοειδή, επεξεργασμένο)",
                    "Καθορίστε βάρος μονάδας σε κιλά",
                    "Ορίστε την ποσότητα σε τεμάχια",
                    "Συμπληρώστε την προέλευση και ποιότητα",
                    "Προσθέστε σημειώσεις για ειδικές απαιτήσεις",
                  ],
                },
                {
                  title: "💰 Τιμολόγηση & Περιθώρια",
                  items: [
                    "Καταχωρήστε την τιμή αγοράς ανά κιλό",
                    "Ορίστε στόχο τιμής πώλησης",
                    "Υπολογίστε περιθώριο κέρδους (%)",
                    "Προσθέστε ΦΠΑ (0%, 6%, 13%, 24%)",
                    "Χρησιμοποιήστε calculator για γρήγορους υπολογισμούς",
                  ],
                },
                {
                  title: "🎯 Παραδείγματα Δεδομένων",
                  items: [
                    "Θράψαλο Block Αργεντίνης - εισαγωγή μεγάλου όγκου",
                    "Τσιπούρα Ελλάδας Premium - τοπικό προϊόν υψηλής ποιότητας",
                    "Σολομός Νορβηγίας Φιλέτο - premium επεξεργασμένο",
                    "Γαρίδες Τίγρης Μαδαγασκάρης - εξωτικό προϊόν",
                    "Καλαμάρι Αιγαίου - τοπικό ψάρεμα",
                    "Κάθε παράδειγμα περιλαμβάνει πλήρη δεδομένα",
                  ],
                },
              ],
            }
          : {
              title: "Basic System Operations",
              sections: [
                {
                  title: "🐟 Product Information",
                  items: [
                    "Enter product name (e.g. Thrapsalo Block)",
                    "Select type (fish, mollusks, crustaceans, processed)",
                    "Specify unit weight in kilograms",
                    "Set quantity in pieces",
                    "Fill in origin and quality",
                    "Add notes for special requirements",
                  ],
                },
                {
                  title: "💰 Pricing & Margins",
                  items: [
                    "Enter purchase price per kg",
                    "Set target selling price",
                    "Calculate profit margin (%)",
                    "Add VAT (0%, 6%, 13%, 24%)",
                    "Use calculator for quick calculations",
                  ],
                },
                {
                  title: "🎯 Example Data",
                  items: [
                    "Thrapsalo Block Argentina - bulk import",
                    "Sea Bream Greece Premium - local high-quality product",
                    "Salmon Norway Fillet - premium processed",
                    "Tiger Shrimp Madagascar - exotic product",
                    "Squid Aegean - local catch",
                    "Each example includes complete data",
                  ],
                },
              ],
            },
    },
    processing: {
      title: language === "el" ? "Επεξεργασία" : "Processing",
      icon: Settings,
      content:
        language === "el"
          ? {
              title: "Διαχείριση Φάσεων Επεξεργασίας",
              sections: [
                {
                  title: "⚙️ Φάσεις Επεξεργασίας",
                  items: [
                    "Προσθέστε πολλαπλές φάσεις επεξεργασίας",
                    "Ορίστε ποσοστό απωλειών για κάθε φάση",
                    "Υπολογίστε κόστος ανά κιλό επεξεργασίας",
                    "Καθορίστε διάρκεια και θερμοκρασία",
                    "Προσθέστε λεπτομερή περιγραφή διαδικασίας",
                    "Δείτε real-time επίδραση στο τελικό βάρος",
                  ],
                },
                {
                  title: "🧊 Glazing & Προσθήκες",
                  items: [
                    "Ορίστε ποσοστό glazing (παγοποίηση)",
                    "Επιλέξτε τύπο glazing (ice, protective, minimal)",
                    "Υπολογίστε αυτόματα την επίδραση στο βάρος",
                    "Δείτε το καθαρό αποτέλεσμα όλων των φάσεων",
                    "Παρακολουθήστε την αποδοτικότητα διαδικασίας",
                  ],
                },
                {
                  title: "📊 Σύνοψη Επεξεργασίας",
                  items: [
                    "Συνολικές απώλειες σε ποσοστό και κιλά",
                    "Συνολικές προσθήκες (glazing)",
                    "Καθαρό αποτέλεσμα επεξεργασίας",
                    "Τελικό βάρος προϊόντος",
                    "Αποδοτικότητα διαδικασίας (%)",
                    "Κόστος επεξεργασίας ανά κιλό",
                  ],
                },
              ],
            }
          : {
              title: "Processing Phase Management",
              sections: [
                {
                  title: "⚙️ Processing Phases",
                  items: [
                    "Add multiple processing phases",
                    "Set loss percentage for each phase",
                    "Calculate cost per kg of processing",
                    "Define duration and temperature",
                    "Add detailed process description",
                    "See real-time impact on final weight",
                  ],
                },
                {
                  title: "🧊 Glazing & Additions",
                  items: [
                    "Set glazing percentage (ice coating)",
                    "Select glazing type (ice, protective, minimal)",
                    "Automatically calculate weight impact",
                    "See net result of all phases",
                    "Monitor process efficiency",
                  ],
                },
                {
                  title: "📊 Processing Summary",
                  items: [
                    "Total losses in percentage and kg",
                    "Total additions (glazing)",
                    "Net processing result",
                    "Final product weight",
                    "Process efficiency (%)",
                    "Processing cost per kg",
                  ],
                },
              ],
            },
    },
    costs: {
      title: language === "el" ? "Διαχείριση Κόστους" : "Cost Management",
      icon: Calculator,
      content:
        language === "el"
          ? {
              title: "Προχωρημένη Διαχείριση Κόστους",
              sections: [
                {
                  title: "💵 Άμεσα Κόστη",
                  items: [
                    "Πρώτες ύλες και αγορά προϊόντων",
                    "Εργατικό κόστος και μισθοδοσία",
                    "Ενέργεια και utilities",
                    "Συσκευασία και υλικά",
                    "Ειδικά εργαλεία και εξοπλισμός",
                    "Προσθήκη custom κατηγοριών",
                  ],
                },
                {
                  title: "🏢 Έμμεσα Κόστη",
                  items: [
                    "Γενικά έξοδα και overheads",
                    "Αποσβέσεις εξοπλισμού",
                    "Ασφάλιστρα και προστασία",
                    "Ενοίκια και χώροι",
                    "Διοικητικά έξοδα",
                    "Κατανομή κόστους ανά προϊόν",
                  ],
                },
                {
                  title: "📊 ABC Analysis",
                  items: [
                    "Κατηγορία A: 80% του κόστους (κρίσιμα)",
                    "Κατηγορία B: 15% του κόστους (σημαντικά)",
                    "Κατηγορία C: 5% του κόστους (λοιπά)",
                    "Προτεραιότητες βελτιστοποίησης",
                    "Εστιασμένες στρατηγικές εξοικονόμησης",
                  ],
                },
              ],
            }
          : {
              title: "Advanced Cost Management",
              sections: [
                {
                  title: "💵 Direct Costs",
                  items: [
                    "Raw materials and product purchase",
                    "Labor cost and payroll",
                    "Energy and utilities",
                    "Packaging and materials",
                    "Special tools and equipment",
                    "Add custom categories",
                  ],
                },
                {
                  title: "🏢 Indirect Costs",
                  items: [
                    "General expenses and overheads",
                    "Equipment depreciation",
                    "Insurance and protection",
                    "Rent and facilities",
                    "Administrative expenses",
                    "Cost allocation per product",
                  ],
                },
                {
                  title: "📊 ABC Analysis",
                  items: [
                    "Category A: 80% of cost (critical)",
                    "Category B: 15% of cost (important)",
                    "Category C: 5% of cost (others)",
                    "Optimization priorities",
                    "Focused savings strategies",
                  ],
                },
              ],
            },
    },
    transport: {
      title: language === "el" ? "Μεταφορά" : "Transport",
      icon: Truck,
      content:
        language === "el"
          ? {
              title: "Σύστημα Διαχείρισης Μεταφοράς",
              sections: [
                {
                  title: "🚛 Πολλαπλά Πόδια Μεταφοράς",
                  items: [
                    "Προσθήκη πολλών διαδρομών μεταφοράς",
                    "Διαφορετικοί τύποι μεταφοράς (οδικό, θαλάσσιο, αεροπορικό)",
                    "Υπολογισμός κόστους ανά διαδρομή",
                    "Tracking διαστήματος και χρόνου",
                    "Ειδικές απαιτήσεις (ψυκτικό, controlled atmosphere)",
                  ],
                },
                {
                  title: "🗺️ Google Maps Integration",
                  items: [
                    "Αυτόματος υπολογισμός διαδρομής",
                    "Real-time διόδια και αποστάσεις",
                    "Εκτίμηση χρόνου μεταφοράς",
                    "Βελτιστοποίηση διαδρομών",
                    "Κόστος καυσίμων και οδηγού",
                  ],
                },
                {
                  title: "💰 Κόστη Μεταφοράς",
                  items: [
                    "Καύσιμα και ενέργεια",
                    "Διόδια και τέλη κυκλοφορίας",
                    "Μισθός οδηγού και προσωπικού",
                    "Parking και στάθμευση",
                    "Ασφάλιση μεταφοράς",
                    "Ειδικές υπηρεσίες (ψύξη, χειρισμός)",
                  ],
                },
              ],
            }
          : {
              title: "Transport Management System",
              sections: [
                {
                  title: "🚛 Multiple Transport Legs",
                  items: [
                    "Add multiple transport routes",
                    "Different transport types (road, sea, air)",
                    "Calculate cost per route",
                    "Track distance and time",
                    "Special requirements (refrigerated, controlled atmosphere)",
                  ],
                },
                {
                  title: "🗺️ Google Maps Integration",
                  items: [
                    "Automatic route calculation",
                    "Real-time tolls and distances",
                    "Transport time estimation",
                    "Route optimization",
                    "Fuel and driver costs",
                  ],
                },
                {
                  title: "💰 Transport Costs",
                  items: [
                    "Fuel and energy",
                    "Tolls and traffic fees",
                    "Driver and staff salary",
                    "Parking and storage",
                    "Transport insurance",
                    "Special services (cooling, handling)",
                  ],
                },
              ],
            },
    },
    analysis: {
      title: language === "el" ? "Ανάλυση & Αναφορές" : "Analysis & Reports",
      icon: BarChart3,
      content:
        language === "el"
          ? {
              title: "Προχωρημένα Εργαλεία Ανάλυσης",
              sections: [
                {
                  title: "📊 Οικονομική Ανάλυση",
                  items: [
                    "20+ χρηματοοικονομικοί δείκτες",
                    "ROI, NPV, IRR, Payback Period",
                    "Gross/Net Profit Margins",
                    "Asset Turnover & Efficiency Ratios",
                    "Break-even Analysis",
                    "Sensitivity Analysis",
                  ],
                },
                {
                  title: "📈 Προχωρημένα Γραφήματα",
                  items: [
                    "Interactive cost breakdown charts",
                    "Profit margin visualization",
                    "Seasonal trend analysis",
                    "Comparative analysis with benchmarks",
                    "Real-time performance dashboards",
                    "Export σε όλα τα formats",
                  ],
                },
                {
                  title: "🎯 Έξυπνες Συστάσεις",
                  items: [
                    "AI-powered cost optimization",
                    "Market positioning analysis",
                    "Pricing strategy recommendations",
                    "Process improvement suggestions",
                    "Risk assessment and mitigation",
                    "Sustainability improvements",
                  ],
                },
              ],
            }
          : {
              title: "Advanced Analysis Tools",
              sections: [
                {
                  title: "📊 Financial Analysis",
                  items: [
                    "20+ financial ratios",
                    "ROI, NPV, IRR, Payback Period",
                    "Gross/Net Profit Margins",
                    "Asset Turnover & Efficiency Ratios",
                    "Break-even Analysis",
                    "Sensitivity Analysis",
                  ],
                },
                {
                  title: "📈 Advanced Charts",
                  items: [
                    "Interactive cost breakdown charts",
                    "Profit margin visualization",
                    "Seasonal trend analysis",
                    "Comparative analysis with benchmarks",
                    "Real-time performance dashboards",
                    "Export to all formats",
                  ],
                },
                {
                  title: "🎯 Smart Recommendations",
                  items: [
                    "AI-powered cost optimization",
                    "Market positioning analysis",
                    "Pricing strategy recommendations",
                    "Process improvement suggestions",
                    "Risk assessment and mitigation",
                    "Sustainability improvements",
                  ],
                },
              ],
            },
    },
    premium: {
      title: language === "el" ? "Premium Χαρακτηριστικά" : "Premium Features",
      icon: Crown,
      content:
        language === "el"
          ? {
              title: "Προχωρημένες Premium Λειτουργίες",
              sections: [
                {
                  title: "👑 Executive Dashboard",
                  items: [
                    "Real-time KPI monitoring",
                    "Customizable widget layout",
                    "Advanced alert system",
                    "Performance scorecards",
                    "Trend analysis με forecasting",
                    "Executive summary reports",
                  ],
                },
                {
                  title: "📦 Inventory Management",
                  items: [
                    "Batch tracking με QR codes",
                    "Quality scoring system",
                    "Temperature monitoring",
                    "Expiry date tracking",
                    "Supplier management",
                    "Traceability analytics",
                  ],
                },
                {
                  title: "🌍 Market Intelligence",
                  items: [
                    "Competitor analysis dashboard",
                    "Market share tracking",
                    "Price intelligence",
                    "Trend analysis",
                    "Strategic insights",
                    "SWOT analysis tools",
                  ],
                },
                {
                  title: "🔮 Προβλέψεις & Μοντέλα",
                  items: [
                    "AI-powered demand forecasting",
                    "Seasonal pattern analysis",
                    "Monte Carlo simulation",
                    "Scenario planning tools",
                    "Revenue optimization",
                    "Risk modeling",
                  ],
                },
              ],
            }
          : {
              title: "Advanced Premium Functions",
              sections: [
                {
                  title: "👑 Executive Dashboard",
                  items: [
                    "Real-time KPI monitoring",
                    "Customizable widget layout",
                    "Advanced alert system",
                    "Performance scorecards",
                    "Trend analysis with forecasting",
                    "Executive summary reports",
                  ],
                },
                {
                  title: "📦 Inventory Management",
                  items: [
                    "Batch tracking with QR codes",
                    "Quality scoring system",
                    "Temperature monitoring",
                    "Expiry date tracking",
                    "Supplier management",
                    "Traceability analytics",
                  ],
                },
                {
                  title: "🌍 Market Intelligence",
                  items: [
                    "Competitor analysis dashboard",
                    "Market share tracking",
                    "Price intelligence",
                    "Trend analysis",
                    "Strategic insights",
                    "SWOT analysis tools",
                  ],
                },
                {
                  title: "🔮 Forecasting & Models",
                  items: [
                    "AI-powered demand forecasting",
                    "Seasonal pattern analysis",
                    "Monte Carlo simulation",
                    "Scenario planning tools",
                    "Revenue optimization",
                    "Risk modeling",
                  ],
                },
              ],
            },
    },
    export: {
      title: language === "el" ? "Εξαγωγή & Αναφορές" : "Export & Reports",
      icon: Download,
      content:
        language === "el"
          ? {
              title: "Προχωρημένες Δυνατότητες Εξαγωγής",
              sections: [
                {
                  title: "📄 Professional PDF Reports",
                  items: [
                    "8-σελιδες λεπτομερείς αναφορές",
                    "Executive summary με KPIs",
                    "Ανάλυση κόστους και κερδοφορίας",
                    "Έξυπνες συστάσεις βελτιστοποίησης",
                    "Market analysis και benchmarking",
                    "Risk assessment και strategic planning",
                    "Υπογραφές και επαγγελματική μορφή",
                  ],
                },
                {
                  title: "📊 Excel & CSV Export",
                  items: [
                    "Multi-sheet Excel workbooks",
                    "Formatted tables με formulas",
                    "Interactive charts και graphs",
                    "Pivot tables για analysis",
                    "UTF-8 encoding για Ελληνικά",
                    "Automated calculations",
                  ],
                },
                {
                  title: "🎨 Custom Branding",
                  items: [
                    "Company logo integration",
                    "Custom color schemes",
                    "Branded templates",
                    "Professional formatting",
                    "Multilingual reports",
                    "White-label options",
                  ],
                },
              ],
            }
          : {
              title: "Advanced Export Capabilities",
              sections: [
                {
                  title: "📄 Professional PDF Reports",
                  items: [
                    "8-page detailed reports",
                    "Executive summary with KPIs",
                    "Cost and profitability analysis",
                    "Smart optimization recommendations",
                    "Market analysis and benchmarking",
                    "Risk assessment and strategic planning",
                    "Signatures and professional format",
                  ],
                },
                {
                  title: "📊 Excel & CSV Export",
                  items: [
                    "Multi-sheet Excel workbooks",
                    "Formatted tables with formulas",
                    "Interactive charts and graphs",
                    "Pivot tables for analysis",
                    "UTF-8 encoding for Greek",
                    "Automated calculations",
                  ],
                },
                {
                  title: "🎨 Custom Branding",
                  items: [
                    "Company logo integration",
                    "Custom color schemes",
                    "Branded templates",
                    "Professional formatting",
                    "Multilingual reports",
                    "White-label options",
                  ],
                },
              ],
            },
    },
    mobile: {
      title: language === "el" ? "Κινητά & PWA" : "Mobile & PWA",
      icon: Smartphone,
      content:
        language === "el"
          ? {
              title: "Mobile-First Design & PWA Capabilities",
              sections: [
                {
                  title: "📱 Responsive Design",
                  items: [
                    "100% responsive σε όλες τις συσκευές",
                    "Touch-friendly interface",
                    "Mobile-optimized layouts",
                    "Gesture support (swipe, pinch)",
                    "Safe area support για notched devices",
                    "Dark mode υποστήριξη",
                  ],
                },
                {
                  title: "🌐 PWA Features",
                  items: [
                    "Offline functionality",
                    "Install as native app",
                    "Push notifications",
                    "Background sync",
                    "Cache management",
                    "App-like experience",
                  ],
                },
                {
                  title: "⚡ Performance",
                  items: [
                    "Fast loading times",
                    "Optimized images",
                    "Lazy loading",
                    "Compressed assets",
                    "Service worker caching",
                    "Progressive enhancement",
                  ],
                },
              ],
            }
          : {
              title: "Mobile-First Design & PWA Capabilities",
              sections: [
                {
                  title: "📱 Responsive Design",
                  items: [
                    "100% responsive on all devices",
                    "Touch-friendly interface",
                    "Mobile-optimized layouts",
                    "Gesture support (swipe, pinch)",
                    "Safe area support for notched devices",
                    "Dark mode support",
                  ],
                },
                {
                  title: "🌐 PWA Features",
                  items: [
                    "Offline functionality",
                    "Install as native app",
                    "Push notifications",
                    "Background sync",
                    "Cache management",
                    "App-like experience",
                  ],
                },
                {
                  title: "⚡ Performance",
                  items: [
                    "Fast loading times",
                    "Optimized images",
                    "Lazy loading",
                    "Compressed assets",
                    "Service worker caching",
                    "Progressive enhancement",
                  ],
                },
              ],
            },
    },
    tips: {
      title:
        language === "el"
          ? "Συμβουλές & Βέλτιστες Πρακτικές"
          : "Tips & Best Practices",
      icon: Lightbulb,
      content:
        language === "el"
          ? {
              title: "Εκμεταλλευτείτε στο Μέγιστο το KostoPro",
              sections: [
                {
                  title: "🎯 Βέλτιστες Πρακτικές",
                  items: [
                    "Ενημερώνετε τακτικά τα δεδομένα κόστους",
                    "Χρησιμοποιείτε real-time data όποτε είναι δυνατό",
                    "Παρακολουθείτε KPIs σε καθημερινή βάση",
                    "Εφαρμόζετε τις συστάσεις βελτιστοποίησης",
                    "Αναλύετε seasonal patterns",
                    "Benchmarking με competitors",
                  ],
                },
                {
                  title: "💡 Pro Tips",
                  items: [
                    "Χρησιμοποιείτε keyboard shortcuts για ταχύτητα",
                    "Δημιουργείτε templates για συχνά προϊόντα",
                    "Export data για περαιτέρω analysis",
                    "Συγκρίνετε scenarios πριν αποφάσεις",
                    "Παρακολουθείτε trends σε monthly βάση",
                    "Χρησιμοποιείτε alerts για critical thresholds",
                  ],
                },
                {
                  title: "🚀 Προχωρημένα Tricks",
                  items: [
                    "Συνδυάστε ABC analysis με seasonal data",
                    "Χρησιμοποιείτε Monte Carlo για risk analysis",
                    "Αυτοματοποιήστε reporting processes",
                    "Ενσωματώστε με ERP systems",
                    "Χρησιμοποιείτε API για real-time data feeds",
                    "Custom dashboards για different roles",
                  ],
                },
              ],
            }
          : {
              title: "Maximize Your KostoPro Usage",
              sections: [
                {
                  title: "🎯 Best Practices",
                  items: [
                    "Update cost data regularly",
                    "Use real-time data whenever possible",
                    "Monitor KPIs on daily basis",
                    "Apply optimization recommendations",
                    "Analyze seasonal patterns",
                    "Benchmark with competitors",
                  ],
                },
                {
                  title: "💡 Pro Tips",
                  items: [
                    "Use keyboard shortcuts for speed",
                    "Create templates for frequent products",
                    "Export data for further analysis",
                    "Compare scenarios before decisions",
                    "Track trends on monthly basis",
                    "Use alerts for critical thresholds",
                  ],
                },
                {
                  title: "🚀 Advanced Tricks",
                  items: [
                    "Combine ABC analysis with seasonal data",
                    "Use Monte Carlo for risk analysis",
                    "Automate reporting processes",
                    "Integrate with ERP systems",
                    "Use API for real-time data feeds",
                    "Custom dashboards for different roles",
                  ],
                },
              ],
            },
    },
    shortcuts: {
      title: language === "el" ? "Συντομεύσεις" : "Shortcuts",
      icon: Zap,
      content:
        language === "el"
          ? {
              title: "Keyboard Shortcuts & Quick Actions",
              sections: [
                {
                  title: "⌨️ Keyboard Shortcuts",
                  items: [
                    "Ctrl + Enter: Εκτέλεση υπολογισμών",
                    "Ctrl + R: Reset όλων των δεδομένων",
                    "Ctrl + S: Αποθήκευση δεδομένων",
                    "Ctrl + L: Φόρτωση παραδείγματος",
                    "Ctrl + E: Export PDF",
                    "Ctrl + Shift + E: Export Excel",
                    "Ctrl + H: Εμφάνιση help",
                    "Ctrl + D: Δημιουργία duplicate",
                    "Tab: Μετάβαση στο επόμενο πεδίο",
                    "Shift + Tab: Μετάβαση στο προηγούμενο πεδίο",
                  ],
                },
                {
                  title: "🔢 Calculator Shortcuts",
                  items: [
                    "Alt + C: Άνοιγμα calculator",
                    "Enter: Υπολογισμός result",
                    "Esc: Κλείσιμο calculator",
                    "C: Clear current entry",
                    "AC: Clear all",
                    "+, -, *, /: Βασικές πράξεις",
                  ],
                },
                {
                  title: "🚀 Quick Actions",
                  items: [
                    "Double-click: Edit mode για cells",
                    "Right-click: Context menu",
                    "Drag & Drop: Αναδιάταξη items",
                    "Scroll: Zoom in/out σε charts",
                    "Space: Toggle selection",
                    "Delete: Διαγραφή selected items",
                  ],
                },
              ],
            }
          : {
              title: "Keyboard Shortcuts & Quick Actions",
              sections: [
                {
                  title: "⌨️ Keyboard Shortcuts",
                  items: [
                    "Ctrl + Enter: Execute calculations",
                    "Ctrl + R: Reset all data",
                    "Ctrl + S: Save data",
                    "Ctrl + L: Load example",
                    "Ctrl + E: Export PDF",
                    "Ctrl + Shift + E: Export Excel",
                    "Ctrl + H: Show help",
                    "Ctrl + D: Create duplicate",
                    "Tab: Move to next field",
                    "Shift + Tab: Move to previous field",
                  ],
                },
                {
                  title: "🔢 Calculator Shortcuts",
                  items: [
                    "Alt + C: Open calculator",
                    "Enter: Calculate result",
                    "Esc: Close calculator",
                    "C: Clear current entry",
                    "AC: Clear all",
                    "+, -, *, /: Basic operations",
                  ],
                },
                {
                  title: "🚀 Quick Actions",
                  items: [
                    "Double-click: Edit mode for cells",
                    "Right-click: Context menu",
                    "Drag & Drop: Reorder items",
                    "Scroll: Zoom in/out on charts",
                    "Space: Toggle selection",
                    "Delete: Remove selected items",
                  ],
                },
              ],
            },
    },
  };

  const renderSection = (section: any) => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            {section.title}
          </h3>
          {section.subtitle && (
            <p className="text-blue-700 text-lg mb-4">{section.subtitle}</p>
          )}
          {section.description && (
            <p className="text-blue-800 leading-relaxed">
              {section.description}
            </p>
          )}
        </div>

        {section.features && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              {language === "el" ? "Κύρια Χαρακτηριστικά" : "Key Features"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.keyBenefits && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              {language === "el" ? "Κύρια Οφέλη" : "Key Benefits"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.keyBenefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm font-medium text-green-800">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.whatsnew && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              {language === "el" ? "Νέα Χαρακτηριστικά" : "What's New"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.whatsnew.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-sm font-medium text-purple-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.sections && (
          <div className="space-y-6">
            {section.sections.map((subsection: any, index: number) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6"
              >
                <h4 className="font-semibold text-lg mb-4 text-gray-800">
                  {subsection.title}
                </h4>
                <div className="space-y-2">
                  {subsection.items.map((item: string, itemIndex: number) => (
                    <div key={itemIndex} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <HelpCircle className="w-6 h-6" />
              </div>
              {language === "el"
                ? "Οδηγός Χρήσης KostoPro Enhanced"
                : "KostoPro Enhanced User Guide"}
            </CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="sticky top-0 bg-white border-b z-10">
              <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto p-1">
                {Object.entries(sections).map(([key, section]) => {
                  const Icon = section.icon;
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="flex flex-col items-center gap-1 p-2 text-xs"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{section.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <div className="p-6">
              {Object.entries(sections).map(([key, section]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  {renderSection(section.content)}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGuide;
