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
  FileText,
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
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<CompetitorData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Initialize with comprehensive sample data
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
          language === "el" ? "Υψηλή ποιότητα" : "High quality",
          language === "el" ? "Ισχυρό brand" : "Strong brand",
          language === "el" ? "Πιστοποιήσεις" : "Certifications",
          language === "el" ? "Δίκτυο διανομής" : "Distribution network",
        ],
        weakPoints: [
          language === "el" ? "Υψηλές τιμές" : "High prices",
          language === "el" ? "Περιορισμένη γκάμα" : "Limited range",
        ],
        lastUpdated: new Date("2024-11-20"),
        products: [
          {
            name: language === "el" ? "Τσιπούρα Premium" : "Premium Sea Bream",
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
        ],
        marketStrategy: "premium",
        geographicFocus: ["Αττική", "Θεσσαλονίκη", "Κρήτη", "Εξαγωγές ΕΕ"],
        financial: {
          revenue: 15200000,
          growth: 8.5,
          marketCap: 45000000,
          employees: 185,
        },
        certifications: ["MSC", "HACCP", "ISO 22000", "Organic", "BRC"],
        channels: ["Λιανική", "Χονδρική", "Online", "Εστιατόρια", "Εξαγωγές"],
        threats: [
          language === "el" ? "Νέοι ανταγωνιστές" : "New competitors",
          language === "el" ? "Κόστος πρώτων υλών" : "Raw material costs",
        ],
        opportunities: [
          language === "el" ? "Βιολογικά προϊόντα" : "Organic products",
          language === "el" ? "Νέες αγορές" : "New markets",
        ],
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
          language === "el" ? "Ανταγωνιστικές τιμές" : "Competitive prices",
          language === "el" ? "Μεγάλη γκάμα" : "Wide range",
          language === "el" ? "Διαθεσιμότητα" : "Availability",
        ],
        weakPoints: [
          language === "el" ? "Ποιότητα" : "Quality inconsistency",
          language === "el" ? "Brand αναγνώριση" : "Brand recognition",
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
        ],
        marketStrategy: "value",
        geographicFocus: ["Κεντρική Ελλάδα", "Πελοπόννησος"],
        financial: {
          revenue: 11800000,
          growth: 3.2,
          employees: 142,
        },
        certifications: ["HACCP", "ISO 22000"],
        channels: ["Χονδρική", "Σούπερ Μάρκετ"],
        threats: [language === "el" ? "Πίεση τιμών" : "Price pressure"],
        opportunities: [
          language === "el" ? "Διεύρυνση δικτύου" : "Network expansion",
        ],
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
            ? "Αύξηση τιμών λόγω μειωμένης παραγωγής"
            : "Price increase due to reduced supply",
        timeframe: language === "el" ? "Τελευταίοι 3 μήνες" : "Last 3 months",
        confidence: 87,
        sources: ["FishMarket Analytics", "EU Fish Price Index"],
        impact: "high",
        region: "Μεσόγειος",
        relatedProducts: ["Λαβράκι", "Μπακαλιάρος"],
      },
      {
        id: "trend-002",
        category: language === "el" ? "Βιολογικά Προϊόντα" : "Organic Products",
        trend: "up",
        percentage: 15.2,
        description:
          language === "el"
            ? "Αυξανόμενη ζήτηση για βιολογικά προϊόντα"
            : "Growing demand for organic products",
        timeframe: language === "el" ? "Ετήσια βάση" : "Annual basis",
        confidence: 92,
        sources: ["Organic Market Report"],
        impact: "medium",
        region: "Ευρώπη",
        relatedProducts: ["Τσιπούρα", "Λαβράκι"],
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
              ? "Ανάλυση αγοράς και ανταγωνισμού σε πραγματικό χρόνο"
              : "Real-time market analysis and competitive intelligence"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {language === "el" ? "Ενημερώθηκε:" : "Updated:"}{" "}
            {lastUpdate.toLocaleTimeString()}
          </Badge>
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
                  {language === "el" ? "Θετικές Τάσεις" : "Positive Trends"}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {marketTrends.filter((t) => t.trend === "up").length}
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
                  {language === "el" ? "Ειδοποιήσεις" : "Alerts"}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {priceAlerts.filter((a) => a.triggered).length}
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
                  {language === "el" ? "Μέσο Market Share" : "Avg Market Share"}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {competitors.length > 0
                    ? (
                        competitors.reduce((sum, c) => sum + c.marketShare, 0) /
                        competitors.length
                      ).toFixed(1)
                    : "0"}
                  %
                </p>
              </div>
              <PieChart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
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
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el" ? "Τάσεις Αγοράς" : "Market Trends"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketTrends.map((trend) => (
                    <div
                      key={trend.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getTrendIcon(trend.trend)}
                        <div>
                          <h4 className="font-medium">{trend.category}</h4>
                          <p className="text-sm text-gray-600">
                            {trend.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold ${
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el"
                    ? "Ανταγωνιστικό Τοπίο"
                    : "Competitive Landscape"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {competitors.map((competitor) => (
                    <div
                      key={competitor.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {competitor.name}
                        </div>
                        <div className="flex items-center space-x-1">
                          {getQualityStars(competitor.qualityRating)}
                          <span className="text-xs text-gray-500 ml-1">
                            {competitor.qualityRating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">
                          {competitor.marketShare.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatCurrency(competitor.avgPrice)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {competitors.map((competitor) => (
              <Card
                key={competitor.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{competitor.name}</span>
                    <Badge
                      className={
                        competitor.marketStrategy === "premium"
                          ? "bg-purple-100 text-purple-800"
                          : competitor.marketStrategy === "value"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {competitor.marketStrategy}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Market Share</div>
                      <div className="text-xl font-bold text-blue-600">
                        {competitor.marketShare.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {language === "el" ? "Μέση Τιμή" : "Avg Price"}
                      </div>
                      <div className="text-xl font-bold">
                        {formatCurrency(competitor.avgPrice)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">
                      {language === "el" ? "Δυνατά Σημεία" : "Strengths"}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {competitor.strongPoints
                        .slice(0, 3)
                        .map((point, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {point}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {language === "el" ? "Έσοδα:" : "Revenue:"}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(competitor.financial.revenue)}
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
                      {getTrendIcon(trend.trend)}
                      <span className="ml-2">{trend.category}</span>
                    </span>
                    <Badge variant="outline">
                      {trend.confidence}%{" "}
                      {language === "el" ? "εμπιστοσύνη" : "confidence"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
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
                    <div className="text-sm text-gray-500">
                      {trend.timeframe}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{trend.description}</p>
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
                {language === "el" ? "Ανάλυση Τιμών" : "Price Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Ανάλυση και παρακολούθηση τιμών"
                      : "Price analysis and monitoring"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el" ? "Αναλύσεις Αγοράς" : "Market Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Εμπεριστατωμένες αναλύσεις αγοράς"
                      : "Comprehensive market analysis"}
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

export default MarketIntelligenceSystem;
