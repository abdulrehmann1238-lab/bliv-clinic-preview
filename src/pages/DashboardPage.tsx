import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  FileText, 
  Clock, 
  ArrowRight, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  History,
  Activity,
  CalendarCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    patients, 
    records, 
    appointments, 
    auditEvents,
    setIsAddPatientModalOpen,
    setIsAddAppointmentModalOpen,
    setIsAddRecordModalOpen
  } = useApp();

  const navigate = useNavigate();

  // Consistent current date format
  const todayDate = new Date();
  const dateFormatted = todayDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const todayStr = todayDate.toISOString().split('T')[0];
  const todaysAppointments = appointments.filter(a => a.date === todayStr || a.date === '2024-11-26').slice(0, 5);
  const upcomingCount = appointments.filter(a => a.status === 'Scheduled' || a.status === 'Confirmed').length;

  // Chart data: Consultations by appointment type
  const chartData = [
    { name: 'Initial', count: appointments.filter(a => a.type === 'Initial consultation').length, fill: '#668775' },
    { name: 'Follow-up', count: appointments.filter(a => a.type === 'Follow-up').length, fill: '#26372F' },
    { name: 'General', count: appointments.filter(a => a.type === 'General consultation').length, fill: '#A8B9AA' },
    { name: 'Review', count: appointments.filter(a => a.type === 'Review').length, fill: '#718DA5' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-bliv-surface p-6 sm:p-7 rounded-bliv-lg border border-bliv-border shadow-subtle">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-bliv-green">
            <span className="w-2 h-2 rounded-full bg-bliv-green" />
            <span>{dateFormatted}</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-bliv-dark tracking-tight">
            Good morning, {currentUser.name.split(' ')[1] || 'Doctor'}
          </h1>
          <p className="text-xs sm:text-sm text-bliv-text-secondary">
            Here's what's happening at your clinic today. All consultations and records are synchronised.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsAddPatientModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add patient
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsAddRecordModalOpen(true)}
            icon={<FileText className="w-3.5 h-3.5" />}
          >
            Add clinical record
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsAddAppointmentModalOpen(true)}
            icon={<Calendar className="w-3.5 h-3.5" />}
          >
            Schedule appointment
          </Button>
        </div>
      </div>

      {/* 4 Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div 
          onClick={() => navigate('/app/patients')}
          className="bg-bliv-surface p-5 rounded-bliv-lg border border-bliv-border shadow-subtle hover:border-bliv-sage-muted transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-bliv-text-secondary uppercase tracking-wider">
              Total Patients
            </span>
            <div className="w-8 h-8 rounded-full bg-bliv-surface-secondary flex items-center justify-center text-bliv-green group-hover:bg-bliv-sage transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-bliv-dark">
              {patients.length > 0 ? patients.length : 248}
            </span>
            <span className="text-xs font-medium text-bliv-green flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              +12 active
            </span>
          </div>
          <p className="text-xs text-bliv-text-secondary mt-1">
            Registered in active care directory
          </p>
        </div>

        <div 
          onClick={() => navigate('/app/calendar')}
          className="bg-bliv-surface p-5 rounded-bliv-lg border border-bliv-border shadow-subtle hover:border-bliv-sage-muted transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-bliv-text-secondary uppercase tracking-wider">
              Appointments Today
            </span>
            <div className="w-8 h-8 rounded-full bg-[#eaf3ec] flex items-center justify-center text-[#366141] group-hover:bg-[#d8ebd9] transition-colors">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-bliv-green">
              {todaysAppointments.length > 0 ? todaysAppointments.length : 12}
            </span>
            <span className="text-xs font-medium text-bliv-text-secondary">
              consultations
            </span>
          </div>
          <p className="text-xs text-bliv-text-secondary mt-1">
            4 confirmed • 2 review sessions
          </p>
        </div>

        <div 
          onClick={() => navigate('/app/calendar')}
          className="bg-bliv-surface p-5 rounded-bliv-lg border border-bliv-border shadow-subtle hover:border-bliv-sage-muted transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-bliv-text-secondary uppercase tracking-wider">
              Upcoming Appointments
            </span>
            <div className="w-8 h-8 rounded-full bg-bliv-surface-secondary flex items-center justify-center text-bliv-dark group-hover:bg-bliv-sage transition-colors">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-bliv-dark">
              {upcomingCount < 10 ? `0${upcomingCount}` : upcomingCount}
            </span>
            <span className="text-xs font-medium text-bliv-text-secondary">
              this week
            </span>
          </div>
          <p className="text-xs text-bliv-text-secondary mt-1">
            Across 3 assigned clinicians
          </p>
        </div>

        <div 
          onClick={() => navigate('/app/records')}
          className="bg-bliv-surface p-5 rounded-bliv-lg border border-bliv-border shadow-subtle hover:border-bliv-sage-muted transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-bliv-text-secondary uppercase tracking-wider">
              Clinical Records
            </span>
            <div className="w-8 h-8 rounded-full bg-bliv-surface-secondary flex items-center justify-center text-bliv-green group-hover:bg-bliv-sage transition-colors">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-bliv-dark">
              {records.length > 0 ? records.length : 186}
            </span>
            <span className="text-xs font-medium text-bliv-green">
              verified
            </span>
          </div>
          <p className="text-xs text-bliv-text-secondary mt-1">
            Audited consultation notes & files
          </p>
        </div>
      </div>

      {/* Main Grid: Left: Today's Appointments & Schedule | Right: Clinic Analytics & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Today's Appointments & Schedule */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border p-6 shadow-subtle">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-heading text-lg font-bold text-bliv-dark tracking-tight">
                  Today's Appointments
                </h3>
                <p className="text-xs text-bliv-text-secondary">
                  Telehealth schedule for {currentUser.name} and team
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => navigate('/app/calendar')}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
                className="text-xs text-bliv-green"
              >
                Full Calendar
              </Button>
            </div>

            {todaysAppointments.length === 0 ? (
              <div className="py-12 text-center text-xs text-bliv-text-secondary">
                No appointments scheduled for today. Click "+ Schedule appointment" to book one.
              </div>
            ) : (
              <div className="divide-y divide-bliv-border/60">
                {todaysAppointments.map(apt => {
                  const patient = patients.find(p => p.id === apt.patientId);
                  return (
                    <div
                      key={apt.id}
                      className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 hover:bg-bliv-bg/50 px-2 rounded-bliv transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="text-center w-14 shrink-0">
                          <span className="font-mono text-xs font-bold text-bliv-dark block">
                            {apt.startTime}
                          </span>
                          <span className="font-mono text-[10px] text-bliv-text-secondary block">
                            {apt.endTime}
                          </span>
                        </div>

                        <div className="border-l border-bliv-border pl-3.5">
                          <button
                            onClick={() => patient && navigate(`/app/patients/${patient.id}`)}
                            className="font-semibold text-xs sm:text-sm text-bliv-dark hover:text-bliv-green transition-colors text-left block"
                          >
                            {patient ? `${patient.firstName} ${patient.lastName}` : 'Patient'}
                          </button>
                          <p className="text-xs text-bliv-text-secondary mt-0.5">
                            {apt.title} • <span className="font-mono">{patient?.patientNumber}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
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
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/app/calendar?id=${apt.id}`)}
                          className="h-7 px-2 text-xs text-bliv-text-secondary"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Simple Recharts consultation types visualization */}
          <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border p-6 shadow-subtle">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-base font-bold text-bliv-dark tracking-tight">
                  Consultation Breakdown
                </h3>
                <p className="text-xs text-bliv-text-secondary">
                  Distribution of booked appointment types
                </p>
              </div>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#78847C" fontSize={11} tickLine={false} />
                  <YAxis stroke="#78847C" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E7EBE5',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Schedule Timeline & Recent Audit Activity */}
        <div className="lg:col-span-5 space-y-6">
          {/* Today's Schedule Timeline */}
          <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border p-6 shadow-subtle">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-base font-bold text-bliv-dark tracking-tight">
                Schedule Slots
              </h3>
              <span className="text-xs font-mono text-bliv-text-secondary">09:00 — 17:00</span>
            </div>

            <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-[1px] before:bg-bliv-border">
              {todaysAppointments.map((apt, i) => (
                <div key={apt.id} className="relative flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-bliv-surface border-2 border-bliv-green flex items-center justify-center shrink-0 z-10 text-[10px] font-mono font-bold text-bliv-dark shadow-xs">
                    0{i + 1}
                  </div>
                  <div className="flex-1 bg-bliv-bg p-3 rounded-bliv border border-bliv-border text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-bliv-dark">{apt.startTime} - {apt.endTime}</span>
                      <span className="text-[10px] text-bliv-text-secondary">{apt.type}</span>
                    </div>
                    <p className="font-medium text-bliv-dark mt-1">{apt.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity / Audit Stream */}
          <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border p-6 shadow-subtle">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-bliv-green" />
                <h3 className="font-heading text-base font-bold text-bliv-dark tracking-tight">
                  Recent Activity
                </h3>
              </div>
              <button
                onClick={() => navigate('/app/audit')}
                className="text-xs font-semibold text-bliv-green hover:underline"
              >
                View all ({auditEvents.length})
              </button>
            </div>

            <div className="space-y-3">
              {auditEvents.slice(0, 4).map(event => (
                <div
                  key={event.id}
                  onClick={() => navigate('/app/audit')}
                  className="p-3 rounded-bliv bg-bliv-bg border border-bliv-border text-xs space-y-1 hover:border-bliv-sage-muted transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-bliv-dark">{event.userName}</span>
                    <span className="text-[10px] text-bliv-text-secondary font-mono">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-bliv-text-primary text-[11px] font-medium">{event.action}</p>
                  <p className="text-[10px] text-bliv-text-secondary">{event.entityName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
