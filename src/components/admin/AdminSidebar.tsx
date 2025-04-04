
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  CalendarDays, 
  Users, 
  Settings, 
  ShoppingCart,
  BarChart2, 
  FileText, 
  ChevronDown,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active: boolean;
  isOpen: boolean;
}

interface SubmenuItemProps {
  label: string;
  path: string;
  active: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, path, active, isOpen }) => (
  <Link 
    to={path} 
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-secondary/50",
      active ? "bg-primary/10 text-primary" : "text-foreground",
      !isOpen && "justify-center"
    )}
  >
    <div className="text-inherit">{icon}</div>
    {isOpen && <span className="text-sm">{label}</span>}
  </Link>
);

const SubmenuItem: React.FC<SubmenuItemProps> = ({ label, path, active }) => (
  <Link 
    to={path} 
    className={cn(
      "text-sm py-1.5 px-3 rounded-md transition-all hover:bg-secondary/50 block ml-8",
      active ? "bg-primary/10 text-primary" : "text-foreground"
    )}
  >
    {label}
  </Link>
);

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const location = useLocation();
  const [excursionsOpen, setExcursionsOpen] = React.useState(true);
  const [reportsOpen, setReportsOpen] = React.useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 h-screen bg-card border-r border-border transition-all duration-300 z-20",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {isOpen ? (
          <Link to="/admin" className="flex items-center">
            <span className="text-xl font-bold text-primary">Desert<span className="text-foreground">Admin</span></span>
          </Link>
        ) : (
          <Link to="/admin" className="w-full flex justify-center">
            <span className="text-xl font-bold text-primary">D</span>
          </Link>
        )}
      </div>
      
      <div className="py-4 px-2 flex flex-col gap-1">
        <MenuItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          path="/admin" 
          active={isActive('/admin')} 
          isOpen={isOpen}
        />
        
        <div className="mt-2">
          {isOpen && <div className="text-xs text-muted-foreground px-3 py-2">MANAGEMENT</div>}
          
          <div>
            <div 
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all cursor-pointer hover:bg-secondary/50",
                (isActive('/admin/excursions') || isActive('/admin/excursions/create') || isActive('/admin/excursions/categories')) ? "bg-primary/10 text-primary" : "text-foreground",
                !isOpen && "justify-center"
              )}
              onClick={() => isOpen && setExcursionsOpen(!excursionsOpen)}
            >
              <Map size={20} />
              {isOpen && (
                <>
                  <span className="text-sm flex-grow">Excursions</span>
                  {excursionsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </>
              )}
            </div>
            
            {isOpen && excursionsOpen && (
              <div className="mt-1 mb-1">
                <SubmenuItem 
                  label="All Excursions" 
                  path="/admin/excursions" 
                  active={isActive('/admin/excursions')}
                />
                <SubmenuItem 
                  label="Create New" 
                  path="/admin/excursions/create" 
                  active={isActive('/admin/excursions/create')}
                />
                <SubmenuItem 
                  label="Categories" 
                  path="/admin/excursions/categories" 
                  active={isActive('/admin/excursions/categories')}
                />
              </div>
            )}
          </div>
          
          <MenuItem 
            icon={<CalendarDays size={20} />} 
            label="Bookings" 
            path="/admin/bookings" 
            active={isActive('/admin/bookings')} 
            isOpen={isOpen}
          />
          
          <MenuItem 
            icon={<Users size={20} />} 
            label="Users" 
            path="/admin/users" 
            active={isActive('/admin/users')} 
            isOpen={isOpen}
          />
          
          <MenuItem 
            icon={<ShoppingCart size={20} />} 
            label="Orders" 
            path="/admin/orders" 
            active={isActive('/admin/orders')} 
            isOpen={isOpen}
          />
          
          <div>
            <div 
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all cursor-pointer hover:bg-secondary/50",
                isActive('/admin/reports') ? "bg-primary/10 text-primary" : "text-foreground",
                !isOpen && "justify-center"
              )}
              onClick={() => isOpen && setReportsOpen(!reportsOpen)}
            >
              <BarChart2 size={20} />
              {isOpen && (
                <>
                  <span className="text-sm flex-grow">Reports</span>
                  {reportsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </>
              )}
            </div>
            
            {isOpen && reportsOpen && (
              <div className="mt-1 mb-1">
                <SubmenuItem 
                  label="Sales Reports" 
                  path="/admin/reports?type=sales" 
                  active={location.pathname === '/admin/reports' && location.search.includes('type=sales')}
                />
                <SubmenuItem 
                  label="Customer Analytics" 
                  path="/admin/reports?type=customers" 
                  active={location.pathname === '/admin/reports' && location.search.includes('type=customers')}
                />
                <SubmenuItem 
                  label="Performance" 
                  path="/admin/reports?type=performance" 
                  active={location.pathname === '/admin/reports' && location.search.includes('type=performance')}
                />
              </div>
            )}
          </div>
          
          <MenuItem 
            icon={<FileText size={20} />} 
            label="Content" 
            path="/admin/content" 
            active={isActive('/admin/content')} 
            isOpen={isOpen}
          />
        </div>
        
        <div className="mt-2">
          {isOpen && <div className="text-xs text-muted-foreground px-3 py-2">SYSTEM</div>}
          
          <MenuItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            path="/admin/settings" 
            active={isActive('/admin/settings')} 
            isOpen={isOpen}
          />
          
          <div className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-secondary/50 cursor-pointer text-red-500 mt-auto",
            !isOpen && "justify-center"
          )}>
            <LogOut size={20} />
            {isOpen && <span className="text-sm">Logout</span>}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
