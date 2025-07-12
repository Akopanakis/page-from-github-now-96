import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle, AlertTriangle } from 'lucide-react';

interface Requirement {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

const ISOPage: React.FC = () => {
  const requirements: Requirement[] = [
    { id: '1', title: 'Establish a Quality Management System', status: 'completed' },
    { id: '2', title: 'Management Responsibility', status: 'in-progress' },
    { id: '3', title: 'Resource Management', status: 'not-started' },
    { id: '4', title: 'Product Realization', status: 'completed' },
    { id: '5', title: 'Measurement, Analysis and Improvement', status: 'in-progress' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-500" />;
    }
  };

  const overallProgress = requirements.map(req => req.status === 'completed' ? 100 : req.status === 'in-progress' ? 50 : 0)
      .reduce((acc: number, curr: number) => acc + curr, 0) / requirements.length;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">ISO 9001 Compliance</h1>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge className="bg-blue-500 text-white">{overallProgress.toFixed(2)}%</Badge>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {requirements.map(req => (
          <Card key={req.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getStatusIcon(req.status)}
                <span>{req.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: {req.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ISOPage;
