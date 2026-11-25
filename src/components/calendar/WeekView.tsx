import React from 'react';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isToday } from 'date-fns';
import { Appointment, Patient } from '../../types';
import { clsx } from 'clsx';

interface WeekViewProps {
  currentDate: Date;
  appointments: Appointment[];
  patients: Patient[];
  onSelectAppointment: (apt: Appointment) => void;
  onSelectSlot: (dateStr: string, timeStr: string) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  appointments,
  patients,
  onSelectAppointment,
  onSelectSlot,
}) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Time slots from 08:00 to 18:00
  const hours = Array.from({ length: 11 }, (_, i) => i + 8);

  return (
    <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border shadow-subtle overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Header Days */}
        <div className="grid grid-cols-8 border-b border-bliv-border bg-bliv-surface-secondary/70 text-center py-2.5 text-xs font-semibold text-bliv-text-secondary">
          <div className="w-16">Time</div>
          {days.map(d => {
            const isDayToday = isToday(d);
            return (
              <div key={d.toISOString()} className={clsx('flex flex-col items-center', isDayToday && 'text-bliv-dark')}>
                <span className="uppercase text-[10px] tracking-wider">{format(d, 'EEE')}</span>
                <span
                  className={clsx(
                    'w-6 h-6 rounded-full flex items-center justify-center font-mono mt-0.5',
                    isDayToday ? 'bg-bliv-dark text-white' : 'text-bliv-dark'
                  )}
                >
                  {format(d, 'd')}
                </span>
              </div>
            );
          })}
        </div>

        {/* Hourly Grid Rows */}
        <div className="divide-y divide-bliv-border/60">
          {hours.map(hour => {
            const timeLabel = `${hour < 10 ? '0' : ''}${hour}:00`;

            return (
              <div key={hour} className="grid grid-cols-8 min-h-[58px]">
                {/* Time Axis */}
                <div className="w-16 px-2 py-1 text-right text-[11px] font-mono text-bliv-text-secondary border-r border-bliv-border shrink-0 select-none">
                  {timeLabel}
                </div>

                {/* Day Columns */}
                {days.map(d => {
                  const dateStr = format(d, 'yyyy-MM-dd');
                  // Find appointments that fall in this hour
                  const slotAppointments = appointments.filter(a => {
                    if (a.date !== dateStr) return false;
                    const aptHour = parseInt(a.startTime.split(':')[0], 10);
                    return aptHour === hour;
                  });

                  return (
                    <div
                      key={d.toISOString()}
                      onClick={() => onSelectSlot(dateStr, timeLabel)}
                      className="border-r border-bliv-border/60 p-1 relative hover:bg-bliv-bg/40 transition-colors cursor-pointer group"
                    >
                      {slotAppointments.map(apt => {
                        const patient = patients.find(p => p.id === apt.patientId);

                        return (
                          <div
                            key={apt.id}
                            onClick={e => {
                              e.stopPropagation();
                              onSelectAppointment(apt);
                            }}
                            className="p-1.5 rounded bg-bliv-sage/80 border border-bliv-sage-muted text-bliv-dark text-[10px] shadow-xs hover:bg-bliv-sage transition-colors mb-1 truncate"
                            title={`${apt.startTime}-${apt.endTime} ${apt.title}`}
                          >
                            <span className="font-mono font-bold">{apt.startTime}</span>{' '}
                            <span className="font-semibold">{patient ? patient.firstName : 'Patient'}</span>
                            <div className="text-[9px] text-bliv-text-secondary truncate">{apt.title}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
