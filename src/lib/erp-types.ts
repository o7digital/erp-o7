import type { CountryCode } from "@/einvoicing/types";

export type ErpInvoiceStatus =
  | "draft"
  | "issued"
  | "partially_paid"
  | "paid"
  | "cancelled";

export type ElectronicInvoiceStatus =
  | "not_configured"
  | "ready"
  | "validation_error"
  | "ready_to_submit"
  | "submitted"
  | "accepted"
  | "rejected";

export interface ComplianceCountrySetting {
  country: CountryCode;
  countryName: string;
  moduleLabel: string;
  readiness: ElectronicInvoiceStatus;
  providerLabel: string;
  invoiceSeries: string;
  taxIdentityLabel: string;
}

