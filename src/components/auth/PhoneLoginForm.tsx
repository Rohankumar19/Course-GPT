
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const PhoneLoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('contact'); // 'contact' or 'verification'
  const [isLoading, setIsLoading] = useState(false);
  const [contactMethod, setContactMethod] = useState('phone'); // 'phone' or 'email'
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (contactMethod === 'phone' && (!phoneNumber || phoneNumber.length < 10)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }
    
    if (contactMethod === 'email' && (!email || !email.includes('@'))) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to a backend service
      // For demo, we'll simulate sending a verification code
      setTimeout(() => {
        toast({
          title: "Verification Code Sent",
          description: `We've sent a verification code to your ${contactMethod}. For demo purposes, use code: 123456`,
        });
        setIsLoading(false);
        setStep('verification');
      }, 1500);
    } catch (error) {
      toast({
        title: "Failed to send verification code",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would validate with your backend
      setTimeout(() => {
        if (verificationCode === '123456') {
          // Login successful
          const userContact = contactMethod === 'phone' ? phoneNumber : email;
          login(userContact);
          
          toast({
            title: "Login Successful",
            description: "You've been successfully logged in.",
          });
          
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
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const toggleContactMethod = () => {
    setContactMethod(contactMethod === 'phone' ? 'email' : 'phone');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {step === 'contact' ? (
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={toggleContactMethod}
              className={`text-sm py-1 px-3 rounded-md ${
                contactMethod === 'phone' ? 'bg-coursegpt-blue text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Phone
            </button>
            <button
              type="button"
              onClick={toggleContactMethod}
              className={`text-sm py-1 px-3 rounded-md ${
                contactMethod === 'email' ? 'bg-coursegpt-blue text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Email
            </button>
          </div>
          
          {contactMethod === 'phone' ? (
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          ) : (
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-primary"
                required
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-coursegpt-blue hover:bg-coursegpt-blue/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Code...
              </>
            ) : (
              "Send Verification Code"
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerificationSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Verification Code
            </label>
            <div className="flex justify-center">
              <InputOTP 
                maxLength={6} 
                value={verificationCode} 
                onChange={setVerificationCode}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} index={index} {...slot} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-coursegpt-blue hover:bg-coursegpt-blue/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>
          
          <div className="text-center">
            <button 
              type="button" 
              onClick={() => setStep('contact')}
              className="text-sm text-coursegpt-teal hover:underline"
            >
              Use a different {contactMethod}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PhoneLoginForm;
