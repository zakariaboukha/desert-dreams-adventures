
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destinations/:id" element={<DestinationDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </NextThemeProvider>
  </React.StrictMode>
);

export default App;
