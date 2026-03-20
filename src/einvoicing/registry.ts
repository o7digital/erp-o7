import { franceProfile } from "./profiles/fr.js";
import { mexicoProfile } from "./profiles/mx.js";
import type {
  CompanySize,
  ComplianceFlow,
  ComplianceMilestone,
  ComplianceStatus,
  CountryCode,
  EInvoicingSetup,
  ElectronicInvoicingProfile,
  InvoiceFormat,
  RequirementScope,
  ValidationIssue
} from "./types.js";

const REGISTRY: Record<CountryCode, ElectronicInvoicingProfile> = {
  FR: franceProfile,
  MX: mexicoProfile
};

const FLOWS: ComplianceFlow[] = ["issuance", "reception", "e_reporting"];

function normalizeCompanySize(companySize?: CompanySize): CompanySize {
  return companySize ?? "SMALL_MEDIUM";
}

function appliesToCompanySize(
  milestone: ComplianceMilestone,
  companySize: CompanySize
): boolean {
  return milestone.appliesTo === "ALL" || milestone.appliesTo.includes(companySize);
}

function isBlank(value: string | undefined): boolean {
  return !value || value.trim().length === 0;
}

function listMissingFieldIssues(
  scope: RequirementScope,
  values: Partial<Record<string, string>> | undefined,
  profile: ElectronicInvoicingProfile
): ValidationIssue[] {
  return profile.requiredFields[scope]
    .filter((requirement) => isBlank(values?.[requirement.key]))
    .map((requirement) => ({
      severity: "error" as const,
      scope,
      field: requirement.key,
      message: `${profile.country} requiert ${requirement.label.toLowerCase()}.`
    }));
}

export function listCountryProfiles(): ElectronicInvoicingProfile[] {
  return Object.values(REGISTRY);
}

export function getCountryProfile(country: CountryCode): ElectronicInvoicingProfile {
  return REGISTRY[country];
}

export function getComplianceStatus(
  country: CountryCode,
  companySize?: CompanySize,
  asOfDate: Date = new Date()
): ComplianceStatus[] {
  const effectiveCompanySize = normalizeCompanySize(companySize);
  const profile = getCountryProfile(country);
  const asOfTime = asOfDate.getTime();

  return FLOWS.map((flow) => {
    const milestone = profile.milestones
      .filter((entry) => entry.flow === flow && appliesToCompanySize(entry, effectiveCompanySize))
      .filter((entry) => new Date(entry.effectiveFrom).getTime() <= asOfTime)
      .sort((left, right) => left.effectiveFrom.localeCompare(right.effectiveFrom))
      .at(-1);

    if (!milestone) {
      return {
        flow,
        state: "not_required_yet",
        note: `${country} n'a pas encore d'obligation active pour ${flow}.`
      };
    }

    return {
      flow,
      state: milestone.state,
      effectiveFrom: milestone.effectiveFrom,
      note: milestone.note
    };
  });
}

export function validateInvoiceFormat(
  country: CountryCode,
  format: InvoiceFormat | undefined
): ValidationIssue[] {
  const profile = getCountryProfile(country);

  if (!format) {
    return [
      {
        severity: "error",
        scope: "invoice",
        field: "format",
        message: `${country} requiert un format de facture déclaré.`
      }
    ];
  }

  if (!profile.supportedFormats.includes(format)) {
    return [
      {
        severity: "error",
        scope: "invoice",
        field: "format",
        message: `${format} n'est pas supporté pour ${country}.`
      }
    ];
  }

  if (country === "FR" && format === "PDF_REPRESENTATION") {
    return [
      {
        severity: "error",
        scope: "invoice",
        field: "format",
        message: "Un PDF simple n'est pas conforme à la réforme française B2B."
      }
    ];
  }

  return [];
}

export function validateSetup(setup: EInvoicingSetup): ValidationIssue[] {
  const profile = getCountryProfile(setup.country);
  const issues = [
    ...listMissingFieldIssues("company", setup.company, profile),
    ...listMissingFieldIssues("buyer", setup.buyer, profile),
    ...listMissingFieldIssues("invoice", setup.invoice, profile),
    ...listMissingFieldIssues("provider", setup.provider, profile),
    ...validateInvoiceFormat(
      setup.country,
      setup.invoice?.format as InvoiceFormat | undefined
    )
  ];

  if (setup.country === "MX" && setup.invoice?.format === "PDF_REPRESENTATION") {
    issues.push({
      severity: "warning",
      scope: "invoice",
      field: "format",
      message: "Le PDF peut servir de représentation imprimable, mais le XML CFDI reste le flux fiscal maître."
    });
  }

  const compliance = getComplianceStatus(
    setup.country,
    normalizeCompanySize(setup.companySize),
    new Date("2026-03-20")
  );

  if (setup.country === "FR") {
    const receptionStatus = compliance.find((entry) => entry.flow === "reception");

    if (receptionStatus?.state === "required" && isBlank(setup.provider?.platformType)) {
      issues.push({
        severity: "warning",
        scope: "provider",
        field: "platformType",
        message: "Prévoir une plateforme agréée avant le 1er septembre 2026 pour la réception et le routage."
      });
    }
  }

  return issues;
}

