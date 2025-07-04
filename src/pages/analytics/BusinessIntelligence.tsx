import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  Target,
  Activity,
  Zap,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  Star,
  Award,
  Cpu,
  Database,
  Globe,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { analyticsAPI } from "@/api/analytics";
import { batchAPI } from "@/api/batches";
import PageLayout from "@/components/layout/PageLayout";

const BusinessIntelligence: React.FC = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [kpis, setKpis] = useState<any>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [marketIntelligence, setMarketIntelligence] = useState<any[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "week" | "month" | "quarter"
  >("month");

  useEffect(() => {
    loadData();
  }, [selectedTimeframe]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get analytics data
      const kpiData = analyticsAPI.getFinancialKPIs(selectedTimeframe);
      setKpis(kpiData);

      // Get market insights
      const marketData = analyticsAPI.getMarketInsights();
      setMarketIntelligence(marketData);

      // Get trend analysis
      const trends = analyticsAPI.getTrendAnalysis();

      // Generate AI insights
      const insights = [
        {
          id: 1,
          type: "optimization",
          title:
            language === "el" ? "Βελτιστοποίηση Κόστους" : "Cost Optimization",
          description:
            language === "el"
              ? "Εντοπίστηκε δυνατότητα μείωσης κόστους μεταφοράς κατά 12%"
              : "Identified opportunity to reduce transport costs by 12%",
          impact: "high",
          confidence: 87,
          recommendations: [
            language === "el" ? "Συνδυασμός παραγγελιών" : "Consolidate orders",
            language === "el" ? "Βελτιστοποίηση διαδρομών" : "Optimize routes",
          ],
        },
        {
          id: 2,
          type: "trend",
          title: language === "el" ? "Αύξηση Ζήτησης" : "Demand Increase",
          description:
            language === "el"
              ? "Προβλέπεται αύξηση ζήτησης για salmón κατά 25% τον επόμενο μήνα"
              : "Predicted 25% increase in salmon demand next month",
          impact: "medium",
          confidence: 94,
          recommendations: [
            language === "el" ? "Αύξηση stock" : "Increase stock levels",
            language === "el" ? "Προσαρμογή τιμών" : "Adjust pricing",
          ],
        },
        {
          id: 3,
          type: "quality",
          title: language === "el" ? "Δείκτης Ποιότητας" : "Quality Score",
          description:
            language === "el"
              ? "Η ποιότητα προϊόντων βελτιώθηκε κατά 8% αυτή την εβδομάδα"
              : "Product quality improved by 8% this week",
          impact: "low",
          confidence: 92,
          recommendations: [
            language === "el" ? "Διατήρηση standards" : "Maintain standards",
            language === "el" ? "Εκπαίδευση προσωπικού" : "Staff training",
          ],
        },
      ];
      setAiInsights(insights);

      // Generate predictions
      const forecastData = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(
          Date.now() + i * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
        predicted: Math.round((5000 + Math.random() * 1000) * 100) / 100,
        confidence: Math.round((80 + Math.random() * 15) * 10) / 10,
        actual:
          i < 2 ? Math.round((4800 + Math.random() * 400) * 100) / 100 : null,
      }));
      setPredictions(forecastData);
    } catch (error) {
      console.error("Error loading BI data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "optimization":
        return Target;
      case "trend":
        return TrendingUp;
      case "quality":
        return Award;
      default:
        return Brain;
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-600" />
              Business Intelligence
            </h1>
            <p className="text-gray-600 mt-2">
              {language === "el"
                ? "AI-powered επιχειρηματική νοημοσύνη και προβλέψεις"
                : "AI-powered business intelligence and predictions"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={loadData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              {language === "el" ? "Ανανέωση" : "Refresh"}
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              {language === "el" ? "Εξαγωγή" : "Export"}
            </Button>
          </div>
        </div>

        {/* KPI Overview */}
        {kpis && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {language === "el" ? "Σύνολο Εσόδων" : "Total Revenue"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      €{kpis.totalRevenue.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {kpis.revenueGrowth >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          kpis.revenueGrowth >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {kpis.revenueGrowth >= 0 ? "+" : ""}
                        {kpis.revenueGrowth}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {language === "el"
                        ? "Περιθώριο Κέρδους"
                        : "Profit Margin"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {kpis.profitMargin}%
                    </p>
                    <Progress value={kpis.profitMargin} className="mt-2" />
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {language === "el" ? "Όγκος" : "Volume"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {kpis.totalVolume.toLocaleString()} kg
                    </p>
                    <p className="text-sm text-gray-500">
                      €{kpis.avgPricePerKg}/kg
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {language === "el" ? "Πελάτες" : "Customers"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {kpis.avgCustomers}
                    </p>
                    <p className="text-sm text-gray-500">
                      €{kpis.avgRevenuePerCustomer}/customer
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">
              <Brain className="w-4 h-4 mr-2" />
              {language === "el" ? "AI Insights" : "AI Insights"}
            </TabsTrigger>
            <TabsTrigger value="predictions">
              <TrendingUp className="w-4 h-4 mr-2" />
              {language === "el" ? "Προβλέψεις" : "Predictions"}
            </TabsTrigger>
            <TabsTrigger value="market">
              <Globe className="w-4 h-4 mr-2" />
              {language === "el" ? "Αγορά" : "Market"}
            </TabsTrigger>
            <TabsTrigger value="automation">
              <Cpu className="w-4 h-4 mr-2" />
              {language === "el" ? "Αυτοματισμός" : "Automation"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiInsights.map((insight) => {
                const TypeIcon = getTypeIcon(insight.type);

                return (
                  <Card
                    key={insight.id}
                    className="border-l-4 border-l-blue-500"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <TypeIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {insight.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getImpactColor(insight.impact)}>
                                {insight.impact}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {insight.confidence}% confidence
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        {insight.description}
                      </p>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">
                          {language === "el" ? "Συστάσεις" : "Recommendations"}:
                        </h4>
                        <ul className="space-y-1">
                          {insight.recommendations.map(
                            (rec: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-sm text-gray-600"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                {rec}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {language === "el"
                    ? "Πρόβλεψη Εσόδων (7 ημέρες)"
                    : "Revenue Forecast (7 days)"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={predictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: any, name: string) => [
                        `€${value}`,
                        name === "predicted" ? "Predicted" : "Actual",
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Predicted Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Actual Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {marketIntelligence.map((market: any, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{market.species}</span>
                      <Badge
                        variant={
                          market.dominantTrend === "up"
                            ? "default"
                            : market.dominantTrend === "down"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {market.dominantTrend}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          {language === "el" ? "Μέση Τιμή" : "Avg Price"}:
                        </span>
                        <span className="font-medium">€{market.avgPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          {language === "el" ? "Σύνολο Όγκου" : "Total Volume"}:
                        </span>
                        <span className="font-medium">
                          {market.totalVolume} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          {language === "el" ? "Εμπιστοσύνη" : "Confidence"}:
                        </span>
                        <span className="font-medium">
                          {market.trendConfidence}%
                        </span>
                      </div>
                      <Progress
                        value={market.trendConfidence}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Alert>
              <Cpu className="h-4 w-4" />
              <AlertDescription>
                {language === "el"
                  ? "Λειτουργίες αυτοματισμού θα είναι διαθέσιμες σύντομα"
                  : "Automation features will be available soon"}
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default BusinessIntelligence;
