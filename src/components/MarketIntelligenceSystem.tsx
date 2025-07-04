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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Globe,
  DollarSign,
  BarChart3,
  LineChart,
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
  PieChart,
  Award,
  Timer,
  Scale,
  Briefcase,
  Container,
  Truck,
  Heart,
  Leaf,
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
}

interface MarketAnalysis {
  id: string;
  title: string;
  type: "competitive" | "pricing" | "demand" | "supply" | "regulatory";
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  confidence: number;
  dateCreated: Date;
  author: string;
  status: "draft" | "published" | "archived";
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
  const [marketAnalyses, setMarketAnalyses] = useState<MarketAnalysis[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Initialize with comprehensive sample data
  useEffect(() => {
    const sampleCompetitors: CompetitorData[] = [
      {
        id: "comp-001",
        name: "Aegean Premium Seafood",
        marketShare: 28.5,
        avgPrice: 14.50,
        priceChange: 2.3,
        qualityRating: 4.7,
        sustainabilityScore: 89,
        strongPoints: [
          language === "el" ? "Υψηλή ποιότητα" : "High quality",
          language === "el" ? "Ισχυρό brand" : "Strong brand",
          language === "el" ? "Πιστοποιήσεις" : "Certifications",
          language === "el" ? "Δίκτυο διανομής" : "Distribution network"
        ],
        weakPoints: [
          language === "el" ? "Υψηλές τιμές" : "High prices",
          language === "el" ? "Περιορισμένη γκάμα" : "Limited range"
        ],
        lastUpdated: new Date("2024-11-20"),
        products: [
          {
            name: language === "el" ? "Τσιπούρα Premium" : "Premium Sea Bream",
            price: 16.80,
            quality: "A+",
            availability: language === "el" ? "Διαθέσιμο" : "Available",
            marketPosition: "leader"
          },
          {
            name: language === "el" ? "Λαβράκι Βιολογικό" : "Organic Sea Bass",
            price: 19.20,
            quality: "A+",
            availability: language === "el" ? "Περιορισμένο" : "Limited",
            marketPosition: "leader"
          }
        ],
        marketStrategy: "premium",
        geographicFocus: ["Αττική", "Θεσσαλονίκη", "Κρήτη", "Εξαγωγές ΕΕ"],
        financial: {
          revenue: 15200000,
          growth: 8.5,
          marketCap: 45000000,
          employees: 185
        },
        certifications: ["MSC", "HACCP", "ISO 22000", "Organic", "BRC"],
        channels: ["Λιανική", "Χονδρική", "Online", "Εστιατόρια", "Εξαγωγές"],
        threats: [
          language === "el" ? "Νέοι ανταγωνιστές" : "New competitors",
          language === "el" ? "Κόστος πρώτων υλών" : "Raw material costs"
        ],
        opportunities: [
          language === "el" ? "Βιολογικά προϊόντα" : "Organic products",
          language === "el" ? "Νέες αγορές" : "New markets"
        ]
      },
      {
        id: "comp-002",
        name: "Mediterranean Fish Co",
        marketShare: 22.1,
        avgPrice: 11.80,
        priceChange: -1.2,
        qualityRating: 4.3,
        sustainabilityScore: 76,
        strongPoints: [
          language === "el" ? "Ανταγωνιστικές τιμές" : "Competitive prices",
          language === "el" ? "Μεγάλη γκάμα" : "Wide range",
          language === "el" ? "Διαθεσιμότητα" : "Availability"
        ],
        weakPoints: [
          language === "el" ? "Ποιότητα" : "Quality inconsistency",
          language === "el" ? "Brand αναγνώριση" : "Brand recognition"
        ],
        lastUpdated: new Date("2024-11-19"),
        products: [
          {
            name: language === "el" ? "Τσιπούρα Standard" : "Standard Sea Bream",
            price: 12.50,
            quality: "B+",
            availability: language === "el" ? "Διαθέσιμο" : "Available",
            marketPosition: "challenger"
          },
          {
            name: language === "el" ? "Μπακαλιάρος" : "Cod Fillet",
            price: 18.90,
            quality: "A-",
            availability: language === "el" ? "Διαθέσιμο" : "Available",
            marketPosition: "challenger"
          }
        ],
        marketStrategy: "value",
        geographicFocus: ["Κεντρική Ελλάδα", "Πελοπόννησος", "Βόρεια Ελλάδα"],
        financial: {
          revenue: 11800000,
          growth: 3.2,
          employees: 142
        },
        certifications: ["HACCP", "ISO 22000"],
        channels: ["Χονδρική", "Σούπερ Μάρκετ", "Ψαραγορά"],
        threats: [
          language === "el" ? "Πίεση τιμών" : "Price pressure",
          language === "el" ? "Κανονισμοί" : "Regulations"
        ],
        opportunities: [
          language === "el" ? "Διεύρυνση δικτύου" : "Network expansion",
          language === "el" ? "Ιδιωτική ετικέτα" : "Private label"
        ]
      },
      {
        id: "comp-003",
        name: "Island Fresh Fisheries",
        marketShare: 15.8,
        avgPrice: 13.20,
        priceChange: 1.8,
        qualityRating: 4.5,
        sustainabilityScore: 92,
        strongPoints: [
          language === "el" ? "Φρεσκάδα" : "Freshness",
          language === "el" ? "Τοπική προέλευση" : "Local sourcing",
          language === "el" ? "Βιωσιμότητα" : "Sustainability"
        ],
        weakPoints: [
          language === "el" ? "Περιορισμένη διανομή" : "Limited distribution",
          language === "el" ? "Εποχικότητα" : "Seasonality"
        ],
        lastUpdated: new Date("2024-11-18"),
        products: [
          {
            name: language === "el" ? "Σαρδέλες Αιγαίου" : "Aegean Sardines",
            price: 8.50,
            quality: "A",
            availability: language === "el" ? "Εποχιακό" : "Seasonal",
            marketPosition: "nicher"
          },
          {
            name: language === "el" ? "Μύδια Θερμαϊκού" : "Thermaikos Mussels",
            price: 6.80,
            quality: "A+",
            availability: language === "el" ? "Διαθέσιμο" : "Available",
            marketPosition: "leader"
          }
        ],
        marketStrategy: "niche",
        geographicFocus: ["Νησιά Αιγαίου", "Κυκλάδες", "Δωδεκάνησα"],
        financial: {
          revenue: 7400000,
          growth: 12.1,
          employees: 89
        },
        certifications: ["MSC", "HACCP", "Organic", "Local Origin"],
        channels: ["Εστιατόρια", "Boutique", "Τουρισμός"],
        threats: [
          language === "el" ? "Κλιματική αλλαγή" : "Climate change",
          language === "el" ? "Μεγάλοι παίκτες" : "Large players"
        ],
        opportunities: [
          language === "el" ? "Eco-tourism" : "Eco-tourism",
          language === "el" ? "Premium positioning" : "Premium positioning"
        ]
      }
    ];

    const sampleTrends: MarketTrend[] = [
      {
        id: "trend-001",
        category: language === "el" ? "Τιμές Τσιπούρας" : "Sea Bream Prices",
        trend: "up",
        percentage: 8.5,
        description: language === "el"
          ? "Αύξηση τιμών λόγω μειωμένης παραγωγής και αυξημένης ζήτησης"
          : "Price increase due to reduced supply and increased demand",
        timeframe: language === "el" ? "Τελευταίοι 3 μήνες" : "Last 3 months",
        confidence: 87,
        sources: ["FishMarket Analytics", "EU Fish Price Index", "Greek Aquaculture Report"],
        impact: "high",
        region: "Μεσόγειος",
        relatedProducts: ["Λαβράκι", "Μπακαλιάρος"]
      },
      {
        id: "trend-002",
        category: language === "el" ? "Βιολογικά Προϊόντα" : "Organic Products",
        trend: "up",
        percentage: 15.2,
        description: language === "el"
          ? "Αυξανόμενη ζήτηση για βιολογικά θαλασσινά προϊόντα"
          : "Growing demand for organic seafood products",
        timeframe: language === "el" ? "Ετήσια βάση" : "Annual basis",
        confidence: 92,
        sources: ["Organic Market Report", "Consumer Research", "EU Organic Sales"],
        impact: "medium",
        region: "Ευρώπη",
        relatedProducts: ["Τσιπούρα", "Λαβράκι", "Μύδια"]
      },
      {
        id: "trend-003",
        category: language === "el" ? "Online Πωλήσεις" : "Online Sales",
        trend: "up",
        percentage: 23.7,
        description: language === "el"
          ? "Ραγδαία αύξηση των online πωλήσεων θαλασσινών"
          : "Rapid growth in online seafood sales",
        timeframe: language === "el" ? "Τελευταίο έτος" : "Last year",
        confidence: 89,
        sources: ["E-commerce Analytics", "Digital Sales Report", "Online Fish Markets"],
        impact: "high",
        region: "Ελλάδα",
        relatedProducts: ["Όλα τα προϊόντα"]
      },
      {
        id: "trend-004",
        category: language === "el" ? "Κόστος Καυσίμων" : "Fuel Costs",
        trend: "up",
        percentage: 12.3,
        description: language === "el"
          ? "Αύξηση κόστους καυσίμων επηρεάζει τις τιμές"
          : "Rising fuel costs affecting prices",
        timeframe: language === "el" ? "Τελευταίοι 6 μήνες" : "Last 6 months",
        confidence: 94,
        sources: ["Fuel Price Index", "Shipping Cost Report", "Fleet Analysis"],
        impact: "medium",
        region: "Παγκό��μια",
        relatedProducts: ["Όλα τα προϊόντα"]
      }
    ];

    const sampleAlerts: PriceAlert[] = [
      {
        id: "alert-001",
        productName: language === "el" ? "Τσιπούρα Premium" : "Premium Sea Bream",
        currentPrice: 16.80,
        targetPrice: 15.00,
        alertType: "above",
        competitor: "Aegean Premium Seafood",
        isActive: true,
        createdDate: new Date("2024-11-15"),
        priority: "high",
        triggered: true
      },
      {
        id: "alert-002",
        productName: language === "el" ? "Μπακαλιάρος" : "Cod Fillet",
        currentPrice: 18.90,
        targetPrice: 20.00,
        alertType: "below",
        competitor: "Mediterranean Fish Co",
        isActive: true,
        createdDate: new Date("2024-11-10"),
        priority: "medium",
        triggered: false
      }
    ];

    const sampleAnalyses: MarketAnalysis[] = [
      {
        id: "analysis-001",
        title: language === "el" ? "Ανάλυση Ανταγωνισμού Q4 2024" : "Competitive Analysis Q4 2024",
        type: "competitive",
        summary: language === "el"
          ? "Εμπεριστατωμένη ανάλυση του ανταγωνιστικού τοπίου"
          : "Comprehensive analysis of the competitive landscape",
        keyFindings: [
          language === "el" ? "Aegean Premium διατηρεί ηγετική θέση" : "Aegean Premium maintains market leadership",
          language === "el" ? "Αύξηση ζήτησης για βιολογικά προϊόντα" : "Increased demand for organic products",
          language === "el" ? "Πίεση στις τιμές από νέους παίκτες" : "Price pressure from new entrants"
        ],
        recommendations: [
          language === "el" ? "Επένδυση σε βιολογικά προϊόντα" : "Invest in organic products",
          language === "el" ? "Ενίσχυση online παρουσίας" : "Strengthen online presence",
          language === "el" ? "Διαφοροποίηση προϊόντων" : "Product differentiation"
        ],
        confidence: 88,
        dateCreated: new Date("2024-11-18"),
        author: "Market Research Team",
        status: "published"
      }
    ];

    setCompetitors(sampleCompetitors);
    setMarketTrends(sampleTrends);
    setPriceAlerts(sampleAlerts);
    setMarketAnalyses(sampleAnalyses);
  }, [language]);

  // Auto refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getTrendIcon = (trend: string, percentage: number) => {
    if (trend === "up") {
      return <ArrowUpRight className="w-4 h-4 text-green-600" />;
    } else if (trend === "down") {
      return <ArrowDownRight className="w-4 h-4 text-red-600" />;
    } else {
      return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMarketShareColor = (share: number) => {
    if (share > 25) return "text-green-600";
    if (share > 15) return "text-blue-600";
    if (share > 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getQualityStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 text-yellow-400" />);
    }
    return stars;
  };

  const filteredCompetitors = competitors.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === "all" || comp.marketStrategy === filterCategory)
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el" ? "Market Intelligence" : "Market Intelligence"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Ανάλυση αγοράς, ανταγωνισμού και τάσεων σε πραγματικό χρόνο"
              : "Real-time market analysis, competitive intelligence and trend monitoring"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {language === "el" ? "Τελευταία ενημέρωση:" : "Last updated:"} {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button size="sm" variant="outline" onClick={() => setLastUpdate(new Date())}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {language === "el" ? "Ανανέωση" : "Refresh"}
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Ανταγωνιστές" : "Competitors"}
                </p>
                <p className="text-2xl font-bold">{competitors.length}</p>
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
                  {language === "el" ? "Ενεργές Τάσεις" : "Active Trends"}
                </p>
                <p className="text-2xl font-bold text-green-600">{marketTrends.filter(t => t.trend === "up").length}</p>
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
                  {language === "el" ? "Ειδοποιήσεις Τιμών" : "Price Alerts"}
                </p>
                <p className="text-2xl font-bold text-orange-600">{priceAlerts.filter(a => a.triggered).length}</p>
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
                  {language === "el" ? "Μέσο Market Share" : "Avg Market Share"}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {(competitors.reduce((sum, c) => sum + c.marketShare, 0) / competitors.length).toFixed(1)}%
                </p>
              </div>
              <PieChart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
          <TabsTrigger value="analysis">
            {language === "el" ? "Αναλύσεις" : "Analysis"}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {language === "el" ? "Αναφορές" : "Reports"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Market Trends Overview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    {language === "el" ? "Τάσεις Αγοράς" : "Market Trends"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketTrends.slice(0, 4).map((trend) => (
                      <div key={trend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getTrendIcon(trend.trend, trend.percentage)}
                          <div>
                            <h4 className="font-medium">{trend.category}</h4>
                            <p className="text-sm text-gray-600">{trend.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${
                            trend.trend === "up" ? "text-green-600" :
                            trend.trend === "down" ? "text-red-600" : "text-gray-600"
                          }`}>
                            {trend.trend === "up" ? "+" : trend.trend === "down" ? "-" : ""}{trend.percentage}%
                          </div>
                          <div className="text-xs text-gray-500">{trend.timeframe}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Competitive Overview */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm">
                    <Building className="w-4 h-4 mr-2 text-blue-600" />
                    {language === "el" ? "Κορυφαίοι Ανταγωνιστές" : "Top Competitors"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {competitors.slice(0, 3).map((competitor) => (
                    <div key={competitor.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{competitor.name}</div>
                        <div className="flex items-center space-x-1">
                          {getQualityStars(competitor.qualityRating)}
                          <span className="text-xs text-gray-500 ml-1">
                            {competitor.qualityRating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${getMarketShareColor(competitor.marketShare)}`}>
                          {competitor.marketShare.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatCurrency(competitor.avgPrice)}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
                    {language === "el" ? "Ειδοποιήσεις" : "Alerts"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {priceAlerts.filter(a => a.triggered).slice(0, 3).map((alert) => (
                    <Alert key={alert.id} className="border-orange-200 bg-orange-50">
                      <Bell className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        <div className="font-medium">{alert.productName}</div>
                        <div className="text-xs">
                          {formatCurrency(alert.currentPrice)} vs {formatCurrency(alert.targetPrice)}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search">{language === "el" ? "Αναζήτηση" : "Search"}</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder={language === "el" ? "Όνομα εταιρείας..." : "Company name..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">{language === "el" ? "Στρατηγική" : "Strategy"}</Label>
                  <select
                    id="category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">{language === "el" ? "Όλες" : "All"}</option>
                    <option value="premium">{language === "el" ? "Premium" : "Premium"}</option>
                    <option value="value">{language === "el" ? "Αξία" : "Value"}</option>
                    <option value="volume">{language === "el" ? "Όγκος" : "Volume"}</option>
                    <option value="niche">{language === "el" ? "Niche" : "Niche"}</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Badge variant="outline">
                    {filteredCompetitors.length} {language === "el" ? "ανταγωνιστές" : "competitors"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Competitors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCompetitors.map((competitor) => (
              <Card
                key={competitor.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCompetitor?.id === competitor.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedCompetitor(competitor)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{competitor.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          competitor.marketStrategy === "premium"
                            ? "bg-purple-100 text-purple-800"
                            : competitor.marketStrategy === "value"
                              ? "bg-blue-100 text-blue-800"
                              : competitor.marketStrategy === "volume"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                        }
                      >
                        {competitor.marketStrategy}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">{language === "el" ? "Market Share" : "Market Share"}</div>
                      <div className={`text-xl font-bold ${getMarketShareColor(competitor.marketShare)}`}>
                        {competitor.marketShare.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{language === "el" ? "Μέση Τιμή" : "Avg Price"}</div>
                      <div className="text-xl font-bold">{formatCurrency(competitor.avgPrice)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{language === "el" ? "Ποιότητα" : "Quality"}</div>
                      <div className="flex items-center space-x-1">
                        {getQualityStars(competitor.qualityRating)}
                        <span className="text-sm font-medium ml-1">
                          {competitor.qualityRating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{language === "el" ? "Βιωσιμότητα" : "Sustainability"}</div>
                      <div className="text-xl font-bold text-green-600">
                        {competitor.sustainabilityScore}%
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">{language === "el" ? "Δυνατά Σημεία" : "Strengths"}</div>
                    <div className="flex flex-wrap gap-1">
                      {competitor.strongPoints.slice(0, 3).map((point, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{language === "el" ? "Έσοδα:" : "Revenue:"}</span>
                      <span className="font-medium">{formatCurrency(competitor.financial.revenue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{language === "el" ? "Ανάπτυξη:" : "Growth:"}</span>
                      <span className={`font-medium ${
                        competitor.financial.growth > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {competitor.financial.growth > 0 ? "+" : ""}{competitor.financial.growth}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketTrends.map((trend) => (
              <Card key={trend.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      {getTrendIcon(trend.trend, trend.percentage)}
                      <span className="ml-2">{trend.category}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          trend.impact === "high"
                            ? "bg-red-100 text-red-800"
                            : trend.impact === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {trend.impact}
                      </Badge>
                      <Badge variant="outline">
                        {trend.confidence}% {language === "el" ? "εμπιστοσύνη" : "confidence"}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className={`text-3xl font-bold ${
                      trend.trend === "up" ? "text-green-600" :
                      trend.trend === "down" ? "text-red-600" : "text-gray-600"
                    }`}>
                      {trend.trend === "up" ? "+" : trend.trend === "down" ? "-" : ""}{trend.percentage}%
                    </div>
                    <div className="text-sm text-gray-500">{trend.timeframe}</div>
                  </div>

                  <p className="text-sm text-gray-700">{trend.description}</p>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">{language === "el" ? "Σχετικά Προϊόντα" : "Related Products"}</div>
                    <div className="flex flex-wrap gap-1">
                      {trend.relatedProducts.map((product, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-xs text-gray-500">
                      {language === "el" ? "Πηγές:" : "Sources:"} {trend.sources.join(", ")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                {language === "el" ? "Ειδοποιήσεις Τιμών" : "Price Alerts"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === "el" ? "Προϊόν" : "Product"}</TableHead>
                    <TableHead>{language === "el" ? "Ανταγωνιστής" : "Competitor"}</TableHead>
                    <TableHead>{language === "el" ? "Τρέχουσα Τιμή" : "Current Price"}</TableHead>
                    <TableHead>{language === "el" ? "Στόχος" : "Target"}</TableHead>
                    <TableHead>{language === "el" ? "Κατάσταση" : "Status"}</TableHead>
                    <TableHead>{language === "el" ? "Προτεραιότητα" : "Priority"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priceAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.productName}</TableCell>
                      <TableCell>{alert.competitor}</TableCell>
                      <TableCell>{formatCurrency(alert.currentPrice)}</TableCell>
                      <TableCell>{formatCurrency(alert.targetPrice)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            alert.triggered
                              ? "bg-red-100 text-red-800"
                              : alert.isActive
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {alert.triggered
                            ? language === "el" ? "Ενεργοποιήθηκε" : "Triggered"
                            : alert.isActive
                              ? language === "el" ? "Ενεργό" : "Active"
                              : language === "el" ? "Ανενεργό" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketAnalyses.map((analysis) => (
              <Card key={analysis.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <span>{analysis.title}</span>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          analysis.type === "competitive"
                            ? "bg-blue-100 text-blue-800"
                            : analysis.type === "pricing"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                        }
                      >
                        {analysis.type}
                      </Badge>
                      <Badge variant="outline">
                        {analysis.confidence}%
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">{analysis.summary}</p>

                  <div>
                    <div className="text-sm font-medium mb-2">{language === "el" ? "Βασικά Ευρήματα" : "Key Findings"}</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {analysis.keyFindings.map((finding, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-1 mr-2 flex-shrink-0" />
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">{language === "el" ? "Συστάσεις" : "Recommendations"}</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {analysis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <Lightbulb className="w-3 h-3 text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t flex justify-between text-xs text-gray-500">
                    <span>{analysis.author}</span>
                    <span>{analysis.dateCreated.toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el" ? "Αναφορές Market Intelligence" : "Market Intelligence Reports"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>{language === "el" ? "Δημιουργία και εξαγωγή αναφορών" : "Generate and export market reports"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
        avgPrice: 15.2,
        priceChange: 2.3,
        qualityRating: 4.5,
        strongPoints: [
          language === "el" ? "Υψηλή ποιότητα" : "High quality",
          language === "el" ? "Ισχυρό brand" : "Strong brand",
          language === "el" ? "Καλή διανομή" : "Good distribution",
        ],
        weakPoints: [
          language === "el" ? "Υψηλές τιμές" : "High prices",
          language === "el" ? "Περιορισμένη ποικιλία" : "Limited variety",
        ],
        lastUpdated: "2024-01-20",
        products: [
          {
            name: "Premium Salmon",
            price: 18.5,
            quality: "A+",
            availability: "High",
          },
          {
            name: "Luxury Prawns",
            price: 24.0,
            quality: "A",
            availability: "Medium",
          },
        ],
        marketStrategy: "premium",
        geographicFocus: ["Athens", "Thessaloniki", "Patras"],
      },
      {
        id: "2",
        name: "Ocean Value Co",
        marketShare: 18.3,
        avgPrice: 9.8,
        priceChange: -1.2,
        qualityRating: 3.5,
        strongPoints: [
          language === "el" ? "Ανταγωνιστικές τιμές" : "Competitive prices",
          language === "el" ? "Μεγάλη ποικιλία" : "Wide variety",
          language === "el" ? "Γρήγορη παράδοση" : "Fast delivery",
        ],
        weakPoints: [
          language === "el" ? "Μέτρια ποιότητα" : "Average quality",
          language === "el" ? "Ασταθής προμήθεια" : "Inconsistent supply",
        ],
        lastUpdated: "2024-01-19",
        products: [
          {
            name: "Standard Fish",
            price: 8.5,
            quality: "B",
            availability: "High",
          },
          {
            name: "Value Shrimp",
            price: 12.0,
            quality: "B+",
            availability: "High",
          },
        ],
        marketStrategy: "value",
        geographicFocus: ["Nationwide"],
      },
      {
        id: "3",
        name: "Fresh Catch Specialists",
        marketShare: 12.7,
        avgPrice: 13.4,
        priceChange: 0.8,
        qualityRating: 4.2,
        strongPoints: [
          language === "el" ? "Τοπικά προϊόντα" : "Local products",
          language === "el" ? "Φρεσκάδα" : "Freshness",
          language === "el" ? "Εξειδίκευση" : "Specialization",
        ],
        weakPoints: [
          language === "el" ? "Περιορισμένη κάλυψη" : "Limited coverage",
          language === "el" ? "Εποχιακότητα" : "Seasonality",
        ],
        lastUpdated: "2024-01-18",
        products: [
          {
            name: "Local Seabass",
            price: 14.2,
            quality: "A",
            availability: "Medium",
          },
          {
            name: "Fresh Octopus",
            price: 16.8,
            quality: "A+",
            availability: "Low",
          },
        ],
        marketStrategy: "niche",
        geographicFocus: ["Coastal regions", "Islands"],
      },
    ];

    const sampleTrends: MarketTrend[] = [
      {
        id: "1",
        category: language === "el" ? "Τιμές Ψαριών" : "Fish Prices",
        trend: "up",
        percentage: 8.5,
        description:
          language === "el"
            ? "Αύξηση τιμών λόγω μειωμένης προσφοράς"
            : "Price increase due to reduced supply",
        timeframe: "3 months",
        confidence: 85,
        sources: ["Market reports", "Supplier data"],
      },
      {
        id: "2",
        category:
          language === "el" ? "Ζήτηση Οστρακοειδών" : "Shellfish Demand",
        trend: "up",
        percentage: 12.3,
        description:
          language === "el"
            ? "Αυξημένη ζήτηση για premium οστρακοειδή"
            : "Increased demand for premium shellfish",
        timeframe: "6 months",
        confidence: 92,
        sources: ["Sales data", "Restaurant surveys"],
      },
      {
        id: "3",
        category: language === "el" ? "Κόστη Μεταφορά��" : "Transport Costs",
        trend: "down",
        percentage: -5.2,
        description:
          language === "el" ? "Μείωση κόστους καυσίμων" : "Reduced fuel costs",
        timeframe: "2 months",
        confidence: 78,
        sources: ["Logistics companies", "Fuel price indices"],
      },
    ];

    const sampleAlerts: PriceAlert[] = [
      {
        id: "1",
        productName: "Premium Salmon",
        currentPrice: 18.5,
        targetPrice: 17.0,
        alertType: "below",
        competitor: "Seafood Premium Ltd",
        isActive: true,
        createdDate: "2024-01-15",
      },
      {
        id: "2",
        productName: "Fresh Prawns",
        currentPrice: 22.0,
        targetPrice: 25.0,
        alertType: "above",
        competitor: "Ocean Value Co",
        isActive: true,
        createdDate: "2024-01-10",
      },
    ];

    setCompetitors(sampleCompetitors);
    setMarketTrends(sampleTrends);
    setPriceAlerts(sampleAlerts);
  }, [language]);

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatPercentage = (value: number, decimals = 1) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(decimals)}%`;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-50 border-green-200";
      case "down":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case "premium":
        return <Target className="w-4 h-4" />;
      case "value":
        return <DollarSign className="w-4 h-4" />;
      case "volume":
        return <BarChart3 className="w-4 h-4" />;
      case "niche":
        return <Zap className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  const getMarketPosition = () => {
    const totalMarketShare = competitors.reduce(
      (sum, comp) => sum + comp.marketShare,
      0,
    );
    const ourPosition = 100 - totalMarketShare; // Remaining market share
    return ourPosition;
  };

  const getAverageMarketPrice = () => {
    if (competitors.length === 0) return 0;
    const weightedSum = competitors.reduce(
      (sum, comp) => sum + comp.avgPrice * comp.marketShare,
      0,
    );
    const totalShare = competitors.reduce(
      (sum, comp) => sum + comp.marketShare,
      0,
    );
    return totalShare > 0 ? weightedSum / totalShare : 0;
  };

  const generateMarketInsights = () => {
    const insights = [];
    const avgPrice = getAverageMarketPrice();
    const ourPosition = getMarketPosition();

    // Market position insight
    if (ourPosition < 10) {
      insights.push({
        type: "warning",
        title: language === "el" ? "Χαμηλό Μερίδιο Αγοράς" : "Low Market Share",
        description:
          language === "el"
            ? `Το μερίδιό μας στην αγορά είναι ${ourPosition.toFixed(1)}%. Χρειάζεται στρατηγική επέκτασης.`
            : `Our market share is ${ourPosition.toFixed(1)}%. Expansion strategy needed.`,
        icon: AlertTriangle,
      });
    }

    // Price competitiveness
    const priceRange =
      Math.max(...competitors.map((c) => c.avgPrice)) -
      Math.min(...competitors.map((c) => c.avgPrice));
    if (priceRange > 10) {
      insights.push({
        type: "info",
        title: language === "el" ? "Μεγάλη Διασπορά Τιμών" : "Wide Price Range",
        description:
          language === "el"
            ? `Υπάρχει μεγάλη διαφορά στις τιμές (€${priceRange.toFixed(2)}). Ευκαιρία για positioning.`
            : `Large price difference exists (€${priceRange.toFixed(2)}). Positioning opportunity.`,
        icon: Info,
      });
    }

    // Trend analysis
    const upTrends = marketTrends.filter((t) => t.trend === "up").length;
    if (upTrends > marketTrends.length / 2) {
      insights.push({
        type: "success",
        title: language === "el" ? "Θετικές Τάσεις" : "Positive Trends",
        description:
          language === "el"
            ? "Οι περισσότερες τάσεις της αγοράς είναι ανοδικές. Ευνοϊκό περιβάλλον."
            : "Most market trends are upward. Favorable environment.",
        icon: TrendingUp,
      });
    }

    return insights;
  };

  const addNewCompetitor = () => {
    const newCompetitor: CompetitorData = {
      id: Date.now().toString(),
      name: "",
      marketShare: 0,
      avgPrice: 0,
      priceChange: 0,
      qualityRating: 3,
      strongPoints: [],
      weakPoints: [],
      lastUpdated: new Date().toISOString().split("T")[0],
      products: [],
      marketStrategy: "value",
      geographicFocus: [],
    };
    setSelectedCompetitor(newCompetitor);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5" />
          <span>
            {language === "el"
              ? "Σύστημα Market Intelligence"
              : "Market Intelligence System"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              {language === "el" ? "Επισκόπηση" : "Overview"}
            </TabsTrigger>
            <TabsTrigger
              value="competitors"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              {language === "el" ? "Ανταγωνιστές" : "Competitors"}
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {language === "el" ? "Τάσεις" : "Trends"}
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {language === "el" ? "Ειδοποιήσεις" : "Alerts"}
              {priceAlerts.filter((a) => a.isActive).length > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {priceAlerts.filter((a) => a.isActive).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">
                        {language === "el" ? "Μερίδιο Αγοράς" : "Market Share"}
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        {getMarketPosition().toFixed(1)}%
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">
                        {language === "el"
                          ? "Μέση Τιμή Αγοράς"
                          : "Avg Market Price"}
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        {formatCurrency(getAverageMarketPrice())}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600">
                        {language === "el" ? "Ανταγωνιστές" : "Competitors"}
                      </p>
                      <p className="text-2xl font-bold text-purple-900">
                        {competitors.length}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600">
                        {language === "el" ? "Ενεργές Τάσεις" : "Active Trends"}
                      </p>
                      <p className="text-2xl font-bold text-orange-900">
                        {marketTrends.length}
                      </p>
                    </div>
                    <LineChart className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Insights */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                {language === "el"
                  ? "Έξυπνες Αναλύσεις Αγοράς"
                  : "Smart Market Insights"}
              </h3>
              <div className="space-y-3">
                {generateMarketInsights().map((insight, index) => {
                  const Icon = insight.icon;
                  const colorMap = {
                    success: "border-green-200 bg-green-50 text-green-800",
                    warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
                    info: "border-blue-200 bg-blue-50 text-blue-800",
                    error: "border-red-200 bg-red-50 text-red-800",
                  };

                  return (
                    <Card
                      key={index}
                      className={`border-2 ${colorMap[insight.type as keyof typeof colorMap]}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{insight.title}</h4>
                            <p className="text-sm mt-1">
                              {insight.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Top Competitors Quick View */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {language === "el"
                  ? "Κορυφαίοι Ανταγωνιστές"
                  : "Top Competitors"}
              </h3>
              <div className="grid gap-3">
                {competitors.slice(0, 3).map((competitor) => (
                  <Card
                    key={competitor.id}
                    className="border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStrategyIcon(competitor.marketStrategy)}
                          <div>
                            <h4 className="font-medium">{competitor.name}</h4>
                            <p className="text-sm text-gray-600">
                              {competitor.marketShare.toFixed(1)}%{" "}
                              {language === "el" ? "μερίδιο" : "market share"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(competitor.avgPrice)}
                          </p>
                          <p
                            className={`text-sm ${competitor.priceChange > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {formatPercentage(competitor.priceChange)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Competitors Tab */}
          <TabsContent value="competitors" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {language === "el"
                    ? "Ανάλυση Ανταγωνιστών"
                    : "Competitor Analysis"}
                </h3>
                <Button onClick={addNewCompetitor}>
                  <Plus className="w-4 h-4 mr-2" />
                  {language === "el"
                    ? "Προσθήκη Ανταγωνιστή"
                    : "Add Competitor"}
                </Button>
              </div>

              <div className="grid gap-4">
                {competitors.map((competitor) => (
                  <Card
                    key={competitor.id}
                    className="border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* Basic Info */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {getStrategyIcon(competitor.marketStrategy)}
                            <h4 className="font-semibold text-lg">
                              {competitor.name}
                            </h4>
                          </div>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-gray-600">
                                {language === "el" ? "Μερίδιο:" : "Share:"}
                              </span>{" "}
                              {competitor.marketShare.toFixed(1)}%
                            </p>
                            <p>
                              <span className="text-gray-600">
                                {language === "el"
                                  ? "Στρατηγική:"
                                  : "Strategy:"}
                              </span>{" "}
                              {competitor.marketStrategy}
                            </p>
                            <p>
                              <span className="text-gray-600">
                                {language === "el" ? "Βαθμολογία:" : "Rating:"}
                              </span>{" "}
                              {competitor.qualityRating}/5 ⭐
                            </p>
                          </div>
                        </div>

                        {/* Pricing Info */}
                        <div>
                          <h5 className="font-medium mb-2 text-gray-700">
                            {language === "el" ? "Τιμολόγηση" : "Pricing"}
                          </h5>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-gray-600">
                                {language === "el"
                                  ? "Μέση τιμή:"
                                  : "Avg price:"}
                              </span>{" "}
                              {formatCurrency(competitor.avgPrice)}
                            </p>
                            <p
                              className={`${competitor.priceChange > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              <span className="text-gray-600">
                                {language === "el" ? "Αλλαγή:" : "Change:"}
                              </span>{" "}
                              {formatPercentage(competitor.priceChange)}
                            </p>
                          </div>
                        </div>

                        {/* Strengths & Weaknesses */}
                        <div>
                          <h5 className="font-medium mb-2 text-gray-700">
                            {language === "el"
                              ? "Δυνάμεις/Αδυναμίες"
                              : "Strengths/Weaknesses"}
                          </h5>
                          <div className="space-y-1">
                            {competitor.strongPoints
                              .slice(0, 2)
                              .map((point, idx) => (
                                <Badge
                                  key={idx}
                                  className="bg-green-100 text-green-800 text-xs mr-1 mb-1"
                                >
                                  + {point}
                                </Badge>
                              ))}
                            {competitor.weakPoints
                              .slice(0, 2)
                              .map((point, idx) => (
                                <Badge
                                  key={idx}
                                  className="bg-red-100 text-red-800 text-xs mr-1 mb-1"
                                >
                                  - {point}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedCompetitor(competitor)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            {language === "el" ? "Προβολή" : "View"}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            {language === "el" ? "Επεξεργασία" : "Edit"}
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            {language === "el" ? "Διαγραφή" : "Delete"}
                          </Button>
                        </div>
                      </div>

                      {/* Products */}
                      {competitor.products.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <h5 className="font-medium mb-2 text-gray-700">
                            {language === "el" ? "Προϊόντα" : "Products"}
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {competitor.products.map((product, idx) => (
                              <div
                                key={idx}
                                className="text-xs bg-gray-50 p-2 rounded"
                              >
                                <p className="font-medium">{product.name}</p>
                                <p className="text-gray-600">
                                  {formatCurrency(product.price)} |{" "}
                                  {product.quality}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Market Trends Tab */}
          <TabsContent value="trends" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {language === "el" ? "Τάσεις Αγοράς" : "Market Trends"}
              </h3>

              <div className="grid gap-4">
                {marketTrends.map((trend) => (
                  <Card
                    key={trend.id}
                    className={`border-2 ${getTrendColor(trend.trend)}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getTrendIcon(trend.trend)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{trend.category}</h4>
                              <Badge variant="outline" className="text-xs">
                                {formatPercentage(trend.percentage)}
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">{trend.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <span>
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {trend.timeframe}
                              </span>
                              <span>
                                <CheckCircle className="w-3 h-3 inline mr-1" />
                                {trend.confidence}%{" "}
                                {language === "el"
                                  ? "εμπιστοσύνη"
                                  : "confidence"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {trend.trend === "up"
                              ? "📈"
                              : trend.trend === "down"
                                ? "📉"
                                : "📊"}
                          </div>
                        </div>
                      </div>

                      {/* Sources */}
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-600 mb-1">
                          {language === "el" ? "Πηγές:" : "Sources:"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {trend.sources.map((source, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Add new trend button */}
              <Button variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" />
                {language === "el" ? "Προσθήκη Νέας Τάσης" : "Add New Trend"}
              </Button>
            </div>
          </TabsContent>

          {/* Price Alerts Tab */}
          <TabsContent value="alerts" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {language === "el" ? "Ειδοποιήσεις Τιμών" : "Price Alerts"}
                </h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {language === "el" ? "Νέα Ειδοποίηση" : "New Alert"}
                </Button>
              </div>

              <div className="grid gap-3">
                {priceAlerts.map((alert) => (
                  <Card
                    key={alert.id}
                    className={`border-l-4 ${alert.isActive ? "border-l-blue-500" : "border-l-gray-300"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{alert.productName}</h4>
                          <p className="text-sm text-gray-600">
                            {language === "el"
                              ? "Ανταγωνιστής:"
                              : "Competitor:"}{" "}
                            {alert.competitor}
                          </p>
                          <p className="text-sm">
                            {language === "el"
                              ? "Τρέχουσα τιμή:"
                              : "Current price:"}{" "}
                            {formatCurrency(alert.currentPrice)} |
                            {language === "el" ? " Στόχος:" : " Target:"}{" "}
                            {formatCurrency(alert.targetPrice)}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              alert.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {alert.isActive
                              ? language === "el"
                                ? "Ενεργή"
                                : "Active"
                              : language === "el"
                                ? "Ανενεργή"
                                : "Inactive"}
                          </Badge>
                          <p className="text-xs text-gray-600 mt-1">
                            {new Date(alert.createdDate).toLocaleDateString(
                              "el-GR",
                            )}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {priceAlerts.length === 0 && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="p-8 text-center">
                    <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-600 mb-2">
                      {language === "el"
                        ? "Δεν υπάρχουν ειδοποιήσεις"
                        : "No alerts set up"}
                    </h4>
                    <p className="text-gray-500 mb-4">
                      {language === "el"
                        ? "Δημιουργήστε ειδοποιήσεις για να παρακολουθείτε τις τιμές των ανταγωνιστών"
                        : "Create alerts to monitor competitor prices"}
                    </p>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      {language === "el"
                        ? "Δημιουργία Ειδοποίησης"
                        : "Create Alert"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Competitor Details Modal */}
        {selectedCompetitor && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {selectedCompetitor.name ||
                      (language === "el"
                        ? "Νέος Ανταγωνιστής"
                        : "New Competitor")}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCompetitor(null)}
                    className="text-white hover:bg-white/20"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Detailed competitor information would go here */}
                  <div className="text-center py-8">
                    <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600">
                      {language === "el"
                        ? "Λεπτομερή Στοιχεία Ανταγωνιστή"
                        : "Detailed Competitor Information"}
                    </h3>
                    <p className="text-gray-500 mt-2">
                      {language === "el"
                        ? "Εδώ θα εμφανίζονται αναλυτικά στοιχεία και γραφήματα"
                        : "Detailed analytics and charts would be displayed here"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketIntelligenceSystem;