import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Share2,
  RefreshCw,
  BarChart3,
  LineChart,
  Target,
  DollarSign,
  Percent,
  Clock,
  Brain,
  Zap,
  AlertTriangle,
  Info,
  Settings,
} from "lucide-react";
import { libraryLoader } from "@/utils/libraryLoader";

interface ForecastPeriod {
  period: string;
  revenue: number;
  costs: number;
  profit: number;
  units: number;
  trend: "up" | "down" | "stable";
  confidence: number;
}

interface ForecastSummary {
  totalRevenue: number;
  totalCosts: number;
  totalProfit: number;
  averageMargin: number;
  growth: number;
  bestPeriod: string;
  worstPeriod: string;
}

const RevenueForecast: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [horizon, setHorizon] = useState(12);
  const [growthRate, setGrowthRate] = useState(5.0);
  const [forecastData, setForecastData] = useState<ForecastPeriod[]>([]);
  const [summary, setSummary] = useState<ForecastSummary | null>(null);
  const [sortBy, setSortBy] = useState("period");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isGenerating, setIsGenerating] = useState(false);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    initializeDates();
    setupDatePickers();
    generateInitialForecast();
  }, []);

  useEffect(() => {
    updateForecastChart();
  }, [forecastData]);

  const initializeDates = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear() + 1, today.getMonth(), 0);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  const setupDatePickers = async () => {
    await libraryLoader.waitForLibrary("flatpickr");
    if (window.flatpickr) {
      if (startDateRef.current) {
        window.flatpickr(startDateRef.current, {
          dateFormat: "d/m/Y",
          locale: "el",
          onChange: (dates: Date[]) => {
            if (dates[0]) {
              setStartDate(dates[0].toISOString().split("T")[0]);
            }
          },
        });
      }

      if (endDateRef.current) {
        window.flatpickr(endDateRef.current, {
          dateFormat: "d/m/Y",
          locale: "el",
          onChange: (dates: Date[]) => {
            if (dates[0]) {
              setEndDate(dates[0].toISOString().split("T")[0]);
            }
          },
        });
      }
    }
  };

  const generateInitialForecast = () => {
    const baseRevenue = 50000;
    const baseCosts = 35000;
    const forecast: ForecastPeriod[] = [];

    for (let i = 0; i < horizon; i++) {
      const periodDate = new Date();
      periodDate.setMonth(periodDate.getMonth() + i);
      const period = periodDate.toLocaleDateString("el-GR", {
        year: "numeric",
        month: "long",
      });

      // Apply seasonal and growth factors
      const seasonalFactor = 1 + Math.sin((i * Math.PI) / 6) * 0.2;
      const growthFactor = Math.pow(1 + growthRate / 100, i / 12);
      const randomVariation = 0.9 + Math.random() * 0.2;

      const revenue =
        baseRevenue * seasonalFactor * growthFactor * randomVariation;
      const costs =
        baseCosts *
        seasonalFactor *
        Math.pow(1 + (growthRate * 0.7) / 100, i / 12) *
        randomVariation;
      const profit = revenue - costs;
      const units = Math.floor(revenue / 150);

      const trend =
        i > 0
          ? ((revenue > forecast[i - 1].revenue
              ? "up"
              : revenue < forecast[i - 1].revenue
                ? "down"
                : "stable") as "up" | "down" | "stable")
          : ("stable" as "up" | "down" | "stable");

      const confidence = Math.max(85 - i * 2, 60);

      forecast.push({
        period,
        revenue: Math.round(revenue),
        costs: Math.round(costs),
        profit: Math.round(profit),
        units,
        trend,
        confidence,
      });
    }

    setForecastData(forecast);
    calculateSummary(forecast);
  };

  const calculateSummary = (forecast: ForecastPeriod[]) => {
    const totalRevenue = forecast.reduce(
      (sum, period) => sum + period.revenue,
      0,
    );
    const totalCosts = forecast.reduce((sum, period) => sum + period.costs, 0);
    const totalProfit = totalRevenue - totalCosts;
    const averageMargin = (totalProfit / totalRevenue) * 100;

    const firstPeriodRevenue = forecast[0]?.revenue || 0;
    const lastPeriodRevenue = forecast[forecast.length - 1]?.revenue || 0;
    const growth =
      firstPeriodRevenue > 0
        ? ((lastPeriodRevenue - firstPeriodRevenue) / firstPeriodRevenue) * 100
        : 0;

    const bestPeriod =
      forecast.reduce(
        (best, current) => (current.profit > best.profit ? current : best),
        forecast[0],
      )?.period || "";

    const worstPeriod =
      forecast.reduce(
        (worst, current) => (current.profit < worst.profit ? current : worst),
        forecast[0],
      )?.period || "";

    setSummary({
      totalRevenue,
      totalCosts,
      totalProfit,
      averageMargin,
      growth,
      bestPeriod,
      worstPeriod,
    });
  };

  const updateForecast = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generateInitialForecast();
      setIsGenerating(false);
    }, 1000);
  };

  const generateAIExpensesForecast = async () => {
    setIsGenerating(true);

    // Simulate AI-enhanced forecast
    const forecast: ForecastPeriod[] = [];
    const baseRevenue = 50000;
    const baseCosts = 35000;

    for (let i = 0; i < horizon; i++) {
      const periodDate = new Date();
      periodDate.setMonth(periodDate.getMonth() + i);
      const period = periodDate.toLocaleDateString("el-GR", {
        year: "numeric",
        month: "long",
      });

      // AI-enhanced prediction with multiple factors
      const marketTrend = 1 + Math.sin((i * Math.PI) / 4) * 0.15;
      const economicFactor = 1 - Math.exp(-i / 10) * 0.1;
      const competitionFactor = 0.95 + Math.random() * 0.1;
      const innovationBoost = i > 6 ? 1.1 : 1.0;

      const revenue =
        baseRevenue *
        marketTrend *
        economicFactor *
        competitionFactor *
        innovationBoost *
        Math.pow(1 + growthRate / 100, i / 12);
      const costs =
        baseCosts *
        marketTrend *
        0.9 *
        Math.pow(1 + (growthRate * 0.6) / 100, i / 12);
      const profit = revenue - costs;
      const units = Math.floor(revenue / 150);

      const trend =
        i > 0
          ? ((revenue > forecast[i - 1].revenue
              ? "up"
              : revenue < forecast[i - 1].revenue
                ? "down"
                : "stable") as "up" | "down" | "stable")
          : ("stable" as "up" | "down" | "stable");

      const confidence = Math.max(90 - i * 1.5, 70);

      forecast.push({
        period,
        revenue: Math.round(revenue),
        costs: Math.round(costs),
        profit: Math.round(profit),
        units,
        trend,
        confidence,
      });
    }

    setTimeout(() => {
      setForecastData(forecast);
      calculateSummary(forecast);
      setIsGenerating(false);
    }, 2000);
  };

  const updateForecastChart = async () => {
    await libraryLoader.waitForLibrary("chart");
    if (!window.Chart || !chartRef.current || forecastData.length === 0) return;

    const ctx = chartRef.current;

    // Clear existing chart
    if ((ctx as any).chart) {
      (ctx as any).chart.destroy();
    }

    const chart = new window.Chart(ctx, {
      type: "line",
      data: {
        labels: forecastData.map((d) => d.period),
        datasets: [
          {
            label: "Έσοδα",
            data: forecastData.map((d) => d.revenue),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: false,
            tension: 0.4,
          },
          {
            label: "Κόστη",
            data: forecastData.map((d) => d.costs),
            borderColor: "rgb(239, 68, 68)",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            fill: false,
            tension: 0.4,
          },
          {
            label: "Κέρδος",
            data: forecastData.map((d) => d.profit),
            borderColor: "rgb(16, 185, 129)",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                return `${context.dataset.label}: €${value.toLocaleString("el-GR")}`;
              },
            },
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Περίοδος",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Ποσό (€)",
            },
            ticks: {
              callback: function (value) {
                return "€" + Number(value).toLocaleString("el-GR");
              },
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    });

    (ctx as any).chart = chart;
  };

  const sortForecastData = (column: keyof ForecastPeriod) => {
    const newOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newOrder);

    const sorted = [...forecastData].sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (newOrder === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    setForecastData(sorted);
  };

  const exportForecast = async () => {
    await libraryLoader.waitForLibrary("xlsx");
    if (!window.XLSX || !summary) return;

    const wb = window.XLSX.utils.book_new();

    // Summary sheet
    const summaryData = [
      ["ΠΡΟΒΛΕΨΗ ΕΣΟΔΩΝ - ΣΥΝΟΨΗ", ""],
      ["Ημερομηνία Δημιουργίας", new Date().toLocaleString("el-GR")],
      ["Περίοδος Πρόβλεψης", `${horizon} μήνες`],
      ["Ρυθμός Ανάπτυξης (%)", growthRate],
      [""],
      ["ΣΥΝΟΛΙΚΑ ΣΤΟΙΧΕΙΑ", ""],
      ["Συνολικά Έσοδα", summary.totalRevenue],
      ["Συνολικά Κόστη", summary.totalCosts],
      ["Συνολικό Κέρδος", summary.totalProfit],
      ["Μέσο Περιθώριο (%)", summary.averageMargin.toFixed(2)],
      ["Ανάπτυξη (%)", summary.growth.toFixed(2)],
      ["Καλύτερη Περίοδος", summary.bestPeriod],
      ["Χειρότερη Περίοδος", summary.worstPeriod],
    ];

    const summaryWs = window.XLSX.utils.aoa_to_sheet(summaryData);
    window.XLSX.utils.book_append_sheet(wb, summaryWs, "Σύνοψη");

    // Data sheet
    const dataRows = [
      [
        "Περίοδος",
        "Έσοδα (€)",
        "Κόστη (€)",
        "Κέρδος (€)",
        "Μονάδες",
        "Τάση",
        "Αξιοπιστία (%)",
      ],
      ...forecastData.map((period) => [
        period.period,
        period.revenue,
        period.costs,
        period.profit,
        period.units,
        period.trend === "up"
          ? "Άνοδος"
          : period.trend === "down"
            ? "Πτώση"
            : "Σταθερό",
        period.confidence,
      ]),
    ];

    const dataWs = window.XLSX.utils.aoa_to_sheet(dataRows);

    // Format headers
    const headerRange = window.XLSX.utils.decode_range(
      dataWs["!ref"] || "A1:G1",
    );
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = window.XLSX.utils.encode_cell({ r: 0, c: col });
      if (!dataWs[cellAddress]) continue;
      dataWs[cellAddress].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "E0E7FF" } },
      };
    }

    window.XLSX.utils.book_append_sheet(wb, dataWs, "Δεδομένα");

    window.XLSX.writeFile(wb, `forecast-${Date.now()}.xlsx`);
  };

  const downloadCSV = () => {
    const headers = [
      "Περίοδος",
      "Έσοδα (€)",
      "Κόστη (€)",
      "Κέρδος (€)",
      "Μονάδες",
      "Τάση",
      "Αξιοπιστία (%)",
    ];
    const csvContent = [
      headers.join(","),
      ...forecastData.map((period) =>
        [
          `"${period.period}"`,
          period.revenue,
          period.costs,
          period.profit,
          period.units,
          `"${period.trend === "up" ? "Άνοδος" : period.trend === "down" ? "Πτώση" : "Σταθερό"}"`,
          period.confidence,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `forecast-${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="forecast-section" className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Πρόβλεψη Εσόδων</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Προβλέψτε τα μελλοντικά έσοδα και κέρδη
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={updateForecast}
            variant="outline"
            className="flex items-center gap-2"
            disabled={isGenerating}
          >
            <RefreshCw
              className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`}
            />
            Ανανέωση
          </Button>

          <Button
            id="ai-forecast-btn"
            onClick={generateAIExpensesForecast}
            className="flex items-center gap-2"
            disabled={isGenerating}
          >
            <Brain className="w-4 h-4" />
            AI Πρόβλεψη
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Παράμετροι Πρόβλεψης
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="forecast-start-date">Ημερομηνία Έναρξης</Label>
              <Input
                id="forecast-start-date"
                ref={startDateRef}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="forecast-end-date">Ημερομηνία Λήξης</Label>
              <Input
                id="forecast-end-date"
                ref={endDateRef}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="horizon-input">Ορίζοντας (μήνες)</Label>
              <Input
                id="horizon-input"
                type="number"
                min="1"
                max="60"
                value={horizon}
                onChange={(e) => setHorizon(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="growth-rate-input">Ρυθμός Ανάπτυξης (%)</Label>
              <Input
                id="growth-rate-input"
                type="number"
                step="0.1"
                min="-50"
                max="100"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      {summary && (
        <div id="forecast-summary" className="kpi-grid">
          <div className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Συνολικά Έσοδα
            </h3>
            <span className="counter text-2xl font-bold">
              €{summary.totalRevenue.toLocaleString("el-GR")}
            </span>
          </div>

          <div className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <Target className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Συνολικό Κέρδος
            </h3>
            <span className="counter text-2xl font-bold text-green-600">
              €{summary.totalProfit.toLocaleString("el-GR")}
            </span>
          </div>

          <div className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <Percent className="w-6 h-6" />
              </div>
              <div
                className={`flex items-center text-sm ${summary.growth >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {summary.growth >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {summary.growth.toFixed(1)}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Μέσο Περιθώριο
            </h3>
            <span className="counter text-2xl font-bold">
              {summary.averageMargin.toFixed(1)}%
            </span>
          </div>

          <div className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <Badge variant="outline">Ανάπτυξη</Badge>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Ετήσια Ανάπτυξη
            </h3>
            <span className="counter text-2xl font-bold">
              {summary.growth.toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5" />
            Γράφημα Πρόβλεψης
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div id="forecast-chart" className="h-80">
            <canvas ref={chartRef} className="w-full h-full" />
          </div>
        </CardContent>
      </Card>

      {/* Forecast Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Αναλυτικά Δεδομένα Πρόβλεψης
            </CardTitle>

            <div className="flex items-center gap-3">
              <Button
                id="export-forecast"
                onClick={exportForecast}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Excel
              </Button>

              <Button
                id="csv-download-forecast"
                onClick={downloadCSV}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                CSV
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table id="forecast-table" className="pro-table">
              <thead>
                <tr>
                  {[
                    { key: "period", label: "Περίοδος" },
                    { key: "revenue", label: "Έσοδα (€)" },
                    { key: "costs", label: "Κόστη (€)" },
                    { key: "profit", label: "Κέρδος (€)" },
                    { key: "units", label: "Μονάδες" },
                    { key: "trend", label: "Τάση" },
                    { key: "confidence", label: "Αξιοπιστία (%)" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() =>
                        sortForecastData(col.key as keyof ForecastPeriod)
                      }
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {sortBy === col.key && (
                          <span className="text-xs">
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {forecastData.map((period, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="font-medium">{period.period}</td>
                    <td className="text-right">
                      €{period.revenue.toLocaleString("el-GR")}
                    </td>
                    <td className="text-right">
                      €{period.costs.toLocaleString("el-GR")}
                    </td>
                    <td
                      className={`text-right font-medium ${period.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      €{period.profit.toLocaleString("el-GR")}
                    </td>
                    <td className="text-right">
                      {period.units.toLocaleString("el-GR")}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {period.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : period.trend === "down" ? (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        ) : (
                          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        )}
                        <span className="text-sm">
                          {period.trend === "up"
                            ? "Άνοδος"
                            : period.trend === "down"
                              ? "Πτώση"
                              : "Σταθερό"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              period.confidence >= 80
                                ? "bg-green-600"
                                : period.confidence >= 60
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                            }`}
                            style={{ width: `${period.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-10 text-right">
                          {period.confidence}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      {summary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Στατιστικά Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-green-600" />
                  <h4 className="font-medium text-green-700 dark:text-green-300">
                    Καλύτερη Περίοδος
                  </h4>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {summary.bestPeriod} - Υψηλότερα κέρδη αναμένονται
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">
                    Προσοχή
                  </h4>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {summary.worstPeriod} - Δύσκολη περίοδος, προετοιμαστείτε
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>Δημιουργία πρόβλεψης...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueForecast;
