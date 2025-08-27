import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Booking item interface
export interface BookingItem {
  id: string;
  type: 'trip' | 'excursion';
  name: string;
  price: number;
  duration: string;
  date: string;
  people: number;
  totalPrice: number;
  image?: string;
  addedAt: Date;
}

// Confirmed booking interface
export interface ConfirmedBooking {
  id: string;
  bookingId: string;
  tripName: string;
  date: string;
  adults: number;
  children: number;
  totalPrice: number;
  fullName: string;
  email: string;
  phone: string;
  status: 'confirmed' | 'pending';
  additionalNotes?: string;
  confirmedAt: Date;
}

// Booking state interface
interface BookingState {
  items: BookingItem[];
  confirmedBookings: ConfirmedBooking[];
  totalItems: number;
  totalPrice: number;
}

// Action types
type BookingAction =
  | { type: 'ADD_ITEM'; payload: BookingItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<BookingItem> } }
  | { type: 'ADD_CONFIRMED_BOOKING'; payload: ConfirmedBooking }
  | { type: 'REMOVE_CONFIRMED_BOOKING'; payload: string }
  | { type: 'UPDATE_BOOKING_STATUS'; payload: { id: string; status: 'confirmed' | 'pending' } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_FROM_STORAGE'; payload: BookingItem[] }
  | { type: 'LOAD_CONFIRMED_FROM_STORAGE'; payload: ConfirmedBooking[] };

// Context interface
interface BookingContextType {
  state: BookingState;
  addItem: (item: Omit<BookingItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<BookingItem>) => void;
  addConfirmedBooking: (booking: Omit<ConfirmedBooking, 'confirmedAt'>) => void;
  removeConfirmedBooking: (id: string) => void;
  getConfirmedBooking: (id: string) => ConfirmedBooking | undefined;
  updateBookingStatus: (id: string, status: 'confirmed' | 'pending') => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

// Initial state
const initialState: BookingState = {
  items: [],
  confirmedBookings: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer function
function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = {
        ...action.payload,
        id: Date.now().toString(),
        addedAt: new Date(),
      };
      const newItems = [newItem, ...state.items];
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
        totalPrice: newItems.reduce((sum, item) => sum + item.totalPrice, 0),
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
        totalPrice: newItems.reduce((sum, item) => sum + item.totalPrice, 0),
      };
    }
    case 'UPDATE_ITEM': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item
      );
      return {
        ...state,
        items: newItems,
        totalPrice: newItems.reduce((sum, item) => sum + item.totalPrice, 0),
      };
    }
    case 'ADD_CONFIRMED_BOOKING': {
      const newBooking = {
        ...action.payload,
        confirmedAt: new Date(),
      };
      // Add new confirmed bookings to the beginning of the array
      const newConfirmedBookings = [newBooking, ...state.confirmedBookings];
      return {
        ...state,
        confirmedBookings: newConfirmedBookings,
      };
    }
    case 'REMOVE_CONFIRMED_BOOKING': {
      const newConfirmedBookings = state.confirmedBookings.filter(
        booking => booking.id !== action.payload && booking.bookingId !== action.payload
      );
      return {
        ...state,
        confirmedBookings: newConfirmedBookings,
      };
    }
    case 'UPDATE_BOOKING_STATUS': {
      const newConfirmedBookings = state.confirmedBookings.map(booking =>
        booking.id === action.payload.id
          ? { ...booking, status: action.payload.status }
          : booking
      );
      return {
        ...state,
        confirmedBookings: newConfirmedBookings,
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    case 'LOAD_FROM_STORAGE': {
      const items = action.payload;
      return {
        ...state,
        items,
        totalItems: items.length,
        totalPrice: items.reduce((sum, item) => sum + item.totalPrice, 0),
      };
    }
    case 'LOAD_CONFIRMED_FROM_STORAGE': {
      return {
        ...state,
        confirmedBookings: action.payload,
      };
    }
    default:
      return state;
  }
}

// Create context
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Provider component
export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('bookingItems');
    const savedConfirmedBookings = localStorage.getItem('confirmedBookings');
    
    if (savedItems) {
      try {
        const items = JSON.parse(savedItems);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: items });
      } catch (error) {
        console.error('Error loading booking items from localStorage:', error);
      }
    }
    
    if (savedConfirmedBookings) {
      try {
        const confirmedBookings = JSON.parse(savedConfirmedBookings);
        dispatch({ type: 'LOAD_CONFIRMED_FROM_STORAGE', payload: confirmedBookings });
      } catch (error) {
        console.error('Error loading confirmed bookings from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('bookingItems', JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    localStorage.setItem('confirmedBookings', JSON.stringify(state.confirmedBookings));
  }, [state.confirmedBookings]);

  const addItem = (item: Omit<BookingItem, 'id' | 'addedAt'>) => {
    const newItem: BookingItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date(),
    };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateItem = (id: string, updates: Partial<BookingItem>) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } });
  };

  const addConfirmedBooking = (booking: Omit<ConfirmedBooking, 'confirmedAt'>) => {
    dispatch({ type: 'ADD_CONFIRMED_BOOKING', payload: booking });
  };

  const getConfirmedBooking = (id: string): ConfirmedBooking | undefined => {
    return state.confirmedBookings.find(booking => booking.id === id || booking.bookingId === id);
  };

  const updateBookingStatus = (id: string, status: 'confirmed' | 'pending') => {
    dispatch({ type: 'UPDATE_BOOKING_STATUS', payload: { id, status } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = () => state.totalItems;
  const getTotalPrice = () => state.totalPrice;

  // In the BookingProvider, add this function:
  const removeConfirmedBooking = (id: string) => {
    dispatch({ type: 'REMOVE_CONFIRMED_BOOKING', payload: id });
  };

  const value: BookingContextType = {
    state,
    addItem,
    removeItem,
    updateItem,
    addConfirmedBooking,
    removeConfirmedBooking,
    getConfirmedBooking,
    updateBookingStatus,
    clearCart,
    getItemCount,
    getTotalPrice,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export default BookingContext;