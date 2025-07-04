import { safeGetJSON, safeSetJSON } from "../utils/safeStorage";
import {
  Hazard,
  CCP,
  AuditLog,
  ISOStandard,
  QualityCheck,
  ComplianceTraining,
  Document,
  ComplianceStats,
  ComplianceFilter,
} from "../types/compliance";

// Storage keys
const STORAGE_KEYS = {
  hazards: "compliance_hazards",
  ccps: "compliance_ccps",
  logs: "compliance_audit_logs",
  isoStandards: "compliance_iso_standards",
  qualityChecks: "compliance_quality_checks",
  training: "compliance_training",
  documents: "compliance_documents",
};

// Mock data generators
const generateMockHazards = (): Hazard[] => [
  {
    id: "1",
    name: "Salmonella contamination",
    type: "Biological",
    description: "Risk of Salmonella contamination during fish processing",
    severity: "Critical",
    likelihood: "Possible",
    riskScore: 12,
    controlMeasures: [
      "Temperature control",
      "Hygiene protocols",
      "Regular testing",
    ],
    responsible: "Quality Manager",
    dateIdentified: "2024-01-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Chemical residues",
    type: "Chemical",
    description: "Cleaning chemicals contamination",
    severity: "High",
    likelihood: "Unlikely",
    riskScore: 8,
    controlMeasures: [
      "Chemical storage protocols",
      "Staff training",
      "Rinse procedures",
    ],
    responsible: "Production Manager",
    dateIdentified: "2024-01-20",
    status: "Controlled",
  },
  {
    id: "3",
    name: "Foreign objects",
    type: "Physical",
    description: "Metal fragments from processing equipment",
    severity: "High",
    likelihood: "Rare",
    riskScore: 6,
    controlMeasures: [
      "Metal detection",
      "Equipment maintenance",
      "Visual inspection",
    ],
    responsible: "Operations Manager",
    dateIdentified: "2024-02-01",
    status: "Active",
  },
];

const generateMockCCPs = (): CCP[] => [
  {
    id: "1",
    hazardId: "1",
    hazardName: "Salmonella contamination",
    step: "Thermal processing",
    criticalLimit: "Core temperature ≥ 75°C for 2 minutes",
    monitoringFrequency: "Every batch",
    monitoringMethod: "Calibrated thermometer",
    correctiveActions: ["Increase heating time", "Reject batch", "Re-process"],
    verification: "Weekly calibration check",
    recordKeeping: "Temperature log sheets",
    responsible: "Production Supervisor",
    dateEstablished: "2024-01-15",
    status: "Active",
    lastMonitored: "2024-12-15",
    compliance: "Compliant",
  },
  {
    id: "2",
    hazardId: "2",
    hazardName: "Chemical residues",
    step: "Final rinse",
    criticalLimit: "No detectable chemical residues",
    monitoringFrequency: "Every 4 hours",
    monitoringMethod: "Chemical test strips",
    correctiveActions: ["Additional rinse cycle", "Re-test", "Stop production"],
    verification: "Daily supervisor check",
    recordKeeping: "Chemical monitoring log",
    responsible: "Quality Technician",
    dateEstablished: "2024-01-20",
    status: "Active",
    lastMonitored: "2024-12-15",
    compliance: "Compliant",
  },
];

const generateMockISOStandards = (): ISOStandard[] => [
  {
    id: "1",
    code: "ISO 22000:2018",
    title: "Food Safety Management Systems",
    version: "2018",
    status: "Active",
    implementationDate: "2024-01-01",
    nextReview: "2025-12-31",
    responsible: "Quality Manager",
    description: "Requirements for any organization in the food chain",
    requirements: [
      "Context of the organization",
      "Leadership and commitment",
      "Planning",
      "Support",
      "Operation",
      "Performance evaluation",
      "Improvement",
    ],
    complianceLevel: "Full",
    evidence: [
      "Management manual",
      "Procedures documentation",
      "Training records",
      "Audit reports",
    ],
    gaps: [],
    actions: ["Annual management review", "Internal audit program"],
  },
  {
    id: "2",
    code: "ISO 22005:2007",
    title: "Traceability in the Feed and Food Chain",
    version: "2007",
    status: "Active",
    implementationDate: "2024-02-01",
    nextReview: "2025-12-31",
    responsible: "Operations Manager",
    description:
      "General principles and basic requirements for system design and implementation",
    requirements: [
      "Traceability system design",
      "Documentation requirements",
      "Record keeping",
      "Information flow",
    ],
    complianceLevel: "Partial",
    evidence: [
      "Batch records",
      "Supplier documentation",
      "Product labeling system",
    ],
    gaps: ["Electronic tracking system needed", "Supplier audit program"],
    actions: ["Implement digital tracking", "Supplier qualification program"],
  },
];

// API Functions
export const getHazards = (filter?: ComplianceFilter): Hazard[] => {
  let hazards = safeGetJSON<Hazard[]>(
    STORAGE_KEYS.hazards,
    generateMockHazards(),
  );

  if (filter) {
    hazards = hazards.filter((hazard) => {
      if (filter.type && hazard.type !== filter.type) return false;
      if (filter.status && hazard.status !== filter.status) return false;
      if (filter.severity && hazard.severity !== filter.severity) return false;
      if (
        filter.responsible &&
        !hazard.responsible
          .toLowerCase()
          .includes(filter.responsible.toLowerCase())
      )
        return false;
      if (filter.dateFrom && hazard.dateIdentified < filter.dateFrom)
        return false;
      if (filter.dateTo && hazard.dateIdentified > filter.dateTo) return false;
      return true;
    });
  }

  return hazards;
};

export const createHazard = (hazard: Omit<Hazard, "id">): Hazard => {
  const hazards = getHazards();
  const newHazard: Hazard = {
    ...hazard,
    id: crypto.randomUUID(),
  };

  const updatedHazards = [...hazards, newHazard];
  safeSetJSON(STORAGE_KEYS.hazards, updatedHazards);

  log({
    module: "HACCP",
    user: "current-user",
    action: "Create Hazard",
    details: `Created hazard: ${newHazard.name}`,
    severity: "Info",
    category: "Create",
    entityType: "Hazard",
    entityId: newHazard.id,
  });

  return newHazard;
};

export const updateHazard = (
  id: string,
  updates: Partial<Hazard>,
): Hazard | null => {
  const hazards = getHazards();
  const index = hazards.findIndex((h) => h.id === id);

  if (index === -1) return null;

  const updatedHazard = { ...hazards[index], ...updates };
  hazards[index] = updatedHazard;

  safeSetJSON(STORAGE_KEYS.hazards, hazards);

  log({
    module: "HACCP",
    user: "current-user",
    action: "Update Hazard",
    details: `Updated hazard: ${updatedHazard.name}`,
    severity: "Info",
    category: "Update",
    entityType: "Hazard",
    entityId: id,
    changes: updates,
  });

  return updatedHazard;
};

export const deleteHazard = (id: string): boolean => {
  const hazards = getHazards();
  const hazard = hazards.find((h) => h.id === id);

  if (!hazard) return false;

  const filteredHazards = hazards.filter((h) => h.id !== id);
  safeSetJSON(STORAGE_KEYS.hazards, filteredHazards);

  log({
    module: "HACCP",
    user: "current-user",
    action: "Delete Hazard",
    details: `Deleted hazard: ${hazard.name}`,
    severity: "Warning",
    category: "Delete",
    entityType: "Hazard",
    entityId: id,
  });

  return true;
};

export const getCCPs = (filter?: ComplianceFilter): CCP[] => {
  let ccps = safeGetJSON<CCP[]>(STORAGE_KEYS.ccps, generateMockCCPs());

  // Populate hazard names
  const hazards = getHazards();
  ccps = ccps.map((ccp) => ({
    ...ccp,
    hazardName:
      hazards.find((h) => h.id === ccp.hazardId)?.name || "Unknown Hazard",
  }));

  if (filter) {
    ccps = ccps.filter((ccp) => {
      if (filter.status && ccp.status !== filter.status) return false;
      if (
        filter.responsible &&
        !ccp.responsible
          .toLowerCase()
          .includes(filter.responsible.toLowerCase())
      )
        return false;
      if (filter.dateFrom && ccp.dateEstablished < filter.dateFrom)
        return false;
      if (filter.dateTo && ccp.dateEstablished > filter.dateTo) return false;
      return true;
    });
  }

  return ccps;
};

export const createCCP = (ccp: Omit<CCP, "id">): CCP => {
  const ccps = getCCPs();
  const newCCP: CCP = {
    ...ccp,
    id: crypto.randomUUID(),
  };

  const updatedCCPs = [...ccps, newCCP];
  safeSetJSON(STORAGE_KEYS.ccps, updatedCCPs);

  log({
    module: "HACCP",
    user: "current-user",
    action: "Create CCP",
    details: `Created CCP for step: ${newCCP.step}`,
    severity: "Info",
    category: "Create",
    entityType: "CCP",
    entityId: newCCP.id,
  });

  return newCCP;
};

export const updateCCP = (id: string, updates: Partial<CCP>): CCP | null => {
  const ccps = getCCPs();
  const index = ccps.findIndex((c) => c.id === id);

  if (index === -1) return null;

  const updatedCCP = { ...ccps[index], ...updates };
  ccps[index] = updatedCCP;

  safeSetJSON(STORAGE_KEYS.ccps, ccps);

  log({
    module: "HACCP",
    user: "current-user",
    action: "Update CCP",
    details: `Updated CCP: ${updatedCCP.step}`,
    severity: "Info",
    category: "Update",
    entityType: "CCP",
    entityId: id,
    changes: updates,
  });

  return updatedCCP;
};

export const getAuditLogs = (filter?: ComplianceFilter): AuditLog[] => {
  let logs = safeGetJSON<AuditLog[]>(STORAGE_KEYS.logs, []);

  if (filter) {
    logs = logs.filter((log) => {
      if (filter.type && log.module !== filter.type) return false;
      if (filter.status && log.severity !== filter.status) return false;
      if (filter.dateFrom && log.timestamp < filter.dateFrom) return false;
      if (filter.dateTo && log.timestamp > filter.dateTo) return false;
      return true;
    });
  }

  return logs.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
};

export const log = (entry: Omit<AuditLog, "id" | "timestamp">): AuditLog => {
  const logs = getAuditLogs();
  const newLog: AuditLog = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };

  const updatedLogs = [newLog, ...logs];
  safeSetJSON(STORAGE_KEYS.logs, updatedLogs);

  return newLog;
};

export const getISOStandards = (): ISOStandard[] => {
  return safeGetJSON<ISOStandard[]>(
    STORAGE_KEYS.isoStandards,
    generateMockISOStandards(),
  );
};

export const createISOStandard = (
  standard: Omit<ISOStandard, "id">,
): ISOStandard => {
  const standards = getISOStandards();
  const newStandard: ISOStandard = {
    ...standard,
    id: crypto.randomUUID(),
  };

  const updatedStandards = [...standards, newStandard];
  safeSetJSON(STORAGE_KEYS.isoStandards, updatedStandards);

  log({
    module: "ISO",
    user: "current-user",
    action: "Create ISO Standard",
    details: `Created ISO standard: ${newStandard.code}`,
    severity: "Info",
    category: "Create",
    entityType: "ISOStandard",
    entityId: newStandard.id,
  });

  return newStandard;
};

export const getComplianceStats = (): ComplianceStats => {
  const hazards = getHazards();
  const ccps = getCCPs();
  const logs = getAuditLogs();

  const totalHazards = hazards.length;
  const activeHazards = hazards.filter((h) => h.status === "Active").length;
  const criticalHazards = hazards.filter(
    (h) => h.severity === "Critical",
  ).length;

  const totalCCPs = ccps.length;
  const compliantCCPs = ccps.filter((c) => c.compliance === "Compliant").length;
  const nonCompliantCCPs = ccps.filter(
    (c) => c.compliance === "Non-Compliant",
  ).length;

  const pendingAudits = logs.filter(
    (l) => l.action.includes("audit") && l.severity === "Warning",
  ).length;

  // Calculate compliance score (0-100)
  let complianceScore = 0;
  if (totalCCPs > 0) {
    complianceScore = Math.round((compliantCCPs / totalCCPs) * 100);
  }

  return {
    totalHazards,
    activeHazards,
    criticalHazards,
    totalCCPs,
    compliantCCPs,
    nonCompliantCCPs,
    pendingAudits,
    overdueDocs: 0,
    expiredTraining: 0,
    complianceScore,
  };
};

// Export all functions for easy imports
export const complianceAPI = {
  hazards: {
    get: getHazards,
    create: createHazard,
    update: updateHazard,
    delete: deleteHazard,
  },
  ccps: {
    get: getCCPs,
    create: createCCP,
    update: updateCCP,
  },
  logs: {
    get: getAuditLogs,
    create: log,
  },
  iso: {
    get: getISOStandards,
    create: createISOStandard,
  },
  stats: {
    get: getComplianceStats,
  },
};
