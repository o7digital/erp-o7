import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { billingProfile, invoiceSeries } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function SettingsBillingPage() {
  const { languageTag, txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Billing")}
        description={txt("Abonnement SaaS, usage seats et numerotation des flux facture.")}
      />

      <div className="stats-grid">
        <StatCard label={txt("Plan")} value={billingProfile.provider} detail={txt(billingProfile.subscriptionStatus)} />
        <StatCard
          label={txt("Prochaine echeance")}
          value={billingProfile.nextBillingDate}
          detail={formatCurrency(billingProfile.monthlyAmount, billingProfile.currency, languageTag)}
        />
        <StatCard
          label={txt("Seats")}
          value={`${billingProfile.seatsUsed}/${billingProfile.seatsIncluded}`}
          detail={txt("utilisation actuelle")}
        />
        <StatCard label={txt("Status")} value={txt(billingProfile.subscriptionStatus)} detail={txt("tenant billing")} />
      </div>

      <SectionCard title={txt("Series de facture")} description={txt("Point de controle billing + numerotation.")}>
        <DataTable
          rows={invoiceSeries}
          getRowId={(row) => row.id}
          columns={[
            { key: "country", label: txt("Pays"), render: (row) => <StatusBadge value={row.country} /> },
            { key: "code", label: txt("Serie"), render: (row) => row.code },
            { key: "nextNumber", label: txt("Prochain numero"), render: (row) => row.nextNumber },
            { key: "formatPattern", label: txt("Pattern"), render: (row) => <span className="mono">{row.formatPattern}</span> },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> }
          ]}
        />
      </SectionCard>
    </div>
  );
}
