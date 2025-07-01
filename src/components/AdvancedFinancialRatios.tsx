import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  AlertTriangle,
  CheckCircle,
  Target,
  Clock,
  Droplets,
  Zap,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FinancialRatiosProps {
  formData: any;
  results: any;
}

interface FinancialData {
  currentAssets: number;
  currentLiabilities: number;
  inventory: number;
  accountsReceivable: number;
  cash: number;
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  revenue: number;
  costOfGoodsSold: number;
  operatingExpenses: number;
  netIncome: number;
  interestExpense: number;
  ebit: number;
  ebitda: number;
}

const AdvancedFinancialRatios: React.FC<FinancialRatiosProps> = ({
  formData,
  results,
}) => {
  const [activeTab, setActiveTab] = useState("liquidity");
  const [timeHorizon, setTimeHorizon] = useState("current");

  // Πραγματικά δεδομένα για ελληνική εταιρεία θαλασσινών
  const [financialData, setFinancialData] = useState<FinancialData>({
    currentAssets: 450000, // €450K - Κυκλοφορούντα περιουσιακά στοιχεία
    currentLiabilities: 180000, // €180K - Βραχυπρόθεσμες υποχρεώσεις
    inventory: 120000, // €120K - Αποθέματα (ψάρια, κατεψυγμένα)
    accountsReceivable: 85000, // €85K - Απαιτήσεις από πελάτες
    cash: 65000, // €65K - Ταμείο και καταθέσεις
    totalAssets: 1200000, // €1.2M - Σύνολο περιουσιακών στοιχείων
    totalLiabilities: 480000, // €480K - Σύνολο υποχρεώσεων
    totalEquity: 720000, // €720K - Ίδια κεφάλαια
    revenue: 2400000, // €2.4M - Κύκλος εργασιών
    costOfGoodsSold: 1560000, // €1.56M - Κόστος πωληθέντων
    operatingExpenses: 480000, // €480K - Λειτουργικά έξοδα
    netIncome: 240000, // €240K - Καθαρά κέρδη
    interestExpense: 28800, // €28.8K - Χρεωστικοί τόκοι
    ebit: 360000, // €360K - Κέρδη πριν τόκους και φόρους
    ebitda: 420000, // €420K - EBITDA
  });

  // Υπολογισμός δεικτών ρευστότητας
  const liquidityRatios = {
    currentRatio:
      financialData.currentAssets / financialData.currentLiabilities,
    quickRatio:
      (financialData.currentAssets - financialData.inventory) /
      financialData.currentLiabilities,
    cashRatio: financialData.cash / financialData.currentLiabilities,
    workingCapital:
      financialData.currentAssets - financialData.currentLiabilities,
  };

  // Υπολογισμός δεικτών δανειακής επιβάρυνσης
  const leverageRatios = {
    debtToEquity: financialData.totalLiabilities / financialData.totalEquity,
    debtToAssets: financialData.totalLiabilities / financialData.totalAssets,
    equityRatio: financialData.totalEquity / financialData.totalAssets,
    interestCoverage: financialData.ebit / financialData.interestExpense,
    debtServiceCoverage:
      financialData.ebitda / (financialData.interestExpense + 50000), // Principal payments
  };

  // Υπολογισμός δεικτών δραστηριότητας/κυκλοφοριακής ταχύτητας
  const activityRatios = {
    inventoryTurnover: financialData.costOfGoodsSold / financialData.inventory,
    receivablesTurnover:
      financialData.revenue / financialData.accountsReceivable,
    assetTurnover: financialData.revenue / financialData.totalAssets,
    daysSalesOutstanding:
      365 / (financialData.revenue / financialData.accountsReceivable),
    daysInventoryOutstanding:
      365 / (financialData.costOfGoodsSold / financialData.inventory),
    cashConversionCycle:
      365 / (financialData.costOfGoodsSold / financialData.inventory) +
      365 / (financialData.revenue / financialData.accountsReceivable) -
      365 / (financialData.costOfGoodsSold / financialData.currentLiabilities),
  };

  // Υπολογισμός δεικτών αποδοτικότητας
  const profitabilityRatios = {
    grossMargin:
      ((financialData.revenue - financialData.costOfGoodsSold) /
        financialData.revenue) *
      100,
    operatingMargin:
      ((financialData.revenue -
        financialData.costOfGoodsSold -
        financialData.operatingExpenses) /
        financialData.revenue) *
      100,
    netMargin: (financialData.netIncome / financialData.revenue) * 100,
    roa: (financialData.netIncome / financialData.totalAssets) * 100,
    roe: (financialData.netIncome / financialData.totalEquity) * 100,
    roic:
      ((financialData.ebit * (1 - 0.29)) /
        (financialData.totalAssets - financialData.currentLiabilities)) *
      100, // 29% tax rate
    ebitdaMargin: (financialData.ebitda / financialData.revenue) * 100,
  };

  // Benchmarks για τη βιομηχανία θαλασσινών
  const industryBenchmarks = {
    currentRatio: { excellent: 2.5, good: 2.0, average: 1.5, poor: 1.0 },
    quickRatio: { excellent: 1.5, good: 1.2, average: 1.0, poor: 0.8 },
    debtToEquity: { excellent: 0.3, good: 0.5, average: 0.8, poor: 1.2 },
    inventoryTurnover: { excellent: 8, good: 6, average: 4, poor: 2 },
    receivablesTurnover: { excellent: 12, good: 10, average: 8, poor: 6 },
    grossMargin: { excellent: 40, good: 35, average: 30, poor: 25 },
    netMargin: { excellent: 15, good: 10, average: 7, poor: 5 },
    roa: { excellent: 15, good: 12, average: 8, poor: 5 },
    roe: { excellent: 20, good: 15, average: 12, poor: 8 },
  };

  // Αξιολόγηση δεικτών
  const evaluateRatio = (
    value: number,
    benchmark: any,
  ): { level: string; color: string; description: string } => {
    if (value >= benchmark.excellent) {
      return {
        level: "Εξαιρετικό",
        color: "text-green-600",
        description: "Υπερτερεί σημαντικά έναντι του κλάδου",
      };
    } else if (value >= benchmark.good) {
      return {
        level: "Καλό",
        color: "text-blue-600",
        description: "Υπερτερεί έναντι του κλάδου",
      };
    } else if (value >= benchmark.average) {
      return {
        level: "Μέτριο",
        color: "text-yellow-600",
        description: "Στον μέσο όρο του κλάδου",
      };
    } else {
      return {
        level: "Χαμηλό",
        color: "text-red-600",
        description: "Κάτω από τον μέσο όρο του κλάδου",
      };
    }
  };

  // Δεδομένα για radar chart
  const radarData = [
    {
      metric: "Ρευστότητα",
      value: Math.min(liquidityRatios.currentRatio * 20, 100),
      benchmark: 50,
    },
    {
      metric: "Δανειακή Επιβάρυνση",
      value: Math.min((2 - leverageRatios.debtToEquity) * 50, 100),
      benchmark: 50,
    },
    {
      metric: "Δραστηριότητα",
      value: Math.min(activityRatios.inventoryTurnover * 12.5, 100),
      benchmark: 50,
    },
    {
      metric: "Αποδοτικότητα",
      value: Math.min(profitabilityRatios.roe * 5, 100),
      benchmark: 60,
    },
    {
      metric: "Κερδοφορία",
      value: Math.min(profitabilityRatios.netMargin * 10, 100),
      benchmark: 70,
    },
    {
      metric: "Αποτελεσματικότητα",
      value: Math.min(profitabilityRatios.roa * 10, 100),
      benchmark: 80,
    },
  ];

  // Ιστορικά δεδομένα για trends
  const historicalData = [
    {
      period: "2020",
      currentRatio: 2.1,
      debtToEquity: 0.45,
      roa: 9.2,
      grossMargin: 32.1,
    },
    {
      period: "2021",
      currentRatio: 2.3,
      debtToEquity: 0.52,
      roa: 11.8,
      grossMargin: 33.7,
    },
    {
      period: "2022",
      currentRatio: 2.2,
      debtToEquity: 0.58,
      roa: 13.4,
      grossMargin: 34.2,
    },
    {
      period: "2023",
      currentRatio: 2.4,
      debtToEquity: 0.61,
      roa: 15.1,
      grossMargin: 35.8,
    },
    {
      period: "2024",
      currentRatio: liquidityRatios.currentRatio,
      debtToEquity: leverageRatios.debtToEquity,
      roa: profitabilityRatios.roa,
      grossMargin: profitabilityRatios.grossMargin,
    },
  ];

  const formatCurrency = (amount: number) =>
    `€${amount.toLocaleString("el-GR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;
  const formatRatio = (value: number) => value.toFixed(2);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Χρηματοοικονομικοί Δείκτες & Ανάλυση Απόδοσης
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger
                value="liquidity"
                className="flex items-center gap-1"
              >
                <Droplets className="w-4 h-4" />
                Ρευστότητα
              </TabsTrigger>
              <TabsTrigger value="leverage" className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                Δανειακή Επιβάρυνση
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Δραστηριότητα
              </TabsTrigger>
              <TabsTrigger
                value="profitability"
                className="flex items-center gap-1"
              >
                <TrendingUp className="w-4 h-4" />
                Αποδοτικότητα
              </TabsTrigger>
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Συνολική Εικόνα
              </TabsTrigger>
            </TabsList>

            <TabsContent value="liquidity" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Δείκτης Κυκλοφοριακής Ρευστότητας
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatRatio(liquidityRatios.currentRatio)}
                    </div>
                    <div
                      className={`text-sm ${evaluateRatio(liquidityRatios.currentRatio, industryBenchmarks.currentRatio).color}`}
                    >
                      {
                        evaluateRatio(
                          liquidityRatios.currentRatio,
                          industryBenchmarks.currentRatio,
                        ).level
                      }
                    </div>
                    <Progress
                      value={Math.min(liquidityRatios.currentRatio * 40, 100)}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Κυκλοφορούντα / Βραχυπρόθεσμες Υποχρ.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Δείκτης Άμεσης Ρευστότητας
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatRatio(liquidityRatios.quickRatio)}
                    </div>
                    <div
                      className={`text-sm ${evaluateRatio(liquidityRatios.quickRatio, industryBenchmarks.quickRatio).color}`}
                    >
                      {
                        evaluateRatio(
                          liquidityRatios.quickRatio,
                          industryBenchmarks.quickRatio,
                        ).level
                      }
                    </div>
                    <Progress
                      value={Math.min(liquidityRatios.quickRatio * 67, 100)}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      (Κυκλοφορούντα - Αποθέματα) / Βραχυπρόθ.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Δείκτης Ταμειακής Ρευστότητας
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatRatio(liquidityRatios.cashRatio)}
                    </div>
                    <div className="text-sm text-blue-600">Συντηρητικός</div>
                    <Progress
                      value={Math.min(liquidityRatios.cashRatio * 100, 100)}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Ταμείο / Βραχυπρόθεσμες Υποχρ.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Κεφάλαιο Κίνηση��</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(liquidityRatios.workingCapital)}
                    </div>
                    <div className="text-sm text-green-600">Θετικό</div>
                    <Progress
                      value={Math.min(
                        (liquidityRatios.workingCapital /
                          financialData.currentAssets) *
                          100,
                        100,
                      )}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Κυκλοφορούντα - Βραχυπρόθεσμες
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Ανάλυση Ρευστότητας για Θαλασσινά</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Alert>
                        <Droplets className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Κατάσταση Ρευστότητας:</strong> Η εταιρεία
                          διαθέτει υγιή ��ευστότητα με δείκτη κυκλοφοριακής
                          ρευστότητας{" "}
                          {formatRatio(liquidityRatios.currentRatio)}. Αυτό
                          σημαίνει ότι για κάθε €1 βραχυπρόθεσμων υποχρεώσεων,
                          διαθέτει €{formatRatio(liquidityRatios.currentRatio)}{" "}
                          κυκλοφορούντων περιουσιακών στοιχείων.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          Ειδικά Χαρακτηριστικά Κλάδου
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Υψηλά αποθέματα λόγω εποχικότητας</li>
                          <li>• Ταχεία κύκλωση λόγω φθοράς προϊόντων</li>
                          <li>• Ανάγκη για ψυκτική αλυσίδα</li>
                          <li>• Διακυμάνσεις λόγω αλιευτικών περιόδων</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                          data={[
                            {
                              name: "Ταμείο",
                              value: financialData.cash,
                              color: "#10b981",
                            },
                            {
                              name: "Απαιτήσεις",
                              value: financialData.accountsReceivable,
                              color: "#3b82f6",
                            },
                            {
                              name: "Αποθέματα",
                              value: financialData.inventory,
                              color: "#f59e0b",
                            },
                            {
                              name: "Λοιπά",
                              value:
                                financialData.currentAssets -
                                financialData.cash -
                                financialData.accountsReceivable -
                                financialData.inventory,
                              color: "#8b5cf6",
                            },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) =>
                              formatCurrency(value as number)
                            }
                          />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leverage" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Δείκτης Μόχλευσης (D/E)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatRatio(leverageRatios.debtToEquity)}
                    </div>
                    <div
                      className={`text-sm ${evaluateRatio(leverageRatios.debtToEquity, industryBenchmarks.debtToEquity).color}`}
                    >
                      {
                        evaluateRatio(
                          leverageRatios.debtToEquity,
                          industryBenchmarks.debtToEquity,
                        ).level
                      }
                    </div>
                    <Progress
                      value={Math.min(
                        (2 - leverageRatios.debtToEquity) * 50,
                        100,
                      )}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Σύνολο Υποχρεώσεων / Ίδια Κεφάλαια
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Κάλυψη Τόκων</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatRatio(leverageRatios.interestCoverage)}x
                    </div>
                    <div className="text-sm text-green-600">Ασφαλής</div>
                    <Progress
                      value={Math.min(
                        leverageRatios.interestCoverage * 10,
                        100,
                      )}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      EBIT / Χρεωστικοί Τόκοι
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Αναλογία Ιδίων Κεφαλαίων
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercent(leverageRatios.equityRatio * 100)}
                    </div>
                    <div className="text-sm text-blue-600">Υγιής</div>
                    <Progress
                      value={leverageRatios.equityRatio * 100}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Ίδια Κεφάλαια / Σύνολο Ενεργητικού
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Δομή Κεφαλαίων & Χρηματοδοτική Πολιτική</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              {
                                name: "Ίδια Κεφάλαια",
                                value: financialData.totalEquity,
                                color: "#10b981",
                              },
                              {
                                name: "Δανεισμός",
                                value: financialData.totalLiabilities,
                                color: "#ef4444",
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#ef4444" />
                          </Pie>
                          <Tooltip
                            formatter={(value) =>
                              formatCurrency(value as number)
                            }
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      <Alert>
                        <BarChart3 className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Χρηματοδοτική Δομή:</strong> Η εταιρεία
                          διαθέτει συντηρητική χρηματοδοτική δομή με δείκτη
                          μόχλευσης {formatRatio(leverageRatios.debtToEquity)}.
                          Αυτό παρέχει σταθερότητα και ευελιξία για μελλοντικές
                          επενδύσεις.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          Πλεονεκτήματα Χαμηλής Μόχλευσης
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Χαμηλός χρηματοοικονομικός κίνδυνος</li>
                          <li>• Ευελιξία σε οικονομικές κρίσεις</li>
                          <li>• Δυνατότητα αύξησης δανεισμού</li>
                          <li>• Χαμηλότερο κόστος κεφαλαίου</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          Προτάσεις Βελτιστοποίησης
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Εξετάστε επιπλέον δανεισμό για επέκταση</li>
                          <li>• Αξιοποιήστε φορολογικά οφέλη τόκων</li>
                          <li>• Βελτιώστε το κόστος κεφαλαίου</li>
                          <li>• Εισαγάγετε μακροπρόθεσμη χρηματοδότηση</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Κύκλωση Αποθεμάτων
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatRatio(activityRatios.inventoryTurnover)}x
                    </div>
                    <div
                      className={`text-sm ${evaluateRatio(activityRatios.inventoryTurnover, industryBenchmarks.inventoryTurnover).color}`}
                    >
                      {
                        evaluateRatio(
                          activityRatios.inventoryTurnover,
                          industryBenchmarks.inventoryTurnover,
                        ).level
                      }
                    </div>
                    <Progress
                      value={Math.min(
                        activityRatios.inventoryTurnover * 12.5,
                        100,
                      )}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Κόστος Πωληθέντων / Μέσα Αποθέματα
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Κύκλωση Απαιτήσεων
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatRatio(activityRatios.receivablesTurnover)}x
                    </div>
                    <div
                      className={`text-sm ${evaluateRatio(activityRatios.receivablesTurnover, industryBenchmarks.receivablesTurnover).color}`}
                    >
                      {
                        evaluateRatio(
                          activityRatios.receivablesTurnover,
                          industryBenchmarks.receivablesTurnover,
                        ).level
                      }
                    </div>
                    <Progress
                      value={Math.min(
                        activityRatios.receivablesTurnover * 8.33,
                        100,
                      )}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Πωλήσεις / Μέσες Απαιτήσεις
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Ημέρες Είσπραξης</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(activityRatios.daysSalesOutstanding)}
                    </div>
                    <div className="text-sm text-blue-600">Ημέρες</div>
                    <Progress
                      value={Math.min(
                        100 - (activityRatios.daysSalesOutstanding / 60) * 100,
                        100,
                      )}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      365 / Κύκλωση Απαιτήσεων
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Κύκλος Μετατροπής Ρευστού & Λειτουργική Αποτελεσματικότητα
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3">
                          Κύκλος Μετατροπής Ρευστού
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Ημέρες Αποθεμάτων:</span>
                            <span className="font-medium">
                              {Math.round(
                                activityRatios.daysInventoryOutstanding,
                              )}{" "}
                              ημέρες
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ημέρες Απαιτήσεων:</span>
                            <span className="font-medium">
                              {Math.round(activityRatios.daysSalesOutstanding)}{" "}
                              ημέρες
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-semibold">
                              Συνολικός Κύκλος:
                            </span>
                            <span className="font-bold text-blue-600">
                              {Math.round(
                                activityRatios.daysInventoryOutstanding +
                                  activityRatios.daysSalesOutstanding,
                              )}{" "}
                              ημέρες
                            </span>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <Clock className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Ερμηνεία:</strong> Χρειάζονται{" "}
                          {Math.round(
                            activityRatios.daysInventoryOutstanding +
                              activityRatios.daysSalesOutstanding,
                          )}{" "}
                          ημέρες για να μετατραπεί η επένδυση σε αποθέματα σε
                          ρευστό διαθέσιμο. Για τη βιομηχανία θαλασσινών, αυτό
                          είναι{" "}
                          {activityRatios.daysInventoryOutstanding +
                            activityRatios.daysSalesOutstanding <
                          50
                            ? "εξαιρετικό"
                            : activityRatios.daysInventoryOutstanding +
                                  activityRatios.daysSalesOutstanding <
                                70
                              ? "καλό"
                              : "βελτιώσιμο"}
                          .
                        </AlertDescription>
                      </Alert>
                    </div>

                    <div>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                          data={[
                            {
                              name: "Ημέρες Αποθεμάτων",
                              value: activityRatios.daysInventoryOutstanding,
                              color: "#3b82f6",
                            },
                            {
                              name: "Ημέρες Απαιτήσεων",
                              value: activityRatios.daysSalesOutstanding,
                              color: "#10b981",
                            },
                            {
                              name: "Κλαδικός Μ.Ο.",
                              value: 45,
                              color: "#f59e0b",
                            },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) =>
                              `${Math.round(value as number)} ημέρες`
                            }
                          />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profitability" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Μικτό Περιθώριο</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercent(profitabilityRatios.grossMargin)}
                    </div>
                    <div
                      className={`text-sm ${evaluateRatio(profitabilityRatios.grossMargin, industryBenchmarks.grossMargin).color}`}
                    >
                      {
                        evaluateRatio(
                          profitabilityRatios.grossMargin,
                          industryBenchmarks.grossMargin,
                        ).level
                      }
                    </div>
                    <Progress
                      value={Math.min(profitabilityRatios.grossMargin * 2, 100)}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Μικτό Κέρδος / Έσοδα
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Καθαρό Περιθώριο</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercent(profitabilityRatios.netMargin)}
                    </div>
                    <div
                      className={`text-sm ${evaluateRatio(profitabilityRatios.netMargin, industryBenchmarks.netMargin).color}`}
                    >
                      {
                        evaluateRatio(
                          profitabilityRatios.netMargin,
                          industryBenchmarks.netMargin,
                        ).level
                      }
                    </div>
                    <Progress
                      value={Math.min(profitabilityRatios.netMargin * 5, 100)}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Καθαρό Κέρδος / Έσοδα
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">ROA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercent(profitabilityRatios.roa)}
                    </div>
                    <div
                      className={`text-sm ${evaluateRatio(profitabilityRatios.roa, industryBenchmarks.roa).color}`}
                    >
                      {
                        evaluateRatio(
                          profitabilityRatios.roa,
                          industryBenchmarks.roa,
                        ).level
                      }
                    </div>
                    <Progress
                      value={Math.min(profitabilityRatios.roa * 5, 100)}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Καθαρό Κέρδος / Συνολικά Περιουσιακά
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">ROE</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercent(profitabilityRatios.roe)}
                    </div>
                    <div
                      className={`text-sm ${evaluateRatio(profitabilityRatios.roe, industryBenchmarks.roe).color}`}
                    >
                      {
                        evaluateRatio(
                          profitabilityRatios.roe,
                          industryBenchmarks.roe,
                        ).level
                      }
                    </div>
                    <Progress
                      value={Math.min(profitabilityRatios.roe * 4, 100)}
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Καθαρό Κέρδος / Ίδια Κεφάλαια
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Ανάλυση Κερδοφορίας & Σύγκριση με Κλάδο</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="grossMargin"
                        stroke="#2563eb"
                        name="Μικτό Περιθώριο %"
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="roa"
                        stroke="#dc2626"
                        name="ROA %"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Συνολική Απόδοση (Radar Chart)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar
                          name="Τρέχον"
                          dataKey="value"
                          stroke="#2563eb"
                          fill="#2563eb"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Radar
                          name="Κλαδικός Μ.Ο."
                          dataKey="benchmark"
                          stroke="#dc2626"
                          fill="#dc2626"
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                        <Tooltip />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Συνολική Αξιολόγηση</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">
                            Δυνατά Σημεία
                          </span>
                        </div>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Εξαιρετική ρευστότητα</li>
                          <li>• Υψηλή κερδοφορία</li>
                          <li>• Χαμηλός χρηματοοικονομικός κίνδυνος</li>
                          <li>• Αποτελεσματική διαχείριση αποθεμάτων</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          <span className="font-semibold text-yellow-800">
                            Περιοχές Βελτίωσης
                          </span>
                        </div>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Επιτάχυνση εισπράξεων</li>
                          <li>• Αξιοποίηση χρηματοοικονομικής μόχλευσης</li>
                          <li>• Βελτίωση κύκλωσης ενεργητικού</li>
                          <li>• Επέκταση δραστηριοτήτων</li>
                        </ul>
                      </div>
                    </div>

                    <Alert>
                      <Target className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Συνολική Αξιολόγηση:</strong> Η εταιρεία
                        παρουσιάζει υγιή χρηματοοικονομική κατάσταση με
                        δυνατότητες για περαιτέρω ανάπτυξη. Η συντηρητική
                        χρηματοοικονομική πολιτική παρέχει σταθερότητα, αλλά
                        υπάρχει περιθώριο για επιθετικότερη στρατηγική
                        επέκτασης.
                      </AlertDescription>
                    </Alert>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Στρατηγικές Προτάσεις
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>
                          • Εξετάστε χρηματοδότηση για επέκταση εγκαταστάσεων
                        </li>
                        <li>• Αναπτύξτε premium γραμμή προϊόντων</li>
                        <li>
                          • Βελτιώστε την ψηφιακή παρουσία για B2B πωλήσεις
                        </li>
                        <li>• Εισαγάγετε προγράμματα πιστότητας πελατών</li>
                        <li>• Επενδύστε σε αυτοματοποίηση διαδικασιών</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Ιστορική Εξέλιξη Βασικών Δεικτών</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="currentRatio"
                        stroke="#2563eb"
                        name="Τρέχων Δείκτης"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="debtToEquity"
                        stroke="#dc2626"
                        name="Δείκτης Μόχλευσης"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="roa"
                        stroke="#10b981"
                        name="ROA %"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedFinancialRatios;
