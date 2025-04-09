
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import LessonForm from '@/components/generator/LessonForm';
import LessonDisplay from '@/components/generator/LessonDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/card';

const Generator = () => {
  const [generatedLesson, setGeneratedLesson] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("form");

  const handleGenerateLesson = (lessonData: any) => {
    setGeneratedLesson(lessonData);
    setActiveTab("preview");
  };

  const handleRegenerateRequest = () => {
    // In a real app, this would regenerate the content
    // For demo, we'll just switch back to the form
    setActiveTab("form");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-coursegpt-blue mb-4">
              AI Lesson Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your ideas into comprehensive lesson plans in seconds. Enter your topic, select the course level, and let our AI create a structured lesson for you.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="form">Create Lesson</TabsTrigger>
              <TabsTrigger value="preview" disabled={!generatedLesson}>Preview Lesson</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="mt-0">
              <LessonForm onGenerateLesson={handleGenerateLesson} />
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              {generatedLesson && (
                <LessonDisplay 
                  lessonData={generatedLesson} 
                  onRegenerateRequest={handleRegenerateRequest}
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
