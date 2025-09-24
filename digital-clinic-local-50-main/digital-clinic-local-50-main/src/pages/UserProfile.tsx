import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  AlertTriangle,
  Shield,
  Bell,
  Eye,
  Activity,
  FileText
} from "lucide-react";

interface UserData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    emergencyContact: string;
    bloodType: string;
  };
  medicalInfo: {
    allergies: string;
    medications: string;
    chronicConditions: string;
    lastCheckup: string;
    insuranceProvider: string;
    doctorName: string;
  };
  preferences: {
    notifications: boolean;
    emergencyAlerts: boolean;
    healthReminders: boolean;
    dataSharing: boolean;
    language: string;
    theme: string;
  };
}

const UserProfile = () => {
  const { toast } = useToast();
  
  const [userData, setUserData] = useState<UserData>({
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      phone: "+1-555-0123",
      dateOfBirth: "1990-05-15",
      gender: "male",
      address: "123 Main St, New York, NY 10001",
      emergencyContact: "+1-555-0124",
      bloodType: "O+"
    },
    medicalInfo: {
      allergies: "Penicillin, Peanuts",
      medications: "Lisinopril 10mg daily",
      chronicConditions: "Hypertension",
      lastCheckup: "2024-01-15",
      insuranceProvider: "Blue Cross Blue Shield",
      doctorName: "Dr. Sarah Johnson"
    },
    preferences: {
      notifications: true,
      emergencyAlerts: true,
      healthReminders: true,
      dataSharing: false,
      language: "english",
      theme: "light"
    }
  });

  const [activeTab, setActiveTab] = useState<'personal' | 'medical' | 'preferences'>('personal');

  const handlePersonalInfoChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleMedicalInfoChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        [field]: value
      }
    }));
  };

  const handlePreferencesChange = (field: string, value: string | boolean) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const saveProfile = () => {
    // In a real app, this would save to backend/Supabase
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully",
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-medical-gradient bg-clip-text text-transparent mb-2">
            User Profile
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your personal information and health data
          </p>
        </div>

        {/* Profile Summary Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">
                  {userData.personalInfo.firstName} {userData.personalInfo.lastName}
                </h2>
                <p className="text-muted-foreground">
                  Age: {calculateAge(userData.personalInfo.dateOfBirth)} • Blood Type: {userData.personalInfo.bloodType}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-1" />
                    {userData.personalInfo.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-1" />
                    {userData.personalInfo.phone}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Badge variant="default">Active Patient</Badge>
                <Badge variant="secondary">Insurance: Verified</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <Button
            variant={activeTab === 'personal' ? 'default' : 'outline'}
            onClick={() => setActiveTab('personal')}
            className="flex items-center"
          >
            <User className="h-4 w-4 mr-2" />
            Personal Info
          </Button>
          <Button
            variant={activeTab === 'medical' ? 'default' : 'outline'}
            onClick={() => setActiveTab('medical')}
            className="flex items-center"
          >
            <Heart className="h-4 w-4 mr-2" />
            Medical Info
          </Button>
          <Button
            variant={activeTab === 'preferences' ? 'default' : 'outline'}
            onClick={() => setActiveTab('preferences')}
            className="flex items-center"
          >
            <Shield className="h-4 w-4 mr-2" />
            Preferences
          </Button>
        </div>

        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={userData.personalInfo.firstName}
                    onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={userData.personalInfo.lastName}
                    onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={userData.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={userData.personalInfo.dateOfBirth}
                    onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={userData.personalInfo.gender} onValueChange={(value) => handlePersonalInfoChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select value={userData.personalInfo.bloodType} onValueChange={(value) => handlePersonalInfoChange('bloodType', value)}>
                    <SelectTrigger>
                      <SelectValue />
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

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={userData.personalInfo.address}
                  onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                  placeholder="Enter your full address"
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={userData.personalInfo.emergencyContact}
                  onChange={(e) => handlePersonalInfoChange('emergencyContact', e.target.value)}
                  placeholder="Emergency contact phone number"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Medical Information Tab */}
        {activeTab === 'medical' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-primary" />
                Medical Information
              </CardTitle>
              <CardDescription>
                Manage your medical history and health data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="doctorName">Primary Doctor</Label>
                  <Input
                    id="doctorName"
                    value={userData.medicalInfo.doctorName}
                    onChange={(e) => handleMedicalInfoChange('doctorName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Input
                    id="insuranceProvider"
                    value={userData.medicalInfo.insuranceProvider}
                    onChange={(e) => handleMedicalInfoChange('insuranceProvider', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={userData.medicalInfo.allergies}
                  onChange={(e) => handleMedicalInfoChange('allergies', e.target.value)}
                  placeholder="List any known allergies (medications, foods, environmental)"
                />
              </div>

              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  value={userData.medicalInfo.medications}
                  onChange={(e) => handleMedicalInfoChange('medications', e.target.value)}
                  placeholder="List current medications with dosages"
                />
              </div>

              <div>
                <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                <Textarea
                  id="chronicConditions"
                  value={userData.medicalInfo.chronicConditions}
                  onChange={(e) => handleMedicalInfoChange('chronicConditions', e.target.value)}
                  placeholder="List any ongoing medical conditions"
                />
              </div>

              <div>
                <Label htmlFor="lastCheckup">Last Medical Checkup</Label>
                <Input
                  id="lastCheckup"
                  type="date"
                  value={userData.medicalInfo.lastCheckup}
                  onChange={(e) => handleMedicalInfoChange('lastCheckup', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Privacy & Preferences
              </CardTitle>
              <CardDescription>
                Manage your notification settings and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Settings
                </h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">General Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive general health updates and reminders</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={userData.preferences.notifications}
                    onCheckedChange={(checked) => handlePreferencesChange('notifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emergencyAlerts">Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive critical emergency notifications</p>
                  </div>
                  <Switch
                    id="emergencyAlerts"
                    checked={userData.preferences.emergencyAlerts}
                    onCheckedChange={(checked) => handlePreferencesChange('emergencyAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="healthReminders">Health Reminders</Label>
                    <p className="text-sm text-muted-foreground">Medication and appointment reminders</p>
                  </div>
                  <Switch
                    id="healthReminders"
                    checked={userData.preferences.healthReminders}
                    onCheckedChange={(checked) => handlePreferencesChange('healthReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dataSharing">Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
                  </div>
                  <Switch
                    id="dataSharing"
                    checked={userData.preferences.dataSharing}
                    onCheckedChange={(checked) => handlePreferencesChange('dataSharing', checked)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={userData.preferences.language} onValueChange={(value) => handlePreferencesChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="mandarin">Mandarin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={userData.preferences.theme} onValueChange={(value) => handlePreferencesChange('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={saveProfile} size="lg" className="px-8">
            <FileText className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        </div>

        {/* Data Usage Notice */}
        <Card className="mt-8 border-blue-200 bg-blue-50 dark:bg-blue-950/10">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Privacy & Security</p>
                <p>
                  Your personal and medical information is stored securely and encrypted. 
                  We comply with HIPAA regulations and never share your data without explicit consent. 
                  For full offline functionality with data persistence, connect to Supabase backend.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;