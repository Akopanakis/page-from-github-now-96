import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToXLSX, exportToCSV } from '@/utils/exportUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import ExportPreview from './ExportPreview';

interface DataExportProps {
  results: any;
  formData: any;
}

const DataExport: React.FC<DataExportProps> = ({ results, formData }) => {
  const { language } = useLanguage();
  const [template, setTemplate] = useState<'classic' | 'modern' | 'minimal'>('classic');

  const templates = {
    classic: { font: "'Times New Roman', serif", bg: '#fff', color: '#333' },
    modern: { font: 'Arial, sans-serif', bg: '#f9fafb', color: '#1f2937' },
    minimal: { font: 'Helvetica, sans-serif', bg: '#fff', color: '#374151' }
  } as const;

  const buildDataset = () => [{ ...formData, ...results }];

  const buildHtml = () => {
    const t = templates[template];
    const data = buildDataset();
    const headers = Object.keys(data[0] || {});
    const rows = data
      .map(row => `<tr>${headers.map(h => `<td>${row[h] ?? ''}</td>`).join('')}</tr>`)
      .join('');
    return `<!DOCTYPE html><html><head><style>body{font-family:${t.font};background:${t.bg};color:${t.color};margin:20px;}table{width:100%;border-collapse:collapse;}td,th{border:1px solid #ccc;padding:4px;text-align:left;}</style></head><body><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></body></html>`;
  };

  const previewHtml = useMemo(buildHtml, [results, formData, template]);

  const handleExportXLSX = () => {
    exportToXLSX(buildDataset(), 'kostopro_results');
  };

  const handleExportCSV = () => {
    exportToCSV(buildDataset(), 'kostopro_results');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>{language === 'el' ? 'Εξαγωγή Δεδομένων' : 'Data Export'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
          </div>
        </ExportPreview>
      </CardContent>
    </Card>
  );
};

export default DataExport;
