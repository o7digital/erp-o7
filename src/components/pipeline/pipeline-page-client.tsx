"use client";

import { useEffect, useState } from "react";

import { KanbanBoard } from "@/components/pipeline/kanban-board";
import { PipelineDialog } from "@/components/pipeline/pipeline-dialog";
import { PipelineHeader } from "@/components/pipeline/pipeline-header";
import { PipelineStats } from "@/components/pipeline/pipeline-stats";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { pipelineDemoDeals, pipelineDemoWorkflows } from "@/lib/pipeline-demo-data";
import { filterPipelineDeals, getPipelineColumns, getPipelineSummary, getStageStatusLabel } from "@/lib/pipeline-utils";
import type { PipelineDeal, PipelineFilters } from "@/lib/pipeline-types";

type PipelineDialogState =
  | { type: "new-deal"; stageId?: string }
  | { type: "manage-workflow" }
  | { type: "new-workflow" }
  | { type: "deal"; deal: PipelineDeal }
  | null;

const defaultFilters: PipelineFilters = {
  query: "",
  owner: "all",
  status: "all",
  aiOnly: false
};

export function PipelinePageClient() {
  const [selectedPipelineId, setSelectedPipelineId] = useState(pipelineDemoWorkflows[0]?.id ?? "");
  const [filters, setFilters] = useState<PipelineFilters>(defaultFilters);
  const [dialogState, setDialogState] = useState<PipelineDialogState>(null);

  const selectedWorkflow = pipelineDemoWorkflows.find((workflow) => workflow.id === selectedPipelineId) ?? pipelineDemoWorkflows[0];
  const workflowDeals = pipelineDemoDeals.filter((deal) => deal.pipelineId === selectedWorkflow.id);
  const filteredDeals = filterPipelineDeals(workflowDeals, filters);
  const columns = getPipelineColumns(selectedWorkflow.stages, filteredDeals);
  const summary = getPipelineSummary(filteredDeals);
  const owners = [...new Set(workflowDeals.map((deal) => deal.owner))].sort((left, right) => left.localeCompare(right));
  const hasActiveFilters =
    filters.query.trim().length > 0 || filters.owner !== "all" || filters.status !== "all" || filters.aiOnly;

  useEffect(() => {
    if (!dialogState) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDialogState(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dialogState]);

  useEffect(() => {
    setFilters(defaultFilters);
  }, [selectedPipelineId]);

  return (
    <div className="page-stack pipeline-page">
      <PipelineHeader
        pipelines={pipelineDemoWorkflows}
        selectedPipelineId={selectedPipelineId}
        viewMode="kanban"
        onPipelineChange={setSelectedPipelineId}
        onOpenManageWorkflow={() => setDialogState({ type: "manage-workflow" })}
        onOpenNewWorkflow={() => setDialogState({ type: "new-workflow" })}
        onOpenNewDeal={() => setDialogState({ type: "new-deal" })}
      />

      <PipelineStats
        summary={summary}
        workflowName={selectedWorkflow.name}
        visibleCount={filteredDeals.length}
        totalCount={workflowDeals.length}
      />

      <section className="pipeline-toolbar">
        <div className="pipeline-search-field">
          <label htmlFor="pipeline-search">Buscar deal, cliente u owner</label>
          <input
            id="pipeline-search"
            type="search"
            placeholder="Ej. Catalina, Pedro Leyva, Heliamexico"
            value={filters.query}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                query: event.target.value
              }))
            }
          />
        </div>

        <div className="pipeline-toolbar-controls">
          <div className="pipeline-select-wrap">
            <label htmlFor="owner-filter">Owner</label>
            <select
              id="owner-filter"
              className="pipeline-select"
              value={filters.owner}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  owner: event.target.value
                }))
              }
            >
              <option value="all">Todos los owners</option>
              {owners.map((owner) => (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              ))}
            </select>
          </div>

          <div className="pipeline-filter-pills" aria-label="Filtro de estado">
            {[
              { value: "all", label: "Todos" },
              { value: "open", label: "Abierto" },
              { value: "won", label: "Ganado" },
              { value: "lost", label: "Perdido" }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                className={filters.status === option.value ? "pipeline-filter-pill active" : "pipeline-filter-pill"}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    status: option.value as PipelineFilters["status"]
                  }))
                }
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={filters.aiOnly ? "pipeline-filter-pill active" : "pipeline-filter-pill"}
            onClick={() =>
              setFilters((current) => ({
                ...current,
                aiOnly: !current.aiOnly
              }))
            }
          >
            IA Pulse
          </button>

          {hasActiveFilters ? (
            <button type="button" className="pipeline-text-button" onClick={() => setFilters(defaultFilters)}>
              Limpiar filtros
            </button>
          ) : null}
        </div>
      </section>

      <div className="pipeline-summary-row">
        <span>Leads abiertos: {summary.openLeads}</span>
        <span>Total leads: {summary.totalLeads}</span>
        <span>{filteredDeals.length} visibles en Kanban</span>
      </div>

      <KanbanBoard
        columns={columns}
        onOpenDeal={(deal) => setDialogState({ type: "deal", deal })}
        onAddDeal={(stageId) => setDialogState({ type: "new-deal", stageId })}
      />

      {dialogState?.type === "new-deal" ? (
        <PipelineDialog
          eyebrow="Nuevo deal"
          title="Crear deal"
          description="Placeholder premium listo para conectar con el formulario real en la siguiente iteración."
          onClose={() => setDialogState(null)}
        >
          <div className="pipeline-dialog-grid">
            <div className="pipeline-dialog-card">
              <span>Título</span>
              <strong>Ej. ERP rollout LATAM</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Cliente</span>
              <strong>Contacto + empresa</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Etapa inicial</span>
              <strong>
                {dialogState.stageId
                  ? selectedWorkflow.stages.find((stage) => stage.id === dialogState.stageId)?.name ?? "Lead"
                  : "Lead"}
              </strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Campos previstos</span>
              <strong>Monto, moneda, owner, cierre, probabilidad</strong>
            </div>
          </div>
        </PipelineDialog>
      ) : null}

      {dialogState?.type === "manage-workflow" ? (
        <PipelineDialog
          eyebrow="Workflow"
          title="Gestionar workflow"
          description="La configuración avanzada de etapas, reglas y automatizaciones se conecta en la siguiente entrega."
          onClose={() => setDialogState(null)}
        >
          <div className="pipeline-dialog-grid">
            <div className="pipeline-dialog-card">
              <span>Workflow actual</span>
              <strong>{selectedWorkflow.name}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Etapas activas</span>
              <strong>{selectedWorkflow.stages.length}</strong>
            </div>
            <div className="pipeline-dialog-card pipeline-dialog-card-wide">
              <span>Próximo paso</span>
              <strong>Editor de etapas, probabilidades, automatizaciones y permisos por workflow.</strong>
            </div>
          </div>
        </PipelineDialog>
      ) : null}

      {dialogState?.type === "new-workflow" ? (
        <PipelineDialog
          eyebrow="Nuevo workflow"
          title="Crear workflow"
          description="La vista ya está preparada para sumar Kanban y futura vista Lista sin cambiar la arquitectura."
          onClose={() => setDialogState(null)}
        >
          <div className="pipeline-dialog-grid">
            <div className="pipeline-dialog-card">
              <span>Base prevista</span>
              <strong>Nombre, etapas, probabilidades, estado</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Vista inicial</span>
              <strong>Kanban principal</strong>
            </div>
            <div className="pipeline-dialog-card pipeline-dialog-card-wide">
              <span>Disponibilidad</span>
              <strong>Próximamente se conecta la creación real de workflows reutilizando este layout.</strong>
            </div>
          </div>
        </PipelineDialog>
      ) : null}

      {dialogState?.type === "deal" ? (
        <PipelineDialog
          eyebrow={dialogState.deal.aiPulse ? "IA Pulse" : "Deal"}
          title={dialogState.deal.title}
          description="Detalle breve listo para enlazar con una ficha de oportunidad completa."
          onClose={() => setDialogState(null)}
        >
          <div className="pipeline-dialog-grid">
            <div className="pipeline-dialog-card">
              <span>Cliente</span>
              <strong>
                {dialogState.deal.client}
                {dialogState.deal.company ? ` · ${dialogState.deal.company}` : ""}
              </strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Monto</span>
              <strong>{formatCurrency(dialogState.deal.amount, dialogState.deal.currency, "es-MX")}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Cierre</span>
              <strong>{formatDate(dialogState.deal.closeDate, "es-MX")}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Owner</span>
              <strong>{dialogState.deal.owner}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Probabilidad</span>
              <strong>{dialogState.deal.probability}%</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Estado</span>
              <strong>{getStageStatusLabel(dialogState.deal.status)}</strong>
            </div>
          </div>
        </PipelineDialog>
      ) : null}
    </div>
  );
}
