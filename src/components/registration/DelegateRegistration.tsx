import { useState } from 'react';
import { ShieldCheck as Shield, Mail, Lock, ArrowLeft, CheckCircle, AlertCircle, Key } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface DelegateRegistrationProps {
  onComplete: () => void;
  onBack: () => void;
}

export function DelegateRegistration({ onComplete, onBack }: DelegateRegistrationProps) {
  const [step, setStep] = useState<'invitation' | 'details'>('invitation');
  const [invitationCode, setInvitationCode] = useState('');
  const [invitationValid, setInvitationValid] = useState(false);
  const [organizationInfo, setOrganizationInfo] = useState({
    name: '',
    npi: '',
    ownerName: '',
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleValidateInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock validation - in real system, this would call an API
    if (invitationCode === 'DEMO-INVITE-2024' || invitationCode.length >= 12) {
      setInvitationValid(true);
      setOrganizationInfo({
        name: 'Regional Medical Group',
        npi: '1234567890',
        ownerName: 'Dr. Sarah Administrator',
      });
      setStep('details');
    } else {
      alert('Invalid invitation code. Please check your email and try again.\n\nFor demo purposes, use: DEMO-INVITE-2024');
    }
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // In real system, this would create the delegate account
    alert('Delegate registration successful! You can now log in with your credentials.');
    onComplete();
  };

  if (step === 'invitation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Registration Options
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
              <Key className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-slate-900 text-3xl mb-2">Delegate Registration</h1>
            <p className="text-slate-600">Enter your invitation code to get started</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle>Enter Invitation Code</CardTitle>
              <CardDescription>
                You should have received an email invitation from your organization's Owner/Administrator with a unique invitation code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleValidateInvitation} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="invitationCode">Invitation Code *</Label>
                  <Input
                    id="invitationCode"
                    placeholder="Enter your invitation code"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                    className="text-center tracking-wider"
                    required
                  />
                  <p className="text-sm text-slate-500">
                    The invitation code is case-insensitive and typically contains letters and numbers.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="mb-2"><strong>Haven't received an invitation?</strong></p>
                      <p>Contact your organization's Owner/Administrator to request an invitation code. They can generate one from their Provider Portal dashboard.</p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Validate Invitation Code
                </Button>

                {/* Demo Helper */}
                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-700 mb-2">Demo Invitation Code:</p>
                  <p className="text-xs text-slate-600">
                    For demo purposes, use: <code className="bg-slate-200 px-2 py-1 rounded">DEMO-INVITE-2024</code>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Help */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Need assistance? Call Provider Relations at (800) 624-3958
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Details Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setStep('invitation')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Invitation Code
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 text-3xl mb-2">Complete Your Delegate Profile</h1>
          <p className="text-slate-600">Invitation code validated successfully</p>
        </div>

        {/* Organization Info */}
        <Card className="mb-6 border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Organization Name:</p>
                <p className="text-slate-900">{organizationInfo.name}</p>
              </div>
              <div>
                <p className="text-slate-600">Organization NPI:</p>
                <p className="text-slate-900">{organizationInfo.npi}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-slate-600">Administrator:</p>
                <p className="text-slate-900">{organizationInfo.ownerName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>
              Create your delegate account to access the Provider Portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRegistration} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(406) 555-0123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-slate-700">
                    <p className="mb-2"><strong>Your Account Permissions:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>✓ Submit claims under {organizationInfo.name}</li>
                      <li>✓ Manage patients assigned to you</li>
                      <li>✓ View claim status and history</li>
                      <li>✗ Cannot invite other delegates (Owner/Administrator only)</li>
                      <li>✗ Cannot modify organization settings</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Complete Delegate Registration
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* HIPAA Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-600 text-sm">
            <Shield className="w-4 h-4" />
            <span>HIPAA Compliant & Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}