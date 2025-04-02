
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
              <RecentBookings className="col-span-4" />
              <PopularExcursions className="col-span-3" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
