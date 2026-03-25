import { StatusBadge } from "@/components/status-badge";
import { formatPropertyAddress } from "@/remax-demo/formatters";
import type { RemaxProperty } from "@/remax-demo/types";

function getTone(status: RemaxProperty["estatus"]) {
  if (status === "Activa") {
    return "success" as const;
  }

  if (status === "Cerrada") {
    return "info" as const;
  }

  return "danger" as const;
}

export function PropertyBanner({
  property,
  title
}: {
  property: RemaxProperty;
  title: string;
}) {
  return (
    <div className="remax-property-banner">
      <div>
        <p className="remax-view-title">{title}</p>
        <div className="remax-property-line">
          <strong>Propiedad:</strong>
          <span>{property.clave}</span>
          <span>{formatPropertyAddress(property)}</span>
        </div>
      </div>
      <StatusBadge value={property.estatus} tone={getTone(property.estatus)} />
    </div>
  );
}
