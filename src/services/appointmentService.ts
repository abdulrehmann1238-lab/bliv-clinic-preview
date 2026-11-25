import { Appointment, AppointmentStatus, Clinician } from '../types';
import { StorageService } from './storageService';
import { AuditService } from './auditService';
import { PatientService } from './patientService';

export class AppointmentService {
  public static getAll(): Appointment[] {
    return StorageService.getAppointments();
  }

  public static getById(id: string): Appointment | undefined {
    return this.getAll().find(a => a.id === id);
  }

  public static getByPatientId(patientId: string): Appointment[] {
    return this.getAll().filter(a => a.patientId === patientId);
  }

  public static getForDate(dateStr: string): Appointment[] {
    return this.getAll().filter(a => a.date === dateStr);
  }

  public static checkOverlap(
    date: string,
    startTime: string,
    endTime: string,
    clinicianId: string,
    excludeId?: string
  ): boolean {
    const appointments = this.getAll().filter(
      a => a.date === date && a.clinicianId === clinicianId && a.status !== 'Cancelled' && a.id !== excludeId
    );

    const toMinutes = (time: string) => {
      const [h, m] = time.split(':').map(Number);
      return h * 60 + m;
    };

    const newStart = toMinutes(startTime);
    const newEnd = toMinutes(endTime);

    return appointments.some(a => {
      const existingStart = toMinutes(a.startTime);
      const existingEnd = toMinutes(a.endTime);
      return Math.max(newStart, existingStart) < Math.min(newEnd, existingEnd);
    });
  }

  public static create(
    appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>,
    currentUser: Clinician
  ): Appointment {
    const appointments = this.getAll();
    const now = new Date().toISOString();
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `apt-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newAppointment, ...appointments];
    StorageService.saveAppointments(updated);

    const patient = PatientService.getById(newAppointment.patientId);
    const patientLabel = patient ? `${patient.firstName} ${patient.lastName} (${patient.patientNumber})` : newAppointment.patientId;

    AuditService.logAction(
      currentUser,
      'Scheduled appointment',
      'Appointment',
      newAppointment.id,
      patientLabel,
      `Scheduled ${newAppointment.type} on ${newAppointment.date} at ${newAppointment.startTime} - ${newAppointment.endTime}.`,
      null,
      {
        title: newAppointment.title,
        type: newAppointment.type,
        date: newAppointment.date,
        time: `${newAppointment.startTime} - ${newAppointment.endTime}`,
        status: newAppointment.status,
      }
    );

    return newAppointment;
  }

  public static update(
    id: string,
    updates: Partial<Omit<Appointment, 'id' | 'createdAt'>>,
    currentUser: Clinician
  ): Appointment {
    const appointments = this.getAll();
    const index = appointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error(`Appointment ${id} not found`);

    const existing = appointments[index];
    const isRescheduled = (updates.date && updates.date !== existing.date) || 
                          (updates.startTime && updates.startTime !== existing.startTime);
    const isStatusChanged = updates.status && updates.status !== existing.status;

    const updatedAppointment: Appointment = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    appointments[index] = updatedAppointment;
    StorageService.saveAppointments(appointments);

    const patient = PatientService.getById(existing.patientId);
    const patientLabel = patient ? `${patient.firstName} ${patient.lastName} (${patient.patientNumber})` : existing.patientId;

    let action = 'Updated appointment';
    let description = `Updated appointment details for "${updatedAppointment.title}".`;

    if (isRescheduled) {
      action = 'Rescheduled appointment';
      description = `Rescheduled appointment to ${updatedAppointment.date} (${updatedAppointment.startTime} - ${updatedAppointment.endTime}).`;
    } else if (isStatusChanged) {
      action = `Appointment marked ${updatedAppointment.status}`;
      description = `Changed appointment status from ${existing.status} to ${updatedAppointment.status}.`;
    }

    AuditService.logAction(
      currentUser,
      action,
      'Appointment',
      updatedAppointment.id,
      patientLabel,
      description,
      {
        date: existing.date,
        startTime: existing.startTime,
        endTime: existing.endTime,
        status: existing.status,
      },
      {
        date: updatedAppointment.date,
        startTime: updatedAppointment.startTime,
        endTime: updatedAppointment.endTime,
        status: updatedAppointment.status,
      }
    );

    return updatedAppointment;
  }

  public static updateStatus(
    id: string,
    status: AppointmentStatus,
    currentUser: Clinician
  ): Appointment {
    return this.update(id, { status }, currentUser);
  }

  public static cancel(id: string, currentUser: Clinician): Appointment {
    return this.update(id, { status: 'Cancelled' }, currentUser);
  }
}
