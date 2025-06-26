import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { colors } from '@/styles/design-tokens';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

const sampleData = [
  { price: 2.5, demand: 1000 },
  { price: 3, demand: 920 },
  { price: 3.5, demand: 860 },
  { price: 4, demand: 750 },
  { price: 4.5, demand: 620 }
];

const ScatterPlotSection: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Card style={{ borderColor: colors.primary }}>
        <CardContent>
          <LoadingSkeleton type="chart" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg" style={{ borderColor: colors.primary }}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Scatter Plot</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 cursor-help" style={{ color: colors.secondary }} />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Visualize relationships between key metrics.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" dataKey="price" stroke="#64748b" name="Price" unit="€" />
              <YAxis type="number" dataKey="demand" stroke="#64748b" name="Demand" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Scenarios" data={sampleData} fill={colors.secondary} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScatterPlotSection;
