
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Calendar, Users, Map, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentBookings } from "@/components/admin/RecentBookings";
import { AdminStats } from "@/components/admin/AdminStats";
import { PopularExcursions } from "@/components/admin/PopularExcursions";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  // Sample data for charts
  const bookingTrend = [
    { name: 'Jan', bookings: 40 },
    { name: 'Feb', bookings: 45 },
    { name: 'Mar', bookings: 55 },
    { name: 'Apr', bookings: 60 },
    { name: 'May', bookings: 75 },
    { name: 'Jun', bookings: 85 },
    { name: 'Jul', bookings: 100 },
    { name: 'Aug', bookings: 110 },
    { name: 'Sep', bookings: 90 },
    { name: 'Oct', bookings: 80 },
    { name: 'Nov', bookings: 65 },
    { name: 'Dec', bookings: 70 }
  ];

  const revenueData = [
    { name: 'Jan', revenue: 8500 },
    { name: 'Feb', revenue: 9200 },
    { name: 'Mar', revenue: 11000 },
    { name: 'Apr', revenue: 12500 },
    { name: 'May', revenue: 15000 },
    { name: 'Jun', revenue: 17500 },
    { name: 'Jul', revenue: 21000 },
    { name: 'Aug', revenue: 23500 },
    { name: 'Sep', revenue: 19000 },
    { name: 'Oct', revenue: 16500 },
    { name: 'Nov', revenue: 13800 },
    { name: 'Dec', revenue: 14500 }
  ];

  const userRegistrations = [
    { name: 'Jan', users: 22 },
    { name: 'Feb', users: 18 },
    { name: 'Mar', users: 25 },
    { name: 'Apr', users: 31 },
    { name: 'May', users: 35 },
    { name: 'Jun', users: 41 },
    { name: 'Jul', users: 48 },
    { name: 'Aug', users: 52 },
    { name: 'Sep', users: 43 },
    { name: 'Oct', users: 38 },
    { name: 'Nov', users: 32 },
    { name: 'Dec', users: 29 }
  ];

  const demographicData = [
    { name: 'Families', value: 35 },
    { name: 'Young Adults', value: 25 },
    { name: 'Seniors', value: 15 },
    { name: 'Solo Travelers', value: 20 },
    { name: 'Business', value: 5 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const destinationData = [
    { name: 'Desert', value: 45 },
    { name: 'Mountains', value: 30 },
    { name: 'Cultural', value: 15 },
    { name: 'Wildlife', value: 10 }
  ];
  
  const revenueSourcesData = [
    { name: 'Direct Bookings', value: 60 },
    { name: 'Partners', value: 25 },
    { name: 'Corporate', value: 10 },
    { name: 'Others', value: 5 }
  ];

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.dashboard')}</h2>
          <div className="flex items-center space-x-2">
            <Calendar className={`h-4 w-4 opacity-50 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString(isRTL ? 'ar' : 'en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
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
                  <CardTitle>{t('admin.booking_overview')}</CardTitle>
                  <CardDescription>
                    {t('admin.monthly_booking')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={bookingTrend}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} bookings`, 'Bookings']} />
                        <Area 
                          type="monotone" 
                          dataKey="bookings" 
                          stroke="#8884d8" 
                          fill="#8884d8" 
                          fillOpacity={0.3} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>{t('admin.popular_excursions')}</CardTitle>
                  <CardDescription>
                    {t('admin.most_booked')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PopularExcursions />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>{t('admin.recent_bookings')}</CardTitle>
                  <CardDescription>
                    {t('admin.latest_reservations')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentBookings />
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>{t('admin.revenue_overview')}</CardTitle>
                  <CardDescription>
                    {t('admin.monthly_revenue')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={revenueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`$${value}`, 'Revenue']}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#82ca9d" 
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('admin.user_demographics')}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={demographicData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {demographicData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [`${value}%`, props.payload.name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('admin.popular_destinations')}</CardTitle>
                  <Map className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={destinationData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {destinationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [`${value}%`, props.payload.name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('admin.revenue_sources')}</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueSourcesData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {revenueSourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [`${value}%`, props.payload.name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('admin.user_registration')}</CardTitle>
                <CardDescription>{t('admin.new_registrations')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userRegistrations}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} users`, 'New Registrations']}
                      />
                      <Legend />
                      <Bar dataKey="users" name="New Users" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.available_reports')}</CardTitle>
                <CardDescription>
                  {t('admin.generate_reports')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    t('admin.booking_summary'), 
                    t('admin.revenue_report'), 
                    t('admin.customer_analytics'), 
                    t('admin.excursion_performance'), 
                    t('admin.marketing_roi'), 
                    t('admin.staff_performance')
                  ].map((report) => (
                    <Card key={report} className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{report}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
