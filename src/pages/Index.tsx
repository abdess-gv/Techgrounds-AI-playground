
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Database, Shield, BookOpen, Play, ArrowRight, Lightbulb, Users, Award, ChevronRight, Zap, Globe, MessageSquare, Code, Sparkles, Settings, Wrench, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <SEO 
        title="Techgrounds AI-Playground - Interactive Learning Platform"
        description="Leer programmeren en workflows met onze interactieve AI-aangedreven leerplatform"
        keywords="AI, playground, learning, programming, JSON, Python, workflow"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <Hero />
        <Features />
        
        {/* AI Safety Section */}
        <div className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Shield className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-red-900 mb-4">
                AI Veiligheid & Ethische Overwegingen
              </h2>
              <p className="text-xl text-red-700 mb-8 max-w-3xl mx-auto">
                Leer hoe je AI veilig en verantwoord gebruikt. Van privacybescherming tot ethische besluitvorming.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-red-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
                  <CardTitle className="text-red-900">Privacy Detectie</CardTitle>
                  <CardDescription>
                    Herken en verwijder persoonsgegevens uit prompts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Interactieve oefeningen om privacy risico's te identificeren en aan te pakken.
                  </p>
                  <Badge variant="outline" className="text-red-700 border-red-300">3 Levels</Badge>
                </CardContent>
              </Card>
              
              <Card className="border-red-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-8 w-8 text-red-600 mb-2" />
                  <CardTitle className="text-red-900">Ethische Scenario's</CardTitle>
                  <CardDescription>
                    Navigeer door complexe ethische AI situaties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Realistische scenario's voor ethische besluitvorming.
                  </p>
                  <Badge variant="outline" className="text-red-700 border-red-300">3 Levels</Badge>
                </CardContent>
              </Card>
              
              <Card className="border-red-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Shield className="h-8 w-8 text-red-600 mb-2" />
                  <CardTitle className="text-red-900">Veilige AI Praktijken</CardTitle>
                  <CardDescription>
                    Best practices voor professioneel AI gebruik
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Richtlijnen en tools voor veilig AI gebruik in organisaties.
                  </p>
                  <Badge variant="outline" className="text-red-700 border-red-300">Expert Level</Badge>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/embed/ai-safety">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <Shield className="h-5 w-5 mr-2" />
                  Start AI Veiligheid Training
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Call to Action Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Start je leertraject vandaag
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ontdek onze interactieve leermodules en begin direct met hands-on oefeningen.
            </p>
            <Link to="/playground">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Code className="h-5 w-5 mr-2" />
                Open AI-Playground
              </Button>
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
