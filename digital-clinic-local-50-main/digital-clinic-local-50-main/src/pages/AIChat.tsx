import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  urgency?: 'low' | 'medium' | 'high';
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Health Assistant. I can help you with medical questions, symptom analysis, and health advice. Please describe your symptoms or health concerns.",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date(),
        urgency: aiResponse.urgency,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      if (aiResponse.urgency === 'high') {
        toast({
          title: "High Priority Alert",
          description: "This requires immediate medical attention. Consider contacting emergency services.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const generateAIResponse = (userInput: string): { text: string; urgency: 'low' | 'medium' | 'high' } => {
    const input = userInput.toLowerCase();
    
    // High urgency keywords
    if (input.includes('chest pain') || input.includes('heart attack') || input.includes('difficulty breathing') || input.includes('severe pain')) {
      return {
        text: "⚠️ URGENT: Based on your symptoms, this could be a medical emergency. Please seek immediate medical attention or call emergency services. Chest pain and difficulty breathing can be signs of serious conditions that require immediate care.",
        urgency: 'high'
      };
    }
    
    // Medium urgency
    if (input.includes('fever') || input.includes('headache') || input.includes('nausea') || input.includes('dizziness')) {
      return {
        text: "I understand you're experiencing concerning symptoms. While these may not be immediately life-threatening, I recommend consulting with a healthcare provider within 24-48 hours. In the meantime, ensure you're staying hydrated and resting. If symptoms worsen, seek immediate care.",
        urgency: 'medium'
      };
    }
    
    // Low urgency - general health advice
    return {
      text: "Thank you for sharing your health concerns. Based on what you've described, this appears to be a routine health matter. I recommend maintaining good health practices like regular exercise, balanced nutrition, and adequate sleep. Consider scheduling a routine check-up with your healthcare provider for personalized advice.",
      urgency: 'low'
    };
  };

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getUrgencyIcon = (urgency?: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold bg-medical-gradient bg-clip-text text-transparent mb-2">
            AI Health Assistant
          </h1>
          <p className="text-muted-foreground">
            Get instant medical advice and symptom analysis powered by AI
          </p>
        </div>

        <Card className="h-[600px] shadow-medical border-0">
          <CardHeader className="bg-medical-gradient text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <span>AI Medical Consultation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-full flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser ? 'bg-primary' : 'bg-accent'
                    }`}>
                      {message.isUser ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`flex-1 max-w-[80%] ${
                      message.isUser ? 'text-right' : ''
                    }`}>
                      <div className={`rounded-lg p-3 ${
                        message.isUser 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.urgency && (
                          <Badge variant={getUrgencyColor(message.urgency)} className="text-xs">
                            {getUrgencyIcon(message.urgency)}
                            <span className="ml-1 capitalize">{message.urgency} Priority</span>
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe your symptoms or ask a health question..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-medical-gradient hover:shadow-glow"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                ⚠️ This AI assistant provides general health information only. Always consult healthcare professionals for medical advice.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;