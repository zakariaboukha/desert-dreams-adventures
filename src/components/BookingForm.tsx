import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Check, Star } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookingFormProps {
  tourName?: string;
}

type BookingStep = "initial" | "tour-review" | "traveler-info" | "payment";

const BookingForm: React.FC<BookingFormProps> = ({
  tourName = "Desert Oasis Tour",
}) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>("initial");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState("2");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  type PaymentMethod = "card" | "paypal";
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const startBooking = () => {
    setCurrentStep("tour-review");
  };

  const goToNextStep = () => {
    if (currentStep === "tour-review") {
      setCurrentStep("traveler-info");
    } else if (currentStep === "traveler-info") {
      setCurrentStep("payment");
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === "traveler-info") {
      setCurrentStep("tour-review");
    } else if (currentStep === "payment") {
      setCurrentStep("traveler-info");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would handle the form submission here based on payment method
    // For now, we'll just show a success toast
    if (paymentMethod === "card") {
      toast.success("Card payment successful!", {
        description: "We will contact you shortly to confirm your booking.",
      });
    } else {
      toast.success("Redirected to PayPal!", {
        description: "Complete your payment on PayPal to confirm your booking.",
      });
    }

    setFormSubmitted(true);
    setCurrentStep("initial");
  };

  const calculateTotalPrice = () => {
    const basePrice = 280;
    const numGuests = parseInt(guests);
    return basePrice * numGuests;
  };

  const renderStepIndicator = () => {
    if (currentStep === "initial") return null;

    const steps = [
      { id: "tour-review", label: "Tour Review" },
      { id: "traveler-info", label: "Traveler Info" },
      { id: "payment", label: "Payment" },
    ];

    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === step.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="h-[2px] flex-1 bg-secondary mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderInitialView = () => (
    <div className="text-center py-6">
      <h3 className="text-2xl font-bold mb-2">{tourName}</h3>
      <div className="flex items-center justify-center gap-1 mb-2">
        <Star className="fill-yellow-400 text-yellow-400" size={16} />
        <span className="text-sm font-medium">4.5</span>
        <span className="text-sm text-muted-foreground">(365 reviews)</span>
      </div>
      <p className="text-xl font-bold mb-6">$280/person</p>
      <Button onClick={startBooking} size="lg">
        Book Now
      </Button>
    </div>
  );

  const renderTourReview = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-bold mb-2">Tour Highlights</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Guided exploration of stunning desert landscapes</li>
          <li>Visit to ancient oasis with natural springs</li>
          <li>Traditional desert lunch included</li>
          <li>Sunset camel ride experience</li>
          <li>Professional photography opportunities</li>
        </ul>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Select Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="guests">Number of Guests</Label>
        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger id="guests">
            <SelectValue placeholder="Select number of guests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Guest</SelectItem>
            <SelectItem value="2">2 Guests</SelectItem>
            <SelectItem value="3">3 Guests</SelectItem>
            <SelectItem value="4">4 Guests</SelectItem>
            <SelectItem value="5">5 Guests</SelectItem>
            <SelectItem value="6+">6+ Guests</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between font-medium">
          <span>Price per person:</span>
          <span>$280</span>
        </div>
        <div className="flex justify-between font-medium mt-1">
          <span>Number of guests:</span>
          <span>{guests}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total:</span>
          <span>${calculateTotalPrice()}</span>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={goToNextStep}>Continue to Traveler Info</Button>
      </div>
    </div>
  );

  const renderTravelerInfo = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any special requirements or questions?"
          rows={3}
          value={formData.specialRequests}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={goToPreviousStep}>
          Back
        </Button>
        <Button onClick={goToNextStep}>Continue to Payment</Button>
      </div>
    </div>
  );

  const renderPayment = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-secondary/50 p-4 rounded-lg mb-6">
        <h4 className="font-bold mb-2">Order Summary</h4>
        <div className="flex justify-between text-sm">
          <span>{tourName}</span>
          <span>${calculateTotalPrice()}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {guests} {parseInt(guests) === 1 ? "guest" : "guests"}
          </span>
          <span>{date ? format(date, "MMM d, yyyy") : "No date selected"}</span>
        </div>
        <div className="border-t mt-3 pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>${calculateTotalPrice()}</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <Label className="text-base font-medium">Payment Method</Label>
        <div className="flex flex-col space-y-3">
          <div
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"}`}
            onClick={() => setPaymentMethod("card")}
          >
            <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center mr-3">
              {paymentMethod === "card" && (
                <div className="h-3 w-3 rounded-full bg-primary"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium">Credit/Debit Card</div>
              <div className="text-sm text-muted-foreground">
                Visa, Mastercard, American Express
              </div>
            </div>
            <div className="flex space-x-2">
              <img
                src="https://api.tempo.new/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/visa.png"
                alt="Visa"
                className="w-10 h-6 object-contain"
              />
              <img
                src="https://api.tempo.new/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/mastercard.png"
                alt="Mastercard"
                className="w-10 h-6 object-contain"
              />
              <img
                src="https://api.tempo.new/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/amex.png"
                alt="American Express"
                className="w-10 h-6 object-contain"
              />
            </div>
          </div>

          <div
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-border"}`}
            onClick={() => setPaymentMethod("paypal")}
          >
            <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center mr-3">
              {paymentMethod === "paypal" && (
                <div className="h-3 w-3 rounded-full bg-primary"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium">PayPal</div>
              <div className="text-sm text-muted-foreground">
                Pay securely via PayPal
              </div>
            </div>
            <div className="w-16 h-6 bg-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
              PayPal
            </div>
          </div>
        </div>
      </div>

      {paymentMethod === "card" ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="cardName">Name on Card</Label>
            <Input
              id="cardName"
              placeholder="Enter name as it appears on card"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" required />
            </div>
          </div>
        </>
      ) : (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 mb-4">
            You'll be redirected to PayPal to complete your payment securely.
          </p>
          <Button
            type="button"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white"
            onClick={() => {
              toast.info("Redirecting to PayPal...");
              // In a real app, this would redirect to PayPal
              setTimeout(() => {
                handleSubmit({ preventDefault: () => {} } as React.FormEvent);
              }, 1500);
            }}
          >
            Continue to PayPal
          </Button>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={goToPreviousStep}>
          Back
        </Button>
        {paymentMethod === "card" && (
          <Button type="submit">Confirm & Pay</Button>
        )}
      </div>
    </form>
  );

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6">Book Your Adventure</h3>

      {formSubmitted ? (
        <div className="text-center py-8">
          <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Check className="text-primary" size={24} />
          </div>
          <h4 className="text-xl font-bold mb-2">Thank You!</h4>
          <p className="text-muted-foreground mb-4">
            Your booking request has been submitted. We'll contact you shortly
            to confirm the details.
          </p>
          <Button onClick={() => setFormSubmitted(false)} className="mt-2">
            Book Another Tour
          </Button>
        </div>
      ) : (
        <div>
          {renderStepIndicator()}

          {currentStep === "initial" && renderInitialView()}
          {currentStep === "tour-review" && renderTourReview()}
          {currentStep === "traveler-info" && renderTravelerInfo()}
          {currentStep === "payment" && renderPayment()}
        </div>
      )}
    </div>
  );
};

export default BookingForm;
