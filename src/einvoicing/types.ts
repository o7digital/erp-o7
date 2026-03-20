export type CountryCode = "FR" | "MX";

export type CompanySize = "MICRO" | "SMALL_MEDIUM" | "MID_MARKET" | "LARGE";

export type ComplianceFlow = "issuance" | "reception" | "e_reporting";

export type ComplianceState = "required" | "available" | "not_required_yet";

export type RequirementScope = "company" | "buyer" | "invoice" | "provider";

export type ValidationSeverity = "error" | "warning";

export type InvoiceFormat =
  | "CFDI_4_0_XML"
  | "FACTUR_X"
  | "UBL_2_1"
  | "CII_16B"
  | "PDF_REPRESENTATION";

export interface SourceReference {
  label: string;
  url: string;
  checkedAt: string;
}

export interface FieldRequirement {
  key: string;
  label: string;
  scope: RequirementScope;
  description: string;
  example?: string;
}

export interface ComplianceMilestone {
  flow: ComplianceFlow;
  appliesTo: CompanySize[] | "ALL";
  effectiveFrom: string;
  state: Exclude<ComplianceState, "not_required_yet">;
  note: string;
}

export interface ElectronicInvoicingProfile {
  country: CountryCode;
  countryName: string;
  legalFramework: string;
  activeVersion: string;
  transmissionModel: string;
  supportedFormats: InvoiceFormat[];
  milestones: ComplianceMilestone[];
  requiredFields: Record<RequirementScope, FieldRequirement[]>;
  notes: string[];
  sources: SourceReference[];
}

export interface EInvoicingSetup {
  country: CountryCode;
  companySize?: CompanySize;
  company?: Partial<Record<string, string>>;
  buyer?: Partial<Record<string, string>>;
  invoice?: Partial<Record<string, string>>;
  provider?: Partial<Record<string, string>>;
}

export interface ValidationIssue {
  severity: ValidationSeverity;
  scope: RequirementScope;
  field: string;
  message: string;
}

export interface ComplianceStatus {
  flow: ComplianceFlow;
  state: ComplianceState;
  effectiveFrom?: string;
  note: string;
}

