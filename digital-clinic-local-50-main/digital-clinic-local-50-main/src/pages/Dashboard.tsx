import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Activity, Shield, Droplets, HeartHandshake, Video, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/healthcare-hero.jpg";

const Dashboard = () => {
  const stats = [
    { title: "Active Patients", value: "1,247", change: "+12%", icon: Users },
    { title: "Emergency Cases", value: "23", change: "-8%", icon: Shield },
    { title: "Blood Donors", value: "89", change: "+24%", icon: Droplets },
    { title: "AI Consultations", value: "456", change: "+45%", icon: MessageSquare },
  ];

  const quickActions = [
    {
      title: "AI Health Chat",
      description: "Get instant medical advice from AI",
      icon: MessageSquare,
      path: "/ai-chat",
      gradient: "bg-medical-gradient",
    },
    {
      title: "Disease Prediction",
      description: "Analyze symptoms with AI",
      icon: Activity,
      path: "/disease-prediction",
      gradient: "bg-success-gradient",
    },
    {
      title: "Emergency Alert",
      description: "Report medical emergency",
      icon: Shield,
      path: "/emergency",
      gradient: "bg-emergency-gradient",
    },
    {
      title: "Video Consultation",
      description: "Connect with doctors",
      icon: Video,
      path: "/video-call",
      gradient: "bg-medical-gradient",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-medical-gradient">
        <div className="absolute inset-0 bg-black/20" />
        <img
          src={heroImage}
          alt="Healthcare professionals"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              AI HealthConnect
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Revolutionizing healthcare with AI-powered diagnostics, real-time emergency response, and connected care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-chat">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                  Start AI Chat
                </Button>
              </Link>
              <Link to="/emergency">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Emergency Alert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-medical transition-all duration-300 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className={`text-sm flex items-center ${
                        stat.change.startsWith('+') ? 'text-success' : 'text-destructive'
                      }`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {stat.change} from last month
                      </p>
                    </div>
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.path}>
                  <Card className="hover:shadow-glow transition-all duration-300 cursor-pointer group border-0 shadow-sm">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 mx-auto rounded-full ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {action.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {action.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-medical border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="h-6 w-6 text-destructive" />
                <span>Blood Donation Network</span>
              </CardTitle>
              <CardDescription>
                Connect blood donors with patients in need through our AI-powered matching system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available Donors</span>
                  <span className="font-semibold">89 active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Emergency Requests</span>
                  <span className="font-semibold text-destructive">3 pending</span>
                </div>
                <Link to="/blood-donation">
                  <Button className="w-full">Manage Donations</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medical border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HeartHandshake className="h-6 w-6 text-accent" />
                <span>Organ Donation Registry</span>
              </CardTitle>
              <CardDescription>
                Life-saving organ matching powered by advanced AI algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Registered Donors</span>
                  <span className="font-semibold">156 active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Successful Matches</span>
                  <span className="font-semibold text-success">12 this month</span>
                </div>
                <Link to="/organ-donation">
                  <Button className="w-full" variant="outline">View Registry</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;