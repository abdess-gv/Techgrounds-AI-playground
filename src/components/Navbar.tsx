
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Techgrounds AI-Playground</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/playground" className="text-gray-600 hover:text-gray-900 transition-colors">
              AI-Playground
            </Link>
            <Link to="/embed/quiz" className="text-gray-600 hover:text-gray-900 transition-colors">
              AI Quiz
            </Link>
            <Link to="/embed/prompt-engineering" className="text-gray-600 hover:text-gray-900 transition-colors">
              Prompt Training
            </Link>
            <Link to="/playground">
              <Button className="bg-blue-600 hover:bg-blue-700">Start Learning</Button>
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
              <Link to="/playground" className="text-gray-600 hover:text-gray-900 transition-colors">
                AI-Playground
              </Link>
              <Link to="/embed/quiz" className="text-gray-600 hover:text-gray-900 transition-colors">
                AI Quiz
              </Link>
              <Link to="/embed/prompt-engineering" className="text-gray-600 hover:text-gray-900 transition-colors">
                Prompt Training
              </Link>
              <Link to="/playground">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">Start Learning</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
