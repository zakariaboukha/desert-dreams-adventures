
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";

export function CategoriesTable() {
  const categories = [
    {
      id: 1,
      name: 'Desert Tours',
      description: 'Explore the vast deserts and their unique landscapes',
      excursions: 12,
      slug: 'desert-tours'
    },
    {
      id: 2,
      name: 'Mountain Expeditions',
      description: 'Adventure through majestic mountains and peaks',
      excursions: 8,
      slug: 'mountain-expeditions'
    },
    {
      id: 3,
      name: 'Cultural Tours',
      description: 'Discover rich local cultures and traditions',
      excursions: 10,
      slug: 'cultural-tours'
    },
    {
      id: 4,
      name: 'Wildlife Safari',
      description: 'Observe native wildlife in their natural habitats',
      excursions: 6,
      slug: 'wildlife-safari'
    },
    {
      id: 5,
      name: 'Overnight Adventures',
      description: 'Immersive multi-day experiences in nature',
      excursions: 7,
      slug: 'overnight-adventures'
    }
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Excursions</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="hidden md:table-cell">{category.description}</TableCell>
              <TableCell>{category.excursions}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
