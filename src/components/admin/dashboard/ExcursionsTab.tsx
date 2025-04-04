
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash, 
  Copy,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Mock data for excursions
const excursionData = [
  { 
    id: '1', 
    name: 'Desert Safari Adventure', 
    price: 129.99, 
    category: 'Safari', 
    active: true, 
    created: '2023-04-10',
    bookings: 247
  },
  { 
    id: '2', 
    name: 'Sunset Camel Ride', 
    price: 79.99, 
    category: 'Wildlife', 
    active: true, 
    created: '2023-05-22',
    bookings: 184
  },
  { 
    id: '3', 
    name: 'Oasis Exploration', 
    price: 149.99, 
    category: 'Nature', 
    active: false, 
    created: '2023-07-15',
    bookings: 92
  },
  { 
    id: '4', 
    name: 'Dune Bashing Experience', 
    price: 189.99, 
    category: 'Adventure', 
    active: true, 
    created: '2023-08-30',
    bookings: 356
  },
  { 
    id: '5', 
    name: 'Traditional Bedouin Camp', 
    price: 159.99, 
    category: 'Cultural', 
    active: true, 
    created: '2023-09-12',
    bookings: 213
  },
];

type SortField = 'name' | 'price' | 'category' | 'bookings';
type SortDirection = 'asc' | 'desc';

const ExcursionsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to asc
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };
  
  // Filter and sort excursions
  const filteredExcursions = excursionData
    .filter(excursion => 
      excursion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excursion.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'price') {
        return sortDirection === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      } else if (sortField === 'category') {
        return sortDirection === 'asc'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      } else if (sortField === 'bookings') {
        return sortDirection === 'asc'
          ? a.bookings - b.bookings
          : b.bookings - a.bookings;
      }
      return 0;
    });
  
  const toggleRowSelection = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  
  const toggleSelectAll = () => {
    if (selectedRows.length === filteredExcursions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredExcursions.map(e => e.id));
    }
  };
    
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex w-full sm:w-96 items-center rounded-md border border-input bg-background px-3 py-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search excursions..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-1.5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {selectedRows.length > 0 && (
            <>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" /> Show
              </Button>
              <Button variant="outline" size="sm">
                <EyeOff className="h-4 w-4 mr-1" /> Hide
              </Button>
              <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                <Trash className="h-4 w-4 mr-1" /> Delete
              </Button>
            </>
          )}
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Excursion
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-muted-foreground"
                  checked={selectedRows.length === filteredExcursions.length && filteredExcursions.length > 0}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">
                  Name {getSortIcon('name')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('price')}>
                <div className="flex items-center gap-1">
                  Price {getSortIcon('price')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                <div className="flex items-center gap-1">
                  Category {getSortIcon('category')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('bookings')}>
                <div className="flex items-center gap-1">
                  Bookings {getSortIcon('bookings')}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExcursions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                  No excursions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredExcursions.map(excursion => (
                <TableRow key={excursion.id}>
                  <TableCell>
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-muted-foreground"
                      checked={selectedRows.includes(excursion.id)}
                      onChange={() => toggleRowSelection(excursion.id)}
                    />
                  </TableCell>
                  <TableCell>{excursion.name}</TableCell>
                  <TableCell>${excursion.price.toFixed(2)}</TableCell>
                  <TableCell>{excursion.category}</TableCell>
                  <TableCell>{excursion.bookings}</TableCell>
                  <TableCell>
                    {excursion.active ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-600">Active</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-500/10 text-gray-600 border-gray-600">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        {excursion.active ? (
                          <DropdownMenuItem className="cursor-pointer">
                            <EyeOff className="h-4 w-4 mr-2" />
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive cursor-pointer">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExcursionsTab;
