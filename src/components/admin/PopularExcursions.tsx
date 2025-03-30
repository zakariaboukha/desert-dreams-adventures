
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PopularExcursions() {
  const excursions = [
    { name: "Sahara Desert Adventure", bookings: 89, max: 100 },
    { name: "Atlas Mountains Expedition", bookings: 72, max: 100 },
    { name: "Ancient Ruins Discovery", bookings: 65, max: 100 },
    { name: "Oasis Camping Experience", bookings: 53, max: 100 },
    { name: "Sand Dune Safari", bookings: 47, max: 100 }
  ];

  // Colors for the bars
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

  return (
    <div className="space-y-4">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={excursions}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
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
              formatter={(value) => [`${value} bookings`, 'Bookings']}
              labelFormatter={(label) => `Excursion: ${label}`}
            />
            <Bar dataKey="bookings" fill="#8884d8" radius={[4, 4, 0, 0]}>
              {excursions.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
