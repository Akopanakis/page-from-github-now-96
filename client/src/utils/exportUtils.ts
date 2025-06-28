
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export interface ExportData {
  [key: string]: any;
}

export const exportToCSV = (
  data: ExportData | ExportData[],
  filename: string = 'export'
) => {
  const rows = Array.isArray(data) ? data : [data];
  const ws = XLSX.utils.json_to_sheet(rows);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};

export const exportToXLSX = (
  data: ExportData | ExportData[],
  filename: string = 'export'
) => {
  const rows = Array.isArray(data) ? data : [data];
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export interface PDFSectionOptions {
  charts?: boolean;
  tables?: boolean;
  comments?: boolean;
}

export interface PDFExportOptions {
  sections: PDFSectionOptions;
  theme?: 'light' | 'dark';
  qrUrl?: string;
}

export const generatePDFBlob = async (
  html: string,
  options: PDFExportOptions
): Promise<Blob> => {
  const container = document.createElement('div');
  container.style.width = '800px';
  container.innerHTML = html;

  if (options.theme === 'dark') {
    container.classList.add('dark');
  }

  if (!options.sections.charts) {
    container.querySelectorAll('.chart-section').forEach((el) => el.remove());
  }
  if (!options.sections.tables) {
    container.querySelectorAll('.table-section').forEach((el) => el.remove());
  }
  if (!options.sections.comments) {
    container.querySelectorAll('.comments-section').forEach((el) => el.remove());
  }

  document.body.appendChild(container);

  const doc = new jsPDF('p', 'pt', 'a4');

  await doc.html(container, {
    html2canvas: { scale: 0.7 },
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setPage(doc.getNumberOfPages());
  doc.setFontSize(12);
  doc.text('Signature:', 40, pageHeight - 60);
  doc.line(110, pageHeight - 60, pageWidth - 40, pageHeight - 60);

  if (options.qrUrl) {
    const qrData = await QRCode.toDataURL(options.qrUrl);
    const size = 80;
    doc.addImage(
      qrData,
      'PNG',
      pageWidth - size - 40,
      pageHeight - size - 40,
      size,
      size
    );
  }

  const blob = doc.output('blob');

  document.body.removeChild(container);

  return blob;
};

/**
 * Generate a PDF from an HTML string using jsPDF. The HTML may contain anchor
 * links which become clickable in the resulting PDF.
 */
export const exportToPDF = async (
  html: string,
  filename: string = 'export',
  options: PDFExportOptions
) => {
  const blob = await generatePDFBlob(html, options);
  saveAs(blob, `${filename}.pdf`);
};

export const exportElementToPNG = async (
  elementId: string,
  filename: string = 'snapshot'
) => {
  const html2canvas = (await import('html2canvas')).default;
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }
  const canvas = await html2canvas(element as HTMLElement);
  canvas.toBlob((blob) => {
    if (blob) saveAs(blob, `${filename}.png`);
  });
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
