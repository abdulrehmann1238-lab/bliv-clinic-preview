import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('amelia.carter@blivhealth.internal');
  const [password, setPassword] = useState('ClinicalCare2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useApp();
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide your work email and clinical password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email);
      setIsLoading(false);
      navigate('/app');
    }, 600);
  };

  const handleOneClickDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('amelia.carter@blivhealth.internal');
      setIsLoading(false);
      navigate('/app');
    }, 300);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-bliv-bg">
      {/* Left Column: Editorial Brand Panel */}
      <div className="lg:col-span-5 bg-[#DDE8DF]/40 border-r border-bliv-border p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden">
        {/* Soft background aura */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-bliv-sage/60 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#EDEAE3]/80 blur-3xl" />

        <div className="relative z-10">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-14">
            <div className="w-9 h-9 rounded-xl bg-bliv-dark flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h5m4 0h5M12 5v5m0 4v5" stroke="#DDE8DF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-bliv-dark">
              BLIV
            </span>
          </Link>

          {/* Heading */}
          <div className="space-y-4 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-bliv-border text-xs font-semibold uppercase tracking-wider text-bliv-green shadow-subtle">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Clinician Portal</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-bliv-dark tracking-tight leading-tight">
              Your clinical workspace, in one place.
            </h1>
            <p className="text-sm sm:text-base text-bliv-text-secondary leading-relaxed">
              Everything you need to keep your clinic organised, connected, and moving forward.
            </p>
          </div>
        </div>

        {/* Bottom Benefits */}
        <div className="relative z-10 pt-10 border-t border-bliv-border/60 space-y-3">
          <div className="flex items-center gap-2.5 text-xs text-bliv-text-primary">
            <CheckCircle2 className="w-4 h-4 text-bliv-green shrink-0" />
            <span>Encrypted clinician session management</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-bliv-text-primary">
            <CheckCircle2 className="w-4 h-4 text-bliv-green shrink-0" />
            <span>Role-attributed audit traceability</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-bliv-text-primary">
            <CheckCircle2 className="w-4 h-4 text-bliv-green shrink-0" />
            <span>Dedicated outpatient telehealth workflows</span>
          </div>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8 bg-bliv-surface p-8 sm:p-10 rounded-bliv-lg border border-bliv-border shadow-card">
          <div>
            <h2 className="font-heading text-2xl font-bold text-bliv-dark tracking-tight">
              Clinician Sign In
            </h2>
            <p className="text-xs sm:text-sm text-bliv-text-secondary mt-1">
              Enter your clinic credentials or use the instant demo entry.
            </p>
          </div>

          {/* Quick Demo Entry Card */}
          <div className="p-3.5 rounded-bliv bg-bliv-surface-secondary border border-bliv-border flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-bliv-dark">Explore as Dr. Amelia Carter</p>
              <p className="text-[11px] text-bliv-text-secondary">Lead General Practitioner</p>
            </div>
            <Button
              size="sm"
              variant="primary"
              onClick={handleOneClickDemo}
              isLoading={isLoading}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="text-xs h-8"
            >
              Demo Access
            </Button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-bliv-border w-full" />
            <span className="bg-bliv-surface px-3 text-[11px] uppercase tracking-wider text-bliv-text-secondary font-medium">
              or enter credentials
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-bliv bg-[#faecea] border border-[#f2d0cc] text-xs text-[#8e3c35]">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-bliv-text-secondary absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="doctor@blivhealth.internal"
                  required
                  className="w-full bg-bliv-surface border border-bliv-border rounded-bliv text-sm text-bliv-text-primary py-2.5 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-bliv-green/30 focus:border-bliv-green transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo notice: Pre-filled with demo credentials.')}
                  className="text-xs text-bliv-green hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-bliv-text-secondary absolute left-3 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full bg-bliv-surface border border-bliv-border rounded-bliv text-sm text-bliv-text-primary py-2.5 pl-9 pr-10 focus:outline-none focus:ring-2 focus:ring-bliv-green/30 focus:border-bliv-green transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-bliv-text-secondary hover:text-bliv-dark p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-bliv-text-secondary">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-bliv-border text-bliv-green focus:ring-bliv-green/30"
                />
                <span>Remember this clinician device</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 mt-2"
              isLoading={isLoading}
            >
              Sign In to Workspace
            </Button>
          </form>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-bliv-text-secondary hover:text-bliv-dark transition-colors">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
