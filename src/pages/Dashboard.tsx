
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, BookOpen, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample course data for demo purposes
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      lastUpdated: "Apr 9, 2025",
      description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
      modules: 2,
      level: "beginner",
    },
    {
      id: 2,
      title: "Python for Data Science",
      lastUpdated: "Apr 9, 2025",
      description: "Master Python programming for data analysis and machine learning.",
      modules: 1,
      level: "intermediate",
    },
    {
      id: 3,
      title: "Product Management Essentials",
      lastUpdated: "Apr 9, 2025",
      description: "Learn the core skills and techniques for effective product management.",
      modules: 0,
      level: "intermediate",
    }
  ];

  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-blue-600 text-white font-bold rounded-lg w-8 h-8 flex items-center justify-center mr-2">C</div>
              <span className="text-xl font-bold">CourseGPT</span>
            </Link>
            
            <div className="hidden md:flex ml-12 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="text"
                className="pl-10 pr-4 py-2 w-96"
                placeholder="Search courses and modules..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage your courses and track progress</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle size={18} className="mr-2" />
            New Course
          </Button>
        </div>
        
        {/* Search Bar for Mobile */}
        <div className="md:hidden mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text"
            className="pl-10 pr-4 py-2 w-full"
            placeholder="Search courses and modules..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.id} className="border bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-1">{course.title}</h2>
                  <p className="text-gray-500 text-xs">Last updated: {course.lastUpdated}</p>
                </div>
                
                <p className="text-sm text-gray-700 mb-4">{course.description}</p>
                
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <div className="mr-4 flex items-center">
                    <BookOpen size={14} className="mr-1" />
                    {course.modules} modules
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 rounded-full bg-gray-100 capitalize">{course.level}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">View Course</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery ? 'Try a different search term or' : 'Get started by'} creating your first course
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle size={18} className="mr-2" />
              Create New Course
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
