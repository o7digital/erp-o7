import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { CommunicationsPreview } from "@/remax-demo/components/communications-preview";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { remaxDemoCommunications } from "@/remax-demo/data";
import { formatDateLong, getSingleSearchParam } from "@/remax-demo/formatters";
import {
  getCommunicationById,
  getCommunicationsByType,
  getPropertyByClave
} from "@/remax-demo/stats";

function getStatusTone(status: string) {
  if (status === "enviado") {
    return "success" as const;
  }

  if (status === "pendiente") {
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
  const selectedId = getSingleSearchParam(params.comunicado) ?? "com-012";
  const selectedCommunication =
    getCommunicationById(selectedId) ?? [...remaxDemoCommunications].sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
  const selectedProperty = getPropertyByClave(selectedCommunication.propiedadClave);
  const enviados = remaxDemoCommunications.filter((item) => item.estado === "enviado").length;
  const pendientes = remaxDemoCommunications.filter((item) => item.estado === "pendiente").length;
  const borradores = remaxDemoCommunications.filter((item) => item.estado === "borrador").length;

  return (
    <div className="page-stack">
      <RemaxPageHeader
        eyebrow="Automatizacion y trazabilidad"
        title="Comunicados"
        description="Modulo demo para demostrar que cada alta, baja o cancelacion puede generar y registrar un comunicado dentro del sistema, sin depender de Access mas Outlook manual."
        actions={
          <div className="button-row">
            <Link href="/remax-demo/dashboard" className="button button-secondary">
              Volver al dashboard
            </Link>
            <Link href="/remax-demo/arquitectura" className="button">
              Ver roadmap
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard label="Enviados" value={String(enviados)} detail="Listos y auditables" />
        <StatCard label="Pendientes" value={String(pendientes)} detail="Esperan disparador o anexos" />
        <StatCard label="Borradores" value={String(borradores)} detail="Pendientes de validacion" />
        <StatCard
          label="Tipos activos"
          value="ALTA / BAJA / CANCELACION"
          detail="Flujos homologados"
        />
      </div>

      <div className="two-columns">
        <SectionCard
          title="Registro de comunicados"
          description="Listado centralizado por tipo, propiedad, fecha, destinatarios y estado."
        >
          <DataTable
            rows={[...remaxDemoCommunications].sort((left, right) => right.fecha.localeCompare(left.fecha))}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "asunto",
                label: "Comunicado",
                render: (row) => (
                  <div>
                    <Link href={`/remax-demo/comunicados?comunicado=${row.id}`}>
                      <strong>{row.asunto}</strong>
                    </Link>
                    <div className="muted">{row.propiedadClave}</div>
                  </div>
                )
              },
              {
                key: "tipo",
                label: "Tipo",
                render: (row) => <StatusBadge value={row.tipo} tone={row.tipo === "BAJA" ? "info" : row.tipo === "CANCELACION" ? "danger" : "success"} />
              },
              {
                key: "fecha",
                label: "Fecha",
                render: (row) => formatDateLong(row.fecha)
              },
              {
                key: "destinatarios",
                label: "Destinatarios",
                render: (row) => `${row.destinatarios.length} contactos`
              },
              {
                key: "estado",
                label: "Estado",
                render: (row) => <StatusBadge value={row.estado} tone={getStatusTone(row.estado)} />
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title="Preview del comunicado"
          description="Panel lateral para mostrar como se veria el mensaje y su rastro operativo."
        >
          <CommunicationsPreview
            communication={selectedCommunication}
            property={selectedProperty}
          />
        </SectionCard>
      </div>

      <SectionCard
        title="Automatizacion propuesta"
        description="Mensaje comercial claro: el sistema moderno centraliza plantillas, disparadores y auditoria."
      >
        <div className="remax-context-grid">
          <article className="remax-context-card">
            <span>Trigger</span>
            <strong>Alta / baja / cancelacion</strong>
            <p>Un cambio operativo dispara el comunicado desde la propia webapp.</p>
          </article>
          <article className="remax-context-card">
            <span>Plantilla</span>
            <strong>Contenido homologado</strong>
            <p>Se controla asunto, resumen, destinatarios y estado dentro del sistema.</p>
          </article>
          <article className="remax-context-card">
            <span>Auditoria</span>
            <strong>Bitacora centralizada</strong>
            <p>Direccion y administrativos pueden revisar que se envio y cuando.</p>
          </article>
        </div>

        <div className="remax-compact-list">
          <div>
            <span>Altas</span>
            <strong>{getCommunicationsByType("ALTA").length}</strong>
          </div>
          <div>
            <span>Bajas</span>
            <strong>{getCommunicationsByType("BAJA").length}</strong>
          </div>
          <div>
            <span>Cancelaciones</span>
            <strong>{getCommunicationsByType("CANCELACION").length}</strong>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
