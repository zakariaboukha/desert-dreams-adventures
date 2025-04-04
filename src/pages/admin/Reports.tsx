
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, LineChart as LineChartIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Reports: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reportType = searchParams.get('type') || 'sales';
  
  const renderReportContent = () => {
    switch (reportType) {
      case 'sales':
        return (
          <div className="text-center space-y-3">
            <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-medium">Sales Reports</h3>
            <p className="text-muted-foreground max-w-md">
              Sales reporting and analytics will be available soon, providing insights 
              into your business performance over time.
            </p>
          </div>
        );
      case 'customers':
        return (
          <div className="text-center space-y-3">
            <LineChartIcon className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-medium">Customer Analytics</h3>
            <p className="text-muted-foreground max-w-md">
              Customer analytics tools are being developed to help you understand your 
              audience demographics and behavior.
            </p>
          </div>
        );
      case 'performance':
        return (
          <div className="text-center space-y-3">
            <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-medium">Performance Reports</h3>
            <p className="text-muted-foreground max-w-md">
              Performance metrics and KPIs will be available soon to track your business goals 
              and achievements.
            </p>
          </div>
        );
      default:
        return (
          <div className="text-center space-y-3">
            <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-medium">Reports Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              We're developing comprehensive reporting tools to help you gain insights 
              into your business operations.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Reports</h1>
        <p className="text-muted-foreground">
          Analytics and reporting for your business.
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            {reportType === 'sales' && 'Sales Reports'}
            {reportType === 'customers' && 'Customer Analytics'}
            {reportType === 'performance' && 'Performance Reports'}
            {!['sales', 'customers', 'performance'].includes(reportType || '') && 'Reports'}
          </CardTitle>
          <CardDescription>
            This section is under development. Coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-10">
          {renderReportContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
