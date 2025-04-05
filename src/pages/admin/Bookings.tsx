
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarDays, ChevronLeft, ChevronRight, Filter, Search, UserPlus } from "lucide-react";
import BookingDetails from '@/components/admin/bookings/BookingDetails';
import BookingExport from '@/components/admin/bookings/BookingExport';
import BookingCreateForm from '@/components/admin/bookings/BookingCreateForm';

// Mock booking data
const bookingEvents = [
  {
    id: 'B1001',
    title: 'Desert Safari - John Smith',
    excursion: 'Desert Safari Adventure',
    customer: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 555-123-4567',
    date: new Date(2024, 3, 5),
    status: 'confirmed',
    people: 2,
    totalAmount: 259.98
  },
  {
    id: 'B1002',
    title: 'Camel Ride - Sarah Johnson',
    excursion: 'Sunset Camel Ride',
    customer: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 555-987-6543',
    date: new Date(2024, 3, 7),
    status: 'pending',
    people: 4,
    totalAmount: 319.96
  },
  {
    id: 'B1003',
    title: 'Oasis Exploration - Michael Brown',
    excursion: 'Oasis Exploration',
    customer: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '+1 555-456-7890',
    date: new Date(2024, 3, 8),
    status: 'cancelled',
    people: 1,
    totalAmount: 149.99
  },
  {
    id: 'B1004',
    title: 'Dune Bashing - David Lee',
    excursion: 'Dune Bashing Experience',
    customer: 'David Lee',
    email: 'dlee@example.com',
    phone: '+1 555-567-8901',
    date: new Date(2024, 3, 10),
    status: 'confirmed',
    people: 3,
    totalAmount: 569.97
  },
  {
    id: 'B1005',
    title: 'Bedouin Camp - Maria Garcia',
    excursion: 'Traditional Bedouin Camp',
    customer: 'Maria Garcia',
    email: 'mgarcia@example.com',
    phone: '+1 555-234-5678',
    date: new Date(2024, 3, 12),
    status: 'pending',
    people: 2,
    totalAmount: 319.98
  },
];

const excursionTypes = [
  'All Types',
  'Desert Safari Adventure',
  'Sunset Camel Ride',
  'Oasis Exploration',
  'Dune Bashing Experience',
  'Traditional Bedouin Camp'
];

const customerTiers = [
  'All Tiers',
  'Standard',
  'Silver',
  'Gold',
  'Platinum'
];

const Bookings: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [statusFilter, setStatusFilter] = useState('all');
  const [excursionFilter, setExcursionFilter] = useState('All Types');
  const [customerTierFilter, setCustomerTierFilter] = useState('All Tiers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [isNewBookingDialogOpen, setIsNewBookingDialogOpen] = useState(false);
  
  const filteredEvents = bookingEvents.filter(event => 
    (statusFilter === 'all' || event.status === statusFilter) &&
    (excursionFilter === 'All Types' || event.excursion === excursionFilter) &&
    (searchQuery === '' || 
     event.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
     event.excursion.toLowerCase().includes(searchQuery.toLowerCase()) ||
     event.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Find the selected booking from the filtered events
  const bookingDetails = selectedBooking 
    ? bookingEvents.find(booking => booking.id === selectedBooking) 
    : null;

  const getDayClassName = (day: Date): string => {
    const hasBooking = bookingEvents.some(booking => 
      booking.date.getDate() === day.getDate() &&
      booking.date.getMonth() === day.getMonth() &&
      booking.date.getFullYear() === day.getFullYear()
    );
    
    if (hasBooking) {
      return "relative before:absolute before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full before:bottom-0 before:left-1/2 before:-translate-x-1/2";
    }
    return "";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-600 border-green-600';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-600';
      case 'cancelled':
        return 'bg-red-500/10 text-red-600 border-red-600';
      default:
        return '';
    }
  };

  const handleBookingCreated = () => {
    setIsNewBookingDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Bookings Management</h1>
        <p className="text-muted-foreground">
          View and manage all bookings for your excursions.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3 space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex w-full sm:w-72 items-center rounded-md border border-input bg-background px-3 py-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-1.5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                Today
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={excursionFilter} onValueChange={setExcursionFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Excursion Type" />
              </SelectTrigger>
              <SelectContent>
                {excursionTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={customerTierFilter} onValueChange={setCustomerTierFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Customer Tier" />
              </SelectTrigger>
              <SelectContent>
                {customerTiers.map(tier => (
                  <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" className="ml-auto">
              <Filter className="h-4 w-4 mr-1" /> More Filters
            </Button>
          </div>
          
          {/* Calendar */}
          <Card>
            <CardContent className="pt-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiersClassNames={{
                  has_booking: getDayClassName(new Date()),
                }}
              />
            </CardContent>
          </Card>
          
          {/* Today's Bookings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium">Today's Bookings</h2>
            </div>
            
            {filteredEvents.length === 0 ? (
              <Card className="p-6 flex justify-center items-center">
                <div className="text-center space-y-2">
                  <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">No bookings found</h3>
                  <p className="text-sm text-muted-foreground">
                    No bookings match your current filters.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-2">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div 
                      className={`flex items-center gap-2 p-4 border-l-4 cursor-pointer ${
                        event.status === 'confirmed' ? 'border-green-500' :
                        event.status === 'pending' ? 'border-yellow-500' :
                        'border-red-500'
                      }`}
                      onClick={() => setSelectedBooking(event.id)}
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{event.excursion}</h4>
                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                              <span>{event.customer}</span>
                              <span>•</span>
                              <span>{format(event.date, 'MMM dd, yyyy')}</span>
                              <span>•</span>
                              <span>{event.people} {event.people === 1 ? 'person' : 'people'}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getStatusColor(event.status)}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                            <Badge variant="secondary">${event.totalAmount.toFixed(2)}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Panel - Booking Actions or Details */}
        <div className="w-full lg:w-1/3">
          {selectedBooking && bookingDetails ? (
            <BookingDetails booking={bookingDetails} onClose={() => setSelectedBooking(null)} />
          ) : (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="text-lg font-medium">Booking Actions</div>
                
                <Dialog open={isNewBookingDialogOpen} onOpenChange={setIsNewBookingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <UserPlus className="mr-2 h-4 w-4" />
                      New Booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Create New Booking</DialogTitle>
                      <DialogDescription>
                        Enter the details for a new booking.
                      </DialogDescription>
                    </DialogHeader>
                    <BookingCreateForm 
                      onSuccess={handleBookingCreated}
                      onCancel={() => setIsNewBookingDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
                
                <BookingExport className="w-full" />
                
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-2">Booking Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Bookings:</span>
                      <span>{bookingEvents.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Confirmed:</span>
                      <span>{bookingEvents.filter(b => b.status === 'confirmed').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending:</span>
                      <span>{bookingEvents.filter(b => b.status === 'pending').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cancelled:</span>
                      <span>{bookingEvents.filter(b => b.status === 'cancelled').length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-border mt-4">
                  <h3 className="text-sm font-medium mb-2">Today's Revenue</h3>
                  <div className="text-2xl font-bold">$1,459.94</div>
                  <p className="text-xs text-muted-foreground">From 5 bookings</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
