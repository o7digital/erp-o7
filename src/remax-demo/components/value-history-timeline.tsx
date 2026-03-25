import { formatCurrencyMXN, formatDateShort } from "@/remax-demo/formatters";
import type { RemaxValueHistory } from "@/remax-demo/types";

export function ValueHistoryTimeline({
  events
}: {
  events: RemaxValueHistory[];
}) {
  const maxValue = Math.max(...events.map((event) => event.valorNuevo), 1);

  return (
    <div className="remax-timeline">
      {events.map((event) => (
        <article key={event.id} className="remax-timeline-item">
          <div className="remax-timeline-topline">
            <strong>{formatDateShort(event.fecha)}</strong>
            <span>{event.usuario}</span>
          </div>
          <h4>{event.motivo}</h4>
          <div className="remax-timeline-values">
            <span>
              {event.valorAnterior === null
                ? "Sin valor previo"
                : `Anterior: ${formatCurrencyMXN(event.valorAnterior)}`}
            </span>
            <strong>{formatCurrencyMXN(event.valorNuevo)}</strong>
          </div>
          <div className="remax-timeline-bar">
            <span style={{ width: `${Math.max((event.valorNuevo / maxValue) * 100, 10)}%` }} />
          </div>
          <p className="muted">
            {event.cierre ? `${event.cierre}. ` : ""}
            {event.observaciones ?? "Historico preservado para auditoria comercial."}
          </p>
        </article>
      ))}
    </div>
  );
}
