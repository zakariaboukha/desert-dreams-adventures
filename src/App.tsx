// App component
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import Excursions from "./pages/Excursions";
import DestinationDetail from "./pages/DestinationDetail";
import ExcursionDetail from "./pages/ExcursionDetail";
import TripDetail from "./pages/TripDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import BookingDetails from "./pages/BookingDetails";
import BookingSummaryPanel from "@/components/BookingSummaryPanel";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/admin/Login";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminExcursions from "./pages/admin/Excursions";
import ExcursionCreate from "./pages/admin/ExcursionCreate";
import ExcursionCategories from "./pages/admin/ExcursionCategories";
import Bookings from "./pages/admin/Bookings";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import Reports from "./pages/admin/Reports";
import Content from "./pages/admin/Content";
import Settings from "./pages/admin/Settings";
import Profile from "./pages/admin/Profile";
import TripCreate from "./pages/admin/trips/Create";
import Trips from "./pages/admin/Trips";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

// Component to handle Tempo routes
const TempoRoutes = () => {
  return import.meta.env.VITE_TEMPO ? useRoutes(routes) : null;
};

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <BookingProvider>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <ScrollToTop />
                <AuthProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    {/* Tempo routes */}
                    {import.meta.env.VITE_TEMPO && <TempoRoutes />}
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Index />} />
                      <Route path="/destinations" element={<Destinations />} />
                      <Route path="/excursions" element={<Excursions />} />
                      <Route
                        path="/destinations/:id"
                        element={<DestinationDetail />}
                      />
                      <Route
                        path="/excursions/:id"
                        element={<ExcursionDetail />}
                      />
                      <Route
                        path="/trips/:id"
                        element={<TripDetail />}
                      />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/booking" element={<Booking />} />
                      <Route path="/booking/:id" element={<BookingDetails />} />
                      <Route path="/booking-cart" element={<BookingSummaryPanel />} />

                      {/* Admin Auth Route */}
                      <Route path="/admin/login" element={<Login />} />

                      {/* Protected Admin Routes */}
                      <Route element={<ProtectedRoute />}>
                        <Route path="/admin" element={<AdminLayout />}>
                          <Route index element={<Dashboard />} />
                          <Route path="dashboard" element={<Dashboard />} />
                          <Route path="excursions" element={<AdminExcursions />} />
                          <Route
                            path="excursions/create"
                            element={<ExcursionCreate />}
                          />
                          <Route
                            path="excursions/categories"
                            element={<ExcursionCategories />}
                          />
                          <Route path="trips" element={<Trips />} />
                          <Route path="bookings" element={<Bookings />} />
                          <Route path="users" element={<Users />} />
                          <Route path="orders" element={<Orders />} />
                          <Route path="reports" element={<Reports />} />
                          <Route path="content" element={<Content />} />
                          <Route path="settings" element={<Settings />} />
                          <Route path="profile" element={<Profile />} />
                          <Route path="trips/create" element={<TripCreate />} />
                        </Route>
                      </Route>

                      {/* Allow Tempo routes before catchall */}
                      {import.meta.env.VITE_TEMPO && (
                        <Route path="/tempobook/*" />
                      )}

                      {/* 404 Route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </TooltipProvider>
                </AuthProvider>
              </BrowserRouter>
            </QueryClientProvider>
          </BookingProvider>
        </LanguageProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
