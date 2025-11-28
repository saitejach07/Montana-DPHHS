import { ShieldCheck as Shield, LogOut, User as UserIcon, Calendar, FileText, AlertCircle, CheckCircle, Clock, Stethoscope, Bell, Settings, Receipt, TrendingUp, ArrowRight, ChevronRight, CalendarCheck, Activity, Search, Users, X, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { EmptyState } from '../EmptyState';
import { useState } from 'react';
import type { User, Claim } from '../../App';
import type { PatientData } from '../member/PatientEditModal';

interface ProviderDashboardProps {
  user: User;
  onLogout: () => void;
  onViewPatient: (patientId: string) => void;
  onViewProviderPatientProfile: (patientId: string) => void;
  onViewClaimHistory: () => void;
  patients: PatientData[];
  claims: Claim[];
}

export function ProviderDashboard({ user, onLogout, onViewPatient, onViewProviderPatientProfile, onViewClaimHistory, patients, claims }: ProviderDashboardProps) {
  const [activeView, setActiveView] = useState<'allpatients' | 'patients' | 'appointments' | 'followup' | 'seenthisweek' | 'claims'>('allpatients');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for appointments
  const [appointments, setAppointments] = useState([
    { id: '1', patientId: '1', patient: 'Sarah Johnson', time: '09:00 AM', type: 'Follow-up', completed: false },
    { id: '2', patientId: '2', patient: 'Michael Chen', time: '10:30 AM', type: 'Consultation', completed: true },
    { id: '3', patientId: '4', patient: 'Robert Wilson', time: '02:00 PM', type: 'Check-up', completed: false },
  ]);

  // Function to mark appointment as completed
  const markAppointmentCompleted = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, completed: true } : apt
      )
    );
  };

  // Function to mark appointment as no show
  const markAppointmentNoShow = (appointmentId: string) => {
    setAppointments(prev => 
      prev.filter(apt => apt.id !== appointmentId)
    );
  };

  // Filter patients assigned to this provider (Dr. Smith in this case)
  const myPatients = patients.filter(p => p.assignedProvider === 'Dr. Smith');
  
  // Calculate new patients this week (admitted in last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const newPatientsThisWeek = myPatients.filter(p => {
    if (!p.admitted) return false;
    const admittedDate = new Date(p.admitted);
    return admittedDate >= weekAgo;
  }).length;

  // Calculate patients requiring follow-up
  const patientsRequiringFollowUp = myPatients.filter(p => p.followUpRequired === true);
  const upcomingFollowUps = patientsRequiringFollowUp.filter(p => {
    if (!p.followUpDate) return false;
    const followUpDate = new Date(p.followUpDate);
    const today = new Date();
    // Show follow-ups within next 7 days
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return followUpDate >= today && followUpDate <= weekFromNow;
  }).length;

  // Calculate patients seen this week
  const patientsSeenThisWeek = myPatients.filter(p => {
    if (!p.lastSeenDate) return false;
    const lastSeenDate = new Date(p.lastSeenDate);
    return lastSeenDate >= weekAgo;
  });

  // Get provider's claims
  const myClaims = claims.filter(c => c.provider === 'Dr. John Smith' || c.provider === 'Dr. Smith');
  const activeClaims = myClaims.filter(c => 
    c.status === 'Draft' || 
    c.status === 'Awaiting Member Review' || 
    c.status === 'In Progress'
  );

  // Dynamic appointments stats
  const todaysAppointments = appointments.length;
  const completedAppointments = appointments.filter(a => a.completed).length;
  const pendingAppointments = appointments.filter(a => !a.completed).length;

  // Filter patients based on search
  const filteredPatients = myPatients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900 text-2xl">Provider Portal</h1>
                <p className="text-slate-600">Welcome, Dr. {user.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5 text-slate-600" />
              </Button>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-teal-200">
                  <AvatarFallback className="bg-teal-100 text-teal-700">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm text-slate-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-slate-600">Healthcare Provider</p>
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
        {/* Hero Banner with Background Image */}
        <Card className="mb-8 overflow-hidden border-0 shadow-xl relative">
          <CardContent className="p-0">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1758206523745-1f334f702660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhlYWx0aGNhcmUlMjBwcm9mZXNzaW9uYWxzfGVufDF8fHx8MTc2MzQ3ODIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthcare Professionals"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600"></div>
            
            <div className="relative grid lg:grid-cols-2 gap-6 items-center">
              <div className="p-8">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">Provider Dashboard</Badge>
                <h2 className="text-white text-3xl mb-2">Good Morning, Dr. {user.lastName}</h2>
                <p className="text-teal-50 text-lg mb-6">
                  You have {pendingAppointments} pending appointments and {activeClaims.length} active claims today.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-white text-teal-600 hover:bg-teal-50">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Quick Actions
                  </Button>
                </div>
              </div>
              <div className="relative h-[280px] hidden lg:block">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758691463626-0ab959babe00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MzU1MjA2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Medical professional"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-transparent"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* All Patients */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-teal-300" onClick={() => setActiveView('allpatients')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{myPatients.length}</CardTitle>
              <CardDescription>All Patients</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Patients Seen This Week */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-300" onClick={() => setActiveView('seenthisweek')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-xs">This Week</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{patientsSeenThisWeek.length}</CardTitle>
              <CardDescription>Patients Seen</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                View Details <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Follow-ups Required */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-orange-300" onClick={() => setActiveView('followup')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
                <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">Urgent</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{upcomingFollowUps}</CardTitle>
              <CardDescription>Follow-ups Due</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                Review <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-purple-300" onClick={() => setActiveView('appointments')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <Badge variant="outline" className="text-xs">Today</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{todaysAppointments}</CardTitle>
              <CardDescription>Appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                View Schedule <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Active Claims */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-green-300" onClick={() => setActiveView('claims')}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <Receipt className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs border-green-300 text-green-700">Active</Badge>
              </div>
              <CardTitle className="text-3xl text-slate-900">{activeClaims.length}</CardTitle>
              <CardDescription>Active Claims</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50">
                Manage <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* All Patients View */}
            {activeView === 'allpatients' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">All Patients</CardTitle>
                      <CardDescription>Manage your assigned patients</CardDescription>
                    </div>
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Users className="w-4 h-4 mr-2" />
                      Add Patient
                    </Button>
                  </div>
                  <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search patients by name..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredPatients.length === 0 ? (
                    <EmptyState
                      icon={Users}
                      title="No Patients Found"
                      description={searchQuery ? "No patients match your search criteria. Try adjusting your search." : "You don't have any patients assigned yet. Start by adding your first patient."}
                      actionLabel={!searchQuery ? "Add Patient" : undefined}
                      onAction={!searchQuery ? () => {} : undefined}
                      variant="provider"
                      imageSrc="https://images.unsplash.com/photo-1617963656226-41ae10af91ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMGRlc2slMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYzNTkzNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    />
                  ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Insurance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Visit</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((patient) => (
                        <TableRow key={patient.id} className="hover:bg-teal-50/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10 border-2 border-teal-200">
                                <AvatarFallback className="bg-teal-100 text-teal-700">
                                  {patient.firstName[0]}{patient.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-slate-900">{patient.name}</p>
                                <p className="text-sm text-slate-600">{patient.age} years, {patient.gender}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-slate-900">{patient.insurance}</p>
                              <p className="text-sm text-slate-600">{patient.insuranceId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              patient.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' :
                              patient.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                              'bg-slate-100 text-slate-700 border-slate-200'
                            }>
                              {patient.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <p className="text-slate-900">{patient.lastSeenDate || 'N/A'}</p>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => onViewProviderPatientProfile(patient.id)}
                              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                            >
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Patients Seen This Week View */}
            {activeView === 'seenthisweek' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Patients Seen This Week</CardTitle>
                  <CardDescription>Patients you've consulted in the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patientsSeenThisWeek.map((patient) => (
                      <div key={patient.id} className="p-4 bg-blue-50/50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12 border-2 border-blue-200">
                              <AvatarFallback className="bg-blue-100 text-blue-700">
                                {patient.firstName[0]}{patient.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-slate-900">{patient.name}</p>
                              <p className="text-sm text-slate-600">Last seen: {patient.lastSeenDate}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onViewProviderPatientProfile(patient.id)}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Follow-ups View */}
            {activeView === 'followup' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Follow-ups Required</CardTitle>
                  <CardDescription>Patients requiring follow-up appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patientsRequiringFollowUp.map((patient) => (
                      <div key={patient.id} className="p-4 bg-orange-50/50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12 border-2 border-orange-200">
                              <AvatarFallback className="bg-orange-100 text-orange-700">
                                {patient.firstName[0]}{patient.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-slate-900">{patient.name}</p>
                              <p className="text-sm text-slate-600">Follow-up: {patient.followUpDate}</p>
                              <p className="text-sm text-orange-700">{patient.followUpReason}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onViewProviderPatientProfile(patient.id)}
                            className="border-orange-300 text-orange-600 hover:bg-orange-50"
                          >
                            Schedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Today's Appointments View */}
            {activeView === 'appointments' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Today's Appointments</CardTitle>
                  <CardDescription>Wednesday, November 19, 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className={`p-4 border rounded-lg transition-all ${
                        appointment.completed 
                          ? 'bg-green-50/50 border-green-200' 
                          : 'bg-purple-50/50 border-purple-200 hover:shadow-md'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-slate-900">{appointment.patient}</p>
                              <p className="text-sm text-slate-600">{appointment.time} • {appointment.type}</p>
                            </div>
                          </div>
                          {appointment.completed ? (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          ) : (
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                              Pending
                            </Badge>
                          )}
                        </div>
                        {!appointment.completed && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 text-white flex-1"
                              onClick={() => markAppointmentCompleted(appointment.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Mark as Completed
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-slate-300 text-slate-600 hover:bg-slate-50"
                              onClick={() => markAppointmentNoShow(appointment.id)}
                            >
                              <X className="w-4 h-4 mr-1" />
                              No Show
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Claims View */}
            {activeView === 'claims' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Active Claims</CardTitle>
                      <CardDescription>Claims requiring your attention</CardDescription>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={onViewClaimHistory}
                      className="border-green-300 text-green-600 hover:bg-green-50"
                    >
                      View All Claims
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {activeClaims.length === 0 ? (
                    <EmptyState
                      icon={Receipt}
                      title="No Active Claims"
                      description="You don't have any active claims at the moment. Create a new claim to get started."
                      actionLabel="Create New Claim"
                      onAction={() => {}}
                      variant="provider"
                    />
                  ) : (
                  <div className="space-y-4">
                    {activeClaims.map((claim) => (
                      <div key={claim.id} className="p-4 bg-green-50/50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-slate-900">{claim.patientName}</p>
                            <p className="text-sm text-slate-600">Claim ID: {claim.id}</p>
                          </div>
                          <Badge className={
                            claim.status === 'Draft' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                            claim.status === 'Awaiting Member Review' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                            'bg-blue-100 text-blue-700 border-blue-200'
                          }>
                            {claim.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4 text-sm text-slate-600">
                            <span>Amount: ${claim.amount?.toLocaleString()}</span>
                            <span>Created: {claim.dateCreated}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-100">
                            View Details <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-teal-500 to-blue-500 text-white">
              <CardHeader>
                <CardTitle>Today's Overview</CardTitle>
                <CardDescription className="text-teal-50">Wednesday, Nov 19</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Appointments</span>
                  </div>
                  <span className="text-2xl">{todaysAppointments}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Completed</span>
                  </div>
                  <span className="text-2xl">{completedAppointments}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Pending</span>
                  </div>
                  <span className="text-2xl">{pendingAppointments}</span>
                </div>
              </CardContent>
            </Card>

            {/* CAQH Status */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-600" />
                  CAQH Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-slate-900">Connected & Verified</p>
                    <p className="text-sm text-slate-600">Last synced: Today</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  Sync CAQH Data
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Note
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="w-4 h-4 mr-2" />
                  Initiate Claim
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Add New Patient
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity Image */}
            <Card className="shadow-lg overflow-hidden">
              <div className="relative h-48">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1721114989769-0423619f03d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRpZW50JTIwY2FyZSUyMGhvc3BpdGFsfGVufDF8fHx8MTc2MzU3MDU5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Patient care"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm mb-1">Healthcare Excellence</p>
                  <p className="text-white/80 text-xs">Providing quality care to our patients</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}