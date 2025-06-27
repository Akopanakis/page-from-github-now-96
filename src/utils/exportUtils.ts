
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';

export interface ExportData {
  [key: string]: any;
}

export const exportToCSV = (data: ExportData[], filename: string = 'export') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};

export const exportToXLSX = (data: ExportData[], filename: string = 'export') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportToPDF = async (elementId: string, filename: string = 'export') => {
  // This would use a library like jsPDF or html2canvas
  // For now, we'll just show a placeholder
  console.log('PDF export functionality would be implemented here');
  alert('PDF export functionality coming soon!');
};

/**
 * Returns a formatter that uses the active locale and currency from LanguageContext.
 */
export function useFormatCurrency() {
  const { locale, currency } = useLanguage();

  return React.useCallback(
    (amount: number): string =>
      new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount),
    [locale, currency]
  );
}

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};
