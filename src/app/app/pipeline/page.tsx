import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { deals, pipelineStages } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";

export default function PipelinePage() {
  return (
    <div className="page-stack">
      <PageHeader title="Pipeline" description="Suivi commercial des opportunites, valeurs et prochaines etapes." />

      <div className="cards-grid">
        {pipelineStages.map((stage) => (
          <SectionCard key={stage.id} title={stage.name} description={`${stage.deals} deals`}>
            <strong className="stat-value">{formatCurrency(stage.amount, "EUR")}</strong>
          </SectionCard>
        ))}
      </div>

      <SectionCard title="Deals en cours" description="Vue detail des opportunites actives.">
        <DataTable
          rows={deals}
          getRowId={(row) => row.id}
          columns={[
            { key: "name", label: "Deal", render: (row) => row.name },
            { key: "client", label: "Client", render: (row) => row.client },
            { key: "stage", label: "Stage", render: (row) => <StatusBadge value={row.stage} /> },
            { key: "owner", label: "Owner", render: (row) => row.owner },
            { key: "probability", label: "Probabilite", align: "right", render: (row) => `${row.probability}%` },
            { key: "amount", label: "Montant", align: "right", render: (row) => formatCurrency(row.amount, "EUR") },
            { key: "nextStep", label: "Next step", render: (row) => row.nextStep }
          ]}
        />
      </SectionCard>
    </div>
  );
}

