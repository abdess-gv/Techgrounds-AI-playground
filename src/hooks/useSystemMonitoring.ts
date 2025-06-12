
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

interface SystemStatus {
  isOnline: boolean;
  apiHealth: boolean;
  lastCheck: Date;
  errorCount: number;
  performance: {
    loadTime: number;
    memoryUsage?: number;
  };
}

export const useSystemMonitoring = () => {
  const [status, setStatus] = useState<SystemStatus>({
    isOnline: navigator.onLine,
    apiHealth: true,
    lastCheck: new Date(),
    errorCount: 0,
    performance: {
      loadTime: 0
    }
  });
  const { toast } = useToast();

  const checkApiHealth = useCallback(async () => {
    try {
      const startTime = performance.now();
      const response = await fetch('/api/health', {
        method: 'GET',
        cache: 'no-cache'
      });
      const endTime = performance.now();
      
      const isHealthy = response.ok;
      
      setStatus(prev => ({
        ...prev,
        apiHealth: isHealthy,
        lastCheck: new Date(),
        errorCount: isHealthy ? 0 : prev.errorCount + 1,
        performance: {
          ...prev.performance,
          loadTime: endTime - startTime
        }
      }));

      if (!isHealthy && status.apiHealth) {
        toast({
          title: "API Waarschuwing",
          description: "Er zijn problemen met de API verbinding",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('Health check failed:', error);
      setStatus(prev => ({
        ...prev,
        apiHealth: false,
        lastCheck: new Date(),
        errorCount: prev.errorCount + 1
      }));
    }
  }, [status.apiHealth, toast]);

  const handleOnlineStatus = useCallback(() => {
    const isOnline = navigator.onLine;
    setStatus(prev => ({ ...prev, isOnline }));
    
    if (isOnline && !status.isOnline) {
      toast({
        title: "Verbinding Hersteld",
        description: "Je bent weer online"
      });
      checkApiHealth();
    } else if (!isOnline) {
      toast({
        title: "Verbinding Verloren",
        description: "Je bent offline. Sommige functies werken mogelijk niet.",
        variant: "destructive"
      });
    }
  }, [status.isOnline, toast, checkApiHealth]);

  const getPerformanceMetrics = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      setStatus(prev => ({
        ...prev,
        performance: {
          ...prev.performance,
          memoryUsage: memory.usedJSHeapSize / memory.jsHeapSizeLimit * 100
        }
      }));
    }
  }, []);

  useEffect(() => {
    // Online/offline listeners
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Regular health checks
    const healthInterval = setInterval(checkApiHealth, 30000); // Every 30 seconds
    
    // Performance monitoring
    const perfInterval = setInterval(getPerformanceMetrics, 60000); // Every minute

    // Error event listener
    const errorHandler = (event: ErrorEvent) => {
      setStatus(prev => ({
        ...prev,
        errorCount: prev.errorCount + 1
      }));
    };
    
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', errorHandler);

    // Initial checks
    checkApiHealth();
    getPerformanceMetrics();

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
      clearInterval(healthInterval);
      clearInterval(perfInterval);
    };
  }, [handleOnlineStatus, checkApiHealth, getPerformanceMetrics]);

  return {
    status,
    checkHealth: checkApiHealth,
    isHealthy: status.isOnline && status.apiHealth && status.errorCount < 5
  };
};
