
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface TranscriptionOptions {
  provider: 'openai' | 'deepgram' | 'assemblyai';
  language: string;
  toneAnalysis: boolean;
  autoFormat: boolean;
  speakerDiarization?: boolean;
  customVocabulary?: string[];
  confidenceThreshold?: number;
}

export const useTranscription = () => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const { user } = useAuth();

  const transcribeAudio = async (
    file: File,
    options: TranscriptionOptions
  ): Promise<string> => {
    if (!user) throw new Error('User not authenticated');
    
    setIsTranscribing(true);
    
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('audio-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create transcription record
      const { data: transcriptionData, error: transcriptionError } = await supabase
        .from('transcriptions')
        .insert({
          user_id: user.id,
          provider: options.provider,
          language: options.language,
          original_filename: file.name,
          file_url: uploadData.path,
          status: 'processing'
        })
        .select()
        .single();

      if (transcriptionError) throw transcriptionError;

      // Call transcription edge function
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: {
          transcriptionId: transcriptionData.id,
          filePath: uploadData.path,
          options
        }
      });

      if (error) throw error;

      // Update transcription with results
      await supabase
        .from('transcriptions')
        .update({
          transcription_text: data.text,
          confidence_score: data.confidence,
          processing_time_ms: data.processingTime,
          tone_analysis: data.toneAnalysis,
          status: 'completed'
        })
        .eq('id', transcriptionData.id);

      return data.text;
    } catch (error: any) {
      console.error('Transcription error:', error);
      toast.error(`Transcription failed: ${error.message}`);
      throw error;
    } finally {
      setIsTranscribing(false);
    }
  };

  return {
    transcribeAudio,
    isTranscribing
  };
};
