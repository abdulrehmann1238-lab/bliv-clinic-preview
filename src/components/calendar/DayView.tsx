import React from 'react';
import { format, isToday } from 'date-fns';
import { Appointment, Patient } from '../../types';
import { mockClinicians } from '../../data/mockData';
import { Clock, User, Calendar } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface DayViewProps {
  currentDate: Date;
  appointments: Appointment[];
  patients: Patient[];
  onSelectAppointment: (apt: Appointment) => void;
  onNewAppointmentAtTime: (timeStr: string) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  currentDate,
  appointments,
  patients,
  onSelectAppointment,
  onNewAppointmentAtTime,
}) => {
  const dateStr = format(currentDate, 'yyyy-MM-dd');
  const dayAppointments = appointments
    .filter(a => a.date === dateStr)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

  return (
    <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border shadow-subtle p-6 space-y-6">
      {/* Day summary header */}
      <div className="flex items-center justify-between pb-4 border-b border-bliv-border">
        <div>
          <span className="text-xs uppercase font-semibold text-bliv-green tracking-wider">
            {format(currentDate, 'EEEE')}
          </span>
          <h2 className="font-heading text-xl font-bold text-bliv-dark mt-0.5">
            {format(currentDate, 'dd MMMM yyyy')}
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-bliv-dark">
            {dayAppointments.length} Appointments scheduled
          </span>
          <span className="text-[11px] text-bliv-text-secondary block">
            {isToday(currentDate) ? "Today's Schedule" : 'Planned Slots'}
          </span>
        </div>
      </div>

      {/* Hourly Schedule View */}
      <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-[60px] before:w-[1px] before:bg-bliv-border">
        {hours.map(hour => {
          const timeSlot = `${hour < 10 ? '0' : ''}${hour}:00`;
          const apts = dayAppointments.filter(a => parseInt(a.startTime.split(':')[0], 10) === hour);

          return (
            <div key={hour} className="flex items-start gap-5">
              <span className="font-mono text-xs font-semibold text-bliv-text-secondary w-12 text-right pt-2 shrink-0">
                {timeSlot}
              </span>

              <div className="flex-1 space-y-2">
                {apts.length > 0 ? (
                  apts.map(apt => {
                    const patient = patients.find(p => p.id === apt.patientId);
                    const clinician = mockClinicians.find(c => c.id === apt.clinicianId);

                    return (
                      <div
                        key={apt.id}
                        onClick={() => onSelectAppointment(apt)}
                        className="p-4 rounded-bliv bg-bliv-bg border border-bliv-border hover:border-bliv-green transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-bliv-sage text-bliv-dark flex items-center justify-center font-bold text-xs uppercase shrink-0">
                            {patient ? `${patient.firstName[0]}${patient.lastName[0]}` : 'PT'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs sm:text-sm text-bliv-dark">
                                {patient ? `${patient.firstName} ${patient.lastName}` : 'Patient'}
                              </span>
                              <span className="font-mono text-[10px] text-bliv-text-secondary">
                                {patient?.patientNumber}
                              </span>
                            </div>
                            <p className="text-xs text-bliv-text-primary mt-0.5">{apt.title}</p>
                            <p className="text-[11px] text-bliv-text-secondary">
                              Clinician: {clinician?.name || 'Dr. Amelia Carter'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="font-mono text-xs font-bold text-bliv-dark block">
                              {apt.startTime} - {apt.endTime}
                            </span>
                            <span className="text-[10px] text-bliv-text-secondary">{apt.type}</span>
                          </div>
                          <Badge
                            variant={
                              apt.status === 'Confirmed'
                                ? 'success'
                                : apt.status === 'Completed'
                                ? 'sage'
                                : apt.status === 'Cancelled'
                                ? 'error'
                                : 'default'
                            }
                            dot
                          >
                            {apt.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    onClick={() => onNewAppointmentAtTime(timeSlot)}
                    className="p-2.5 rounded-bliv border border-dashed border-bliv-border text-xs text-bliv-text-secondary/60 hover:text-bliv-dark hover:border-bliv-sage-muted transition-colors cursor-pointer"
                  >
                    + Open slot at {timeSlot}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
