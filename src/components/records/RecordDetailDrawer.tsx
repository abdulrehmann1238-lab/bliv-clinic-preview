import React from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { ClinicalRecord, Patient } from '../../types';
import { mockClinicians } from '../../data/mockData';
import { Paperclip, Edit3, User, Calendar, Clock, FileCheck } from 'lucide-react';

interface RecordDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  record: ClinicalRecord | null;
  patient?: Patient;
  onEdit: (record: ClinicalRecord) => void;
  onNavigateToPatient?: (patientId: string) => void;
}

export const RecordDetailDrawer: React.FC<RecordDetailDrawerProps> = ({
  isOpen,
  onClose,
  record,
  patient,
  onEdit,
  onNavigateToPatient,
}) => {
  if (!record) return null;

  const clinician = mockClinicians.find(c => c.id === record.clinicianId);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={record.title}
      subtitle={`${record.type} • Encounter on ${new Date(record.consultationDate).toLocaleDateString('en-GB')}`}
      width="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-[11px] text-bliv-text-secondary font-mono">
            ID: {record.id}
          </span>
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
                onEdit(record);
              }}
            >
              Edit Record
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6 text-xs">
        {/* Patient Link Banner */}
        {patient && (
          <div className="p-3 bg-bliv-surface-secondary rounded-bliv border border-bliv-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-bliv-sage flex items-center justify-center font-bold text-bliv-dark">
                {patient.firstName[0]}{patient.lastName[0]}
              </div>
              <div>
                <p className="font-semibold text-bliv-dark text-xs">
                  {patient.firstName} {patient.lastName}
                </p>
                <p className="text-[11px] text-bliv-text-secondary font-mono">
                  {patient.patientNumber} • {patient.gender} • {patient.bloodType || 'A+'}
                </p>
              </div>
            </div>
            {onNavigateToPatient && (
              <button
                onClick={() => onNavigateToPatient(patient.id)}
                className="text-xs font-semibold text-bliv-green hover:underline"
              >
                View Profile →
              </button>
            )}
          </div>
        )}

        {/* Clinician Attribution & Timing */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-bliv-bg rounded-bliv border border-bliv-border">
          <div>
            <span className="text-[10px] uppercase font-semibold text-bliv-text-secondary block">
              Consulting Clinician
            </span>
            <span className="font-semibold text-bliv-dark block mt-0.5">
              {clinician?.name || 'Dr. Amelia Carter'}
            </span>
            <span className="text-[10px] text-bliv-text-secondary block">
              {clinician?.specialty || 'General Practitioner'}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-bliv-text-secondary block">
              Created / Updated
            </span>
            <span className="font-mono text-bliv-text-primary block mt-0.5">
              {new Date(record.createdAt).toLocaleDateString('en-GB')}
            </span>
            <span className="text-[10px] text-bliv-text-secondary font-mono block">
              {new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Clinical SOAP Sections */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-bliv-dark uppercase tracking-wider text-[11px] mb-1.5">
              Clinical Notes & Subjective Observations
            </h4>
            <div className="p-3.5 bg-bliv-bg rounded-bliv border border-bliv-border text-bliv-text-primary leading-relaxed whitespace-pre-wrap">
              {record.notes}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-bliv-dark uppercase tracking-wider text-[11px] mb-1.5">
              Diagnosis / Clinical Assessment
            </h4>
            <div className="p-3.5 bg-bliv-bg rounded-bliv border border-bliv-border text-bliv-text-primary leading-relaxed">
              {record.assessment}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-bliv-dark uppercase tracking-wider text-[11px] mb-1.5">
              Treatment Plan & Interventions
            </h4>
            <div className="p-3.5 bg-bliv-bg rounded-bliv border border-bliv-border text-bliv-text-primary leading-relaxed">
              {record.treatmentPlan}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-bliv-dark uppercase tracking-wider text-[11px] mb-1.5">
              Follow-up Directives
            </h4>
            <div className="p-3.5 bg-bliv-bg rounded-bliv border border-bliv-border text-bliv-text-primary leading-relaxed">
              {record.followUp}
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div>
          <h4 className="font-semibold text-bliv-dark uppercase tracking-wider text-[11px] mb-2 flex items-center justify-between">
            <span>Attached Documents</span>
            <span className="text-bliv-text-secondary font-mono font-normal">
              {record.attachments?.length || 0} files
            </span>
          </h4>

          {record.attachments && record.attachments.length > 0 ? (
            <div className="space-y-2">
              {record.attachments.map(att => (
                <div
                  key={att.id}
                  className="flex items-center justify-between p-2.5 rounded-bliv bg-bliv-surface-secondary border border-bliv-border"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileCheck className="w-4 h-4 text-bliv-green shrink-0" />
                    <div className="truncate">
                      <p className="font-medium text-bliv-dark truncate">{att.name}</p>
                      <p className="text-[10px] text-bliv-text-secondary">
                        {att.size} • {att.uploadedBy}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Simulated document view: ${att.name}`)}
                    className="text-bliv-green font-semibold hover:underline text-xs shrink-0 ml-2"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-bliv-text-secondary text-xs italic">No supporting files attached to this consultation note.</p>
          )}
        </div>
      </div>
    </Drawer>
  );
};
