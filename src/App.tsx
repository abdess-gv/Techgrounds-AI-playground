
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
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SEO from "./components/SEO";
import { HelmetProvider } from 'react-helmet-async';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminGuard from '@/components/AdminAuth/AdminGuard';
import EnhancedAdminDashboard from '@/components/PromptEngineering/EnhancedAdminDashboard';
import AIToolsPage from './pages/AIToolsPage';
import PromptEngineeringNL from './pages/PromptEngineeringNL';
import PromptEngineering from './pages/PromptEngineering';

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <HelmetProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Tools and Learning Routes */}
                <Route path="/tools" element={<AIToolsPage />} />
                <Route path="/ai-leren/nl" element={<PromptEngineeringNL />} />
                <Route path="/prompt-engineering" element={<PromptEngineering />} />
                <Route path="/prompt-engineering/nl" element={<PromptEngineeringNL />} />
                
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
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
