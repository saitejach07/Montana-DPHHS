import { ShieldCheck as Shield, ArrowRight, CheckCircle, UserPlus, FileCheck, ClipboardList, DollarSign, ArrowLeft, Users, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './Fallback_Img/ImageWithFallback';
import { useEffect } from 'react';

interface WorkflowGuidePageProps {
  onNavigateBack: () => void;
}

export function WorkflowGuidePage({ onNavigateBack }: WorkflowGuidePageProps) {
  useEffect(() => {
    // Scroll to the workflow section when component mounts
    const workflowSection = document.getElementById('workflow-section');
    if (workflowSection) {
      workflowSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">AgileTech</h1>
                <p className="text-slate-600">Provider Enrollment Portal</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onNavigateBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full mb-6">
            <ClipboardList className="w-4 h-4" />
            <span>Step-by-Step Guide</span>
          </div>
          <h1 className="text-slate-900 text-5xl mb-4">Getting Started</h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto">
            Learn how to apply to the AgileTech Provider Enrollment Program. Follow our simple workflow to register and start providing services.
          </p>
        </div>
      </section>

      {/* Registration Types */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        {/* Capitol Building Banner */}
        <div className="relative h-64 rounded-2xl overflow-hidden mb-12 shadow-xl">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1716744446751-4d14d26c8e55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250YW5hJTIwY2FwaXRvbCUyMGJ1aWxkaW5nJTIwZ292ZXJubWVudHxlbnwxfHx8fDE3NjM1OTI3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Capitol Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-blue-900/60 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h2 className="text-4xl mb-2">Official AgileTech Portal</h2>
              <p className="text-xl text-teal-100">Serving healthcare providers since 1965</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-slate-900 text-3xl mb-4">Choose Your Registration Type</h2>
          <p className="text-slate-600 text-lg">Different registration paths based on your role</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Owner/Administrator Card */}
          <Card className="border-2 border-teal-200 bg-white">
            <CardHeader>
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-2xl text-slate-900">Owner / Administrator</CardTitle>
              <CardDescription className="text-base">
                For primary practice owners and administrators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">Can self-register directly</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">Requires valid NPI and API credentials</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">Can invite delegate users</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">Full administrative access</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delegate User Card */}
          <Card className="border-2 border-blue-200 bg-white">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-slate-900">Delegate User</CardTitle>
              <CardDescription className="text-base">
                For staff members working under an owner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">Requires email invitation from owner</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">Cannot self-register</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">Limited permissions based on role</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">Can manage assigned tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-white/50 rounded-2xl" id="workflow-section">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 text-3xl mb-4">Provider Enrollment Workflow</h2>
          <p className="text-slate-600 text-lg">Complete these steps to enroll as a healthcare provider</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Step 1 */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-600">1</span>
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 mb-2">Register Your Account</CardTitle>
                  <CardDescription className="text-base">
                    <strong>Owner/Administrator:</strong> Click "Enroll as Provider" and self-register using your NPI and API credentials.
                    <br />
                    <strong>Delegate:</strong> Wait for an email invitation from your practice owner/administrator.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Step 2 */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-600">2</span>
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 mb-2">Choose Provider Type</CardTitle>
                  <CardDescription className="text-base">
                    Select your provider classification:
                    <br />
                    • <strong>Individual Provider:</strong> Sole Proprietor, Rendering Provider, Ordering/Referring/Prescribing Provider
                    <br />
                    • <strong>Organization Provider:</strong> Group Practice, Clinic, Facility, Hospital
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Step 3 */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-600">3</span>
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 mb-2">Complete CAQH Credentialing</CardTitle>
                  <CardDescription className="text-base">
                    Our system integrates with CAQH ProView for automated credentialing verification. Provide your CAQH ID and authorize data access for streamlined enrollment.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Step 4 */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-600">4</span>
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 mb-2">Submit Enrollment Application</CardTitle>
                  <CardDescription className="text-base">
                    Complete all required forms including provider information, practice locations, service specialties, and licensing documentation. All data is securely transmitted with HIPAA compliance.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Step 5 */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-600">5</span>
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 mb-2">AgileTech Review</CardTitle>
                  <CardDescription className="text-base">
                    State agents review your enrollment application, verify credentials through CAQH, and validate all submitted documentation. Track your application status in real-time through your provider dashboard.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Step 6 */}
          <Card className="border-2 hover:shadow-lg transition-shadow bg-green-50">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 mb-2">Approval & Start Providing Services</CardTitle>
                  <CardDescription className="text-base">
                    Once approved, you can enroll patients, submit claims, and manage your practice through the provider portal. Access patient management tools, claims submission, and payment tracking.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-teal-50">
            Begin your AgileTech provider enrollment today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-teal-600 hover:bg-slate-100"
              onClick={onNavigateBack}
            >
              Start Enrollment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6" />
                <span>AgileTech Healthcare Programs</span>
              </div>
              <p className="text-slate-400 text-sm">
                Provider enrollment and management platform for healthcare providers
              </p>
            </div>
            <div>
              <h3 className="mb-4">Providers</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Enroll Now</li>
                <li>Provider Types</li>
                <li>CAQH Integration</li>
                <li>Requirements</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Contact</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Phone: (800) 624-3958</li>
                <li>Email: MTEnrollment@conduent.com</li>
                <li>Monday - Friday</li>
                <li>8:00 AM - 5:00 PM MT</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 AgileTech Healthcare Programs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}