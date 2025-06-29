import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Save,
  Trash2,
  Copy,
  Play,
  BarChart3,
  TrendingUp,
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
} from "lucide-react";
import { libraryLoader } from "@/utils/libraryLoader";

interface Scenario {
  id: string;
  name: string;
  description: string;
  parameters: ScenarioParameters;
  results?: ScenarioResults;
  createdAt: number;
  updatedAt: number;
}

interface ScenarioParameters {
  rawMaterialCost: number;
  laborCost: number;
  energyCost: number;
  transportCost: number;
  overhead: number;
  productionVolume: number;
  sellingPrice: number;
  wastageRate: number;
  efficiency: number;
  seasonalFactor: number;
}

interface ScenarioResults {
  totalCost: number;
  unitCost: number;
  grossProfit: number;
  profitMargin: number;
  breakEvenPoint: number;
  roi: number;
}

interface ScenarioTemplate {
  id: string;
  name: string;
  description: string;
  parameters: Partial<ScenarioParameters>;
}

const ScenarioAnalysis: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [scenarioA, setScenarioA] = useState<string | null>(null);
  const [scenarioB, setScenarioB] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingScenario, setEditingScenario] = useState<Scenario | null>(null);
  const [templates, setTemplates] = useState<ScenarioTemplate[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const tornadoChartRef = useRef<HTMLCanvasElement>(null);

  const defaultParameters: ScenarioParameters = {
    rawMaterialCost: 100,
    laborCost: 50,
    energyCost: 20,
    transportCost: 15,
    overhead: 30,
    productionVolume: 1000,
    sellingPrice: 300,
    wastageRate: 5,
    efficiency: 85,
    seasonalFactor: 1.0,
  };

  const scenarioTemplates: ScenarioTemplate[] = [
    {
      id: "conservative",
      name: "Συντηρητικό Σενάριο",
      description: "Χαμηλή ανάπτυξη με ελάχιστους κινδύνους",
      parameters: {
        rawMaterialCost: 120,
        laborCost: 60,
        efficiency: 75,
        wastageRate: 8,
      },
    },
    {
      id: "optimistic",
      name: "Αισιόδοξο Σενάριο",
      description: "Υψηλή ανάπτυξη με βελτιστοποίηση",
      parameters: {
        rawMaterialCost: 80,
        laborCost: 40,
        efficiency: 95,
        wastageRate: 3,
      },
    },
    {
      id: "realistic",
      name: "Ρεαλιστικό Σενάριο",
      description: "Μέτρια ανάπτυξη με κανονικές συνθήκες",
      parameters: {
        rawMaterialCost: 100,
        laborCost: 50,
        efficiency: 85,
        wastageRate: 5,
      },
    },
  ];

  useEffect(() => {
    loadScenarios();
    setTemplates(scenarioTemplates);
  }, []);

  useEffect(() => {
    if (comparisonMode && scenarioA && scenarioB) {
      updateComparisonCharts();
    }
  }, [comparisonMode, scenarioA, scenarioB]);

  const loadScenarios = () => {
    const saved = localStorage.getItem("costingScenarios");
    if (saved) {
      setScenarios(JSON.parse(saved));
    } else {
      // Create initial demo scenarios
      const demoScenarios = [
        createScenario(
          "Βασικό Σενάριο",
          "Τρέχουσες συνθήκες παραγωγής",
          defaultParameters,
        ),
        createScenario(
          "Βελτιστοποίηση",
          "Μειωμένα κόστη και αυξημένη αποδοτικότητα",
          {
            ...defaultParameters,
            rawMaterialCost: 85,
            efficiency: 92,
            wastageRate: 3,
          },
        ),
      ];
      setScenarios(demoScenarios);
      saveScenarios(demoScenarios);
    }
  };

  const saveScenarios = (scenariosToSave: Scenario[]) => {
    localStorage.setItem("costingScenarios", JSON.stringify(scenariosToSave));
  };

  const createScenario = (
    name: string,
    description: string,
    parameters: ScenarioParameters,
  ): Scenario => {
    const results = calculateScenario(parameters);
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      description,
      parameters,
      results,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  };

  const calculateScenario = (
    parameters: ScenarioParameters,
  ): ScenarioResults => {
    const adjustedVolume =
      parameters.productionVolume *
      (parameters.efficiency / 100) *
      (1 - parameters.wastageRate / 100);
    const totalRawMaterial =
      parameters.rawMaterialCost *
      parameters.productionVolume *
      parameters.seasonalFactor;
    const totalLabor = parameters.laborCost * parameters.productionVolume;
    const totalEnergy = parameters.energyCost * parameters.productionVolume;
    const totalTransport = parameters.transportCost;
    const totalOverhead = parameters.overhead * parameters.productionVolume;

    const totalCost =
      totalRawMaterial +
      totalLabor +
      totalEnergy +
      totalTransport +
      totalOverhead;
    const unitCost = totalCost / adjustedVolume;
    const revenue = parameters.sellingPrice * adjustedVolume;
    const grossProfit = revenue - totalCost;
    const profitMargin = (grossProfit / revenue) * 100;
    const breakEvenPoint = totalCost / parameters.sellingPrice;
    const roi = (grossProfit / totalCost) * 100;

    return {
      totalCost,
      unitCost,
      grossProfit,
      profitMargin,
      breakEvenPoint,
      roi,
    };
  };

  const updateScenarios = () => {
    const updatedScenarios = scenarios.map((scenario) => ({
      ...scenario,
      results: calculateScenario(scenario.parameters),
      updatedAt: Date.now(),
    }));
    setScenarios(updatedScenarios);
    saveScenarios(updatedScenarios);
  };

  const handleSaveScenario = (formData: FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const parameters: ScenarioParameters = {
      rawMaterialCost: Number(formData.get("rawMaterialCost")),
      laborCost: Number(formData.get("laborCost")),
      energyCost: Number(formData.get("energyCost")),
      transportCost: Number(formData.get("transportCost")),
      overhead: Number(formData.get("overhead")),
      productionVolume: Number(formData.get("productionVolume")),
      sellingPrice: Number(formData.get("sellingPrice")),
      wastageRate: Number(formData.get("wastageRate")),
      efficiency: Number(formData.get("efficiency")),
      seasonalFactor: Number(formData.get("seasonalFactor")),
    };

    if (editingScenario) {
      const updatedScenarios = scenarios.map((s) =>
        s.id === editingScenario.id
          ? {
              ...s,
              name,
              description,
              parameters,
              results: calculateScenario(parameters),
              updatedAt: Date.now(),
            }
          : s,
      );
      setScenarios(updatedScenarios);
      saveScenarios(updatedScenarios);
    } else {
      const newScenario = createScenario(name, description, parameters);
      const updatedScenarios = [...scenarios, newScenario];
      setScenarios(updatedScenarios);
      saveScenarios(updatedScenarios);
    }

    setShowModal(false);
    setEditingScenario(null);
  };

  const deleteScenario = (id: string) => {
    if (confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το σενάριο;")) {
      const updatedScenarios = scenarios.filter((s) => s.id !== id);
      setScenarios(updatedScenarios);
      saveScenarios(updatedScenarios);

      if (selectedScenario === id) setSelectedScenario(null);
      if (scenarioA === id) setScenarioA(null);
      if (scenarioB === id) setScenarioB(null);
    }
  };

  const duplicateScenario = (scenario: Scenario) => {
    const newScenario = createScenario(
      `${scenario.name} (Αντίγραφο)`,
      scenario.description,
      scenario.parameters,
    );
    const updatedScenarios = [...scenarios, newScenario];
    setScenarios(updatedScenarios);
    saveScenarios(updatedScenarios);
  };

  const applyTemplate = (template: ScenarioTemplate) => {
    const parameters = { ...defaultParameters, ...template.parameters };
    setEditingScenario(
      createScenario(template.name, template.description, parameters),
    );
    setShowModal(true);
  };

  const updateComparisonCharts = async () => {
    await libraryLoader.waitForLibrary("chart");
    if (!window.Chart || !chartRef.current || !scenarioA || !scenarioB) return;

    const scA = scenarios.find((s) => s.id === scenarioA);
    const scB = scenarios.find((s) => s.id === scenarioB);
    if (!scA || !scB || !scA.results || !scB.results) return;

    // Comparison bar chart
    new window.Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: [
          "Συνολικό Κόστος",
          "Κόστος/Μονάδα",
          "Καθαρό Κέρδος",
          "Περιθώριο %",
        ],
        datasets: [
          {
            label: scA.name,
            data: [
              scA.results.totalCost,
              scA.results.unitCost,
              scA.results.grossProfit,
              scA.results.profitMargin,
            ],
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 1,
          },
          {
            label: scB.name,
            data: [
              scB.results.totalCost,
              scB.results.unitCost,
              scB.results.grossProfit,
              scB.results.profitMargin,
            ],
            backgroundColor: "rgba(16, 185, 129, 0.8)",
            borderColor: "rgb(16, 185, 129)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    // Tornado chart for sensitivity analysis
    if (tornadoChartRef.current) {
      const sensitivityData = calculateSensitivityAnalysis(scA.parameters);

      new window.Chart(tornadoChartRef.current, {
        type: "bar",
        data: {
          labels: [
            "Πρώτες Ύλες",
            "Εργατικά",
            "Ενέργεια",
            "Μεταφορικά",
            "Γενικά Έξοδα",
          ],
          datasets: [
            {
              label: "Επίδραση στο Κόστος",
              data: sensitivityData,
              backgroundColor: [
                "rgba(239, 68, 68, 0.8)",
                "rgba(245, 158, 11, 0.8)",
                "rgba(59, 130, 246, 0.8)",
                "rgba(16, 185, 129, 0.8)",
                "rgba(139, 92, 246, 0.8)",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          indexAxis: "y",
          plugins: {
            legend: { display: false },
          },
        },
      });
    }
  };

  const calculateSensitivityAnalysis = (
    parameters: ScenarioParameters,
  ): number[] => {
    const baseResults = calculateScenario(parameters);
    const sensitivity = [];

    // Test 10% increase for each parameter
    const testParams = [
      { ...parameters, rawMaterialCost: parameters.rawMaterialCost * 1.1 },
      { ...parameters, laborCost: parameters.laborCost * 1.1 },
      { ...parameters, energyCost: parameters.energyCost * 1.1 },
      { ...parameters, transportCost: parameters.transportCost * 1.1 },
      { ...parameters, overhead: parameters.overhead * 1.1 },
    ];

    testParams.forEach((testParam) => {
      const testResults = calculateScenario(testParam);
      const impact =
        ((testResults.totalCost - baseResults.totalCost) /
          baseResults.totalCost) *
        100;
      sensitivity.push(impact);
    });

    return sensitivity;
  };

  const exportScenario = async (scenario: Scenario) => {
    await libraryLoader.waitForLibrary("xlsx");
    if (!window.XLSX) return;

    const wb = window.XLSX.utils.book_new();

    // Scenario data
    const scenarioData = [
      ["Όνομα Σεναρίου", scenario.name],
      ["Περιγραφή", scenario.description],
      [
        "Ημερομηνία Δημιουργίας",
        new Date(scenario.createdAt).toLocaleString("el-GR"),
      ],
      [""],
      ["ΠΑΡΑΜΕΤΡΟΙ", ""],
      ["Κόστος Πρώτων Υλών", scenario.parameters.rawMaterialCost],
      ["Εργατικό Κόστος", scenario.parameters.laborCost],
      ["Κόστος Ενέργειας", scenario.parameters.energyCost],
      ["Κόστος Μεταφοράς", scenario.parameters.transportCost],
      ["Γενικά Έξοδα", scenario.parameters.overhead],
      ["Όγκος Παραγωγής", scenario.parameters.productionVolume],
      ["Τιμή Πώλησης", scenario.parameters.sellingPrice],
      ["Ποσοστό Απωλειών (%)", scenario.parameters.wastageRate],
      ["Αποδοτικότητα (%)", scenario.parameters.efficiency],
      ["Εποχιακός Συντελεστής", scenario.parameters.seasonalFactor],
      [""],
      ["ΑΠΟΤΕΛΕΣΜΑΤΑ", ""],
      ["Συνολικό Κόστος", scenario.results?.totalCost],
      ["Κόστος ανά Μονάδα", scenario.results?.unitCost],
      ["Καθαρό Κέρδος", scenario.results?.grossProfit],
      ["Περιθώριο Κέρδους (%)", scenario.results?.profitMargin],
      ["Σημείο Νεκρού", scenario.results?.breakEvenPoint],
      ["ROI (%)", scenario.results?.roi],
    ];

    const ws = window.XLSX.utils.aoa_to_sheet(scenarioData);
    window.XLSX.utils.book_append_sheet(wb, ws, "Σενάριο");

    window.XLSX.writeFile(wb, `scenario-${scenario.name}-${Date.now()}.xlsx`);
  };

  const shareScenario = (scenario: Scenario) => {
    const shareData = {
      title: `Σενάριο: ${scenario.name}`,
      text: `Δείτε το σενάριο κοστολόγησης: ${scenario.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(JSON.stringify(scenario, null, 2));
      alert("Τα δεδομένα του σεναρίου αντιγράφηκαν στο clipboard!");
    }
  };

  return (
    <div id="scenario-analysis" className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Ανάλυση Σεναρίων</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Δημιουργήστε και συγκρίνετε διαφορετικά σενάρια κοστολόγησης
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            id="scenario-new"
            onClick={() => {
              setEditingScenario(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Νέο Σενάριο
          </Button>

          <Button
            onClick={updateScenarios}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Ανανέωση
          </Button>

          <Button
            id="comparison-toggle"
            onClick={() => setComparisonMode(!comparisonMode)}
            variant={comparisonMode ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Σύγκριση
          </Button>
        </div>
      </div>

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Προκαθορισμένα Πρότυπα</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            id="template-list"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {templates.map((template) => (
              <div
                key={template.id}
                className="template-btn p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => applyTemplate(template)}
              >
                <h4 className="font-medium">{template.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {template.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scenario Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Διαθέσιμα Σενάρια</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              id="scenario-select"
              className="w-full p-3 border rounded-lg"
              value={selectedScenario || ""}
              onChange={(e) => setSelectedScenario(e.target.value || null)}
            >
              <option value="">Επιλέξτε σενάριο...</option>
              {scenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        {comparisonMode && (
          <Card>
            <CardHeader>
              <CardTitle>Σύγκριση Σεναρίων</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Σενάριο A</Label>
                  <select
                    className="w-full p-3 border rounded-lg mt-1"
                    value={scenarioA || ""}
                    onChange={(e) => setScenarioA(e.target.value || null)}
                  >
                    <option value="">Επιλέξτε σενάριο A...</option>
                    {scenarios.map((scenario) => (
                      <option key={scenario.id} value={scenario.id}>
                        {scenario.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Σενάριο B</Label>
                  <select
                    className="w-full p-3 border rounded-lg mt-1"
                    value={scenarioB || ""}
                    onChange={(e) => setScenarioB(e.target.value || null)}
                  >
                    <option value="">Επιλέξτε σενάριο B...</option>
                    {scenarios.map((scenario) => (
                      <option key={scenario.id} value={scenario.id}>
                        {scenario.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{scenario.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {scenario.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingScenario(scenario);
                      setShowModal(true);
                    }}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => duplicateScenario(scenario)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteScenario(scenario.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {scenario.results && (
                <div id="scenario-summary" className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="counter">
                      <Label className="text-xs text-gray-500">
                        Συνολικό Κόστος
                      </Label>
                      <p className="text-lg font-bold">
                        €{scenario.results.totalCost.toLocaleString("el-GR")}
                      </p>
                    </div>
                    <div className="counter">
                      <Label className="text-xs text-gray-500">Κέρδος</Label>
                      <p className="text-lg font-bold text-green-600">
                        €{scenario.results.grossProfit.toLocaleString("el-GR")}
                      </p>
                    </div>
                    <div className="counter">
                      <Label className="text-xs text-gray-500">Περιθώριο</Label>
                      <p className="text-lg font-bold">
                        {scenario.results.profitMargin.toFixed(1)}%
                      </p>
                    </div>
                    <div className="counter">
                      <Label className="text-xs text-gray-500">ROI</Label>
                      <p className="text-lg font-bold">
                        {scenario.results.roi.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => exportScenario(scenario)}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Εξαγωγή
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => shareScenario(scenario)}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Share2 className="w-3 h-3" />
                      Κοινοποίηση
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Charts */}
      {comparisonMode && scenarioA && scenarioB && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Σύγκριση Σεναρίων</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <canvas ref={chartRef} className="w-full h-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ανάλυση Ευαισθησίας (Tornado Chart)</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="tornado-chart" className="h-64">
                <canvas ref={tornadoChartRef} className="w-full h-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Scenario Modal */}
      {showModal && (
        <div
          id="scenario-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <form
              id="scenario-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveScenario(new FormData(e.currentTarget));
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">
                    {editingScenario ? "Επεξεργασία Σεναρίου" : "Νέο Σενάριο"}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Όνομα Σεναρίου</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingScenario?.name || ""}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Περιγραφή</Label>
                      <Input
                        id="description"
                        name="description"
                        defaultValue={editingScenario?.description || ""}
                      />
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Παράμετροι Κόστους</h4>

                      {[
                        {
                          key: "rawMaterialCost",
                          label: "Πρώτες Ύλες (€)",
                          step: "0.01",
                        },
                        {
                          key: "laborCost",
                          label: "Εργατικά (€)",
                          step: "0.01",
                        },
                        {
                          key: "energyCost",
                          label: "Ενέργεια (€)",
                          step: "0.01",
                        },
                        {
                          key: "transportCost",
                          label: "Μεταφορικά (€)",
                          step: "0.01",
                        },
                        {
                          key: "overhead",
                          label: "Γενικά Έξοδα (€)",
                          step: "0.01",
                        },
                      ].map((field) => (
                        <div key={field.key}>
                          <Label htmlFor={field.key}>{field.label}</Label>
                          <Input
                            id={field.key}
                            name={field.key}
                            type="number"
                            step={field.step}
                            defaultValue={
                              editingScenario?.parameters[
                                field.key as keyof ScenarioParameters
                              ] ||
                              defaultParameters[
                                field.key as keyof ScenarioParameters
                              ]
                            }
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Παράμετροι Παραγωγής</h4>

                    {[
                      {
                        key: "productionVolume",
                        label: "Όγκος Παραγωγής (kg)",
                        step: "1",
                      },
                      {
                        key: "sellingPrice",
                        label: "Τιμή Πώλησης (€)",
                        step: "0.01",
                      },
                      {
                        key: "wastageRate",
                        label: "Ποσοστό Απωλειών (%)",
                        step: "0.1",
                      },
                      {
                        key: "efficiency",
                        label: "Αποδοτικότητα (%)",
                        step: "0.1",
                      },
                      {
                        key: "seasonalFactor",
                        label: "Εποχιακός Συντελεστής",
                        step: "0.01",
                      },
                    ].map((field) => (
                      <div key={field.key}>
                        <Label htmlFor={field.key}>{field.label}</Label>
                        <Input
                          id={field.key}
                          name={field.key}
                          type="number"
                          step={field.step}
                          defaultValue={
                            editingScenario?.parameters[
                              field.key as keyof ScenarioParameters
                            ] ||
                            defaultParameters[
                              field.key as keyof ScenarioParameters
                            ]
                          }
                          required
                          className="param-slider"
                        />
                      </div>
                    ))}

                    {editingScenario?.results && (
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h5 className="font-medium mb-3">
                          Τρέχοντα Αποτελέσματα
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-300">
                              Συνολικό Κόστος:
                            </span>
                            <span className="font-medium ml-2">
                              €
                              {editingScenario.results.totalCost.toLocaleString(
                                "el-GR",
                              )}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-300">
                              Κέρδος:
                            </span>
                            <span className="font-medium ml-2">
                              €
                              {editingScenario.results.grossProfit.toLocaleString(
                                "el-GR",
                              )}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-300">
                              Περιθώριο:
                            </span>
                            <span className="font-medium ml-2">
                              {editingScenario.results.profitMargin.toFixed(1)}%
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-300">
                              ROI:
                            </span>
                            <span className="font-medium ml-2">
                              {editingScenario.results.roi.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Ακύρωση
                  </Button>
                  <Button
                    id="scenario-save"
                    type="submit"
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Αποθήκευση
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioAnalysis;
