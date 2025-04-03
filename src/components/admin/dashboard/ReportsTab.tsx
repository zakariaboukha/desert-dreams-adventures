
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const ReportsTab: React.FC = () => {
  const { t } = useTranslation();
  
  // Reports data
  const reportsData = [
    { category: 'Desert Safari', value: 35 },
    { category: 'Mountain Trek', value: 25 },
    { category: 'Cultural Tour', value: 20 },
    { category: 'Beach Escape', value: 15 },
    { category: 'City Exploration', value: 5 },
  ];

  return (
    <div className="space-y-4">
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
    </div>
  );
};
