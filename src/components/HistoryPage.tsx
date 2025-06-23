
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function HistoryPage() {
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    const savedBatches = JSON.parse(localStorage.getItem('batches') || '[]');
    setBatches(savedBatches);
  }, []);

  const deleteBatch = (id: string) => {
    const updatedBatches = batches.filter((batch: any) => batch.id !== id);
    setBatches(updatedBatches);
    localStorage.setItem('batches', JSON.stringify(updatedBatches));
  };

  return (
    <div className="container max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === 'el' ? 'Πίσω' : 'Back'}
        </Button>
        <h1 className="text-3xl font-bold">
          {language === 'el' ? 'Ιστορικό Παρτίδων' : 'Batch History'}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'el' ? 'Αποθηκευμένες Παρτίδες' : 'Saved Batches'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {batches.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {language === 'el' 
                ? 'Δεν υπάρχουν αποθηκευμένες παρτίδες' 
                : 'No saved batches'}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'el' ? 'Ημερομηνία' : 'Date'}</TableHead>
                  <TableHead>{language === 'el' ? 'Τελικό Βάρος' : 'Final Weight'}</TableHead>
                  <TableHead>{language === 'el' ? 'Συνολικό Κόστος' : 'Total Cost'}</TableHead>
                  <TableHead>{language === 'el' ? 'Κέρδος' : 'Profit'}</TableHead>
                  <TableHead>{language === 'el' ? 'Ενέργειες' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((batch: any) => (
                  <TableRow key={batch.id}>
                    <TableCell>
                      {new Date(batch.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {batch.results.finalWeight.toFixed(2)} kg
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        €{batch.results.totalCost.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-600">
                        €{batch.results.profit.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteBatch(batch.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
