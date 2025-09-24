import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Phone, MapPin, Clock, User, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmergencyCase {
  id: string;
  patientName: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  description: string;
  timestamp: Date;
  status: 'pending' | 'responding' | 'resolved';
}

const Emergency = () => {
  const [emergencyCases, setEmergencyCases] = useState<EmergencyCase[]>([
    {
      id: '1',
      patientName: 'John Doe',
      location: '123 Main St, Downtown',
      urgency: 'high',
      description: 'Patient experiencing severe chest pain and difficulty breathing',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      status: 'responding'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      location: '456 Oak Ave, Suburbs',
      urgency: 'medium',
      description: 'Fall injury with suspected sprained ankle',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'pending'
    }
  ]);

  const [newEmergency, setNewEmergency] = useState({
    patientName: '',
    location: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    description: ''
  });

  const { toast } = useToast();

  const handleEmergencySubmit = () => {
    if (!newEmergency.patientName || !newEmergency.location || !newEmergency.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const emergency: EmergencyCase = {
      id: Date.now().toString(),
      ...newEmergency,
      timestamp: new Date(),
      status: 'pending'
    };

    setEmergencyCases(prev => [emergency, ...prev]);
    setNewEmergency({
      patientName: '',
      location: '',
      urgency: 'medium',
      description: ''
    });

    toast({
      title: "Emergency Reported",
      description: `${emergency.urgency.toUpperCase()} priority emergency has been logged and responders notified.`,
      variant: emergency.urgency === 'high' ? "destructive" : "default",
    });

    // Simulate emergency response notification
    if (emergency.urgency === 'high') {
      setTimeout(() => {
        toast({
          title: "Emergency Response Dispatched",
          description: "Emergency services are en route to the location.",
        });
      }, 2000);
    }
  };

  const updateEmergencyStatus = (id: string, status: 'pending' | 'responding' | 'resolved') => {
    setEmergencyCases(prev => 
      prev.map(emergency => 
        emergency.id === id ? { ...emergency, status } : emergency
      )
    );

    toast({
      title: "Status Updated",
      description: `Emergency case status changed to ${status}.`,
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'responding': return 'default';
      case 'resolved': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-emergency-gradient bg-clip-text text-transparent mb-2">
            Emergency Management System
          </h1>
          <p className="text-muted-foreground">
            Real-time emergency response and case management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Emergency */}
          <Card className="shadow-emergency border-0">
            <CardHeader className="bg-emergency-gradient text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Report Emergency</span>
              </CardTitle>
              <CardDescription className="text-white/90">
                Submit a new emergency case for immediate response
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  value={newEmergency.patientName}
                  onChange={(e) => setNewEmergency(prev => ({ ...prev, patientName: e.target.value }))}
                  placeholder="Enter patient's full name"
                />
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newEmergency.location}
                  onChange={(e) => setNewEmergency(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter exact location or address"
                />
              </div>

              <div>
                <Label htmlFor="urgency">Emergency Level *</Label>
                <Select value={newEmergency.urgency} onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setNewEmergency(prev => ({ ...prev, urgency: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Non-life threatening</SelectItem>
                    <SelectItem value="medium">Medium - Urgent care needed</SelectItem>
                    <SelectItem value="high">High - Life threatening</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newEmergency.description}
                  onChange={(e) => setNewEmergency(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the emergency situation in detail..."
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleEmergencySubmit}
                className="w-full bg-emergency-gradient hover:shadow-emergency"
                size="lg"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Report Emergency
              </Button>
            </CardContent>
          </Card>

          {/* Emergency Cases */}
          <Card className="shadow-medical border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-primary" />
                <span>Active Emergency Cases</span>
              </CardTitle>
              <CardDescription>
                Monitor and manage ongoing emergency responses
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {emergencyCases.map((emergency) => (
                  <Card key={emergency.id} className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{emergency.patientName}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant={getUrgencyColor(emergency.urgency)}>
                            {emergency.urgency.toUpperCase()}
                          </Badge>
                          <Badge variant={getStatusColor(emergency.status)}>
                            {emergency.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{emergency.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{emergency.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>

                      <p className="text-sm mb-4">{emergency.description}</p>

                      <div className="flex space-x-2">
                        {emergency.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => updateEmergencyStatus(emergency.id, 'responding')}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Dispatch
                          </Button>
                        )}
                        {emergency.status === 'responding' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateEmergencyStatus(emergency.id, 'resolved')}
                          >
                            Mark Resolved
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {emergencyCases.length === 0 && (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold text-muted-foreground">No Active Emergencies</p>
                    <p className="text-muted-foreground">All emergency cases have been resolved</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-destructive mb-2">
                {emergencyCases.filter(e => e.urgency === 'high').length}
              </div>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-warning mb-2">
                {emergencyCases.filter(e => e.urgency === 'medium').length}
              </div>
              <p className="text-sm text-muted-foreground">Medium Priority</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success mb-2">
                {emergencyCases.filter(e => e.status === 'resolved').length}
              </div>
              <p className="text-sm text-muted-foreground">Resolved Cases</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                {emergencyCases.filter(e => e.status === 'responding').length}
              </div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Emergency;