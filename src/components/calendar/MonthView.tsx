import React from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isSameDay, 
  isToday 
} from 'date-fns';
import { Appointment, Patient } from '../../types';
import { clsx } from 'clsx';

interface MonthViewProps {
  currentDate: Date;
  appointments: Appointment[];
  patients: Patient[];
  onSelectAppointment: (apt: Appointment) => void;
  onSelectDay: (day: Date) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  appointments,
  patients,
  onSelectAppointment,
  onSelectDay,
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border shadow-subtle overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-bliv-border bg-bliv-surface-secondary/70 text-center py-2.5 text-xs font-semibold text-bliv-text-secondary uppercase tracking-wider">
        {weekDays.map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 divide-x divide-y divide-bliv-border/60">
        {days.map((day, idx) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayAppointments = appointments.filter(a => a.date === dateStr);
          const inCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={idx}
              onClick={() => onSelectDay(day)}
              className={clsx(
                'min-h-[110px] p-2 flex flex-col justify-between transition-colors cursor-pointer hover:bg-bliv-bg/50',
                !inCurrentMonth && 'bg-bliv-surface-secondary/30 text-bliv-text-secondary/40',
                isCurrentDay && 'bg-bliv-sage/20'
              )}
            >
              {/* Day Number Header */}
              <div className="flex items-center justify-between mb-1">
                <span
                  className={clsx(
                    'text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center font-mono',
                    isCurrentDay
                      ? 'bg-bliv-dark text-white'
                      : inCurrentMonth
                      ? 'text-bliv-dark'
                      : 'text-bliv-text-secondary/50'
                  )}
                >
                  {format(day, 'd')}
                </span>
                {dayAppointments.length > 0 && (
                  <span className="text-[10px] font-mono text-bliv-text-secondary">
                    {dayAppointments.length}
                  </span>
                )}
              </div>

              {/* Appointment Pills */}
              <div className="space-y-1 overflow-hidden flex-1">
                {dayAppointments.slice(0, 3).map(apt => {
                  const patient = patients.find(p => p.id === apt.patientId);
                  const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Patient';

                  // Colors by type
                  const typeColors = {
                    'Initial consultation': 'bg-[#eaf3ec] text-[#366141] border-[#d2e4d6]',
                    'Follow-up': 'bg-bliv-sage text-bliv-dark border-bliv-sage-muted',
                    'General consultation': 'bg-bliv-surface-secondary text-bliv-text-primary border-bliv-border',
                    'Review': 'bg-[#edf4f9] text-[#395c78] border-[#d2e2ee]',
                  };

                  return (
                    <div
                      key={apt.id}
                      onClick={e => {
                        e.stopPropagation();
                        onSelectAppointment(apt);
                      }}
                      className={clsx(
                        'text-[10px] px-1.5 py-0.5 rounded border truncate cursor-pointer hover:opacity-90 font-medium',
                        typeColors[apt.type] || 'bg-bliv-surface-secondary text-bliv-dark'
                      )}
                      title={`${apt.startTime} - ${apt.title} (${patientName})`}
                    >
                      <span className="font-mono font-semibold">{apt.startTime}</span> {patientName}
                    </div>
                  );
                })}

                {dayAppointments.length > 3 && (
                  <span className="text-[9px] text-bliv-text-secondary font-medium block text-center">
                    +{dayAppointments.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
