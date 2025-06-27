import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCostForecast, CostEntry } from '@/hooks/useCostForecast';

const CostForecast: React.FC = () => {
  const { history, setHistory, addEntry, forecast, calculateForecast } = useCostForecast();
  const [newEntry, setNewEntry] = useState<{ date: string; cost: string }>({ date: '', cost: '' });
  const [months, setMonths] = useState(6);

  const handleAdd = () => {
    const costNum = parseFloat(newEntry.cost);
    if (!newEntry.date || isNaN(costNum)) return;
    const entry: CostEntry = { date: newEntry.date, cost: costNum };
    addEntry(entry);
    setNewEntry({ date: '', cost: '' });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const rows = text.split(/\r?\n/).filter(Boolean);
    const parsed = rows
      .map(row => {
        const [d, c] = row.split(',');
        const value = parseFloat(c);
        if (!d || isNaN(value)) return null;
        return { date: d.trim(), cost: value } as CostEntry;
      })
      .filter(Boolean) as CostEntry[];
    if (parsed.length > 0) setHistory(parsed);
  };

  useEffect(() => {
    calculateForecast(months, 'movingAverage');
  }, [history, months, calculateForecast]);

  const chartData = [
    ...history.map(h => ({ label: h.date, cost: h.cost })),
    ...forecast.map(f => ({ label: `M+${f.index}`, cost: f.value }))
  ];

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-slate-200">
        <CardTitle className="text-slate-800">Cost Forecast</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2 items-end">
          <Input
            placeholder="YYYY-MM"
            value={newEntry.date}
            onChange={e => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
            className="w-32"
          />
          <Input
            type="number"
            placeholder="Cost"
            value={newEntry.cost}
            onChange={e => setNewEntry(prev => ({ ...prev, cost: e.target.value }))}
            className="w-32"
          />
          <Button onClick={handleAdd}>Add</Button>
          <div className="ml-auto flex items-center space-x-2">
            <Input type="file" accept=".csv" onChange={handleFile} className="w-48" />
            <Input
              type="number"
              value={months}
              min={1}
              onChange={e => setMonths(parseInt(e.target.value) || 1)}
              className="w-20"
            />
          </div>
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cost" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostForecast;
