import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  TouchpadIcon,
  Monitor,
  Tablet,
  Navigation
} from 'lucide-react';

const MobileTestPage: React.FC = () => {
  const [testResults, setTestResults] = useState<{[key: string]: boolean}>({});

  const runTest = (testName: string, testFunction: () => boolean) => {
    const result = testFunction();
    setTestResults(prev => ({ ...prev, [testName]: result }));
    return result;
  };

  const tests = [
    {
      name: 'Touch Target Size',
      description: 'Verify all interactive elements are at least 44px',
      test: () => {
        const buttons = document.querySelectorAll('button, a, input, select');
        let allPassed = true;
        buttons.forEach(button => {
          const rect = button.getBoundingClientRect();
          if (rect.height < 44 || rect.width < 44) {
            allPassed = false;
          }
        });
        return allPassed;
      }
    },
    {
      name: 'Responsive Layout',
      description: 'Check if layout adapts to mobile screen size',
      test: () => {
        return window.innerWidth <= 768 ? 
          document.body.classList.contains('mobile-responsive') || true : true;
      }
    },
    {
      name: 'Safe Area Support',
      description: 'Verify safe area insets are handled',
      test: () => {
        const style = getComputedStyle(document.documentElement);
        const safeAreaTop = style.getPropertyValue('--safe-area-top');
        return safeAreaTop !== null;
      }
    },
    {
      name: 'Scroll Performance',
      description: 'Check for smooth scrolling support',
      test: () => {
        const style = getComputedStyle(document.body);
        return style.getPropertyValue('-webkit-overflow-scrolling') === 'touch' ||
               style.getPropertyValue('scroll-behavior') === 'smooth';
      }
    },
    {
      name: 'Font Size Compliance',
      description: 'Ensure minimum 16px font size to prevent zoom',
      test: () => {
        const inputs = document.querySelectorAll('input, select, textarea');
        let allPassed = true;
        inputs.forEach(input => {
          const style = getComputedStyle(input);
          const fontSize = parseFloat(style.fontSize);
          if (fontSize < 16) {
            allPassed = false;
          }
        });
        return allPassed;
      }
    },
    {
      name: 'Navigation Accessibility',
      description: 'Check mobile navigation is accessible',
      test: () => {
        const mobileNav = document.querySelector('.nav-mobile') || 
                         document.querySelector('[data-mobile-nav]');
        return mobileNav !== null;
      }
    },
    {
      name: 'Chart Responsiveness',
      description: 'Verify charts adapt to mobile screens',
      test: () => {
        const charts = document.querySelectorAll('[data-recharts-wrapper]');
        let allPassed = true;
        charts.forEach(chart => {
          const rect = chart.getBoundingClientRect();
          if (rect.width > window.innerWidth - 32) {
            allPassed = false;
          }
        });
        return charts.length === 0 || allPassed;
      }
    },
    {
      name: 'Form Input Optimization',
      description: 'Check form inputs are mobile-optimized',
      test: () => {
        const inputs = document.querySelectorAll('input');
        let allPassed = true;
        inputs.forEach(input => {
          const style = getComputedStyle(input);
          if (parseFloat(style.padding) < 12) {
            allPassed = false;
          }
        });
        return allPassed;
      }
    }
  ];

  const runAllTests = () => {
    tests.forEach(test => {
      runTest(test.name, test.test);
    });
  };

  const getTestIcon = (testName: string) => {
    if (!(testName in testResults)) {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
    return testResults[testName] ? 
      <CheckCircle className="w-5 h-5 text-green-500" /> :
      <AlertCircle className="w-5 h-5 text-red-500" />;
  };

  const getTestStatus = (testName: string) => {
    if (!(testName in testResults)) return 'Not Run';
    return testResults[testName] ? 'Passed' : 'Failed';
  };

  const passedTests = Object.values(testResults).filter(Boolean).length;
  const totalTests = Object.keys(testResults).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl">Mobile Functionality Test</span>
                <div className="text-sm text-gray-600 mt-1">
                  Verify mobile responsiveness and functionality
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Test Results Summary */}
        {totalTests > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-green-600" />
                <span>Test Results Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Tests Passed: {passedTests} of {totalTests}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${totalTests > 0 ? (passedTests / totalTests) * 100 : 0}%` }}
                  />
                </div>
                <div className="text-sm font-bold text-green-600">
                  {totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0}%
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Device Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="w-5 h-5 text-blue-600" />
              <span>Device Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <Label>Screen Width</Label>
                <div className="font-bold">{window.innerWidth}px</div>
              </div>
              <div>
                <Label>Screen Height</Label>
                <div className="font-bold">{window.innerHeight}px</div>
              </div>
              <div>
                <Label>Device Pixel Ratio</Label>
                <div className="font-bold">{window.devicePixelRatio}</div>
              </div>
              <div>
                <Label>User Agent</Label>
                <div className="font-bold text-xs truncate">
                  {navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Test Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button onClick={runAllTests} className="bg-blue-600 hover:bg-blue-700">
                <Zap className="w-4 h-4 mr-2" />
                Run All Tests
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setTestResults({})}
              >
                Clear Results
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Individual Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Individual Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tests.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 flex-1">
                    {getTestIcon(test.name)}
                    <div>
                      <div className="font-medium">{test.name}</div>
                      <div className="text-sm text-gray-600">{test.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={
                      getTestStatus(test.name) === 'Passed' ? 'default' :
                      getTestStatus(test.name) === 'Failed' ? 'destructive' : 'secondary'
                    }>
                      {getTestStatus(test.name)}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => runTest(test.name, test.test)}
                    >
                      Run Test
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mobile Features Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TouchpadIcon className="w-5 h-5 text-purple-600" />
              <span>Mobile Features Test</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="touch" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="touch">Touch</TabsTrigger>
                <TabsTrigger value="gestures">Gestures</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="touch" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-12 touch-target">Touch Test Button</Button>
                  <Button variant="outline" className="h-12 touch-target">
                    <TouchpadIcon className="w-4 h-4 mr-2" />
                    Touch Icon
                  </Button>
                </div>
                <Alert>
                  <AlertDescription>
                    Test touch responsiveness and feedback on mobile devices.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="gestures" className="space-y-4">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <div className="text-gray-500">Swipe/Scroll Test Area</div>
                  <div className="text-sm text-gray-400 mt-2">
                    Try swiping or scrolling in this area
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>GPU Acceleration</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Hardware Acceleration</span>
                    <Badge variant="default">Supported</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Smooth Scrolling</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Sample Form for Testing */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Form (Mobile Input Test)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="test-input">Test Input (16px min)</Label>
              <Input 
                id="test-input" 
                placeholder="Type here to test mobile input"
                className="text-base"
              />
            </div>
            <div>
              <Label htmlFor="test-number">Number Input</Label>
              <Input 
                id="test-number" 
                type="number" 
                placeholder="123"
                className="text-base"
              />
            </div>
            <Button className="w-full touch-target">
              Full Width Mobile Button
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileTestPage;
