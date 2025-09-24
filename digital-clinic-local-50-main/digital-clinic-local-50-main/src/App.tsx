import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import DiseasePrediction from "./pages/DiseasePrediction";
import Emergency from "./pages/Emergency";
import BloodDonation from "./pages/BloodDonation";
import OrganDonation from "./pages/OrganDonation";
import VisionCare from "./pages/VisionCare";
import UserProfile from "./pages/UserProfile";
import VideoCall from "./pages/VideoCall";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/disease-prediction" element={<DiseasePrediction />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/blood-donation" element={<BloodDonation />} />
          <Route path="/organ-donation" element={<OrganDonation />} />
          <Route path="/vision-care" element={<VisionCare />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
