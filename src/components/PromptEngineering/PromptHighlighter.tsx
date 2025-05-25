
import React from 'react';

interface PromptHighlighterProps {
  text: string;
  className?: string;
}

const PromptHighlighter: React.FC<PromptHighlighterProps> = ({ text, className = "" }) => {
  const highlightPrompt = (text: string) => {
    // Define patterns for different prompt components
    const patterns = [
      { 
        regex: /\[([A-Z_]+)\]/g, 
        className: 'bg-blue-100 text-blue-800 px-1 rounded font-semibold',
        label: 'Variable'
      },
      { 
        regex: /(Act as|You are|As a|Role:|Persona:)([^\n]*)/gi, 
        className: 'bg-purple-100 text-purple-800 px-1 rounded',
        label: 'Role Definition'
      },
      { 
        regex: /(Context:|Background:|Given:|Scenario:)([^\n]*)/gi, 
        className: 'bg-green-100 text-green-800 px-1 rounded',
        label: 'Context'
      },
      { 
        regex: /(Format:|Output:|Structure:|Return:)([^\n]*)/gi, 
        className: 'bg-orange-100 text-orange-800 px-1 rounded',
        label: 'Format Instructions'
      },
      { 
        regex: /(Example:|For instance:|E\.g\.|Sample:)([^\n]*)/gi, 
        className: 'bg-yellow-100 text-yellow-800 px-1 rounded',
        label: 'Examples'
      },
      { 
        regex: /(Step \d+:|1\.|2\.|3\.|4\.|5\.|6\.|7\.|8\.|9\.|•|\-)/g, 
        className: 'bg-indigo-100 text-indigo-800 px-1 rounded font-medium',
        label: 'Instructions'
      },
      { 
        regex: /(Tone:|Style:|Voice:)([^\n]*)/gi, 
        className: 'bg-pink-100 text-pink-800 px-1 rounded',
        label: 'Tone/Style'
      }
    ];

    let highlightedText = text;
    
    patterns.forEach(pattern => {
      highlightedText = highlightedText.replace(pattern.regex, (match) => {
        return `<span class="${pattern.className}">${match}</span>`;
      });
    });

    return highlightedText;
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: highlightPrompt(text) }}
      />
    </div>
  );
};

export default PromptHighlighter;
