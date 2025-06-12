
import React from 'react';
import EmbedCodeGenerator from './EmbedCodeGenerator';

interface ModuleEmbedGeneratorProps {
  moduleType: 'prompt-engineering' | 'ai-safety' | 'frameworks' | 'database' | 'json' | 'python' | 'workflow';
}

const ModuleEmbedGenerator: React.FC<ModuleEmbedGeneratorProps> = ({ moduleType }) => {
  const getModuleConfig = () => {
    switch (moduleType) {
      case 'prompt-engineering':
        return {
          id: 'prompt-engineering',
          name: 'Prompt Engineering',
          path: '/embed/prompt-engineering',
          description: 'Leer effectieve prompts schrijven voor AI-systemen met interactieve oefeningen.',
          options: [
            { key: 'compact', label: 'Compact Weergave', type: 'boolean' as const, default: false },
            { key: 'header', label: 'Toon Header', type: 'boolean' as const, default: true },
            { key: 'legend', label: 'Toon Legenda', type: 'boolean' as const, default: true },
            { key: 'level', label: 'Start Niveau', type: 'select' as const, default: 'beginner', options: [
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' }
            ]}
          ]
        };
      
      case 'ai-safety':
        return {
          id: 'ai-safety',
          name: 'AI Veiligheid',
          path: '/embed/ai-safety',
          description: 'Leer over veilig en verantwoord gebruik van AI-systemen.',
          options: [
            { key: 'compact', label: 'Compact Weergave', type: 'boolean' as const, default: false },
            { key: 'header', label: 'Toon Header', type: 'boolean' as const, default: true },
            { key: 'legend', label: 'Toon Legenda', type: 'boolean' as const, default: true }
          ]
        };
      
      case 'frameworks':
        return {
          id: 'frameworks',
          name: 'AI Frameworks',
          path: '/embed/frameworks',
          description: 'Ontdek bewezen frameworks voor effectieve prompt constructie.',
          options: [
            { key: 'compact', label: 'Compact Weergave', type: 'boolean' as const, default: false },
            { key: 'header', label: 'Toon Header', type: 'boolean' as const, default: true },
            { key: 'legend', label: 'Toon Legenda', type: 'boolean' as const, default: true },
            { key: 'category', label: 'Categorie', type: 'select' as const, default: 'all', options: [
              { value: 'all', label: 'Alle' },
              { value: 'star', label: 'STAR' },
              { value: 'race', label: 'RACE' },
              { value: 'smart', label: 'SMART' }
            ]}
          ]
        };
      
      case 'database':
        return {
          id: 'database',
          name: 'Prompt Database',
          path: '/embed/database',
          description: 'Doorzoekbare database met geteste prompts en templates.',
          options: [
            { key: 'compact', label: 'Compact Weergave', type: 'boolean' as const, default: false },
            { key: 'header', label: 'Toon Header', type: 'boolean' as const, default: true },
            { key: 'legend', label: 'Toon Legenda', type: 'boolean' as const, default: true },
            { key: 'search', label: 'Toon Zoekfunctie', type: 'boolean' as const, default: true },
            { key: 'category', label: 'Categorie', type: 'select' as const, default: 'all', options: [
              { value: 'all', label: 'Alle' },
              { value: 'creative', label: 'Creatief' },
              { value: 'business', label: 'Business' },
              { value: 'technical', label: 'Technisch' }
            ]},
            { key: 'difficulty', label: 'Moeilijkheid', type: 'select' as const, default: 'all', options: [
              { value: 'all', label: 'Alle' },
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' }
            ]}
          ]
        };
      
      default:
        return {
          id: moduleType,
          name: moduleType.charAt(0).toUpperCase() + moduleType.slice(1),
          path: `/embed/${moduleType}`,
          description: `Leer ${moduleType} met interactieve oefeningen.`,
          options: [
            { key: 'compact', label: 'Compact Weergave', type: 'boolean' as const, default: false },
            { key: 'header', label: 'Toon Header', type: 'boolean' as const, default: true }
          ]
        };
    }
  };

  const config = getModuleConfig();

  return (
    <EmbedCodeGenerator
      moduleId={config.id}
      moduleName={config.name}
      basePath={config.path}
      options={config.options}
      description={config.description}
    />
  );
};

export default ModuleEmbedGenerator;
