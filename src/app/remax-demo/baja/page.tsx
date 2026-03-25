import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { CommunicationsPreview } from "@/remax-demo/components/communications-preview";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PropertyBanner } from "@/remax-demo/components/property-banner";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { WorkflowTabs } from "@/remax-demo/components/workflow-tabs";
import {
  formatCompactPercent,
  formatCurrencyMXN,
  getSingleSearchParam
} from "@/remax-demo/formatters";
import {
  getAdvisorById,
  getCurrentValue,
  getPropertyByClave,
  getPropertyCommunications,
  getPropertyRoleMatrix,
  getSearchableProperties
} from "@/remax-demo/stats";

const bajaSteps = [
  { key: "busqueda", label: "Busqueda" },
  { key: "registro", label: "Registro de baja" },
  { key: "valores", label: "Revision de valores" },
  { key: "asesores", label: "Asesores de baja" },
  { key: "comunicado", label: "Comunicado de baja" }
] as const;

export default async function BajaPage({
  searchParams
}: {
  searchParams: Promise<{ step?: string | string[]; propiedad?: string | string[] }>;
}) {
  const params = await searchParams;
  const step = getSingleSearchParam(params.step) ?? "busqueda";
  const selectedKey = getSingleSearchParam(params.propiedad) ?? "CBR-1748";
  const property = getPropertyByClave(selectedKey) ?? getPropertyByClave("CBR-1748");

  if (!property) {
    return null;
  }

  const communications = getPropertyCommunications(property.clave);
  const communication = communications[0];
  const roleMatrix = getPropertyRoleMatrix(property).filter((row) => row.roles.length > 1);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Baja / cierre de propiedad"
        description="Flujo de baja inspirado en Access: busqueda de propiedad, cambio de estatus, revision de valores, asesores involucrados y comunicado generado."
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo" className="button button-secondary">
              Regresar a menú
            </Link>
            <Link href="/remax-demo/cancelacion" className="button">
              Ir a Cancelacion
            </Link>
          </div>
        }
      />

      <PropertyBanner property={property} title="Proceso de Baja / cierre" />

      <WorkflowTabs
        items={bajaSteps.map((item) => ({
          label: item.label,
          href: `/remax-demo/baja?step=${item.key}&propiedad=${property.clave}`,
          active: step === item.key
        }))}
      />

      {step === "busqueda" ? (
        <AccessSection
          title="Registro de Cancelacion / Baja de Propiedad"
          action={
            <Link href={`/remax-demo/baja?step=registro&propiedad=${property.clave}`} className="button">
              Ir a baja de propiedad
            </Link>
          }
        >
          <div className="remax-search-header">
            <strong>Buscar por Clave, Colonia, Calle, Coto, Fraccionamiento o Asesor</strong>
            <span>Mostrando {getSearchableProperties().length} registros demo</span>
          </div>
          <DataTable
            rows={getSearchableProperties()}
            getRowId={(row) => row.clave}
            columns={[
              {
                key: "clave",
                label: "Clave Propiedad",
                render: (row) => (
                  <Link href={`/remax-demo/baja?step=registro&propiedad=${row.clave}`}>
                    <strong>{row.clave}</strong>
                  </Link>
                )
              },
              { key: "colonia", label: "Colonia", render: (row) => row.colonia },
              { key: "domicilio", label: "Domicilio", render: (row) => row.domicilio },
              { key: "coto", label: "Coto", render: (row) => row.coto },
              { key: "fracc", label: "Fraccionamiento", render: (row) => row.fraccionamiento },
              { key: "asesor", label: "Asesor", render: (row) => row.asesor },
              { key: "precio", label: "Precio", align: "right", render: (row) => formatCurrencyMXN(row.precio) },
              {
                key: "estatus",
                label: "Status Propiedad",
                render: (row) => (
                  <StatusBadge
                    value={row.estatus}
                    tone={row.estatus === "Cerrada" ? "info" : row.estatus === "Cancelada" ? "danger" : "success"}
                  />
                )
              }
            ]}
          />
        </AccessSection>
      ) : null}

      {step === "registro" ? (
        <AccessSection
          title="Registro de BAJA de Propiedad"
          action={
            <Link href={`/remax-demo/baja?step=valores&propiedad=${property.clave}`} className="button">
              Ir a Revision de Valores
            </Link>
          }
        >
          <div className="remax-form-grid remax-form-grid-6">
            <label className="remax-field"><span>Reg.</span><input value={String(property.folio)} readOnly /></label>
            <label className="remax-field"><span>Clave</span><input value={property.clave} readOnly /></label>
            <label className="remax-field"><span>Status Propiedad</span><input value={property.estatus} readOnly /></label>
            <label className="remax-field"><span>Alta / Baja</span><input value={property.altaBaja} readOnly /></label>
            <label className="remax-field"><span>Giro</span><input value={property.giro} readOnly /></label>
            <label className="remax-field"><span>Tipo</span><input value={property.tipo} readOnly /></label>
            <label className="remax-field remax-field-span-3"><span>Calle</span><input value={property.address.calle} readOnly /></label>
            <label className="remax-field"><span>No Ext</span><input value={property.address.noExt} readOnly /></label>
            <label className="remax-field"><span>Piso</span><input value={property.address.piso ?? ""} readOnly /></label>
            <label className="remax-field"><span>No Int</span><input value={property.address.noInt} readOnly /></label>
            <label className="remax-field"><span>Colonia</span><input value={property.address.colonia} readOnly /></label>
            <label className="remax-field"><span>Municipio</span><input value={property.address.municipio} readOnly /></label>
            <label className="remax-field"><span>C.P.</span><input value={property.address.cp} readOnly /></label>
            <label className="remax-field"><span>Entidad</span><input value={property.address.entidad} readOnly /></label>
            <label className="remax-field"><span>Fecha ALTA</span><input value={property.fechas.alta} readOnly /></label>
            <label className="remax-field"><span>Fecha aviso</span><input value={property.fechas.aviso} readOnly /></label>
            <label className="remax-field"><span>Fecha baja</span><input value={property.baja?.fechaBaja ?? ""} readOnly /></label>
            <label className="remax-field"><span>Condiciones visitas</span><input value={property.agenda.condicionesVisitas} readOnly /></label>
            <label className="remax-field"><span>Tel Citas</span><input value={property.agenda.telCitas} readOnly /></label>
            <label className="remax-field remax-field-span-2"><span>Contacto para Citas</span><input value={property.agenda.contactoCitas} readOnly /></label>
            <label className="remax-field remax-field-span-2"><span>Condicion de cierre</span><input value={property.baja?.condicionCierre ?? ""} readOnly /></label>
            <label className="remax-field"><span>Tipo de cierre</span><input value={property.baja?.tipoCierre ?? ""} readOnly /></label>
            <label className="remax-field"><span>Persona que registra</span><input value={property.baja?.personaRegistra ?? ""} readOnly /></label>
            <label className="remax-field remax-field-span-4"><span>Comentarios</span><textarea value={property.baja?.comentarios ?? ""} readOnly /></label>
          </div>
        </AccessSection>
      ) : null}

      {step === "valores" ? (
        <AccessSection
          title="Revision de Valores de Propiedades"
          action={
            <Link href={`/remax-demo/baja?step=asesores&propiedad=${property.clave}`} className="button">
              Ir a Asesores Baja
            </Link>
          }
        >
          <div className="remax-mini-summary">
            <div>
              <span>Precio final</span>
              <strong>{formatCurrencyMXN(getCurrentValue(property))}</strong>
            </div>
            <div>
              <span>Condicion</span>
              <strong>{property.baja?.condicionCierre ?? "N/A"}</strong>
            </div>
          </div>
          <DataTable
            rows={property.historialValores}
            getRowId={(row) => row.id}
            columns={[
              { key: "reg", label: "Clave Propiedad", render: (row) => row.propiedadClave },
              { key: "valor", label: "Valor", align: "right", render: (row) => formatCurrencyMXN(row.valor) },
              { key: "fecha", label: "Fecha", render: (row) => row.fecha },
              { key: "moneda", label: "Moneda", render: (row) => row.moneda },
              { key: "posicion", label: "Posicion", render: (row) => row.posicion || "-" },
              { key: "motivo", label: "Motivo de cambio", render: (row) => row.motivoCambio },
              { key: "minuta", label: "Motivo de cambio para senalar en Minuta", render: (row) => row.motivoMinuta }
            ]}
          />
        </AccessSection>
      ) : null}

      {step === "asesores" ? (
        <AccessSection
          title="Asesores involucrados en baja / cierre"
          action={
            <Link href={`/remax-demo/baja?step=comunicado&propiedad=${property.clave}`} className="button">
              Ver comunicado
            </Link>
          }
        >
          <DataTable
            rows={property.asesoresBaja}
            getRowId={(row) => `${row.advisorId}-${row.contexto}`}
            columns={[
              {
                key: "asesor",
                label: "Asesor",
                render: (row) => getAdvisorById(row.advisorId)?.nombre ?? row.advisorId
              },
              { key: "nivel", label: "Nivel A / M", render: (row) => row.nivel },
              { key: "tipo", label: "Tipo de intervencion", render: (row) => row.tipoIntervencion },
              {
                key: "participacion",
                label: "Participacion %",
                render: (row) => formatCompactPercent(row.participacionPorcentaje)
              },
              { key: "monto", label: "Monto $", align: "right", render: (row) => formatCurrencyMXN(row.monto) }
            ]}
          />

          <div className="remax-role-callout">
            <strong>Mejora frente a Access</strong>
            <p>
              {roleMatrix.length > 0
                ? roleMatrix.map((item) => `${item.advisor.nombre}: ${item.roles.join(", ")}`).join(" · ")
                : "Este cierre no repite asesores entre alta y baja, pero el modelo ya lo soporta."}
            </p>
          </div>
        </AccessSection>
      ) : null}

      {step === "comunicado" && communication ? (
        <AccessSection title="Comunicado de baja">
          <CommunicationsPreview communication={communication} property={property} />
        </AccessSection>
      ) : null}
    </div>
  );
}
