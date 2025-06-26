import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface CostCardProps {
  label: string;
  value: number;
  minAllowed: number;
  maxAllowed: number;
  tooltip: string;
}

const CostCard: React.FC<CostCardProps> = ({ label, value, minAllowed, maxAllowed, tooltip }) => {
  let borderColor = 'border-l-green-600';
  if (value < minAllowed) {
    borderColor = 'border-l-yellow-600';
  } else if (value > maxAllowed) {
    borderColor = 'border-l-red-600';
  }

  return (
    <Card className={`border-l-4 ${borderColor} shadow-sm`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="font-medium text-slate-600">{label}</span>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-slate-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <span className="font-bold text-slate-900">{value.toFixed(2)}</span>
      </CardContent>
    </Card>
  );
};

export default CostCard;
