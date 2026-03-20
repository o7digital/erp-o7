import Link from "next/link";
import type { ReactNode } from "react";

import { StatusBadge } from "@/components/status-badge";
import type { ComplianceCountrySetting } from "@/lib/erp-types";

export function ComplianceCountryCard({
  setting,
  details,
  settingsHref
}: {
  setting: ComplianceCountrySetting;
  details: ReactNode;
  settingsHref: string;
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
          <span>Tax identity</span>
          <strong>{setting.taxIdentityLabel}</strong>
        </div>
        <div className="info-item">
          <span>Invoice series</span>
          <strong>{setting.invoiceSeries}</strong>
        </div>
      </div>

      <div className="country-details">{details}</div>

      <div className="button-row">
        <Link href={settingsHref} className="button button-secondary">
          Ouvrir settings
        </Link>
        <Link href="/app/settings/compliance/providers" className="button button-ghost">
          Provider settings
        </Link>
        <Link href="/app/settings/tax-identities" className="button button-ghost">
          Tax identities
        </Link>
      </div>
    </section>
  );
}
