import Link from "next/link";

import { DataTable } from "@/components/data-table";
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
  getPropertiesByStatus,
  getPropertyByClave,
  getPropertyCommunications,
  getPropertyRoleMatrix
} from "@/remax-demo/stats";

const cancelacionSteps = [
  { key: "busqueda", label: "Busqueda" },
  { key: "registro", label: "Registro de cancelacion" },
  { key: "asesores", label: "Asesores de cancelacion" },
  { key: "comunicado", label: "Comunicado" }
] as const;

export default async function CancelacionPage({
  searchParams
}: {
  searchParams: Promise<{ step?: string | string[]; propiedad?: string | string[] }>;
}) {
  const params = await searchParams;
  const step = getSingleSearchParam(params.step) ?? "busqueda";
  const selectedKey = getSingleSearchParam(params.propiedad) ?? "RTV-571";
  const property = getPropertyByClave(selectedKey) ?? getPropertyByClave("RTV-571");

  if (!property) {
    return null;
  }

  const roleMatrix = getPropertyRoleMatrix(property).filter((row) => row.roles.length > 1);
  const communication = getPropertyCommunications(property.clave)[0];

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Cancelacion de propiedad"
        description="Flujo inspirado en las pantallas Access de cancelacion: seleccion de propiedad, motivo de cancelacion, comision si/no, persona que registra, asesores de cancelacion y comunicado."
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo" className="button button-secondary">
              Regresar a menú
            </Link>
            <Link href="/remax-demo/comunicados" className="button">
              Ver bitacora
            </Link>
          </div>
        }
      />

      <PropertyBanner property={property} title="Proceso de Cancelacion" />

      <WorkflowTabs
        items={cancelacionSteps.map((item) => ({
          label: item.label,
          href: `/remax-demo/cancelacion?step=${item.key}&propiedad=${property.clave}`,
          active: step === item.key
        }))}
      />

      {step === "busqueda" ? (
        <AccessSection
          title="Registro de Cancelacion de Propiedad"
          action={
            <Link href={`/remax-demo/cancelacion?step=registro&propiedad=${property.clave}`} className="button">
              Ir a cancelacion de propiedad
            </Link>
          }
        >
          <div className="remax-search-header">
            <strong>Buscar por Clave, Colonia, Calle, Coto, Fraccionamiento o Asesor</strong>
            <span>Mostrando {getPropertiesByStatus("Cancelada").length} registros cancelados</span>
          </div>
          <DataTable
            rows={getPropertiesByStatus("Cancelada")}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "clave",
                label: "Clave Propiedad",
                render: (row) => (
                  <Link href={`/remax-demo/cancelacion?step=registro&propiedad=${row.clave}`}>
                    <strong>{row.clave}</strong>
                  </Link>
                )
              },
              { key: "colonia", label: "Colonia", render: (row) => row.address.colonia },
              { key: "domicilio", label: "Domicilio", render: (row) => `${row.address.calle} ${row.address.noExt}` },
              { key: "asesor", label: "Asesor", render: (row) => getAdvisorById(row.asesoresAlta[0]?.advisorId ?? "")?.nombre ?? "" },
              { key: "precio", label: "Precio", align: "right", render: (row) => formatCurrencyMXN(getCurrentValue(row)) },
              { key: "status", label: "Status Propiedad", render: () => "Cancelada" }
            ]}
          />
        </AccessSection>
      ) : null}

      {step === "registro" ? (
        <AccessSection
          title="Registro de Cancelacion de Propiedades"
          action={
            <Link href={`/remax-demo/cancelacion?step=asesores&propiedad=${property.clave}`} className="button">
              Registrar Asesores de Cancelacion
            </Link>
          }
        >
          <div className="remax-form-grid remax-form-grid-4">
            <label className="remax-field"><span>Clave Propiedad</span><input value={property.clave} readOnly /></label>
            <label className="remax-field"><span>Baja por Cancelacion</span><input value={property.cancelacion?.bajaPor ?? ""} readOnly /></label>
            <label className="remax-field"><span>Fecha aviso a recepcion</span><input value={property.cancelacion?.fechaAvisoRecepcion ?? ""} readOnly /></label>
            <div className="remax-cancel-box remax-field-span-3">
              <div className="remax-cancel-box-title">CANCELACIÓN</div>
              <div className="remax-form-grid remax-form-grid-3">
                <label className="remax-field"><span>Fecha Cancelación</span><input value={property.cancelacion?.fechaCancelacion ?? ""} readOnly /></label>
                <label className="remax-field remax-field-span-2"><span>En caso de cancelación aplica comisión? (Sí/No)</span><input value={property.cancelacion?.aplicaComision ? "Sí" : "No"} readOnly /></label>
                <label className="remax-field remax-field-span-3"><span>Motivo Cancelación</span><input value={property.cancelacion?.motivo ?? ""} readOnly /></label>
              </div>
            </div>
            <label className="remax-field"><span>Persona que registra</span><input value={property.cancelacion?.personaRegistra ?? ""} readOnly /></label>
            <label className="remax-field remax-field-span-4"><span>Comentarios</span><textarea value={property.cancelacion?.comentarios ?? ""} readOnly /></label>
          </div>
        </AccessSection>
      ) : null}

      {step === "asesores" ? (
        <AccessSection
          title="Asesores de cancelacion"
          action={
            <Link href={`/remax-demo/cancelacion?step=comunicado&propiedad=${property.clave}`} className="button">
              Ver comunicado
            </Link>
          }
        >
          <DataTable
            rows={property.asesoresCancelacion}
            getRowId={(row) => `${row.advisorId}-${row.contexto}`}
            columns={[
              {
                key: "asesor",
                label: "Asesor",
                render: (row) => getAdvisorById(row.advisorId)?.nombre ?? row.advisorId
              },
              { key: "nivel", label: "Nivel", render: (row) => row.nivel },
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
            <strong>Asesor multirol sobre la misma propiedad</strong>
            <p>
              {roleMatrix.length > 0
                ? roleMatrix.map((item) => `${item.advisor.nombre}: ${item.roles.join(", ")}`).join(" · ")
                : "El modelo permite registrar el mismo asesor en alta y cancelacion sin duplicar expedientes."}
            </p>
          </div>
        </AccessSection>
      ) : null}

      {step === "comunicado" && communication ? (
        <AccessSection title="Comunicado de cancelacion">
          <CommunicationsPreview communication={communication} property={property} />
        </AccessSection>
      ) : null}
    </div>
  );
}
