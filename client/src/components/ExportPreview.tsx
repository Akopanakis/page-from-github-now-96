import React from 'react';

interface ExportPreviewProps {
  /** HTML preview to render inside the iframe */
  preview?: string
  /** Currently selected theme */
  theme?: 'classic' | 'modern' | 'minimal'
  /** Callback when a new theme is picked */
  onThemeChange?: (theme: 'classic' | 'modern' | 'minimal') => void
  /** Children to display above the preview */
  children?: React.ReactNode
  /** Source of a previously generated PDF */
  pdfSrc?: string
}

const ExportPreview: React.FC<ExportPreviewProps> = ({
  preview = '',
  pdfSrc,
  theme = 'classic',
  onThemeChange,
  children,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="lg:w-1/2 space-y-4">
        {children}
        <div>
          <label htmlFor="template" className="block text-sm font-medium mb-1">Template</label>
          <select
            id="template"
            value={theme}
            onChange={(e) => onThemeChange?.(e.target.value as 'classic' | 'modern' | 'minimal')}
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
          <iframe title="PDF Preview" className="w-full h-full" src={pdfSrc} />
        ) : (
          <iframe title="HTML Preview" className="w-full h-full" srcDoc={preview} />
        )}
      </div>
    </div>
  );
};

export default ExportPreview;
