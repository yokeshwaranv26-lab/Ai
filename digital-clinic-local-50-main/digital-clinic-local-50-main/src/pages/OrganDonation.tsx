import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Heart, Users, Clock, AlertTriangle, Phone, MapPin, Calendar } from "lucide-react";

interface OrganDonor {
  id: string;
  name: string;
  age: number;
  organType: string;
  bloodType: string;
  phone: string;
  location: string;
  registrationDate: Date;
  available: boolean;
  medicalHistory: string;
  compatibility?: number;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  organNeeded: string;
  bloodType: string;
  urgency: 'low' | 'medium' | 'high';
  timeOnWaitlist: number; // in months
}

const OrganDonation = () => {
  const { toast } = useToast();
  
  const [donors, setDonors] = useState<OrganDonor[]>([
    {
      id: "1",
      name: "John Smith",
      age: 35,
      organType: "kidney",
      bloodType: "O+",
      phone: "+1-555-0123",
      location: "New York, NY",
      registrationDate: new Date("2024-01-15"),
      available: true,
      medicalHistory: "No significant medical history",
      compatibility: 95
    },
    {
      id: "2",
      name: "Sarah Johnson",
      age: 28,
      organType: "liver",
      bloodType: "A+",
      phone: "+1-555-0124",
      location: "Los Angeles, CA",
      registrationDate: new Date("2024-02-20"),
      available: true,
      medicalHistory: "Excellent health, regular checkups",
      compatibility: 87
    }
  ]);

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "Michael Davis",
      age: 45,
      organNeeded: "kidney",
      bloodType: "O+",
      urgency: "high",
      timeOnWaitlist: 18
    },
    {
      id: "2",
      name: "Emily Wilson",
      age: 32,
      organNeeded: "liver",
      bloodType: "A+",
      urgency: "medium",
      timeOnWaitlist: 6
    }
  ]);

  const [newDonor, setNewDonor] = useState({
    name: "",
    age: "",
    organType: "",
    bloodType: "",
    phone: "",
    location: "",
    medicalHistory: ""
  });

  const [searchOrgan, setSearchOrgan] = useState("");

  const handleAddDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonor.name || !newDonor.age || !newDonor.organType || !newDonor.bloodType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const donor: OrganDonor = {
      id: Date.now().toString(),
      name: newDonor.name,
      age: parseInt(newDonor.age),
      organType: newDonor.organType,
      bloodType: newDonor.bloodType,
      phone: newDonor.phone,
      location: newDonor.location,
      registrationDate: new Date(),
      available: true,
      medicalHistory: newDonor.medicalHistory || "No information provided"
    };

    setDonors([...donors, donor]);
    setNewDonor({
      name: "",
      age: "",
      organType: "",
      bloodType: "",
      phone: "",
      location: "",
      medicalHistory: ""
    });

    toast({
      title: "Success",
      description: "Donor registered successfully",
    });
  };

  const findMatches = (patient: Patient) => {
    const matches = donors.filter(donor => 
      donor.organType === patient.organNeeded &&
      donor.bloodType === patient.bloodType &&
      donor.available
    );
    
    if (matches.length > 0) {
      toast({
        title: "Matches Found!",
        description: `Found ${matches.length} compatible donor(s) for ${patient.name}`,
      });
    } else {
      toast({
        title: "No Matches",
        description: `No compatible donors found for ${patient.name}`,
        variant: "destructive",
      });
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const filteredDonors = searchOrgan 
    ? donors.filter(donor => 
        donor.organType.toLowerCase().includes(searchOrgan.toLowerCase()) ||
        donor.bloodType.toLowerCase().includes(searchOrgan.toLowerCase())
      )
    : donors;

  const stats = {
    totalDonors: donors.length,
    availableDonors: donors.filter(d => d.available).length,
    waitingPatients: patients.length,
    urgentCases: patients.filter(p => p.urgency === "high").length
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-medical-gradient bg-clip-text text-transparent mb-2">
            Organ Donation Network
          </h1>
          <p className="text-muted-foreground text-lg">
            Connecting donors with patients to save lives
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-2xl font-bold">{stats.totalDonors}</p>
                <p className="text-sm text-muted-foreground">Total Donors</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Heart className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">{stats.availableDonors}</p>
                <p className="text-sm text-muted-foreground">Available Donors</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Clock className="h-8 w-8 text-yellow-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">{stats.waitingPatients}</p>
                <p className="text-sm text-muted-foreground">Waiting Patients</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <AlertTriangle className="h-8 w-8 text-red-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">{stats.urgentCases}</p>
                <p className="text-sm text-muted-foreground">Urgent Cases</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Register New Donor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-primary" />
                Register New Donor
              </CardTitle>
              <CardDescription>
                Register as an organ donor to help save lives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddDonor} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newDonor.name}
                      onChange={(e) => setNewDonor({...newDonor, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={newDonor.age}
                      onChange={(e) => setNewDonor({...newDonor, age: e.target.value})}
                      placeholder="Enter age"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organType">Organ Type *</Label>
                    <Select value={newDonor.organType} onValueChange={(value) => setNewDonor({...newDonor, organType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kidney">Kidney</SelectItem>
                        <SelectItem value="liver">Liver</SelectItem>
                        <SelectItem value="heart">Heart</SelectItem>
                        <SelectItem value="lung">Lung</SelectItem>
                        <SelectItem value="pancreas">Pancreas</SelectItem>
                        <SelectItem value="cornea">Cornea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bloodType">Blood Type *</Label>
                    <Select value={newDonor.bloodType} onValueChange={(value) => setNewDonor({...newDonor, bloodType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newDonor.phone}
                      onChange={(e) => setNewDonor({...newDonor, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newDonor.location}
                      onChange={(e) => setNewDonor({...newDonor, location: e.target.value})}
                      placeholder="Enter location"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  <Input
                    id="medicalHistory"
                    value={newDonor.medicalHistory}
                    onChange={(e) => setNewDonor({...newDonor, medicalHistory: e.target.value})}
                    placeholder="Enter relevant medical history"
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Register Donor
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Waiting Patients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Patients Waiting for Organs
              </CardTitle>
              <CardDescription>
                Patients currently on the transplant waiting list
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{patient.name}</h4>
                          <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                        </div>
                        <Badge variant={getUrgencyColor(patient.urgency)}>
                          {patient.urgency} priority
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <p><strong>Organ needed:</strong> {patient.organNeeded}</p>
                        <p><strong>Blood type:</strong> {patient.bloodType}</p>
                        <p><strong>On waitlist:</strong> {patient.timeOnWaitlist} months</p>
                      </div>
                      
                      <Button 
                        onClick={() => findMatches(patient)}
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        Find Matches
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Donor Search and List */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-primary" />
              Registered Donors
            </CardTitle>
            <CardDescription>
              Search and view all registered organ donors
            </CardDescription>
            <div className="flex gap-4">
              <Input
                placeholder="Search by organ type or blood type..."
                value={searchOrgan}
                onChange={(e) => setSearchOrgan(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDonors.map((donor) => (
                  <div key={donor.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{donor.name}</h4>
                        <p className="text-sm text-muted-foreground">Age: {donor.age}</p>
                      </div>
                      <Badge variant={donor.available ? "default" : "secondary"}>
                        {donor.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-3">
                      <p><strong>Organ:</strong> {donor.organType}</p>
                      <p><strong>Blood type:</strong> {donor.bloodType}</p>
                      {donor.compatibility && (
                        <p><strong>Compatibility:</strong> {donor.compatibility}%</p>
                      )}
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{donor.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Registered: {donor.registrationDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {donor.available && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={() => toast({
                          title: "Contact Initiated",
                          description: `Contacting ${donor.name} for organ donation process`,
                        })}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Contact Donor
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              {filteredDonors.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No donors found matching your search criteria.
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/10">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <p className="font-semibold mb-1">Important Medical Disclaimer</p>
                <p>
                  This organ donation matching system is for demonstration purposes only. 
                  All actual organ donations must go through official medical institutions, 
                  certified transplant centers, and proper medical evaluation processes. 
                  Please consult with medical professionals for real organ donation procedures.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganDonation;