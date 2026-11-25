import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bliv-surface border-t border-bliv-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-bliv-dark flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h5m4 0h5M12 5v5m0 4v5" stroke="#DDE8DF" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-lg tracking-tight text-bliv-dark">
                BLIV
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-bliv-text-secondary max-w-sm leading-relaxed mb-4">
              Clinical care, thoughtfully organised. The clinician-first telehealth management workspace designed for modern outpatient care.
            </p>
            <div className="text-xs text-bliv-text-secondary/80">
              Demo Release 2026 • Internal Evaluation
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-bliv-dark mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-bliv-text-secondary">
              <li>
                <a href="#platform" className="hover:text-bliv-dark transition-colors">Platform</a>
              </li>
              <li>
                <a href="#features" className="hover:text-bliv-dark transition-colors">Features</a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-bliv-dark transition-colors">Workflow</a>
              </li>
              <li>
                <a href="#security" className="hover:text-bliv-dark transition-colors">Security</a>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-bliv-dark mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-bliv-text-secondary">
              <li>
                <Link to="/app/patients" className="hover:text-bliv-dark transition-colors">Patient management</Link>
              </li>
              <li>
                <Link to="/app/records" className="hover:text-bliv-dark transition-colors">Clinical records</Link>
              </li>
              <li>
                <Link to="/app/calendar" className="hover:text-bliv-dark transition-colors">Calendar</Link>
              </li>
              <li>
                <Link to="/app/audit" className="hover:text-bliv-dark transition-colors">Audit trail</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-bliv-dark mb-3">
              Contact
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-bliv-text-secondary">
              <li>
                <span className="cursor-pointer hover:text-bliv-dark transition-colors" onClick={() => alert('Demo prototype mode: contact forms are disabled.')}>
                  Get in touch
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-bliv-dark transition-colors" onClick={() => alert('Project enquiries available via Upwork.')}>
                  Project enquiries
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-bliv-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bliv-text-secondary">
          <p>© 2026 BLIV. Clinical care, thoughtfully organised.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-bliv-dark transition-colors p-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
