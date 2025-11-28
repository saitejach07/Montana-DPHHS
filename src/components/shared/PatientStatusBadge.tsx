import { Badge } from '../ui/badge';

export type PatientStatus = 'Pending' | 'Active' | 'Completed' | 'Follow-Up' | 'Inactive';

interface PatientStatusBadgeProps {
  status: PatientStatus | string;
  className?: string;
}

export function PatientStatusBadge({ status, className = '' }: PatientStatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Completed':
      case 'Completed / Discharged':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Follow-Up':
      case 'Follow-Up / Re-Admitted':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Inactive':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getStatusLabel = (status: string) => {
    if (status === 'Completed') return 'Completed / Discharged';
    if (status === 'Follow-Up') return 'Follow-Up / Re-Admitted';
    return status;
  };

  return (
    <Badge variant="outline" className={`${getStatusColor(status)} ${className}`}>
      {getStatusLabel(status)}
    </Badge>
  );
}
