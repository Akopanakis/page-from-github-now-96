
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Award,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Calendar,
  Clock,
  Users,
  Target,
  BarChart3,
  TrendingUp,
  Star,
  Clipboard,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface QualityMetric {
  id: string;
  name: string;
  category: 'product_quality' | 'process_compliance' | 'safety' | 'documentation';
  target: number;
  current: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

interface ComplianceAudit {
  id: string;
  standard: string;
  auditor: string;
  date: string;
  score: number;
  status: 'passed' | 'conditional' | 'failed';
  findings: number;
  nextAudit: string;
  certificate: string;
}

const QualityCompliance: React.FC = () => {
  const { language } = useLanguage();
  
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetric[]>([
    {
      id: 'QM001',
      name: 'Φρεσκάδα Προϊόντων',
      category: 'product_quality',
      target: 95,
      current: 94,
      unit: '%',
      status: 'good',
      lastUpdated: '2024-01-20',
      trend: 'up'
    },
    {
      id: 'QM002',
      name: 'Συμμόρφωση HACCP',
      category: 'process_compliance',
      target: 100,
      current: 98,
      unit: '%',
      status: 'good',
      lastUpdated: '2024-01-19',
      trend: 'stable'
    },
    {
      id: 'QM003',
      name: 'Θερμοκρασία Αποθήκευσης',
      category: 'safety',
      target: 100,
      current: 100,
      unit: '%',
      status: 'excellent',
      lastUpdated: '2024-01-20',
      trend: 'stable'
    },
    {
      id: 'QM004',
      name: 'Έλεγχος Μικροβιακού Φορτίου',
      category: 'product_quality',
      target: 90,
      current: 85,
      unit: '%',
      status: 'warning',
      lastUpdated: '2024-01-18',
      trend: 'down'
    },
    {
      id: 'QM005',
      name: 'Πληρότητα Τεκμηρίωσης',
      category: 'documentation',
      target: 100,
      current: 92,
      unit: '%',
      status: 'good',
      lastUpdated: '2024-01-19',
      trend: 'up'
    }
  ]);

  const [audits, setAudits] = useState<ComplianceAudit[]>([
    {
      id: 'AUD001',
      standard: 'ISO 22000',
      auditor: 'TÜV Hellas',
      date: '2024-01-15',
      score: 92,
      status: 'passed',
      findings: 2,
      nextAudit: '2024-07-15',
      certificate: 'ISO22000-2024-001'
    },
    {
      id: 'AUD002',
      standard: 'BRC Food Safety',
      auditor: 'SGS Greece',
      date: '2023-12-10',
      score: 88,
      status: 'conditional',
      findings: 5,
      nextAudit: '2024-03-10',
      certificate: 'BRC-2023-045'
    },
    {
      id: 'AUD003',
      standard: 'IFS Food',
      auditor: 'Bureau Veritas',
      date: '2023-11-20',
      score: 95,
      status: 'passed',
      findings: 1,
      nextAudit: '2024-11-20',
      certificate: 'IFS-2023-098'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'passed': return 'bg-green-100 text-green-800';
      case 'conditional': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'good':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'warning':
      case 'conditional':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical':
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
      default: return null;
    }
  };

  const getOverallScore = () => {
    const total = qualityMetrics.reduce((sum, metric) => sum + (metric.current / metric.target) * 100, 0);
    return Math.round(total / qualityMetrics.length);
  };

  const getCriticalIssues = () => {
    return qualityMetrics.filter(metric => metric.status === 'critical' || metric.status === 'warning').length;
  };

  const getUpcomingAudits = () => {
    const today = new Date();
    const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return audits.filter(audit => new Date(audit.nextAudit) <= nextMonth).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6" />
            {language === 'el' ? 'Ποιότητα & Συμμόρφωση' : 'Quality & Compliance'}
          </h2>
          <p className="text-gray-600 mt-1">
            {language === 'el' 
              ? 'Παρακολούθηση δεικτών ποιότητας και συμμόρφωσης'
              : 'Monitor quality metrics and compliance standards'
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            {language === 'el' ? 'Αναφορά' : 'Report'}
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {language === 'el' ? 'Νέος Έλεγχος' : 'New Audit'}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Συνολικό Σκορ' : 'Overall Score'}
                </p>
                <p className="text-2xl font-bold">{getOverallScore()}%</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={getOverallScore()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Ενεργά Πρότυπα' : 'Active Standards'}
                </p>
                <p className="text-2xl font-bold">{audits.length}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Κρίσιμα Θέματα' : 'Critical Issues'}
                </p>
                <p className="text-2xl font-bold text-orange-600">{getCriticalIssues()}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Προσεχείς Έλεγχοι' : 'Upcoming Audits'}
                </p>
                <p className="text-2xl font-bold text-blue-600">{getUpcomingAudits()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">
            {language === 'el' ? 'Δείκτες Ποιότητας' : 'Quality Metrics'}
          </TabsTrigger>
          <TabsTrigger value="audits">
            {language === 'el' ? 'Έλεγχοι & Πιστοποιήσεις' : 'Audits & Certifications'}
          </TabsTrigger>
          <TabsTrigger value="actions">
            {language === 'el' ? 'Διορθωτικές Ενέργειες' : 'Corrective Actions'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {language === 'el' ? 'Δείκτες Ποιότητας' : 'Quality Metrics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityMetrics.map((metric) => (
                  <div key={metric.id} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{metric.name}</h4>
                          <Badge className={getStatusColor(metric.status)}>
                            {metric.status === 'excellent' && (language === 'el' ? 'Άριστο' : 'Excellent')}
                            {metric.status === 'good' && (language === 'el' ? 'Καλό' : 'Good')}
                            {metric.status === 'warning' && (language === 'el' ? 'Προσοχή' : 'Warning')}
                            {metric.status === 'critical' && (language === 'el' ? 'Κρίσιμο' : 'Critical')}
                          </Badge>
                          {getTrendIcon(metric.trend)}
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>
                              {metric.current}{metric.unit} / {metric.target}{metric.unit}
                            </span>
                            <span>{Math.round((metric.current / metric.target) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(metric.current / metric.target) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          {language === 'el' ? 'Τελ. Ενημέρωση' : 'Last Updated'}
                        </div>
                        <div className="text-sm font-medium">{metric.lastUpdated}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                {language === 'el' ? 'Έλεγχοι & Πιστοποιήσεις' : 'Audits & Certifications'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {audits.map((audit) => (
                  <div key={audit.id} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-lg">{audit.standard}</h4>
                          <Badge className={getStatusColor(audit.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(audit.status)}
                              {audit.status === 'passed' && (language === 'el' ? 'Επιτυχία' : 'Passed')}
                              {audit.status === 'conditional' && (language === 'el' ? 'Υπό όρους' : 'Conditional')}
                              {audit.status === 'failed' && (language === 'el' ? 'Αποτυχία' : 'Failed')}
                            </div>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">
                              {language === 'el' ? 'Ελεγκτής' : 'Auditor'}:
                            </span>
                            <div className="font-medium">{audit.auditor}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">
                              {language === 'el' ? 'Σκορ' : 'Score'}:
                            </span>
                            <div className="font-medium">{audit.score}%</div>
                          </div>
                          <div>
                            <span className="text-gray-600">
                              {language === 'el' ? 'Παρατηρήσεις' : 'Findings'}:
                            </span>
                            <div className="font-medium">{audit.findings}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">
                              {language === 'el' ? 'Επόμενος Έλεγχος' : 'Next Audit'}:
                            </span>
                            <div className="font-medium">{audit.nextAudit}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clipboard className="w-5 h-5" />
                {language === 'el' ? 'Διορθωτικές Ενέργειες' : 'Corrective Actions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">
                      {language === 'el' ? 'Βελτίωση Μικροβιακού Ελέγχου' : 'Improve Microbial Testing'}
                    </h4>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {language === 'el' ? 'Σε Εξέλιξη' : 'In Progress'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'el' 
                      ? 'Αναθεώρηση διαδικασιών μικροβιακού ελέγχου για βελτίωση αποτελεσμάτων'
                      : 'Review microbial testing procedures to improve results'
                    }
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {language === 'el' ? 'Υπεύθυνος' : 'Responsible'}: Μαρία Παπαδάκη
                    </span>
                    <span className="text-gray-600">
                      {language === 'el' ? 'Προθεσμία' : 'Due Date'}: 2024-02-15
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress value={65} className="h-2" />
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">
                      {language === 'el' ? 'Ενημέρωση Τεκμηρίωσης HACCP' : 'Update HACCP Documentation'}
                    </h4>
                    <Badge className="bg-blue-100 text-blue-800">
                      {language === 'el' ? 'Προγραμματισμένο' : 'Scheduled'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'el' 
                      ? 'Ενημέρωση και συμπλήρωση τεκμηρίωσης HACCP σύμφωνα με νέες απαιτήσεις'
                      : 'Update and complete HACCP documentation according to new requirements'
                    }
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {language === 'el' ? 'Υπεύθυνος' : 'Responsible'}: Γιάννης Κωνσταντίνου
                    </span>
                    <span className="text-gray-600">
                      {language === 'el' ? 'Προθεσμία' : 'Due Date'}: 2024-02-01
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QualityCompliance;
