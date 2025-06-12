
import React from "react";
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
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TechgroundsPlayground from './pages/TechgroundsPlayground';
import JSONEmbedNL from './pages/JSONEmbedNL';
import PythonEmbedNL from './pages/PythonEmbedNL';
import WorkflowEmbedNL from './pages/WorkflowEmbedNL';
import AITermsQuizNL from './pages/AITermsQuizNL';
import PromptEngineeringEmbedNL from './pages/PromptEngineeringEmbedNL';
import SecurityEmbedNL from './pages/SecurityEmbedNL';
import FrameworkEmbedNL from './pages/FrameworkEmbedNL';
import DatabaseEmbedNL from './pages/DatabaseEmbedNL';
import AppErrorBoundary from './components/ErrorBoundary/AppErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Techgrounds AI-Playground */}
              <Route path="/playground" element={<TechgroundsPlayground />} />
              
              {/* Programming Learning Modules */}
              <Route path="/embed/json" element={<JSONEmbedNL />} />
              <Route path="/embed/python" element={<PythonEmbedNL />} />
              <Route path="/embed/workflow" element={<WorkflowEmbedNL />} />
              
              {/* AI Training Modules */}
              <Route path="/embed/prompt-engineering" element={<PromptEngineeringEmbedNL />} />
              <Route path="/embed/ai-safety" element={<SecurityEmbedNL />} />
              <Route path="/embed/frameworks" element={<FrameworkEmbedNL />} />
              <Route path="/embed/database" element={<DatabaseEmbedNL />} />
              
              {/* Quiz Module */}
              <Route path="/embed/quiz" element={<AITermsQuizNL />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </HelmetProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}

export default App;
