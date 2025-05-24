
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Tag, Eye, Edit3 } from "lucide-react";
import { Note } from "@/types/Note";
import ReactMarkdown from 'react-markdown';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (noteId: string, updates: Partial<Note>) => void;
}

const NoteEditor = ({ note, onUpdateNote }: NoteEditorProps) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
      setHasChanges(false);
    }
  }, [note]);

  useEffect(() => {
    if (note) {
      const changed = title !== note.title || content !== note.content || 
                    JSON.stringify(tags) !== JSON.stringify(note.tags);
      setHasChanges(changed);
    }
  }, [title, content, tags, note]);

  const handleSave = () => {
    if (note && hasChanges) {
      onUpdateNote(note.id, { title, content, tags });
      setHasChanges(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Edit3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No note selected</h3>
          <p className="text-gray-600">Select a note from the sidebar or create a new one to start editing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold border-none shadow-none px-0 focus-visible:ring-0"
            placeholder="Untitled Note"
          />
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-red-100 hover:text-red-700"
                onClick={() => removeTag(tag)}
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              placeholder="Add tag..."
              className="w-24"
              size={newTag.length || 8}
            />
            <Button size="sm" onClick={addTag} variant="outline">
              Add
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <Tabs defaultValue="edit" className="h-full">
          <TabsList className="mb-4">
            <TabsTrigger value="edit" className="flex items-center space-x-2">
              <Edit3 className="h-4 w-4" />
              <span>Edit</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="h-full">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-full min-h-96 font-mono text-sm resize-none border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500"
              placeholder="Start writing your note in markdown..."
            />
          </TabsContent>
          
          <TabsContent value="preview" className="h-full">
            <Card className="h-full">
              <CardContent className="p-6 h-full overflow-auto">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NoteEditor;
