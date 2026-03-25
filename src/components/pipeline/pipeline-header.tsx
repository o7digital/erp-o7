import type { PipelineViewMode, PipelineWorkflow } from "@/lib/pipeline-types";

export function PipelineHeader({
  pipelines,
  selectedPipelineId,
  viewMode,
  onPipelineChange,
  onOpenManageWorkflow,
  onOpenNewWorkflow,
  onOpenNewDeal
}: {
  pipelines: PipelineWorkflow[];
  selectedPipelineId: string;
  viewMode: PipelineViewMode;
  onPipelineChange: (pipelineId: string) => void;
  onOpenManageWorkflow: () => void;
  onOpenNewWorkflow: () => void;
  onOpenNewDeal: () => void;
}) {
  return (
    <section className="pipeline-hero">
      <div>
        <p className="pipeline-hero-eyebrow">o7 PulseCRM</p>
        <h1>Pipeline</h1>
        <p className="pipeline-hero-description">Seguimiento visual de oportunidades comerciales por etapa</p>
      </div>

      <div className="pipeline-hero-actions">
        <div className="pipeline-select-wrap">
          <label htmlFor="pipeline-selector">Pipeline</label>
          <select
            id="pipeline-selector"
            className="pipeline-select"
            value={selectedPipelineId}
            onChange={(event) => onPipelineChange(event.target.value)}
          >
            {pipelines.map((pipeline) => (
              <option key={pipeline.id} value={pipeline.id}>
                {pipeline.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pipeline-action-row">
          <button type="button" className="pipeline-secondary-button" onClick={onOpenManageWorkflow}>
            Gestionar workflow
          </button>
          <button type="button" className="pipeline-secondary-button" onClick={onOpenNewWorkflow}>
            + Nuevo workflow
          </button>
          <button type="button" className="pipeline-primary-button" onClick={onOpenNewDeal}>
            Nuevo deal
          </button>
        </div>

        <div className="pipeline-view-toggle" aria-label="Vista disponible">
          <button type="button" className={viewMode === "kanban" ? "pipeline-view-button active" : "pipeline-view-button"}>
            Kanban
          </button>
          <button type="button" className="pipeline-view-button" disabled>
            Lista pronto
          </button>
        </div>
      </div>
    </section>
  );
}
