import { useState } from 'react';
import { ArrowLeft, User, FileText, DollarSign, Calendar, Send, Upload, CheckCircle, Eye, ShieldCheck as Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getClaimStatusColor } from '../../types/claim';

interface MemberClaimReviewProps {
  claimId: string;
  onBack: () => void;
  onSubmitToInsurance: (claimId: string, finalData: any) => void;
}

// Mock claim data from provider
const mockClaim = {
  id: 'CLM-2025-004',
  status: 'Pending Admin Review' as const,
  patient: {
    id: 'PT001',
    name: 'Sarah Johnson',
    dob: '1979-03-15',
    age: 45,
    insurance: 'Blue Cross Blue Shield',
    memberId: 'BC-12347821',
  },
  visit: {
    date: '2025-11-15',
    serviceType: 'Outpatient',
    diagnosisCodes: ['I10 (Essential hypertension)', 'E11.9 (Type 2 diabetes without complications)'],
    procedureCodes: ['99213 (Office visit, established patient)', '80053 (Comprehensive metabolic panel)'],
    clinicalSummary: 'Patient presented for routine follow-up. Blood pressure 138/86, improved from last visit. Glucose levels stable. Continue current medication regimen. Ordered comprehensive metabolic panel to monitor kidney function.',
  },
  provider: {
    name: 'Dr. John Smith',
    specialty: 'Internal Medicine',
    npi: '1234567890',
  },
  createdDate: '2025-11-15',
};

export function MemberClaimReview({ claimId, onBack, onSubmitToInsurance }: MemberClaimReviewProps) {
  const [billAmount, setBillAmount] = useState('');
  const [authorizationNumber, setAuthorizationNumber] = useState('');
  const [coverageType, setCoverageType] = useState('');
  const [billingNotes, setBillingNotes] = useState('');

  const handleSubmitToInsurance = () => {
    const finalData = {
      billAmount: parseFloat(billAmount),
      authorizationNumber,
      coverageType,
      billingNotes,
      submittedDate: new Date().toISOString().split('T')[0],
    };
    onSubmitToInsurance(claimId, finalData);
  };

  const isReadyToSubmit = billAmount && parseFloat(billAmount) > 0 && coverageType;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Claims Processing
              </Button>
              <div className="h-6 w-px bg-slate-300" />
              <div>
                <h1 className="text-slate-900">Review & Finalize Claim</h1>
                <p className="text-slate-600">Claim {mockClaim.id}</p>
              </div>
            </div>
            <Badge className={getClaimStatusColor(mockClaim.status)}>
              {mockClaim.status}
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information (Read-Only) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Patient Information
                  <Badge variant="outline" className="ml-2">Read-Only</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-600 mb-1">Patient Name</p>
                  <p className="text-slate-900">{mockClaim.patient.name}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Date of Birth</p>
                  <p className="text-slate-900">{mockClaim.patient.dob}</p>
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

            {/* Provider Documentation (Read-Only) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Provider Documentation
                  <Badge variant="outline" className="ml-2">From {mockClaim.provider.name}</Badge>
                </CardTitle>
                <CardDescription>Clinical information submitted by the provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600 mb-1">Date of Service</p>
                    <p className="text-slate-900">{mockClaim.visit.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Service Type</p>
                    <Badge variant="outline">{mockClaim.visit.serviceType}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600 mb-1">Provider</p>
                    <p className="text-slate-900">{mockClaim.provider.name}</p>
                    <p className="text-slate-500 text-sm">{mockClaim.provider.specialty}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">NPI</p>
                    <code className="text-slate-900">{mockClaim.provider.npi}</code>
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

            {/* Insurance & Billing (Editable by Member) */}
            <Card className="border-teal-200 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-teal-600" />
                  Insurance & Billing Details
                  <Badge className="ml-2 bg-teal-100 text-teal-800">Your Responsibility</Badge>
                </CardTitle>
                <CardDescription>Complete billing information before submitting to insurance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billAmount">Total Bill Amount *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <Input
                        id="billAmount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={billAmount}
                        onChange={(e) => setBillAmount(e.target.value)}
                        className="pl-7"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authNumber">Authorization Number</Label>
                    <Input
                      id="authNumber"
                      placeholder="AUTH-123456"
                      value={authorizationNumber}
                      onChange={(e) => setAuthorizationNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverageType">Coverage Type *</Label>
                  <Select value={coverageType} onValueChange={setCoverageType}>
                    <SelectTrigger id="coverageType">
                      <SelectValue placeholder="Select coverage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-network">In-Network</SelectItem>
                      <SelectItem value="out-network">Out-of-Network</SelectItem>
                      <SelectItem value="emergency">Emergency Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingNotes">Billing Notes (Optional)</Label>
                  <Textarea
                    id="billingNotes"
                    placeholder="Add any billing notes, special considerations, or additional information..."
                    value={billingNotes}
                    onChange={(e) => setBillingNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Supporting Documents</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-slate-600 mb-2">Upload supporting documents</p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                    <p className="text-sm text-slate-500 mt-2">Lab results, imaging reports, referrals, etc.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions */}
          <div className="space-y-6">
            {/* Submission Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Patient</span>
                  <span className="text-slate-900 text-sm">{mockClaim.patient.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Insurance</span>
                  <span className="text-slate-900 text-sm">{mockClaim.patient.insurance}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Service Date</span>
                  <span className="text-slate-900">{mockClaim.visit.date}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">Bill Amount</span>
                  <span className="text-slate-900">
                    {billAmount ? `$${parseFloat(billAmount).toFixed(2)}` : '—'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleSubmitToInsurance}
                  disabled={!isReadyToSubmit}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to Insurance Client
                </Button>

                {!isReadyToSubmit && (
                  <p className="text-sm text-amber-600 text-center">
                    Complete bill amount and coverage type to submit
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Workflow Info */}
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">Workflow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-purple-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Provider initiated claim</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  </div>
                  <span>You're finalizing billing</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-4 h-4 border-2 border-purple-400 rounded-full" />
                  <span>Submit to insurance</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-4 h-4 border-2 border-purple-400 rounded-full" />
                  <span>Insurance reviews & decides</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}