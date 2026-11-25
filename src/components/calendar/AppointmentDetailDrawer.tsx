import React from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Appointment, Patient, AppointmentStatus } from '../../types';
import { mockClinicians } from '../../data/mockData';
import { Calendar, Clock, User, Edit3, XCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface AppointmentDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  patient?: Patient;
  onEdit: (apt: Appointment) => void;
  onStatusChange: (status: AppointmentStatus) => void;
  onCancel: () => void;
  onNavigateToPatient?: (patientId: string) => void;
}

export const AppointmentDetailDrawer: React.FC<AppointmentDetailDrawerProps> = ({
  isOpen,
  onClose,
  appointment,
  patient,
  onEdit,
  onStatusChange,
  onCancel,
  onNavigateToPatient,
}) => {
  if (!appointment) return null;

  const clinician = mockClinicians.find(c => c.id === appointment.clinicianId);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={appointment.title}
      subtitle={`${appointment.type} • ${appointment.date}`}
      width="md"
      footer={
        <div className="flex items-center justify-between w-full">
          {appointment.status !== 'Cancelled' ? (
            <button
              onClick={onCancel}
              className="text-xs text-bliv-error hover:underline flex items-center gap-1 font-medium"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel Visit</span>
            </button>
          ) : (
            <span className="text-xs text-bliv-text-secondary italic">Visit was cancelled</span>
          )}

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Edit3 className="w-3.5 h-3.5" />}
              onClick={() => {
                onClose();
                onEdit(appointment);
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6 text-xs">
        {/* Status & Quick Change */}
        <div className="p-3.5 bg-bliv-surface-secondary rounded-bliv border border-bliv-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-bliv-text-secondary font-semibold uppercase tracking-wider">
              Current Status
            </span>
            <Badge
              variant={
                appointment.status === 'Confirmed'
                  ? 'success'
                  : appointment.status === 'Completed'
                  ? 'sage'
                  : appointment.status === 'Cancelled'
                  ? 'error'
                  : 'default'
              }
              dot
            >
              {appointment.status}
            </Badge>
          </div>

          <div className="pt-2 border-t border-bliv-border/60 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-bliv-text-secondary mr-1">Set Status:</span>
            {(['Scheduled', 'Confirmed', 'Completed'] as AppointmentStatus[]).map(st => (
              <button
                key={st}
                disabled={appointment.status === st}
                onClick={() => onStatusChange(st)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                  appointment.status === st
                    ? 'bg-bliv-dark text-white border-bliv-dark'
                    : 'bg-bliv-surface text-bliv-text-primary border-bliv-border hover:bg-bliv-bg'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Link Tile */}
        {patient ? (
          <div className="p-3 bg-bliv-bg rounded-bliv border border-bliv-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-bliv-sage flex items-center justify-center font-bold text-bliv-dark">
                {patient.firstName[0]}{patient.lastName[0]}
              </div>
              <div>
                <p className="font-semibold text-bliv-dark text-xs">
                  {patient.firstName} {patient.lastName}
                </p>
                <p className="text-[11px] text-bliv-text-secondary font-mono">
                  {patient.patientNumber} • {patient.phone}
                </p>
              </div>
            </div>
            {onNavigateToPatient && (
              <button
                onClick={() => onNavigateToPatient(patient.id)}
                className="text-xs font-semibold text-bliv-green hover:underline"
              >
                Profile →
              </button>
            )}
          </div>
        ) : (
          <p className="text-xs text-bliv-text-secondary">Patient details not linked.</p>
        )}

        {/* Date and Time Details */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-bliv-bg rounded-bliv border border-bliv-border">
          <div>
            <span className="text-[10px] uppercase font-semibold text-bliv-text-secondary block">
              Consultation Date
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-bliv-dark">
              <Calendar className="w-3.5 h-3.5 text-bliv-green" />
              <span>{appointment.date}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-bliv-text-secondary block">
              Time Window
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-mono font-semibold text-bliv-dark">
              <Clock className="w-3.5 h-3.5 text-bliv-green" />
              <span>{appointment.startTime} - {appointment.endTime}</span>
            </div>
          </div>
        </div>

        {/* Clinician Details */}
        <div className="p-3 bg-bliv-bg rounded-bliv border border-bliv-border space-y-1">
          <span className="text-[10px] uppercase font-semibold text-bliv-text-secondary block">
            Assigned Clinician
          </span>
          <p className="font-semibold text-bliv-dark text-xs">{clinician?.name || 'Dr. Amelia Carter'}</p>
          <p className="text-[11px] text-bliv-text-secondary">{clinician?.specialty || 'General Practice'}</p>
        </div>

        {/* Clinical Preparation / Notes */}
        <div>
          <span className="font-semibold text-bliv-dark uppercase tracking-wider text-[11px] block mb-1.5">
            Preparation Notes & Agenda
          </span>
          <div className="p-3 bg-bliv-bg rounded-bliv border border-bliv-border text-bliv-text-primary leading-relaxed">
            {appointment.notes || 'No preparation notes attached for this session.'}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
