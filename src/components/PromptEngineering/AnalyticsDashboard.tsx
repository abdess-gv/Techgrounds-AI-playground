
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, Download, Star, Clock, Activity, Target } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data - in real implementation, this would come from your database
  const statsData = {
    totalUsers: 2547,
    activeUsers: 1823,
    totalPrompts: 245,
    totalDownloads: 8934,
    avgRating: 4.6,
    completionRate: 78
  };

  const usageData = [
    { name: 'Ma', prompts: 120, exercises: 80, downloads: 45 },
    { name: 'Di', prompts: 145, exercises: 95, downloads: 52 },
    { name: 'Wo', prompts: 180, exercises: 120, downloads: 68 },
    { name: 'Do', prompts: 165, exercises: 110, downloads: 61 },
    { name: 'Vr', prompts: 190, exercises: 140, downloads: 75 },
    { name: 'Za', prompts: 220, exercises: 160, downloads: 89 },
    { name: 'Zo', prompts: 200, exercises: 145, downloads: 82 }
  ];

  const categoryData = [
    { name: 'Content Creation', value: 35, color: '#3B82F6' },
    { name: 'Development', value: 25, color: '#10B981' },
    { name: 'Business', value: 20, color: '#F59E0B' },
    { name: 'Education', value: 15, color: '#EF4444' },
    { name: 'AI Systems', value: 5, color: '#8B5CF6' }
  ];

  const topPrompts = [
    { id: 1, title: "Advanced Data Analysis", views: 1247, downloads: 456, rating: 4.9 },
    { id: 2, title: "Creative Writing Coach", views: 1089, downloads: 387, rating: 4.7 },
    { id: 3, title: "Technical Documentation", views: 892, downloads: 321, rating: 4.8 },
    { id: 4, title: "Business Strategy Analyzer", views: 756, downloads: 289, rating: 4.6 },
    { id: 5, title: "Learning Path Designer", views: 634, downloads: 234, rating: 4.5 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <Badge
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Badge>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{statsData.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-600">Totaal Gebruikers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{statsData.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-600">Actieve Gebruikers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{statsData.totalPrompts}</p>
                <p className="text-xs text-gray-600">Totaal Prompts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{statsData.totalDownloads.toLocaleString()}</p>
                <p className="text-xs text-gray-600">Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{statsData.avgRating}</p>
                <p className="text-xs text-gray-600">Gem. Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{statsData.completionRate}%</p>
                <p className="text-xs text-gray-600">Voltooiing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usage">Gebruik</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="performance">Prestaties</TabsTrigger>
          <TabsTrigger value="users">Gebruikers</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gebruik Trends</CardTitle>
              <CardDescription>Dagelijkse activiteit van prompts, oefeningen en downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="prompts" fill="#3B82F6" name="Prompts" />
                  <Bar dataKey="exercises" fill="#10B981" name="Oefeningen" />
                  <Bar dataKey="downloads" fill="#F59E0B" name="Downloads" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Categorieën</CardTitle>
                <CardDescription>Distributie van content per categorie</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Presterende Prompts</CardTitle>
                <CardDescription>Meest populaire content deze week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPrompts.map((prompt, index) => (
                    <div key={prompt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                          <h4 className="font-medium text-sm">{prompt.title}</h4>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{prompt.views}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Download className="h-3 w-3" />
                            <span>{prompt.downloads}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{prompt.rating}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Gebruik en engagement trends over tijd</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="prompts" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="exercises" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nieuwe Gebruikers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">+247</div>
                <p className="text-sm text-gray-600">Deze week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Retentie Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">73%</div>
                <p className="text-sm text-gray-600">7-dagen retentie</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg. Sessie Tijd</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">12m</div>
                <p className="text-sm text-gray-600">Per sessie</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
