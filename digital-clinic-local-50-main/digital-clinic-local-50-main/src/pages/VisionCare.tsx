import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Eye, 
  Activity, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Target,
  TrendingUp,
  Clock,
  Lightbulb,
  Shield
} from "lucide-react";

interface VisionTest {
  id: string;
  type: 'acuity' | 'color' | 'contrast' | 'field';
  name: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  score?: number;
  date?: Date;
}

interface EyeHealthRecord {
  id: string;
  date: Date;
  leftEye: {
    acuity: string;
    pressure: number;
    health: 'excellent' | 'good' | 'fair' | 'poor';
  };
  rightEye: {
    acuity: string;
    pressure: number;
    health: 'excellent' | 'good' | 'fair' | 'poor';
  };
  notes: string;
  doctorName: string;
}

const VisionCare = () => {
  const { toast } = useToast();
  
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [testProgress, setTestProgress] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  
  const [visionTests] = useState<VisionTest[]>([
    {
      id: "1",
      type: "acuity",
      name: "Visual Acuity Test",
      description: "Test your ability to see letters and numbers at different sizes",
      duration: "5 min",
      difficulty: "easy",
      completed: true,
      score: 85,
      date: new Date("2024-01-20")
    },
    {
      id: "2",
      type: "color",
      name: "Color Vision Test",
      description: "Detect color blindness with Ishihara color plates",
      duration: "3 min",
      difficulty: "medium",
      completed: true,
      score: 92,
      date: new Date("2024-01-20")
    },
    {
      id: "3",
      type: "contrast",
      name: "Contrast Sensitivity",
      description: "Measure your ability to distinguish between light and dark",
      duration: "4 min",
      difficulty: "medium",
      completed: false
    },
    {
      id: "4",
      type: "field",
      name: "Visual Field Test",
      description: "Check your peripheral vision and blind spots",
      duration: "8 min",
      difficulty: "hard",
      completed: false
    }
  ]);

  const [eyeHealthRecords] = useState<EyeHealthRecord[]>([
    {
      id: "1",
      date: new Date("2024-01-15"),
      leftEye: { acuity: "20/20", pressure: 14, health: "excellent" },
      rightEye: { acuity: "20/25", pressure: 16, health: "good" },
      notes: "Regular checkup, slight myopia in right eye",
      doctorName: "Dr. Sarah Kim"
    },
    {
      id: "2",
      date: new Date("2023-07-10"),
      leftEye: { acuity: "20/20", pressure: 13, health: "excellent" },
      rightEye: { acuity: "20/20", pressure: 15, health: "excellent" },
      notes: "Perfect vision, continue regular monitoring",
      doctorName: "Dr. Sarah Kim"
    }
  ]);

  const [dailyTips] = useState([
    "Take breaks every 20 minutes when using screens (20-20-20 rule)",
    "Ensure proper lighting when reading or working",
    "Wear sunglasses with UV protection outdoors",
    "Maintain a healthy diet rich in vitamins A, C, and E",
    "Stay hydrated to keep your eyes moist",
    "Get regular eye exams every 1-2 years"
  ]);

  const startTest = (testId: string) => {
    const test = visionTests.find(t => t.id === testId);
    if (!test) return;

    setCurrentTest(testId);
    setTestStarted(true);
    setTestProgress(0);

    // Simulate test progress
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeTest(testId);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    toast({
      title: "Test Started",
      description: `Starting ${test.name}`,
    });
  };

  const completeTest = (testId: string) => {
    const mockScore = Math.floor(Math.random() * 30) + 70; // Random score 70-100
    
    setTestStarted(false);
    setCurrentTest(null);
    setTestProgress(0);

    toast({
      title: "Test Completed",
      description: `Your score: ${mockScore}%. Results saved to your profile.`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "default";
      case "medium": return "warning";
      case "hard": return "destructive";
      default: return "secondary";
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent": return "default";
      case "good": return "secondary";
      case "fair": return "warning";
      case "poor": return "destructive";
      default: return "secondary";
    }
  };

  const getTestIcon = (type: string) => {
    switch (type) {
      case "acuity": return <Eye className="h-4 w-4" />;
      case "color": return <Target className="h-4 w-4" />;
      case "contrast": return <Activity className="h-4 w-4" />;
      case "field": return <Shield className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const completedTests = visionTests.filter(t => t.completed).length;
  const averageScore = visionTests
    .filter(t => t.completed && t.score)
    .reduce((acc, t) => acc + (t.score || 0), 0) / 
    visionTests.filter(t => t.completed && t.score).length;

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-medical-gradient bg-clip-text text-transparent mb-2">
            Vision Care Center
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive eye health monitoring and vision testing
          </p>
        </div>

        {/* Vision Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Eye className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-2xl font-bold">{completedTests}/{visionTests.length}</p>
                <p className="text-sm text-muted-foreground">Tests Completed</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">{averageScore.toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Calendar className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Days Since Last Checkup</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Shield className="h-8 w-8 text-purple-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">Good</p>
                <p className="text-sm text-muted-foreground">Overall Eye Health</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                Vision Tests
              </CardTitle>
              <CardDescription>
                Take various vision tests to monitor your eye health
              </CardDescription>
            </CardHeader>
            <CardContent>
              {testStarted && currentTest ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      {visionTests.find(t => t.id === currentTest)?.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Test in progress...
                    </p>
                    <Progress value={testProgress} className="w-full mb-4" />
                    <p className="text-sm text-muted-foreground">
                      {testProgress}% Complete
                    </p>
                  </div>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {visionTests.map((test) => (
                      <div key={test.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            {getTestIcon(test.type)}
                            <h4 className="font-semibold ml-2">{test.name}</h4>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant={getDifficultyColor(test.difficulty)}>
                              {test.difficulty}
                            </Badge>
                            {test.completed && (
                              <Badge variant="default">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {test.score}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {test.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {test.duration}
                          </div>
                          <Button
                            onClick={() => startTest(test.id)}
                            variant={test.completed ? "outline" : "default"}
                            size="sm"
                          >
                            {test.completed ? "Retake" : "Start"} Test
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* Eye Health Records */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Eye Health Records
              </CardTitle>
              <CardDescription>
                Track your professional eye examinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {eyeHealthRecords.map((record) => (
                    <div key={record.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{record.doctorName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {record.date.toLocaleDateString()}
                          </p>
                        </div>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="text-sm">
                          <p className="font-medium">Left Eye</p>
                          <p>Acuity: {record.leftEye.acuity}</p>
                          <p>Pressure: {record.leftEye.pressure} mmHg</p>
                          <Badge variant={getHealthColor(record.leftEye.health)} className="text-xs mt-1">
                            {record.leftEye.health}
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Right Eye</p>
                          <p>Acuity: {record.rightEye.acuity}</p>
                          <p>Pressure: {record.rightEye.pressure} mmHg</p>
                          <Badge variant={getHealthColor(record.rightEye.health)} className="text-xs mt-1">
                            {record.rightEye.health}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        <strong>Notes:</strong> {record.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Daily Eye Care Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-primary" />
              Daily Eye Care Tips
            </CardTitle>
            <CardDescription>
              Simple practices to maintain healthy vision
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dailyTips.map((tip, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Appointment */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Schedule Eye Examination
            </CardTitle>
            <CardDescription>
              Book your next professional eye exam
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input id="preferredDate" type="date" />
              </div>
              <div>
                <Label htmlFor="timeSlot">Time Slot</Label>
                <Input id="timeSlot" type="time" />
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/10">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <p className="font-semibold mb-1">Important Vision Care Disclaimer</p>
                <p>
                  These vision tests are for educational purposes only and should not replace 
                  professional eye examinations. Regular checkups with a qualified optometrist 
                  or ophthalmologist are essential for maintaining optimal eye health. 
                  If you experience vision problems, consult a healthcare professional immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisionCare;