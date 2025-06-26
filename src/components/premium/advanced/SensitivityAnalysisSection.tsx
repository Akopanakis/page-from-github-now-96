import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { colors } from '@/styles/design-tokens';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const sampleData = [
  { variation: -20, profit: 4 },
  { variation: -10, profit: 6 },
  { variation: 0, profit: 8 },
  { variation: 10, profit: 9 },
  { variation: 20, profit: 7 }
];

const SensitivityAnalysisSection: React.FC = () => {
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
          <span>Ανάλυση Ευαισθησίας</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 cursor-help" style={{ color: colors.secondary }} />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Εξετάστε την επίδραση διαφορετικών παραμέτρων.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="variation" stroke="#64748b" tickFormatter={(v) => `${v}%`} />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profit" stroke={colors.secondary} strokeWidth={3} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensitivityAnalysisSection;
