
import React from 'react';
import { Sparkles, BookOpen, Clock, Edit } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="h-10 w-10 text-coursegpt-orange" />,
    title: 'AI-Powered Lesson Generation',
    description: 'Turn topic ideas into complete, structured lessons with just a few clicks. Our AI handles the heavy lifting.'
  },
  {
    icon: <BookOpen className="h-10 w-10 text-coursegpt-orange" />,
    title: 'Learning Outcome Focused',
    description: 'Our AI ensures every course has clear learning outcomes and appropriate activities to achieve them.'
  },
  {
    icon: <Clock className="h-10 w-10 text-coursegpt-orange" />,
    title: 'Save Hours of Planning',
    description: 'What takes hours of research and planning can now be done in minutes, giving you more time to refine content.'
  },
  {
    icon: <Edit className="h-10 w-10 text-coursegpt-orange" />,
    title: 'Easy Customization',
    description: 'Don\'t like what the AI generated? Easily edit any section or regenerate specific parts until perfect.'
  }
];

const Features = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-coursegpt-blue mb-16">
          Build Better Courses, Faster
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md card-hover flex flex-col items-center text-center"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-coursegpt-blue mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
