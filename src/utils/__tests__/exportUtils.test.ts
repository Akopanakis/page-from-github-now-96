import * as Utils from '../exportUtils';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));

jest.mock('xlsx', () => {
  return {
    utils: {
      json_to_sheet: jest.fn(() => 'sheet'),
      sheet_to_csv: jest.fn(() => 'csv'),
      book_new: jest.fn(() => 'wb'),
      book_append_sheet: jest.fn(),
    },
    writeFile: jest.fn(),
  };
});

describe('exportUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('exportToCSV uses correct data', () => {
    const data = { a: 1, b: 2 };
    Utils.exportToCSV(data, 'file');
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([data]);
    expect(XLSX.utils.sheet_to_csv).toHaveBeenCalledWith('sheet');
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'file.csv');
  });

  test('exportToXLSX uses correct data', () => {
    const data = { a: 1 };
    Utils.exportToXLSX(data, 'excel');
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([data]);
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith('wb', 'sheet', 'Sheet1');
    expect(XLSX.writeFile).toHaveBeenCalledWith('wb', 'excel.xlsx');
  });

  test('exportToPDF calls generatePDFBlob and saveAs', async () => {
    const spy = jest.spyOn(Utils, 'generatePDFBlob').mockResolvedValue(new Blob(['pdf']));
    await Utils.exportToPDF('<div></div>', 'doc', { sections: {} });
    expect(spy).toHaveBeenCalledWith('<div></div>', { sections: {} });
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'doc.pdf');
  });
});
