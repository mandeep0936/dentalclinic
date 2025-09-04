import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  FileText,
  Settings,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
  doctorName?: string;
  doctorSpecialty?: string;
  doctorImage?: string;
}

const Sidebar = ({
  className,
  doctorName = "Dr. Sarah Johnson",
  doctorSpecialty = "Orthodontist",
  doctorImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1",
}: SidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/doctor/dashboard",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Appointments",
      href: "/doctor/appointments",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Time Slots",
      href: "/doctor/slots",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Blog Posts",
      href: "/doctor/blog",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Testimonials",
      href: "/doctor/testimonials",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/doctor/profile",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("doctorName");
    window.location.href = "/login";
  };

  return (
    <motion.aside
      initial={{ width: collapsed ? 80 : 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "h-screen bg-gradient-to-b from-blue-50 to-white border-r border-blue-200 flex flex-col justify-between shadow-lg",
        className,
      )}
    >
      <div className="flex flex-col">
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">DC</span>
              </div>
              <span className="font-semibold text-lg">DentalCare</span>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-gray-700"
          >
            {collapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </Button>
        </div>

        <Separator />

        {/* Doctor Profile */}
        <div
          className={cn(
            "p-4 flex",
            collapsed ? "justify-center" : "items-center gap-3",
          )}
        >
          <Avatar className="h-10 w-10 border-2 border-blue-600 shadow-md">
            <AvatarImage src={doctorImage} alt={doctorName} />
            <AvatarFallback className="bg-blue-600 text-white">
              {doctorName
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <span className="font-medium text-sm">{doctorName}</span>
              <span className="text-xs text-muted-foreground">
                {doctorSpecialty}
              </span>
            </motion.div>
          )}
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <li key={item.href}>
                  <Link to={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 mb-1",
                        collapsed && "justify-center px-2",
                      )}
                    >
                      {item.icon}
                      {!collapsed && <span>{item.label}</span>}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 mt-auto">
        <Button
          variant="outline"
          onClick={handleLogout}
          className={cn(
            "w-full border-dashed border-gray-300 text-gray-500 hover:text-gray-700 gap-2",
            collapsed && "justify-center px-2",
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
