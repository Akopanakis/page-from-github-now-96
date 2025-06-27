import React from 'react';

interface ExportPreviewProps {
  preview: string;
  theme: 'classic' | 'modern' | 'minimal';
  onThemeChange: (theme: 'classic' | 'modern' | 'minimal') => void;
  children: React.ReactNode;
}

const ExportPreview: React.FC<ExportPreviewProps> = ({ preview, theme, onThemeChange, children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="lg:w-1/2 space-y-4">
        {children}
        <div>
          <label htmlFor="template" className="block text-sm font-medium mb-1">Template</label>
          <select
            id="template"
            value={theme}
            onChange={e => onThemeChange(e.target.value as 'classic' | 'modern' | 'minimal')}
            className="w-full border rounded p-2"
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>
      </div>
      <div className="lg:w-1/2 border rounded bg-white h-96 overflow-hidden">
        <iframe title="preview" className="w-full h-full" srcDoc={preview} />
      </div>
    </div>
  );
};

export default ExportPreview;
