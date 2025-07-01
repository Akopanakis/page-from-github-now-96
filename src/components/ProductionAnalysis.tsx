import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "recharts";
import {
  Factory,
  TrendingUp,
  Calculator,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  ArrowUp,
  ArrowDown,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProductionAnalysisProps {
  formData: any;
  results: any;
}

interface ProductionParameters {
  labor: number; // Εργασία (L)
  capital: number; // Κεφάλαιο (K)
  technology: number; // Τεχνολογία (A)
  laborElasticity: number; // α - ελαστικότητα εργασίας
  capitalElasticity: number; // β - ελαστικότητα κεφαλαίου
  laborCost: number; // Κόστος εργασίας ανά μονάδα
  capitalCost: number; // Κόστος κεφαλαίου ανά μονάδα
}

const ProductionAnalysis: React.FC<ProductionAnalysisProps> = ({
  formData,
  results,
}) => {
  const [parameters, setParameters] = useState<ProductionParameters>({
    labor: 10,
    capital: 8,
    technology: 1.2,
    laborElasticity: 0.65,
    capitalElasticity: 0.35,
    laborCost: 25, // €/ώρα
    capitalCost: 150, // €/ημέρα
  });

  const [activeProductionTab, setActiveProductionTab] = useState("function");

  // Υπολογισμός συνάρτησης παραγωγής Cobb-Douglas
  const calculateCobbDouglas = (
    L: number,
    K: number,
    A: number,
    α: number,
    β: number,
  ): number => {
    return A * Math.pow(L, α) * Math.pow(K, β);
  };

  // Υπολογισμός οριακής παραγωγικότητας εργασίας
  const calculateMarginalProductLabor = (
    L: number,
    K: number,
    A: number,
    α: number,
    β: number,
  ): number => {
    return α * A * Math.pow(L, α - 1) * Math.pow(K, β);
  };

  // Υπολογισμός οριακής παραγωγικότητας κεφαλαίου
  const calculateMarginalProductCapital = (
    L: number,
    K: number,
    A: number,
    α: number,
    β: number,
  ): number => {
    return β * A * Math.pow(L, α) * Math.pow(K, β - 1);
  };

  // Υπολογισμός μέσης παραγωγικότητας
  const calculateAverageProductLabor = (Q: number, L: number): number => {
    return L > 0 ? Q / L : 0;
  };

  // Υπολογισμός ελαστικότητας παραγωγής
  const calculateElasticity = (Q: number, L: number, α: number): number => {
    return α;
  };

  // Υπολ��γισμός άριστου επιπέδου παραγωγής
  const calculateOptimalProduction = () => {
    const {
      labor,
      capital,
      technology,
      laborElasticity,
      capitalElasticity,
      laborCost,
      capitalCost,
    } = parameters;

    // MRTS = MPL/MPK = w/r για βέλτιστη κατανομή
    const wageRentRatio = laborCost / capitalCost;
    const mrts = (laborElasticity / capitalElasticity) * (capital / labor);

    const isOptimal = Math.abs(mrts - wageRentRatio) < 0.1;

    return {
      isOptimal,
      mrts,
      wageRentRatio,
      recommendation: isOptimal
        ? "Η κατανομή πόρων είναι βέλτιστη"
        : mrts > wageRentRatio
          ? "Αυξήστε την εργασία, μειώστε το κεφάλαιο"
          : "Αυξήστε το κεφάλαιο, μειώστε την εργασία",
    };
  };

  // Δημιουργία δεδομένων για γραφήματα
  const generateProductionData = () => {
    const data = [];
    const { capital, technology, laborElasticity, capitalElasticity } =
      parameters;

    for (let L = 1; L <= 20; L += 0.5) {
      const Q = calculateCobbDouglas(
        L,
        capital,
        technology,
        laborElasticity,
        capitalElasticity,
      );
      const MPL = calculateMarginalProductLabor(
        L,
        capital,
        technology,
        laborElasticity,
        capitalElasticity,
      );
      const APL = calculateAverageProductLabor(Q, L);

      data.push({
        labor: L,
        totalProduct: Q,
        marginalProduct: MPL,
        averageProduct: APL,
        stage: MPL > APL ? 1 : MPL > 0 ? 2 : 3,
      });
    }

    return data;
  };

  // Δημιουργία isoquant curves
  const generateIsoquantData = () => {
    const data = [];
    const { technology, laborElasticity, capitalElasticity } = parameters;
    const targetOutputs = [50, 75, 100, 125, 150];

    targetOutputs.forEach((Q) => {
      const isoquant = [];
      for (let L = 2; L <= 20; L += 1) {
        // K = (Q / (A * L^α))^(1/β)
        const K = Math.pow(
          Q / (technology * Math.pow(L, laborElasticity)),
          1 / capitalElasticity,
        );
        if (K > 0 && K < 30) {
          isoquant.push({ labor: L, capital: K, output: Q });
        }
      }
      data.push(...isoquant);
    });

    return data;
  };

  // Υπολογισμός οικονομιών κλίμακας
  const calculateReturnsToScale = () => {
    const { laborElasticity, capitalElasticity } = parameters;
    const sum = laborElasticity + capitalElasticity;

    let type = "";
    let description = "";

    if (sum > 1.05) {
      type = "Αύξουσες Αποδόσεις Κλίμακας";
      description =
        "Η διπλασιασμός των εισροών οδηγεί σε περισσότερο από διπλάσια παραγωγή";
    } else if (sum < 0.95) {
      type = "Φθίνουσες Αποδόσεις Κλίμακας";
      description =
        "Η διπλασιασμός των εισροών οδηγεί σε λιγότερο από διπλάσια παραγωγή";
    } else {
      type = "Σταθερές Αποδόσεις Κλίμακας";
      description =
        "Η διπλασιασμός των εισροών οδηγεί σε ακριβώς διπλάσια παραγωγή";
    }

    return { sum, type, description };
  };

  // Δεδομένα κόστους για αιχμάλευση θαλασσινών
  const generateSeafoodCostData = () => {
    const data = [];
    const { laborCost, capitalCost } = parameters;

    for (let quantity = 10; quantity <= 200; quantity += 10) {
      // Μοντέλο κόστους για ιχθυοκαλλιέργεια
      const fixedCost = 2000; // Σταθερά κόστη (εγκαταστάσεις, άδειες)
      const variableCostPerUnit = 4.5 + (quantity > 100 ? 0.5 : 0); // Μεταβλητό κόστος ανά kg

      const totalVariable = quantity * variableCostPerUnit;
      const totalCost = fixedCost + totalVariable;
      const averageCost = totalCost / quantity;
      const marginalCost =
        quantity > 10
          ? variableCostPerUnit + (quantity > 100 ? 1 : 0)
          : variableCostPerUnit;

      data.push({
        quantity,
        totalCost,
        averageCost,
        marginalCost,
        fixedCost: fixedCost / quantity,
        variableCost: variableCostPerUnit,
      });
    }

    return data;
  };

  const productionData = generateProductionData();
  const isoquantData = generateIsoquantData();
  const costData = generateSeafoodCostData();
  const currentProduction = calculateCobbDouglas(
    parameters.labor,
    parameters.capital,
    parameters.technology,
    parameters.laborElasticity,
    parameters.capitalElasticity,
  );
  const marginalProducts = {
    labor: calculateMarginalProductLabor(
      parameters.labor,
      parameters.capital,
      parameters.technology,
      parameters.laborElasticity,
      parameters.capitalElasticity,
    ),
    capital: calculateMarginalProductCapital(
      parameters.labor,
      parameters.capital,
      parameters.technology,
      parameters.laborElasticity,
      parameters.capitalElasticity,
    ),
  };
  const returnsToScale = calculateReturnsToScale();
  const optimalProduction = calculateOptimalProduction();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Factory className="w-6 h-6" />
            Ανάλυση Παραγωγής & Οικονομική Θεωρία
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeProductionTab}
            onValueChange={setActiveProductionTab}
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="function">Συνάρτηση Παραγωγής</TabsTrigger>
              <TabsTrigger value="costs">Θεωρία Κόστους</TabsTrigger>
              <TabsTrigger value="optimization">Βελτιστοποίηση</TabsTrigger>
              <TabsTrigger value="elasticity">Ελαστικότητα</TabsTrigger>
              <TabsTrigger value="scale">Οικονομίες Κλίμακας</TabsTrigger>
            </TabsList>

            <TabsContent value="function" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Παράμετροι Παραγωγής */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Παράμετροι Cobb-Douglas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Εργασία (L): {parameters.labor} εργάτες</Label>
                      <Slider
                        value={[parameters.labor]}
                        onValueChange={([value]) =>
                          setParameters((prev) => ({ ...prev, labor: value }))
                        }
                        min={1}
                        max={30}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Κεφάλαιο (K): {parameters.capital} μηχανές</Label>
                      <Slider
                        value={[parameters.capital]}
                        onValueChange={([value]) =>
                          setParameters((prev) => ({ ...prev, capital: value }))
                        }
                        min={1}
                        max={20}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Τεχνολογία (A): {parameters.technology.toFixed(2)}
                      </Label>
                      <Slider
                        value={[parameters.technology]}
                        onValueChange={([value]) =>
                          setParameters((prev) => ({
                            ...prev,
                            technology: value,
                          }))
                        }
                        min={0.5}
                        max={2.0}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Ελαστικότητα Εργασίας (α):{" "}
                        {parameters.laborElasticity.toFixed(2)}
                      </Label>
                      <Slider
                        value={[parameters.laborElasticity]}
                        onValueChange={([value]) =>
                          setParameters((prev) => ({
                            ...prev,
                            laborElasticity: value,
                          }))
                        }
                        min={0.1}
                        max={0.9}
                        step={0.05}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Ελαστικότητα Κεφαλαίου (β):{" "}
                        {parameters.capitalElasticity.toFixed(2)}
                      </Label>
                      <Slider
                        value={[parameters.capitalElasticity]}
                        onValueChange={([value]) =>
                          setParameters((prev) => ({
                            ...prev,
                            capitalElasticity: value,
                          }))
                        }
                        min={0.1}
                        max={0.9}
                        step={0.05}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Αποτελέσματα Παραγωγής */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Αποτελέσματα Παραγωγής
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm text-blue-600">
                          Συνολική Παραγωγή
                        </div>
                        <div className="text-2xl font-bold text-blue-800">
                          {currentProduction.toFixed(1)} τόνοι
                        </div>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-green-600">
                          Οριακή Παραγ. Εργασίας
                        </div>
                        <div className="text-2xl font-bold text-green-800">
                          {marginalProducts.labor.toFixed(2)}
                        </div>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-sm text-purple-600">
                          Οριακή Παραγ. Κεφαλαίου
                        </div>
                        <div className="text-2xl font-bold text-purple-800">
                          {marginalProducts.capital.toFixed(2)}
                        </div>
                      </div>

                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-sm text-orange-600">
                          Αποδόσεις Κλίμακας
                        </div>
                        <div className="text-sm font-bold text-orange-800">
                          {returnsToScale.type}
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <Target className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Συνάρτηση Παραγωγής:</strong> Q ={" "}
                        {parameters.technology.toFixed(2)} × L^
                        {parameters.laborElasticity.toFixed(2)} × K^
                        {parameters.capitalElasticity.toFixed(2)}
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>

              {/* Γράφημα Συνάρτησης Παραγωγής */}
              <Card>
                <CardHeader>
                  <CardTitle>Στάδια Παραγωγής & Παραγωγικότητα</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="labor"
                        label={{
                          value: "Εργασία (L)",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Παραγωγή / Παραγωγικότητα",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="totalProduct"
                        stroke="#2563eb"
                        name="Συνολική Παραγωγή (TP)"
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="marginalProduct"
                        stroke="#dc2626"
                        name="Οριακή Παραγωγικότητα (MP)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="averageProduct"
                        stroke="#059669"
                        name="Μέση Παραγωγικότητα (AP)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Ισοπαραγωγικές Καμπύλες */}
              <Card>
                <CardHeader>
                  <CardTitle>Ισοπαραγωγικές Καμπύλες (Isoquants)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart data={isoquantData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="labor"
                        label={{
                          value: "Εργασία (L)",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        dataKey="capital"
                        label={{
                          value: "Κεφάλαιο (K)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Scatter dataKey="capital" fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="costs" className="space-y-6">
              {/* Ανάλυση Κόστους */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Παράμετροι Κόστους</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>
                        Κόστος Εργασίας: €{parameters.laborCost}/ώρα
                      </Label>
                      <Slider
                        value={[parameters.laborCost]}
                        onValueChange={([value]) =>
                          setParameters((prev) => ({
                            ...prev,
                            laborCost: value,
                          }))
                        }
                        min={15}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Κόστος Κεφαλαίου: €{parameters.capitalCost}/ημέρα
                      </Label>
                      <Slider
                        value={[parameters.capitalCost]}
                        onValueChange={([value]) =>
                          setParameters((prev) => ({
                            ...prev,
                            capitalCost: value,
                          }))
                        }
                        min={100}
                        max={300}
                        step={10}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Κόστος Παραγωγής</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Κόστος Εργασίας:</span>
                        <span>
                          €
                          {(
                            parameters.labor *
                            parameters.laborCost *
                            8
                          ).toFixed(2)}
                          /ημέρα
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Κόστος Κεφαλαίου:</span>
                        <span>
                          €
                          {(
                            parameters.capital * parameters.capitalCost
                          ).toFixed(2)}
                          /ημέρα
                        </span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Συνολικό Κόστος:</span>
                        <span>
                          €
                          {(
                            parameters.labor * parameters.laborCost * 8 +
                            parameters.capital * parameters.capitalCost
                          ).toFixed(2)}
                          /ημέρα
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Κόστος ανά Τόνο:</span>
                        <span>
                          €
                          {(
                            (parameters.labor * parameters.laborCost * 8 +
                              parameters.capital * parameters.capitalCost) /
                            currentProduction
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Γράφημα Κόστους */}
              <Card>
                <CardHeader>
                  <CardTitle>Καμπύλες Κόστους για Θαλασσινά</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={costData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="quantity"
                        label={{
                          value: "Ποσότητα (τόνοι)",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Κόστος (€)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="averageCost"
                        stroke="#2563eb"
                        name="Μέσο Κόστος (AC)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="marginalCost"
                        stroke="#dc2626"
                        name="Οριακό Κόστος (MC)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="fixedCost"
                        stroke="#059669"
                        name="Μέσο Σταθερό Κόστος (AFC)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="optimization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Βελτιστοποίηση Παραγωγής</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Alert
                        className={
                          optimalProduction.isOptimal
                            ? "border-green-500"
                            : "border-orange-500"
                        }
                      >
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Κατάσταση:</strong>{" "}
                          {optimalProduction.isOptimal
                            ? "Βέλτιστη Κατανομή"
                            : "Μη Βέλτιστη Κατανομή"}
                          <br />
                          <strong>Σύσταση:</strong>{" "}
                          {optimalProduction.recommendation}
                        </AlertDescription>
                      </Alert>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          Οικονομικοί Δείκτες
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>MRTS (τρέχον):</span>
                            <span>{optimalProduction.mrts.toFixed(3)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>w/r (αναλογία τιμών):</span>
                            <span>
                              {optimalProduction.wageRentRatio.toFixed(3)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Παραγωγικότητα Εργασίας:</span>
                            <span>
                              {(currentProduction / parameters.labor).toFixed(
                                2,
                              )}{" "}
                              τόνοι/εργάτη
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Παραγωγικότητα Κεφαλαίου:</span>
                            <span>
                              {(currentProduction / parameters.capital).toFixed(
                                2,
                              )}{" "}
                              τόνοι/μηχανή
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          Προτάσεις Βελτιστοποίησης
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>
                            •{" "}
                            {optimalProduction.isOptimal
                              ? "Διατηρήστε την τρέχουσα κατανομή"
                              : "Αναπροσαρμόστε την κατανομή πόρων"}
                          </li>
                          <li>
                            • Επενδύστε σε τεχνολογική αναβάθμιση για αύξηση της
                            παραγωγικότητας
                          </li>
                          <li>
                            • Εκπαιδεύστε το προσωπικό για βελτίωση της
                            αποτελεσματικότητας
                          </li>
                          <li>• Εφαρμόστε lean manufacturing αρχές</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          Στρατηγικές Επιλογές
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>
                            • Αυτοματοποίηση διαδικασιών για μείωση κόστους
                            εργασίας
                          </li>
                          <li>• Outsourcing μη-βασικών λειτουργιών</li>
                          <li>• Εξειδίκευση σε premium προϊόντα</li>
                          <li>• Οικονομίες κλίμακας μέσω επέκτασης</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="elasticity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ανάλυση Ελαστικότητας Παραγωγής</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800">
                        Ελαστικότητα Εργασίας
                      </h4>
                      <div className="text-3xl font-bold text-blue-600">
                        {parameters.laborElasticity.toFixed(2)}
                      </div>
                      <p className="text-sm text-blue-600 mt-2">
                        1% αύξηση εργασίας →{" "}
                        {(parameters.laborElasticity * 100).toFixed(1)}% αύξηση
                        παραγωγής
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800">
                        Ελαστικότητα Κεφαλαίου
                      </h4>
                      <div className="text-3xl font-bold text-green-600">
                        {parameters.capitalElasticity.toFixed(2)}
                      </div>
                      <p className="text-sm text-green-600 mt-2">
                        1% αύξηση κεφαλαίου →{" "}
                        {(parameters.capitalElasticity * 100).toFixed(1)}%
                        αύξηση παραγωγής
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800">
                        Συνολική Ελαστικότητα
                      </h4>
                      <div className="text-3xl font-bold text-purple-600">
                        {(
                          parameters.laborElasticity +
                          parameters.capitalElasticity
                        ).toFixed(2)}
                      </div>
                      <p className="text-sm text-purple-600 mt-2">
                        {returnsToScale.type}
                      </p>
                    </div>
                  </div>

                  <Alert>
                    <Activity className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Ερμηνεία:</strong> {returnsToScale.description}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scale" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Οικονομίες Κλίμακας & Μεγιστοποίηση Κέρδους
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
                        <h4 className="font-bold text-lg mb-4">
                          Ανάλυση Κλίμακας
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Τύπος Αποδόσεων:</span>
                            <Badge
                              variant={
                                returnsToScale.sum > 1
                                  ? "default"
                                  : returnsToScale.sum < 1
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {returnsToScale.type}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Δείκτης Κλίμακας:</span>
                            <span className="font-bold">
                              {returnsToScale.sum.toFixed(3)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Πλεονέκτημα Κλίμακας:</span>
                            <span
                              className={
                                returnsToScale.sum > 1
                                  ? "text-green-600"
                                  : "text-orange-600"
                              }
                            >
                              {returnsToScale.sum > 1 ? "Ναι" : "Όχι"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border">
                        <h4 className="font-bold text-lg mb-4">
                          Συστάσεις Επέκτασης
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {returnsToScale.sum > 1.05 ? (
                            <>
                              <li className="flex items-center gap-2">
                                <ArrowUp className="w-4 h-4 text-green-600" />
                                Επέκταση παραγωγής συνιστάται
                              </li>
                              <li className="flex items-center gap-2">
                                <ArrowUp className="w-4 h-4 text-green-600" />
                                Αύξηση όλων των εισροών αναλογικά
                              </li>
                              <li className="flex items-center gap-2">
                                <ArrowUp className="w-4 h-4 text-green-600" />
                                Επένδυση σε νέες εγκαταστάσεις
                              </li>
                            </>
                          ) : returnsToScale.sum < 0.95 ? (
                            <>
                              <li className="flex items-center gap-2">
                                <ArrowDown className="w-4 h-4 text-orange-600" />
                                Προσοχή στην υπερεπέκταση
                              </li>
                              <li className="flex items-center gap-2">
                                <ArrowDown className="w-4 h-4 text-orange-600" />
                                Βελτιστοποίηση υπαρχουσών διαδικασιών
                              </li>
                              <li className="flex items-center gap-2">
                                <ArrowDown className="w-4 h-4 text-orange-600" />
                                Εστίαση σε εξειδίκευση
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-blue-600" />
                                Σταθερή επέκταση δυνατή
                              </li>
                              <li className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-blue-600" />
                                Διατήρηση τρέχουσας αποτελεσματικότητας
                              </li>
                              <li className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-blue-600" />
                                Επένδυση σε τεχνολογία
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border">
                        <h4 className="font-bold text-lg mb-4">
                          Μεγιστοποίηση Κέρδους
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Συνολικά Έσοδα (εκτίμηση):</span>
                            <span className="font-bold">
                              €{(currentProduction * 8.5).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Συνολικά Κόστη:</span>
                            <span className="font-bold">
                              €
                              {(
                                parameters.labor * parameters.laborCost * 8 +
                                parameters.capital * parameters.capitalCost
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Κέρδος:</span>
                            <span className="font-bold text-green-600">
                              €
                              {(
                                currentProduction * 8.5 -
                                (parameters.labor * parameters.laborCost * 8 +
                                  parameters.capital * parameters.capitalCost)
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Περιθώριο Κέρδους:</span>
                            <span className="font-bold">
                              {(
                                ((currentProduction * 8.5 -
                                  (parameters.labor * parameters.laborCost * 8 +
                                    parameters.capital *
                                      parameters.capitalCost)) /
                                  (currentProduction * 8.5)) *
                                100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border">
                        <h4 className="font-bold text-lg mb-4">
                          Συνθήκες Μεγιστοποίησης
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>
                            • <strong>MR = MC:</strong> Οριακό έσοδο = Οριακό
                            κόστος
                          </li>
                          <li>
                            • <strong>MPL/w = MPK/r:</strong> Ισοκατανομή πόρων
                          </li>
                          <li>
                            • <strong>P = MC:</strong> Τιμή = Οριακό κόστος
                            (τέλεια ανταγωνισμός)
                          </li>
                          <li>
                            • <strong>Μέγιστη αποτελεσματικότητα</strong> όλων
                            των εισροών
                          </li>
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

export default ProductionAnalysis;
