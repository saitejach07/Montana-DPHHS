import { useState } from 'react';
import { FileText, DollarSign, Calendar, Send, Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';

interface ClaimSubmissionModalProps {
  open: boolean;
  onClose: () => void;
  patientName: string;
  insuranceProvider: string;
  memberId: string;
  onSubmit: (claimData: any) => void;
}

export function ClaimSubmissionModal({
  open,
  onClose,
  patientName,
  insuranceProvider,
  memberId,
  onSubmit,
}: ClaimSubmissionModalProps) {
  const [visitDate, setVisitDate] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [clinicalSummary, setClinicalSummary] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>(['']);
  const [procedureCodes, setProcedureCodes] = useState<string[]>(['']);

  const handleAddDiagnosis = () => {
    setDiagnosisCodes([...diagnosisCodes, '']);
  };

  const handleRemoveDiagnosis = (index: number) => {
    setDiagnosisCodes(diagnosisCodes.filter((_, i) => i !== index));
  };

  const handleDiagnosisChange = (index: number, value: string) => {
    const updated = [...diagnosisCodes];
    updated[index] = value;
    setDiagnosisCodes(updated);
  };

  const handleAddProcedure = () => {
    setProcedureCodes([...procedureCodes, '']);
  };

  const handleRemoveProcedure = (index: number) => {
    setProcedureCodes(procedureCodes.filter((_, i) => i !== index));
  };

  const handleProcedureChange = (index: number, value: string) => {
    const updated = [...procedureCodes];
    updated[index] = value;
    setProcedureCodes(updated);
  };

  const handleSubmit = () => {
    const claimData = {
      patientName,
      insuranceProvider,
      memberId,
      visitDate,
      serviceType,
      billAmount: parseFloat(billAmount),
      clinicalSummary,
      diagnosisCodes: diagnosisCodes.filter(code => code.trim() !== ''),
      procedureCodes: procedureCodes.filter(code => code.trim() !== ''),
      status: 'Pending Review',
      submittedDate: new Date().toISOString().split('T')[0],
    };
    onSubmit(claimData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Insurance Claim</DialogTitle>
          <DialogDescription>
            Submit a new claim for {patientName} to {insuranceProvider}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Visit Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Calendar className="w-5 h-5 text-teal-600" />
              <h3 className="text-slate-900">Visit Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visitDate">Date of Service *</Label>
                <Input
                  id="visitDate"
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inpatient">Inpatient</SelectItem>
                    <SelectItem value="outpatient">Outpatient</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="lab">Laboratory</SelectItem>
                    <SelectItem value="radiology">Radiology</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="therapy">Therapy/Rehabilitation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Diagnosis Codes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Diagnosis Codes (ICD-10) *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddDiagnosis}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Code
                </Button>
              </div>
              <div className="space-y-2">
                {diagnosisCodes.map((code, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., I10 (Essential hypertension)"
                      value={code}
                      onChange={(e) => handleDiagnosisChange(index, e.target.value)}
                    />
                    {diagnosisCodes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDiagnosis(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Procedure Codes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Procedure Codes (CPT/HCPCS) *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddProcedure}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Code
                </Button>
              </div>
              <div className="space-y-2">
                {procedureCodes.map((code, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., 99213 (Office visit)"
                      value={code}
                      onChange={(e) => handleProcedureChange(index, e.target.value)}
                    />
                    {procedureCodes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProcedure(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Summary */}
            <div className="space-y-2">
              <Label htmlFor="clinicalSummary">Clinical Summary / Notes *</Label>
              <Textarea
                id="clinicalSummary"
                placeholder="Provide a summary of the visit, treatment provided, and medical necessity..."
                value={clinicalSummary}
                onChange={(e) => setClinicalSummary(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>

          {/* Billing Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <DollarSign className="w-5 h-5 text-teal-600" />
              <h3 className="text-slate-900">Billing Information</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="billAmount">Total Bill Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <Input
                  id="billAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="pl-7"
                  required
                />
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <FileText className="w-5 h-5 text-teal-600" />
              <h3 className="text-slate-900">Insurance Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Insurance Provider</Label>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <p className="text-slate-900">{insuranceProvider}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Member ID</Label>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <code className="text-slate-900">{memberId}</code>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900 mb-2">What happens after submission:</p>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Claim will be sent to {insuranceProvider} for review</li>
              <li>• Initial status will be set to "Pending Review"</li>
              <li>• You'll be notified when the insurance company updates the claim status</li>
              <li>• Processing typically takes 5-10 business days</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-teal-600 hover:bg-teal-700"
            disabled={!visitDate || !serviceType || !billAmount || !clinicalSummary}
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Claim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
