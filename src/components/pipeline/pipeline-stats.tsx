import { formatCurrencyTotals } from "@/lib/pipeline-utils";
import type { PipelineSummary } from "@/lib/pipeline-types";

export function PipelineStats({
  summary,
  workflowName,
  visibleCount,
  totalCount
}: {
  summary: PipelineSummary;
  workflowName: string;
  visibleCount: number;
  totalCount: number;
}) {
  return (
    <section className="pipeline-stats-grid">
      <article className="pipeline-stat-card">
        <span>Leads abiertos</span>
        <strong>{summary.openLeads}</strong>
        <p>{visibleCount === totalCount ? "Vista completa" : `${visibleCount} visibles con filtros`}</p>
      </article>

      <article className="pipeline-stat-card">
        <span>Total leads</span>
        <strong>{summary.totalLeads}</strong>
        <p>Incluye abiertos, ganados y perdidos</p>
      </article>

      <article className="pipeline-stat-card">
        <span>Valor abierto</span>
        <strong>{formatCurrencyTotals(summary.openValueTotals, "es-MX")}</strong>
        <p>Totales dinamicos por moneda</p>
      </article>

      <article className="pipeline-stat-card">
        <span>Workflow activo</span>
        <strong>{workflowName}</strong>
        <p>{formatCurrencyTotals(summary.totalValueTotals, "es-MX")}</p>
      </article>
    </section>
  );
}
