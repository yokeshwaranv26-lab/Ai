import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Symptom {
  id: string;
  name: string;
  category: string;
}

interface Prediction {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

const DiseasePrediction = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const { toast } = useToast();

  const symptoms: Symptom[] = [
    { id: '1', name: 'Fever', category: 'General' },
    { id: '2', name: 'Headache', category: 'Neurological' },
    { id: '3', name: 'Cough', category: 'Respiratory' },
    { id: '4', name: 'Sore Throat', category: 'Respiratory' },
    { id: '5', name: 'Nausea', category: 'Gastrointestinal' },
    { id: '6', name: 'Vomiting', category: 'Gastrointestinal' },
    { id: '7', name: 'Chest Pain', category: 'Cardiovascular' },
    { id: '8', name: 'Shortness of Breath', category: 'Respiratory' },
    { id: '9', name: 'Dizziness', category: 'Neurological' },
    { id: '10', name: 'Fatigue', category: 'General' },
    { id: '11', name: 'Joint Pain', category: 'Musculoskeletal' },
    { id: '12', name: 'Rash', category: 'Dermatological' },
  ];

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms(prev => [...prev, symptomId]);
    } else {
      setSelectedSymptoms(prev => prev.filter(id => id !== symptomId));
    }
  };

  const analyzePredictions = async () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockPredictions = generateMockPredictions(selectedSymptoms);
      setPredictions(mockPredictions);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Found ${mockPredictions.length} potential conditions based on your symptoms.`,
      });
    }, 3000);
  };

  const generateMockPredictions = (symptoms: string[]): Prediction[] => {
    const selectedSymptomNames = symptoms.map(id => 
      symptoms.find(s => s === id) ? symptoms.find(s => s === id) : ''
    );

    // Mock AI predictions based on symptoms
    const predictions: Prediction[] = [];

    if (symptoms.includes('1') && symptoms.includes('2')) { // Fever + Headache
      predictions.push({
        disease: 'Viral Infection (Common Cold/Flu)',
        confidence: 85,
        severity: 'low',
        description: 'Common viral infection affecting the upper respiratory system.',
        recommendations: ['Rest and hydration', 'Over-the-counter fever reducers', 'Monitor symptoms']
      });
    }

    if (symptoms.includes('7') || symptoms.includes('8')) { // Chest pain or shortness of breath
      predictions.push({
        disease: 'Cardiovascular Concern',
        confidence: 75,
        severity: 'high',
        description: 'Potential heart or lung related condition requiring immediate attention.',
        recommendations: ['Seek immediate medical care', 'Avoid physical exertion', 'Monitor vital signs']
      });
    }

    if (symptoms.includes('5') && symptoms.includes('6')) { // Nausea + Vomiting
      predictions.push({
        disease: 'Gastroenteritis',
        confidence: 70,
        severity: 'medium',
        description: 'Inflammation of the stomach and intestines, often caused by viral or bacterial infection.',
        recommendations: ['Stay hydrated', 'BRAT diet', 'Consult doctor if symptoms persist']
      });
    }

    if (predictions.length === 0) {
      predictions.push({
        disease: 'General Health Assessment Needed',
        confidence: 60,
        severity: 'low',
        description: 'Symptoms require professional medical evaluation for accurate diagnosis.',
        recommendations: ['Schedule appointment with healthcare provider', 'Monitor symptoms', 'Maintain healthy lifestyle']
      });
    }

    return predictions;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <TrendingUp className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const groupedSymptoms = symptoms.reduce((groups, symptom) => {
    const category = symptom.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(symptom);
    return groups;
  }, {} as Record<string, Symptom[]>);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-medical-gradient bg-clip-text text-transparent mb-2">
            AI Disease Prediction
          </h1>
          <p className="text-muted-foreground">
            Advanced symptom analysis powered by machine learning algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="shadow-medical border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <span>Patient Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      placeholder="Enter age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                      placeholder="Enter gender"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medical border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-primary" />
                  <span>Symptom Selection</span>
                </CardTitle>
                <CardDescription>
                  Select all symptoms you are currently experiencing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedSymptoms).map(([category, categorySymptoms]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-3">{category}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categorySymptoms.map((symptom) => (
                          <div key={symptom.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={symptom.id}
                              checked={selectedSymptoms.includes(symptom.id)}
                              onCheckedChange={(checked) => 
                                handleSymptomChange(symptom.id, checked as boolean)
                              }
                            />
                            <Label htmlFor={symptom.id} className="text-sm cursor-pointer">
                              {symptom.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={analyzePredictions}
                  disabled={isAnalyzing}
                  className="w-full mt-6 bg-medical-gradient hover:shadow-glow"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Symptoms"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            <Card className="shadow-medical border-0">
              <CardHeader>
                <CardTitle>AI Predictions</CardTitle>
                <CardDescription>
                  Potential conditions based on your symptoms
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-medical-gradient rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-lg font-semibold">Analyzing Symptoms...</p>
                      <p className="text-muted-foreground">Our AI is processing your data</p>
                    </div>
                    <Progress value={33} className="w-full" />
                  </div>
                ) : predictions.length > 0 ? (
                  <div className="space-y-4">
                    {predictions.map((prediction, index) => (
                      <Card key={index} className="border shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-lg">{prediction.disease}</h4>
                            <Badge variant={getSeverityColor(prediction.severity)}>
                              {getSeverityIcon(prediction.severity)}
                              <span className="ml-1 capitalize">{prediction.severity}</span>
                            </Badge>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Confidence</span>
                              <span className="font-semibold">{prediction.confidence}%</span>
                            </div>
                            <Progress value={prediction.confidence} className="h-2" />
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            {prediction.description}
                          </p>
                          
                          <div>
                            <h5 className="font-semibold text-sm mb-2">Recommendations:</h5>
                            <ul className="text-sm space-y-1">
                              {prediction.recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        ⚠️ <strong>Disclaimer:</strong> This AI prediction is for informational purposes only. 
                        Always consult with qualified healthcare professionals for accurate diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold text-muted-foreground">No Analysis Yet</p>
                    <p className="text-muted-foreground">Select symptoms and click analyze to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasePrediction;