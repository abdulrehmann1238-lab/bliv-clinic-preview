import { FHIRMappingDefinition } from '../types';

/**
 * Architectural documentation: BLIV Data Models to HL7 FHIR R4 Resource Mapping.
 * Demonstrates foresight for future interoperability without claiming active compliance.
 */
export const fhirMappingReference: FHIRMappingDefinition[] = [
  {
    blivModel: 'Patient',
    fhirResource: 'Patient',
    fhirType: 'DomainResource',
    fields: [
      { blivField: 'patientNumber', fhirPath: 'Patient.identifier[system="https://bliv.internal/patients"]', notes: 'Mapped as an official business identifier with URI system.' },
      { blivField: 'firstName, lastName', fhirPath: 'Patient.name.family, Patient.name.given[]', notes: 'HumanName datatype supporting official legal naming conventions.' },
      { blivField: 'dateOfBirth', fhirPath: 'Patient.birthDate', notes: 'Standard ISO 8601 YYYY-MM-DD date representation.' },
      { blivField: 'gender', fhirPath: 'Patient.gender', notes: 'FHIR administrative-gender value set (male | female | other | unknown).' },
      { blivField: 'email, phone', fhirPath: 'Patient.telecom[system="email"|"phone"]', notes: 'ContactPoint array specifying voice telecom and email channels.' },
      { blivField: 'address', fhirPath: 'Patient.address[use="home"].text', notes: 'Unstructured or parsed postal address structure.' },
      { blivField: 'emergencyContact', fhirPath: 'Patient.contact[]', notes: 'Patient.contact with relationship Coding and telecom info.' },
      { blivField: 'status (Active/Archived)', fhirPath: 'Patient.active', notes: 'Boolean flag indicating active operational status.' },
    ],
  },
  {
    blivModel: 'Appointment',
    fhirResource: 'Appointment',
    fhirType: 'DomainResource',
    fields: [
      { blivField: 'id', fhirPath: 'Appointment.id', notes: 'Logical resource identifier.' },
      { blivField: 'status', fhirPath: 'Appointment.status', notes: 'Mapped to FHIR AppointmentStatus (booked | arrived | fulfilled | cancelled).' },
      { blivField: 'type', fhirPath: 'Appointment.serviceType / Appointment.appointmentType', notes: 'Standard SNOMED CT or HL7 CodeableConcept.' },
      { blivField: 'date, startTime, endTime', fhirPath: 'Appointment.start, Appointment.end', notes: 'Instant formatted ISO-8601 timestamps.' },
      { blivField: 'patientId', fhirPath: 'Appointment.participant[type="patient"].actor', notes: 'Reference(Patient/<id>).' },
      { blivField: 'clinicianId', fhirPath: 'Appointment.participant[type="practitioner"].actor', notes: 'Reference(Practitioner/<id>).' },
      { blivField: 'notes', fhirPath: 'Appointment.comment / Appointment.description', notes: 'Clinical preparation or consultation comments.' },
    ],
  },
  {
    blivModel: 'ClinicalRecord',
    fhirResource: 'Composition / DocumentReference',
    fhirType: 'DomainResource',
    fields: [
      { blivField: 'title, type', fhirPath: 'Composition.type, Composition.title', notes: 'LOINC coded clinical document type (e.g. 11488-4 Consultation note).' },
      { blivField: 'consultationDate', fhirPath: 'Composition.date', notes: 'Timestamp of note creation or encounter timing.' },
      { blivField: 'clinicianId', fhirPath: 'Composition.author[]', notes: 'Reference(Practitioner/<id>).' },
      { blivField: 'patientId', fhirPath: 'Composition.subject', notes: 'Reference(Patient/<id>).' },
      { blivField: 'notes, assessment, treatmentPlan', fhirPath: 'Composition.section[]', notes: 'Clinical sections: SOAP Notes (Subjective, Objective, Assessment, Plan).' },
      { blivField: 'attachments', fhirPath: 'DocumentReference.content[].attachment', notes: 'FHIR Attachment datatype with contentType, size, and URL.' },
    ],
  },
  {
    blivModel: 'Clinician',
    fhirResource: 'Practitioner',
    fhirType: 'DomainResource',
    fields: [
      { blivField: 'name', fhirPath: 'Practitioner.name', notes: 'HumanName with prefix (Dr.) and given/family components.' },
      { blivField: 'email', fhirPath: 'Practitioner.telecom[system="email"]', notes: 'Official institutional email address.' },
      { blivField: 'specialty', fhirPath: 'PractitionerRole.specialty', notes: 'SNOMED CT coded medical specialty.' },
      { blivField: 'role', fhirPath: 'PractitionerRole.code', notes: 'Role in clinical enterprise (e.g. Lead General Practitioner).' },
    ],
  },
  {
    blivModel: 'AuditEvent',
    fhirResource: 'AuditEvent',
    fhirType: 'DomainResource',
    fields: [
      { blivField: 'action', fhirPath: 'AuditEvent.action', notes: 'C (Create), R (Read), U (Update), D (Delete), E (Execute).' },
      { blivField: 'timestamp', fhirPath: 'AuditEvent.recorded', notes: 'Instant when event occurred.' },
      { blivField: 'userId, userName', fhirPath: 'AuditEvent.agent[]', notes: 'Practitioner / user responsible for triggering the mutation.' },
      { blivField: 'entityType, entityId', fhirPath: 'AuditEvent.entity[]', notes: 'Resource impacted with what (Reference) and detail records.' },
      { blivField: 'description, before/after', fhirPath: 'AuditEvent.entity.detail', notes: 'Key-value pairs capturing state transitions.' },
    ],
  },
];
