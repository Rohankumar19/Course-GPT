
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Demo = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-coursegpt-blue mb-6">
          See CourseGPT in Action
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          From a simple prompt to a complete, structured lesson in seconds. Experience the future of course creation.
        </p>
        
        <Tabs defaultValue="input" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="input">1. Input</TabsTrigger>
            <TabsTrigger value="generation">2. Generation</TabsTrigger>
            <TabsTrigger value="result">3. Final Result</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="bg-white rounded-lg p-8 border border-gray-200">
                  <h3 className="text-2xl font-semibold text-coursegpt-blue mb-6">Course Generator Input</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Topic:</p>
                      <div className="bg-gray-100 p-3 rounded-md font-mono">Introduction to Machine Learning</div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Course Level:</p>
                      <div className="bg-gray-100 p-3 rounded-md font-mono">Beginner</div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Description:</p>
                      <div className="bg-gray-100 p-3 rounded-md font-mono">
                        A basic introduction to machine learning concepts for students with basic programming knowledge but no prior ML experience.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="generation" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="bg-white rounded-lg p-8 border border-gray-200">
                  <div className="flex items-center justify-center mb-8">
                    <div className="animate-pulse flex space-x-2">
                      <div className="h-3 w-3 bg-coursegpt-teal rounded-full"></div>
                      <div className="h-3 w-3 bg-coursegpt-teal rounded-full"></div>
                      <div className="h-3 w-3 bg-coursegpt-teal rounded-full"></div>
                    </div>
                    <span className="ml-3 text-coursegpt-blue font-medium">AI generating your lesson...</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-8 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mt-6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="result" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="bg-white rounded-lg p-8 border border-gray-200">
                  <h3 className="text-2xl font-semibold text-coursegpt-blue mb-4">Introduction to Machine Learning</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-coursegpt-teal mb-2">Lesson Description</h4>
                    <p className="text-gray-700">
                      This introductory lesson provides a foundation in machine learning concepts for beginners with basic programming knowledge. Students will learn key terminology, understand fundamental approaches, and explore real-world applications.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-coursegpt-teal mb-2">Learning Outcomes</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Define machine learning and differentiate it from traditional programming</li>
                      <li>Identify the three main types of machine learning: supervised, unsupervised, and reinforcement learning</li>
                      <li>Explain common machine learning applications in everyday technology</li>
                      <li>Describe the basic machine learning workflow from data to model evaluation</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-coursegpt-teal mb-2">Key Concepts</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Machine Learning vs. Traditional Programming</li>
                      <li>Supervised, Unsupervised and Reinforcement Learning</li>
                      <li>Training Data and Test Data</li>
                      <li>Features and Labels</li>
                      <li>Model Training and Evaluation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-coursegpt-teal mb-2">Activities & Examples</h4>
                    <div className="text-gray-700">
                      <p className="mb-2"><strong>Discussion:</strong> Identify machine learning applications in students' daily lives</p>
                      <p className="mb-2"><strong>Interactive Demo:</strong> Simple image classification example</p>
                      <p><strong>Mini-project:</strong> Using a pre-built model to classify sample data</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Demo;
