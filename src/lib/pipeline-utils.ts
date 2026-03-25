import { formatCurrency } from "@/lib/formatters";
import type {
  CurrencyTotal,
  PipelineColumnData,
  PipelineDeal,
  PipelineFilters,
  PipelineStage,
  PipelineStageStatus,
  PipelineSummary
} from "@/lib/pipeline-types";

const currencyOrder = ["USD", "MXN", "EUR", "CAD"];

function sortCurrencyTotals(totals: CurrencyTotal[]) {
  return [...totals].sort((left, right) => {
    const leftIndex = currencyOrder.indexOf(left.currency);
    const rightIndex = currencyOrder.indexOf(right.currency);

    if (leftIndex === -1 && rightIndex === -1) {
      return left.currency.localeCompare(right.currency);
    }

    if (leftIndex === -1) return 1;
    if (rightIndex === -1) return -1;
    return leftIndex - rightIndex;
  });
}

export function getStageStatusLabel(status: PipelineStageStatus) {
  switch (status) {
    case "won":
      return "Ganado";
    case "lost":
      return "Perdido";
    default:
      return "Abierto";
  }
}

export function getCurrencyTotals(deals: PipelineDeal[]): CurrencyTotal[] {
  const totalsByCurrency = new Map<string, number>();

  for (const deal of deals) {
    totalsByCurrency.set(deal.currency, (totalsByCurrency.get(deal.currency) ?? 0) + deal.amount);
  }

  return sortCurrencyTotals(
    Array.from(totalsByCurrency.entries()).map(([currency, amount]) => ({
      currency,
      amount
    }))
  );
}

export function formatCurrencyTotals(totals: CurrencyTotal[], locale = "es-MX") {
  if (totals.length === 0) {
    return "Sin monto";
  }

  return totals.map((entry) => formatCurrency(entry.amount, entry.currency, locale)).join(" · ");
}

export function filterPipelineDeals(deals: PipelineDeal[], filters: PipelineFilters) {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return deals.filter((deal) => {
    if (filters.owner !== "all" && deal.owner !== filters.owner) {
      return false;
    }

    if (filters.status !== "all" && deal.status !== filters.status) {
      return false;
    }

    if (filters.aiOnly && !deal.aiPulse) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchable = [deal.title, deal.client, deal.company, deal.owner].filter(Boolean).join(" ").toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}

export function getPipelineColumns(stages: PipelineStage[], deals: PipelineDeal[]): PipelineColumnData[] {
  return [...stages]
    .sort((left, right) => left.position - right.position)
    .map((stage) => {
      const stageDeals = deals
        .filter((deal) => deal.stage === stage.id)
        .sort((left, right) => new Date(left.closeDate).getTime() - new Date(right.closeDate).getTime());

      return {
        stage,
        deals: stageDeals,
        dealCount: stageDeals.length,
        totals: getCurrencyTotals(stageDeals)
      };
    });
}

export function getPipelineSummary(deals: PipelineDeal[]): PipelineSummary {
  const openDeals = deals.filter((deal) => deal.status === "open");

  return {
    openLeads: openDeals.length,
    totalLeads: deals.length,
    openValueTotals: getCurrencyTotals(openDeals),
    totalValueTotals: getCurrencyTotals(deals)
  };
}
