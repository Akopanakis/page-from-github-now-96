import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Image } from 'lucide-react';
import { exportToXLSX, exportToCSV, exportElementToPNG } from '@/utils/exportUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import ExportPreview from './ExportPreview';

interface DataExportProps {
  results: any;
  formData: any;
}

const DataExport: React.FC<DataExportProps> = ({ results, formData }) => {
  const { language, t } = useLanguage();
  const [template, setTemplate] = useState<'classic' | 'modern' | 'minimal'>('classic');

  const templates = {
    classic: { font: "'Times New Roman', serif", bg: '#fff', color: '#333' },
    modern: { font: 'Arial, sans-serif', bg: '#f9fafb', color: '#1f2937' },
    minimal: { font: 'Helvetica, sans-serif', bg: '#fff', color: '#374151' }
  } as const;

  // Συλλογή όλων των διαθέσιμων πεδίων (μόνο primitive, όχι αντικείμενα)
  const availableFields = useMemo(() => {
    const merged = { ...formData, ...results } as Record<string, any>;
    return Object.entries(merged)
      .filter(([, value]) => typeof value !== 'object')
      .map(([key]) => key);
  }, [formData, results]);

  // Κατάσταση επιλεγμένων πεδίων
  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>({});

  const handleSelectAll = () => {
    const all: Record<string, boolean> = {};
    availableFields.forEach((f) => {
      all[f] = true;
    });
    setSelectedFields(all);
  };

  const handleClear = () => {
    const none: Record<string, boolean> = {};
    availableFields.forEach((f) => {
      none[f] = false;
    });
    setSelectedFields(none);
  };

  useEffect(() => {
    const defaults: Record<string, boolean> = {};
    availableFields.forEach((f) => { defaults[f] = true; });
    setSelectedFields(defaults);
  }, [availableFields]);

  // Dataset μόνο με τα επιλεγμένα πεδία
  const buildDataset = () => {
    const merged = { ...formData, ...results } as Record<string, any>;
    const row: Record<string, any> = {};
    Object.entries(merged).forEach(([key, value]) => {
      if (selectedFields[key]) {
        row[t?.(key) || key] = typeof value === 'number' ? value.toFixed(2) : value;
      }
    });
    return [row];
  };

  // HTML για preview/export
  const buildHtml = () => {
    const tT = templates[template];
    const data = buildDataset();
    const headers = Object.keys(data[0] || {});
    const rows = data
      .map(row => `<tr>${headers.map(h => `<td>${row[h] ?? ''}</td>`).join('')}</tr>`)
      .join('');
    return `<!DOCTYPE html><html><head><style>
      body{font-family:${tT.font};background:${tT.bg};color:${tT.color};margin:20px;}
      table{width:100%;border-collapse:collapse;}
      td,th{border:1px solid #ccc;padding:4px;text-align:left;}
      </style></head>
      <body>
        <table>
          <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </body></html>`;
  };

  const previewHtml = useMemo(buildHtml, [results, formData, template, selectedFields, t]);

  const handleExportXLSX = () => {
    exportToXLSX(buildDataset(), 'kostopro_results');
  };

  const handleExportCSV = () => {
    exportToCSV(buildDataset(), 'kostopro_results');
  };

  const handleExportPNG = () => {
    exportElementToPNG('report-preview', 'kostopro_snapshot');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>{language === 'el' ? 'Εξαγωγή Δεδομένων' : 'Data Export'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Επιλογή πεδίων για εξαγωγή */}
        <div className="space-y-2 pb-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                {language === 'el' ? 'Επιλογή Πεδίων' : 'Select Fields'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-2">
              <div className="flex justify-between text-xs mb-2">
                <button onClick={handleSelectAll} className="underline">
                  {language === 'el' ? 'Επιλογή όλων' : 'Select All'}
                </button>
                <button onClick={handleClear} className="underline">
                  {language === 'el' ? 'Καθαρισμός' : 'Clear'}
                </button>
              </div>
              <ScrollArea className="max-h-[300px] pr-2">
                <div className="space-y-2">
                  {availableFields.map((field) => (
                    <div key={field} className="flex items-center space-x-2 text-sm">
                      <Checkbox
                        id={field}
                        checked={selectedFields[field]}
                        onCheckedChange={(checked) =>
                          setSelectedFields((prev) => ({ ...prev, [field]: checked as boolean }))
                        }
                      />
                      <Label htmlFor={field} className="cursor-pointer">
                        {t?.(field) || field}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

          <div className="flex flex-wrap gap-1 mt-2">
            {Object.keys(selectedFields)
              .filter((f) => selectedFields[f])
              .map((f) => (
                <Badge key={f} variant="secondary" className="text-xs">
                  {t?.(f) || f}
                </Badge>
              ))}
          </div>
        </div>

        <ExportPreview preview={previewHtml} theme={template} onThemeChange={setTemplate}>
          <div className="flex space-x-2">
            <Button onClick={handleExportXLSX} className="w-full" size="lg">
              <Download className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Λήψη Excel' : 'Download Excel'}
            </Button>
            <Button onClick={handleExportCSV} className="w-full" size="lg" variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Λήψη CSV' : 'Download CSV'}
            </Button>
            <Button onClick={handleExportPNG} className="w-full" size="lg" variant="outline">
              <Image className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Στιγμιότυπο' : 'Snapshot Export'}
            </Button>
          </div>
        </ExportPreview>
      </CardContent>
    </Card>
  );
};

export default DataExport;
