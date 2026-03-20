import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { payments } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";

export default function PaymentsPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Payments" description="Encaissements, allocations facture et suivi des blocages." />

      <SectionCard title="Paiements" description="Paiements relies aux factures de vente.">
        <DataTable
          rows={payments}
          getRowId={(row) => row.id}
          columns={[
            { key: "invoiceNumber", label: "Invoice", render: (row) => row.invoiceNumber },
            { key: "client", label: "Client", render: (row) => row.client },
            { key: "method", label: "Mode", render: (row) => row.method },
            { key: "paidAt", label: "Date", render: (row) => row.paidAt },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> },
            { key: "amount", label: "Montant", align: "right", render: (row) => formatCurrency(row.amount, row.currency) }
          ]}
        />
      </SectionCard>
    </div>
  );
}

