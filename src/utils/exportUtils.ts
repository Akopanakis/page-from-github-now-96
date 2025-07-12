import * as XLSX from 'xlsx';
import { CalculationResults, FormData } from './calc';

// Function to generate Excel file from form data and calculation results
export const generateExcel = (formData: FormData, results: CalculationResults): Blob => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Function to add a worksheet with key-value pairs
  const addWorksheet = (data: { [key: string]: any }, sheetName: string) => {
    const header = Object.keys(data);
    const rows = [header, Object.values(data)];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  };

  // Flatten the form data and results into simple key-value objects
  const flatFormData = flattenObject(formData);
  const flatResults = flattenObject(results);

  // Add form data worksheet
  addWorksheet(flatFormData, 'Form Data');

  // Add results worksheet
  addWorksheet(flatResults, 'Calculation Results');

  // Convert the workbook to a binary Excel file
  const wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  const wbout = XLSX.write(wb, wopts);

  // Convert the binary data to a Blob
  const blob = new Blob([new Uint8Array(wbout)], { type: 'application/octet-stream' });

  return blob;
};

// Helper function to flatten a nested object
const flattenObject = (obj: any, prefix: string = ''): { [key: string]: any } => {
  return Object.keys(obj).reduce((acc: { [key: string]: any }, k: string) => {
    const pre = prefix ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else if (Array.isArray(obj[k])) {
      obj[k].forEach((item: any, index: number) => {
        if (typeof item === 'object' && item !== null) {
          Object.assign(acc, flattenObject(item, pre + k + `[${index}]`));
        } else {
          acc[pre + k + `[${index}]`] = item;
        }
      });
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
