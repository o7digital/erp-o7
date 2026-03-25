import Link from "next/link";

import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";

export default function ArquitecturaPage() {
  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Arquitectura propuesta"
        description="Esta seccion viene al final de la demo: primero se valida que el flujo REMAX actual esta bien representado, y despues se presenta la migracion hacia una plataforma moderna."
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo" className="button button-secondary">
              Volver a Menu Operacion
            </Link>
            <Link href="/remax-demo/alta" className="button">
              Abrir demo operativa
            </Link>
          </div>
        }
      />

      <div className="remax-two-columns">
        <AccessSection title="Fase A - Webapp" accent="blue">
          <ul className="remax-feature-list">
            <li>Frontend moderno orientado a flujo operativo, siguiendo la estructura real de REMAX.</li>
            <li>Astro como capa de interfaz para rendimiento y composicion clara.</li>
            <li>Supabase para auth, base de datos y modelo relacional por propiedad, asesor y comunicado.</li>
            <li>Railway para jobs, servicios internos y despliegue backend.</li>
            <li>Historico real, trazabilidad multiusuario y mejor control de roles que Access.</li>
          </ul>
        </AccessSection>

        <AccessSection title="Fase B - Wrapper iOS / Android" accent="red">
          <ul className="remax-feature-list">
            <li>Wrapper movil sobre la misma webapp para asesores en campo.</li>
            <li>Consulta de propiedades, status, comunicados y seguimiento desde telefono.</li>
            <li>Base lista para evolucionar a notificaciones y mas automatizaciones.</li>
            <li>Menor riesgo y menor costo que reescribir toda la operacion en nativo desde cero.</li>
          </ul>
        </AccessSection>
      </div>

      <AccessSection title="Traduccion de problema a solucion">
        <div className="remax-context-grid">
          <article className="remax-context-card">
            <span>Sistema actual</span>
            <strong>Access + Outlook</strong>
            <p>Opera, pero con pantallas fragmentadas, limitacion para roles multiples y mantenimiento complicado.</p>
          </article>
          <article className="remax-context-card">
            <span>Propuesta</span>
            <strong>Access modernizado</strong>
            <p>Se preserva la logica real del negocio, pero con mejor UX, historico limpio y trazabilidad centralizada.</p>
          </article>
          <article className="remax-context-card">
            <span>Beneficio</span>
            <strong>Cliente se reconoce</strong>
            <p>La demo hace visible el sistema actual, pero mejorado, sin convertirlo en un ERP abstracto.</p>
          </article>
        </div>
      </AccessSection>
    </div>
  );
}
