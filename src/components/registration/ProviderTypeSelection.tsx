import { ShieldCheck as Shield, Users, Building2, FileText, ArrowRight, User, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface ProviderTypeSelectionProps {
  onSelectIndividual: (type: 'sole-proprietor' | 'rendering' | 'ordering-referring') => void;
  onSelectOrganization: (type: 'group' | 'facility') => void;
  onCancel: () => void;
}

export function ProviderTypeSelection({ onSelectIndividual, onSelectOrganization, onCancel }: ProviderTypeSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-slate-900 text-3xl">Owner/Administrator Enrollment</h1>
          </div>
          <p className="text-slate-600 text-lg">Select your provider enrollment type</p>
          <p className="text-slate-500 mt-2">You are registering as the Owner/Administrator of your NPI/API</p>
        </div>

        {/* Warning Notice */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="mb-1"><strong>Important:</strong> You are creating an Owner/Administrator account.</p>
              <p>Each NPI/API can only have ONE Owner/Administrator. If you are a delegate working for an organization, please go back and use the "Delegate Registration" option instead.</p>
            </div>
          </div>
        </div>

        {/* Main Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* Individual Provider Card */}
          <Card className="border-2 hover:border-teal-300 transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-2xl">Individual Provider</CardTitle>
              <CardDescription className="text-base mt-2">
                For healthcare professionals providing services as individuals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {/* Sole Proprietor */}
                <button
                  onClick={() => onSelectIndividual('sole-proprietor')}
                  className="w-full p-4 bg-slate-50 hover:bg-teal-50 border-2 border-slate-200 hover:border-teal-300 rounded-lg text-left transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-slate-900">Sole Proprietor Provider</h3>
                        <Badge className="bg-teal-100 text-teal-700 border-teal-200">Most Common</Badge>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">
                        Own your business and associated tax ID. Receive direct payment from Healthcare Programs.
                      </p>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Used as pay-to provider on claims</li>
                        <li>• Direct recipient of payments</li>
                        <li>• Must have own Tax ID (SSN or EIN)</li>
                      </ul>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 flex-shrink-0 ml-3 mt-1 transition-colors" />
                  </div>
                </button>

                {/* Rendering Provider */}
                <button
                  onClick={() => onSelectIndividual('rendering')}
                  className="w-full p-4 bg-slate-50 hover:bg-teal-50 border-2 border-slate-200 hover:border-teal-300 rounded-lg text-left transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-2">Rendering Provider</h3>
                      <p className="text-slate-600 text-sm mb-2">
                        Work for a group, clinic, hospital, or organization. Payment goes to the organization.
                      </p>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Listed as rendering provider on claims</li>
                        <li>• No direct payment from Healthcare Programs</li>
                        <li>• Can work at multiple locations</li>
                      </ul>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 flex-shrink-0 ml-3 mt-1 transition-colors" />
                  </div>
                </button>

                {/* Ordering/Referring/Prescribing */}
                <button
                  onClick={() => onSelectIndividual('ordering-referring')}
                  className="w-full p-4 bg-slate-50 hover:bg-teal-50 border-2 border-slate-200 hover:border-teal-300 rounded-lg text-left transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-2">Ordering/Referring/Prescribing Provider</h3>
                      <p className="text-slate-600 text-sm mb-2">
                        Write orders, prescribe medications, and refer members for testing.
                      </p>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Does not bill for services</li>
                        <li>• Not listed as rendering provider</li>
                        <li>• Used on institutional claim forms</li>
                      </ul>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 flex-shrink-0 ml-3 mt-1 transition-colors" />
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Organization Provider Card */}
          <Card className="border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Organization Provider</CardTitle>
              <CardDescription className="text-base mt-2">
                For groups, clinics, hospitals, and healthcare facilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {/* Group */}
                <button
                  onClick={() => onSelectOrganization('group')}
                  className="w-full p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-lg text-left transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-slate-900">Group/Clinic</h3>
                        <Badge variant="outline">Taxonomy Required</Badge>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">
                        Medical group or clinic providing healthcare services under one NPI.
                      </p>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Taxonomy: 193200000X or 193400000X</li>
                        <li>• Can add additional types via subparts</li>
                        <li>• Multiple providers under one group</li>
                      </ul>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 flex-shrink-0 ml-3 mt-1 transition-colors" />
                  </div>
                </button>

                {/* Facility */}
                <button
                  onClick={() => onSelectOrganization('facility')}
                  className="w-full p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-lg text-left transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-2">Facility</h3>
                      <p className="text-slate-600 text-sm mb-2">
                        Hospitals, skilled nursing facilities, and other healthcare institutions.
                      </p>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• All other taxonomies (excluding group codes)</li>
                        <li>• Can add additional types via subparts</li>
                        <li>• Institutional billing capabilities</li>
                      </ul>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 flex-shrink-0 ml-3 mt-1 transition-colors" />
                  </div>
                </button>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-900 mb-1">Need Help?</p>
                    <p className="text-blue-700 text-sm">
                      Contact Provider Relations at (800) 624-3958 or email MTEnrollment@conduent.com for guidance on selecting the correct enrollment type.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button variant="ghost" onClick={onCancel} className="text-slate-600 hover:text-slate-900">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}