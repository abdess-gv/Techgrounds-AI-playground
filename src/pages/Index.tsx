
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Database, Shield, BookOpen, Play, ArrowRight, Lightbulb, Users, Award, ChevronRight, Zap, Globe, MessageSquare, Code, Sparkles, Settings, Wrench } from 'lucide-react';
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
