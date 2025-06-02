import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import SEO from "./components/SEO";
import { HelmetProvider } from 'react-helmet-async';
import PromptTemplatePage from "./pages/PromptTemplatePage";
import PromptDetailPage from "./pages/PromptDetailPage";
import PromptCreatePage from "./pages/PromptCreatePage";
import PromptEditPage from "./pages/PromptEditPage";
import AiChatPage from "./pages/AiChatPage";
import ModulePlayerPage from "./pages/ModulePlayerPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminGuard from '@/components/AdminAuth/AdminGuard';
import EnhancedAdminDashboard from '@/components/PromptEngineering/EnhancedAdminDashboard';

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClient client={queryClient}>
        <AuthProvider>
          <HelmetProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/prompt-templates" element={<PromptTemplatePage />} />
              <Route path="/prompt-templates/:id" element={<PromptDetailPage />} />
              <Route path="/prompt-templates/create" element={<PromptCreatePage />} />
              <Route path="/prompt-templates/:id/edit" element={<PromptEditPage />} />
              <Route path="/ai-chat" element={<AiChatPage />} />
              <Route path="/ai-leren/nl" element={<ModulePlayerPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={
                <AdminGuard>
                  <EnhancedAdminDashboard />
                </AdminGuard>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </HelmetProvider>
        </AuthProvider>
      </QueryClient>
    </BrowserRouter>
  );
}

export default App;
