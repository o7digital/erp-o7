import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { deals, pipelineStages } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function PipelinePage() {
  const { languageTag, txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Pipeline")}
        description={txt("Suivi commercial des opportunites, valeurs et prochaines etapes.")}
      />

      <div className="cards-grid">
        {pipelineStages.map((stage) => (
          <SectionCard
            key={stage.id}
            title={txt(stage.name)}
            description={`${stage.deals} ${txt("deals")}`}
          >
            <strong className="stat-value">{formatCurrency(stage.amount, "USD", languageTag)}</strong>
          </SectionCard>
        ))}
      </div>

      <SectionCard title={txt("Deals en cours")} description={txt("Vue detail des opportunites actives.")}>
        <DataTable
          rows={deals}
          getRowId={(row) => row.id}
          columns={[
            { key: "name", label: txt("Deal"), render: (row) => row.name },
            { key: "client", label: txt("Client"), render: (row) => row.client },
            { key: "stage", label: txt("Stage"), render: (row) => <StatusBadge value={txt(row.stage)} /> },
            { key: "owner", label: txt("Owner"), render: (row) => row.owner },
            { key: "probability", label: txt("Probabilite"), align: "right", render: (row) => `${row.probability}%` },
            {
              key: "amount",
              label: txt("Montant"),
              align: "right",
              render: (row) => formatCurrency(row.amount, row.currency, languageTag)
            },
            { key: "nextStep", label: txt("Next step"), render: (row) => txt(row.nextStep) }
          ]}
        />
      </SectionCard>
    </div>
  );
}
