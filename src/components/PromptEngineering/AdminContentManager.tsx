
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X, FileText, RefreshCw } from 'lucide-react';

interface ContentModule {
  id: string;
  title: string;
  description: string;
  content: any;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://daamkldzorjgkxgbwqqu.supabase.co';

const AdminContentManager = () => {
  const [modules, setModules] = useState<ContentModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingModule, setEditingModule] = useState<ContentModule | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    status: 'draft' as 'draft' | 'published' | 'archived'
  });
  const { toast } = useToast();

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-content`, {
        headers: {
          'Authorization': `Bearer ${session.session.access_token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const { modules } = await response.json();
        setModules(modules);
      } else {
        throw new Error('Failed to load modules');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load content modules",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveModule = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      const contentData = {
        lessons: formData.content.split('\n\n').filter(Boolean),
        exercises: [],
        resources: []
      };

      if (editingModule) {
        // Update existing module
        const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-content`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${session.session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            moduleId: editingModule.id,
            updates: {
              title: formData.title,
              description: formData.description,
              content: contentData,
              status: formData.status
            }
          })
        });

        if (!response.ok) throw new Error('Failed to update module');
        
        toast({
          title: "Success",
          description: "Module updated successfully"
        });
      } else {
        // Create new module
        const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-content`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            content: contentData
          })
        });

        if (!response.ok) throw new Error('Failed to create module');
        
        toast({
          title: "Success",
          description: "Module created successfully"
        });
      }

      resetForm();
      loadModules();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save module",
        variant: "destructive"
      });
    }
  };

  const deleteModule = async (moduleId: string) => {
    if (!confirm('Are you sure you want to delete this module?')) return;

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-content`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ moduleId })
      });

      if (response.ok) {
        await loadModules();
        toast({
          title: "Success",
          description: "Module deleted successfully"
        });
      } else {
        throw new Error('Failed to delete module');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete module",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', content: '', status: 'draft' });
    setIsCreating(false);
    setEditingModule(null);
  };

  const startEdit = (module: ContentModule) => {
    setEditingModule(module);
    setFormData({
      title: module.title,
      description: module.description,
      content: Array.isArray(module.content?.lessons) ? module.content.lessons.join('\n\n') : '',
      status: module.status
    });
    setIsCreating(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Content Management</h2>
        <div className="flex space-x-2">
          <Button onClick={loadModules} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Vernieuwen
          </Button>
          <Button onClick={() => setIsCreating(true)} disabled={isCreating || !!editingModule}>
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Module
          </Button>
        </div>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle>
              {editingModule ? 'Module Bewerken' : 'Nieuwe Module Aanmaken'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Titel *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Module titel"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'draft' | 'published' | 'archived') => 
                    setFormData({...formData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Concept</SelectItem>
                    <SelectItem value="published">Gepubliceerd</SelectItem>
                    <SelectItem value="archived">Gearchiveerd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Beschrijving *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Module beschrijving"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Content (Lessen)</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Voer lessen in, gescheiden door dubbele enters..."
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Elke les op een nieuwe regel, gescheiden door dubbele enters
              </p>
            </div>

            <div className="flex space-x-2">
              <Button onClick={saveModule}>
                <Save className="h-4 w-4 mr-2" />
                Opslaan
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Annuleren
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modules List */}
      <div className="grid gap-6">
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Loading modules...</p>
            </CardContent>
          </Card>
        ) : modules.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Geen Modules</h3>
              <p className="text-gray-600 mb-4">Er zijn nog geen content modules aangemaakt.</p>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Eerste Module Aanmaken
              </Button>
            </CardContent>
          </Card>
        ) : (
          modules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{module.title}</h3>
                      <Badge className={getStatusBadgeColor(module.status)}>
                        {module.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{module.description}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(module)}
                      disabled={isCreating}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteModule(module.id)}
                      disabled={isCreating}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Content Preview:</h4>
                  <div className="text-sm text-gray-700">
                    {Array.isArray(module.content?.lessons) ? (
                      <ul className="list-disc list-inside space-y-1">
                        {module.content.lessons.slice(0, 3).map((lesson: string, index: number) => (
                          <li key={index}>{lesson}</li>
                        ))}
                        {module.content.lessons.length > 3 && (
                          <li className="text-gray-500">+{module.content.lessons.length - 3} meer...</li>
                        )}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Geen content beschikbaar</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Aangemaakt: {new Date(module.created_at).toLocaleDateString('nl-NL')}</span>
                  <span>Bijgewerkt: {new Date(module.updated_at).toLocaleDateString('nl-NL')}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminContentManager;
