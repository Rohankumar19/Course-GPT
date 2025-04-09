
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-coursegpt-blue to-coursegpt-teal text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Course Creation?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of educators and content creators who are saving time and building 
          better courses with CourseGPT.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login">
            <Button size="lg" className="bg-coursegpt-orange hover:bg-coursegpt-orange/90 text-white px-8">
              Get Started Free
            </Button>
          </Link>
          <Link to="/generator">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Try the Generator
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
