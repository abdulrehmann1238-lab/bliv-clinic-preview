import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Paperclip, 
  ArrowLeft, 
  Edit3, 
  Plus, 
  ShieldCheck, 
  Clock,
  Heart,
  AlertCircle,
  FileCheck,
  Download,
  Trash2,
  CalendarCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { PatientFormModal } from '../components/patients/PatientFormModal';
import { AppointmentModal } from '../components/calendar/AppointmentModal';
import { RecordFormModal } from '../components/records/RecordFormModal';
import { Drawer } from '../components/ui/Drawer';
import { ClinicalRecord } from '../types';

export const PatientProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { 
    patients, 
    records, 
    appointments, 
    auditEvents,
    addDocumentToRecord,
    removeDocumentFromRecord,
    updateAppointmentStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(null);

  // Find current patient
  const patient = useMemo(() => patients.find(p => p.id === id), [patients, id]);

  // Associated records & appointments
  const patientRecords = useMemo(() => records.filter(r => r.patientId === id), [records, id]);
  const patientAppointments = useMemo(() => appointments.filter(a => a.patientId === id), [appointments, id]);
  const patientAuditEvents = useMemo(() => auditEvents.filter(a => a.entityId === id || a.entityName.includes(patient?.patientNumber || '')), [auditEvents, id, patient]);

  // Aggregate all documents across this patient's records
  const allDocuments = useMemo(() => {
    const docs: { recordId: string; recordTitle: string; doc: any }[] = [];
    patientRecords.forEach(rec => {
      rec.attachments?.forEach(att => {
        docs.push({ recordId: rec.id, recordTitle: rec.title, doc: att });
      });
    });
    return docs;
  }, [patientRecords]);

  if (!patient) {
    return (
      <div className="py-16 text-center max-w-lg mx-auto">
        <EmptyState
          icon={<AlertCircle className="w-6 h-6" />}
          title="Patient not found"
          description="The requested patient identifier does not exist or has been removed from the clinic directory."
          actionLabel="Back to Patients"
          onAction={() => navigate('/app/patients')}
        />
      </div>
    );
  }

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const targetRecord = patientRecords[0];
      if (!targetRecord) {
        alert('Please create at least one clinical record first before attaching documents.');
        return;
      }
      const sizeKb = Math.round(file.size / 1024);
      const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
      addDocumentToRecord(targetRecord.id, {
        name: file.name,
        size: sizeStr,
        type: file.type,
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-bliv-text-secondary">
        <button
          onClick={() => navigate('/app/patients')}
          className="flex items-center gap-1.5 hover:text-bliv-dark transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Patients</span>
        </button>
        <span>/</span>
        <span className="font-mono text-bliv-dark">{patient.patientNumber}</span>
      </div>

      {/* Patient Profile Header Card */}
      <div className="bg-bliv-surface p-6 sm:p-7 rounded-bliv-lg border border-bliv-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-bliv-sage text-bliv-dark flex items-center justify-center font-heading font-extrabold text-lg uppercase shadow-subtle shrink-0">
            {patient.firstName[0]}{patient.lastName[0]}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-bliv-dark tracking-tight">
                {patient.firstName} {patient.lastName}
              </h1>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-bliv-surface-secondary text-bliv-text-secondary border border-bliv-border">
                {patient.patientNumber}
              </span>
              <Badge variant={patient.status === 'Active' ? 'success' : 'default'} dot>
                {patient.status}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-bliv-text-secondary mt-1">
              Registered on {new Date(patient.createdAt).toLocaleDateString('en-GB')} • Last consultation: 20 Nov 2024
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditModalOpen(true)}
            icon={<Edit3 className="w-3.5 h-3.5" />}
          >
            Edit profile
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsAppointmentModalOpen(true)}
            icon={<Calendar className="w-3.5 h-3.5" />}
          >
            Schedule visit
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsRecordModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add clinical note
          </Button>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'records', label: 'Medical Records', count: patientRecords.length },
          { id: 'appointments', label: 'Appointments', count: patientAppointments.length },
          { id: 'documents', label: 'Documents', count: allDocuments.length },
        ]}
      />

      {/* Tab 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Personal, Emergency, Clinical Summary */}
          <div className="lg:col-span-8 space-y-6">
            {/* Clinical Summary Banner */}
            <div className="bg-bliv-surface p-5 rounded-bliv-lg border border-bliv-border shadow-subtle space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-bliv-border">
                <span className="text-xs font-semibold uppercase tracking-wider text-bliv-green flex items-center gap-1.5">
                  <Heart className="w-4 h-4" />
                  <span>Clinical Summary & Directives</span>
                </span>
                <span className="text-xs text-bliv-text-secondary font-mono">
                  Blood Group: {patient.bloodType || 'A+'}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-bliv-dark">Primary Condition / Diagnosis:</p>
                <p className="text-sm text-bliv-text-primary mt-0.5">{patient.primaryCondition || 'None active'}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-bliv-dark">Allergies & Sensitivities:</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(patient.allergies || ['None recorded']).map((al, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#faecea] text-[#8e3c35] border border-[#f2d0cc]"
                    >
                      {al}
                    </span>
                  ))}
                </div>
              </div>
              {patient.notes && (
                <div className="pt-2 border-t border-bliv-border/60">
                  <p className="text-xs font-bold text-bliv-dark">Care Directive / Clinician Note:</p>
                  <p className="text-xs text-bliv-text-secondary mt-0.5 leading-relaxed">{patient.notes}</p>
                </div>
              )}
            </div>

            {/* Personal & Demographic Card */}
            <div className="bg-bliv-surface p-5 rounded-bliv-lg border border-bliv-border shadow-subtle">
              <h3 className="font-heading text-sm font-bold text-bliv-dark uppercase tracking-wider mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-bliv-text-secondary block">Date of Birth</span>
                  <span className="font-semibold text-bliv-dark mt-0.5 block">{patient.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-bliv-text-secondary block">Gender</span>
                  <span className="font-semibold text-bliv-dark mt-0.5 block">{patient.gender}</span>
                </div>
                <div>
                  <span className="text-bliv-text-secondary block">Patient ID System</span>
                  <span className="font-semibold text-bliv-dark mt-0.5 block font-mono">{patient.patientNumber}</span>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-bliv-surface p-5 rounded-bliv-lg border border-bliv-border shadow-subtle">
              <h3 className="font-heading text-sm font-bold text-bliv-dark uppercase tracking-wider mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-bliv-text-secondary shrink-0" />
                  <div>
                    <span className="text-bliv-text-secondary block text-[11px]">Email Address</span>
                    <span className="font-semibold text-bliv-dark">{patient.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-bliv-text-secondary shrink-0" />
                  <div>
                    <span className="text-bliv-text-secondary block text-[11px]">Phone Number</span>
                    <span className="font-semibold text-bliv-dark">{patient.phone}</span>
                  </div>
                </div>
                <div className="sm:col-span-2 flex items-start gap-2.5 pt-2 border-t border-bliv-border/60">
                  <MapPin className="w-4 h-4 text-bliv-text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-bliv-text-secondary block text-[11px]">Residential Address</span>
                    <span className="font-semibold text-bliv-dark">{patient.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="bg-bliv-surface p-5 rounded-bliv-lg border border-bliv-border shadow-subtle">
              <h3 className="font-heading text-sm font-bold text-bliv-dark uppercase tracking-wider mb-3">
                Emergency Contact
              </h3>
              <div className="p-3 bg-bliv-bg rounded-bliv border border-bliv-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-semibold text-bliv-dark text-sm block">
                    {patient.emergencyContact?.name || 'Not provided'}
                  </span>
                  <span className="text-bliv-text-secondary text-[11px]">
                    Relationship: {patient.emergencyContact?.relationship || 'Next of kin'}
                  </span>
                </div>
                <div className="font-mono text-bliv-text-primary font-medium">
                  {patient.emergencyContact?.phone || patient.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Recent Activity & Consultations */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Consultation Status */}
            <div className="bg-bliv-surface p-5 rounded-bliv-lg border border-bliv-border shadow-subtle space-y-3">
              <h4 className="text-xs font-semibold text-bliv-dark uppercase tracking-wider">
                Upcoming Consultation
              </h4>
              {patientAppointments.length > 0 ? (
                <div className="p-3 rounded-bliv bg-[#eaf3ec] border border-[#d2e4d6] text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#366141]">
                    <span>{patientAppointments[0].date}</span>
                    <span>{patientAppointments[0].startTime}</span>
                  </div>
                  <p className="text-bliv-dark font-medium">{patientAppointments[0].title}</p>
                  <p className="text-[10px] text-bliv-text-secondary">{patientAppointments[0].type}</p>
                </div>
              ) : (
                <p className="text-xs text-bliv-text-secondary">No upcoming appointments scheduled.</p>
              )}
            </div>

            {/* Patient Specific Activity Audit Log */}
            <div className="bg-bliv-surface p-5 rounded-bliv-lg border border-bliv-border shadow-subtle">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-bliv-dark uppercase tracking-wider">
                  Patient Audit Events
                </h4>
                <ShieldCheck className="w-3.5 h-3.5 text-bliv-green" />
              </div>

              {patientAuditEvents.length === 0 ? (
                <p className="text-xs text-bliv-text-secondary py-3">No audit actions recorded yet.</p>
              ) : (
                <div className="space-y-2.5">
                  {patientAuditEvents.slice(0, 5).map(event => (
                    <div key={event.id} className="p-2.5 rounded bg-bliv-bg border border-bliv-border text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-bliv-dark text-[11px]">{event.action}</span>
                        <span className="text-[10px] text-bliv-text-secondary font-mono">
                          {new Date(event.timestamp).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <p className="text-[10px] text-bliv-text-secondary mt-0.5">{event.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: MEDICAL RECORDS */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-bliv-dark tracking-tight">
              Consultation Notes & Records ({patientRecords.length})
            </h3>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setIsRecordModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              + Add consultation note
            </Button>
          </div>

          {patientRecords.length === 0 ? (
            <EmptyState
              icon={<FileText className="w-6 h-6" />}
              title="No clinical records yet"
              description="No clinical records or consultation notes have been logged for this patient."
              actionLabel="Add Consultation Note"
              onAction={() => setIsRecordModalOpen(true)}
            />
          ) : (
            <div className="space-y-3">
              {patientRecords.map(rec => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecord(rec)}
                  className="p-5 bg-bliv-surface rounded-bliv-lg border border-bliv-border shadow-subtle hover:border-bliv-sage-muted transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-bliv-border/60">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-bliv-green tracking-wider">
                        {rec.type}
                      </span>
                      <h4 className="font-heading text-base font-bold text-bliv-dark group-hover:text-bliv-green transition-colors mt-0.5">
                        {rec.title}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs text-bliv-text-secondary block">
                        {new Date(rec.consultationDate).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-bliv-text-secondary line-clamp-2 my-2 leading-relaxed">
                    {rec.notes}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-bliv-dark">Assessment:</span>
                      <span className="text-bliv-text-secondary truncate max-w-sm">{rec.assessment}</span>
                    </div>
                    {rec.attachments && rec.attachments.length > 0 && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bliv-surface-secondary text-bliv-text-primary flex items-center gap-1">
                        <Paperclip className="w-3 h-3 text-bliv-green" />
                        {rec.attachments.length} attached
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-bliv-dark tracking-tight">
              Patient Appointments ({patientAppointments.length})
            </h3>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setIsAppointmentModalOpen(true)}
              icon={<Calendar className="w-4 h-4" />}
            >
              + Schedule appointment
            </Button>
          </div>

          {patientAppointments.length === 0 ? (
            <EmptyState
              icon={<Calendar className="w-6 h-6" />}
              title="No appointments scheduled"
              description="There are currently no visits or consultations scheduled for this patient."
              actionLabel="Schedule Appointment"
              onAction={() => setIsAppointmentModalOpen(true)}
            />
          ) : (
            <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border overflow-hidden shadow-subtle">
              <table className="w-full text-xs text-left">
                <thead className="bg-bliv-surface-secondary/70 border-b border-bliv-border text-bliv-text-secondary font-semibold">
                  <tr>
                    <th className="px-5 py-3">Title</th>
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Time</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bliv-border/60">
                  {patientAppointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-bliv-bg/50">
                      <td className="px-5 py-3.5 font-semibold text-bliv-dark">{apt.title}</td>
                      <td className="px-5 py-3.5 text-bliv-text-secondary">{apt.type}</td>
                      <td className="px-5 py-3.5 font-mono">{apt.date}</td>
                      <td className="px-5 py-3.5 font-mono">{apt.startTime} - {apt.endTime}</td>
                      <td className="px-5 py-3.5">
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
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                            className="text-xs font-semibold text-bliv-green hover:underline mr-3"
                          >
                            Mark Completed
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`/app/calendar?id=${apt.id}`)}
                          className="text-xs font-medium text-bliv-text-secondary hover:text-bliv-dark"
                        >
                          View in Calendar →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading text-lg font-bold text-bliv-dark tracking-tight">
                Attached Documents ({allDocuments.length})
              </h3>
              <p className="text-xs text-bliv-text-secondary">
                Referral letters, laboratory reports, and consultation summaries.
              </p>
            </div>

            <label className="cursor-pointer">
              <Button
                size="sm"
                variant="primary"
                icon={<Paperclip className="w-4 h-4" />}
                onClick={() => {}}
              >
                Attach document
              </Button>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={handleSimulatedFileUpload}
              />
            </label>
          </div>

          {allDocuments.length === 0 ? (
            <EmptyState
              icon={<Paperclip className="w-6 h-6" />}
              title="No documents attached"
              description="Upload clinical records, imaging, or laboratory results for this patient."
              actionLabel="Attach Document"
              onAction={() => {}}
            />
          ) : (
            <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border overflow-hidden shadow-subtle">
              <table className="w-full text-xs text-left">
                <thead className="bg-bliv-surface-secondary/70 border-b border-bliv-border text-bliv-text-secondary font-semibold">
                  <tr>
                    <th className="px-5 py-3">Document Name</th>
                    <th className="px-5 py-3">Linked Record</th>
                    <th className="px-5 py-3">Uploaded Date</th>
                    <th className="px-5 py-3">Uploaded By</th>
                    <th className="px-5 py-3">File Size</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bliv-border/60">
                  {allDocuments.map(({ recordId, recordTitle, doc }) => (
                    <tr key={doc.id} className="hover:bg-bliv-bg/50">
                      <td className="px-5 py-3.5 font-medium text-bliv-dark flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-bliv-green shrink-0" />
                        <span>{doc.name}</span>
                      </td>
                      <td className="px-5 py-3.5 text-bliv-text-secondary truncate max-w-xs">{recordTitle}</td>
                      <td className="px-5 py-3.5 font-mono text-[11px] text-bliv-text-secondary">
                        {new Date(doc.uploadedAt).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-5 py-3.5 text-bliv-text-secondary">{doc.uploadedBy}</td>
                      <td className="px-5 py-3.5 font-mono text-bliv-text-primary">{doc.size}</td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => alert(`Simulated document view: ${doc.name} (${doc.size})`)}
                            className="p-1 rounded text-bliv-text-secondary hover:text-bliv-dark"
                            title="Download / View"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeDocumentFromRecord(recordId, doc.id)}
                            className="p-1 rounded text-bliv-text-secondary hover:text-bliv-error"
                            title="Remove attachment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Record Detail Drawer */}
      <Drawer
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        title={selectedRecord?.title}
        subtitle={`${selectedRecord?.type} • ${selectedRecord?.consultationDate}`}
        width="lg"
      >
        {selectedRecord && (
          <div className="space-y-5 text-xs">
            <div>
              <span className="font-semibold text-bliv-dark uppercase tracking-wider block mb-1">
                Consultation Notes
              </span>
              <p className="text-bliv-text-primary bg-bliv-bg p-3 rounded-bliv border border-bliv-border leading-relaxed">
                {selectedRecord.notes}
              </p>
            </div>

            <div>
              <span className="font-semibold text-bliv-dark uppercase tracking-wider block mb-1">
                Clinical Assessment
              </span>
              <p className="text-bliv-text-primary bg-bliv-bg p-3 rounded-bliv border border-bliv-border leading-relaxed">
                {selectedRecord.assessment}
              </p>
            </div>

            <div>
              <span className="font-semibold text-bliv-dark uppercase tracking-wider block mb-1">
                Treatment Plan
              </span>
              <p className="text-bliv-text-primary bg-bliv-bg p-3 rounded-bliv border border-bliv-border leading-relaxed">
                {selectedRecord.treatmentPlan}
              </p>
            </div>

            <div>
              <span className="font-semibold text-bliv-dark uppercase tracking-wider block mb-1">
                Follow-up Directives
              </span>
              <p className="text-bliv-text-primary bg-bliv-bg p-3 rounded-bliv border border-bliv-border leading-relaxed">
                {selectedRecord.followUp}
              </p>
            </div>

            {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
              <div>
                <span className="font-semibold text-bliv-dark uppercase tracking-wider block mb-2">
                  Attachments ({selectedRecord.attachments.length})
                </span>
                <div className="space-y-1.5">
                  {selectedRecord.attachments.map(att => (
                    <div
                      key={att.id}
                      className="flex items-center justify-between p-2 rounded bg-bliv-surface-secondary border border-bliv-border text-xs"
                    >
                      <span className="font-mono font-medium text-bliv-dark">{att.name} ({att.size})</span>
                      <button
                        onClick={() => alert(`Opening simulated file ${att.name}`)}
                        className="text-bliv-green font-semibold hover:underline"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Modals */}
      <PatientFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patientToEdit={patient}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        defaultPatientId={patient.id}
      />

      <RecordFormModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        defaultPatientId={patient.id}
      />
    </div>
  );
};
