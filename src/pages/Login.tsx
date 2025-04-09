
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import PhoneLoginForm from '@/components/auth/PhoneLoginForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card className="border-coursegpt-teal/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-coursegpt-blue">
                Welcome to CourseGPT
              </CardTitle>
              <CardDescription>
                Sign in or create an account with your phone number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PhoneLoginForm />
              
              <div className="mt-6 text-center text-sm">
                <p>
                  By continuing, you agree to our{' '}
                  <Link to="#" className="text-coursegpt-teal hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="text-coursegpt-teal hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center mt-4">
            <Link to="/" className="text-coursegpt-teal hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
