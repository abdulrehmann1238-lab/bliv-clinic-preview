import { Patient, ClinicalRecord, Appointment, AuditEvent, Clinician, WorkspaceSettings } from '../types';
import { initialPatients, initialClinicalRecords, initialAppointments, initialAuditEvents, mockClinicians, mockWorkspaceSettings } from '../data/mockData';

const STORAGE_KEYS = {
  PATIENTS: 'bliv_patients',
  RECORDS: 'bliv_records',
  APPOINTMENTS: 'bliv_appointments',
  AUDIT_EVENTS: 'bliv_audit_events',
  SETTINGS: 'bliv_settings',
  CURRENT_USER: 'bliv_current_user',
  INITIALIZED: 'bliv_demo_initialized',
};

export class StorageService {
  private static isAvailable(): boolean {
    try {
      const testKey = '__bliv_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  public static initializeDemoData(force = false): void {
    if (!this.isAvailable()) return;

    const initialized = window.localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!initialized || force) {
      window.localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(initialPatients));
      window.localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(initialClinicalRecords));
      window.localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(initialAppointments));
      window.localStorage.setItem(STORAGE_KEYS.AUDIT_EVENTS, JSON.stringify(initialAuditEvents));
      window.localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(mockWorkspaceSettings));
      window.localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(mockClinicians[0]));
      window.localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    }
  }

  public static resetToDemoDefaults(): void {
    if (!this.isAvailable()) return;
    this.initializeDemoData(true);
  }

  // Patients
  public static getPatients(): Patient[] {
    if (!this.isAvailable()) return initialPatients;
    const data = window.localStorage.getItem(STORAGE_KEYS.PATIENTS);
    return data ? JSON.parse(data) : initialPatients;
  }

  public static savePatients(patients: Patient[]): void {
    if (!this.isAvailable()) return;
    window.localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  }

  // Clinical Records
  public static getRecords(): ClinicalRecord[] {
    if (!this.isAvailable()) return initialClinicalRecords;
    const data = window.localStorage.getItem(STORAGE_KEYS.RECORDS);
    return data ? JSON.parse(data) : initialClinicalRecords;
  }

  public static saveRecords(records: ClinicalRecord[]): void {
    if (!this.isAvailable()) return;
    window.localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  }

  // Appointments
  public static getAppointments(): Appointment[] {
    if (!this.isAvailable()) return initialAppointments;
    const data = window.localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return data ? JSON.parse(data) : initialAppointments;
  }

  public static saveAppointments(appointments: Appointment[]): void {
    if (!this.isAvailable()) return;
    window.localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }

  // Audit Events
  public static getAuditEvents(): AuditEvent[] {
    if (!this.isAvailable()) return initialAuditEvents;
    const data = window.localStorage.getItem(STORAGE_KEYS.AUDIT_EVENTS);
    return data ? JSON.parse(data) : initialAuditEvents;
  }

  public static saveAuditEvents(events: AuditEvent[]): void {
    if (!this.isAvailable()) return;
    window.localStorage.setItem(STORAGE_KEYS.AUDIT_EVENTS, JSON.stringify(events));
  }

  // Workspace Settings
  public static getSettings(): WorkspaceSettings {
    if (!this.isAvailable()) return mockWorkspaceSettings;
    const data = window.localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : mockWorkspaceSettings;
  }

  public static saveSettings(settings: WorkspaceSettings): void {
    if (!this.isAvailable()) return;
    window.localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  // Current User / Clinician
  public static getCurrentUser(): Clinician {
    if (!this.isAvailable()) return mockClinicians[0];
    const data = window.localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : mockClinicians[0];
  }

  public static saveCurrentUser(user: Clinician): void {
    if (!this.isAvailable()) return;
    window.localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }
}
