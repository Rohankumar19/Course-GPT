
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const PhoneLoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'verification'
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate sending verification code
    setTimeout(() => {
      toast({
        title: "Verification Code Sent",
        description: "We've sent a verification code to your phone. For demo purposes, use code: 123456",
      });
      setIsLoading(false);
      setStep('verification');
    }, 1500);
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length < 4) {
      toast({
        title: "Invalid Code",
        description: "Please enter the verification code sent to your phone.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      if (verificationCode === '123456') {
        toast({
          title: "Login Successful",
          description: "You've been successfully logged in.",
        });
        
        // Use the login function from auth context
        login(phoneNumber);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        toast({
          title: "Invalid Code",
          description: "The verification code you entered is invalid. For demo purposes, use code: 123456",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-primary"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-coursegpt-blue hover:bg-coursegpt-blue/90"
            disabled={isLoading}
          >
            {isLoading ? "Sending Code..." : "Send Verification Code"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerificationSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <Input
              id="verification-code"
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="input-primary"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-coursegpt-blue hover:bg-coursegpt-blue/90"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
          
          <div className="text-center">
            <button 
              type="button" 
              onClick={() => setStep('phone')}
              className="text-sm text-coursegpt-teal hover:underline"
            >
              Use a different phone number
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PhoneLoginForm;
