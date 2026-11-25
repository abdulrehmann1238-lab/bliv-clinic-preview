import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  Patient, 
  ClinicalRecord, 
  Appointment, 
  AuditEvent, 
  Clinician, 
  WorkspaceSettings, 
  ToastMessage,
  AppointmentStatus 
} from '../types';
import { StorageService } from '../services/storageService';
import { PatientService } from '../services/patientService';
import { RecordService } from '../services/recordService';
import { AppointmentService } from '../services/appointmentService';
import { AuditService } from '../services/auditService';

interface AppContextType {
  // State
  patients: Patient[];
  records: ClinicalRecord[];
  appointments: Appointment[];
  auditEvents: AuditEvent[];
  currentUser: Clinician;
  settings: WorkspaceSettings;
  toasts: ToastMessage[];
  isAuthenticated: boolean;
  isLoadingInitial: boolean;

  // Actions
  login: (email?: string) => void;
  logout: () => void;
  finishInitialLoading: () => void;
  showToast: (type: ToastMessage['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;
  resetDemoData: () => void;

  // Patients
  addPatient: (data: Omit<Patient, 'id' | 'patientNumber' | 'createdAt' | 'updatedAt'>) => Patient;
  updatePatient: (id: string, updates: Partial<Omit<Patient, 'id' | 'patientNumber' | 'createdAt'>>) => Patient;
  deletePatient: (id: string) => boolean;

  // Records
  addRecord: (data: Omit<ClinicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => ClinicalRecord;
  updateRecord: (id: string, updates: Partial<Omit<ClinicalRecord, 'id' | 'patientId' | 'createdAt'>>) => ClinicalRecord;
  addDocumentToRecord: (recordId: string, file: { name: string; size: string; type: string }) => void;
  removeDocumentFromRecord: (recordId: string, attachmentId: string) => void;

  // Appointments
  addAppointment: (data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => Appointment;
  updateAppointment: (id: string, updates: Partial<Omit<Appointment, 'id' | 'createdAt'>>) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  cancelAppointment: (id: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<WorkspaceSettings>) => void;
  updateCurrentUser: (newProfile: Partial<Clinician>) => void;

  // Global Modals
  isAddPatientModalOpen: boolean;
  setIsAddPatientModalOpen: (open: boolean) => void;
  isAddAppointmentModalOpen: boolean;
  setIsAddAppointmentModalOpen: (open: boolean) => void;
  isAddRecordModalOpen: boolean;
  setIsAddRecordModalOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [records, setRecords] = useState<ClinicalRecord[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [currentUser, setCurrentUser] = useState<Clinician>(StorageService.getCurrentUser());
  const [settings, setSettings] = useState<WorkspaceSettings>(StorageService.getSettings());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Initialize storage
  useEffect(() => {
    StorageService.initializeDemoData();
    refreshAllData();
  }, []);

  const refreshAllData = useCallback(() => {
    setPatients(PatientService.getAll());
    setRecords(RecordService.getAll());
    setAppointments(AppointmentService.getAll());
    setAuditEvents(AuditService.getAll());
    setCurrentUser(StorageService.getCurrentUser());
    setSettings(StorageService.getSettings());
  }, []);

  const finishInitialLoading = useCallback(() => {
    setIsLoadingInitial(false);
  }, []);

  const showToast = useCallback((type: ToastMessage['type'], title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title, message, duration: 4000 }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const login = useCallback((_email?: string) => {
    setIsAuthenticated(true);
    showToast('success', 'Clinician authenticated', 'Welcome to your BLIV clinical workspace.');
  }, [showToast]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    showToast('info', 'Signed out', 'You have been securely signed out of the workspace.');
  }, [showToast]);

  const resetDemoData = useCallback(() => {
    StorageService.resetToDemoDefaults();
    refreshAllData();
    showToast('info', 'Demo data reset', 'Demo workspace restored to default clinical baseline.');
  }, [refreshAllData, showToast]);

  // Patients
  const addPatient = useCallback((data: Omit<Patient, 'id' | 'patientNumber' | 'createdAt' | 'updatedAt'>) => {
    const created = PatientService.create(data, currentUser);
    refreshAllData();
    showToast('success', 'Patient registered', `${created.firstName} ${created.lastName} (${created.patientNumber}) added to clinic registry.`);
    return created;
  }, [currentUser, refreshAllData, showToast]);

  const updatePatient = useCallback((id: string, updates: Partial<Omit<Patient, 'id' | 'patientNumber' | 'createdAt'>>) => {
    const updated = PatientService.update(id, updates, currentUser);
    refreshAllData();
    showToast('success', 'Patient updated', `Changes saved for ${updated.firstName} ${updated.lastName}.`);
    return updated;
  }, [currentUser, refreshAllData, showToast]);

  const deletePatient = useCallback((id: string) => {
    const success = PatientService.delete(id, currentUser);
    if (success) {
      refreshAllData();
      showToast('warning', 'Patient archived', 'Patient profile has been archived from active records.');
    }
    return success;
  }, [currentUser, refreshAllData, showToast]);

  // Records
  const addRecord = useCallback((data: Omit<ClinicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = RecordService.create(data, currentUser);
    refreshAllData();
    showToast('success', 'Clinical record created', `"${created.title}" successfully documented.`);
    return created;
  }, [currentUser, refreshAllData, showToast]);

  const updateRecord = useCallback((id: string, updates: Partial<Omit<ClinicalRecord, 'id' | 'patientId' | 'createdAt'>>) => {
    const updated = RecordService.update(id, updates, currentUser);
    refreshAllData();
    showToast('success', 'Record updated', `Clinical consultation note updated.`);
    return updated;
  }, [currentUser, refreshAllData, showToast]);

  const addDocumentToRecord = useCallback((recordId: string, file: { name: string; size: string; type: string }) => {
    RecordService.addAttachment(recordId, file, currentUser);
    refreshAllData();
    showToast('success', 'Document attached', `${file.name} uploaded to clinical record.`);
  }, [currentUser, refreshAllData, showToast]);

  const removeDocumentFromRecord = useCallback((recordId: string, attachmentId: string) => {
    RecordService.removeAttachment(recordId, attachmentId, currentUser);
    refreshAllData();
    showToast('info', 'Document removed', 'Attachment removed from record.');
  }, [currentUser, refreshAllData, showToast]);

  // Appointments
  const addAppointment = useCallback((data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = AppointmentService.create(data, currentUser);
    refreshAllData();
    showToast('success', 'Appointment scheduled', `${created.title} set for ${created.date} at ${created.startTime}.`);
    return created;
  }, [currentUser, refreshAllData, showToast]);

  const updateAppointment = useCallback((id: string, updates: Partial<Omit<Appointment, 'id' | 'createdAt'>>) => {
    const updated = AppointmentService.update(id, updates, currentUser);
    refreshAllData();
    showToast('success', 'Appointment updated', `Schedule details updated for ${updated.title}.`);
    return updated;
  }, [currentUser, refreshAllData, showToast]);

  const updateAppointmentStatus = useCallback((id: string, status: AppointmentStatus) => {
    AppointmentService.updateStatus(id, status, currentUser);
    refreshAllData();
    showToast('info', 'Status updated', `Appointment marked as ${status}.`);
  }, [currentUser, refreshAllData, showToast]);

  const cancelAppointment = useCallback((id: string) => {
    AppointmentService.cancel(id, currentUser);
    refreshAllData();
    showToast('warning', 'Appointment cancelled', 'Appointment has been cancelled.');
  }, [currentUser, refreshAllData, showToast]);

  // Settings
  const updateSettings = useCallback((newSettings: Partial<WorkspaceSettings>) => {
    const updated = { ...settings, ...newSettings };
    StorageService.saveSettings(updated);
    setSettings(updated);
    AuditService.logAction(
      currentUser,
      'Updated workspace settings',
      'Workspace',
      'workspace-global',
      updated.clinicName,
      'Updated clinic preferences and display parameters.',
      null,
      updated
    );
    refreshAllData();
    showToast('success', 'Settings updated', 'Workspace preferences have been saved locally.');
  }, [currentUser, refreshAllData, settings, showToast]);

  const updateCurrentUser = useCallback((newProfile: Partial<Clinician>) => {
    const updated = { ...currentUser, ...newProfile };
    StorageService.saveCurrentUser(updated);
    setCurrentUser(updated);
    showToast('success', 'Profile updated', 'Your clinician details have been saved.');
  }, [currentUser, showToast]);

  // Global Cmd+K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        patients,
        records,
        appointments,
        auditEvents,
        currentUser,
        settings,
        toasts,
        isAuthenticated,
        isLoadingInitial,
        login,
        logout,
        finishInitialLoading,
        showToast,
        removeToast,
        resetDemoData,
        addPatient,
        updatePatient,
        deletePatient,
        addRecord,
        updateRecord,
        addDocumentToRecord,
        removeDocumentFromRecord,
        addAppointment,
        updateAppointment,
        updateAppointmentStatus,
        cancelAppointment,
        updateSettings,
        updateCurrentUser,
        isAddPatientModalOpen,
        setIsAddPatientModalOpen,
        isAddAppointmentModalOpen,
        setIsAddAppointmentModalOpen,
        isAddRecordModalOpen,
        setIsAddRecordModalOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
