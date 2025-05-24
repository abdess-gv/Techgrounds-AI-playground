
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, Search, FileText, Mic, MessageSquare, 
  Folder, Tag, Settings, Trash2 
} from "lucide-react";
import { Note } from "@/types/Note";

interface SidebarProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDeleteNote: (noteId: string) => void;
  activeView: 'editor' | 'transcription' | 'chat';
  onViewChange: (view: 'editor' | 'transcription' | 'chat') => void;
}

const Sidebar = ({ 
  notes, 
  selectedNote, 
  onSelectNote, 
  onAddNote, 
  onDeleteNote,
  activeView,
  onViewChange 
}: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const createNewNote = () => {
    onAddNote({
      title: 'Untitled Note',
      content: '# New Note\n\nStart writing here...',
      tags: [],
      folderId: null
    });
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeView === 'editor' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('editor')}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-1" />
            Notes
          </Button>
          <Button
            variant={activeView === 'transcription' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('transcription')}
            className="flex-1"
          >
            <Mic className="h-4 w-4 mr-1" />
            Record
          </Button>
          <Button
            variant={activeView === 'chat' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('chat')}
            className="flex-1"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Chat
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button onClick={createNewNote} className="w-full bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                selectedNote?.id === note.id 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
              onClick={() => onSelectNote(note)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{note.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {note.content.replace(/[#*]/g, '').substring(0, 100)}...
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {note.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{note.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {note.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          
          {filteredNotes.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchTerm ? 'No notes found' : 'No notes yet'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {searchTerm ? 'Try a different search term' : 'Create your first note to get started'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
