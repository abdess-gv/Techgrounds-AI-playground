
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Activity, FileText, Calendar } from 'lucide-react';

interface AdminAnalyticsPanelProps {
  stats: any;
}

const AdminAnalyticsPanel = ({ stats }: AdminAnalyticsPanelProps) => {
  const formatGrowth = (current: number, previous: number) => {
    if (previous === 0) return '+100%';
    const growth = ((current - previous) / previous) * 100;
    return `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Analytics & Rapportage</h2>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.overview?.totalUsers || 0}</p>
                <p className="text-xs text-gray-600">Totaal Gebruikers</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {formatGrowth(
                    stats.userGrowth?.thisWeek || 0,
                    stats.userGrowth?.lastWeek || 0
                  )}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.overview?.newUsersThisWeek || 0}</p>
                <p className="text-xs text-gray-600">Nieuwe Gebruikers</p>
                <Badge variant="outline" className="text-xs mt-1">Deze week</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.overview?.publishedContent || 0}</p>
                <p className="text-xs text-gray-600">Gepubliceerde Content</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {stats.overview?.draftContent || 0} concepten
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.overview?.proUsers || 0}</p>
                <p className="text-xs text-gray-600">Pro Gebruikers</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {((stats.overview?.proUsers || 0) / (stats.overview?.totalUsers || 1) * 100).toFixed(1)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Activiteit</CardTitle>
            <CardDescription>Dagelijkse gebruiksstatistieken laatste 7 dagen</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.dailyUsage || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dayName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usage" fill="#3B82F6" name="Activiteiten" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Gebruikersgroei</CardTitle>
            <CardDescription>Nieuwe gebruikersregistraties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-semibold text-blue-900">Deze Week</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {stats.userGrowth?.thisWeek || 0}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600">nieuwe gebruikers</p>
                  <Badge variant="outline" className="text-blue-700">
                    {formatGrowth(
                      stats.userGrowth?.thisWeek || 0,
                      stats.userGrowth?.lastWeek || 0
                    )}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Vorige Week</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {stats.userGrowth?.lastWeek || 0}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">nieuwe gebruikers</p>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <p className="font-semibold text-green-900">Groei Inzicht</p>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  {stats.userGrowth?.thisWeek > stats.userGrowth?.lastWeek 
                    ? 'Positieve groei in nieuwe registraties'
                    : stats.userGrowth?.thisWeek === stats.userGrowth?.lastWeek
                    ? 'Stabiele groei in nieuwe registraties'
                    : 'Daling in nieuwe registraties - mogelijk actie vereist'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Admin Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recente Admin Activiteit</CardTitle>
          <CardDescription>Laatste beheersacties op het platform</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((activity: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-600">
                        door {activity.profiles?.full_name || 'Admin'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(activity.created_at).toLocaleDateString('nl-NL')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.created_at).toLocaleTimeString('nl-NL', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Geen recente activiteit beschikbaar</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Samenvatting</CardTitle>
          <CardDescription>Overzicht van belangrijke metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {((stats.overview?.proUsers || 0) / (stats.overview?.totalUsers || 1) * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600">Conversie naar Pro</p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.overview?.publishedContent || 0}
              </div>
              <p className="text-sm text-gray-600">Beschikbare Modules</p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.overview?.adminUsers || 0}
              </div>
              <p className="text-sm text-gray-600">Admin Gebruikers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalyticsPanel;
