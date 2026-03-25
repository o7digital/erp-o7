import { formatCurrencyMXN, formatDateShort } from "@/remax-demo/formatters";
import type { RemaxValueHistory } from "@/remax-demo/types";

export function ValueHistoryTimeline({
  events
}: {
  events: RemaxValueHistory[];
}) {
  const maxValue = Math.max(...events.map((event) => event.valor), 1);

  return (
    <div className="remax-timeline">
      {events.map((event) => (
        <article key={event.id} className="remax-timeline-item">
          <div className="remax-timeline-topline">
            <strong>{formatDateShort(event.fecha)}</strong>
            <span>{event.usuario}</span>
          </div>
          <h4>{event.motivoCambio}</h4>
          <div className="remax-timeline-values">
            <span>{event.motivoMinuta}</span>
            <strong>{formatCurrencyMXN(event.valor)}</strong>
          </div>
          <div className="remax-timeline-bar">
            <span style={{ width: `${Math.max((event.valor / maxValue) * 100, 10)}%` }} />
          </div>
          <p className="muted">Moneda: {event.moneda} · Posicion: {event.posicion || "N/A"}</p>
        </article>
      ))}
    </div>
  );
}
