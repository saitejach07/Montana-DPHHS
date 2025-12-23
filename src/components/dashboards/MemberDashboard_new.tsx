import { useState, useMemo } from 'react';
import { ShieldCheck as Shield, LogOut, Users, UserPlus, Bell, Settings, Search, FileText, Activity, Clock, Building2, TrendingUp, ArrowRight, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../Fallback_Img/ImageWithFallback';
import { MemberClaimProcessing } from '../member/MemberClaimProcessing';
import { PatientEditModal, type PatientData } from '../member/PatientEditModal';
import { PatientStatusBadge } from '../shared/PatientStatusBadge';
import { toast } from 'sonner';
import type { User, Provider, Claim } from '../../App';

interface MemberDashboardProps {
  user: User;
  onLogout: () => void;
  onViewPatient: (patientId: string) => void;
  onViewMemberClaimReview: (claimId: string) => void;
  patients: PatientData[];
  onUpdatePatient: (updatedPatient: PatientData) => void;
  onAddPatient: (newPatient: PatientData) => void;
  providers: Provider[];
  claims: Claim[];
}

export function MemberDashboard({ user, onLogout, onViewPatient, onViewMemberClaimReview, patients, onUpdatePatient, onAddPatient, providers, claims }: MemberDashboardProps) {
  const [showAdmitDialog, setShowAdmitDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedPatientForEdit, setSelectedPatientForEdit] = useState<PatientData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending' | 'Discharged'>('All');
  const [activeView, setActiveView] = useState<'patients' | 'claims' | 'pending' | 'active'>('patients');

  // Calculate statistics
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'Active').length;
  const pendingAdmissions = patients.filter(p => p.status === 'Pending').length;
  const dischargedPatients = patients.filter(p => p.status === 'Discharged').length;
  
  const claimsAwaitingReview = claims.filter(c => c.status === 'Awaiting Member Review').length;
  const claimsInProgress = claims.filter(c => c.status === 'In Progress').length;
  const claimsSubmitted = claims.filter(c => c.status === 'Submitted to Insurance').length;

  // Filter patients
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.insurance.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [patients, searchQuery, statusFilter]);

  const handleEditPatient = (patient: PatientData) => {
    setSelectedPatientForEdit(patient);
    setShowEditDialog(true);
  };

  const handleAdmitPatient = (newPatient: PatientData) => {
    onAddPatient(newPatient);
    setShowAdmitDialog(false);
    toast.success('Patient admitted successfully');
  };

  const handleUpdatePatient = (updatedPatient: PatientData) => {
    onUpdatePatient(updatedPatient);
    setShowEditDialog(false);
    toast.success('Patient information updated successfully');
  };

  const handleStatusChange = (patientId: string, newStatus: 'Active' | 'Pending' | 'Discharged') => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      const updatedPatient = { ...patient, status: newStatus };
      onUpdatePatient(updatedPatient);
      toast.success(`Patient status updated to ${newStatus}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900 text-2xl">Member Portal</h1>
                <p className="text-slate-600">Hospital Administrative Staff</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-slate-600" />
                {claimsAwaitingReview > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5 text-slate-600" />
              </Button>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-purple-200">
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm text-slate-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-slate-600">Administrative Staff</p>
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
        <Card className="mb-8 overflow-hidden border-0 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div className="p-8">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">Member Dashboard</Badge>
                <h2 className="text-white text-3xl mb-2">Welcome, {user.firstName}</h2>
                <p className="text-purple-50 text-lg mb-6">
                  You have {pendingAdmissions} pending admissions and {claimsAwaitingReview} claims awaiting review.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-white text-purple-600 hover:bg-purple-50">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Admit Patient
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Quick Actions
                  </Button>
                </div>
              </div>
              <div className="relative h-[280px] hidden lg:block">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1654762930571-dcf2ebc11542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGFkbWluaXN0cmF0aXZlJTIwc3RhZmZ8ZW58MXx8fHwxNzYzNTg1NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Hospital staff"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-transparent"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-purple-300" onClick={() => setActiveView('patients')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <Badge variant="outline" className="text-xs">Total</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{totalPatients}</CardTitle>
              <CardDescription>Total Patients</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-green-300" onClick={() => setActiveView('active')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Active</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{activePatients}</CardTitle>
              <CardDescription>Active Patients</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50">
                Manage <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-yellow-300" onClick={() => setActiveView('pending')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">Pending</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{pendingAdmissions}</CardTitle>
              <CardDescription>Pending Admissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50">
                Review <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-300" onClick={() => setActiveView('claims')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">Claims</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{claimsAwaitingReview}</CardTitle>
              <CardDescription>Claims to Review</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                Process <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {activeView === 'patients' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl">Patient Management</CardTitle>
                      <CardDescription>Manage all admitted patients</CardDescription>
                    </div>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setShowAdmitDialog(true)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Admit Patient
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search patients..."
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
                        <TableHead>Patient</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Admitted</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((patient) => (
                        <TableRow key={patient.id} className="hover:bg-purple-50/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10 border-2 border-purple-200">
                                <AvatarFallback className="bg-purple-100 text-purple-700">
                                  {patient.firstName[0]}{patient.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-slate-900">{patient.name}</p>
                                <p className="text-sm text-slate-600">{patient.insurance}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-slate-900">{patient.assignedProvider}</p>
                          </TableCell>
                          <TableCell>
                            <PatientStatusBadge status={patient.status} />
                          </TableCell>
                          <TableCell>
                            <p className="text-slate-900">{patient.admitted}</p>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => onViewPatient(patient.id)}
                              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                            >
                              View
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

            {activeView === 'claims' && (
              <MemberClaimProcessing 
                claims={claims}
                onViewClaimDetails={onViewMemberClaimReview}
              />
            )}

            {activeView === 'pending' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Pending Admissions</CardTitle>
                  <CardDescription>Patients awaiting admission approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patients.filter(p => p.status === 'Pending').map((patient) => (
                      <div key={patient.id} className="p-4 bg-yellow-50/50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12 border-2 border-yellow-200">
                              <AvatarFallback className="bg-yellow-100 text-yellow-700">
                                {patient.firstName[0]}{patient.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-slate-900">{patient.name}</p>
                              <p className="text-sm text-slate-600">Admitted: {patient.admitted}</p>
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleStatusChange(patient.id, 'Active')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeView === 'active' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Active Patients</CardTitle>
                  <CardDescription>Currently admitted and receiving care</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patients.filter(p => p.status === 'Active').map((patient) => (
                      <div key={patient.id} className="p-4 bg-green-50/50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12 border-2 border-green-200">
                              <AvatarFallback className="bg-green-100 text-green-700">
                                {patient.firstName[0]}{patient.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-slate-900">{patient.name}</p>
                              <p className="text-sm text-slate-600">{patient.assignedProvider}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onViewPatient(patient.id)}
                            className="border-green-300 text-green-600 hover:bg-green-50"
                          >
                            View Details
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
            {/* Claims Overview */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              <CardHeader>
                <CardTitle>Claims Overview</CardTitle>
                <CardDescription className="text-blue-50">Current status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Awaiting Review</span>
                  </div>
                  <span className="text-2xl">{claimsAwaitingReview}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    <span>In Progress</span>
                  </div>
                  <span className="text-2xl">{claimsInProgress}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Submitted</span>
                  </div>
                  <span className="text-2xl">{claimsSubmitted}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowAdmitDialog(true)}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Admit New Patient
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Process Claims
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Healthcare Image */}
            <Card className="shadow-lg overflow-hidden">
              <div className="relative h-48">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758574437870-f83c160efd82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVhbXdvcmslMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2MzU4NTU3Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Healthcare teamwork"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm mb-1">Team Collaboration</p>
                  <p className="text-white/80 text-xs">Working together for better patient outcomes</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Admit Patient Dialog */}
      {showAdmitDialog && (
        <PatientEditModal
          mode="add"
          providers={providers}
          onSave={handleAdmitPatient}
          onClose={() => setShowAdmitDialog(false)}
        />
      )}

      {/* Edit Patient Dialog */}
      {showEditDialog && selectedPatientForEdit && (
        <PatientEditModal
          mode="edit"
          patient={selectedPatientForEdit}
          providers={providers}
          onSave={handleUpdatePatient}
          onClose={() => {
            setShowEditDialog(false);
            setSelectedPatientForEdit(null);
          }}
        />
      )}
    </div>
  );
}
