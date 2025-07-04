export interface Hazard {
  id: string;
  name: string;
  type: "Biological" | "Chemical" | "Physical";
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  likelihood: "Rare" | "Unlikely" | "Possible" | "Likely" | "Almost Certain";
  riskScore: number;
  controlMeasures: string[];
  responsible: string;
  dateIdentified: string;
  status: "Active" | "Controlled" | "Resolved";
}

export interface CCP {
  id: string;
  hazardId: string;
  hazardName?: string;
  step: string;
  criticalLimit: string;
  monitoringFrequency: string;
  monitoringMethod: string;
  correctiveActions: string[];
  verification: string;
  recordKeeping: string;
  responsible: string;
  dateEstablished: string;
  status: "Active" | "Inactive" | "Under Review";
  lastMonitored?: string;
  compliance: "Compliant" | "Non-Compliant" | "Pending";
}

export interface AuditLog {
  id: string;
  module: "HACCP" | "ISO" | "BRC" | "MSC" | "General";
  timestamp: string;
  user: string;
  action: string;
  details: string;
  severity: "Info" | "Warning" | "Error" | "Critical";
  category: "Create" | "Update" | "Delete" | "View" | "Export" | "Import";
  entityType?: string;
  entityId?: string;
  changes?: Record<string, any>;
}

export interface ISOStandard {
  id: string;
  code: string;
  title: string;
  version: string;
  status: "Active" | "Superseded" | "Under Review";
  implementationDate: string;
  nextReview: string;
  responsible: string;
  description: string;
  requirements: string[];
  complianceLevel: "Full" | "Partial" | "Non-Compliant" | "Not Assessed";
  evidence: string[];
  gaps: string[];
  actions: string[];
}

export interface QualityCheck {
  id: string;
  product: string;
  batch: string;
  checkType:
    | "Temperature"
    | "pH"
    | "Visual"
    | "Microbiological"
    | "Chemical"
    | "Physical";
  parameter: string;
  expectedValue: string;
  actualValue: string;
  unit: string;
  result: "Pass" | "Fail" | "Warning";
  inspector: string;
  dateChecked: string;
  equipment: string;
  notes: string;
  correctiveAction?: string;
  followUpRequired: boolean;
}

export interface ComplianceTraining {
  id: string;
  employee: string;
  course: string;
  standard: string;
  dateCompleted: string;
  expiryDate: string;
  score: number;
  status: "Current" | "Expired" | "Due" | "Overdue";
  certificateNumber: string;
  trainer: string;
  notes: string;
}

export interface Document {
  id: string;
  title: string;
  type: "SOP" | "Policy" | "Form" | "Certificate" | "Report" | "Manual";
  standard: string;
  version: string;
  dateCreated: string;
  dateModified: string;
  nextReview: string;
  owner: string;
  status: "Current" | "Under Review" | "Superseded" | "Draft";
  filePath: string;
  tags: string[];
  description: string;
}

// Utility types
export type ComplianceEntity =
  | Hazard
  | CCP
  | AuditLog
  | ISOStandard
  | QualityCheck
  | ComplianceTraining
  | Document;

export interface ComplianceStats {
  totalHazards: number;
  activeHazards: number;
  criticalHazards: number;
  totalCCPs: number;
  compliantCCPs: number;
  nonCompliantCCPs: number;
  pendingAudits: number;
  overdueDocs: number;
  expiredTraining: number;
  complianceScore: number;
}

export interface ComplianceFilter {
  type?: string;
  status?: string;
  severity?: string;
  responsible?: string;
  dateFrom?: string;
  dateTo?: string;
  standard?: string;
}
