
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

const ContactForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would handle the form submission here
    // For now, we'll just show a success toast
    toast.success('Message sent!', {
      description: 'Thank you for contacting us. We will get back to you soon.',
    });
    
    setFormSubmitted(true);
  };
  
  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
      
      {formSubmitted ? (
        <div className="text-center py-8">
          <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Check className="text-primary" size={24} />
          </div>
          <h4 className="text-xl font-bold mb-2">Thank You!</h4>
          <p className="text-muted-foreground mb-4">
            Your message has been sent. We'll get back to you as soon as possible.
          </p>
          <Button onClick={() => setFormSubmitted(false)} className="mt-2">
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your full name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email address" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="booking">Booking Information</SelectItem>
                <SelectItem value="support">Customer Support</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Type your message here..." 
              rows={5}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
