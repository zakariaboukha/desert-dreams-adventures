import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CalendarIcon, 
  Check, 
  Star, 
  Users, 
  Clock, 
  MapPin,
  CreditCard,
  Shield,
  ChevronRight,
  ChevronLeft,
  X
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Import data sources
import { excursions } from "@/data/excursions";
import { trips } from "@/data/trips";
import { BookingContext } from '@/utils/bookingNavigation';
import BookingSummaryCard, { BookingSummaryData } from './BookingSummaryCard';
import BookingConfirmationModal from './BookingConfirmationModal';

interface BookingFormProps {
  initialContext?: BookingContext;
  bookingType?: "trip" | "excursion";
  preSelectedId?: string;
  onSummaryDataChange?: (data: BookingSummaryData | null) => void;
}

type BookingType = "trip" | "excursion" | "";

interface FormData {
  bookingType: BookingType;
  selectedItem: string;
  date: Date | undefined;
  adults: string;
  children: string;
  fullName: string;
  email: string;
  phone: string;
  additionalNotes: string;
}

interface FormErrors {
  bookingType?: string;
  selectedItem?: string;
  date?: string;
  adults?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

// Transform trip data for consistent interface
const transformedTrips = trips.map(trip => ({
  id: trip.slug,
  name: trip.title,
  price: trip.price,
  category: trip.category || "Multi-day",
  duration: trip.duration,
  location: trip.location
}));

// Transform excursion data for consistent interface
const transformedExcursions = [
  ...['oasis-visit', 'atlas-hike', 'desert-safari'].map((slug) => {
    const ex = excursions.find(e => e.slug === slug);
    return ex ? {
      id: ex.slug,
      name: ex.title,
      price: ex.price,
      category: "Adventure",
      duration: ex.duration,
      location: ex.location
    } : null;
  }).filter(Boolean) as Array<{
    id: string; name: string; price: number; category: string; duration: string; location: string;
  }>,
  {
    id: 'berber-village-tour',
    name: 'Berber Village Tour',
    price: 140,
    category: 'Cultural',
    duration: '1 day',
    location: 'Morocco'
  }
];

const BookingForm: React.FC<BookingFormProps> = ({
  bookingType = "",
  preSelectedId = "",
  initialContext,
  onSummaryDataChange
}) => {
  const [searchParams] = useSearchParams();
  const isInitialized = useRef(false);
  
  // Extract context from URL parameters if not provided via props
  const urlContext = {
    type: searchParams.get('type') as 'trip' | 'excursion' | null,
    id: searchParams.get('id'),
    name: searchParams.get('name'),
    price: searchParams.get('price') ? Number(searchParams.get('price')) : undefined,
    location: searchParams.get('location'),
    duration: searchParams.get('duration'),
    image: searchParams.get('image')
  };

  const tripSlug = searchParams.get('trip') || null;
  const excursionSlug = searchParams.get('excursion') || null;

  // Use URL context if initialContext is not provided
  const effectiveContext = initialContext || urlContext;
  
  const [formData, setFormData] = useState<FormData>(() => {
    // Initialize state only once with proper context
    const initialBookingType = effectiveContext.type || bookingType || "";
    const initialSelectedItem = effectiveContext.id || preSelectedId || "";
    
    console.log('Initial booking type:', initialBookingType);
    
    return {
      bookingType: initialBookingType,
      selectedItem: initialSelectedItem,
      date: undefined,
      adults: "1",
      children: "0",
      fullName: "",
      email: "",
      phone: "",
      additionalNotes: ""
    };
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Add these new state variables for the confirmation modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState<{
    tripName: string;
    bookingId: string;
    date: string;
    adults: number;
    children: number;
    fullName: string;
    email: string;
    phone: string;
    totalPrice?: number;
    additionalNotes?: string;
  } | null>(null);

  // Initialize form with context data ONLY ONCE
  useEffect(() => {
    if (!isInitialized.current && effectiveContext) {
      console.log('Initializing form with context:', effectiveContext);
      
      const updates: Partial<FormData> = {};
      
      if (effectiveContext.type) {
        updates.bookingType = effectiveContext.type;
      }
      if (effectiveContext.id) {
        updates.selectedItem = effectiveContext.id;
      }
      
      // Handle trip/excursion slug parameters
      if (tripSlug) {
        updates.bookingType = "trip";
        updates.selectedItem = tripSlug;
      } else if (excursionSlug) {
        updates.bookingType = "excursion";
        updates.selectedItem = excursionSlug;
      }
      
      if (Object.keys(updates).length > 0) {
        setFormData(prev => ({ ...prev, ...updates }));
      }
      
      isInitialized.current = true;
    }
  }, []); // Empty dependency array - run only once

  // Handle manual booking type changes
  const handleBookingTypeChange = (value: BookingType) => {
    console.log('Manual booking type change:', value);
    setFormData(prev => ({
      ...prev,
      bookingType: value,
      selectedItem: "" // Reset selected item when type changes
    }));
    setErrors(prev => ({ ...prev, bookingType: undefined, selectedItem: undefined }));
  };

  // Handle selected item changes
  const handleSelectedItemChange = (value: string) => {
    console.log('Selected item change:', value);
    setFormData(prev => ({ ...prev, selectedItem: value }));
    setErrors(prev => ({ ...prev, selectedItem: undefined }));
  };

  useEffect(() => {
    if (tripSlug) {
      setFormData(prev => ({
        ...prev,
        bookingType: "trip",
        selectedItem: tripSlug
      }));
    }
  }, [tripSlug]);

  useEffect(() => {
    if (excursionSlug) {
      setFormData(prev => ({
        ...prev,
        bookingType: "excursion",
        selectedItem: excursionSlug
      }));
    }
  }, [excursionSlug]);

  // Get selected item details for summary card
  const getSelectedItemDetails = (): BookingSummaryData | null => {
    if (!formData.bookingType || !formData.selectedItem) return null;

    if (formData.bookingType === 'trip') {
      const trip = trips.find(t => t.slug === formData.selectedItem);
      if (trip) {
        return {
          type: 'trip',
          id: trip.slug,
          title: trip.title,
          location: trip.location,
          duration: trip.duration,
          price: trip.price,
          images: trip.images,
          groupSize: trip.groupSize,
          rating: trip.rating,
          reviewCount: trip.reviewCount,
          tagline: trip.tagline,
          schedule: trip.schedule,
          meetingPoint: trip.meetingPoint
        };
      }
    } else if (formData.bookingType === 'excursion') {
      const excursion = excursions.find(e => e.slug === formData.selectedItem);
      if (excursion) {
        return {
          type: 'excursion',
          id: excursion.slug,
          title: excursion.title,
          location: excursion.location,
          duration: excursion.duration,
          price: excursion.price,
          image: excursion.image,
          images: excursion.images,
          groupSize: excursion.groupSize,
          rating: excursion.rating,
          reviewCount: excursion.reviewCount,
          tagline: excursion.tagline,
          schedule: excursion.schedule,
          meetingPoint: excursion.meetingPoint
        };
      }
    }

    return null;
  };

  // Update summary data when selection changes
  useEffect(() => {
    const summaryData = getSelectedItemDetails();
    if (onSummaryDataChange) {
      onSummaryDataChange(summaryData);
    }
  }, [formData.bookingType, formData.selectedItem, onSummaryDataChange]);

  // Get available items based on booking type
  const getAvailableItems = () => {
    if (formData.bookingType === "trip") {
      return transformedTrips;
    } else if (formData.bookingType === "excursion") {
      return transformedExcursions;
    }
    return [];
  };

  // Calculate total price
  const calculateTotal = () => {
    const selectedItem = getSelectedItemDetails();
    if (!selectedItem) return 0;
    
    const adults = parseInt(formData.adults) || 0;
    const children = parseInt(formData.children) || 0;
    
    return (adults * selectedItem.price) + (children * selectedItem.price * 0.75);
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.bookingType) {
      newErrors.bookingType = "Please select a booking type";
    }

    if (!formData.selectedItem) {
      newErrors.selectedItem = "Please select a " + (formData.bookingType || "item");
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.adults || parseInt(formData.adults) < 1) {
      newErrors.adults = "At least 1 adult is required";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get the selected item name
      const getSelectedItemName = () => {
        if (formData.bookingType === "trip") {
          const trip = trips.find(t => t.slug === formData.selectedItem);
          return trip?.title || "Selected Trip";
        } else if (formData.bookingType === "excursion") {
          const excursion = excursions.find(e => e.slug === formData.selectedItem);
          return excursion?.title || "Selected Excursion";
        }
        return "Your Booking";
      };
      
      // Prepare booking details for the modal
      const bookingDetails = {
        tripName: getSelectedItemName(),
        bookingId: `BK-${Date.now()}`,
        date: formData.date ? format(formData.date, "dd MMM yyyy") : "Date TBD",
        adults: parseInt(formData.adults),
        children: parseInt(formData.children),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        totalPrice: typeof total === "number" ? total : undefined,
        additionalNotes: formData.additionalNotes || undefined,
      };
      
      // Set booking details and show modal
      setConfirmedBookingDetails(bookingDetails);
      setShowConfirmationModal(true);
      
      // Reset form
      setFormData({
        bookingType: "",
        selectedItem: "",
        date: undefined,
        adults: "1",
        children: "0",
        fullName: "",
        email: "",
        phone: "",
        additionalNotes: ""
      });
      setErrors({});
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp click handler with validation and identical success UI
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Reuse existing validation and error styling
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Build detailed WhatsApp message including all booking data
    const itemLabel = formData.bookingType === "trip" ? "Trip" : "Excursion";
    const itemName = selectedItemDetails?.title || formData.selectedItem;
    const dateText = formData.date ? format(formData.date, "dd MMM yyyy") : "";
    const adultsText = formData.adults;
    const childrenText = formData.children;
    const totalText = typeof total === "number" ? `$${total.toFixed(2)}` : "";

    const lines: string[] = [
      "Hello, I'd like to book:",
      `- Type: ${itemLabel}`,
      `- ${itemLabel}: ${itemName}`,
      `- Date: ${dateText}`,
      `- Adults: ${adultsText}`,
      `- Children: ${childrenText}`,
      `- Full Name: ${formData.fullName}`,
      `- Email: ${formData.email}`,
      `- Phone: ${formData.phone}`,
    ];

    if (selectedItemDetails?.price) {
      lines.push(`- Price per person: $${selectedItemDetails.price}`);
    }
    if (totalText) {
      lines.push(`- Total: ${totalText}`);
    }
    if (formData.additionalNotes?.trim()) {
      lines.push(`- Notes: ${formData.additionalNotes.trim()}`);
    }

    const message = lines.join("\n");

    // Show the same success confirmation as standard submission
    toast.success("Booking submitted successfully! We'll contact you soon.");

    // Open WhatsApp in a new tab with properly encoded message
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Reset selected item when booking type changes
    if (field === "bookingType") {
      setFormData(prev => ({ ...prev, selectedItem: "" }));
    }
  };

  const selectedItemDetails = getSelectedItemDetails();
  const total = calculateTotal();

  // Already present in your file:
  const whatsappNumber = ((import.meta as any).env?.VITE_WHATSAPP_PHONE || "212630079380")
    .toString()
    .replace(/^\+/, "")
    .replace(/\D/g, "");

  // New: build message with safe defaults so the button works immediately
  const itemName =
    selectedItemDetails?.title ||
    (formData.bookingType === "excursion"
      ? "an excursion"
      : formData.bookingType === "trip"
      ? "a trip"
      : "a trip or excursion");

  const dateText = formData.date ? format(formData.date, "dd MMM yyyy") : "a date";
  const adultsText = formData.adults && parseInt(formData.adults) > 0 ? formData.adults : "1";
  const childrenText = formData.children ? formData.children : "0";

  const whatsAppText = `Hello, I'd like to book the ${itemName} on ${dateText} for ${adultsText} adults and ${childrenText} children.`;

  return (
    <div className="w-full max-w-2xl mx-auto text-foreground">
      <Card className="shadow-lg border border-border bg-card text-card-foreground">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold">
            Book Your Adventure
          </CardTitle>
          <p className="mt-2 text-muted-foreground">
            Choose your perfect desert experience
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bookingType" className="text-sm font-medium">
                Select Booking Type *
              </Label>
              <Select
                value={formData.bookingType}
                onValueChange={(value) => handleInputChange("bookingType", value)}
              >
                <SelectTrigger 
                  className={cn(
                    "w-full h-12 rounded-lg border-2 transition-colors",
                    "bg-background text-foreground border-input",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    errors.bookingType && "border-destructive focus-visible:ring-destructive"
                  )}
                >
                  <SelectValue placeholder="Choose booking type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trip">Trip</SelectItem>
                  <SelectItem value="excursion">Excursion</SelectItem>
                </SelectContent>
              </Select>
              {errors.bookingType && (
                <p className="text-destructive text-sm mt-1">{errors.bookingType}</p>
              )}
            </div>

            {formData.bookingType && (
              <div className="space-y-2">
                <Label htmlFor="selectedItem" className="text-sm font-medium">
                  Select a {formData.bookingType === "trip" ? "Trip" : "Excursion"} *
                </Label>
                <Select
                  value={formData.selectedItem}
                  onValueChange={(value) => handleInputChange("selectedItem", value)}
                >
                  <SelectTrigger 
                    className={cn(
                      "w-full h-12 rounded-lg border-2 transition-colors",
                      "bg-background text-foreground border-input",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      errors.selectedItem && "border-destructive focus-visible:ring-destructive"
                    )}
                  >
                    <SelectValue placeholder={`Choose a ${formData.bookingType}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.bookingType === "trip" ? (
                      <>
                        <SelectItem value="__placeholder_trip" disabled>Choose a trip</SelectItem>
                        <SelectItem value="coastal-adventure">Coastal Adventure</SelectItem>
                        <SelectItem value="mountain-escape">Mountain Escape</SelectItem>
                        <SelectItem value="city-highlights">City Highlights</SelectItem>
                        <SelectItem value="cultural-journey">Cultural Journey</SelectItem>
                        <SelectItem value="sahara-adventure">Sahara Adventure</SelectItem>
                        <SelectItem value="atlas-mountains-trek">Atlas Mountains Trek</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="__placeholder_excursion" disabled>Choose an excursion</SelectItem>
                        <SelectItem value="oasis-visit">Oasis Visit</SelectItem>
                        <SelectItem value="atlas-hike">Atlas Hike</SelectItem>
                        <SelectItem value="desert-safari">Desert Safari</SelectItem>
                        <SelectItem value="berber-village-tour">Berber Village Tour</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                {errors.selectedItem && (
                  <p className="text-destructive text-sm mt-1">{errors.selectedItem}</p>
                )}
              </div>
            )}

            {/* Selected Item Summary */}
            {selectedItemDetails && (
              <Card className="bg-muted border border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {selectedItemDetails.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {selectedItemDetails.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {selectedItemDetails.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        ${selectedItemDetails.price}/person
                      </p>
                      <Badge variant="secondary" className="mt-1">
                        {selectedItemDetails.type === 'trip' ? 'Multi-day' : 'Day Excursion'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Separator />

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={cn(
                    "h-12 rounded-lg border-2 transition-colors",
                    "bg-background text-foreground border-input placeholder:text-muted-foreground",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    errors.fullName && "border-destructive focus-visible:ring-destructive"
                  )}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={cn(
                    "h-12 rounded-lg border-2 transition-colors",
                    "bg-background text-foreground border-input placeholder:text-muted-foreground",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    errors.email && "border-destructive focus-visible:ring-destructive"
                  )}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={cn(
                  "h-12 rounded-lg border-2 transition-colors",
                  "bg-background text-foreground border-input placeholder:text-muted-foreground",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  errors.phone && "border-destructive focus-visible:ring-destructive"
                )}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Guest Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adults" className="text-sm font-medium">
                  Number of Adults *
                </Label>
                <Select
                  value={formData.adults}
                  onValueChange={(value) => handleInputChange("adults", value)}
                >
                  <SelectTrigger 
                    className={cn(
                      "h-12 rounded-lg border-2 transition-colors",
                      "bg-background text-foreground border-input",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      errors.adults && "border-destructive focus-visible:ring-destructive"
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Adult{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.adults && (
                  <p className="text-destructive text-sm mt-1">{errors.adults}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="children" className="text-sm font-medium">
                  Number of Children
                </Label>
                <Select
                  value={formData.children}
                  onValueChange={(value) => handleInputChange("children", value)}
                >
                  <SelectTrigger 
                    className="h-12 rounded-lg border-2 transition-colors bg-background text-foreground border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Child' : 'Children'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Date of Booking *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 rounded-lg border-2 justify-start text-left font-normal transition-colors",
                      "bg-background text-foreground border-input",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      !formData.date && "text-muted-foreground",
                      errors.date && "border-destructive focus-visible:ring-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => handleInputChange("date", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-destructive text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="additionalNotes" className="text-sm font-medium">
                Additional Notes
              </Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                className="rounded-lg border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors resize-none bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="Any special requests, dietary restrictions, or additional information..."
                rows={3}
              />
            </div>

            {selectedItemDetails && (
              <Card className="bg-muted border border-border">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Adults ({formData.adults} × ${selectedItemDetails.price})</span>
                      <span>${(parseInt(formData.adults) * selectedItemDetails.price).toFixed(2)}</span>
                    </div>
                    {parseInt(formData.children) > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Children ({formData.children} × ${(selectedItemDetails.price * 0.75).toFixed(2)})</span>
                        <span>${(parseInt(formData.children) * selectedItemDetails.price * 0.75).toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full h-12 rounded-lg
                bg-[#D4AF37] text-white
                border-2 border-[#C4902F]
                hover:bg-[#C4902F]
                transition-colors transition-shadow duration-200
                shadow-md hover:shadow-lg
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ring
                focus-visible:ring-offset-2 focus-visible:ring-offset-background
                disabled:opacity-70
              "
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Book Now"
              )}
            </Button>

            {/* WhatsApp Booking Button */}
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="
                w-full h-12 rounded-lg
                bg-[#25D366] text-white
                border-2 border-[#25D366]
                hover:bg-[#1ebc57] hover:border-[#1ebc57]
                transition-colors transition-shadow duration-200
                shadow-md hover:shadow-lg
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-[#25D366]
                focus-visible:ring-offset-2 focus-visible:ring-offset-background
                flex items-center justify-center gap-2
                font-semibold text-center
                no-underline
              "
              aria-label="Book via WhatsApp"
            >
              {/* WhatsApp Icon SVG */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="flex-shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Book via WhatsApp
            </button>
          </form>
        </CardContent>
      </Card>
      
      {/* Booking Confirmation Modal */}
      {confirmedBookingDetails && (
        <BookingConfirmationModal
          open={showConfirmationModal}
          onOpenChange={setShowConfirmationModal}
          bookingDetails={confirmedBookingDetails}
        />
      )}
    </div>
  );
};

export default BookingForm;

