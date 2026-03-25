export type PipelineStageStatus = "open" | "won" | "lost";

export type PipelineViewMode = "kanban" | "list";

export interface PipelineStage {
  id: string;
  name: string;
  probability: number;
  status: PipelineStageStatus;
  position: number;
}

export interface PipelineWorkflow {
  id: string;
  name: string;
  description: string;
  stages: PipelineStage[];
}

export interface PipelineDeal {
  id: string;
  pipelineId: string;
  title: string;
  client: string;
  company?: string;
  amount: number;
  currency: string;
  stage: string;
  probability: number;
  status: PipelineStageStatus;
  closeDate: string;
  owner: string;
  aiPulse: boolean;
}

export interface CurrencyTotal {
  currency: string;
  amount: number;
}

export interface PipelineColumnData {
  stage: PipelineStage;
  deals: PipelineDeal[];
  dealCount: number;
  totals: CurrencyTotal[];
}

export interface PipelineSummary {
  openLeads: number;
  totalLeads: number;
  openValueTotals: CurrencyTotal[];
  totalValueTotals: CurrencyTotal[];
}

export interface PipelineFilters {
  query: string;
  owner: string;
  status: PipelineStageStatus | "all";
  aiOnly: boolean;
}
