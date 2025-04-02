
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Eye } from "lucide-react";
import { DeleteButton } from '@/components/admin/DeleteButton';
import { useToast } from "@/hooks/use-toast";

interface Excursion {
  id: number;
  name: string;
  category: string;
  price: string;
  duration: string;
  availability: boolean;
  featured: boolean;
}

interface ExcursionsTableProps {
  searchQuery?: string;
}

export function ExcursionsTable({ searchQuery = '' }: ExcursionsTableProps) {
  const { toast } = useToast();
  const [excursions, setExcursions] = useState<Excursion[]>([
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

  const [filteredExcursions, setFilteredExcursions] = useState<Excursion[]>(excursions);

  // Filter excursions when search query changes
  useEffect(() => {
    if (!searchQuery) {
      setFilteredExcursions(excursions);
    } else {
      const filtered = excursions.filter(
        (excursion) => 
          excursion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          excursion.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExcursions(filtered);
    }
  }, [searchQuery, excursions]);

  const handleDeleteSuccess = (excursionId: string | number) => {
    setExcursions(excursions.filter(excursion => excursion.id !== excursionId));
    toast({
      title: "Excursion deleted",
      description: "The excursion has been deleted successfully.",
    });
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
          {filteredExcursions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No excursions found. Try adjusting your search.
              </TableCell>
            </TableRow>
          ) : (
            filteredExcursions.map((excursion) => (
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
