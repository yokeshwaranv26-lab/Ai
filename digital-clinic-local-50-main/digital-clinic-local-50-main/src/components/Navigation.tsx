import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Menu, MessageSquare, Activity, Users, Droplets, HeartHandshake, Shield, Video, BarChart3, Eye, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/ai-chat", label: "AI Health Chat", icon: MessageSquare },
    { path: "/disease-prediction", label: "Disease Prediction", icon: Activity },
    { path: "/emergency", label: "Emergency", icon: Shield },
    { path: "/blood-donation", label: "Blood Donation", icon: Droplets },
    { path: "/organ-donation", label: "Organ Donation", icon: HeartHandshake },
    { path: "/vision-care", label: "Vision Care", icon: Eye },
    { path: "/user-profile", label: "Profile", icon: User },
    { path: "/video-call", label: "Video Call", icon: Video },
    { path: "/admin", label: "Admin Panel", icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-medical-gradient bg-clip-text text-transparent">
                AI HealthConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold">AI HealthConnect</span>
                  </div>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant={isActive(item.path) ? "default" : "ghost"}
                          className="w-full justify-start space-x-2"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;