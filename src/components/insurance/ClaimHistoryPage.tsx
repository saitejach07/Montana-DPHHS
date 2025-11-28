import { useState } from 'react';
import { Search, Filter, FileText, Download, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import type { UserRole } from '../../App';

interface ClaimHistoryPageProps {
  userRole: UserRole;
  onBack: () => void;
  onViewClaim?: (claimId: string) => void;
}

const mockClaimHistory = [
  { id: 'CLM-2025-001', patient: 'Sarah Johnson', provider: 'Dr. Smith', amount: 450, status: 'Approved', serviceType: 'Outpatient', submittedDate: '2025-11-12', decisionDate: '2025-11-14' },
  { id: 'CLM-2025-002', patient: 'Michael Chen', provider: 'Dr. Johnson', amount: 1200, status: 'Pending', serviceType: 'Lab', submittedDate: '2025-11-13', decisionDate: null },
  { id: 'CLM-2025-003', patient: 'Emily Davis', provider: 'Dr. Williams', amount: 850, status: 'Under Review', serviceType: 'Radiology', submittedDate: '2025-11-10', decisionDate: null },
  { id: 'CLM-2025-004', patient: 'Robert Wilson', provider: 'Dr. Smith', amount: 320, status: 'Approved', serviceType: 'Outpatient', submittedDate: '2025-11-09', decisionDate: '2025-11-11' },
  { id: 'CLM-2025-005', patient: 'Linda Martinez', provider: 'Dr. Brown', amount: 2100, status: 'Denied', serviceType: 'Inpatient', submittedDate: '2025-11-08', decisionDate: '2025-11-12' },
  { id: 'CLM-2025-006', patient: 'James Anderson', provider: 'Dr. Davis', amount: 540, status: 'Need More Info', serviceType: 'Pharmacy', submittedDate: '2025-11-07', decisionDate: null },
  { id: 'CLM-2025-007', patient: 'Patricia Taylor', provider: 'Dr. Wilson', amount: 980, status: 'Approved', serviceType: 'Emergency', submittedDate: '2025-11-06', decisionDate: '2025-11-08' },
  { id: 'CLM-2025-008', patient: 'David Moore', provider: 'Dr. Smith', amount: 420, status: 'Approved', serviceType: 'Outpatient', submittedDate: '2025-11-05', decisionDate: '2025-11-07' },
];

export function ClaimHistoryPage({ userRole, onBack, onViewClaim }: ClaimHistoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30days');

  const getStatusBadge = (status: string) => {
    const configs: Record<string, string> = {
      'Approved': 'bg-green-100 text-green-800 border-green-300',
      'Pending': 'bg-amber-100 text-amber-800 border-amber-300',
      'Under Review': 'bg-blue-100 text-blue-800 border-blue-300',
      'Denied': 'bg-red-100 text-red-800 border-red-300',
      'Need More Info': 'bg-orange-100 text-orange-800 border-orange-300',
    };
    return <Badge className={configs[status] || 'bg-slate-100 text-slate-800'}>{status}</Badge>;
  };

  const filteredClaims = mockClaimHistory.filter(claim => {
    const matchesSearch = searchQuery === '' || 
      claim.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    const matchesServiceType = serviceTypeFilter === 'all' || claim.serviceType === serviceTypeFilter;
    
    return matchesSearch && matchesStatus && matchesServiceType;
  });

  const totalAmount = filteredClaims.reduce((sum, claim) => sum + claim.amount, 0);
  const approvedCount = filteredClaims.filter(c => c.status === 'Approved').length;
  const pendingCount = filteredClaims.filter(c => c.status === 'Pending' || c.status === 'Under Review').length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-900 mb-2">Claim History</h1>
            <p className="text-slate-600">Complete history of all submitted claims</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-600">Total Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-900">{filteredClaims.length}</div>
              <p className="text-slate-500">In selected period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-600">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-green-600">{approvedCount}</div>
              <p className="text-slate-500">{((approvedCount / filteredClaims.length) * 100).toFixed(0)}% approval rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-600">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-amber-600">{pendingCount}</div>
              <p className="text-slate-500">Awaiting decision</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-600">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-900">${totalAmount.toLocaleString()}</div>
              <p className="text-slate-500">Claims value</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Claims</CardTitle>
            <CardDescription>Search and filter claim history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search by claim ID, patient, or provider..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Denied">Denied</SelectItem>
                  <SelectItem value="Need More Info">Need More Info</SelectItem>
                </SelectContent>
              </Select>

              {/* Service Type Filter */}
              <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Service Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Service Types</SelectItem>
                  <SelectItem value="Inpatient">Inpatient</SelectItem>
                  <SelectItem value="Outpatient">Outpatient</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Lab">Laboratory</SelectItem>
                  <SelectItem value="Radiology">Radiology</SelectItem>
                  <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Claims Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Claims ({filteredClaims.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Decision Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell>
                      <code className="text-slate-700">{claim.id}</code>
                    </TableCell>
                    <TableCell>{claim.patient}</TableCell>
                    <TableCell>{claim.provider}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{claim.serviceType}</Badge>
                    </TableCell>
                    <TableCell>${claim.amount.toLocaleString()}</TableCell>
                    <TableCell>{claim.submittedDate}</TableCell>
                    <TableCell>
                      {claim.decisionDate || <span className="text-slate-400">—</span>}
                    </TableCell>
                    <TableCell>{getStatusBadge(claim.status)}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewClaim && onViewClaim(claim.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}