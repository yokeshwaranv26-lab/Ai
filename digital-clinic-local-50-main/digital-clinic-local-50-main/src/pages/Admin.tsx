import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Users,
  Activity,
  Heart,
  AlertTriangle,
  UserCog,
  Shield,
  BarChart3,
  Bell,
  Settings,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor" | "patient";
  status: "active" | "inactive";
  lastLogin: string;
  registeredDate: string;
}

interface SystemLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: "emergency" | "donation" | "ai-chat" | "system";
}

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@clinic.com",
      role: "doctor",
      status: "active",
      lastLogin: "2024-01-20 09:30",
      registeredDate: "2023-12-15"
    },
    {
      id: "2",
      name: "John Smith",
      email: "john.smith@email.com",
      role: "patient",
      status: "active",
      lastLogin: "2024-01-19 14:22",
      registeredDate: "2024-01-10"
    },
    {
      id: "3",
      name: "Admin User",
      email: "admin@clinic.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-20 10:15",
      registeredDate: "2023-11-01"
    }
  ]);

  const [systemLogs] = useState<SystemLog[]>([
    {
      id: "1",
      action: "Emergency reported - High Priority",
      user: "John Smith",
      timestamp: "2024-01-20 10:30",
      type: "emergency"
    },
    {
      id: "2",
      action: "Blood donation scheduled",
      user: "Dr. Sarah Johnson",
      timestamp: "2024-01-20 09:45",
      type: "donation"
    },
    {
      id: "3",
      action: "AI chat session started",
      user: "John Smith",
      timestamp: "2024-01-20 09:15",
      type: "ai-chat"
    }
  ]);

  const systemStats = {
    totalUsers: 1250,
    activeUsers: 892,
    emergenciesToday: 12,
    bloodDonations: 45,
    aiConsultations: 234,
    systemUptime: "99.8%"
  };

  const handleUserAction = (action: string, userId: string) => {
    toast({
      title: "Action Completed",
      description: `${action} performed for user ${userId}`,
    });
  };

  const getLogTypeColor = (type: SystemLog["type"]) => {
    switch (type) {
      case "emergency":
        return "destructive";
      case "donation":
        return "secondary";
      case "ai-chat":
        return "default";
      case "system":
        return "outline";
      default:
        return "default";
    }
  };

  const getRoleBadgeVariant = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "doctor":
        return "default";
      case "patient":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your healthcare platform and monitor system activity
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {systemStats.activeUsers} active users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Emergencies Today</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{systemStats.emergenciesToday}</div>
                  <p className="text-xs text-muted-foreground">
                    3 high priority cases
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Donations</CardTitle>
                  <Heart className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.bloodDonations}</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Consultations</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.aiConsultations}</div>
                  <p className="text-xs text-muted-foreground">
                    This week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                  <BarChart3 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">{systemStats.systemUptime}</div>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <Bell className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">
                    Pending notifications
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
                <CardDescription>Latest actions across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant={getLogTypeColor(log.type)}>{log.type}</Badge>
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground">by {log.user}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage users, doctors, and patients</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Input placeholder="Search users..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="patient">Patient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction("View", user.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction("Edit", user.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction("Delete", user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>Monitor all system activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant={getLogTypeColor(log.type)}>{log.type}</Badge>
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground">by {log.user}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure platform settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="AI HealthConnect" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-threshold">Emergency Alert Threshold</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-model">AI Model Configuration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt4all">GPT4All Local</SelectItem>
                        <SelectItem value="llama">LLaMA Local</SelectItem>
                        <SelectItem value="mpt">MPT Local</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;