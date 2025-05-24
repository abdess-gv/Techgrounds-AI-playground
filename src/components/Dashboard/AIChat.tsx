
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, Bot, User, Zap, Brain, 
  Sparkles, MessageSquare 
} from "lucide-react";
import { Note } from "@/types/Note";

interface AIChatProps {
  notes: Note[];
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

const AIChat = ({ notes }: AIChatProps) => {
  const [selectedModel, setSelectedModel] = useState('openai');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI assistant. I can help you with your notes, answer questions about your content, and provide insights. What would you like to know?",
      timestamp: new Date(),
      model: 'openai'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const aiModels = [
    {
      id: 'openai',
      name: 'ChatGPT',
      model: 'GPT-4',
      description: 'Most versatile, great for analysis and writing',
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: 'grok',
      name: 'Grok',
      model: 'Grok-2',
      description: 'Real-time data access, witty responses',
      icon: <Sparkles className="h-4 w-4" />
    },
    {
      id: 'gemini',
      name: 'Gemini',
      model: 'Gemini Pro',
      description: 'Excellent reasoning, multimodal capabilities',
      icon: <Brain className="h-4 w-4" />
    }
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const selectedModelInfo = aiModels.find(m => m.id === selectedModel);
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about "${message}". Based on your ${notes.length} notes, I can provide insights and analysis. This is a demo response from ${selectedModelInfo?.name}. In a real implementation, I would analyze your actual notes and provide relevant information, summaries, or answer specific questions about your content.`,
        timestamp: new Date(),
        model: selectedModel
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
            <p className="text-sm text-gray-600">
              Chat with your notes using AI • {notes.length} notes available
            </p>
          </div>
          
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {aiModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center space-x-2">
                    {model.icon}
                    <span>{model.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {model.model}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <Card className={`max-w-lg ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border-gray-200'
              }`}>
                <CardContent className="p-4">
                  <p className={`text-sm ${
                    msg.role === 'user' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {msg.content}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${
                      msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                    {msg.model && (
                      <Badge variant="secondary" className="text-xs">
                        {aiModels.find(m => m.id === msg.model)?.name}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {msg.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-100">
                    <User className="h-4 w-4 text-gray-600" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100">
                  <Bot className="h-4 w-4 text-blue-600" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your notes, request summaries, or get insights..."
                className="pr-12"
                disabled={isLoading}
              />
              <MessageSquare className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>Powered by {aiModels.find(m => m.id === selectedModel)?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
