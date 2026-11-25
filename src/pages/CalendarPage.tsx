import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter, 
  User, 
  Clock 
} from 'lucide-react';
import { 
  addMonths, 
  subMonths, 
  addWeeks, 
  subWeeks, 
  addDays, 
  subDays, 
  format 
} from 'date-fns';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { MonthView } from '../components/calendar/MonthView';
import { WeekView } from '../components/calendar/WeekView';
import { DayView } from '../components/calendar/DayView';
import { AgendaView } from '../components/calendar/AgendaView';
import { AppointmentDetailDrawer } from '../components/calendar/AppointmentDetailDrawer';
import { AppointmentModal } from '../components/calendar/AppointmentModal';
import { Appointment, AppointmentStatus } from '../types';
import { mockClinicians } from '../data/mockData';

type CalendarViewMode = 'month' | 'week' | 'day' | 'agenda';

export const CalendarPage: React.FC = () => {
  const { 
    appointments, 
    patients, 
    updateAppointmentStatus, 
    cancelAppointment 
  } = useApp();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
  const [clinicianFilter, setClinicianFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals & Drawers
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState<Appointment | null>(null);
  const [defaultSlotDate, setDefaultSlotDate] = useState<string | undefined>(undefined);

  // Read URL query params
  useEffect(() => {
    const aptId = searchParams.get('id');
    const patId = searchParams.get('patientId');

    if (aptId) {
      const found = appointments.find(a => a.id === aptId);
      if (found) setSelectedAppointment(found);
    }
  }, [searchParams, appointments]);

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(a => {
      const matchesClinician = clinicianFilter === 'All' || a.clinicianId === clinicianFilter;
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesClinician && matchesStatus;
    });
  }, [appointments, clinicianFilter, statusFilter]);

  // Period navigation
  const handlePreviousPeriod = () => {
    if (viewMode === 'month') setCurrentDate(prev => subMonths(prev, 1));
    else if (viewMode === 'week') setCurrentDate(prev => subWeeks(prev, 1));
    else if (viewMode === 'day') setCurrentDate(prev => subDays(prev, 1));
    else setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextPeriod = () => {
    if (viewMode === 'month') setCurrentDate(prev => addMonths(prev, 1));
    else if (viewMode === 'week') setCurrentDate(prev => addWeeks(prev, 1));
    else if (viewMode === 'day') setCurrentDate(prev => addDays(prev, 1));
    else setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Header display string
  const periodLabel = useMemo(() => {
    if (viewMode === 'month') return format(currentDate, 'MMMM yyyy');
    if (viewMode === 'week') return `Week of ${format(currentDate, 'dd MMM yyyy')}`;
    if (viewMode === 'day') return format(currentDate, 'EEEE, dd MMMM yyyy');
    return format(currentDate, 'MMMM yyyy');
  }, [currentDate, viewMode]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-bliv-dark tracking-tight">
            Calendar
          </h1>
          <p className="text-xs sm:text-sm text-bliv-text-secondary mt-1">
            Your clinic schedule, clearly organised across clinicians and patients.
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => {
            setAppointmentToEdit(null);
            setDefaultSlotDate(undefined);
            setIsModalOpen(true);
          }}
          icon={<Plus className="w-4 h-4" />}
        >
          New appointment
        </Button>
      </div>

      {/* Toolbar: Navigation, Period Label, View Switcher, Filters */}
      <div className="bg-bliv-surface p-4 rounded-bliv border border-bliv-border shadow-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Navigation & Period */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border border-bliv-border rounded-bliv p-0.5 bg-bliv-surface-secondary">
            <button
              onClick={handlePreviousPeriod}
              className="p-1 rounded text-bliv-text-secondary hover:text-bliv-dark hover:bg-bliv-surface"
              aria-label="Previous period"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleToday}
              className="px-2.5 py-0.5 text-xs font-semibold text-bliv-dark hover:bg-bliv-surface rounded"
            >
              Today
            </button>
            <button
              onClick={handleNextPeriod}
              className="p-1 rounded text-bliv-text-secondary hover:text-bliv-dark hover:bg-bliv-surface"
              aria-label="Next period"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <h2 className="font-heading text-base font-bold text-bliv-dark tracking-tight">
            {periodLabel}
          </h2>
        </div>

        {/* Filters and View Switcher */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Clinician Filter */}
          <select
            value={clinicianFilter}
            onChange={e => setClinicianFilter(e.target.value)}
            className="bg-bliv-surface-secondary border border-bliv-border rounded-bliv py-1.5 px-2.5 text-bliv-dark focus:outline-none"
          >
            <option value="All">All Clinicians</option>
            {mockClinicians.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-bliv-surface-secondary border border-bliv-border rounded-bliv py-1.5 px-2.5 text-bliv-dark focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* View mode switcher */}
          <div className="flex items-center bg-bliv-surface-secondary border border-bliv-border rounded-bliv p-0.5">
            {(['month', 'week', 'day', 'agenda'] as CalendarViewMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded capitalize font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-bliv-surface text-bliv-dark font-semibold shadow-xs'
                    : 'text-bliv-text-secondary hover:text-bliv-dark'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Views */}
      {viewMode === 'month' && (
        <MonthView
          currentDate={currentDate}
          appointments={filteredAppointments}
          patients={patients}
          onSelectAppointment={apt => setSelectedAppointment(apt)}
          onSelectDay={day => {
            setCurrentDate(day);
            setViewMode('day');
          }}
        />
      )}

      {viewMode === 'week' && (
        <WeekView
          currentDate={currentDate}
          appointments={filteredAppointments}
          patients={patients}
          onSelectAppointment={apt => setSelectedAppointment(apt)}
          onSelectSlot={(dateStr, timeStr) => {
            setDefaultSlotDate(dateStr);
            setAppointmentToEdit(null);
            setIsModalOpen(true);
          }}
        />
      )}

      {viewMode === 'day' && (
        <DayView
          currentDate={currentDate}
          appointments={filteredAppointments}
          patients={patients}
          onSelectAppointment={apt => setSelectedAppointment(apt)}
          onNewAppointmentAtTime={timeStr => {
            setDefaultSlotDate(format(currentDate, 'yyyy-MM-dd'));
            setAppointmentToEdit(null);
            setIsModalOpen(true);
          }}
        />
      )}

      {viewMode === 'agenda' && (
        <AgendaView
          appointments={filteredAppointments}
          patients={patients}
          onSelectAppointment={apt => setSelectedAppointment(apt)}
        />
      )}

      {/* Appointment Detail Drawer */}
      <AppointmentDetailDrawer
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        appointment={selectedAppointment}
        patient={patients.find(p => p.id === selectedAppointment?.patientId)}
        onEdit={apt => {
          setAppointmentToEdit(apt);
          setIsModalOpen(true);
        }}
        onStatusChange={st => {
          if (selectedAppointment) {
            updateAppointmentStatus(selectedAppointment.id, st);
            setSelectedAppointment(prev => prev ? { ...prev, status: st } : null);
          }
        }}
        onCancel={() => {
          if (selectedAppointment) {
            cancelAppointment(selectedAppointment.id);
            setSelectedAppointment(prev => prev ? { ...prev, status: 'Cancelled' } : null);
          }
        }}
        onNavigateToPatient={patId => navigate(`/app/patients/${patId}`)}
      />

      {/* Create / Edit Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointmentToEdit={appointmentToEdit}
        defaultDate={defaultSlotDate}
      />
    </div>
  );
};
