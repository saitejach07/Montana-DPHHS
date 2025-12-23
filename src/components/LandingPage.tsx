import { ShieldCheck as Shield, Users, Activity, ArrowRight, CheckCircle, Lock, FileText, ClipboardCheck, Building2, UserCheck, Megaphone, Monitor, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './Fallback_Img/ImageWithFallback';

interface LandingPageProps {
  onNavigateToProviderAuth: () => void;
  onNavigateToStateAgentAuth: () => void;
  onNavigateToWorkflowGuide?: () => void;
}

export function LandingPage({ onNavigateToProviderAuth, onNavigateToStateAgentAuth, onNavigateToWorkflowGuide }: LandingPageProps) {
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
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={onNavigateToProviderAuth}>Provider Login</Button>
              <Button variant="ghost" onClick={onNavigateToStateAgentAuth}>State Agent Login</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Background Image */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-10">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1609366314419-6f463a285a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250YW5hJTIwbW91bnRhaW5zJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2MzU5Mjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Mountain Landscape"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            <span>AgileTech Healthcare Systems</span>
          </div>
          <h1 className="text-slate-900 text-6xl mb-4">
            Provider Enrollment Portal
          </h1>
          <p className="text-slate-600 text-2xl max-w-3xl mx-auto mb-8">
            Streamlined enrollment, credentialing, and claims management for healthcare providers
          </p>
        </div>
      </section>

      {/* Portal Selection Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 text-4xl mb-4">Choose Your Portal</h2>
          <p className="text-slate-600 text-xl">Access the right tools for your role</p>
        </div>

        <div className="flex flex-row gap-8 max-w-4xl mx-auto">
          {/* Provider Portal Card */}
          <Card className="flex-1 hover:shadow-xl transition-all duration-300 border-2 hover:border-teal-300 group flex flex-col">
            <CardHeader>
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UserCheck className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-2xl text-slate-900">Provider</CardTitle>
              <CardDescription className="text-base">
                For healthcare professionals and organizations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col flex-grow">
              <div className="space-y-3 flex-grow">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-900">Individual Providers</p>
                    <p className="text-sm text-slate-600">Sole Proprietor, Rendering, Ordering/Referring/Prescribing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-900">Organization Providers</p>
                    <p className="text-sm text-slate-600">Groups, Clinics, Facilities, Hospitals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-900">CAQH Integration</p>
                    <p className="text-sm text-slate-600">Automated credentialing verification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-900">Claims Management</p>
                    <p className="text-sm text-slate-600">Submit and track insurance claims</p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 mt-6" onClick={onNavigateToProviderAuth}>
                Access Provider Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* State Agent Portal Card */}
          <Card className="flex-1 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 group flex flex-col">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-slate-900">State Agent</CardTitle>
              <CardDescription className="text-base">
                For AgileTech staff
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col flex-grow">
              <div className="space-y-3 flex-grow">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-900">Review Enrollments</p>
                    <p className="text-sm text-slate-600">Approve provider applications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-900">Verify Credentials</p>
                    <p className="text-sm text-slate-600">CAQH status monitoring</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-900">Process Claims</p>
                    <p className="text-sm text-slate-600">Review and approve claims</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-900">Provider Payments</p>
                    <p className="text-sm text-slate-600">Process reimbursements</p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-6" onClick={onNavigateToStateAgentAuth}>
                Access State Agent Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Announcements and DPHHS Website Buttons */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Getting Started Button */}
          <div 
            onClick={onNavigateToWorkflowGuide}
            className="group block cursor-pointer"
          >
            <div className="relative h-32 overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer bg-slate-100 hover:bg-teal-600">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-300">
                <BookOpen className="w-12 h-12 text-teal-600 group-hover:text-white transition-colors duration-300 mb-2" />
                <h3 className="text-slate-700 group-hover:text-white transition-colors duration-300 text-xl text-center">Getting Started</h3>
              </div>
            </div>
          </div>

          {/* Announcements Button */}
          <a 
            href="https://medicaidprovider.mt.gov/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative h-32 overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer bg-slate-100 hover:bg-teal-600">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-300">
                <Megaphone className="w-12 h-12 text-teal-600 group-hover:text-white transition-colors duration-300 mb-2" />
                <h3 className="text-slate-700 group-hover:text-white transition-colors duration-300 text-xl">Announcements</h3>
              </div>
            </div>
          </a>

          {/* DPHHS Website Button */}
          <a 
            href="https://dphhs.mt.gov/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative h-32 overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer bg-slate-100 hover:bg-teal-600">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-300">
                <Monitor className="w-12 h-12 text-teal-600 group-hover:text-white transition-colors duration-300 mb-2" />
                <h3 className="text-slate-700 group-hover:text-white transition-colors duration-300 text-xl">DPHHS Website</h3>
              </div>
            </div>
          </a>
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