import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { GlobalSearchModal } from '../ui/GlobalSearchModal';
import { PatientFormModal } from '../patients/PatientFormModal';
import { AppointmentModal } from '../calendar/AppointmentModal';
import { RecordFormModal } from '../records/RecordFormModal';
import { useApp } from '../../context/AppContext';

export const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    isAddPatientModalOpen, 
    setIsAddPatientModalOpen,
    isAddAppointmentModalOpen,
    setIsAddAppointmentModalOpen,
    isAddRecordModalOpen,
    setIsAddRecordModalOpen
  } = useApp();

  return (
    <div className="min-h-screen flex bg-bliv-bg text-bliv-text-primary antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        <AppSidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#26372F]/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-bliv-surface">
            <AppSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="md:pl-64 flex flex-col flex-1 min-w-0">
        <AppHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal />

      <PatientFormModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
      />

      <AppointmentModal
        isOpen={isAddAppointmentModalOpen}
        onClose={() => setIsAddAppointmentModalOpen(false)}
      />

      <RecordFormModal
        isOpen={isAddRecordModalOpen}
        onClose={() => setIsAddRecordModalOpen(false)}
      />
    </div>
  );
};
