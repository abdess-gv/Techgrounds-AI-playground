
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface CourseProgress {
  id: string;
  moodle_course_id: number;
  course_name: string;
  completion_percentage: number;
  completed_lessons: number;
  total_lessons: number;
  certificate_earned: boolean;
  last_accessed: string;
}

interface PremiumAccess {
  id: string;
  course_type: string;
  access_level: string;
  payment_status: string;
  expires_at: string;
}

export const useMoodleIntegration = () => {
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [premiumAccess, setPremiumAccess] = useState<PremiumAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserData();
      setupRealtimeSubscriptions();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch course progress
      const { data: progressData, error: progressError } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', user?.id)
        .order('last_accessed', { ascending: false });

      if (progressError) throw progressError;
      setCourseProgress(progressData || []);

      // Fetch premium access
      const { data: accessData, error: accessError } = await supabase
        .from('premium_access')
        .select('*')
        .eq('user_id', user?.id)
        .eq('payment_status', 'completed')
        .order('created_at', { ascending: false });

      if (accessError) throw accessError;
      setPremiumAccess(accessData || []);

    } catch (error: any) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load course data');
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to course progress updates
    const progressChannel = supabase
      .channel('progress-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'course_progress',
          filter: `user_id=eq.${user?.id}`
        },
        (payload) => {
          console.log('Progress update received:', payload);
          fetchUserData(); // Refresh data
          toast.success('Course progress updated!');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(progressChannel);
    };
  };

  const generateSSOUrl = async (courseId: number): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('moodle-sso', {
        body: { courseId, userId: user?.id }
      });

      if (error) throw error;
      return data.ssoUrl;
    } catch (error: any) {
      console.error('SSO Error:', error);
      toast.error('Failed to generate course access');
      throw error;
    }
  };

  const checkPremiumAccess = (courseType: string): boolean => {
    return premiumAccess.some(access => 
      access.course_type === courseType && 
      new Date(access.expires_at) > new Date()
    );
  };

  const syncProgress = async (courseId: number, progress: any) => {
    try {
      await supabase.functions.invoke('moodle-sync', {
        body: {
          userId: user?.id,
          courseId,
          progress,
          action: 'sync_progress'
        }
      });
    } catch (error: any) {
      console.error('Progress sync error:', error);
    }
  };

  return {
    courseProgress,
    premiumAccess,
    loading,
    generateSSOUrl,
    checkPremiumAccess,
    syncProgress,
    refreshData: fetchUserData
  };
};
