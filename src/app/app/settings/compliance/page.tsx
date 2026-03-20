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

export default function CompliancePage() {
  const blockingIssues = invoiceValidations
    .flatMap((entry) => entry.issues)
    .filter((issue) => issue.severity === "error").length;

  return (
    <div className="page-stack">
      <PageHeader
        title="Compliance"
        description="Module interne de facture electronique avec pays actifs, readiness, settings providers et tax identities."
        actions={
          <div className="button-row">
            <Link href="/app/settings/compliance/providers" className="button button-secondary">
              Provider settings
            </Link>
            <Link href="/app/settings/tax-identities" className="button button-secondary">
              Tax identities
            </Link>
            <Link href="/app/settings/invoice-series" className="button">
              Invoice series
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard label="Pays actives" value={String(jurisdictionProfiles.length)} detail="France + Mexique" />
        <StatCard label="Rules chargees" value={String(complianceRules.length)} detail="noyau FR/MX" />
        <StatCard label="Readiness KO" value={String(blockingIssues)} detail="erreurs bloquantes detectees" />
        <StatCard label="Invoices scopees" value={String(invoiceValidations.length)} detail="controlees par le moteur" />
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
            details={
              <ul className="key-value-list">
                <li>
                  <span>readiness</span>
                  <strong>{setting.readiness}</strong>
                </li>
                <li>
                  <span>provider</span>
                  <strong>{setting.providerLabel}</strong>
                </li>
                <li>
                  <span>invoice_series</span>
                  <strong>{setting.invoiceSeries}</strong>
                </li>
              </ul>
            }
          />
        ))}
      </div>

      <div className="two-columns">
        <SectionCard title="Configuration globale mock" description="Parametres transverses du module facture electronique.">
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
              <label className="field-label">notes</label>
              <textarea defaultValue="Le module invoices garde les payloads XML/Factur-X, les validations et les journaux de soumission par pays." />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Regles actives" description="Controle rapide des regles FR/MX chargees.">
          <ul className="list">
            {complianceRules.map((rule) => (
              <li key={rule.id} className="list-item">
                <strong>
                  <StatusBadge value={rule.country} /> {rule.code}
                </strong>
                <span className="muted">{rule.description}</span>
                <div>
                  <StatusBadge value={rule.status} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
