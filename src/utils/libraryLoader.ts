
export const loadApexCharts = async () => {
  if (typeof window !== 'undefined') {
    try {
      const ApexCharts = await import('apexcharts');
      (window as any).ApexCharts = ApexCharts.default;
      return (window as any).ApexCharts;
    } catch (error) {
      console.error('Failed to load ApexCharts:', error);
      return null;
    }
  }
  return null;
};

export const loadJsPDF = async () => {
  if (typeof window !== 'undefined') {
    try {
      const jsPDF = await import('jspdf');
      (window as any).jsPDF = jsPDF.jsPDF || jsPDF.default;
      return (window as any).jsPDF;
    } catch (error) {
      console.error('Failed to load jsPDF:', error);
      return null;
    }
  }
  return null;
};

export const loadChart = async () => {
  if (typeof window !== 'undefined') {
    try {
      const Chart = await import('chart.js/auto');
      (window as any).Chart = Chart.default;
      return (window as any).Chart;
    } catch (error) {
      console.error('Failed to load Chart.js:', error);
      return null;
    }
  }
  return null;
};

export const loadXLSX = async () => {
  if (typeof window !== 'undefined') {
    try {
      const XLSX = await import('xlsx');
      (window as any).XLSX = XLSX;
      return (window as any).XLSX;
    } catch (error) {
      console.error('Failed to load XLSX:', error);
      return null;
    }
  }
  return null;
};

export const loadFlatpickr = async () => {
  if (typeof window !== 'undefined') {
    try {
      const flatpickr = await import('flatpickr');
      (window as any).flatpickr = flatpickr.default;
      return (window as any).flatpickr;
    } catch (error) {
      console.error('Failed to load Flatpickr:', error);
      return null;
    }
  }
  return null;
};

export const loadHtml2Canvas = async () => {
  if (typeof window !== 'undefined') {
    try {
      const html2canvas = await import('html2canvas');
      (window as any).html2canvas = html2canvas.default;
      return (window as any).html2canvas;
    } catch (error) {
      console.error('Failed to load html2canvas:', error);
      return null;
    }
  }
  return null;
};

export const loadSortable = async () => {
  if (typeof window !== 'undefined') {
    try {
      const Sortable = await import('sortablejs');
      (window as any).Sortable = Sortable.default;
      return (window as any).Sortable;
    } catch (error) {
      console.error('Failed to load Sortable:', error);
      return null;
    }
  }
  return null;
};

// Main library loader object with waitForLibrary method
export const libraryLoader = {
  waitForLibrary: async (libraryName: string) => {
    switch (libraryName) {
      case 'chart':
        return await loadChart();
      case 'xlsx':
        return await loadXLSX();
      case 'flatpickr':
        return await loadFlatpickr();
      case 'html2canvas':
        return await loadHtml2Canvas();
      case 'sortable':
        return await loadSortable();
      case 'jspdf':
        return await loadJsPDF();
      case 'apexcharts':
        return await loadApexCharts();
      default:
        console.warn(`Unknown library: ${libraryName}`);
        return null;
    }
  }
};
