import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, FileText, Calendar, ArrowRight, X } from 'lucide-react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, patients, records, appointments } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) {
      return { patients: [], records: [], appointments: [] };
    }
    const q = query.toLowerCase().trim();

    const matchedPatients = patients
      .filter(
        p =>
          p.firstName.toLowerCase().includes(q) ||
          p.lastName.toLowerCase().includes(q) ||
          p.patientNumber.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.phone.includes(q)
      )
      .slice(0, 4);

    const matchedRecords = records
      .filter(
        r =>
          r.title.toLowerCase().includes(q) ||
          r.assessment.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q)
      )
      .slice(0, 4);

    const matchedAppointments = appointments
      .filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.date.includes(q) ||
          a.type.toLowerCase().includes(q)
      )
      .slice(0, 4);

    return {
      patients: matchedPatients,
      records: matchedRecords,
      appointments: matchedAppointments,
    };
  }, [query, patients, records, appointments]);

  const hasResults =
    results.patients.length > 0 ||
    results.records.length > 0 ||
    results.appointments.length > 0;

  const handleSelect = (path: string) => {
    setIsSearchModalOpen(false);
    setQuery('');
    navigate(path);
  };

  return (
    <Modal
      isOpen={isSearchModalOpen}
      onClose={() => {
        setIsSearchModalOpen(false);
        setQuery('');
      }}
      maxWidth="xl"
      showCloseButton={false}
    >
      <div className="-mx-6 -my-5">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-bliv-border bg-bliv-surface gap-3">
          <Search className="w-5 h-5 text-bliv-text-secondary shrink-0" />
          <input
            type="text"
            placeholder="Search patients, medical records, or appointments..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base bg-transparent border-0 focus:outline-none text-bliv-text-primary placeholder:text-bliv-text-secondary/60"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-bliv-text-secondary hover:text-bliv-dark"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bliv-surface-secondary text-bliv-text-secondary border border-bliv-border">
            ESC
          </span>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="py-8 text-center text-xs text-bliv-text-secondary">
              Type a name, patient ID (e.g. BLV-1001), diagnosis, or appointment title...
            </div>
          )}

          {query.trim() && !hasResults && (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-bliv-dark">No matches found</p>
              <p className="text-xs text-bliv-text-secondary mt-1">
                No clinical items matched "{query}". Try checking the spelling.
              </p>
            </div>
          )}

          {/* Patients Section */}
          {results.patients.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold text-bliv-text-secondary uppercase tracking-wider">
                <User className="w-3.5 h-3.5" />
                <span>Patients ({results.patients.length})</span>
              </div>
              <div className="mt-1 space-y-1">
                {results.patients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(`/app/patients/${p.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-bliv hover:bg-bliv-surface-secondary text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-bliv-dark group-hover:text-bliv-green flex items-center gap-2">
                        <span>{p.firstName} {p.lastName}</span>
                        <span className="text-xs font-mono text-bliv-text-secondary">{p.patientNumber}</span>
                      </div>
                      <div className="text-xs text-bliv-text-secondary mt-0.5">
                        {p.email} • {p.primaryCondition || 'Active'}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-bliv-text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Records Section */}
          {results.records.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold text-bliv-text-secondary uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Medical Records ({results.records.length})</span>
              </div>
              <div className="mt-1 space-y-1">
                {results.records.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(`/app/records?id=${r.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-bliv hover:bg-bliv-surface-secondary text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-bliv-dark group-hover:text-bliv-green">
                        {r.title}
                      </div>
                      <div className="text-xs text-bliv-text-secondary mt-0.5">
                        {r.type} • {r.consultationDate}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-bliv-text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Appointments Section */}
          {results.appointments.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold text-bliv-text-secondary uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>Appointments ({results.appointments.length})</span>
              </div>
              <div className="mt-1 space-y-1">
                {results.appointments.map(a => (
                  <button
                    key={a.id}
                    onClick={() => handleSelect(`/app/calendar?id=${a.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-bliv hover:bg-bliv-surface-secondary text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-bliv-dark group-hover:text-bliv-green">
                        {a.title}
                      </div>
                      <div className="text-xs text-bliv-text-secondary mt-0.5">
                        {a.date} • {a.startTime} - {a.endTime} ({a.status})
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-bliv-text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-bliv-surface-secondary/60 border-t border-bliv-border text-[11px] text-bliv-text-secondary flex justify-between items-center">
          <span>Search BLIV Clinical Registry</span>
          <span className="font-mono">Ctrl+K or ⌘K</span>
        </div>
      </div>
    </Modal>
  );
};
