
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign,
  Activity
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const revenueData = [
  { name: 'Jan 1', value: 5400 },
  { name: 'Jan 5', value: 4800 },
  { name: 'Jan 10', value: 6800 },
  { name: 'Jan 15', value: 5900 },
  { name: 'Jan 20', value: 7900 },
  { name: 'Jan 25', value: 6500 },
  { name: 'Jan 30', value: 8500 },
  { name: 'Feb 5', value: 9000 },
  { name: 'Feb 10', value: 8000 },
  { name: 'Feb 15', value: 10000 },
  { name: 'Feb 20', value: 11500 },
  { name: 'Feb 25', value: 9800 },
];

const recentActivity = [
  { id: 1, type: 'booking', user: 'John Smith', action: 'booked Desert Safari', time: '25 minutes ago' },
  { id: 2, type: 'review', user: 'Sarah Johnson', action: 'left a 5-star review', time: '2 hours ago' },
  { id: 3, type: 'booking', user: 'Ahmed Al-Farsi', action: 'cancelled Oasis Tour', time: '3 hours ago' },
  { id: 4, type: 'user', user: 'Maria Rodriguez', action: 'created an account', time: '5 hours ago' },
  { id: 5, type: 'payment', user: 'Wei Chen', action: 'made a payment of $249', time: '6 hours ago' },
];

const OverviewTab: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30days' | '90days'>('30days');
  
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center text-xs text-green-500 pt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+20.1% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <div className="flex items-center text-xs text-green-500 pt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.4% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <div className="flex items-center text-xs text-red-500 pt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>-2.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <div className="flex items-center text-xs text-green-500 pt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+4.3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Revenue Over Time</CardTitle>
            <p className="text-sm text-muted-foreground">
              Revenue trends for the past period
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={timeRange === '30days' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('30days')}
            >
              30 days
            </Button>
            <Button 
              variant={timeRange === '90days' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('90days')}
            >
              90 days
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pl-0 pt-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  fontSize={12} 
                  tickFormatter={(value) => `$${value}`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Feed */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 border-b border-border pb-4 last:border-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'booking' ? 'bg-blue-100 text-blue-700' :
                  activity.type === 'review' ? 'bg-green-100 text-green-700' :
                  activity.type === 'user' ? 'bg-purple-100 text-purple-700' :
                  'bg-yellow-100 text-yellow-700'
                } dark:bg-opacity-20`}>
                  {activity.type === 'booking' && <Calendar size={16} />}
                  {activity.type === 'review' && <TrendingUp size={16} />}
                  {activity.type === 'user' && <Users size={16} />}
                  {activity.type === 'payment' && <DollarSign size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
