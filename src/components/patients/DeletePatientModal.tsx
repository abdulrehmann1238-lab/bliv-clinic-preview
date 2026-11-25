import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Patient } from '../../types';
import { AlertTriangle } from 'lucide-react';

interface DeletePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onConfirm: () => void;
}

export const DeletePatientModal: React.FC<DeletePatientModalProps> = ({
  isOpen,
  onClose,
  patient,
  onConfirm,
}) => {
  if (!patient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm" showCloseButton={false}>
      <div className="text-center p-2">
        <div className="w-12 h-12 rounded-full bg-[#faecea] text-[#8e3c35] flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-bliv-dark">Archive Patient Profile?</h3>
        <p className="text-xs text-bliv-text-secondary mt-1.5 leading-relaxed">
          Are you sure you want to archive <strong>{patient.firstName} {patient.lastName}</strong> ({patient.patientNumber})? Clinical records and previous appointment logs will remain intact in audit logs.
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm}>
            Yes, Archive Patient
          </Button>
        </div>
      </div>
    </Modal>
  );
};
