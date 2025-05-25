
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Code, Database, ExternalLink, GraduationCap, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnhancedPromptDatabase from "@/components/PromptEngineering/EnhancedPromptDatabase";
import ComprehensiveExercisePlayer from "@/components/PromptEngineering/ComprehensiveExercisePlayer";
import FrameworkLibrary from "@/components/PromptEngineering/FrameworkLibrary";
import LearningPath from "@/components/PromptEngineering/LearningPath";

const PromptEngineering = () => {
  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Helmet>
        <title>Prompt Engineering Academy | Learn AI Prompting, RAG & Fine-tuning</title>
        <meta name="description" content="Master prompt engineering, RAG, and LLM fine-tuning with interactive exercises, frameworks, and a comprehensive prompt database for all skill levels." />
      </Helmet>
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Brain className="h-12 w-12 text-purple-600" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Prompt Engineering Academy
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Master the art and science of AI prompting, RAG systems, and LLM fine-tuning with hands-on exercises, color-coded prompts, and real-world applications.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2 bg-purple-100 text-purple-800">
              <Users className="h-4 w-4 mr-2" />
              Beginner to Expert
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 bg-blue-100 text-blue-800">
              <Code className="h-4 w-4 mr-2" />
              Interactive Exercises
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 bg-green-100 text-green-800">
              <Database className="h-4 w-4 mr-2" />
              Color-Coded Prompts
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 bg-orange-100 text-orange-800">
              <GraduationCap className="h-4 w-4 mr-2" />
              Certification Ready
            </Badge>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="learning" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white shadow-sm">
            <TabsTrigger value="learning" className="flex items-center space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              <GraduationCap className="h-4 w-4" />
              <span>Learning Paths</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              <Zap className="h-4 w-4" />
              <span>Exercises</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center space-x-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              <Database className="h-4 w-4" />
              <span>Prompt Database</span>
            </TabsTrigger>
            <TabsTrigger value="frameworks" className="flex items-center space-x-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800">
              <BookOpen className="h-4 w-4" />
              <span>Frameworks</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800">
              <ExternalLink className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning">
            <LearningPath selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} />
          </TabsContent>

          <TabsContent value="exercises">
            <ComprehensiveExercisePlayer level={selectedLevel} />
          </TabsContent>

          <TabsContent value="database">
            <EnhancedPromptDatabase />
          </TabsContent>

          <TabsContent value="frameworks">
            <FrameworkLibrary />
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Research Papers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span>Research Papers</span>
                  </CardTitle>
                  <CardDescription>Latest research in prompt engineering and LLMs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="https://arxiv.org/abs/2005.14165" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">Language Models are Few-Shot Learners</h4>
                    <p className="text-xs text-gray-600 mt-1">GPT-3 paper introducing in-context learning</p>
                  </a>
                  <a href="https://arxiv.org/abs/2201.11903" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">Chain-of-Thought Prompting</h4>
                    <p className="text-xs text-gray-600 mt-1">Enhancing reasoning in large language models</p>
                  </a>
                  <a href="https://arxiv.org/abs/2312.10997" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">Retrieval-Augmented Generation</h4>
                    <p className="text-xs text-gray-600 mt-1">RAG systems and implementation strategies</p>
                  </a>
                </CardContent>
              </Card>

              {/* Online Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                    <span>Online Courses</span>
                  </CardTitle>
                  <CardDescription>Comprehensive courses and certifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="https://www.deeplearning.ai/short-courses/" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">DeepLearning.AI Courses</h4>
                    <p className="text-xs text-gray-600 mt-1">Prompt engineering and LLM courses</p>
                  </a>
                  <a href="https://www.coursera.org/specializations/prompt-engineering" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">Coursera Specialization</h4>
                    <p className="text-xs text-gray-600 mt-1">Complete prompt engineering specialization</p>
                  </a>
                  <a href="https://learn.microsoft.com/en-us/azure/ai-services/openai/" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">Microsoft Learn</h4>
                    <p className="text-xs text-gray-600 mt-1">Azure OpenAI and prompt engineering</p>
                  </a>
                </CardContent>
              </Card>

              {/* Tools & Platforms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="h-5 w-5 text-purple-600" />
                    <span>Tools & Platforms</span>
                  </CardTitle>
                  <CardDescription>Essential tools for prompt engineering</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="https://platform.openai.com/playground" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">OpenAI Playground</h4>
                    <p className="text-xs text-gray-600 mt-1">Interactive prompt testing environment</p>
                  </a>
                  <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">Hugging Face</h4>
                    <p className="text-xs text-gray-600 mt-1">Open source models and datasets</p>
                  </a>
                  <a href="https://langchain.com/" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">LangChain</h4>
                    <p className="text-xs text-gray-600 mt-1">Framework for LLM applications</p>
                  </a>
                </CardContent>
              </Card>

              {/* Communities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    <span>Communities</span>
                  </CardTitle>
                  <CardDescription>Join the prompt engineering community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="https://discord.gg/promptengineering" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">Discord Community</h4>
                    <p className="text-xs text-gray-600 mt-1">Real-time discussions and help</p>
                  </a>
                  <a href="https://www.reddit.com/r/PromptEngineering/" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">Reddit Community</h4>
                    <p className="text-xs text-gray-600 mt-1">Share prompts and techniques</p>
                  </a>
                  <a href="https://github.com/topics/prompt-engineering" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">GitHub Projects</h4>
                    <p className="text-xs text-gray-600 mt-1">Open source prompt engineering tools</p>
                  </a>
                </CardContent>
              </Card>

              {/* Blogs & News */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ExternalLink className="h-5 w-5 text-red-600" />
                    <span>Blogs & News</span>
                  </CardTitle>
                  <CardDescription>Stay updated with latest developments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">Lilian Weng's Blog</h4>
                    <p className="text-xs text-gray-600 mt-1">Deep dives into AI research</p>
                  </a>
                  <a href="https://www.anthropic.com/research" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">Anthropic Research</h4>
                    <p className="text-xs text-gray-600 mt-1">Constitutional AI and safety research</p>
                  </a>
                  <a href="https://openai.com/research" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-sm">OpenAI Research</h4>
                    <p className="text-xs text-gray-600 mt-1">Latest AI model developments</p>
                  </a>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                    <span>Certifications</span>
                  </CardTitle>
                  <CardDescription>Validate your prompt engineering skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <span className="text-sm">Prompt Engineering Fundamentals</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="text-sm">Advanced Prompting Techniques</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="text-sm">RAG Systems Specialist</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="text-sm">LLM Fine-tuning Expert</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default PromptEngineering;
