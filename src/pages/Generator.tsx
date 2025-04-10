
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import LessonForm from '@/components/generator/LessonForm';
import LessonPreview from '@/components/generator/LessonPreview';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Lesson, LessonGenerateRequest } from '@/types/course';
import { generateLesson } from '@/services/openai';

const Generator = () => {
  const [activeTab, setActiveTab] = useState<string>("prompt");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<LessonGenerateRequest | null>(null);
  const [generatedLesson, setGeneratedLesson] = useState<Lesson | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Get courseId from URL if it exists
  const courseId = searchParams.get('courseId');

  const handleGenerateLesson = async (request: LessonGenerateRequest) => {
    setCurrentRequest(request);
    setIsGenerating(true);
    
    try {
      const lessonData = await generateLesson(request);
      setGeneratedLesson(lessonData);
      setActiveTab("review");
      
      toast({
        title: "Lesson Generated",
        description: "Your lesson has been generated successfully!",
      });
    } catch (error) {
      console.error('Error generating lesson:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "There was an error generating your lesson. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveLesson = () => {
    toast({
      title: "Lesson Saved",
      description: "Your lesson has been saved successfully!",
    });
    
    // Navigate back to course view if we came from there
    if (courseId) {
      navigate(`/course/${courseId}`);
    } else {
      navigate('/dashboard');
    }
  };

  const handleUpdateLesson = (updatedLesson: Lesson) => {
    setGeneratedLesson(updatedLesson);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2">
              AI Lesson Generator
            </h1>
            <p className="text-gray-600 text-center">
              Generate a new lesson with AI assistance
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="prompt" disabled={isGenerating}>1. Prompt</TabsTrigger>
              <TabsTrigger value="review" disabled={!generatedLesson}>2. Review & Edit</TabsTrigger>
            </TabsList>
            
            <TabsContent value="prompt" className="mt-0">
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Define Your Lesson</h2>
                  <p className="text-gray-600">
                    Provide details about the lesson you want to create
                  </p>
                </div>
                <LessonForm onGenerateLesson={handleGenerateLesson} isGenerating={isGenerating} />
              </Card>
            </TabsContent>
            
            <TabsContent value="review" className="mt-0">
              {generatedLesson && currentRequest && (
                <LessonPreview 
                  lesson={generatedLesson}
                  generateRequest={currentRequest}
                  onSave={handleSaveLesson}
                  onUpdateLesson={handleUpdateLesson}
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
