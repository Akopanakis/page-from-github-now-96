
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Package,
  Snowflake,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Thermometer,
  Clock,
  MapPin,
  Truck,
  BarChart3,
  Calendar,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface InventoryItem {
  id: string;
  name: string;
  category: 'fresh_fish' | 'frozen_fish' | 'equipment' | 'supplies' | 'fuel';
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  location: string;
  temperature?: number;
  expiryDate?: string;
  supplier: string;
  costPerUnit: number;
  lastUpdated: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
}

const InventoryManagement: React.FC = () => {
  const { language } = useLanguage();
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 'INV001',
      name: 'Τσιπούρα Φρέσκια',
      category: 'fresh_fish',
      quantity: 250,
      unit: 'kg',
      minStock: 50,
      maxStock: 500,
      location: 'Ψυγείο Α',
      temperature: 2,
      expiryDate: '2024-01-25',
      supplier: 'Αλιεία Σαρωνικού',
      costPerUnit: 8.50,
      lastUpdated: '2024-01-20T10:30:00',
      status: 'in_stock'
    },
    {
      id: 'INV002',
      name: 'Λαβράκι Κατεψυγμένο',
      category: 'frozen_fish',
      quantity: 180,
      unit: 'kg',
      minStock: 100,
      maxStock: 300,
      location: 'Καταψύκτης Β',
      temperature: -18,
      expiryDate: '2024-06-15',
      supplier: 'Frozen Sea Ltd',
      costPerUnit: 12.00,
      lastUpdated: '2024-01-19T14:15:00',
      status: 'in_stock'
    },
    {
      id: 'INV003',
      name: 'Πάγος Τροφίμων',
      category: 'supplies',
      quantity: 25,
      unit: 'kg',
      minStock: 50,
      maxStock: 200,
      location: 'Αποθήκη Γ',
      supplier: 'Ice Factory',
      costPerUnit: 0.80,
      lastUpdated: '2024-01-20T08:00:00',
      status: 'low_stock'
    },
    {
      id: 'INV004',
      name: 'Diesel Καύσιμο',
      category: 'fuel',
      quantity: 2500,
      unit: 'L',
      minStock: 1000,
      maxStock: 5000,
      location: 'Δεξαμενή 1',
      supplier: 'Marine Fuel Co',
      costPerUnit: 1.25,
      lastUpdated: '2024-01-18T16:45:00',
      status: 'in_stock'
    },
    {
      id: 'INV005',
      name: 'Δίχτυα Αλιείας',
      category: 'equipment',
      quantity: 5,
      unit: 'τεμ',
      minStock: 3,
      maxStock: 10,
      location: 'Αποθήκη Εξοπλισμού',
      supplier: 'Net Masters',
      costPerUnit: 450.00,
      lastUpdated: '2024-01-15T12:20:00',
      status: 'in_stock'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fresh_fish': return <Package className="w-4 h-4" />;
      case 'frozen_fish': return <Snowflake className="w-4 h-4" />;
      case 'equipment': return <Package className="w-4 h-4" />;
      case 'supplies': return <Package className="w-4 h-4" />;
      case 'fuel': return <Truck className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getTotalValue = () => {
    return inventory.reduce((sum, item) => sum + (item.quantity * item.costPerUnit), 0);
  };

  const getLowStockCount = () => {
    return inventory.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock').length;
  };

  const getExpiringCount = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return inventory.filter(item => 
      item.expiryDate && new Date(item.expiryDate) <= nextWeek
    ).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6" />
            {language === 'el' ? 'Διαχείριση Αποθέματος' : 'Inventory Management'}
          </h2>
          <p className="text-gray-600 mt-1">
            {language === 'el' 
              ? 'Παρακολούθηση και διαχείριση αποθεμάτων'
              : 'Track and manage inventory levels'
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            {language === 'el' ? 'Εξαγωγή' : 'Export'}
          </Button>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {language === 'el' ? 'Νέο Προϊόν' : 'Add Item'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Συνολική Αξία' : 'Total Value'}
                </p>
                <p className="text-2xl font-bold">€{getTotalValue().toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Συνολικά Προϊόντα' : 'Total Items'}
                </p>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Χαμηλό Απόθεμα' : 'Low Stock'}
                </p>
                <p className="text-2xl font-bold text-orange-600">{getLowStockCount()}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Λήγουν Σύντομα' : 'Expiring Soon'}
                </p>
                <p className="text-2xl font-bold text-red-600">{getExpiringCount()}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={language === 'el' ? 'Αναζήτηση προϊόντων...' : 'Search items...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={language === 'el' ? 'Κατηγορία' : 'Category'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'el' ? 'Όλες' : 'All Categories'}</SelectItem>
                <SelectItem value="fresh_fish">{language === 'el' ? 'Φρέσκα Ψάρια' : 'Fresh Fish'}</SelectItem>
                <SelectItem value="frozen_fish">{language === 'el' ? 'Κατεψυγμένα' : 'Frozen Fish'}</SelectItem>
                <SelectItem value="equipment">{language === 'el' ? 'Εξοπλισμός' : 'Equipment'}</SelectItem>
                <SelectItem value="supplies">{language === 'el' ? 'Αναλώσιμα' : 'Supplies'}</SelectItem>
                <SelectItem value="fuel">{language === 'el' ? 'Καύσιμα' : 'Fuel'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {language === 'el' ? 'Λίστα Αποθέματος' : 'Inventory List'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">{language === 'el' ? 'Προϊόν' : 'Item'}</th>
                  <th className="text-left p-3">{language === 'el' ? 'Κατηγορία' : 'Category'}</th>
                  <th className="text-left p-3">{language === 'el' ? 'Ποσότητα' : 'Quantity'}</th>
                  <th className="text-left p-3">{language === 'el' ? 'Θέση' : 'Location'}</th>
                  <th className="text-left p-3">{language === 'el' ? 'Κατάσταση' : 'Status'}</th>
                  <th className="text-left p-3">{language === 'el' ? 'Αξία' : 'Value'}</th>
                  <th className="text-left p-3">{language === 'el' ? 'Ενέργειες' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.id}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <span className="text-sm">
                          {item.category === 'fresh_fish' && (language === 'el' ? 'Φρέσκα' : 'Fresh')}
                          {item.category === 'frozen_fish' && (language === 'el' ? 'Κατεψυγμένα' : 'Frozen')}
                          {item.category === 'equipment' && (language === 'el' ? 'Εξοπλισμός' : 'Equipment')}
                          {item.category === 'supplies' && (language === 'el' ? 'Αναλώσιμα' : 'Supplies')}
                          {item.category === 'fuel' && (language === 'el' ? 'Καύσιμα' : 'Fuel')}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <span className="font-medium">{item.quantity}</span>
                        <span className="text-sm text-gray-600 ml-1">{item.unit}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Min: {item.minStock} | Max: {item.maxStock}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                      {item.temperature && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Thermometer className="w-3 h-3" />
                          {item.temperature}°C
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status === 'in_stock' && (language === 'el' ? 'Διαθέσιμο' : 'In Stock')}
                        {item.status === 'low_stock' && (language === 'el' ? 'Χαμηλό' : 'Low Stock')}
                        {item.status === 'out_of_stock' && (language === 'el' ? 'Εξαντλημένο' : 'Out of Stock')}
                        {item.status === 'expired' && (language === 'el' ? 'Ληγμένο' : 'Expired')}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">
                        €{(item.quantity * item.costPerUnit).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        €{item.costPerUnit}/{item.unit}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedItem(item)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Item Details Modal */}
      {selectedItem && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div>
              <CardTitle>{selectedItem.name}</CardTitle>
              <p className="text-sm text-gray-600">{selectedItem.id}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </Button>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">
                  {language === 'el' ? 'Στοιχεία Προϊόντος' : 'Product Details'}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'el' ? 'Ποσότητα' : 'Quantity'}:
                    </span>
                    <span>{selectedItem.quantity} {selectedItem.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'el' ? 'Κόστος/Μονάδα' : 'Cost per Unit'}:
                    </span>
                    <span>€{selectedItem.costPerUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'el' ? 'Συνολική Αξία' : 'Total Value'}:
                    </span>
                    <span className="font-semibold">
                      €{(selectedItem.quantity * selectedItem.costPerUnit).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'el' ? 'Προμηθευτής' : 'Supplier'}:
                    </span>
                    <span>{selectedItem.supplier}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">
                  {language === 'el' ? 'Στοιχεία Αποθήκευσης' : 'Storage Details'}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'el' ? 'Τοποθεσία' : 'Location'}:
                    </span>
                    <span>{selectedItem.location}</span>
                  </div>
                  {selectedItem.temperature && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'el' ? 'Θερμοκρασία' : 'Temperature'}:
                      </span>
                      <span>{selectedItem.temperature}°C</span>
                    </div>
                  )}
                  {selectedItem.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'el' ? 'Ημ. Λήξης' : 'Expiry Date'}:
                      </span>
                      <span>{selectedItem.expiryDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'el' ? 'Τελ. Ενημέρωση' : 'Last Updated'}:
                    </span>
                    <span>{new Date(selectedItem.lastUpdated).toLocaleDateString('el-GR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InventoryManagement;
