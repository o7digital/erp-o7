import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { contracts } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function ContractsPage() {
  const { languageTag, txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Contracts")}
        description={txt("Contrats, valeur engagee, renouvellement et execution.")}
      />

      <SectionCard title={txt("Registre contrats")} description={txt("Vision docs + renouvellements.")}>
        <DataTable
          rows={contracts}
          getRowId={(row) => row.id}
          columns={[
            { key: "name", label: txt("Contrat"), render: (row) => row.name },
            { key: "client", label: txt("Client"), render: (row) => row.client },
            { key: "renewalDate", label: txt("Renouvellement"), render: (row) => row.renewalDate },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> },
            {
              key: "value",
              label: txt("Valeur"),
              align: "right",
              render: (row) => formatCurrency(row.value, row.currency, languageTag)
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}
