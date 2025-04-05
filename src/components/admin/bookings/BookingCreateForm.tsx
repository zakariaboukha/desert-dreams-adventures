
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for excursions
const availableExcursions = [
  { id: '1', name: 'Desert Safari Adventure', price: 129.99 },
  { id: '2', name: 'Sunset Camel Ride', price: 79.99 },
  { id: '3', name: 'Oasis Exploration', price: 149.99 },
  { id: '4', name: 'Dune Bashing Experience', price: 189.99 },
  { id: '5', name: 'Traditional Bedouin Camp', price: 159.99 },
];

interface BookingCreateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const BookingCreateForm: React.FC<BookingCreateFormProps> = ({ 
  onSuccess, 
  onCancel 
}) => {
  const [bookingDate, setBookingDate] = useState<Date | undefined>(new Date());
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedExcursion, setSelectedExcursion] = useState("");
  const [participants, setParticipants] = useState("1");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }
    
    if (!customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email";
    }
    
    if (!customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    }
    
    if (!selectedExcursion) {
      newErrors.selectedExcursion = "Please select an excursion";
    }
    
    if (!bookingDate) {
      newErrors.bookingDate = "Please select a date";
    }
    
    if (parseInt(participants) < 1) {
      newErrors.participants = "At least 1 participant is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    // This would be a call to Supabase in a real implementation
    toast.success("New booking created successfully!");
    
    // Reset form
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setSelectedExcursion("");
    setBookingDate(new Date());
    setParticipants("1");
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const getExcursionPrice = () => {
    const excursion = availableExcursions.find(e => e.id === selectedExcursion);
    return excursion ? excursion.price : 0;
  };

  const calculateTotal = () => {
    const price = getExcursionPrice();
    const numParticipants = parseInt(participants) || 0;
    return (price * numParticipants).toFixed(2);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name <span className="text-destructive">*</span></Label>
        <Input 
          id="customerName" 
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className={errors.customerName ? "border-destructive" : ""}
        />
        {errors.customerName && (
          <p className="text-xs text-destructive">{errors.customerName}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerEmail">Email <span className="text-destructive">*</span></Label>
          <Input 
            id="customerEmail"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className={errors.customerEmail ? "border-destructive" : ""}
          />
          {errors.customerEmail && (
            <p className="text-xs text-destructive">{errors.customerEmail}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="customerPhone">Phone <span className="text-destructive">*</span></Label>
          <Input 
            id="customerPhone" 
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className={errors.customerPhone ? "border-destructive" : ""}
          />
          {errors.customerPhone && (
            <p className="text-xs text-destructive">{errors.customerPhone}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="excursion">Select Excursion <span className="text-destructive">*</span></Label>
        <Select 
          value={selectedExcursion} 
          onValueChange={setSelectedExcursion}
        >
          <SelectTrigger className={errors.selectedExcursion ? "border-destructive" : ""}>
            <SelectValue placeholder="Select an excursion" />
          </SelectTrigger>
          <SelectContent>
            {availableExcursions.map(excursion => (
              <SelectItem key={excursion.id} value={excursion.id}>
                {excursion.name} - ${excursion.price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.selectedExcursion && (
          <p className="text-xs text-destructive">{errors.selectedExcursion}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bookingDate">Booking Date <span className="text-destructive">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !bookingDate && "text-muted-foreground",
                  errors.bookingDate && "border-destructive"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {bookingDate ? format(bookingDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={bookingDate}
                onSelect={setBookingDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          {errors.bookingDate && (
            <p className="text-xs text-destructive">{errors.bookingDate}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="participants">Number of Participants <span className="text-destructive">*</span></Label>
          <Input
            id="participants"
            type="number"
            min={1}
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className={errors.participants ? "border-destructive" : ""}
          />
          {errors.participants && (
            <p className="text-xs text-destructive">{errors.participants}</p>
          )}
        </div>
      </div>
      
      {selectedExcursion && (
        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="font-medium">Price per person:</span>
            <span>${getExcursionPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Participants:</span>
            <span>{participants}</span>
          </div>
          <div className="flex justify-between items-center font-bold mt-2 pt-2 border-t">
            <span>Total Price:</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Booking
        </Button>
      </div>
    </form>
  );
};

export default BookingCreateForm;
