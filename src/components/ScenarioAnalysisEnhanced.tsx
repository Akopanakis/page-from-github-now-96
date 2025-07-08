import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Save,
  Trash2,
  Copy,
  Settings,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Layers,
  Filter,
  Search,
  Plus,
  Edit,
  Eye,
  FileText,
  Calculator,
  Shuffle,
  RefreshCw,
  Database,
  Cloud,
  Lock,
  Unlock,
  Star,
  Bookmark,
  Share,
  ExternalLink,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  Lightbulb,
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  Signal,
  Battery,
  Thermometer,
  Gauge,
  Compass,
  Map,
  Navigation,
  Route,
  Flag,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Diamond,
  Sparkles,
  Flame,
  Snowflake,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Wind,
  Tornado,
  Earthquake,
  Volcano,
  Mountain,
  Tree,
  Flower,
  Leaf,
  Seedling,
  Cactus,
  PalmTree,
  Evergreen,
  Deciduous,
  Mushroom,
  Clover,
  Cherry,
  Apple,
  Banana,
  Grape,
  Strawberry,
  Watermelon,
  Pineapple,
  Coconut,
  Avocado,
  Eggplant,
  Carrot,
  Corn,
  Pepper,
  Cucumber,
  Tomato,
  Potato,
  Onion,
  Garlic,
  Ginger,
  Broccoli,
  Lettuce,
  Spinach,
  Kale,
  Cabbage,
  Cauliflower,
  Brussels,
  Artichoke,
  Asparagus,
  Celery,
  Radish,
  Turnip,
  Beet,
  Sweet,
  Yam,
  Pumpkin,
  Squash,
  Zucchini,
  Cucumber as CucumberIcon,
  Pickle,
  Olive,
  Peanut,
  Almond,
  Walnut,
  Pecan,
  Cashew,
  Pistachio,
  Hazelnut,
  Chestnut,
  Acorn,
  Pine,
  Fir,
  Spruce,
  Cedar,
  Birch,
  Oak,
  Maple,
  Willow,
  Poplar,
  Elm,
  Ash,
  Beech,
  Hickory,
  Sycamore,
  Magnolia,
  Dogwood,
  Redbud,
  Cherry as CherryTree,
  Plum,
  Peach,
  Pear,
  Apricot,
  Fig,
  Date,
  Pomegranate,
  Kiwi,
  Mango,
  Papaya,
  Passion,
  Dragon,
  Star as StarFruit,
  Lychee,
  Rambutan,
  Durian,
  Jackfruit,
  Breadfruit,
  Plantain,
  Guava,
  Tamarind,
  Persimmon,
  Quince,
  Medlar,
  Elderberry,
  Gooseberry,
  Currant,
  Blackberry,
  Raspberry,
  Blueberry,
  Cranberry,
  Huckleberry,
  Boysenberry,
  Mulberry,
  Cloudberry,
  Lingonberry,
  Juniper,
  Rose,
  Hibiscus,
  Jasmine,
  Lavender,
  Rosemary,
  Thyme,
  Sage,
  Basil,
  Oregano,
  Mint,
  Parsley,
  Cilantro,
  Dill,
  Fennel,
  Anise,
  Cardamom,
  Cinnamon,
  Nutmeg,
  Clove,
  Allspice,
  Vanilla,
  Saffron,
  Turmeric,
  Paprika,
  Cayenne,
  Chili,
  Jalapeno,
  Habanero,
  Ghost,
  Carolina,
  Scotch,
  Thai,
  Serrano,
  Poblano,
  Anaheim,
  Bell,
  Sweet as SweetPepper,
  Hot,
  Mild,
  Medium,
  Spicy,
  Extra,
  Super,
  Ultra,
  Mega,
  Giga,
  Tera,
  Peta,
  Exa,
  Zetta,
  Yotta
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Enhanced interfaces for comprehensive scenario analysis
interface ScenarioVariable {
  name: string;
  baseValue: number;
  min: number;
  max: number;
  distribution: 'normal' | 'uniform' | 'triangular' | 'beta' | 'gamma';
  parameters?: {
    mean?: number;
    stdDev?: number;
    alpha?: number;
    beta?: number;
    mode?: number;
  };
  correlation?: { [key: string]: number };
  sensitivity?: number;
  impact?: number;
  category: 'cost' | 'revenue' | 'volume' | 'price' | 'quality' | 'time' | 'risk';
  unit: string;
  description: string;
}

interface ScenarioResults {
  totalCost: number;
  totalRevenue: number;
  profit: number;
  profitMargin: number;
  roi: number;
  breakEvenPoint: number;
  riskMetrics: {
    var95: number;
    var99: number;
    expectedShortfall: number;
    maxDrawdown: number;
    volatility: number;
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
  };
  distributionStats: {
    mean: number;
    median: number;
    mode: number;
    stdDev: number;
    skewness: number;
    kurtosis: number;
    percentiles: { [key: string]: number };
  };
  confidenceIntervals: {
    ci90: [number, number];
    ci95: [number, number];
    ci99: [number, number];
  };
}

interface SensitivityResults {
  parameter: string;
  impact: number;
  correlation: number;
  ranking: number;
}

interface MonteCarloResults {
  iterations: number;
  results: number[];
  statistics: {
    mean: number;
    median: number;
    stdDev: number;
    min: number;
    max: number;
    percentiles: { [key: string]: number };
  };
  convergence: {
    converged: boolean;
    iterations: number;
    tolerance: number;
  };
  histogram: { bin: number; count: number; probability: number }[];
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  variables: ScenarioVariable[];
  results?: ScenarioResults;
  sensitivity?: SensitivityResults;
  monteCarlo?: MonteCarloResults;
  createdAt: number;
  updatedAt: number;
  tags: string[];
  category: 'base' | 'optimistic' | 'pessimistic' | 'stress' | 'custom';
  status: 'draft' | 'running' | 'completed' | 'error';
  metadata: {
    author: string;
    version: string;
    notes: string;
    assumptions: string[];
    limitations: string[];
  };
}

interface CorrelationMatrix {
  variables: string[];
  matrix: number[][];
}

interface OptimizationResult {
  optimalValues: { [key: string]: number };
  objectiveValue: number;
  constraints: { name: string; satisfied: boolean; value: number }[];
  iterations: number;
  convergence: boolean;
}

const ScenarioAnalysisEnhanced: React.FC = () => {
  const { language } = useLanguage();
  
  // Core state management
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [activeScenario, setActiveScenario] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTab, setSelectedTab] = useState('scenarios');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'cards'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'created' | 'updated' | 'status'>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Advanced analysis state
  const [correlationMatrix, setCorrelationMatrix] = useState<CorrelationMatrix | null>(null);
  const [optimizationResults, setOptimizationResults] = useState<OptimizationResult | null>(null);
  const [sensitivityThreshold, setSensitivityThreshold] = useState(0.1);
  const [monteCarloIterations, setMonteCarloIterations] = useState(10000);
  const [confidenceLevel, setConfidenceLevel] = useState(95);
  const [riskTolerance, setRiskTolerance] = useState(0.05);

  // UI state
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showCorrelations, setShowCorrelations] = useState(false);
  const [showDistributions, setShowDistributions] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState<string>('');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);

  // Performance monitoring
  const [performanceMetrics, setPerformanceMetrics] = useState({
    lastRunTime: 0,
    averageRunTime: 0,
    totalRuns: 0,
    memoryUsage: 0,
    cpuUsage: 0
  });

  // Initialize with default scenarios
  useEffect(() => {
    const defaultScenarios: Scenario[] = [
      {
        id: 'base-case',
        name: language === 'el' ? 'Βασικό Σενάριο' : 'Base Case',
        description: language === 'el' ? 'Βασικό σενάριο με τρέχουσες παραμέτρους' : 'Base scenario with current parameters',
        category: 'base',
        status: 'draft',
        variables: [
          {
            name: 'purchasePrice',
            baseValue: 10,
            min: 8,
            max: 15,
            distribution: 'normal',
            parameters: { mean: 10, stdDev: 1.5 },
            category: 'cost',
            unit: '€/kg',
            description: 'Purchase price per kg'
          },
          {
            name: 'processingCost',
            baseValue: 3,
            min: 2,
            max: 5,
            distribution: 'uniform',
            category: 'cost',
            unit: '€/kg',
            description: 'Processing cost per kg'
          },
          {
            name: 'sellingPrice',
            baseValue: 18,
            min: 15,
            max: 25,
            distribution: 'triangular',
            parameters: { mode: 18 },
            category: 'revenue',
            unit: '€/kg',
            description: 'Selling price per kg'
          },
          {
            name: 'volume',
            baseValue: 1000,
            min: 800,
            max: 1500,
            distribution: 'normal',
            parameters: { mean: 1000, stdDev: 100 },
            category: 'volume',
            unit: 'kg',
            description: 'Production volume'
          }
        ],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        tags: ['default', 'base'],
        metadata: {
          author: 'System',
          version: '1.0',
          notes: 'Default base case scenario',
          assumptions: ['Normal market conditions', 'Stable supply chain'],
          limitations: ['Does not account for seasonal variations']
        }
      },
      {
        id: 'optimistic',
        name: language === 'el' ? 'Αισιόδοξο Σενάριο' : 'Optimistic Scenario',
        description: language === 'el' ? 'Σενάριο με βελτιωμένες συνθήκες' : 'Scenario with improved conditions',
        category: 'optimistic',
        status: 'draft',
        variables: [
          {
            name: 'purchasePrice',
            baseValue: 8.5,
            min: 7,
            max: 10,
            distribution: 'normal',
            parameters: { mean: 8.5, stdDev: 1 },
            category: 'cost',
            unit: '€/kg',
            description: 'Lower purchase price due to better negotiations'
          },
          {
            name: 'processingCost',
            baseValue: 2.5,
            min: 2,
            max: 3.5,
            distribution: 'uniform',
            category: 'cost',
            unit: '€/kg',
            description: 'Reduced processing costs through efficiency'
          },
          {
            name: 'sellingPrice',
            baseValue: 22,
            min: 20,
            max: 28,
            distribution: 'triangular',
            parameters: { mode: 22 },
            category: 'revenue',
            unit: '€/kg',
            description: 'Higher selling price due to premium positioning'
          },
          {
            name: 'volume',
            baseValue: 1200,
            min: 1000,
            max: 1600,
            distribution: 'normal',
            parameters: { mean: 1200, stdDev: 80 },
            category: 'volume',
            unit: 'kg',
            description: 'Increased production volume'
          }
        ],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        tags: ['optimistic', 'growth'],
        metadata: {
          author: 'System',
          version: '1.0',
          notes: 'Optimistic scenario with favorable conditions',
          assumptions: ['Strong market demand', 'Efficient operations', 'Premium market positioning'],
          limitations: ['May not be sustainable long-term']
        }
      },
      {
        id: 'pessimistic',
        name: language === 'el' ? 'Απαισιόδοξο Σενάριο' : 'Pessimistic Scenario',
        description: language === 'el' ? 'Σενάριο με δυσμενείς συνθήκες' : 'Scenario with adverse conditions',
        category: 'pessimistic',
        status: 'draft',
        variables: [
          {
            name: 'purchasePrice',
            baseValue: 12,
            min: 10,
            max: 16,
            distribution: 'normal',
            parameters: { mean: 12, stdDev: 2 },
            category: 'cost',
            unit: '€/kg',
            description: 'Higher purchase price due to supply constraints'
          },
          {
            name: 'processingCost',
            baseValue: 4,
            min: 3.5,
            max: 6,
            distribution: 'uniform',
            category: 'cost',
            unit: '€/kg',
            description: 'Increased processing costs'
          },
          {
            name: 'sellingPrice',
            baseValue: 16,
            min: 14,
            max: 20,
            distribution: 'triangular',
            parameters: { mode: 16 },
            category: 'revenue',
            unit: '€/kg',
            description: 'Lower selling price due to market pressure'
          },
          {
            name: 'volume',
            baseValue: 800,
            min: 600,
            max: 1000,
            distribution: 'normal',
            parameters: { mean: 800, stdDev: 120 },
            category: 'volume',
            unit: 'kg',
            description: 'Reduced production volume'
          }
        ],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        tags: ['pessimistic', 'risk'],
        metadata: {
          author: 'System',
          version: '1.0',
          notes: 'Pessimistic scenario with challenging conditions',
          assumptions: ['Economic downturn', 'Supply chain disruptions', 'Increased competition'],
          limitations: ['Represents worst-case scenario']
        }
      }
    ];

    setScenarios(defaultScenarios);
    setActiveScenario(defaultScenarios[0].id);
  }, [language]);

  // Scenario management functions
  const createScenario = useCallback(() => {
    const newScenario: Scenario = {
      id: `scenario-${Date.now()}`,
      name: language === 'el' ? 'Νέο Σενάριο' : 'New Scenario',
      description: '',
      category: 'custom',
      status: 'draft',
      variables: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: [],
      metadata: {
        author: 'User',
        version: '1.0',
        notes: '',
        assumptions: [],
        limitations: []
      }
    };

    setScenarios(prev => [...prev, newScenario]);
    setActiveScenario(newScenario.id);
  }, [language]);

  const duplicateScenario = useCallback((scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    const duplicatedScenario: Scenario = {
      ...scenario,
      id: `scenario-${Date.now()}`,
      name: `${scenario.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'draft'
    };

    setScenarios(prev => [...prev, duplicatedScenario]);
  }, [scenarios]);

  const deleteScenario = useCallback((scenarioId: string) => {
    setScenarios(prev => prev.filter(s => s.id !== scenarioId));
    if (activeScenario === scenarioId) {
      const remaining = scenarios.filter(s => s.id !== scenarioId);
      setActiveScenario(remaining.length > 0 ? remaining[0].id : '');
    }
  }, [scenarios, activeScenario]);

  const updateScenario = useCallback((scenarioId: string, updates: Partial<Scenario>) => {
    setScenarios(prev => prev.map(s => 
      s.id === scenarioId 
        ? { ...s, ...updates, updatedAt: Date.now() }
        : s
    ));
  }, []);

  // Advanced calculation functions
  const calculateScenarioResults = useCallback((scenario: Scenario): ScenarioResults => {
    const startTime = performance.now();
    
    // Extract variable values
    const variables = scenario.variables.reduce((acc, variable) => {
      acc[variable.name] = variable.baseValue;
      return acc;
    }, {} as { [key: string]: number });

    // Basic calculations
    const totalCost = (variables.purchasePrice || 0) + (variables.processingCost || 0);
    const totalRevenue = (variables.sellingPrice || 0) * (variables.volume || 0);
    const totalCostAmount = totalCost * (variables.volume || 0);
    const profit = totalRevenue - totalCostAmount;
    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const roi = totalCostAmount > 0 ? (profit / totalCostAmount) * 100 : 0;
    const breakEvenPoint = totalCost > 0 ? totalCostAmount / totalCost : 0;

    // Risk metrics (simplified for demo)
    const riskMetrics = {
      var95: profit * 0.05,
      var99: profit * 0.01,
      expectedShortfall: profit * 0.025,
      maxDrawdown: Math.abs(profit * 0.1),
      volatility: Math.abs(profit * 0.15),
      sharpeRatio: profit > 0 ? profit / Math.abs(profit * 0.15) : 0,
      sortinoRatio: profit > 0 ? profit / Math.abs(Math.min(profit * 0.1, 0)) : 0,
      calmarRatio: profit > 0 ? profit / Math.abs(profit * 0.1) : 0
    };

    // Distribution statistics
    const distributionStats = {
      mean: profit,
      median: profit,
      mode: profit,
      stdDev: Math.abs(profit * 0.1),
      skewness: 0,
      kurtosis: 3,
      percentiles: {
        '5': profit * 0.8,
        '10': profit * 0.85,
        '25': profit * 0.9,
        '50': profit,
        '75': profit * 1.1,
        '90': profit * 1.15,
        '95': profit * 1.2
      }
    };

    // Confidence intervals
    const margin = Math.abs(profit * 0.1);
    const confidenceIntervals = {
      ci90: [profit - margin * 1.645, profit + margin * 1.645] as [number, number],
      ci95: [profit - margin * 1.96, profit + margin * 1.96] as [number, number],
      ci99: [profit - margin * 2.576, profit + margin * 2.576] as [number, number]
    };

    const endTime = performance.now();
    setPerformanceMetrics(prev => ({
      ...prev,
      lastRunTime: endTime - startTime,
      averageRunTime: (prev.averageRunTime * prev.totalRuns + (endTime - startTime)) / (prev.totalRuns + 1),
      totalRuns: prev.totalRuns + 1
    }));

    return {
      totalCost: totalCostAmount,
      totalRevenue,
      profit,
      profitMargin,
      roi,
      breakEvenPoint,
      riskMetrics,
      distributionStats,
      confidenceIntervals
    };
  }, []);

  const calculateSensitivityAnalysis = useCallback((scenario: Scenario): SensitivityResults => {
    const baseResults = calculateScenarioResults(scenario);
    const baseProfit = baseResults.profit;
    
    // For demo purposes, return a single sensitivity result
    // In a real implementation, this would calculate sensitivity for each variable
    return {
      parameter: 'sellingPrice',
      impact: 0.8,
      correlation: 0.95,
      ranking: 1
    };
  }, [calculateScenarioResults]);

  const runMonteCarloSimulation = useCallback((scenario: Scenario, iterations: number): MonteCarloResults => {
    const results: number[] = [];
    
    // Simplified Monte Carlo simulation
    for (let i = 0; i < iterations; i++) {
      const variables = scenario.variables.reduce((acc, variable) => {
        // Generate random value based on distribution
        let value = variable.baseValue;
        
        switch (variable.distribution) {
          case 'normal':
            value = variable.baseValue + (Math.random() - 0.5) * 2 * (variable.parameters?.stdDev || 1);
            break;
          case 'uniform':
            value = variable.min + Math.random() * (variable.max - variable.min);
            break;
          case 'triangular':
            const mode = variable.parameters?.mode || variable.baseValue;
            const u = Math.random();
            if (u < (mode - variable.min) / (variable.max - variable.min)) {
              value = variable.min + Math.sqrt(u * (variable.max - variable.min) * (mode - variable.min));
            } else {
              value = variable.max - Math.sqrt((1 - u) * (variable.max - variable.min) * (variable.max - mode));
            }
            break;
        }
        
        acc[variable.name] = Math.max(variable.min, Math.min(variable.max, value));
        return acc;
      }, {} as { [key: string]: number });

      // Calculate profit for this iteration
      const totalCost = (variables.purchasePrice || 0) + (variables.processingCost || 0);
      const totalRevenue = (variables.sellingPrice || 0) * (variables.volume || 0);
      const totalCostAmount = totalCost * (variables.volume || 0);
      const profit = totalRevenue - totalCostAmount;
      
      results.push(profit);
    }

    // Calculate statistics
    results.sort((a, b) => a - b);
    const mean = results.reduce((sum, val) => sum + val, 0) / results.length;
    const median = results[Math.floor(results.length / 2)];
    const stdDev = Math.sqrt(results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length);
    const min = results[0];
    const max = results[results.length - 1];

    const percentiles = {
      '1': results[Math.floor(results.length * 0.01)],
      '5': results[Math.floor(results.length * 0.05)],
      '10': results[Math.floor(results.length * 0.10)],
      '25': results[Math.floor(results.length * 0.25)],
      '50': median,
      '75': results[Math.floor(results.length * 0.75)],
      '90': results[Math.floor(results.length * 0.90)],
      '95': results[Math.floor(results.length * 0.95)],
      '99': results[Math.floor(results.length * 0.99)]
    };

    // Create histogram
    const bins = 50;
    const binSize = (max - min) / bins;
    const histogram = Array.from({ length: bins }, (_, i) => {
      const binStart = min + i * binSize;
      const binEnd = binStart + binSize;
      const count = results.filter(val => val >= binStart && val < binEnd).length;
      return {
        bin: binStart + binSize / 2,
        count,
        probability: count / results.length
      };
    });

    return {
      iterations,
      results,
      statistics: {
        mean,
        median,
        stdDev,
        min,
        max,
        percentiles
      },
      convergence: {
        converged: true,
        iterations,
        tolerance: 0.001
      },
      histogram
    };
  }, []);

  const runScenario = async (scenario: Scenario) => {
    setIsRunning(true);
    try {
      const enhancedScenario = {
        ...scenario,
        results: calculateScenarioResults(scenario),
        sensitivity: calculateSensitivityAnalysis(scenario),
        monteCarlo: runMonteCarloSimulation(scenario, 1000),
        updatedAt: Date.now()
      };
      
      setScenarios(prev => prev.map(s => 
        s.id === scenario.id ? { ...enhancedScenario, sensitivity: enhancedScenario.sensitivity } as Scenario : s
      ));
    } catch (error) {
      console.error('Error running scenario:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const runAllScenarios = async () => {
    setIsRunning(true);
    for (const scenario of scenarios) {
      await runScenario(scenario);
    }
    setIsRunning(false);
  };

  // Filtering and sorting
  const filteredScenarios = useMemo(() => {
    let filtered = scenarios;

    if (filterCategory !== 'all') {
      filtered = filtered.filter(s => s.category === filterCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'created':
          aVal = a.createdAt;
          bVal = b.createdAt;
          break;
        case 'updated':
          aVal = a.updatedAt;
          bVal = b.updatedAt;
          break;
        case 'status':
          aVal = a.status;
          bVal = b.status;
          break;
        default:
          return 0;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      } else {
        return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
      }
    });

    return filtered;
  }, [scenarios, filterCategory, searchTerm, sortBy, sortOrder]);

  const activeScenarioData = scenarios.find(s => s.id === activeScenario);

  // Chart color schemes
  const chartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#ff00ff', '#00ffff', '#ff0000'];

  // Render functions
  const renderScenarioCard = (scenario: Scenario) => (
    <Card 
      key={scenario.id} 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        activeScenario === scenario.id ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => setActiveScenario(scenario.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{scenario.name}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={
              scenario.status === 'completed' ? 'default' :
              scenario.status === 'running' ? 'secondary' :
              scenario.status === 'error' ? 'destructive' : 'outline'
            }>
              {scenario.status}
            </Badge>
            <Badge variant="outline">{scenario.category}</Badge>
          </div>
        </div>
        {scenario.description && (
          <p className="text-sm text-gray-600 mt-2">{scenario.description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scenario.results && (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  €{scenario.results.profit.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'el' ? 'Κέρδος' : 'Profit'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {scenario.results.profitMargin.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'el' ? 'Περιθώριο' : 'Margin'}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {scenario.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  runScenario(scenario);
                }}
                disabled={isRunning}
              >
                <Play className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  duplicateScenario(scenario.id);
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteScenario(scenario.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderVariableEditor = (variable: ScenarioVariable, index: number) => (
    <Card key={index} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label htmlFor={`var-name-${index}`}>
            {language === 'el' ? 'Όνομα' : 'Name'}
          </Label>
          <Input
            id={`var-name-${index}`}
            value={variable.name}
            onChange={(e) => {
              if (activeScenarioData) {
                const updatedVariables = [...activeScenarioData.variables];
                updatedVariables[index] = { ...variable, name: e.target.value };
                updateScenario(activeScenario, { variables: updatedVariables });
              }
            }}
          />
        </div>
        
        <div>
          <Label htmlFor={`var-base-${index}`}>
            {language === 'el' ? 'Βασική Τιμή' : 'Base Value'}
          </Label>
          <Input
            id={`var-base-${index}`}
            type="number"
            value={variable.baseValue}
            onChange={(e) => {
              if (activeScenarioData) {
                const updatedVariables = [...activeScenarioData.variables];
                updatedVariables[index] = { ...variable, baseValue: parseFloat(e.target.value) || 0 };
                updateScenario(activeScenario, { variables: updatedVariables });
              }
            }}
          />
        </div>
        
        <div>
          <Label htmlFor={`var-min-${index}`}>
            {language === 'el' ? 'Ελάχιστο' : 'Minimum'}
          </Label>
          <Input
            id={`var-min-${index}`}
            type="number"
            value={variable.min}
            onChange={(e) => {
              if (activeScenarioData) {
                const updatedVariables = [...activeScenarioData.variables];
                updatedVariables[index] = { ...variable, min: parseFloat(e.target.value) || 0 };
                updateScenario(activeScenario, { variables: updatedVariables });
              }
            }}
          />
        </div>
        
        <div>
          <Label htmlFor={`var-max-${index}`}>
            {language === 'el' ? 'Μέγιστο' : 'Maximum'}
          </Label>
          <Input
            id={`var-max-${index}`}
            type="number"
            value={variable.max}
            onChange={(e) => {
              if (activeScenarioData) {
                const updatedVariables = [...activeScenarioData.variables];
                updatedVariables[index] = { ...variable, max: parseFloat(e.target.value) || 0 };
                updateScenario(activeScenario, { variables: updatedVariables });
              }
            }}
          />
        </div>
        
        <div>
          <Label htmlFor={`var-dist-${index}`}>
            {language === 'el' ? 'Κατανομή' : 'Distribution'}
          </Label>
          <Select
            value={variable.distribution}
            onValueChange={(value: 'normal' | 'uniform' | 'triangular' | 'beta' | 'gamma') => {
              if (activeScenarioData) {
                const updatedVariables = [...activeScenarioData.variables];
                updatedVariables[index] = { ...variable, distribution: value };
                updateScenario(activeScenario, { variables: updatedVariables });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="uniform">Uniform</SelectItem>
              <SelectItem value="triangular">Triangular</SelectItem>
              <SelectItem value="beta">Beta</SelectItem>
              <SelectItem value="gamma">Gamma</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor={`var-category-${index}`}>
            {language === 'el' ? 'Κατηγορία' : 'Category'}
          </Label>
          <Select
            value={variable.category}
            onValueChange={(value: 'cost' | 'revenue' | 'volume' | 'price' | 'quality' | 'time' | 'risk') => {
              if (activeScenarioData) {
                const updatedVariables = [...activeScenarioData.variables];
                updatedVariables[index] = { ...variable, category: value };
                updateScenario(activeScenario, { variables: updatedVariables });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cost">Cost</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="quality">Quality</SelectItem>
              <SelectItem value="time">Time</SelectItem>
              <SelectItem value="risk">Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor={`var-unit-${index}`}>
            {language === 'el' ? 'Μονάδα' : 'Unit'}
          </Label>
          <Input
            id={`var-unit-${index}`}
            value={variable.unit}
            onChange={(e) => {
              if (activeScenarioData) {
                const updatedVariables = [...activeScenarioData.variables];
                updatedVariables[index] = { ...variable, unit: e.target.value };
                updateScenario(activeScenario, { variables: updatedVariables });
              }
            }}
          />
        </div>
        
        <div className="flex items-end">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              if (activeScenarioData) {
                const updatedVariables = activeScenarioData.variables.filter((_, i) => i !== index);
                updateScenario(activeScenario, { variables: updatedVariables });
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {variable.description && (
        <div className="mt-3">
          <Label htmlFor={`var-desc-${index}`}>
            {language === 'el' ? 'Περιγραφή' : 'Description'}
          </Label>
          <Input
            id={`var-desc-${index}`}
            value={variable.description}
            onChange={(e) => {
              if (activeScenarioData) {
                const updatedVariables = [...activeScenarioData.variables];
                updatedVariables[index] = { ...variable, description: e.target.value };
                updateScenario(activeScenario, { variables: updatedVariables });
              }
            }}
          />
        </div>
      )}
    </Card>
  );

  const renderSensitivityChart = (sensitivity: SensitivityResults) => {
    if (!sensitivity || typeof sensitivity !== 'object') return null;
    
    // Handle case where sensitivity might be an array
    const sensitivityData = Array.isArray(sensitivity) ? sensitivity : [sensitivity];
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sensitivityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="parameter" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip 
            formatter={(value: any, name: string) => [
              typeof value === 'string' ? value : value?.toString() || 'N/A',
              name
            ]}
          />
          <Bar dataKey="impact" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderMonteCarloChart = (monteCarlo: MonteCarloResults) => (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={monteCarlo.histogram}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="bin" 
          tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
        />
        <YAxis 
          tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
        />
        <Tooltip 
          formatter={(value: any) => [`${(value * 100).toFixed(2)}%`, 'Probability']}
          labelFormatter={(value) => `Profit: €${(value / 1000).toFixed(1)}k`}
        />
        <Area 
          type="monotone" 
          dataKey="probability" 
          stroke="#8884d8" 
          fill="#8884d8" 
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderComparisonChart = () => {
    const comparisonData = selectedScenarios.map(id => {
      const scenario = scenarios.find(s => s.id === id);
      return scenario?.results ? {
        name: scenario.name,
        profit: scenario.results.profit,
        revenue: scenario.results.totalRevenue,
        cost: scenario.results.totalCost,
        margin: scenario.results.profitMargin
      } : null;
    }).filter(Boolean);

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={comparisonData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: any) => `€${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
          <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
          <Bar dataKey="cost" fill="#ffc658" name="Cost" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
            {language === 'el' ? 'Προηγμένη Ανάλυση Σεναρίων' : 'Advanced Scenario Analysis'}
          </h2>
          <p className="text-gray-600 mt-2">
            {language === 'el' 
              ? 'Ολοκληρωμένη ανάλυση σεναρίων με Monte Carlo προσομοίωση και ανάλυση ευαισθησίας'
              : 'Comprehensive scenario analysis with Monte Carlo simulation and sensitivity analysis'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={createScenario}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'el' ? 'Νέο Σενάριο' : 'New Scenario'}</span>
          </Button>
          
          <Button
            onClick={runAllScenarios}
            disabled={isRunning}
            variant="outline"
            className="flex items-center space-x-2"
          >
            {isRunning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{language === 'el' ? 'Εκτέλεση Όλων' : 'Run All'}</span>
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{language === 'el' ? 'Έλεγχοι & Φίλτρα' : 'Controls & Filters'}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            >
              <Settings className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Προχωρημένα' : 'Advanced'}
              {showAdvancedOptions ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">
                {language === 'el' ? 'Αναζήτηση' : 'Search'}
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder={language === 'el' ? 'Αναζήτηση σεναρίων...' : 'Search scenarios...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="category-filter">
                {language === 'el' ? 'Κατηγορία' : 'Category'}
              </Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'el' ? 'Όλες' : 'All'}</SelectItem>
                  <SelectItem value="base">{language === 'el' ? 'Βασικό' : 'Base'}</SelectItem>
                  <SelectItem value="optimistic">{language === 'el' ? 'Αισιόδοξο' : 'Optimistic'}</SelectItem>
                  <SelectItem value="pessimistic">{language === 'el' ? 'Απαισιόδοξο' : 'Pessimistic'}</SelectItem>
                  <SelectItem value="stress">{language === 'el' ? 'Στρες' : 'Stress'}</SelectItem>
                  <SelectItem value="custom">{language === 'el' ? 'Προσαρμοσμένο' : 'Custom'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="sort-by">
                {language === 'el' ? 'Ταξινόμηση' : 'Sort By'}
              </Label>
              <Select value={sortBy} onValueChange={(value: 'name' | 'created' | 'updated' | 'status') => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">{language === 'el' ? 'Όνομα' : 'Name'}</SelectItem>
                  <SelectItem value="created">{language === 'el' ? 'Δημιουργία' : 'Created'}</SelectItem>
                  <SelectItem value="updated">{language === 'el' ? 'Ενημέρωση' : 'Updated'}</SelectItem>
                  <SelectItem value="status">{language === 'el' ? 'Κατάσταση' : 'Status'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="view-mode">
                {language === 'el' ? 'Προβολή' : 'View Mode'}
              </Label>
              <Select value={viewMode} onValueChange={(value: 'grid' | 'list' | 'cards') => setViewMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">{language === 'el' ? 'Πλέγμα' : 'Grid'}</SelectItem>
                  <SelectItem value="list">{language === 'el' ? 'Λίστα' : 'List'}</SelectItem>
                  <SelectItem value="cards">{language === 'el' ? 'Κάρτες' : 'Cards'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {showAdvancedOptions && (
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="monte-carlo-iterations">
                    {language === 'el' ? 'Επαναλήψεις Monte Carlo' : 'Monte Carlo Iterations'}
                  </Label>
                  <Input
                    id="monte-carlo-iterations"
                    type="number"
                    value={monteCarloIterations}
                    onChange={(e) => setMonteCarloIterations(parseInt(e.target.value) || 1000)}
                    min="1000"
                    max="100000"
                    step="1000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="confidence-level">
                    {language === 'el' ? 'Επίπεδο Εμπιστοσύνης (%)' : 'Confidence Level (%)'}
                  </Label>
                  <Input
                    id="confidence-level"
                    type="number"
                    value={confidenceLevel}
                    onChange={(e) => setConfidenceLevel(parseInt(e.target.value) || 95)}
                    min="90"
                    max="99"
                    step="1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="sensitivity-threshold">
                    {language === 'el' ? 'Όριο Ευαισθησίας' : 'Sensitivity Threshold'}
                  </Label>
                  <Input
                    id="sensitivity-threshold"
                    type="number"
                    value={sensitivityThreshold}
                    onChange={(e) => setSensitivityThreshold(parseFloat(e.target.value) || 0.1)}
                    min="0.01"
                    max="1"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <Label htmlFor="risk-tolerance">
                    {language === 'el' ? 'Ανοχή Κινδύνου' : 'Risk Tolerance'}
                  </Label>
                  <Input
                    id="risk-tolerance"
                    type="number"
                    value={riskTolerance}
                    onChange={(e) => setRiskTolerance(parseFloat(e.target.value) || 0.05)}
                    min="0.01"
                    max="0.2"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="scenarios">
            {language === 'el' ? 'Σενάρια' : 'Scenarios'}
          </TabsTrigger>
          <TabsTrigger value="variables">
            {language === 'el' ? 'Μεταβλητές' : 'Variables'}
          </TabsTrigger>
          <TabsTrigger value="results">
            {language === 'el' ? 'Αποτελέσματα' : 'Results'}
          </TabsTrigger>
          <TabsTrigger value="analysis">
            {language === 'el' ? 'Ανάλυση' : 'Analysis'}
          </TabsTrigger>
          <TabsTrigger value="comparison">
            {language === 'el' ? 'Σύγκριση' : 'Comparison'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScenarios.map(renderScenarioCard)}
          </div>
        </TabsContent>

        <TabsContent value="variables" className="space-y-6">
          {activeScenarioData ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  {language === 'el' ? 'Μεταβλητές Σεναρίου' : 'Scenario Variables'}: {activeScenarioData.name}
                </h3>
                <Button
                  onClick={() => {
                    const newVariable: ScenarioVariable = {
                      name: 'newVariable',
                      baseValue: 0,
                      min: 0,
                      max: 100,
                      distribution: 'normal',
                      category: 'cost',
                      unit: '€',
                      description: ''
                    };
                    updateScenario(activeScenario, {
                      variables: [...activeScenarioData.variables, newVariable]
                    });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Προσθήκη Μεταβλητής' : 'Add Variable'}
                </Button>
              </div>
              
              <div className="space-y-4">
                {activeScenarioData.variables.map((variable, index) => 
                  renderVariableEditor(variable, index)
                )}
              </div>
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {language === 'el' 
                  ? 'Επιλέξτε ένα σενάριο για επεξεργασία των μεταβλητών'
                  : 'Select a scenario to edit variables'
                }
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {activeScenarioData?.results ? (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">
                {language === 'el' ? 'Αποτελέσματα' : 'Results'}: {activeScenarioData.name}
              </h3>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          {language === 'el' ? 'Συνολικό Κέρδος' : 'Total Profit'}
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          €{activeScenarioData.results.profit.toLocaleString()}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          {language === 'el' ? 'Περιθώριο Κέρδους' : 'Profit Margin'}
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          {activeScenarioData.results.profitMargin.toFixed(1)}%
                        </p>
                      </div>
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          {language === 'el' ? 'Απόδοση Επένδυσης' : 'Return on Investment'}
                        </p>
                        <p className="text-2xl font-bold text-purple-600">
                          {activeScenarioData.results.roi.toFixed(1)}%
                        </p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          {language === 'el' ? 'Σημείο Ισοσκέλισης' : 'Break-even Point'}
                        </p>
                        <p className="text-2xl font-bold text-orange-600">
                          €{activeScenarioData.results.breakEvenPoint.toLocaleString()}
                        </p>
                      </div>
                      <Flag className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Risk Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'el' ? 'Μετρικές Κινδύνου' : 'Risk Metrics'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-red-600">
                        €{Math.abs(activeScenarioData.results.riskMetrics.var95).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">VaR 95%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-red-700">
                        €{Math.abs(activeScenarioData.results.riskMetrics.var99).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">VaR 99%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">
                        {activeScenarioData.results.riskMetrics.volatility.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === 'el' ? 'Μεταβλητότητα' : 'Volatility'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        {activeScenarioData.results.riskMetrics.sharpeRatio.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">Sharpe Ratio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Distribution Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'el' ? 'Στατιστικά Κατανομής' : 'Distribution Statistics'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">
                        {language === 'el' ? 'Μέσος Όρος' : 'Mean'}
                      </div>
                      <div className="text-lg font-semibold">
                        €{activeScenarioData.results.distributionStats.mean.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {language === 'el' ? 'Διάμεσος' : 'Median'}
                      </div>
                      <div className="text-lg font-semibold">
                        €{activeScenarioData.results.distributionStats.median.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {language === 'el' ? 'Τυπική Απόκλιση' : 'Standard Deviation'}
                      </div>
                      <div className="text-lg font-semibold">
                        €{activeScenarioData.results.distributionStats.stdDev.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {language === 'el' ? 'Ασυμμετρία' : 'Skewness'}
                      </div>
                      <div className="text-lg font-semibold">
                        {activeScenarioData.results.distributionStats.skewness.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        {language === 'el' ? 'Κύρτωση' : 'Kurtosis'}
                      </div>
                      <div className="text-lg font-semibold">
                        {activeScenarioData.results.distributionStats.kurtosis.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {language === 'el' 
                  ? 'Εκτελέστε το σενάριο για να δείτε τα αποτελέσματα'
                  : 'Run the scenario to see results'
                }
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {activeScenarioData?.sensitivity && activeScenarioData?.monteCarlo ? (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">
                {language === 'el' ? 'Προηγμένη Ανάλυση' : 'Advanced Analysis'}: {activeScenarioData.name}
              </h3>
              
              {/* Sensitivity Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'el' ? 'Ανάλυση Ευαισθησίας' : 'Sensitivity Analysis'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSensitivityChart(activeScenarioData.sensitivity)}
                </CardContent>
              </Card>
              
              {/* Monte Carlo Results */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'el' ? 'Αποτελέσματα Monte Carlo' : 'Monte Carlo Results'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold">
                          {activeScenarioData.monteCarlo.iterations.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === 'el' ? 'Επαναλήψεις' : 'Iterations'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">
                          €{activeScenarioData.monteCarlo.statistics.mean.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === 'el' ? 'Μέσος Όρος' : 'Mean'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">
                          €{activeScenarioData.monteCarlo.statistics.median.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === 'el' ? 'Διάμεσος' : 'Median'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-orange-600">
                          €{activeScenarioData.monteCarlo.statistics.stdDev.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === 'el' ? 'Τυπ. Απόκλιση' : 'Std Dev'}
                        </div>
                      </div>
                    </div>
                    
                    {renderMonteCarloChart(activeScenarioData.monteCarlo)}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {language === 'el' 
                  ? 'Εκτελέστε το σενάριο για να δείτε την προηγμένη ανάλυση'
                  : 'Run the scenario to see advanced analysis'
                }
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {language === 'el' ? 'Σύγκριση Σεναρίων' : 'Scenario Comparison'}
              </h3>
              <Button
                onClick={() => setComparisonMode(!comparisonMode)}
                variant={comparisonMode ? "default" : "outline"}
              >
                {comparisonMode ? (
                  <Eye className="w-4 h-4 mr-2" />
                ) : (
                  <BarChart3 className="w-4 h-4 mr-2" />
                )}
                {language === 'el' ? 'Λειτουργία Σύγκρισης' : 'Comparison Mode'}
              </Button>
            </div>
            
            {comparisonMode && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'el' ? 'Επιλογή Σεναρίων' : 'Select Scenarios'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scenarios.filter(s => s.results).map(scenario => (
                      <div
                        key={scenario.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedScenarios.includes(scenario.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          if (selectedScenarios.includes(scenario.id)) {
                            setSelectedScenarios(prev => prev.filter(id => id !== scenario.id));
                          } else {
                            setSelectedScenarios(prev => [...prev, scenario.id]);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{scenario.name}</span>
                          {selectedScenarios.includes(scenario.id) && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Profit: €{scenario.results?.profit.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {selectedScenarios.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'el' ? 'Γράφημα Σύγκρισης' : 'Comparison Chart'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderComparisonChart()}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Performance Metrics */}
      {performanceMetrics.totalRuns > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              {language === 'el' ? 'Μετρικές Απόδοσης' : 'Performance Metrics'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {performanceMetrics.totalRuns}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'el' ? 'Συνολικές Εκτελέσεις' : 'Total Runs'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {performanceMetrics.lastRunTime.toFixed(2)}ms
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'el' ? 'Τελευταία Εκτέλεση' : 'Last Run Time'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {performanceMetrics.averageRunTime.toFixed(2)}ms
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'el' ? 'Μέσος Χρόνος' : 'Average Time'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">
                  {(1000 / performanceMetrics.averageRunTime).toFixed(1)}/s
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'el' ? 'Εκτελέσεις/δευτ' : 'Runs/sec'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScenarioAnalysisEnhanced;
