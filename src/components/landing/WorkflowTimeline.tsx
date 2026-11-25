import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Calendar, FileEdit, History } from 'lucide-react';

export const WorkflowTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Add your patient',
      desc: 'Create verified patient profiles with contact details, allergies, and emergency points of contact in seconds.',
      icon: <UserPlus className="w-5 h-5 text-bliv-green" />,
    },
    {
      num: '02',
      title: 'Schedule an appointment',
      desc: 'Set up initial or follow-up consultations with instant clinician calendar allocation and conflict checks.',
      icon: <Calendar className="w-5 h-5 text-bliv-green" />,
    },
    {
      num: '03',
      title: 'Document the consultation',
      desc: 'Capture structured clinical notes, assessment findings, treatment plans, and document attachments.',
      icon: <FileEdit className="w-5 h-5 text-bliv-green" />,
    },
    {
      num: '04',
      title: 'Review the activity history',
      desc: 'Maintain transparent audit trails of every record mutation, status transition, and clinician interaction.',
      icon: <History className="w-5 h-5 text-bliv-green" />,
    },
  ];

  return (
    <section id="workflow" className="py-24 bg-bliv-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bliv-surface border border-bliv-border text-xs font-semibold uppercase tracking-wider text-bliv-green mb-3">
            <span>Seamless Clinical Flow</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-bliv-dark tracking-tight">
            From appointment to clinical record.
          </h2>
          <p className="text-base sm:text-lg text-bliv-text-secondary mt-3">
            Designed to match how modern telehealth clinicians actually work every day.
          </p>
        </div>

        {/* 4-step horizontal timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-bliv-surface p-6 rounded-bliv-lg border border-bliv-border shadow-subtle flex flex-col justify-between relative group hover:border-bliv-sage-muted transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-heading font-extrabold text-2xl text-bliv-sage-muted/70 group-hover:text-bliv-green transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-bliv bg-bliv-surface-secondary flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-heading text-lg font-bold text-bliv-dark tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-bliv-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-bliv-border/60 flex items-center justify-between text-[11px] text-bliv-text-secondary">
                <span className="font-mono uppercase">Step {step.num} of 04</span>
                <span className="w-2 h-2 rounded-full bg-bliv-sage group-hover:bg-bliv-green transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
