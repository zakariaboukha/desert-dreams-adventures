
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Check } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BookingFormProps {
  tourName?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ tourName = '' }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState('2');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would handle the form submission here
    // For now, we'll just show a success toast
    toast.success('Booking request submitted!', {
      description: 'We will contact you shortly to confirm your booking.',
    });
    
    setFormSubmitted(true);
  };
  
  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6">Book Your Adventure</h3>
      
      {formSubmitted ? (
        <div className="text-center py-8">
          <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Check className="text-primary" size={24} />
          </div>
          <h4 className="text-xl font-bold mb-2">Thank You!</h4>
          <p className="text-muted-foreground mb-4">
            Your booking request has been submitted. We'll contact you shortly to confirm the details.
          </p>
          <Button onClick={() => setFormSubmitted(false)} className="mt-2">
            Book Another Tour
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tour Selection */}
          <div className="space-y-2">
            <Label htmlFor="tour">Tour</Label>
            <Select defaultValue={tourName || undefined}>
              <SelectTrigger id="tour">
                <SelectValue placeholder="Select a tour" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sahara-expedition">Sahara Expedition</SelectItem>
                <SelectItem value="desert-oasis">Desert Oasis Tour</SelectItem>
                <SelectItem value="canyon-adventure">Canyon Adventure</SelectItem>
                <SelectItem value="sunset-safari">Sunset Safari</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Number of Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger id="guests">
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5 Guests</SelectItem>
                <SelectItem value="6+">6+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Personal Information */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your full name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email address" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="Enter your phone number" required />
          </div>
          
          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="special-requests">Special Requests (Optional)</Label>
            <Textarea id="special-requests" placeholder="Any special requirements or questions?" rows={3} />
          </div>
          
          <Button type="submit" className="w-full">
            Submit Booking Request
          </Button>
          
          <p className="text-sm text-muted-foreground text-center mt-4">
            We'll contact you within 24 hours to confirm your booking and arrange payment.
          </p>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
