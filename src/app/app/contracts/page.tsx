import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { contracts } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";

export default function ContractsPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Contracts" description="Contrats, valeur engagee, renouvellement et execution." />

      <SectionCard title="Registre contrats" description="Vision docs + renouvellements.">
        <DataTable
          rows={contracts}
          getRowId={(row) => row.id}
          columns={[
            { key: "name", label: "Contrat", render: (row) => row.name },
            { key: "client", label: "Client", render: (row) => row.client },
            { key: "renewalDate", label: "Renouvellement", render: (row) => row.renewalDate },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> },
            { key: "value", label: "Valeur", align: "right", render: (row) => formatCurrency(row.value, row.currency) }
          ]}
        />
      </SectionCard>
    </div>
  );
}

