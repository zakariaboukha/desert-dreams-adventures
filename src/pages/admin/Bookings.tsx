import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  UserPlus,
  Trash2,
} from "lucide-react";
import BookingDetailsView from "@/components/admin/bookings/BookingDetailsView";
import BookingExport from "@/components/admin/bookings/BookingExport";
import BookingCreateForm from "@/components/admin/bookings/BookingCreateForm";
import { useToast } from "@/hooks/use-toast";

// Mock booking data
const bookingEvents = [
  {
    id: "B1001",
    title: "Desert Safari - John Smith",
    excursion: "Desert Safari Adventure",
    customer: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 555-123-4567",
    date: new Date(), // Today's date
    status: "confirmed",
    people: 2,
    adults: 2,
    children: 0,
    totalAmount: 259.98,
    booking_type: "excursion" as const,
  },
  {
    id: "B1002",
    title: "Camel Ride - Sarah Johnson",
    excursion: "Sunset Camel Ride",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 555-987-6543",
    date: new Date(), // Today's date
    status: "pending",
    people: 4,
    adults: 2,
    children: 2,
    totalAmount: 319.96,
    booking_type: "excursion" as const,
  },
  {
    id: "B1003",
    title: "Oasis Exploration - Michael Brown",
    excursion: "Oasis Exploration",
    customer: "Michael Brown",
    email: "mbrown@example.com",
    phone: "+1 555-456-7890",
    date: new Date(2024, 3, 8),
    status: "cancelled",
    people: 1,
    adults: 1,
    children: 0,
    totalAmount: 149.99,
    booking_type: "excursion" as const,
  },
  {
    id: "B1004",
    title: "Dune Bashing - David Lee",
    excursion: "Dune Bashing Experience",
    customer: "David Lee",
    email: "dlee@example.com",
    phone: "+1 555-567-8901",
    date: new Date(2024, 3, 10),
    status: "confirmed",
    people: 3,
    adults: 2,
    children: 1,
    totalAmount: 569.97,
    booking_type: "excursion" as const,
  },
  {
    id: "B1005",
    title: "Bedouin Camp - Maria Garcia",
    excursion: "Traditional Bedouin Camp",
    customer: "Maria Garcia",
    email: "mgarcia@example.com",
    phone: "+1 555-234-5678",
    date: new Date(2024, 3, 12),
    status: "pending",
    people: 2,
    adults: 2,
    children: 0,
    totalAmount: 319.98,
    booking_type: "excursion" as const,
  },
  {
    id: "B1006",
    title: "Desert Photography - Emma Wilson",
    excursion: "Desert Photography Tour",
    customer: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 555-789-0123",
    date: new Date(), // Today's date
    status: "confirmed",
    people: 1,
    adults: 1,
    children: 0,
    totalAmount: 119.99,
    booking_type: "excursion" as const,
  },
  {
    id: "B1007",
    title: "Star Gazing - James Taylor",
    excursion: "Star Gazing Night Tour",
    customer: "James Taylor",
    email: "jtaylor@example.com",
    phone: "+1 555-321-6547",
    date: new Date(), // Today's date
    status: "pending",
    people: 2,
    adults: 1,
    children: 1,
    totalAmount: 199.98,
    booking_type: "excursion" as const,
  },
  {
    id: "B2001",
    title: "7-Day Desert Adventure - Robert Johnson",
    excursion: "7-Day Desert Adventure",
    customer: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "+1 555-111-2222",
    date: new Date(2024, 3, 15),
    status: "confirmed",
    people: 2,
    adults: 2,
    children: 0,
    totalAmount: 1200.00,
    booking_type: "trip" as const,
  },
  {
    id: "B2002",
    title: "Atlas Mountains Trek - Lisa Chen",
    excursion: "Atlas Mountains Trek",
    customer: "Lisa Chen",
    email: "lisa.chen@example.com",
    phone: "+1 555-333-4444",
    date: new Date(2024, 3, 20),
    status: "pending",
    people: 4,
    adults: 2,
    children: 2,
    totalAmount: 1800.00,
    booking_type: "trip" as const,
  },
  {
    id: "B2003",
    title: "Imperial Cities Tour - Ahmed Hassan",
    excursion: "Imperial Cities Tour",
    customer: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+1 555-555-6666",
    date: new Date(2024, 3, 25),
    status: "confirmed",
    people: 3,
    adults: 2,
    children: 1,
    totalAmount: 1500.00,
    booking_type: "trip" as const,
  },
  {
    id: "B2004",
    title: "Coastal Road Adventure - Jennifer Martinez",
    excursion: "Coastal Road Adventure",
    customer: "Jennifer Martinez",
    email: "jennifer.m@example.com",
    phone: "+1 555-777-8888",
    date: new Date(2024, 3, 30),
    status: "cancelled",
    people: 2,
    adults: 2,
    children: 0,
    totalAmount: 950.00,
    booking_type: "trip" as const,
  },
  {
    id: "TRIP-001",
    title: "7-Day Desert Adventure - John Smith",
    excursion: "7-Day Desert Adventure",
    customer: "John Smith",
    email: "john.smith.trip@example.com",
    phone: "+1 555-100-0001",
    date: new Date(2024, 4, 5), // May 5, 2024
    status: "confirmed",
    people: 2,
    adults: 2,
    children: 0,
    totalAmount: 1200.00,
    booking_type: "trip" as const,
  },
  {
    id: "TRIP-002",
    title: "Morocco Grand Tour - Sarah Williams",
    excursion: "Morocco Grand Tour",
    customer: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 555-200-0002",
    date: new Date(2024, 4, 12), // May 12, 2024
    status: "pending",
    people: 3,
    adults: 2,
    children: 1,
    totalAmount: 1850.00,
    booking_type: "trip" as const,
  },
  {
    id: "TRIP-003",
    title: "Atlas Mountain Trek - Michael Davis",
    excursion: "Atlas Mountain Trek",
    customer: "Michael Davis",
    email: "michael.davis@example.com",
    phone: "+1 555-300-0003",
    date: new Date(2025, 7, 18), // May 18, 2024
    status: "cancelled",
    people: 4,
    adults: 2,
    children: 2,
    totalAmount: 2100.00,
    booking_type: "trip" as const,
  },
];

const excursionTypes = [
  "All Types",
  "Desert Safari Adventure",
  "Sunset Camel Ride",
  "Oasis Exploration",
  "Dune Bashing Experience",
  "Traditional Bedouin Camp",
  "7-Day Desert Adventure",
  "Morocco Grand Tour",
  "Atlas Mountain Trek",
];

const bookingTypes = ["All Types", "Trip", "Excursion"];

const customerTiers = ["All Tiers", "Standard", "Silver", "Gold", "Platinum"];

const Bookings: React.FC = () => {
  const { toast } = useToast();
  
  // State management
  const [bookings, setBookings] = useState(bookingEvents);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [bookingTypeFilter, setBookingTypeFilter] = useState("All Types");
  const [customerTierFilter, setCustomerTierFilter] = useState("All Tiers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [isNewBookingDialogOpen, setIsNewBookingDialogOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');

  // Delete booking handlers - DEFINED BEFORE JSX
  const handleDeleteBooking = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteBooking = () => {
    if (!bookingToDelete) return;
    
    const bookingToRemove = bookings.find(b => b.id === bookingToDelete);
    
    // Remove booking from state
    setBookings(prevBookings => 
      prevBookings.filter(booking => booking.id !== bookingToDelete)
    );
    
    // Show success toast
    toast({
      title: "Booking Deleted",
      description: `Booking ${bookingToDelete} for ${bookingToRemove?.customer} has been successfully deleted.`,
      variant: "default",
    });
    
    // Reset state
    setDeleteDialogOpen(false);
    setBookingToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setBookingToDelete(null);
  };

  // Date filtering function
  const getDateFilteredEvents = () => {
    if (selectedDate) {
      return bookings.filter((event) => {
        const eventDate = new Date(event.date);
        const selectedDateOnly = new Date(selectedDate);
        return (
          eventDate.getDate() === selectedDateOnly.getDate() &&
          eventDate.getMonth() === selectedDateOnly.getMonth() &&
          eventDate.getFullYear() === selectedDateOnly.getFullYear()
        );
      });
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const last7Days = new Date(today);
    last7Days.setDate(last7Days.getDate() - 7);
    
    // Calculate last month's start and end dates
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    switch (dateFilter) {
      case "today":
        return bookings.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        });
      case "yesterday":
        return bookings.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getDate() === yesterday.getDate() &&
            eventDate.getMonth() === yesterday.getMonth() &&
            eventDate.getFullYear() === yesterday.getFullYear()
          );
        });
      case "last7days":
        return bookings.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= last7Days && eventDate <= today;
        });
      case "lastmonth":
        return bookings.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= lastMonthStart && eventDate <= lastMonthEnd;
        });
      default:
        return bookings;
    }
  };

  // Filter events based on all criteria
  const filteredEvents = getDateFilteredEvents().filter(
    (event) =>
      (statusFilter === "all" || event.status === statusFilter) &&
      (bookingTypeFilter === "All Types" ||
        (bookingTypeFilter === "Trip" && event.booking_type === "trip") ||
        (bookingTypeFilter === "Excursion" && event.booking_type === "excursion")) &&
      (searchQuery === "" ||
        event.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.excursion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.id.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Get booking details for selected booking
  const bookingDetails = selectedBooking
    ? bookings.find((booking) => booking.id === selectedBooking)
    : null;

  // Calendar day styling
  const getDayClassName = (day: Date): string => {
    const hasBooking = bookings.some(
      (booking) =>
        new Date(booking.date).toDateString() === day.toDateString(),
    );
    return hasBooking ? "bg-primary text-primary-foreground" : "";
  };

  // Date selection handler
  const handleDateSelect = (selectedDay: Date | undefined) => {
    setSelectedDate(selectedDay || null);
    setDateFilter("all"); // Reset date filter when calendar date is selected
  };

  // Clear date selection
  const clearDateSelection = () => {
    setSelectedDate(null);
  };

  // Status color helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  // Booking creation handler
  const handleBookingCreated = () => {
    setIsNewBookingDialogOpen(false);
  };

  // Booking click handler
  const handleBookingClick = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setViewMode('details');
  };

  // Back to list handler
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedBooking(null);
  };

  return (
    <div className="space-y-6">
      {viewMode === 'list' ? (
        // List view
        <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">
              Bookings Management
            </h1>
            <p className="text-muted-foreground">
              View and manage all bookings for your excursions.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full space-y-4">
              {/* Search and Actions */}
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
                <div className="flex gap-2">
                  <BookingExport bookings={filteredEvents} />
                  <Dialog open={isNewBookingDialogOpen} onOpenChange={setIsNewBookingDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        New Booking
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create New Booking</DialogTitle>
                        <DialogDescription>
                          Add a new booking to the system.
                        </DialogDescription>
                      </DialogHeader>
                      <BookingCreateForm onBookingCreated={handleBookingCreated} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={bookingTypeFilter} onValueChange={setBookingTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bookingTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="lastmonth">Last Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Calendar */}
                <div className="xl:col-span-1">
                  <Card>
                    <CardHeader className="pb-3">
                      <h3 className="font-semibold">Calendar</h3>
                      {selectedDate && (
                        <p className="text-sm text-muted-foreground">
                          Showing bookings for {format(selectedDate, "MMM d, yyyy")}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate || undefined}
                        onSelect={handleDateSelect}
                        className="rounded-md border-0"
                        modifiers={{
                          hasBooking: bookings.map((booking) => new Date(booking.date)),
                        }}
                        modifiersStyles={{
                          hasBooking: {
                            backgroundColor: "hsl(var(--primary))",
                            color: "hsl(var(--primary-foreground))",
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                  
                  {/* Quick Date Filters */}
                  {!selectedDate && (
                    <div className="mt-4 space-y-2">
                      <Button
                        variant={dateFilter === "today" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDateFilter("today")}
                        className="w-full justify-start"
                      >
                        📅 Today
                      </Button>
                      <Button
                        variant={dateFilter === "yesterday" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDateFilter("yesterday")}
                        className="w-full justify-start"
                      >
                        📅 Yesterday
                      </Button>
                      <Button
                        variant={dateFilter === "last7days" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDateFilter("last7days")}
                        className="w-full justify-start"
                      >
                        📅 Last 7 Days
                      </Button>
                      <Button
                        variant={dateFilter === "lastmonth" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDateFilter("lastmonth")}
                        className="w-full justify-start"
                      >
                        📅 Last Month
                      </Button>
                    </div>
                  )}
                </div>

                {/* Bookings List */}
                <div className="xl:col-span-3">
                  <div className="space-y-4">
                    {filteredEvents.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">
                            {selectedDate ? "No bookings for this date" : "No bookings found"}
                          </h3>
                          <p className="text-muted-foreground text-center max-w-md">
                            {selectedDate 
                              ? `There are no bookings scheduled for ${format(selectedDate, "MMMM d, yyyy")}. Try selecting a different date or clearing the selection.`
                              : "No bookings match your current filters. Try adjusting your search criteria."
                            }
                          </p>
                          {selectedDate && (
                            <Button
                              variant="outline"
                              onClick={clearDateSelection}
                              className="mt-4"
                            >
                              View All Bookings
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {filteredEvents.map((event) => (
                          <Card
                            key={event.id}
                            className="cursor-pointer hover:shadow-md transition-shadow relative"
                            onClick={() => handleBookingClick(event.id)}
                          >
                            {/* Booking Type Badge */}
                            <div className="absolute top-3 right-3 z-10">
                              <Badge
                                variant="outline"
                                className={`text-xs font-medium ${
                                  event.booking_type === "trip"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-green-50 text-green-700 border-green-200"
                                }`}
                              >
                                {event.booking_type === "trip" ? "Trip" : "Excursion"}
                              </Badge>
                            </div>

                            {/* Status Color Bar */}
                            <div
                              className={`h-1 w-full rounded-t-lg ${
                                event.status === "confirmed"
                                  ? "bg-green-500"
                                  : event.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            />

                            <CardContent className="p-6">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      {event.id}
                                    </Badge>
                                    <Badge
                                      className={`text-xs ${
                                        event.status === "confirmed"
                                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                                          : event.status === "pending"
                                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                          : "bg-red-100 text-red-800 hover:bg-red-100"
                                      }`}
                                    >
                                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                    </Badge>
                                  </div>
                                  <h3 className="font-semibold text-lg pr-20">{event.excursion}</h3>
                                  <div className="text-sm text-muted-foreground space-y-1">
                                    <p><span className="font-medium">Customer:</span> {event.customer}</p>
                                    <p><span className="font-medium">Guests:</span> {event.adults} Adults, {event.children} Children</p>
                                    <p><span className="font-medium">Date:</span> {format(event.date, "MMM d, yyyy")}</p>
                                    <p><span className="font-medium">Experience:</span> {event.booking_type === "trip" ? "Multi-day experience" : "Day experience"}</p>
                                  </div>
                                </div>
                                <div className="text-right space-y-2">
                                  <div className="text-2xl font-bold text-primary">
                                    ${event.totalAmount.toFixed(2)}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {event.people} {event.people === 1 ? "person" : "people"}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {event.email}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {event.phone}
                                  </div>
                                  <div className="flex justify-end mt-3">
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteBooking(event.id);
                                      }}
                                      className="px-3"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Details view
        <BookingDetailsView
          booking={bookingDetails}
          onBack={handleBackToList}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this booking? This action cannot be undone.
              {bookingToDelete && (
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="font-medium">Booking ID: {bookingToDelete}</p>
                  <p className="text-sm text-muted-foreground">
                    Customer: {bookings.find(b => b.id === bookingToDelete)?.customer}
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteBooking} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Bookings;
