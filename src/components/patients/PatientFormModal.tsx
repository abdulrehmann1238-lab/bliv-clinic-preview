import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { Gender, Patient, PatientStatus } from '../../types';

interface PatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientToEdit?: Patient | null;
}

export const PatientFormModal: React.FC<PatientFormModalProps> = ({
  isOpen,
  onClose,
  patientToEdit,
}) => {
  const { addPatient, updatePatient } = useApp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<Gender>('Female');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRel, setEmergencyRel] = useState('Spouse');
  const [bloodType, setBloodType] = useState('A+');
  const [allergies, setAllergies] = useState('');
  const [primaryCondition, setPrimaryCondition] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<PatientStatus>('Active');

  // Prepopulate when editing
  React.useEffect(() => {
    if (patientToEdit) {
      setFirstName(patientToEdit.firstName);
      setLastName(patientToEdit.lastName);
      setDateOfBirth(patientToEdit.dateOfBirth);
      setGender(patientToEdit.gender);
      setEmail(patientToEdit.email);
      setPhone(patientToEdit.phone);
      setAddress(patientToEdit.address);
      setEmergencyName(patientToEdit.emergencyContact.name);
      setEmergencyPhone(patientToEdit.emergencyContact.phone);
      setEmergencyRel(patientToEdit.emergencyContact.relationship);
      setBloodType(patientToEdit.bloodType || 'A+');
      setAllergies((patientToEdit.allergies || []).join(', '));
      setPrimaryCondition(patientToEdit.primaryCondition || '');
      setNotes(patientToEdit.notes || '');
      setStatus(patientToEdit.status);
    } else {
      setFirstName('');
      setLastName('');
      setDateOfBirth('1990-05-15');
      setGender('Female');
      setEmail('');
      setPhone('');
      setAddress('');
      setEmergencyName('');
      setEmergencyPhone('');
      setEmergencyRel('Spouse');
      setBloodType('A+');
      setAllergies('');
      setPrimaryCondition('');
      setNotes('');
      setStatus('Active');
    }
  }, [patientToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phone,
      address: address || 'Not specified',
      emergencyContact: {
        name: emergencyName || 'Not designated',
        phone: emergencyPhone || phone,
        relationship: emergencyRel,
      },
      bloodType,
      allergies: allergies ? allergies.split(',').map(s => s.trim()) : ['None recorded'],
      primaryCondition,
      notes,
      status,
    };

    if (patientToEdit) {
      updatePatient(patientToEdit.id, payload);
    } else {
      addPatient(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={patientToEdit ? 'Edit Patient Profile' : 'Register New Patient'}
      subtitle={patientToEdit ? `Updating ${patientToEdit.patientNumber}` : 'Auto-generates BLIV patient identification upon registration.'}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Personal Details */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary border-b border-bliv-border pb-1">
            Personal Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="First Name"
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="e.g. Olivia"
            />
            <Input
              label="Last Name"
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="e.g. Bennett"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Date of Birth"
              type="date"
              required
              value={dateOfBirth}
              onChange={e => setDateOfBirth(e.target.value)}
            />
            <Select
              label="Gender"
              value={gender}
              onChange={e => setGender(e.target.value as Gender)}
              options={[
                { value: 'Female', label: 'Female' },
                { value: 'Male', label: 'Male' },
                { value: 'Other', label: 'Other' },
                { value: 'Prefer not to say', label: 'Prefer not to say' },
              ]}
            />
            <Select
              label="Blood Type"
              value={bloodType}
              onChange={e => setBloodType(e.target.value)}
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
              ]}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary border-b border-bliv-border pb-1">
            Contact & Address
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="patient@example.com"
            />
            <Input
              label="Phone Number"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+44 7700 900142"
            />
          </div>
          <Input
            label="Residential Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Street address, city, postcode"
          />
        </div>

        {/* Emergency Contact */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary border-b border-bliv-border pb-1">
            Emergency Contact
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Contact Name"
              value={emergencyName}
              onChange={e => setEmergencyName(e.target.value)}
              placeholder="e.g. Thomas Bennett"
            />
            <Input
              label="Contact Phone"
              value={emergencyPhone}
              onChange={e => setEmergencyPhone(e.target.value)}
              placeholder="+44 7700 900891"
            />
            <Input
              label="Relationship"
              value={emergencyRel}
              onChange={e => setEmergencyRel(e.target.value)}
              placeholder="e.g. Spouse / Parent"
            />
          </div>
        </div>

        {/* Clinical Overview */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary border-b border-bliv-border pb-1">
            Clinical Summary & Status
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Primary Condition"
              value={primaryCondition}
              onChange={e => setPrimaryCondition(e.target.value)}
              placeholder="e.g. Mild Hypertension"
            />
            <Input
              label="Allergies (comma separated)"
              value={allergies}
              onChange={e => setAllergies(e.target.value)}
              placeholder="e.g. Penicillin, Sulfa drugs"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Registry Status"
              value={status}
              onChange={e => setStatus(e.target.value as PatientStatus)}
              options={[
                { value: 'Active', label: 'Active Care' },
                { value: 'Archived', label: 'Archived' },
              ]}
            />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary mb-1.5">
                Clinical Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Brief operational notes..."
                className="w-full bg-bliv-surface border border-bliv-border rounded-bliv text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-bliv-green/30"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-bliv-border">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {patientToEdit ? 'Save Changes' : 'Save Patient'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
