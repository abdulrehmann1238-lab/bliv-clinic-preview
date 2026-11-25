import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  History, 
  ArrowRight,
  FileText,
  UserPlus,
  RefreshCw,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AuditDetailDrawer } from '../components/audit/AuditDetailDrawer';
import { EmptyState } from '../components/ui/EmptyState';
import { AuditEvent, AuditEntityType } from '../types';
import { mockClinicians } from '../data/mockData';

export const AuditPage: React.FC = () => {
  const { auditEvents } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | AuditEntityType>('All');
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  // Statistics
  const totalActivities = auditEvents.length;
  const patientProfileChanges = auditEvents.filter(e => e.entityType === 'Patient').length;
  const recordUpdates = auditEvents.filter(e => e.entityType === 'ClinicalRecord' || e.entityType === 'Document').length;
  const appointmentChanges = auditEvents.filter(e => e.entityType === 'Appointment').length;

  // Filtered audit events
  const filteredEvents = useMemo(() => {
    return auditEvents.filter(e => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        e.action.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.userName.toLowerCase().includes(q) ||
        e.entityName.toLowerCase().includes(q);

      const matchesUser = userFilter === 'All' || e.userId === userFilter;
      const matchesType = typeFilter === 'All' || e.entityType === typeFilter;

      return matchesSearch && matchesUser && matchesType;
    });
  }, [auditEvents, searchQuery, userFilter, typeFilter]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-bliv-dark tracking-tight">
              Audit Trail
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#eaf3ec] text-[#366141] border border-[#d2e4d6]">
              <ShieldCheck className="w-3 h-3" />
              Traceable
            </span>
          </div>
          <p className="text-xs sm:text-sm text-bliv-text-secondary mt-1">
            A clear history of activity across your clinical workspace. Every record mutation is attributed and timestamped.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-bliv-text-secondary uppercase tracking-wider font-semibold">Total Activities</span>
            <p className="text-2xl font-bold text-bliv-dark mt-0.5">{totalActivities}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-bliv-surface-secondary flex items-center justify-center text-bliv-dark">
            <History className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-bliv-text-secondary uppercase tracking-wider font-semibold">Profile Changes</span>
            <p className="text-2xl font-bold text-bliv-green mt-0.5">{patientProfileChanges}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#eaf3ec] flex items-center justify-center text-[#366141]">
            <UserPlus className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-bliv-text-secondary uppercase tracking-wider font-semibold">Record Updates</span>
            <p className="text-2xl font-bold text-bliv-dark mt-0.5">{recordUpdates}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-bliv-surface-secondary flex items-center justify-center text-bliv-dark">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-bliv-text-secondary uppercase tracking-wider font-semibold">Appointment Changes</span>
            <p className="text-2xl font-bold text-bliv-dark mt-0.5">{appointmentChanges}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-bliv-surface-secondary flex items-center justify-center text-bliv-dark">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-bliv-text-secondary absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search action, user, or patient..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-bliv-surface-secondary border border-bliv-border rounded-bliv text-xs sm:text-sm py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-bliv-green/30 focus:border-bliv-green text-bliv-text-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end text-xs">
          {/* User Filter */}
          <select
            value={userFilter}
            onChange={e => setUserFilter(e.target.value)}
            className="bg-bliv-surface-secondary border border-bliv-border rounded-bliv py-2 px-3 text-bliv-dark focus:outline-none"
          >
            <option value="All">All Clinicians</option>
            {mockClinicians.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Action Entity Type Filter */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as any)}
            className="bg-bliv-surface-secondary border border-bliv-border rounded-bliv py-2 px-3 text-bliv-dark focus:outline-none"
          >
            <option value="All">All Entity Types</option>
            <option value="Patient">Patient Profiles</option>
            <option value="ClinicalRecord">Clinical Records</option>
            <option value="Appointment">Appointments</option>
            <option value="Document">Documents</option>
            <option value="Workspace">Workspace</option>
          </select>
        </div>
      </div>

      {/* Audit Table */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={<History className="w-6 h-6" />}
          title="No audit events found"
          description="No activity entries match your current search query or filter criteria."
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setUserFilter('All');
            setTypeFilter('All');
          }}
        />
      ) : (
        <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-bliv-surface-secondary/70 border-b border-bliv-border text-bliv-text-secondary uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3">Activity / Action</th>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Affected Item</th>
                  <th className="px-5 py-3 hidden md:table-cell">Date & Time</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Entity Type</th>
                  <th className="px-5 py-3 text-right">Inspection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bliv-border/60">
                {filteredEvents.map(event => (
                  <tr
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="hover:bg-bliv-bg/70 transition-colors cursor-pointer group"
                  >
                    <td className="px-5 py-3.5 font-semibold text-bliv-dark group-hover:text-bliv-green transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-bliv-green shrink-0" />
                        <span>{event.action}</span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-bliv-text-primary font-medium">
                      {event.userName}
                    </td>

                    <td className="px-5 py-3.5 text-bliv-text-secondary">
                      <span className="text-bliv-text-primary font-medium">{event.entityName}</span>
                    </td>

                    <td className="px-5 py-3.5 hidden md:table-cell font-mono text-[11px] text-bliv-text-secondary">
                      {new Date(event.timestamp).toLocaleDateString('en-GB')} •{' '}
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>

                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-bliv-surface-secondary text-bliv-text-secondary border border-bliv-border">
                        {event.entityType}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        className="text-xs font-semibold text-bliv-green hover:underline inline-flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Small demo notice banner */}
      <div className="p-4 rounded-bliv bg-bliv-surface-secondary/70 border border-bliv-border text-center max-w-2xl mx-auto">
        <p className="text-xs text-bliv-text-secondary leading-relaxed">
          <strong className="text-bliv-dark">Audit Architecture Note:</strong> In production healthcare environments, audit logs are immutable, cryptographically signed, and stored independently to guarantee zero-tamper integrity under HIPAA / GDPR regulations.
        </p>
      </div>

      {/* Audit Detail Drawer */}
      <AuditDetailDrawer
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
};
