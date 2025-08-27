import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking, ConfirmedBooking } from '@/contexts/BookingContext';
import { CheckCircle, Calendar, Users, CreditCard, ArrowLeft, Printer, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getConfirmedBooking } = useBooking();
  const [booking, setBooking] = useState<ConfirmedBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = () => {
      try {
        if (id) {
          const foundBooking = getConfirmedBooking(id);
          if (foundBooking) {
            setBooking(foundBooking);
          } else {
            setError('Booking not found');
          }
        } else {
          setError('Invalid booking ID');
        }
      } catch (err) {
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id, getConfirmedBooking]);

  const handlePrintConfirmation = () => {
    window.print();
  };

  const handleBackToBookings = () => {
    navigate('/booking');
  };
  
  // Error handling - redirect or show error
  useEffect(() => {
    if (error && !loading) {
      const timer = setTimeout(() => {
        navigate('/booking');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Booking Not Found</h2>
              <p className="text-gray-600 mb-4">
                {error || 'The booking you are looking for could not be found.'}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Redirecting to booking page in a few seconds...
              </p>
              <Button onClick={handleBackToBookings} className="w-full">
                Go to Booking Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    return status === 'confirmed' ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <Clock className="h-5 w-5 text-yellow-600" />
    );
  };

  const getStatusColor = (status: string) => {
    return status === 'confirmed' 
      ? 'bg-green-500 hover:bg-green-600' 
      : 'bg-yellow-500 hover:bg-yellow-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:py-4">
      <div className="max-w-4xl mx-auto">
        {/* Status Banner */}
        <div className={`mb-8 ${booking.status === 'confirmed' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-4 shadow-sm print:border-gray-300`}>
          <div className="flex items-center">
            {getStatusIcon(booking.status)}
            <div className="ml-3">
              <h3 className={`text-lg font-semibold ${booking.status === 'confirmed' ? 'text-green-800' : 'text-yellow-800'}`}>
                {booking.status === 'confirmed' ? 'Booking Confirmed!' : 'Booking Pending'}
              </h3>
              <p className={`${booking.status === 'confirmed' ? 'text-green-700' : 'text-yellow-700'}`}>
                {booking.status === 'confirmed' 
                  ? 'Your booking has been confirmed by our team.' 
                  : 'Your booking is pending confirmation from our team.'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-xl border-0 overflow-hidden print:shadow-none print:border">
          <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white print:bg-gray-100 print:text-black">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
                  {booking.tripName}
                </CardTitle>
                <div className="flex items-center space-x-4 text-amber-100 print:text-gray-600">
                  <span className="text-sm font-medium">Booking ID: {booking.bookingId}</span>
                  <Badge 
                    className={`${getStatusColor(booking.status)} text-white print:bg-gray-200 print:text-black`}
                  >
                    {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 print-area">
            {/* Booking Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Trip Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-amber-600" />
                  Trip Details
                </h3>
                <div className="space-y-3 pl-7">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900">{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium capitalize ${booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-amber-600" />
                  Guest Information
                </h3>
                <div className="space-y-3 pl-7">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Adults:</span>
                    <span className="font-medium text-gray-900">{booking.adults}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Children:</span>
                    <span className="font-medium text-gray-900">{booking.children}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Guests:</span>
                    <span className="font-medium text-gray-900">{booking.adults + booking.children}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Customer Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-2">
                <div>
                  <span className="text-sm text-gray-600">Name:</span>
                  <p className="font-medium text-gray-900">{booking.fullName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <p className="font-medium text-gray-900">{booking.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Phone:</span>
                  <p className="font-medium text-gray-900">{booking.phone}</p>
                </div>
              </div>
              {booking.additionalNotes && (
                <div className="mt-4 pl-2">
                  <span className="text-sm text-gray-600">Additional Notes:</span>
                  <p className="font-medium text-gray-900 mt-1">{booking.additionalNotes}</p>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            {/* Pricing Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <CreditCard className="h-5 w-5 mr-2 text-amber-600" />
                Pricing Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 print:bg-gray-100">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Guests:</span>
                    <span>{booking.adults + booking.children}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total Price:</span>
                    <span className="text-amber-600">{formatCurrency(booking.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 no-print">
              <Button
                onClick={handleBackToBookings}
                variant="outline"
                className="flex-1 sm:flex-none hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bookings
              </Button>
              <Button
                onClick={handlePrintConfirmation}
                className="flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700 transition-colors duration-200"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Confirmation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Print Styles */}
        <style jsx>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default BookingDetails;