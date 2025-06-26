import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { Info } from 'lucide-react';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { colors } from '@/styles/design-tokens';

const ScatterPlotSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const scatterData = [
    { cost: 1000, revenue: 1500 },
    { cost: 1200, revenue: 1800 },
    { cost: 1500, revenue: 2100 },
    { cost: 1700, revenue: 2500 },
    { cost: 2000, revenue: 3000 },
  ];

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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="cost"
                name="Κόστος (€)"
                stroke="#64748b"
              />
              <YAxis
                type="number"
                dataKey="revenue"
                name="Έσοδα (€)"
                stroke="#64748b"
              />
              <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={scatterData} fill={colors.secondary} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScatterPlotSection;
