import { StatusBadge } from "@/components/status-badge";
import { formatDateLong, formatPropertyAddress } from "@/remax-demo/formatters";
import type { RemaxCommunication, RemaxProperty } from "@/remax-demo/types";

function getTone(status: RemaxCommunication["estado"]) {
  if (status === "enviado") {
    return "success" as const;
  }

  return status === "borrador" ? ("warning" as const) : ("neutral" as const);
}

export function CommunicationsPreview({
  communication,
  property
}: {
  communication: RemaxCommunication;
  property?: RemaxProperty;
}) {
  return (
    <article className="remax-communication-preview">
      <div className="remax-communication-header">
        <div>
          <p className="remax-eyebrow">Vista previa</p>
          <h3>{communication.asunto}</h3>
        </div>
        <StatusBadge value={communication.estado} tone={getTone(communication.estado)} />
      </div>

      <div className="info-grid">
        <div className="info-item">
          <span>Tipo</span>
          <strong>{communication.tipo}</strong>
        </div>
        <div className="info-item">
          <span>Fecha</span>
            <strong>{formatDateLong(communication.fecha)}</strong>
          </div>
          <div className="info-item">
            <span>Propiedad</span>
            <strong>
              {property
                ? `${property.clave} · ${formatPropertyAddress(property)}`
                : communication.propiedadClave}
            </strong>
          </div>
        <div className="info-item">
          <span>Destinatarios</span>
          <strong>{communication.destinatarios.length}</strong>
        </div>
      </div>

      <div className="remax-message-box">
        <p className="muted">Resumen registrado</p>
        <p>{communication.resumen}</p>
      </div>

      <div className="remax-message-box">
        <p className="muted">Firma</p>
        <p>{communication.firma}</p>
      </div>

      <div className="remax-message-box">
        <p className="muted">Distribucion</p>
        <div className="inline-stack">
          {communication.destinatarios.map((recipient) => (
            <span key={recipient} className="badge badge-neutral">
              {recipient}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
