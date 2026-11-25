# BLIV — Clinician-First Telehealth Clinic Management Platform

> **"Clinical care, thoughtfully organised."**  
> *Your patients, appointments, and clinical records. All in one calm, connected workspace.*

BLIV is an executive-grade, clinician-first telehealth clinic management application designed for modern outpatient care practices, independent specialists, and telehealth clinics. Built with a bespoke design system inspired by calm European healthcare aesthetics, BLIV provides a unified workspace with zero administrative friction.

---

## 🌟 Key Product Capabilities

1. **Brand Experience & Marketing Launch Page (`/`)**
   - High-fidelity editorial design with bespoke typography (Manrope & Inter).
   - Atmospheric ambient daylight visual background.
   - Live miniature interactive dashboard preview with interactive tabs.
   - Trust strip, 4 detailed feature cards with interactive UI previews.
   - Interactive 4-tab product showcase (Overview, Patients, Calendar, Records).
   - 4-step clinical workflow timeline and healthcare governance positioning.

2. **Clinician Authentication Flow (`/login`)**
   - Editorial split-screen design.
   - One-click instant demo entry as **Dr. Amelia Carter** (Lead General Practitioner).
   - Work email, password visibility toggling, and input validation.

3. **Overview Dashboard (`/app`)**
   - Clinician morning briefing with dynamic date display.
   - Real-time clinical statistics: Total Patients, Appointments Today, Upcoming Consultations, and Audited Clinical Records.
   - Today's appointment agenda with quick status updates and direct patient linking.
   - Interactive Recharts visualization breaking down consultations by appointment type.
   - Chronological recent activity stream with immediate trace drawer.

4. **Patient Management Module (`/app/patients`)**
   - Comprehensive directory of realistic fictional patient profiles.
   - Live multi-field search (Name, Patient ID, Email, Phone).
   - Status filtering (All, Active, Archived) and multi-direction sorting (A-Z, Z-A, Recently added).
   - Modal for registering new patients with auto-generated identifiers (`BLV-XXXX`).
   - Patient archive/deletion confirmation safety modal.

5. **Detailed Patient Profile (`/app/patients/:id`)**
   - Deep clinical record view with 4 functional tabs:
     - **Overview**: Personal data, contact info, emergency contacts, clinical condition summary, and patient audit history.
     - **Medical Records**: Chronological consultation notes, clinical impressions, treatment plans, and attached files.
     - **Appointments**: Full visit history and scheduled upcoming telehealth sessions.
     - **Documents**: Simulated document repository with client-side file upload support (`.pdf`, `.png`, `.docx`) and file removal.

6. **Medical Records & Consultation Notes (`/app/records`)**
   - Centralized clinical repository categorized by record type (Consultation note, Assessment, Follow-up, Referral).
   - SOAP documentation engine (Subjective observations, Objective findings, Assessment, Plan, Follow-up directives).
   - Interactive Record Detail slide-out drawer with clinician attribution and document downloads.

7. **Multi-View Appointment Calendar (`/app/calendar`)**
   - 4 synchronized calendar viewports:
     - **Month View**: Monthly grid with colored appointment pills and date drill-down.
     - **Week View**: 7-day hourly grid (08:00 to 18:00) with conflict-aware time-block layout.
     - **Day View**: Focused single-day schedule with hourly breakdown and direct slot booking.
     - **Agenda View**: Chronological upcoming appointment agenda grouped by day.
   - Strict booking validations preventing double-booking overlaps for clinicians.
   - Instant status transitions (Scheduled, Confirmed, Completed, Cancelled).

8. **User-Attributed Audit Trail (`/app/audit`)**
   - Systematic event logging tracking all mutations across patients, appointments, records, and document attachments.
   - Audit Detail Drawer with state transition before/after diff payloads.
   - Filtering by clinician, action type, and search keywords.

9. **Workspace Configuration & FHIR Architecture (`/app/settings`)**
   - Editable clinician profile and practice preferences persisted in LocalStorage.
   - Documented **HL7 FHIR R4 Mapping Reference** translating BLIV models to standard FHIR resources:
     - `Patient` → `FHIR Patient`
     - `Appointment` → `FHIR Appointment`
     - `ClinicalRecord` → `FHIR Composition / DocumentReference`
     - `Clinician` → `FHIR Practitioner`
     - `AuditEvent` → `FHIR AuditEvent`

10. **Global Search & Productivity Controls**
    - Universal search shortcut (`⌘K` or `Ctrl+K`) with instant cross-resource results.
    - Global quick-action dropdown menu for rapid creation.
    - Floating toast notification dispatching system.
    - One-click demo data reset button.

---

## 🎨 Color Palette & Visual Identity

| Token | Hex Value | Role |
| :--- | :--- | :--- |
| **Primary Background** | `#F7F8F5` | Calming warm ivory canvas |
| **Main Surface** | `#FFFFFF` | Primary card and workspace surface |
| **Secondary Surface** | `#F0F3EE` | Soft secondary tonal surfaces |
| **Primary Dark** | `#26372F` | Deep forest green for key headings and brand anchors |
| **Primary Green** | `#668775` | Sage action accent and brand highlights |
| **Soft Sage** | `#DDE8DF` | Active navigation pill and subtle backgrounds |
| **Muted Green** | `#A8B9AA` | Subtle decorative elements |
| **Warm Neutral** | `#EDEAE3` | Ambient highlight textures |
| **Text Primary** | `#27332D` | High-contrast readable charcoal |
| **Text Secondary** | `#78847C` | Soft secondary body and meta information |
| **Borders** | `#E7EBE5` | Ultra-clean hairline borders |

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Tooling**: Vite 6
- **Styling**: Tailwind CSS with custom healthcare palette and typography
- **Typography**: Manrope (interface headings), Inter (body copy), DM Serif Display (editorial accents)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Visualizations**: Recharts
- **Date Handling**: date-fns
- **Routing**: React Router DOM v6
- **Persistence**: LocalStorage with built-in seed defaults and reset utility

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone or navigate into the project directory
cd "c:/Users/nn/project 230"

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be live at `http://localhost:5173`.

### Production Build

```bash
# Type-check and compile optimized static assets
npm run build

# Preview production build locally
npm run preview
```

The compiled assets will be located in the `dist/` directory.

---

## 🐳 Docker Deployment

A production-ready `Dockerfile` and `nginx.conf` are included with single-page application (SPA) routing support:

```bash
# Build Docker image
docker build -t bliv-telehealth:latest .

# Run container on port 8080
docker run -d -p 8080:80 --name bliv-app bliv-telehealth:latest
```

Open `http://localhost:8080` in your browser.

---

## ☁️ Static Hosting Deployment (Netlify, Vercel, Cloudflare Pages)

The repository includes `public/_redirects` and `netlify.toml` preconfigured for client-side single-page application routing:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Catch-All Rewrite**: `/* /index.html 200`

---

## 🔒 Security & Healthcare Compliance Note

This repository is a frontend sales demonstration and interactive product prototype. Sample patient data is purely fictional and persisted exclusively in the local browser's `LocalStorage`. No real Protected Health Information (PHI) is processed or transmitted.

For commercial production deployment, the architecture should be extended to include:
- Backend FHIR R4 server with PostgreSQL / CockroachDB backing.
- OAuth 2.0 / OpenID Connect clinician SSO with mandatory MFA.
- End-to-end TLS 1.3 transit encryption and AES-256 encrypted storage volumes.
- Immutable append-only audit logging stored in compliant WORM storage.
- Business Associate Agreements (BAAs) and HIPAA/GDPR operational controls.

---

## 📄 License & Credits

Designed and developed as a bespoke, sales-quality clinician-first telehealth management demonstration.  
© 2026 BLIV. All rights reserved.
