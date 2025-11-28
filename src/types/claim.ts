// Unified claim status system for the correct 3-step workflow
export type ClaimStatus = 
  | 'Draft' // Provider initiated, clinical info only
  | 'Pending Admin Review' // Sent to Member for finalization
  | 'In Admin Review' // Member is editing/adding billing
  | 'Submitted to Insurance' // Member submitted to insurance client
  | 'Pending Review' // Insurance is reviewing
  | 'Approved' // Insurance approved
  | 'Denied' // Insurance denied
  | 'More Info Needed'; // Insurance needs more information

export interface Claim {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  insuranceProvider: string;
  memberId: string;
  
  // Clinical information (filled by Provider)
  visitDate: string;
  serviceType: string;
  diagnosisCodes: string[];
  procedureCodes: string[];
  clinicalSummary: string;
  
  // Billing information (filled by Member)
  billAmount?: number;
  authorizationNumber?: string;
  coverageType?: string;
  billingNotes?: string;
  attachedDocuments?: string[];
  
  // Status tracking
  status: ClaimStatus;
  createdDate: string;
  initiatedByProvider?: string;
  submittedToAdminDate?: string;
  submittedToInsuranceDate?: string;
  reviewedDate?: string;
  decisionDate?: string;
  reviewNotes?: string;
}

export function getClaimStatusColor(status: ClaimStatus): string {
  const colors: Record<ClaimStatus, string> = {
    'Draft': 'bg-slate-100 text-slate-800 border-slate-300',
    'Pending Admin Review': 'bg-blue-100 text-blue-800 border-blue-300',
    'In Admin Review': 'bg-indigo-100 text-indigo-800 border-indigo-300',
    'Submitted to Insurance': 'bg-purple-100 text-purple-800 border-purple-300',
    'Pending Review': 'bg-amber-100 text-amber-800 border-amber-300',
    'Approved': 'bg-green-100 text-green-800 border-green-300',
    'Denied': 'bg-red-100 text-red-800 border-red-300',
    'More Info Needed': 'bg-orange-100 text-orange-800 border-orange-300',
  };
  return colors[status];
}
