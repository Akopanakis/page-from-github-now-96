
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, TrendingDown, DollarSign, Scale, Target, Calculator } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FormData, CalculationResults } from '../types';

interface ScenarioAnalysisProps {
  formData: FormData;
  results: CalculationResults | null;
}

interface Scenario {
  id: string;
  name: string;
  costPerKg: number;
  cleaningYield: number;
  profitMargin: number;
  results?: CalculationResults;
}

const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({ formData, results }) => {
  const { language } = useLanguage();
  const baseYield = 100 - formData.cleaningLoss - formData.processingLoss;
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: '1',
      name: language === 'el' ? 'Βασικό Σενάριο' : 'Base Scenario',
      costPerKg: formData.costPerKg,
      cleaningYield: baseYield,
      profitMargin: formData.profitMargin
    },
    {
      id: '2',
      name: language === 'el' ? 'Αισιόδοξο Σενάριο' : 'Optimistic Scenario',
      costPerKg: formData.costPerKg * 0.9,
      cleaningYield: Math.min(baseYield + 5, 95),
      profitMargin: formData.profitMargin + 5
    },
    {
      id: '3',
      name: language === 'el' ? 'Απαισιόδοξο Σενάριο' : 'Pessimistic Scenario',
      costPerKg: formData.costPerKg * 1.1,
      cleaningYield: Math.max(baseYield - 5, 70),
      profitMargin: Math.max(formData.profitMargin - 5, 10)
    }
  ]);

  const [newScenario, setNewScenario] = useState({
    name: '',
    costPerKg: formData.costPerKg,
    cleaningYield: baseYield,
    profitMargin: formData.profitMargin
  });

  const calculateScenario = (scenario: Scenario): CalculationResults => {
    const cleanWeight = formData.initialWeight * (scenario.cleaningYield / 100);
    const finalWeight = cleanWeight * (1 + formData.glazingWeight / 100);
    
    const materialCost = formData.initialWeight * scenario.costPerKg;
    const totalDirectCosts =
      materialCost +
      formData.transportCost +
      formData.laborCost +
      formData.packagingCost +
      formData.additionalCosts;
    const totalCost = totalDirectCosts;
    const costPerKgFinal = totalCost / finalWeight;
    const sellingPrice = totalCost * (1 + scenario.profitMargin / 100);
    const profit = sellingPrice - totalCost;
    
    return {
      cleanWeight,
      finalWeight,
      materialCost,
      totalCost,
      costPerKgFinal,
      costPerKg: costPerKgFinal,
      sellingPrice,
      profit
    };
  };

  const addScenario = () => {
    if (!newScenario.name.trim()) return;
    
    const scenario: Scenario = {
      id: Date.now().toString(),
      ...newScenario,
      results: calculateScenario(newScenario as Scenario)
    };
    
    setScenarios(prev => [...prev, scenario]);
    setNewScenario({
      name: '',
      costPerKg: formData.costPerKg,
      cleaningYield: baseYield,
      profitMargin: formData.profitMargin
    });
  };

  const scenariosWithResults = scenarios.map(scenario => ({
    ...scenario,
    results: calculateScenario(scenario)
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Scenario Creation */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              {language === 'el' ? 'Δημιουργία Σεναρίου' : 'Create Scenario'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>{language === 'el' ? 'Όνομα Σεναρίου' : 'Scenario Name'}</Label>
              <Input
                value={newScenario.name}
                onChange={(e) => setNewScenario(prev => ({ ...prev, name: e.target.value }))}
                placeholder={language === 'el' ? 'π.χ. Νέο Σενάριο' : 'e.g. New Scenario'}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'el' ? 'Κόστος ανά Κιλό (€)' : 'Cost per Kg (€)'}</Label>
              <Input
                type="number"
                step="0.01"
                value={newScenario.costPerKg}
                onChange={(e) => setNewScenario(prev => ({ ...prev, costPerKg: parseFloat(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'el' ? 'Απόδοση Καθαρισμού (%)' : 'Cleaning Yield (%)'}</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={newScenario.cleaningYield}
                onChange={(e) => setNewScenario(prev => ({ ...prev, cleaningYield: parseFloat(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'el' ? 'Περιθώριο Κέρδους (%)' : 'Profit Margin (%)'}</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={newScenario.profitMargin}
                onChange={(e) => setNewScenario(prev => ({ ...prev, profitMargin: parseFloat(e.target.value) || 0 }))}
              />
            </div>

            <Button onClick={addScenario} className="w-full" disabled={!newScenario.name.trim()}>
              <Target className="h-4 w-4 mr-2" />
              {language === 'el' ? 'Προσθήκη Σεναρίου' : 'Add Scenario'}
            </Button>
          </CardContent>
        </Card>

        {/* Scenario Comparison */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              {language === 'el' ? 'Σύγκριση Σεναρίων' : 'Scenario Comparison'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {scenariosWithResults.map((scenario) => (
                <div key={scenario.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-lg">{scenario.name}</h4>
                    <Badge variant="secondary">
                      €{scenario.results.totalCost.toFixed(2)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {language === 'el' ? 'Κόστος/κιλό:' : 'Cost/kg:'}
                      </span>
                      <span className="font-medium">€{scenario.results.costPerKgFinal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {language === 'el' ? 'Κέρδος:' : 'Profit:'}
                      </span>
                      <span className="font-medium text-green-600">€{scenario.results.profit.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {language === 'el' ? 'Απόδοση:' : 'Yield:'}
                      </span>
                      <span className="font-medium">{scenario.cleaningYield}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {language === 'el' ? 'Περιθώριο:' : 'Margin:'}
                      </span>
                      <span className="font-medium">{scenario.profitMargin}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {language === 'el' ? 'Λεπτομερής Ανάλυση' : 'Detailed Analysis'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profit" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profit">
                {language === 'el' ? 'Κερδοφορία' : 'Profitability'}
              </TabsTrigger>
              <TabsTrigger value="cost">
                {language === 'el' ? 'Κόστος' : 'Cost'}
              </TabsTrigger>
              <TabsTrigger value="yield">
                {language === 'el' ? 'Απόδοση' : 'Yield'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profit" className="space-y-4">
              <div className="grid gap-4">
                {scenariosWithResults.map((scenario) => (
                  <div key={scenario.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">{scenario.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={scenario.results.profit > 0 ? "default" : "destructive"}>
                        €{scenario.results.profit.toFixed(2)}
                      </Badge>
                      {scenario.results.profit > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="cost" className="space-y-4">
              <div className="grid gap-4">
                {scenariosWithResults.map((scenario) => (
                  <div key={scenario.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">{scenario.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        €{scenario.results.costPerKgFinal.toFixed(2)}/kg
                      </Badge>
                      <DollarSign className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="yield" className="space-y-4">
              <div className="grid gap-4">
                {scenariosWithResults.map((scenario) => (
                  <div key={scenario.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">{scenario.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {scenario.cleaningYield}%
                      </Badge>
                      <Scale className="h-4 w-4 text-purple-500" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioAnalysis;
