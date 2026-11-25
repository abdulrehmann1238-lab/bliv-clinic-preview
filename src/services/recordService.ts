import { ClinicalRecord, DocumentAttachment, Clinician } from '../types';
import { StorageService } from './storageService';
import { AuditService } from './auditService';
import { PatientService } from './patientService';

export class RecordService {
  public static getAll(): ClinicalRecord[] {
    return StorageService.getRecords();
  }

  public static getById(id: string): ClinicalRecord | undefined {
    return this.getAll().find(r => r.id === id);
  }

  public static getByPatientId(patientId: string): ClinicalRecord[] {
    return this.getAll().filter(r => r.patientId === patientId);
  }

  public static create(
    recordData: Omit<ClinicalRecord, 'id' | 'createdAt' | 'updatedAt'>,
    currentUser: Clinician
  ): ClinicalRecord {
    const records = this.getAll();
    const now = new Date().toISOString();
    const newRecord: ClinicalRecord = {
      ...recordData,
      id: `rec-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };

    const patient = PatientService.getById(newRecord.patientId);
    const patientLabel = patient ? `${patient.firstName} ${patient.lastName} (${patient.patientNumber})` : newRecord.patientId;

    const updated = [newRecord, ...records];
    StorageService.saveRecords(updated);

    AuditService.logAction(
      currentUser,
      'Created clinical record',
      'ClinicalRecord',
      newRecord.id,
      patientLabel,
      `Logged consultation note: "${newRecord.title}" (${newRecord.type}).`,
      null,
      {
        title: newRecord.title,
        type: newRecord.type,
        consultationDate: newRecord.consultationDate,
        assessment: newRecord.assessment,
      }
    );

    return newRecord;
  }

  public static update(
    id: string,
    updates: Partial<Omit<ClinicalRecord, 'id' | 'patientId' | 'createdAt'>>,
    currentUser: Clinician
  ): ClinicalRecord {
    const records = this.getAll();
    const index = records.findIndex(r => r.id === id);
    if (index === -1) throw new Error(`Record ${id} not found`);

    const existing = records[index];
    const updatedRecord: ClinicalRecord = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    records[index] = updatedRecord;
    StorageService.saveRecords(records);

    const patient = PatientService.getById(existing.patientId);
    const patientLabel = patient ? `${patient.firstName} ${patient.lastName} (${patient.patientNumber})` : existing.patientId;

    AuditService.logAction(
      currentUser,
      'Updated consultation notes',
      'ClinicalRecord',
      updatedRecord.id,
      patientLabel,
      `Modified clinical notes and care plan for record: "${updatedRecord.title}".`,
      { title: existing.title, type: existing.type, notes: existing.notes.slice(0, 80) + '...' },
      { title: updatedRecord.title, type: updatedRecord.type, notes: updatedRecord.notes.slice(0, 80) + '...' }
    );

    return updatedRecord;
  }

  public static addAttachment(
    recordId: string,
    file: { name: string; size: string; type: string },
    currentUser: Clinician
  ): DocumentAttachment {
    const records = this.getAll();
    const record = records.find(r => r.id === recordId);
    if (!record) throw new Error(`Record ${recordId} not found`);

    const attachment: DocumentAttachment = {
      id: `att-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type || 'application/pdf',
      uploadedAt: new Date().toISOString(),
      uploadedBy: currentUser.name,
    };

    record.attachments = [...(record.attachments || []), attachment];
    record.updatedAt = new Date().toISOString();
    StorageService.saveRecords(records);

    const patient = PatientService.getById(record.patientId);
    const patientLabel = patient ? `${patient.firstName} ${patient.lastName} (${patient.patientNumber})` : record.patientId;

    AuditService.logAction(
      currentUser,
      'Attached clinical document',
      'Document',
      attachment.id,
      patientLabel,
      `Attached clinical file "${attachment.name}" (${attachment.size}) to consultation record.`,
      null,
      { fileName: attachment.name, size: attachment.size, recordTitle: record.title }
    );

    return attachment;
  }

  public static removeAttachment(
    recordId: string,
    attachmentId: string,
    currentUser: Clinician
  ): boolean {
    const records = this.getAll();
    const record = records.find(r => r.id === recordId);
    if (!record) return false;

    const attachment = record.attachments?.find(a => a.id === attachmentId);
    if (!attachment) return false;

    record.attachments = record.attachments.filter(a => a.id !== attachmentId);
    record.updatedAt = new Date().toISOString();
    StorageService.saveRecords(records);

    const patient = PatientService.getById(record.patientId);
    const patientLabel = patient ? `${patient.firstName} ${patient.lastName} (${patient.patientNumber})` : record.patientId;

    AuditService.logAction(
      currentUser,
      'Removed clinical document',
      'Document',
      attachmentId,
      patientLabel,
      `Removed attachment "${attachment.name}" from consultation record.`,
      { fileName: attachment.name },
      null
    );

    return true;
  }
}
