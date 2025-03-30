
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function PopularExcursions() {
  const excursions = [
    { name: "Sahara Desert Adventure", bookings: 89, max: 100, available: 11 },
    { name: "Atlas Mountains Expedition", bookings: 72, max: 100, available: 28 },
    { name: "Ancient Ruins Discovery", bookings: 65, max: 100, available: 35 },
    { name: "Oasis Camping Experience", bookings: 53, max: 100, available: 47 },
    { name: "Sand Dune Safari", bookings: 47, max: 100, available: 53 }
  ];

  // Colors for the bars
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Excursions</CardTitle>
        <CardDescription>Top 5 most booked excursions this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={excursions}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "bookings") return [`${value} bookings`, 'Bookings'];
                  if (name === "available") return [`${value} spots`, 'Available'];
                  return [value, name];
                }}
                labelFormatter={(label) => `Excursion: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="bookings" 
                name="Bookings"
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
              >
                {excursions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
              <Bar 
                dataKey="available" 
                name="Available Spots"
                fill="#82ca9d" 
                radius={[4, 4, 0, 0]}
                opacity={0.7}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
