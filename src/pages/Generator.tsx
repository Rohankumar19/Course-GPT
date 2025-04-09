
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import LessonForm from '@/components/generator/LessonForm';
import LessonDisplay from '@/components/generator/LessonDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateLesson } from '@/services/openai';
import { useToast } from '@/hooks/use-toast';
import { LessonRequest } from '@/services/openai';

const Generator = () => {
  const [generatedLesson, setGeneratedLesson] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("form");
  const [lastRequest, setLastRequest] = useState<LessonRequest | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateLesson = (lessonData: any) => {
    setGeneratedLesson(lessonData);
    setActiveTab("preview");
  };

  const handleRegenerateRequest = async () => {
    if (!lastRequest) {
      toast({
        title: "Cannot Regenerate",
        description: "No previous request found. Please create a new lesson.",
        variant: "destructive",
      });
      return;
    }

    setIsRegenerating(true);
    
    try {
      const regeneratedLesson = await generateLesson(lastRequest);
      setGeneratedLesson(regeneratedLesson);
      
      toast({
        title: "Lesson Regenerated",
        description: "Your lesson has been regenerated successfully!",
      });
    } catch (error) {
      console.error('Error regenerating lesson:', error);
      toast({
        title: "Regeneration Failed",
        description: "There was an error regenerating your lesson. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const storeRequestAndGenerate = (request: LessonRequest, lessonData: any) => {
    setLastRequest(request);
    handleGenerateLesson(lessonData);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-coursegpt-blue dark:text-white mb-4">
              AI Lesson Generator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transform your ideas into comprehensive lesson plans in seconds. Enter your topic, select the course level, and let our AI create a structured lesson for you.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="form">Create Lesson</TabsTrigger>
              <TabsTrigger value="preview" disabled={!generatedLesson}>Preview Lesson</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="mt-0">
              <LessonForm 
                onGenerateLesson={(lessonData) => {
                  const request = {
                    topic: lessonData.title.split(" for ")[0] || "Unknown Topic",
                    level: lessonData.title.includes("Beginner") ? "beginner" : 
                           lessonData.title.includes("Intermediate") ? "intermediate" : "advanced",
                    description: lessonData.description
                  };
                  storeRequestAndGenerate(request, lessonData);
                }} 
              />
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              {generatedLesson && (
                <LessonDisplay 
                  lessonData={generatedLesson} 
                  onRegenerateRequest={handleRegenerateRequest}
                  isRegenerating={isRegenerating}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Generator;
