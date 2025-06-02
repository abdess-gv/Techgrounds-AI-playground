
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
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SEO from "./components/SEO";
import { HelmetProvider } from 'react-helmet-async';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminGuard from '@/components/AdminAuth/AdminGuard';
import EnhancedAdminDashboard from '@/components/PromptEngineering/EnhancedAdminDashboard';

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <HelmetProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              
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
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
