
import React, { useState } from 'react';
import { CalendarIcon, Download, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface BookingExportProps {
  className?: string;
}

const BookingExport: React.FC<BookingExportProps> = ({ className }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date());
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date());
  const [bookingStatus, setBookingStatus] = useState("all");

  const handleExport = () => {
    // In a real app, this would make an API call to Supabase to get the data
    // and then generate the export file
    
    if (!dateFrom || !dateTo) {
      toast.error("Please select both start and end dates");
      return;
    }
    
    if (dateFrom > dateTo) {
      toast.error("Start date must be before end date");
      return;
    }
    
    toast.success(`Bookings exported as ${exportFormat.toUpperCase()}`);
    setIsDialogOpen(false);
    
    // Simulate download after a delay
    setTimeout(() => {
      toast("File downloaded successfully", {
        description: `bookings_${format(dateFrom, "yyyy-MM-dd")}_to_${format(dateTo, "yyyy-MM-dd")}.${exportFormat}`,
        action: {
          label: "Open",
          onClick: () => toast.info("This is a mock export, no actual file was created"),
        },
      });
    }, 1500);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("w-full", className)}>
          <Download className="mr-2 h-4 w-4" />
          Export Bookings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Bookings</DialogTitle>
          <DialogDescription>
            Select date range and export options for your booking data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar 
                    mode="single" 
                    selected={dateFrom} 
                    onSelect={setDateFrom} 
                    initialFocus 
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar 
                    mode="single" 
                    selected={dateTo} 
                    onSelect={setDateTo} 
                    initialFocus 
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV Format</SelectItem>
                <SelectItem value="xlsx">Excel Format</SelectItem>
                <SelectItem value="pdf">PDF Format</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Booking Status</Label>
            <Select value={bookingStatus} onValueChange={setBookingStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="confirmed">Confirmed Only</SelectItem>
                <SelectItem value="pending">Pending Only</SelectItem>
                <SelectItem value="cancelled">Cancelled Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingExport;
