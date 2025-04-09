import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff,
  Plus, 
  ArrowUp,
  ArrowDown,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";
import ExcursionActions from '@/components/admin/excursions/ExcursionActions';
import ExcursionFilters from '@/components/admin/excursions/ExcursionFilters';

// Import excursion data
import { excursionData } from '@/components/admin/excursions/data';

type SortField = 'name' | 'price' | 'category' | 'bookings';
type SortDirection = 'asc' | 'desc';

const Excursions: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [excursions, setExcursions] = useState(excursionData);

  // Filter categories from data
  const categories = [...new Set(excursions.map(excursion => excursion.category))];
  
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

  const updateExcursion = (id: string, data: Partial<typeof excursions[0]>) => {
    // In a real app, this would be an API call to Supabase
    const updatedExcursions = excursions.map(excursion => 
      excursion.id === id ? { ...excursion, ...data } : excursion
    );
    setExcursions(updatedExcursions);
  };

  const duplicateExcursion = (id: string) => {
    // In a real app, this would be an API call to Supabase
    const excursionToDuplicate = excursions.find(e => e.id === id);
    if (!excursionToDuplicate) return;
    
    const newExcursion = {
      ...excursionToDuplicate,
      id: (Math.max(...excursions.map(e => parseInt(e.id))) + 1).toString(),
      name: `${excursionToDuplicate.name} (Copy)`,
      created: new Date().toISOString().split('T')[0]
    };
    
    setExcursions([...excursions, newExcursion]);
  };

  const deleteExcursion = (id: string) => {
    // In a real app, this would be an API call to Supabase
    const updatedExcursions = excursions.filter(e => e.id !== id);
    setExcursions(updatedExcursions);
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };
  
  // Filter and sort excursions
  const filteredExcursions = excursions
    .filter(excursion => 
      // Search filter
      (excursion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excursion.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      // Category filter
      (categoryFilter === 'all' || excursion.category === categoryFilter) &&
      // Status filter
      (statusFilter === 'all' || 
       (statusFilter === 'active' && excursion.active) || 
       (statusFilter === 'inactive' && !excursion.active)) &&
      // Price filter
      (excursion.price >= priceRange[0] && excursion.price <= priceRange[1])
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

  const handleBulkStatusUpdate = (active: boolean) => {
    if (selectedRows.length === 0) return;
    
    // In a real app, this would be an API call to Supabase
    const updatedExcursions = excursions.map(excursion => 
      selectedRows.includes(excursion.id) ? { ...excursion, active } : excursion
    );
    
    setExcursions(updatedExcursions);
    toast.success(`${selectedRows.length} excursions ${active ? 'activated' : 'deactivated'}`);
  };
  
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    
    // In a real app, this would be an API call to Supabase
    const updatedExcursions = excursions.filter(excursion => !selectedRows.includes(excursion.id));
    setExcursions(updatedExcursions);
    setSelectedRows([]);
    toast.success(`${selectedRows.length} excursions deleted`);
  };

  const handleExport = () => {
    // In a real app, this would generate and download a file
    toast.success("Export feature will be available soon");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-col sm:flex-row gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Excursions</h1>
          <p className="text-muted-foreground">
            Manage all your tour excursions in one place.
          </p>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => navigate('/admin/excursions/categories')} className="w-full xs:w-auto">
            Categories
          </Button>
          <Button onClick={() => navigate('/admin/excursions/create')} className="w-full xs:w-auto">
            <Plus className="h-4 w-4 mr-1" /> Create Excursion
          </Button>
        </div>
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
            <ExcursionFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              categories={categories}
            />
            
            {/* Bulk actions */}
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-2 py-2 bg-muted/50 px-3 rounded-md">
                <span className="text-sm font-medium">{selectedRows.length} selected</span>
                <div className="flex-1"></div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkStatusUpdate(true)}
                >
                  <Eye className="h-4 w-4 mr-1" /> Set Active
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkStatusUpdate(false)}
                >
                  <EyeOff className="h-4 w-4 mr-1" /> Set Inactive
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleExport}
                >
                  <Download className="h-4 w-4 mr-1" /> Export Selected
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleBulkDelete}
                >
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
                          <ExcursionActions 
                            excursion={excursion}
                            onUpdate={updateExcursion}
                            onDelete={deleteExcursion}
                            onDuplicate={duplicateExcursion}
                          />
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
