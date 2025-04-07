
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Excursions from "./pages/admin/Excursions";
import ExcursionCreate from "./pages/admin/ExcursionCreate";
import ExcursionCategories from "./pages/admin/ExcursionCategories";
import Bookings from "./pages/admin/Bookings";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import Reports from "./pages/admin/Reports";
import Content from "./pages/admin/Content";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/destinations/:id" element={<DestinationDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/booking" element={<Booking />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="excursions" element={<Excursions />} />
                    <Route path="excursions/create" element={<ExcursionCreate />} />
                    <Route path="excursions/categories" element={<ExcursionCategories />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="users" element={<Users />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="content" element={<Content />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TooltipProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
