import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Calendar, FileText, Edit2, Archive, ArrowRight } from 'lucide-react';
import { Patient } from '../../types';
import { Badge } from '../ui/Badge';

interface PatientTableProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);

  return (
    <div className="bg-bliv-surface rounded-bliv-lg border border-bliv-border shadow-subtle overflow-hidden">
      {/* Desktop & Tablet Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-bliv-surface-secondary/70 border-b border-bliv-border text-bliv-text-secondary uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-5 py-3">Patient</th>
              <th className="px-5 py-3">Patient ID</th>
              <th className="px-5 py-3 hidden md:table-cell">Contact</th>
              <th className="px-5 py-3 hidden lg:table-cell">Condition</th>
              <th className="px-5 py-3 hidden sm:table-cell">Date Added</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bliv-border/60">
            {patients.map(patient => (
              <tr
                key={patient.id}
                onClick={() => navigate(`/app/patients/${patient.id}`)}
                className="hover:bg-bliv-bg/70 transition-colors cursor-pointer group"
              >
                {/* Patient Name & Avatar */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-bliv-sage/60 text-bliv-dark flex items-center justify-center font-bold text-xs uppercase shrink-0">
                      {patient.firstName[0]}{patient.lastName[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-bliv-dark group-hover:text-bliv-green flex items-center gap-1.5 transition-colors">
                        <span>{patient.firstName} {patient.lastName}</span>
                        <ArrowRight className="w-3 h-3 text-bliv-green opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] text-bliv-text-secondary block">
                        {patient.gender} • {patient.bloodType || 'A+'}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Patient ID */}
                <td className="px-5 py-3.5 font-mono text-xs font-semibold text-bliv-text-primary">
                  {patient.patientNumber}
                </td>

                {/* Contact (hidden on small) */}
                <td className="px-5 py-3.5 hidden md:table-cell text-bliv-text-secondary">
                  <div className="text-bliv-text-primary font-medium">{patient.email}</div>
                  <div className="text-[11px] text-bliv-text-secondary">{patient.phone}</div>
                </td>

                {/* Primary Condition */}
                <td className="px-5 py-3.5 hidden lg:table-cell text-bliv-text-primary">
                  <span className="truncate block max-w-xs" title={patient.primaryCondition}>
                    {patient.primaryCondition || 'Routine checkup'}
                  </span>
                </td>

                {/* Date Added */}
                <td className="px-5 py-3.5 hidden sm:table-cell text-bliv-text-secondary font-mono text-[11px]">
                  {new Date(patient.createdAt).toLocaleDateString('en-GB')}
                </td>

                {/* Status */}
                <td className="px-5 py-3.5">
                  <Badge variant={patient.status === 'Active' ? 'success' : 'default'} dot>
                    {patient.status}
                  </Badge>
                </td>

                {/* Actions Dropdown */}
                <td className="px-5 py-3.5 text-right relative" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === patient.id ? null : patient.id)}
                    className="p-1 rounded text-bliv-text-secondary hover:text-bliv-dark hover:bg-bliv-surface-secondary transition-colors"
                    aria-label="Actions"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {activeMenuId === patient.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                      <div className="absolute right-5 mt-1 w-44 bg-bliv-surface rounded-bliv border border-bliv-border shadow-float p-1 z-50 text-xs text-left">
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            navigate(`/app/patients/${patient.id}`);
                          }}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-bliv-surface-secondary text-bliv-dark"
                        >
                          <span>View Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onEdit(patient);
                          }}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-bliv-surface-secondary text-bliv-dark"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-bliv-text-secondary" />
                          <span>Edit Patient</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            navigate(`/app/calendar?patientId=${patient.id}`);
                          }}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-bliv-surface-secondary text-bliv-dark"
                        >
                          <Calendar className="w-3.5 h-3.5 text-bliv-text-secondary" />
                          <span>Schedule Visit</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            navigate(`/app/records?patientId=${patient.id}`);
                          }}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-bliv-surface-secondary text-bliv-dark"
                        >
                          <FileText className="w-3.5 h-3.5 text-bliv-text-secondary" />
                          <span>Medical Records</span>
                        </button>
                        <div className="border-t border-bliv-border my-1" />
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onDelete(patient);
                          }}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-[#faecea] text-bliv-error"
                        >
                          <Archive className="w-3.5 h-3.5" />
                          <span>Archive Patient</span>
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
