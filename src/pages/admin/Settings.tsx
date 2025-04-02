
import React, { useState } from 'react';
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, RefreshCcw } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const siteInfoSchema = z.object({
  siteName: z.string().min(2, { message: "Site name is required" }),
  siteTagline: z.string().min(2, { message: "Site tagline is required" }),
  siteDescription: z.string().min(10, { message: "Description must be at least 10 characters" }),
});

const contactInfoSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(7, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
});

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const siteInfoForm = useForm<z.infer<typeof siteInfoSchema>>({
    resolver: zodResolver(siteInfoSchema),
    defaultValues: {
      siteName: "Desert Tours",
      siteTagline: "Experience the Desert",
      siteDescription: "Desert Tours offers exciting and authentic desert experiences for adventure lovers.",
    },
  });

  const contactInfoForm = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: "contact@deserttours.com",
      phone: "+1 234 567 8901",
      address: "123 Desert Road",
      city: "Sahara City",
    },
  });

  const onSaveSiteInfo = (data: z.infer<typeof siteInfoSchema>) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Site info saved",
        description: "Your changes have been saved successfully.",
      });
    }, 1000);
  };

  const onSaveContactInfo = (data: z.infer<typeof contactInfoSchema>) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Contact info saved",
        description: "Your changes have been saved successfully.",
      });
    }, 1000);
  };

  const handleResetSiteInfo = () => {
    siteInfoForm.reset();
  };

  const handleResetContactInfo = () => {
    contactInfoForm.reset();
  };

  const handleThemeChange = (mode: string) => {
    setTheme(mode === "dark" ? "dark" : "light");
  };

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-h-[calc(100vh-184px)] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <Form {...siteInfoForm}>
                <form onSubmit={siteInfoForm.handleSubmit(onSaveSiteInfo)}>
                  <CardHeader>
                    <CardTitle>Site Information</CardTitle>
                    <CardDescription>
                      Manage your site's basic information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={siteInfoForm.control}
                        name="siteName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={siteInfoForm.control}
                        name="siteTagline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site Tagline</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={siteInfoForm.control}
                      name="siteDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Description</FormLabel>
                          <FormControl>
                            <textarea 
                              {...field}
                              className="w-full min-h-[100px] p-2 rounded-md border border-input bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleResetSiteInfo}>Reset</Button>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
            
            <Card>
              <Form {...contactInfoForm}>
                <form onSubmit={contactInfoForm.handleSubmit(onSaveContactInfo)}>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Manage your contact details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={contactInfoForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactInfoForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={contactInfoForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactInfoForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleResetContactInfo}>Reset</Button>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of your site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Color Mode</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="light-mode" 
                          name="color-mode" 
                          checked={theme === "light"} 
                          onChange={() => handleThemeChange("light")} 
                        />
                        <label htmlFor="light-mode">Light</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="dark-mode" 
                          name="color-mode" 
                          checked={theme === "dark"} 
                          onChange={() => handleThemeChange("dark")}
                        />
                        <label htmlFor="dark-mode">Dark</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="system-mode" 
                          name="color-mode" 
                        />
                        <label htmlFor="system-mode">System</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Homepage Layout</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="layout-standard" name="homepage-layout" defaultChecked />
                        <label htmlFor="layout-standard">Standard</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="layout-featured" name="homepage-layout" />
                        <label htmlFor="layout-featured">Featured Focus</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Primary Color</h3>
                  <div className="flex space-x-2">
                    {['#D97706', '#059669', '#2563EB', '#7C3AED', '#DB2777'].map((color) => (
                      <div 
                        key={color}
                        className="w-8 h-8 rounded-full cursor-pointer ring-1 ring-border"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button onClick={() => {
                  toast({
                    title: "Theme settings saved",
                    description: "Your theme settings have been saved successfully.",
                  });
                }}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Logo & Branding</CardTitle>
                <CardDescription>
                  Upload your logo and manage branding elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Site Logo</label>
                    <div className="flex items-center justify-center border border-dashed rounded-md p-6 bg-muted/20">
                      <div className="text-center">
                        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-secondary mb-2">
                          <RefreshCcw className="h-6 w-6" />
                        </div>
                        <div className="text-sm">
                          <label htmlFor="logo-upload" className="cursor-pointer text-primary hover:underline">
                            Click to upload
                          </label>
                          <span> or drag and drop</span>
                          <input id="logo-upload" type="file" className="hidden" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          SVG, PNG, JPG (max. 2MB)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Favicon</label>
                    <div className="flex items-center justify-center border border-dashed rounded-md p-6 bg-muted/20">
                      <div className="text-center">
                        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-secondary mb-2">
                          <RefreshCcw className="h-6 w-6" />
                        </div>
                        <div className="text-sm">
                          <label htmlFor="favicon-upload" className="cursor-pointer text-primary hover:underline">
                            Click to upload
                          </label>
                          <span> or drag and drop</span>
                          <input id="favicon-upload" type="file" className="hidden" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          SVG, PNG, ICO (max. 1MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button onClick={() => {
                  toast({
                    title: "Branding updated",
                    description: "Logo and branding have been updated successfully.",
                  });
                }}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Configure when you'll receive email notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="booking-notification" defaultChecked />
                    <label htmlFor="booking-notification" className="text-sm">
                      New booking notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="user-notification" defaultChecked />
                    <label htmlFor="user-notification" className="text-sm">
                      New user registrations
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="review-notification" defaultChecked />
                    <label htmlFor="review-notification" className="text-sm">
                      New user reviews
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="system-notification" />
                    <label htmlFor="system-notification" className="text-sm">
                      System updates
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing-notification" />
                    <label htmlFor="marketing-notification" className="text-sm">
                      Marketing reports
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Admin User Notification Settings</CardTitle>
                <CardDescription>
                  Choose which notifications are sent to admin users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="booking-admin" defaultChecked />
                    <div className="space-y-0.5">
                      <label htmlFor="booking-admin" className="text-sm font-medium">
                        Booking Notifications
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications when a booking is made or cancelled
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feedback-admin" defaultChecked />
                    <div className="space-y-0.5">
                      <label htmlFor="feedback-admin" className="text-sm font-medium">
                        Customer Feedback
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications when customers leave reviews
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="security-admin" defaultChecked />
                    <div className="space-y-0.5">
                      <label htmlFor="security-admin" className="text-sm font-medium">
                        Security Alerts
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Get notified about important security events
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Password Settings</CardTitle>
                <CardDescription>
                  Update your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Authenticator App</h3>
                    <p className="text-xs text-muted-foreground">
                      Use an authenticator app to generate one-time codes
                    </p>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">SMS Authentication</h3>
                    <p className="text-xs text-muted-foreground">
                      Receive verification codes via SMS
                    </p>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Email Authentication</h3>
                    <p className="text-xs text-muted-foreground">
                      Receive backup codes via email
                    </p>
                  </div>
                  <Button>Enabled</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </AdminLayout>
  );
};

export default Settings;
