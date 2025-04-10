import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, RotateCcw, Save, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lesson, LessonActivity, Assessment } from '@/types/course';

interface LessonDisplayProps {
  lessonData: Lesson;
  onRegenerateRequest: () => void;
}

const LessonDisplay = ({ lessonData, onRegenerateRequest }: LessonDisplayProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [editedValues, setEditedValues] = useState<Record<string, unknown>>({});
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();

  const handleEditToggle = (field: string) => {
    if (editMode[field]) {
      // Save changes
      saveChanges(field);
    } else {
      // Initialize edited value with current value
      setEditedValues({
        ...editedValues,
        [field]: field === 'title' || field === 'description' 
          ? lessonData[field as keyof Lesson] 
          : Array.isArray(lessonData[field as keyof Lesson]) 
            ? [...(lessonData[field as keyof Lesson] as unknown[])]
            : lessonData[field as keyof Lesson]
      });
    }
    
    setEditMode({
      ...editMode,
      [field]: !editMode[field]
    });
  };

  const saveChanges = (field: string) => {
    toast({
      title: "Changes Saved",
      description: `Your changes to ${field} have been saved.`,
    });
  };

  const handleArrayItemChange = (field: string, index: number, value: string) => {
    const newArray = [...(editedValues[field] as string[])];
    newArray[index] = value;
    
    setEditedValues({
      ...editedValues,
      [field]: newArray
    });
  };

  const addArrayItem = (field: string) => {
    setEditedValues({
      ...editedValues,
      [field]: [...(editedValues[field] as string[]), ""]
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = [...(editedValues[field] as string[])];
    newArray.splice(index, 1);
    
    setEditedValues({
      ...editedValues,
      [field]: newArray
    });
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    
    // Call the regenerate function
    onRegenerateRequest();
    
    toast({
      title: "Regenerating Lesson",
      description: "Creating a new version of your lesson...",
    });
  };

  const renderEditableField = (field: string, value: unknown) => {
    if (!editMode[field]) {
      if (typeof value === 'string') {
        return <p className="text-gray-700 whitespace-pre-line">{value}</p>;
      } else if (Array.isArray(value) && value.length > 0) {
        if (typeof value[0] === 'string') {
          return (
            <ul className="list-disc pl-5 space-y-1">
              {value.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          );
        } else if (typeof value[0] === 'object' && value[0] !== null) {
          // This is for activities or assessments
          return (
            <div className="space-y-4">
              {value.map((item: LessonActivity | Assessment, index: number) => {
                if ('questions' in item && Array.isArray(item.questions)) {
                  // This is an assessment
                  return (
                    <div key={index} className="border p-3 rounded-md">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      {item.type && <p className="mt-1 text-xs text-blue-600">{item.type}</p>}
                      {item.questions && (
                        <div className="mt-2">
                          <h5 className="text-sm font-medium">Questions:</h5>
                          <ul className="list-decimal pl-5 text-sm">
                            {item.questions.map((q: { question: string }, qIndex: number) => (
                              <li key={qIndex}>{q.question}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                } else {
                  // This is an activity
                  return (
                    <div key={index} className="border p-3 rounded-md">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      {item.content && <p className="mt-2 text-sm whitespace-pre-line">{item.content}</p>}
                      {item.type && <p className="mt-1 text-xs text-blue-600">{item.type}</p>}
                    </div>
                  );
                }
              })}
            </div>
          );
        }
      }
      return <p className="text-gray-500 italic">No content</p>;
    }

    if (typeof value === 'string') {
      return field === 'title' ? (
        <Input
          value={editedValues[field] as string}
          onChange={(e) => setEditedValues({...editedValues, [field]: e.target.value})}
          className="w-full mb-2"
        />
      ) : (
        <Textarea
          value={editedValues[field] as string}
          onChange={(e) => setEditedValues({...editedValues, [field]: e.target.value})}
          className="w-full min-h-[100px] mb-2"
        />
      );
    } else if (Array.isArray(value) && value.length > 0) {
      if (typeof value[0] === 'string') {
        return (
          <div className="space-y-2">
            {(editedValues[field] as string[]).map((item, index) => (
              <div key={index} className="flex items-center">
                <Input
                  value={item}
                  onChange={(e) => handleArrayItemChange(field, index, e.target.value)}
                  className="flex-1 mr-2"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem(field, index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addArrayItem(field)}
              className="text-coursegpt-teal"
            >
              Add Item
            </Button>
          </div>
        );
      } else {
        // For complex objects like activities or assessments, we would need more specialized editors
        return (
          <div className="p-3 border rounded bg-gray-50">
            <p className="text-sm text-gray-600">Editing complex content is not supported in this view</p>
          </div>
        );
      }
    }
    return <p className="text-gray-500 italic">No content to edit</p>;
  };

  const renderEditButton = (field: string) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleEditToggle(field)}
      className={editMode[field] ? "text-green-600" : "text-gray-500"}
    >
      {editMode[field] ? <Save size={16} /> : <Pencil size={16} />}
      <span className="ml-1">{editMode[field] ? "Save" : "Edit"}</span>
    </Button>
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold text-coursegpt-blue">
          {editMode.title ? renderEditableField('title', lessonData.title) : lessonData.title}
        </CardTitle>
        <div className="flex space-x-2">
          {renderEditButton('title')}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRegenerate}
            className="text-coursegpt-orange"
            disabled={isRegenerating}
          >
            <RotateCcw size={16} className={`mr-1 ${isRegenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
            <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-coursegpt-teal">Lesson Description</h3>
                {renderEditButton('description')}
              </div>
              {renderEditableField('description', lessonData.description)}
            </div>
          </TabsContent>
          
          <TabsContent value="outcomes" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-coursegpt-teal">Learning Outcomes</h3>
                {renderEditButton('learningOutcomes')}
              </div>
              {renderEditableField('learningOutcomes', lessonData.learningOutcomes)}
            </div>
          </TabsContent>
          
          <TabsContent value="concepts" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-coursegpt-teal">Key Concepts</h3>
                {renderEditButton('keyConcepts')}
              </div>
              {renderEditableField('keyConcepts', lessonData.keyConcepts)}
            </div>
          </TabsContent>
          
          <TabsContent value="activities" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-coursegpt-teal">Activities & Examples</h3>
                {renderEditButton('activities')}
              </div>
              {renderEditableField('activities', lessonData.activities)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LessonDisplay;
