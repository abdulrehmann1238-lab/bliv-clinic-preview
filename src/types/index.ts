export type Gender = 'Female' | 'Male' | 'Other' | 'Prefer not to say';

export type PatientStatus = 'Active' | 'Archived';

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Patient {
  id: string;
  patientNumber: string; // e.g. BLV-1001
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: Gender;
  email: string;
  phone: string;
  address: string;
  emergencyContact: EmergencyContact;
  status: PatientStatus;
  bloodType?: string;
  allergies?: string[];
  primaryCondition?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type RecordType = 
  | 'Consultation note'
  | 'Clinical assessment'
  | 'Follow-up'
  | 'Referral'
  | 'Other';

export interface DocumentAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
  url?: string;
}

export interface ClinicalRecord {
  id: string;
  patientId: string;
  title: string;
  type: RecordType;
  consultationDate: string; // YYYY-MM-DD
  clinicianId: string;
  notes: string;
  assessment: string;
  treatmentPlan: string;
  followUp: string;
  attachments: DocumentAttachment[];
  createdAt: string;
  updatedAt: string;
}

export type AppointmentType = 
  | 'Initial consultation'
  | 'Follow-up'
  | 'General consultation'
  | 'Review';

export type AppointmentStatus = 
  | 'Scheduled'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  title: string;
  type: AppointmentType;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm (24hr)
  endTime: string; // HH:mm (24hr)
  clinicianId: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type AuditEntityType = 'Patient' | 'ClinicalRecord' | 'Appointment' | 'Document' | 'Workspace';

export interface AuditEvent {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: AuditEntityType;
  entityId: string;
  entityName: string;
  timestamp: string; // ISO string
  description: string;
  before?: Record<string, any> | null;
  after?: Record<string, any> | null;
}

export interface Clinician {
  id: string;
  name: string;
  email: string;
  specialty: string;
  role: string;
  avatar: string;
}

export interface WorkspaceSettings {
  clinicName: string;
  timezone: string;
  dateFormat: string;
  density: 'comfortable' | 'compact';
  notificationsEmail: boolean;
  notificationsAppointmentAlerts: boolean;
  securityDisclaimerAccepted: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number;
}

// FHIR Resource Mapping Schema reference types
export interface FHIRMappingDefinition {
  blivModel: string;
  fhirResource: string;
  fhirType: string;
  fields: {
    blivField: string;
    fhirPath: string;
    notes: string;
  }[];
}
