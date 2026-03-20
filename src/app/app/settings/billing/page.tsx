import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { billingProfile, invoiceSeries } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";

export default function SettingsBillingPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Billing" description="Abonnement SaaS, usage seats et numerotation des flux facture." />

      <div className="stats-grid">
        <StatCard label="Plan" value={billingProfile.provider} detail={billingProfile.subscriptionStatus} />
        <StatCard
          label="Prochaine echeance"
          value={billingProfile.nextBillingDate}
          detail={formatCurrency(billingProfile.monthlyAmount, billingProfile.currency)}
        />
        <StatCard label="Seats" value={`${billingProfile.seatsUsed}/${billingProfile.seatsIncluded}`} detail="utilisation actuelle" />
        <StatCard label="Status" value={billingProfile.subscriptionStatus} detail="tenant billing" />
      </div>

      <SectionCard title="Series de facture" description="Point de controle billing + numerotation.">
        <DataTable
          rows={invoiceSeries}
          getRowId={(row) => row.id}
          columns={[
            { key: "country", label: "Pays", render: (row) => <StatusBadge value={row.country} /> },
            { key: "code", label: "Serie", render: (row) => row.code },
            { key: "nextNumber", label: "Prochain numero", render: (row) => row.nextNumber },
            { key: "formatPattern", label: "Pattern", render: (row) => <span className="mono">{row.formatPattern}</span> },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> }
          ]}
        />
      </SectionCard>
    </div>
  );
}

