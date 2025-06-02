
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, Settings, Users, FileText, Activity, TrendingUp, 
  Shield, LogOut, AlertTriangle, Database, Eye 
} from 'lucide-react';
import AdminUserManager from './AdminUserManager';
import AdminContentManager from './AdminContentManager';
import AdminAnalyticsPanel from './AdminAnalyticsPanel';

const EnhancedAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/admin-analytics`, {
        headers: {
          'Authorization': `Bearer ${session.session.access_token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const { analytics } = await response.json();
        setStats(analytics);
      }
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };

  const quickStats = [
    {
      title: "Totaal Gebruikers",
      value: stats.overview?.totalUsers || 0,
      change: `+${stats.overview?.newUsersThisWeek || 0} deze week`,
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Gepubliceerde Content",
      value: stats.overview?.publishedContent || 0,
      change: `${stats.overview?.draftContent || 0} concepten`,
      trend: "up", 
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Pro Gebruikers",
      value: stats.overview?.proUsers || 0,
      change: `${((stats.overview?.proUsers || 0) / (stats.overview?.totalUsers || 1) * 100).toFixed(1)}%`,
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Platform Activiteit",
      value: stats.overview?.totalUsage || 0,
      change: "30 dagen",
      trend: "up",
      icon: Activity,
      color: "text-orange-600"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading admin dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">AI Leren Platform Beheer</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
              <p className="text-xs text-gray-600">{profile?.email}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overzicht</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Gebruikers</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Instellingen</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                          <Badge variant="outline" className="text-xs">
                            {stat.change}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100">
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recente Admin Activiteit</CardTitle>
                  <CardDescription>Laatste beheeracties in het systeem</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentActivity?.slice(0, 5).map((activity: any, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-lg">🔧</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-600">
                            {activity.profiles?.full_name || 'Admin'} • {new Date(activity.created_at).toLocaleString('nl-NL')}
                          </p>
                        </div>
                      </div>
                    )) || (
                      <p className="text-gray-500 text-center py-4">Geen recente activiteit</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Systeem Status</CardTitle>
                  <CardDescription>Platform gezondheid en performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Database</span>
                    </div>
                    <Badge variant="outline" className="text-green-700">Online</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Edge Functions</span>
                    </div>
                    <Badge variant="outline" className="text-green-700">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Storage</span>
                    </div>
                    <Badge variant="outline" className="text-blue-700">85% Used</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Snelle Acties</CardTitle>
                <CardDescription>Veelgebruikte beheerfuncties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setActiveTab('users')}
                    className="h-20 flex-col space-y-2"
                    variant="outline"
                  >
                    <Users className="h-6 w-6" />
                    <span>Gebruikers Beheren</span>
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveTab('content')}
                    className="h-20 flex-col space-y-2"
                    variant="outline"
                  >
                    <FileText className="h-6 w-6" />
                    <span>Content Bewerken</span>
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveTab('analytics')}
                    className="h-20 flex-col space-y-2"
                    variant="outline"
                  >
                    <BarChart3 className="h-6 w-6" />
                    <span>Analytics Bekijken</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AdminAnalyticsPanel stats={stats} />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <AdminUserManager />
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <AdminContentManager />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Systeem Instellingen</CardTitle>
                <CardDescription>Platform configuratie en beheer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Instellingen Panel</h3>
                  <p className="text-gray-600 mb-6">
                    Hier kun je platform instellingen beheren, email templates configureren,
                    en systeem parameters aanpassen.
                  </p>
                  <Badge variant="outline">In ontwikkeling</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;
