import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { 
  Calendar, 
  ClipboardList, 
  Mail, 
  Phone, 
  User, 
  X,
  CheckCircle2,
  Clock,
  XCircle,
  PrinterIcon,
  Send,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  title: string;
  excursion: string;
  customer: string;
  email: string;
  phone: string;
  date: Date;
  status: string;
  people: number;
  totalAmount: number;
}

interface BookingDetailsProps {
  booking: Booking;
  onClose: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking, onClose }) => {
  const [status, setStatus] = useState(booking.status);
  const [saving, setSaving] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const getStatusIcon = () => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
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

  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
    // In a real application, we would make an API call to update the status
  };

  const saveBooking = () => {
    setSaving(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setSaving(false);
      
      // Show success toast notification
      toast({
        title: "Booking updated",
        description: `Booking #${booking.id} has been updated to ${status}`,
        variant: "default",
      });
      
      // In a real app, you would save the updated booking data to the server here
    }, 1000);
  };

  const printBooking = () => {
    setPrinting(true);
    
    // Simulate print process
    setTimeout(() => {
      setPrinting(false);
      
      // Show success toast notification
      toast({
        title: "Print request sent",
        description: `Booking #${booking.id} details have been sent to printer`,
        variant: "default",
      });
      
      // In a real app, you would trigger print functionality here
      // window.print();
    }, 800);
  };

  const emailBooking = () => {
    setSending(true);
    
    // Simulate email sending
    setTimeout(() => {
      setSending(false);
      
      // Show success toast notification
      toast({
        title: "Email sent",
        description: `Booking details sent to ${booking.email}`,
        variant: "default",
      });
      
      // In a real app, you would send an email with booking details
    }, 1500);
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle>Booking Details</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{booking.excursion}</div>
            <div className="text-sm text-muted-foreground">Booking #{booking.id}</div>
          </div>
          <Badge variant="outline" className={getStatusColor()}>
            <span className="flex items-center gap-1">
              {getStatusIcon()}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </Badge>
        </div>
        
        {/* Details */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Customer:</span>
            <span>{booking.customer}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Email:</span>
            <span>{booking.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Phone:</span>
            <span>{booking.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Date:</span>
            <span>{format(booking.date, 'MMMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">People:</span>
            <span>{booking.people}</span>
          </div>
        </div>
        
        {/* Payment */}
        <div className="pt-2 border-t border-border">
          <h3 className="text-sm font-medium mb-2">Payment Details</h3>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Excursion Price:</span>
              <span>${(booking.totalAmount / booking.people).toFixed(2)} x {booking.people}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Booking Fee:</span>
              <span>$9.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax:</span>
              <span>${(booking.totalAmount * 0.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 text-sm">
              <span>Total:</span>
              <span>${(booking.totalAmount + 9.99 + booking.totalAmount * 0.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Payment Method:</span>
              <span>Credit Card (Visa ****4231)</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="pt-4 space-y-2">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium">Update Status</div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={status === 'confirmed' ? 'bg-green-500/10 text-green-600 border-green-600' : ''}
                onClick={() => updateStatus('confirmed')}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirm
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className={status === 'pending' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-600' : ''}
                onClick={() => updateStatus('pending')}
              >
                <Clock className="h-4 w-4 mr-2" />
                Pending
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className={status === 'cancelled' ? 'bg-red-500/10 text-red-600 border-red-600' : ''}
                onClick={() => updateStatus('cancelled')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={printBooking}
              disabled={printing}
            >
              <PrinterIcon className="h-4 w-4 mr-2" />
              {printing ? "Printing..." : "Print"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={emailBooking}
              disabled={sending}
            >
              <Send className="h-4 w-4 mr-2" />
              {sending ? "Sending..." : "Email"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={saveBooking}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingDetails;
