import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Plus, 
  Paperclip, 
  Filter, 
  Calendar, 
  User, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { RecordFormModal } from '../components/records/RecordFormModal';
import { RecordDetailDrawer } from '../components/records/RecordDetailDrawer';
import { ClinicalRecord, RecordType } from '../types';
import { mockClinicians } from '../data/mockData';

export const RecordsPage: React.FC = () => {
  const { records, patients } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | RecordType>('All');
  const [patientFilter, setPatientFilter] = useState<string>('All');
  const [sortDate, setSortDate] = useState<'desc' | 'asc'>('desc');

  // Drawer & Form Modal states
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<ClinicalRecord | null>(null);

  // Check query parameters (e.g. ?id=rec-2001 or ?patientId=pat-1001)
  useEffect(() => {
    const recordId = searchParams.get('id');
    const patientId = searchParams.get('patientId');

    if (recordId) {
      const found = records.find(r => r.id === recordId);
      if (found) setSelectedRecord(found);
    }

    if (patientId) {
      setPatientFilter(patientId);
    }
  }, [searchParams, records]);

  // Statistics
  const totalRecords = records.length;
  const consultationNotesCount = records.filter(r => r.type === 'Consultation note').length;
  const totalAttachments = records.reduce((acc, r) => acc + (r.attachments?.length || 0), 0);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records
      .filter(r => {
        const patient = patients.find(p => p.id === r.patientId);
        const patientName = patient ? `${patient.firstName} ${patient.lastName}`.toLowerCase() : '';
        const patientNumber = patient ? patient.patientNumber.toLowerCase() : '';

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === '' ||
          r.title.toLowerCase().includes(q) ||
          r.assessment.toLowerCase().includes(q) ||
          r.notes.toLowerCase().includes(q) ||
          patientName.includes(q) ||
          patientNumber.includes(q);

        const matchesType = typeFilter === 'All' || r.type === typeFilter;
        const matchesPatient = patientFilter === 'All' || r.patientId === patientFilter;

        return matchesSearch && matchesType && matchesPatient;
      })
      .sort((a, b) => {
        const timeA = new Date(a.consultationDate).getTime();
        const timeB = new Date(b.consultationDate).getTime();
        return sortDate === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [records, patients, searchQuery, typeFilter, patientFilter, sortDate]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-bliv-dark tracking-tight">
            Medical Records
          </h1>
          <p className="text-xs sm:text-sm text-bliv-text-secondary mt-1">
            Clinical notes and documentation, organised around every patient.
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => {
            setRecordToEdit(null);
            setIsFormModalOpen(true);
          }}
          icon={<Plus className="w-4 h-4" />}
        >
          New clinical record
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-bliv-text-secondary uppercase tracking-wider font-semibold">Total Records</span>
            <p className="text-2xl font-bold text-bliv-dark mt-0.5">{totalRecords}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-bliv-surface-secondary flex items-center justify-center text-bliv-dark">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-bliv-text-secondary uppercase tracking-wider font-semibold">Consultation Notes</span>
            <p className="text-2xl font-bold text-bliv-green mt-0.5">{consultationNotesCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#eaf3ec] flex items-center justify-center text-[#366141]">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-bliv-text-secondary uppercase tracking-wider font-semibold">Documents Attached</span>
            <p className="text-2xl font-bold text-bliv-dark mt-0.5">{totalAttachments}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-bliv-surface-secondary flex items-center justify-center text-bliv-dark">
            <Paperclip className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-bliv-text-secondary absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search title, assessment, or patient..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-bliv-surface-secondary border border-bliv-border rounded-bliv text-xs sm:text-sm py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-bliv-green/30 focus:border-bliv-green text-bliv-text-primary"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end text-xs">
          {/* Record type filter */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as any)}
            className="bg-bliv-surface-secondary border border-bliv-border rounded-bliv py-2 px-3 text-bliv-dark focus:outline-none"
          >
            <option value="All">All Record Types</option>
            <option value="Consultation note">Consultation note</option>
            <option value="Clinical assessment">Clinical assessment</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>

          {/* Patient Filter */}
          <select
            value={patientFilter}
            onChange={e => setPatientFilter(e.target.value)}
            className="bg-bliv-surface-secondary border border-bliv-border rounded-bliv py-2 px-3 text-bliv-dark focus:outline-none max-w-[200px] truncate"
          >
            <option value="All">All Patients</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.firstName} {p.lastName} ({p.patientNumber})
              </option>
            ))}
          </select>

          {/* Sort Date */}
          <button
            onClick={() => setSortDate(prev => (prev === 'desc' ? 'asc' : 'desc'))}
            className="bg-bliv-surface-secondary border border-bliv-border rounded-bliv py-2 px-3 text-bliv-dark hover:bg-bliv-surface transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-bliv-text-secondary" />
            <span>Date: {sortDate === 'desc' ? 'Newest' : 'Oldest'}</span>
          </button>
        </div>
      </div>

      {/* Records Table Listing */}
      {filteredRecords.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-6 h-6" />}
          title="No clinical records found"
          description={
            searchQuery || typeFilter !== 'All' || patientFilter !== 'All'
              ? 'No clinical records match your current filter parameters.'
              : 'Start logging consultation notes to organise your clinic records.'
          }
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setTypeFilter('All');
            setPatientFilter('All');
          }}
        />
      ) : (
        <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-bliv-surface-secondary/70 border-b border-bliv-border text-bliv-text-secondary uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3">Record Title</th>
                  <th className="px-5 py-3">Patient</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3 hidden md:table-cell">Clinician</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Attachments</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bliv-border/60">
                {filteredRecords.map(record => {
                  const patient = patients.find(p => p.id === record.patientId);
                  const clinician = mockClinicians.find(c => c.id === record.clinicianId);

                  return (
                    <tr
                      key={record.id}
                      onClick={() => setSelectedRecord(record)}
                      className="hover:bg-bliv-bg/70 transition-colors cursor-pointer group"
                    >
                      <td className="px-5 py-3.5 font-semibold text-bliv-dark group-hover:text-bliv-green transition-colors">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-bliv-green shrink-0" />
                          <span className="truncate max-w-sm">{record.title}</span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        {patient ? (
                          <div
                            onClick={e => {
                              e.stopPropagation();
                              navigate(`/app/patients/${patient.id}`);
                            }}
                            className="hover:underline"
                          >
                            <span className="font-semibold text-bliv-dark block">
                              {patient.firstName} {patient.lastName}
                            </span>
                            <span className="font-mono text-[10px] text-bliv-text-secondary block">
                              {patient.patientNumber}
                            </span>
                          </div>
                        ) : (
                          <span className="text-bliv-text-secondary">Unassigned</span>
                        )}
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-bliv-surface-secondary text-bliv-text-primary border border-bliv-border">
                          {record.type}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 hidden md:table-cell text-bliv-text-secondary">
                        {clinician?.name || 'Dr. Amelia Carter'}
                      </td>

                      <td className="px-5 py-3.5 font-mono text-[11px] text-bliv-text-secondary">
                        {new Date(record.consultationDate).toLocaleDateString('en-GB')}
                      </td>

                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        {record.attachments && record.attachments.length > 0 ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-bliv-surface-secondary text-bliv-dark">
                            <Paperclip className="w-3 h-3 text-bliv-green" />
                            {record.attachments.length}
                          </span>
                        ) : (
                          <span className="text-bliv-text-secondary/50">—</span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedRecord(record);
                          }}
                          className="text-xs font-semibold text-bliv-green hover:underline inline-flex items-center gap-1"
                        >
                          <span>Review</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record Detail Drawer */}
      <RecordDetailDrawer
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        record={selectedRecord}
        patient={patients.find(p => p.id === selectedRecord?.patientId)}
        onEdit={rec => {
          setRecordToEdit(rec);
          setIsFormModalOpen(true);
        }}
        onNavigateToPatient={patId => navigate(`/app/patients/${patId}`)}
      />

      {/* New / Edit Record Modal */}
      <RecordFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        recordToEdit={recordToEdit}
      />
    </div>
  );
};
