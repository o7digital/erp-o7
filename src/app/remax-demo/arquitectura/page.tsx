import Link from "next/link";

import { SectionCard } from "@/components/section-card";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { ProblemVsSolution } from "@/remax-demo/components/problem-vs-solution";

export default function ArquitecturaPage() {
  return (
    <div className="page-stack">
      <RemaxPageHeader
        eyebrow="Propuesta tecnica y roadmap"
        title="Arquitectura / roadmap"
        description="La propuesta consiste en migrar la operacion actual de Microsoft Access a una plataforma moderna desarrollada con Astro + Supabase + Railway, iniciando con una webapp de trabajo diario y evolucionando despues a una version movil iOS / Android mediante wrapper."
        actions={
          <div className="button-row">
            <Link href="/remax-demo/dashboard" className="button button-secondary">
              Regresar al dashboard
            </Link>
            <Link href="/remax-demo/propiedades" className="button">
              Abrir modulo demo
            </Link>
          </div>
        }
      />

      <SectionCard
        title="Problema actual y objetivo del proyecto"
        description="La demo no vende solo UI: vende entendimiento de proceso, riesgo y solucion."
      >
        <ProblemVsSolution />
      </SectionCard>

      <div className="cards-grid">
        <SectionCard
          title="Fase A · Webapp moderna"
          description="Primera entrega enfocada en operacion diaria, multiusuario y trazabilidad."
        >
          <div className="remax-roadmap-card">
            <ul className="remax-feature-list">
              <li>Frontend en Astro con una experiencia de trabajo mucho mas clara que Access.</li>
              <li>Supabase para auth, base de datos y relaciones limpias por propiedad y asesor.</li>
              <li>Railway para servicios backend, jobs y despliegues controlados.</li>
              <li>Historico real de precios, roles multiples, bitacora y comunicados centralizados.</li>
            </ul>
          </div>
        </SectionCard>

        <SectionCard
          title="Fase B · Mobile wrap"
          description="Evolucion de la webapp hacia experiencia de campo para asesores."
        >
          <div className="remax-roadmap-card">
            <ul className="remax-feature-list">
              <li>Wrapper iOS / Android sobre la webapp existente.</li>
              <li>Consulta movil de propiedades, comunicados y seguimiento comercial.</li>
              <li>Base preparada para notificaciones y tareas desde campo.</li>
              <li>Menor costo de evolucion que construir nativo desde cero.</li>
            </ul>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Arquitectura propuesta"
        description="Diagrama resumido para explicar stack y responsabilidades tecnicas."
      >
        <div className="remax-architecture-grid">
          <article className="remax-architecture-card">
            <span>Frontend</span>
            <strong>Astro</strong>
            <p>Shell de producto, dashboards, modulo de propiedades, asesores, historico y comunicados.</p>
          </article>
          <article className="remax-architecture-card">
            <span>Core de negocio</span>
            <strong>Supabase</strong>
            <p>Auth, base de datos relacional, reglas de acceso y modelo multirol por propiedad.</p>
          </article>
          <article className="remax-architecture-card">
            <span>Servicios</span>
            <strong>Railway</strong>
            <p>Jobs, APIs internas, comunicados automativos, observabilidad y despliegue operacional.</p>
          </article>
        </div>

        <div className="remax-architecture-flow">
          <div className="remax-flow-step">
            <span>1</span>
            <strong>Operacion</strong>
            <p>Alta, baja, cancelacion, cambios de valor y seguimiento comercial.</p>
          </div>
          <div className="remax-flow-step">
            <span>2</span>
            <strong>Trazabilidad</strong>
            <p>Historico, comunicados y participacion de asesores por rol.</p>
          </div>
          <div className="remax-flow-step">
            <span>3</span>
            <strong>Escalabilidad</strong>
            <p>Base lista para crecer a app movil y nuevas automatizaciones.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Beneficio visible para la venta"
        description="Traduccion del stack a lenguaje negocio."
      >
        <div className="remax-context-grid">
          <article className="remax-context-card">
            <span>Multiusuario</span>
            <strong>Operacion mas ordenada</strong>
            <p>35 personas trabajando en una misma plataforma con menos dependencias manuales.</p>
          </article>
          <article className="remax-context-card">
            <span>Roles multiples</span>
            <strong>Modelo correcto por propiedad</strong>
            <p>El mismo asesor puede participar en alta, cierre y cancelacion sin romper el expediente.</p>
          </article>
          <article className="remax-context-card">
            <span>Historico</span>
            <strong>Datos que si sirven</strong>
            <p>Precios, cambios y comunicados quedan visibles para direccion, admins y asesores.</p>
          </article>
          <article className="remax-context-card">
            <span>Camino movil</span>
            <strong>Fase B clara</strong>
            <p>No se vende humo: primero webapp fuerte, despues wrapper movil con menor riesgo.</p>
          </article>
        </div>
      </SectionCard>
    </div>
  );
}
