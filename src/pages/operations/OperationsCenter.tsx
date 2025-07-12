import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign, Package, ShoppingCart, Users } from 'lucide-react';

const OperationsCenter = () => {
  return (
    <PageLayout title="Operations Center">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CircleDollarSign className="w-4 h-4 text-green-500" />
                <span>Revenue</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$250,000</div>
              <div className="text-sm text-gray-500">Last month</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-4 h-4 text-blue-500" />
                <span>Orders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,200</div>
              <div className="text-sm text-gray-500">Last month</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4 text-purple-500" />
                <span>Sales</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$180,000</div>
              <div className="text-sm text-gray-500">Last month</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-yellow-500" />
                <span>Customers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">500</div>
              <div className="text-sm text-gray-500">Active</div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Real-Time Operations</h2>
          <p className="text-gray-600">
            Stay updated with real-time data on your operations.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default OperationsCenter;
