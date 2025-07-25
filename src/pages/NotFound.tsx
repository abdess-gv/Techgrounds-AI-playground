
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Pagina Niet Gevonden</h2>
        <p className="text-gray-600 mb-6">
          Sorry, we konden de pagina die je zoekt niet vinden.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Route: <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code>
        </p>
        <div className="space-y-3">
          <Link to="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Terug naar Home
            </Button>
          </Link>
          <Link to="/playground">
            <Button variant="outline" className="w-full">
              AI-Playground
            </Button>
          </Link>
          
          {/* Programming */}
          <div className="text-left">
            <h4 className="font-semibold text-gray-700 mb-2">🚀 Programmeer Training:</h4>
            <div className="space-y-2">
              <Link to="/embed/json">
                <Button variant="outline" size="sm" className="w-full">JSON Leren</Button>
              </Link>
              <Link to="/embed/python">
                <Button variant="outline" size="sm" className="w-full">Python Leren</Button>
              </Link>
              <Link to="/embed/workflow">
                <Button variant="outline" size="sm" className="w-full">Workflow Designer</Button>
              </Link>
            </div>
          </div>

          {/* AI Training */}
          <div className="text-left">
            <h4 className="font-semibold text-gray-700 mb-2">🤖 AI Training:</h4>
            <div className="space-y-2">
              <Link to="/embed/prompt-engineering">
                <Button variant="outline" size="sm" className="w-full">Prompt Engineering</Button>
              </Link>
              <Link to="/embed/ai-safety">
                <Button variant="outline" size="sm" className="w-full">AI Veiligheid</Button>
              </Link>
              <Link to="/embed/frameworks">
                <Button variant="outline" size="sm" className="w-full">AI Frameworks</Button>
              </Link>
              <Link to="/embed/database">
                <Button variant="outline" size="sm" className="w-full">Prompt Database</Button>
              </Link>
            </div>
          </div>

          {/* Quiz */}
          <div className="text-left">
            <h4 className="font-semibold text-gray-700 mb-2">🎯 Quiz:</h4>
            <Link to="/embed/quiz">
              <Button variant="outline" size="sm" className="w-full">AI-termen Quiz</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
