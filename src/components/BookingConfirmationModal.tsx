import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShoppingCart, Printer, Calendar, Users, Mail, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useBooking } from '@/contexts/BookingContext';

interface BookingDetails {
  id?: string;
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
}

interface BookingConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingDetails: BookingDetails;
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  open,
  onOpenChange,
  bookingDetails,
}) => {
  const navigate = useNavigate();
  const { addConfirmedBooking } = useBooking();

  const handleMakeAnotherBooking = () => {
    onOpenChange(false);
    navigate('/booking');
  };

  const handleViewBooking = () => {
    // Store the confirmed booking in context
    const confirmedBooking = {
      id: bookingDetails.id || bookingDetails.bookingId,
      bookingId: bookingDetails.bookingId,
      tripName: bookingDetails.tripName,
      date: bookingDetails.date,
      adults: bookingDetails.adults,
      children: bookingDetails.children,
      totalPrice: bookingDetails.totalPrice || 0,
      fullName: bookingDetails.fullName,
      email: bookingDetails.email,
      phone: bookingDetails.phone,
      status: 'pending' as const, // Default to pending, admin can confirm later
      additionalNotes: bookingDetails.additionalNotes,
    };
    
    addConfirmedBooking(confirmedBooking);
    
    // Close modal and navigate to booking details
    onOpenChange(false);
    navigate(`/booking/${bookingDetails.id || bookingDetails.bookingId}`);
  };

  const handlePrintConfirmation = () => {
    // Create a printable version
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Booking Confirmation - ${bookingDetails.bookingId}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .booking-details { margin-bottom: 20px; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Booking Confirmation</h1>
            <h2>${bookingDetails.tripName}</h2>
          </div>
          <div class="booking-details">
            <div class="detail-row"><span class="label">Booking ID:</span> ${bookingDetails.bookingId}</div>
            <div class="detail-row"><span class="label">Date:</span> ${new Date(bookingDetails.date).toLocaleDateString()}</div>
            <div class="detail-row"><span class="label">Adults:</span> ${bookingDetails.adults}</div>
            <div class="detail-row"><span class="label">Children:</span> ${bookingDetails.children}</div>
            <div class="detail-row"><span class="label">Total Price:</span> $${bookingDetails.totalPrice?.toFixed(2) || '0.00'}</div>
            <div class="detail-row"><span class="label">Customer:</span> ${bookingDetails.fullName}</div>
            <div class="detail-row"><span class="label">Email:</span> ${bookingDetails.email}</div>
            <div class="detail-row"><span class="label">Phone:</span> ${bookingDetails.phone}</div>
            ${bookingDetails.additionalNotes ? `<div class="detail-row"><span class="label">Notes:</span> ${bookingDetails.additionalNotes}</div>` : ''}
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-2">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-lg font-semibold text-gray-900">
            Booking Confirmed!
          </DialogTitle>
          <p className="text-center text-sm text-gray-600 mt-1">
            Your booking has been confirmed. We'll contact you soon with further details.
          </p>
        </DialogHeader>

        <div className="px-4 pb-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <h3 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Booking Summary
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-medium text-gray-900">{bookingDetails.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trip:</span>
                <span className="font-medium text-gray-900 text-right">{bookingDetails.tripName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" /> Date:
                </span>
                <span className="font-medium text-gray-900">{new Date(bookingDetails.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center">
                  <Users className="w-3 h-3 mr-1" /> Guests:
                </span>
                <span className="font-medium text-gray-900">{bookingDetails.adults + bookingDetails.children} ({bookingDetails.adults} Adults, {bookingDetails.children} Children)</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total Price:</span>
                <span className="text-amber-600">${bookingDetails.totalPrice?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              Contact Information
            </h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Full Name:</span>
                <span className="font-medium text-gray-900">{bookingDetails.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center">
                  <Mail className="w-3 h-3 mr-1" /> Email:
                </span>
                <span className="font-medium text-gray-900">{bookingDetails.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center">
                  <Phone className="w-3 h-3 mr-1" /> Phone:
                </span>
                <span className="font-medium text-gray-900">{bookingDetails.phone}</span>
              </div>
              {bookingDetails.additionalNotes && (
                <div className="mt-2">
                  <span className="text-gray-600 text-xs">Additional Notes:</span>
                  <p className="text-gray-900 text-xs mt-1">{bookingDetails.additionalNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 pt-0">
          <div className="grid grid-cols-1 gap-2 w-full">
            <Button
              onClick={handlePrintConfirmation}
              variant="outline"
              size="sm"
              className="w-full text-xs h-8"
            >
              <Printer className="w-3 h-3 mr-1" />
              Print
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleMakeAnotherBooking}
                variant="outline"
                size="sm"
                className="text-xs h-8"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Book More
              </Button>
              <Button
                onClick={handleViewBooking}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-xs h-8"
              >
                <ArrowRight className="w-3 h-3 mr-1" />
                View Booking
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmationModal;