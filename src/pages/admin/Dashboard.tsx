import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  BarChart, 
  Bell, 
  CalendarDays, 
  CreditCard, 
  DollarSign, 
  Truck, 
  UserCheck, 
  Users 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { format } from 'date-fns';

// Mock data for the revenue chart
const revenueData = [
  { date: '2024-03-01', revenue: 1200 },
  { date: '2024-03-02', revenue: 1800 },
  { date: '2024-03-03', revenue: 1400 },
  { date: '2024-03-04', revenue: 2000 },
  { date: '2024-03-05', revenue: 2400 },
  { date: '2024-03-06', revenue: 1800 },
  { date: '2024-03-07', revenue: 2200 },
  { date: '2024-03-08', revenue: 1900 },
  { date: '2024-03-09', revenue: 2600 },
  { date: '2024-03-10', revenue: 2800 },
  { date: '2024-03-11', revenue: 2100 },
  { date: '2024-03-12', revenue: 2700 },
  { date: '2024-03-13', revenue: 2300 },
  { date: '2024-03-14', revenue: 2000 },
  { date: '2024-03-15', revenue: 2500 },
  { date: '2024-03-16', revenue: 2700 },
  { date: '2024-03-17', revenue: 3000 },
  { date: '2024-03-18', revenue: 2800 },
  { date: '2024-03-19', revenue: 3200 },
  { date: '2024-03-20', revenue: 2900 },
  { date: '2024-03-21', revenue: 3100 },
  { date: '2024-03-22', revenue: 3400 },
  { date: '2024-03-23', revenue: 3200 },
  { date: '2024-03-24', revenue: 3500 },
  { date: '2024-03-25', revenue: 3800 },
  { date: '2024-03-26', revenue: 3600 },
  { date: '2024-03-27', revenue: 4000 },
  { date: '2024-03-28', revenue: 3700 },
  { date: '2024-03-29', revenue: 4200 },
  { date: '2024-03-30', revenue: 4500 }
];

// Recent activity data
const recentActivities = [
  {
    id: 1,
    user: 'Ahmed Al-Farsi',
    action: 'booked',
    excursion: 'Desert Safari Adventure',
    time: '10 minutes ago'
  },
  {
    id: 2,
    user: 'Maria Garcia',
    action: 'cancelled',
    excursion: 'Oasis Exploration',
    time: '45 minutes ago'
  },
  {
    id: 3,
    user: 'John Smith',
    action: 'reviewed',
    excursion: 'Sunset Camel Ride',
    time: '2 hours ago'
  },
  {
    id: 4,
    user: 'Sara Johnson',
    action: 'modified',
    excursion: 'Traditional Bedouin Camp',
    time: '3 hours ago'
  },
  {
    id: 5,
    user: 'David Lee',
    action: 'booked',
    excursion: 'Dune Bashing Experience',
    time: '5 hours ago'
  }
];

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-2 rounded-md shadow-sm text-sm">
        <p className="font-medium">{`${format(new Date(label), 'MMM dd')}`}</p>
        <p className="text-primary">{`Revenue: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = React.useState<'30' | '90'>('30');

  // Filter data based on selected range
  const filteredData = dateRange === '30' 
    ? revenueData 
    : revenueData.slice(0, Math.floor(revenueData.length / 3));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">{t('admin.dashboard')}</h1>
        <p className="text-muted-foreground">
          Overview of your tour business performance and metrics.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.total_revenue')}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bookings
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.active_users')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,344</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93.6%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Over Time</CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant={dateRange === '30' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setDateRange('30')}
                >
                  30 Days
                </Button>
                <Button 
                  variant={dateRange === '90' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setDateRange('90')}
                >
                  90 Days
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={filteredData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                  tickCount={7}
                />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start gap-3 border-b border-border pb-3 last:border-0">
                  <div className="mt-0.5">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      activity.action === 'booked' 
                        ? 'bg-green-500/10 text-green-600' 
                        : activity.action === 'cancelled' 
                          ? 'bg-red-500/10 text-red-600'
                          : 'bg-blue-500/10 text-blue-600'
                    }`}>
                      {activity.action === 'booked' && <CalendarDays className="h-4 w-4" />}
                      {activity.action === 'cancelled' && <Bell className="h-4 w-4" />}
                      {activity.action === 'reviewed' && <CreditCard className="h-4 w-4" />}
                      {activity.action === 'modified' && <Truck className="h-4 w-4" />}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.user} {activity.action} {activity.excursion}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
              <TabsTrigger value="conversion">Conversion Rates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Top Excursions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Desert Safari Adventure</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Dune Bashing Experience</span>
                        <span className="font-medium">22%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sunset Camel Ride</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Traditional Bedouin Camp</span>
                        <span className="font-medium">16%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Oasis Exploration</span>
                        <span className="font-medium">12%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Customer Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>United States</span>
                        <span className="font-medium">34%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>United Kingdom</span>
                        <span className="font-medium">21%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Germany</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>France</span>
                        <span className="font-medium">12%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Australia</span>
                        <span className="font-medium">8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="traffic" className="pt-4">
              <div className="flex items-center justify-center p-6">
                <div className="text-center space-y-2">
                  <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">Traffic Source Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed traffic source analysis coming soon.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="conversion" className="pt-4">
              <div className="flex items-center justify-center p-6">
                <div className="text-center space-y-2">
                  <AreaChart className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">Conversion Rate Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Conversion funnel visualization coming soon.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
