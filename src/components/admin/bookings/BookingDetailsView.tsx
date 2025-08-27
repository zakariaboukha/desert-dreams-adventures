import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { 
  Calendar, 
  ClipboardList, 
  Mail, 
  Phone, 
  User, 
  ArrowLeft,
  CheckCircle2,
  Clock,
  XCircle,
  PrinterIcon,
  Send,
  Save,
  Users,
  CreditCard,
  MapPin
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
  adults: number;
  children: number;
  totalAmount: number;
  booking_type: "trip" | "excursion";
}

interface BookingDetailsViewProps {
  booking: Booking;
  onBack: () => void;
}

const BookingDetailsView: React.FC<BookingDetailsViewProps> = ({ booking, onBack }) => {
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
    toast({
      title: "Status updated",
      description: `Booking status changed to ${newStatus}`,
      variant: "default",
    });
  };

  const saveBooking = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Booking saved",
        description: `Booking #${booking.id} has been saved successfully`,
        variant: "default",
      });
    }, 1000);
  };

  const printBooking = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrinting(false);
      toast({
        title: "Print request sent",
        description: `Booking #${booking.id} details have been sent to printer`,
        variant: "default",
      });
    }, 800);
  };

  const emailBooking = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Email sent",
        description: `Booking details sent to ${booking.email}`,
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bookings
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Booking Details</h1>
          <p className="text-muted-foreground">Booking #{booking.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{booking.excursion}</CardTitle>
                <Badge variant="outline" className={getStatusColor()}>
                  <span className="flex items-center gap-2">
                    {getStatusIcon()}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Customer</p>
                      <p className="text-sm text-muted-foreground">{booking.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{booking.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{booking.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">{format(booking.date, 'EEEE, MMMM dd, yyyy')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Number of People</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.people} {booking.people === 1 ? 'person' : 'people'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Trip Name</p>
                      <p className="text-sm text-muted-foreground">{booking.excursion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Excursion Price:</span>
                  <span className="text-sm">${(booking.totalAmount / booking.people).toFixed(2)} x {booking.people}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Booking Fee:</span>
                  <span className="text-sm">$9.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tax (5%):</span>
                  <span className="text-sm">${(booking.totalAmount * 0.05).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Amount:</span>
                  <span>${(booking.totalAmount + 9.99 + booking.totalAmount * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span>Credit Card (Visa ****4231)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-600">
                    Paid
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle>Status Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Update Status:</p>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`w-full justify-start ${
                      status === 'confirmed' ? 'bg-green-500/10 text-green-600 border-green-600' : ''
                    }`}
                    onClick={() => updateStatus('confirmed')}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Confirmed
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`w-full justify-start ${
                      status === 'pending' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-600' : ''
                    }`}
                    onClick={() => updateStatus('pending')}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Pending
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`w-full justify-start ${
                      status === 'cancelled' ? 'bg-red-500/10 text-red-600 border-red-600' : ''
                    }`}
                    onClick={() => updateStatus('cancelled')}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancelled
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
                variant="default" 
                size="sm" 
                className="w-full"
                onClick={saveBooking}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsView;