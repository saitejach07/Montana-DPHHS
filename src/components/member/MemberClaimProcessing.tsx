import { useState } from 'react';
import { FileText, Clock, Send, Eye, Search, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { getClaimStatusColor, type Claim } from '../../types/claim';
import type { Claim as AppClaim } from '../../App';

interface MemberClaimProcessingProps {
  onReviewClaim: (claimId: string) => void;
  claims?: AppClaim[];
}

// Mock data - claims pending admin review
const mockPendingClaims: Partial<Claim>[] = [
  {
    id: 'CLM-2025-004',
    patientName: 'Sarah Johnson',
    providerName: 'Dr. John Smith',
    visitDate: '2025-11-15',
    serviceType: 'Outpatient',
    status: 'Pending Admin Review',
    createdDate: '2025-11-15',
    insuranceProvider: 'Blue Cross Blue Shield',
  },
  {
    id: 'CLM-2025-005',
    patientName: 'Michael Chen',
    providerName: 'Dr. Emily Williams',
    visitDate: '2025-11-14',
    serviceType: 'Lab',
    status: 'Pending Admin Review',
    createdDate: '2025-11-14',
    insuranceProvider: 'Aetna',
  },
  {
    id: 'CLM-2025-006',
    patientName: 'Robert Martinez',
    providerName: 'Dr. John Smith',
    visitDate: '2025-11-13',
    serviceType: 'Emergency',
    status: 'Pending Admin Review',
    createdDate: '2025-11-13',
    insuranceProvider: 'UnitedHealthcare',
  },
];

const mockInReviewClaims: Partial<Claim>[] = [
  {
    id: 'CLM-2025-003',
    patientName: 'Emily Davis',
    providerName: 'Dr. Sarah Lee',
    visitDate: '2025-11-12',
    serviceType: 'Radiology',
    status: 'In Admin Review',
    createdDate: '2025-11-12',
    insuranceProvider: 'Cigna',
    billAmount: 1200,
  },
];

export function MemberClaimProcessing({ onReviewClaim, claims = [] }: MemberClaimProcessingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  // Calculate dynamic claim statistics
  const awaitingReviewCount = claims.filter(c => c.status === 'Awaiting Member Review').length;
  const submittedCount = claims.filter(c => c.status === 'Submitted to Insurance').length;
  const approvedCount = claims.filter(c => c.status === 'Approved').length;
  const deniedCount = claims.filter(c => c.status === 'Denied').length;

  // Get actual pending and completed claims
  const pendingClaims = claims.filter(c => c.status === 'Awaiting Member Review');
  const completedClaims = claims.filter(c => c.status === 'Submitted to Insurance' || c.status === 'Approved' || c.status === 'Denied');

  const filteredPendingClaims = pendingClaims.filter(
    claim =>
      claim.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.provider?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedClaims = completedClaims.filter(
    claim =>
      claim.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.provider?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler functions for navigation
  const handleViewAwaitingReview = () => {
    setActiveTab('active');
    // Scroll to pending claims section after a brief delay to allow tab switch
    setTimeout(() => {
      document.getElementById('pending-claims-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleViewCompleted = () => {
    setActiveTab('completed');
    setTimeout(() => {
      document.getElementById('completed-claims-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900 mb-2">Claims Processing</h2>
        <p className="text-slate-600">Review and finalize claims from providers before submitting to insurance</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Awaiting Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{awaitingReviewCount}</div>
            <p className="text-slate-500">New from providers</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-3 w-full"
              onClick={handleViewAwaitingReview}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-600 flex items-center gap-2">
              <Send className="w-4 h-4" />
              Submitted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-600">{submittedCount}</div>
            <p className="text-slate-500">Sent to insurance</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-3 w-full"
              onClick={handleViewCompleted}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-600">{approvedCount}</div>
            <p className="text-slate-500">Accepted by insurance</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-3 w-full"
              onClick={handleViewCompleted}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-red-600">{deniedCount}</div>
            <p className="text-slate-500">Rejected by insurance</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-3 w-full"
              onClick={handleViewCompleted}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by patient, claim ID, or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="active">Active Claims</TabsTrigger>
          <TabsTrigger value="completed">Completed Claims</TabsTrigger>
        </TabsList>

        {/* Pending Claims from Providers */}
        <TabsContent value="active">
          <Card id="pending-claims-section">
            <CardHeader>
              <CardTitle>Pending Claims from Providers</CardTitle>
              <CardDescription>Claims initiated by doctors requiring administrative review and billing</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredPendingClaims.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No pending claims found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Visit Date</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Insurance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPendingClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell>
                          <code className="text-slate-700">{claim.id}</code>
                        </TableCell>
                        <TableCell>{claim.patientName}</TableCell>
                        <TableCell>{claim.provider}</TableCell>
                        <TableCell>{claim.dateCreated}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {claim.procedureCode ? `Procedure ${claim.procedureCode}` : 'Consultation'}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate">
                          {claim.insurance || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                            {claim.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => onReviewClaim(claim.id!)}
                            className="bg-teal-600 hover:bg-teal-700"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Review & Finalize
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Completed Claims */}
        <TabsContent value="completed">
          <Card id="completed-claims-section">
            <CardHeader>
              <CardTitle>Completed Claims</CardTitle>
              <CardDescription>Claims that have been submitted to insurance</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredCompletedClaims.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No completed claims found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Insurance</TableHead>
                      <TableHead>Bill Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompletedClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell>
                          <code className="text-slate-700">{claim.id}</code>
                        </TableCell>
                        <TableCell>{claim.patientName}</TableCell>
                        <TableCell>{claim.provider}</TableCell>
                        <TableCell className="max-w-[150px] truncate">
                          {claim.insurance || '-'}
                        </TableCell>
                        <TableCell>
                          {claim.amount && claim.amount > 0 ? (
                            <span className="text-green-700">${claim.amount.toLocaleString()}</span>
                          ) : (
                            <span className="text-slate-400">Not set</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getClaimStatusColor(claim.status)}>
                            {claim.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Workflow Info */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-900">Your Role in the Claims Workflow</CardTitle>
        </CardHeader>
        <CardContent className="text-purple-800 space-y-2">
          <p>• <strong>Providers</strong> initiate claims with clinical documentation only</p>
          <p>• <strong>You (Admin Staff)</strong> add billing details and submit to insurance</p>
          <p>• <strong>Insurance Companies</strong> review and approve/deny claims</p>
          <p className="pt-2 text-sm border-t border-purple-200 mt-3">
            You are the bridge between clinical and insurance teams. Ensure all billing information is accurate before submission.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}