import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  History, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { clsx } from 'clsx';
import { useApp } from '../../context/AppContext';

interface AppSidebarProps {
  onCloseMobile?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ onCloseMobile }) => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Overview', to: '/app', icon: <LayoutDashboard className="w-4 h-4" />, end: true },
    { label: 'Patients', to: '/app/patients', icon: <Users className="w-4 h-4" />, count: 12 },
    { label: 'Medical Records', to: '/app/records', icon: <FileText className="w-4 h-4" /> },
    { label: 'Calendar', to: '/app/calendar', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Audit Trail', to: '/app/audit', icon: <History className="w-4 h-4" /> },
  ];

  const handleLinkClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 h-full bg-bliv-surface border-r border-bliv-border flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-bliv-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-bliv-dark flex items-center justify-center shadow-subtle group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h5m4 0h5M12 5v5m0 4v5" stroke="#DDE8DF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg tracking-tight text-bliv-dark block leading-none">
                BLIV
              </span>
              <span className="text-[10px] text-bliv-text-secondary tracking-tight font-medium">
                Clinical Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <div className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-bliv-text-secondary/70">
            Main Clinical
          </div>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                clsx(
                  'flex items-center justify-between px-3 py-2 rounded-bliv text-xs font-medium transition-all group',
                  isActive
                    ? 'bg-bliv-sage text-bliv-dark font-semibold shadow-subtle'
                    : 'text-bliv-text-secondary hover:text-bliv-dark hover:bg-bliv-surface-secondary'
                )
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-current">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-bliv-surface-secondary text-bliv-text-secondary font-mono group-hover:bg-bliv-surface">
                  {item.count}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom section: Settings, Help, Profile */}
      <div className="p-3 border-t border-bliv-border space-y-1">
        <NavLink
          to="/app/settings"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-3 py-2 rounded-bliv text-xs font-medium transition-all',
              isActive
                ? 'bg-bliv-sage text-bliv-dark font-semibold'
                : 'text-bliv-text-secondary hover:text-bliv-dark hover:bg-bliv-surface-secondary'
            )
          }
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </NavLink>

        <button
          onClick={() => {
            alert('BLIV Telehealth Platform Documentation: Built for sales demonstration. Fully typed with FHIR mappings.');
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-bliv text-xs font-medium text-bliv-text-secondary hover:text-bliv-dark hover:bg-bliv-surface-secondary transition-colors"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </div>
          <ExternalLink className="w-3 h-3 text-bliv-text-secondary/70" />
        </button>

        {/* Clinician Profile Tile */}
        <div className="pt-2 mt-2 border-t border-bliv-border/60">
          <div className="p-2.5 rounded-bliv bg-bliv-surface-secondary/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-bliv-border shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-bliv-dark truncate leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-bliv-text-secondary truncate">
                  {currentUser.specialty.split('&')[0]}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="p-1 rounded text-bliv-text-secondary hover:text-bliv-error transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
