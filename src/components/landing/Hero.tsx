
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-coursegpt-blue to-coursegpt-teal py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-coursegpt-orange" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Create Expert Courses in Minutes with AI
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            CourseGPT transforms your expertise into structured learning experiences.
            No more blank page anxiety — just intelligent, adaptive course creation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/login">
              <Button size="lg" className="bg-coursegpt-orange hover:bg-coursegpt-orange/90 text-white px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/generator">
              <Button size="lg" variant="outline" className="bg-[#003366] border-[#003366] text-white hover:bg-[#003366]/90">
                Try the Generator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
