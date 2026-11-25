import React from 'react';
import { ShieldCheck, Lock, Eye, KeyRound, Server } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const principles = [
    {
      title: 'Clinician-only access model',
      desc: 'Zero unverified accounts. Clean separation between clinical practitioners and administrative care teams.',
      icon: <Lock className="w-5 h-5 text-bliv-green" />,
    },
    {
      title: 'Role-aware architecture',
      desc: 'Scoped authorization boundaries determining who can view, amend, or archive sensitive clinical documentation.',
      icon: <KeyRound className="w-5 h-5 text-bliv-green" />,
    },
    {
      title: 'Encrypted data handling',
      desc: 'Production deployment specs require TLS 1.3 transit encryption and AES-256 encrypted storage volumes.',
      icon: <Server className="w-5 h-5 text-bliv-green" />,
    },
    {
      title: 'Traceable record changes',
      desc: 'Immutable audit trail logging every consult note update, rescheduling event, and document attachment.',
      icon: <Eye className="w-5 h-5 text-bliv-green" />,
    },
  ];

  return (
    <section id="security" className="py-24 bg-bliv-surface border-t border-bliv-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bliv-surface-secondary text-xs font-semibold uppercase tracking-wider text-bliv-green mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Healthcare Governance</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-bliv-dark tracking-tight">
            Privacy belongs at the foundation.
          </h2>
          <p className="text-base sm:text-lg text-bliv-text-secondary mt-3">
            Designed with privacy-conscious workflows in mind to support modern telehealth standards.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {principles.map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-bliv-lg bg-bliv-bg border border-bliv-border shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-bliv bg-bliv-surface flex items-center justify-center mb-4 shadow-sm">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-bliv-dark mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-bliv-text-secondary leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Small explanatory disclaimer banner */}
        <div className="p-4 sm:p-5 rounded-bliv bg-bliv-surface-secondary/70 border border-bliv-border text-center max-w-3xl mx-auto">
          <p className="text-xs text-bliv-text-secondary leading-relaxed">
            <strong className="text-bliv-dark">Prototype Disclaimer:</strong> This interactive sales demonstration uses fictional mock patient records persisted locally in browser storage. Production compliance (including HIPAA, GDPR, or UK Data Protection Act) depends on implementation, infrastructure, access controls, contractual safeguards, and operational policies.
          </p>
        </div>
      </div>
    </section>
  );
};
