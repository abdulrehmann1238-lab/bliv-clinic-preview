import React from 'react';
import { LandingNav } from '../components/landing/LandingNav';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustStrip } from '../components/landing/TrustStrip';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { ProductShowcase } from '../components/landing/ProductShowcase';
import { WorkflowTimeline } from '../components/landing/WorkflowTimeline';
import { SecuritySection } from '../components/landing/SecuritySection';
import { FinalCTA } from '../components/landing/FinalCTA';
import { LandingFooter } from '../components/landing/LandingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bliv-bg flex flex-col">
      <LandingNav />
      <main className="flex-1">
        <HeroSection />
        <TrustStrip />
        <FeaturesSection />
        <ProductShowcase />
        <WorkflowTimeline />
        <SecuritySection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
};
