
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, BookOpen, Layout, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-coursegpt-blue">Course<span className="text-coursegpt-orange">GPT</span></span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{user?.phoneNumber}</span>
            <Button variant="ghost" size="sm" onClick={logout} className="text-gray-600">
              <LogOut size={18} className="mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-coursegpt-blue">Dashboard</h1>
          <Link to="/generator">
            <Button className="bg-coursegpt-orange hover:bg-coursegpt-orange/90">
              <PlusCircle size={18} className="mr-2" />
              New Lesson
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Recent Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">You haven't created any lessons yet.</p>
              <Link to="/generator">
                <Button variant="outline" size="sm" className="w-full">
                  <PlusCircle size={18} className="mr-2" />
                  Create Your First Lesson
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/generator">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <PlusCircle size={18} className="mr-2" />
                    New Lesson
                  </Button>
                </Link>
                <Link to="#">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BookOpen size={18} className="mr-2" />
                    Browse Templates
                  </Button>
                </Link>
                <Link to="#">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Layout size={18} className="mr-2" />
                    Organize Modules
                  </Button>
                </Link>
                <Link to="#">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Settings size={18} className="mr-2" />
                    Account Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Tips & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-coursegpt-teal mr-2">•</span>
                  <span>Be specific with your topic to get better results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-coursegpt-teal mr-2">•</span>
                  <span>Add details in the description for more tailored content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-coursegpt-teal mr-2">•</span>
                  <span>Edit generated lessons to personalize them further</span>
                </li>
                <li className="flex items-start">
                  <span className="text-coursegpt-teal mr-2">•</span>
                  <span>Organize related lessons into modules</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
