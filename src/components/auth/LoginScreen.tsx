import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ShieldCheck as Shield, Lock, Users, Building2, Stethoscope } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (role: 'provider' | 'member' | 'client') => void;
}

export function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password reset
    alert(`Password reset link sent to ${resetEmail}`);
    setForgotPassword(false);
    setResetEmail('');
  };

  if (forgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-teal-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a reset link
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleForgotPassword}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your.email@hospital.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">Send Reset Link</Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setForgotPassword(false)}
              >
                Back to Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-slate-900 mb-2">Healthcare Coordination Platform</h1>
          <p className="text-slate-600">HIPAA-Compliant Care Management System</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Sign In to Your Account</CardTitle>
                <CardDescription>Enter your credentials to access the platform</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <Alert className="bg-blue-50 border-blue-200">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-900">
                      This is a secure, HIPAA-compliant system. All access is monitored and logged.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@hospital.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        onClick={() => setForgotPassword(true)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                    <p className="text-sm text-slate-600">Quick Login (Demo):</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-slate-500">Provider:</p>
                        <p className="text-slate-900">doctor@hospital.com</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Staff:</p>
                        <p className="text-slate-900">admin@hospital.com</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Insurance:</p>
                        <p className="text-slate-900">claims@insurance.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Sign In Securely
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onRegister('provider')}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Provider</CardTitle>
                  <CardDescription>Doctors, Nurses, Clinical Staff</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• CAQH Integration</li>
                    <li>• License Verification</li>
                    <li>• Patient Care Access</li>
                    <li>• Clinical Documentation</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Register as Provider</Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onRegister('member')}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle>Member</CardTitle>
                  <CardDescription>Hospital Administrative Staff</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Patient Admission</li>
                    <li>• Insurance Verification</li>
                    <li>• Administrative Tasks</li>
                    <li>• Care Coordination</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Register as Member</Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onRegister('client')}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Client</CardTitle>
                  <CardDescription>Insurance Companies</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Claims Review</li>
                    <li>• Provider Network</li>
                    <li>• Authorization Management</li>
                    <li>• Credential Verification</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Register Organization</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
