
import React from 'react';
import { 
  Search, 
  Plus, 
  Filter,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ExcursionActions from '@/components/admin/excursions/ExcursionActions';

// Import excursion data (same data from ExcursionsTab)
import { excursionData } from '@/components/admin/excursions/data';

type SortField = 'name' | 'price' | 'category' | 'bookings';
type SortDirection = 'asc' | 'desc';

const Excursions: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [sortField, setSortField] = React.useState<SortField>('name');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');

  // Filter categories from data
  const categories = [...new Set(excursionData.map(excursion => excursion.category))];
  
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
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
      // Search filter
      (excursion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excursion.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      // Category filter
      (categoryFilter === 'all' || excursion.category === categoryFilter) &&
      // Status filter
      (statusFilter === 'all' || 
       (statusFilter === 'active' && excursion.active) || 
       (statusFilter === 'inactive' && !excursion.active))
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Excursions</h1>
          <p className="text-muted-foreground">
            Manage all your tour excursions in one place.
          </p>
        </div>
        <Button onClick={() => navigate('/admin/excursions/create')}>
          <Plus className="h-4 w-4 mr-1" /> Create Excursion
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Excursion Management</CardTitle>
          <CardDescription>
            View, filter, and manage all your tour excursions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex w-full sm:w-96 items-center rounded-md border border-input bg-background px-3 py-1">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search excursions..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-1.5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-32 h-9">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="h-4 w-4 mr-1" /> More Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Price Range</DropdownMenuItem>
                    <DropdownMenuItem>Date Added</DropdownMenuItem>
                    <DropdownMenuItem>Popularity</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
              </div>
            </div>
            
            {/* Bulk actions */}
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-2 py-2 bg-muted/50 px-3 rounded-md">
                <span className="text-sm font-medium">{selectedRows.length} selected</span>
                <div className="flex-1"></div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" /> Set Active
                </Button>
                <Button variant="outline" size="sm">
                  <EyeOff className="h-4 w-4 mr-1" /> Set Inactive
                </Button>
                <Button variant="destructive" size="sm">
                  Delete Selected
                </Button>
              </div>
            )}
            
            {/* Table */}
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
                          <ExcursionActions excursion={excursion} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Excursions;
