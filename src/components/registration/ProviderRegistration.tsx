import { useState } from 'react';
import { ShieldCheck as Shield, ChevronLeft, ChevronRight, Check, Upload, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import type { Provider } from '../../App';

interface ProviderRegistrationProps {
  onComplete: (providerData: Provider) => void;
  onCancel: () => void;
}

export function ProviderRegistration({ onComplete, onCancel }: ProviderRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [caqhConnected, setCAQHConnected] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    profession: '',
    licenseNumber: '',
    issuingAuthority: '',
    licenseExpiration: '',
    npi: '',
    yearsExperience: '',
    password: '',
    confirmPassword: '',
  });

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Contact Information' },
    { number: 3, title: 'Professional Information' },
    { number: 4, title: 'Account Security' },
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const newProvider: Provider = {
      id: Date.now().toString(), // Generate unique ID
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `Dr. ${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      npi: formData.npi,
      specialty: formData.profession.charAt(0).toUpperCase() + formData.profession.slice(1),
      licenseNumber: formData.licenseNumber,
      caqhConnected: caqhConnected,
    };
    onComplete(newProvider);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 33, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 66, label: 'Medium', color: 'bg-amber-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-slate-100 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-teal-900 mb-2">Provider Registration</h1>
          <p className="text-slate-600">Join our healthcare network</p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      currentStep > step.number
                        ? 'bg-teal-600 text-white'
                        : currentStep === step.number
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <span className={`mt-2 hidden sm:block ${
                    currentStep >= step.number ? 'text-teal-900' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      currentStep > step.number ? 'bg-teal-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>Step {currentStep} of 4</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Professional Information */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="profession">Profession *</Label>
                      <Select value={formData.profession} onValueChange={(v) => setFormData({ ...formData, profession: v })}>
                        <SelectTrigger id="profession">
                          <SelectValue placeholder="Select profession" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="nurse">Nurse</SelectItem>
                          <SelectItem value="anesthetist">Anesthetist</SelectItem>
                          <SelectItem value="surgeon">Surgeon</SelectItem>
                          <SelectItem value="specialist">Specialist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience">Years of Experience</Label>
                      <Input
                        id="yearsExperience"
                        type="number"
                        value={formData.yearsExperience}
                        onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">License/Registration Number *</Label>
                      <Input
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="issuingAuthority">Issuing Authority *</Label>
                      <Input
                        id="issuingAuthority"
                        value={formData.issuingAuthority}
                        onChange={(e) => setFormData({ ...formData, issuingAuthority: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseExpiration">License Expiration Date</Label>
                      <Input
                        id="licenseExpiration"
                        type="date"
                        value={formData.licenseExpiration}
                        onChange={(e) => setFormData({ ...formData, licenseExpiration: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="npi">NPI (10-digit) *</Label>
                      <Input
                        id="npi"
                        maxLength={10}
                        value={formData.npi}
                        onChange={(e) => setFormData({ ...formData, npi: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license-upload">Upload License Documents</Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 mb-1">Click to upload or drag and drop</p>
                      <p className="text-slate-400">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>

                  {/* CAQH Integration */}
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <LinkIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-blue-900 mb-1">Connect CAQH Account</h3>
                        <p className="text-blue-700 mb-3">
                          Import your credentials automatically from CAQH
                        </p>
                        {!caqhConnected ? (
                          <Button
                            type="button"
                            onClick={() => setCAQHConnected(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <LinkIcon className="w-4 h-4 mr-2" />
                            Connect CAQH
                          </Button>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-800 border-green-300">
                                <Check className="w-3 h-3 mr-1" />
                                Connected
                              </Badge>
                              <span className="text-blue-700">
                                Last synced: {new Date().toLocaleDateString()}
                              </span>
                            </div>
                            <div className="bg-white p-3 rounded border border-blue-200">
                              <p className="text-slate-600 mb-2">Imported credentials:</p>
                              <ul className="text-slate-700 space-y-1">
                                <li>✓ Medical License</li>
                                <li>✓ NPI Verification</li>
                                <li>✓ Education History</li>
                                <li>✓ Work Experience</li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Account Security */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>

                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Password Strength:</span>
                        <span className={`${
                          passwordStrength.label === 'Weak' ? 'text-red-600' :
                          passwordStrength.label === 'Medium' ? 'text-amber-600' :
                          'text-green-600'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-600">Passwords do not match</p>
                  )}

                  <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <h3 className="text-slate-900 mb-2">Password Requirements:</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• At least 8 characters</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-6 border-t border-slate-200">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                {currentStep < 4 ? (
                  <Button type="button" onClick={handleNext} className="flex-1 bg-teal-600 hover:bg-teal-700">
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="button" onClick={handleSubmit} className="flex-1 bg-teal-600 hover:bg-teal-700">
                    Complete Registration
                  </Button>
                )}
              </div>

              <Button type="button" variant="ghost" onClick={onCancel} className="w-full">
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}