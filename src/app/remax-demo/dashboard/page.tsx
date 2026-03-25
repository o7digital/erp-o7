import Link from "next/link";

import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { ProblemVsSolution } from "@/remax-demo/components/problem-vs-solution";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { formatCurrencyMXN, formatDateLong } from "@/remax-demo/formatters";
import {
  getLatestPropertyEvents,
  getPortfolioStats,
  getRecentActivity,
  getRecentPriceChanges
} from "@/remax-demo/stats";

function getTone(value: string) {
  if (value === "Activa") {
    return "success" as const;
  }

  if (value === "Cerrada") {
    return "info" as const;
  }

  return "danger" as const;
}

export default function RemaxDashboardPage() {
  const stats = getPortfolioStats();
  const latestAltas = getLatestPropertyEvents("alta");
  const latestCierres = getLatestPropertyEvents("cierre");
  const latestCancelaciones = getLatestPropertyEvents("cancelacion");
  const recentPriceChanges = getRecentPriceChanges();
  const activity = getRecentActivity();

  return (
    <div className="page-stack">
      <RemaxPageHeader
        eyebrow="REMAX Activa"
        title="Dashboard ejecutivo"
        description="Actualmente la operacion de propiedades se gestiona en Microsoft Access. Esta demo muestra el entendimiento del proceso actual, la limitacion de roles por asesor y la propuesta de evolucion hacia una plataforma moderna con Astro, Supabase y Railway."
        actions={
          <div className="button-row">
            <Link href="/remax-demo/propiedades" className="button">
              Ver demo operativa
            </Link>
            <Link href="/remax-demo/arquitectura" className="button button-secondary">
              Revisar arquitectura
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard
          label="Propiedades activas"
          value={String(stats.activeProperties)}
          detail="Inventario vigente"
        />
        <StatCard
          label="Propiedades cerradas"
          value={String(stats.closedProperties)}
          detail="Bajas por cierre"
        />
        <StatCard
          label="Propiedades canceladas"
          value={String(stats.cancelledProperties)}
          detail="Salidas controladas"
        />
        <StatCard
          label="Cambios de precio este mes"
          value={String(stats.priceChangesThisMonth)}
          detail="Trazabilidad comercial"
        />
        <StatCard
          label="Comunicados enviados"
          value={String(stats.communicationsSent)}
          detail="Registro centralizado"
        />
        <StatCard
          label="Asesores clase A"
          value={String(stats.advisorsA)}
          detail="Comision mayor"
        />
        <StatCard
          label="Asesores clase M"
          value={String(stats.advisorsM)}
          detail="Nuevo nivel comercial"
        />
        <StatCard
          label="Administrativos"
          value={String(stats.adminStaff)}
          detail="Control operativo"
        />
        <StatCard
          label="Recepcion"
          value={String(stats.receptionStaff)}
          detail="Agenda y primer filtro"
        />
      </div>

      <SectionCard
        title="Perfil operativo REMAX Activa"
        description="Bloque ejecutivo para explicar el contexto real del cliente sin caer en una landing generica."
      >
        <div className="remax-context-grid">
          <article className="remax-context-card">
            <span>Estructura</span>
            <strong>35 empleados</strong>
            <p>4 administrativos, 1 recepcion y el resto asesores.</p>
          </article>
          <article className="remax-context-card">
            <span>Niveles comerciales</span>
            <strong>Clase A y Clase M</strong>
            <p>La clase A opera con mayor comision y mayor autonomia comercial.</p>
          </article>
          <article className="remax-context-card">
            <span>Liderazgo</span>
            <strong>Pedro Leyva</strong>
            <p>Director General y ademas Asesor A dentro de la operacion.</p>
          </article>
          <article className="remax-context-card">
            <span>Operacion actual</span>
            <strong>Microsoft Access</strong>
            <p>Altas, bajas, cancelaciones, valores, fichas tecnicas y comunicados.</p>
          </article>
          <article className="remax-context-card">
            <span>Punto critico</span>
            <strong>Roles mal modelados</strong>
            <p>Un mismo asesor no puede participar con flexibilidad en alta, cierre y cancelacion.</p>
          </article>
          <article className="remax-context-card">
            <span>Vision objetivo</span>
            <strong>Webapp primero</strong>
            <p>Fase A web moderna; Fase B wrapper movil iOS / Android.</p>
          </article>
        </div>
      </SectionCard>

      <SectionCard
        title="Problema actual vs solucion nueva"
        description="Bloque comercial clave para que la demo venda la migracion y no solo el look & feel."
      >
        <ProblemVsSolution />
      </SectionCard>

      <div className="three-columns">
        <SectionCard title="Ultimas altas" description="Captacion reciente incorporada al inventario.">
          <ul className="list">
            {latestAltas.map(({ fecha, property }) => (
              <li key={property.clave} className="list-item">
                <strong>
                  <Link href={`/remax-demo/propiedades?propiedad=${property.clave}`}>
                    {property.clave}
                  </Link>
                </strong>
                <span className="muted">
                  {formatDateLong(fecha)} · {property.domicilio}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Ultimos cierres" description="Propiedades cerradas y listas para comisiones.">
          <ul className="list">
            {latestCierres.map(({ fecha, property }) => (
              <li key={property.clave} className="list-item">
                <strong>
                  <Link href={`/remax-demo/propiedades?propiedad=${property.clave}`}>
                    {property.clave}
                  </Link>
                </strong>
                <span className="muted">
                  {formatDateLong(fecha)} · {formatCurrencyMXN(property.precioActual)}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Ultimas cancelaciones"
          description="Expedientes con salida controlada y comunicado asociado."
        >
          <ul className="list">
            {latestCancelaciones.map(({ fecha, property }) => (
              <li key={property.clave} className="list-item">
                <strong>
                  <Link href={`/remax-demo/propiedades?propiedad=${property.clave}`}>
                    {property.clave}
                  </Link>
                </strong>
                <span className="muted">
                  {formatDateLong(fecha)} · {property.propietario}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard
          title="Alertas por cambios de precio"
          description="Visibilidad inmediata de los movimientos recientes de valor."
          action={
            <Link href="/remax-demo/valores" className="button button-ghost">
              Ver historico
            </Link>
          }
        >
          <ul className="list">
            {recentPriceChanges.map((event) => (
              <li key={event.id} className="timeline-item">
                <strong>
                  <Link href={`/remax-demo/valores?propiedad=${event.propiedadClave}`}>
                    {event.propiedadClave}
                  </Link>
                </strong>
                <span className="muted">
                  {formatDateLong(event.fecha)} · {formatCurrencyMXN(event.valorNuevo)}
                </span>
                <div className="inline-stack">
                  <StatusBadge value="ajuste" tone="warning" />
                  <StatusBadge value={event.usuario} tone="neutral" />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Actividad reciente"
          description="Timeline transversal de altas, cierres, cancelaciones, comunicados y valores."
        >
          <ul className="list">
            {activity.map((item) => (
              <li key={item.id} className="timeline-item">
                <strong>{item.titulo}</strong>
                <span className="muted">
                  {formatDateLong(item.fecha)} · {item.detalle}
                </span>
                <div className="inline-stack">
                  <StatusBadge value={item.titulo} tone={item.tone} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
