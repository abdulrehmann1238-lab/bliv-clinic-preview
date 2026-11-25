import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { Appointment, AppointmentType, AppointmentStatus } from '../../types';
import { mockClinicians } from '../../data/mockData';
import { AppointmentService } from '../../services/appointmentService';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentToEdit?: Appointment | null;
  defaultPatientId?: string;
  defaultDate?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  appointmentToEdit,
  defaultPatientId,
  defaultDate,
}) => {
  const { patients, addAppointment, updateAppointment } = useApp();

  const [patientId, setPatientId] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<AppointmentType>('Follow-up');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('09:30');
  const [clinicianId, setClinicianId] = useState('clin-01');
  const [status, setStatus] = useState<AppointmentStatus>('Scheduled');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (appointmentToEdit) {
      setPatientId(appointmentToEdit.patientId);
      setTitle(appointmentToEdit.title);
      setType(appointmentToEdit.type);
      setDate(appointmentToEdit.date);
      setStartTime(appointmentToEdit.startTime);
      setEndTime(appointmentToEdit.endTime);
      setClinicianId(appointmentToEdit.clinicianId);
      setStatus(appointmentToEdit.status);
      setNotes(appointmentToEdit.notes || '');
    } else {
      setPatientId(defaultPatientId || (patients[0]?.id ?? ''));
      setTitle('Consultation Session');
      setType('Follow-up');
      setDate(defaultDate || new Date().toISOString().split('T')[0]);
      setStartTime('10:00');
      setEndTime('10:30');
      setClinicianId('clin-01');
      setStatus('Scheduled');
      setNotes('');
    }
    setError(null);
  }, [appointmentToEdit, defaultPatientId, defaultDate, patients, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!patientId || !title || !date || !startTime || !endTime) {
      setError('Please provide all required appointment fields.');
      return;
    }

    // Time validation: End time cannot be earlier than or equal to start time
    if (endTime <= startTime) {
      setError('Appointment end time must be after the start time.');
      return;
    }

    // Overlap validation
    const hasOverlap = AppointmentService.checkOverlap(
      date,
      startTime,
      endTime,
      clinicianId,
      appointmentToEdit?.id
    );

    if (hasOverlap) {
      setError('A consultation is already scheduled for this clinician in this time slot.');
      return;
    }

    const payload = {
      patientId,
      title,
      type,
      date,
      startTime,
      endTime,
      clinicianId,
      status,
      notes,
    };

    if (appointmentToEdit) {
      updateAppointment(appointmentToEdit.id, payload);
    } else {
      addAppointment(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={appointmentToEdit ? 'Edit Appointment' : 'Schedule Appointment'}
      subtitle="Connect consultation slot directly to a verified patient record."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-bliv bg-[#faecea] border border-[#f2d0cc] text-xs text-[#8e3c35]">
            {error}
          </div>
        )}

        <Select
          label="Select Patient"
          required
          value={patientId}
          onChange={e => setPatientId(e.target.value)}
          options={patients.map(p => ({
            value: p.id,
            label: `${p.firstName} ${p.lastName} (${p.patientNumber})`,
          }))}
        />

        <Input
          label="Appointment Title"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Hypertension Review & Blood Pressure"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Appointment Type"
            value={type}
            onChange={e => setType(e.target.value as AppointmentType)}
            options={[
              { value: 'Initial consultation', label: 'Initial consultation' },
              { value: 'Follow-up', label: 'Follow-up' },
              { value: 'General consultation', label: 'General consultation' },
              { value: 'Review', label: 'Review' },
            ]}
          />
          <Select
            label="Assigned Clinician"
            value={clinicianId}
            onChange={e => setClinicianId(e.target.value)}
            options={mockClinicians.map(c => ({
              value: c.id,
              label: `${c.name} (${c.role})`,
            }))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Date"
            type="date"
            required
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <Input
            label="Start Time"
            type="time"
            required
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
          <Input
            label="End Time"
            type="time"
            required
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Appointment Status"
            value={status}
            onChange={e => setStatus(e.target.value as AppointmentStatus)}
            options={[
              { value: 'Scheduled', label: 'Scheduled' },
              { value: 'Confirmed', label: 'Confirmed' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Cancelled', label: 'Cancelled' },
            ]}
          />
          <Input
            label="Clinical Preparation Notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="e.g. Have home BP diary ready"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-bliv-border">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {appointmentToEdit ? 'Save Appointment' : 'Create Appointment'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
