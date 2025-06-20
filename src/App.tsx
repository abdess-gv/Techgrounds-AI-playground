
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminRosterManagementPage from "./pages/AdminRosterManagementPage";
import ProgramRoosterPage from "./pages/ProgramRoosterPage";
import RosterEmbedGeneratorPage from "./pages/RosterEmbedGeneratorPage";
import EnhancedRosterPage from "./pages/EnhancedRosterPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/roster-management" element={<AdminRosterManagementPage />} />
              <Route path="/roster/:programId" element={<ProgramRoosterPage />} />
              <Route path="/enhanced-roster/:programId" element={<EnhancedRosterPage />} />
              <Route path="/roster-embed-generator" element={<RosterEmbedGeneratorPage />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
