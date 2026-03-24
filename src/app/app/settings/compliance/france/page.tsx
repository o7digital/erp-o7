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

export default async function ComplianceFrancePage() {
  const { txt } = await getDemoI18n();
  const franceIdentity = taxIdentities.find((identity) => identity.country === "FR");
  const franceProvider = providerConnections.find((provider) => provider.country === "FR");
  const franceSeries = invoiceSeries.find((series) => series.country === "FR");
  const franceSetting = complianceCountrySettings.find((setting) => setting.country === "FR");
  const franceIssues = invoiceValidations
    .filter((entry) => entry.country === "FR")
    .flatMap((entry) => entry.issues);

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Compliance France")}
        description={txt(
          "Setup e-invoicing B2B FR natif dans l'ERP pour TVA, SIREN, profil entreprise, PDP et formats structures."
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
        <SectionCard title={txt("Readiness FR")} description={txt("Etat du module e-invoicing FR pour l'entite active.")}>
          <div className="info-grid">
            <div className="info-item">
              <span>{txt("country")}</span>
              <strong>FR</strong>
            </div>
            <div className="info-item">
              <span>{txt("module")}</span>
              <strong>{franceSetting?.moduleLabel}</strong>
            </div>
            <div className="info-item">
              <span>{txt("readiness")}</span>
              <strong>
                <StatusBadge value={txt(franceSetting?.readiness ?? "not_configured")} />
              </strong>
            </div>
            <div className="info-item">
              <span>{txt("provider")}</span>
              <strong>{franceProvider?.name}</strong>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title={txt("Champs FR")}
          description={txt("Configuration mock directement exploitable par le module invoices.")}
        >
          <div className="form-grid">
            <div className="field">
              <label className="field-label">legal_company_name</label>
              <input defaultValue={franceIdentity?.legalName} />
            </div>
            <div className="field">
              <label className="field-label">siren</label>
              <input defaultValue={franceIdentity?.secondaryId?.slice(0, 9)} />
            </div>
            <div className="field">
              <label className="field-label">vat_number</label>
              <input defaultValue={franceIdentity?.taxId} />
            </div>
            <div className="field">
              <label className="field-label">company_size_profile</label>
              <input defaultValue="SMALL_MEDIUM" />
            </div>
            <div className="field">
              <label className="field-label">pdp_status</label>
              <input defaultValue={franceSetting?.readiness} />
            </div>
            <div className="field">
              <label className="field-label">supported_format</label>
              <input defaultValue="FACTUR_X" />
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard title={txt("Provider et numerotation")} description={txt("Connexion PDP et serie invoice active.")}>
          <ul className="key-value-list">
            <li>
              <span>provider_type</span>
              <strong>{franceProvider?.type}</strong>
            </li>
            <li>
              <span>provider_mode</span>
              <strong>{franceProvider?.mode}</strong>
            </li>
            <li>
              <span>provider_status</span>
              <strong>{franceProvider?.status}</strong>
            </li>
            <li>
              <span>invoice_series</span>
              <strong>{franceSeries?.code}</strong>
            </li>
          </ul>
        </SectionCard>

        <SectionCard title={txt("Validations FR")} description={txt("Erreurs et warnings retournes sur les factures FR.")}>
          <ul className="list">
            {franceIssues.map((issue) => (
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

      <SectionCard title={txt("Regles actives FR")} description={txt("Champs requis issus du profil FR.")}>
        <ul className="list">
          {countryProfiles.FR.requiredFields.company
            .concat(countryProfiles.FR.requiredFields.buyer)
            .concat(countryProfiles.FR.requiredFields.invoice)
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
