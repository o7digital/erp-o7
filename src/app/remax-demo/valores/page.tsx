import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PropertyBanner } from "@/remax-demo/components/property-banner";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { ValueHistoryTimeline } from "@/remax-demo/components/value-history-timeline";
import {
  formatCurrencyMXN,
  getSingleSearchParam
} from "@/remax-demo/formatters";
import { getAllValueHistory, getCurrentValue, getPropertyByClave, getPropertyValueHistory } from "@/remax-demo/stats";

export default async function ValoresPage({
  searchParams
}: {
  searchParams: Promise<{ propiedad?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedKey = getSingleSearchParam(params.propiedad) ?? "CBR-1748";
  const property = getPropertyByClave(selectedKey) ?? getPropertyByClave("CBR-1748");

  if (!property) {
    return null;
  }

  const events = getPropertyValueHistory(property.clave);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Valores de propiedad"
        description="Pantalla inspirada en los modulos de valores de Access. Prioriza la tabla operativa con fecha, moneda, posicion, motivo de cambio y motivo para minuta."
        actions={
          <div className="remax-header-actions">
            <Link href={`/remax-demo/alta?step=valores&propiedad=${property.clave}`} className="button">
              Ir a flujo Alta
            </Link>
            <Link href={`/remax-demo/baja?step=valores&propiedad=CBR-1748`} className="button button-secondary">
              Ir a flujo Baja
            </Link>
          </div>
        }
      />

      <PropertyBanner property={property} title="Registro / revision de valores" />

      <AccessSection title="Registro de Valores de Propiedades">
        <div className="remax-mini-summary">
          <div>
            <span>Valor actual</span>
            <strong>{formatCurrencyMXN(getCurrentValue(property))}</strong>
          </div>
          <div>
            <span>Eventos de valor</span>
            <strong>{events.length}</strong>
          </div>
          <div>
            <span>Propiedad</span>
            <strong>{property.clave}</strong>
          </div>
        </div>
        <DataTable
          rows={events}
          getRowId={(row) => row.id}
          columns={[
            { key: "clave", label: "Clave Propiedad", render: (row) => row.propiedadClave },
            { key: "valor", label: "Valor Inicial", align: "right", render: (row) => formatCurrencyMXN(row.valor) },
            { key: "fecha", label: "Fecha", render: (row) => row.fecha },
            { key: "moneda", label: "Moneda", render: (row) => row.moneda },
            { key: "posicion", label: "Posicion", render: (row) => row.posicion || "-" },
            { key: "motivo", label: "Motivo de cambio", render: (row) => row.motivoCambio },
            { key: "minuta", label: "Motivo de cambio para senalar en Minuta", render: (row) => row.motivoMinuta }
          ]}
        />
      </AccessSection>

      <div className="remax-two-columns">
        <AccessSection title="Timeline de la propiedad" accent="blue">
          <ValueHistoryTimeline events={events} />
        </AccessSection>

        <AccessSection title="Bitacora global de valores" accent="red">
          <DataTable
            rows={getAllValueHistory()}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "propiedad",
                label: "Propiedad",
                render: (row) => (
                  <Link href={`/remax-demo/valores?propiedad=${row.propiedadClave}`}>
                    <strong>{row.propiedadClave}</strong>
                  </Link>
                )
              },
              { key: "fecha", label: "Fecha", render: (row) => row.fecha },
              { key: "valor", label: "Valor", align: "right", render: (row) => formatCurrencyMXN(row.valor) },
              { key: "motivo", label: "Motivo", render: (row) => row.motivoCambio }
            ]}
          />
        </AccessSection>
      </div>
    </div>
  );
}
