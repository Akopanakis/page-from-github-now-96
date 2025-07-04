import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeType?: "percentage" | "absolute";
  trend?: "up" | "down" | "stable";
  icon?: React.ComponentType<any>;
  color?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  tooltip?: string;
  target?: number;
  benchmark?: number;
  className?: string;
  gradient?: boolean;
}

const COLORS = {
  default: {
    bg: "bg-white",
    text: "text-gray-900",
    iconBg: "bg-gray-100",
    iconText: "text-gray-600",
    gradient: "from-gray-50 to-gray-100",
  },
  success: {
    bg: "bg-white",
    text: "text-green-900",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
    gradient: "from-green-50 to-emerald-100",
  },
  warning: {
    bg: "bg-white",
    text: "text-yellow-900",
    iconBg: "bg-yellow-100",
    iconText: "text-yellow-600",
    gradient: "from-yellow-50 to-amber-100",
  },
  danger: {
    bg: "bg-white",
    text: "text-red-900",
    iconBg: "bg-red-100",
    iconText: "text-red-600",
    gradient: "from-red-50 to-rose-100",
  },
  info: {
    bg: "bg-white",
    text: "text-blue-900",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    gradient: "from-blue-50 to-indigo-100",
  },
};

const SIZES = {
  sm: {
    card: "p-4",
    icon: "w-4 h-4",
    iconWrapper: "w-8 h-8",
    title: "text-sm",
    value: "text-lg font-semibold",
    change: "text-xs",
  },
  md: {
    card: "p-6",
    icon: "w-5 h-5",
    iconWrapper: "w-10 h-10",
    title: "text-sm",
    value: "text-2xl font-bold",
    change: "text-sm",
  },
  lg: {
    card: "p-8",
    icon: "w-6 h-6",
    iconWrapper: "w-12 h-12",
    title: "text-base",
    value: "text-3xl font-bold",
    change: "text-base",
  },
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  changeType = "percentage",
  trend,
  icon: Icon,
  color = "default",
  size = "md",
  tooltip,
  target,
  benchmark,
  className,
  gradient = false,
}) => {
  const colorScheme = COLORS[color];
  const sizeScheme = SIZES[size];

  const formatValue = (val: string | number): string => {
    if (typeof val === "number") {
      return new Intl.NumberFormat("el-GR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(val);
    }
    return val;
  };

  const formatChange = (val: number): string => {
    const formatted = Math.abs(val).toLocaleString("el-GR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });

    if (changeType === "percentage") {
      return `${formatted}%`;
    }
    return formatted;
  };

  const getTrendIcon = () => {
    if (!change) return null;

    if (change > 0) {
      return trend === "up" ? (
        <ArrowUpRight className="w-3 h-3 text-green-600" />
      ) : (
        <ArrowUpRight className="w-3 h-3 text-red-600" />
      );
    } else if (change < 0) {
      return trend === "down" ? (
        <ArrowDownRight className="w-3 h-3 text-red-600" />
      ) : (
        <ArrowDownRight className="w-3 h-3 text-green-600" />
      );
    } else {
      return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  const getChangeColor = (): string => {
    if (!change) return "text-gray-500";

    // Positive change
    if (change > 0) {
      return trend === "up" ? "text-green-600" : "text-red-600";
    }
    // Negative change
    else if (change < 0) {
      return trend === "down" ? "text-red-600" : "text-green-600";
    }
    // No change
    return "text-gray-500";
  };

  const cardContent = (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg border border-gray-200",
        gradient ? `bg-gradient-to-br ${colorScheme.gradient}` : colorScheme.bg,
        className,
      )}
    >
      <CardContent className={sizeScheme.card}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Title */}
            <div className="flex items-center gap-2 mb-2">
              <p className={cn("font-medium text-gray-600", sizeScheme.title)}>
                {title}
              </p>
              {tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-1 mb-2">
              <span className={cn(colorScheme.text, sizeScheme.value)}>
                {formatValue(value)}
              </span>
              {unit && (
                <span className="text-sm text-gray-500 font-medium">
                  {unit}
                </span>
              )}
            </div>

            {/* Change indicator */}
            {change !== undefined && (
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span
                  className={cn(
                    getChangeColor(),
                    sizeScheme.change,
                    "font-medium",
                  )}
                >
                  {change >= 0 ? "+" : ""}
                  {formatChange(change)}
                </span>
              </div>
            )}

            {/* Target and benchmark indicators */}
            {(target !== undefined || benchmark !== undefined) && (
              <div className="mt-3 space-y-1">
                {target !== undefined && (
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Στόχος:</span>
                    <span className="font-medium">
                      {formatValue(target)}
                      {unit}
                    </span>
                  </div>
                )}
                {benchmark !== undefined && (
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Benchmark:</span>
                    <span className="font-medium">
                      {formatValue(benchmark)}
                      {unit}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Icon */}
          {Icon && (
            <div
              className={cn(
                "rounded-lg flex items-center justify-center",
                colorScheme.iconBg,
                sizeScheme.iconWrapper,
              )}
            >
              <Icon className={cn(colorScheme.iconText, sizeScheme.icon)} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    cardContent
  );
};

export default MetricCard;
