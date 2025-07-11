
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface ScenarioAnalysisProps {
  formData: any;
}

const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({ formData }) => {
  const [scenarios, setScenarios] = useState([
    { name: 'Βασικό', priceChange: 0, costChange: 0, volumeChange: 0 },
    { name: 'Αισιόδοξο', priceChange: 10, costChange: -5, volumeChange: 15 },
    { name: 'Απαισιόδοξο', priceChange: -10, costChange: 10, volumeChange: -20 }
  ]);

  const [newScenario, setNewScenario] = useState({
    name: '',
    priceChange: 0,
    costChange: 0,
    volumeChange: 0
  });

  const calculateScenarioResult = (scenario: any) => {
    const basePrice = formData.targetSellingPrice || 10;
    const baseCost = formData.purchasePrice || 5;
    const baseVolume = formData.quantity || 100;

    const newPrice = basePrice * (1 + scenario.priceChange / 100);
    const newCost = baseCost * (1 + scenario.costChange / 100);
    const newVolume = baseVolume * (1 + scenario.volumeChange / 100);

    const revenue = newPrice * newVolume;
    const totalCost = newCost * newVolume;
    const profit = revenue - totalCost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

    return {
      name: scenario.name,
      revenue,
      cost: totalCost,
      profit,
      margin,
      volume: newVolume
    };
  };

  const results = scenarios.map(calculateScenarioResult);

  const addScenario = () => {
    if (newScenario.name.trim()) {
      setScenarios([...scenarios, { ...newScenario }]);
      setNewScenario({ name: '', priceChange: 0, costChange: 0, volumeChange: 0 });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-6 h-6" />
          <span>Ανάλυση Σεναρίων</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="results">Αποτελέσματα</TabsTrigger>
            <TabsTrigger value="create">Δημιουργία</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.map((result, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{result.name}</h4>
                    <Badge variant={result.profit > 0 ? "default" : "destructive"}>
                      {result.profit > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Έσοδα:</span>
                      <span>€{result.revenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Κόστος:</span>
                      <span>€{result.cost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Κέρδος:</span>
                      <span className={result.profit > 0 ? 'text-green-600' : 'text-red-600'}>
                        €{result.profit.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Περιθώριο:</span>
                      <span>{result.margin.toFixed(1)}%</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="profit" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scenarioName">Όνομα Σεναρίου</Label>
                <Input
                  id="scenarioName"
                  value={newScenario.name}
                  onChange={(e) => setNewScenario({...newScenario, name: e.target.value})}
                  placeholder="π.χ. Εποχιακή Αύξηση"
                />
              </div>
              <div>
                <Label htmlFor="priceChange">Μεταβολή Τιμής (%)</Label>
                <Input
                  id="priceChange"
                  type="number"
                  value={newScenario.priceChange}
                  onChange={(e) => setNewScenario({...newScenario, priceChange: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="costChange">Μεταβολή Κόστους (%)</Label>
                <Input
                  id="costChange"
                  type="number"
                  value={newScenario.costChange}
                  onChange={(e) => setNewScenario({...newScenario, costChange: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="volumeChange">Μεταβολή Όγκου (%)</Label>
                <Input
                  id="volumeChange"
                  type="number"
                  value={newScenario.volumeChange}
                  onChange={(e) => setNewScenario({...newScenario, volumeChange: Number(e.target.value)})}
                />
              </div>
            </div>
            <Button onClick={addScenario} className="w-full">
              <DollarSign className="w-4 h-4 mr-2" />
              Προσθήκη Σεναρίου
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScenarioAnalysis;
