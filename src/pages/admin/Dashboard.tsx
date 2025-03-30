
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { BarChart, LineChart, Calendar, Users, Map, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentBookings } from "@/components/admin/RecentBookings";
import { AdminStats } from "@/components/admin/AdminStats";
import { PopularExcursions } from "@/components/admin/PopularExcursions";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Calendar className="mr-2 h-4 w-4 opacity-50" />
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <AdminStats />
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Booking Overview</CardTitle>
                  <CardDescription>
                    Monthly booking trends for the current year
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    {/* Simple placeholder for the chart */}
                    <div className="flex items-center justify-center h-full border border-dashed rounded-md bg-muted/20">
                      <div className="flex flex-col items-center text-muted-foreground">
                        <BarChart className="h-10 w-10 mb-2" />
                        <p>Booking Trend Chart</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Popular Excursions</CardTitle>
                  <CardDescription>
                    Most booked excursions this month
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
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>
                    Latest customer reservations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentBookings />
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    Monthly revenue for the current year
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px]">
                    {/* Simple placeholder for the chart */}
                    <div className="flex items-center justify-center h-full border border-dashed rounded-md bg-muted/20">
                      <div className="flex flex-col items-center text-muted-foreground">
                        <LineChart className="h-10 w-10 mb-2" />
                        <p>Revenue Chart</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Demographics</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md bg-muted/20">
                    <p className="text-muted-foreground">Demographics Chart</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Popular Destinations</CardTitle>
                  <Map className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md bg-muted/20">
                    <p className="text-muted-foreground">Destinations Chart</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue Sources</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md bg-muted/20">
                    <p className="text-muted-foreground">Revenue Sources Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>
                  Generate and download detailed reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {["Booking Summary", "Revenue Report", "Customer Analytics", 
                    "Excursion Performance", "Marketing ROI", "Staff Performance"].map((report) => (
                    <Card key={report} className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <BarChart className="h-4 w-4 text-primary" />
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
