import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Plus, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  ShieldCheck,
  CheckCircle2,
  Calendar,
  UserPlus,
  FilePlus,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onOpenMobileMenu }) => {
  const { 
    currentUser, 
    logout, 
    setIsSearchModalOpen,
    setIsAddPatientModalOpen,
    setIsAddAppointmentModalOpen,
    setIsAddRecordModalOpen,
    resetDemoData,
    auditEvents
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Determine current page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/app') return { title: 'Overview', section: 'Clinic Dashboard' };
    if (path.startsWith('/app/patients/')) return { title: 'Patient Profile', section: 'Patients Directory' };
    if (path.startsWith('/app/patients')) return { title: 'Patients Directory', section: 'Patient Management' };
    if (path.startsWith('/app/records')) return { title: 'Medical Records', section: 'Clinical Documentation' };
    if (path.startsWith('/app/calendar')) return { title: 'Appointment Calendar', section: 'Clinic Schedule' };
    if (path.startsWith('/app/audit')) return { title: 'Audit Trail', section: 'System Governance' };
    if (path.startsWith('/app/settings')) return { title: 'Settings', section: 'Preferences & FHIR' };
    return { title: 'Workspace', section: 'BLIV' };
  };

  const { title, section } = getPageTitle();

  return (
    <header className="h-16 bg-bliv-surface border-b border-bliv-border px-4 sm:px-6 flex items-center justify-between relative z-30 shrink-0">
      {/* Left: Mobile hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded-bliv text-bliv-text-secondary hover:text-bliv-dark md:hidden"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-bliv-text-secondary">
            <span>{section}</span>
            <span>/</span>
            <span className="text-bliv-dark font-medium">{title}</span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-bliv-dark tracking-tight leading-none mt-0.5">
            {title}
          </h2>
        </div>
      </div>

      {/* Centre: Search Button */}
      <div className="hidden sm:flex items-center flex-1 max-w-sm mx-6">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-bliv bg-bliv-surface-secondary border border-bliv-border text-xs text-bliv-text-secondary hover:border-bliv-sage-muted transition-colors"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-bliv-text-secondary" />
            <span>Search patients, records, schedule...</span>
          </span>
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-bliv-surface border border-bliv-border text-bliv-text-secondary">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Quick actions, notifications, demo tag, avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Subtle Demo Environment Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bliv-surface-secondary border border-bliv-border text-[11px] font-medium text-bliv-text-secondary">
          <span className="w-1.5 h-1.5 rounded-full bg-bliv-green" />
          <span>Demo Environment</span>
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={resetDemoData}
          title="Reset demo data to defaults"
          className="p-2 rounded-bliv text-bliv-text-secondary hover:text-bliv-dark hover:bg-bliv-surface-secondary transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Quick Action (+) Dropdown */}
        <div className="relative">
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
            icon={<Plus className="w-4 h-4" />}
            className="h-8 px-2.5 sm:px-3 text-xs"
          >
            <span className="hidden sm:inline">New</span>
          </Button>

          {isQuickActionOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setIsQuickActionOpen(false)} />
              <div className="absolute right-0 mt-2 w-52 bg-bliv-surface rounded-bliv border border-bliv-border shadow-float p-1.5 z-50 text-xs">
                <button
                  onClick={() => {
                    setIsQuickActionOpen(false);
                    setIsAddPatientModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-left hover:bg-bliv-surface-secondary text-bliv-dark"
                >
                  <UserPlus className="w-4 h-4 text-bliv-green" />
                  <span>Register Patient</span>
                </button>
                <button
                  onClick={() => {
                    setIsQuickActionOpen(false);
                    setIsAddAppointmentModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-left hover:bg-bliv-surface-secondary text-bliv-dark"
                >
                  <Calendar className="w-4 h-4 text-bliv-green" />
                  <span>Schedule Appointment</span>
                </button>
                <button
                  onClick={() => {
                    setIsQuickActionOpen(false);
                    setIsAddRecordModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-left hover:bg-bliv-surface-secondary text-bliv-dark"
                >
                  <FilePlus className="w-4 h-4 text-bliv-green" />
                  <span>Add Clinical Record</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-bliv text-bliv-text-secondary hover:text-bliv-dark hover:bg-bliv-surface-secondary transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-bliv-green ring-2 ring-bliv-surface" />
          </button>

          {isNotifOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setIsNotifOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-bliv-surface rounded-bliv border border-bliv-border shadow-float p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-bliv-border">
                  <span className="font-semibold text-bliv-dark">Recent Notifications</span>
                  <span className="text-[10px] text-bliv-green font-medium">Auto-synced</span>
                </div>
                <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                  {auditEvents.slice(0, 3).map(event => (
                    <div key={event.id} className="p-2 rounded bg-bliv-bg border border-bliv-border">
                      <p className="font-medium text-bliv-dark text-[11px]">{event.action}</p>
                      <p className="text-[10px] text-bliv-text-secondary mt-0.5">{event.description}</p>
                      <span className="text-[9px] text-bliv-text-secondary/70 block mt-1">
                        {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/app/audit');
                  }}
                  className="w-full text-center py-1.5 text-[11px] font-semibold text-bliv-green hover:underline border-t border-bliv-border mt-1 block"
                >
                  View full audit log
                </button>
              </div>
            </>
          )}
        </div>

        {/* Clinician Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-bliv hover:bg-bliv-surface-secondary transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-bliv-border"
            />
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-bliv-surface rounded-bliv border border-bliv-border shadow-float p-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-bliv-border mb-1">
                  <p className="font-semibold text-bliv-dark truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-bliv-text-secondary truncate">{currentUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/app/settings');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-left hover:bg-bliv-surface-secondary text-bliv-dark"
                >
                  <User className="w-3.5 h-3.5 text-bliv-text-secondary" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/app/settings');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-left hover:bg-bliv-surface-secondary text-bliv-dark"
                >
                  <Settings className="w-3.5 h-3.5 text-bliv-text-secondary" />
                  <span>Workspace Settings</span>
                </button>
                <div className="border-t border-bliv-border my-1" />
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-left hover:bg-[#faecea] text-bliv-error"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
