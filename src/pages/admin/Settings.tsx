
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic settings for your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="Desert Dreams Tours" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Input id="site-description" defaultValue="Premium desert excursions and adventures" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="info@desertdreams.example" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input id="contact-phone" defaultValue="+971 4 123 4567" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Default Theme</Label>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="items-center flex space-x-2">
                      <input type="radio" id="light" name="theme" defaultChecked value="light" className="h-4 w-4" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Light mode for daytime viewing
                    </div>
                  </div>
                  <div>
                    <div className="items-center flex space-x-2">
                      <input type="radio" id="dark" name="theme" value="dark" className="h-4 w-4" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Dark mode for nighttime viewing
                    </div>
                  </div>
                  <div>
                    <div className="items-center flex space-x-2">
                      <input type="radio" id="system" name="theme" value="system" className="h-4 w-4" />
                      <Label htmlFor="system">System</Label>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Follow system appearance
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#9b87f5] border"></div>
                  <div className="w-8 h-8 rounded-full bg-[#7E69AB] border"></div>
                  <div className="w-8 h-8 rounded-full bg-[#1EAEDB] border"></div>
                  <div className="w-8 h-8 rounded-full bg-[#ea384c] border"></div>
                  <div className="w-8 h-8 rounded-full bg-[#31B93C] border"></div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-logo">Show Logo</Label>
                  <Switch id="show-logo" defaultChecked />
                </div>
              </div>
              
              <Button>Save Appearance</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-booking">New Booking</Label>
                      <Switch id="new-booking" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="booking-cancelled">Booking Cancelled</Label>
                      <Switch id="booking-cancelled" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="payment-received">Payment Received</Label>
                      <Switch id="payment-received" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="review-received">Review Received</Label>
                      <Switch id="review-received" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-3">System Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-alert">Login Alerts</Label>
                      <Switch id="login-alert" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-updates">System Updates</Label>
                      <Switch id="system-updates" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input id="notification-email" type="email" defaultValue="admin@desertdreams.example" />
                </div>
              </div>
              
              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="localization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Localization Settings</CardTitle>
              <CardDescription>
                Configure language and regional settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-timezone">Default Timezone</Label>
                <Select defaultValue="gmt+4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gmt+4">Gulf Standard Time (GMT+4)</SelectItem>
                    <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="cet">Central European Time (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="aed">AED - UAE Dirham</SelectItem>
                    <SelectItem value="gbp">GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button>Save Localization Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced system settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Maintenance Mode</Label>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Maintenance Mode</div>
                    <div className="text-sm text-muted-foreground">
                      When enabled, the site will show a maintenance page to visitors
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Caching</Label>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">Enable Page Cache</div>
                    <div className="text-sm text-muted-foreground">
                      Improve performance with page caching
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Cache Lifetime</div>
                    <div className="text-sm text-muted-foreground">
                      How long to keep cached pages
                    </div>
                  </div>
                  <Select defaultValue="3600">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1800">30 minutes</SelectItem>
                      <SelectItem value="3600">1 hour</SelectItem>
                      <SelectItem value="86400">24 hours</SelectItem>
                      <SelectItem value="604800">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label>Danger Zone</Label>
                <div className="border border-red-300 bg-red-50 dark:bg-red-900/10 p-4 rounded-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-red-600 dark:text-red-400">Clear All Cache</div>
                      <div className="text-sm text-red-600/80 dark:text-red-400/80">
                        This will clear all cached data
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">Clear Cache</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-red-600 dark:text-red-400">Reset Settings</div>
                      <div className="text-sm text-red-600/80 dark:text-red-400/80">
                        Reset all settings to default values
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">Reset</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
