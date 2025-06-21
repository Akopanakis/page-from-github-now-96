
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Plus, Trash2, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Scenario {
  id: string;
  name: string;
  priceIncrease: number;
  costIncrease: number;
  demandChange: number;
  profit: number;
  revenue: number;
}

interface ScenarioAnalysisProps {
  baseResults: any;
  formData: any;
}

const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({ baseResults, formData }) => {
  const { t } = useLanguage();
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: '1',
      name: 'Βασικό Σενάριο',
      priceIncrease: 0,
      costIncrease: 0,
      demandChange: 0,
      profit: baseResults?.profitPerKg || 0,
      revenue: baseResults?.sellingPrice || 0
    }
  ]);

  const [newScenario, setNewScenario] = useState({
    name: '',
    priceIncrease: 0,
    costIncrease: 0,
    demandChange: 0
  });

  const calculateScenarioResults = (scenario: any) => {
    if (!baseResults) return { profit: 0, revenue: 0 };

    const adjustedPrice = baseResults.sellingPrice * (1 + scenario.priceIncrease / 100);
    const adjustedCost = baseResults.totalCostWithVat * (1 + scenario.costIncrease / 100);
    const adjustedProfit = adjustedPrice - (adjustedCost / baseResults.netWeight);
    const adjustedRevenue = adjustedPrice * (formData.quantity || 1) * (1 + scenario.demandChange / 100);

    return {
      profit: adjustedProfit,
      revenue: adjustedRevenue
    };
  };

  const addScenario = () => {
    if (!newScenario.name) return;

    const results = calculateScenarioResults(newScenario);
    const scenario: Scenario = {
      id: Date.now().toString(),
      ...newScenario,
      ...results
    };

    setScenarios([...scenarios, scenario]);
    setNewScenario({ name: '', priceIncrease: 0, costIncrease: 0, demandChange: 0 });
  };

  const removeScenario = (id: string) => {
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter(s => s.id !== id));
    }
  };

  const chartData = scenarios.map(scenario => ({
    name: scenario.name,
    'Κέρδος/Κιλό': scenario.profit,
    'Έσοδα': scenario.revenue / 100, // Scale down for better visualization
    'Κόστος': baseResults ? baseResults.totalCostWithVat / baseResults.netWeight : 0
  }));

  return (
    <div className="space-y-6">
      {/* Add New Scenario */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Plus className="w-5 h-5 text-purple-600" />
            <span>Δημιουργία Νέου Σεναρίου</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-slate-700 font-medium">Όνομα Σεναρίου</Label>
              <Input
                value={newScenario.name}
                onChange={(e) => setNewScenario({...newScenario, name: e.target.value})}
                placeholder="π.χ. Αύξηση κόστους 10%"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-700 font-medium">Αύξηση Τιμής (%)</Label>
              <Input
                type="number"
                value={newScenario.priceIncrease}
                onChange={(e) => setNewScenario({...newScenario, priceIncrease: parseFloat(e.target.value) || 0})}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-700 font-medium">Αύξηση Κόστους (%)</Label>
              <Input
                type="number"
                value={newScenario.costIncrease}
                onChange={(e) => setNewScenario({...newScenario, costIncrease: parseFloat(e.target.value) || 0})}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-700 font-medium">Αλλαγή Ζήτησης (%)</Label>
              <Input
                type="number"
                value={newScenario.demandChange}
                onChange={(e) => setNewScenario({...newScenario, demandChange: parseFloat(e.target.value) || 0})}
                className="mt-1"
              />
            </div>
          </div>
          <Button 
            onClick={addScenario} 
            className="mt-4 bg-purple-600 hover:bg-purple-700"
            disabled={!newScenario.name}
          >
            <Plus className="w-4 h-4 mr-2" />
            Προσθήκη Σεναρίου
          </Button>
        </CardContent>
      </Card>

      {/* Scenarios Comparison Chart */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Σύγκριση Σεναρίων</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="Κέρδος/Κιλό" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Έσοδα" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Scenarios List */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span>Αποθηκευμένα Σενάρια</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">{scenario.name}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                    <div>
                      <span className="text-slate-600">Τιμή: </span>
                      <span className={scenario.priceIncrease >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {scenario.priceIncrease >= 0 ? '+' : ''}{scenario.priceIncrease}%
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600">Κόστος: </span>
                      <span className={scenario.costIncrease <= 0 ? 'text-green-600' : 'text-red-600'}>
                        {scenario.costIncrease >= 0 ? '+' : ''}{scenario.costIncrease}%
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600">Κέρδος: </span>
                      <span className="font-semibold text-blue-600">{scenario.profit.toFixed(2)}€</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Έσοδα: </span>
                      <span className="font-semibold text-green-600">{scenario.revenue.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
                {scenario.id !== '1' && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeScenario(scenario.id)}
                    className="ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioAnalysis;
