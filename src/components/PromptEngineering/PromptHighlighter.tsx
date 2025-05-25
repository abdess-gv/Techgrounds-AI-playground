
import React from 'react';

interface PromptHighlighterProps {
  text: string;
  className?: string;
}

const PromptHighlighter: React.FC<PromptHighlighterProps> = ({ text, className = '' }) => {
  const highlightPromptComponents = (text: string) => {
    let highlightedText = text;

    // Color coding patterns
    const patterns = [
      // Role definitions
      {
        pattern: /<role>(.*?)<\/role>/gs,
        className: 'bg-purple-100 text-purple-900 px-2 py-1 rounded border-l-4 border-purple-400',
        label: 'Role'
      },
      // Context sections
      {
        pattern: /<context>(.*?)<\/context>/gs,
        className: 'bg-blue-100 text-blue-900 px-2 py-1 rounded border-l-4 border-blue-400',
        label: 'Context'
      },
      // Task definitions
      {
        pattern: /<task>(.*?)<\/task>/gs,
        className: 'bg-green-100 text-green-900 px-2 py-1 rounded border-l-4 border-green-400',
        label: 'Task'
      },
      // Structure/Format
      {
        pattern: /<(structure|format)>(.*?)<\/(structure|format)>/gs,
        className: 'bg-orange-100 text-orange-900 px-2 py-1 rounded border-l-4 border-orange-400',
        label: 'Structure'
      },
      // Guidelines
      {
        pattern: /<guidelines>(.*?)<\/guidelines>/gs,
        className: 'bg-yellow-100 text-yellow-900 px-2 py-1 rounded border-l-4 border-yellow-400',
        label: 'Guidelines'
      },
      // Examples
      {
        pattern: /<example>(.*?)<\/example>/gs,
        className: 'bg-emerald-100 text-emerald-900 px-2 py-1 rounded border-l-4 border-emerald-400',
        label: 'Example'
      },
      // Output format
      {
        pattern: /<output-format>(.*?)<\/output-format>/gs,
        className: 'bg-pink-100 text-pink-900 px-2 py-1 rounded border-l-4 border-pink-400',
        label: 'Output Format'
      },
      // Constraints
      {
        pattern: /<constraints>(.*?)<\/constraints>/gs,
        className: 'bg-red-100 text-red-900 px-2 py-1 rounded border-l-4 border-red-400',
        label: 'Constraints'
      }
    ];

    // Apply highlighting patterns
    patterns.forEach(({ pattern, className, label }) => {
      highlightedText = highlightedText.replace(pattern, (match, content) => {
        return `<div class="mb-3"><div class="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">${label}</div><div class="${className} block">${content.trim()}</div></div>`;
      });
    });

    // Highlight **bold** text
    highlightedText = highlightedText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');

    // Highlight variables in brackets
    highlightedText = highlightedText.replace(/\[([A-Z_][A-Z0-9_]*)\]/g, '<code class="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm font-mono">[$1]</code>');

    // Highlight bullet points
    highlightedText = highlightedText.replace(/^- (.*?)$/gm, '<div class="flex items-start space-x-2 my-1"><span class="text-blue-600 font-bold">•</span><span>$1</span></div>');

    // Highlight numbered lists
    highlightedText = highlightedText.replace(/^(\d+)\. (.*?)$/gm, '<div class="flex items-start space-x-2 my-1"><span class="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">$1</span><span>$2</span></div>');

    return highlightedText;
  };

  return (
    <div 
      className={`prompt-highlighter leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: highlightPromptComponents(text) }}
    />
  );
};

export default PromptHighlighter;
