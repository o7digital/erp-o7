import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { payments } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function PaymentsPage() {
  const { languageTag, txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Payments")}
        description={txt("Encaissements, allocations facture et suivi des blocages.")}
      />

      <SectionCard title={txt("Paiements")} description={txt("Paiements relies aux factures de vente.")}>
        <DataTable
          rows={payments}
          getRowId={(row) => row.id}
          columns={[
            { key: "invoiceNumber", label: txt("Invoice"), render: (row) => row.invoiceNumber },
            { key: "client", label: txt("Client"), render: (row) => row.client },
            { key: "method", label: txt("Mode de paiement"), render: (row) => row.method },
            { key: "paidAt", label: txt("Date"), render: (row) => row.paidAt },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> },
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
