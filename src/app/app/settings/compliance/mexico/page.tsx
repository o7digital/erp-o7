import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import {
  complianceCountrySettings,
  countryProfiles,
  invoiceSeries,
  invoiceValidations,
  providerConnections,
  taxIdentities
} from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function ComplianceMexicoPage() {
  const { txt } = await getDemoI18n();
  const mexicoIdentity = taxIdentities.find((identity) => identity.country === "MX");
  const mexicoProvider = providerConnections.find((provider) => provider.country === "MX");
  const mexicoSeries = invoiceSeries.find((series) => series.country === "MX");
  const mexicoSetting = complianceCountrySettings.find((setting) => setting.country === "MX");
  const mexicoIssues = invoiceValidations
    .filter((entry) => entry.country === "MX")
    .flatMap((entry) => entry.issues);

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Compliance Mexico")}
        description={txt(
          "Setup CFDI 4.0 natif dans l'ERP pour RFC, razon social, regimen fiscal, codigo postal et uso CFDI."
        )}
        actions={
          <div className="button-row">
            <Link href="/app/settings/compliance/providers" className="button button-secondary">
              {txt("Provider settings")}
            </Link>
            <Link href="/app/settings/tax-identities" className="button button-secondary">
              {txt("Tax identities")}
            </Link>
            <Link href="/app/settings/invoice-series" className="button">
              {txt("Invoice series")}
            </Link>
          </div>
        }
      />

      <div className="two-columns">
        <SectionCard title={txt("Readiness MX")} description={txt("Etat du module CFDI 4.0 pour l'entite active.")}>
          <div className="info-grid">
            <div className="info-item">
              <span>{txt("country")}</span>
              <strong>MX</strong>
            </div>
            <div className="info-item">
              <span>{txt("module")}</span>
              <strong>{mexicoSetting?.moduleLabel}</strong>
            </div>
            <div className="info-item">
              <span>{txt("readiness")}</span>
              <strong>
                <StatusBadge value={txt(mexicoSetting?.readiness ?? "not_configured")} />
              </strong>
            </div>
            <div className="info-item">
              <span>{txt("provider")}</span>
              <strong>{mexicoProvider?.name}</strong>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title={txt("Champs CFDI 4.0")}
          description={txt("Configuration mock directement exploitable par le module invoices.")}
        >
          <div className="form-grid">
            <div className="field">
              <label className="field-label">rfc_emisor</label>
              <input defaultValue={mexicoIdentity?.taxId} />
            </div>
            <div className="field">
              <label className="field-label">rfc_receptor</label>
              <input defaultValue="GNA020304CD2" />
            </div>
            <div className="field">
              <label className="field-label">razon_social</label>
              <input defaultValue={mexicoIdentity?.legalName} />
            </div>
            <div className="field">
              <label className="field-label">regimen_fiscal</label>
              <input defaultValue={mexicoIdentity?.secondaryId} />
            </div>
            <div className="field">
              <label className="field-label">codigo_postal</label>
              <input defaultValue={mexicoIdentity?.postalCode} />
            </div>
            <div className="field">
              <label className="field-label">uso_cfdi</label>
              <input defaultValue="G03" />
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard title={txt("Provider et numerotation")} description={txt("Connexion PAC et serie invoice active.")}>
          <ul className="key-value-list">
            <li>
              <span>provider_type</span>
              <strong>{mexicoProvider?.type}</strong>
            </li>
            <li>
              <span>provider_mode</span>
              <strong>{mexicoProvider?.mode}</strong>
            </li>
            <li>
              <span>provider_status</span>
              <strong>{mexicoProvider?.status}</strong>
            </li>
            <li>
              <span>invoice_series</span>
              <strong>{mexicoSeries?.code}</strong>
            </li>
          </ul>
        </SectionCard>

        <SectionCard title={txt("Validations MX")} description={txt("Erreurs et warnings retournes sur les factures MX.")}>
          <ul className="list">
            {mexicoIssues.map((issue) => (
              <li key={`${issue.field}-${issue.message}`} className="list-item">
                <strong>{issue.field}</strong>
                <span className="muted">{txt(issue.message)}</span>
                <div>
                  <StatusBadge value={txt(issue.severity)} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title={txt("Regles actives MX")} description={txt("Champs requis issus du profil CFDI 4.0.")}>
        <ul className="list">
          {countryProfiles.MX.requiredFields.company
            .concat(countryProfiles.MX.requiredFields.buyer)
            .concat(countryProfiles.MX.requiredFields.invoice)
            .map((field) => (
              <li key={field.key} className="list-item">
                <strong>{field.key}</strong>
                <span className="muted">{txt(field.description)}</span>
              </li>
            ))}
        </ul>
      </SectionCard>
    </div>
  );
}
