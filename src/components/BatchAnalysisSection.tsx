import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Scale,
  FileText,
  Download,
  Settings,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import { FormData, CalculationResults } from "@/utils/calc";
import { formatCurrency, formatPercentage } from "@/utils/calc";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface BatchAnalysisSectionProps {
  formData: FormData;
  results: CalculationResults;
}

interface BenchmarkSettings {
  yield: number;
  rawMaterialCostPercentage: number;
  laborCostPercentage: number;
  packagingCostPercentage: number;
  hourlyRate: number;
  rawMaterialCostPerKg: number;
  workers: number;
}

const COLORS = ["#1F4E79", "#F29F05", "#4CB944", "#E53E3E", "#805AD5"];

const DEFAULT_BENCHMARK: BenchmarkSettings = {
  yield: 90,
  rawMaterialCostPercentage: 65,
  laborCostPercentage: 12.5,
  packagingCostPercentage: 7,
  hourlyRate: 5,
  rawMaterialCostPerKg: 5.7,
  workers: 2,
};

const BatchAnalysisSection: React.FC<BatchAnalysisSectionProps> = ({
  formData,
  results,
}) => {
  // Early return if no data available
  if (!formData || !results) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            Παρακαλώ πραγματοποιήστε έναν υπολογισμό πρώτα για να δείτε την ανάλυση παρτίδας.
          </div>
        </CardContent>
      </Card>
    );
  }
  const [showBenchmarkComparison, setShowBenchmarkComparison] = useState(true);
  const [benchmarkSettings, setBenchmarkSettings] = useState<BenchmarkSettings>(DEFAULT_BENCHMARK);
  const [showSettings, setShowSettings] = useState(false);

  // Calculate batch analysis data
  const calculateBatchData = () => {
    const rawWeight = formData.weight || 900; // Default example value
    const workers = formData.workers || [{ id: "1", hourlyRate: 5, hours: 1 }];
    const totalHours = workers.reduce((sum, worker) => sum + (worker.hours || 0), 0);
    const avgHourlyRate = workers.length > 0 ? workers.reduce((sum, worker) => sum + (worker.hourlyRate || 0), 0) / workers.length : 5;
    const totalLaborCost = Math.max(avgHourlyRate * totalHours * (rawWeight/100), 310); // Ensure minimum realistic cost
    
    // Calculate final product weight (after cleaning & grilling)
    const yieldPercentage = 99; // From requirements
    const finalWeight = rawWeight * (yieldPercentage / 100);
    const waste = rawWeight - finalWeight;
    const wastePercentage = (waste / rawWeight) * 100;
    
    // Calculate costs
    const rawMaterialCost = rawWeight * (formData.purchasePrice || 5.7);
    const laborCost = totalLaborCost;
    
    // Packaging costs - dynamic calculation
    // 1 kg gelatin = 35 bags, 1 bag = 5 kg product, 1 box = 2 bags
    const gelatinPerKg = 35; // bags per kg gelatin
    const productPerBag = 5; // kg
    const bagsPerBox = 2;
    const gelatinNeeded = finalWeight / (gelatinPerKg * productPerBag); // kg gelatin needed
    const bagsNeeded = finalWeight / productPerBag;
    const boxesNeeded = bagsNeeded / bagsPerBox;
    const gelatinCost = gelatinNeeded * 50; // Assuming gelatin costs 50€/kg
    const boxCost = boxesNeeded * 2; // Assuming 2€ per box
    const packagingCost = gelatinCost + boxCost;
    
    const totalCost = rawMaterialCost + laborCost + packagingCost;
    const costPerKg = totalCost / finalWeight;
    const profitPerKg = (formData.targetSellingPrice || 8) - costPerKg;
    const netProfit = profitPerKg * finalWeight;
    
    return {
      rawWeight,
      finalWeight,
      waste,
      wastePercentage,
      yieldPercentage,
      costPerKg,
      profitPerKg,
      netProfit,
      rawMaterialCost,
      laborCost,
      packagingCost,
      totalCost,
    };
  };

  const batchData = calculateBatchData();

  // Production cost pie chart data
  const productionCostData = [
    {
      name: "Α' Ύλη",
      value: batchData.rawMaterialCost,
      percentage: (batchData.rawMaterialCost / batchData.totalCost) * 100,
    },
    {
      name: "Εργατικά",
      value: batchData.laborCost,
      percentage: (batchData.laborCost / batchData.totalCost) * 100,
    },
    {
      name: "Συσκευασία",
      value: batchData.packagingCost,
      percentage: (batchData.packagingCost / batchData.totalCost) * 100,
    },
  ];

  // Benchmark comparison data
  const benchmarkData = [
    {
      metric: "Απόδοση (%)",
      our: batchData.yieldPercentage,
      benchmark: benchmarkSettings.yield,
      unit: "%",
    },
    {
      metric: "Κόστος Α' Ύλης (%)",
      our: (batchData.rawMaterialCost / batchData.totalCost) * 100,
      benchmark: benchmarkSettings.rawMaterialCostPercentage,
      unit: "%",
    },
    {
      metric: "Κόστος Εργατικών (%)",
      our: (batchData.laborCost / batchData.totalCost) * 100,
      benchmark: benchmarkSettings.laborCostPercentage,
      unit: "%",
    },
    {
      metric: "Συσκευασία (%)",
      our: (batchData.packagingCost / batchData.totalCost) * 100,
      benchmark: benchmarkSettings.packagingCostPercentage,
      unit: "%",
    },
  ];

  const exportToPDF = async () => {
    const element = document.getElementById("batch-analysis-section");
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`batch-analysis-${new Date().toISOString().split("T")[0]}.pdf`);
    }
  };

  const renderPerformanceIndicator = (our: number, benchmark: number, higher_is_better: boolean = true) => {
    const isGood = higher_is_better ? our >= benchmark : our <= benchmark;
    return (
      <div className={`flex items-center ${isGood ? "text-green-600" : "text-red-600"}`}>
        {isGood ? (
          <TrendingUp className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 mr-1" />
        )}
        <span className="text-sm font-medium">
          {isGood ? "Καλή" : "Χαμηλή"} απόδοση
        </span>
      </div>
    );
  };

  return (
    <div id="batch-analysis-section" className="space-y-6">
      {/* Header with controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-2xl">
              <BarChart3 className="w-6 h-6 mr-3 text-primary" />
              Ανάλυση Παρτίδας & Σύγκριση με Benchmark
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="benchmark-comparison"
                  checked={showBenchmarkComparison}
                  onCheckedChange={setShowBenchmarkComparison}
                />
                <Label htmlFor="benchmark-comparison">Προβολή Benchmark</Label>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Ρυθμίσεις
              </Button>
              <Button variant="outline" size="sm" onClick={exportToPDF}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Settings panel */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ρυθμίσεις What-if Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="hourly-rate">Τιμή/ώρα (€)</Label>
                <Input
                  id="hourly-rate"
                  type="number"
                  value={benchmarkSettings.hourlyRate}
                  onChange={(e) => setBenchmarkSettings({
                    ...benchmarkSettings,
                    hourlyRate: parseFloat(e.target.value) || 0
                  })}
                />
              </div>
              <div>
                <Label htmlFor="raw-material-cost">Κόστος Α' Ύλης (€/kg)</Label>
                <Input
                  id="raw-material-cost"
                  type="number"
                  value={benchmarkSettings.rawMaterialCostPerKg}
                  onChange={(e) => setBenchmarkSettings({
                    ...benchmarkSettings,
                    rawMaterialCostPerKg: parseFloat(e.target.value) || 0
                  })}
                />
              </div>
              <div>
                <Label htmlFor="workers-count">Αριθμός Εργατών</Label>
                <Input
                  id="workers-count"
                  type="number"
                  value={benchmarkSettings.workers}
                  onChange={(e) => setBenchmarkSettings({
                    ...benchmarkSettings,
                    workers: parseInt(e.target.value) || 0
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytical Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <FileText className="w-5 h-5 mr-2 text-primary" />
            Αναλυτική Σύνοψη Παρτίδας
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Πρώτη ύλη</div>
              <div className="text-2xl font-bold">{batchData.rawWeight} kg</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Τελικό προϊόν</div>
              <div className="text-2xl font-bold text-green-600">
                {batchData.finalWeight.toFixed(2)} kg
              </div>
              <div className="text-xs text-muted-foreground">
                (Καθάρισμα & Grill)
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Φύρα</div>
              <div className="text-2xl font-bold text-red-600">
                {batchData.waste.toFixed(2)} kg
              </div>
              <div className="text-xs text-muted-foreground">
                {formatPercentage(batchData.wastePercentage)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Απόδοση</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatPercentage(batchData.yieldPercentage)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 pt-6 border-t">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Κόστος/kg</div>
              <div className="text-xl font-bold">
                {formatCurrency(batchData.costPerKg)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Κέρδος/kg</div>
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(batchData.profitPerKg)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Καθαρό Κέρδος</div>
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(batchData.netProfit)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Cost Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <PieChartIcon className="w-5 h-5 mr-2 text-primary" />
              Πίτα Κόστους Παραγωγής
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productionCostData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${formatPercentage(percentage)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productionCostData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {productionCostData.map((item, index) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(item.value)}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatPercentage(item.percentage)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benchmark Comparison */}
        {showBenchmarkComparison && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Σύγκριση με Βιομηχανικά Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="metric" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${(value as number).toFixed(1)}%`,
                        name === "our" ? "Δικό μας" : "Benchmark"
                      ]}
                    />
                    <Legend 
                      formatter={(value) => value === "our" ? "Δικό μας" : "Benchmark"}
                    />
                    <Bar dataKey="our" fill="#1F4E79" name="our" />
                    <Bar dataKey="benchmark" fill="#F29F05" name="benchmark" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 space-y-3">
                {benchmarkData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{item.metric}</span>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm">
                          Εμείς: <strong>{item.our.toFixed(1)}{item.unit}</strong>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Benchmark: {item.benchmark.toFixed(1)}{item.unit}
                        </div>
                      </div>
                      {renderPerformanceIndicator(
                        item.our, 
                        item.benchmark, 
                        item.metric === "Απόδοση (%)" // Higher is better for yield
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Scale className="w-5 h-5 mr-2 text-primary" />
            Σύνοψη Απόδοσης
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-green-600 font-medium">Θετικά Σημεία</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Περιοχές που υπερτερούμε
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="mt-3 space-y-1">
                {benchmarkData.map((item, index) => {
                  const isGood = item.metric === "Απόδοση (%)" 
                    ? item.our >= item.benchmark 
                    : item.our <= item.benchmark;
                  return isGood ? (
                    <div key={index} className="text-sm text-green-700">
                      • {item.metric}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-yellow-600 font-medium">Περιοχές Βελτίωσης</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Χρειάζονται προσοχή
                  </div>
                </div>
                <Target className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="mt-3 space-y-1">
                {benchmarkData.map((item, index) => {
                  const needsImprovement = item.metric === "Απόδοση (%)" 
                    ? item.our < item.benchmark 
                    : item.our > item.benchmark;
                  return needsImprovement ? (
                    <div key={index} className="text-sm text-yellow-700">
                      • {item.metric}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-600 font-medium">Συνολική Βαθμολογία</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Γενική απόδοση
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg">
                  {Math.round(
                    (benchmarkData.filter(item => 
                      item.metric === "Απόδοση (%)" 
                        ? item.our >= item.benchmark 
                        : item.our <= item.benchmark
                    ).length / benchmarkData.length) * 100
                  )}%
                </Badge>
              </div>
              <div className="mt-3 text-sm text-blue-700">
                Υπερτερούμε σε {benchmarkData.filter(item => 
                  item.metric === "Απόδοση (%)" 
                    ? item.our >= item.benchmark 
                    : item.our <= item.benchmark
                ).length} από {benchmarkData.length} μετρικές
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchAnalysisSection;
