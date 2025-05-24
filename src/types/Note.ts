
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  folderId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: Date;
}

export interface TranscriptionProvider {
  id: 'openai' | 'deepgram' | 'assemblyai';
  name: string;
  description: string;
  supportedLanguages: string[];
}

export interface AIProvider {
  id: 'openai' | 'grok' | 'gemini';
  name: string;
  model: string;
  description: string;
}
