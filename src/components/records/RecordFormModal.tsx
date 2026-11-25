import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { ClinicalRecord, RecordType } from '../../types';
import { mockClinicians } from '../../data/mockData';
import { Paperclip, X } from 'lucide-react';

interface RecordFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordToEdit?: ClinicalRecord | null;
  defaultPatientId?: string;
}

export const RecordFormModal: React.FC<RecordFormModalProps> = ({
  isOpen,
  onClose,
  recordToEdit,
  defaultPatientId,
}) => {
  const { patients, currentUser, addRecord, updateRecord } = useApp();

  const [patientId, setPatientId] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<RecordType>('Consultation note');
  const [consultationDate, setConsultationDate] = useState('');
  const [clinicianId, setClinicianId] = useState(currentUser.id);
  const [notes, setNotes] = useState('');
  const [assessment, setAssessment] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [simulatedFiles, setSimulatedFiles] = useState<{ name: string; size: string; type: string }[]>([]);

  useEffect(() => {
    if (recordToEdit) {
      setPatientId(recordToEdit.patientId);
      setTitle(recordToEdit.title);
      setType(recordToEdit.type);
      setConsultationDate(recordToEdit.consultationDate);
      setClinicianId(recordToEdit.clinicianId);
      setNotes(recordToEdit.notes);
      setAssessment(recordToEdit.assessment);
      setTreatmentPlan(recordToEdit.treatmentPlan);
      setFollowUp(recordToEdit.followUp);
      setSimulatedFiles([]);
    } else {
      setPatientId(defaultPatientId || (patients[0]?.id ?? ''));
      setTitle('');
      setType('Consultation note');
      setConsultationDate(new Date().toISOString().split('T')[0]);
      setClinicianId(currentUser.id);
      setNotes('');
      setAssessment('');
      setTreatmentPlan('');
      setFollowUp('');
      setSimulatedFiles([]);
    }
  }, [recordToEdit, defaultPatientId, patients, currentUser, isOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const sizeKb = Math.round(file.size / 1024);
      const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
      setSimulatedFiles(prev => [...prev, { name: file.name, size: sizeStr, type: file.type }]);
    }
  };

  const handleRemoveSimulatedFile = (idx: number) => {
    setSimulatedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientId || !title || !notes) {
      alert('Please fill out patient, title, and consultation notes.');
      return;
    }

    const payload = {
      patientId,
      title,
      type,
      consultationDate,
      clinicianId,
      notes,
      assessment: assessment || 'Clinical review completed.',
      treatmentPlan: treatmentPlan || 'Routine self-monitoring and lifestyle maintenance.',
      followUp: followUp || 'Review as required.',
      attachments: simulatedFiles.map((f, i) => ({
        id: `att-${Date.now()}-${i}`,
        name: f.name,
        size: f.size,
        type: f.type || 'application/pdf',
        uploadedAt: new Date().toISOString(),
        uploadedBy: currentUser.name,
      })),
    };

    if (recordToEdit) {
      updateRecord(recordToEdit.id, payload);
    } else {
      addRecord(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={recordToEdit ? 'Edit Medical Record' : 'New Clinical Record'}
      subtitle="Document consultation findings, SOAP notes, and attach clinical reports."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Patient"
            required
            value={patientId}
            onChange={e => setPatientId(e.target.value)}
            options={patients.map(p => ({
              value: p.id,
              label: `${p.firstName} ${p.lastName} (${p.patientNumber})`,
            }))}
          />
          <Select
            label="Record Type"
            value={type}
            onChange={e => setType(e.target.value as RecordType)}
            options={[
              { value: 'Consultation note', label: 'Consultation note' },
              { value: 'Clinical assessment', label: 'Clinical assessment' },
              { value: 'Follow-up', label: 'Follow-up' },
              { value: 'Referral', label: 'Referral' },
              { value: 'Other', label: 'Other' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <Input
              label="Record Title"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Hypertension Review & Medication Adjustment"
            />
          </div>
          <Input
            label="Consultation Date"
            type="date"
            required
            value={consultationDate}
            onChange={e => setConsultationDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary mb-1.5">
            Clinical Notes & Observations *
          </label>
          <textarea
            required
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Subjective complaints, history of presenting condition, home measurements..."
            className="w-full bg-bliv-surface border border-bliv-border rounded-bliv text-sm p-3 focus:outline-none focus:ring-2 focus:ring-bliv-green/30 text-bliv-text-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary mb-1.5">
              Diagnosis / Clinical Assessment
            </label>
            <textarea
              rows={2}
              value={assessment}
              onChange={e => setAssessment(e.target.value)}
              placeholder="Primary diagnostic impression or differential..."
              className="w-full bg-bliv-surface border border-bliv-border rounded-bliv text-sm p-2.5 focus:outline-none focus:ring-2 focus:ring-bliv-green/30 text-bliv-text-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary mb-1.5">
              Treatment Plan & Medications
            </label>
            <textarea
              rows={2}
              value={treatmentPlan}
              onChange={e => setTreatmentPlan(e.target.value)}
              placeholder="Therapeutic interventions, titrations, non-pharmacological advice..."
              className="w-full bg-bliv-surface border border-bliv-border rounded-bliv text-sm p-2.5 focus:outline-none focus:ring-2 focus:ring-bliv-green/30 text-bliv-text-primary"
            />
          </div>
        </div>

        <Input
          label="Follow-up Instructions"
          value={followUp}
          onChange={e => setFollowUp(e.target.value)}
          placeholder="e.g. Virtual review in 4 weeks with home BP readings."
        />

        {/* Attachments Section */}
        <div className="p-3 bg-bliv-surface-secondary/70 rounded-bliv border border-bliv-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-bliv-dark flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-bliv-green" />
              <span>Attach Supporting Document</span>
            </span>
            <label className="cursor-pointer text-xs font-semibold text-bliv-green hover:underline">
              <span>+ Browse file</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {simulatedFiles.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {simulatedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-bliv-surface border border-bliv-border text-xs">
                  <span className="font-mono text-bliv-dark truncate">{file.name} ({file.size})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSimulatedFile(idx)}
                    className="text-bliv-text-secondary hover:text-bliv-error"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-bliv-border">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {recordToEdit ? 'Save Changes' : 'Save Record'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
