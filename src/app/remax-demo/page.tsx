import Link from "next/link";

import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { getMenuStats, getPortfolioSummary } from "@/remax-demo/stats";

const edicionButtons = [
  { label: "PROPIEDADES", href: "/remax-demo/alta?step=expediente&propiedad=IBR-OP277" },
  { label: "Cambios Minuta", href: "/remax-demo/valores?propiedad=CBR-1748" },
  { label: "Asesores por Mes", href: "/remax-demo/asesores" },
  { label: "Valor de la Propiedad", href: "/remax-demo/alta?step=valores&propiedad=IBR-OP277" },
  { label: "Propietarios", href: "/remax-demo/propietarios?propiedad=IBR-OP277" },
  { label: "Asesores Internos", href: "/remax-demo/asesores" },
  { label: "% Comisión Global Generada", href: "/remax-demo/alta?step=condiciones&propiedad=IBR-OP277" },
  { label: "Ofertas", href: "/remax-demo/alta?step=expediente&propiedad=ICV-441" },
  { label: "Socios", href: "/remax-demo/propietarios?propiedad=ICV-441" },
  { label: "Asesores ALTA", href: "/remax-demo/alta?step=asesores&propiedad=IBR-OP277" }
];

const capturaButtons = [
  { label: "Actividad en Portales", href: "/remax-demo/alta?step=expediente&propiedad=ICV-441" },
  { label: "Programa de Actividades", href: "/remax-demo/alta?step=expediente&propiedad=IBR-OP277" },
  { label: "Directorio Inmobiliario", href: "/remax-demo/propietarios" },
  { label: "Referidos", href: "/remax-demo/asesores" },
  { label: "Inventario Oficina", href: "/remax-demo" },
  { label: "Enlaces M Publicidad Digital", href: "/remax-demo/comunicados" },
  { label: "Actividades Asesores", href: "/remax-demo/asesores" },
  { label: "Guardias", href: "/remax-demo" },
  { label: "Incidentes Asesores", href: "/remax-demo/asesores" },
  { label: "Control de Salas", href: "/remax-demo" },
  { label: "Control Llaves", href: "/remax-demo/alta?step=expediente&propiedad=IBR-OP277" },
  { label: "Programar Recorridos", href: "/remax-demo/baja?step=busqueda" },
  { label: "Programar Guardias", href: "/remax-demo" },
  { label: "Black List", href: "/remax-demo" },
  { label: "Rótulos", href: "/remax-demo/arquitectura" },
  { label: "Llamada, Correos, WhatsApp", href: "/remax-demo/comunicados" },
  { label: "Visitas", href: "/remax-demo/baja?step=busqueda" },
  { label: "Leads Mensuales", href: "/remax-demo/asesores" },
  { label: "Asistencia Staff", href: "/remax-demo" },
  { label: "1. Generación de Minuta", href: "/remax-demo/valores?propiedad=CBR-1748" }
];

const consultaButtons = [
  { label: "Visitas Programadas", href: "/remax-demo/baja?step=busqueda" },
  { label: "Visitas Programa Excel", href: "/remax-demo/baja?step=busqueda" },
  { label: "Guardias Asignación", href: "/remax-demo/asesores" },
  { label: "Ficha Referidos", href: "/remax-demo/propietarios" },
  { label: "Control Asistencia Staff", href: "/remax-demo" },
  { label: "Control Asistencia Staff 2", href: "/remax-demo" },
  { label: "Llamadas Detalle", href: "/remax-demo/comunicados" },
  { label: "Consulta Detalle de Llamadas", href: "/remax-demo/comunicados" }
];

const rightRailButtons = [
  { label: "Altas Datos", href: "/remax-demo/alta?step=expediente&propiedad=IBR-OP277" },
  { label: "Bajas Datos", href: "/remax-demo/baja?step=registro&propiedad=CBR-1748" },
  { label: "Ofertas Datos", href: "/remax-demo/valores?propiedad=ICV-441" }
];

export default function RemaxMenuOperacionPage() {
  const menuStats = getMenuStats();
  const summary = getPortfolioSummary();

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Menú Operación"
        description="Centro de operaciones inspirado directamente en REMAX Access: alta de propiedad, baja / cierre, cancelacion, valores, asesores, propietarios y comunicados. La prioridad es representar el flujo real, no un ERP generico."
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo/alta" className="button">
              INICIO
            </Link>
            <Link href="/remax-demo/baja" className="button button-secondary">
              BAJAS
            </Link>
            <Link href="/remax-demo/cancelacion" className="button button-secondary">
              CANCELACIONES
            </Link>
          </div>
        }
      />

      <div className="remax-summary-strip">
        <div>
          <span>Altas activas</span>
          <strong>{summary.alta}</strong>
        </div>
        <div>
          <span>Bajas / cierres</span>
          <strong>{summary.baja}</strong>
        </div>
        <div>
          <span>Cancelaciones</span>
          <strong>{summary.cancelacion}</strong>
        </div>
        <div>
          <span>Comunicados</span>
          <strong>{menuStats.communications}</strong>
        </div>
        <div>
          <span>Asesores A / M</span>
          <strong>
            {menuStats.advisorsA} / {menuStats.advisorsM}
          </strong>
        </div>
      </div>

      <div className="remax-menu-hero">
        <div className="remax-menu-banner">
          <span>2026</span>
          <Link href="/remax-demo/comunicados" className="remax-mini-launch">
            Cliente Informe
          </Link>
        </div>
        <div className="remax-process-rack">
          <div className="remax-process-line">
            <span>Iniciar proceso para registrar ALTA de una nueva Propiedad:</span>
            <Link href="/remax-demo/alta?step=clave&propiedad=IBR-OP277" className="remax-process-button primary">
              INICIO
            </Link>
          </div>
          <div className="remax-process-line">
            <span>Iniciar Proceso de Baja</span>
            <Link href="/remax-demo/baja?step=busqueda&propiedad=CBR-1748" className="remax-process-button danger">
              BAJAS
            </Link>
          </div>
          <div className="remax-process-line">
            <span>Iniciar Proceso de Cancelación</span>
            <Link href="/remax-demo/cancelacion?step=busqueda&propiedad=RTV-571" className="remax-process-button warning">
              CANCELACIONES
            </Link>
          </div>
        </div>
        <div className="remax-menu-shortcuts">
          <Link href="/remax-demo/cancelacion?step=registro&propiedad=RTV-571" className="remax-mini-launch">
            Cancelación
          </Link>
          <Link href="/remax-demo" className="remax-mini-launch">
            Menú Chris
          </Link>
          <Link href="/remax-demo/alta?step=expediente&propiedad=ICV-441" className="remax-mini-launch">
            Altas Alondra
          </Link>
          <Link href="/remax-demo/baja?step=registro&propiedad=CBR-1748" className="remax-mini-launch">
            Cierres Alondra
          </Link>
        </div>
      </div>

      <div className="remax-operation-layout">
        <div className="remax-operation-main">
          <AccessSection title="Edición y Actualización" accent="blue">
            <div className="remax-access-button-grid">
              {edicionButtons.map((button) => (
                <Link key={button.label} href={button.href} className="remax-access-button">
                  {button.label}
                </Link>
              ))}
            </div>
          </AccessSection>

          <AccessSection title="Captura de Operación" accent="red">
            <div className="remax-access-button-grid remax-access-button-grid-wide">
              {capturaButtons.map((button) => (
                <Link key={button.label} href={button.href} className="remax-access-button">
                  {button.label}
                </Link>
              ))}
            </div>
          </AccessSection>
        </div>

        <div className="remax-operation-side">
          <AccessSection title="Consultas" accent="gold">
            <div className="remax-access-button-grid">
              {consultaButtons.map((button) => (
                <Link key={button.label} href={button.href} className="remax-access-button">
                  {button.label}
                </Link>
              ))}
            </div>
          </AccessSection>

          <AccessSection title="Altas / Bajas / Ofertas" accent="blue">
            <div className="remax-access-button-grid">
              {rightRailButtons.map((button) => (
                <Link key={button.label} href={button.href} className="remax-access-button emphasized">
                  {button.label}
                </Link>
              ))}
            </div>
          </AccessSection>

          <AccessSection title="Control" accent="red">
            <div className="remax-control-panel">
              <div className="remax-control-row">
                <span>Corte:</span>
                <strong>01/03/2026</strong>
              </div>
              <div className="remax-access-button-grid">
                <Link href="/remax-demo/asesores" className="remax-access-button emphasized">
                  Actualización de Comisiones
                </Link>
                <Link href="/remax-demo/comunicados" className="remax-access-button">
                  Minuta a Excel
                </Link>
                <Link href="/remax-demo/arquitectura" className="remax-access-button">
                  Cerrar menú
                </Link>
              </div>
            </div>
          </AccessSection>
        </div>
      </div>

      <div className="remax-context-grid">
        <article className="remax-context-card">
          <span>Perfil operativo REMAX Activa</span>
          <strong>35 personas</strong>
          <p>4 administrativos, 1 recepcion y el resto asesores repartidos entre clase A y clase M.</p>
        </article>
        <article className="remax-context-card">
          <span>Operacion actual</span>
          <strong>Microsoft Access</strong>
          <p>Alta, baja, cancelacion, valores, asesores, propietarios, ficha tecnica y comunicados desde Outlook.</p>
        </article>
        <article className="remax-context-card">
          <span>Bug funcional resuelto</span>
          <strong>Asesor multirol por propiedad</strong>
          <p>La nueva demo permite que un mismo asesor participe en alta, baja / cierre y cancelacion sobre el mismo expediente.</p>
        </article>
      </div>
    </div>
  );
}
