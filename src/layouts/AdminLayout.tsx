
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar, { MobileAdminSidebar } from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { Toaster } from '@/components/ui/sonner';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const { logout, user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <Toaster position="top-right" theme={theme as "light" | "dark"} />
      
      {/* Desktop Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      
      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[300px] p-0">
          <SheetHeader className="px-4 py-2 border-b">
            <SheetTitle>Admin Panel</SheetTitle>
          </SheetHeader>
          <MobileAdminSidebar />
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">{user?.name}</span>
                <span className="text-sm text-muted-foreground">{user?.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-[70px]'}`}>
        <AdminHeader 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen}
          toggleMobile={toggleMobile}
        />
        <main className="container mx-auto p-4 md:p-6 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
