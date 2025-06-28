import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileImage, Building2, MapPin } from 'lucide-react';
import { CompanyInfo } from '@/types/company';

interface CompanySettingsProps {
  onChange?: (info: CompanyInfo) => void;
}

const CompanySettings: React.FC<CompanySettingsProps> = ({ onChange }) => {
  const [info, setInfo] = useState<CompanyInfo>({ logoUrl: '', name: '', address: '' });

  useEffect(() => {
    const stored = localStorage.getItem('companyInfo');
    if (stored) {
      const parsed: CompanyInfo = JSON.parse(stored);
      setInfo(parsed);
      onChange?.(parsed);
    }
  }, [onChange]);

  const handleSave = () => {
    localStorage.setItem('companyInfo', JSON.stringify(info));
    onChange?.(info);
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <CardTitle className="text-white">Company Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label className="flex items-center space-x-2">
            <FileImage className="w-4 h-4" />
            <span>Logo URL</span>
          </Label>
          <Input
            value={info.logoUrl || ''}
            onChange={(e) => setInfo({ ...info, logoUrl: e.target.value })}
            placeholder="https://example.com/logo.png"
            className="mt-1"
          />
        </div>
        <div>
          <Label className="flex items-center space-x-2">
            <Building2 className="w-4 h-4" />
            <span>Company Name</span>
          </Label>
          <Input
            value={info.name || ''}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
            placeholder="My Company"
            className="mt-1"
          />
        </div>
        <div>
          <Label className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Address</span>
          </Label>
          <Input
            value={info.address || ''}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            placeholder="123 Street"
            className="mt-1"
          />
        </div>
        <div className="flex justify-end pt-2">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(CompanySettings);
