
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuizEmbedGenerator from './QuizEmbedGenerator';
import ModuleEmbedGenerator from './ModuleEmbedGenerator';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleType: 'quiz' | 'prompt-engineering' | 'ai-safety' | 'frameworks' | 'database' | 'json' | 'python' | 'workflow';
}

const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose, moduleType }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Embed Code Generator</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[80vh]">
          <div className="p-4">
            {moduleType === 'quiz' ? (
              <QuizEmbedGenerator />
            ) : (
              <ModuleEmbedGenerator moduleType={moduleType} />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EmbedModal;
