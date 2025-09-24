import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageSquare, 
  Settings, 
  Users,
  Monitor,
  Camera
} from "lucide-react";

interface CallLog {
  id: string;
  participants: string[];
  duration: string;
  date: Date;
  type: 'patient-doctor' | 'consultation' | 'emergency';
  status: 'completed' | 'missed' | 'ongoing';
}

const VideoCall = () => {
  const { toast } = useToast();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [roomId, setRoomId] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{sender: string, message: string, time: string}[]>([]);
  
  const [callLogs] = useState<CallLog[]>([
    {
      id: "1",
      participants: ["Dr. Smith", "John Doe"],
      duration: "15:30",
      date: new Date("2024-01-20T10:30:00"),
      type: "patient-doctor",
      status: "completed"
    },
    {
      id: "2",
      participants: ["Dr. Johnson", "Sarah Wilson"],
      duration: "08:45",
      date: new Date("2024-01-20T14:15:00"),
      type: "consultation",
      status: "completed"
    },
    {
      id: "3",
      participants: ["Emergency Team", "Michael Davis"],
      duration: "12:20",
      date: new Date("2024-01-20T16:45:00"),
      type: "emergency",
      status: "missed"
    }
  ]);

  // Simulate call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = async () => {
    if (!roomId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a room ID to start the call",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate WebRTC connection
      setIsCallActive(true);
      
      // Simulate getting local video stream
      if (localVideoRef.current) {
        // In a real app, this would be: navigator.mediaDevices.getUserMedia()
        localVideoRef.current.style.backgroundColor = "#1f2937";
        localVideoRef.current.style.color = "white";
      }
      
      toast({
        title: "Call Started",
        description: `Connected to room: ${roomId}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start video call. Please check your camera and microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsVideoEnabled(true);
    setIsAudioEnabled(true);
    toast({
      title: "Call Ended",
      description: `Call duration: ${formatDuration(callDuration)}`,
    });
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast({
      title: isVideoEnabled ? "Video Disabled" : "Video Enabled",
      description: isVideoEnabled ? "Your camera has been turned off" : "Your camera has been turned on",
    });
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast({
      title: isAudioEnabled ? "Audio Muted" : "Audio Unmuted",
      description: isAudioEnabled ? "Your microphone has been muted" : "Your microphone has been unmuted",
    });
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      sender: "You",
      message: chatMessage,
      time: new Date().toLocaleTimeString()
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage("");
    
    // Simulate receiving a response
    setTimeout(() => {
      const response = {
        sender: "Dr. Smith",
        message: "Thank you for your message. I'll review this information.",
        time: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, response]);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "missed": return "destructive";
      case "ongoing": return "warning";
      default: return "secondary";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "emergency": return "destructive";
      case "patient-doctor": return "default";
      case "consultation": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-medical-gradient bg-clip-text text-transparent mb-2">
            Video Telemedicine
          </h1>
          <p className="text-muted-foreground text-lg">
            Secure video consultations for remote healthcare
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Call Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Video className="h-5 w-5 mr-2 text-primary" />
                    Video Call Interface
                  </div>
                  {isCallActive && (
                    <Badge variant="default" className="bg-green-500">
                      Live • {formatDuration(callDuration)}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Start or join a video consultation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isCallActive ? (
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Enter Room ID (e.g., room-123)"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                      />
                    </div>
                    <Button onClick={startCall} className="w-full" size="lg">
                      <Video className="h-4 w-4 mr-2" />
                      Start Video Call
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Video Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Local Video */}
                      <div className="relative">
                        <video
                          ref={localVideoRef}
                          className="w-full h-48 bg-gray-900 rounded-lg object-cover"
                          autoPlay
                          muted
                        />
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                          You {!isVideoEnabled && "(Video Off)"}
                        </div>
                        {!isVideoEnabled && (
                          <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* Remote Video */}
                      <div className="relative">
                        <video
                          ref={remoteVideoRef}
                          className="w-full h-48 bg-gray-800 rounded-lg object-cover"
                          autoPlay
                        />
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                          Dr. Smith
                        </div>
                        <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <Users className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm">Waiting for participant...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Call Controls */}
                    <div className="flex justify-center space-x-4">
                      <Button
                        variant={isVideoEnabled ? "default" : "secondary"}
                        size="lg"
                        onClick={toggleVideo}
                      >
                        {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        variant={isAudioEnabled ? "default" : "secondary"}
                        size="lg"
                        onClick={toggleAudio}
                      >
                        {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                      
                      <Button variant="outline" size="lg">
                        <Monitor className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="outline" size="lg">
                        <Settings className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="destructive" size="lg" onClick={endCall}>
                        <PhoneOff className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chat During Call */}
            {isCallActive && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-32 border rounded-md p-3 overflow-y-auto bg-muted/50">
                      {chatMessages.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No messages yet...</p>
                      ) : (
                        <div className="space-y-2">
                          {chatMessages.map((msg, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium text-primary">{msg.sender}</span>
                              <span className="text-muted-foreground ml-2 text-xs">{msg.time}</span>
                              <p className="mt-1">{msg.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type a message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      />
                      <Button onClick={sendMessage}>Send</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Call History & Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Join Emergency Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Test Audio/Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Recent Calls
                </CardTitle>
                <CardDescription>
                  Your recent video consultations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {callLogs.map((call) => (
                    <div key={call.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={getTypeColor(call.type)} className="text-xs">
                            {call.type}
                          </Badge>
                          <Badge variant={getStatusColor(call.status)} className="text-xs">
                            {call.status}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {call.duration}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {call.participants.join(" • ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {call.date.toLocaleDateString()} at {call.date.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 border-blue-200 bg-blue-50 dark:bg-blue-950/10">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Video className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Video Call Demo</p>
                <p>
                  This is a demonstration of a telemedicine video call interface. 
                  In a production environment, this would integrate with WebRTC for real peer-to-peer 
                  video communication, require proper authentication, and comply with healthcare 
                  privacy regulations like HIPAA.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoCall;