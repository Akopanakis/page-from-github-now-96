import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Globe,
  DollarSign,
  BarChart3,
  Users,
  Building,
  MapPin,
  Calendar,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  Eye,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Download,
  Search,
  Filter,
  Settings,
  Bell,
  Activity,
  Star,
  Shield,
  Package,
  Fish,
  Ship,
  Factory,
  Navigation,
  Anchor,
  Clock,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MoreVertical,
  ExternalLink,
  Calculator,
  Award,
  Timer,
  Scale,
  Briefcase,
  Container,
  Truck,
  Heart,
  Leaf,
  FileText,
  Database,
  Wifi,
  Smartphone,
  MonitorSpeaker,
  Brain,
  Signal,
  Radar,
} from "lucide-react";

interface CompetitorData {
  id: string;
  name: string;
  marketShare: number;
  avgPrice: number;
  priceChange: number;
  qualityRating: number;
  sustainabilityScore: number;
  strongPoints: string[];
  weakPoints: string[];
  lastUpdated: Date;
  products: {
    name: string;
    price: number;
    quality: string;
    availability: string;
    marketPosition: "leader" | "challenger" | "follower" | "nicher";
  }[];
  marketStrategy: "premium" | "value" | "volume" | "niche";
  geographicFocus: string[];
  financial: {
    revenue: number;
    growth: number;
    marketCap?: number;
    employees: number;
  };
  certifications: string[];
  channels: string[];
  threats: string[];
  opportunities: string[];
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    score: number;
  };
}

interface MarketTrend {
  id: string;
  category: string;
  trend: "up" | "down" | "stable";
  percentage: number;
  description: string;
  timeframe: string;
  confidence: number;
  sources: string[];
  impact: "high" | "medium" | "low";
  region: string;
  relatedProducts: string[];
  forecast: {
    nextMonth: number;
    nextQuarter: number;
    nextYear: number;
  };
}

interface PriceAlert {
  id: string;
  productName: string;
  currentPrice: number;
  targetPrice: number;
  alertType: "above" | "below";
  competitor: string;
  isActive: boolean;
  createdDate: Date;
  priority: "high" | "medium" | "low";
  triggered: boolean;
  notifications: number;
}

interface MarketOpportunity {
  id: string;
  title: string;
  description: string;
  estimatedValue: number;
  timeToMarket: number;
  investmentRequired: number;
  riskLevel: "low" | "medium" | "high";
  category: "product" | "market" | "technology" | "partnership";
  successProbability: number;
  competitors: string[];
  requirements: string[];
}

interface MarketIntelligenceSystemProps {
  className?: string;
}

const MarketIntelligenceSystem: React.FC<MarketIntelligenceSystemProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [marketOpportunities, setMarketOpportunities] = useState<
    MarketOpportunity[]
  >([]);
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<CompetitorData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRealTimeMode, setIsRealTimeMode] = useState(true);

  // Real-time market data simulation
  useEffect(() => {
    if (!isRealTimeMode) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate price fluctuations
      setCompetitors((prev) =>
        prev.map((comp) => ({
          ...comp,
          avgPrice: comp.avgPrice + (Math.random() - 0.5) * 0.1,
          priceChange: (Math.random() - 0.5) * 5,
        })),
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isRealTimeMode]);

  // Initialize with comprehensive data for Greek seafood market
  useEffect(() => {
    const sampleCompetitors: CompetitorData[] = [
      {
        id: "comp-001",
        name: "Aegean Premium Seafood",
        marketShare: 28.5,
        avgPrice: 14.5,
        priceChange: 2.3,
        qualityRating: 4.7,
        sustainabilityScore: 89,
        strongPoints: [
          language === "el"
            ? "Υψηλή ποιότητα προϊόντων"
            : "High product quality",
          language === "el"
            ? "Ισχυρό brand recognition"
            : "Strong brand recognition",
          language === "el"
            ? "Εκτενείς πιστοποιήσεις"
            : "Extensive certifications",
          language === "el" ? "Δίκτυο διανομής" : "Distribution network",
          language === "el" ? "Καινοτόμα συσκευασία" : "Innovative packaging",
        ],
        weakPoints: [
          language === "el" ? "Υψηλές τιμές πώλησης" : "High selling prices",
          language === "el"
            ? "Περιορισμένη γκάμα προϊόντων"
            : "Limited product range",
          language === "el"
            ? "Εξάρτηση από premium market"
            : "Dependence on premium market",
        ],
        lastUpdated: new Date("2024-11-20"),
        products: [
          {
            name:
              language === "el"
                ? "Τσιπούρα Premium Aegean"
                : "Premium Aegean Sea Bream",
            price: 16.8,
            quality: "A+",
            availability: language === "el" ? "Διαθέσιμο" : "Available",
            marketPosition: "leader",
          },
          {
            name: language === "el" ? "Λαβράκι Βιολογικό" : "Organic Sea Bass",
            price: 19.2,
            quality: "A+",
            availability: language === "el" ? "Περιορισμένο" : "Limited",
            marketPosition: "leader",
          },
          {
            name: language === "el" ? "Σολομός Καπνιστός" : "Smoked Salmon",
            price: 24.5,
            quality: "A",
            availability: language === "el" ? "Διαθέσιμο" : "Available",
            marketPosition: "leader",
          },
        ],
        marketStrategy: "premium",
        geographicFocus: [
          "Αττική",
          "Θεσσαλονίκη",
          "Κρήτη",
          "Εξαγωγές ΕΕ",
          "Μύκονος",
          "Σαντορίνη",
        ],
        financial: {
          revenue: 15200000,
          growth: 8.5,
          marketCap: 45000000,
          employees: 185,
        },
        certifications: [
          "MSC",
          "HACCP",
          "ISO 22000",
          "Organic",
          "BRC",
          "IFS",
          "GlobalGAP",
        ],
        channels: [
          "Luxury Retail",
          "Fine Dining",
          "Online Premium",
          "Export",
          "Hotel Chains",
        ],
        threats: [
          language === "el"
            ? "Νέοι premium ανταγωνιστές"
            : "New premium competitors",
          language === "el"
            ? "Αύξηση κόστους πρώτων υλών"
            : "Rising raw material costs",
          language === "el" ? "Κλιματική αλλαγή" : "Climate change",
        ],
        opportunities: [
          language === "el" ? "Επέκταση σε βιολογικά" : "Organic expansion",
          language === "el"
            ? "Νέες διεθνείς αγορές"
            : "New international markets",
          language === "el" ? "E-commerce ανάπτυξη" : "E-commerce development",
        ],
        swotAnalysis: {
          strengths: [
            "Premium quality",
            "Brand recognition",
            "Certifications",
            "Distribution",
          ],
          weaknesses: ["High costs", "Limited volume", "Price sensitivity"],
          opportunities: [
            "Organic growth",
            "Export expansion",
            "Tech integration",
          ],
          threats: ["Climate change", "Competition", "Regulations"],
          score: 82,
        },
      },
      {
        id: "comp-002",
        name: "Mediterranean Fish Co",
        marketShare: 22.1,
        avgPrice: 11.8,
        priceChange: -1.2,
        qualityRating: 4.3,
        sustainabilityScore: 76,
        strongPoints: [
          language === "el" ? "Ανταγωνιστικές τιμές" : "Competitive pricing",
          language === "el" ? "Μεγάλη γκάμα προϊόντων" : "Wide product range",
          language === "el" ? "Υψηλή διαθεσιμότητα" : "High availability",
          language === "el" ? "Ευέλικτη παραγωγή" : "Flexible production",
        ],
        weakPoints: [
          language === "el" ? "Ασυνεπής ποιότητα" : "Inconsistent quality",
          language === "el"
            ? "Χαμηλή brand αναγνώριση"
            : "Low brand recognition",
          language === "el"
            ? "Περιορισμένες πιστοποιήσεις"
            : "Limited certifications",
        ],
        lastUpdated: new Date("2024-11-19"),
        products: [
          {
            name:
              language === "el" ? "Τσιπούρα Standard" : "Standard Sea Bream",
            price: 12.5,
            quality: "B+",
            availability: language === "el" ? "Διαθέσιμο" : "Available",
            marketPosition: "challenger",
          },
          {
            name:
              language === "el" ? "Λαβράκι Συμβατικό" : "Conventional Sea Bass",
            price: 13.8,
            quality: "B",
            availability: language === "el" ? "Διαθέσιμο" : "Available",
            marketPosition: "challenger",
          },
        ],
        marketStrategy: "value",
        geographicFocus: ["Κεντρική Ελλάδα", "Πελοπόννησος", "Βόρεια Ελλάδα"],
        financial: {
          revenue: 11800000,
          growth: 3.2,
          employees: 142,
        },
        certifications: ["HACCP", "ISO 22000", "BRC"],
        channels: ["Wholesale", "Supermarkets", "Food Service"],
        threats: [
          language === "el" ? "Πίεση τιμών" : "Price pressure",
          language === "el" ? "Premium ανταγωνισμός" : "Premium competition",
        ],
        opportunities: [
          language === "el" ? "Διεύρυνση δικτύου" : "Network expansion",
          language === "el" ? "Βελτίωση ποιότητας" : "Quality improvement",
        ],
        swotAnalysis: {
          strengths: ["Cost efficiency", "Volume capacity", "Distribution"],
          weaknesses: ["Quality consistency", "Brand weakness"],
          opportunities: ["Market expansion", "Quality upgrade"],
          threats: ["Price wars", "Premium shift"],
          score: 68,
        },
      },
      {
        id: "comp-003",
        name: "Hellenic Aquaculture Ventures",
        marketShare: 18.7,
        avgPrice: 13.2,
        priceChange: 4.1,
        qualityRating: 4.5,
        sustainabilityScore: 91,
        strongPoints: [
          language === "el" ? "Βιώσιμες πρακτικές" : "Sustainable practices",
          language === "el"
            ? "Τεχνολογική καινοτομία"
            : "Technological innovation",
          language === "el"
            ? "Παγκόσμιες πιστοποιήσεις"
            : "Global certifications",
          language === "el" ? "R&D επενδύσεις" : "R&D investments",
        ],
        weakPoints: [
          language === "el"
            ? "Υψηλό κόστος παραγωγής"
            : "High production costs",
          language === "el" ? "Νέα στην αγορά" : "New to market",
        ],
        lastUpdated: new Date("2024-11-21"),
        products: [
          {
            name:
              language === "el" ? "Eco-Smart Τσιπούρα" : "Eco-Smart Sea Bream",
            price: 15.2,
            quality: "A",
            availability: language === "el" ? "Διαθέσιμο" : "Available",
            marketPosition: "nicher",
          },
        ],
        marketStrategy: "niche",
        geographicFocus: ["Κρήτη", "Ιόνια Νησιά", "Εξαγωγές"],
        financial: {
          revenue: 8500000,
          growth: 12.8,
          employees: 98,
        },
        certifications: [
          "ASC",
          "MSC",
          "HACCP",
          "ISO 22000",
          "Organic",
          "Carbon Neutral",
        ],
        channels: ["Eco-retailers", "Organic stores", "Export"],
        threats: [
          language === "el" ? "Κόστος βιωσιμότητας" : "Sustainability costs",
        ],
        opportunities: [
          language === "el"
            ? "Green market expansion"
            : "Green market expansion",
          language === "el" ? "EU πράσινες επιδοτήσεις" : "EU green subsidies",
        ],
        swotAnalysis: {
          strengths: [
            "Sustainability leadership",
            "Innovation",
            "Certifications",
          ],
          weaknesses: ["High costs", "Market awareness"],
          opportunities: ["Green trends", "Regulation changes"],
          threats: ["Cost pressure", "Greenwashing competitors"],
          score: 75,
        },
      },
      {
        id: "comp-004",
        name: "Fresh Ocean Solutions",
        marketShare: 15.3,
        avgPrice: 10.9,
        priceChange: 0.8,
        qualityRating: 4.1,
        sustainabilityScore: 65,
        strongPoints: [
          language === "el" ? "Γρήγορη παράδοση" : "Fast delivery",
          language === "el" ? "Χαμηλές τιμές" : "Low prices",
          language === "el"
            ? "Μεγάλη παραγωγική δυναμικότητα"
            : "Large production capacity",
        ],
        weakPoints: [
          language === "el" ? "Χαμηλή ποιότητα" : "Lower quality",
          language === "el"
            ? "Περιβαλλοντικά θέματα"
            : "Environmental concerns",
        ],
        lastUpdated: new Date("2024-11-18"),
        products: [
          {
            name:
              language === "el" ? "Τσιπούρα Οικονομική" : "Economy Sea Bream",
            price: 9.8,
            quality: "C+",
            availability: language === "el" ? "Διαθέσιμο" : "Available",
            marketPosition: "follower",
          },
        ],
        marketStrategy: "volume",
        geographicFocus: ["Αττική", "Θεσσαλονίκη"],
        financial: {
          revenue: 9200000,
          growth: 1.5,
          employees: 156,
        },
        certifications: ["HACCP"],
        channels: ["Mass retail", "Food service"],
        threats: [
          language === "el"
            ? "Περιβαλλοντικοί κανονισμοί"
            : "Environmental regulations",
        ],
        opportunities: [
          language === "el" ? "Βελτίωση διαδικασιών" : "Process improvement",
        ],
        swotAnalysis: {
          strengths: ["Cost leadership", "Volume", "Speed"],
          weaknesses: ["Quality issues", "Environmental impact"],
          opportunities: ["Efficiency gains", "Automation"],
          threats: ["Regulations", "Quality standards"],
          score: 55,
        },
      },
      {
        id: "comp-005",
        name: "Artisan Sea Harvest",
        marketShare: 8.2,
        avgPrice: 18.5,
        priceChange: 3.7,
        qualityRating: 4.9,
        sustainabilityScore: 85,
        strongPoints: [
          language === "el" ? "Χειροποίητη ποιότητα" : "Artisanal quality",
          language === "el" ? "Τοπικές παραδόσεις" : "Local traditions",
          language === "el" ? "Premium τιμολόγηση" : "Premium pricing",
        ],
        weakPoints: [
          language === "el" ? "Περιορισμένη παραγωγή" : "Limited production",
          language === "el" ? "Υψηλό κόστος" : "High costs",
        ],
        lastUpdated: new Date("2024-11-17"),
        products: [
          {
            name:
              language === "el"
                ? "Τσιπούρα Χειροποίητη"
                : "Artisanal Sea Bream",
            price: 22.0,
            quality: "A++",
            availability: language === "el" ? "Περιορισμένο" : "Limited",
            marketPosition: "nicher",
          },
        ],
        marketStrategy: "premium",
        geographicFocus: ["Κυκλάδες", "Κρήτη"],
        financial: {
          revenue: 2800000,
          growth: 15.2,
          employees: 35,
        },
        certifications: ["Organic", "Local Heritage", "MSC"],
        channels: ["Gourmet shops", "Restaurants"],
        threats: [language === "el" ? "Κλιματική αλλαγή" : "Climate change"],
        opportunities: [
          language === "el" ? "Luxury tourism" : "Luxury tourism",
        ],
        swotAnalysis: {
          strengths: ["Unique quality", "Brand story", "Local heritage"],
          weaknesses: ["Scale limitations", "Cost structure"],
          opportunities: ["Luxury growth", "Export premium"],
          threats: ["Climate impact", "Labor costs"],
          score: 72,
        },
      },
    ];

    const sampleTrends: MarketTrend[] = [
      {
        id: "trend-001",
        category: language === "el" ? "Τιμές Τσιπούρας" : "Sea Bream Prices",
        trend: "up",
        percentage: 8.5,
        description:
          language === "el"
            ? "Αύξηση τιμών λόγω μειωμένης παραγωγής και αυξημένης ζήτησης"
            : "Price increase due to reduced supply and increased demand",
        timeframe: language === "el" ? "Τελευταίοι 3 μήνες" : "Last 3 months",
        confidence: 87,
        sources: [
          "FishMarket Analytics",
          "EU Fish Price Index",
          "Greek Aquaculture Association",
        ],
        impact: "high",
        region: "Mediterranean",
        relatedProducts: ["Λαβράκι", "Μπακαλιάρος", "Σολομός"],
        forecast: {
          nextMonth: 9.2,
          nextQuarter: 12.1,
          nextYear: 15.5,
        },
      },
      {
        id: "trend-002",
        category: language === "el" ? "Βιολογικά Προϊόντα" : "Organic Products",
        trend: "up",
        percentage: 15.2,
        description:
          language === "el"
            ? "Εκρηκτική αύξηση ζήτησης για βιολογικά θαλασσινά"
            : "Explosive growth in demand for organic seafood",
        timeframe: language === "el" ? "Ετήσια βάση" : "Annual basis",
        confidence: 92,
        sources: ["Organic Market Report", "Consumer Research Institute"],
        impact: "high",
        region: "Europe",
        relatedProducts: ["Όλα τα βιολογικά θαλασσινά"],
        forecast: {
          nextMonth: 16.8,
          nextQuarter: 18.5,
          nextYear: 22.3,
        },
      },
      {
        id: "trend-003",
        category:
          language === "el" ? "Τεχνολογική Καινοτομία" : "Tech Innovation",
        trend: "up",
        percentage: 23.7,
        description:
          language === "el"
            ? "Ραγδαία ανάπτυξη smart aquaculture τεχνολογιών"
            : "Rapid development of smart aquaculture technologies",
        timeframe: language === "el" ? "6 μήνες" : "6 months",
        confidence: 85,
        sources: ["Tech Market Reports", "Innovation Index"],
        impact: "medium",
        region: "Global",
        relatedProducts: ["Αυτοματοποιημένα συστήματα"],
        forecast: {
          nextMonth: 25.1,
          nextQuarter: 28.9,
          nextYear: 35.6,
        },
      },
      {
        id: "trend-004",
        category:
          language === "el"
            ? "Sustainability Standards"
            : "Sustainability Standards",
        trend: "up",
        percentage: 18.9,
        description:
          language === "el"
            ? "Αυστηρότερα standards βιωσιμότητας στην αγορά"
            : "Stricter sustainability standards in the market",
        timeframe: language === "el" ? "Ετήσια" : "Annual",
        confidence: 94,
        sources: ["EU Sustainability Report", "MSC Statistics"],
        impact: "high",
        region: "EU",
        relatedProducts: ["Πιστοποιημένα προϊόντα"],
        forecast: {
          nextMonth: 19.5,
          nextQuarter: 21.2,
          nextYear: 26.8,
        },
      },
      {
        id: "trend-005",
        category: language === "el" ? "E-commerce Sales" : "E-commerce Sales",
        trend: "up",
        percentage: 32.4,
        description:
          language === "el"
            ? "Μεγάλη αύξηση online πωλήσεων θαλασσινών"
            : "Major increase in online seafood sales",
        timeframe: language === "el" ? "12 μήνες" : "12 months",
        confidence: 88,
        sources: ["E-commerce Analytics", "Digital Sales Reports"],
        impact: "medium",
        region: "Greece",
        relatedProducts: ["Frozen seafood", "Premium products"],
        forecast: {
          nextMonth: 34.1,
          nextQuarter: 38.7,
          nextYear: 45.2,
        },
      },
    ];

    const sampleAlerts: PriceAlert[] = [
      {
        id: "alert-001",
        productName:
          language === "el" ? "Τσιπούρα Premium" : "Premium Sea Bream",
        currentPrice: 16.8,
        targetPrice: 15.0,
        alertType: "above",
        competitor: "Aegean Premium Seafood",
        isActive: true,
        createdDate: new Date("2024-11-15"),
        priority: "high",
        triggered: true,
        notifications: 3,
      },
      {
        id: "alert-002",
        productName:
          language === "el" ? "Λαβράκι Standard" : "Standard Sea Bass",
        currentPrice: 13.2,
        targetPrice: 14.0,
        alertType: "below",
        competitor: "Mediterranean Fish Co",
        isActive: true,
        createdDate: new Date("2024-11-18"),
        priority: "medium",
        triggered: false,
        notifications: 0,
      },
      {
        id: "alert-003",
        productName:
          language === "el" ? "Eco-Smart Τσιπούρα" : "Eco-Smart Sea Bream",
        currentPrice: 15.2,
        targetPrice: 16.0,
        alertType: "below",
        competitor: "Hellenic Aquaculture Ventures",
        isActive: true,
        createdDate: new Date("2024-11-20"),
        priority: "low",
        triggered: false,
        notifications: 0,
      },
    ];

    const sampleOpportunities: MarketOpportunity[] = [
      {
        id: "opp-001",
        title:
          language === "el"
            ? "Επέκταση σε Premium Organic"
            : "Premium Organic Expansion",
        description:
          language === "el"
            ? "Ευκαιρία εισόδου στην αναπτυσσόμενη αγορά premium βιολογικών προϊόντων"
            : "Opportunity to enter the growing premium organic products market",
        estimatedValue: 2500000,
        timeToMarket: 8,
        investmentRequired: 800000,
        riskLevel: "medium",
        category: "product",
        successProbability: 75,
        competitors: [
          "Aegean Premium Seafood",
          "Hellenic Aquaculture Ventures",
        ],
        requirements: [
          "Organic certification",
          "Premium packaging",
          "Distribution network",
        ],
      },
      {
        id: "opp-002",
        title:
          language === "el"
            ? "AI-Powered Aquaculture"
            : "AI-Powered Aquaculture",
        description:
          language === "el"
            ? "Εφαρμογή τεχνητής νοημοσύνης για βελτιστοποίηση παραγωγής"
            : "Implementation of AI for production optimization",
        estimatedValue: 1800000,
        timeToMarket: 12,
        investmentRequired: 1200000,
        riskLevel: "high",
        category: "technology",
        successProbability: 60,
        competitors: ["Tech startups"],
        requirements: [
          "Technology partnership",
          "R&D investment",
          "Staff training",
        ],
      },
      {
        id: "opp-003",
        title:
          language === "el"
            ? "Direct-to-Consumer Platform"
            : "Direct-to-Consumer Platform",
        description:
          language === "el"
            ? "Ανάπτυξη online πλατφόρμας άμεσων πωλήσεων"
            : "Development of direct sales online platform",
        estimatedValue: 1200000,
        timeToMarket: 6,
        investmentRequired: 400000,
        riskLevel: "low",
        category: "market",
        successProbability: 85,
        competitors: ["E-commerce platforms"],
        requirements: [
          "Website development",
          "Logistics setup",
          "Marketing campaign",
        ],
      },
      {
        id: "opp-004",
        title:
          language === "el"
            ? "Συνεργασία με Celebrity Chefs"
            : "Celebrity Chef Partnerships",
        description:
          language === "el"
            ? "Στρατηγικές συνεργασίες με διάσημους σεφ για brand building"
            : "Strategic partnerships with famous chefs for brand building",
        estimatedValue: 900000,
        timeToMarket: 4,
        investmentRequired: 300000,
        riskLevel: "medium",
        category: "partnership",
        successProbability: 70,
        competitors: ["Premium brands"],
        requirements: [
          "Celebrity partnerships",
          "Marketing budget",
          "Premium products",
        ],
      },
      {
        id: "opp-005",
        title:
          language === "el"
            ? "Export σε Emerging Markets"
            : "Emerging Markets Export",
        description:
          language === "el"
            ? "Είσοδος σε αναδυόμενες αγορές Ασίας-Αφρικής"
            : "Entry into emerging Asia-Africa markets",
        estimatedValue: 3200000,
        timeToMarket: 18,
        investmentRequired: 1500000,
        riskLevel: "high",
        category: "market",
        successProbability: 55,
        competitors: ["International players"],
        requirements: [
          "Export licenses",
          "Local partnerships",
          "Market research",
        ],
      },
    ];

    setCompetitors(sampleCompetitors);
    setMarketTrends(sampleTrends);
    setPriceAlerts(sampleAlerts);
    setMarketOpportunities(sampleOpportunities);
  }, [language]);

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatLargeCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `€${(amount / 1000).toFixed(0)}K`;
    }
    return formatCurrency(amount);
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") {
      return <ArrowUpRight className="w-4 h-4 text-green-600" />;
    } else if (trend === "down") {
      return <ArrowDownRight className="w-4 h-4 text-red-600" />;
    } else {
      return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getQualityStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
      );
    }
    return stars;
  };

  const getRiskColor = (risk: string) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    };
    return colors[risk as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStrategyColor = (strategy: string) => {
    const colors = {
      premium: "bg-purple-100 text-purple-800",
      value: "bg-blue-100 text-blue-800",
      volume: "bg-green-100 text-green-800",
      niche: "bg-orange-100 text-orange-800",
    };
    return (
      colors[strategy as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  // Market share data for pie chart
  const marketShareData = competitors.map((comp) => ({
    name: comp.name,
    value: comp.marketShare,
    color: `hsl(${competitors.indexOf(comp) * 72}, 70%, 50%)`,
  }));

  // Price comparison data
  const priceComparisonData = competitors.map((comp) => ({
    name: comp.name.split(" ")[0],
    price: comp.avgPrice,
    quality: comp.qualityRating,
    sustainability: comp.sustainabilityScore,
  }));

  // Growth trend data
  const growthTrendData = competitors.map((comp) => ({
    name: comp.name.split(" ")[0],
    growth: comp.financial.growth,
    revenue: comp.financial.revenue / 1000000,
    marketShare: comp.marketShare,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el"
              ? "Market Intelligence Center"
              : "Market Intelligence Center"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Ανάλυση αγοράς και ανταγωνισμού σε πραγματικό χρόνο με AI insights"
              : "Real-time market analysis and competitive intelligence with AI insights"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {language === "el" ? "Live:" : "Live:"}{" "}
            {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button
            size="sm"
            variant={isRealTimeMode ? "default" : "outline"}
            onClick={() => setIsRealTimeMode(!isRealTimeMode)}
          >
            <Wifi className="w-4 h-4 mr-2" />
            {language === "el" ? "Real-time" : "Real-time"}
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Εξαγωγή" : "Export"}
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέα Ανάλυση" : "New Analysis"}
          </Button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Ανταγωνιστές" : "Competitors"}
                </p>
                <p className="text-2xl font-bold">{competitors.length}</p>
                <p className="text-xs text-green-600">
                  +2 {language === "el" ? "νέοι μήνα" : "new this month"}
                </p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Θετικές Τάσεις" : "Positive Trends"}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {marketTrends.filter((t) => t.trend === "up").length}
                </p>
                <p className="text-xs text-green-600">
                  +18% {language === "el" ? "avg growth" : "avg growth"}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Ενεργές Ειδοποιήσεις" : "Active Alerts"}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {priceAlerts.filter((a) => a.triggered).length}
                </p>
                <p className="text-xs text-orange-600">
                  {priceAlerts.filter((a) => a.priority === "high").length} high
                  priority
                </p>
              </div>
              <Bell className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el"
                    ? "Ευκαιρίες Αγοράς"
                    : "Market Opportunities"}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {marketOpportunities.length}
                </p>
                <p className="text-xs text-purple-600">
                  {formatLargeCurrency(
                    marketOpportunities.reduce(
                      (sum, opp) => sum + opp.estimatedValue,
                      0,
                    ),
                  )}{" "}
                  total value
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Μέσο Market Share" : "Avg Market Share"}
                </p>
                <p className="text-2xl font-bold text-indigo-600">
                  {competitors.length > 0
                    ? (
                        competitors.reduce((sum, c) => sum + c.marketShare, 0) /
                        competitors.length
                      ).toFixed(1)
                    : "0"}
                  %
                </p>
                <p className="text-xs text-indigo-600">
                  +2.3% vs{" "}
                  {language === "el"
                    ? "προηγούμενο τρίμηνο"
                    : "previous quarter"}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="competitors">
            {language === "el" ? "Ανταγωνιστές" : "Competitors"}
          </TabsTrigger>
          <TabsTrigger value="trends">
            {language === "el" ? "Τάσεις" : "Trends"}
          </TabsTrigger>
          <TabsTrigger value="pricing">
            {language === "el" ? "Τιμές" : "Pricing"}
          </TabsTrigger>
          <TabsTrigger value="opportunities">
            {language === "el" ? "Ευκαιρίες" : "Opportunities"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === "el" ? "Αναλυτικά" : "Analytics"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Share Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el"
                    ? "Κατανομή Market Share"
                    : "Market Share Distribution"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Market Share"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Price vs Quality Scatter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el" ? "Τιμή vs Ποιότητα" : "Price vs Quality"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={priceComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="price" name="Price" unit="€" />
                    <YAxis dataKey="quality" name="Quality" domain={[0, 5]} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter dataKey="quality" fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Key Trends Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                {language === "el"
                  ? "Βασικές Τάσεις Αγοράς"
                  : "Key Market Trends"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketTrends.slice(0, 6).map((trend) => (
                  <div
                    key={trend.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getTrendIcon(trend.trend)}
                      <div>
                        <h4 className="font-medium text-sm">
                          {trend.category}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {trend.description}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {trend.confidence}%{" "}
                          {language === "el" ? "βεβαιότητα" : "confidence"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold text-lg ${
                          trend.trend === "up"
                            ? "text-green-600"
                            : trend.trend === "down"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {trend.trend === "up"
                          ? "+"
                          : trend.trend === "down"
                            ? "-"
                            : ""}
                        {trend.percentage}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {trend.timeframe}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitive Positioning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-purple-600" />
                {language === "el"
                  ? "Ανταγωνιστική Τοποθέτηση"
                  : "Competitive Positioning"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={growthTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    fill="#8884d8"
                    name="Revenue (M€)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="growth"
                    stroke="#ff7300"
                    strokeWidth={3}
                    name="Growth (%)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="marketShare"
                    stroke="#00ff00"
                    strokeWidth={2}
                    name="Market Share (%)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          {/* Competitor Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={
                        language === "el"
                          ? "Αναζήτηση ανταγωνιστή..."
                          : "Search competitor..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">
                      {language === "el"
                        ? "Όλες οι κατηγορίες"
                        : "All categories"}
                    </option>
                    <option value="premium">
                      {language === "el" ? "Premium" : "Premium"}
                    </option>
                    <option value="value">
                      {language === "el" ? "Value" : "Value"}
                    </option>
                    <option value="volume">
                      {language === "el" ? "Volume" : "Volume"}
                    </option>
                    <option value="niche">
                      {language === "el" ? "Niche" : "Niche"}
                    </option>
                  </select>
                </div>
                <Badge variant="outline">
                  {
                    competitors.filter(
                      (c) =>
                        (filterCategory === "all" ||
                          c.marketStrategy === filterCategory) &&
                        c.name.toLowerCase().includes(searchTerm.toLowerCase()),
                    ).length
                  }{" "}
                  {language === "el" ? "ανταγωνιστές" : "competitors"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Competitors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {competitors
              .filter(
                (c) =>
                  (filterCategory === "all" ||
                    c.marketStrategy === filterCategory) &&
                  c.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((competitor) => (
                <Card
                  key={competitor.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {competitor.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={getStrategyColor(
                            competitor.marketStrategy,
                          )}
                        >
                          {competitor.marketStrategy}
                        </Badge>
                        <div className="flex items-center">
                          {getQualityStars(competitor.qualityRating)}
                          <span className="ml-1 text-sm">
                            {competitor.qualityRating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {competitor.marketShare}%
                        </div>
                        <div className="text-xs text-gray-500">
                          Market Share
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(competitor.avgPrice)}
                        </div>
                        <div className="text-xs text-gray-500">Avg Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {competitor.sustainabilityScore}
                        </div>
                        <div className="text-xs text-gray-500">
                          Sustainability
                        </div>
                      </div>
                    </div>

                    {/* Financial Performance */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2 text-sm">
                        {language === "el"
                          ? "Οικονομικά Στοιχεία"
                          : "Financial Performance"}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Revenue:</span>
                          <span className="font-medium">
                            {formatLargeCurrency(competitor.financial.revenue)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Growth:</span>
                          <span
                            className={`font-medium ${
                              competitor.financial.growth > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {competitor.financial.growth > 0 ? "+" : ""}
                            {competitor.financial.growth}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Employees:</span>
                          <span className="font-medium">
                            {competitor.financial.employees}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price Change:</span>
                          <span
                            className={`font-medium ${
                              competitor.priceChange > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {competitor.priceChange > 0 ? "+" : ""}
                            {competitor.priceChange.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* SWOT Summary */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-50 p-2 rounded text-xs">
                        <div className="font-medium text-green-800 mb-1">
                          {language === "el" ? "Δυνάμεις" : "Strengths"}
                        </div>
                        <ul className="text-green-700 space-y-0.5">
                          {competitor.strongPoints
                            .slice(0, 2)
                            .map((point, idx) => (
                              <li key={idx}>• {point}</li>
                            ))}
                        </ul>
                      </div>
                      <div className="bg-red-50 p-2 rounded text-xs">
                        <div className="font-medium text-red-800 mb-1">
                          {language === "el" ? "Αδυναμίες" : "Weaknesses"}
                        </div>
                        <ul className="text-red-700 space-y-0.5">
                          {competitor.weakPoints
                            .slice(0, 2)
                            .map((point, idx) => (
                              <li key={idx}>• {point}</li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {/* Products Preview */}
                    <div className="border-t pt-3">
                      <h4 className="font-medium mb-2 text-sm">
                        {language === "el" ? "Κύρια Προϊόντα" : "Key Products"}
                      </h4>
                      <div className="space-y-1">
                        {competitor.products.slice(0, 2).map((product, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm"
                          >
                            <span>{product.name}</span>
                            <span className="font-medium">
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-1">
                      {competitor.certifications
                        .slice(0, 4)
                        .map((cert, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {cert}
                          </Badge>
                        ))}
                      {competitor.certifications.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{competitor.certifications.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedCompetitor(competitor)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {language === "el" ? "Λεπτομέρειες" : "Details"}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calculator className="w-4 h-4 mr-1" />
                        {language === "el" ? "Ανάλυση" : "Analyze"}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Target className="w-4 h-4 mr-1" />
                        {language === "el" ? "Σύγκριση" : "Compare"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Trends Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el"
                    ? "Τάσεις Αγοράς - Πρόβλεψη"
                    : "Market Trends - Forecast"}
                </span>
                <Badge variant="outline">
                  {marketTrends.length}{" "}
                  {language === "el" ? "ενεργές τάσεις" : "active trends"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketTrends.map((trend) => (
                  <Card key={trend.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2">
                          <div className="flex items-center space-x-3 mb-2">
                            {getTrendIcon(trend.trend)}
                            <h3 className="font-semibold">{trend.category}</h3>
                            <Badge
                              className={
                                trend.impact === "high"
                                  ? "bg-red-100 text-red-800"
                                  : trend.impact === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {trend.impact} impact
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {trend.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{trend.timeframe}</span>
                            <span>•</span>
                            <span>{trend.confidence}% confidence</span>
                            <span>•</span>
                            <span>{trend.region}</span>
                          </div>
                        </div>

                        <div className="text-center">
                          <div
                            className={`text-3xl font-bold ${
                              trend.trend === "up"
                                ? "text-green-600"
                                : trend.trend === "down"
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {trend.trend === "up"
                              ? "+"
                              : trend.trend === "down"
                                ? "-"
                                : ""}
                            {trend.percentage}%
                          </div>
                          <div className="text-xs text-gray-500">Current</div>
                          <Progress
                            value={Math.min(Math.abs(trend.percentage), 100)}
                            className="mt-2 h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-gray-600">Next Month:</span>
                            <span className="font-medium ml-2">
                              +{trend.forecast.nextMonth}%
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Next Quarter:</span>
                            <span className="font-medium ml-2">
                              +{trend.forecast.nextQuarter}%
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Next Year:</span>
                            <span className="font-medium ml-2">
                              +{trend.forecast.nextYear}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-600">
                              Sources:{" "}
                            </span>
                            {trend.sources.map((source, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs mr-1"
                              >
                                {source}
                              </Badge>
                            ))}
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">
                              Related:{" "}
                            </span>
                            {trend.relatedProducts
                              .slice(0, 3)
                              .map((product, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs mr-1"
                                >
                                  {product}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          {/* Price Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-600" />
                  {language === "el" ? "Ειδοποιήσεις Τιμών" : "Price Alerts"}
                </span>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  {language === "el" ? "Νέα Ειδοποίηση" : "New Alert"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {priceAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.triggered
                        ? "bg-red-50 border-red-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            alert.triggered ? "bg-red-500" : "bg-gray-400"
                          }`}
                        />
                        <div>
                          <h4 className="font-medium">{alert.productName}</h4>
                          <p className="text-sm text-gray-600">
                            {alert.competitor} -{" "}
                            {alert.alertType === "above" ? "Above" : "Below"}{" "}
                            {formatCurrency(alert.targetPrice)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {formatCurrency(alert.currentPrice)}
                        </div>
                        <Badge
                          className={
                            alert.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : alert.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {alert.priority}
                        </Badge>
                      </div>
                    </div>
                    {alert.triggered && (
                      <Alert className="mt-3 bg-red-50 border-red-200">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          {language === "el"
                            ? "Ειδοποίηση ενεργοποιήθηκε!"
                            : "Alert triggered!"}
                          {alert.notifications}{" "}
                          {language === "el"
                            ? "ειδοποιήσεις στάλθηκαν"
                            : "notifications sent"}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el"
                  ? "Σύγκριση Τιμών Ανταγωνιστών"
                  : "Competitor Price Comparison"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={priceComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      formatCurrency(value as number),
                      "Price",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="price"
                    fill="#8884d8"
                    name="Average Price (€)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          {/* Market Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  {language === "el"
                    ? "Ευκαιρίες Αγοράς"
                    : "Market Opportunities"}
                </span>
                <div className="text-sm text-gray-600">
                  Total Value:{" "}
                  {formatLargeCurrency(
                    marketOpportunities.reduce(
                      (sum, opp) => sum + opp.estimatedValue,
                      0,
                    ),
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {marketOpportunities.map((opportunity) => (
                  <Card
                    key={opportunity.id}
                    className="border-l-4 border-l-purple-500"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {opportunity.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {opportunity.description}
                          </p>
                        </div>
                        <Badge className={getRiskColor(opportunity.riskLevel)}>
                          {opportunity.riskLevel} risk
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            {formatLargeCurrency(opportunity.estimatedValue)}
                          </div>
                          <div className="text-xs text-gray-500">
                            Estimated Value
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            {opportunity.timeToMarket}m
                          </div>
                          <div className="text-xs text-gray-500">
                            Time to Market
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-orange-600">
                            {formatLargeCurrency(
                              opportunity.investmentRequired,
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            Investment Required
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-purple-600">
                            {opportunity.successProbability}%
                          </div>
                          <div className="text-xs text-gray-500">
                            Success Probability
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-1">
                            {language === "el" ? "Απαιτήσεις" : "Requirements"}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.requirements.map((req, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-1">
                            {language === "el" ? "Ανταγωνιστές" : "Competitors"}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.competitors.map((comp, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {comp}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Progress
                          value={opportunity.successProbability}
                          className="h-2"
                        />
                      </div>

                      <div className="flex justify-between mt-4 pt-3 border-t">
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-1" />
                          {language === "el" ? "Λεπτομέρειες" : "Details"}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calculator className="w-4 h-4 mr-1" />
                          {language === "el" ? "Ανάλυση ROI" : "ROI Analysis"}
                        </Button>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          {language === "el" ? "Εφαρμογή" : "Implement"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Advanced Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-indigo-600" />
                  {language === "el"
                    ? "AI Market Insights"
                    : "AI Market Insights"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                      <strong>
                        {language === "el" ? "AI Πρόβλεψη:" : "AI Prediction:"}
                      </strong>
                      {language === "el"
                        ? " Αναμένεται αύξηση τιμών κατά 12-15% τους επόμενους 3 μήνες λόγω περιορισμένης προσφοράς."
                        : " Expected price increase of 12-15% in the next 3 months due to limited supply."}
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <Target className="h-4 w-4" />
                    <AlertDescription>
                      <strong>
                        {language === "el"
                          ? "Στρατηγική Σύσταση:"
                          : "Strategic Recommendation:"}
                      </strong>
                      {language === "el"
                        ? " Εστίαση σε premium βιολογικά προϊόντα για μεγιστοποίηση κερδών."
                        : " Focus on premium organic products to maximize profits."}
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>
                        {language === "el" ? "Προειδοποίηση:" : "Warning:"}
                      </strong>
                      {language === "el"
                        ? " Νέος ισχυρός ανταγωνιστής εισέρχεται στην αγορά τον επόμενο μήνα."
                        : " New strong competitor entering the market next month."}
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Signal className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el"
                    ? "Sentiment Analysis"
                    : "Market Sentiment Analysis"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>
                      {language === "el"
                        ? "Συνολικό Sentiment"
                        : "Overall Sentiment"}
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      Positive
                    </Badge>
                  </div>
                  <Progress value={78} className="h-3" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>
                        {language === "el" ? "Social Media:" : "Social Media:"}
                      </span>
                      <span className="text-green-600">+82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {language === "el"
                          ? "News Coverage:"
                          : "News Coverage:"}
                      </span>
                      <span className="text-blue-600">+65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {language === "el"
                          ? "Industry Reports:"
                          : "Industry Reports:"}
                      </span>
                      <span className="text-green-600">+71%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {language === "el"
                          ? "Consumer Surveys:"
                          : "Consumer Surveys:"}
                      </span>
                      <span className="text-green-600">+89%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comprehensive Market Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el"
                  ? "Σωρευτική Ανάλυση Αγοράς"
                  : "Comprehensive Market Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <ComposedChart data={priceComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="price"
                    fill="#8884d8"
                    name="Price (€)"
                  />
                  <Area
                    yAxisId="right"
                    dataKey="sustainability"
                    fill="#82ca9d"
                    name="Sustainability Score"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="quality"
                    stroke="#ff7300"
                    strokeWidth={3}
                    name="Quality Rating"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketIntelligenceSystem;
