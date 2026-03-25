import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { ValueHistoryTimeline } from "@/remax-demo/components/value-history-timeline";
import { remaxDemoProperties, remaxDemoValueHistory } from "@/remax-demo/data";
import {
  formatCurrencyMXN,
  formatDateLong,
  getSingleSearchParam
} from "@/remax-demo/formatters";
import {
  getPriceChangeSummary,
  getPropertyByClave,
  getPropertyValueHistory,
  getRecentPriceChanges
} from "@/remax-demo/stats";

export default async function ValoresPage({
  searchParams
}: {
  searchParams: Promise<{ propiedad?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedKey = getSingleSearchParam(params.propiedad) ?? "RMX-ACT-207";
  const selectedProperty = getPropertyByClave(selectedKey) ?? remaxDemoProperties[0];
  const selectedHistory = getPropertyValueHistory(selectedProperty.clave);
  const summary = getPriceChangeSummary();
  const alerts = getRecentPriceChanges();

  return (
    <div className="page-stack">
      <RemaxPageHeader
        eyebrow="Trazabilidad comercial"
        title="Historial de valores"
        description="Modulo demo para mostrar que la nueva plataforma conserva historico de precio limpio, consultable y auditable por propiedad, con fecha, motivo, cierre y responsable."
        actions={
          <div className="button-row">
            <Link href="/remax-demo/propiedades" className="button button-secondary">
              Ver propiedades
            </Link>
            <Link href="/remax-demo/comunicados" className="button">
              Ver comunicados
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard
          label="Registros historicos"
          value={String(summary.totalRecords)}
          detail="Auditoria comercial"
        />
        <StatCard
          label="Propiedades con ajustes"
          value={String(summary.adjustedProperties)}
          detail="Mas de un valor registrado"
        />
        <StatCard
          label="Delta promedio"
          value={formatCurrencyMXN(summary.averageDelta)}
          detail="Impacto medio por ajuste"
        />
        <StatCard
          label="Propiedad seleccionada"
          value={selectedProperty.clave}
          detail={selectedProperty.domicilio}
        />
      </div>

      <div className="two-columns">
        <SectionCard
          title={`Timeline de ${selectedProperty.clave}`}
          description="Visual de historico para una propiedad seleccionable desde la tabla."
        >
          <ValueHistoryTimeline events={selectedHistory} />
        </SectionCard>

        <SectionCard
          title="Resumen del activo"
          description="Vista lateral pensada para consulta comercial y direccion."
        >
          <div className="info-grid">
            <div className="info-item">
              <span>Propiedad</span>
              <strong>{selectedProperty.domicilio}</strong>
            </div>
            <div className="info-item">
              <span>Operacion</span>
              <strong>
                {selectedProperty.operacion} · {selectedProperty.tipo}
              </strong>
            </div>
            <div className="info-item">
              <span>Precio actual</span>
              <strong>{formatCurrencyMXN(selectedProperty.precioActual)}</strong>
            </div>
            <div className="info-item">
              <span>Historial visible</span>
              <strong>{selectedHistory.length} eventos</strong>
            </div>
          </div>

          <ul className="list">
            {alerts.map((event) => (
              <li key={event.id} className="list-item">
                <strong>
                  <Link href={`/remax-demo/valores?propiedad=${event.propiedadClave}`}>
                    {event.propiedadClave}
                  </Link>
                </strong>
                <span className="muted">
                  {formatDateLong(event.fecha)} · {event.motivo}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard
        title="Bitacora completa de valores"
        description="Tabla demo portfolio-wide para consulta por direccion, operaciones y asesores."
      >
        <DataTable
          rows={[...remaxDemoValueHistory].sort((left, right) => right.fecha.localeCompare(left.fecha))}
          getRowId={(row) => row.id}
          columns={[
            {
              key: "propiedad",
              label: "Propiedad",
              render: (row) => (
                <div>
                  <Link href={`/remax-demo/valores?propiedad=${row.propiedadClave}`}>
                    <strong>{row.propiedadClave}</strong>
                  </Link>
                  <div className="muted">{row.usuario}</div>
                </div>
              )
            },
            {
              key: "fecha",
              label: "Fecha",
              render: (row) => formatDateLong(row.fecha)
            },
            {
              key: "anterior",
              label: "Valor anterior",
              align: "right",
              render: (row) =>
                row.valorAnterior === null ? "Alta inicial" : formatCurrencyMXN(row.valorAnterior)
            },
            {
              key: "nuevo",
              label: "Nuevo valor",
              align: "right",
              render: (row) => formatCurrencyMXN(row.valorNuevo)
            },
            {
              key: "motivo",
              label: "Motivo",
              render: (row) => (
                <div>
                  <strong>{row.motivo}</strong>
                  <div className="muted">{row.cierre ?? "Sin cierre asociado"}</div>
                </div>
              )
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}
