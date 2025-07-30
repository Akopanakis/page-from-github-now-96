import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Factory, 
  Package, 
  BarChart3, 
  Plus,
  TrendingUp,
  Users,
  Target,
  Award
} from 'lucide-react';
import InsertFinalProductBatchForm from '@/components/production/InsertFinalProductBatchForm';
import FinalProductStockManager from '@/components/production/FinalProductStockManager';
import FinalProductReports from '@/components/production/FinalProductReports';
import { 
  FinalProductBatch, 
  SaleTransaction, 
  FinalProductStock 
} from '@/types/finalProduct';
import { finalProductDemoData, getDemoDataSummary } from '@/data/finalProductDemo';
import { toast } from '@/components/ui/sonner';

const FinalProductBatchPage: React.FC = () => {
  // State management for the new modular system
  const [batches, setBatches] = useState<FinalProductBatch[]>(finalProductDemoData.batches);
  const [sales, setSales] = useState<SaleTransaction[]>(finalProductDemoData.sales);
  const [stock, setStock] = useState<FinalProductStock[]>(finalProductDemoData.stock);
  const [activeTab, setActiveTab] = useState('overview');

  // Demo data summary
  const summary = getDemoDataSummary();

  // Handle new batch creation
  const handleBatchCreated = (newBatch: FinalProductBatch) => {
    setBatches(prev => [...prev, newBatch]);
    
    // Create corresponding stock entry
    const newStock: FinalProductStock = {
      id: `fps_${Date.now()}`,
      batchId: newBatch.id,
      batchNumber: newBatch.batchNumber,
      productId: newBatch.productId,
      productName: newBatch.productName,
      productCode: newBatch.productCode,
      
      totalKg: newBatch.finalProductKg,
      remainingKg: newBatch.finalProductKg,
      soldKg: 0,
      
      packagingType: newBatch.packagingType,
      totalUnits: newBatch.packagingUnits,
      remainingUnits: newBatch.packagingUnits,
      
      costPerKg: newBatch.calculatedCostPerKg,
      productionDate: newBatch.productionDate,
      
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setStock(prev => [...prev, newStock]);
    
    toast.success(`Παρτίδα ${newBatch.batchNumber} προστέθηκε στο stock!`);
    setActiveTab('stock'); // Navigate to stock view
  };

  // Handle sale completion
  const handleSaleCompleted = (newSale: SaleTransaction) => {
    setSales(prev => [...prev, newSale]);
    
    // Update batch status based on remaining stock
    setBatches(prev => prev.map(batch => {
      const batchStock = stock.find(s => s.batchId === batch.id);
      if (batchStock) {
        const soldPercentage = (batchStock.soldKg / batchStock.totalKg) * 100;
        const newStatus = soldPercentage >= 100 ? 'sold' : 
                         soldPercentage > 0 ? 'partial_sold' : 'in_stock';
        return { ...batch, status: newStatus };
      }
      return batch;
    }));
    
    toast.success(`Πώληση ${newSale.id} καταχωρήθηκε επιτυχώς!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        
        {/* Header */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Factory className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-3xl font-bold">Final Product Management</span>
                  <div className="text-sm text-muted-foreground mt-1">
                    Ολοκληρωμένη διαχείριση παρτίδων, stock και πωλήσεων
                  </div>
                </div>
              </div>
              <Badge className="bg-green-600 text-white px-4 py-2 text-lg">
                Live System
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Συνολικές Παρτίδες</p>
                  <p className="text-3xl font-bold text-green-600">{summary.totalBatches}</p>
                  <div className="flex items-center mt-1">
                    <Factory className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">{summary.totalProducedKg}kg παραγωγή</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Συνολικά Έσοδα</p>
                  <p className="text-3xl font-bold text-blue-600">€{summary.totalRevenue.toFixed(0)}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600">{summary.totalSoldKg}kg πωλήσεις</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Καθαρό Κέρδος</p>
                  <p className="text-3xl font-bold text-purple-600">€{summary.totalProfit.toFixed(0)}</p>
                  <div className="flex items-center mt-1">
                    <Award className="w-4 h-4 text-purple-600 mr-1" />
                    <span className="text-sm text-purple-600">{summary.profitMargin}% margin</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Μέση Απόδοση</p>
                  <p className="text-3xl font-bold text-orange-600">{summary.averageYield}%</p>
                  <div className="flex items-center mt-1">
                    <Target className="w-4 h-4 text-orange-600 mr-1" />
                    <span className="text-sm text-orange-600">Target: 85%</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-slate-100">
            <TabsTrigger value="overview" className="flex flex-col items-center p-3">
              <BarChart3 className="w-5 h-5 mb-1" />
              <span className="text-xs">Επισκόπηση</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex flex-col items-center p-3">
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-xs">Νέα Παρτίδα</span>
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex flex-col items-center p-3">
              <Package className="w-5 h-5 mb-1" />
              <span className="text-xs">Stock & Πωλήσεις</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col items-center p-3">
              <BarChart3 className="w-5 h-5 mb-1" />
              <span className="text-xs">Αναφορές</span>
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex flex-col items-center p-3">
              <Award className="w-5 h-5 mb-1" />
              <span className="text-xs">Demo Data</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <FinalProductReports 
              batches={batches}
              sales={sales}
              stock={stock}
            />
          </TabsContent>

          {/* Create New Batch Tab */}
          <TabsContent value="create" className="space-y-6">
            <InsertFinalProductBatchForm 
              onSubmit={handleBatchCreated}
              onCancel={() => setActiveTab('overview')}
            />
          </TabsContent>

          {/* Stock & Sales Tab */}
          <TabsContent value="stock" className="space-y-6">
            <FinalProductStockManager 
              onSaleComplete={handleSaleCompleted}
            />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <FinalProductReports 
              batches={batches}
              sales={sales}
              stock={stock}
            />
          </TabsContent>

          {/* Demo Data Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Demo Examples */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <span>Demo Παραδείγματα</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    
                    {/* Example 1: Γάμπαρη */}
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg text-indigo-800">🔹 Γάμπαρη Lot 21125</h4>
                          <div className="mt-2 space-y-1 text-sm">
                            <div><strong>Α' ύλη:</strong> 132kg × €3,00 = €396</div>
                            <div><strong>Παραγωγή:</strong> 160kg (81% yield)</div>
                            <div><strong>Συσκευασία:</strong> 18 φελιζόλ × €1,00 = €18</div>
                            <div><strong>Κόστος/kg:</strong> €414 / 160 = €2,59</div>
                            <div><strong>Πώληση:</strong> 90kg × €4,50 = €405</div>
                            <div className="text-green-700 font-bold"><strong>Κέρδος:</strong> €172,13 (42,5% margin)</div>
                          </div>
                        </div>
                        <Badge className="bg-green-600 text-white">Live Demo</Badge>
                      </div>
                    </div>

                    {/* Example 2: Χταπόδι */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg text-blue-800">🔹 Χταπόδι Block M</h4>
                          <div className="mt-2 space-y-1 text-sm">
                            <div><strong>Α' ύλη:</strong> 100kg × €4,00 = €400</div>
                            <div><strong>Παραγωγή:</strong> 80kg (80% yield)</div>
                            <div><strong>Συσκευασία:</strong> 16 κουτιά × €0,80 = €12,80</div>
                            <div><strong>Κόστος/kg:</strong> €412,80 / 80 = €5,16</div>
                            <div><strong>Πώληση:</strong> 40kg × €6,50 = €260</div>
                            <div className="text-green-700 font-bold"><strong>Κέρδος:</strong> €53,60 (20,6% margin)</div>
                          </div>
                        </div>
                        <Badge className="bg-blue-600 text-white">Live Demo</Badge>
                      </div>
                    </div>

                    {/* Example 3: Θράψαλο */}
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg text-green-800">🔹 Θράψαλο L</h4>
                          <div className="mt-2 space-y-1 text-sm">
                            <div><strong>Α' ύλη:</strong> 200kg × €3,20 = €640</div>
                            <div><strong>Παραγωγή:</strong> 180kg (90% yield)</div>
                            <div><strong>Συσκευασία:</strong> 36 τεμ. × €1,00 = €36</div>
                            <div><strong>Κόστος/kg:</strong> €676 / 180 = €3,76</div>
                            <div><strong>Πώληση:</strong> 100kg × €5,20 = €520</div>
                            <div className="text-green-700 font-bold"><strong>Κέρδος:</strong> €144 (27,7% margin)</div>
                          </div>
                        </div>
                        <Badge className="bg-green-600 text-white">Live Demo</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Factory className="w-5 h-5 text-purple-600" />
                    <span>Χαρακτηριστικά Συστήματος</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    
                    <div className="flex items-center space-x-3 p-2 bg-green-50 rounded">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">FIFO Stock Allocation</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">Auto Cost Calculation</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2 bg-purple-50 rounded">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm">Real-time Profit Analysis</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2 bg-orange-50 rounded">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-sm">Yield Tracking</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2 bg-indigo-50 rounded">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <span className="text-sm">Multi-batch Sales Support</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-sm">Live Dashboard & Reports</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinalProductBatchPage;
