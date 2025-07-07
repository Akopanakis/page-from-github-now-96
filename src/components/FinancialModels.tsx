import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  TrendingUp,
  BarChart3,
  Download,
  Plus,
  Minus,
  Target,
  DollarSign,
  Percent,
  Zap,
  RefreshCw,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info,
  PieChart,
  LineChart,
} from "lucide-react";
import { libraryLoader } from "@/utils/libraryLoader";

interface CashFlow {
  period: number;
  inflow: number;
  outflow: number;
  netFlow: number;
}

interface NPVResult {
  npv: number;
  irr: number;
  paybackPeriod: number;
  discountedPayback: number;
  profitabilityIndex: number;
}

interface MonteCarloResult {
  meanNPV: number;
  medianNPV: number;
  stdDeviation: number;
  confidenceInterval: [number, number];
  probabilityPositive: number;
  percentiles: { [key: string]: number };
}

const FinancialModels: React.FC = () => {
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { period: 0, inflow: 0, outflow: 500000, netFlow: -500000 },
    { period: 1, inflow: 200000, outflow: 120000, netFlow: 80000 },
    { period: 2, inflow: 250000, outflow: 140000, netFlow: 110000 },
    { period: 3, inflow: 300000, outflow: 160000, netFlow: 140000 },
    { period: 4, inflow: 350000, outflow: 180000, netFlow: 170000 },
    { period: 5, inflow: 400000, outflow: 200000, netFlow: 200000 },
  ]);

  const [initialInvestment, setInitialInvestment] = useState(500000);
  const [discountRate, setDiscountRate] = useState(10);
  const [npvResult, setNpvResult] = useState<NPVResult | null>(null);
  const [monteCarloResult, setMonteCarloResult] =
    useState<MonteCarloResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [simulations, setSimulations] = useState(10000);

  const npvChartRef = useRef<HTMLCanvasElement>(null);
  const monteCarloChartRef = useRef<HTMLCanvasElement>(null);
  const tornadoChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    calculateNPV();
  }, [cashFlows, discountRate]);

  useEffect(() => {
    updateCharts();
  }, [npvResult, monteCarloResult]);

  const calculateNPV = () => {
    if (cashFlows.length === 0) return;

    let npv = 0;
    let cumulativeFlow = 0;
    let paybackPeriod = 0;
    let discountedPayback = 0;
    let cumulativeDiscounted = 0;

    // Calculate NPV and other metrics
    cashFlows.forEach((flow, index) => {
      const discountFactor = Math.pow(1 + discountRate / 100, flow.period);
      const presentValue = flow.netFlow / discountFactor;
      npv += presentValue;

      // Payback period calculation
      if (paybackPeriod === 0 && index > 0) {
        cumulativeFlow += flow.netFlow;
        if (cumulativeFlow >= 0) {
          paybackPeriod = flow.period;
        }
      }

      // Discounted payback period
      if (discountedPayback === 0 && index > 0) {
        cumulativeDiscounted += presentValue;
        if (cumulativeDiscounted >= 0) {
          discountedPayback = flow.period;
        }
      }
    });

    // Calculate IRR using Newton-Raphson method
    const irr = calculateIRR();

    // Profitability Index
    const totalPresentValueInflows = cashFlows.slice(1).reduce((sum, flow) => {
      return sum + flow.inflow / Math.pow(1 + discountRate / 100, flow.period);
    }, 0);

    const profitabilityIndex = totalPresentValueInflows / initialInvestment;

    setNpvResult({
      npv,
      irr,
      paybackPeriod,
      discountedPayback,
      profitabilityIndex,
    });
  };

  const calculateIRR = (): number => {
    let rate = 0.1; // Initial guess
    let iteration = 0;
    const maxIterations = 100;
    const tolerance = 0.0001;

    while (iteration < maxIterations) {
      let npv = 0;
      let dnpv = 0;

      cashFlows.forEach((flow) => {
        const factor = Math.pow(1 + rate, flow.period);
        npv += flow.netFlow / factor;
        dnpv -= (flow.period * flow.netFlow) / (factor * (1 + rate));
      });

      if (Math.abs(npv) < tolerance) {
        return rate * 100;
      }

      rate = rate - npv / dnpv;
      iteration++;
    }

    return rate * 100;
  };

  const runMonteCarloSimulation = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const results: number[] = [];

      for (let i = 0; i < simulations; i++) {
        const simulatedCashFlows = cashFlows.map((flow) => ({
          ...flow,
          inflow: flow.inflow * (0.8 + Math.random() * 0.4), // ±20% variation
          outflow: flow.outflow * (0.9 + Math.random() * 0.2), // ±10% variation
          netFlow: 0,
        }));

        // Recalculate net flows
        simulatedCashFlows.forEach((flow) => {
          flow.netFlow = flow.inflow - flow.outflow;
        });

        // Calculate NPV for this simulation
        let npv = 0;
        simulatedCashFlows.forEach((flow) => {
          const discountFactor = Math.pow(1 + discountRate / 100, flow.period);
          npv += flow.netFlow / discountFactor;
        });

        results.push(npv);
      }

      // Calculate statistics
      results.sort((a, b) => a - b);
      const meanNPV =
        results.reduce((sum, val) => sum + val, 0) / results.length;
      const medianNPV = results[Math.floor(results.length / 2)];

      const variance =
        results.reduce((sum, val) => sum + Math.pow(val - meanNPV, 2), 0) /
        results.length;
      const stdDeviation = Math.sqrt(variance);

      const lowerBound = results[Math.floor(results.length * 0.025)];
      const upperBound = results[Math.floor(results.length * 0.975)];

      const probabilityPositive =
        results.filter((r) => r > 0).length / results.length;

      const percentiles = {
        "5": results[Math.floor(results.length * 0.05)],
        "10": results[Math.floor(results.length * 0.1)],
        "25": results[Math.floor(results.length * 0.25)],
        "75": results[Math.floor(results.length * 0.75)],
        "90": results[Math.floor(results.length * 0.9)],
        "95": results[Math.floor(results.length * 0.95)],
      };

      setMonteCarloResult({
        meanNPV,
        medianNPV,
        stdDeviation,
        confidenceInterval: [lowerBound, upperBound],
        probabilityPositive,
        percentiles,
      });

      setIsCalculating(false);
    }, 1500);
  };

  const updateCharts = async () => {
    await libraryLoader.waitForLibrary("chart");
    if (!window.Chart) return;

    // NPV Sensitivity Chart
    if (npvChartRef.current && npvResult) {
      const ctx = npvChartRef.current;

      if ((ctx as any).chart) {
        (ctx as any).chart.destroy();
      }

      const rates = [];
      const npvValues = [];

      for (let rate = 1; rate <= 20; rate += 0.5) {
        rates.push(rate);
        let npv = 0;
        cashFlows.forEach((flow) => {
          const discountFactor = Math.pow(1 + rate / 100, flow.period);
          npv += flow.netFlow / discountFactor;
        });
        npvValues.push(npv);
      }

      const chart = new window.Chart(ctx, {
        type: "line",
        data: {
          labels: rates.map((r) => r + "%"),
          datasets: [
            {
              label: "NPV (€)",
              data: npvValues,
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context: any) =>
                  `NPV: €${context.parsed.y.toLocaleString("el-GR")}`,
              },
            },
          },
          scales: {
            x: {
              title: { display: true, text: "Επιτόκιο Προεξόφλησης (%)" },
            },
            y: {
              title: { display: true, text: "NPV (€)" },
              ticks: {
                callback: function (value: any) {
                  return "€" + Number(value).toLocaleString("el-GR");
                },
              },
            },
          },
        },
      });

      (ctx as any).chart = chart;
    }

    // Monte Carlo Distribution Chart
    if (monteCarloChartRef.current && monteCarloResult) {
      const ctx = monteCarloChartRef.current;

      if ((ctx as any).chart) {
        (ctx as any).chart.destroy();
      }

      // Create histogram data
      const bins = 20;
      const min = monteCarloResult.confidenceInterval[0];
      const max = monteCarloResult.confidenceInterval[1];
      const binSize = (max - min) / bins;

      const histogram = Array(bins).fill(0);
      const labels = [];

      for (let i = 0; i < bins; i++) {
        const binStart = min + i * binSize;
        const binEnd = binStart + binSize;
        labels.push(`€${(binStart / 1000).toFixed(0)}k`);

        // Simulate histogram data based on normal distribution
        const binCenter = binStart + binSize / 2;
        const probability = Math.exp(
          -0.5 *
            Math.pow(
              (binCenter - monteCarloResult.meanNPV) /
                monteCarloResult.stdDeviation,
              2,
            ),
        );
        histogram[i] = (probability * simulations) / 100;
      }

      const chart = new window.Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Συχνότητα",
              data: histogram,
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              borderColor: "rgb(16, 185, 129)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              title: { display: true, text: "NPV (€)" },
            },
            y: {
              title: { display: true, text: "Συχνότητα" },
            },
          },
        },
      });

      (ctx as any).chart = chart;
    }

    // Tornado Chart for Sensitivity Analysis
    if (tornadoChartRef.current && npvResult) {
      const ctx = tornadoChartRef.current;

      if ((ctx as any).chart) {
        (ctx as any).chart.destroy();
      }

      // Calculate sensitivity for different variables
      const baseNPV = npvResult.npv;
      const sensitivities = [];

      // Test ±10% changes in discount rate, initial investment, and cash flows
      const variables = [
        {
          name: "Επιτόκιο (+10%)",
          value: calculateNPVWithRate(discountRate * 1.1) - baseNPV,
        },
        {
          name: "Επιτόκιο (-10%)",
          value: calculateNPVWithRate(discountRate * 0.9) - baseNPV,
        },
        {
          name: "Αρχική Επένδυση (+10%)",
          value: baseNPV - initialInvestment * 0.1,
        },
        {
          name: "Αρχική Επένδυση (-10%)",
          value: baseNPV + initialInvestment * 0.1,
        },
        {
          name: "Ταμειακές Ροές (+10%)",
          value: calculateNPVWithFlowMultiplier(1.1) - baseNPV,
        },
        {
          name: "Ταμειακές Ροές (-10%)",
          value: calculateNPVWithFlowMultiplier(0.9) - baseNPV,
        },
      ];

      const chart = new window.Chart(ctx, {
        type: "bar",
        data: {
          labels: variables.map((v) => v.name),
          datasets: [
            {
              label: "Επίδραση στο NPV (€)",
              data: variables.map((v) => v.value),
              backgroundColor: variables.map((v) =>
                v.value >= 0
                  ? "rgba(16, 185, 129, 0.8)"
                  : "rgba(239, 68, 68, 0.8)",
              ),
              borderColor: variables.map((v) =>
                v.value >= 0 ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)",
              ),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              title: { display: true, text: "Μεταβολή NPV (€)" },
              ticks: {
                callback: function (value: any) {
                  return "€" + Number(value).toLocaleString("el-GR");
                },
              },
            },
          },
        },
      });

      (ctx as any).chart = chart;
    }
  };

  const calculateNPVWithRate = (rate: number): number => {
    let npv = 0;
    cashFlows.forEach((flow) => {
      const discountFactor = Math.pow(1 + rate / 100, flow.period);
      npv += flow.netFlow / discountFactor;
    });
    return npv;
  };

  const calculateNPVWithFlowMultiplier = (multiplier: number): number => {
    let npv = 0;
    cashFlows.forEach((flow) => {
      const adjustedFlow =
        flow.period === 0 ? flow.netFlow : flow.netFlow * multiplier;
      const discountFactor = Math.pow(1 + discountRate / 100, flow.period);
      npv += adjustedFlow / discountFactor;
    });
    return npv;
  };

  const addCashFlowPeriod = () => {
    const lastPeriod = cashFlows[cashFlows.length - 1];
    const newPeriod = {
      period: lastPeriod.period + 1,
      inflow: lastPeriod.inflow,
      outflow: lastPeriod.outflow,
      netFlow: lastPeriod.netFlow,
    };
    setCashFlows([...cashFlows, newPeriod]);
  };

  const removeCashFlowPeriod = (index: number) => {
    if (cashFlows.length > 2) {
      setCashFlows(cashFlows.filter((_, i) => i !== index));
    }
  };

  const updateCashFlow = (
    index: number,
    field: keyof CashFlow,
    value: number,
  ) => {
    const updated = [...cashFlows];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "inflow" || field === "outflow") {
      updated[index].netFlow = updated[index].inflow - updated[index].outflow;
    }

    setCashFlows(updated);
  };

  const exportFinancialAnalysis = async () => {
    await libraryLoader.waitForLibrary("jspdf");
    await libraryLoader.waitForLibrary("html2canvas");

    if (!window.jsPDF || !window.html2canvas || !npvResult) return;

    const pdf = new window.jsPDF("p", "mm", "a4");

    // Cover page
    pdf.setFontSize(24);
    pdf.text("ΟΙΚΟΝΟΜΙΚΗ ΑΝΑΛΥΣΗ", 105, 50, { align: "center" });
    pdf.setFontSize(16);
    pdf.text("KostoPro - Επαγγελματική Κοστολόγηση", 105, 70, {
      align: "center",
    });
    pdf.setFontSize(12);
    pdf.text(`Ημερομηνία: ${new Date().toLocaleDateString("el-GR")}`, 105, 90, {
      align: "center",
    });

    // Executive Summary
    pdf.addPage();
    pdf.setFontSize(18);
    pdf.text("ΣΥΝΟΨΗ ΑΠΟΤΕΛΕΣΜΑΤΩΝ", 20, 30);

    pdf.setFontSize(12);
    let y = 50;

    const summaryData = [
      [
        "NPV (Καθαρή Παρούσα Αξία)",
        `€${npvResult.npv.toLocaleString("el-GR")}`,
      ],
      ["IRR (Εσωτερικός Συντελεστής Απόδοσης)", `${npvResult.irr.toFixed(2)}%`],
      ["Περίοδος Αποπληρωμής", `${npvResult.paybackPeriod} χρόνια`],
      [
        "Προεξοφλημένη Περίοδος Αποπληρωμής",
        `${npvResult.discountedPayback} χρόνια`,
      ],
      ["Δείκτης Κερδοφορίας", npvResult.profitabilityIndex.toFixed(3)],
      ["Επιτόκιο Προεξόφλησης", `${discountRate}%`],
      ["Αρχική Επένδυση", `€${initialInvestment.toLocaleString("el-GR")}`],
    ];

    summaryData.forEach(([label, value]) => {
      pdf.text(`${label}:`, 20, y);
      pdf.text(value, 120, y);
      y += 10;
    });

    // Investment Recommendation
    y += 10;
    pdf.setFontSize(14);
    pdf.text("ΣΥΣΤΑΣΗ ΕΠΕΝΔΥΣΗΣ", 20, y);
    y += 10;

    pdf.setFontSize(12);
    const recommendation =
      npvResult.npv > 0
        ? "Η επένδυση συνιστάται καθώς το NPV είναι θετικό."
        : "Η επένδυση δεν συνιστάται καθώς το NPV είναι αρνητικό.";

    pdf.text(recommendation, 20, y);

    // Cash Flow Table
    pdf.addPage();
    pdf.setFontSize(18);
    pdf.text("ΤΑΜΕΙΑΚΕΣ ΡΟΕΣ", 20, 30);

    y = 50;
    pdf.setFontSize(10);

    // Table headers
    const headers = ["Περίοδος", "Εισροές (€)", "Εκροές (€)", "Καθαρή Ροή (€)"];
    let x = 20;
    headers.forEach((header, i) => {
      pdf.text(header, x, y);
      x += 40;
    });

    y += 10;

    // Table data
    cashFlows.forEach((flow) => {
      x = 20;
      pdf.text(flow.period.toString(), x, y);
      x += 40;
      pdf.text(flow.inflow.toLocaleString("el-GR"), x, y);
      x += 40;
      pdf.text(flow.outflow.toLocaleString("el-GR"), x, y);
      x += 40;
      pdf.text(flow.netFlow.toLocaleString("el-GR"), x, y);
      y += 8;
    });

    // Monte Carlo Results
    if (monteCarloResult) {
      pdf.addPage();
      pdf.setFontSize(18);
      pdf.text("ΑΝΑΛΥΣΗ MONTE CARLO", 20, 30);

      y = 50;
      pdf.setFontSize(12);

      const monteCarloData = [
        ["Μέσος NPV", `€${monteCarloResult.meanNPV.toLocaleString("el-GR")}`],
        [
          "Διάμεσος NPV",
          `€${monteCarloResult.medianNPV.toLocaleString("el-GR")}`,
        ],
        [
          "Τυπική Απόκλιση",
          `€${monteCarloResult.stdDeviation.toLocaleString("el-GR")}`,
        ],
        [
          "Διάστημα Εμπιστοσύνης 95%",
          `€${monteCarloResult.confidenceInterval[0].toLocaleString("el-GR")} - €${monteCarloResult.confidenceInterval[1].toLocaleString("el-GR")}`,
        ],
        [
          "Πιθανότητα Θετικού NPV",
          `${(monteCarloResult.probabilityPositive * 100).toFixed(1)}%`,
        ],
      ];

      monteCarloData.forEach(([label, value]) => {
        pdf.text(`${label}:`, 20, y);
        pdf.text(value, 120, y);
        y += 10;
      });
    }

    pdf.save(`financial-analysis-${Date.now()}.pdf`);
  };

  const exportToExcel = async () => {
    await libraryLoader.waitForLibrary("xlsx");
    if (!window.XLSX || !npvResult) return;

    const wb = window.XLSX.utils.book_new();

    // Summary sheet
    const summaryData = [
      ["ΟΙΚΟΝΟΜΙΚΗ ΑΝΑΛΥΣΗ - ΣΥΝΟΨΗ", ""],
      ["Ημερομηνία", new Date().toLocaleDateString("el-GR")],
      [""],
      ["ΒΑΣΙΚΑ ΑΠΟΤΕΛΕΣΜΑΤΑ", ""],
      ["NPV (€)", npvResult.npv],
      ["IRR (%)", npvResult.irr],
      ["Περίοδος Αποπληρωμής (χρόνια)", npvResult.paybackPeriod],
      [
        "Προεξοφλημένη Περίοδος Αποπληρωμής (χρόνια)",
        npvResult.discountedPayback,
      ],
      ["Δείκτης Κερδοφορίας", npvResult.profitabilityIndex],
      [""],
      ["ΠΑΡΑΜΕΤΡΟΙ", ""],
      ["Επιτόκιο Προεξόφλησης (%)", discountRate],
      ["Αρχική Επένδυση (€)", initialInvestment],
    ];

    const summaryWs = window.XLSX.utils.aoa_to_sheet(summaryData);
    window.XLSX.utils.book_append_sheet(wb, summaryWs, "Σύνοψη");

    // Cash flows sheet
    const cashFlowData = [
      [
        "Περίοδος",
        "Εισροές (€)",
        "Εκροές (€)",
        "Καθαρή Ροή (€)",
        "Πα��ούσα Αξία (€)",
      ],
      ...cashFlows.map((flow) => {
        const pv = flow.netFlow / Math.pow(1 + discountRate / 100, flow.period);
        return [flow.period, flow.inflow, flow.outflow, flow.netFlow, pv];
      }),
    ];

    const cashFlowWs = window.XLSX.utils.aoa_to_sheet(cashFlowData);
    window.XLSX.utils.book_append_sheet(wb, cashFlowWs, "Ταμειακές Ροές");

    // Monte Carlo sheet
    if (monteCarloResult) {
      const monteCarloData = [
        ["ΑΝΑΛΥΣΗ MONTE CARLO", ""],
        ["Αριθμός Προσομοιώσεων", simulations],
        [""],
        ["ΣΤΑΤΙΣΤΙΚΑ", ""],
        ["Μέσος NPV (€)", monteCarloResult.meanNPV],
        ["Διάμεσος NPV (€)", monteCarloResult.medianNPV],
        ["Τυπική Απόκλιση (€)", monteCarloResult.stdDeviation],
        ["Κατώτερο Όριο 95% (€)", monteCarloResult.confidenceInterval[0]],
        ["Ανώτερο Όριο 95% (€)", monteCarloResult.confidenceInterval[1]],
        [
          "Πιθανότητα Θετικού NPV (%)",
          monteCarloResult.probabilityPositive * 100,
        ],
        [""],
        ["ΕΚΑΤΟΣΤΗΜΟΡΙΑ", ""],
        ["5η Εκατοστημόριο (€)", monteCarloResult.percentiles["5"]],
        ["10η Εκατοστημόριο (€)", monteCarloResult.percentiles["10"]],
        ["25η Εκατοστημόριο (€)", monteCarloResult.percentiles["25"]],
        ["75η Εκατοστημόριο (€)", monteCarloResult.percentiles["75"]],
        ["90η Εκατοστημόριο (€)", monteCarloResult.percentiles["90"]],
        ["95η Εκατοστημόριο (€)", monteCarloResult.percentiles["95"]],
      ];

      const monteCarloWs = window.XLSX.utils.aoa_to_sheet(monteCarloData);
      window.XLSX.utils.book_append_sheet(wb, monteCarloWs, "Monte Carlo");
    }

    window.XLSX.writeFile(wb, `financial-models-${Date.now()}.xlsx`);
  };

  return (
    <div id="financial-models-section" className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Χρηματοοικονομικά Μοντέλα</h2>
          <p className="text-gray-600 dark:text-gray-300">
            NPV, IRR και ανάλυση Monte Carlo για επενδυτικές αποφάσεις
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            id="export-financial"
            onClick={exportFinancialAnalysis}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            PDF Export
          </Button>

          <Button
            id="csv-download-financial"
            onClick={exportToExcel}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Excel Export
          </Button>
        </div>
      </div>

      {/* Input Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Παράμετροι Ανάλυσης
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="initial-investment-input">
                Αρχική Επένδυση (€)
              </Label>
              <Input
                id="initial-investment-input"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                step="1000"
              />
            </div>

            <div>
              <Label htmlFor="discount-rate-input">
                Επιτόκιο Προεξόφλησης (%)
              </Label>
              <Input
                id="discount-rate-input"
                type="number"
                value={discountRate}
                onChange={(e) => setDiscountRate(Number(e.target.value))}
                step="0.1"
                min="0"
                max="50"
              />
            </div>

            <div>
              <Label htmlFor="simulations-input">
                Προσομοιώσεις Monte Carlo
              </Label>
              <Input
                id="simulations-input"
                type="number"
                value={simulations}
                onChange={(e) => setSimulations(Number(e.target.value))}
                step="1000"
                min="1000"
                max="100000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Ταμειακές Ροές
            </CardTitle>

            <Button
              onClick={addCashFlowPeriod}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Προσθήκη Περιόδου
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table id="cashflows-table" className="pro-table">
              <thead>
                <tr>
                  <th>Περίοδος</th>
                  <th>Εισροές (€)</th>
                  <th>Εκροές (€)</th>
                  <th>Καθαρή Ροή (€)</th>
                  <th>Παρούσα Αξία (€)</th>
                  <th>Ενέργειες</th>
                </tr>
              </thead>
              <tbody>
                {cashFlows.map((flow, index) => {
                  const presentValue =
                    flow.netFlow /
                    Math.pow(1 + discountRate / 100, flow.period);

                  return (
                    <tr key={index}>
                      <td className="font-medium">{flow.period}</td>
                      <td>
                        <Input
                          type="number"
                          value={flow.inflow}
                          onChange={(e) =>
                            updateCashFlow(
                              index,
                              "inflow",
                              Number(e.target.value),
                            )
                          }
                          className="w-full"
                          step="1000"
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          value={flow.outflow}
                          onChange={(e) =>
                            updateCashFlow(
                              index,
                              "outflow",
                              Number(e.target.value),
                            )
                          }
                          className="w-full"
                          step="1000"
                        />
                      </td>
                      <td
                        className={`font-medium ${flow.netFlow >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        €{flow.netFlow.toLocaleString("el-GR")}
                      </td>
                      <td className="text-right">
                        €{presentValue.toLocaleString("el-GR")}
                      </td>
                      <td>
                        {index > 1 && (
                          <Button
                            onClick={() => removeCashFlowPeriod(index)}
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button
          id="calculate-npv"
          onClick={calculateNPV}
          className="flex items-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          Υπολογισμός NPV/IRR
        </Button>

        <Button
          id="run-montecarlo"
          onClick={runMonteCarloSimulation}
          variant="outline"
          className="flex items-center gap-2"
          disabled={isCalculating}
        >
          <RefreshCw
            className={`w-4 h-4 ${isCalculating ? "animate-spin" : ""}`}
          />
          Εκτέλεση Monte Carlo
        </Button>
      </div>

      {/* Results Summary */}
      {npvResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                NPV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div
                  id="npv-value"
                  className={`counter text-3xl font-bold ${npvResult.npv >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  €{npvResult.npv.toLocaleString("el-GR")}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {npvResult.npv >= 0 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {npvResult.npv >= 0 ? "Συνιστάται" : "Δεν συνιστάται"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5" />
                IRR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div id="irr-value" className="counter text-3xl font-bold">
                  {npvResult.irr.toFixed(2)}%
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {npvResult.irr >= discountRate ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    vs {discountRate}% στόχος
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Αποπληρωμή
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Απλή:
                  </span>
                  <span className="font-medium">
                    {npvResult.paybackPeriod} χρόνια
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Προεξοφλημένη:
                  </span>
                  <span className="font-medium">
                    {npvResult.discountedPayback} χρόνια
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Δείκτης Κερδοφορίας:
                  </span>
                  <span className="font-medium">
                    {npvResult.profitabilityIndex.toFixed(3)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Monte Carlo Results */}
      {monteCarloResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Αποτελέσματα Monte Carlo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Μέσος NPV
                </h4>
                <div className="counter text-xl font-bold">
                  €{monteCarloResult.meanNPV.toLocaleString("el-GR")}
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Τυπική Απόκλιση
                </h4>
                <div className="counter text-xl font-bold">
                  €{monteCarloResult.stdDeviation.toLocaleString("el-GR")}
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Πιθανότητα Θετικού NPV
                </h4>
                <div
                  className={`counter text-xl font-bold ${monteCarloResult.probabilityPositive >= 0.5 ? "text-green-600" : "text-red-600"}`}
                >
                  {(monteCarloResult.probabilityPositive * 100).toFixed(1)}%
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Διάστημα Εμπιστοσύνης 95%
                </h4>
                <div className="text-sm">
                  <div>
                    €
                    {monteCarloResult.confidenceInterval[0].toLocaleString(
                      "el-GR",
                    )}
                  </div>
                  <div>
                    €
                    {monteCarloResult.confidenceInterval[1].toLocaleString(
                      "el-GR",
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ανάλυση Ευαισθησίας NPV</CardTitle>
          </CardHeader>
          <CardContent>
            <div id="npv-chart" className="h-64">
              <canvas ref={npvChartRef} className="w-full h-full" />
            </div>
          </CardContent>
        </Card>

        {monteCarloResult && (
          <Card>
            <CardHeader>
              <CardTitle>Κατανομή Monte Carlo</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="montecarlo-chart" className="h-64">
                <canvas ref={monteCarloChartRef} className="w-full h-full" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {npvResult && (
        <Card>
          <CardHeader>
            <CardTitle>Ανάλυση Ευαισθησίας (Tornado Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <div id="tornado-financial" className="h-64">
              <canvas ref={tornadoChartRef} className="w-full h-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {isCalculating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>Εκτέλεση ανάλυσης Monte Carlo...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialModels;
