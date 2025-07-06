import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Smartphone,
  Tablet,
  Monitor,
  QrCode,
  Camera,
  MapPin,
  Bell,
  Fingerprint,
  Mic,
  Vibrate,
  Battery,
  Wifi,
  Signal,
  Bluetooth,
  Download,
  Share2,
  Settings,
  Eye,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Pause,
  Play,
  RotateCcw,
  Zap,
  Activity,
  CheckCircle,
  AlertTriangle,
  Navigation
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileEnhancedFeaturesProps {
  className?: string;
}

const MobileEnhancedFeatures: React.FC<MobileEnhancedFeaturesProps> = ({ className = "" }) => {
  const { language } = useLanguage();
  const [activeFeature, setActiveFeature] = useState('offline-mode');
  const [deviceInfo, setDeviceInfo] = useState({
    battery: 85,
    connectivity: 'wifi',
    storage: 2.1,
    totalStorage: 8.0
  });

  // Simulate device status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDeviceInfo(prev => ({
        ...prev,
        battery: Math.max(10, prev.battery - Math.random() * 2),
        storage: Math.min(prev.totalStorage, prev.storage + Math.random() * 0.1)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const mobileFeatures = [
    {
      id: 'offline-mode',
      title: language === 'el' ? 'Λειτουργία Offline' : 'Offline Mode',
      icon: <Wifi className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Εργαστείτε χωρίς σύνδεση στο διαδίκτυο' 
        : 'Work without internet connection',
    },
    {
      id: 'barcode-scanner',
      title: language === 'el' ? 'Σαρωτής Barcode' : 'Barcode Scanner',
      icon: <QrCode className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Σάρωση γραμμωτών κωδίκων για γρήγορη καταχώρηση' 
        : 'Scan barcodes for quick data entry',
    },
    {
      id: 'voice-input',
      title: language === 'el' ? 'Φωνητική Εισαγωγή' : 'Voice Input',
      icon: <Mic className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Καταχώρηση δεδομένων με φωνή' 
        : 'Voice-powered data entry',
    },
    {
      id: 'push-notifications',
      title: language === 'el' ? 'Ειδοποιήσεις Push' : 'Push Notifications',
      icon: <Bell className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Άμεσες ειδοποιήσεις για σημαντικά γεγονότα' 
        : 'Instant alerts for important events',
    },
    {
      id: 'gps-tracking',
      title: language === 'el' ? 'GPS Παρακολούθηση' : 'GPS Tracking',
      icon: <MapPin className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Παρακολούθηση θέσης για logistics' 
        : 'Location tracking for logistics',
    },
    {
      id: 'biometric-auth',
      title: language === 'el' ? 'Βιομετρική Πιστοποίηση' : 'Biometric Authentication',
      icon: <Fingerprint className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Ασφαλής είσοδος με δακτυλικό αποτύπωμα' 
        : 'Secure login with fingerprint',
    },
  ];

  const OfflineModePanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">{language === 'el' ? 'Κατάσταση Σύνδεσης' : 'Connection Status'}</p>
                <p className="text-2xl font-bold text-green-800">{language === 'el' ? 'Συνδεδεμένο' : 'Connected'}</p>
              </div>
              <Wifi className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">{language === 'el' ? 'Δεδομένα Offline' : 'Offline Data'}</p>
                <p className="text-2xl font-bold text-blue-800">247 MB</p>
              </div>
              <Download className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">{language === 'el' ? 'Συγχρονισμός' : 'Sync Status'}</p>
                <p className="text-2xl font-bold text-purple-800">{language === 'el' ? 'Ενημερωμένο' : 'Up to date'}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2" />
            {language === 'el' ? 'Διαχείριση Offline Δεδομένων' : 'Offline Data Management'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">{language === 'el' ? 'Προϊόντα & Τιμές:' : 'Products & Prices:'}</span>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                {language === 'el' ? 'Κατεβασμένα' : 'Downloaded'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{language === 'el' ? 'Πελάτες & Προμηθευτές:' : 'Customers & Suppliers:'}</span>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                {language === 'el' ? 'Κατεβασμένα' : 'Downloaded'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{language === 'el' ? 'Ιστορικό Παραγγελιών:' : 'Order History:'}</span>
              <Badge className="bg-yellow-100 text-yellow-800">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {language === 'el' ? 'Μερικό' : 'Partial'}
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <Button size="sm" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Κατέβασμα Όλων' : 'Download All'}
            </Button>
            <Button size="sm" variant="outline" className="flex items-center">
              <RotateCcw className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Συγχρονισμός' : 'Sync Now'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const BarcodeScannerPanel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <QrCode className="w-5 h-5 mr-2" />
            {language === 'el' ? 'Σαρωτής Barcode' : 'Barcode Scanner'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Υποστηριζόμενοι Τύποι' : 'Supported Types'}</h4>
              <div className="space-y-2">
                {['QR Code', 'Code 128', 'EAN-13', 'UPC-A', 'Code 39', 'Data Matrix'].map((type, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{type}</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {language === 'el' ? 'Ενεργό' : 'Active'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Ρυθμίσεις Σάρωσης' : 'Scan Settings'}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{language === 'el' ? 'Αυτόματη Εστίαση:' : 'Auto Focus:'}</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {language === 'el' ? 'Ενεργή' : 'Enabled'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{language === 'el' ? 'Ήχος Επιβεβαίωσης:' : 'Beep Sound:'}</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {language === 'el' ? 'Ενεργός' : 'Enabled'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{language === 'el' ? 'Δόνηση:' : 'Vibration:'}</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {language === 'el' ? 'Ενεργή' : 'Enabled'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">{language === 'el' ? 'Γρήγορες Ενέργειες' : 'Quick Actions'}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button size="sm" variant="outline" className="flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                {language === 'el' ? 'Σάρωση' : 'Scan'}
              </Button>
              <Button size="sm" variant="outline" className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {language === 'el' ? 'Προβολή' : 'View'}
              </Button>
              <Button size="sm" variant="outline" className="flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                {language === 'el' ? 'Κοινοποίηση' : 'Share'}
              </Button>
              <Button size="sm" variant="outline" className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                {language === 'el' ? 'Ρυθμίσεις' : 'Settings'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const VoiceInputPanel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mic className="w-5 h-5 mr-2" />
            {language === 'el' ? 'Φωνητική Εισαγωγή Δεδομένων' : 'Voice Data Input'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Φωνητικές Εντολές' : 'Voice Commands'}</h4>
              <div className="space-y-2">
                {[
                  { command: '"Νέος υπολογισμός"', action: 'Ξεκινά νέο υπολογισμό κόστους' },
                  { command: '"Προσθήκη προϊόντος"', action: 'Ανοίγει φόρμα προϊόντος' },
                  { command: '"Αποθήκευση"', action: 'Αποθηκεύει τρέχουσα δεδομένα' },
                  { command: '"Εξαγωγή αναφοράς"', action: 'Δημιουργεί PDF αναφορά' },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-sm text-blue-600">{item.command}</div>
                    <div className="text-xs text-gray-600 mt-1">{item.action}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Κατάσταση Μικροφώνου' : 'Microphone Status'}</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm">{language === 'el' ? 'Κατάσταση:' : 'Status:'}</span>
                  <Badge className="bg-green-100 text-green-800">
                    <Mic className="w-3 h-3 mr-1" />
                    {language === 'el' ? 'Έτοιμο' : 'Ready'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{language === 'el' ? 'Επίπεδο Ήχου:' : 'Audio Level:'}</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{language === 'el' ? 'Ακρίβεια Αναγνώρισης:' : 'Recognition Accuracy:'}</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PushNotificationsPanel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            {language === 'el' ? 'Ειδοποιήσεις Push' : 'Push Notifications'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Bell className="h-4 w-4" />
              <AlertDescription>
                {language === 'el' 
                  ? 'Οι ειδοποιήσεις σας βοηθούν να παραμείνετε ενημερωμένοι για σημαντικά γεγονότα'
                  : 'Notifications help you stay informed about important events'}
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-3">{language === 'el' ? 'Τύποι Ειδοποιήσεων' : 'Notification Types'}</h4>
                <div className="space-y-2">
                  {[
                    { type: language === 'el' ? 'Ολοκλήρωση Υπολογισμού' : 'Calculation Complete', enabled: true },
                    { type: language === 'el' ? 'Αλλαγές Τιμών' : 'Price Changes', enabled: true },
                    { type: language === 'el' ? 'Νέες Παραγγελίες' : 'New Orders', enabled: false },
                    { type: language === 'el' ? 'Προειδοποιήσεις Κόστους' : 'Cost Alerts', enabled: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{item.type}</span>
                      <Badge className={item.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {item.enabled ? (language === 'el' ? 'Ενεργή' : 'Enabled') : (language === 'el' ? 'Ανενεργή' : 'Disabled')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">{language === 'el' ? 'Προσφατες Ειδοποιήσεις' : 'Recent Notifications'}</h4>
                <div className="space-y-2">
                  {[
                    { message: language === 'el' ? 'Υπολογισμός ολοκληρώθηκε' : 'Calculation completed', time: '2 min ago' },
                    { message: language === 'el' ? 'Νέα τιμή για γαρίδα' : 'New shrimp price available', time: '15 min ago' },
                    { message: language === 'el' ? 'Αναφορά έτοιμη για εξαγωγή' : 'Report ready for export', time: '1 hour ago' },
                  ].map((notif, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                      <div className="font-medium">{notif.message}</div>
                      <div className="text-xs text-gray-500">{notif.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const GPSTrackingPanel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            {language === 'el' ? 'GPS Παρακολούθηση' : 'GPS Tracking'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Τρέχουσα Θέση' : 'Current Location'}</h4>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-medium">{language === 'el' ? 'Ακριβής Θέση' : 'Precise Location'}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {language === 'el' 
                    ? 'Θεσσαλονίκη, Ελλάδα' 
                    : 'Thessaloniki, Greece'}
                </p>
                <p className="text-xs text-gray-500">
                  Lat: 40.6401° N, Lng: 22.9444° E
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'el' ? 'Ακρίβεια: ±3 μέτρα' : 'Accuracy: ±3 meters'}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Παρακολούθηση Στόλου' : 'Fleet Tracking'}</h4>
              <div className="space-y-2">
                {[
                  { vessel: 'M/V POSEIDON', status: 'En route', distance: '15.2 km' },
                  { vessel: 'M/V TRITON', status: 'Docked', distance: '0 km' },
                  { vessel: 'M/V NEREID', status: 'Fishing', distance: '45.8 km' },
                ].map((ship, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">{ship.vessel}</div>
                      <div className="text-xs text-gray-500">{ship.status}</div>
                    </div>
                    <div className="text-sm">{ship.distance}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const BiometricAuthPanel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fingerprint className="w-5 h-5 mr-2" />
            {language === 'el' ? 'Βιομετρική Πιστοποίηση' : 'Biometric Authentication'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Καταχωρημένα Στοιχεία' : 'Enrolled Biometrics'}</h4>
              <div className="space-y-2">
                {[
                  { type: language === 'el' ? 'Δακτυλικό Αποτύπωμα' : 'Fingerprint', status: 'active' },
                  { type: language === 'el' ? 'Αναγνώριση Προσώπου' : 'Face Recognition', status: 'active' },
                  { type: language === 'el' ? 'Φωνητική Υπογραφή' : 'Voice Print', status: 'inactive' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">{item.type}</span>
                    <Badge className={item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {item.status === 'active' 
                        ? (language === 'el' ? 'Ενεργό' : 'Active')
                        : (language === 'el' ? 'Ανενεργό' : 'Inactive')}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Ρυθμίσεις Ασφαλείας' : 'Security Settings'}</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{language === 'el' ? 'Αυτόματη Έξοδος:' : 'Auto Logout:'}</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {language === 'el' ? '15 λεπτά' : '15 minutes'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">
                    {language === 'el' 
                      ? 'Αυτόματη έξοδος μετά από αδράνεια'
                      : 'Automatic logout after inactivity'}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{language === 'el' ? 'Κρυπτογράφηση:' : 'Encryption:'}</span>
                    <Badge className="bg-green-100 text-green-800">AES-256</Badge>
                  </div>
                  <p className="text-xs text-gray-600">
                    {language === 'el' 
                      ? 'Στρατιωτικού επιπέδου κρυπτογράφηση'
                      : 'Military-grade encryption'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'offline-mode':
        return <OfflineModePanel />;
      case 'barcode-scanner':
        return <BarcodeScannerPanel />;
      case 'voice-input':
        return <VoiceInputPanel />;
      case 'push-notifications':
        return <PushNotificationsPanel />;
      case 'gps-tracking':
        return <GPSTrackingPanel />;
      case 'biometric-auth':
        return <BiometricAuthPanel />;
      default:
        return <OfflineModePanel />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Device Status Bar */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Smartphone className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">{language === 'el' ? 'Κινητή Εφαρμογή' : 'Mobile Application'}</h3>
                <p className="text-blue-100 text-sm">
                  {language === 'el' ? 'Βελτιστοποιημένη για κινητές συσκευές' : 'Optimized for mobile devices'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Battery className="w-4 h-4 mr-1" />
                <span>{deviceInfo.battery.toFixed(0)}%</span>
              </div>
              <div className="flex items-center">
                <Signal className="w-4 h-4 mr-1" />
                <span>{deviceInfo.connectivity}</span>
              </div>
              <div className="flex items-center">
                <Monitor className="w-4 h-4 mr-1" />
                <span>{deviceInfo.storage.toFixed(1)}/{deviceInfo.totalStorage}GB</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="w-6 h-6 mr-2" />
            {language === 'el' ? 'Δυνατότητες Κινητής Εφαρμογής' : 'Mobile App Features'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {mobileFeatures.map((feature) => (
              <Card
                key={feature.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  activeFeature === feature.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    {feature.icon}
                    <span className="font-semibold ml-2">{feature.title}</span>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="border-t pt-6">
            {renderFeatureContent()}
          </div>
        </CardContent>
      </Card>

      {/* Responsive Design Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Monitor className="w-6 h-6 mr-2" />
            {language === 'el' ? 'Προσαρμοστικός Σχεδιασμός' : 'Responsive Design'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border-2 border-dashed border-blue-300 rounded-lg">
              <Smartphone className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-semibold">{language === 'el' ? 'Κινητό' : 'Mobile'}</h4>
              <p className="text-sm text-gray-600">320px - 768px</p>
              <Badge className="mt-2 bg-green-100 text-green-800">
                {language === 'el' ? 'Βελτιστοποιημένο' : 'Optimized'}
              </Badge>
            </div>
            <div className="text-center p-4 border-2 border-dashed border-green-300 rounded-lg">
              <Tablet className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-semibold">{language === 'el' ? 'Tablet' : 'Tablet'}</h4>
              <p className="text-sm text-gray-600">768px - 1024px</p>
              <Badge className="mt-2 bg-green-100 text-green-800">
                {language === 'el' ? 'Βελτιστοποιημένο' : 'Optimized'}
              </Badge>
            </div>
            <div className="text-center p-4 border-2 border-dashed border-purple-300 rounded-lg">
              <Monitor className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-semibold">{language === 'el' ? 'Desktop' : 'Desktop'}</h4>
              <p className="text-sm text-gray-600">1024px+</p>
              <Badge className="mt-2 bg-green-100 text-green-800">
                {language === 'el' ? 'Βελτιστοποιημένο' : 'Optimized'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileEnhancedFeatures;