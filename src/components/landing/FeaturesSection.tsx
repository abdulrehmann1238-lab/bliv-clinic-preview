import React from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardList, CalendarDays, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FeaturesSection: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'patients',
      title: 'Patient Management',
      icon: <Users className="w-5 h-5 text-bliv-green" />,
      description: 'Keep patient profiles organised, accessible, and easy to update.',
      route: '/app/patients',
      preview: (
        <div className="p-3 bg-bliv-surface rounded-bliv border border-bliv-border space-y-2 mt-4 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-bliv-border">
            <span className="font-semibold text-bliv-dark">Directory Registry</span>
            <span className="text-[10px] bg-bliv-sage/60 text-bliv-dark px-1.5 py-0.2 rounded-full font-medium">12 active</span>
          </div>
          <div className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-bliv-surface-secondary">
            <div>
              <p className="font-medium text-bliv-dark text-[11px]">Olivia Bennett</p>
              <p className="text-[10px] text-bliv-text-secondary">BLV-1001 • A+</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-bliv-success" />
          </div>
          <div className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-bliv-surface-secondary">
            <div>
              <p className="font-medium text-bliv-dark text-[11px]">Ethan Brooks</p>
              <p className="text-[10px] text-bliv-text-secondary">BLV-1002 • O+</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-bliv-success" />
          </div>
        </div>
      ),
    },
    {
      id: 'records',
      title: 'Clinical Records',
      icon: <ClipboardList className="w-5 h-5 text-bliv-green" />,
      description: 'Keep consultation notes and supporting documents connected to the right patient.',
      route: '/app/records',
      preview: (
        <div className="p-3 bg-bliv-surface rounded-bliv border border-bliv-border space-y-2 mt-4 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-bliv-border">
            <span className="font-semibold text-bliv-dark">Consultation Note</span>
            <span className="text-[10px] text-bliv-text-secondary">20 Nov 2024</span>
          </div>
          <p className="text-[11px] text-bliv-text-secondary leading-snug line-clamp-2">
            Patient attended virtual check-in for blood pressure monitoring and medication adjustment...
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] px-2 py-0.5 rounded bg-bliv-surface-secondary border border-bliv-border text-bliv-text-primary flex items-center gap-1 font-mono">
              📄 summary.pdf (245 KB)
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'calendar',
      title: 'Appointment Calendar',
      icon: <CalendarDays className="w-5 h-5 text-bliv-green" />,
      description: 'Plan your clinic schedule and connect every appointment to a patient record.',
      route: '/app/calendar',
      preview: (
        <div className="p-3 bg-bliv-surface rounded-bliv border border-bliv-border space-y-2 mt-4 text-xs">
          <div className="grid grid-cols-5 gap-1 text-[10px] text-center text-bliv-text-secondary font-medium pb-1 border-b border-bliv-border">
            <span>Mon</span>
            <span>Tue</span>
            <span className="font-bold text-bliv-dark">Wed</span>
            <span>Thu</span>
            <span>Fri</span>
          </div>
          <div className="space-y-1">
            <div className="p-1.5 rounded bg-[#eaf3ec] border border-[#d2e4d6] text-[10px]">
              <span className="font-semibold text-[#366141]">09:00</span> — Follow-up (O. Bennett)
            </div>
            <div className="p-1.5 rounded bg-bliv-surface-secondary border border-bliv-border text-[10px]">
              <span className="font-semibold text-bliv-dark">11:15</span> — Intake (E. Brooks)
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'audit',
      title: 'Audit Trail',
      icon: <ShieldCheck className="w-5 h-5 text-bliv-green" />,
      description: 'See who changed what and when through a clear activity history.',
      route: '/app/audit',
      preview: (
        <div className="p-3 bg-bliv-surface rounded-bliv border border-bliv-border space-y-2 mt-4 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-bliv-border">
            <span className="font-semibold text-bliv-dark">Traceable Activity</span>
            <span className="text-[10px] text-bliv-green font-medium">Logged</span>
          </div>
          <div className="space-y-1 text-[10px]">
            <p className="text-bliv-dark font-medium">Dr. Amelia Carter</p>
            <p className="text-bliv-text-secondary">Updated consultation notes • 10:18 AM</p>
          </div>
          <div className="space-y-1 text-[10px] pt-1 border-t border-bliv-border/60">
            <p className="text-bliv-dark font-medium">Dr. James Wilson</p>
            <p className="text-bliv-text-secondary">Rescheduled appointment • 11:06 AM</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 bg-bliv-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-bliv-dark tracking-tight">
            Everything your clinic needs. Nothing it doesn't.
          </h2>
          <p className="text-base sm:text-lg text-bliv-text-secondary mt-3 leading-relaxed">
            A focused workspace built around the everyday tasks that keep care organised.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => navigate(feat.route)}
              className="bg-bliv-surface rounded-bliv-lg border border-bliv-border p-6 shadow-subtle hover:shadow-card hover:border-bliv-sage-muted transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-bliv bg-bliv-sage/40 flex items-center justify-center mb-4 group-hover:bg-bliv-sage transition-colors">
                  {feat.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-bliv-dark tracking-tight mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-bliv-text-secondary leading-relaxed mb-3">
                  {feat.description}
                </p>
              </div>

              <div>
                {feat.preview}
                <div className="flex items-center gap-1 text-xs font-semibold text-bliv-green mt-4 group-hover:translate-x-1 transition-transform">
                  <span>Open module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
