
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Settings, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Module, Course } from '@/types/course';
import { v4 as uuidv4 } from 'uuid';
import ModuleList from '@/components/modules/ModuleList';
import AddModuleModal from '@/components/modules/AddModuleModal';

const CourseView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);

  // Mock course data - in real app, fetch from API based on courseId
  const [course, setCourse] = useState<Course>({
    id: Number(courseId),
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
    lastUpdated: "Apr 10, 2025",
    level: "beginner",
    difficulty: "Beginner",
    modules: [
      {
        id: "mod-1",
        title: "HTML Foundations",
        description: "Learn the basics of HTML including tags, elements, and document structure.",
        lessons: 2,
        isEditing: false
      },
      {
        id: "mod-2",
        title: "CSS Styling",
        description: "Understand how to style web pages using CSS selectors, properties, and values.",
        lessons: 0,
        isEditing: false
      }
    ]
  });

  const handleAddModule = (moduleData: Omit<Module, 'id'>) => {
    const newModule = {
      ...moduleData,
      id: uuidv4(),
      isEditing: false
    };
    
    setCourse(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
    
    toast({
      title: "Module Added",
      description: "New module has been added successfully.",
    });
  };

  const handleUpdateModule = (updatedModule: Module) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === updatedModule.id ? updatedModule : module
      )
    }));
  };

  const handleDeleteModule = (moduleId: string) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.filter(module => module.id !== moduleId)
    }));
  };

  const handleGenerateLesson = () => {
    navigate(`/generator?courseId=${courseId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center cursor-pointer"
            >
              <div className="bg-blue-600 text-white font-bold rounded-lg w-8 h-8 flex items-center justify-center mr-2">C</div>
              <span className="text-xl font-bold">CourseGPT</span>
            </div>
            
            <div className="hidden md:flex ml-12 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text"
                className="pl-10 pr-4 py-2 w-96 border rounded-md"
                placeholder="Search courses and modules..." 
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600">Help</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle size={18} className="mr-2" />
              Create Course
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Button 
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 px-0 hover:bg-transparent hover:text-blue-600"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Button>
        </div>
        
        {/* Course Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-gray-500 text-sm">Created Apr 10, 2025 | Last updated {course.lastUpdated}</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center border-gray-300"
              onClick={() => toast({
                title: "Settings",
                description: "Course settings functionality will be implemented soon.",
              })}
            >
              <Settings size={16} className="mr-1" />
              <span>Course Settings</span>
            </Button>
            <Button 
              onClick={handleGenerateLesson}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle size={16} className="mr-1" />
              <span>Generate Lesson</span>
            </Button>
          </div>
        </div>
        
        {/* Course Info */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="text-lg font-bold mb-2">Description</h2>
          <p className="text-gray-700 mb-6">{course.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Difficulty</h3>
              <p className="mt-1 text-base font-medium">{course.difficulty}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Est. Duration</h3>
              <p className="mt-1 text-base font-medium">{course.duration || "20 hours"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Modules</h3>
              <p className="mt-1 text-base font-medium">{course.modules.length}</p>
            </div>
          </div>
        </div>
        
        {/* Modules Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Modules</h2>
            <Button 
              onClick={() => setIsAddModuleModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle size={16} className="mr-1" />
              Add Module
            </Button>
          </div>
          
          <ModuleList 
            modules={course.modules} 
            onUpdateModule={handleUpdateModule}
            onDeleteModule={handleDeleteModule}
          />
        </div>
      </main>

      <AddModuleModal 
        isOpen={isAddModuleModalOpen}
        onClose={() => setIsAddModuleModalOpen(false)}
        onAddModule={handleAddModule}
      />
    </div>
  );
};

export default CourseView;
