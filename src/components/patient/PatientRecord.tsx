import { useState } from 'react';
import { ArrowLeft, ShieldCheck as Shield, User, FileText, Calendar, CreditCard, Settings as SettingsIcon, Lock, Eye, Save, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { ClaimInitiationModal } from '../claims/ClaimInitiationModal';
import { PatientEditModal, type PatientData } from '../member/PatientEditModal';
import { PatientStatusBadge } from '../shared/PatientStatusBadge';
import { toast } from 'sonner';
import type { UserRole } from '../../App';

interface PatientRecordProps {
  patient: PatientData;
  userRole: UserRole;
  onBack: () => void;
  onUpdatePatient?: (updatedPatient: PatientData) => void;
}

interface DoctorNote {
  id: string;
  date: string;
  author: string;
  type: string;
  content: string;
  visibility: 'patient' | 'members' | 'client';
}

const mockPatient: PatientData = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  name: 'Sarah Johnson',
  dob: '1979-03-15',
  age: 45,
  gender: 'female',
  phone: '(555) 123-4567',
  email: 'sarah.j@email.com',
  address: '123 Main St, Springfield, IL 62701',
  insurance: 'Blue Cross Blue Shield',
  insuranceProvider: 'bluecross',
  policyId: 'BC-12347821',
  insuranceId: '****7821',
  assignedProvider: 'Dr. Smith',
  assignedMember: 'Jane Doe',
  admitted: '2025-11-10',
  status: 'Active',
};

const mockNotes: DoctorNote[] = [
  {
    id: '1',
    date: '2025-11-14',
    author: 'Dr. John Smith',
    type: 'Progress Note',
    content: 'Patient shows significant improvement in blood pressure control. Current medication regimen appears effective. Will continue current treatment plan and schedule follow-up in 2 weeks.',
    visibility: 'members',
  },
  {
    id: '2',
    date: '2025-11-12',
    author: 'Dr. John Smith',
    type: 'Treatment Plan',
    content: 'Initiated treatment for hypertension. Prescribed Lisinopril 10mg daily. Patient educated on lifestyle modifications including diet and exercise. Blood pressure to be monitored weekly.',
    visibility: 'client',
  },
  {
    id: '3',
    date: '2025-11-10',
    author: 'Dr. John Smith',
    type: 'Initial Consultation',
    content: 'New patient presenting with elevated blood pressure. BP reading: 150/95. No previous cardiac history. Ordered EKG and lab work. Will review results and develop treatment plan.',
    visibility: 'members',
  },
];

const mockVisits = [
  { id: '1', date: '2025-11-14', type: 'Follow-up', provider: 'Dr. Smith', notes: 'Progress check' },
  { id: '2', date: '2025-11-12', type: 'Treatment', provider: 'Dr. Smith', notes: 'Medication adjustment' },
  { id: '3', date: '2025-11-10', type: 'Initial Visit', provider: 'Dr. Smith', notes: 'New patient consultation' },
];

export function PatientRecord({ patient, userRole, onBack, onUpdatePatient }: PatientRecordProps) {
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState('progress');
  const [noteVisibility, setNoteVisibility] = useState<'patient' | 'members' | 'client'>('members');
  const [showClaimDialog, setShowClaimDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const canWriteNotes = userRole === 'provider';
  const canEditPatient = userRole === 'member';
  const isClient = userRole === 'client';

  // Use actual patient data instead of mock data
  const patientNotes = patient.notes || [];
  const patientVisits = patient.visits || [];
  const patientDocuments = patient.documents || [];
  const patientPermissions = patient.permissions || [];

  const filteredNotes = patientNotes.filter(note => {
    if (userRole === 'provider' || userRole === 'member') return true;
    if (userRole === 'client') return note.visibility === 'client';
    return false;
  });

  const handleSaveNote = () => {
    if (!newNote.trim()) return;
    
    const note: DoctorNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      author: 'Dr. John Smith', // In real app, this would be the current user
      type: noteType === 'progress' ? 'Progress Note' : noteType === 'treatment' ? 'Treatment Plan' : 'Consultation',
      content: newNote,
      visibility: noteVisibility,
    };

    const updatedPatient = {
      ...patient,
      notes: [...patientNotes, note],
    };

    if (onUpdatePatient) {
      onUpdatePatient(updatedPatient);
    }

    toast.success('Doctor note saved successfully!');
    setNewNote('');
    setNoteType('progress');
    setNoteVisibility('members');
  };

  const handleSubmitClaim = () => {
    console.log('Submitting claim for patient:', patient.id);
    setShowClaimDialog(false);
  };

  const handleUpdatePatient = (updatedPatient: PatientData) => {
    console.log('Updating patient:', updatedPatient);
    if (onUpdatePatient) {
      onUpdatePatient(updatedPatient);
    }
    setShowEditDialog(false);
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
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Shield className="w-3 h-3 mr-1" />
                  PHI
                </Badge>
                <span className="text-slate-600">Patient Record</span>
              </div>
            </div>

            {!isClient && (
              <div className="flex items-center gap-2">
                {userRole === 'provider' && (
                  <Button onClick={() => setShowClaimDialog(true)} className="bg-teal-600 hover:bg-teal-700">
                    Initiate Claim
                  </Button>
                )}
                {canEditPatient && (
                  <Button variant="outline" onClick={() => setShowEditDialog(true)}>
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Edit Patient
                  </Button>
                )}
              </div>
            )}
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
                <CardTitle>{patient.name}</CardTitle>
                <CardDescription>Patient ID: {patient.policyId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Date of Birth</span>
                  <span className="text-slate-900">{patient.dob}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Age</span>
                  <span className="text-slate-900">{patient.age} years</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Gender</span>
                  <span className="text-slate-900">{patient.gender}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Phone</span>
                  <span className="text-slate-900">{patient.phone}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Email</span>
                  <span className="text-slate-900 truncate">{patient.email}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-600">Address</span>
                  <p className="text-slate-900 mt-1">{patient.address}</p>
                </div>
              </CardContent>
            </Card>

            {!isClient && (
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-slate-600">Provider</span>
                    <span className="text-slate-900">{patient.insurance}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-slate-600">Policy ID</span>
                    <code className="text-slate-900">{patient.policyId}</code>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-600">Status</span>
                    <Badge className="bg-green-100 text-green-800 border-green-300">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Care Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="py-2 border-b">
                  <span className="text-slate-600">Primary Provider</span>
                  <p className="text-slate-900 mt-1">{patient.assignedProvider}</p>
                </div>
                {!isClient && patient.assignedMember && (
                  <div className="py-2">
                    <span className="text-slate-600">Assigned Member</span>
                    <div className="mt-2 space-y-1">
                      <p className="text-slate-900">{patient.assignedMember}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Access Restriction Alert for Clients */}
            {isClient && (
              <Alert className="bg-blue-50 border-blue-200">
                <Lock className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-900">
                  You have limited access to this patient record. Only information related to submitted claims is visible.
                </AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="notes">Doctor Notes</TabsTrigger>
                <TabsTrigger value="visits">Past Visits</TabsTrigger>
                {!isClient && <TabsTrigger value="documents">Documents</TabsTrigger>}
                {isClient && <TabsTrigger value="insurance">Insurance Details</TabsTrigger>}
                {!isClient && <TabsTrigger value="permissions">Permissions</TabsTrigger>}
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Overview</CardTitle>
                    <CardDescription>Current status and recent activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-slate-600 mb-1">Admission Date</p>
                        <p className="text-slate-900">{patient.admitted}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-slate-600 mb-1">Status</p>
                        <PatientStatusBadge status={patient.status} />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="text-blue-900 mb-2">Current Treatment</h3>
                      <p className="text-blue-800">Hypertension management with medication and lifestyle modifications. Patient responding well to treatment.</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-slate-900">Recent Activity</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                          <div>
                            <p className="text-slate-900">Follow-up Visit</p>
                            <p className="text-slate-600">November 14, 2025 - Dr. Smith</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                          <div>
                            <p className="text-slate-900">Treatment Plan Updated</p>
                            <p className="text-slate-600">November 12, 2025 - Dr. Smith</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Doctor Notes Tab */}
              <TabsContent value="notes" className="space-y-6">
                {/* Write New Note - Providers Only */}
                {canWriteNotes && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Write Doctor Note</CardTitle>
                      <CardDescription>Add clinical documentation for this patient</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="noteType">Note Type</Label>
                          <Select value={noteType} onValueChange={setNoteType}>
                            <SelectTrigger id="noteType">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="progress">Progress Note</SelectItem>
                              <SelectItem value="treatment">Treatment Plan</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                              <SelectItem value="discharge">Discharge Summary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="visibility">Visibility</Label>
                          <Select value={noteVisibility} onValueChange={(v: any) => setNoteVisibility(v)}>
                            <SelectTrigger id="visibility">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="patient">Patient Only</SelectItem>
                              <SelectItem value="members">Patient & Members</SelectItem>
                              <SelectItem value="client">
                                <div className="flex items-center gap-2">
                                  <Eye className="w-4 h-4" />
                                  Visible to Client (Insurance)
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="noteContent">Note Content</Label>
                        <Textarea
                          id="noteContent"
                          placeholder="Enter clinical notes here..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          rows={6}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Button onClick={handleSaveNote} className="bg-teal-600 hover:bg-teal-700">
                          <Save className="w-4 h-4 mr-2" />
                          Save Note
                        </Button>
                        {noteVisibility === 'client' && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                            <Eye className="w-3 h-3 mr-1" />
                            Insurance will see this note
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Read-Only Alert for Members */}
                {userRole === 'member' && (
                  <Alert className="bg-slate-50 border-slate-200">
                    <Lock className="h-4 w-4 text-slate-600" />
                    <AlertDescription className="text-slate-700">
                      You have read-only access to doctor notes. Only providers can create or edit clinical documentation.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Existing Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Clinical Notes History</CardTitle>
                    <CardDescription>
                      {isClient ? 'Notes marked as visible to insurance' : 'All clinical documentation'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filteredNotes.length === 0 ? (
                      <p className="text-slate-500 text-center py-8">
                        {isClient ? 'No notes available for insurance review' : 'No notes yet'}
                      </p>
                    ) : (
                      filteredNotes.map((note) => (
                        <div key={note.id} className="p-4 border border-slate-200 rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{note.type}</Badge>
                              {note.visibility === 'client' && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Visible to Insurance
                                </Badge>
                              )}
                            </div>
                            <span className="text-slate-500">{note.date}</span>
                          </div>
                          <p className="text-slate-600">By {note.author}</p>
                          <p className="text-slate-900">{note.content}</p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Past Visits Tab */}
              <TabsContent value="visits">
                <Card>
                  <CardHeader>
                    <CardTitle>Visit History</CardTitle>
                    <CardDescription>Past appointments and consultations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {patientVisits.length === 0 ? (
                      <p className="text-slate-500 text-center py-8">No visits recorded yet</p>
                    ) : (
                      patientVisits.map((visit) => (
                        <div key={visit.id} className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{visit.type}</Badge>
                            <span className="text-slate-500">{visit.date}</span>
                          </div>
                          <p className="text-slate-900">{visit.provider}</p>
                          <p className="text-slate-600">{visit.notes}</p>
                          {visit.diagnosis && (
                            <div className="mt-2 pt-2 border-t border-slate-200">
                              <p className="text-slate-600"><strong>Diagnosis:</strong> {visit.diagnosis}</p>
                            </div>
                          )}
                          {visit.procedures && visit.procedures.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {visit.procedures.map((proc, index) => (
                                <Badge key={index} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                                  {proc}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              {!isClient && (
                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle>Patient Documents</CardTitle>
                      <CardDescription>Medical records, lab results, and other files</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {patientDocuments.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                          <FileText className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                          <p>No documents uploaded yet</p>
                          {!isClient && (
                            <Button variant="outline" className="mt-4">
                              <Plus className="w-4 h-4 mr-2" />
                              Upload Document
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {patientDocuments.map((doc) => (
                            <div key={doc.id} className="p-4 bg-slate-50 rounded-lg flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText className="w-8 h-8 text-teal-600" />
                                <div>
                                  <p className="text-slate-900">{doc.name}</p>
                                  <div className="flex items-center gap-2 text-slate-600">
                                    <span>{doc.type}</span>
                                    <span>•</span>
                                    <span>{doc.size}</span>
                                    <span>•</span>
                                    <span>Uploaded by {doc.uploadedBy}</span>
                                  </div>
                                  <p className="text-slate-500">{doc.uploadDate}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </div>
                          ))}
                          {!isClient && (
                            <Button variant="outline" className="w-full mt-4">
                              <Plus className="w-4 h-4 mr-2" />
                              Upload Document
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Insurance Details Tab (Client Only) */}
              {isClient && (
                <TabsContent value="insurance">
                  <Card>
                    <CardHeader>
                      <CardTitle>Insurance & Claims</CardTitle>
                      <CardDescription>Claim-related information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="text-slate-900 mb-3">Active Claims</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-white border rounded">
                            <div>
                              <p className="text-slate-900">CLM-2025-001</p>
                              <p className="text-slate-600">Cardiac Consultation</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-300">Under Review</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Permissions Tab */}
              {!isClient && (
                <TabsContent value="permissions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Access & Sharing</CardTitle>
                      <CardDescription>Control who can view patient information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-blue-900 mb-2">Current Visibility</h3>
                        <ul className="text-blue-800 space-y-1">
                          <li>✓ Assigned Provider: Full Access</li>
                          <li>✓ Assigned Members: Full Access</li>
                          <li>✓ Insurance ({patient.insurance}): Claim-related only</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>

      {/* Claim Initiation Modal */}
      <ClaimInitiationModal
        open={showClaimDialog}
        onClose={() => setShowClaimDialog(false)}
        patientName={patient.name}
        insuranceProvider={patient.insurance}
        memberId={patient.policyId}
        onInitiate={handleSubmitClaim}
      />

      {/* Patient Edit Modal */}
      <PatientEditModal
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        patient={patient}
        onSave={handleUpdatePatient}
      />
    </div>
  );
}