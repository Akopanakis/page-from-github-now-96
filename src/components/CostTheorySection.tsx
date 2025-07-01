import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
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
  ComposedChart,
} from "recharts";
import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  Factory,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface CostTheorySectionProps {
  formData: any;
  results: any;
}

const CostTheorySection: React.FC<CostTheorySectionProps> = ({
  formData,
  results,
}) => {
  const [activeTab, setActiveTab] = useState("short-run");
  const [parameters, setParameters] = useState({
    fixedCost: 5000,      // Σταθερά κόστη (€/μήνα)
    variableRate: 4.2,    // Μεταβλητό κόστος ανά μονάδα (€/kg)
    capacity: 300,        // Παραγωγική ικανότητα (τόνοι/μήνα)
    laborCost: 2800,      // Κόστος εργασίας (€/μήνα)
    capitalCost: 1500,    // Κόστος κεφαλαίου (€/μήνα)
    energyCost: 800,      // Κόστος ενέργειας (€/μήνα)
    maintenanceCost: 400, // Κόστος συντήρησης (€/μήνα)
  });

  // Βραχυχρόνια κόστη - Short Run Costs
  const generateShortRunData = () => {
    const data = [];
    const { fixedCost, variableRate, capacity } = parameters;
    
    for (let quantity = 10; quantity <= capacity; quantity += 10) {
      const totalFixed = fixedCost;
      const totalVariable = quantity * variableRate;
      const totalCost = totalFixed + totalVariable;
      
      const averageFixed = totalFixed / quantity;
      const averageVariable = variableRate;
      const averageCost = totalCost / quantity;
      
      // Οριακό κόστος με αυξανόμενη κλίση κοντά στην πλήρη χρησιμοποίηση
      const utilizationRate = quantity / capacity;
      const marginalCost = variableRate * (1 + utilizationRate * utilizationRate * 0.5);
      
      data.push({
        quantity,
        totalCost,
        totalFixed,
        totalVariable,
        averageCost,
        averageFixed,
        averageVariable,
        marginalCost,
        utilizationRate: utilizationRate * 100,
      });
    }
    
    return data;
  };

  // Μακροχρόνια κόστη - Long Run Costs
  const generateLongRunData = () => {
    const data = [];
    
    for (let scale = 50; scale <= 500; scale += 25) {
      // Διαφορετικές φάσεις οικονομιών κλίμακας
      let averageCost;
      
      if (scale <= 150) {
        // Αρχική φάση - οικονομίες κλίμακας
        averageCost = 8.5 - (scale - 50) * 0.015;
      } else if (scale <= 300) {
        // Σταθερές αποδόσεις κλίμακας
        averageCost = 7.0;
      } else {
        // Αποοικονομίες κλίμακας
        averageCost = 7.0 + (scale - 300) * 0.008;
      }
      
      const totalCost = averageCost * scale;
      const phase = scale <= 150 ? "Οικονομίες" : scale <= 300 ? "Σταθερές" : "Αποοικονομίες";
      
      data.push({
        scale,
        averageCost,
        totalCost,
        phase,
        efficiency: scale <= 150 ? "Αυξανόμενη" : scale <= 300 ? "Σταθερή" : "Φθίνουσα",
      });
    }
    
    return data;
  };

  // Ανάλυση κόστους ανά κατηγορία για θαλασσινά
  const generateSeafoodCostBreakdown = () => {
    const totalProduction = formData.quantity * formData.weight / 1000 || 100; // τόνοι
    
    const costCategories = [
      {
        category: "Πρώτη Ύλη",
        fixed: 0,
        variable: totalProduction * 4200, // €4.2/kg
        percentage: 65,
        description: "Αγορά ψαριών, θαλασσινών",
      },
      {
        category: "Εργασία",
        fixed: parameters.laborCost,
        variable: totalProduction * 800, // Εργασία επεξεργασίας
        percentage: 20,
        description: "Μισθοί, ασφαλιστικές εισφορές",
      },
      {
        category: "Ενέργεια",
        fixed: 200, // Βασική κατανάλωση
        variable: totalProduction * 180, // Ψύξη, επεξεργασία
        percentage: 8,
        description: "Ηλεκτρικό, καύσιμα ψυκτικών",
      },
      {
        category: "Συσκευασία",
        fixed: 100,
        variable: totalProduction * 320,
        percentage: 4,
        description: "Πλαστικά, ετικέτες, κουτιά",
      },
      {
        category: "Μεταφορά",
        fixed: 300,
        variable: totalProduction * 150,
        percentage: 3,
        description: "Ψυκτικά φορτηγά, καύσιμα",
      },
    ];

    return costCategories.map(cat => ({
      ...cat,
      total: cat.fixed + cat.variable,
      fixedPerUnit: cat.fixed / totalProduction,
      variablePerUnit: cat.variable / totalProduction,
      totalPerUnit: (cat.fixed + cat.variable) / totalProduction,
    }));
  };

  // Περιβάλλουσα καμπύλη - Envelope Curve
  const generateEnvelopeCurve = () => {
    const data = [];
    const scales = [100, 200, 400, 600]; // Διαφορετικά μεγέθη εγκαταστάσεων
    
    for (let output = 50; output <= 400; output += 25) {
      const costs = scales.map(scale => {
        const optimalScale = Math.min(scale, output);
        let avgCost;
        
        if (optimalScale <= 150) {
          avgCost = 8.5 - (optimalScale - 50) * 0.015;
        } else if (optimalScale <= 300) {
          avgCost = 7.0;
        } else {
          avgCost = 7.0 + (optimalScale - 300) * 0.008;
        }
        
        // Προσαρμογή για μη-βέλτιστη χρησιμοποίηση
        if (output > scale) {
          avgCost *= 1.2; // Penalty για υπερβολική παραγωγή
        } else if (output < scale * 0.6) {
          avgCost *= 1.1; // Penalty για υποχρησιμοποίηση
        }
        
        return avgCost;
      });
      
      const minCost = Math.min(...costs);
      const optimalScaleIndex = costs.indexOf(minCost);
      
      data.push({
        output,
        envelopeCost: minCost,
        optimalScale: scales[optimalScaleIndex],
        scale100: costs[0],
        scale200: costs[1],
        scale400: costs[2],
        scale600: costs[3],
      });
    }
    
    return data;
  };

  const shortRunData = generateShortRunData();
  const longRunData = generateLongRunData();
  const costBreakdown = generateSeafoodCostBreakdown();
  const envelopeData = generateEnvelopeCurve();

  const formatCurrency = (amount: number) => `€${amount.toLocaleString('el-GR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-6 h-6" />
            Θεωρία Κόστους & Οικονομίες Κλίμακας
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="short-run">Βραχυχρόνιο Κόστος</TabsTrigger>
              <TabsTrigger value="long-run">Μακροχρόνιο Κόστος</TabsTrigger>
              <TabsTrigger value="breakdown">Ανάλυση Κόστους</TabsTrigger>
              <TabsTrigger value="envelope">Περιβάλλουσα</TabsTrigger>
              <TabsTrigger value="optimization">Βελτιστοποίηση</TabsTrigger>
            </TabsList>

            <TabsContent value="short-run" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Παράμετροι Βραχυχρόνιου Κόστους</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Σταθερά Κόστη: {formatCurrency(parameters.fixedCost)}/μήνα</Label>
                      <Slider
                        value={[parameters.fixedCost]}
                        onValueChange={([value]) => setParameters(prev => ({ ...prev, fixedCost: value }))}
                        min={2000}
                        max={10000}
                        step={500}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>Μεταβλητό Κόστος: €{parameters.variableRate}/kg</Label>
                      <Slider
                        value={[parameters.variableRate]}
                        onValueChange={([value]) => setParameters(prev => ({ ...prev, variableRate: value }))}
                        min={2.5}
                        max={7.0}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>Παραγωγική Ικανότητα: {parameters.capacity} τόνοι/μήνα</Label>
                      <Slider
                        value={[parameters.capacity]}
                        onValueChange={([value]) => setParameters(prev => ({ ...prev, capacity: value }))}
                        min={100}
                        max={500}
                        step={50}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Βασικοί Δείκτες Κόστους</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm text-blue-600">Σταθερά Κόστη</div>
                          <div className="text-xl font-bold text-blue-800">
                            {formatCurrency(parameters.fixedCost)}
                          </div>
                          <div className="text-xs text-blue-600">ανεξάρτητα από παραγωγή</div>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm text-green-600">Μεταβλητό/kg</div>
                          <div className="text-xl font-bold text-green-800">
                            €{parameters.variableRate.toFixed(2)}
                          </div>
                          <div className="text-xs text-green-600">ανά κιλό παραγωγής</div>
                        </div>
                      </div>
                      
                      <Alert>
                        <Factory className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Σημείο Κλεισίματος:</strong> Η παραγωγή γίνεται ασύμφορη όταν το οριακό κόστος 
                          υπερβαίνει σημαντικά την τιμή πώλησης. Για τρέχουσες τιμές ~€8/kg, 
                          το σημείο κλεισίματος είναι στα {Math.round(parameters.fixedCost / (8 - parameters.variableRate))} kg/μήνα.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Καμπύλες Βραχυχρόνιου Κόστους</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={shortRunData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quantity" label={{ value: 'Ποσότητα (τόνοι)', position: 'insideBottom', offset: -5 }} />
                      <YAxis yAxisId="cost" label={{ value: 'Κόστος (€)', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="rate" orientation="right" label={{ value: 'Κόστος/τόνο (€)', angle: 90, position: 'insideRight' }} />
                      <Tooltip />
                      <Legend />
                      <Area yAxisId="cost" dataKey="totalCost" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} name="Συνολικό Κόστος" />
                      <Line yAxisId="rate" type="monotone" dataKey="averageCost" stroke="#dc2626" strokeWidth={3} name="Μέσο Κόστος (AC)" />
                      <Line yAxisId="rate" type="monotone" dataKey="marginalCost" stroke="#059669" strokeWidth={2} name="Οριακό Κόστος (MC)" />
                      <Line yAxisId="rate" type="monotone" dataKey="averageVariable" stroke="#f59e0b" strokeWidth={2} name="Μέσο Μεταβλητό (AVC)" />
                      <Line yAxisId="rate" type="monotone" dataKey="averageFixed" stroke="#8b5cf6" strokeWidth={2} name="Μέσο Σταθερό (AFC)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="long-run" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Μακροχρόνιες Καμπύλες Κόστους & Οικονομίες Κλίμακας</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Φάσεις Οικονομιών Κλίμακας</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>• 50-150 τόνοι:</span>
                            <Badge variant="default">Οικονομίες Κλίμακας</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• 150-300 τόνοι:</span>
                            <Badge variant="secondary">Σταθερές Αποδόσεις</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• 300+ τόνοι:</span>
                            <Badge variant="destructive">Αποοικονομίες</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <Alert>
                        <TrendingUp className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Βέλτιστο Μέγεθος:</strong> Το ελάχιστο μακροχρόνιο κόστος επιτυγχάνεται 
                          στα 200-250 τόνους μηνιαίας παραγωγής, με μέσο κόστος €7.00/kg.
                        </AlertDescription>
                      </Alert>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Παράγοντες Οικονομιών Κλίμακας</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Τεχνικές:</strong> Εξειδίκευση εργασίας, καλύτερος εξοπλισμός</li>
                        <li>• <strong>Διοικητικές:</strong> Κατανομή γενικών εξόδων</li>
                        <li>• <strong>Αγοραστικές:</strong> Μαζικές αγορές πρώτων υλών</li>
                        <li>• <strong>Χρηματοδοτικές:</strong> Καλύτεροι όροι δανεισμού</li>
                        <li>• <strong>Marketing:</strong> Κατανομή κόστους προώθησης</li>
                      </ul>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={longRunData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="scale" label={{ value: 'Κλίμακα Παραγωγής (τόνοι/μήνα)', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Μέσο Κόστος (€/kg)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="averageCost" stroke="#2563eb" strokeWidth={4} name="Μακροχρόνιο Μέσο Κόστος (LAC)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ανάλυση Κόστους ανά Κατηγορία - Βιομηχανία Θαλασσινών</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={costBreakdown}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip formatter={(value) => formatCurrency(value as number)} />
                            <Legend />
                            <Bar dataKey="fixed" stackId="a" fill="#3b82f6" name="Σταθερό" />
                            <Bar dataKey="variable" stackId="a" fill="#10b981" name="Μεταβλητό" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="space-y-4">
                        {costBreakdown.map((category, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold">{category.category}</h4>
                              <Badge>{category.percentage}%</Badge>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">{category.description}</div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>Σταθερό: {formatCurrency(category.fixed)}</div>
                              <div>Μεταβλητό: {formatCurrency(category.variable)}</div>
                              <div className="font-semibold">Σύνολο: {formatCurrency(category.total)}</div>
                              <div className="font-semibold">€{category.totalPerUnit.toFixed(2)}/kg</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Alert>
                      <DollarSign className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Στρατηγική Κόστους:</strong> Η πρώτη ύλη αντιπροσωπεύει το 65% του συνολικού κόστους. 
                        Η διαπραγμάτευση καλύτερων τιμών αγοράς και η βελτιστοποίηση των απωλειών 
                        είναι κρίσιμες για την κερδοφορία.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="envelope" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Περιβάλλουσα Καμπύλη (Envelope Curve)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <Alert>
                      <Target className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Περιβάλλουσα Καμπύλη:</strong> Δείχνει το ελάχιστο δυνατό κόστος για κάθε επίπεδο παραγωγής, 
                        επιλέγοντας το βέλτιστο μέγεθος εγκατάστασης. Αποτελεί τη μακροχρόνια καμπύλη μέσου κόστους.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <div className="text-sm text-blue-600">Μικρή Μονάδα</div>
                        <div className="font-bold text-blue-800">100 τόνοι</div>
                        <div className="text-xs">Βέλτιστη: 60-80 τόνοι</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <div className="text-sm text-green-600">Μεσαία Μονάδα</div>
                        <div className="font-bold text-green-800">200 τόνοι</div>
                        <div className="text-xs">Βέλτιστη: 120-180 τόνοι</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg text-center">
                        <div className="text-sm text-yellow-600">Μεγάλη Μονάδα</div>
                        <div className="font-bold text-yellow-800">400 τόνοι</div>
                        <div className="text-xs">Βέλτιστη: 300-400 τόνοι</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg text-center">
                        <div className="text-sm text-red-600">Πολύ Μεγάλη</div>
                        <div className="font-bold text-red-800">600 τόνοι</div>
                        <div className="text-xs">Βέλτιστη: 500+ τόνοι</div>
                      </div>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={envelopeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="output" label={{ value: 'Παραγωγή (τόνοι/μήνα)', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Μέσο Κόστος (€/kg)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="scale100" stroke="#94a3b8" strokeWidth={1} strokeDasharray="5 5" name="Εγκατάσταση 100 τόνων" />
                      <Line type="monotone" dataKey="scale200" stroke="#60a5fa" strokeWidth={1} strokeDasharray="5 5" name="Εγκατάσταση 200 τόνων" />
                      <Line type="monotone" dataKey="scale400" stroke="#34d399" strokeWidth={1} strokeDasharray="5 5" name="Εγκατάσταση 400 τόνων" />
                      <Line type="monotone" dataKey="scale600" stroke="#fbbf24" strokeWidth={1} strokeDasharray="5 5" name="Εγκατάσταση 600 τόνων" />
                      <Line type="monotone" dataKey="envelopeCost" stroke="#dc2626" strokeWidth={4} name="Περιβάλλουσα Καμπύλη (LAC)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="optimization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Βελτιστοποίηση Κόστους & Στρατηγικές Αποτελεσματικότητας</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Βραχυχρόνιες Στρατηγικές
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• <strong>Βελτιστοποίηση χρησιμοποίησης:</strong> Στόχος 85-90% ικανότητας</li>
                          <li>• <strong>Μείωση απωλειών:</strong> Βελτίωση συντήρησης ψυκτικών</li>
                          <li>• <strong>Ε��έλικτα ωράρια:</strong> Προσαρμογή σε εποχικότητα</li>
                          <li>• <strong>Just-in-time:</strong> Μείωση κόστους αποθήκευσης</li>
                          <li>• <strong>Ενεργειακή αποδοτικότητα:</strong> LED, μονωτικά</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          Μακροχρόνιες Στρατηγικές
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• <strong>Κάθετη ολοκλήρωση:</strong> Αγορά δικών μονάδων</li>
                          <li>• <strong>Τεχνολογική αναβάθμιση:</strong> Αυτοματοποίηση</li>
                          <li>• <strong>Γεωγραφική επέκταση:</strong> Νέες αγορές</li>
                          <li>• <strong>Διαφοροποίηση προϊόντων:</strong> Premium σειρές</li>
                          <li>• <strong>Στρατηγικές συμμαχίες:</strong> Συνεργασίες</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Κρίσιμοι Παράγοντες Κόστους
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Τιμές Πρώτων Υλών</span>
                              <span className="font-medium text-red-600">Υψηλός Κίνδυνος</span>
                            </div>
                            <div className="text-xs text-gray-600">Διακύμανση ±20% ετησίως</div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Κόστος Ενέργειας</span>
                              <span className="font-medium text-yellow-600">Μέτριος Κίνδυνος</span>
                            </div>
                            <div className="text-xs text-gray-600">Αυξητική τάση 3-5%</div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Εργατικό Κόστος</span>
                              <span className="font-medium text-blue-600">Χαμηλός Κίνδυνος</span>
                            </div>
                            <div className="text-xs text-gray-600">Σταθερό με ΣΣΕ</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Δυναμικές Τιμολόγησης</h4>
                        <div className="text-sm space-y-2">
                          <div>• <strong>Peak Season:</strong> +15-25% (Δεκέμβριος-Ιανουάριος)</div>
                          <div>• <strong>Low Season:</strong> -10-15% (Μάιος-Αύγουστος)</div>
                          <div>• <strong>Weekend Premium:</strong> +5-10% (Παρασκευή-Κυριακή)</div>
                          <div>• <strong>Bulk Discounts:</strong> -5-12% (>2 τόνοι)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3">Σύνοψη Συστάσεων Βελτιστοποίησης</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-semibold text-blue-700">Άμεσες Ενέργειες (0-6 μήνες)</div>
                        <ul className="mt-1 space-y-1">
                          <li>✓ Αναθεώρηση προμηθευτών</li>
                          <li>✓ Βελτίωση διαδικασιών</li>
                          <li>✓ Μείωση απωλειών</li>
                          <li>✓ Ενεργειακές παρεμβάσεις</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-semibold text-green-700">Μεσοπρόθεσμες (6-18 μήνε��)</div>
                        <ul className="mt-1 space-y-1">
                          <li>✓ Επένδυση σε εξοπλισμό</li>
                          <li>✓ Εκπαίδευση προσωπικού</li>
                          <li>✓ Ψηφιοποίηση διαδικασιών</li>
                          <li>✓ Αναθεώρηση τιμολόγησης</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-semibold text-purple-700">Μακροπρόθεσμες (18+ μήνες)</div>
                        <ul className="mt-1 space-y-1">
                          <li>✓ Επέκταση εγκαταστάσεων</li>
                          <li>✓ Νέες γραμμές προϊόντων</li>
                          <li>✓ Γεωγραφική επέκταση</li>
                          <li>✓ Στρατηγικές συμμαχίες</li>
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

export default CostTheorySection;