import React from 'react';
import { X, Trash2, Calendar, Users, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useBooking, BookingItem } from '@/contexts/BookingContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BookingSummaryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingSummaryPanel: React.FC<BookingSummaryPanelProps> = ({ isOpen, onClose }) => {
  const { state, removeItem, removeConfirmedBooking, clearCart, getTotalPrice } = useBooking();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleProceedToBooking = () => {
    onClose();
    navigate('/booking');
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleViewBookingDetails = (bookingId: string) => {
    onClose();
    navigate(`/booking/${bookingId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Get the latest confirmed booking for status message
  const latestConfirmedBooking = state.confirmedBookings.length > 0 ? state.confirmedBookings[0] : null;

  const getStatusMessage = () => {
    if (!latestConfirmedBooking) return null;
    
    if (latestConfirmedBooking.status === 'confirmed') {
      return {
        message: "Your latest booking has been confirmed successfully. Ready to enjoy your trip!",
        type: 'success' as const
      };
    } else {
      return {
        message: "Your latest booking is waiting for confirmation. You'll be notified once it's approved.",
        type: 'pending' as const
      };
    }
  };

  const statusMessage = getStatusMessage();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden" 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-background border-l shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Booking Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Status Message */}
            {statusMessage && (
              <div className={`mb-4 p-3 rounded-lg border ${
                statusMessage.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-yellow-50 border-yellow-200 text-yellow-800'
              }`}>
                <div className="flex items-start gap-2">
                  {statusMessage.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">{statusMessage.message}</p>
                </div>
              </div>
            )}

            {state.items.length === 0 && state.confirmedBookings.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-4">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Your cart is empty</p>
                  <p className="text-sm">Add some amazing experiences!</p>
                </div>
                <Button onClick={onClose} variant="outline">
                  Continue Browsing
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Confirmed Bookings */}
                {state.confirmedBookings.map((booking) => (
                  <Card key={booking.id} className="relative border-l-4 border-l-primary">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-sm font-medium line-clamp-2">
                            {booking.tripName}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                              className={booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                              }
                            >
                              {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Booking #{booking.bookingId.slice(-6).toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveConfirmedBooking(booking.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          <span>
                            {booking.adults} {booking.adults === 1 ? 'adult' : 'adults'}
                            {booking.children > 0 && `, ${booking.children} ${booking.children === 1 ? 'child' : 'children'}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-semibold text-primary">
                          {formatPrice(booking.totalPrice)}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewBookingDetails(booking.id)}
                          className="text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Separator between confirmed bookings and cart items */}
                {state.confirmedBookings.length > 0 && state.items.length > 0 && (
                  <div className="relative">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-background px-2 text-xs text-muted-foreground">
                        Cart Items
                      </span>
                    </div>
                  </div>
                )}

                {/* Cart Items */}
                {state.items.map((item: BookingItem) => (
                  <Card key={item.id} className="relative">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-sm font-medium line-clamp-2">
                            {item.name}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {item.type === 'trip' ? 'Multi-day Trip' : 'Day Excursion'}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          <span>{item.people} {item.people === 1 ? 'person' : 'people'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{item.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-muted-foreground">
                          {formatPrice(item.price)} × {item.people}
                        </span>
                        <span className="font-semibold">
                          {formatPrice(item.totalPrice)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Cart Total:</span>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={handleProceedToBooking}
                  className="w-full"
                  size="lg"
                >
                  Proceed to Booking
                </Button>
                <Button 
                  onClick={clearCart}
                  variant="outline"
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingSummaryPanel;