
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { RecentBookings } from "@/components/admin/RecentBookings";
import { AdminStats } from "@/components/admin/AdminStats";
import { PopularExcursions } from "@/components/admin/PopularExcursions";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const Dashboard = () => {
  const { t } = useTranslation();
  
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 2400 },
    { month: 'Feb', revenue: 1398 },
    { month: 'Mar', revenue: 9800 },
    { month: 'Apr', revenue: 3908 },
    { month: 'May', revenue: 4800 },
    { month: 'Jun', revenue: 3800 },
    { month: 'Jul', revenue: 4300 },
  ];
  
  const bookingsData = [
    { month: 'Jan', bookings: 24 },
    { month: 'Feb', bookings: 13 },
    { month: 'Mar', bookings: 98 },
    { month: 'Apr', bookings: 39 },
    { month: 'May', bookings: 48 },
    { month: 'Jun', bookings: 38 },
    { month: 'Jul', bookings: 43 },
  ];

  // Analytics data
  const analyticsData = [
    { month: 'Jan', visits: 1240, conversions: 240 },
    { month: 'Feb', visits: 1580, conversions: 198 },
    { month: 'Mar', visits: 2390, conversions: 980 },
    { month: 'Apr', visits: 3490, conversions: 390 },
    { month: 'May', visits: 2680, conversions: 480 },
    { month: 'Jun', visits: 1890, conversions: 380 },
    { month: 'Jul', visits: 2100, conversions: 430 },
  ];

  // Reports data
  const reportsData = [
    { category: 'Desert Safari', value: 35 },
    { category: 'Mountain Trek', value: 25 },
    { category: 'Cultural Tour', value: 20 },
    { category: 'Beach Escape', value: 15 },
    { category: 'City Exploration', value: 5 },
  ];

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.dashboard')}</h2>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">{t('admin.overview')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('admin.analytics')}</TabsTrigger>
            <TabsTrigger value="reports">{t('admin.reports')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <AdminStats />
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>{t('admin.revenue_over_time')}</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>{t('admin.bookings_by_month')}</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={bookingsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="bookings" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <RecentBookings />
              </div>
              <div className="col-span-3">
                <PopularExcursions />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.website_analytics')}</CardTitle>
                <CardDescription>{t('admin.website_traffic_and_conversions')}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="visits" name="Website Visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="conversions" name="Conversions" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.traffic_sources')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Direct', value: 45, color: '#8884d8' },
                      { name: 'Social Media', value: 25, color: '#82ca9d' },
                      { name: 'Search Engines', value: 20, color: '#ffc658' },
                      { name: 'Referrals', value: 10, color: '#ff8042' },
                    ].map((source) => (
                      <div key={source.name} className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{source.name}</span>
                            <span className="text-sm font-medium">{source.value}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-200">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${source.value}%`,
                                backgroundColor: source.color 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.conversion_rates')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      { name: 'Homepage', rate: 3.2 },
                      { name: 'Excursions Listing', rate: 5.7 },
                      { name: 'Excursion Details', rate: 8.4 },
                      { name: 'Checkout Page', rate: 12.6 },
                    ].map((page) => (
                      <div key={page.name} className="flex items-center">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{page.name}</p>
                          <div className="flex items-center">
                            <div className="mr-2 text-xl font-bold">{page.rate}%</div>
                            <div className={`text-xs ${
                              page.rate > 5 ? 'text-green-500' : 'text-yellow-500'
                            }`}>
                              {page.rate > 5 ? 'Good' : 'Needs Improvement'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.booking_distribution')}</CardTitle>
                  <CardDescription>{t('admin.bookings_by_category')}</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                      data={reportsData}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Percentage" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.monthly_summary')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{t('admin.total_revenue')}</p>
                          <p className="text-2xl font-bold">$45,231</p>
                          <p className="text-xs text-green-600">+12.5% from last month</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('admin.total_bookings')}</p>
                          <p className="text-2xl font-bold">1,234</p>
                          <p className="text-xs text-green-600">+8.2% from last month</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium">{t('admin.top_performing_excursions')}</h4>
                      <ul className="mt-2 space-y-2">
                        {[
                          { name: 'Desert Safari Adventure', revenue: '$12,543' },
                          { name: 'Ancient Ruins Tour', revenue: '$8,721' },
                          { name: 'Mountain Trek', revenue: '$7,492' },
                          { name: 'Oasis Expedition', revenue: '$6,230' },
                        ].map((item) => (
                          <li key={item.name} className="flex items-center justify-between">
                            <span className="text-sm">{item.name}</span>
                            <span className="text-sm font-medium">{item.revenue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('admin.yearly_comparison')}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart 
                    data={[
                      { month: 'Jan', thisYear: 4000, lastYear: 2400 },
                      { month: 'Feb', thisYear: 3000, lastYear: 1398 },
                      { month: 'Mar', thisYear: 2000, lastYear: 9800 },
                      { month: 'Apr', thisYear: 2780, lastYear: 3908 },
                      { month: 'May', thisYear: 1890, lastYear: 4800 },
                      { month: 'Jun', thisYear: 2390, lastYear: 3800 },
                      { month: 'Jul', thisYear: 3490, lastYear: 4300 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="thisYear" name="This Year" stroke="#8884d8" />
                    <Line type="monotone" dataKey="lastYear" name="Last Year" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
