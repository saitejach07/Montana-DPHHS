import { useState } from 'react';
import { ShieldCheck as Shield, Lock, Mail, ArrowLeft, UserCheck, Building2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { UserRole } from '../../App';

interface LoginProps {
  onLogin: (role: UserRole, email: string) => void;
  onNavigateToRegister: (role: UserRole) => void;
  onBack: () => void;
  portalType: 'provider' | 'state-agent';
}

export function Login({ onLogin, onNavigateToRegister, onBack, portalType }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(portalType, email);
  };

  const isProvider = portalType === 'provider';

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1758206523745-1f334f702660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhlYWx0aGNhcmUlMjBwcm9mZXNzaW9uYWxzfGVufDF8fHx8MTc2MzQ3ODIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Healthcare Professionals"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${isProvider ? 'bg-gradient-to-br from-teal-900/90 to-teal-700/80' : 'bg-gradient-to-br from-blue-900/90 to-blue-700/80'}`}></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <Shield className="w-16 h-16 mb-6" />
          </div>
          <h1 className="text-5xl mb-4">
            {isProvider ? 'Provider Portal' : 'State Agent Portal'}
          </h1>
          <p className="text-2xl text-teal-100 mb-8">
            Montana Department of Public Health & Human Services
          </p>
          <div className="space-y-4 text-teal-50">
            {isProvider ? (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-900">✓</span>
                  </div>
                  <p className="text-lg">Manage patient enrollments and healthcare services</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-900">✓</span>
                  </div>
                  <p className="text-lg">Submit and track claims in real-time</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-900">✓</span>
                  </div>
                  <p className="text-lg">HIPAA-compliant secure platform</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-900">✓</span>
                  </div>
                  <p className="text-lg">Review and process provider enrollments</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-900">✓</span>
                  </div>
                  <p className="text-lg">Manage claims and payment processing</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-900">✓</span>
                  </div>
                  <p className="text-lg">Access comprehensive reporting tools</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="w-full max-w-md">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {/* Mobile Header */}
          <div className="text-center mb-8 lg:hidden">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
              isProvider ? 'bg-gradient-to-br from-teal-500 to-teal-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'
            }`}>
              {isProvider ? (
                <UserCheck className="w-8 h-8 text-white" />
              ) : (
                <Building2 className="w-8 h-8 text-white" />
              )}
            </div>
            <h1 className="text-slate-900 text-3xl mb-2">
              {isProvider ? 'Provider Portal' : 'State Agent Portal'}
            </h1>
            <p className="text-slate-600">Montana DPHHS</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 shadow-lg ${
              isProvider ? 'bg-gradient-to-br from-teal-500 to-teal-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'
            }`}>
              {isProvider ? (
                <UserCheck className="w-7 h-7 text-white" />
              ) : (
                <Building2 className="w-7 h-7 text-white" />
              )}
            </div>
            <h2 className="text-slate-900 text-3xl mb-2">Welcome Back</h2>
            <p className="text-slate-600">Sign in to access your portal</p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                {isProvider 
                  ? 'Access your provider account to manage patients and claims'
                  : 'Access state agent dashboard to manage enrollments and claims'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="provider@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span className="text-slate-600">Remember me</span>
                  </label>
                  <a href="#" className={`${isProvider ? 'text-teal-600 hover:text-teal-700' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
                    Forgot password?
                  </a>
                </div>

                <Button 
                  type="submit" 
                  className={`w-full h-11 ${isProvider ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'} transition-all`}
                >
                  Sign In
                </Button>

                {isProvider && (
                  <div className="text-center pt-5 border-t border-slate-200">
                    <p className="text-slate-600 text-sm mb-3">
                      Don't have an account?
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-teal-300 text-teal-600 hover:bg-teal-50"
                      onClick={() => onNavigateToRegister('provider')}
                    >
                      Enroll as Provider
                    </Button>
                  </div>
                )}

                {/* Demo Credentials */}
                <div className={`mt-6 p-4 rounded-lg border ${isProvider ? 'bg-teal-50 border-teal-200' : 'bg-blue-50 border-blue-200'}`}>
                  <p className={`text-sm mb-2 ${isProvider ? 'text-teal-900' : 'text-blue-900'}`}>Demo Credentials:</p>
                  <div className={`space-y-1 text-xs ${isProvider ? 'text-teal-700' : 'text-blue-700'}`}>
                    {isProvider ? (
                      <>
                        <p>Email: provider@demo.com</p>
                        <p>Password: demo123</p>
                      </>
                    ) : (
                      <>
                        <p>Email: agent@dphhs.mt.gov</p>
                        <p>Password: agent123</p>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* HIPAA Notice */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-600 text-sm">
              <Shield className="w-4 h-4" />
              <span>HIPAA Compliant & Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
