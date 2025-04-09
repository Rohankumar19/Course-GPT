
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-coursegpt-blue">Course<span className="text-coursegpt-orange">GPT</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-coursegpt-blue font-medium">Home</Link>
            <Link to="/generator" className="text-gray-700 hover:text-coursegpt-blue font-medium">Generator</Link>
            <Link to="#" className="text-gray-700 hover:text-coursegpt-blue font-medium">Features</Link>
            <Link to="#" className="text-gray-700 hover:text-coursegpt-blue font-medium">Pricing</Link>
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-coursegpt-teal text-coursegpt-teal hover:bg-coursegpt-teal hover:text-white">
                Log In
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-coursegpt-orange hover:bg-coursegpt-orange/90 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-700 p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-coursegpt-blue font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/generator" 
                className="text-gray-700 hover:text-coursegpt-blue font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Generator
              </Link>
              <Link 
                to="#" 
                className="text-gray-700 hover:text-coursegpt-blue font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="#" 
                className="text-gray-700 hover:text-coursegpt-blue font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex space-x-4 pt-3">
                <Link to="/login" className="w-1/2" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-coursegpt-teal text-coursegpt-teal hover:bg-coursegpt-teal hover:text-white">
                    Log In
                  </Button>
                </Link>
                <Link to="/login" className="w-1/2" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-coursegpt-orange hover:bg-coursegpt-orange/90 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
