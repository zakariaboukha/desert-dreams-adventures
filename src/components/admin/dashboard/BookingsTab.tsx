
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar as CalendarIcon, FileDown, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

// Mock booking data
const bookingEvents = [
  {
    id: 'B1001',
    title: 'Desert Safari - John Smith',
    excursion: 'Desert Safari Adventure',
    customer: 'John Smith',
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
    date: new Date(2024, 3, 12),
    status: 'pending',
    people: 2,
    totalAmount: 319.98
  },
];

const BookingsTab: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  
  const filteredEvents = bookingEvents.filter(event => 
    (statusFilter === 'all' || event.status === statusFilter)
  );

  const toggleBookingSelection = (id: string) => {
    if (selectedBookings.includes(id)) {
      setSelectedBookings(selectedBookings.filter(bookingId => bookingId !== id));
    } else {
      setSelectedBookings([...selectedBookings, id]);
    }
  };

  const getDayClassName = (day: Date) => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2 className="text-xl font-semibold">Bookings Calendar</h2>
            <div className="flex items-center gap-2">
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
          
          <Card>
            <CardContent className="pt-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                classNames={{
                  day: getDayClassName,
                }}
              />
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Today's Bookings</h2>
            {selectedBookings.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Update Status</Button>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                  Cancel Selected
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className={`flex items-center gap-2 p-4 border-l-4 ${
                  event.status === 'confirmed' ? 'border-green-500' :
                  event.status === 'pending' ? 'border-yellow-500' :
                  'border-red-500'
                }`}>
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
                  
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-muted-foreground"
                    checked={selectedBookings.includes(event.id)}
                    onChange={() => toggleBookingSelection(event.id)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Booking Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                New Booking
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Bookings
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-52">
                  <div className="grid gap-2">
                    <Button variant="outline" size="sm">CSV Format</Button>
                    <Button variant="outline" size="sm">PDF Format</Button>
                    <Button variant="outline" size="sm">Excel Format</Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>Date Range</DropdownMenuItem>
                  <DropdownMenuItem>By Excursion</DropdownMenuItem>
                  <DropdownMenuItem>By Customer</DropdownMenuItem>
                  <DropdownMenuItem>By Payment Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Bookings:</span>
                    <span>23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confirmed:</span>
                    <span>18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending:</span>
                    <span>4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cancelled:</span>
                    <span>1</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">Today's Revenue</h3>
                <div className="text-2xl font-bold">$1,459.94</div>
                <p className="text-xs text-muted-foreground">From 5 bookings</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingsTab;
