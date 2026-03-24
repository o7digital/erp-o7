import Link from "next/link";
import type { ReactNode } from "react";

import { StatusBadge } from "@/components/status-badge";
import type { ComplianceCountrySetting } from "@/lib/erp-types";

export function ComplianceCountryCard({
  setting,
  details,
  settingsHref,
  copy = {
    taxIdentityLabel: "Tax identity",
    invoiceSeriesLabel: "Invoice series",
    openSettingsLabel: "Ouvrir settings",
    providerSettingsLabel: "Provider settings",
    taxIdentitiesLabel: "Tax identities"
  }
}: {
  setting: ComplianceCountrySetting;
  details: ReactNode;
  settingsHref: string;
  copy?: {
    taxIdentityLabel: string;
    invoiceSeriesLabel: string;
    openSettingsLabel: string;
    providerSettingsLabel: string;
    taxIdentitiesLabel: string;
  };
}) {
  return (
    <section className="card country-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">{setting.country}</p>
          <h2>
            {setting.countryName} · {setting.moduleLabel}
          </h2>
          <p>{setting.providerLabel}</p>
        </div>
        <StatusBadge value={setting.readiness} />
      </div>

      <div className="country-meta">
        <div className="info-item">
          <span>{copy.taxIdentityLabel}</span>
          <strong>{setting.taxIdentityLabel}</strong>
        </div>
        <div className="info-item">
          <span>{copy.invoiceSeriesLabel}</span>
          <strong>{setting.invoiceSeries}</strong>
        </div>
      </div>

      <div className="country-details">{details}</div>

      <div className="button-row">
        <Link href={settingsHref} className="button button-secondary">
          {copy.openSettingsLabel}
        </Link>
        <Link href="/app/settings/compliance/providers" className="button button-ghost">
          {copy.providerSettingsLabel}
        </Link>
        <Link href="/app/settings/tax-identities" className="button button-ghost">
          {copy.taxIdentitiesLabel}
        </Link>
      </div>
    </section>
  );
}
