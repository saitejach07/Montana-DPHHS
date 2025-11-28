import { useState } from 'react';
import { FileText, Calendar, Send, Plus, X, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';

interface ClaimInitiationModalProps {
  open: boolean;
  onClose: () => void;
  patientName: string;
  insuranceProvider: string;
  memberId: string;
  onInitiate: (claimData: any) => void;
}

export function ClaimInitiationModal({
  open,
  onClose,
  patientName,
  insuranceProvider,
  memberId,
  onInitiate,
}: ClaimInitiationModalProps) {
  const [visitDate, setVisitDate] = useState('');
  const [serviceType, setServiceType] = useState('');
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

  const handleInitiate = () => {
    const claimData = {
      patientName,
      insuranceProvider,
      memberId,
      visitDate,
      serviceType,
      clinicalSummary,
      diagnosisCodes: diagnosisCodes.filter(code => code.trim() !== ''),
      procedureCodes: procedureCodes.filter(code => code.trim() !== ''),
      status: 'Pending Admin Review',
      createdDate: new Date().toISOString().split('T')[0],
    };
    onInitiate(claimData);
    onClose();
    
    // Reset form
    setVisitDate('');
    setServiceType('');
    setClinicalSummary('');
    setDiagnosisCodes(['']);
    setProcedureCodes(['']);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Initiate Claim for Admin Processing</DialogTitle>
          <DialogDescription>
            Document clinical information for {patientName} - This will be sent to administrative staff for billing finalization
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Important Notice */}
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              <strong>Provider Role:</strong> You are initiating a claim with clinical documentation only. 
              Hospital administrative staff will add billing details and submit to the insurance company.
            </AlertDescription>
          </Alert>

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
              <Label htmlFor="clinicalSummary">Clinical Summary / Doctor Notes *</Label>
              <Textarea
                id="clinicalSummary"
                placeholder="Document the visit, examination findings, diagnosis, treatment plan, and medical necessity for services provided..."
                value={clinicalSummary}
                onChange={(e) => setClinicalSummary(e.target.value)}
                rows={6}
                required
              />
            </div>
          </div>

          {/* Patient Insurance Info (Read-Only) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <FileText className="w-5 h-5 text-teal-600" />
              <h3 className="text-slate-900">Patient Insurance (Read-Only)</h3>
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

          {/* Next Steps Info */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-purple-900 mb-2">What happens next:</p>
            <ul className="text-purple-800 space-y-1 text-sm">
              <li>• Claim status will be set to: <strong>"Pending Admin Review"</strong></li>
              <li>• Hospital administrative staff will receive this claim</li>
              <li>• Admin will add billing amounts, authorization codes, and supporting documents</li>
              <li>• Admin will then submit the finalized claim to {insuranceProvider}</li>
              <li>• You'll be able to track the claim status in your dashboard</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleInitiate}
            className="bg-teal-600 hover:bg-teal-700"
            disabled={!visitDate || !serviceType || !clinicalSummary}
          >
            <Send className="w-4 h-4 mr-2" />
            Submit for Admin Processing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
