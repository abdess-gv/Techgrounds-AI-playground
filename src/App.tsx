
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
import PromptEngineering from "./pages/PromptEngineering";
import PromptEngineeringNL from "./pages/PromptEngineeringNL";
import TechgroundsPlayground from "./pages/TechgroundsPlayground";
import ExerciseEmbed from "./pages/ExerciseEmbed";
import ExerciseEmbedNL from "./pages/ExerciseEmbedNL";
import PromptDatabaseEmbed from "./pages/PromptDatabaseEmbed";
import DatabaseEmbedNL from "./pages/DatabaseEmbedNL";
import SecurityEmbedNL from "./pages/SecurityEmbedNL";
import FrameworkEmbedNL from "./pages/FrameworkEmbedNL";
import AISafetyEmbedNL from "./pages/AISafetyEmbedNL";
import PrivacyDetectionEmbedNL from "./pages/PrivacyDetectionEmbedNL";
import WorkflowEmbedNL from "./pages/WorkflowEmbedNL";
import PythonEmbedNL from "./pages/PythonEmbedNL";
import JSONEmbedNL from "./pages/JSONEmbedNL";
import PromptEngineering2EmbedNL from "./pages/PromptEngineering2EmbedNL";
import AITermsQuizNL from "./pages/AITermsQuizNL";
import AIToolsPage from "./pages/AIToolsPage";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFound from "./pages/NotFound";

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
              <Route path="/prompt-engineering" element={<PromptEngineering />} />
              <Route path="/prompt-engineering-nl" element={<PromptEngineeringNL />} />
              <Route path="/techgrounds-playground" element={<TechgroundsPlayground />} />
              <Route path="/exercise-embed" element={<ExerciseEmbed />} />
              <Route path="/exercise-embed-nl" element={<ExerciseEmbedNL />} />
              <Route path="/prompt-database-embed" element={<PromptDatabaseEmbed />} />
              <Route path="/database-embed-nl" element={<DatabaseEmbedNL />} />
              <Route path="/security-embed-nl" element={<SecurityEmbedNL />} />
              <Route path="/framework-embed-nl" element={<FrameworkEmbedNL />} />
              <Route path="/ai-safety-embed-nl" element={<AISafetyEmbedNL />} />
              <Route path="/privacy-detection-embed-nl" element={<PrivacyDetectionEmbedNL />} />
              <Route path="/workflow-embed-nl" element={<WorkflowEmbedNL />} />
              <Route path="/python-embed-nl" element={<PythonEmbedNL />} />
              <Route path="/json-embed-nl" element={<JSONEmbedNL />} />
              <Route path="/prompt-engineering-2-embed-nl" element={<PromptEngineering2EmbedNL />} />
              <Route path="/ai-terms-quiz-nl" element={<AITermsQuizNL />} />
              <Route path="/ai-tools" element={<AIToolsPage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
