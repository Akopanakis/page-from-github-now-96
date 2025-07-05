import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { safeGetJSON, safeSetJSON } from "@/utils/safeStorage";
import {
  Plus,
  Save,
  Trash2,
  Copy,
  Play,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Settings,
  Eye,
  EyeOff,
  Download,
  Share2,
  RefreshCw,
  AlertTriangle,
  Target,
  DollarSign,
  Percent,
  Calendar,
  Calculator,
  Brain,
  Zap,
  Activity,
  Layers,
  Database,
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle,
  Clock,
  Star,
  Award,
  Filter,
  Globe,
  Users,
  Building,
  MapPin,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
} from "lucide-react";

interface ScenarioAnalysisEnhancedProps {
  className?: string;
}

// Enhanced Scenario Data Structures
interface Scenario {
  id: string;
  name: string;
  description: string;
  category: "optimistic" | "realistic" | "pessimistic" | "custom";
  parameters: ScenarioParameters;
  results?: ScenarioResults;
  sensitivity?: SensitivityResults;
  monteCarlo?: MonteCarloResults;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
  tags: string[];
}

interface ScenarioParameters {
  // Cost Parameters
  rawMaterialCost: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
  laborCost: { value: number; min: number; max: number; distribution: string };
  energyCost: { value: number; min: number; max: number; distribution: string };
  transportCost: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
  overhead: { value: number; min: number; max: number; distribution: string };

  // Production Parameters
  productionVolume: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
  efficiency: { value: number; min: number; max: number; distribution: string };
  wastageRate: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
  qualityIndex: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };

  // Market Parameters
  sellingPrice: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
  marketDemand: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
  competitionIndex: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
  seasonalityFactor: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };

  // Risk Parameters
  supplierReliability: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
  regulatoryRisk: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
  weatherRisk: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
  currencyRisk: {
    value: number;
    min: number;
    max: number;
    distribution: string;
  };
}

interface ScenarioResults {
  totalCost: number;
  totalRevenue: number;
  profit: number;
  profitMargin: number;
  roi: number;
  breakEvenPoint: number;
  riskScore: number;
  sustainabilityScore: number;
  qualityScore: number;
  efficiency: number;
  projectedGrowth: number;
  timeToMarket: number;
}

interface SensitivityResults {
  parameter: string;
  impact: number;
  correlation: number;
  ranking: number;
}

interface MonteCarloResults {
  iterations: number;
  confidence: number;
  mean: number;
  standardDeviation: number;
  percentiles: {
    p5: number;
    p25: number;
    p50: number;
    p75: number;
    p95: number;
  };
  probabilityOfSuccess: number;
  riskMetrics: {
    valueAtRisk: number;
    conditionalValueAtRisk: number;
    maxDrawdown: number;
  };
}

interface RiskFactor {
  name: string;
  probability: number;
  impact: number;
  severity: "low" | "medium" | "high" | "critical";
  mitigation: string;
}

const ScenarioAnalysisEnhanced: React.FC<ScenarioAnalysisEnhancedProps> = ({
  className = "",
}) => {
  const { language, currency } = useLanguage();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [activeScenario, setActiveScenario] = useState<string>("");
  const [activeTab, setActiveTab] = useState("scenarios");
  const [isRunning, setIsRunning] = useState(false);
  const [monteCarloIterations, setMonteCarloIterations] = useState(10000);
  const [confidenceLevel, setConfidenceLevel] = useState(95);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Load scenarios from storage
  useEffect(() => {
    const savedScenarios = safeGetJSON("scenarios", []);
    if (savedScenarios.length === 0) {
      setScenarios(getDefaultScenarios());
    } else {
      setScenarios(savedScenarios);
    }
  }, []);

  // Save scenarios to storage
  useEffect(() => {
    if (scenarios.length > 0) {
      safeSetJSON("scenarios", scenarios);
    }
  }, [scenarios]);

  // 1. Default Predefined Scenarios
  const getDefaultScenarios = (): Scenario[] => [
    {
      id: "optimistic",
      name: language === "el" ? "Αισιόδοξο Σενάριο" : "Optimistic Scenario",
      description:
        language === "el"
          ? "Βέλτιστες συνθήκες αγοράς"
          : "Best market conditions",
      category: "optimistic",
      parameters: getDefaultParameters("optimistic"),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
      tags: ["market-growth", "low-costs", "high-demand"],
    },
    {
      id: "realistic",
      name: language === "el" ? "Ρεαλιστικό Σενάριο" : "Realistic Scenario",
      description:
        language === "el"
          ? "Αναμενόμενες συνθήκες αγοράς"
          : "Expected market conditions",
      category: "realistic",
      parameters: getDefaultParameters("realistic"),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
      tags: ["baseline", "normal-conditions", "stable-market"],
    },
    {
      id: "pessimistic",
      name: language === "el" ? "Απαισιόδοξο Σενάριο" : "Pessimistic Scenario",
      description:
        language === "el"
          ? "Δύσκολες συνθήκες αγοράς"
          : "Challenging market conditions",
      category: "pessimistic",
      parameters: getDefaultParameters("pessimistic"),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
      tags: ["market-decline", "high-costs", "low-demand"],
    },
  ];

  const getDefaultParameters = (type: string): ScenarioParameters => {
    const baseValues = {
      optimistic: { multiplier: 0.85, variance: 0.1 },
      realistic: { multiplier: 1.0, variance: 0.15 },
      pessimistic: { multiplier: 1.25, variance: 0.2 },
    };

    const { multiplier, variance } =
      baseValues[type as keyof typeof baseValues];

    return {
      rawMaterialCost: {
        value: 12.5 * multiplier,
        min: 10,
        max: 18,
        distribution: "normal",
      },
      laborCost: {
        value: 8.3 * multiplier,
        min: 6,
        max: 12,
        distribution: "normal",
      },
      energyCost: {
        value: 2.1 * multiplier,
        min: 1.5,
        max: 3.5,
        distribution: "normal",
      },
      transportCost: {
        value: 1.8 * multiplier,
        min: 1.2,
        max: 2.8,
        distribution: "normal",
      },
      overhead: {
        value: 4.2 * multiplier,
        min: 3,
        max: 6,
        distribution: "normal",
      },
      productionVolume: {
        value: 1000 / multiplier,
        min: 500,
        max: 1500,
        distribution: "normal",
      },
      efficiency: {
        value: 0.85 / multiplier,
        min: 0.7,
        max: 0.95,
        distribution: "beta",
      },
      wastageRate: {
        value: 0.05 * multiplier,
        min: 0.02,
        max: 0.12,
        distribution: "beta",
      },
      qualityIndex: {
        value: 8.5 / multiplier,
        min: 6,
        max: 10,
        distribution: "beta",
      },
      sellingPrice: {
        value: 18.5 / multiplier,
        min: 14,
        max: 25,
        distribution: "normal",
      },
      marketDemand: {
        value: 1200 / multiplier,
        min: 800,
        max: 1800,
        distribution: "normal",
      },
      competitionIndex: {
        value: 0.6 * multiplier,
        min: 0.3,
        max: 0.9,
        distribution: "uniform",
      },
      seasonalityFactor: {
        value: 1.0,
        min: 0.7,
        max: 1.4,
        distribution: "uniform",
      },
      supplierReliability: {
        value: 0.9 / multiplier,
        min: 0.7,
        max: 0.98,
        distribution: "beta",
      },
      regulatoryRisk: {
        value: 0.1 * multiplier,
        min: 0.05,
        max: 0.3,
        distribution: "exponential",
      },
      weatherRisk: {
        value: 0.15 * multiplier,
        min: 0.05,
        max: 0.4,
        distribution: "exponential",
      },
      currencyRisk: {
        value: 0.08 * multiplier,
        min: 0.02,
        max: 0.2,
        distribution: "normal",
      },
    };
  };

  // 2. Monte Carlo Simulation Engine
  const runMonteCarloSimulation = useCallback(
    async (scenario: Scenario): Promise<MonteCarloResults> => {
      setIsRunning(true);

      const results: number[] = [];
      const iterations = monteCarloIterations;

      // Simulate iterations
      for (let i = 0; i < iterations; i++) {
        const simulatedParams = simulateParameters(scenario.parameters);
        const result = calculateScenarioResults(simulatedParams);
        results.push(result.profit);

        // Update progress periodically
        if (i % 1000 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
      }

      setIsRunning(false);

      // Calculate statistics
      results.sort((a, b) => a - b);
      const mean = results.reduce((sum, val) => sum + val, 0) / results.length;
      const variance =
        results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
        results.length;
      const standardDeviation = Math.sqrt(variance);

      const percentiles = {
        p5: results[Math.floor(0.05 * results.length)],
        p25: results[Math.floor(0.25 * results.length)],
        p50: results[Math.floor(0.5 * results.length)],
        p75: results[Math.floor(0.75 * results.length)],
        p95: results[Math.floor(0.95 * results.length)],
      };

      const probabilityOfSuccess =
        results.filter((r) => r > 0).length / results.length;
      const valueAtRisk = percentiles.p5;
      const conditionalValueAtRisk =
        results
          .slice(0, Math.floor(0.05 * results.length))
          .reduce((sum, val) => sum + val, 0) /
        Math.floor(0.05 * results.length);

      return {
        iterations,
        confidence: confidenceLevel,
        mean,
        standardDeviation,
        percentiles,
        probabilityOfSuccess,
        riskMetrics: {
          valueAtRisk,
          conditionalValueAtRisk,
          maxDrawdown: Math.min(...results),
        },
      };
    },
    [monteCarloIterations, confidenceLevel],
  );

  // 3. Parameter Simulation
  const simulateParameters = (params: ScenarioParameters) => {
    const simulated: any = {};

    Object.entries(params).forEach(([key, param]) => {
      const { value, min, max, distribution } = param;

      switch (distribution) {
        case "normal":
          simulated[key] = normalRandom(value, (max - min) / 6);
          break;
        case "uniform":
          simulated[key] = uniformRandom(min, max);
          break;
        case "beta":
          simulated[key] = betaRandom(2, 5, min, max);
          break;
        case "exponential":
          simulated[key] = exponentialRandom(value);
          break;
        default:
          simulated[key] = value;
      }

      // Ensure bounds
      simulated[key] = Math.max(min, Math.min(max, simulated[key]));
    });

    return simulated;
  };

  // 4. Random Distribution Functions
  const normalRandom = (mean: number, stdDev: number): number => {
    const u = Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return mean + z * stdDev;
  };

  const uniformRandom = (min: number, max: number): number => {
    return min + Math.random() * (max - min);
  };

  const betaRandom = (
    alpha: number,
    beta: number,
    min: number,
    max: number,
  ): number => {
    // Simplified beta distribution using rejection sampling
    let x, y;
    do {
      x = Math.random();
      y = Math.random();
    } while (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) < y);
    return min + x * (max - min);
  };

  const exponentialRandom = (lambda: number): number => {
    return -Math.log(Math.random()) / lambda;
  };

  // 5. Scenario Results Calculation
  const calculateScenarioResults = (params: any): ScenarioResults => {
    const totalCost =
      ((params.rawMaterialCost * params.productionVolume +
        params.laborCost * params.productionVolume +
        params.energyCost * params.productionVolume +
        params.transportCost +
        params.overhead) *
        (1 + params.wastageRate)) /
      params.efficiency;

    const effectiveVolume =
      params.productionVolume * (1 - params.wastageRate) * params.efficiency;
    const totalRevenue =
      params.sellingPrice * effectiveVolume * params.seasonalityFactor;
    const profit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
    const breakEvenPoint =
      params.sellingPrice > 0 ? totalCost / params.sellingPrice : 0;

    const riskScore =
      (params.regulatoryRisk * 0.3 +
        params.weatherRisk * 0.25 +
        params.currencyRisk * 0.2 +
        (1 - params.supplierReliability) * 0.25) *
      100;

    return {
      totalCost,
      totalRevenue,
      profit,
      profitMargin,
      roi,
      breakEvenPoint,
      riskScore,
      sustainabilityScore: params.qualityIndex * 10,
      qualityScore: params.qualityIndex * 10,
      efficiency: params.efficiency * 100,
      projectedGrowth: 5.2,
      timeToMarket: 12,
    };
  };

  // 6. Sensitivity Analysis
  const performSensitivityAnalysis = (
    scenario: Scenario,
  ): SensitivityResults[] => {
    const baseResults = calculateScenarioResults(
      getParameterValues(scenario.parameters),
    );
    const sensitivity: SensitivityResults[] = [];

    Object.entries(scenario.parameters).forEach(([paramName, param]) => {
      const testValue = param.value * 1.1; // 10% increase
      const testParams = {
        ...getParameterValues(scenario.parameters),
        [paramName]: testValue,
      };
      const testResults = calculateScenarioResults(testParams);

      const impact =
        ((testResults.profit - baseResults.profit) / baseResults.profit) * 100;

      sensitivity.push({
        parameter: paramName,
        impact: Math.abs(impact),
        correlation: impact / 10, // Normalized correlation
        ranking: 0, // Will be set after sorting
      });
    });

    // Sort by impact and assign rankings
    sensitivity.sort((a, b) => b.impact - a.impact);
    sensitivity.forEach((item, index) => {
      item.ranking = index + 1;
    });

    return sensitivity;
  };

  const getParameterValues = (params: ScenarioParameters) => {
    const values: any = {};
    Object.entries(params).forEach(([key, param]) => {
      values[key] = param.value;
    });
    return values;
  };

  // 7. Risk Assessment
  const riskFactors: RiskFactor[] = useMemo(
    () => [
      {
        name:
          language === "el"
            ? "Διακυμάνσεις Τιμών Πρώτων Υλών"
            : "Raw Material Price Volatility",
        probability: 0.7,
        impact: 0.8,
        severity: "high",
        mitigation:
          language === "el" ? "Μακροπρόθεσμα συμβόλαια" : "Long-term contracts",
      },
      {
        name: language === "el" ? "Κανονιστικές Αλλαγές" : "Regulatory Changes",
        probability: 0.4,
        impact: 0.9,
        severity: "critical",
        mitigation:
          language === "el" ? "Προληπτική συμμόρφωση" : "Proactive compliance",
      },
      {
        name: language === "el" ? "Καιρικές Συνθήκες" : "Weather Conditions",
        probability: 0.6,
        impact: 0.6,
        severity: "medium",
        mitigation:
          language === "el" ? "Ασφάλιση καλλιεργειών" : "Crop insurance",
      },
      {
        name: language === "el" ? "Ανταγωνισμός" : "Competition",
        probability: 0.8,
        impact: 0.5,
        severity: "medium",
        mitigation:
          language === "el"
            ? "Διαφοροποίηση προϊόντων"
            : "Product differentiation",
      },
      {
        name:
          language === "el" ? "Προβλήματα Εφοδιαστικής" : "Supply Chain Issues",
        probability: 0.5,
        impact: 0.7,
        severity: "high",
        mitigation:
          language === "el" ? "Πολλαπλοί προμηθευτές" : "Multiple suppliers",
      },
    ],
    [language],
  );

  // 8. Scenario Management Functions
  const createNewScenario = () => {
    const newScenario: Scenario = {
      id: `scenario_${Date.now()}`,
      name: `${language === "el" ? "Νέο Σενάριο" : "New Scenario"} ${scenarios.length + 1}`,
      description: "",
      category: "custom",
      parameters: getDefaultParameters("realistic"),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
      tags: ["custom"],
    };

    setScenarios([...scenarios, newScenario]);
    setActiveScenario(newScenario.id);
  };

  const duplicateScenario = (scenarioId: string) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      const duplicated: Scenario = {
        ...scenario,
        id: `scenario_${Date.now()}`,
        name: `${scenario.name} (Copy)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setScenarios([...scenarios, duplicated]);
    }
  };

  const deleteScenario = (scenarioId: string) => {
    setScenarios(scenarios.filter((s) => s.id !== scenarioId));
    if (activeScenario === scenarioId) {
      setActiveScenario(scenarios[0]?.id || "");
    }
  };

  const runScenario = async (scenarioId: string) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) return;

    setIsRunning(true);

    // Calculate basic results
    const results = calculateScenarioResults(
      getParameterValues(scenario.parameters),
    );

    // Perform sensitivity analysis
    const sensitivity = performSensitivityAnalysis(scenario);

    // Run Monte Carlo simulation
    const monteCarlo = await runMonteCarloSimulation(scenario);

    // Update scenario with results
    const updatedScenario = {
      ...scenario,
      results,
      sensitivity,
      monteCarlo,
      updatedAt: Date.now(),
    };

    setScenarios(
      scenarios.map((s) => (s.id === scenarioId ? updatedScenario : s)),
    );
    setIsRunning(false);
  };

  const formatCurrency = (value: number) => `${currency}${value.toFixed(2)}`;
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const currentScenario =
    scenarios.find((s) => s.id === activeScenario) || scenarios[0];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-blue-600" />
            {language === "el" ? "Ανάλυση Σεναρίων" : "Scenario Analysis"}
          </h2>
          <p className="text-gray-600 mt-1">
            {language === "el"
              ? "Προσομοίωση Monte Carlo και ανάλυση ευαισθησίας"
              : "Monte Carlo simulation and sensitivity analysis"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={createNewScenario} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέο Σενάριο" : "New Scenario"}
          </Button>

          <Button
            onClick={() => currentScenario && runScenario(currentScenario.id)}
            disabled={isRunning || !currentScenario}
            className="bg-blue-600 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning
              ? language === "el"
                ? "Εκτέλεση..."
                : "Running..."
              : language === "el"
                ? "Εκτέλεση"
                : "Run"}
          </Button>
        </div>
      </div>

      {/* Scenario Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Layers className="w-5 h-5 mr-2" />
            {language === "el" ? "Διαχείριση Σεναρίων" : "Scenario Management"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  activeScenario === scenario.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setActiveScenario(scenario.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{scenario.name}</h4>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateScenario(scenario.id);
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteScenario(scenario.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {scenario.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-2">
                  {scenario.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {scenario.results && (
                  <div className="text-sm">
                    <p
                      className={`font-medium ${scenario.results.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {language === "el" ? "Κέρδος" : "Profit"}:{" "}
                      {formatCurrency(scenario.results.profit)}
                    </p>
                    <p className="text-gray-600">
                      ROI: {formatPercent(scenario.results.roi)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {currentScenario && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="parameters">
              {language === "el" ? "Παράμετροι" : "Parameters"}
            </TabsTrigger>
            <TabsTrigger value="results">
              {language === "el" ? "Αποτελέσματα" : "Results"}
            </TabsTrigger>
            <TabsTrigger value="montecarlo">
              {language === "el" ? "Monte Carlo" : "Monte Carlo"}
            </TabsTrigger>
            <TabsTrigger value="sensitivity">
              {language === "el" ? "Ευαισθησία" : "Sensitivity"}
            </TabsTrigger>
            <TabsTrigger value="risks">
              {language === "el" ? "Κίνδυνοι" : "Risks"}
            </TabsTrigger>
          </TabsList>

          {/* 9. Parameters Tab */}
          <TabsContent value="parameters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el"
                    ? "Παράμετροι Σεναρίου"
                    : "Scenario Parameters"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cost Parameters */}
                <div>
                  <h4 className="font-semibold mb-4">
                    {language === "el"
                      ? "Παράμετροι Κόστους"
                      : "Cost Parameters"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries({
                      rawMaterialCost:
                        language === "el"
                          ? "Κόστος Πρώτων Υλών"
                          : "Raw Material Cost",
                      laborCost:
                        language === "el" ? "Εργατικό Κόστος" : "Labor Cost",
                      energyCost:
                        language === "el" ? "Κόστος Ενέργειας" : "Energy Cost",
                      transportCost:
                        language === "el"
                          ? "Κόστος Μεταφοράς"
                          : "Transport Cost",
                      overhead: language === "el" ? "Γενικά Έξοδα" : "Overhead",
                    }).map(([key, label]) => {
                      const param =
                        currentScenario.parameters[
                          key as keyof ScenarioParameters
                        ];
                      return (
                        <div key={key} className="space-y-2">
                          <Label>{label}</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              value={param.value}
                              onChange={(e) => {
                                const updated = { ...currentScenario };
                                updated.parameters[
                                  key as keyof ScenarioParameters
                                ].value = parseFloat(e.target.value) || 0;
                                setScenarios(
                                  scenarios.map((s) =>
                                    s.id === currentScenario.id ? updated : s,
                                  ),
                                );
                              }}
                              className="flex-1"
                            />
                            <span className="text-sm text-gray-500">
                              ±
                              {formatPercent(
                                ((param.max - param.min) / param.value) * 50,
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Min: {param.min}</span>
                            <span>Max: {param.max}</span>
                            <Select value={param.distribution}>
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="uniform">Uniform</SelectItem>
                                <SelectItem value="beta">Beta</SelectItem>
                                <SelectItem value="exponential">
                                  Exponential
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Production Parameters */}
                <div>
                  <h4 className="font-semibold mb-4">
                    {language === "el"
                      ? "Π��ράμετροι Παραγωγής"
                      : "Production Parameters"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries({
                      productionVolume:
                        language === "el"
                          ? "Όγκος Παραγωγής"
                          : "Production Volume",
                      efficiency:
                        language === "el" ? "Αποδοτικότητα" : "Efficiency",
                      wastageRate:
                        language === "el" ? "Ποσοστό Απωλειών" : "Wastage Rate",
                      qualityIndex:
                        language === "el"
                          ? "Δείκτης Ποιότητας"
                          : "Quality Index",
                    }).map(([key, label]) => {
                      const param =
                        currentScenario.parameters[
                          key as keyof ScenarioParameters
                        ];
                      return (
                        <div key={key} className="space-y-2">
                          <Label>{label}</Label>
                          <Input
                            type="number"
                            value={param.value}
                            onChange={(e) => {
                              const updated = { ...currentScenario };
                              updated.parameters[
                                key as keyof ScenarioParameters
                              ].value = parseFloat(e.target.value) || 0;
                              setScenarios(
                                scenarios.map((s) =>
                                  s.id === currentScenario.id ? updated : s,
                                ),
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Market Parameters */}
                <div>
                  <h4 className="font-semibold mb-4">
                    {language === "el"
                      ? "Παράμετροι Αγοράς"
                      : "Market Parameters"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries({
                      sellingPrice:
                        language === "el" ? "Τιμή Πώλησης" : "Selling Price",
                      marketDemand:
                        language === "el" ? "Ζήτηση Αγοράς" : "Market Demand",
                      competitionIndex:
                        language === "el"
                          ? "Δείκτης Ανταγωνισμού"
                          : "Competition Index",
                      seasonalityFactor:
                        language === "el"
                          ? "Συντελεστής Εποχικότητας"
                          : "Seasonality Factor",
                    }).map(([key, label]) => {
                      const param =
                        currentScenario.parameters[
                          key as keyof ScenarioParameters
                        ];
                      return (
                        <div key={key} className="space-y-2">
                          <Label>{label}</Label>
                          <Input
                            type="number"
                            value={param.value}
                            onChange={(e) => {
                              const updated = { ...currentScenario };
                              updated.parameters[
                                key as keyof ScenarioParameters
                              ].value = parseFloat(e.target.value) || 0;
                              setScenarios(
                                scenarios.map((s) =>
                                  s.id === currentScenario.id ? updated : s,
                                ),
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 10. Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {currentScenario.results ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">
                            {language === "el"
                              ? "Συνολικό Κόστος"
                              : "Total Cost"}
                          </p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(currentScenario.results.totalCost)}
                          </p>
                        </div>
                        <DollarSign className="w-8 h-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">
                            {language === "el"
                              ? "Συνολικά Έσοδα"
                              : "Total Revenue"}
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(
                              currentScenario.results.totalRevenue,
                            )}
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">
                            {language === "el" ? "Κέρδος" : "Profit"}
                          </p>
                          <p
                            className={`text-2xl font-bold ${currentScenario.results.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {formatCurrency(currentScenario.results.profit)}
                          </p>
                        </div>
                        <Target className="w-8 h-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">ROI</p>
                          <p
                            className={`text-2xl font-bold ${currentScenario.results.roi >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {formatPercent(currentScenario.results.roi)}
                          </p>
                        </div>
                        <Percent className="w-8 h-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === "el"
                          ? "Κλειδικές Μετρήσεις"
                          : "Key Metrics"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          label:
                            language === "el"
                              ? "Περιθώριο Κέρδους"
                              : "Profit Margin",
                          value: currentScenario.results.profitMargin,
                          unit: "%",
                        },
                        {
                          label:
                            language === "el"
                              ? "Σημείο Νεκρού"
                              : "Break-even Point",
                          value: currentScenario.results.breakEvenPoint,
                          unit: "units",
                        },
                        {
                          label:
                            language === "el"
                              ? "Βαθμολογία Κινδύνου"
                              : "Risk Score",
                          value: currentScenario.results.riskScore,
                          unit: "/100",
                        },
                        {
                          label:
                            language === "el"
                              ? "Δείκτης Βιωσιμότητας"
                              : "Sustainability Score",
                          value: currentScenario.results.sustainabilityScore,
                          unit: "/100",
                        },
                        {
                          label:
                            language === "el"
                              ? "Δείκτης Ποιότητας"
                              : "Quality Score",
                          value: currentScenario.results.qualityScore,
                          unit: "/100",
                        },
                        {
                          label:
                            language === "el" ? "Αποδοτικότητα" : "Efficiency",
                          value: currentScenario.results.efficiency,
                          unit: "%",
                        },
                      ].map((metric, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-700">{metric.label}</span>
                          <div className="flex items-center">
                            <span className="font-semibold mr-2">
                              {metric.value.toFixed(1)}
                              {metric.unit}
                            </span>
                            <Progress
                              value={Math.min(100, Math.max(0, metric.value))}
                              className="w-20"
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === "el"
                          ? "Ανάλυση Κόστους-Εσόδων"
                          : "Cost-Revenue Analysis"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              {
                                name: language === "el" ? "Κόστος" : "Cost",
                                value: currentScenario.results.totalCost,
                                fill: "#ef4444",
                              },
                              {
                                name: language === "el" ? "Κέρδος" : "Profit",
                                value: Math.max(
                                  0,
                                  currentScenario.results.profit,
                                ),
                                fill: "#10b981",
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, value }) =>
                              `${name}: ${formatCurrency(value)}`
                            }
                          ></Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {language === "el"
                    ? "Εκτελέστε το σενάριο για να δείτε τα αποτελέσματα"
                    : "Run the scenario to see results"}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* 11. Monte Carlo Tab */}
          <TabsContent value="montecarlo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  {language === "el"
                    ? "Προσομοίωση Monte Carlo"
                    : "Monte Carlo Simulation"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label>
                      {language === "el" ? "Επαναλήψεις" : "Iterations"}
                    </Label>
                    <Select
                      value={monteCarloIterations.toString()}
                      onValueChange={(value) =>
                        setMonteCarloIterations(parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">1,000</SelectItem>
                        <SelectItem value="5000">5,000</SelectItem>
                        <SelectItem value="10000">10,000</SelectItem>
                        <SelectItem value="50000">50,000</SelectItem>
                        <SelectItem value="100000">100,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>
                      {language === "el"
                        ? "Επίπεδο Εμπιστοσύνης"
                        : "Confidence Level"}
                    </Label>
                    <Select
                      value={confidenceLevel.toString()}
                      onValueChange={(value) =>
                        setConfidenceLevel(parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="95">95%</SelectItem>
                        <SelectItem value="99">99%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      onClick={() =>
                        currentScenario && runScenario(currentScenario.id)
                      }
                      disabled={isRunning}
                      className="w-full"
                    >
                      {isRunning ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {isRunning
                        ? language === "el"
                          ? "Εκτέλεση..."
                          : "Running..."
                        : language === "el"
                          ? "Εκτέλεση"
                          : "Run"}
                    </Button>
                  </div>
                </div>

                {currentScenario.monteCarlo ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">
                              {language === "el" ? "Μέσος Όρος" : "Mean"}
                            </p>
                            <p className="text-2xl font-bold">
                              {formatCurrency(currentScenario.monteCarlo.mean)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">
                              {language === "el"
                                ? "Τυπική Απόκλιση"
                                : "Std Deviation"}
                            </p>
                            <p className="text-2xl font-bold">
                              {formatCurrency(
                                currentScenario.monteCarlo.standardDeviation,
                              )}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">
                              {language === "el"
                                ? "Πιθανότητα Επιτυχίας"
                                : "Success Probability"}
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                              {formatPercent(
                                currentScenario.monteCarlo
                                  .probabilityOfSuccess * 100,
                              )}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {language === "el" ? "Εκατοστημόρια" : "Percentiles"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-5 gap-4">
                          {Object.entries(
                            currentScenario.monteCarlo.percentiles,
                          ).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <p className="text-sm text-gray-600">{key}</p>
                              <p className="font-semibold">
                                {formatCurrency(value)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {language === "el"
                            ? "Μετρικές Κινδύνου"
                            : "Risk Metrics"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              {language === "el"
                                ? "Value at Risk (5%)"
                                : "Value at Risk (5%)"}
                            </p>
                            <p className="text-lg font-semibold text-red-600">
                              {formatCurrency(
                                currentScenario.monteCarlo.riskMetrics
                                  .valueAtRisk,
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              {language === "el"
                                ? "Conditional VaR"
                                : "Conditional VaR"}
                            </p>
                            <p className="text-lg font-semibold text-red-600">
                              {formatCurrency(
                                currentScenario.monteCarlo.riskMetrics
                                  .conditionalValueAtRisk,
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              {language === "el"
                                ? "Μέγιστη Απώλεια"
                                : "Max Drawdown"}
                            </p>
                            <p className="text-lg font-semibold text-red-600">
                              {formatCurrency(
                                currentScenario.monteCarlo.riskMetrics
                                  .maxDrawdown,
                              )}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {language === "el"
                        ? "Εκτελέστε την προσομοίωση Monte Carlo για να δείτε τα αποτελέσματα"
                        : "Run the Monte Carlo simulation to see results"}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 12. Sensitivity Analysis Tab */}
          <TabsContent value="sensitivity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  {language === "el"
                    ? "Ανάλυση Ευαισθησίας"
                    : "Sensitivity Analysis"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentScenario.sensitivity ? (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            {language === "el" ? "Κατάταξη" : "Rank"}
                          </TableHead>
                          <TableHead>
                            {language === "el" ? "Παράμετρος" : "Parameter"}
                          </TableHead>
                          <TableHead>
                            {language === "el" ? "Επίδραση (%)" : "Impact (%)"}
                          </TableHead>
                          <TableHead>
                            {language === "el" ? "Συσχέτιση" : "Correlation"}
                          </TableHead>
                          <TableHead>
                            {language === "el"
                              ? "Οπτικοποίηση"
                              : "Visualization"}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentScenario.sensitivity.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Badge variant="outline">#{item.ranking}</Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.parameter
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </TableCell>
                            <TableCell>
                              <span
                                className={
                                  item.impact > 5
                                    ? "text-red-600 font-semibold"
                                    : item.impact > 2
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                }
                              >
                                {item.impact.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell>
                              <span
                                className={
                                  item.correlation > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {item.correlation.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Progress
                                value={Math.min(100, item.impact * 10)}
                                className="w-20"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>
                          {language === "el"
                            ? "Tornado Chart - Ανάλυση Επίδρασης"
                            : "Tornado Chart - Impact Analysis"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                          <BarChart
                            data={currentScenario.sensitivity}
                            layout="horizontal"
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis
                              type="category"
                              dataKey="parameter"
                              width={120}
                            />
                            <Tooltip />
                            <Bar dataKey="impact" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {language === "el"
                        ? "Εκτελέστε το σενάριο για να δείτε την ανάλυση ευαισθησίας"
                        : "Run the scenario to see sensitivity analysis"}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 13. Risk Assessment Tab */}
          <TabsContent value="risks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  {language === "el"
                    ? "Αξιολόγηση Κινδύνων"
                    : "Risk Assessment"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {riskFactors.map((risk, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{risk.name}</h4>
                          <Badge className={getSeverityColor(risk.severity)}>
                            {risk.severity}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>
                                {language === "el"
                                  ? "Πιθανότητα"
                                  : "Probability"}
                              </span>
                              <span>
                                {formatPercent(risk.probability * 100)}
                              </span>
                            </div>
                            <Progress
                              value={risk.probability * 100}
                              className="h-2"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>
                                {language === "el" ? "Επίδραση" : "Impact"}
                              </span>
                              <span>{formatPercent(risk.impact * 100)}</span>
                            </div>
                            <Progress
                              value={risk.impact * 100}
                              className="h-2"
                            />
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            <strong>
                              {language === "el"
                                ? "Μετριασμός:"
                                : "Mitigation:"}
                            </strong>{" "}
                            {risk.mitigation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === "el"
                          ? "Χάρτης Κινδύνων"
                          : "Risk Heat Map"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            type="number"
                            dataKey="probability"
                            domain={[0, 1]}
                            name="Probability"
                          />
                          <YAxis
                            type="number"
                            dataKey="impact"
                            domain={[0, 1]}
                            name="Impact"
                          />
                          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                          <Scatter
                            name="Risks"
                            data={riskFactors}
                            fill="#ef4444"
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ScenarioAnalysisEnhanced;
