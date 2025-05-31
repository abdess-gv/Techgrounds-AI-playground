
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Plus, Edit, Trash2, Save, X, Upload, Download, 
  Calendar as CalendarIcon, Clock, Search, Filter,
  CheckSquare, Square, Eye, Copy, Archive, Star
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  publishDate?: Date;
  views: number;
  downloads: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const EnhancedContentManager = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [formData, setFormData] = useState<Partial<ContentItem>>({});
  const [publishDate, setPublishDate] = useState<Date>();
  const { toast } = useToast();

  // Mock data
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Advanced Data Analysis Framework',
      description: 'Comprehensive framework for data analysis with AI',
      content: 'Your comprehensive data analysis prompt...',
      category: 'analytics',
      difficulty: 'advanced',
      tags: ['data', 'analysis', 'statistics'],
      status: 'published',
      views: 1247,
      downloads: 456,
      rating: 4.9,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      title: 'Creative Writing Assistant',
      description: 'Help with creative writing and storytelling',
      content: 'Your creative writing prompt...',
      category: 'creative',
      difficulty: 'intermediate',
      tags: ['writing', 'creativity', 'stories'],
      status: 'draft',
      views: 0,
      downloads: 0,
      rating: 0,
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22')
    }
  ]);

  const categories = [
    { value: 'all', label: 'Alle Categorieën' },
    { value: 'content', label: 'Content Creation' },
    { value: 'development', label: 'Development' },
    { value: 'business', label: 'Business' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'creative', label: 'Creative' },
    { value: 'education', label: 'Education' }
  ];

  const statuses = [
    { value: 'all', label: 'Alle Statussen' },
    { value: 'draft', label: 'Concept' },
    { value: 'published', label: 'Gepubliceerd' },
    { value: 'scheduled', label: 'Ingepland' },
    { value: 'archived', label: 'Gearchiveerd' }
  ];

  const filteredItems = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'publish':
        setContentItems(prev => prev.map(item => 
          selectedItems.includes(item.id) 
            ? { ...item, status: 'published' as const }
            : item
        ));
        break;
      case 'archive':
        setContentItems(prev => prev.map(item => 
          selectedItems.includes(item.id) 
            ? { ...item, status: 'archived' as const }
            : item
        ));
        break;
      case 'delete':
        setContentItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
        break;
    }
    setSelectedItems([]);
    toast({
      title: "Bulk actie voltooid",
      description: `${selectedItems.length} items bijgewerkt`
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Fout",
        description: "Vul alle verplichte velden in",
        variant: "destructive"
      });
      return;
    }

    const newItem: ContentItem = {
      ...formData as ContentItem,
      id: editingId || Date.now().toString(),
      publishDate,
      views: formData.views || 0,
      downloads: formData.downloads || 0,
      rating: formData.rating || 0,
      createdAt: formData.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (editingId) {
      setContentItems(prev => prev.map(item => 
        item.id === editingId ? newItem : item
      ));
    } else {
      setContentItems(prev => [...prev, newItem]);
    }

    handleCancel();
    toast({
      title: "Succes",
      description: editingId ? "Content bijgewerkt" : "Content aangemaakt"
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({});
    setPublishDate(undefined);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setFormData(item);
    setPublishDate(item.publishDate);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      archived: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Content Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowBulkActions(!showBulkActions)}>
            <CheckSquare className="h-4 w-4 mr-2" />
            Bulk Acties
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Content
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Zoek content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importeren
            </Button>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporteren
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {showBulkActions && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  {selectedItems.length} van {filteredItems.length} geselecteerd
                </span>
              </div>
              
              {selectedItems.length > 0 && (
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => handleBulkAction('publish')}>
                    Publiceren
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('archive')}>
                    <Archive className="h-4 w-4 mr-2" />
                    Archiveren
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Verwijderen
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle>{isCreating ? 'Nieuwe Content Aanmaken' : 'Content Bewerken'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Titel *</label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Content titel"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Concept</SelectItem>
                    <SelectItem value="published">Publiceren</SelectItem>
                    <SelectItem value="scheduled">Inplannen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.status === 'scheduled' && (
              <div>
                <label className="text-sm font-medium">Publicatie Datum</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {publishDate ? format(publishDate, "PPP") : "Selecteer datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={publishDate}
                      onSelect={setPublishDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Beschrijving *</label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Korte beschrijving van de content"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Content *</label>
              <Textarea
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Volledige content..."
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Opslaan
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Annuleren
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content List */}
      <div className="space-y-4">
        {filteredItems.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {showBulkActions && (
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleSelectItem(item.id)}
                    />
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <Badge className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                      {item.publishDate && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {format(item.publishDate, "dd/MM")}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{item.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{item.downloads}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{item.rating}</span>
                      </span>
                      <span>Bijgewerkt: {format(item.updatedAt, "dd/MM/yyyy")}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnhancedContentManager;
