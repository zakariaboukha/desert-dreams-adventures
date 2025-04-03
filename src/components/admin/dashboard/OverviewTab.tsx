
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminStats } from "@/components/admin/AdminStats";
import { RecentBookings } from "@/components/admin/RecentBookings";
import { PopularExcursions } from "@/components/admin/PopularExcursions";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const OverviewTab: React.FC = () => {
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
    <div className="space-y-4">
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
    </div>
  );
};
