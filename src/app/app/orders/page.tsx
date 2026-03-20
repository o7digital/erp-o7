import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { orders } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";

export default function OrdersPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Orders" description="Commandes clients avec suivi livraison, facturation et execution." />

      <SectionCard title="Commandes ouvertes" description="Vision order management avant generation facture.">
        <DataTable
          rows={orders}
          getRowId={(row) => row.id}
          columns={[
            { key: "number", label: "Numero", render: (row) => row.number },
            { key: "client", label: "Client", render: (row) => row.client },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> },
            { key: "fulfillment", label: "Fulfillment", render: (row) => <StatusBadge value={row.fulfillment} /> },
            { key: "invoicing", label: "Invoicing", render: (row) => <StatusBadge value={row.invoicing} /> },
            { key: "amount", label: "Montant", align: "right", render: (row) => formatCurrency(row.amount, "EUR") }
          ]}
        />
      </SectionCard>
    </div>
  );
}

