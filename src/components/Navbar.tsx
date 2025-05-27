
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Menu, X, Globe } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">NoteAI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <div className="relative group">
              <span className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer flex items-center">
                Learn Prompting
                <Globe className="h-4 w-4 ml-1" />
              </span>
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/prompt-engineering" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                  🇺🇸 English Version
                </Link>
                <Link to="/prompt-engineering/nl" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                  🇳🇱 Nederlandse Versie
                </Link>
              </div>
            </div>
            <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
            <Link to="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <Link to="/prompt-engineering" className="text-gray-600 hover:text-gray-900 transition-colors">🇺🇸 Learn Prompting (EN)</Link>
              <Link to="/prompt-engineering/nl" className="text-gray-600 hover:text-gray-900 transition-colors">🇳🇱 Leer Prompting (NL)</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
              <Link to="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
