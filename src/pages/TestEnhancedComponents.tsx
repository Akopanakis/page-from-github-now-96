
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EnhancedNavigationSystem from "@/components/EnhancedNavigationSystem";
import MarketIntelligenceSystemEnhanced from "@/components/MarketIntelligenceSystemEnhanced";
import ScenarioAnalysisEnhanced from "@/components/ScenarioAnalysisEnhanced";
import RevenueForecastingEnhanced from "@/components/RevenueForecastingEnhanced";
import { FormData, CalculationResults } from "@/utils/calc";

// Mock data for testing components
const mockFormData: FormData = {
  productName: "Test Product",
  productType: "fish",
  weight: 100,
  quantity: 10,
  origin: "Greece",
  quality: "A",
  notes: "Test notes",
  certifications: [],
  purchasePrice: 5.0,
  targetSellingPrice: 10.0,
  profitMargin: 20,
  vatRate: 24,
  processingPhases: [],
  totalLossPercentage: 5,
  glazingPercentage: 0,
  glazingType: "none",
  directCosts: [
    { id: "1", name: "Materials", value: 100, category: "direct" },
  ],
  indirectCosts: [
    { id: "2", name: "Overhead", value: 50, category: "indirect" },
  ],
  transportLegs: [
    { id: "1", from: "Athens", to: "Thessaloniki", distance: 500, cost: 100, type: "Road" },
  ],
  // Legacy fields
  waste: 0,
  glazingPercent: 0,
  vatPercent: 24,
  workers: [{ id: "1", hourlyRate: 15, hours: 8 }],
  boxCost: 5,
  bagCost: 2,
  distance: 500,
  fuelCost: 50,
  tolls: 10,
  parkingCost: 5,
  driverSalary: 100,
  profitTarget: 200,
  competitor1: 9,
  competitor2: 11,
  electricityCost: 20,
  equipmentCost: 30,
  insuranceCost: 15,
  rentCost: 200,
  communicationCost: 25,
  otherCosts: 40,
  originAddress: "Athens, Greece",
  destinationAddress: "Thessaloniki, Greece",
  routeCalculated: true,
  estimatedDuration: "5 hours",
  batchNumber: "BATCH001",
  supplierName: "Test Supplier",
  minimumMargin: 15,
  storageTemperature: -18,
  shelfLife: 365,
  customerPrice: 12,
  seasonalMultiplier: 1,
};

const mockResults: CalculationResults = {
  rawWeight: 100,
  netWeight: 95,
  totalDirectCosts: 100,
  totalIndirectCosts: 50,
  totalTransportCosts: 100,
  totalProcessingCosts: 25,
  finalProcessedWeight: 95,
  totalWastePercentage: 5,
  totalCost: 275,
  totalCostWithVat: 341,
  costPerKg: 2.89,
  costPerUnit: 27.5,
  netPrice: 8.06,
  vatAmount: 1.94,
  finalPrice: 10,
  grossProfit: 475,
  netProfit: 475,
  profitMargin: 20,
  profitPerKg: 5,
  sellingPrice: 10,
  breakEvenPrice: 3.6,
  recommendedSellingPrice: 12,
  competitivePosition: "Competitive",
  efficiencyScore: 95,
  breakdown: {
    materials: 100,
    labor: 50,
    processing: 25,
    transport: 100,
    overhead: 50,
    packaging: 7,
  },
  costBreakdown: [
    { category: "Materials", amount: 100, percentage: 36.4 },
    { category: "Labor", amount: 50, percentage: 18.2 },
    { category: "Transport", amount: 100, percentage: 36.4 },
    { category: "Overhead", amount: 50, percentage: 18.2 },
  ],
  competitorAnalysis: {
    ourPrice: 10,
    competitor1Diff: -1,
    competitor2Diff: 1,
    marketPosition: "competitive",
  },
  profitAnalysis: {
    breakEvenPrice: 3.6,
    marginAtCurrentPrice: 20,
    recommendedMargin: 25,
  },
  // Legacy fields
  purchaseCost: 500,
  laborCost: 120,
  packagingCost: 7,
  transportCost: 165,
  additionalCosts: 90,
};

const TestEnhancedComponents = () => {
  const [activeTab, setActiveTab] = useState("enhanced-navigation");
  const [isPremium] = useState(true);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enhanced Components Test Page</CardTitle>
          </CardHeader> 
          <CardContent>
            <p className="text-gray-600 mb-4">
              This page demonstrates all enhanced components with mock data.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab("enhanced-navigation")}
                className={`px-4 py-2 rounded ${
                  activeTab === "enhanced-navigation"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Enhanced Navigation
              </button>
              <button
                onClick={() => setActiveTab("market-intelligence")}
                className={`px-4 py-2 rounded ${
                  activeTab === "market-intelligence"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Market Intelligence
              </button>
              <button
                onClick={() => setActiveTab("scenario-analysis")}
                className={`px-4 py-2 rounded ${
                  activeTab === "scenario-analysis"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Scenario Analysis
              </button>
              <button
                onClick={() => setActiveTab("revenue-forecasting")}
                className={`px-4 py-2 rounded ${
                  activeTab === "revenue-forecasting"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Revenue Forecasting
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Component Showcase */}
        <div className="space-y-8">
          {activeTab === "enhanced-navigation" && (
            <Card>
              <CardHeader>
                <CardTitle>Enhanced Navigation System</CardTitle>
              </CardHeader>
              <CardContent>
                <EnhancedNavigationSystem
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isPremium={isPremium}
                />
              </CardContent>
            </Card>
          )}

          {activeTab === "market-intelligence" && (
            <Card>
              <CardHeader>
                <CardTitle>Market Intelligence System Enhanced</CardTitle>
              </CardHeader>
              <CardContent>
                <MarketIntelligenceSystemEnhanced />
              </CardContent>
            </Card>
          )}

          {activeTab === "scenario-analysis" && (
            <Card>
              <CardHeader>
                <CardTitle>Scenario Analysis Enhanced</CardTitle>
              </CardHeader>
              <CardContent>
                <ScenarioAnalysisEnhanced
                  formData={mockFormData}
                  results={mockResults}
                />
              </CardContent>
            </Card>
          )}

          {activeTab === "revenue-forecasting" && (
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecasting Enhanced</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueForecastingEnhanced
                  formData={mockFormData}
                  results={mockResults}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestEnhancedComponents;
