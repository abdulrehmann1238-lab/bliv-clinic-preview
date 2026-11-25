import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  ShieldCheck, 
  Save, 
  RotateCcw,
  Code2,
  Database,
  Lock,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Tabs } from '../components/ui/Tabs';
import { fhirMappingReference } from '../data/fhirMapping';

export const SettingsPage: React.FC = () => {
  const { 
    currentUser, 
    settings, 
    updateCurrentUser, 
    updateSettings, 
    resetDemoData 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'workspace' | 'security' | 'fhir'>('profile');

  // Clinician profile state
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [role, setRole] = useState(currentUser.role);
  const [specialty, setSpecialty] = useState(currentUser.specialty);

  // Workspace state
  const [clinicName, setClinicName] = useState(settings.clinicName);
  const [timezone, setTimezone] = useState(settings.timezone);
  const [dateFormat, setDateFormat] = useState(settings.dateFormat);
  const [density, setDensity] = useState(settings.density);
  const [notifEmail, setNotifEmail] = useState(settings.notificationsEmail);
  const [notifAlerts, setNotifAlerts] = useState(settings.notificationsAppointmentAlerts);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({ name, email, role, specialty });
  };

  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      clinicName,
      timezone,
      dateFormat,
      density,
      notificationsEmail: notifEmail,
      notificationsAppointmentAlerts: notifAlerts,
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-bliv-dark tracking-tight">
          Settings & Architecture
        </h1>
        <p className="text-xs sm:text-sm text-bliv-text-secondary mt-1">
          Manage your clinician credentials, workspace configuration, and review FHIR integration blueprints.
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={id => setActiveTab(id as any)}
        tabs={[
          { id: 'profile', label: 'Clinician Profile' },
          { id: 'workspace', label: 'Workspace Info' },
          { id: 'security', label: 'Security & Compliance' },
          { id: 'fhir', label: 'FHIR Architecture Reference' },
        ]}
      />

      {/* Tab 1: Clinician Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-bliv-surface p-6 sm:p-8 rounded-bliv-lg border border-bliv-border shadow-subtle space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-bliv-border">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-bliv-sage"
            />
            <div>
              <h3 className="font-heading text-lg font-bold text-bliv-dark">{currentUser.name}</h3>
              <p className="text-xs text-bliv-text-secondary">{currentUser.specialty}</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bliv-surface-secondary text-bliv-dark border border-bliv-border mt-1 inline-block">
                ID: {currentUser.id}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              label="Institutional Email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              label="Clinical Role"
              value={role}
              onChange={e => setRole(e.target.value)}
            />
            <Input
              label="Medical Specialty"
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-bliv-border">
            <span className="text-xs text-bliv-text-secondary">Changes persist locally for demo evaluation.</span>
            <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
              Save Profile
            </Button>
          </div>
        </form>
      )}

      {/* Tab 2: Workspace Info */}
      {activeTab === 'workspace' && (
        <form onSubmit={handleSaveWorkspace} className="bg-bliv-surface p-6 sm:p-8 rounded-bliv-lg border border-bliv-border shadow-subtle space-y-6">
          <div className="pb-2 border-b border-bliv-border">
            <h3 className="font-heading text-base font-bold text-bliv-dark">Clinic Practice Configuration</h3>
            <p className="text-xs text-bliv-text-secondary mt-0.5">Parameters applied across calendars, timezones, and display density.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Clinic Name"
              required
              value={clinicName}
              onChange={e => setClinicName(e.target.value)}
            />
            <Select
              label="Operating Timezone"
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
              options={[
                { value: 'Europe/London (GMT+0)', label: 'Europe/London (GMT+0)' },
                { value: 'America/New_York (EST)', label: 'America/New_York (EST)' },
                { value: 'America/Los_Angeles (PST)', label: 'America/Los_Angeles (PST)' },
                { value: 'Europe/Berlin (CET)', label: 'Europe/Berlin (CET)' },
              ]}
            />
            <Select
              label="Date Display Format"
              value={dateFormat}
              onChange={e => setDateFormat(e.target.value)}
              options={[
                { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (Standard UK/EU)' },
                { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US Format)' },
                { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO 8601)' },
              ]}
            />
            <Select
              label="Interface Density"
              value={density}
              onChange={e => setDensity(e.target.value as any)}
              options={[
                { value: 'comfortable', label: 'Comfortable (Standard)' },
                { value: 'compact', label: 'Compact Density' },
              ]}
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-bliv-border">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary">
              Notification Preferences
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-bliv-text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifEmail}
                  onChange={e => setNotifEmail(e.target.checked)}
                  className="rounded border-bliv-border text-bliv-green focus:ring-bliv-green/30"
                />
                <span>Receive daily email consultation digest</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-bliv-text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifAlerts}
                  onChange={e => setNotifAlerts(e.target.checked)}
                  className="rounded border-bliv-border text-bliv-green focus:ring-bliv-green/30"
                />
                <span>Instant alerts for patient rescheduling or cancellations</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-bliv-border">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetDemoData}
              icon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Reset All Demo Data
            </Button>
            <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
              Save Workspace
            </Button>
          </div>
        </form>
      )}

      {/* Tab 3: Security & Governance */}
      {activeTab === 'security' && (
        <div className="bg-bliv-surface p-6 sm:p-8 rounded-bliv-lg border border-bliv-border shadow-subtle space-y-6">
          <div className="pb-2 border-b border-bliv-border">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-bliv-green" />
              <h3 className="font-heading text-lg font-bold text-bliv-dark">Security Architecture Overview</h3>
            </div>
            <p className="text-xs text-bliv-text-secondary mt-1">
              Production readiness principles designed into the BLIV platform architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-bliv bg-bliv-bg border border-bliv-border space-y-1.5">
              <span className="font-bold text-bliv-dark text-xs flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-bliv-green" />
                <span>Authentication & Session Architecture</span>
              </span>
              <p className="text-bliv-text-secondary leading-relaxed">
                OAuth2 / OIDC integration supporting clinician SSO, short-lived JWT session tokens, and mandatory MFA (Multi-Factor Authentication).
              </p>
            </div>

            <div className="p-4 rounded-bliv bg-bliv-bg border border-bliv-border space-y-1.5">
              <span className="font-bold text-bliv-dark text-xs flex items-center gap-1.5">
                <Database className="w-4 h-4 text-bliv-green" />
                <span>Encryption in Transit & at Rest</span>
              </span>
              <p className="text-bliv-text-secondary leading-relaxed">
                TLS 1.3 enforced for all API traffic; database volumes and file attachments encrypted with AES-256 with tenant key rotation.
              </p>
            </div>

            <div className="p-4 rounded-bliv bg-bliv-bg border border-bliv-border space-y-1.5">
              <span className="font-bold text-bliv-dark text-xs flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-bliv-green" />
                <span>Role-Based Access Control (RBAC)</span>
              </span>
              <p className="text-bliv-text-secondary leading-relaxed">
                Granular permission boundaries between Attending Clinicians, Clinic Administrators, and Medical Records Auditors.
              </p>
            </div>

            <div className="p-4 rounded-bliv bg-bliv-bg border border-bliv-border space-y-1.5">
              <span className="font-bold text-bliv-dark text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-bliv-green" />
                <span>Immutable Server-Side Audit Trail</span>
              </span>
              <p className="text-bliv-text-secondary leading-relaxed">
                Structured append-only audit logs capturing user ID, timestamp, before/after record states, and IP origin for compliance auditing.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-bliv bg-bliv-surface-secondary border border-bliv-border text-xs text-bliv-text-secondary">
            <strong className="text-bliv-dark">Compliance Statement:</strong> This frontend demonstration is designed with privacy-conscious workflows in mind. Production compliance (HIPAA, GDPR, UK DPA) depends on backend infrastructure, Business Associate Agreements (BAAs), access controls, and administrative policies.
          </div>
        </div>
      )}

      {/* Tab 4: FHIR-Ready Reference */}
      {activeTab === 'fhir' && (
        <div className="bg-bliv-surface p-6 sm:p-8 rounded-bliv-lg border border-bliv-border shadow-subtle space-y-6">
          <div className="pb-2 border-b border-bliv-border">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-bliv-green" />
              <h3 className="font-heading text-lg font-bold text-bliv-dark">HL7 FHIR R4 Architectural Blueprint</h3>
            </div>
            <p className="text-xs text-bliv-text-secondary mt-1">
              Organised schema showing how BLIV client models cleanly translate into FHIR standard healthcare resources.
            </p>
          </div>

          <div className="space-y-4">
            {fhirMappingReference.map(mapping => (
              <div key={mapping.blivModel} className="p-4 rounded-bliv bg-bliv-bg border border-bliv-border space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-bliv-border">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-bliv-dark">
                      BLIV Model: {mapping.blivModel}
                    </span>
                    <span className="text-xs text-bliv-text-secondary">→</span>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-bliv-sage text-bliv-dark">
                      FHIR Resource: {mapping.fhirResource}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-bliv-text-secondary">
                    {mapping.fhirType}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-[11px] text-bliv-text-secondary uppercase">
                      <tr>
                        <th className="py-1 pr-3">BLIV Attribute</th>
                        <th className="py-1 px-3">FHIR Path</th>
                        <th className="py-1 pl-3">Mapping Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-bliv-border/60">
                      {mapping.fields.map((f, i) => (
                        <tr key={i} className="text-[11px]">
                          <td className="py-1.5 pr-3 font-semibold text-bliv-dark">{f.blivField}</td>
                          <td className="py-1.5 px-3 font-mono text-bliv-green">{f.fhirPath}</td>
                          <td className="py-1.5 pl-3 text-bliv-text-secondary">{f.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
