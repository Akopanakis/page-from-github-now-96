import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const Tutorial = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState("getting-started");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  // Tutorial sections with comprehensive content
  const tutorialSections: TutorialSection[] = [
    {
      id: "getting-started",
      title: language === "el" ? "Ξεκινώντας" : "Getting Started",
      description:
        language === "el"
          ? "Εισαγωγή στην εφαρμογή KostoPro και βασικά χαρακτηριστικά"
          : "Introduction to KostoPro application and basic features",
      icon: <PlayCircle className="w-6 h-6" />,
      estimatedTime: "10 min",
      difficulty: "beginner",
      steps: [
        {
          id: "welcome",
          title:
            language === "el"
              ? "Καλωσήρθατε στο KostoPro"
              : "Welcome to KostoPro",
          description:
            language === "el"
              ? "Γνωρίστε τη διεπαφή και τα βασικά εργαλεία"
              : "Get familiar with the interface and basic tools",
          icon: <Home className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Το KostoPro είναι μια ολοκληρωμένη εφαρμογή κοστολόγησης ειδικά σχεδιασμένη για τη βιομηχανία θαλασσινών. Παρέχει εργαλεία για ακριβή υπολογισμό κόστους, προηγμένη ανάλυση κερδοφορίας, χρηματοοικονομικά μοντέλα και λεπτομερείς επαγγελματικές αναφορές."
                : "KostoPro is a comprehensive costing application specifically designed for the seafood industry. It provides tools for accurate cost calculation, advanced profitability analysis, financial models, and detailed professional reports.",
            steps: [
              language === "el"
                ? "Εξερεύνηση του κεντρικού μενού"
                : "Explore the main menu",
              language === "el"
                ? "Εξοικείωση με την πλοήγηση"
                : "Get familiar with navigation",
              language === "el"
                ? "Κατανόηση των βασικών εικονιδίων"
                : "Understand basic icons",
              language === "el"
                ? "Προβολή του dashboard"
                : "View the dashboard",
            ],
            tips: [
              language === "el"
                ? "Χρησιμοποιήστε τη αναζήτηση για γρήγορη πρόσβαση"
                : "Use search for quick access",
              language === "el"
                ? "Προσαρμόστε τη διεπαφή στις ανάγκες σας"
                : "Customize the interface to your needs",
              language === "el"
                ? "Χρησιμοποιήστε συντομεύσεις πληκτρολογίου"
                : "Use keyboard shortcuts",
            ],
            examples: [
              language === "el"
                ? "Πατήστε Ctrl+K για αναζήτηση"
                : "Press Ctrl+K for search",
              language === "el"
                ? "Κάντε κλικ στο logo για επιστροφή στην αρχική"
                : "Click logo to return home",
            ],
          },
        },
        {
          id: "dashboard-overview",
          title:
            language === "el" ? "Επισκόπηση Dashboard" : "Dashboard Overview",
          description:
            language === "el"
              ? "Κατανόηση των βασικών στοιχείων του dashboard"
              : "Understanding the main dashboard elements",
          icon: <Monitor className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Το dashboard είναι το κεντρικό σημείο ελέγχου όπου μπορείτε να δείτε μια επισκόπηση όλων των δραστηριοτήτων σας, KPIs, και γρήγορες ενέργειες."
                : "The dashboard is your central control point where you can see an overview of all your activities, KPIs, and quick actions.",
            steps: [
              language === "el"
                ? "Προβολή βασικών μετρήσεων"
                : "View key metrics",
              language === "el" ? "Κατανόηση γραφημάτων" : "Understand charts",
              language === "el"
                ? "Χρήση γρήγορων ενεργειών"
                : "Use quick actions",
              language === "el" ? "Προσαρμογή widgets" : "Customize widgets",
            ],
            tips: [
              language === "el"
                ? "Τα γραφήματα είναι διαδραστικά - κάντε κλικ για λεπτομέρειες"
                : "Charts are interactive - click for details",
              language === "el"
                ? "Χρησιμοποιήστε φίλτρα για εξειδικευμένη προβολή"
                : "Use filters for specialized views",
            ],
            examples: [
              language === "el"
                ? "Γράφημα κόστους: Δεί��νει τάσεις κόστους στον χρόνο"
                : "Cost chart: Shows cost trends over time",
              language === "el"
                ? "Δείκτες KPI: Βασικές μετρήσεις απόδοσης"
                : "KPI indicators: Key performance metrics",
            ],
          },
        },
      ],
    },
    {
      id: "cost-calculation",
      title: language === "el" ? "Υπολογισμός Κόστους" : "Cost Calculation",
      description:
        language === "el"
          ? "Μάθετε πώς να υπολογίζετε το κόστος των προϊόντων σας"
          : "Learn how to calculate the cost of your products",
      icon: <Calculator className="w-6 h-6" />,
      estimatedTime: "15 min",
      difficulty: "beginner",
      steps: [
        {
          id: "basic-calculation",
          title:
            language === "el" ? "Βασικός Υπολογισμός" : "Basic Calculation",
          description:
            language === "el"
              ? "Εισάγετε βασικά στοιχεία για υπολογισμό κόστους"
              : "Enter basic data for cost calculation",
          icon: <Calculator className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Ο βασικός υπολογισμός κόστους περιλαμβάνει το κόστος πρώτων υλών, εργασίας, και έμμεσων εξόδων."
                : "Basic cost calculation includes raw material costs, labor, and overhead expenses.",
            steps: [
              language === "el" ? "Επιλέξτε το προϊόν" : "Select the product",
              language === "el"
                ? "Εισάγετε την ποσότητα"
                : "Enter the quantity",
              language === "el"
                ? "Προσθέστε κόστη πρώτων υλών"
                : "Add raw material costs",
              language === "el"
                ? "Συμπεριλάβετε κόστος εργασίας"
                : "Include labor costs",
              language === "el"
                ? "Προσθέστε έμμεσα έξοδα"
                : "Add overhead costs",
            ],
            tips: [
              language === "el"
                ? "Χρησιμοποιήστε ακριβή στοιχεία για καλύτερα αποτελέσματα"
                : "Use accurate data for better results",
              language === "el"
                ? "Ενημερώνετε τακτικά τις τιμές"
                : "Update prices regularly",
            ],
            examples: [
              language === "el"
                ? "Τόνος γαρίδας: €8,500"
                : "Ton of shrimp: €8,500",
              language === "el"
                ? "Εργατικό κόστος: €2,200/τόνο"
                : "Labor cost: €2,200/ton",
            ],
          },
        },
        {
          id: "advanced-costing",
          title:
            language === "el" ? "Προηγμένη Κοστολόγηση" : "Advanced Costing",
          description:
            language === "el"
              ? "Χρήση προηγμένων μεθόδων κοστολόγησης"
              : "Use advanced costing methods",
          icon: <TrendingUp className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Η προηγμένη κοστολόγηση περιλαμβάνει ABC costing, activity-based costing, και σενάρια ανάλυσης."
                : "Advanced costing includes ABC costing, activity-based costing, and scenario analysis.",
            steps: [
              language === "el"
                ? "Επιλέξτε μέθοδο κοστολόγησης"
                : "Select costing method",
              language === "el"
                ? "Ορίστε κέντρα κόστους"
                : "Define cost centers",
              language === "el"
                ? "Κατανείμετε έμμεσα κόστη"
                : "Allocate indirect costs",
              language === "el" ? "Αναλύστε σενάρια" : "Analyze scenarios",
            ],
            tips: [
              language === "el"
                ? "ABC costing παρέχει ακριβέστερα αποτελέσματα"
                : "ABC costing provides more accurate results",
              language === "el"
                ? "Χρησιμοποιήστε ιστορικά δεδομένα για προβλέψεις"
                : "Use historical data for forecasts",
            ],
            examples: [
              language === "el"
                ? "Activity: Επεξεργασία ψαριού"
                : "Activity: Fish processing",
              language === "el"
                ? "Driver: Ώρες επεξεργασίας"
                : "Driver: Processing hours",
            ],
          },
        },
      ],
    },
    {
      id: "analytics-reports",
      title: language === "el" ? "Αναλύσεις & Αναφορές" : "Analytics & Reports",
      description:
        language === "el"
          ? "Δημιουργία αναλύσεων και επαγγελματικών αναφορών"
          : "Create analytics and professional reports",
      icon: <BarChart3 className="w-6 h-6" />,
      estimatedTime: "20 min",
      difficulty: "intermediate",
      steps: [
        {
          id: "data-analysis",
          title: language === "el" ? "Ανάλυση Δεδομένων" : "Data Analysis",
          description:
            language === "el"
              ? "Κατανόηση και ερμηνεία των δεδομένων σας"
              : "Understand and interpret your data",
          icon: <BarChart3 className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Η ανάλυση δεδομένων σας βοηθά να κατανοήσετε τάσεις, να εντοπίσετε ευκαιρίες και να λάβετε βάσει δεδομένων αποφάσεις."
                : "Data analysis helps you understand trends, identify opportunities, and make data-driven decisions.",
            steps: [
              language === "el" ? "Επιλέξτε μετρήσεις" : "Select metrics",
              language === "el"
                ? "Ορίστε χρονικό διάστημα"
                : "Define time period",
              language === "el" ? "Εφαρμόστε φίλτρα" : "Apply filters",
              language === "el"
                ? "Ερμηνεύστε αποτελέσματα"
                : "Interpret results",
            ],
            tips: [
              language === "el"
                ? "Συγκρίνετε περιόδους για τάσεις"
                : "Compare periods for trends",
              language === "el"
                ? "Χρησιμοποιήστε benchmarks"
                : "Use benchmarks",
            ],
            examples: [
              language === "el"
                ? "Κόστος/τόνο: Μηνιαία τάση"
                : "Cost/ton: Monthly trend",
              language === "el"
                ? "Κερδοφορία: Σύγκριση προϊόντων"
                : "Profitability: Product comparison",
            ],
          },
        },
        {
          id: "chart-types",
          title: language === "el" ? "Τύποι Γραφημάτων" : "Chart Types",
          description:
            language === "el"
              ? "Κατανόηση διαφορετικών τύπων γραφημάτων και της χρήσης τους"
              : "Understanding different chart types and their uses",
          icon: <PieChart className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Κάθε τύπος γραφήματος είναι κατάλληλος για διαφορετικά είδη δεδομένων και αναλύσεων."
                : "Each chart type is suitable for different kinds of data and analyses.",
            steps: [
              language === "el"
                ? "Line Charts: Τάσεις στον χρόνο"
                : "Line Charts: Trends over time",
              language === "el"
                ? "Bar Charts: Συγκρίσεις"
                : "Bar Charts: Comparisons",
              language === "el"
                ? "Pie Charts: Αναλογίες"
                : "Pie Charts: Proportions",
              language === "el"
                ? "Scatter Plots: Συσχετίσεις"
                : "Scatter Plots: Correlations",
            ],
            tips: [
              language === "el"
                ? "Επιλέξτε το σωστό γράφημα για τα δεδομένα"
                : "Choose the right chart for your data",
              language === "el"
                ? "Κάντε γραφήματα απλά και κατανοητά"
                : "Keep charts simple and clear",
            ],
            examples: [
              language === "el"
                ? "Line Chart: Εξέλιξη κόστους 12 μήνες"
                : "Line Chart: Cost evolution 12 months",
              language === "el"
                ? "Bar Chart: Σύγκριση κόστους ανά προϊόν"
                : "Bar Chart: Cost comparison per product",
            ],
          },
        },
        {
          id: "report-generation",
          title:
            language === "el" ? "Δημιουργία Αναφορών" : "Report Generation",
          description:
            language === "el"
              ? "Δημιουργία επαγγελματικών αναφορών PDF"
              : "Create professional PDF reports",
          icon: <FileText className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Οι αναφορές παρέχουν επαγγελματική παρουσίαση των αποτελεσμάτων σας για stakeholders και διοίκηση."
                : "Reports provide professional presentation of your results for stakeholders and management.",
            steps: [
              language === "el"
                ? "Επιλέξτε template αναφοράς"
                : "Select report template",
              language === "el"
                ? "Προσαρμόστε περιεχόμενο"
                : "Customize content",
              language === "el" ? "Προσθέστε γραφήματα" : "Add charts",
              language === "el" ? "Εξάγετε σε PDF" : "Export to PDF",
            ],
            tips: [
              language === "el"
                ? "Συμπεριλάβετε executive summary"
                : "Include executive summary",
              language === "el"
                ? "Χρησιμοποιήστε οπτικά στοιχεία"
                : "Use visual elements",
            ],
            examples: [
              language === "el"
                ? "Μηνιαία αναφορά κόστους"
                : "Monthly cost report",
              language === "el"
                ? "Ανάλυση κερδοφορίας προϊόντων"
                : "Product profitability analysis",
            ],
          },
        },
      ],
    },
    {
      id: "sustainability",
      title: language === "el" ? "Βιωσιμότητα" : "Sustainability",
      description:
        language === "el"
          ? "Παρακολούθηση και διαχείριση μετρήσεων βιωσιμότητας"
          : "Monitor and manage sustainability metrics",
      icon: <Leaf className="w-6 h-6" />,
      estimatedTime: "25 min",
      difficulty: "intermediate",
      steps: [
        {
          id: "sustainability-overview",
          title:
            language === "el"
              ? "Επισκόπηση Βιωσιμότητας"
              : "Sustainability Overview",
          description:
            language === "el"
              ? "Κατανόηση των δεικτών βιωσιμότητας"
              : "Understanding sustainability indicators",
          icon: <Leaf className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Το σύστημα βιω��ιμότητας παρακολουθεί περιβαλλοντικούς, κοινωνικούς, οικονομικούς και διακυβέρνησης δείκτες (ESG)."
                : "The sustainability system monitors environmental, social, economic, and governance indicators (ESG).",
            steps: [
              language === "el"
                ? "Προβολή dashboard βιωσιμότητας"
                : "View sustainability dashboard",
              language === "el"
                ? "Κατανόηση κατηγοριών ESG"
                : "Understand ESG categories",
              language === "el"
                ? "Παρακολούθηση βασικών μετρήσεων"
                : "Monitor key metrics",
              language === "el" ? "Ανάλυση τάσεων" : "Analyze trends",
            ],
            tips: [
              language === "el"
                ? "Ορίστε στόχους για κάθε δείκτη"
                : "Set targets for each indicator",
              language === "el"
                ? "Ενημερώνετε δεδομένα τακτικά"
                : "Update data regularly",
            ],
            examples: [
              language === "el"
                ? "CO2 emissions: 2.84 tCO2e/ton"
                : "CO2 emissions: 2.84 tCO2e/ton",
              language === "el"
                ? "Water usage: 12.5 m³/ton"
                : "Water usage: 12.5 m³/ton",
            ],
          },
        },
        {
          id: "environmental-metrics",
          title:
            language === "el"
              ? "Περιβαλλοντικοί Δείκτες"
              : "Environmental Metrics",
          description:
            language === "el"
              ? "Παρακολούθηση περιβαλλοντικής επίδρασης"
              : "Monitor environmental impact",
          icon: <Globe className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Οι περιβαλλοντικοί δείκτες μετρούν την επίδραση των δραστηριοτήτων σας στο περιβάλλον."
                : "Environmental metrics measure the impact of your activities on the environment.",
            steps: [
              language === "el" ? "Αποτύπωμα άνθρακα" : "Carbon footprint",
              language === "el" ? "Κατανάλωση νερού" : "Water consumption",
              language === "el" ? "Διαχείριση αποβλήτων" : "Waste management",
              language === "el" ? "Ανανεώσιμη ενέργεια" : "Renewable energy",
            ],
            tips: [
              language === "el"
                ? "Μετρήστε όλες τις πηγές εκπομπών"
                : "Measure all emission sources",
              language === "el"
                ? "Ορίστε στόχους μείωσης"
                : "Set reduction targets",
            ],
            examples: [
              language === "el"
                ? "Scope 1: Άμεσες εκπομπές"
                : "Scope 1: Direct emissions",
              language === "el" ? "Scope 2: Ενέργεια" : "Scope 2: Energy",
            ],
          },
        },
        {
          id: "certifications",
          title: language === "el" ? "Πιστοποιήσεις" : "Certifications",
          description:
            language === "el"
              ? "Διαχείριση πιστοποιήσεων MSC, ASC, GlobalGAP"
              : "Manage MSC, ASC, GlobalGAP certifications",
          icon: <Award className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Οι πιστοποιήσεις διασφαλίζουν ότι οι πρακτικές σας πληρούν διεθνή πρότυπα βιωσιμότητας."
                : "Certifications ensure your practices meet international sustainability standards.",
            steps: [
              language === "el"
                ? "MSC: Marine Stewardship Council"
                : "MSC: Marine Stewardship Council",
              language === "el"
                ? "ASC: Aquaculture Stewardship Council"
                : "ASC: Aquaculture Stewardship Council",
              language === "el"
                ? "GlobalGAP: Καλές Γεωργικές Πρακτικές"
                : "GlobalGAP: Good Agricultural Practices",
              language === "el" ? "GDST: Ιχνηλασιμότητα" : "GDST: Traceability",
            ],
            tips: [
              language === "el"
                ? "Παρακολουθείτε ημερομηνίες λήξης"
                : "Track expiration dates",
              language === "el"
                ? "Προετοιμαστείτε για audits"
                : "Prepare for audits",
            ],
            examples: [
              language === "el" ? "MSC Coverage: 87.5%" : "MSC Coverage: 87.5%",
              language === "el" ? "ASC Coverage: 92.1%" : "ASC Coverage: 92.1%",
            ],
          },
        },
      ],
    },
    {
      id: "advanced-features",
      title:
        language === "el" ? "Προηγμένα Χαρακτηριστικά" : "Advanced Features",
      description:
        language === "el"
          ? "Προηγμένες λειτουργίες και εργαλεία"
          : "Advanced functions and tools",
      icon: <Zap className="w-6 h-6" />,
      estimatedTime: "30 min",
      difficulty: "advanced",
      steps: [
        {
          id: "ai-predictions",
          title: language === "el" ? "AI Προβλέψεις" : "AI Predictions",
          description:
            language === "el"
              ? "Χρήση τεχνητής νοημοσύνης για προβλέψεις"
              : "Use artificial intelligence for predictions",
          icon: <Zap className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Η τεχνητή νοημοσύνη αναλύει ιστορικά δεδομένα για να προβλέψει μελλοντικές τάσεις κόστους και αγοράς."
                : "Artificial intelligence analyzes historical data to predict future cost and market trends.",
            steps: [
              language === "el"
                ? "Ενεργοποίηση AI features"
                : "Enable AI features",
              language === "el"
                ? "Επιλογή μοντέλου πρόβλεψης"
                : "Select prediction model",
              language === "el" ? "Ανάλυση αποτελεσμάτων" : "Analyze results",
              language === "el" ? "Προσαρμογή παραμέτρων" : "Adjust parameters",
            ],
            tips: [
              language === "el"
                ? "Περισσότερα δεδομένα = καλύτερες προβλέψεις"
                : "More data = better predictions",
              language === "el"
                ? "Επικυρώστε προβλέψεις με ειδικούς"
                : "Validate predictions with experts",
            ],
            examples: [
              language === "el"
                ? "Πρόβλεψη τιμής γαρίδας: +12% next Q"
                : "Shrimp price prediction: +12% next Q",
              language === "el"
                ? "Seasonal trends: Summer peak"
                : "Seasonal trends: Summer peak",
            ],
          },
        },
        {
          id: "automation",
          title: language === "el" ? "Αυτοματοποίηση" : "Automation",
          description:
            language === "el"
              ? "Αυτοματοποίηση διαδικασιών και αναφορών"
              : "Automate processes and reports",
          icon: <RefreshCw className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Η αυτοματοποίηση εξοικονομεί χρόνο και μειώνει λάθη αυτοματοποιώντας επαναλαμβανόμενες εργασίες."
                : "Automation saves time and reduces errors by automating repetitive tasks.",
            steps: [
              language === "el"
                ? "Ορισμός κανόνων αυτοματισμού"
                : "Define automation rules",
              language === "el"
                ? "Προγραμματισμός αναφορών"
                : "Schedule reports",
              language === "el"
                ? "Ειδοποιήσεις και alerts"
                : "Notifications and alerts",
              language === "el" ? "Μαζική επεξεργασία" : "Batch processing",
            ],
            tips: [
              language === "el"
                ? "Ξεκινήστε με απλούς αυτοματισμούς"
                : "Start with simple automations",
              language === "el"
                ? "Ελέγχετε τακτικά τα αποτελέσματα"
                : "Check results regularly",
            ],
            examples: [
              language === "el"
                ? "Αυτόματη ενημέρωση τιμών"
                : "Automatic price updates",
              language === "el" ? "Εβδομαδιαίες αναφορές" : "Weekly reports",
            ],
          },
        },
        {
          id: "integrations",
          title: language === "el" ? "Ενσωματώσεις" : "Integrations",
          description:
            language === "el"
              ? "Σύνδεση με εξωτερικά συστήματα"
              : "Connect with external systems",
          icon: <Network className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Οι ενσωματώσεις επιτρέπουν τη σύνδεση με ERP, CRM, και άλλα επιχειρησιακά συστήματα."
                : "Integrations allow connection with ERP, CRM, and other business systems.",
            steps: [
              language === "el"
                ? "Επιλογή τύπου ενσωμάτωσης"
                : "Select integration type",
              language === "el"
                ? "Διαμόρφωση σύνδεσης"
                : "Configure connection",
              language === "el" ? "Χαρτογράφηση δεδομένων" : "Map data fields",
              language === "el" ? "Δοκιμή και επικύρωση" : "Test and validate",
            ],
            tips: [
              language === "el"
                ? "Δοκιμάστε σε test περιβάλλον πρώτα"
                : "Test in staging environment first",
              language === "el" ? "Κρατήστε backups" : "Keep backups",
            ],
            examples: [
              language === "el" ? "SAP ERP integration" : "SAP ERP integration",
              language === "el"
                ? "QuickBooks accounting"
                : "QuickBooks accounting",
            ],
          },
        },
      ],
    },
    {
      id: "mobile-usage",
      title: language === "el" ? "Χρήση σε Κινητά" : "Mobile Usage",
      description:
        language === "el"
          ? "Χρήση της εφαρμογής σε κινητές συσκευές"
          : "Using the application on mobile devices",
      icon: <Smartphone className="w-6 h-6" />,
      estimatedTime: "10 min",
      difficulty: "beginner",
      steps: [
        {
          id: "mobile-interface",
          title: language === "el" ? "Κινητή Διεπαφή" : "Mobile Interface",
          description:
            language === "el"
              ? "Προσαρμογή στις κινητές συσκευές"
              : "Adaptation for mobile devices",
          icon: <Smartphone className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Η εφαρμογή είναι πλήρως responsive και προσαρμόζεται σε όλες τις συσκευές."
                : "The application is fully responsive and adapts to all devices.",
            steps: [
              language === "el"
                ? "Navigation menu: Συρόμενο μενού"
                : "Navigation menu: Slide menu",
              language === "el"
                ? "Touch gestures: Πινch to zoom"
                : "Touch gestures: Pinch to zoom",
              language === "el"
                ? "Quick actions: Swipe για ενέργειες"
                : "Quick actions: Swipe for actions",
              language === "el"
                ? "Offline support: Συγχρονισμός"
                : "Offline support: Sync",
            ],
            tips: [
              language === "el"
                ? "Χρησιμοποιήστε landscape για γραφήματα"
                : "Use landscape for charts",
              language === "el"
                ? "Voice input για γρήγορη εισαγωγή"
                : "Voice input for quick entry",
            ],
            examples: [
              language === "el" ? "Swipe left: Διαγραφή" : "Swipe left: Delete",
              language === "el"
                ? "Long press: Περισσότερες επιλογές"
                : "Long press: More options",
            ],
          },
        },
      ],
    },
    {
      id: "troubleshooting",
      title: language === "el" ? "Αντιμετώπιση Προβλημάτων" : "Troubleshooting",
      description:
        language === "el"
          ? "Επίλυση συνηθισμένων προβλημάτων"
          : "Solving common problems",
      icon: <AlertTriangle className="w-6 h-6" />,
      estimatedTime: "15 min",
      difficulty: "beginner",
      steps: [
        {
          id: "common-issues",
          title: language === "el" ? "Συνήθη Προβλήματα" : "Common Issues",
          description:
            language === "el"
              ? "Επίλυση βασικών προβλημάτων"
              : "Solving basic problems",
          icon: <AlertTriangle className="w-5 h-5" />,
          completed: false,
          content: {
            overview:
              language === "el"
                ? "Αντιμετώπιση των πιο συνηθισμένων προβλημάτων που μπορεί να αντιμετωπίσετε."
                : "Addressing the most common problems you might encounter.",
            steps: [
              language === "el" ? "Προβλήματα σύνδεσης" : "Connection issues",
              language === "el" ? "Αργή φόρτωση" : "Slow loading",
              language === "el" ? "Λάθη υπολογισμών" : "Calculation errors",
              language === "el" ? "Προβλήματα εξαγωγής" : "Export problems",
            ],
            tips: [
              language === "el" ? "Ανανεώστε τη σελίδα" : "Refresh the page",
              language === "el" ? "Καθαρίστε τη cache" : "Clear cache",
              language === "el"
                ? "Ελέγξτε τη σύνδεση internet"
                : "Check internet connection",
            ],
            examples: [
              language === "el"
                ? "Error 500: Επικοινωνήστε με υποστήριξη"
                : "Error 500: Contact support",
              language === "el"
                ? "Timeout: Μικρότερα batch sizes"
                : "Timeout: Smaller batch sizes",
            ],
          },
        },
      ],
    },
  ];

  const currentSection = tutorialSections.find((s) => s.id === activeSection);
  const totalSteps = tutorialSections.reduce(
    (sum, section) => sum + section.steps.length,
    0,
  );
  const completedCount = completedSteps.size;
  const progressPercentage = Math.round((completedCount / totalSteps) * 100);

  const markStepCompleted = (stepId: string) => {
    setCompletedSteps((prev) => new Set([...prev, stepId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                <span>
                  {language === "el"
                    ? "Οδηγός Χρήσης KostoPro"
                    : "KostoPro User Guide"}
                </span>
              </h1>
              <p className="text-gray-600 mt-2">
                {language === "el"
                  ? "Μάθετε να χρησιμοποιείτε όλες τις λειτουργίες της εφαρμογής"
                  : "Learn to use all application features"}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {completedCount}
                </div>
                <div className="text-sm text-gray-500">
                  {language === "el" ? "Ολοκληρωμένα" : "Completed"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {totalSteps}
                </div>
                <div className="text-sm text-gray-500">
                  {language === "el" ? "Συνολικά" : "Total"}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  {language === "el" ? "Συνολική Πρόοδος" : "Overall Progress"}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {progressPercentage}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-xs text-gray-500 mt-2">
                {language === "el"
                  ? `${completedCount} από ${totalSteps} βήματα ολοκληρωμένα`
                  : `${completedCount} of ${totalSteps} steps completed`}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === "el" ? "Κεφάλαια" : "Sections"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tutorialSections.map((section) => {
                    const sectionCompleted = section.steps.every((step) =>
                      completedSteps.has(step.id),
                    );

                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`${activeSection === section.id ? "text-blue-600" : "text-gray-600"}`}
                          >
                            {section.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {section.title}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center space-x-2">
                              <Clock className="w-3 h-3" />
                              <span>{section.estimatedTime}</span>
                              <Badge
                                className={`${getDifficultyColor(section.difficulty)} text-xs`}
                              >
                                {section.difficulty}
                              </Badge>
                            </div>
                          </div>
                          {sectionCompleted && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentSection && (
              <div className="space-y-6">
                {/* Section Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-blue-600">
                          {currentSection.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl">
                            {currentSection.title}
                          </CardTitle>
                          <p className="text-gray-600 mt-2">
                            {currentSection.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={getDifficultyColor(
                            currentSection.difficulty,
                          )}
                        >
                          {currentSection.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {currentSection.estimatedTime}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Steps */}
                <div className="space-y-4">
                  {currentSection.steps.map((step, index) => {
                    const isCompleted = completedSteps.has(step.id);

                    return (
                      <Card
                        key={step.id}
                        className={`transition-all ${
                          isCompleted ? "border-green-200 bg-green-50" : ""
                        }`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  isCompleted
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <span className="text-sm font-medium">
                                    {index + 1}
                                  </span>
                                )}
                              </div>
                              <div>
                                <CardTitle className="text-lg">
                                  {step.title}
                                </CardTitle>
                                <p className="text-gray-600">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                            {!isCompleted && (
                              <Button
                                size="sm"
                                onClick={() => markStepCompleted(step.id)}
                                variant="outline"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {language === "el" ? "Ολοκλήρωση" : "Complete"}
                              </Button>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent>
                          <Accordion type="single" collapsible>
                            <AccordionItem value="content">
                              <AccordionTrigger>
                                {language === "el"
                                  ? "Προβολή Λεπτομερειών"
                                  : "View Details"}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-6">
                                  {/* Overview */}
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                                      <Info className="w-4 h-4 mr-2 text-blue-600" />
                                      {language === "el"
                                        ? "Επισκόπηση"
                                        : "Overview"}
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                      {step.content.overview}
                                    </p>
                                  </div>

                                  {/* Steps */}
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                                      <Target className="w-4 h-4 mr-2 text-green-600" />
                                      {language === "el" ? "Βήματα" : "Steps"}
                                    </h4>
                                    <ol className="space-y-2">
                                      {step.content.steps.map(
                                        (stepItem, stepIndex) => (
                                          <li
                                            key={stepIndex}
                                            className="flex items-start space-x-3"
                                          >
                                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                              {stepIndex + 1}
                                            </span>
                                            <span className="text-sm text-gray-700">
                                              {stepItem}
                                            </span>
                                          </li>
                                        ),
                                      )}
                                    </ol>
                                  </div>

                                  {/* Tips */}
                                  {step.content.tips.length > 0 && (
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                                        <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
                                        {language === "el"
                                          ? "Συμβουλές"
                                          : "Tips"}
                                      </h4>
                                      <ul className="space-y-2">
                                        {step.content.tips.map(
                                          (tip, tipIndex) => (
                                            <li
                                              key={tipIndex}
                                              className="flex items-start space-x-3"
                                            >
                                              <Star className="flex-shrink-0 w-4 h-4 text-yellow-500 mt-0.5" />
                                              <span className="text-sm text-gray-700">
                                                {tip}
                                              </span>
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Examples */}
                                  {step.content.examples.length > 0 && (
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                                        <Eye className="w-4 h-4 mr-2 text-purple-600" />
                                        {language === "el"
                                          ? "Παραδείγματα"
                                          : "Examples"}
                                      </h4>
                                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        {step.content.examples.map(
                                          (example, exampleIndex) => (
                                            <div
                                              key={exampleIndex}
                                              className="font-mono text-sm text-gray-800 bg-white px-3 py-2 rounded border"
                                            >
                                              {example}
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Navigation */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = tutorialSections.findIndex(
                            (s) => s.id === activeSection,
                          );
                          if (currentIndex > 0) {
                            setActiveSection(
                              tutorialSections[currentIndex - 1].id,
                            );
                          }
                        }}
                        disabled={
                          tutorialSections.findIndex(
                            (s) => s.id === activeSection,
                          ) === 0
                        }
                      >
                        {language === "el" ? "Προηγούμενο" : "Previous"}
                      </Button>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          {language === "el" ? "Κεφάλαιο" : "Section"}{" "}
                          {tutorialSections.findIndex(
                            (s) => s.id === activeSection,
                          ) + 1}{" "}
                          {language === "el" ? "από" : "of"}{" "}
                          {tutorialSections.length}
                        </p>
                      </div>

                      <Button
                        onClick={() => {
                          const currentIndex = tutorialSections.findIndex(
                            (s) => s.id === activeSection,
                          );
                          if (currentIndex < tutorialSections.length - 1) {
                            setActiveSection(
                              tutorialSections[currentIndex + 1].id,
                            );
                          }
                        }}
                        disabled={
                          tutorialSections.findIndex(
                            (s) => s.id === activeSection,
                          ) ===
                          tutorialSections.length - 1
                        }
                      >
                        {language === "el" ? "Επόμενο" : "Next"}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tutorial;
