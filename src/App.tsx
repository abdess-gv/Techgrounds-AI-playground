import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Playground from "./pages/Playground";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";
import AdminContentManagementPage from "./pages/AdminContentManagementPage";
import AdminNoteManagementPage from "./pages/AdminNoteManagementPage";
import AdminTranscriptionManagementPage from "./pages/AdminTranscriptionManagementPage";
import AdminSystemSettingsPage from "./pages/AdminSystemSettingsPage";
import AdminLogsPage from "./pages/AdminLogsPage";
import AdminMoodleConfigPage from "./pages/AdminMoodleConfigPage";
import AdminMoodleUserManagementPage from "./pages/AdminMoodleUserManagementPage";
import AdminUsageStatisticsPage from "./pages/AdminUsageStatisticsPage";
import AdminRosterManagementPage from "./pages/AdminRosterManagementPage";
import NotePage from "./pages/NotePage";
import ProgramRoosterPage from "./pages/ProgramRoosterPage";
import TranscriptionPage from "./pages/TranscriptionPage";
import EmbedPage from "./pages/EmbedPage";
import PricingPage from "./pages/PricingPage";
import AccountPage from "./pages/AccountPage";
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
              <Route path="/playground" element={<Playground />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<AdminUserManagementPage />} />
              <Route path="/admin/content" element={<AdminContentManagementPage />} />
              <Route path="/admin/notes" element={<AdminNoteManagementPage />} />
              <Route path="/admin/transcriptions" element={<AdminTranscriptionManagementPage />} />
              <Route path="/admin/system-settings" element={<AdminSystemSettingsPage />} />
              <Route path="/admin/logs" element={<AdminLogsPage />} />
              <Route path="/admin/moodle-config" element={<AdminMoodleConfigPage />} />
              <Route path="/admin/moodle-users" element={<AdminMoodleUserManagementPage />} />
              <Route path="/admin/usage-statistics" element={<AdminUsageStatisticsPage />} />
              <Route path="/admin/roster-management" element={<AdminRosterManagementPage />} />
              <Route path="/note/:noteId" element={<NotePage />} />
              <Route path="/roster/:programId" element={<ProgramRoosterPage />} />
              <Route path="/transcription/:transcriptionId" element={<TranscriptionPage />} />
              <Route path="/embed/:embedId" element={<EmbedPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/account" element={<AccountPage />} />
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
