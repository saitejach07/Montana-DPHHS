import { useState, useEffect } from 'react';
import { ShieldCheck as Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PatientStatusBadge, type PatientStatus } from '../shared/PatientStatusBadge';
import type { Provider } from '../../App';

export interface PatientData {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  age: number;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  insurance: string;
  insuranceId: string;
  policyId: string;
  insuranceProvider: string;
  insuranceType?: string;
  assignedProvider: string;
  assignedMember?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  status: PatientStatus | string;
  admitted?: string;
  admissionReason?: string;
  organization?: string;
  notes?: DoctorNote[];
  visits?: Visit[];
  documents?: Document[];
  permissions?: Permission[];
  followUpRequired?: boolean;
  followUpDate?: string;
  followUpReason?: string;
  lastSeenDate?: string;
}

export interface DoctorNote {
  id: string;
  date: string;
  author: string;
  type: string;
  content: string;
  visibility: 'patient' | 'members' | 'client';
}

export interface Visit {
  id: string;
  date: string;
  type: string;
  provider: string;
  notes: string;
  diagnosis?: string;
  procedures?: string[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  uploadedBy: string;
  size: string;
}

export interface Permission {
  id: string;
  role: string;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

interface PatientEditModalProps {
  open: boolean;
  onClose: () => void;
  patient: PatientData | null;
  onSave: (patient: PatientData) => void;
  providers?: Provider[];
}

export function PatientEditModal({ open, onClose, patient, onSave, providers }: PatientEditModalProps) {
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    insuranceProvider: '',
    insuranceType: '',
    policyId: '',
    assignedProvider: '',
    assignedMember: '',
    admissionDate: '',
    status: 'Active' as PatientStatus | string,
    emergencyName: '',
    emergencyPhone: '',
  });

  useEffect(() => {
    if (patient) {
      // Parse name into first and last name
      const nameParts = patient.name.split(' ');
      const firstName = patient.firstName || nameParts[0] || '';
      const lastName = patient.lastName || nameParts.slice(1).join(' ') || '';

      setEditForm({
        firstName,
        lastName,
        dob: patient.dob || '',
        gender: patient.gender || '',
        phone: patient.phone || '',
        email: patient.email || '',
        address: patient.address || '',
        insuranceProvider: patient.insuranceProvider || mapInsuranceToProvider(patient.insurance),
        insuranceType: patient.insuranceType || '',
        policyId: patient.policyId || patient.insuranceId || '',
        assignedProvider: patient.assignedProvider || '',
        assignedMember: patient.assignedMember || '',
        admissionDate: patient.admitted || '',
        status: patient.status || 'Active',
        emergencyName: patient.emergencyName || '',
        emergencyPhone: patient.emergencyPhone || '',
      });
    }
  }, [patient]);

  const mapInsuranceToProvider = (insurance: string): string => {
    const mapping: Record<string, string> = {
      'BlueCross': 'bluecross',
      'Blue Cross Blue Shield': 'bluecross',
      'Aetna': 'aetna',
      'UnitedHealth': 'united',
      'UnitedHealthcare': 'united',
      'Cigna': 'cigna',
      'Humana': 'humana',
    };
    return mapping[insurance] || '';
  };

  const getInsuranceDisplayName = (value: string): string => {
    const mapping: Record<string, string> = {
      'bluecross': 'BlueCross',
      'aetna': 'Aetna',
      'united': 'UnitedHealth',
      'cigna': 'Cigna',
      'humana': 'Humana',
    };
    return mapping[value] || value;
  };

  const handleSave = () => {
    if (!patient) return;

    const calculateAge = (dob: string) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const updatedPatient: PatientData = {
      ...patient,
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      name: `${editForm.firstName} ${editForm.lastName}`,
      dob: editForm.dob,
      age: calculateAge(editForm.dob),
      gender: editForm.gender,
      phone: editForm.phone,
      email: editForm.email,
      address: editForm.address,
      insuranceProvider: editForm.insuranceProvider,
      insurance: getInsuranceDisplayName(editForm.insuranceProvider),
      insuranceType: editForm.insuranceType,
      policyId: editForm.policyId,
      insuranceId: `****${editForm.policyId.slice(-4)}`,
      assignedProvider: editForm.assignedProvider,
      assignedMember: editForm.assignedMember,
      admitted: editForm.admissionDate,
      status: editForm.status,
      emergencyName: editForm.emergencyName,
      emergencyPhone: editForm.emergencyPhone,
    };

    onSave(updatedPatient);
    onClose();
  };

  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Patient Information</DialogTitle>
          <DialogDescription>
            Update patient details for {patient.name}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 py-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              This form contains Protected Health Information (PHI)
            </p>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-slate-900 border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={editForm.dob}
                  onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={editForm.gender} onValueChange={(v) => setEditForm({ ...editForm, gender: v })}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
              />
            </div>
          </div>

          {/* Insurance Information */}
          <div className="space-y-4">
            <h3 className="text-slate-900 border-b pb-2">Insurance Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider *</Label>
                <Select value={editForm.insuranceProvider} onValueChange={(v) => setEditForm({ ...editForm, insuranceProvider: v })}>
                  <SelectTrigger id="insuranceProvider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bluecross">Blue Cross Blue Shield</SelectItem>
                    <SelectItem value="aetna">Aetna</SelectItem>
                    <SelectItem value="united">UnitedHealthcare</SelectItem>
                    <SelectItem value="cigna">Cigna</SelectItem>
                    <SelectItem value="humana">Humana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyId">Policy/Member ID *</Label>
                <Input
                  id="policyId"
                  value={editForm.policyId}
                  onChange={(e) => setEditForm({ ...editForm, policyId: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="insuranceType">Insurance Type / Coverage</Label>
              <Select value={editForm.insuranceType} onValueChange={(v) => setEditForm({ ...editForm, insuranceType: v })}>
                <SelectTrigger id="insuranceType">
                  <SelectValue placeholder="Select coverage type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ppo">PPO - Preferred Provider Organization</SelectItem>
                  <SelectItem value="hmo">HMO - Health Maintenance Organization</SelectItem>
                  <SelectItem value="epo">EPO - Exclusive Provider Organization</SelectItem>
                  <SelectItem value="pos">POS - Point of Service</SelectItem>
                  <SelectItem value="medicare">Medicare</SelectItem>
                  <SelectItem value="medicaid">Medicaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Provider & Hospital Assignment */}
          <div className="space-y-4">
            <h3 className="text-slate-900 border-b pb-2">Provider & Hospital Assignment</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignedProvider">Assigned Provider *</Label>
                <Select value={editForm.assignedProvider} onValueChange={(v) => setEditForm({ ...editForm, assignedProvider: v })}>
                  <SelectTrigger id="assignedProvider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers?.map(provider => (
                      <SelectItem key={provider.id} value={provider.name}>{provider.name} - {provider.specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignedMember">Assigned Member (Admin Staff)</Label>
                <Select value={editForm.assignedMember} onValueChange={(v) => setEditForm({ ...editForm, assignedMember: v })}>
                  <SelectTrigger id="assignedMember">
                    <SelectValue placeholder="Select admin staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jane Doe">Jane Doe - Ward Clerk</SelectItem>
                    <SelectItem value="Tom Wilson">Tom Wilson - Admin Coordinator</SelectItem>
                    <SelectItem value="Sarah Martinez">Sarah Martinez - Patient Services</SelectItem>
                    <SelectItem value="Mike Johnson">Mike Johnson - Administrative Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admissionDate">Admission Date *</Label>
              <Input
                id="admissionDate"
                type="date"
                value={editForm.admissionDate}
                onChange={(e) => setEditForm({ ...editForm, admissionDate: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Patient Status */}
          <div className="space-y-4">
            <h3 className="text-slate-900 border-b pb-2">Patient Status</h3>
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={editForm.status} onValueChange={(v) => setEditForm({ ...editForm, status: v })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">
                    <div className="flex items-center gap-2">
                      <span>Pending</span>
                      <span className="text-slate-500">- Newly admitted, not yet assigned</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Active">
                    <div className="flex items-center gap-2">
                      <span>Active</span>
                      <span className="text-slate-500">- Currently under treatment</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Completed">
                    <div className="flex items-center gap-2">
                      <span>Completed / Discharged</span>
                      <span className="text-slate-500">- Treatment completed</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Follow-Up">
                    <div className="flex items-center gap-2">
                      <span>Follow-Up / Re-Admitted</span>
                      <span className="text-slate-500">- Patient returned after discharge</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Inactive">
                    <div className="flex items-center gap-2">
                      <span>Inactive</span>
                      <span className="text-slate-500">- No future visits expected</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-2">
                <p className="text-slate-600">Current Status:</p>
                <PatientStatusBadge status={editForm.status} className="mt-1" />
              </div>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}