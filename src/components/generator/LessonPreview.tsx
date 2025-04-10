
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Plus, Trash2 } from 'lucide-react';
import { Lesson, Assessment, LessonActivity, LessonGenerateRequest } from '@/types/course';
import { useToast } from '@/hooks/use-toast';
import { regenerateSection } from '@/services/openai';

interface LessonPreviewProps {
  lesson: Lesson;
  generateRequest: LessonGenerateRequest;
  onSave: () => void;
  onUpdateLesson: (updatedLesson: Lesson) => void;
}

const LessonPreview = ({ lesson, generateRequest, onSave, onUpdateLesson }: LessonPreviewProps) => {
  const { toast } = useToast();
  const [isRegenerating, setIsRegenerating] = useState<Record<string, boolean>>({});

  const handleTitleChange = (value: string) => {
    onUpdateLesson({ ...lesson, title: value });
  };

  const handleDescriptionChange = (value: string) => {
    onUpdateLesson({ ...lesson, description: value });
  };

  const handleOutcomeChange = (index: number, value: string) => {
    const updatedOutcomes = [...lesson.learningOutcomes];
    updatedOutcomes[index] = value;
    onUpdateLesson({ ...lesson, learningOutcomes: updatedOutcomes });
  };

  const handleAddOutcome = () => {
    onUpdateLesson({ 
      ...lesson, 
      learningOutcomes: [...lesson.learningOutcomes, "New learning outcome"] 
    });
  };

  const handleRemoveOutcome = (index: number) => {
    const updatedOutcomes = [...lesson.learningOutcomes];
    updatedOutcomes.splice(index, 1);
    onUpdateLesson({ ...lesson, learningOutcomes: updatedOutcomes });
  };

  const handleConceptChange = (index: number, value: string) => {
    const updatedConcepts = [...lesson.keyConcepts];
    updatedConcepts[index] = value;
    onUpdateLesson({ ...lesson, keyConcepts: updatedConcepts });
  };

  const handleAddConcept = () => {
    onUpdateLesson({ 
      ...lesson, 
      keyConcepts: [...lesson.keyConcepts, "New concept"] 
    });
  };

  const handleRemoveConcept = (index: number) => {
    const updatedConcepts = [...lesson.keyConcepts];
    updatedConcepts.splice(index, 1);
    onUpdateLesson({ ...lesson, keyConcepts: updatedConcepts });
  };

  const handleActivityChange = (index: number, field: keyof LessonActivity, value: any) => {
    const updatedActivities = [...lesson.activities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: value
    };
    onUpdateLesson({ ...lesson, activities: updatedActivities });
  };

  const handleAssessmentChange = (index: number, field: keyof Assessment, value: any) => {
    const updatedAssessments = [...lesson.assessments];
    updatedAssessments[index] = {
      ...updatedAssessments[index],
      [field]: value
    };
    onUpdateLesson({ ...lesson, assessments: updatedAssessments });
  };

  const handleRegenerateSection = async (section: 'title' | 'description' | 'learningOutcomes' | 'keyConcepts' | 'activities' | 'assessments') => {
    setIsRegenerating({ ...isRegenerating, [section]: true });
    
    try {
      let result;
      
      switch(section) {
        case 'title':
          result = await regenerateSection(generateRequest, section, lesson.title);
          onUpdateLesson({ ...lesson, title: result });
          break;
        case 'description':
          result = await regenerateSection(generateRequest, section, lesson.description);
          onUpdateLesson({ ...lesson, description: result });
          break;
        case 'learningOutcomes':
          result = await regenerateSection(generateRequest, section, lesson.learningOutcomes);
          onUpdateLesson({ ...lesson, learningOutcomes: result });
          break;
        case 'keyConcepts':
          result = await regenerateSection(generateRequest, section, lesson.keyConcepts);
          onUpdateLesson({ ...lesson, keyConcepts: result });
          break;
        case 'activities':
          result = await regenerateSection(generateRequest, section, lesson.activities);
          onUpdateLesson({ ...lesson, activities: result });
          break;
        case 'assessments':
          result = await regenerateSection(generateRequest, section, lesson.assessments);
          onUpdateLesson({ ...lesson, assessments: result });
          break;
      }
      
      toast({
        title: "Content Regenerated",
        description: `The ${section} has been successfully regenerated.`,
      });
    } catch (error) {
      toast({
        title: "Regeneration Failed",
        description: error instanceof Error ? error.message : "Failed to regenerate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating({ ...isRegenerating, [section]: false });
    }
  };

  return (
    <div className="space-y-6">
      {/* Lesson Information */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Lesson Information</CardTitle>
              <CardDescription>Review and edit the main lesson content</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleRegenerateSection('title')}
              disabled={isRegenerating['title']}
              className="text-blue-600"
            >
              <RotateCcw size={14} className={`mr-1 ${isRegenerating['title'] ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input 
              value={lesson.title} 
              onChange={(e) => handleTitleChange(e.target.value)} 
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Description</label>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleRegenerateSection('description')}
                disabled={isRegenerating['description']}
                className="text-blue-600"
              >
                <RotateCcw size={14} className={`mr-1 ${isRegenerating['description'] ? 'animate-spin' : ''}`} />
                Regenerate
              </Button>
            </div>
            <Textarea 
              value={lesson.description} 
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Learning Outcomes */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Learning Outcomes</CardTitle>
              <CardDescription>What students will accomplish</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleRegenerateSection('learningOutcomes')}
              disabled={isRegenerating['learningOutcomes']}
              className="text-blue-600"
            >
              <RotateCcw size={14} className={`mr-1 ${isRegenerating['learningOutcomes'] ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {lesson.learningOutcomes.map((outcome, index) => (
            <div key={`outcome-${index}`} className="flex items-center gap-2">
              <div className="w-6 h-6 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {index + 1}
              </div>
              <Input 
                value={outcome} 
                onChange={(e) => handleOutcomeChange(index, e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleRemoveOutcome(index)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8 w-8"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            onClick={handleAddOutcome}
            className="w-full mt-2"
          >
            <Plus size={16} className="mr-1" />
            Add Outcome
          </Button>
        </CardContent>
      </Card>
      
      {/* Key Concepts */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Key Concepts</CardTitle>
              <CardDescription>Important terminology and ideas</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleRegenerateSection('keyConcepts')}
              disabled={isRegenerating['keyConcepts']}
              className="text-blue-600"
            >
              <RotateCcw size={14} className={`mr-1 ${isRegenerating['keyConcepts'] ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {lesson.keyConcepts.map((concept, index) => (
            <div key={`concept-${index}`} className="flex items-center gap-2">
              <div className="w-2 h-2 flex-shrink-0 rounded-full bg-blue-600"></div>
              <Input 
                value={concept} 
                onChange={(e) => handleConceptChange(index, e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleRemoveConcept(index)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8 w-8"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            onClick={handleAddConcept}
            className="w-full mt-2"
          >
            <Plus size={16} className="mr-1" />
            Add Concept
          </Button>
        </CardContent>
      </Card>
      
      {/* Learning Activities */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Learning Activities</CardTitle>
              <CardDescription>Engaging exercises for students</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleRegenerateSection('activities')}
              disabled={isRegenerating['activities']}
              className="text-blue-600"
            >
              <RotateCcw size={14} className={`mr-1 ${isRegenerating['activities'] ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {lesson.activities.map((activity, index) => (
            <div key={`activity-${index}`} className="mb-8 border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Activity {index + 1}</h3>
                <Select
                  value={activity.type}
                  onValueChange={(value) => handleActivityChange(
                    index, 
                    'type', 
                    value as 'Exercise' | 'Discussion' | 'Project' | 'Other'
                  )}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Exercise">Exercise</SelectItem>
                    <SelectItem value="Discussion">Discussion</SelectItem>
                    <SelectItem value="Project">Project</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input 
                    value={activity.title} 
                    onChange={(e) => handleActivityChange(index, 'title', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={activity.description} 
                    onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea 
                    value={activity.content} 
                    onChange={(e) => handleActivityChange(index, 'content', e.target.value)}
                    className="mt-1 min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Assessments */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Assessments</CardTitle>
              <CardDescription>Evaluate student understanding</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleRegenerateSection('assessments')}
              disabled={isRegenerating['assessments']}
              className="text-blue-600"
            >
              <RotateCcw size={14} className={`mr-1 ${isRegenerating['assessments'] ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {lesson.assessments.map((assessment, assessmentIndex) => (
            <div key={`assessment-${assessmentIndex}`} className="mb-8 border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Assessment {assessmentIndex + 1}</h3>
                <Select
                  value={assessment.type}
                  onValueChange={(value) => handleAssessmentChange(
                    assessmentIndex, 
                    'type', 
                    value as 'Quiz' | 'Test' | 'Assignment'
                  )}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quiz">Quiz</SelectItem>
                    <SelectItem value="Test">Test</SelectItem>
                    <SelectItem value="Assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input 
                    value={assessment.title} 
                    onChange={(e) => handleAssessmentChange(assessmentIndex, 'title', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={assessment.description} 
                    onChange={(e) => handleAssessmentChange(assessmentIndex, 'description', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <h4 className="font-medium mb-3">Questions</h4>
              
              {assessment.questions.map((question, questionIndex) => {
                // Create an ID key that combines assessment and question indices
                const questionKey = `question-${assessmentIndex}-${questionIndex}`;
                
                return (
                  <div key={questionKey} className="mb-6 border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Question {questionIndex + 1}</div>
                      <Select
                        value={question.type}
                        onValueChange={(value) => {
                          const updatedAssessments = [...lesson.assessments];
                          updatedAssessments[assessmentIndex].questions[questionIndex].type = 
                            value as 'Multiple Choice' | 'True/False' | 'Short Answer';
                          onUpdateLesson({...lesson, assessments: updatedAssessments});
                        }}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                          <SelectItem value="True/False">True/False</SelectItem>
                          <SelectItem value="Short Answer">Short Answer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <Textarea 
                        value={question.question} 
                        onChange={(e) => {
                          const updatedAssessments = [...lesson.assessments];
                          updatedAssessments[assessmentIndex].questions[questionIndex].question = e.target.value;
                          onUpdateLesson({...lesson, assessments: updatedAssessments});
                        }}
                        placeholder="Enter your question"
                      />
                      
                      {question.type === 'Multiple Choice' && question.options && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Options</p>
                          {question.options.map((option, optionIndex) => (
                            <div key={`option-${optionIndex}`} className="flex items-center gap-2">
                              <div className="w-7 flex-shrink-0 text-right font-medium">{String.fromCharCode(65 + optionIndex)}.</div>
                              <Input 
                                value={option} 
                                onChange={(e) => {
                                  const updatedAssessments = [...lesson.assessments];
                                  if (updatedAssessments[assessmentIndex].questions[questionIndex].options) {
                                    updatedAssessments[assessmentIndex].questions[questionIndex].options![optionIndex] = e.target.value;
                                    onUpdateLesson({...lesson, assessments: updatedAssessments});
                                  }
                                }}
                                className="flex-1"
                              />
                            </div>
                          ))}
                          
                          <div className="space-y-2 mt-3">
                            <label className="text-sm font-medium">Correct Answer</label>
                            <Input 
                              value={question.correctAnswer || ''} 
                              onChange={(e) => {
                                const updatedAssessments = [...lesson.assessments];
                                updatedAssessments[assessmentIndex].questions[questionIndex].correctAnswer = e.target.value;
                                onUpdateLesson({...lesson, assessments: updatedAssessments});
                              }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {question.type === 'True/False' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Correct Answer</label>
                          <Select
                            value={question.correctAnswer || ''}
                            onValueChange={(value) => {
                              const updatedAssessments = [...lesson.assessments];
                              updatedAssessments[assessmentIndex].questions[questionIndex].correctAnswer = value;
                              onUpdateLesson({...lesson, assessments: updatedAssessments});
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select correct answer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="True">True</SelectItem>
                              <SelectItem value="False">False</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Save Button */}
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => {
            toast({
              title: "Return to Form",
              description: "You can modify your generation parameters and try again."
            });
            // In a real app, you might handle this differently
          }}
        >
          Back to Prompt
        </Button>
        <Button 
          onClick={onSave}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Save Lesson
        </Button>
      </div>
    </div>
  );
};

export default LessonPreview;
