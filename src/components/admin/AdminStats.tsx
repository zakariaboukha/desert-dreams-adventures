
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  CalendarCheck, 
  DollarSign, 
  Map
} from "lucide-react";

export function AdminStats() {
  const stats = [
    {
      title: "Total Bookings",
      value: "1,234",
      icon: CalendarCheck,
      change: "+12% from last month",
      trend: "up"
    },
    {
      title: "Total Revenue",
      value: "$45,678",
      icon: DollarSign,
      change: "+8% from last month",
      trend: "up"
    },
    {
      title: "Active Excursions",
      value: "27",
      icon: Map,
      change: "+3 from last month",
      trend: "up"
    },
    {
      title: "Registered Users",
      value: "3,456",
      icon: Users,
      change: "+24% from last month",
      trend: "up"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
