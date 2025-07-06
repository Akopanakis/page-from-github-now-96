import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  BookOpen,
  PlayCircle,
  ChevronRight,
  CheckCircle,
  Info,
  Lightbulb,
  Target,
  BarChart3,
  Calculator,
  FileText,
  TrendingUp,
  Zap,
  Users,
  Shield,
  Leaf,
  Globe,
  Fish,
  Waves,
  Award,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Eye,
  Search,
  Filter,
  PieChart,
  LineChart,
  Activity,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  Heart,
  Star,
  Anchor,
  Navigation,
  Truck,
  Building,
  Database,
  Network,
  Scale,
  Timer,
  AlertTriangle,
  Bell,
  Calendar,
  Edit,
  Plus,
  Home,
  Thermometer,
  Package,
  Factory,
  Beaker,
  QrCode,
  Snowflake
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  content: {
    overview: string;
    steps: string[];
    tips: string[];
    examples: string[];
    videoUrl?: string;
    resources: string[];
  };
}

interface TutorialSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: TutorialStep[];
}

const EnhancedTutorial = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState("getting-started");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  // Comprehensive tutorial sections with much more content
  const tutorialSections: TutorialSection[] = [
    {
      id: "getting-started",
      title: language === "el" ? "Ξεκινώντας" : "Getting Started",
      description: language === "el"
        ? "Πλήρης εισαγωγή στην εφαρμογή KostoPro και όλα τα βασικά χαρακτηριστικά"
        : "Complete introduction to KostoPro application and all basic features",
      icon: <PlayCircle className="w-6 h-6" />,
      estimatedTime: "25 min",
      difficulty: "beginner",
      steps: [
        {
          id: "welcome",
          title: language === "el" ? "Καλωσήρθατε στο KostoPro" : "Welcome to KostoPro",
          description: language === "el"
            ? "Αναλυτική γνωριμία με τη διεπαφή και όλα τα εργαλεία"
            : "Detailed familiarization with interface and all tools",
          icon: <Home className="w-5 h-5" />,
          completed: false,
          content: {
            overview: language === "el"
              ? "Το KostoPro είναι η πιο προηγμένη εφαρμογή κοστολόγησης για τη βιομηχανία θαλασσινών. Παρέχει ολοκληρωμένα εργαλεία για ακριβή υπολογισμό κόστους, προηγμένη ανάλυση κερδοφορίας, διαχείριση παρτίδων, χρηματοοικονομικά μοντέλα, διαχείριση στόλου, έλεγχο ποιότητας HACCP, και λεπτομερείς επαγγελματικές αναφορές PDF. Η εφαρμογή σχεδιάστηκε από ειδικούς του κλάδου για να καλύπτει όλες τις ανάγκες των επιχειρήσεων αλιείας και επεξεργασίας θαλασσινών."
              : "KostoPro is the most advanced costing application for the seafood industry. It provides comprehensive tools for accurate cost calculation, advanced profitability analysis, batch management, financial models, fleet management, HACCP quality control, and detailed professional PDF reports. The application was designed by industry experts to cover all needs of fishing and seafood processing businesses.",
            steps: [
              language === "el" ? "1. Εξερεύνηση του κεντρικού μενού και όλων των καρτελών" : "1. Explore the main menu and all tabs",
              language === "el" ? "2. Κατανόηση της δομής navigation και shortcuts" : "2. Understand navigation structure and shortcuts",
              language === "el" ? "3. Εξοικείωση με τα εικονίδια και τη χρωματική κωδικοποίηση" : "3. Familiarize with icons and color coding",
              language === "el" ? "4. Προβολή και προσαρμογή του dashboard" : "4. View and customize the dashboard",
              language === "el" ? "5. Ρύθμιση προτιμήσεων χρήστη και γλώσσας" : "5. Set user preferences and language",
              language === "el" ? "6. Δοκιμή των γρήγορων ενεργειών" : "6. Test quick actions",
              language === "el" ? "7. Εξερεύνηση του συστήματος βοήθειας" : "7. Explore help system"
            ],
            tips: [
              language === "el" ? "Χρησιμοποιήστε Ctrl+K για γρήγορη αναζήτηση οπουδήποτε" : "Use Ctrl+K for quick search anywhere",
              language === "el" ? "Το δεξί κλικ σε στοιχεία εμφανίζει επιπλέον επιλογές" : "Right-click on elements shows additional options",
              language === "el" ? "Προσαρμόστε τη διάταξη σύροντας τα widgets" : "Customize layout by dragging widgets",
              language === "el" ? "Αποθηκεύστε τις αγαπημένες σας προβολές" : "Save your favorite views",
              language === "el" ? "Χρησιμοποιήστε φίλτρα για γρήγορη πρόσβαση σε δεδομένα" : "Use filters for quick data access"
            ],
            examples: [
              language === "el" ? "Πατήστε Ctrl+D για γρήγορη πρόσβαση στο Dashboard" : "Press Ctrl+D for quick Dashboard access",
              language === "el" ? "Κάντε κλικ στο logo για επιστροφή στην αρχική οποιαδήποτε στιγμή" : "Click logo to return home anytime",
              language === "el" ? "Χρησιμοποιήστε τη γραμμή αναζήτησης για εύρεση προϊόντων" : "Use search bar to find products",
              language === "el" ? "Το F1 ανοίγει την contextual βοήθεια" : "F1 opens contextual help"
            ],
            resources: [
              language === "el" ? "Οδηγός γρήγορης εκκίνησης (PDF)" : "Quick start guide (PDF)",
              language === "el" ? "Βίντεο εισαγωγής (15 λεπτά)" : "Introduction video (15 minutes)",
              language === "el" ? "Λίστα συντομεύσεων πληκτρολογίου" : "Keyboard shortcuts list",
              language === "el" ? "FAQ για νέους χρήστες" : "FAQ for new users"
            ]
          },
        },
        {
          id: "dashboard-overview",
          title: language === "el" ? "Πλήρης Επισκόπηση Dashboard" : "Complete Dashboard Overview",
          description: language === "el"
            ? "Λεπτομερής κατανόηση όλων των στοιχείων και widgets του dashboard"
            : "Detailed understanding of all dashboard elements and widgets",
          icon: <Monitor className="w-5 h-5" />,
          completed: false,
          content: {
            overview: language === "el"
              ? "Το dashboard αποτελεί το κεντρικό κέντρο ελέγχου της εφαρμογής. Παρέχει άμεση εποπτεία σε όλες τις βασικές μετρήσεις, KPIs, γραφήματα απόδοσης, ειδοποιήσεις, και γρήγορες ενέργειες. Κάθε widget είναι προσαρμόσιμο και μπορεί να μετακινηθεί ή να αλλάξει μέγεθος ανάλογα με τις ανάγκες σας."
              : "The dashboard is the central control hub of the application. It provides immediate oversight of all key metrics, KPIs, performance charts, notifications, and quick actions. Each widget is customizable and can be moved or resized according to your needs.",
            steps: [
              language === "el" ? "1. Εξερεύνηση των βασικών KPI widgets" : "1. Explore basic KPI widgets",
              language === "el" ? "2. Κατανόηση των διαδραστικών γραφημάτων" : "2. Understand interactive charts",
              language === "el" ? "3. Χρήση φίλτρων χρονικού διαστήματος" : "3. Use time period filters",
              language === "el" ? "4. Προσαρμογή διάταξης widgets" : "4. Customize widget layout",
              language === "el" ? "5. Ρύθμιση ειδοποιήσεων και alerts" : "5. Set up notifications and alerts",
              language === "el" ? "6. Δημιουργία προσαρμοσμένων προβολών" : "6. Create custom views",
              language === "el" ? "7. Εξαγωγή δεδομένων dashboard" : "7. Export dashboard data"
            ],
            tips: [
              language === "el" ? "Κάντε κλικ σε γραφήματα για drill-down ανάλυση" : "Click on charts for drill-down analysis",
              language === "el" ? "Χρησιμοποιήστε τα φίλτρα για εξειδικευμένες προβολές" : "Use filters for specialized views",
              language === "el" ? "Αποθηκεύστε διαφορετικές διατάξεις για διαφορετικούς ρόλους" : "Save different layouts for different roles",
              language === "el" ? "Ενεργοποιήστε real-time updates για live δεδομένα" : "Enable real-time updates for live data"
            ],
            examples: [
              language === "el" ? "Widget κόστους: Εμφανίζει τάσεις κόστους τελευταίων 12 μηνών" : "Cost widget: Shows cost trends of last 12 months",
              language === "el" ? "KPI κερδοφορίας: Δείκτες απόδοσης σε πραγματικό χρόνο" : "Profitability KPIs: Real-time performance indicators",
              language === "el" ? "Γράφημα inventory: Επίπεδα αποθέματος ανά κατηγορία" : "Inventory chart: Stock levels by category"
            ],
            resources: [
              language === "el" ? "Οδηγός προσαρμογής dashboard" : "Dashboard customization guide",
              language === "el" ? "Βίντεο: Δημιουργία KPI reports" : "Video: Creating KPI reports",
              language === "el" ? "Template προσαρμοσμένων widgets" : "Custom widget templates"
            ]
          },
        },
        {
          id: "navigation-system",
          title: language === "el" ? "Σύστημα Πλοήγησης" : "Navigation System",
          description: language === "el"
            ? "Εκμάθηση του προηγμένου συστήματος πλοήγησης και shortcuts"
            : "Learning the advanced navigation system and shortcuts",
          icon: <Navigation className="w-5 h-5" />,
          completed: false,
          content: {
            overview: language === "el"
              ? "Το σύστημα πλοήγησης του KostoPro είναι σχεδιασμένο για μέγιστη αποδοτικότητα. Περιλαμβάνει πολλαπλά επίπεδα navigation, command palette, breadcrumbs, και έξυπνα shortcuts."
              : "KostoPro's navigation system is designed for maximum efficiency. It includes multiple navigation levels, command palette, breadcrumbs, and smart shortcuts.",
            steps: [
              language === "el" ? "1. Κύρια navigation bar και καρτέλες" : "1. Main navigation bar and tabs",
              language === "el" ? "2. Sidebar navigation και κατηγορίες" : "2. Sidebar navigation and categories",
              language === "el" ? "3. Command palette (Ctrl+K)" : "3. Command palette (Ctrl+K)",
              language === "el" ? "4. Breadcrumb navigation" : "4. Breadcrumb navigation",
              language === "el" ? "5. Context menus και δευτερεύουσα navigation" : "5. Context menus and secondary navigation",
              language === "el" ? "6. Search και filtering options" : "6. Search and filtering options"
            ],
            tips: [
              language === "el" ? "Μάθετε τα βασικά keyboard shortcuts" : "Learn basic keyboard shortcuts",
              language === "el" ? "Χρησιμοποιήστε το command palette για γρήγορη πρόσβαση" : "Use command palette for quick access",
              language === "el" ? "Δημιουργήστε bookmarks για συχνές σελίδες" : "Create bookmarks for frequent pages"
            ],
            examples: [
              language === "el" ? "Ctrl+C: Νέος υπολογισμός κόστους" : "Ctrl+C: New cost calculation",
              language === "el" ? "Ctrl+B: Διαχείριση παρτίδων" : "Ctrl+B: Batch management",
              language === "el" ? "Ctrl+R: Αναφορές" : "Ctrl+R: Reports"
            ],
            resources: [
              language === "el" ? "Πλήρης λίστα shortcuts" : "Complete shortcuts list",
              language === "el" ? "Navigation best practices" : "Navigation best practices"
            ]
          },
        }
      ],
    },
    {
      id: "cost-calculation",
      title: language === "el" ? "Προηγμένη Κοστολόγηση" : "Advanced Cost Calculation",
      description: language === "el"
        ? "Πλήρης εκμάθηση όλων των μεθόδων κοστολόγησης και προηγμένων τεχνικών"
        : "Complete learning of all costing methods and advanced techniques",
      icon: <Calculator className="w-6 h-6" />,
      estimatedTime: "45 min",
      difficulty: "intermediate",
      steps: [
        {
          id: "basic-calculation",
          title: language === "el" ? "Βασικός Υπολογισμός Κόστους" : "Basic Cost Calculation",
          description: language === "el"
            ? "Εμβάθυνση σε όλες τις παραμέτρους βασικού υπολογισμού"
            : "Deep dive into all basic calculation parameters",
          icon: <Calculator className="w-5 h-5" />,
          completed: false,
          content: {
            overview: language === "el"
              ? "Ο βασικός υπολογισμός κόστους αποτελεί τη βάση για όλες τις προηγμένες αναλύσεις. Περιλαμβάνει άμεσα κόστη (πρώτες ύλες, εργασία), έμμεσα κόστη (γενικά έξοδα, διοικητικά), και μεταβλητά κόστη."
              : "Basic cost calculation forms the foundation for all advanced analyses. It includes direct costs (raw materials, labor), indirect costs (overhead, administrative), and variable costs.",
            steps: [
              language === "el" ? "1. Εισαγωγή στοιχείων προϊόντος και ποσότητας" : "1. Enter product details and quantity",
              language === "el" ? "2. Υπολογισμός κόστους πρώτων υλών με πολλαπλούς προμηθευτές" : "2. Calculate raw material costs with multiple suppliers",
              language === "el" ? "3. Προσθήκη εργατικού κόστους με διαφορετικές κατηγορίες" : "3. Add labor costs with different categories",
              language === "el" ? "4. Συμπερίληψη εμμέσων εξόδων και overhead" : "4. Include indirect expenses and overhead",
              language === "el" ? "5. Υπολογισμός κόστους μεταφοράς και logistics" : "5. Calculate transport and logistics costs",
              language === "el" ? "6. Προσθήκη περιθωρίου κέρδους και markup" : "6. Add profit margin and markup",
              language === "el" ? "7. Ανάλυση breakeven point" : "7. Breakeven point analysis"
            ],
            tips: [
              language === "el" ? "Χρησιμοποιήστε ιστορικά δεδομένα για ακριβέστερους υπολογισμούς" : "Use historical data for more accurate calculations",
              language === "el" ? "Ενημερώνετε τακτικά τις τιμές προμηθευτών" : "Update supplier prices regularly",
              language === "el" ? "Λάβετε υπόψη τις εποχικές διακυμάνσεις" : "Consider seasonal fluctuations",
              language === "el" ? "Χρησιμοποιήστε διαφορετικά σενάρια για uncertainty analysis" : "Use different scenarios for uncertainty analysis"
            ],
            examples: [
              language === "el" ? "Τόνος γαρίδας: Πρώτη ύλη €8,500, Εργασία €2,200, Overhead €1,800" : "Ton of shrimp: Raw material €8,500, Labor €2,200, Overhead €1,800",
              language === "el" ? "Κιλό φιλέτου τσιπούρας: Κόστος €12.50, Τιμή πώλησης €18.90" : "Kg sea bream fillet: Cost €12.50, Selling price €18.90"
            ],
            resources: [
              language === "el" ? "Οδηγός κοστολόγησης θαλασσινών" : "Seafood costing guide",
              language === "el" ? "Excel templates για υπολογισμούς" : "Excel templates for calculations",
              language === "el" ? "Βίντεο: Βήμα προς βήμα κοστολόγηση" : "Video: Step by step costing"
            ]
          },
        },
        {
          id: "advanced-costing",
          title: language === "el" ? "Προηγμένες Μέθοδοι Κοστολόγησης" : "Advanced Costing Methods",
          description: language === "el"
            ? "ABC costing, Activity-based costing, και σύνθετες μεθοδολογίες"
            : "ABC costing, Activity-based costing, and complex methodologies",
          icon: <TrendingUp className="w-5 h-5" />,
          completed: false,
          content: {
            overview: language === "el"
              ? "Οι προηγμένες μέθοδοι κοστολόγησης παρέχουν μεγαλύτερη ακρίβεια και λεπτομέρεια. Περιλαμβάνουν ABC (Activity-Based Costing), Target costing, Life-cycle costing, και Value chain analysis."
              : "Advanced costing methods provide greater accuracy and detail. They include ABC (Activity-Based Costing), Target costing, Life-cycle costing, and Value chain analysis.",
            steps: [
              language === "el" ? "1. Κατανόηση Activity-Based Costing (ABC)" : "1. Understanding Activity-Based Costing (ABC)",
              language === "el" ? "2. Ορισμός δραστηριοτήτων και cost drivers" : "2. Define activities and cost drivers",
              language === "el" ? "3. Κατανομή εμμέσων κοστών με ABC" : "3. Allocate indirect costs with ABC",
              language === "el" ? "4. Target costing για ανάπτυξη προϊόντων" : "4. Target costing for product development",
              language === "el" ? "5. Life-cycle costing ανάλυση" : "5. Life-cycle costing analysis",
              language === "el" ? "6. Value stream mapping" : "6. Value stream mapping",
              language === "el" ? "7. Σύγκριση μεθόδων κοστολόγησης" : "7. Compare costing methods"
            ],
            tips: [
              language === "el" ? "ABC costing είναι ιδανικό για πολύπλοκες επιχειρήσεις" : "ABC costing is ideal for complex businesses",
              language === "el" ? "Χρησιμοποιήστε ιστορικά δεδομένα για καλύτερους drivers" : "Use historical data for better drivers",
              language === "el" ? "Συνδυάστε διαφορετικές μεθόδους για πληρέστερη εικόνα" : "Combine different methods for complete picture"
            ],
            examples: [
              language === "el" ? "Activity: Επεξεργασία ψαριού, Driver: Ώρες επεξεργασίας" : "Activity: Fish processing, Driver: Processing hours",
              language === "el" ? "Target cost: Νέο προϊόν με στόχο €15/kg" : "Target cost: New product targeting €15/kg"
            ],
            resources: [
              language === "el" ? "ABC Costing στη βιομηχανία τροφίμων" : "ABC Costing in food industry",
              language === "el" ? "Case studies προηγμένης κοστολόγησης" : "Advanced costing case studies"
            ]
          },
        }
      ],
    },
    {
      id: "analytics-reports",
      title: language === "el" ? "Αναλύσεις & Επαγγελματικές Αναφορές" : "Analytics & Professional Reports",
      description: language === "el"
        ? "Δημιουργία προηγμένων αναλύσεων, γραφημάτων και επαγγελματικών αναφορών"
        : "Creating advanced analytics, charts and professional reports",
      icon: <BarChart3 className="w-6 h-6" />,
      estimatedTime: "35 min",
      difficulty: "intermediate",
      steps: [
        {
          id: "data-analysis",
          title: language === "el" ? "Προηγμένη Ανάλυση Δεδομένων" : "Advanced Data Analysis",
          description: language === "el"
            ? "Βαθιά κατανόηση και ερμηνεία όλων των δεδομένων"
            : "Deep understanding and interpretation of all data",
          icon: <BarChart3 className="w-5 h-5" />,
          completed: false,
          content: {
            overview: language === "el"
              ? "Η ανάλυση δεδομένων στο KostoPro περιλαμβάνει στατιστική ανάλυση, trend analysis, predictive modeling, και advanced visualization. Μπορείτε να δημιουργήσετε custom reports και dashboards."
              : "Data analysis in KostoPro includes statistical analysis, trend analysis, predictive modeling, and advanced visualization. You can create custom reports and dashboards.",
            steps: [
              language === "el" ? "1. Επιλογή και ρύθμιση KPIs και μετρήσεων" : "1. Select and configure KPIs and metrics",
              language === "el" ? "2. Δημιουργία custom queries και filters" : "2. Create custom queries and filters",
              language === "el" ? "3. Στατιστική ανάλυση και correlation analysis" : "3. Statistical analysis and correlation analysis",
              language === "el" ? "4. Trend analysis και forecasting" : "4. Trend analysis and forecasting",
              language === "el" ? "5. Comparative analysis με benchmarks" : "5. Comparative analysis with benchmarks",
              language === "el" ? "6. Drill-down analysis για λεπτομέρειες" : "6. Drill-down analysis for details",
              language === "el" ? "7. Automated reporting και scheduling" : "7. Automated reporting and scheduling"
            ],
            tips: [
              language === "el" ? "Χρησιμοποιήστε multiple time periods για trend analysis" : "Use multiple time periods for trend analysis",
              language === "el" ? "Συγκρίνετε με industry benchmarks" : "Compare with industry benchmarks",
              language === "el" ? "Δημιουργήστε alerts για σημαντικές αλλαγές" : "Create alerts for significant changes"
            ],
            examples: [
              language === "el" ? "Ανάλυση κόστους/τόνο τελευταίων 24 μηνών" : "Cost/ton analysis of last 24 months",
              language === "el" ? "Σύγκριση κερδοφορίας ανά προϊόν και εποχή" : "Profitability comparison by product and season"
            ],
            resources: [
              language === "el" ? "Οδηγός στατιστικής ανάλυσης" : "Statistical analysis guide",
              language === "el" ? "Template αναφορών" : "Report templates"
            ]
          },
        }
      ],
    },
    {
      id: "fleet-management",
      title: language === "el" ? "Διαχείριση Στόλου" : "Fleet Management",
      description: language === "el"
        ? "Πλήρης διαχείριση αλιευτικού στόλου και παρακολούθηση"
        : "Complete fishing fleet management and monitoring",
      icon: <Anchor className="w-6 h-6" />,
      estimatedTime: "30 min",
      difficulty: "advanced",
      steps: [
        {
          id: "vessel-management",
          title: language === "el" ? "Διαχείριση Σκαφών" : "Vessel Management",
          description: language === "el"
            ? "Καταχώρηση και διαχείριση όλων των στοιχείων του στόλου"
            : "Registration and management of all fleet details",
          icon: <Anchor className="w-5 h-5" />,
          completed: false,
          content: {
            overview: language === "el"
              ? "Η διαχείριση στόλου περιλαμβάνει καταχώρηση σκαφών, παρακολούθηση θέσης, διαχείριση πληρώματος, συντήρηση, και οικονομική ανάλυση."
              : "Fleet management includes vessel registration, position tracking, crew management, maintenance, and financial analysis.",
            steps: [
              language === "el" ? "1. Καταχώρηση στοιχείων σκαφών" : "1. Register vessel details",
              language === "el" ? "2. Ρύθμιση GPS tracking" : "2. Set up GPS tracking",
              language === "el" ? "3. Διαχείριση πληρώματος" : "3. Crew management",
              language === "el" ? "4. Προγραμματισμός συντήρησης" : "4. Maintenance scheduling",
              language === "el" ? "5. Παρακολούθηση καυσίμων" : "5. Fuel monitoring",
              language === "el" ? "6. Ανάλυση απόδοσης" : "6. Performance analysis"
            ],
            tips: [
              language === "el" ? "Ενημερώνετε τακτικά τα στοιχεία συντήρησης" : "Update maintenance data regularly",
              language === "el" ? "Παρακολουθήστε την κατανάλωση καυσίμων" : "Monitor fuel consumption"
            ],
            examples: [
              language === "el" ? "Σκάφος: M/V POSEIDON, Capacity: 45t" : "Vessel: M/V POSEIDON, Capacity: 45t"
            ],
            resources: [
              language === "el" ? "Οδηγός διαχείρισης στόλου" : "Fleet management guide"
            ]
          },
        }
      ],
    },
    {
      id: "quality-control",
      title: language === "el" ? "Έλεγχος Ποιότητας & HACCP" : "Quality Control & HACCP",
      description: language === "el"
        ? "Πλήρης οδηγός για HACCP, ποιοτικό έλεγχο και συμμόρφωση"
        : "Complete guide for HACCP, quality control and compliance",
      icon: <Shield className="w-6 h-6" />,
      estimatedTime: "40 min",
      difficulty: "advanced",
      steps: [
        {
          id: "haccp-basics",
          title: language === "el" ? "Βασικές Αρχές HACCP" : "HACCP Fundamentals",
          description: language === "el"
            ? "Κατανόηση και εφαρμογή των αρχών HACCP"
            : "Understanding and applying HACCP principles",
          icon: <Shield className="w-5 h-5" />,
          completed: false,
          content: {
            overview: language === "el"
              ? "Το HACCP (Hazard Analysis Critical Control Points) είναι σύστημα διαχείρισης ασφάλειας τροφίμων που εστιάζει στην πρόληψη κινδύνων."
              : "HACCP (Hazard Analysis Critical Control Points) is a food safety management system focusing on hazard prevention.",
            steps: [
              language === "el" ? "1. Ανάλυση κινδύνων" : "1. Hazard analysis",
              language === "el" ? "2. Προσδιορισμός CCPs" : "2. Identify CCPs",
              language === "el" ? "3. Καθορισμός κρίσιμων ορίων" : "3. Set critical limits",
              language === "el" ? "4. Σύστημα παρακολούθησης" : "4. Monitoring system",
              language === "el" ? "5. Διορθωτικές ενέργειες" : "5. Corrective actions",
              language === "el" ? "6. Επαλήθευση" : "6. Verification",
              language === "el" ? "7. Τεκμηρίωση" : "7. Documentation"
            ],
            tips: [
              language === "el" ? "Τηρήστε λεπτομερή αρχεία" : "Keep detailed records",
              language === "el" ? "Εκπαιδεύστε το προσωπικό" : "Train staff regularly"
            ],
            examples: [
              language === "el" ? "CCP: Θερμοκρασία ψύξης <2°C" : "CCP: Cooling temperature <2°C"
            ],
            resources: [
              language === "el" ? "HACCP Manual" : "HACCP Manual"
            ]
          },
        }
      ],
    },
    {
      id: "mobile-features",
      title: language === "el" ? "Χρήση σε Κινητά" : "Mobile Features",
      description: language === "el"
        ? "Πλήρης οδηγός για χρήση της εφαρμογής σε κινητές συσκευές"
        : "Complete guide for using the app on mobile devices",
      icon: <Smartphone className="w-6 h-6" />,
      estimatedTime: "20 min",
      difficulty: "beginner",
      steps: [
        {
          id: "mobile-interface",
          title: language === "el" ? "Κινητή Διεπαφή" : "Mobile Interface",
          description: language === "el"
            ? "Εξοικείωση με τη βελτιστοποιημένη κινητή διεπαφή"
            : "Familiarization with the optimized mobile interface",
          icon: <Smartphone className="w-5 h-5" />,
          completed: false,
          content: {
            overview: language === "el"
              ? "Η κινητή έκδοση του KostoPro είναι πλήρως responsive και βελτιστοποιημένη για tablets και smartphones."
              : "The mobile version of KostoPro is fully responsive and optimized for tablets and smartphones.",
            steps: [
              language === "el" ? "1. Navigation σε κινητές συσκευές" : "1. Mobile navigation",
              language === "el" ? "2. Touch gestures και interactions" : "2. Touch gestures and interactions",
              language === "el" ? "3. Χρήση στη περιοχή παραγωγής" : "3. Use in production area",
              language === "el" ? "4. Offline capabilities" : "4. Offline capabilities",
              language === "el" ? "5. Sync με desktop έκδοση" : "5. Sync with desktop version"
            ],
            tips: [
              language === "el" ? "Χρησιμοποιήστε landscape mode για γραφήματα" : "Use landscape mode for charts",
              language === "el" ? "Ενεργοποιήστε push notifications" : "Enable push notifications"
            ],
            examples: [
              language === "el" ? "Γρήγορη καταχώρηση από το εργοστάσιο" : "Quick entry from factory floor"
            ],
            resources: [
              language === "el" ? "Οδηγός κινητής χρήσης" : "Mobile usage guide"
            ]
          },
        }
      ],
    }
  ];

  const filteredSections = tutorialSections.filter(section => {
    const matchesSearch = searchTerm === "" || 
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = selectedDifficulty === "all" || section.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesDifficulty;
  });

  const markStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const getProgressPercentage = () => {
    const totalSteps = tutorialSections.reduce((acc, section) => acc + section.steps.length, 0);
    return (completedSteps.size / totalSteps) * 100;
  };

  const currentSection = tutorialSections.find(s => s.id === activeSection);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header with Progress */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <BookOpen className="w-8 h-8 mr-3" />
                {language === "el" ? "Ολοκληρωμένος Οδηγός KostoPro" : "Complete KostoPro Guide"}
              </CardTitle>
              <p className="text-blue-100 mt-2">
                {language === "el" 
                  ? "Μάθετε όλες τις προηγμένες δυνατότητες της εφαρμογής"
                  : "Learn all advanced application features"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{completedSteps.size}</div>
              <div className="text-blue-100">
                {language === "el" ? "Ολοκληρωμένα βήματα" : "Completed steps"}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>{language === "el" ? "Συνολική Πρόοδος" : "Overall Progress"}</span>
              <span>{getProgressPercentage().toFixed(0)}%</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-3 bg-blue-200" />
          </div>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={language === "el" ? "Αναζήτηση στον οδηγό..." : "Search guide..."}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">{language === "el" ? "Όλα τα επίπεδα" : "All levels"}</option>
                <option value="beginner">{language === "el" ? "Αρχάριος" : "Beginner"}</option>
                <option value="intermediate">{language === "el" ? "Μεσαίος" : "Intermediate"}</option>
                <option value="advanced">{language === "el" ? "Προχωρημένος" : "Advanced"}</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">
                {language === "el" ? "Κεφάλαια" : "Chapters"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredSections.map((section) => {
                  const completedStepsInSection = section.steps.filter(
                    step => completedSteps.has(step.id)
                  ).length;
                  const progressInSection = (completedStepsInSection / section.steps.length) * 100;

                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {section.icon}
                          <span className="ml-2 font-medium text-sm">{section.title}</span>
                        </div>
                        <Badge 
                          className={`text-xs ${
                            section.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                            section.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {section.difficulty === 'beginner' ? (language === "el" ? 'Αρχάριος' : 'Beginner') :
                           section.difficulty === 'intermediate' ? (language === "el" ? 'Μεσαίος' : 'Intermediate') :
                           (language === "el" ? 'Προχωρημένος' : 'Advanced')}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {section.estimatedTime} • {completedStepsInSection}/{section.steps.length} {language === "el" ? "βήματα" : "steps"}
                      </div>
                      <Progress value={progressInSection} className="h-1" />
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {currentSection && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center">
                      {currentSection.icon}
                      <span className="ml-3">{currentSection.title}</span>
                    </CardTitle>
                    <p className="text-gray-600 mt-2">{currentSection.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      className={`mb-2 ${
                        currentSection.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        currentSection.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {currentSection.difficulty === 'beginner' ? (language === "el" ? 'Αρχάριος' : 'Beginner') :
                       currentSection.difficulty === 'intermediate' ? (language === "el" ? 'Μεσαίος' : 'Intermediate') :
                       (language === "el" ? 'Προχωρημένος' : 'Advanced')}
                    </Badge>
                    <div className="text-sm text-gray-500">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {currentSection.estimatedTime}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {currentSection.steps.map((step, stepIndex) => (
                    <AccordionItem key={step.id} value={step.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center w-full">
                          <div className="flex items-center">
                            {completedSteps.has(step.id) ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-bold">
                                {stepIndex + 1}
                              </div>
                            )}
                            <div className="ml-3 text-left">
                              <div className="font-semibold">{step.title}</div>
                              <div className="text-sm text-gray-500">{step.description}</div>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-8 space-y-6">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center">
                              <Info className="w-4 h-4 mr-2 text-blue-600" />
                              {language === "el" ? "Επισκόπηση" : "Overview"}
                            </h4>
                            <p className="text-gray-700 leading-relaxed">{step.content.overview}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Target className="w-4 h-4 mr-2 text-green-600" />
                              {language === "el" ? "Βήματα" : "Steps"}
                            </h4>
                            <div className="space-y-2">
                              {step.content.steps.map((stepItem, index) => (
                                <div key={index} className="flex items-start">
                                  <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                                  <span className="text-sm">{stepItem}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
                              {language === "el" ? "Συμβουλές" : "Tips"}
                            </h4>
                            <div className="space-y-2">
                              {step.content.tips.map((tip, index) => (
                                <Alert key={index} className="border-yellow-200 bg-yellow-50">
                                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                                  <AlertDescription className="text-yellow-800">
                                    {tip}
                                  </AlertDescription>
                                </Alert>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Eye className="w-4 h-4 mr-2 text-purple-600" />
                              {language === "el" ? "Παραδείγματα" : "Examples"}
                            </h4>
                            <div className="space-y-2">
                              {step.content.examples.map((example, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg border-l-4 border-purple-500">
                                  <code className="text-sm text-purple-700">{example}</code>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <FileText className="w-4 h-4 mr-2 text-blue-600" />
                              {language === "el" ? "Πόροι" : "Resources"}
                            </h4>
                            <div className="space-y-2">
                              {step.content.resources.map((resource, index) => (
                                <div key={index} className="flex items-center">
                                  <Download className="w-4 h-4 mr-2 text-gray-400" />
                                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                                    {resource}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t">
                            <Button
                              variant={completedSteps.has(step.id) ? "secondary" : "default"}
                              onClick={() => markStepComplete(step.id)}
                              className="flex items-center"
                            >
                              {completedSteps.has(step.id) ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  {language === "el" ? "Ολοκληρώθηκε" : "Completed"}
                                </>
                              ) : (
                                <>
                                  <Target className="w-4 h-4 mr-2" />
                                  {language === "el" ? "Σήμανση ως Ολοκληρωμένο" : "Mark as Complete"}
                                </>
                              )}
                            </Button>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <FileText className="w-4 h-4 mr-2" />
                                {language === "el" ? "Εκτύπωση" : "Print"}
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                {language === "el" ? "PDF" : "PDF"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Actions Footer */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardContent className="p-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              {language === "el" ? "Λήψη Πλήρους Οδηγού" : "Download Complete Guide"}
            </Button>
            <Button variant="outline" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              {language === "el" ? "Εκτύπωση Checklist" : "Print Checklist"}
            </Button>
            <Button variant="outline" className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              {language === "el" ? "Αγαπημένα" : "Favorites"}
            </Button>
            <Button variant="outline" className="flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              {language === "el" ? "Ειδοποιήσεις Προόδου" : "Progress Notifications"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTutorial;