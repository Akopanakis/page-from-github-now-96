import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Calculator,
  PieChart,
  BarChart3,
  Target,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import ProductionAnalysis from "./ProductionAnalysis";
import AdvancedFinancialRatios from "./AdvancedFinancialRatios";
import CostTheorySection from "./CostTheorySection";

interface EnhancedFinancialModelsProps {
  formData: any;
  results: any;
  onUpdateFormData: (updates: any) => void;
}

const EnhancedFinancialModels: React.FC<EnhancedFinancialModelsProps> = ({
  formData,
  results,
  onUpdateFormData,
}) => {
  const [activeTab, setActiveTab] = useState("production");
  const [scenarioMode, setScenarioMode] = useState(false);
  const [scenarios, setScenarios] = useState([
    { name: "Βάση", multiplier: 1.0, active: true },
    { name: "Αισιόδοξο", multiplier: 1.15, active: false },
    { name: "Απαισιόδοξο", multiplier: 0.85, active: false },
  ]);

  // Προσομοίωση Monte Carlo για ανάλυση κινδύνου
  const [monteCarloResults, setMonteCarloResults] = useState<any[]>([]);
  const [volatilityParameters, setVolatilityParameters] = useState({
    priceVolatility: 15, // ±15% διακύμανση τιμών
    volumeVolatility: 10, // ±10% διακύμανση όγκου
    costVolatility: 8, // ±8% διακύμανση κόστους
    iterations: 1000,
  });

  // Μοντέλο DCF (Discounted Cash Flow)
  const [dcfParameters, setDcfParameters] = useState({
    projectionYears: 5,
    discountRate: 0.12, // 12% WACC
    terminalGrowthRate: 0.025, // 2.5% μακροχρόνια ανάπτυξη
    initialRevenue: results?.finalPrice * results?.netWeight || 100000,
    revenueGrowthRate: 0.08, // 8% ετήσια ανάπτυξη
    ebitdaMargin: 0.18, // 18% EBITDA margin
    capexRate: 0.05, // 5% των εσόδων σε επενδύσεις
    taxRate: 0.29, // 29% φορολογικός συντελεστής Ελλάδας
  });

  // Υπολογισμός DCF
  const calculateDCF = () => {
    const projections = [];
    let currentRevenue = dcfParameters.initialRevenue;

    for (let year = 1; year <= dcfParameters.projectionYears; year++) {
      currentRevenue *= 1 + dcfParameters.revenueGrowthRate;
      const ebitda = currentRevenue * dcfParameters.ebitdaMargin;
      const depreciation = currentRevenue * 0.03; // 3% depreciation
      const ebit = ebitda - depreciation;
      const taxes = ebit * dcfParameters.taxRate;
      const nopat = ebit - taxes;
      const capex = currentRevenue * dcfParameters.capexRate;
      const freeCashFlow = nopat + depreciation - capex;
      const presentValue =
        freeCashFlow / Math.pow(1 + dcfParameters.discountRate, year);

      projections.push({
        year,
        revenue: currentRevenue,
        ebitda,
        ebit,
        nopat,
        freeCashFlow,
        presentValue,
        cumulativePV:
          projections.reduce((sum, p) => sum + p.presentValue, 0) +
          presentValue,
      });
    }

    // Terminal Value
    const terminalCashFlow =
      projections[projections.length - 1].freeCashFlow *
      (1 + dcfParameters.terminalGrowthRate);
    const terminalValue =
      terminalCashFlow /
      (dcfParameters.discountRate - dcfParameters.terminalGrowthRate);
    const terminalPV =
      terminalValue /
      Math.pow(1 + dcfParameters.discountRate, dcfParameters.projectionYears);

    const enterpriseValue =
      projections.reduce((sum, p) => sum + p.presentValue, 0) + terminalPV;

    return {
      projections,
      terminalValue,
      terminalPV,
      enterpriseValue,
      impliedMultiple: enterpriseValue / dcfParameters.initialRevenue,
    };
  };

  // Ανάλυση ευαισθησίας
  const generateSensitivityAnalysis = () => {
    const baseCase = calculateDCF();
    const variables = [
      { name: "Μέγεθος Αγοράς", range: [-20, -10, 0, 10, 20] },
      { name: "Μερίδιο Αγοράς", range: [-15, -7.5, 0, 7.5, 15] },
      { name: "Τιμή", range: [-10, -5, 0, 5, 10] },
      { name: "Κόστος", range: [10, 5, 0, -5, -10] },
      { name: "WACC", range: [2, 1, 0, -1, -2] },
    ];

    const results = variables.map((variable) => {
      const impacts = variable.range.map((change) => {
        let adjustedParams = { ...dcfParameters };

        switch (variable.name) {
          case "Μέγεθος Αγοράς":
          case "Μερίδιο Αγοράς":
          case "Τιμή":
            adjustedParams.revenueGrowthRate *= 1 + change / 100;
            break;
          case "Κόστος":
            adjustedParams.ebitdaMargin *= 1 + change / 100;
            break;
          case "WACC":
            adjustedParams.discountRate += change / 100;
            break;
        }

        const scenario = calculateDCF();
        return {
          change,
          value: scenario.enterpriseValue,
          impact:
            ((scenario.enterpriseValue - baseCase.enterpriseValue) /
              baseCase.enterpriseValue) *
            100,
        };
      });

      return {
        variable: variable.name,
        impacts,
      };
    });

    return results;
  };

  // Ανάλυση σεναρίων
  const generateScenarioAnalysis = () => {
    const scenarios = [
      {
        name: "Βασικό Σενάριο",
        probability: 0.5,
        assumptions: {
          marketGrowth: 8,
          marketShare: 12,
          priceIncrease: 3,
          costIncrease: 4,
        },
      },
      {
        name: "Αισιόδοξο Σενάριο",
        probability: 0.25,
        assumptions: {
          marketGrowth: 15,
          marketShare: 18,
          priceIncrease: 8,
          costIncrease: 2,
        },
      },
      {
        name: "Απαισιόδοξο Σενάριο",
        probability: 0.25,
        assumptions: {
          marketGrowth: 2,
          marketShare: 8,
          priceIncrease: -2,
          costIncrease: 8,
        },
      },
    ];

    return scenarios.map((scenario) => {
      const adjustedParams = { ...dcfParameters };
      adjustedParams.revenueGrowthRate =
        scenario.assumptions.marketGrowth / 100;
      adjustedParams.ebitdaMargin *=
        1 +
        (scenario.assumptions.priceIncrease -
          scenario.assumptions.costIncrease) /
          100;

      // Calculate scenario-specific DCF
      const dcfResult = calculateDCF();

      return {
        ...scenario,
        enterpriseValue: dcfResult.enterpriseValue,
        irr:
          ((dcfResult.enterpriseValue / dcfParameters.initialRevenue) **
            (1 / dcfParameters.projectionYears) -
            1) *
          100,
        paybackPeriod:
          dcfResult.projections.findIndex(
            (p) => p.cumulativePV > dcfParameters.initialRevenue * 0.5,
          ) + 1,
      };
    });
  };

  // Υπολογισμός Key Performance Indicators για θαλασσινά
  const calculateSeafoodKPIs = () => {
    const revenue = results?.finalPrice * results?.netWeight || 100000;
    const totalCosts = results?.totalCosts || 70000;
    const grossProfit = revenue - totalCosts;

    return {
      // Οικονομικοί Δείκτες
      grossMargin: (grossProfit / revenue) * 100,
      netMargin: ((grossProfit * 0.85) / revenue) * 100, // After all expenses
      ebitdaMargin: ((grossProfit * 0.9) / revenue) * 100,
      returnOnAssets: ((grossProfit * 0.85) / 500000) * 100, // Assumed assets
      returnOnEquity: ((grossProfit * 0.85) / 300000) * 100, // Assumed equity

      // Λειτουργικοί Δείκτες
      revenuePerKg: results?.finalPrice || 8.5,
      costPerKg: results?.costPerKg || 5.8,
      processingYield:
        ((results?.netWeight || 80) / (results?.rawWeight || 100)) * 100,
      capacityUtilization: 85, // Assumed
      inventoryTurnover: 8.2,

      // Δείκτες Ποιότητας & Βιωσιμότητας
      qualityScore: 87, // Based on grade A = 90+, B = 80-89, C = 70-79
      sustainabilityScore: 78,
      customerSatisfaction: 4.2, // out of 5
      wasteReduction: 15, // % improvement
      energyEfficiency: 92,

      // Δείκτες Αγοράς
      marketShare: 12.5, // %
      brandRecognition: 68, // %
      customerRetention: 84, // %
      newCustomerAcquisition: 15, // monthly %
      averageOrderSize: 250, // kg
    };
  };

  const dcfResults = calculateDCF();
  const sensitivityResults = generateSensitivityAnalysis();
  const scenarioResults = generateScenarioAnalysis();
  const kpis = calculateSeafoodKPIs();

  const formatCurrency = (amount: number) =>
    `€${amount.toLocaleString("el-GR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            Προχωρημένα Χρηματοοικονομικά Μοντέλα & Οικονομική Ανάλυση
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="production">Παραγωγή & Κόστος</TabsTrigger>
              <TabsTrigger value="financial-ratios">
                Χρηματοοικονομικοί Δείκτες
              </TabsTrigger>
              <TabsTrigger value="dcf">DCF & Αποτίμηση</TabsTrigger>
              <TabsTrigger value="sensitivity">Ανάλυση Ευαισθησίας</TabsTrigger>
              <TabsTrigger value="scenarios">Σενάρια & Κίνδυνος</TabsTrigger>
              <TabsTrigger value="kpis">KPIs & Δείκτες</TabsTrigger>
            </TabsList>

            <TabsContent value="production" className="space-y-6">
              <ProductionAnalysis formData={formData} results={results} />
              <CostTheorySection formData={formData} results={results} />
            </TabsContent>

            <TabsContent value="financial-ratios" className="space-y-6">
              <AdvancedFinancialRatios formData={formData} results={results} />
            </TabsContent>

            <TabsContent value="dcf" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Παράμετροι DCF Μοντέλου
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>
                        Χρόνια Προβολής: {dcfParameters.projectionYears}
                      </Label>
                      <Slider
                        value={[dcfParameters.projectionYears]}
                        onValueChange={([value]) =>
                          setDcfParameters((prev) => ({
                            ...prev,
                            projectionYears: value,
                          }))
                        }
                        min={3}
                        max={10}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Επιτόκιο Προεξόφλησης (WACC):{" "}
                        {formatPercent(dcfParameters.discountRate * 100)}
                      </Label>
                      <Slider
                        value={[dcfParameters.discountRate * 100]}
                        onValueChange={([value]) =>
                          setDcfParameters((prev) => ({
                            ...prev,
                            discountRate: value / 100,
                          }))
                        }
                        min={8}
                        max={20}
                        step={0.5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Ρυθμός Ανάπτυξης Εσόδων:{" "}
                        {formatPercent(dcfParameters.revenueGrowthRate * 100)}
                      </Label>
                      <Slider
                        value={[dcfParameters.revenueGrowthRate * 100]}
                        onValueChange={([value]) =>
                          setDcfParameters((prev) => ({
                            ...prev,
                            revenueGrowthRate: value / 100,
                          }))
                        }
                        min={0}
                        max={25}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        EBITDA Margin:{" "}
                        {formatPercent(dcfParameters.ebitdaMargin * 100)}
                      </Label>
                      <Slider
                        value={[dcfParameters.ebitdaMargin * 100]}
                        onValueChange={([value]) =>
                          setDcfParameters((prev) => ({
                            ...prev,
                            ebitdaMargin: value / 100,
                          }))
                        }
                        min={10}
                        max={30}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Αποτελέσματα Αποτίμησης
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm text-blue-600">
                            Αξία Επιχείρησης
                          </div>
                          <div className="text-xl font-bold text-blue-800">
                            {formatCurrency(dcfResults.enterpriseValue)}
                          </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm text-green-600">
                            Terminal Value
                          </div>
                          <div className="text-xl font-bold text-green-800">
                            {formatCurrency(dcfResults.terminalPV)}
                          </div>
                        </div>

                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="text-sm text-purple-600">
                            Implied Multiple
                          </div>
                          <div className="text-xl font-bold text-purple-800">
                            {dcfResults.impliedMultiple.toFixed(1)}x
                          </div>
                        </div>

                        <div className="bg-orange-50 p-3 rounded-lg">
                          <div className="text-sm text-orange-600">NPV</div>
                          <div className="text-xl font-bold text-orange-800">
                            {formatCurrency(
                              dcfResults.enterpriseValue -
                                dcfParameters.initialRevenue,
                            )}
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <TrendingUp className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Αποτίμηση:</strong> Η επιχείρηση αποτιμάται σε{" "}
                          {formatCurrency(dcfResults.enterpriseValue)}
                          με πολλαπλασιαστή{" "}
                          {dcfResults.impliedMultiple.toFixed(1)}x των εσόδων.
                          Το NPV είναι{" "}
                          {dcfResults.enterpriseValue >
                          dcfParameters.initialRevenue
                            ? "θετικό"
                            : "αρνητικό"}
                          .
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Προβολές Ελεύθερων Ταμειακών Ροών</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={dcfResults.projections}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="euro" />
                      <YAxis yAxisId="cumulative" orientation="right" />
                      <Tooltip
                        formatter={(value) => formatCurrency(value as number)}
                      />
                      <Legend />
                      <Bar
                        yAxisId="euro"
                        dataKey="revenue"
                        fill="#3b82f6"
                        name="Έσοδα"
                      />
                      <Bar
                        yAxisId="euro"
                        dataKey="freeCashFlow"
                        fill="#10b981"
                        name="Ελεύθερες Ταμειακές Ροές"
                      />
                      <Line
                        yAxisId="cumulative"
                        type="monotone"
                        dataKey="cumulativePV"
                        stroke="#dc2626"
                        strokeWidth={3}
                        name="Σωρευτική PV"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sensitivity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Ανάλυση Ευαισθησίας - Επίδραση στην Αποτίμηση
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {sensitivityResults.map((result, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-semibold">{result.variable}</h4>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={result.impacts}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="change"
                              label={{
                                value: "Μεταβολή (%)",
                                position: "insideBottom",
                                offset: -5,
                              }}
                            />
                            <YAxis
                              label={{
                                value: "Επίδραση στην Αξία (%)",
                                angle: -90,
                                position: "insideLeft",
                              }}
                            />
                            <Tooltip />
                            <Bar
                              dataKey="impact"
                              fill={index % 2 === 0 ? "#3b82f6" : "#10b981"}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {scenarioResults.map((scenario, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle
                        className={`text-lg ${
                          scenario.name.includes("Αισιόδοξο")
                            ? "text-green-600"
                            : scenario.name.includes("Απαισιόδοξο")
                              ? "text-red-600"
                              : "text-blue-600"
                        }`}
                      >
                        {scenario.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Πιθανότητα:</span>
                          <span className="font-medium">
                            {formatPercent(scenario.probability * 100)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Αξία Επιχείρησης:</span>
                          <span className="font-bold">
                            {formatCurrency(scenario.enterpriseValue)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>IRR:</span>
                          <span className="font-medium">
                            {formatPercent(scenario.irr)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payback Period:</span>
                          <span className="font-medium">
                            {scenario.paybackPeriod} έτη
                          </span>
                        </div>

                        <div className="bg-gray-50 p-3 rounded text-xs">
                          <div>
                            Ανάπτυξη Αγοράς: {scenario.assumptions.marketGrowth}
                            %
                          </div>
                          <div>
                            Μερίδιο Αγοράς: {scenario.assumptions.marketShare}%
                          </div>
                          <div>
                            Αύξηση Τιμών: {scenario.assumptions.priceIncrease}%
                          </div>
                          <div>
                            Αύξηση Κόστους: {scenario.assumptions.costIncrease}%
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Σύγκριση Σεναρίων</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={scenarioResults}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="value" />
                      <YAxis yAxisId="irr" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar
                        yAxisId="value"
                        dataKey="enterpriseValue"
                        fill="#3b82f6"
                        name="Αξία Επιχείρησης (€)"
                      />
                      <Line
                        yAxisId="irr"
                        type="monotone"
                        dataKey="irr"
                        stroke="#dc2626"
                        strokeWidth={3}
                        name="IRR (%)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kpis" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Μικτό Περιθώριο</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercent(kpis.grossMargin)}
                    </div>
                    <Badge
                      variant={
                        kpis.grossMargin > 30
                          ? "default"
                          : kpis.grossMargin > 25
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {kpis.grossMargin > 30
                        ? "Εξαιρετικό"
                        : kpis.grossMargin > 25
                          ? "Καλό"
                          : "Χαμηλό"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Απόδοση Επεξεργασίας
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercent(kpis.processingYield)}
                    </div>
                    <Badge
                      variant={
                        kpis.processingYield > 85
                          ? "default"
                          : kpis.processingYield > 75
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {kpis.processingYield > 85
                        ? "Υψηλή"
                        : kpis.processingYield > 75
                          ? "Μέτρια"
                          : "Χαμηλή"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Κύκλωση Αποθεμάτων
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {kpis.inventoryTurnover.toFixed(1)}x
                    </div>
                    <Badge
                      variant={
                        kpis.inventoryTurnover > 8
                          ? "default"
                          : kpis.inventoryTurnover > 6
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {kpis.inventoryTurnover > 8
                        ? "Αποδοτική"
                        : kpis.inventoryTurnover > 6
                          ? "Μέτρια"
                          : "Αργή"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Μερίδιο Αγοράς</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercent(kpis.marketShare)}
                    </div>
                    <Badge
                      variant={
                        kpis.marketShare > 15
                          ? "default"
                          : kpis.marketShare > 10
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {kpis.marketShare > 15
                        ? "Ισχυρό"
                        : kpis.marketShare > 10
                          ? "Μέτριο"
                          : "Χαμηλό"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Βαθμός Ποιότητας</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {kpis.qualityScore}/100
                    </div>
                    <Badge
                      variant={
                        kpis.qualityScore > 85
                          ? "default"
                          : kpis.qualityScore > 75
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {kpis.qualityScore > 85
                        ? "A Grade"
                        : kpis.qualityScore > 75
                          ? "B Grade"
                          : "C Grade"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Βιωσιμότητα</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {kpis.sustainabilityScore}/100
                    </div>
                    <Badge
                      variant={
                        kpis.sustainabilityScore > 80
                          ? "default"
                          : kpis.sustainabilityScore > 70
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {kpis.sustainabilityScore > 80
                        ? "Πράσινη"
                        : kpis.sustainabilityScore > 70
                          ? "Μέτρια"
                          : "Βελτίωση"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Διατήρηση Πελατών</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercent(kpis.customerRetention)}
                    </div>
                    <Badge
                      variant={
                        kpis.customerRetention > 80
                          ? "default"
                          : kpis.customerRetention > 70
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {kpis.customerRetention > 80
                        ? "Εξαιρετική"
                        : kpis.customerRetention > 70
                          ? "Καλή"
                          : "Χαμηλή"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Ενεργειακή Απόδοση
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercent(kpis.energyEfficiency)}
                    </div>
                    <Badge
                      variant={
                        kpis.energyEfficiency > 90
                          ? "default"
                          : kpis.energyEfficiency > 80
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {kpis.energyEfficiency > 90
                        ? "Αποδοτική"
                        : kpis.energyEfficiency > 80
                          ? "Μέτρια"
                          : "Βελτίωση"}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Dashboard KPIs - Συνολική Απόδοση</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Συνολική Αξιολόγηση:</strong> Η επιχείρηση
                        παρουσιάζει υγιή οικονομικά μεγέθη με μικτό περιθώριο{" "}
                        {formatPercent(kpis.grossMargin)} και υψηλή ποιότητα
                        προϊόντων. Υπάρχουν ευκαιρίες βελτίωσης στη διατήρηση
                        πελατών και την ενεργειακή αποδοτικότητα.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">
                          Ισχυρά Σημεία
                        </h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Υψηλό μικτό περιθώριο κέρδους</li>
                          <li>• Αποδοτική κύκλωση αποθεμάτων</li>
                          <li>• Υψηλή ποιότητα προϊόντων</li>
                          <li>• Καλή απόδοση επεξεργασίας</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          Περιοχές Βελτίωσης
                        </h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Αύξηση μεριδίου αγοράς</li>
                          <li>• Βελτίωση βιωσιμότητας</li>
                          <li>• Ενεργειακή αποδοτικότητα</li>
                          <li>• Διατήρηση πελατών</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          Στρατηγικές Προτάσεις
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Επέκταση premium γραμμής</li>
                          <li>• Πράσινες τεχνολογίες</li>
                          <li>• CRM βελτιστοποίηση</li>
                          <li>• Διαφοροποίηση προϊόντων</li>
                        </ul>
                      </div>
                    </div>
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

export default EnhancedFinancialModels;
