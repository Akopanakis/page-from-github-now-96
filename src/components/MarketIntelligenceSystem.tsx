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

const MarketIntelligenceSystem: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<CompetitorData | null>(null);

  // Initialize with sample data
  useEffect(() => {
    const sampleCompetitors: CompetitorData[] = [
      {
        id: "1",
        name: "Seafood Premium Ltd",
        marketShare: 25.5,
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
        category: language === "el" ? "Κόστη Μεταφοράς" : "Transport Costs",
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
