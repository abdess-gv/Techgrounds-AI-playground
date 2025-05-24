
import { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import NoteEditor from "@/components/Dashboard/NoteEditor";
import TranscriptionPanel from "@/components/Dashboard/TranscriptionPanel";
import AIChat from "@/components/Dashboard/AIChat";
import { Note } from "@/types/Note";
import { Brain } from "lucide-react";

const Dashboard = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [activeView, setActiveView] = useState<'editor' | 'transcription' | 'chat'>('editor');
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome to NoteAI',
      content: '# Welcome to NoteAI\n\nThis is your first note! You can write in **markdown** and use all the powerful features.\n\n## Features:\n- AI Transcription\n- Smart Search\n- Chat with your notes\n- Folder organization',
      tags: ['welcome', 'getting-started'],
      folderId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote({ ...selectedNote, ...updates, updatedAt: new Date() });
    }
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote(null);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar 
        notes={notes}
        selectedNote={selectedNote}
        onSelectNote={setSelectedNote}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                {activeView === 'editor' && 'Note Editor'}
                {activeView === 'transcription' && 'Audio Transcription'}
                {activeView === 'chat' && 'AI Assistant'}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {notes.length} note{notes.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </header>
        
        <div className="flex-1">
          {activeView === 'editor' && (
            <NoteEditor 
              note={selectedNote}
              onUpdateNote={updateNote}
            />
          )}
          {activeView === 'transcription' && (
            <TranscriptionPanel 
              onCreateNote={(content) => addNote({
                title: 'Transcribed Note',
                content,
                tags: ['transcription'],
                folderId: null
              })}
            />
          )}
          {activeView === 'chat' && (
            <AIChat notes={notes} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
