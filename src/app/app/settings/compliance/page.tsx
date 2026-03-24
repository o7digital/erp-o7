import Link from "next/link";

import { ComplianceCountryCard } from "@/components/compliance-country-card";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import {
  complianceCountrySettings,
  complianceRules,
  invoiceValidations,
  jurisdictionProfiles
} from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function CompliancePage() {
  const { txt } = await getDemoI18n();
  const blockingIssues = invoiceValidations
    .flatMap((entry) => entry.issues)
    .filter((issue) => issue.severity === "error").length;

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Compliance")}
        description={txt(
          "Module interne de facture electronique avec pays actifs, readiness, settings providers et tax identities."
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

      <div className="stats-grid">
        <StatCard label={txt("Pays actives")} value={String(jurisdictionProfiles.length)} detail={txt("France + Mexique")} />
        <StatCard label={txt("Rules chargees")} value={String(complianceRules.length)} detail={txt("noyau FR/MX")} />
        <StatCard label={txt("Readiness KO")} value={String(blockingIssues)} detail={txt("erreurs bloquantes detectees")} />
        <StatCard label={txt("Invoices scopees")} value={String(invoiceValidations.length)} detail={txt("controlees par le moteur")} />
      </div>

      <div className="cards-grid">
        {complianceCountrySettings.map((setting) => (
          <ComplianceCountryCard
            key={setting.country}
            setting={setting}
            settingsHref={
              setting.country === "MX"
                ? "/app/settings/compliance/mexico"
                : "/app/settings/compliance/france"
            }
            copy={{
              taxIdentityLabel: txt("Tax identity"),
              invoiceSeriesLabel: txt("Invoice series"),
              openSettingsLabel: txt("Ouvrir settings"),
              providerSettingsLabel: txt("Provider settings"),
              taxIdentitiesLabel: txt("Tax identities")
            }}
            details={
              <ul className="key-value-list">
                <li>
                  <span>{txt("readiness")}</span>
                  <strong>{txt(setting.readiness)}</strong>
                </li>
                <li>
                  <span>{txt("provider")}</span>
                  <strong>{setting.providerLabel}</strong>
                </li>
                <li>
                  <span>{txt("invoice_series")}</span>
                  <strong>{setting.invoiceSeries}</strong>
                </li>
              </ul>
            }
          />
        ))}
      </div>

      <div className="two-columns">
        <SectionCard
          title={txt("Configuration globale mock")}
          description={txt("Parametres transverses du module facture electronique.")}
        >
          <div className="form-grid">
            <div className="field">
              <label className="field-label">validation_mode</label>
              <select defaultValue="strict">
                <option value="strict">strict</option>
                <option value="warning_only">warning_only</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">payload_retention_days</label>
              <input defaultValue="3650" />
            </div>
            <div className="field">
              <label className="field-label">auto_submit_if_ready</label>
              <select defaultValue="no">
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">default_error_queue_owner</label>
              <input defaultValue="finance-ops@o7.digital" />
            </div>
            <div className="field field-full">
              <label className="field-label">{txt("notes")}</label>
              <textarea defaultValue="Le module invoices garde les payloads XML/Factur-X, les validations et les journaux de soumission par pays." />
            </div>
          </div>
        </SectionCard>

        <SectionCard title={txt("Regles actives")} description={txt("Controle rapide des regles FR/MX chargees.")}>
          <ul className="list">
            {complianceRules.map((rule) => (
              <li key={rule.id} className="list-item">
                <strong>
                  <StatusBadge value={rule.country} /> {rule.code}
                </strong>
                <span className="muted">{txt(rule.description)}</span>
                <div>
                  <StatusBadge value={txt(rule.status)} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
