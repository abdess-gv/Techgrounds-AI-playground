"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Menu, X, Shield } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Techgrounds AI-Playground</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/embed/quiz" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              AI Quiz
            </Link>
            <Link to="/embed/prompt-engineering-2" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Prompt Engineering 2.0
            </Link>
            <Link to="/embed/prompt-engineering" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Prompt Training
            </Link>
            <Link to="/embed/ai-safety" className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors font-medium">
              <Shield className="h-4 w-4" />
              <span>AI Veiligheid</span>
            </Link>
            <Link to="/playground">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
                Start Learning
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-gray-100"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/embed/quiz" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                AI Quiz
              </Link>
              <Link
                to="/embed/prompt-engineering-2"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Prompt Engineering 2.0
              </Link>
              <Link 
                to="/embed/prompt-engineering" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Prompt Training
              </Link>
              <Link 
                to="/embed/ai-safety" 
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors font-medium px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="h-4 w-4" />
                <span>AI Veiligheid</span>
              </Link>
              <Link to="/playground" onClick={() => setIsOpen(false)}>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-2 shadow-md">
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
