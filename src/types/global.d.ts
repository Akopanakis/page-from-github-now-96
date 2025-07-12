

declare global {
  interface Window {
    Chart: any;
    XLSX: any;
    flatpickr: any;
    html2canvas: any;
    jsPDF: any;
    Sortable: any;
    ApexCharts: any;
    introJs: any;
  }
}

declare module '@/components/ui/avatar' {
  export const Avatar: any;
  export const AvatarImage: any;
  export const AvatarFallback: any;
}

export {};

