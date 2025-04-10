
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, RotateCcw, Save, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { LessonResponse } from '@/services/openai';

interface LessonDisplayProps {
  lessonData: LessonResponse;
  onRegenerateRequest: () => void;
}

const LessonDisplay = ({ lessonData, onRegenerateRequest }: LessonDisplayProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [editedValues, setEditedValues] = useState<Record<string, any>>({});
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
          ? lessonData[field as keyof LessonResponse] 
          : [...(lessonData[field as keyof LessonResponse] as string[])]
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

  const renderEditableField = (field: string, value: string | string[]) => {
    if (!editMode[field]) {
      if (typeof value === 'string') {
        return <p className="text-gray-700 whitespace-pre-line">{value}</p>;
      } else {
        return (
          <ul className="list-disc pl-5 space-y-1">
            {value.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
      }
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
    } else {
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
    }
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
