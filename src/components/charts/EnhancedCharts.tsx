import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChartProps {
  title?: string;
  data: any[];
  className?: string;
  height?: number;
}

// Enhanced Line Chart
export const EnhancedLineChart: React.FC<
  ChartProps & {
    dataKeys: Array<{ key: string; color: string; name: string }>;
  }
> = ({ title, data, dataKeys, className, height = 300 }) => {
  const { language } = useLanguage();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {new Intl.NumberFormat("el-GR").format(entry.value)}
              €
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" fontSize={12} />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K€`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {dataKeys.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                stroke={item.color}
                strokeWidth={2}
                dot={{ fill: item.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: item.color, strokeWidth: 2 }}
                name={item.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Enhanced Area Chart
export const EnhancedAreaChart: React.FC<
  ChartProps & {
    dataKeys: Array<{ key: string; color: string; name: string }>;
  }
> = ({ title, data, dataKeys, className, height = 300 }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {new Intl.NumberFormat("el-GR").format(entry.value)}
              €
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              {dataKeys.map((item, index) => (
                <linearGradient
                  key={index}
                  id={`gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={item.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={item.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" fontSize={12} />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K€`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {dataKeys.map((item, index) => (
              <Area
                key={item.key}
                type="monotone"
                dataKey={item.key}
                stroke={item.color}
                fillOpacity={1}
                fill={`url(#gradient-${index})`}
                strokeWidth={2}
                name={item.name}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Enhanced Bar Chart
export const EnhancedBarChart: React.FC<
  ChartProps & {
    dataKey: string;
    barColor?: string;
    compareKey?: string;
    compareColor?: string;
  }
> = ({
  title,
  data,
  dataKey,
  barColor = "#3b82f6",
  compareKey,
  compareColor = "#10b981",
  className,
  height = 300,
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}:{" "}
              {new Intl.NumberFormat("el-GR").format(entry.value)}€
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#666" fontSize={12} />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K€`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey={dataKey} fill={barColor} radius={[4, 4, 0, 0]} />
            {compareKey && (
              <Bar
                dataKey={compareKey}
                fill={compareColor}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Enhanced Pie Chart
export const EnhancedPieChart: React.FC<
  ChartProps & {
    dataKey: string;
    nameKey: string;
    colors?: string[];
  }
> = ({
  title,
  data,
  dataKey,
  nameKey,
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"],
  className,
  height = 300,
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {new Intl.NumberFormat("el-GR").format(data.value)}€
          </p>
          <p className="text-xs text-gray-500">
            {((data.value / data.payload.total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item[dataKey], 0);
  const dataWithTotal = data.map((item) => ({ ...item, total }));

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Chart Grid Layout Helper
export const ChartGrid: React.FC<{
  children: React.ReactNode;
  cols?: 1 | 2 | 3;
  className?: string;
}> = ({ children, cols = 2, className = "" }) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3",
  };

  return (
    <div className={`grid ${gridCols[cols]} gap-6 ${className}`}>
      {children}
    </div>
  );
};

// Export enhanced chart components with cleaner names
export {
  EnhancedLineChart as LineChart,
  EnhancedAreaChart as AreaChart,
  EnhancedBarChart as BarChart,
  EnhancedPieChart as PieChart,
};
