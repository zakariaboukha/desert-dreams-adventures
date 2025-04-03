
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const AnalyticsTab: React.FC = () => {
  const { t } = useTranslation();
  
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

  return (
    <div className="space-y-4">
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
    </div>
  );
};
