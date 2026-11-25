import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { MiniDashboardPreview } from './MiniDashboardPreview';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-bliv-bg">
      {/* Ambient Visual Background: Soft daylight, gentle organic light shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft sunlight gradients passing through clinic window */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#E5ECE5]/80 blur-3xl" />
        <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] rounded-full bg-[#EDE7DD]/60 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[300px] rounded-full bg-bliv-sage/30 blur-2xl" />

        {/* Subtle grid pattern texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(#26372F 1px, transparent 1px)`, 
            backgroundSize: '24px 24px' 
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bliv-surface border border-bliv-border text-xs font-semibold tracking-wider uppercase text-bliv-green shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-bliv-green" />
              <span>THE CLINICIAN WORKSPACE</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-bliv-dark leading-[1.12]">
              Better organised care starts here.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-bliv-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Manage patient profiles, clinical records, and appointments in one thoughtfully connected workspace. Less administrative friction. More room for care.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/app')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full sm:w-auto px-7"
              >
                Explore the workspace
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 bg-bliv-surface/80"
              >
                Discover the platform
              </Button>
            </div>

            {/* Three concise benefits under buttons */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-bliv-border/80 text-left">
              <div className="flex items-center gap-2 text-xs font-medium text-bliv-text-primary">
                <CheckCircle2 className="w-4 h-4 text-bliv-green shrink-0" />
                <span>Patient-first organisation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-bliv-text-primary">
                <CheckCircle2 className="w-4 h-4 text-bliv-green shrink-0" />
                <span>Connected clinical records</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-bliv-text-primary">
                <CheckCircle2 className="w-4 h-4 text-bliv-green shrink-0" />
                <span>One shared calendar</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Live Miniature Interactive Dashboard */}
          <div className="lg:col-span-6 w-full">
            <MiniDashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};
