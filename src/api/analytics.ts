import {
  generateAnalyticsData,
  AnalyticsRecord,
  generateMarketData,
  MarketRecord,
} from "@/utils/stubData";
import { safeGetJSON, safeSetJSON } from "@/utils/safeStorage";

const STORAGE_KEYS = {
  analytics: "analytics_data",
  market: "market_data",
};

// Get analytics data from storage with stub data initialization
const getAnalyticsFromStorage = (): AnalyticsRecord[] => {
  try {
    const stored = safeGetJSON<AnalyticsRecord[]>(STORAGE_KEYS.analytics, []);
    if (stored.length === 0) {
      const stubData = generateAnalyticsData(30);
      safeSetJSON(STORAGE_KEYS.analytics, stubData);
      return stubData;
    }
    return stored;
  } catch (error) {
    console.error("Error reading analytics from storage:", error);
    return generateAnalyticsData(30);
  }
};

const getMarketFromStorage = (): MarketRecord[] => {
  try {
    const stored = safeGetJSON<MarketRecord[]>(STORAGE_KEYS.market, []);
    if (stored.length === 0) {
      const stubData = generateMarketData(60);
      safeSetJSON(STORAGE_KEYS.market, stubData);
      return stubData;
    }
    return stored;
  } catch (error) {
    console.error("Error reading market data from storage:", error);
    return generateMarketData(60);
  }
};

export interface AnalyticsFilter {
  dateFrom?: string;
  dateTo?: string;
  minRevenue?: number;
  maxRevenue?: number;
}

export interface MarketFilter {
  species?: string;
  market?: string;
  trend?: MarketRecord["trend"];
  dateFrom?: string;
  dateTo?: string;
}

export const analyticsAPI = {
  // Get analytics data
  getAnalytics(filter?: AnalyticsFilter): AnalyticsRecord[] {
    let data = getAnalyticsFromStorage();

    if (filter) {
      data = data.filter((record) => {
        if (filter.dateFrom && record.date < filter.dateFrom) return false;
        if (filter.dateTo && record.date > filter.dateTo) return false;
        if (filter.minRevenue && record.revenue < filter.minRevenue)
          return false;
        if (filter.maxRevenue && record.revenue > filter.maxRevenue)
          return false;
        return true;
      });
    }

    return data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  },

  // Get market intelligence data
  getMarketData(filter?: MarketFilter): MarketRecord[] {
    let data = getMarketFromStorage();

    if (filter) {
      data = data.filter((record) => {
        if (filter.species && record.species !== filter.species) return false;
        if (filter.market && record.market !== filter.market) return false;
        if (filter.trend && record.trend !== filter.trend) return false;
        if (filter.dateFrom && record.date < filter.dateFrom) return false;
        if (filter.dateTo && record.date > filter.dateTo) return false;
        return true;
      });
    }

    return data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  },

  // Get financial KPIs
  getFinancialKPIs(period: "week" | "month" | "quarter" | "year" = "month") {
    const data = getAnalyticsFromStorage();
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "quarter":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
    }

    const filteredData = data.filter(
      (record) => new Date(record.date) >= startDate,
    );

    if (filteredData.length === 0) return null;

    const totalRevenue = filteredData.reduce(
      (sum, record) => sum + record.revenue,
      0,
    );
    const totalCosts = filteredData.reduce(
      (sum, record) => sum + record.costs,
      0,
    );
    const totalMargin = filteredData.reduce(
      (sum, record) => sum + record.margin,
      0,
    );
    const totalVolume = filteredData.reduce(
      (sum, record) => sum + record.volume,
      0,
    );
    const avgCustomers =
      filteredData.reduce((sum, record) => sum + record.customers, 0) /
      filteredData.length;

    const profitMargin =
      totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;
    const avgRevenuePerCustomer =
      avgCustomers > 0 ? totalRevenue / avgCustomers : 0;
    const avgPricePerKg = totalVolume > 0 ? totalRevenue / totalVolume : 0;

    // Compare with previous period
    const previousStartDate = new Date(
      startDate.getTime() - (now.getTime() - startDate.getTime()),
    );
    const previousData = data.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate >= previousStartDate && recordDate < startDate;
    });

    const previousRevenue = previousData.reduce(
      (sum, record) => sum + record.revenue,
      0,
    );
    const revenueGrowth =
      previousRevenue > 0
        ? ((totalRevenue - previousRevenue) / previousRevenue) * 100
        : 0;

    return {
      period,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalCosts: Math.round(totalCosts * 100) / 100,
      totalMargin: Math.round(totalMargin * 100) / 100,
      totalVolume: Math.round(totalVolume * 10) / 10,
      avgCustomers: Math.round(avgCustomers),
      profitMargin: Math.round(profitMargin * 100) / 100,
      avgRevenuePerCustomer: Math.round(avgRevenuePerCustomer * 100) / 100,
      avgPricePerKg: Math.round(avgPricePerKg * 100) / 100,
      revenueGrowth: Math.round(revenueGrowth * 100) / 100,
      recordCount: filteredData.length,
    };
  },

  // Get trend analysis
  getTrendAnalysis() {
    const data = getAnalyticsFromStorage();

    if (data.length < 2) return null;

    // Sort by date
    const sortedData = data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    // Calculate trends
    const revenueData = sortedData.map((record) => record.revenue);
    const marginData = sortedData.map((record) => record.margin);
    const volumeData = sortedData.map((record) => record.volume);

    const calculateTrend = (values: number[]) => {
      if (values.length < 2) return 0;
      const first = values[0];
      const last = values[values.length - 1];
      return first > 0 ? ((last - first) / first) * 100 : 0;
    };

    const revenueTrend = calculateTrend(revenueData);
    const marginTrend = calculateTrend(marginData);
    const volumeTrend = calculateTrend(volumeData);

    // Calculate volatility (coefficient of variation)
    const calculateVolatility = (values: number[]) => {
      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
      const variance =
        values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
        values.length;
      const stdDev = Math.sqrt(variance);
      return mean > 0 ? (stdDev / mean) * 100 : 0;
    };

    return {
      revenueTrend: Math.round(revenueTrend * 100) / 100,
      marginTrend: Math.round(marginTrend * 100) / 100,
      volumeTrend: Math.round(volumeTrend * 100) / 100,
      revenueVolatility:
        Math.round(calculateVolatility(revenueData) * 100) / 100,
      marginVolatility: Math.round(calculateVolatility(marginData) * 100) / 100,
      volumeVolatility: Math.round(calculateVolatility(volumeData) * 100) / 100,
      dataPoints: sortedData.length,
      periodStart: sortedData[0].date,
      periodEnd: sortedData[sortedData.length - 1].date,
    };
  },

  // Get market insights
  getMarketInsights() {
    const marketData = getMarketFromStorage();

    const speciesAnalysis = marketData.reduce(
      (acc, record) => {
        if (!acc[record.species]) {
          acc[record.species] = {
            species: record.species,
            avgPrice: 0,
            totalVolume: 0,
            records: 0,
            trend: { up: 0, down: 0, stable: 0 },
          };
        }

        acc[record.species].avgPrice += record.price;
        acc[record.species].totalVolume += record.volume;
        acc[record.species].records += 1;
        acc[record.species].trend[record.trend] += 1;

        return acc;
      },
      {} as Record<string, any>,
    );

    // Calculate averages and dominant trends
    Object.values(speciesAnalysis).forEach((analysis: any) => {
      analysis.avgPrice =
        Math.round((analysis.avgPrice / analysis.records) * 100) / 100;
      analysis.totalVolume = Math.round(analysis.totalVolume * 10) / 10;

      const { up, down, stable } = analysis.trend;
      analysis.dominantTrend =
        up > down && up > stable
          ? "up"
          : down > up && down > stable
            ? "down"
            : "stable";
      analysis.trendConfidence = Math.round(
        (Math.max(up, down, stable) / (up + down + stable)) * 100,
      );
    });

    return Object.values(speciesAnalysis);
  },

  // Add new analytics record
  addRecord(record: Omit<AnalyticsRecord, "id">): AnalyticsRecord {
    const data = getAnalyticsFromStorage();
    const newRecord: AnalyticsRecord = {
      ...record,
      id: `analytics-${String(data.length + 1).padStart(3, "0")}`,
    };

    const updatedData = [...data, newRecord];
    safeSetJSON(STORAGE_KEYS.analytics, updatedData);

    return newRecord;
  },

  // Add new market record
  addMarketRecord(record: Omit<MarketRecord, "id">): MarketRecord {
    const data = getMarketFromStorage();
    const newRecord: MarketRecord = {
      ...record,
      id: `market-${String(data.length + 1).padStart(3, "0")}`,
    };

    const updatedData = [...data, newRecord];
    safeSetJSON(STORAGE_KEYS.market, updatedData);

    return newRecord;
  },
};
