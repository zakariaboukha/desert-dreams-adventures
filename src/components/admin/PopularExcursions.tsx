
import React from 'react';
import { Progress } from '@/components/ui/progress';

export function PopularExcursions() {
  const excursions = [
    { name: "Sahara Desert Adventure", bookings: 89, max: 100 },
    { name: "Atlas Mountains Expedition", bookings: 72, max: 100 },
    { name: "Ancient Ruins Discovery", bookings: 65, max: 100 },
    { name: "Oasis Camping Experience", bookings: 53, max: 100 },
    { name: "Sand Dune Safari", bookings: 47, max: 100 }
  ];

  return (
    <div className="space-y-4">
      {excursions.map((excursion) => (
        <div key={excursion.name} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{excursion.name}</span>
            <span className="text-sm text-muted-foreground">
              {excursion.bookings} bookings
            </span>
          </div>
          <Progress value={excursion.bookings} max={excursion.max} className="h-2" />
        </div>
      ))}
    </div>
  );
}
