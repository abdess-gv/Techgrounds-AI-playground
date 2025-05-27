import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.pricing': 'Pricing',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Hero section
    'hero.title': 'AI-Powered Note Taking & Transcription',
    'hero.subtitle': 'Transform your voice into organized, searchable notes with advanced AI transcription and intelligent conversations.',
    'hero.cta': 'Start Free Trial',
    'hero.demo': 'Watch Demo',
    
    // Features
    'features.transcription.title': 'Multi-Provider Transcription',
    'features.transcription.desc': 'Choose from OpenAI Whisper, Deepgram, or AssemblyAI for the best accuracy.',
    'features.ai.title': 'AI Conversations',
    'features.ai.desc': 'Chat with your notes using ChatGPT, Grok, or Gemini.',
    'features.organization.title': 'Smart Organization',
    'features.organization.desc': 'Folders, tags, and powerful search to keep everything organized.',
    
    // Transcription
    'transcription.title': 'Audio Transcription',
    'transcription.provider': 'Provider',
    'transcription.language': 'Language',
    'transcription.tone': 'Tone Analysis',
    'transcription.format': 'Auto Format',
    'transcription.upload': 'Upload Audio File',
    'transcription.record': 'Voice Recording',
    'transcription.processing': 'Transcribing Audio',
    'transcription.save': 'Save as Note',
    
    // Languages
    'lang.auto': 'Auto-detect',
    'lang.en': 'English',
    'lang.nl': 'Dutch',
    'lang.es': 'Spanish',
    'lang.fr': 'French',
    'lang.de': 'German',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.search': 'Search',
    
    // Prompt Engineering
    'pe.title': 'Prompt Engineering Learning Platform',
    'pe.modules': 'Learning Modules',
    'pe.database': 'Prompt Database',
    'pe.frameworks': 'Frameworks',
    'pe.embed': 'Embed Exercises',
    'pe.legend.title': 'Prompt Component Legend',
    'pe.legend.context': 'Context',
    'pe.legend.task': 'Task/Instruction',
    'pe.legend.examples': 'Examples',
    'pe.legend.output': 'Output Format',
    'pe.legend.constraints': 'Constraints',
    'pe.exercise.title': 'Exercise',
    'pe.exercise.solution': 'Your Solution',
    'pe.exercise.hints': 'Hints',
    'pe.exercise.tips': 'Tips',
    'pe.exercise.resources': 'Resources',
    'pe.exercise.evaluate': 'Evaluate',
    'pe.exercise.reset': 'Reset',
    'pe.exercise.showHints': 'Show Hints',
    'pe.exercise.hideHints': 'Hide Hints',
    'pe.exercise.results': 'Results',
    'pe.exercise.criteria': 'Evaluation Criteria',
    'pe.exercise.sample': 'Sample Solution',
    'pe.exercise.placeholder': 'Write your prompt here...',
    'pe.difficulty.beginner': 'Beginner',
    'pe.difficulty.intermediate': 'Intermediate',
    'pe.difficulty.advanced': 'Advanced',
    'pe.module.foundations': 'Module 1: Foundations',
    'pe.module.techniques': 'Module 2: Advanced Techniques',
    'pe.module.applications': 'Module 3: Real-world Applications',
  },
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.pricing': 'Prijzen',
    'nav.login': 'Inloggen',
    'nav.logout': 'Uitloggen',
    
    // Hero section
    'hero.title': 'AI-Aangedreven Notities & Transcriptie',
    'hero.subtitle': 'Transformeer uw stem naar georganiseerde, doorzoekbare notities met geavanceerde AI-transcriptie en intelligente gesprekken.',
    'hero.cta': 'Start Gratis Proefperiode',
    'hero.demo': 'Bekijk Demo',
    
    // Features
    'features.transcription.title': 'Multi-Provider Transcriptie',
    'features.transcription.desc': 'Kies uit OpenAI Whisper, Deepgram of AssemblyAI voor de beste nauwkeurigheid.',
    'features.ai.title': 'AI Gesprekken',
    'features.ai.desc': 'Chat met uw notities met ChatGPT, Grok of Gemini.',
    'features.organization.title': 'Slimme Organisatie',
    'features.organization.desc': 'Mappen, tags en krachtige zoekfunctie om alles georganiseerd te houden.',
    
    // Transcription
    'transcription.title': 'Audio Transcriptie',
    'transcription.provider': 'Provider',
    'transcription.language': 'Taal',
    'transcription.tone': 'Toon Analyse',
    'transcription.format': 'Auto Formatteren',
    'transcription.upload': 'Audio Bestand Uploaden',
    'transcription.record': 'Spraakopname',
    'transcription.processing': 'Audio Transcriberen',
    'transcription.save': 'Opslaan als Notitie',
    
    // Languages
    'lang.auto': 'Automatisch detecteren',
    'lang.en': 'Engels',
    'lang.nl': 'Nederlands',
    'lang.es': 'Spaans',
    'lang.fr': 'Frans',
    'lang.de': 'Duits',
    
    // Common
    'common.loading': 'Laden...',
    'common.save': 'Opslaan',
    'common.cancel': 'Annuleren',
    'common.delete': 'Verwijderen',
    'common.edit': 'Bewerken',
    'common.search': 'Zoeken',
    
    // Prompt Engineering Dutch
    'pe.title': 'Prompt Engineering Leerplatform',
    'pe.modules': 'Leermodules',
    'pe.database': 'Prompt Database',
    'pe.frameworks': 'Frameworks',
    'pe.embed': 'Oefeningen Insluiten',
    'pe.legend.title': 'Prompt Componenten Legenda',
    'pe.legend.context': 'Context',
    'pe.legend.task': 'Taak/Instructie',
    'pe.legend.examples': 'Voorbeelden',
    'pe.legend.output': 'Uitvoerformaat',
    'pe.legend.constraints': 'Beperkingen',
    'pe.exercise.title': 'Oefening',
    'pe.exercise.solution': 'Jouw Oplossing',
    'pe.exercise.hints': 'Hints',
    'pe.exercise.tips': 'Tips',
    'pe.exercise.resources': 'Bronnen',
    'pe.exercise.evaluate': 'Evalueren',
    'pe.exercise.reset': 'Reset',
    'pe.exercise.showHints': 'Toon Hints',
    'pe.exercise.hideHints': 'Verberg Hints',
    'pe.exercise.results': 'Resultaten',
    'pe.exercise.criteria': 'Evaluatiecriteria',
    'pe.exercise.sample': 'Voorbeeldoplossing',
    'pe.exercise.placeholder': 'Schrijf hier je prompt...',
    'pe.difficulty.beginner': 'Beginner',
    'pe.difficulty.intermediate': 'Gemiddeld',
    'pe.difficulty.advanced': 'Gevorderd',
    'pe.module.foundations': 'Module 1: Fundamenten',
    'pe.module.techniques': 'Module 2: Geavanceerde Technieken',
    'pe.module.applications': 'Module 3: Praktische Toepassingen',
  },
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { profile, updateProfile } = useAuth();
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    if (profile?.language_preference) {
      setLanguageState(profile.language_preference);
    }
  }, [profile]);

  const setLanguage = async (lang: string) => {
    setLanguageState(lang);
    if (profile) {
      try {
        await updateProfile({ language_preference: lang });
      } catch (error) {
        console.error('Error updating language preference:', error);
      }
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
