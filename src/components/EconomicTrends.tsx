import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BarChart3,
  LineChart,
  Globe,
  DollarSign,
  AlertTriangle,
  Info,
  Calendar,
  Target,
  Activity,
  Percent,
} from "lucide-react";

interface EconomicTrendsProps {
  productType?: string;
  region?: string;
  className?: string;
}

interface TrendData {
  period: string;
  priceIndex: number;
  demandIndex: number;
  supplyIndex: number;
  costIndex: number;
  season: "spring" | "summer" | "autumn" | "winter";
}

interface MarketIndicator {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
  unit: string;
  description: string;
  impact: "high" | "medium" | "low";
}

const EconomicTrends: React.FC<EconomicTrendsProps> = ({
  productType = "fish",
  region = "europe",
  className = "",
}) => {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("12m");
  const [selectedMetric, setSelectedMetric] = useState("price");

  // Mock historical data - in real app this would come from API
  const historicalData: TrendData[] = useMemo(
    () => [
      {
        period: "2024-01",
        priceIndex: 95,
        demandIndex: 102,
        supplyIndex: 98,
        costIndex: 100,
        season: "winter",
      },
      {
        period: "2024-02",
        priceIndex: 97,
        demandIndex: 105,
        supplyIndex: 96,
        costIndex: 101,
        season: "winter",
      },
      {
        period: "2024-03",
        priceIndex: 102,
        demandIndex: 108,
        supplyIndex: 94,
        costIndex: 103,
        season: "spring",
      },
      {
        period: "2024-04",
        priceIndex: 106,
        demandIndex: 112,
        supplyIndex: 92,
        costIndex: 105,
        season: "spring",
      },
      {
        period: "2024-05",
        priceIndex: 110,
        demandIndex: 115,
        supplyIndex: 89,
        costIndex: 107,
        season: "spring",
      },
      {
        period: "2024-06",
        priceIndex: 115,
        demandIndex: 118,
        supplyIndex: 87,
        costIndex: 110,
        season: "summer",
      },
      {
        period: "2024-07",
        priceIndex: 118,
        demandIndex: 120,
        supplyIndex: 85,
        costIndex: 112,
        season: "summer",
      },
      {
        period: "2024-08",
        priceIndex: 120,
        demandIndex: 122,
        supplyIndex: 83,
        costIndex: 115,
        season: "summer",
      },
      {
        period: "2024-09",
        priceIndex: 116,
        demandIndex: 118,
        supplyIndex: 88,
        costIndex: 113,
        season: "autumn",
      },
      {
        period: "2024-10",
        priceIndex: 112,
        demandIndex: 115,
        supplyIndex: 92,
        costIndex: 111,
        season: "autumn",
      },
      {
        period: "2024-11",
        priceIndex: 108,
        demandIndex: 110,
        supplyIndex: 95,
        costIndex: 108,
        season: "autumn",
      },
      {
        period: "2024-12",
        priceIndex: 105,
        demandIndex: 107,
        supplyIndex: 98,
        costIndex: 106,
        season: "winter",
      },
    ],
    [],
  );

  const marketIndicators: MarketIndicator[] = useMemo(
    () => [
      {
        id: "global_seafood_price",
        name:
          language === "el"
            ? "Παγκόσμιες Τιμές Θαλασσινών"
            : "Global Seafood Prices",
        value: 115.3,
        change: 5.8,
        trend: "up",
        unit: "Index",
        description:
          language === "el"
            ? "Δείκτης παγκόσμιων τιμών ��αλασσινών (βάση 100=2023)"
            : "Global seafood price index (base 100=2023)",
        impact: "high",
      },
      {
        id: "fuel_cost",
        name: language === "el" ? "Κόστος Καυσίμων" : "Fuel Cost",
        value: 142.7,
        change: 12.3,
        trend: "up",
        unit: "Index",
        description:
          language === "el"
            ? "Δείκτης κόστους καυσίμων για αλιεία και μεταφορά"
            : "Fuel cost index for fishing and transport",
        impact: "high",
      },
      {
        id: "demand_growth",
        name: language === "el" ? "Αύξηση Ζήτησης" : "Demand Growth",
        value: 8.5,
        change: 2.1,
        trend: "up",
        unit: "%",
        description:
          language === "el"
            ? "Ετήσια αύξηση ζήτησης για θαλασσινά"
            : "Annual growth in seafood demand",
        impact: "medium",
      },
      {
        id: "supply_constraints",
        name:
          language === "el" ? "Περιορισμοί Προσφοράς" : "Supply Constraints",
        value: 15.2,
        change: -3.4,
        trend: "down",
        unit: "%",
        description:
          language === "el"
            ? "Ποσοστό μείωσης διαθέσιμης προσφοράς"
            : "Percentage decrease in available supply",
        impact: "high",
      },
      {
        id: "currency_impact",
        name: language === "el" ? "Επίδραση Συναλλάγματος" : "Currency Impact",
        value: -2.8,
        change: 1.2,
        trend: "stable",
        unit: "%",
        description:
          language === "el"
            ? "Επίδραση συναλλαγματικών διακυμάνσεων"
            : "Impact of currency fluctuations",
        impact: "medium",
      },
      {
        id: "sustainability_premium",
        name:
          language === "el"
            ? "Προσαύξημα Βιωσιμότητας"
            : "Sustainability Premium",
        value: 12.5,
        change: 4.7,
        trend: "up",
        unit: "%",
        description:
          language === "el"
            ? "Προσαύξημα τιμής για βιώσιμα προϊόντα"
            : "Price premium for sustainable products",
        impact: "medium",
      },
    ],
    [language],
  );

  const seasonalFactors = useMemo(() => {
    const seasons = {
      spring: { demand: 108, supply: 95, price: 105 },
      summer: { demand: 120, supply: 85, price: 118 },
      autumn: { demand: 115, supply: 92, price: 112 },
      winter: { demand: 105, supply: 98, price: 102 },
    };
    return seasons;
  }, []);

  const formatPercentage = (value: number, showSign = false) => {
    const sign = showSign && value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  const getTrendIcon = (trend: string, size = "w-4 h-4") => {
    switch (trend) {
      case "up":
        return <TrendingUp className={`${size} text-green-500`} />;
      case "down":
        return <TrendingDown className={`${size} text-red-500`} />;
      default:
        return <Activity className={`${size} text-gray-500`} />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const calculateTrendAnalysis = () => {
    const recent = historicalData.slice(-3);
    const priceChange =
      recent[recent.length - 1].priceIndex - recent[0].priceIndex;
    const demandChange =
      recent[recent.length - 1].demandIndex - recent[0].demandIndex;
    const supplyChange =
      recent[recent.length - 1].supplyIndex - recent[0].supplyIndex;

    return {
      priceChange,
      demandChange,
      supplyChange,
      trend:
        priceChange > 0
          ? "increasing"
          : priceChange < 0
            ? "decreasing"
            : "stable",
    };
  };

  const renderIndicatorCard = (indicator: MarketIndicator) => (
    <Card
      key={indicator.id}
      className="hover:shadow-lg transition-all duration-200"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-sm text-gray-900">
            {indicator.name}
          </h4>
          {getTrendIcon(indicator.trend)}
        </div>

        <div className="mb-3">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {indicator.value.toFixed(1)}
            {indicator.unit === "%" ? "%" : ""}
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`text-sm font-medium ${
                indicator.change > 0
                  ? "text-green-600"
                  : indicator.change < 0
                    ? "text-red-600"
                    : "text-gray-600"
              }`}
            >
              {formatPercentage(indicator.change, true)}
            </span>
            <Badge className={`text-xs ${getImpactColor(indicator.impact)}`}>
              {language === "el"
                ? indicator.impact === "high"
                  ? "Υψηλή"
                  : indicator.impact === "medium"
                    ? "Μέτρια"
                    : "Χαμηλή"
                : indicator.impact === "high"
                  ? "High"
                  : indicator.impact === "medium"
                    ? "Medium"
                    : "Low"}{" "}
              {language === "el" ? "Επίδραση" : "Impact"}
            </Badge>
          </div>
        </div>

        <p className="text-xs text-gray-600">{indicator.description}</p>
      </CardContent>
    </Card>
  );

  const renderSeasonalChart = () => {
    const currentSeason = "winter"; // This would be calculated based on current date

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(seasonalFactors).map(([season, factors]) => {
          const isCurrentSeason = season === currentSeason;
          const seasonNames = {
            spring: language === "el" ? "Άνοιξη" : "Spring",
            summer: language === "el" ? "Καλοκαίρι" : "Summer",
            autumn: language === "el" ? "Φθινόπωρο" : "Autumn",
            winter: language === "el" ? "Χειμώνας" : "Winter",
          };

          return (
            <Card
              key={season}
              className={`${isCurrentSeason ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
            >
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold mb-3">
                  {seasonNames[season as keyof typeof seasonNames]}
                  {isCurrentSeason && (
                    <Badge className="ml-2 bg-blue-600 text-white">
                      {language === "el" ? "Τρέχουσα" : "Current"}
                    </Badge>
                  )}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{language === "el" ? "Ζήτηση:" : "Demand:"}</span>
                    <span className="font-medium">{factors.demand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === "el" ? "Προσφορά:" : "Supply:"}</span>
                    <span className="font-medium">{factors.supply}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === "el" ? "Τιμή:" : "Price:"}</span>
                    <span className="font-bold text-blue-600">
                      {factors.price}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const trendAnalysis = calculateTrendAnalysis();

  return (
    <div className={className}>
      <Card>
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>
              {language === "el"
                ? "Οικονομικές Τάσεις & Ανάλυση Αγοράς"
                : "Economic Trends & Market Analysis"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="indicators" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger
                value="indicators"
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                {language === "el" ? "Δείκτες" : "Indicators"}
              </TabsTrigger>
              <TabsTrigger value="seasonal" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {language === "el" ? "Εποχιακότητα" : "Seasonal"}
              </TabsTrigger>
              <TabsTrigger value="forecast" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {language === "el" ? "Πρόβλεψη" : "Forecast"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="indicators" className="space-y-6">
              {/* Summary Card */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">
                        {language === "el"
                          ? "Συνοπτική Ανάλυση Τάσεων"
                          : "Trend Summary Analysis"}
                      </h3>
                      <p className="text-blue-700 text-sm">
                        {language === "el"
                          ? `Τάση τιμών: ${
                              trendAnalysis.trend === "increasing"
                                ? "Ανοδική"
                                : trendAnalysis.trend === "decreasing"
                                  ? "Καθοδική"
                                  : "Σταθερή"
                            }
                             (+${trendAnalysis.priceChange.toFixed(1)} δείκτης)`
                          : `Price trend: ${
                              trendAnalysis.trend === "increasing"
                                ? "Rising"
                                : trendAnalysis.trend === "decreasing"
                                  ? "Falling"
                                  : "Stable"
                            }
                             (+${trendAnalysis.priceChange.toFixed(1)} index points)`}
                      </p>
                    </div>
                    {getTrendIcon(
                      trendAnalysis.trend === "increasing"
                        ? "up"
                        : trendAnalysis.trend === "decreasing"
                          ? "down"
                          : "stable",
                      "w-8 h-8",
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Market Indicators Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketIndicators.map(renderIndicatorCard)}
              </div>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>
                      {language === "el"
                        ? "Στρατηγικές Συστάσεις"
                        : "Strategic Recommendations"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendAnalysis.priceChange > 5 && (
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                        <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800">
                            {language === "el"
                              ? "Ευκαιρία Αύξησης Τιμών"
                              : "Price Increase Opportunity"}
                          </h4>
                          <p className="text-green-700 text-sm">
                            {language === "el"
                              ? "Οι τάσεις δείχνουν ανοδική πορεία τιμών. Εξετάστε αύξηση των τιμών πώλησης."
                              : "Trends show upward price movement. Consider increasing selling prices."}
                          </p>
                        </div>
                      </div>
                    )}

                    {(() => {
                      const fuelCostChange = marketIndicators.find(i => i.id === "fuel_cost")?.change ?? 0;
                      return fuelCostChange > 10 ? (
                        <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-800">
                              {language === "el" ? "Προειδοποίηση Κόστους Καυσίμων" : "Fuel Cost Warning"}
                            </h4>
                            <p className="text-red-700 text-sm">
                              Significant fuel cost increase: {fuelCostChange}%
                            </p>
                          </div>
                        </div>
                      ) : null;
                    })()}

                    {(() => {
                      const fuelCostChange = marketIndicators.find(i => i.id === "fuel_cost")?.change ?? 0;
                      return fuelCostChange > 10 ? (
                        <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">
                            {language === "el"
                              ? "Προσοχή στα Κόστη Μεταφοράς"
                              : "Monitor Transport Costs"}
                          </h4>
                          <p className="text-yellow-700 text-sm">
                            {language === "el"
                              ? "Σημαντική αύξηση κόστους καυσίμων. Εξετάστε εναλλακτικές μεταφοράς."
                              : "Significant fuel cost increase. Consider alternative transport options."}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">
                          {language === "el"
                            ? "Βιωσιμότητα ως Διαφοροποίηση"
                            : "Sustainability as Differentiation"}
                        </h4>
                        <p className="text-blue-700 text-sm">
                          {language === "el"
                            ? "Το προσαύξημα για βιώσιμα προϊόντα αυξάνεται. Εστιάστε σε πιστοποιήσεις."
                            : "Sustainability premium is growing. Focus on certifications."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seasonal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span>
                      {language === "el"
                        ? "Εποχιακοί Παράγοντες"
                        : "Seasonal Factors"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSeasonalChart()}

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {language === "el"
                        ? "Εποχιακή Ανάλυση"
                        : "Seasonal Analysis"}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {language === "el"
                        ? "Οι τιμές τείνουν να είναι υψηλότερες κατά τη διάρκεια του καλοκαιριού λόγω αυξημένης ζήτησης και μειωμένης προσφοράς. Προγραμματίστε τις αγορές σας αναλόγως."
                        : "Prices tend to be higher during summer due to increased demand and reduced supply. Plan your purchases accordingly."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forecast" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-purple-600" />
                    <span>
                      {language === "el"
                        ? "Προβλέψεις Αγοράς"
                        : "Market Forecasts"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-800 mb-1">
                          +8.5%
                        </div>
                        <div className="text-sm text-green-700">
                          {language === "el"
                            ? "Αύξηση Ζήτησης"
                            : "Demand Growth"}
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          {language === "el"
                            ? "Επόμενοι 12 μήνες"
                            : "Next 12 months"}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                      <CardContent className="p-4 text-center">
                        <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-800 mb-1">
                          +12.3%
                        </div>
                        <div className="text-sm text-blue-700">
                          {language === "el"
                            ? "Αύξηση Τιμών"
                            : "Price Increase"}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          {language === "el"
                            ? "Πρόβλεψη Q2 2024"
                            : "Q2 2024 Forecast"}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-red-50">
                      <CardContent className="p-4 text-center">
                        <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-orange-800 mb-1">
                          -5.2%
                        </div>
                        <div className="text-sm text-orange-700">
                          {language === "el"
                            ? "Μείωση Προσφοράς"
                            : "Supply Reduction"}
                        </div>
                        <div className="text-xs text-orange-600 mt-1">
                          {language === "el"
                            ? "Αλιευτικά αποθέματα"
                            : "Fishing stocks"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-400">
                    <h4 className="font-medium text-purple-900 mb-2">
                      {language === "el"
                        ? "Μακροπρόθεσμη Πρόβλεψη"
                        : "Long-term Forecast"}
                    </h4>
                    <p className="text-purple-800 text-sm">
                      {language === "el"
                        ? "Τα επόμενα 2-3 χρόνια αναμένεται συνεχής άνοδος των τιμών λόγω περιβαλλοντικών περιορισμών και αυξημένης ζήτησης για premium προϊόντα. Η βιωσιμ��τητα θα γίνει κρίσιμος παράγοντας διαφοροποίησης."
                        : "Over the next 2-3 years, continued price increases are expected due to environmental constraints and increased demand for premium products. Sustainability will become a critical differentiation factor."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EconomicTrends;