
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PromptEngineeringNL from "./pages/PromptEngineeringNL";
import ExerciseEmbedNL from "./pages/ExerciseEmbedNL";
import DatabaseEmbedNL from "./pages/DatabaseEmbedNL";
import FrameworkEmbedNL from "./pages/FrameworkEmbedNL";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/prompt-engineering" element={<Navigate to="/prompt-engineering/nl" replace />} />
                <Route path="/prompt-engineering/nl" element={<PromptEngineeringNL />} />
                
                {/* Dutch Embed Routes - Primary */}
                <Route path="/exercise-embed-nl" element={<ExerciseEmbedNL />} />
                <Route path="/database-embed-nl" element={<DatabaseEmbedNL />} />
                <Route path="/framework-embed-nl" element={<FrameworkEmbedNL />} />
                
                {/* Legacy redirects to ensure no 404s */}
                <Route path="/exercise-embed" element={<Navigate to="/exercise-embed-nl" replace />} />
                <Route path="/database-embed" element={<Navigate to="/database-embed-nl" replace />} />
                <Route path="/framework-embed" element={<Navigate to="/framework-embed-nl" replace />} />
                <Route path="/prompt-engineering/exercise-embed" element={<Navigate to="/exercise-embed-nl" replace />} />
                <Route path="/prompt-engineering/database-embed" element={<Navigate to="/database-embed-nl" replace />} />
                
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
