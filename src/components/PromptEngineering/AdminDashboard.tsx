
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Settings, Users, FileText, Activity, TrendingUp } from 'lucide-react';
import AnalyticsDashboard from './AnalyticsDashboard';
import EnhancedContentManager from './EnhancedContentManager';
import AdminPromptManager from './AdminPromptManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Quick stats for overview
  const quickStats = [
    {
      title: "Totaal Content",
      value: "245",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Actieve Gebruikers",
      value: "1,823",
      change: "+8%",
      trend: "up", 
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Maandelijkse Downloads",
      value: "8,934",
      change: "+23%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Gemiddelde Rating",
      value: "4.6",
      change: "+0.2",
      trend: "up",
      icon: Activity,
      color: "text-orange-600"
    }
  ];

  const recentActivity = [
    {
      action: "Nieuwe prompt toegevoegd",
      user: "Admin",
      time: "2 minuten geleden",
      type: "create"
    },
    {
      action: "Content gepubliceerd",
      user: "Editor",
      time: "15 minuten geleden", 
      type: "publish"
    },
    {
      action: "Gebruiker geregistreerd",
      user: "Nieuw",
      time: "32 minuten geleden",
      type: "user"
    },
    {
      action: "Prompt bewerkt",
      user: "Admin",
      time: "1 uur geleden",
      type: "edit"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create': return '🆕';
      case 'publish': return '📢';
      case 'user': return '👤';
      case 'edit': return '✏️';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Beheer je AI Leren platform</p>
            </div>
          </div>
        </div>

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
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="prompts" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Prompts</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Gebruikers</span>
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
                          <Badge 
                            variant={stat.trend === 'up' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {stat.change}
                          </Badge>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg bg-gray-100`}>
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
                  <CardTitle>Recente Activiteit</CardTitle>
                  <CardDescription>Laatste updates in het systeem</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-lg">{getActivityIcon(activity.type)}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Snelle Acties</CardTitle>
                  <CardDescription>Veelgebruikte beheersfuncties</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button 
                    onClick={() => setActiveTab('content')}
                    className="w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">Nieuwe Content Aanmaken</p>
                        <p className="text-sm text-blue-600">Voeg prompts, oefeningen of modules toe</p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className="w-full p-3 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Analytics Bekijken</p>
                        <p className="text-sm text-green-600">Controleer platform prestaties</p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('users')}
                    className="w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-900">Gebruikers Beheren</p>
                        <p className="text-sm text-purple-600">Bekijk en beheer gebruikersaccounts</p>
                      </div>
                    </div>
                  </button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <EnhancedContentManager />
          </TabsContent>

          {/* Prompts Management Tab */}
          <TabsContent value="prompts">
            <AdminPromptManager />
          </TabsContent>

          {/* Users Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gebruikers Beheer</CardTitle>
                <CardDescription>Beheer gebruikersaccounts en permissies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Gebruikers Beheer</h3>
                  <p className="text-gray-600 mb-6">
                    Deze functie wordt binnenkort toegevoegd. Hier kun je gebruikersaccounts beheren, 
                    rollen toewijzen en activiteit monitoren.
                  </p>
                  <Badge variant="outline">Binnenkort beschikbaar</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
