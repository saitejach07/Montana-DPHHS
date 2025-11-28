import { useState } from 'react';
import { ShieldCheck as Shield, LogOut, Users, FileText, Bell, Settings, Search, Activity, Clock, Building2, TrendingUp, ArrowRight, CheckCircle, AlertCircle, ChevronRight, DollarSign, UserCheck, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { User, Claim } from '../../App';
import type { PatientData } from '../member/PatientEditModal';

interface StateAgentDashboardProps {
  user: User;
  onLogout: () => void;
  claims: Claim[];
  patients: PatientData[];
}

// Mock provider enrollment data
const providerEnrollments = [
  { 
    id: 'PE-001', 
    name: 'Dr. John Smith', 
    type: 'Individual - Sole Proprietor', 
    npi: '1234567890',
    specialty: 'Cardiologist',
    status: 'Pending Review', 
    submittedDate: '2025-11-15',
    caqhStatus: 'Active'
  },
  { 
    id: 'PE-002', 
    name: 'Springfield Medical Group', 
    type: 'Organization - Group', 
    npi: '9876543210',
    specialty: 'Multi-Specialty',
    status: 'Approved', 
    submittedDate: '2025-11-10',
    caqhStatus: 'Active'
  },
  { 
    id: 'PE-003', 
    name: 'Dr. Emily Johnson', 
    type: 'Individual - Rendering', 
    npi: '5555555555',
    specialty: 'Pediatrics',
    status: 'Requires Documentation', 
    submittedDate: '2025-11-18',
    caqhStatus: 'Pending'
  },
  { 
    id: 'PE-004', 
    name: 'Montana Regional Hospital', 
    type: 'Organization - Facility', 
    npi: '1111111111',
    specialty: 'General Hospital',
    status: 'Pending Review', 
    submittedDate: '2025-11-17',
    caqhStatus: 'Active'
  },
];

const paymentQueue = [
  { id: 'PAY-001', provider: 'Dr. John Smith', claimCount: 5, amount: 12450, dueDate: '2025-11-25', status: 'Ready' },
  { id: 'PAY-002', provider: 'Springfield Medical Group', claimCount: 12, amount: 28900, dueDate: '2025-11-25', status: 'Ready' },
  { id: 'PAY-003', provider: 'Montana Regional Hospital', claimCount: 8, amount: 45600, dueDate: '2025-11-26', status: 'Processing' },
];

export function StateAgentDashboard({ user, onLogout, claims, patients }: StateAgentDashboardProps) {
  const [activeView, setActiveView] = useState<'enrollments' | 'claims' | 'payments' | 'providers'>('enrollments');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate statistics
  const pendingEnrollments = providerEnrollments.filter(e => e.status === 'Pending Review').length;
  const approvedEnrollments = providerEnrollments.filter(e => e.status === 'Approved').length;
  const requiresAction = providerEnrollments.filter(e => e.status === 'Requires Documentation').length;
  
  const claimsPendingReview = claims.filter(c => c.status === 'Awaiting Member Review').length;
  const claimsApproved = claims.filter(c => c.status === 'Submitted to Insurance').length;
  const totalClaimValue = claims.reduce((sum, c) => sum + (c.amount || 0), 0);

  const pendingPayments = paymentQueue.filter(p => p.status === 'Ready').length;
  const totalPaymentAmount = paymentQueue.reduce((sum, p) => sum + p.amount, 0);

  const getEnrollmentStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'Pending Review':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending Review</Badge>;
      case 'Requires Documentation':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200"><AlertCircle className="w-3 h-3 mr-1" />Requires Docs</Badge>;
      case 'Denied':
        return <Badge className="bg-red-100 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Denied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getClaimStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted to Insurance':
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'Awaiting Member Review':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200"><Activity className="w-3 h-3 mr-1" />In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900 text-2xl">State Agent Portal</h1>
                <p className="text-slate-600">Montana DPHHS</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-slate-600" />
                {(pendingEnrollments + claimsPendingReview) > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5 text-slate-600" />
              </Button>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-blue-200">
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm text-slate-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-slate-600">State Agent</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="w-5 h-5 text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-8">
        {/* Hero Banner */}
        <Card className="mb-8 overflow-hidden border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div className="p-8">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">State Agent Dashboard</Badge>
                <h2 className="text-white text-3xl mb-2">Good Morning, {user.firstName}</h2>
                <p className="text-blue-50 text-lg mb-6">
                  You have {pendingEnrollments} provider enrollments and {claimsPendingReview} claims awaiting review.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50" onClick={() => setActiveView('enrollments')}>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Review Enrollments
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    View Reports
                  </Button>
                </div>
              </div>
              <div className="relative h-[280px] hidden lg:block">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1654762930571-dcf2ebc11542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGFkbWluaXN0cmF0aXZlJTIwc3RhZmZ8ZW58MXx8fHwxNzYzNTg1NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Healthcare administration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-yellow-300" onClick={() => setActiveView('enrollments')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">Action</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{pendingEnrollments}</CardTitle>
              <CardDescription>Pending Enrollments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50">
                Review Now <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-green-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs">Total</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{approvedEnrollments}</CardTitle>
              <CardDescription>Approved Providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-600">
                <TrendingUp className="w-4 h-4 inline mr-1 text-green-600" />
                +5 this week
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-300" onClick={() => setActiveView('claims')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-xs">Claims</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{claimsPendingReview}</CardTitle>
              <CardDescription>Claims to Review</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                Process <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-purple-300" onClick={() => setActiveView('payments')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">Ready</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{pendingPayments}</CardTitle>
              <CardDescription>Payments Pending</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                Process <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-teal-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{patients.length}</CardTitle>
              <CardDescription>Active Patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-600">
                Across all providers
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Provider Enrollments View */}
            {activeView === 'enrollments' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl">Provider Enrollments</CardTitle>
                      <CardDescription>Review and approve provider applications</CardDescription>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <FileText className="w-4 h-4 mr-2" />
                      Export List
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search enrollments..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Provider</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>CAQH</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {providerEnrollments.map((enrollment) => (
                        <TableRow key={enrollment.id} className="hover:bg-blue-50/50">
                          <TableCell>
                            <div>
                              <p className="text-slate-900">{enrollment.name}</p>
                              <p className="text-sm text-slate-600">NPI: {enrollment.npi} • {enrollment.specialty}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-slate-900">{enrollment.type}</p>
                            <p className="text-sm text-slate-600">{enrollment.submittedDate}</p>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              enrollment.caqhStatus === 'Active' 
                                ? 'bg-green-100 text-green-700 border-green-200' 
                                : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                            }>
                              {enrollment.caqhStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getEnrollmentStatusBadge(enrollment.status)}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              Review
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Claims Review View */}
            {activeView === 'claims' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Claims Processing</CardTitle>
                  <CardDescription>Review and approve provider claims</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {claims.map((claim) => (
                      <div key={claim.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-slate-900">{claim.patientName}</p>
                            <p className="text-sm text-slate-600">Claim ID: {claim.id} • Provider: {claim.provider}</p>
                          </div>
                          {getClaimStatusBadge(claim.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4 text-sm text-slate-600">
                            <span>Amount: ${claim.amount?.toLocaleString()}</span>
                            <span>Date: {claim.dateCreated}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            Review <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payments View */}
            {activeView === 'payments' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Provider Payments</CardTitle>
                  <CardDescription>Process provider reimbursements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentQueue.map((payment) => (
                      <div key={payment.id} className="p-4 bg-purple-50/50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-slate-900">{payment.provider}</p>
                            <p className="text-sm text-slate-600">{payment.claimCount} claims • Due: {payment.dueDate}</p>
                          </div>
                          <Badge className={
                            payment.status === 'Ready' 
                              ? 'bg-green-100 text-green-700 border-green-200' 
                              : 'bg-blue-100 text-blue-700 border-blue-200'
                          }>
                            {payment.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl text-slate-900">${payment.amount.toLocaleString()}</p>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Process Payment
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription className="text-purple-50">Real-time statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    <span>Total Providers</span>
                  </div>
                  <span className="text-2xl">{providerEnrollments.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    <span>Total Claims</span>
                  </div>
                  <span className="text-2xl">{claims.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Payment Queue</span>
                  </div>
                  <span className="text-2xl">${(totalPaymentAmount / 1000).toFixed(0)}k</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveView('enrollments')}>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Review Enrollments
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveView('claims')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Process Claims
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveView('payments')}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Process Payments
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Healthcare Image */}
            <Card className="shadow-lg overflow-hidden">
              <div className="relative h-48">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1618044733300-9472054094ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2hhcnRzJTIwaGVhbHRoY2FyZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjM1ODU1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Healthcare analytics"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm mb-1">Data-Driven Healthcare</p>
                  <p className="text-white/80 text-xs">Managing Montana Medicaid with precision</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}