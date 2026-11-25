import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  ArrowRight, 
  Search, 
  Clock, 
  Plus, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'calendar' | 'records'>('overview');
  const navigate = useNavigate();

  return (
    <section id="platform" className="py-24 bg-bliv-surface border-y border-bliv-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bliv-surface-secondary text-xs font-semibold uppercase tracking-wider text-bliv-dark mb-3">
            <span>Unified Platform Experience</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-bliv-dark tracking-tight">
            One workspace. A clearer picture of every patient.
          </h2>
          <p className="text-base sm:text-lg text-bliv-text-secondary mt-3">
            Explore live previews of the key clinician interfaces. Click between modules to test the interactive views.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-bliv-lg bg-bliv-surface-secondary border border-bliv-border shadow-inner">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-bliv text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-bliv-surface text-bliv-dark shadow-sm'
                  : 'text-bliv-text-secondary hover:text-bliv-dark'
              }`}
            >
              <Activity className="w-4 h-4 text-bliv-green" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`flex items-center gap-2 px-4 py-2 rounded-bliv text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'patients'
                  ? 'bg-bliv-surface text-bliv-dark shadow-sm'
                  : 'text-bliv-text-secondary hover:text-bliv-dark'
              }`}
            >
              <Users className="w-4 h-4 text-bliv-green" />
              <span>Patients</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-bliv text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'calendar'
                  ? 'bg-bliv-surface text-bliv-dark shadow-sm'
                  : 'text-bliv-text-secondary hover:text-bliv-dark'
              }`}
            >
              <Calendar className="w-4 h-4 text-bliv-green" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`flex items-center gap-2 px-4 py-2 rounded-bliv text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'records'
                  ? 'bg-bliv-surface text-bliv-dark shadow-sm'
                  : 'text-bliv-text-secondary hover:text-bliv-dark'
              }`}
            >
              <FileText className="w-4 h-4 text-bliv-green" />
              <span>Records</span>
            </button>
          </div>
        </div>

        {/* Large Interactive Dashboard Showcase Window */}
        <div className="bg-bliv-bg rounded-bliv-lg border border-bliv-border shadow-float overflow-hidden">
          {/* Top Mock Window chrome */}
          <div className="px-5 py-3.5 bg-bliv-surface border-b border-bliv-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B5B1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8D4A8]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#B2D0BC]" />
              <span className="font-mono text-[11px] text-bliv-text-secondary ml-2">
                app.bliv.internal/{activeTab}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-bliv-text-secondary">Clinician Session</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/app/${activeTab === 'overview' ? '' : activeTab}`)}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
                className="text-xs h-7 py-0"
              >
                Launch screen
              </Button>
            </div>
          </div>

          {/* Dynamic Content Body based on tab */}
          <div className="p-6 md:p-8 min-h-[460px]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="tab-overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-bliv-dark tracking-tight">Good morning, Dr. Amelia</h3>
                      <p className="text-xs sm:text-sm text-bliv-text-secondary">Here's what's happening at your clinic today.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => navigate('/app/patients')}>
                        + Add patient
                      </Button>
                      <Button size="sm" variant="primary" onClick={() => navigate('/app/calendar')}>
                        + Schedule appointment
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle">
                      <span className="text-xs text-bliv-text-secondary">Total patients</span>
                      <p className="text-2xl font-bold text-bliv-dark mt-1">248</p>
                      <span className="text-[10px] text-bliv-green font-medium">+12 this month</span>
                    </div>
                    <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle">
                      <span className="text-xs text-bliv-text-secondary">Appointments today</span>
                      <p className="text-2xl font-bold text-bliv-green mt-1">12</p>
                      <span className="text-[10px] text-bliv-text-secondary">5 telehealth video</span>
                    </div>
                    <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle">
                      <span className="text-xs text-bliv-text-secondary">Upcoming this week</span>
                      <p className="text-2xl font-bold text-bliv-dark mt-1">08</p>
                      <span className="text-[10px] text-bliv-text-secondary">Fully confirmed</span>
                    </div>
                    <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle">
                      <span className="text-xs text-bliv-text-secondary">Clinical records</span>
                      <p className="text-2xl font-bold text-bliv-dark mt-1">186</p>
                      <span className="text-[10px] text-bliv-text-secondary">Audited & verified</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-bliv-surface p-5 rounded-bliv border border-bliv-border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-bliv-dark">Today's Appointments</h4>
                        <span className="text-xs text-bliv-green font-medium cursor-pointer" onClick={() => navigate('/app/calendar')}>
                          View Calendar →
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded bg-bliv-bg border border-bliv-border flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-bliv-dark">Olivia Bennett</span>
                            <p className="text-bliv-text-secondary text-[11px]">09:00 AM • Follow-up Consultation</p>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#eaf3ec] text-[#366141]">
                            Confirmed
                          </span>
                        </div>
                        <div className="p-2.5 rounded bg-bliv-bg border border-bliv-border flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-bliv-dark">Sophia Mitchell</span>
                            <p className="text-bliv-text-secondary text-[11px]">10:00 AM • Peak Flow Review</p>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-bliv-surface-secondary text-bliv-text-secondary">
                            Scheduled
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-bliv-surface p-5 rounded-bliv border border-bliv-border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-bliv-dark">Recent Activity Log</h4>
                        <span className="text-xs text-bliv-green font-medium cursor-pointer" onClick={() => navigate('/app/audit')}>
                          Audit Trail →
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded bg-bliv-bg border border-bliv-border">
                          <p className="font-semibold text-bliv-dark">Dr. Amelia Carter</p>
                          <p className="text-[11px] text-bliv-text-secondary">Updated consultation notes — Olivia Bennett (10:18 AM)</p>
                        </div>
                        <div className="p-2.5 rounded bg-bliv-bg border border-bliv-border">
                          <p className="font-semibold text-bliv-dark">Dr. James Wilson</p>
                          <p className="text-[11px] text-bliv-text-secondary">Rescheduled appointment — Ethan Brooks (11:06 AM)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'patients' && (
                <motion.div
                  key="tab-patients"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-bliv-dark">Patients Directory</h3>
                      <p className="text-xs text-bliv-text-secondary">Manage comprehensive patient profiles and medical history.</p>
                    </div>
                    <Button size="sm" variant="primary" onClick={() => navigate('/app/patients')}>
                      Explore full directory
                    </Button>
                  </div>

                  <div className="bg-bliv-surface rounded-bliv border border-bliv-border overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-bliv-surface-secondary border-b border-bliv-border text-bliv-text-secondary font-medium">
                        <tr>
                          <th className="px-4 py-2.5">Patient</th>
                          <th className="px-4 py-2.5">ID</th>
                          <th className="px-4 py-2.5">Contact</th>
                          <th className="px-4 py-2.5">Condition</th>
                          <th className="px-4 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-bliv-border">
                        <tr className="hover:bg-bliv-bg cursor-pointer" onClick={() => navigate('/app/patients/pat-1001')}>
                          <td className="px-4 py-3 font-semibold text-bliv-dark">Olivia Bennett</td>
                          <td className="px-4 py-3 font-mono text-bliv-text-secondary">BLV-1001</td>
                          <td className="px-4 py-3 text-bliv-text-secondary">olivia.bennett@example.com</td>
                          <td className="px-4 py-3 text-bliv-text-primary">Hypertension Review</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#eaf3ec] text-[#366141]">
                              Active
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-bliv-bg cursor-pointer" onClick={() => navigate('/app/patients/pat-1002')}>
                          <td className="px-4 py-3 font-semibold text-bliv-dark">Ethan Brooks</td>
                          <td className="px-4 py-3 font-mono text-bliv-text-secondary">BLV-1002</td>
                          <td className="px-4 py-3 text-bliv-text-secondary">ethan.brooks@example.com</td>
                          <td className="px-4 py-3 text-bliv-text-primary">Type 2 Diabetes Mellitus</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#eaf3ec] text-[#366141]">
                              Active
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-bliv-bg cursor-pointer" onClick={() => navigate('/app/patients/pat-1003')}>
                          <td className="px-4 py-3 font-semibold text-bliv-dark">Sophia Mitchell</td>
                          <td className="px-4 py-3 font-mono text-bliv-text-secondary">BLV-1003</td>
                          <td className="px-4 py-3 text-bliv-text-secondary">sophia.mitchell@example.com</td>
                          <td className="px-4 py-3 text-bliv-text-primary">Asthma (moderate)</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#eaf3ec] text-[#366141]">
                              Active
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'calendar' && (
                <motion.div
                  key="tab-calendar"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-bliv-dark">Clinic Schedule</h3>
                      <p className="text-xs text-bliv-text-secondary">Synchronised appointments across month, week, day, and agenda views.</p>
                    </div>
                    <Button size="sm" variant="primary" onClick={() => navigate('/app/calendar')}>
                      Open interactive calendar
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border">
                      <span className="text-xs font-semibold text-bliv-green uppercase tracking-wider block mb-2">Morning Slots</span>
                      <div className="space-y-2">
                        <div className="p-2.5 rounded bg-[#eaf3ec] border border-[#d2e4d6] text-xs">
                          <p className="font-semibold text-[#366141]">09:00 - 09:30</p>
                          <p className="text-bliv-dark font-medium">Olivia Bennett</p>
                          <p className="text-[10px] text-bliv-text-secondary">Follow-up Consultation</p>
                        </div>
                        <div className="p-2.5 rounded bg-bliv-surface-secondary border border-bliv-border text-xs">
                          <p className="font-semibold text-bliv-dark">10:00 - 10:45</p>
                          <p className="text-bliv-dark font-medium">Sophia Mitchell</p>
                          <p className="text-[10px] text-bliv-text-secondary">Peak Flow Review</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border">
                      <span className="text-xs font-semibold text-bliv-green uppercase tracking-wider block mb-2">Afternoon Slots</span>
                      <div className="space-y-2">
                        <div className="p-2.5 rounded bg-bliv-surface-secondary border border-bliv-border text-xs">
                          <p className="font-semibold text-bliv-dark">14:00 - 14:45</p>
                          <p className="text-bliv-dark font-medium">Ava Thompson</p>
                          <p className="text-[10px] text-bliv-text-secondary">Initial Intake Session</p>
                        </div>
                        <div className="p-2.5 rounded bg-bliv-surface-secondary border border-bliv-border text-xs">
                          <p className="font-semibold text-bliv-dark">15:30 - 16:00</p>
                          <p className="text-bliv-dark font-medium">Noah Williams</p>
                          <p className="text-[10px] text-bliv-text-secondary">ACL Functional Review</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-semibold text-bliv-green uppercase tracking-wider block mb-2">Calendar Features</span>
                        <ul className="text-xs text-bliv-text-secondary space-y-2">
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-bliv-green" />
                            Overlapping booking prevention
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-bliv-green" />
                            Direct patient profile linking
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-bliv-green" />
                            Clinician filtering & time zoning
                          </li>
                        </ul>
                      </div>
                      <Button size="sm" variant="secondary" onClick={() => navigate('/app/calendar')} className="mt-4">
                        Schedule new appointment
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'records' && (
                <motion.div
                  key="tab-records"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-bliv-dark">Medical Records & Consultation Notes</h3>
                      <p className="text-xs text-bliv-text-secondary">Structured documentation and simulated document attachments.</p>
                    </div>
                    <Button size="sm" variant="primary" onClick={() => navigate('/app/records')}>
                      View all records
                    </Button>
                  </div>

                  <div className="p-5 bg-bliv-surface rounded-bliv border border-bliv-border space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-bliv-green tracking-wider">Consultation note</span>
                        <h4 className="text-base font-bold text-bliv-dark mt-0.5">Hypertension Review & Medication Adjustment</h4>
                        <p className="text-xs text-bliv-text-secondary">Patient: Olivia Bennett (BLV-1001) • Clinician: Dr. Amelia Carter</p>
                      </div>
                      <span className="text-xs font-mono text-bliv-text-secondary">20 Nov 2024</span>
                    </div>

                    <div className="bg-bliv-bg p-3.5 rounded-bliv border border-bliv-border text-xs text-bliv-text-primary leading-relaxed space-y-2">
                      <p>
                        <strong>Clinical Assessment:</strong> Primary hypertension, adequately controlled. Tension-type headaches with migraine features, likely stress-precipitated.
                      </p>
                      <p>
                        <strong>Treatment Plan:</strong> Maintain Ramipril 5mg OD. Advised hydration and sleep continuity. Provided headache diary template for 4-week recording.
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <span className="text-xs font-semibold text-bliv-dark">Attachments:</span>
                      <span className="text-xs px-2.5 py-1 rounded bg-bliv-surface-secondary border border-bliv-border text-bliv-text-primary flex items-center gap-1.5 font-mono">
                        📄 consultation-summary-nov2024.pdf (245 KB)
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded bg-bliv-surface-secondary border border-bliv-border text-bliv-text-primary flex items-center gap-1.5 font-mono">
                        📄 blood-pressure-log-oct-nov.pdf (180 KB)
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
