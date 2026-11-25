import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  UserCheck, 
  Clock, 
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PatientTable } from '../components/patients/PatientTable';
import { PatientFormModal } from '../components/patients/PatientFormModal';
import { DeletePatientModal } from '../components/patients/DeletePatientModal';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Patient, PatientStatus } from '../types';

export const PatientsPage: React.FC = () => {
  const { patients, deletePatient } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | PatientStatus>('All');
  const [sortOrder, setSortOrder] = useState<'name-asc' | 'name-desc' | 'recent'>('name-asc');
  
  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState<Patient | null>(null);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  // Statistics
  const totalCount = patients.length;
  const activeCount = patients.filter(p => p.status === 'Active').length;
  const recentlyAddedCount = patients.filter(p => {
    const diffDays = (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return diffDays < 90;
  }).length;

  // Filtered & Sorted Patients
  const filteredPatients = useMemo(() => {
    return patients
      .filter(p => {
        const matchesSearch =
          searchQuery.trim() === '' ||
          p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.patientNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.phone.includes(searchQuery);

        const matchesStatus = statusFilter === 'All' || p.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOrder === 'name-asc') {
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        }
        if (sortOrder === 'name-desc') {
          return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
        }
        if (sortOrder === 'recent') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
  }, [patients, searchQuery, statusFilter, sortOrder]);

  const handleEdit = (p: Patient) => {
    setPatientToEdit(p);
    setIsFormOpen(true);
  };

  const handleDelete = (p: Patient) => {
    setPatientToDelete(p);
  };

  const confirmDelete = () => {
    if (patientToDelete) {
      deletePatient(patientToDelete.id);
      setPatientToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-bliv-dark tracking-tight">
            Patients
          </h1>
          <p className="text-xs sm:text-sm text-bliv-text-secondary mt-1">
            Manage your clinic's patient profiles, contact details, and clinical documentation.
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => {
            setPatientToEdit(null);
            setIsFormOpen(true);
          }}
          icon={<Plus className="w-4 h-4" />}
        >
          Add patient
        </Button>
      </div>

      {/* Patient Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-bliv-text-secondary uppercase tracking-wider font-semibold">Total Patients</span>
            <p className="text-2xl font-bold text-bliv-dark mt-0.5">{totalCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-bliv-surface-secondary flex items-center justify-center text-bliv-dark">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-bliv-text-secondary uppercase tracking-wider font-semibold">Active Patients</span>
            <p className="text-2xl font-bold text-bliv-green mt-0.5">{activeCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#eaf3ec] flex items-center justify-center text-[#366141]">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-bliv-text-secondary uppercase tracking-wider font-semibold">Recently Added</span>
            <p className="text-2xl font-bold text-bliv-dark mt-0.5">{recentlyAddedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-bliv-surface-secondary flex items-center justify-center text-bliv-dark">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Controls Bar: Search, Status Filter, Sort */}
      <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-bliv-text-secondary absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, ID, email, or phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-bliv-surface-secondary border border-bliv-border rounded-bliv text-xs sm:text-sm py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-bliv-green/30 focus:border-bliv-green text-bliv-text-primary"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Status filter pills */}
          <div className="flex items-center bg-bliv-surface-secondary rounded-bliv p-1 border border-bliv-border text-xs">
            {(['All', 'Active', 'Archived'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  statusFilter === st
                    ? 'bg-bliv-surface text-bliv-dark font-semibold shadow-xs'
                    : 'text-bliv-text-secondary hover:text-bliv-dark'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-bliv-text-secondary" />
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as any)}
              className="bg-bliv-surface-secondary border border-bliv-border rounded-bliv text-xs py-1.5 px-2.5 text-bliv-dark focus:outline-none"
            >
              <option value="name-asc">Sort: Name (A-Z)</option>
              <option value="name-desc">Sort: Name (Z-A)</option>
              <option value="recent">Sort: Recently added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient Table or Empty State */}
      {filteredPatients.length === 0 ? (
        <EmptyState
          icon={<Users className="w-6 h-6" />}
          title="No patients found"
          description={
            searchQuery
              ? `No patients match "${searchQuery}". Check the query or reset filters.`
              : 'There are currently no patients registered in this category.'
          }
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setStatusFilter('All');
          }}
        />
      ) : (
        <PatientTable
          patients={filteredPatients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Add / Edit Patient Modal */}
      <PatientFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        patientToEdit={patientToEdit}
      />

      {/* Delete / Archive Confirmation Modal */}
      <DeletePatientModal
        isOpen={!!patientToDelete}
        onClose={() => setPatientToDelete(null)}
        patient={patientToDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
