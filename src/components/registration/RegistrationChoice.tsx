import { ShieldCheck as Shield, UserCheck, Users, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface RegistrationChoiceProps {
  onSelectOwner: () => void;
  onSelectDelegate: () => void;
  onBack: () => void;
}

export function RegistrationChoice({ onSelectOwner, onSelectDelegate, onBack }: RegistrationChoiceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 p-6">
      <div className="max-w-5xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 text-4xl mb-2">Getting Started</h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Welcome to the Montana Provider Portal. Our portal gives providers the ability to submit claims, create claim templates, and manage portal users.
          </p>
        </div>

        {/* Important Alert */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-amber-900 mb-2">IMPORTANT: Choose the Correct Registration Path</h3>
              <p className="text-amber-800 mb-3">
                If you will be a <strong>delegate</strong> working on behalf of an Organization/Group NPI or API, 
                <strong> do not create your Provider Portal login account</strong> without first receiving an email invitation 
                from the Owner/Administrator of your NPI or API.
              </p>
              <p className="text-amber-800">
                Without that email invitation, you will become the <strong>Owner/Administrator</strong> of your organization's portal account.
              </p>
            </div>
          </div>
        </div>

        {/* Registration Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Owner/Administrator Registration */}
          <Card className="border-2 border-teal-200 hover:shadow-xl transition-all cursor-pointer group" onClick={onSelectOwner}>
            <CardHeader>
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UserCheck className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-2xl">Owner/Administrator Registration</CardTitle>
              <CardDescription className="text-base">
                Self-Registration for NPI/API Owners
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-slate-700">
                <p>
                  <strong>Choose this option if you:</strong>
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">✓</span>
                    <span>Own your National Provider Identifier (NPI) or Atypical Provider Identifier (API)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">✓</span>
                    <span>Are a sole proprietor or individual provider</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">✓</span>
                    <span>Are the administrator of an organization/group practice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">✓</span>
                    <span>Will manage portal users and delegations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-teal-900">
                  <strong>Note:</strong> Each NPI/API can only have ONE Owner/Administrator account. When you create your account, you become the default Owner/Administrator.
                </p>
              </div>

              <Button className="w-full bg-teal-600 hover:bg-teal-700 mt-4">
                Continue as Owner/Administrator
              </Button>
            </CardContent>
          </Card>

          {/* Delegate Registration */}
          <Card className="border-2 border-blue-200 hover:shadow-xl transition-all cursor-pointer group" onClick={onSelectDelegate}>
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Delegate Registration</CardTitle>
              <CardDescription className="text-base">
                Registration with Invitation Code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-slate-700">
                <p>
                  <strong>Choose this option if you:</strong>
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Work on behalf of an organization/group NPI or API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Have received an email invitation from your Administrator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Will submit claims under your organization's NPI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Need access to manage patients and claims only</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-900">
                  <strong>Required:</strong> You must have an invitation code sent to you by your organization's Owner/Administrator to complete this registration.
                </p>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                Continue with Invitation Code
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <h3 className="text-slate-900 mb-2">Need Help?</h3>
              <p className="text-slate-600 mb-4">
                Contact Provider Relations if you're unsure which registration path to choose.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
                <span>📞 (800) 624-3958</span>
                <span>✉️ MTEnrollment@conduent.com</span>
                <span>🕐 Monday - Friday, 8:00 AM - 5:00 PM MT</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}