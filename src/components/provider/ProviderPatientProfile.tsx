import { useState } from 'react';
import { ArrowLeft, User, CreditCard, FileText, Activity, Pill, Receipt, Plus, FileCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { ClaimInitiationModal } from '../claims/ClaimInitiationModal';
import type { UserRole } from '../../App';
import { getClaimStatusColor } from '../../types/claim';

interface ProviderPatientProfileProps {
  patientId: string;
  userRole: UserRole;
  onBack: () => void;
}

const mockPatient = {
  id: '1',
  name: 'Sarah Johnson',
  dob: '1979-03-15',
  age: 45,
  gender: 'Female',
  phone: '(555) 123-4567',
  email: 'sarah.j@email.com',
  address: '123 Main St, Springfield, IL 62701',
  insurance: 'Blue Cross Blue Shield',
  memberId: 'BC-12347821',
  status: 'Active',
};

const mockMedicalHistory = [
  { condition: 'Hypertension', diagnosedDate: '2020-05-12', status: 'Active' },
  { condition: 'Type 2 Diabetes', diagnosedDate: '2019-08-22', status: 'Controlled' },
  { condition: 'Hyperlipidemia', diagnosedDate: '2021-02-15', status: 'Active' },
];

const mockVisitNotes = [
  { id: '1', date: '2025-11-14', type: 'Follow-up', notes: 'Blood pressure improved. Continue current medication.' },
  { id: '2', date: '2025-11-07', type: 'Consultation', notes: 'Patient reports mild side effects. Adjusted dosage.' },
  { id: '3', date: '2025-10-28', type: 'Check-up', notes: 'Routine check. Lab work ordered.' },
];

const mockMedications = [
  { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescribedDate: '2020-05-12' },
  { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedDate: '2019-08-22' },
  { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily (evening)', prescribedDate: '2021-02-15' },
];

const mockClaims = [
  { id: 'CLM-2025-001', date: '2025-11-14', service: 'Follow-up Visit', amount: 250, status: 'Approved' },
  { id: 'CLM-2025-002', date: '2025-11-07', service: 'Consultation', amount: 350, status: 'Pending Review' },
  { id: 'CLM-2025-003', date: '2025-10-28', service: 'Annual Check-up', amount: 400, status: 'Approved' },
];

export function ProviderPatientProfile({ patientId, userRole, onBack }: ProviderPatientProfileProps) {
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleSubmitClaim = (claimData: any) => {
    console.log('Initiating claim for admin review:', claimData);
    // In real app, this would call the API
  };

  const handleAddNote = () => {
    console.log('Adding note:', newNote);
    setNewNote('');
  };

  const getClaimStatusBadge = (status: string) => {
    const color = getClaimStatusColor(status);
    return <Badge className={color}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-slate-300" />
              <h1 className="text-slate-900">Patient Profile</h1>
            </div>
            <Button onClick={() => setShowClaimModal(true)} className="bg-teal-600 hover:bg-teal-700">
              <Receipt className="w-4 h-4 mr-2" />
              Initiate Claim
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Patient Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-teal-600 text-white text-2xl">
                    SJ
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{mockPatient.name}</CardTitle>
                <CardDescription>{mockPatient.age} years old • {mockPatient.gender}</CardDescription>
                <Badge className="mt-2">{mockPatient.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Date of Birth</span>
                  <span className="text-slate-900">{mockPatient.dob}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Phone</span>
                  <span className="text-slate-900">{mockPatient.phone}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Email</span>
                  <span className="text-slate-900 truncate text-sm">{mockPatient.email}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-600">Address</span>
                  <p className="text-slate-900 mt-1">{mockPatient.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Insurance Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Provider</span>
                  <span className="text-slate-900">{mockPatient.insurance}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-600">Member ID</span>
                  <code className="text-slate-900">{mockPatient.memberId}</code>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="history" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="history">
                  <Activity className="w-4 h-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger value="notes">
                  <FileText className="w-4 h-4 mr-2" />
                  Visit Notes
                </TabsTrigger>
                <TabsTrigger value="medications">
                  <Pill className="w-4 h-4 mr-2" />
                  Medications
                </TabsTrigger>
                <TabsTrigger value="claims">
                  <Receipt className="w-4 h-4 mr-2" />
                  Claims
                </TabsTrigger>
              </TabsList>

              {/* Medical History */}
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>Diagnosed conditions and ongoing treatments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockMedicalHistory.map((item, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-slate-900">{item.condition}</h3>
                          <Badge variant={item.status === 'Active' ? 'default' : 'outline'}>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-slate-600">Diagnosed: {item.diagnosedDate}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Visit Notes */}
              <TabsContent value="notes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Visit Note</CardTitle>
                    <CardDescription>Document today's visit</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Enter visit notes, observations, treatment plans..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={4}
                    />
                    <Button onClick={handleAddNote} className="bg-teal-600 hover:bg-teal-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Previous Visit Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockVisitNotes.map((note) => (
                      <div key={note.id} className="p-4 bg-slate-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{note.type}</Badge>
                          <span className="text-slate-500">{note.date}</span>
                        </div>
                        <p className="text-slate-900">{note.notes}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Medications */}
              <TabsContent value="medications">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Medications</CardTitle>
                    <CardDescription>Active prescriptions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockMedications.map((med, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-slate-900">{med.name}</h3>
                            <p className="text-slate-600">{med.dosage} - {med.frequency}</p>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <p className="text-slate-500">Prescribed: {med.prescribedDate}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Claims */}
              <TabsContent value="claims">
                <Card>
                  <CardHeader>
                    <CardTitle>Claims Submitted for This Patient</CardTitle>
                    <CardDescription>Insurance claim history and status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockClaims.map((claim) => (
                      <div key={claim.id} className="p-4 bg-slate-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <code className="text-slate-700">{claim.id}</code>
                            <p className="text-slate-900 mt-1">{claim.service}</p>
                          </div>
                          {getClaimStatusBadge(claim.status)}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Date: {claim.date}</span>
                          <span className="text-slate-900">${claim.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Claim Initiation Modal */}
      <ClaimInitiationModal
        open={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        patientName={mockPatient.name}
        insuranceProvider={mockPatient.insurance}
        memberId={mockPatient.memberId}
        onInitiate={handleSubmitClaim}
      />
    </div>
  );
}