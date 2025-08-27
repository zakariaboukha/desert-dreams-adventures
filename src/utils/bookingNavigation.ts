import { NavigateFunction } from 'react-router-dom';

export interface BookingContext {
  type?: 'trip' | 'excursion';
  id?: string;
  name?: string;
  price?: number;
  location?: string;
  duration?: string;
  image?: string;
}

export const navigateToBooking = (
  navigate: NavigateFunction,
  context?: BookingContext
) => {
  // Build URL with query parameters
  const params = new URLSearchParams();
  
  if (context?.type) params.set('type', context.type);
  if (context?.id) params.set('id', context.id);
  if (context?.name) params.set('name', context.name);
  if (context?.price) params.set('price', context.price.toString());
  if (context?.location) params.set('location', context.location);
  if (context?.duration) params.set('duration', context.duration);
  if (context?.image) params.set('image', context.image);
  
  const queryString = params.toString();
  const url = queryString ? `/booking?${queryString}` : '/booking';
  
  navigate(url);
};

export const scrollToBookingForm = () => {
  // Wait for navigation to complete, then scroll
  setTimeout(() => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  }, 100);
};