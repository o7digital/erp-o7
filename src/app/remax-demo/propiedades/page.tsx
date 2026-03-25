import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { PropertyRoleStack } from "@/remax-demo/components/property-role-stack";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { ValueHistoryTimeline } from "@/remax-demo/components/value-history-timeline";
import { remaxDemoProperties } from "@/remax-demo/data";
import {
  formatCurrencyMXN,
  formatDateLong,
  getSingleSearchParam
} from "@/remax-demo/formatters";
import {
  getPortfolioStats,
  getPropertiesWithMultipleRoles,
  getPropertyByClave,
  getPropertyCommunications,
  getPropertyRoleMatrix,
  getPropertyValueHistory
} from "@/remax-demo/stats";

function getStatusTone(status: string) {
  if (status === "Activa") {
    return "success" as const;
  }

  if (status === "Cerrada") {
    return "info" as const;
  }

  return "danger" as const;
}

export default async function PropiedadesPage({
  searchParams
}: {
  searchParams: Promise<{ propiedad?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedKey = getSingleSearchParam(params.propiedad) ?? "RMX-ACT-210";
  const selectedProperty = getPropertyByClave(selectedKey) ?? remaxDemoProperties[0];
  const history = getPropertyValueHistory(selectedProperty.clave);
  const communications = getPropertyCommunications(selectedProperty.clave);
  const roleMatrix = getPropertyRoleMatrix(selectedProperty);
  const multiRoleAdvisors = roleMatrix.filter((item) => item.roles.length > 1);
  const stats = getPortfolioStats();
  const propertiesWithMultipleRoles = getPropertiesWithMultipleRoles().length;

  return (
    <div className="page-stack">
      <RemaxPageHeader
        eyebrow="Operacion actual + mejora propuesta"
        title="Propiedades"
        description="Vista demo del flujo inmobiliario que hoy vive en Access: alta de propiedad, baja por cierre, cancelacion, propietario, ficha tecnica, valores y comunicados. Aqui se ve con claridad la mejora del nuevo modelo de roles."
        actions={
          <div className="button-row">
            <Link href="/remax-demo/asesores" className="button button-secondary">
              Revisar asesores
            </Link>
            <Link href="/remax-demo/comunicados" className="button">
              Ver comunicados
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard label="Activas" value={String(stats.activeProperties)} detail="Inventario disponible" />
        <StatCard label="Cerradas" value={String(stats.closedProperties)} detail="Bajas por cierre" />
        <StatCard
          label="Canceladas"
          value={String(stats.cancelledProperties)}
          detail="Salidas registradas"
        />
        <StatCard
          label="Propiedades con roles multiples"
          value={String(propertiesWithMultipleRoles)}
          detail="Ventaja frente a Access"
        />
      </div>

      <div className="two-columns">
        <SectionCard
          title="Inventario demo"
          description="12 a 20 propiedades realistas con operacion, historico y responsables de alta, baja y cancelacion."
        >
          <DataTable
            rows={remaxDemoProperties}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "clave",
                label: "Clave",
                render: (row) => (
                  <div>
                    <Link href={`/remax-demo/propiedades?propiedad=${row.clave}`}>
                      <strong>{row.clave}</strong>
                    </Link>
                    <div className="muted">{row.domicilio}</div>
                  </div>
                )
              },
              {
                key: "perfil",
                label: "Operacion",
                render: (row) => (
                  <div>
                    <strong>{row.operacion}</strong>
                    <div className="muted">
                      {row.tipo} · {row.giro}
                    </div>
                  </div>
                )
              },
              {
                key: "ubicacion",
                label: "Municipio",
                render: (row) => `${row.municipio}, ${row.estado}`
              },
              {
                key: "estatus",
                label: "Estatus",
                render: (row) => <StatusBadge value={row.estatus} tone={getStatusTone(row.estatus)} />
              },
              {
                key: "roles",
                label: "Roles",
                render: (row) =>
                  `${row.asesoresAlta.length} alta · ${row.asesoresBaja.length} baja · ${row.asesoresCancelacion.length} cancelacion`
              },
              {
                key: "precio",
                label: "Precio actual",
                align: "right",
                render: (row) => formatCurrencyMXN(row.precioActual)
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title={`Detalle de ${selectedProperty.clave}`}
          description="Panel consultable para demostrar ficha operativa, responsables por etapa y trazabilidad real."
        >
          <div className="info-grid">
            <div className="info-item">
              <span>Domicilio</span>
              <strong>{selectedProperty.domicilio}</strong>
            </div>
            <div className="info-item">
              <span>Propietario principal</span>
              <strong>{selectedProperty.propietario}</strong>
            </div>
            <div className="info-item">
              <span>Fecha de alta</span>
              <strong>{formatDateLong(selectedProperty.fechaAlta)}</strong>
            </div>
            <div className="info-item">
              <span>Precio actual</span>
              <strong>{formatCurrencyMXN(selectedProperty.precioActual)}</strong>
            </div>
            <div className="info-item">
              <span>Condiciones</span>
              <strong>{selectedProperty.condicionesOperacion}</strong>
            </div>
            <div className="info-item">
              <span>Ficha tecnica</span>
              <strong>{selectedProperty.fichaResumen}</strong>
            </div>
          </div>

          <div className="remax-role-grid">
            <PropertyRoleStack
              title="Asesores de alta"
              advisorIds={selectedProperty.asesoresAlta}
              emptyLabel="Sin asesores registrados en alta."
            />
            <PropertyRoleStack
              title="Asesores de baja / cierre"
              advisorIds={selectedProperty.asesoresBaja}
              emptyLabel="Todavia sin cierre registrado."
            />
            <PropertyRoleStack
              title="Asesores de cancelacion"
              advisorIds={selectedProperty.asesoresCancelacion}
              emptyLabel="Sin cancelacion asociada."
            />
          </div>

          {multiRoleAdvisors.length > 0 ? (
            <div className="remax-highlight-callout">
              <strong>Mejora clave del nuevo sistema</strong>
              <p>
                {multiRoleAdvisors.map((item) => `${item.advisor.nombre}: ${item.roles.join(", ")}`).join(" · ")}
              </p>
            </div>
          ) : null}

          <div className="remax-compact-list">
            <div>
              <span>Comunicados asociados</span>
              <strong>{communications.length}</strong>
            </div>
            <div>
              <span>Eventos de valor</span>
              <strong>{history.length}</strong>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard
          title="Historico de valores de la propiedad seleccionada"
          description="Linea de tiempo demo para evidenciar que el nuevo sistema conserva cada ajuste con fecha, motivo, cierre y responsable."
        >
          <ValueHistoryTimeline events={history} />
        </SectionCard>

        <SectionCard
          title="Modelo nuevo de roles"
          description="Representacion clara del cambio de arquitectura funcional frente a Access."
        >
          <div className="remax-code-card">
            <code className="mono">
              {`{
  clave: "${selectedProperty.clave}",
  asesoresAlta: [${selectedProperty.asesoresAlta.map((item) => `"${item}"`).join(", ")}],
  asesoresBaja: [${selectedProperty.asesoresBaja.map((item) => `"${item}"`).join(", ")}],
  asesoresCancelacion: [${selectedProperty.asesoresCancelacion.map((item) => `"${item}"`).join(", ")}]
}`}
            </code>
          </div>

          <ul className="list">
            {communications.map((communication) => (
              <li key={communication.id} className="list-item">
                <strong>{communication.asunto}</strong>
                <span className="muted">
                  {formatDateLong(communication.fecha)} · {communication.tipo}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
