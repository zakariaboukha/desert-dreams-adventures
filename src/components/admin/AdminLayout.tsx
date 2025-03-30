
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Map, 
  Tag, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Moon,
  Sun
} from "lucide-react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Excursions', href: '/admin/excursions', icon: Map },
    { name: 'Categories', href: '/admin/categories', icon: Tag },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between p-4 border-b">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <Map className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Desert Tours</span>
            </Link>
            <SidebarTrigger />
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.href)}
                      tooltip={item.name}
                    >
                      <Link to={item.href} className="flex items-center">
                        <item.icon className="mr-2" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="mt-auto p-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/images/admin-avatar.jpg" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@deserttours.com</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                className="ml-auto"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-col flex-1 overflow-x-hidden">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex-1">
              <h1 className="font-semibold text-lg">Desert Tours Admin</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/" target="_blank">View Site</Link>
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          
          <footer className="border-t py-4 px-6">
            <p className="text-sm text-center text-muted-foreground">
              Desert Tours Admin Dashboard © {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
