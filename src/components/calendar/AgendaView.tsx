import React from 'react';
import { Appointment, Patient } from '../../types';
import { mockClinicians } from '../../data/mockData';
import { Badge } from '../ui/Badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface AgendaViewProps {
  appointments: Appointment[];
  patients: Patient[];
  onSelectAppointment: (apt: Appointment) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  appointments,
  patients,
  onSelectAppointment,
}) => {
  // Group appointments by date
  const sorted = [...appointments].sort((a, b) => {
    const cmp = a.date.localeCompare(b.date);
    return cmp !== 0 ? cmp : a.startTime.localeCompare(b.startTime);
  });

  const grouped: Record<string, Appointment[]> = {};
  sorted.forEach(apt => {
    if (!grouped[apt.date]) grouped[apt.date] = [];
    grouped[apt.date].push(apt);
  });

  const dates = Object.keys(grouped);

  return (
    <div className="space-y-6">
      {dates.length === 0 ? (
        <div className="bg-bliv-surface p-12 rounded-bliv-lg border border-bliv-border text-center text-xs text-bliv-text-secondary">
          No appointments in the agenda view.
        </div>
      ) : (
        dates.map(dateStr => {
          const apts = grouped[dateStr];
          const dateObj = new Date(dateStr);
          const formattedDate = dateObj.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          return (
            <div key={dateStr} className="bg-bliv-surface rounded-bliv-lg border border-bliv-border shadow-subtle p-5">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-bliv-border">
                <Calendar className="w-4 h-4 text-bliv-green" />
                <h3 className="font-heading text-sm font-bold text-bliv-dark">{formattedDate}</h3>
                <span className="text-[11px] font-mono text-bliv-text-secondary">({apts.length} sessions)</span>
              </div>

              <div className="divide-y divide-bliv-border/60">
                {apts.map(apt => {
                  const patient = patients.find(p => p.id === apt.patientId);
                  const clinician = mockClinicians.find(c => c.id === apt.clinicianId);

                  return (
                    <div
                      key={apt.id}
                      onClick={() => onSelectAppointment(apt)}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-bliv-bg/50 px-2 rounded-bliv transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 font-mono text-xs text-center shrink-0">
                          <span className="font-bold text-bliv-dark block">{apt.startTime}</span>
                          <span className="text-[10px] text-bliv-text-secondary block">{apt.endTime}</span>
                        </div>

                        <div className="border-l border-bliv-border pl-3">
                          <div className="font-semibold text-xs sm:text-sm text-bliv-dark group-hover:text-bliv-green transition-colors">
                            {apt.title}
                          </div>
                          <p className="text-xs text-bliv-text-secondary">
                            Patient: <strong className="text-bliv-dark">{patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown'}</strong> ({patient?.patientNumber})
                          </p>
                          <p className="text-[10px] text-bliv-text-secondary">
                            Clinician: {clinician?.name} • {apt.type}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
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
                        <ArrowRight className="w-4 h-4 text-bliv-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
