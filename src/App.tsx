import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/auth/Login';
import { RegistrationChoice } from './components/registration/RegistrationChoice';
import { ProviderTypeSelection } from './components/registration/ProviderTypeSelection';
import { DelegateRegistration } from './components/registration/DelegateRegistration';
import { ProviderRegistration } from './components/registration/ProviderRegistration';
import { ProviderDashboard } from './components/dashboards/ProviderDashboard';
import { StateAgentDashboard } from './components/dashboards/StateAgentDashboard';
import { PatientRecord } from './components/patient/PatientRecord';
import { ProviderPatientProfile } from './components/provider/ProviderPatientProfile';
import { ClaimDetailPage } from './components/insurance/ClaimDetailPage';
import { ClaimHistoryPage } from './components/insurance/ClaimHistoryPage';
import { WorkflowGuidePage } from './components/WorkflowGuidePage';
import { SessionTimeoutModal } from './components/auth/SessionTimeoutModal';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import type { PatientData } from './components/member/PatientEditModal';

export type UserRole = 'provider' | 'state-agent' | null;

export interface User {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  caqhConnected?: boolean;
  organization?: string;
}

export interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  npi: string;
  specialty: string;
  licenseNumber: string;
  caqhConnected: boolean;
}

export interface Claim {
  id: string;
  patientId: string;
  patientName: string;
  provider: string;
  status: 'Draft' | 'Awaiting Member Review' | 'In Progress' | 'Submitted to Insurance' | 'Approved' | 'Denied';
  dateCreated: string;
  amount?: number;
  diagnosisCode?: string;
  procedureCode?: string;
  insurance?: string;
  insuranceId?: string;
}

type View = 'landing' | 'login' | 'registration-choice' | 'provider-type-selection' | 'delegate-register' | 'provider-register' | 'dashboard' | 'patient-record' | 'provider-patient-profile' | 'claim-detail' | 'claim-history' | 'workflow-guide';

const initialPatients: PatientData[] = [
  { 
    id: '1', 
    firstName: 'Sarah',
    lastName: 'Johnson',
    name: 'Sarah Johnson', 
    age: 45, 
    dob: '1979-03-15',
    gender: 'female',
    phone: '(555) 123-4567',
    email: 'sarah.j@email.com',
    address: '123 Main St, Springfield, IL 62701',
    insurance: 'BlueCross', 
    insuranceId: '****7821',
    policyId: 'BC12347821',
    insuranceProvider: 'bluecross',
    insuranceType: 'ppo',
    assignedProvider: 'Dr. Smith', 
    assignedMember: 'Jane Doe',
    status: 'Active', 
    admitted: '2025-11-10',
    emergencyName: 'John Johnson',
    emergencyPhone: '(555) 123-9999',
    lastSeenDate: '2025-11-14',
    followUpRequired: true,
    followUpDate: '2025-11-21',
    followUpReason: 'Blood pressure monitoring',
    notes: [
      {
        id: 'note-1',
        date: '2025-11-14',
        author: 'Dr. John Smith',
        type: 'Progress Note',
        content: 'Patient shows significant improvement in blood pressure control. Current medication regimen appears effective. Will continue current treatment plan and schedule follow-up in 2 weeks.',
        visibility: 'members',
      },
      {
        id: 'note-2',
        date: '2025-11-12',
        author: 'Dr. John Smith',
        type: 'Treatment Plan',
        content: 'Initiated treatment for hypertension. Prescribed Lisinopril 10mg daily. Patient educated on lifestyle modifications including diet and exercise. Blood pressure to be monitored weekly.',
        visibility: 'client',
      },
      {
        id: 'note-3',
        date: '2025-11-10',
        author: 'Dr. John Smith',
        type: 'Initial Consultation',
        content: 'New patient presenting with elevated blood pressure. BP reading: 150/95. No previous cardiac history. Ordered EKG and lab work. Will review results and develop treatment plan.',
        visibility: 'members',
      },
    ],
    visits: [
      { id: 'visit-1', date: '2025-11-14', type: 'Follow-up', provider: 'Dr. Smith', notes: 'Progress check', diagnosis: 'Hypertension', procedures: ['Blood Pressure Check', 'Medication Review'] },
      { id: 'visit-2', date: '2025-11-12', type: 'Treatment', provider: 'Dr. Smith', notes: 'Medication adjustment', diagnosis: 'Hypertension', procedures: ['Prescription Update'] },
      { id: 'visit-3', date: '2025-11-10', type: 'Initial Visit', provider: 'Dr. Smith', notes: 'New patient consultation', diagnosis: 'Hypertension - Initial Diagnosis', procedures: ['EKG', 'Blood Work'] },
    ],
    documents: [
      { id: 'doc-1', name: 'EKG Results.pdf', type: 'Lab Result', uploadDate: '2025-11-10', uploadedBy: 'Dr. Smith', size: '245 KB' },
      { id: 'doc-2', name: 'Blood Test Report.pdf', type: 'Lab Result', uploadDate: '2025-11-10', uploadedBy: 'Lab Tech', size: '312 KB' },
      { id: 'doc-3', name: 'Treatment Plan.pdf', type: 'Treatment Plan', uploadDate: '2025-11-12', uploadedBy: 'Dr. Smith', size: '180 KB' },
    ],
    permissions: [
      { id: 'perm-1', role: 'Provider', canView: true, canEdit: true, canDelete: false },
      { id: 'perm-2', role: 'Member', canView: true, canEdit: true, canDelete: false },
      { id: 'perm-3', role: 'Client', canView: true, canEdit: false, canDelete: false },
    ],
  },
  { 
    id: '2', 
    firstName: 'Michael',
    lastName: 'Chen',
    name: 'Michael Chen', 
    age: 62, 
    dob: '1962-07-22',
    gender: 'male',
    phone: '(555) 234-5678',
    email: 'michael.c@email.com',
    address: '456 Oak Ave, Springfield, IL 62702',
    insurance: 'Aetna', 
    insuranceId: '****3456',
    policyId: 'AET3456',
    insuranceProvider: 'aetna',
    insuranceType: 'hmo',
    assignedProvider: 'Dr. Smith',
    assignedMember: 'Tom Wilson',
    status: 'Active', 
    admitted: '2025-11-12',
    lastSeenDate: '2025-11-15',
    followUpRequired: false,
    notes: [
      {
        id: 'note-4',
        date: '2025-11-15',
        author: 'Dr. John Smith',
        type: 'Progress Note',
        content: 'Blood glucose levels showing improvement. Patient compliant with medication. Continue current diabetes management protocol.',
        visibility: 'members',
      },
    ],
    visits: [
      { id: 'visit-4', date: '2025-11-15', type: 'Follow-up', provider: 'Dr. Smith', notes: 'Diabetes management', diagnosis: 'Type 2 Diabetes', procedures: ['Glucose Test', 'A1C Test'] },
      { id: 'visit-5', date: '2025-11-12', type: 'Initial Visit', provider: 'Dr. Smith', notes: 'New diabetes patient', diagnosis: 'Type 2 Diabetes - Initial Diagnosis', procedures: ['Full Blood Panel', 'Glucose Monitoring Setup'] },
    ],
    documents: [
      { id: 'doc-4', name: 'Glucose Test Results.pdf', type: 'Lab Result', uploadDate: '2025-11-15', uploadedBy: 'Dr. Smith', size: '198 KB' },
      { id: 'doc-5', name: 'Diabetes Management Plan.pdf', type: 'Treatment Plan', uploadDate: '2025-11-12', uploadedBy: 'Dr. Smith', size: '225 KB' },
    ],
    permissions: [
      { id: 'perm-4', role: 'Provider', canView: true, canEdit: true, canDelete: false },
      { id: 'perm-5', role: 'Member', canView: true, canEdit: true, canDelete: false },
      { id: 'perm-6', role: 'Client', canView: true, canEdit: false, canDelete: false },
    ],
  },
  { 
    id: '3', 
    firstName: 'Emily',
    lastName: 'Davis',
    name: 'Emily Davis', 
    age: 28, 
    dob: '1996-12-05',
    gender: 'female',
    phone: '(555) 345-6789',
    email: 'emily.d@email.com',
    address: '789 Pine Rd, Springfield, IL 62703',
    insurance: 'UnitedHealth', 
    insuranceId: '****9012',
    policyId: 'UHC9012',
    insuranceProvider: 'united',
    insuranceType: 'epo',
    assignedProvider: 'Dr. Johnson',
    assignedMember: 'Sarah Martinez',
    status: 'Pending', 
    admitted: '2025-11-14',
    followUpRequired: false,
    notes: [],
    visits: [],
    documents: [],
    permissions: [
      { id: 'perm-7', role: 'Provider', canView: true, canEdit: true, canDelete: false },
      { id: 'perm-8', role: 'Member', canView: true, canEdit: true, canDelete: false },
      { id: 'perm-9', role: 'Client', canView: true, canEdit: false, canDelete: false },
    ],
  },
  { 
    id: '4', 
    firstName: 'Robert',
    lastName: 'Wilson',
    name: 'Robert Wilson', 
    age: 55, 
    dob: '1969-09-18',
    gender: 'male',
    phone: '(555) 456-7890',
    email: 'robert.w@email.com',
    address: '321 Elm St, Springfield, IL 62704',
    insurance: 'Cigna', 
    insuranceId: '****6543',
    policyId: 'CIG6543',
    insuranceProvider: 'cigna',
    insuranceType: 'pos',
    assignedProvider: 'Dr. Smith',
    assignedMember: 'Mike Johnson',
    status: 'Active', 
    admitted: '2025-11-13',
    lastSeenDate: '2025-11-16',
    followUpRequired: true,
    followUpDate: '2025-11-23',
    followUpReason: 'Post-surgical recovery check',
    notes: [
      {
        id: 'note-5',
        date: '2025-11-16',
        author: 'Dr. John Smith',
        type: 'Progress Note',
        content: 'Post-surgical recovery progressing well. Incision healing normally. Pain management adequate. Patient cleared for light activities.',
        visibility: 'members',
      },
    ],
    visits: [
      { id: 'visit-6', date: '2025-11-16', type: 'Follow-up', provider: 'Dr. Smith', notes: 'Post-op check', diagnosis: 'Post-Surgical Recovery', procedures: ['Wound Check', 'Pain Assessment'] },
      { id: 'visit-7', date: '2025-11-13', type: 'Surgery', provider: 'Dr. Smith', notes: 'Laparoscopic procedure', diagnosis: 'Gallstones', procedures: ['Cholecystectomy'] },
    ],
    documents: [
      { id: 'doc-6', name: 'Surgery Report.pdf', type: 'Procedure Report', uploadDate: '2025-11-13', uploadedBy: 'Dr. Smith', size: '445 KB' },
      { id: 'doc-7', name: 'Post-Op Instructions.pdf', type: 'Care Plan', uploadDate: '2025-11-13', uploadedBy: 'Dr. Smith', size: '156 KB' },
    ],
    permissions: [
      { id: 'perm-10', role: 'Provider', canView: true, canEdit: true, canDelete: false },
      { id: 'perm-11', role: 'Member', canView: true, canEdit: true, canDelete: false },
      { id: 'perm-12', role: 'Client', canView: true, canEdit: false, canDelete: false },
    ],
  },
];

const initialProviders: Provider[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    name: 'Dr. John Smith',
    email: 'john.smith@hospital.com',
    npi: '1234567890',
    specialty: 'Cardiologist',
    licenseNumber: 'MD12345',
    caqhConnected: true,
  },
  {
    id: '2',
    firstName: 'Emily',
    lastName: 'Johnson',
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@hospital.com',
    npi: '0987654321',
    specialty: 'General Practice',
    licenseNumber: 'MD67890',
    caqhConnected: true,
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Williams',
    name: 'Dr. Michael Williams',
    email: 'michael.williams@hospital.com',
    npi: '1122334455',
    specialty: 'Surgery',
    licenseNumber: 'MD11223',
    caqhConnected: true,
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Brown',
    name: 'Dr. Sarah Brown',
    email: 'sarah.brown@hospital.com',
    npi: '5544332211',
    specialty: 'Pediatrics',
    licenseNumber: 'MD55443',
    caqhConnected: true,
  },
];

const initialClaims: Claim[] = [
  {
    id: 'CLM-2025-001',
    patientId: '1',
    patientName: 'Sarah Johnson',
    provider: 'Dr. John Smith',
    status: 'Awaiting Member Review',
    dateCreated: '2025-11-15',
    amount: 2500,
    diagnosisCode: 'I21.9',
    procedureCode: '99285',
    insurance: 'BlueCross',
    insuranceId: '****7821',
  },
  {
    id: 'CLM-2025-002',
    patientId: '2',
    patientName: 'Michael Chen',
    provider: 'Dr. John Smith',
    status: 'Awaiting Member Review',
    dateCreated: '2025-11-16',
    amount: 1800,
    diagnosisCode: 'E11.9',
    procedureCode: '99284',
    insurance: 'Aetna',
    insuranceId: '****3456',
  },
  {
    id: 'CLM-2025-003',
    patientId: '4',
    patientName: 'Robert Wilson',
    provider: 'Dr. John Smith',
    status: 'In Progress',
    dateCreated: '2025-11-14',
    amount: 3200,
    diagnosisCode: 'J18.9',
    procedureCode: '99291',
    insurance: 'Cigna',
    insuranceId: '****6543',
  },
  {
    id: 'CLM-2025-004',
    patientId: '1',
    patientName: 'Sarah Johnson',
    provider: 'Dr. John Smith',
    status: 'Awaiting Member Review',
    dateCreated: '2025-11-17',
    amount: 950,
    diagnosisCode: 'M79.3',
    procedureCode: '99213',
    insurance: 'BlueCross',
    insuranceId: '****7821',
  },
  {
    id: 'CLM-2025-005',
    patientId: '2',
    patientName: 'Michael Chen',
    provider: 'Dr. Emily Johnson',
    status: 'In Progress',
    dateCreated: '2025-11-13',
    amount: 4100,
    diagnosisCode: 'I50.9',
    procedureCode: '99223',
    insurance: 'Aetna',
    insuranceId: '****3456',
  },
  {
    id: 'CLM-2025-006',
    patientId: '4',
    patientName: 'Robert Wilson',
    provider: 'Dr. Michael Williams',
    status: 'Submitted to Insurance',
    dateCreated: '2025-11-10',
    amount: 5600,
    diagnosisCode: 'K80.20',
    procedureCode: '47562',
    insurance: 'Cigna',
    insuranceId: '****6543',
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);
  const [patients, setPatients] = useState<PatientData[]>(initialPatients);
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const [claims, setClaims] = useState<Claim[]>(initialClaims);
  const [portalType, setPortalType] = useState<'provider' | 'state-agent'>('provider');

  const handleLogin = (role: UserRole, email: string) => {
    // Mock user data based on role
    const mockUser: User = {
      id: '1',
      role,
      firstName: 'John',
      lastName: 'Doe',
      email,
      caqhConnected: role === 'provider' ? true : undefined,
      organization: role === 'state-agent' ? 'Blue Cross Insurance' : undefined,
    };
    setCurrentUser(mockUser);
    setCurrentView('dashboard');
  };

  const handleRegistrationComplete = (role: UserRole) => {
    setCurrentView('login');
  };

  const handleProviderRegistration = (providerData: Provider) => {
    setProviders((prevProviders) => [...prevProviders, providerData]);
    setCurrentView('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleViewPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentView('patient-record');
  };

  const handleBackToDashboard = () => {
    setSelectedPatientId(null);
    setCurrentView('dashboard');
  };

  const handleViewProviderPatientProfile = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentView('provider-patient-profile');
  };

  const handleViewClaimDetail = (claimId: string) => {
    setSelectedClaimId(claimId);
    setCurrentView('claim-detail');
  };

  const handleViewClaimHistory = () => {
    setCurrentView('claim-history');
  };

  const handleSubmitToInsurance = (claimId: string, finalData: any) => {
    console.log('Submitting claim to insurance:', claimId, finalData);
    // Update claim status to "Submitted to Insurance" and add billing data
    setClaims((prevClaims) =>
      prevClaims.map((claim) =>
        claim.id === claimId
          ? {
              ...claim,
              status: 'Submitted to Insurance',
              amount: finalData.billAmount,
              authorizationNumber: finalData.authorizationNumber,
              coverageType: finalData.coverageType,
              billingNotes: finalData.billingNotes,
              submittedDate: finalData.submittedDate,
            }
          : claim
      )
    );
    toast.success('Claim successfully submitted to insurance!');
    setCurrentView('dashboard');
  };

  const handleUpdatePatient = (updatedPatient: PatientData) => {
    setPatients((prevPatients) =>
      prevPatients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
  };

  const handleAddPatient = (newPatient: PatientData) => {
    setPatients((prevPatients) => [...prevPatients, newPatient]);
  };

  const selectedPatient = selectedPatientId ? patients.find(p => p.id === selectedPatientId) : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {currentView === 'landing' && (
        <LandingPage 
          onNavigateToProviderAuth={() => {
            setPortalType('provider');
            setCurrentView('login');
          }}
          onNavigateToStateAgentAuth={() => {
            setPortalType('state-agent');
            setCurrentView('login');
          }}
          onNavigateToWorkflowGuide={() => {
            setCurrentView('workflow-guide');
          }}
        />
      )}

      {currentView === 'login' && (
        <Login 
          onLogin={handleLogin}
          onNavigateToRegister={(role) => {
            if (role === 'provider') {
              setCurrentView('registration-choice');
            }
          }}
          onBack={() => setCurrentView('landing')}
          portalType={portalType}
        />
      )}

      {currentView === 'registration-choice' && (
        <RegistrationChoice 
          onSelectOwner={() => setCurrentView('provider-type-selection')}
          onSelectDelegate={() => setCurrentView('delegate-register')}
          onBack={() => setCurrentView('login')}
        />
      )}

      {currentView === 'provider-type-selection' && (
        <ProviderTypeSelection 
          onSelectIndividual={(type) => setCurrentView('provider-register')}
          onSelectOrganization={(type) => setCurrentView('provider-register')}
          onCancel={() => setCurrentView('registration-choice')}
        />
      )}

      {currentView === 'delegate-register' && (
        <DelegateRegistration 
          onComplete={() => setCurrentView('login')}
          onBack={() => setCurrentView('registration-choice')}
        />
      )}

      {currentView === 'provider-register' && (
        <ProviderRegistration 
          onComplete={handleProviderRegistration}
          onCancel={() => setCurrentView('login')}
        />
      )}

      {currentView === 'dashboard' && currentUser?.role === 'provider' && (
        <ProviderDashboard 
          user={currentUser}
          onLogout={handleLogout}
          onViewPatient={handleViewPatient}
          onViewProviderPatientProfile={handleViewProviderPatientProfile}
          onViewClaimHistory={handleViewClaimHistory}
          patients={patients}
          claims={claims}
        />
      )}

      {currentView === 'dashboard' && currentUser?.role === 'state-agent' && (
        <StateAgentDashboard 
          user={currentUser}
          onLogout={handleLogout}
          claims={claims}
          patients={patients}
        />
      )}

      {currentView === 'patient-record' && currentUser && selectedPatientId && selectedPatient && (
        <PatientRecord 
          patient={selectedPatient}
          userRole={currentUser.role!}
          onBack={handleBackToDashboard}
          onUpdatePatient={handleUpdatePatient}
        />
      )}

      {currentView === 'provider-patient-profile' && currentUser && selectedPatientId && (
        <ProviderPatientProfile 
          patientId={selectedPatientId}
          userRole={currentUser.role!}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'claim-detail' && currentUser && selectedClaimId && (
        <ClaimDetailPage 
          claimId={selectedClaimId}
          userRole={currentUser.role!}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'claim-history' && currentUser && (
        <ClaimHistoryPage 
          userRole={currentUser.role!}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'workflow-guide' && (
        <WorkflowGuidePage 
          onNavigateBack={() => setCurrentView('landing')}
        />
      )}

      {showSessionTimeout && (
        <SessionTimeoutModal 
          onExtend={() => setShowSessionTimeout(false)}
          onLogout={handleLogout}
        />
      )}

      <Toaster />
    </div>
  );
}