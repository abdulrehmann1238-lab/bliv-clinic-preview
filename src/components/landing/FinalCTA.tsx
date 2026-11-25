import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-bliv-dark text-white relative overflow-hidden">
      {/* Subtle organic background highlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#385043]/50 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-72 rounded-full bg-[#1b2721]/80 blur-2xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wider uppercase text-bliv-sage">
          <span>Get Started Today</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Make room for better organised care.
        </h2>

        <p className="text-base sm:text-lg text-bliv-sage-muted max-w-2xl mx-auto leading-relaxed">
          See how a focused clinical workspace can simplify your clinic's everyday operations.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/app')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="w-full sm:w-auto px-8 bg-white text-bliv-dark hover:bg-bliv-sage"
          >
            Explore the clinician workspace
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-6 text-white hover:bg-white/10"
          >
            Sign in as clinician
          </Button>
        </div>
      </div>
    </section>
  );
};
