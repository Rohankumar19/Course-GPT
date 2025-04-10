
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';
import { LessonGenerateRequest } from '@/types/course';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';

interface LessonFormProps {
  onGenerateLesson: (request: LessonGenerateRequest) => void;
  isGenerating: boolean;
}

const LessonForm = ({ onGenerateLesson, isGenerating }: LessonFormProps) => {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('Beginners');
  const [difficultyLevel, setDifficultyLevel] = useState('Beginner');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  // Check if we have a courseId from the URL query
  useEffect(() => {
    const courseId = searchParams.get('courseId');
    if (courseId) {
      // In a real app, we could fetch course details here and pre-populate the form
      console.log('Course ID from URL:', courseId);
    }
  }, [searchParams]);

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
    
    try {
      const request: LessonGenerateRequest = {
        topic,
        targetAudience,
        difficultyLevel,
        additionalInfo: additionalInfo || undefined
      };
      
      onGenerateLesson(request);
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "There was an error. Please try again.",
        variant: "destructive",
      });
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
              placeholder="e.g., Introduction to Neural Networks"
              className="input-primary"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
                Target Audience
              </label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger className="input-primary">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginners">Beginners</SelectItem>
                  <SelectItem value="Intermediate Students">Intermediate Students</SelectItem>
                  <SelectItem value="Advanced Learners">Advanced Learners</SelectItem>
                  <SelectItem value="Professionals">Professionals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                <SelectTrigger className="input-primary">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
              Additional Information (Optional)
            </label>
            <Textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Add any specific requirements, teaching style preferences, or key points to include"
              className="input-primary min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setTopic('');
                setTargetAudience('Beginners');
                setDifficultyLevel('Beginner');
                setAdditionalInfo('');
              }}
              disabled={isGenerating}
            >
              Clear
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Content"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LessonForm;
