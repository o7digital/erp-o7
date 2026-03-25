import { KanbanColumn } from "@/components/pipeline/kanban-column";
import type { PipelineColumnData, PipelineDeal } from "@/lib/pipeline-types";

export function KanbanBoard({
  columns,
  onOpenDeal,
  onAddDeal
}: {
  columns: PipelineColumnData[];
  onOpenDeal: (deal: PipelineDeal) => void;
  onAddDeal: (stageId: string) => void;
}) {
  return (
    <section className="kanban-board-shell">
      <div className="kanban-board">
        {columns.map((column) => (
          <KanbanColumn key={column.stage.id} column={column} onOpenDeal={onOpenDeal} onAddDeal={onAddDeal} />
        ))}
      </div>
    </section>
  );
}
