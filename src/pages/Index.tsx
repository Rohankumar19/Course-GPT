
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Demo from '@/components/landing/Demo';
import CallToAction from '@/components/landing/CallToAction';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Demo />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
