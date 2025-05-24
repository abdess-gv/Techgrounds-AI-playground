
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { transcriptionId, filePath, options } = await req.json();

    // Get file from storage
    const { data: fileData } = await supabase.storage
      .from('audio-files')
      .download(filePath);

    if (!fileData) {
      throw new Error('File not found');
    }

    let transcriptionResult;
    const startTime = Date.now();

    // Choose transcription provider
    switch (options.provider) {
      case 'openai':
        transcriptionResult = await transcribeWithOpenAI(fileData, options);
        break;
      case 'deepgram':
        transcriptionResult = await transcribeWithDeepgram(fileData, options);
        break;
      case 'assemblyai':
        transcriptionResult = await transcribeWithAssemblyAI(fileData, options);
        break;
      default:
        throw new Error('Invalid transcription provider');
    }

    const processingTime = Date.now() - startTime;

    // Apply post-processing
    let finalText = transcriptionResult.text;
    if (options.autoFormat) {
      finalText = formatTranscription(finalText);
    }

    // Generate tone analysis if requested
    let toneAnalysis = null;
    if (options.toneAnalysis) {
      toneAnalysis = await analyzeTone(finalText);
    }

    return new Response(
      JSON.stringify({
        text: finalText,
        confidence: transcriptionResult.confidence,
        processingTime,
        toneAnalysis
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Transcription error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function transcribeWithOpenAI(audioFile: Blob, options: any) {
  const formData = new FormData();
  formData.append('file', audioFile);
  formData.append('model', 'whisper-1');
  if (options.language !== 'auto') {
    formData.append('language', options.language);
  }

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    text: data.text,
    confidence: 0.95 // OpenAI doesn't provide confidence scores
  };
}

async function transcribeWithDeepgram(audioFile: Blob, options: any) {
  const response = await fetch('https://api.deepgram.com/v1/listen', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${Deno.env.get('DEEPGRAM_API_KEY')}`,
      'Content-Type': audioFile.type,
    },
    body: audioFile,
  });

  if (!response.ok) {
    throw new Error(`Deepgram API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    text: data.results.channels[0].alternatives[0].transcript,
    confidence: data.results.channels[0].alternatives[0].confidence
  };
}

async function transcribeWithAssemblyAI(audioFile: Blob, options: any) {
  // First, upload the file
  const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
    method: 'POST',
    headers: {
      'authorization': Deno.env.get('ASSEMBLYAI_API_KEY') || '',
    },
    body: audioFile,
  });

  const uploadData = await uploadResponse.json();
  const audioUrl = uploadData.upload_url;

  // Then, request transcription
  const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
    method: 'POST',
    headers: {
      'authorization': Deno.env.get('ASSEMBLYAI_API_KEY') || '',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      audio_url: audioUrl,
      language_code: options.language !== 'auto' ? options.language : undefined,
      speaker_labels: options.speakerDiarization,
      auto_highlights: true,
    }),
  });

  const transcriptData = await transcriptResponse.json();
  const transcriptId = transcriptData.id;

  // Poll for completion
  let transcript;
  do {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const pollResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
      headers: {
        'authorization': Deno.env.get('ASSEMBLYAI_API_KEY') || '',
      },
    });
    transcript = await pollResponse.json();
  } while (transcript.status === 'processing' || transcript.status === 'queued');

  if (transcript.status === 'error') {
    throw new Error(`AssemblyAI error: ${transcript.error}`);
  }

  return {
    text: transcript.text,
    confidence: transcript.confidence
  };
}

function formatTranscription(text: string): string {
  // Basic formatting: capitalize sentences, add punctuation
  return text
    .split('. ')
    .map(sentence => {
      sentence = sentence.trim();
      if (sentence.length > 0) {
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        if (!sentence.endsWith('.') && !sentence.endsWith('!') && !sentence.endsWith('?')) {
          sentence += '.';
        }
      }
      return sentence;
    })
    .join(' ');
}

async function analyzeTone(text: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `Analyze the tone of this text and return a JSON object with sentiment (positive/negative/neutral), emotion (happy/sad/angry/excited/calm/etc), and confidence (0-1): "${text}"`
        }],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Tone analysis error:', error);
    return null;
  }
}
