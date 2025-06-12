
import React from 'react';
import EmbedCodeGenerator from './EmbedCodeGenerator';

const QuizEmbedGenerator = () => {
  const options = [
    {
      key: 'level',
      label: 'Niveau',
      type: 'select' as const,
      default: 'easy',
      options: [
        { value: 'easy', label: 'Makkelijk' },
        { value: 'medium', label: 'Gemiddeld' },
        { value: 'hard', label: 'Moeilijk' }
      ]
    },
    {
      key: 'compact',
      label: 'Compact Weergave',
      type: 'boolean' as const,
      default: false
    },
    {
      key: 'header',
      label: 'Toon Header',
      type: 'boolean' as const,
      default: true
    },
    {
      key: 'autostart',
      label: 'Auto Start Niveau',
      type: 'boolean' as const,
      default: false
    }
  ];

  return (
    <EmbedCodeGenerator
      moduleId="ai-terms-quiz"
      moduleName="AI-termen Quiz"
      basePath="/embed/quiz"
      options={options}
      description="Interactieve drag-and-drop quiz voor het testen van AI-kennis met drie moeilijkheidsniveaus."
    />
  );
};

export default QuizEmbedGenerator;
