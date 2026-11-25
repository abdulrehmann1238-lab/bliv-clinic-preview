import React from 'react';
import { Users, FileText, Calendar, ShieldCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const points = [
    { icon: <Users className="w-4 h-4 text-bliv-green" />, text: 'Patient management' },
    { icon: <FileText className="w-4 h-4 text-bliv-green" />, text: 'Clinical documentation' },
    { icon: <Calendar className="w-4 h-4 text-bliv-green" />, text: 'Appointment scheduling' },
    { icon: <ShieldCheck className="w-4 h-4 text-bliv-green" />, text: 'Activity transparency' },
  ];

  return (
    <section className="border-y border-bliv-border bg-bliv-surface py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary text-center md:text-left shrink-0">
            Designed around the clinician workflow
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {points.map((pt, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-bliv-text-primary">
                {pt.icon}
                <span>{pt.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
