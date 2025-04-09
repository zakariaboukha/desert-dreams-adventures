import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, LineChart as LineChartIcon, Users, TrendingUp } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for sales reports
const salesData = [
  { month: 'Jan', sales: 4000, bookings: 120 },
  { month: 'Feb', sales: 3000, bookings: 98 },
  { month: 'Mar', sales: 5000, bookings: 150 },
  { month: 'Apr', sales: 4500, bookings: 135 },
  { month: 'May', sales: 6000, bookings: 180 },
  { month: 'Jun', sales: 5500, bookings: 165 },
];

// Mock data for customer analytics
const customerData = [
  { age: '18-24', count: 400 },
  { age: '25-34', count: 800 },
  { age: '35-44', count: 600 },
  { age: '45-54', count: 300 },
  { age: '55+', count: 200 },
];

// Mock data for performance metrics
const performanceData = [
  { metric: 'Conversion Rate', value: 3.5 },
  { metric: 'Average Booking Value', value: 250 },
  { metric: 'Customer Satisfaction', value: 4.8 },
  { metric: 'Repeat Customers', value: 35 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Reports: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reportType = searchParams.get('type') || 'sales';
  
  const renderReportContent = () => {
    switch (reportType) {
      case 'sales':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales and booking trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Sales ($)" />
                      <Bar yAxisId="right" dataKey="bookings" fill="#82ca9d" name="Bookings" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'customers':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>Age distribution of customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {customerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Business performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="text-center space-y-3">
            <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-bold">Reports Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Additional reporting features are being developed to provide more insights into your business.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <Tabs defaultValue={reportType} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {renderReportContent()}
    </div>
  );
};

export default Reports;
