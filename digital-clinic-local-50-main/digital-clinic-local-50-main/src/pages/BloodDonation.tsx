import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplets, User, Phone, MapPin, Calendar, Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BloodDonor {
  id: string;
  name: string;
  bloodType: string;
  phone: string;
  location: string;
  lastDonation: Date;
  available: boolean;
  emergencyContact: boolean;
}

const BloodDonation = () => {
  const [donors, setDonors] = useState<BloodDonor[]>([
    {
      id: '1',
      name: 'John Smith',
      bloodType: 'O+',
      phone: '+1-555-0101',
      location: 'Downtown Medical Center',
      lastDonation: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      available: true,
      emergencyContact: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      bloodType: 'A-',
      phone: '+1-555-0102',
      location: 'Westside Clinic',
      lastDonation: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      available: true,
      emergencyContact: false
    },
    {
      id: '3',
      name: 'Michael Davis',
      bloodType: 'B+',
      phone: '+1-555-0103',
      location: 'City General Hospital',
      lastDonation: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      available: false,
      emergencyContact: true
    }
  ]);

  const [newDonor, setNewDonor] = useState({
    name: '',
    bloodType: '',
    phone: '',
    location: '',
    emergencyContact: false
  });

  const [searchBloodType, setSearchBloodType] = useState('');
  const { toast } = useToast();

  const handleAddDonor = () => {
    if (!newDonor.name || !newDonor.bloodType || !newDonor.phone || !newDonor.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const donor: BloodDonor = {
      id: Date.now().toString(),
      ...newDonor,
      lastDonation: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      available: true
    };

    setDonors(prev => [donor, ...prev]);
    setNewDonor({
      name: '',
      bloodType: '',
      phone: '',
      location: '',
      emergencyContact: false
    });

    toast({
      title: "Donor Added",
      description: `${donor.name} has been successfully registered as a blood donor.`,
    });
  };

  const contactDonor = (donor: BloodDonor) => {
    toast({
      title: "Contacting Donor",
      description: `Calling ${donor.name} at ${donor.phone}...`,
    });
    
    // Simulate successful contact
    setTimeout(() => {
      toast({
        title: "Donor Contacted",
        description: `${donor.name} has confirmed availability for donation.`,
      });
    }, 2000);
  };

  const emergencyAlert = () => {
    const emergencyDonors = donors.filter(d => d.emergencyContact && d.available);
    
    toast({
      title: "Emergency Alert Sent",
      description: `Notified ${emergencyDonors.length} emergency contact donors about urgent blood need.`,
      variant: "destructive",
    });
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const filteredDonors = searchBloodType && searchBloodType !== 'all'
    ? donors.filter(donor => donor.bloodType === searchBloodType)
    : donors;

  const getAvailabilityColor = (available: boolean) => available ? 'success' : 'secondary';
  const getDaysSinceLastDonation = (lastDonation: Date) => {
    return Math.floor((Date.now() - lastDonation.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-emergency-gradient bg-clip-text text-transparent mb-2">
            Blood Donation Network
          </h1>
          <p className="text-muted-foreground">
            Connecting donors with patients in need through AI-powered matching
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <Droplets className="h-8 w-8 mx-auto text-destructive mb-2" />
              <div className="text-2xl font-bold text-destructive">
                {donors.filter(d => d.available).length}
              </div>
              <p className="text-sm text-muted-foreground">Available Donors</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">{donors.length}</div>
              <p className="text-sm text-muted-foreground">Total Registered</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 mx-auto text-warning mb-2" />
              <div className="text-2xl font-bold text-warning">
                {donors.filter(d => d.emergencyContact).length}
              </div>
              <p className="text-sm text-muted-foreground">Emergency Contacts</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto text-success mb-2" />
              <div className="text-2xl font-bold text-success">12</div>
              <p className="text-sm text-muted-foreground">Donations This Month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Donor */}
          <Card className="shadow-medical border-0">
            <CardHeader className="bg-medical-gradient text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-6 w-6" />
                <span>Register New Donor</span>
              </CardTitle>
              <CardDescription className="text-white/90">
                Add a new blood donor to the network
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="donorName">Full Name *</Label>
                <Input
                  id="donorName"
                  value={newDonor.name}
                  onChange={(e) => setNewDonor(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter donor's full name"
                />
              </div>

              <div>
                <Label htmlFor="bloodType">Blood Type *</Label>
                <Select value={newDonor.bloodType} onValueChange={(value) => 
                  setNewDonor(prev => ({ ...prev, bloodType: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="donorPhone">Phone Number *</Label>
                <Input
                  id="donorPhone"
                  value={newDonor.phone}
                  onChange={(e) => setNewDonor(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1-555-0123"
                />
              </div>

              <div>
                <Label htmlFor="donorLocation">Preferred Location *</Label>
                <Input
                  id="donorLocation"
                  value={newDonor.location}
                  onChange={(e) => setNewDonor(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Hospital or clinic name"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="emergencyContact"
                  checked={newDonor.emergencyContact}
                  onChange={(e) => setNewDonor(prev => ({ ...prev, emergencyContact: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="emergencyContact" className="text-sm">
                  Available for emergency alerts
                </Label>
              </div>

              <Button 
                onClick={handleAddDonor}
                className="w-full bg-medical-gradient hover:shadow-glow"
              >
                <Plus className="h-4 w-4 mr-2" />
                Register Donor
              </Button>
            </CardContent>
          </Card>

          {/* Donor Search & Emergency */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-medical border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-6 w-6 text-primary" />
                  <span>Find Donors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <Select value={searchBloodType} onValueChange={setSearchBloodType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Blood Types</SelectItem>
                        {bloodTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={emergencyAlert}
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                  >
                    Emergency Alert
                  </Button>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {filteredDonors.map((donor) => (
                    <Card key={donor.id} className="border shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-emergency-gradient rounded-full flex items-center justify-center">
                              <Droplets className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{donor.name}</h4>
                              <p className="text-sm text-muted-foreground">{donor.phone}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant="outline" className="font-bold text-destructive border-destructive">
                              {donor.bloodType}
                            </Badge>
                            <Badge variant={getAvailabilityColor(donor.available)}>
                              {donor.available ? 'Available' : 'Unavailable'}
                            </Badge>
                            {donor.emergencyContact && (
                              <Badge variant="warning">Emergency</Badge>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{donor.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Last donation: {getDaysSinceLastDonation(donor.lastDonation)} days ago</span>
                          </div>
                        </div>

                        {donor.available && (
                          <Button
                            size="sm"
                            onClick={() => contactDonor(donor)}
                            className="bg-success-gradient hover:bg-success/90"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Donor
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {filteredDonors.length === 0 && (
                    <div className="text-center py-8">
                      <Droplets className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-semibold text-muted-foreground">No Donors Found</p>
                      <p className="text-muted-foreground">
                        {searchBloodType 
                          ? `No available donors with blood type ${searchBloodType}`
                          : 'Register new donors to build the network'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonation;