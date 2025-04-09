
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';
import { generateLesson, LessonRequest, LessonResponse } from '@/services/openai';

interface LessonFormProps {
  onGenerateLesson: (lessonData: LessonResponse, request: LessonRequest) => void;
  initialValues?: LessonRequest | null;
}

const LessonForm = ({ onGenerateLesson, initialValues }: LessonFormProps) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('beginner');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Set initial values if provided (for regeneration)
  useEffect(() => {
    if (initialValues) {
      setTopic(initialValues.topic);
      setLevel(initialValues.level);
      setDescription(initialValues.description || '');
      
      // Trigger form submission automatically for regeneration
      const submitForm = async () => {
        // Create a synthetic FormEvent instead of using a raw Event
        const syntheticEvent = {
          preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>;
        
        await handleSubmit(syntheticEvent);
      };
      
      submitForm();
    }
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!topic) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your lesson.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const request: LessonRequest = {
        topic,
        level,
        description: description || undefined
      };
      
      // Call the OpenAI API service
      const generatedLesson = await generateLesson(request);
      
      onGenerateLesson(generatedLesson, request);
      
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

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
              Lesson Topic <span className="text-red-500">*</span>
            </label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Introduction to JavaScript, Climate Change, Renaissance Art"
              className="input-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
              Course Level
            </label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="input-primary">
                <SelectValue placeholder="Select course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Additional Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any specific details or requirements for your lesson (optional)"
              className="input-primary min-h-[100px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-coursegpt-orange hover:bg-coursegpt-orange/90 text-white"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Generating Lesson...
              </>
            ) : (
              "Generate Lesson"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LessonForm;
