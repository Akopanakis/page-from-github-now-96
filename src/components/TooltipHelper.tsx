
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TooltipHelperProps {
  tooltipKey: string;
  className?: string;
}

const TooltipHelper: React.FC<TooltipHelperProps> = ({ tooltipKey, className = "w-4 h-4 text-slate-400 hover:text-blue-600" }) => {
  const { t } = useLanguage();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className={className} />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-white border border-slate-200 shadow-xl p-3">
          <p className="text-sm text-slate-700">{t(tooltipKey)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipHelper;
