import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { formatPercent, getSingleSearchParam } from "@/remax-demo/formatters";
import {
  getAdviserSummaryRows,
  getAdvisorById,
  getPropertyRoleMatrix
} from "@/remax-demo/stats";

export default async function AsesoresPage({
  searchParams
}: {
  searchParams: Promise<{ asesor?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedId = getSingleSearchParam(params.asesor) ?? "pedro-leyva";
  const selectedAdvisor = getAdvisorById(selectedId) ?? getAdvisorById("pedro-leyva");
  const advisorRows = getAdviserSummaryRows();
  const selectedRow = advisorRows.find((row) => row.advisor.id === selectedAdvisor?.id) ?? advisorRows[0];

  if (!selectedAdvisor || !selectedRow) {
    return null;
  }

  const linkedProperties = [...selectedRow.alta, ...selectedRow.baja, ...selectedRow.cancelacion]
    .filter((property, index, array) => array.findIndex((candidate) => candidate.clave === property.clave) === index);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Asesores"
        description="Vista inspirada en los registros de asesores de Access: tabla principal por contexto, nivel A/M, participacion y propiedades vinculadas. Pedro Leyva se muestra como Director General y ademas Asesor A."
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo/alta?step=asesores&propiedad=IBR-OP277" className="button">
              Ver asesores de alta
            </Link>
            <Link href="/remax-demo/baja?step=asesores&propiedad=CBR-1748" className="button button-secondary">
              Ver asesores de baja
            </Link>
          </div>
        }
      />

      <AccessSection title="Resumen por asesor">
        <DataTable
          rows={advisorRows}
          getRowId={(row) => row.advisor.id}
          columns={[
            {
              key: "asesor",
              label: "Asesor",
              render: (row) => (
                <Link href={`/remax-demo/asesores?asesor=${row.advisor.id}`}>
                  <strong>{row.advisor.nombre}</strong>
                </Link>
              )
            },
            { key: "clase", label: "Clase", render: (row) => row.advisor.clase ?? "Staff" },
            { key: "rol", label: "Rol principal", render: (row) => row.advisor.rol },
            { key: "comision", label: "Comision base", render: (row) => formatPercent(row.advisor.comisionRate) },
            { key: "alta", label: "Alta", render: (row) => String(row.alta.length) },
            { key: "baja", label: "Baja", render: (row) => String(row.baja.length) },
            { key: "cancelacion", label: "Cancelacion", render: (row) => String(row.cancelacion.length) },
            { key: "total", label: "Propiedades", render: (row) => String(row.total) }
          ]}
        />
      </AccessSection>

      <AccessSection title={`Ficha de ${selectedAdvisor.nombre}`} accent="blue">
        <div className="remax-form-grid remax-form-grid-4">
          <label className="remax-field"><span>Nombre</span><input value={selectedAdvisor.nombre} readOnly /></label>
          <label className="remax-field"><span>Clase</span><input value={selectedAdvisor.clase ?? "Staff"} readOnly /></label>
          <label className="remax-field"><span>Tipo personal</span><input value={selectedAdvisor.tipoPersonal} readOnly /></label>
          <label className="remax-field"><span>Rol</span><input value={selectedAdvisor.rol} readOnly /></label>
        </div>

        <div className="remax-summary-strip">
          <div>
            <span>Participacion en alta</span>
            <strong>{selectedRow.alta.length}</strong>
          </div>
          <div>
            <span>Participacion en baja</span>
            <strong>{selectedRow.baja.length}</strong>
          </div>
          <div>
            <span>Participacion en cancelacion</span>
            <strong>{selectedRow.cancelacion.length}</strong>
          </div>
          <div>
            <span>Esquema</span>
            <strong>{selectedAdvisor.clase === "A" ? "Comision mayor" : selectedAdvisor.clase === "M" ? "Nivel nuevo" : "Staff"}</strong>
          </div>
        </div>
      </AccessSection>

      <AccessSection title="Propiedades vinculadas" accent="red">
        <DataTable
          rows={linkedProperties}
          getRowId={(row) => row.id}
          columns={[
            {
              key: "clave",
              label: "Propiedad",
              render: (row) => (
                <Link href={`/remax-demo/alta?step=asesores&propiedad=${row.clave}`}>
                  <strong>{row.clave}</strong>
                </Link>
              )
            },
            { key: "estatus", label: "Estatus", render: (row) => row.estatus },
            { key: "operacion", label: "Operacion", render: (row) => row.operacion },
            { key: "tipo", label: "Tipo", render: (row) => row.tipo },
            {
              key: "roles",
              label: "Roles de este asesor",
              render: (row) =>
                getPropertyRoleMatrix(row)
                  .find((item) => item.advisor.id === selectedAdvisor.id)
                  ?.roles.join(", ") ?? "-"
            }
          ]}
        />
      </AccessSection>
    </div>
  );
}
