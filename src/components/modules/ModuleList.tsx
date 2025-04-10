
import React, { useState } from 'react';
import { Module } from '@/types/course';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ModuleListProps {
  modules: Module[];
  onUpdateModule: (updatedModule: Module) => void;
  onDeleteModule: (moduleId: string) => void;
}

const ModuleList = ({ modules, onUpdateModule, onDeleteModule }: ModuleListProps) => {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleToggleExpand = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleEditToggle = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      onUpdateModule({ ...module, isEditing: !module.isEditing });
    }
  };

  const handleTitleChange = (moduleId: string, newTitle: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      onUpdateModule({ ...module, title: newTitle });
    }
  };

  const handleSaveEdit = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      if (!module.title.trim()) {
        toast({
          title: "Invalid Module Title",
          description: "Module title cannot be empty",
          variant: "destructive",
        });
        return;
      }
      
      onUpdateModule({ ...module, isEditing: false });
      toast({
        title: "Module Updated",
        description: "Module has been successfully updated",
      });
    }
  };

  const handleDeleteModule = (moduleId: string) => {
    onDeleteModule(moduleId);
    toast({
      title: "Module Deleted",
      description: "Module has been successfully deleted",
    });
  };

  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <Card key={module.id} className="overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <button 
                  onClick={() => handleToggleExpand(module.id)}
                  className="mr-2 p-1 rounded-full hover:bg-gray-100" 
                  aria-label={expandedModules[module.id] ? "Collapse" : "Expand"}
                >
                  {expandedModules[module.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {module.isEditing ? (
                  <div className="flex items-center flex-1">
                    <Input
                      value={module.title}
                      onChange={(e) => handleTitleChange(module.id, e.target.value)}
                      className="mr-2"
                      autoFocus
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleSaveEdit(module.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between flex-1">
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.lessons} lessons</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditToggle(module.id)}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteModule(module.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {expandedModules[module.id] && (
              <div className="mt-4 pl-8">
                <p className="text-gray-600 text-sm">{module.description || "No description available."}</p>
                {/* Here we could display lessons for this module in a future implementation */}
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                    Add Lesson
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ModuleList;
