import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { orders } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function OrdersPage() {
  const { languageTag, txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Orders")}
        description={txt("Commandes clients avec suivi livraison, facturation et execution.")}
      />

      <SectionCard title={txt("Commandes ouvertes")} description={txt("Vision order management avant generation facture.")}>
        <DataTable
          rows={orders}
          getRowId={(row) => row.id}
          columns={[
            { key: "number", label: txt("Numero"), render: (row) => row.number },
            { key: "client", label: txt("Client"), render: (row) => row.client },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> },
            { key: "fulfillment", label: txt("Fulfillment"), render: (row) => <StatusBadge value={txt(row.fulfillment)} /> },
            { key: "invoicing", label: txt("Invoicing"), render: (row) => <StatusBadge value={txt(row.invoicing)} /> },
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
