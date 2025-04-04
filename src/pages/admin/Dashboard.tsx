
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from '@/components/admin/dashboard/OverviewTab';
import ExcursionsTab from '@/components/admin/dashboard/ExcursionsTab';
import BookingsTab from '@/components/admin/dashboard/BookingsTab';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the Desert Dreams admin panel. Manage your tours, bookings, and users.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="excursions">Excursions</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="users" className="hidden md:block">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab />
        </TabsContent>
        
        <TabsContent value="excursions" className="space-y-4">
          <ExcursionsTab />
        </TabsContent>
        
        <TabsContent value="bookings" className="space-y-4">
          <BookingsTab />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <p className="text-muted-foreground">
            This tab will contain user management functionality.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
