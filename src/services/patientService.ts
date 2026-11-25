import { Patient, Clinician } from '../types';
import { StorageService } from './storageService';
import { AuditService } from './auditService';

export class PatientService {
  public static getAll(): Patient[] {
    return StorageService.getPatients();
  }

  public static getById(id: string): Patient | undefined {
    return this.getAll().find(p => p.id === id);
  }

  public static getByPatientNumber(patientNumber: string): Patient | undefined {
    return this.getAll().find(p => p.patientNumber === patientNumber);
  }

  public static generateNextPatientNumber(): string {
    const patients = this.getAll();
    const numbers = patients
      .map(p => {
        const match = p.patientNumber.match(/BLV-(\d+)/);
        return match ? parseInt(match[1], 10) : 1000;
      })
      .filter(n => !isNaN(n));
    const maxNum = numbers.length > 0 ? Math.max(...numbers) : 1000;
    return `BLV-${maxNum + 1}`;
  }

  public static create(
    patientData: Omit<Patient, 'id' | 'patientNumber' | 'createdAt' | 'updatedAt'>,
    currentUser: Clinician
  ): Patient {
    const patients = this.getAll();
    const now = new Date().toISOString();
    const newId = `pat-${Date.now()}`;
    const patientNumber = this.generateNextPatientNumber();

    const newPatient: Patient = {
      ...patientData,
      id: newId,
      patientNumber,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newPatient, ...patients];
    StorageService.savePatients(updated);

    AuditService.logAction(
      currentUser,
      'Created patient profile',
      'Patient',
      newPatient.id,
      `${newPatient.firstName} ${newPatient.lastName} (${newPatient.patientNumber})`,
      `Registered new patient profile with verified contact details.`,
      null,
      {
        patientNumber: newPatient.patientNumber,
        name: `${newPatient.firstName} ${newPatient.lastName}`,
        email: newPatient.email,
        phone: newPatient.phone,
        status: newPatient.status,
      }
    );

    return newPatient;
  }

  public static update(
    id: string,
    updates: Partial<Omit<Patient, 'id' | 'patientNumber' | 'createdAt'>>,
    currentUser: Clinician
  ): Patient {
    const patients = this.getAll();
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) throw new Error(`Patient ${id} not found`);

    const existing = patients[index];
    const updatedPatient: Patient = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    patients[index] = updatedPatient;
    StorageService.savePatients(patients);

    AuditService.logAction(
      currentUser,
      'Updated patient profile',
      'Patient',
      updatedPatient.id,
      `${updatedPatient.firstName} ${updatedPatient.lastName} (${updatedPatient.patientNumber})`,
      `Updated clinical and contact information for patient.`,
      {
        name: `${existing.firstName} ${existing.lastName}`,
        phone: existing.phone,
        address: existing.address,
        status: existing.status,
      },
      {
        name: `${updatedPatient.firstName} ${updatedPatient.lastName}`,
        phone: updatedPatient.phone,
        address: updatedPatient.address,
        status: updatedPatient.status,
      }
    );

    return updatedPatient;
  }

  public static delete(id: string, currentUser: Clinician): boolean {
    const patients = this.getAll();
    const existing = patients.find(p => p.id === id);
    if (!existing) return false;

    const filtered = patients.filter(p => p.id !== id);
    StorageService.savePatients(filtered);

    AuditService.logAction(
      currentUser,
      'Archived/Deleted patient record',
      'Patient',
      existing.id,
      `${existing.firstName} ${existing.lastName} (${existing.patientNumber})`,
      `Patient profile removed from active clinic registry.`,
      { patientNumber: existing.patientNumber, status: existing.status },
      null
    );

    return true;
  }
}
