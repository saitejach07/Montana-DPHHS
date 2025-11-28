import { useState } from 'react';
import { ArrowLeft, User, FileText, DollarSign, Calendar, CheckCircle, XCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import type { UserRole } from '../../App';

interface ClaimDetailPageProps {
  claimId: string;
  userRole: UserRole;
  onBack: () => void;
}

const mockClaim = {
  id: 'CLM-2025-001',
  status: 'Under Review',
  patient: {
    name: 'Sarah Johnson',
    age: 45,
    insurance: 'Blue Cross Blue Shield',
    memberId: 'BC-12347821',
  },
  visit: {
    date: '2025-11-12',
    serviceType: 'Outpatient',
    diagnosisCodes: ['I10 (Essential hypertension)', 'E11.9 (Type 2 diabetes without complications)'],
    procedureCodes: ['99213 (Office visit, established patient, level 3)', '80053 (Comprehensive metabolic panel)'],
    clinicalSummary: 'Patient presented for routine follow-up of hypertension and diabetes. Blood pressure 138/86, improved from last visit. Glucose levels stable. Continue current medication regimen. Ordered comprehensive metabolic panel to monitor kidney function and electrolytes. Patient counseled on diet and exercise. Follow-up in 3 months.',
  },
  provider: {
    name: 'Dr. John Smith',
    specialty: 'Cardiologist',
    npi: '1234567890',
  },
  billing: {
    totalAmount: 450.00,
    submittedDate: '2025-11-12',
  },
  history: [
    { date: '2025-11-12', action: 'Claim Submitted', user: 'Dr. John Smith' },
    { date: '2025-11-13', action: 'Claim Received', user: 'System' },
    { date: '2025-11-14', action: 'Under Review', user: 'Claims Processor' },
  ],
};

export function ClaimDetailPage({ claimId, userRole, onBack }: ClaimDetailPageProps) {
  const [decision, setDecision] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  const handleApprove = () => {
    console.log('Approving claim:', claimId, reviewNotes);
    // In real app, call API
  };

  const handleDeny = () => {
    console.log('Denying claim:', claimId, reviewNotes);
    // In real app, call API
  };

  const handleRequestInfo = () => {
    console.log('Requesting more info for claim:', claimId, reviewNotes);
    // In real app, call API
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
                Back to Claims
              </Button>
              <div className="h-6 w-px bg-slate-300" />
              <div>
                <h1 className="text-slate-900">Claim {mockClaim.id}</h1>
                <p className="text-slate-600">Submitted {mockClaim.billing.submittedDate}</p>
              </div>
            </div>
            <Badge className={
              mockClaim.status === 'Under Review' ? 'bg-blue-100 text-blue-800 border-blue-300' :
              mockClaim.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-300' :
              'bg-slate-100 text-slate-800'
            }>
              {mockClaim.status}
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-600 mb-1">Patient Name</p>
                  <p className="text-slate-900">{mockClaim.patient.name}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Age</p>
                  <p className="text-slate-900">{mockClaim.patient.age} years</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Insurance Provider</p>
                  <p className="text-slate-900">{mockClaim.patient.insurance}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Member ID</p>
                  <code className="text-slate-900">{mockClaim.patient.memberId}</code>
                </div>
              </CardContent>
            </Card>

            {/* Visit Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Visit Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600 mb-1">Date of Service</p>
                    <p className="text-slate-900">{mockClaim.visit.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Service Type</p>
                    <p className="text-slate-900">{mockClaim.visit.serviceType}</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-600 mb-2">Diagnosis Codes (ICD-10)</p>
                  <div className="space-y-2">
                    {mockClaim.visit.diagnosisCodes.map((code, index) => (
                      <div key={index} className="p-3 bg-slate-50 rounded-lg border">
                        <code className="text-slate-900">{code}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-slate-600 mb-2">Procedure Codes (CPT/HCPCS)</p>
                  <div className="space-y-2">
                    {mockClaim.visit.procedureCodes.map((code, index) => (
                      <div key={index} className="p-3 bg-slate-50 rounded-lg border">
                        <code className="text-slate-900">{code}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-slate-600 mb-2">Clinical Summary</p>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-slate-900">{mockClaim.visit.clinicalSummary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Provider Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-600 mb-1">Provider Name</p>
                  <p className="text-slate-900">{mockClaim.provider.name}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Specialty</p>
                  <p className="text-slate-900">{mockClaim.provider.specialty}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">NPI</p>
                  <code className="text-slate-900">{mockClaim.provider.npi}</code>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Billing Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Billing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-center">
                  <p className="text-teal-700 mb-1">Total Claim Amount</p>
                  <div className="text-teal-900">${mockClaim.billing.totalAmount.toFixed(2)}</div>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Submitted Date</p>
                  <p className="text-slate-900">{mockClaim.billing.submittedDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Claim Decision Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Claim Decision</CardTitle>
                <CardDescription>Review and process this claim</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-slate-700">Review Notes</label>
                  <Textarea
                    placeholder="Enter your review notes or reasons for decision..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleApprove}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Claim
                  </Button>
                  <Button
                    onClick={handleDeny}
                    variant="outline"
                    className="w-full border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Deny Claim
                  </Button>
                  <Button
                    onClick={handleRequestInfo}
                    variant="outline"
                    className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Request More Information
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Claim History */}
            <Card>
              <CardHeader>
                <CardTitle>Claim History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockClaim.history.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-slate-900">{event.action}</p>
                      <p className="text-slate-500">{event.user}</p>
                      <p className="text-slate-400">{event.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}