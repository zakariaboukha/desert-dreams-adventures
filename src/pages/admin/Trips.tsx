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
import TripActions from '@/components/admin/trips/TripActions';
import TripFilters from '@/components/admin/trips/TripFilters';

// Import trip data
import { tripData } from '@/components/admin/trips/data';

type SortField = 'name' | 'price' | 'category' | 'bookings';
type SortDirection = 'asc' | 'desc';

const Trips: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600]);
  const [trips, setTrips] = useState(tripData);

  // Filter categories from data
  const categories = [...new Set(trips.map(trip => trip.category))];
  
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

  const updateTrip = (id: string, data: Partial<typeof trips[0]>) => {
    // In a real app, this would be an API call to Supabase
    const updatedTrips = trips.map(trip => 
      trip.id === id ? { ...trip, ...data } : trip
    );
    setTrips(updatedTrips);
  };

  const duplicateTrip = (id: string) => {
    // In a real app, this would be an API call to Supabase
    const tripToDuplicate = trips.find(t => t.id === id);
    if (!tripToDuplicate) return;
    
    const newTrip = {
      ...tripToDuplicate,
      id: (Math.max(...trips.map(t => parseInt(t.id))) + 1).toString(),
      name: `${tripToDuplicate.name} (Copy)`,
      created: new Date().toISOString().split('T')[0]
    };
    
    setTrips([...trips, newTrip]);
  };

  const deleteTrip = (id: string) => {
    // In a real app, this would be an API call to Supabase
    const updatedTrips = trips.filter(t => t.id !== id);
    setTrips(updatedTrips);
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };
  
  // Filter and sort trips
  const filteredTrips = trips
    .filter(trip => 
      // Search filter
      (trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      // Category filter
      (categoryFilter === 'all' || trip.category === categoryFilter) &&
      // Status filter
      (statusFilter === 'all' || 
       (statusFilter === 'active' && trip.active) || 
       (statusFilter === 'inactive' && !trip.active)) &&
      // Price filter
      (trip.price >= priceRange[0] && trip.price <= priceRange[1])
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
    if (selectedRows.length === filteredTrips.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredTrips.map(t => t.id));
    }
  };

  const handleBulkStatusUpdate = (active: boolean) => {
    if (selectedRows.length === 0) return;
    
    // In a real app, this would be an API call to Supabase
    const updatedTrips = trips.map(trip => 
      selectedRows.includes(trip.id) ? { ...trip, active } : trip
    );
    
    setTrips(updatedTrips);
    toast.success(`${selectedRows.length} trips ${active ? 'activated' : 'deactivated'}`);
  };
  
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    
    // In a real app, this would be an API call to Supabase
    const updatedTrips = trips.filter(trip => !selectedRows.includes(trip.id));
    setTrips(updatedTrips);
    setSelectedRows([]);
    toast.success(`${selectedRows.length} trips deleted`);
  };

  const handleExport = () => {
    // In a real app, this would generate and download a file
    toast.success("Export feature will be available soon");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-col sm:flex-row gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Trips</h1>
          <p className="text-muted-foreground">
            Manage all your travel trips in one place.
          </p>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={() => navigate('/admin/trips/create')} className="w-full xs:w-auto">
            <Plus className="h-4 w-4 mr-1" /> Create Trip
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Trip Management</CardTitle>
          <CardDescription>
            View, filter, and manage all your travel trips.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters and Search */}
            <TripFilters 
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
                        checked={selectedRows.length === filteredTrips.length && filteredTrips.length > 0}
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
                  {filteredTrips.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                        No trips found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTrips.map(trip => (
                      <TableRow key={trip.id}>
                        <TableCell>
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 rounded border-muted-foreground"
                            checked={selectedRows.includes(trip.id)}
                            onChange={() => toggleRowSelection(trip.id)}
                          />
                        </TableCell>
                        <TableCell>{trip.name}</TableCell>
                        <TableCell>${trip.price.toFixed(2)}</TableCell>
                        <TableCell>{trip.category}</TableCell>
                        <TableCell>{trip.bookings}</TableCell>
                        <TableCell>
                          {trip.active ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-600">Active</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-500/10 text-gray-600 border-gray-600">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <TripActions 
                            trip={trip}
                            onUpdate={updateTrip}
                            onDelete={deleteTrip}
                            onDuplicate={duplicateTrip}
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

export default Trips;