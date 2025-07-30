import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Package,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  Hash,
  Scale,
  Calculator
} from 'lucide-react';
import { 
  FinalProductStock, 
  SaleFormData, 
  SaleTransaction, 
  SaleItem,
  FinalProduct
} from '@/types/finalProduct';
import { finalProductDemoData } from '@/data/finalProductDemo';
import { toast } from '@/components/ui/sonner';

interface StockAllocation {
  stockId: string;
  batchNumber: string;
  allocatedKg: number;
  costPerKg: number;
  availableKg: number;
}

interface SalePreview {
  totalKg: number;
  totalCost: number;
  totalRevenue: number;
  totalProfit: number;
  profitMargin: number;
  allocations: StockAllocation[];
  isValid: boolean;
  errors: string[];
}

interface FinalProductStockManagerProps {
  onSaleComplete?: (sale: SaleTransaction) => void;
}

const FinalProductStockManager: React.FC<FinalProductStockManagerProps> = ({
  onSaleComplete
}) => {
  // State
  const [stockData, setStockData] = useState<FinalProductStock[]>(finalProductDemoData.stock);
  const [products] = useState<FinalProduct[]>(finalProductDemoData.finalProducts);
  
  const [saleForm, setSaleForm] = useState<SaleFormData>({
    customerName: '',
    items: [{ productId: '', requestedKg: 0, pricePerKg: 0 }],
    saleDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [salePreview, setSalePreview] = useState<SalePreview | null>(null);

  // FIFO Logic - Get available stock for a product, sorted by production date (oldest first)
  const getAvailableStock = (productId: string): FinalProductStock[] => {
    return stockData
      .filter(stock => stock.productId === productId && stock.isAvailable && stock.remainingKg > 0)
      .sort((a, b) => new Date(a.productionDate).getTime() - new Date(b.productionDate).getTime());
  };

  // Calculate how to allocate requested quantity using FIFO
  const calculateFIFOAllocation = (productId: string, requestedKg: number): StockAllocation[] => {
    const availableStock = getAvailableStock(productId);
    const allocations: StockAllocation[] = [];
    let remainingKg = requestedKg;

    for (const stock of availableStock) {
      if (remainingKg <= 0) break;

      const allocatedKg = Math.min(remainingKg, stock.remainingKg);
      
      allocations.push({
        stockId: stock.id,
        batchNumber: stock.batchNumber,
        allocatedKg,
        costPerKg: stock.costPerKg,
        availableKg: stock.remainingKg
      });

      remainingKg -= allocatedKg;
    }

    return allocations;
  };

  // Calculate sale preview
  useEffect(() => {
    const preview: SalePreview = {
      totalKg: 0,
      totalCost: 0,
      totalRevenue: 0,
      totalProfit: 0,
      profitMargin: 0,
      allocations: [],
      isValid: true,
      errors: []
    };

    for (const item of saleForm.items) {
      if (!item.productId || item.requestedKg <= 0 || item.pricePerKg <= 0) continue;

      const allocations = calculateFIFOAllocation(item.productId, item.requestedKg);
      const allocatedKg = allocations.reduce((sum, alloc) => sum + alloc.allocatedKg, 0);
      
      if (allocatedKg < item.requestedKg) {
        preview.errors.push(
          `Ανεπαρκές stock για ${products.find(p => p.id === item.productId)?.name}: ` +
          `Ζητήθηκαν ${item.requestedKg}kg, διαθέσιμα ${allocatedKg}kg`
        );
        preview.isValid = false;
      }

      const itemCost = allocations.reduce((sum, alloc) => sum + (alloc.allocatedKg * alloc.costPerKg), 0);
      const itemRevenue = allocatedKg * item.pricePerKg;

      preview.totalKg += allocatedKg;
      preview.totalCost += itemCost;
      preview.totalRevenue += itemRevenue;
      preview.allocations.push(...allocations);
    }

    preview.totalProfit = preview.totalRevenue - preview.totalCost;
    preview.profitMargin = preview.totalRevenue > 0 ? (preview.totalProfit / preview.totalRevenue) * 100 : 0;

    // Validation
    if (!saleForm.customerName.trim()) {
      preview.errors.push('Το όνομα πελάτη είναι υποχρεωτικ��');
      preview.isValid = false;
    }

    if (saleForm.items.some(item => item.productId && (item.requestedKg <= 0 || item.pricePerKg <= 0))) {
      preview.errors.push('Όλα τα προϊόντα πρέπει να έχουν ποσότητα και τιμή > 0');
      preview.isValid = false;
    }

    setSalePreview(preview);
  }, [saleForm, stockData, products]);

  // Handle form changes
  const updateSaleForm = (updates: Partial<SaleFormData>) => {
    setSaleForm(prev => ({ ...prev, ...updates }));
  };

  const updateSaleItem = (index: number, updates: Partial<SaleFormData['items'][0]>) => {
    const newItems = [...saleForm.items];
    newItems[index] = { ...newItems[index], ...updates };
    updateSaleForm({ items: newItems });
  };

  const addSaleItem = () => {
    updateSaleForm({
      items: [...saleForm.items, { productId: '', requestedKg: 0, pricePerKg: 0 }]
    });
  };

  const removeSaleItem = (index: number) => {
    if (saleForm.items.length > 1) {
      const newItems = saleForm.items.filter((_, i) => i !== index);
      updateSaleForm({ items: newItems });
    }
  };

  // Execute sale
  const executeSale = () => {
    if (!salePreview?.isValid) {
      toast.error('Παρακαλώ διορθώστε τα σφάλματα πριν την ολοκλήρωση');
      return;
    }

    // Create sale transaction
    const saleId = `sale_${Date.now()}`;
    const saleItems: SaleItem[] = [];

    // Process each item
    for (const [index, formItem] of saleForm.items.entries()) {
      const allocations = calculateFIFOAllocation(formItem.productId, formItem.requestedKg);
      const product = products.find(p => p.id === formItem.productId);
      
      for (const allocation of allocations) {
        saleItems.push({
          id: `si_${Date.now()}_${index}_${allocation.stockId}`,
          productId: formItem.productId,
          productName: product?.name || '',
          batchId: allocation.stockId,
          batchNumber: allocation.batchNumber,
          soldKg: allocation.allocatedKg,
          pricePerKg: formItem.pricePerKg,
          costPerKg: allocation.costPerKg,
          revenue: allocation.allocatedKg * formItem.pricePerKg,
          cost: allocation.allocatedKg * allocation.costPerKg,
          profit: (allocation.allocatedKg * formItem.pricePerKg) - (allocation.allocatedKg * allocation.costPerKg)
        });
      }
    }

    const saleTransaction: SaleTransaction = {
      id: saleId,
      saleDate: saleForm.saleDate,
      customerName: saleForm.customerName,
      items: saleItems,
      totalKg: salePreview.totalKg,
      totalRevenue: salePreview.totalRevenue,
      totalCost: salePreview.totalCost,
      totalProfit: salePreview.totalProfit,
      profitMargin: salePreview.profitMargin,
      createdAt: new Date().toISOString()
    };

    // Update stock
    const updatedStock = stockData.map(stock => {
      const allocation = salePreview.allocations.find(alloc => alloc.stockId === stock.id);
      if (allocation) {
        const newRemainingKg = stock.remainingKg - allocation.allocatedKg;
        const newSoldKg = stock.soldKg + allocation.allocatedKg;
        return {
          ...stock,
          remainingKg: newRemainingKg,
          soldKg: newSoldKg,
          isAvailable: newRemainingKg > 0,
          updatedAt: new Date().toISOString()
        };
      }
      return stock;
    });

    setStockData(updatedStock);
    onSaleComplete?.(saleTransaction);

    // Reset form
    setSaleForm({
      customerName: '',
      items: [{ productId: '', requestedKg: 0, pricePerKg: 0 }],
      saleDate: new Date().toISOString().split('T')[0],
      notes: ''
    });

    toast.success(`Πώληση ${saleId} ολοκληρώθηκε επιτυχώς!`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Header */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl">Διαχείριση Stock & Πωλήσεις</span>
              <div className="text-sm text-muted-foreground mt-1">
                FIFO allocation και live stock tracking
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Stock Overview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span>Τρέχον Stock</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stockData.filter(stock => stock.isAvailable && stock.remainingKg > 0).map(stock => (
                  <div key={stock.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">#{stock.batchNumber}</Badge>
                          <span className="font-medium">{stock.productName}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Παρ. {new Date(stock.productionDate).toLocaleDateString('el-GR')} | {stock.packagingType}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {stock.remainingKg.toFixed(1)} kg
                        </div>
                        <div className="text-sm text-muted-foreground">
                          €{stock.costPerKg.toFixed(2)}/kg
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Πωληθέντα: {stock.soldKg.toFixed(1)}kg</span>
                        <span>{((stock.soldKg / stock.totalKg) * 100).toFixed(1)}% sold</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(stock.soldKg / stock.totalKg) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Sale Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span>Νέα Πώληση</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Πελάτης *</Label>
                  <Input
                    value={saleForm.customerName}
                    onChange={(e) => updateSaleForm({ customerName: e.target.value })}
                    placeholder="Όνομα πελάτη..."
                  />
                </div>
                <div>
                  <Label htmlFor="saleDate">Ημερομηνία Πώλησης</Label>
                  <Input
                    type="date"
                    value={saleForm.saleDate}
                    onChange={(e) => updateSaleForm({ saleDate: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              {/* Sale Items */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label>Προϊόντα</Label>
                  <Button variant="outline" size="sm" onClick={addSaleItem}>
                    Προσθήκη Προϊόντος
                  </Button>
                </div>

                <div className="space-y-3">
                  {saleForm.items.map((item, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-5">
                          <Label className="text-xs">Προϊόν</Label>
                          <select
                            className="w-full p-2 border rounded text-sm"
                            value={item.productId}
                            onChange={(e) => updateSaleItem(index, { productId: e.target.value })}
                          >
                            <option value="">Επιλογή...</option>
                            {products.map(product => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="col-span-3">
                          <Label className="text-xs">Κιλά</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={item.requestedKg || ''}
                            onChange={(e) => updateSaleItem(index, { requestedKg: parseFloat(e.target.value) || 0 })}
                            className="text-sm"
                          />
                        </div>
                        
                        <div className="col-span-3">
                          <Label className="text-xs">€/kg</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.pricePerKg || ''}
                            onChange={(e) => updateSaleItem(index, { pricePerKg: parseFloat(e.target.value) || 0 })}
                            className="text-sm"
                          />
                        </div>
                        
                        <div className="col-span-1 flex items-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeSaleItem(index)}
                            disabled={saleForm.items.length === 1}
                            className="p-1 h-8"
                          >
                            ×
                          </Button>
                        </div>
                      </div>

                      {/* Show available stock for selected product */}
                      {item.productId && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Διαθέσιμα: {getAvailableStock(item.productId).reduce((sum, stock) => sum + stock.remainingKg, 0).toFixed(1)}kg
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sale Preview */}
          {salePreview && (
            <Card className={`border-2 ${salePreview.isValid ? 'border-green-200' : 'border-red-200'}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <span>Προεπισκόπηση Πώλησης</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Errors */}
                {salePreview.errors.length > 0 && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <ul className="list-disc list-inside">
                        {salePreview.errors.map((error, index) => (
                          <li key={index} className="text-sm">{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Συνολικά Κιλά</div>
                    <div className="text-lg font-bold text-blue-700">{salePreview.totalKg.toFixed(1)} kg</div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Έσοδα</div>
                    <div className="text-lg font-bold text-green-700">€{salePreview.totalRevenue.toFixed(2)}</div>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-sm text-yellow-600 font-medium">Κόστος</div>
                    <div className="text-lg font-bold text-yellow-700">€{salePreview.totalCost.toFixed(2)}</div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm text-purple-600 font-medium">Κέρδος</div>
                    <div className="text-lg font-bold text-purple-700">€{salePreview.totalProfit.toFixed(2)}</div>
                    <div className="text-xs text-purple-600">{salePreview.profitMargin.toFixed(1)}% margin</div>
                  </div>
                </div>

                {/* FIFO Allocations */}
                {salePreview.allocations.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">FIFO Allocations:</Label>
                    <div className="mt-2 space-y-1">
                      {salePreview.allocations.map((alloc, index) => (
                        <div key={index} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                          <span>#{alloc.batchNumber}</span>
                          <span>{alloc.allocatedKg.toFixed(1)}kg @ €{alloc.costPerKg.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Execute Sale Button */}
                <Button 
                  onClick={executeSale}
                  disabled={!salePreview.isValid}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Ολοκλήρωση Πώλησης
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalProductStockManager;
