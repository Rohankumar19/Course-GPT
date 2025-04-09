
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';

interface LessonFormProps {
  onGenerateLesson: (lessonData: any) => void;
}

const LessonForm = ({ onGenerateLesson }: LessonFormProps) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('beginner');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
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
      // This is a placeholder for the real API call to OpenAI
      // In a production app, this would be a fetch call to your backend
      // which would then call the OpenAI API
      
      // Simulate API delay
      setTimeout(() => {
        // Generate a lesson based on the form data
        const generatedLesson = {
          title: `${topic} for ${level.charAt(0).toUpperCase() + level.slice(1)}s`,
          description: description || `A comprehensive lesson about ${topic} for ${level} students.`,
          learningOutcomes: [
            `Understand the core concepts of ${topic}`,
            `Apply ${topic} principles in real-world scenarios`,
            `Analyze the impact of ${topic} in the broader context`,
            `Evaluate different approaches to ${topic}`
          ],
          keyConcepts: [
            `Introduction to ${topic}`,
            `History and evolution of ${topic}`,
            `Core principles of ${topic}`,
            `Advanced techniques in ${topic}`,
            `Future trends in ${topic}`
          ],
          activities: [
            `Group discussion: The importance of ${topic}`,
            `Case study analysis: ${topic} in action`,
            `Interactive exercise: Applying ${topic} principles`,
            `Quiz: Test your knowledge of ${topic}`
          ]
        };
        
        onGenerateLesson(generatedLesson);
        setIsGenerating(false);
        
        toast({
          title: "Lesson Generated",
          description: "Your lesson has been generated successfully!",
        });
      }, 3000);
    } catch (error) {
      console.error('Error generating lesson:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your lesson. Please try again.",
        variant: "destructive",
      });
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
