import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PropertyBanner } from "@/remax-demo/components/property-banner";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { getSingleSearchParam } from "@/remax-demo/formatters";
import { getOwnerRows, getPropertyByClave } from "@/remax-demo/stats";

export default async function PropietariosPage({
  searchParams
}: {
  searchParams: Promise<{ propiedad?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedKey = getSingleSearchParam(params.propiedad) ?? "IBR-OP277";
  const property = getPropertyByClave(selectedKey) ?? getPropertyByClave("IBR-OP277");

  if (!property) {
    return null;
  }

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Propietarios"
        description="Pantalla inspirada en el modulo Access de propietarios: multiples propietarios por inmueble, telefono, correo y navegacion directa hacia ficha tecnica."
        actions={
          <div className="remax-header-actions">
            <Link href={`/remax-demo/alta?step=propietarios&propiedad=${property.clave}`} className="button">
              Volver a Alta
            </Link>
            <Link href={`/remax-demo/alta?step=ficha&propiedad=${property.clave}`} className="button button-secondary">
              Ir a Ficha Tecnica
            </Link>
          </div>
        }
      />

      <PropertyBanner property={property} title="Registro de PROPIETARIOS" />

      <AccessSection title="Registro de propietarios">
        <DataTable
          rows={getOwnerRows()}
          getRowId={(row) => row.owner.id}
          columns={[
            {
              key: "clave",
              label: "Clave de la propiedad",
              render: (row) => (
                <Link href={`/remax-demo/propietarios?propiedad=${row.property.clave}`}>
                  <strong>{row.property.clave}</strong>
                </Link>
              )
            },
            { key: "no", label: "No.", render: (row) => String(row.no) },
            { key: "nombre", label: "Nombre(s)", render: (row) => row.owner.nombre },
            { key: "telefono", label: "Telefono", render: (row) => row.owner.telefono },
            { key: "correo", label: "Correo", render: (row) => row.owner.correo }
          ]}
        />
      </AccessSection>

      <AccessSection title={`Propietarios de ${property.clave}`} accent="blue">
        <div className="remax-detail-list">
          {property.propietarios.map((owner) => (
            <article key={owner.id} className="remax-detail-card">
              <span>{owner.principal ? "Propietario principal" : "Copropietario"}</span>
              <strong>{owner.nombre}</strong>
              <p>{owner.telefono}</p>
              <p>{owner.correo}</p>
            </article>
          ))}
        </div>
      </AccessSection>
    </div>
  );
}
