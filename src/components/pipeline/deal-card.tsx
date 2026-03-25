import { formatCurrency, formatDate } from "@/lib/formatters";
import type { PipelineDeal } from "@/lib/pipeline-types";

export function DealCard({
  deal,
  onOpen
}: {
  deal: PipelineDeal;
  onOpen: (deal: PipelineDeal) => void;
}) {
  return (
    <button type="button" className="deal-card" onClick={() => onOpen(deal)}>
      <div className="deal-card-top">
        <div>
          <p className="deal-card-title">{deal.title}</p>
          <p className="deal-card-client">
            Cliente: {deal.client}
            {deal.company ? ` · ${deal.company}` : ""}
          </p>
        </div>
        <span className="deal-probability-badge">{deal.probability}%</span>
      </div>

      <div className="deal-card-meta">
        <span>{deal.owner}</span>
        <span>Cierre: {formatDate(deal.closeDate, "es-MX")}</span>
      </div>

      <div className="deal-card-footer">
        <strong>{formatCurrency(deal.amount, deal.currency, "es-MX")}</strong>
        <div className="deal-card-badges">
          {deal.aiPulse ? <span className="deal-ai-badge">IA Pulse</span> : null}
          <span className="deal-status-dot">Detalle</span>
        </div>
      </div>
    </button>
  );
}
