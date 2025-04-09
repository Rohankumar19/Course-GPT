
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isHome = location.pathname === '/';
  const isLoggedIn = user && user.isLoggedIn;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-coursegpt-blue dark:text-white">Course<span className="text-coursegpt-orange">GPT</span></span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {isLoggedIn ? (
              <>
                {isHome && (
                  <Link to="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={logout}>Logout</Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant={isHome ? "ghost" : "default"}>Login</Button>
              </Link>
            )}
            
            {isHome && !isLoggedIn && (
              <Link to="/login">
                <Button className="bg-coursegpt-orange hover:bg-coursegpt-orange/90">Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
