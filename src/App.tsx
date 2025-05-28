
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PromptEngineeringNL from "./pages/PromptEngineeringNL";
import ExerciseEmbedNL from "./pages/ExerciseEmbedNL";
import DatabaseEmbedNL from "./pages/DatabaseEmbedNL";
import FrameworkEmbedNL from "./pages/FrameworkEmbedNL";
import AISafetyEmbedNL from "./pages/AISafetyEmbedNL";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai-leren" element={<Navigate to="/ai-leren/nl" replace />} />
            <Route path="/ai-leren/nl" element={<PromptEngineeringNL />} />
            
            {/* Dutch Embed Routes */}
            <Route path="/oefening-embed-nl" element={<ExerciseEmbedNL />} />
            <Route path="/database-embed-nl" element={<DatabaseEmbedNL />} />
            <Route path="/framework-embed-nl" element={<FrameworkEmbedNL />} />
            <Route path="/ai-veiligheid-embed-nl" element={<AISafetyEmbedNL />} />
            
            {/* Legacy redirects */}
            <Route path="/exercise-embed-nl" element={<Navigate to="/oefening-embed-nl" replace />} />
            <Route path="/database-embed-nl" element={<Navigate to="/database-embed-nl" replace />} />
            <Route path="/framework-embed-nl" element={<Navigate to="/framework-embed-nl" replace />} />
            <Route path="/prompt-engineering" element={<Navigate to="/ai-leren/nl" replace />} />
            <Route path="/prompt-engineering/nl" element={<Navigate to="/ai-leren/nl" replace />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
