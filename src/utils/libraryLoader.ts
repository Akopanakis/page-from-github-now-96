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
