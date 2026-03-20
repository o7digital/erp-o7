import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { quotes } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";

export default function QuotesPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Quotes" description="Devis commerciaux avec validite, ownership et conversion future vers order." />

      <SectionCard title="Registre des devis" description="Devis en preparation, envoyes et approuves.">
        <DataTable
          rows={quotes}
          getRowId={(row) => row.id}
          columns={[
            { key: "number", label: "Numero", render: (row) => row.number },
            { key: "client", label: "Client", render: (row) => row.client },
            { key: "owner", label: "Owner", render: (row) => row.owner },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> },
            { key: "validUntil", label: "Valide jusqu'au", render: (row) => row.validUntil },
            { key: "amount", label: "Montant", align: "right", render: (row) => formatCurrency(row.amount, "EUR") }
          ]}
        />
      </SectionCard>
    </div>
  );
}

