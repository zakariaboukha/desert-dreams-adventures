
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Eye } from "lucide-react";
import { DeleteButton } from '@/components/admin/DeleteButton';

export function ExcursionsTable() {
  const [excursions, setExcursions] = useState([
    {
      id: 1,
      name: 'Desert Safari Adventure',
      category: 'Desert Tours',
      price: '$299',
      duration: '1 day',
      availability: true,
      featured: true
    },
    {
      id: 2,
      name: 'Oasis Expedition',
      category: 'Desert Tours',
      price: '$450',
      duration: '2 days',
      availability: true,
      featured: false
    },
    {
      id: 3,
      name: 'Ancient Ruins Tour',
      category: 'Cultural Tours',
      price: '$199',
      duration: '1 day',
      availability: true,
      featured: false
    },
    {
      id: 4,
      name: 'Mountain Trek',
      category: 'Mountain Expeditions',
      price: '$499',
      duration: '3 days',
      availability: false,
      featured: false
    },
    {
      id: 5,
      name: 'Cultural Village Tour',
      category: 'Cultural Tours',
      price: '$159',
      duration: '1 day',
      availability: true,
      featured: true
    }
  ]);

  const handleDeleteSuccess = (excursionId: string | number) => {
    setExcursions(excursions.filter(excursion => excursion.id !== excursionId));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {excursions.map((excursion) => (
            <TableRow key={excursion.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{excursion.name}</TableCell>
              <TableCell>{excursion.category}</TableCell>
              <TableCell>{excursion.price}</TableCell>
              <TableCell>{excursion.duration}</TableCell>
              <TableCell>
                <Badge variant={excursion.availability ? 'default' : 'outline'}>
                  {excursion.availability ? 'Available' : 'Unavailable'}
                </Badge>
              </TableCell>
              <TableCell>
                {excursion.featured ? (
                  <Badge variant="secondary">Featured</Badge>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <DeleteButton 
                    itemId={excursion.id}
                    itemType="Excursion"
                    itemName={excursion.name}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
