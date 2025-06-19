
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import RosterEmbedGenerator from '@/components/EmbedGenerator/RosterEmbedGenerator';

const RosterEmbedGeneratorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Rooster Embed Generator</h1>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Genereer Embed Code voor Roosters
          </h2>
          <p className="text-gray-600">
            Maak een embed code voor programma roosters die je kunt gebruiken op andere websites.
          </p>
        </div>
        
        <RosterEmbedGenerator />
      </div>
    </div>
  );
};

export default RosterEmbedGeneratorPage;
