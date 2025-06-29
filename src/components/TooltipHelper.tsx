import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface TooltipHelperProps {
  tooltipKey: string;
  content?: string;
}

const TooltipHelper: React.FC<TooltipHelperProps> = ({
  tooltipKey,
  content,
}) => {
  // Simplified tooltip content based on key
  const getTooltipContent = (key: string) => {
    const tooltips: Record<string, string> = {
      "tooltip.profit.margin":
        "Το ποσοστό κέρδους που επιθυμείτε επί του κόστους",
      "tooltip.profit.target":
        "Το συγκεκριμένο ποσό σε ευρώ που θέλετε να κερδίζετε",
      // Add more tooltips as needed
    };
    return tooltips[key] || content || "Βοήθεια διαθέσιμη";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">{getTooltipContent(tooltipKey)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipHelper;
