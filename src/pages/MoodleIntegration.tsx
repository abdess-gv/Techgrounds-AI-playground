
import { Helmet } from 'react-helmet-async';
import MoodleDashboard from '@/components/Moodle/MoodleDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, GraduationCap, Users, BarChart } from "lucide-react";

const MoodleIntegration = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Helmet>
          <title>Learning Management System - AI Leren</title>
          <meta name="description" content="Access your AI learning courses and track your progress" />
        </Helmet>
        
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <GraduationCap className="h-16 w-16 mx-auto text-blue-600 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Learning Management System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Toegang tot je AI cursussen en voortgang tracking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <GraduationCap className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <CardTitle>Interactieve Cursussen</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Volg gestructureerde AI cursussen met praktische oefeningen en real-world projecten
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <BarChart className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <CardTitle>Voortgang Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Real-time monitoring van je leervoortgang met gedetailleerde analytics en certificaten
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <CardTitle>Community Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Leer samen met andere AI enthousiastelingen en deel kennis in onze community
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card className="text-center">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Begin je AI leertraject vandaag
              </h3>
              <p className="text-gray-600 mb-6">
                Log in om toegang te krijgen tot je persoonlijke leeromgeving
              </p>
              <Button size="lg" className="inline-flex items-center">
                <LogIn className="h-5 w-5 mr-2" />
                Inloggen om te starten
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Mijn Cursussen - AI Leren</title>
        <meta name="description" content="Track your AI learning progress and access courses" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mijn Leeromgeving
          </h1>
          <p className="text-gray-600">
            Volg je voortgang en ga verder met je AI cursussen
          </p>
        </div>

        <MoodleDashboard />
      </div>
    </div>
  );
};

export default MoodleIntegration;
