
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trash2, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface BatchRecord {
  id: string;
  date: string;
  productName: string;
  quantity: number;
  finalCost: number;
  sellingPrice: number;
  profit: number;
  formData: any;
  results: any;
}

const HistoryPage: React.FC = () => {
  const { language } = useLanguage();
  const [batches, setBatches] = useState<BatchRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('');

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = () => {
    try {
      const saved = localStorage.getItem('kostopro_batches');
      if (saved) {
        setBatches(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading batches:', error);
    }
  };

  const deleteBatch = (id: string) => {
    const updated = batches.filter(batch => batch.id !== id);
    setBatches(updated);
    localStorage.setItem('kostopro_batches', JSON.stringify(updated));
  };

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = !filterMonth || batch.date.startsWith(filterMonth);
    return matchesSearch && matchesMonth;
  });

  const exportToCSV = () => {
    const headers = ['Ημερομηνία', 'Προϊόν', 'Ποσότητα', 'Κόστος', 'Τιμή', 'Κέρδος'];
    const csvContent = [
      headers.join(','),
      ...filteredBatches.map(batch => [
        batch.date,
        batch.productName,
        batch.quantity,
        batch.finalCost.toFixed(2),
        batch.sellingPrice.toFixed(2),
        batch.profit.toFixed(2)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kostopro-history.csv';
    a.click();
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{language === 'el' ? 'Ιστορικό Παρτίδων' : 'Batch History'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {language === 'el' ? 'Εξαγωγή' : 'Export'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={language === 'el' ? 'Αναζήτηση προϊόντος...' : 'Search product...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              placeholder={language === 'el' ? 'Φίλτρο μήνα' : 'Filter by month'}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'el' ? 'Ημερομηνία' : 'Date'}</TableHead>
                  <TableHead>{language === 'el' ? 'Προϊόν' : 'Product'}</TableHead>
                  <TableHead>{language === 'el' ? 'Ποσότητα' : 'Quantity'}</TableHead>
                  <TableHead>{language === 'el' ? 'Κόστος' : 'Cost'}</TableHead>
                  <TableHead>{language === 'el' ? 'Τιμή' : 'Price'}</TableHead>
                  <TableHead>{language === 'el' ? 'Κέρδος' : 'Profit'}</TableHead>
                  <TableHead>{language === 'el' ? 'Ενέργειες' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell>{new Date(batch.date).toLocaleDateString('el-GR')}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{batch.productName}</Badge>
                    </TableCell>
                    <TableCell>{batch.quantity} kg</TableCell>
                    <TableCell>€{batch.finalCost.toFixed(2)}</TableCell>
                    <TableCell>€{batch.sellingPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={batch.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        €{batch.profit.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteBatch(batch.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBatches.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {language === 'el' ? 'Δεν βρέθηκαν παρτίδες' : 'No batches found'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
