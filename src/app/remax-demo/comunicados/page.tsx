import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { CommunicationsPreview } from "@/remax-demo/components/communications-preview";
import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { remaxDemoCommunications } from "@/remax-demo/data";
import { getSingleSearchParam } from "@/remax-demo/formatters";
import { getCommunicationById, getCommunicationsByType, getPropertyByClave } from "@/remax-demo/stats";

function getTone(status: string) {
  if (status === "enviado") {
    return "success" as const;
  }

  if (status === "borrador") {
    return "warning" as const;
  }

  return "neutral" as const;
}

export default async function ComunicadosPage({
  searchParams
}: {
  searchParams: Promise<{ comunicado?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedId = getSingleSearchParam(params.comunicado) ?? "com-cancel-rtr-2280";
  const communication = getCommunicationById(selectedId) ?? remaxDemoCommunications[0];
  const property = getPropertyByClave(communication.propiedadClave);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Comunicados"
        description="Pantalla dedicada a los comunicados de alta, baja y cancelacion. El objetivo es enseñar el reemplazo de Access + Outlook manual por un registro centralizado."
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo/cancelacion?step=comunicado&propiedad=RTR-2280" className="button">
              Comunicado cancelacion
            </Link>
            <Link href="/remax-demo/alta?step=asesores&propiedad=IBR-OP277" className="button button-secondary">
              Volver a operacion
            </Link>
          </div>
        }
      />

      <div className="remax-summary-strip">
        <div>
          <span>ALTA</span>
          <strong>{getCommunicationsByType("ALTA").length}</strong>
        </div>
        <div>
          <span>BAJA</span>
          <strong>{getCommunicationsByType("BAJA").length}</strong>
        </div>
        <div>
          <span>CANCELACION</span>
          <strong>{getCommunicationsByType("CANCELACION").length}</strong>
        </div>
      </div>

      <div className="remax-two-columns">
        <AccessSection title="Bitacora de comunicados">
          <DataTable
            rows={remaxDemoCommunications}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "asunto",
                label: "Asunto",
                render: (row) => (
                  <Link href={`/remax-demo/comunicados?comunicado=${row.id}`}>
                    <strong>{row.asunto}</strong>
                  </Link>
                )
              },
              { key: "tipo", label: "Tipo", render: (row) => row.tipo },
              { key: "propiedad", label: "Propiedad", render: (row) => row.propiedadClave },
              { key: "fecha", label: "Fecha", render: (row) => row.fecha },
              { key: "destinatarios", label: "Destinatarios", render: (row) => `${row.destinatarios.length} contactos` },
              {
                key: "estado",
                label: "Estado",
                render: (row) => <StatusBadge value={row.estado} tone={getTone(row.estado)} />
              }
            ]}
          />
        </AccessSection>

        <AccessSection title="Preview del comunicado" accent="red">
          <CommunicationsPreview communication={communication} property={property} />
        </AccessSection>
      </div>
    </div>
  );
}
