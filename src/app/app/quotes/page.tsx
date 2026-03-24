import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { quotes } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function QuotesPage() {
  const { languageTag, txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Quotes")}
        description={txt("Devis commerciaux avec validite, ownership et conversion future vers order.")}
      />

      <SectionCard title={txt("Registre des devis")} description={txt("Devis en preparation, envoyes et approuves.")}>
        <DataTable
          rows={quotes}
          getRowId={(row) => row.id}
          columns={[
            { key: "number", label: txt("Numero"), render: (row) => row.number },
            { key: "client", label: txt("Client"), render: (row) => row.client },
            { key: "owner", label: txt("Owner"), render: (row) => row.owner },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> },
            { key: "validUntil", label: txt("Valide jusqu'au"), render: (row) => row.validUntil },
            {
              key: "amount",
              label: txt("Montant"),
              align: "right",
              render: (row) => formatCurrency(row.amount, row.currency, languageTag)
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}
