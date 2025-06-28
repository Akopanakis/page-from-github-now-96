
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Fish, Crown, Mail, Calendar, LogOut, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, logout, upgradeToPremium, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    setLocation('/login');
  };

  const handleUpgrade = async () => {
    try {
      await upgradeToPremium();
      toast({
        title: "Upgraded to Premium!",
        description: "You now have access to all premium features.",
      });
    } catch (error) {
      toast({
        title: "Upgrade failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    setLocation('/login');
    return null;
  }

  // Mock billing data
  const invoices = [
    { id: '1', date: '2024-01-15', amount: '€9.90', status: 'Paid' },
    { id: '2', date: '2023-12-15', amount: '€9.90', status: 'Paid' },
    { id: '3', date: '2023-11-15', amount: '€9.90', status: 'Paid' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Fish className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  KostoPro
                </h1>
                <p className="text-sm text-gray-600 font-medium">User Profile</p>
              </div>
            </div>
            <Button variant="secondary" onClick={() => setLocation('/')}>
              Back to App
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Type</label>
                  <div className="flex items-center space-x-2 mt-1">
                    {user.isPremium ? (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Free</Badge>
                    )}
                  </div>
                </div>
                {user.isPremium && user.subscriptionDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Premium Since</label>
                    <p className="text-lg flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(user.subscriptionDate).toLocaleDateString()}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Billing History */}
            {user.isPremium && (
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Billing History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{invoice.date}</p>
                          <p className="text-sm text-gray-600">Monthly subscription</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount}</p>
                          <Badge variant="secondary" className="text-xs">
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {!user.isPremium && (
              <Card className="shadow-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2 text-purple-800">
                    <Crown className="w-6 h-6" />
                    <span>Upgrade to Premium</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-purple-800 mb-1">€9.90</div>
                    <div className="text-sm text-purple-600">per month</div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {[
                      '✓ Multiple processing phases',
                      '✓ Batch management & traceability',
                      '✓ AI pricing predictions',
                      '✓ Advanced reports',
                      '✓ Label & barcode export',
                      '✓ Cloud backup & sync'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-purple-700">
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleUpgrade}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
