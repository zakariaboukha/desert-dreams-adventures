import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  CalendarDays,
  Settings,
  Users,
  FileText,
  Package,
  Map,
  FolderTree,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  toggle: () => void;
  className?: string;
}

// Define navigation items outside of components to be shared
const getNavigationItems = (t: (key: string) => string) => [
  {
    name: t("admin.dashboard"),
    href: "/admin",
    icon: LayoutDashboard,
    match: /^\/admin$/,
  },
  {
    name: t("admin.bookings"),
    href: "/admin/bookings",
    icon: CalendarDays,
    match: /^\/admin\/bookings/,
  },
  {
    name: t("admin.excursions"),
    href: "/admin/excursions",
    icon: Map,
    match: /^\/admin\/excursions/,
  },
  {
    name: t("admin.orders"),
    href: "/admin/orders",
    icon: Package,
    match: /^\/admin\/orders/,
  },
  {
    name: t("admin.users"),
    href: "/admin/users",
    icon: Users,
    match: /^\/admin\/users/,
  },
  {
    name: t("admin.reports"),
    href: "/admin/reports",
    icon: FileText,
    match: /^\/admin\/reports/,
  },
  {
    name: t("admin.settings"),
    href: "/admin/settings",
    icon: Settings,
    match: /^\/admin\/settings/,
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen,
  toggle,
  className,
}) => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigation = getNavigationItems(t);

  return (
    <nav
      className={cn(
        "fixed top-0 bottom-0 z-40 flex-col border-r bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-[70px]",
        "md:flex hidden", // Hide on mobile, show on desktop
        className,
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            isOpen ? "w-40 opacity-100" : "w-0 opacity-0",
          )}
        >
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="h-8 w-8"
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-2">
        <div className="space-y-1 px-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.match.test(location.pathname);
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg py-2 text-sm transition-all hover:bg-accent",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                  isOpen ? "px-3 gap-3" : "justify-center px-2",
                )}
              >
                <Icon className="h-4 w-4" />
                <span
                  className={cn(
                    "transition-all duration-300",
                    isOpen ? "opacity-100" : "w-0 opacity-0",
                  )}
                >
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </ScrollArea>
    </nav>
  );
};

// Mobile Sidebar Component
export const MobileAdminSidebar: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigation = getNavigationItems(t);

  return (
    <ScrollArea className={cn("h-full py-2", className)}>
      <div className="space-y-1 px-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = item.match.test(location.pathname);
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default AdminSidebar;
