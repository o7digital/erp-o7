import { DealCard } from "@/components/pipeline/deal-card";
import { formatCurrencyTotals, getStageStatusLabel } from "@/lib/pipeline-utils";
import type { PipelineColumnData, PipelineDeal } from "@/lib/pipeline-types";

export function KanbanColumn({
  column,
  onOpenDeal,
  onAddDeal
}: {
  column: PipelineColumnData;
  onOpenDeal: (deal: PipelineDeal) => void;
  onAddDeal: (stageId: string) => void;
}) {
  return (
    <section className={`kanban-column kanban-column-${column.stage.status}`}>
      <div className="kanban-column-header">
        <div>
          <div className="kanban-column-topline">
            <span className={`kanban-status-badge kanban-status-${column.stage.status}`}>
              {getStageStatusLabel(column.stage.status)}
            </span>
            <span className="kanban-stage-probability">{column.stage.probability}%</span>
          </div>
          <h3>{column.stage.name}</h3>
          <p className="kanban-stage-summary">
            {column.dealCount} deals · {formatCurrencyTotals(column.totals, "es-MX")}
          </p>
        </div>

        <div className="kanban-column-actions">
          <div className="kanban-column-counter">
            <span>Deals</span>
            <strong>{column.dealCount}</strong>
          </div>
          <button
            type="button"
            className="pipeline-icon-button"
            onClick={() => onAddDeal(column.stage.id)}
            aria-label={`Agregar deal en ${column.stage.name}`}
          >
            +
          </button>
        </div>
      </div>

      <div className="kanban-column-body">
        {column.deals.length === 0 ? (
          <div className="kanban-empty-state">
            <p>Sin deals en esta etapa.</p>
            <button type="button" className="pipeline-text-button" onClick={() => onAddDeal(column.stage.id)}>
              Agregar deal
            </button>
          </div>
        ) : (
          column.deals.map((deal) => <DealCard key={deal.id} deal={deal} onOpen={onOpenDeal} />)
        )}
      </div>
    </section>
  );
}
