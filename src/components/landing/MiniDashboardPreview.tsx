import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Search,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MiniDashboardPreview: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'schedule' | 'patients'>('schedule');

  return (
    <div className="relative w-full max-w-lg lg:max-w-none mx-auto">
      {/* Decorative subtle aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-bliv-sage/60 via-bliv-green/20 to-bliv-sage/40 rounded-2xl blur-xl opacity-70 -z-10" />

      {/* Main Miniature Application Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-bliv-surface rounded-bliv-lg border border-bliv-border shadow-float overflow-hidden flex flex-col select-none"
      >
        {/* Top Mini Window Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-bliv-surface-secondary/70 border-b border-bliv-border text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5B5B1]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E8D4A8]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#B2D0BC]" />
            <span className="ml-2 font-medium text-[11px] text-bliv-text-secondary">BLIV Clinician Workspace — Live Session</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-bliv-green font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-bliv-green animate-pulse" />
            <span>Online</span>
          </div>
        </div>

        {/* Interior layout: Mini Sidebar + Mini Content */}
        <div className="flex min-h-[380px]">
          {/* Mini Sidebar */}
          <div className="w-40 border-r border-bliv-border bg-bliv-surface p-3 hidden sm:flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 px-1">
                <div className="w-5 h-5 rounded bg-bliv-dark flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-bliv-sage" />
                </div>
                <span className="font-heading font-bold text-xs text-bliv-dark">BLIV Clinic</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-bliv-sm bg-bliv-sage/50 text-bliv-dark font-medium">
                  <Activity className="w-3.5 h-3.5 text-bliv-green" />
                  <span>Overview</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-bliv-sm text-bliv-text-secondary hover:text-bliv-dark">
                  <Users className="w-3.5 h-3.5" />
                  <span>Patients</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-bliv-sm text-bliv-text-secondary hover:text-bliv-dark">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Records</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-bliv-sm text-bliv-text-secondary hover:text-bliv-dark">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Calendar</span>
                </div>
              </div>
            </div>

            {/* Clinician badge */}
            <div className="p-2 rounded-bliv-sm bg-bliv-surface-secondary flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-bliv-dark text-white text-[10px] flex items-center justify-center font-bold">
                AC
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-semibold text-bliv-dark truncate">Dr. Amelia</p>
                <p className="text-[9px] text-bliv-text-secondary truncate">Consultant</p>
              </div>
            </div>
          </div>

          {/* Mini Main Content */}
          <div className="flex-1 p-4 bg-bliv-bg flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-bold text-bliv-dark tracking-tight">Good morning, Dr. Amelia</h4>
                  <p className="text-[11px] text-bliv-text-secondary">4 virtual consultations scheduled today</p>
                </div>
                <button
                  onClick={() => navigate('/app')}
                  className="text-[10px] font-semibold text-bliv-green bg-bliv-surface border border-bliv-border px-2.5 py-1 rounded-bliv hover:bg-bliv-surface-secondary flex items-center gap-1 transition-colors"
                >
                  <span>Open Full App</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Quick Stat Tiles */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-bliv-surface p-2.5 rounded-bliv border border-bliv-border">
                  <span className="text-[10px] text-bliv-text-secondary block">Patients</span>
                  <span className="text-base font-bold text-bliv-dark">248</span>
                </div>
                <div className="bg-bliv-surface p-2.5 rounded-bliv border border-bliv-border">
                  <span className="text-[10px] text-bliv-text-secondary block">Today</span>
                  <span className="text-base font-bold text-bliv-green">12</span>
                </div>
                <div className="bg-bliv-surface p-2.5 rounded-bliv border border-bliv-border">
                  <span className="text-[10px] text-bliv-text-secondary block">Records</span>
                  <span className="text-base font-bold text-bliv-dark">186</span>
                </div>
              </div>

              {/* Mini Tab switcher */}
              <div className="flex gap-2 mb-2 border-b border-bliv-border pb-1">
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`text-xs font-medium pb-1 transition-colors ${
                    activeTab === 'schedule'
                      ? 'text-bliv-dark border-b-2 border-bliv-dark font-semibold'
                      : 'text-bliv-text-secondary hover:text-bliv-dark'
                  }`}
                >
                  Today's Consultations
                </button>
                <button
                  onClick={() => setActiveTab('patients')}
                  className={`text-xs font-medium pb-1 transition-colors ${
                    activeTab === 'patients'
                      ? 'text-bliv-dark border-b-2 border-bliv-dark font-semibold'
                      : 'text-bliv-text-secondary hover:text-bliv-dark'
                  }`}
                >
                  Recent Patients
                </button>
              </div>

              {/* Dynamic Mini List */}
              {activeTab === 'schedule' ? (
                <div className="space-y-1.5">
                  <div 
                    onClick={() => navigate('/app/calendar')}
                    className="p-2 rounded-bliv bg-bliv-surface border border-bliv-border flex items-center justify-between text-xs cursor-pointer hover:border-bliv-green transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-bliv-green" />
                      <div>
                        <p className="font-semibold text-bliv-dark text-[11px]">Olivia Bennett</p>
                        <p className="text-[10px] text-bliv-text-secondary">Hypertension Review • 09:00 AM</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-semibold bg-[#eaf3ec] text-[#366141] px-1.5 py-0.5 rounded-full">
                      Confirmed
                    </span>
                  </div>

                  <div 
                    onClick={() => navigate('/app/calendar')}
                    className="p-2 rounded-bliv bg-bliv-surface border border-bliv-border flex items-center justify-between text-xs cursor-pointer hover:border-bliv-green transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-bliv-text-secondary" />
                      <div>
                        <p className="font-semibold text-bliv-dark text-[11px]">Ethan Brooks</p>
                        <p className="text-[10px] text-bliv-text-secondary">Type 2 Diabetes Check • 11:15 AM</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-semibold bg-bliv-surface-secondary text-bliv-text-secondary px-1.5 py-0.5 rounded-full">
                      Scheduled
                    </span>
                  </div>

                  <div 
                    onClick={() => navigate('/app/calendar')}
                    className="p-2 rounded-bliv bg-bliv-surface border border-bliv-border flex items-center justify-between text-xs cursor-pointer hover:border-bliv-green transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-bliv-text-secondary" />
                      <div>
                        <p className="font-semibold text-bliv-dark text-[11px]">Ava Thompson</p>
                        <p className="text-[10px] text-bliv-text-secondary">Sleep & Anxiety Review • 02:00 PM</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-semibold bg-bliv-surface-secondary text-bliv-text-secondary px-1.5 py-0.5 rounded-full">
                      Scheduled
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div 
                    onClick={() => navigate('/app/patients/pat-1001')}
                    className="p-2 rounded-bliv bg-bliv-surface border border-bliv-border flex items-center justify-between text-xs cursor-pointer hover:border-bliv-green transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-bliv-dark text-[11px]">Olivia Bennett (BLV-1001)</p>
                      <p className="text-[10px] text-bliv-text-secondary">London • A+ • Blood Pressure</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-bliv-text-secondary" />
                  </div>
                  <div 
                    onClick={() => navigate('/app/patients/pat-1002')}
                    className="p-2 rounded-bliv bg-bliv-surface border border-bliv-border flex items-center justify-between text-xs cursor-pointer hover:border-bliv-green transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-bliv-dark text-[11px]">Ethan Brooks (BLV-1002)</p>
                      <p className="text-[10px] text-bliv-text-secondary">Cambridge • O+ • Type 2 Diabetes</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-bliv-text-secondary" />
                  </div>
                  <div 
                    onClick={() => navigate('/app/patients/pat-1003')}
                    className="p-2 rounded-bliv bg-bliv-surface border border-bliv-border flex items-center justify-between text-xs cursor-pointer hover:border-bliv-green transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-bliv-dark text-[11px]">Sophia Mitchell (BLV-1003)</p>
                      <p className="text-[10px] text-bliv-text-secondary">Oxford • B- • Asthma Care</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-bliv-text-secondary" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom mini status bar */}
            <div className="mt-3 pt-2 border-t border-bliv-border flex items-center justify-between text-[10px] text-bliv-text-secondary">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-bliv-green" />
                Audit logging active
              </span>
              <span className="font-mono">v1.0-demo</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
