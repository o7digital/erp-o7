import Link from "next/link";

import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { AdvisorBadge } from "@/remax-demo/components/advisor-badge";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { remaxDemoAdvisors } from "@/remax-demo/data";
import {
  formatPercent,
  getSingleSearchParam
} from "@/remax-demo/formatters";
import {
  getAdvisorAssignments,
  getAdvisorById,
  getAdvisorParticipation,
  getPortfolioStats
} from "@/remax-demo/stats";

function getStaffDetail(advisorId: string) {
  const advisor = getAdvisorById(advisorId);

  if (!advisor) {
    return null;
  }

  const participation = getAdvisorParticipation(advisor.id);
  const linkedProperties = getAdvisorAssignments(advisor.id);

  return { advisor, participation, linkedProperties };
}

export default async function AsesoresPage({
  searchParams
}: {
  searchParams: Promise<{ asesor?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedId = getSingleSearchParam(params.asesor) ?? "pedro-leyva";
  const selected = getStaffDetail(selectedId) ?? getStaffDetail("pedro-leyva");
  const stats = getPortfolioStats();

  if (!selected) {
    return null;
  }

  return (
    <div className="page-stack">
      <RemaxPageHeader
        eyebrow="Equipo comercial y staff"
        title="Asesores"
        description="Dataset demo con asesores clase A y M, staff administrativo, recepcion y el caso especial de Pedro Leyva como Director General y Asesor A. Se muestra comision, cartera activa y participacion por tipo de evento."
        actions={
          <div className="button-row">
            <Link href="/remax-demo/propiedades" className="button button-secondary">
              Volver a propiedades
            </Link>
            <Link href="/remax-demo/arquitectura" className="button">
              Ver propuesta tecnica
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard label="Clase A" value={String(stats.advisorsA)} detail="Mayor comision" />
        <StatCard label="Clase M" value={String(stats.advisorsM)} detail="Nivel nuevo / junior" />
        <StatCard label="Administrativos" value={String(stats.adminStaff)} detail="Operacion y control" />
        <StatCard label="Recepcion" value={String(stats.receptionStaff)} detail="Agenda comercial" />
      </div>

      <div className="two-columns">
        <SectionCard
          title="Directorio demo"
          description="Cards premium con diferenciacion visual por clase y tipo de personal."
        >
          <div className="remax-advisors-grid">
            {remaxDemoAdvisors.map((advisor) => {
              const participation = getAdvisorParticipation(advisor.id);
              const linkedProperties = getAdvisorAssignments(advisor.id);

              return (
                <Link
                  key={advisor.id}
                  href={`/remax-demo/asesores?asesor=${advisor.id}`}
                  className={`remax-advisor-card ${advisor.id === selected.advisor.id ? "active" : ""}`}
                >
                  <AdvisorBadge advisor={advisor} />
                  <strong>{advisor.rol}</strong>
                  <p className="muted">
                    {advisor.activo ? "Activo" : "Inactivo"} · {linkedProperties.length} propiedades vinculadas
                  </p>
                  <div className="remax-advisor-meta">
                    <span>Comision</span>
                    <strong>{formatPercent(advisor.comisionRate)}</strong>
                  </div>
                  <div className="remax-advisor-meta">
                    <span>Participacion</span>
                    <strong>
                      {participation.altas} alta · {participation.bajas} baja · {participation.cancelaciones} cancelacion
                    </strong>
                  </div>
                </Link>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard
          title={`Ficha de ${selected.advisor.nombre}`}
          description="Resumen del asesor seleccionado para reforzar el entendimiento del modelo organizacional."
        >
          <div className="info-grid">
            <div className="info-item">
              <span>Rol principal</span>
              <strong>{selected.advisor.rol}</strong>
            </div>
            <div className="info-item">
              <span>Clase / tipo</span>
              <strong>
                {selected.advisor.clase ? `Clase ${selected.advisor.clase}` : "Staff"}
              </strong>
            </div>
            <div className="info-item">
              <span>Comision base</span>
              <strong>{formatPercent(selected.advisor.comisionRate)}</strong>
            </div>
            <div className="info-item">
              <span>Estatus</span>
              <strong>{selected.advisor.activo ? "Activo" : "Inactivo"}</strong>
            </div>
          </div>

          <div className="remax-compact-list">
            <div>
              <span>Propiedades activas vinculadas</span>
              <strong>{selected.participation.activasVinculadas}</strong>
            </div>
            <div>
              <span>Total de propiedades</span>
              <strong>{selected.participation.total}</strong>
            </div>
            <div>
              <span>Participacion en alta / baja / cancelacion</span>
              <strong>
                {selected.participation.altas} / {selected.participation.bajas} / {selected.participation.cancelaciones}
              </strong>
            </div>
          </div>

          <div className="remax-inline-note">
            <StatusBadge
              value={
                selected.advisor.clase === "A"
                  ? "Clase A = comision mayor"
                  : selected.advisor.clase === "M"
                    ? "Clase M = nivel nuevo"
                    : "Staff administrativo"
              }
              tone={selected.advisor.clase === "A" ? "success" : selected.advisor.clase === "M" ? "info" : "neutral"}
            />
          </div>

          <ul className="list">
            {selected.linkedProperties.map((property) => (
              <li key={property.id} className="list-item">
                <strong>
                  <Link href={`/remax-demo/propiedades?propiedad=${property.clave}`}>
                    {property.clave}
                  </Link>
                </strong>
                <span className="muted">
                  {property.estatus} · {property.operacion} · {property.tipo}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard
        title="Esquema de clases y estructura operativa"
        description="Visual corto para explicar el organigrama comercial al cliente durante la demo."
      >
        <div className="remax-context-grid">
          <article className="remax-context-card">
            <span>Clase A</span>
            <strong>Asesor experto</strong>
            <p>Mayor comision, cierres complejos y soporte a cuentas clave.</p>
          </article>
          <article className="remax-context-card">
            <span>Clase M</span>
            <strong>Nivel nuevo / junior</strong>
            <p>Prospeccion, seguimiento y crecimiento hacia cierres propios.</p>
          </article>
          <article className="remax-context-card">
            <span>Administrativos</span>
            <strong>4 personas</strong>
            <p>Comisiones, expedientes, coordinacion operativa y backoffice.</p>
          </article>
          <article className="remax-context-card">
            <span>Recepcion</span>
            <strong>1 persona</strong>
            <p>Agenda comercial, recepcion y apoyo al flujo de visitas.</p>
          </article>
        </div>
      </SectionCard>
    </div>
  );
}
