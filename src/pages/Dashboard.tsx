
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, BookOpen, Layout, Calendar, Search, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  // Sample course data matching the screenshot
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
      lastUpdated: "Apr 9, 2025",
      modules: 2,
      level: "beginner"
    },
    {
      id: 2,
      title: "Python for Data Science",
      description: "Master Python programming for data analysis and machine learning.",
      lastUpdated: "Apr 9, 2025",
      modules: 1,
      level: "intermediate"
    },
    {
      id: 3,
      title: "Product Management Essentials",
      description: "Learn the core skills and techniques for effective product management.",
      lastUpdated: "Apr 9, 2025",
      modules: 0,
      level: "intermediate"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-coursegpt-blue dark:text-white">Course<span className="text-coursegpt-orange">GPT</span></span>
          </Link>
          
          <div className="flex-1 max-w-md mx-auto px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search courses and modules..."
                className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-coursegpt-teal"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => {}}>
              Help
            </Button>
            <Button variant="outline" size="sm" onClick={() => {}} className="bg-coursegpt-blue text-white hover:bg-coursegpt-blue/90">
              <PlusCircle size={16} className="mr-1" />
              Create Course
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-coursegpt-blue dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your courses and track progress</p>
          </div>
          <Link to="/generator">
            <Button className="bg-coursegpt-blue hover:bg-coursegpt-blue/90 text-white">
              <PlusCircle size={18} className="mr-2" />
              New Course
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <Card key={course.id} className="card-hover dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {course.lastUpdated}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="mr-4 flex items-center">
                    <Layout size={14} className="mr-1" />
                    {course.modules} modules
                  </div>
                  <div className="capitalize">{course.level}</div>
                </div>
                <Link to="/generator">
                  <Button variant="outline" size="sm" className="w-full">
                    View Course
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <div className="fixed left-0 top-0 h-full w-16 bg-gray-900 flex flex-col items-center py-6">
        <Link to="/dashboard" className="p-2 rounded-lg bg-gray-800 text-white mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
            <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.5" />
            <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.5" />
            <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.5" />
          </svg>
        </Link>
        <div className="flex flex-col items-center space-y-6 mt-6">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Calendar size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <BookOpen size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Settings size={20} />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white mt-auto" onClick={logout}>
          <LogOut size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
