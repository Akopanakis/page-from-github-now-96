import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface ExportPreviewProps {
  preview: string;
  theme: 'classic' | 'modern' | 'minimal';
  onThemeChange: (theme: 'classic' | 'modern' | 'minimal') => void;
  children: React.ReactNode;
  pdfSrc?: string;
}

const ExportPreview: React.FC<ExportPreviewProps> = ({ preview, pdfSrc, theme, onThemeChange, children }) => {
  const defaultLayoutPluginInstance = React.useMemo(() => defaultLayoutPlugin(), []);

  const canDisplayPdf = typeof navigator !== 'undefined' && !!navigator.mimeTypes?.['application/pdf'];

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="lg:w-1/2 space-y-4">
        {children}
        <div>
          <label htmlFor="template" className="block text-sm font-medium mb-1">Template</label>
          <select
            id="template"
            value={theme}
            onChange={(e) => onThemeChange(e.target.value as 'classic' | 'modern' | 'minimal')}
            className="w-full border rounded p-2"
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>
      </div>
      <div className="lg:w-1/2 border rounded bg-white h-96 overflow-hidden">
        {pdfSrc ? (
          canDisplayPdf ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfSrc} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          ) : (
            <iframe title="preview" className="w-full h-full" src={pdfSrc} />
          )
        ) : (
          <iframe title="preview" className="w-full h-full" srcDoc={preview} />
        )}
      </div>
    </div>
  );
};

export default ExportPreview;
