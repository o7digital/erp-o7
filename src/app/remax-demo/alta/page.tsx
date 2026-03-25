import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { remaxCategoryOptions, remaxGiroOptions, remaxOperacionOptions, remaxTipoOptions } from "@/remax-demo/data";
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
  getPropertyRoleMatrix
} from "@/remax-demo/stats";

const altaSteps = [
  { key: "clave", label: "Generacion de clave" },
  { key: "expediente", label: "Expediente" },
  { key: "condiciones", label: "Condiciones" },
  { key: "valores", label: "Valores" },
  { key: "asesores", label: "Asesores" },
  { key: "propietarios", label: "Propietarios" },
  { key: "ficha", label: "Ficha tecnica" }
] as const;

function buildKeyPreview(
  giroCode: string,
  tipoCode: string,
  operacionCode: string,
  categoriaCode: string,
  sequence = "277"
) {
  return `${giroCode}${tipoCode}${operacionCode}-${categoriaCode}${sequence}`;
}

function YesNoBadge({ value }: { value: boolean }) {
  return (
    <StatusBadge value={value ? "Si" : "No"} tone={value ? "success" : "neutral"} />
  );
}

export default async function AltaPage({
  searchParams
}: {
  searchParams: Promise<{ step?: string | string[]; propiedad?: string | string[] }>;
}) {
  const params = await searchParams;
  const step = getSingleSearchParam(params.step) ?? "clave";
  const selectedKey = getSingleSearchParam(params.propiedad) ?? "IBR-OP277";
  const property = getPropertyByClave(selectedKey) ?? getPropertyByClave("IBR-OP277");

  if (!property) {
    return null;
  }

  const generatedKey = buildKeyPreview(
    property.giroCode,
    property.tipoCode,
    property.operacionCode,
    property.categoriaCode
  );
  const roleMatrix = getPropertyRoleMatrix(property).filter((row) => row.roles.length > 1);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Alta de propiedad"
        description="Remake modernizado del flujo Access de alta: primero se genera la clave, luego se construye el expediente operativo y finalmente se completan condiciones, valores, asesores, propietarios y ficha tecnica."
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo" className="button button-secondary">
              Regresar a menú
            </Link>
            <Link href="/remax-demo/baja" className="button">
              Ir a Baja
            </Link>
          </div>
        }
      />

      <PropertyBanner property={property} title="Flujo ALTA de propiedad" />

      <WorkflowTabs
        items={altaSteps.map((item) => ({
          label: item.label,
          href: `/remax-demo/alta?step=${item.key}&propiedad=${property.clave}`,
          active: step === item.key
        }))}
      />

      {step === "clave" ? (
        <AccessSection
          title="Generacion de CLAVE para nuevo registro de Propiedad"
          action={
            <Link href={`/remax-demo/alta?step=expediente&propiedad=${property.clave}`} className="button">
              IR A Expediente
            </Link>
          }
        >
          <div className="remax-form-grid remax-form-grid-3">
            <label className="remax-field">
              <span>Categoria: Exclusiva, Opcion, Coop, Otro</span>
              <div className="remax-field-with-code">
                <select defaultValue={property.categoria}>
                  {remaxCategoryOptions.map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input value={property.categoriaCode} readOnly />
              </div>
            </label>
            <label className="remax-field">
              <span>Giro: Residencial, Comercial, Industrial</span>
              <div className="remax-field-with-code">
                <select defaultValue={property.giro}>
                  {remaxGiroOptions.map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input value={property.giroCode} readOnly />
              </div>
            </label>
            <div className="remax-key-preview">
              <span>Nueva clave generada</span>
              <strong>{generatedKey}</strong>
            </div>
            <label className="remax-field">
              <span>Tipo de Propiedad</span>
              <div className="remax-field-with-code">
                <select defaultValue={property.tipo}>
                  {remaxTipoOptions.map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input value={property.tipoCode} readOnly />
              </div>
            </label>
            <label className="remax-field">
              <span>Operacion: Venta o Renta</span>
              <div className="remax-field-with-code">
                <select defaultValue={property.operacion}>
                  {remaxOperacionOptions.map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input value={property.operacionCode} readOnly />
              </div>
            </label>
            <div className="remax-note-box">
              <strong>Logica de clave recuperada desde Access</strong>
              <p>
                {property.giroCode} + {property.tipoCode} + {property.operacionCode} define el tipo de expediente;
                {` `}
                {property.categoriaCode} conserva la categoria comercial.
              </p>
            </div>
          </div>

          <div className="remax-inline-actions">
            <button className="button button-secondary" type="button">
              Generar otra CLAVE
            </button>
            <Link href={`/remax-demo/alta?step=expediente&propiedad=${property.clave}`} className="button">
              Continuar al expediente
            </Link>
          </div>
        </AccessSection>
      ) : null}

      {step === "expediente" ? (
        <>
          <AccessSection
            title="Registro de ALTA de Propiedades"
            action={
              <Link href={`/remax-demo/alta?step=condiciones&propiedad=${property.clave}`} className="button">
                Ir a Condiciones de Operacion
              </Link>
            }
          >
            <div className="remax-form-grid remax-form-grid-6">
              <label className="remax-field"><span>Reg.</span><input value={String(property.folio)} readOnly /></label>
              <label className="remax-field"><span>Clave</span><input value={property.clave} readOnly /></label>
              <label className="remax-field"><span>Exclusiva, Opcion, Coop</span><input value={property.exclusividad} readOnly /></label>
              <label className="remax-field"><span>Giro</span><input value={property.giro} readOnly /></label>
              <label className="remax-field"><span>Tipo</span><input value={property.tipo} readOnly /></label>
              <label className="remax-field"><span>Operacion</span><input value={property.operacion} readOnly /></label>
              <label className="remax-field remax-field-span-3"><span>Calle</span><input value={property.address.calle} readOnly /></label>
              <label className="remax-field"><span>No Ext</span><input value={property.address.noExt} readOnly /></label>
              <label className="remax-field"><span>No Int</span><input value={property.address.noInt} readOnly /></label>
              <label className="remax-field"><span>Piso</span><input value={property.address.piso ?? ""} readOnly /></label>
              <label className="remax-field remax-field-span-2"><span>Entre calles</span><input value={property.address.entreCalles ?? ""} readOnly /></label>
              <label className="remax-field"><span>Colonia</span><input value={property.address.colonia} readOnly /></label>
              <label className="remax-field"><span>Coto</span><input value={property.address.coto ?? ""} readOnly /></label>
              <label className="remax-field"><span>Fraccionamiento</span><input value={property.address.fraccionamiento ?? ""} readOnly /></label>
              <label className="remax-field"><span>Municipio</span><input value={property.address.municipio} readOnly /></label>
              <label className="remax-field"><span>C.P.</span><input value={property.address.cp} readOnly /></label>
              <label className="remax-field"><span>Entidad</span><input value={property.address.entidad} readOnly /></label>
              <label className="remax-field"><span>Coordenadas Guia Roji</span><input value={property.address.coordenadasGuiaRoji ?? ""} readOnly /></label>
              <label className="remax-field"><span>Condicion Visitas</span><input value={property.agenda.condicionesVisitas} readOnly /></label>
              <label className="remax-field"><span>Caja No.</span><input value={property.agenda.cajaNo} readOnly /></label>
              <label className="remax-field"><span>Disponibilidad para Visitas</span><input value={property.agenda.disponibilidadVisitas} readOnly /></label>
              <label className="remax-field"><span>Estatus Llaves</span><input value={property.agenda.estatusLlaves} readOnly /></label>
              <label className="remax-field"><span>Tel Citas</span><input value={property.agenda.telCitas} readOnly /></label>
              <label className="remax-field remax-field-span-2"><span>Contacto para Citas</span><input value={property.agenda.contactoCitas} readOnly /></label>
              <label className="remax-field"><span>Origen</span><input value={property.agenda.origen} readOnly /></label>
              <label className="remax-field"><span>Fecha ALTA</span><input value={property.fechas.alta} readOnly /></label>
              <label className="remax-field"><span>Fecha aviso</span><input value={property.fechas.aviso} readOnly /></label>
              <label className="remax-field"><span>Fecha Contrato</span><input value={property.fechas.contrato} readOnly /></label>
              <label className="remax-field"><span>Inicio Promo</span><input value={property.fechas.inicioPromo} readOnly /></label>
              <label className="remax-field"><span>ID AMPI</span><input value={property.ids.ampi} readOnly /></label>
              <label className="remax-field"><span>ID REMAX</span><input value={property.ids.remax} readOnly /></label>
              <label className="remax-field"><span>Clave Catastral</span><input value={property.ids.catastral} readOnly /></label>
              <div className="remax-field">
                <span>Status Propiedad</span>
                <StatusBadge value={property.estatus} tone="success" />
              </div>
              <label className="remax-field"><span>Alta / Baja</span><input value={property.altaBaja} readOnly /></label>
              <label className="remax-field"><span>Estatus de visita en recorrido</span><input value={property.visitaRecorrido} readOnly /></label>
              <label className="remax-field remax-field-span-3"><span>Como llegar / ligas</span><input value={property.comoLlegar.ligasA} readOnly /></label>
              <label className="remax-field remax-field-span-3"><span>Comentarios</span><textarea value={property.comoLlegar.comentarios} readOnly /></label>
            </div>
          </AccessSection>

          <AccessSection title="Caracteristicas de la propiedad" accent="red">
            <div className="remax-form-grid remax-form-grid-6">
              <label className="remax-field"><span>Sup. Terreno m2</span><input value={String(property.caracteristicas.supTerreno)} readOnly /></label>
              <label className="remax-field"><span>Sup. Const. m2</span><input value={String(property.caracteristicas.supConstruccion)} readOnly /></label>
              <label className="remax-field"><span>Frente</span><input value={String(property.caracteristicas.frente)} readOnly /></label>
              <label className="remax-field"><span>Fondo</span><input value={String(property.caracteristicas.fondo)} readOnly /></label>
              <label className="remax-field"><span>Jardin</span><input value={property.caracteristicas.jardin ? "Si" : "No"} readOnly /></label>
              <label className="remax-field"><span>Estac. Descubiertos</span><input value={String(property.caracteristicas.estacionamientosDescubiertos)} readOnly /></label>
              <label className="remax-field"><span>Nivel</span><input value={property.caracteristicas.nivel} readOnly /></label>
              <label className="remax-field"><span>Pisos totales</span><input value={String(property.caracteristicas.pisosTotales)} readOnly /></label>
              <label className="remax-field"><span>Exterior / Interior</span><input value={property.caracteristicas.exteriorInterior} readOnly /></label>
              <label className="remax-field"><span>Forma terreno</span><input value={property.caracteristicas.formaTerreno} readOnly /></label>
              <label className="remax-field"><span>Inclinacion</span><input value={property.caracteristicas.inclinacion} readOnly /></label>
              <label className="remax-field"><span>Uso de suelo</span><input value={property.caracteristicas.usoSuelo} readOnly /></label>
              <label className="remax-field remax-field-span-3"><span>Descripcion</span><input value={property.caracteristicas.descripcion} readOnly /></label>
              <label className="remax-field"><span>Categoria</span><input value={property.caracteristicas.categoria} readOnly /></label>
              <label className="remax-field remax-field-span-2"><span>Notas</span><textarea value={property.caracteristicas.notas} readOnly /></label>
            </div>

            <div className="remax-subgrid">
              <div className="remax-chip-list">
                {property.caracteristicas.servicios.map((service) => (
                  <span key={service} className="remax-chip">
                    {service}
                  </span>
                ))}
              </div>
              <DataTable
                rows={property.caracteristicas.superficiesValores}
                getRowId={(row) => row.concepto}
                columns={[
                  { key: "concepto", label: "Superficies m2 y valores", render: (row) => row.concepto },
                  { key: "metros", label: "Sup. m2", align: "right", render: (row) => row.metros.toFixed(2) },
                  { key: "valor", label: "Valor $", align: "right", render: (row) => formatCurrencyMXN(row.valor) },
                  { key: "total", label: "Total", align: "right", render: (row) => formatCurrencyMXN(row.total) }
                ]}
              />
            </div>
          </AccessSection>
        </>
      ) : null}

      {step === "condiciones" ? (
        <>
          <AccessSection
            title="Registro de condiciones de operacion renta"
            action={
              <Link href={`/remax-demo/alta?step=valores&propiedad=${property.clave}`} className="button">
                Ir a Valor de Propiedad
              </Link>
            }
          >
            <div className="remax-form-grid remax-form-grid-4">
              <label className="remax-field"><span>Clave propiedad</span><input value={property.clave} readOnly /></label>
              <label className="remax-field"><span>Politica / Monto</span><input value={property.condicionesOperacion.modoComision} readOnly /></label>
              <label className="remax-field"><span>Porcentaje</span><input value={formatCompactPercent(property.condicionesOperacion.porcentaje)} readOnly /></label>
              <label className="remax-field"><span>Monto</span><input value={formatCurrencyMXN(property.condicionesOperacion.monto)} readOnly /></label>
              <label className="remax-field remax-field-span-2"><span>Politica vigente</span><input value={property.condicionesOperacion.politicaVigente} readOnly /></label>
              <div className="remax-field">
                <span>Aplica excepcion</span>
                <YesNoBadge value={property.condicionesOperacion.aplicaExcepcion} />
              </div>
              <div className="remax-field">
                <span>Datos confirmados</span>
                <YesNoBadge value={property.condicionesOperacion.datosConfirmados} />
              </div>
              <label className="remax-field remax-field-span-4"><span>Comentarios</span><textarea value={property.condicionesOperacion.comentarios} readOnly /></label>
            </div>
          </AccessSection>

          {property.condicionesRenta ? (
            <AccessSection title="Edicion de condiciones de renta" accent="red">
              <div className="remax-form-grid remax-form-grid-4">
                <label className="remax-field"><span>Confirmar anos de renta</span><input value={String(property.condicionesRenta.anos)} readOnly /></label>
                <label className="remax-field"><span>Forma de pago</span><input value={property.condicionesRenta.formaPago} readOnly /></label>
                <label className="remax-field"><span>Vigencia</span><input value={property.condicionesRenta.vigencia} readOnly /></label>
                <label className="remax-field"><span>Herramienta juridica</span><input value={property.condicionesRenta.herramientaJuridica} readOnly /></label>
                <div className="remax-checklist">
                  <span>Controles principales</span>
                  <div className="remax-check-grid">
                    <div><YesNoBadge value={property.condicionesRenta.rentaAdelantada} /> Renta adelantada</div>
                    <div><YesNoBadge value={property.condicionesRenta.rentaDeposito} /> Renta deposito</div>
                    <div><YesNoBadge value={property.condicionesRenta.aplicaFianza} /> Aplica fianza</div>
                    <div><YesNoBadge value={property.condicionesRenta.fiadorSolidario} /> Fiador solidario</div>
                    <div><YesNoBadge value={property.condicionesRenta.fiadorBienRaiz} /> Fiador con bien raiz</div>
                    <div><YesNoBadge value={property.condicionesRenta.aplicaMantenimiento} /> Aplica mantenimiento</div>
                    <div><YesNoBadge value={property.condicionesRenta.contratoTransaccion} /> Contrato de transaccion</div>
                    <div><YesNoBadge value={property.condicionesRenta.contratoIntermediacion} /> Contrato de intermediacion</div>
                    <div><YesNoBadge value={property.condicionesRenta.seguroDanios} /> Seguro de danos materiales</div>
                    <div><YesNoBadge value={property.condicionesRenta.seguroResponsabilidadCivil} /> Seguro de responsabilidad civil</div>
                    <div><YesNoBadge value={property.condicionesRenta.investigacion} /> Investigacion</div>
                  </div>
                </div>
                <label className="remax-field"><span>Afianzadora</span><input value={property.condicionesRenta.afianzadora} readOnly /></label>
                <label className="remax-field"><span>Monto de la fianza</span><input value={formatCurrencyMXN(property.condicionesRenta.montoFianza)} readOnly /></label>
                <label className="remax-field"><span>Investigador</span><input value={property.condicionesRenta.investigador} readOnly /></label>
                <label className="remax-field"><span>Costo de investigacion</span><input value={formatCurrencyMXN(property.condicionesRenta.costoInvestigacion)} readOnly /></label>
                <label className="remax-field"><span>Abogado</span><input value={property.condicionesRenta.abogado} readOnly /></label>
                <label className="remax-field"><span>Notario</span><input value={property.condicionesRenta.notario} readOnly /></label>
                <label className="remax-field"><span>Empresa</span><input value={property.condicionesRenta.empresa} readOnly /></label>
                <label className="remax-field"><span>Monto de mantenimiento</span><input value={formatCurrencyMXN(property.condicionesRenta.montoMantenimiento)} readOnly /></label>
                <label className="remax-field"><span>Periodo de mantenimiento</span><input value={property.condicionesRenta.periodoMantenimiento} readOnly /></label>
                <label className="remax-field remax-field-span-4"><span>Observaciones</span><textarea value={property.condicionesRenta.observaciones} readOnly /></label>
              </div>
            </AccessSection>
          ) : null}
        </>
      ) : null}

      {step === "valores" ? (
        <AccessSection
          title="Registro de Valores de Propiedades"
          action={
            <Link href={`/remax-demo/alta?step=asesores&propiedad=${property.clave}`} className="button">
              Ir a Asesores Alta
            </Link>
          }
        >
          <div className="remax-mini-summary">
            <div>
              <span>Precio actual</span>
              <strong>{formatCurrencyMXN(getCurrentValue(property))}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{property.estatus}</strong>
            </div>
          </div>
          <DataTable
            rows={property.historialValores}
            getRowId={(row) => row.id}
            columns={[
              { key: "clave", label: "Clave Propiedad", render: (row) => row.propiedadClave },
              { key: "valor", label: "Valor Inicial", align: "right", render: (row) => formatCurrencyMXN(row.valor) },
              { key: "fecha", label: "Fecha", render: (row) => row.fecha },
              { key: "moneda", label: "Moneda", render: (row) => row.moneda },
              { key: "posicion", label: "Posicion", render: (row) => row.posicion || "-" },
              { key: "motivo", label: "Motivo de cambio", render: (row) => row.motivoCambio },
              { key: "minuta", label: "Motivo de cambio para senalar en minuta", render: (row) => row.motivoMinuta }
            ]}
          />
        </AccessSection>
      ) : null}

      {step === "asesores" ? (
        <AccessSection
          title="Registro de ASESOR(ES) de lado ALTA de la Propiedad"
          action={
            <Link href={`/remax-demo/alta?step=propietarios&propiedad=${property.clave}`} className="button">
              Ir a Registro de Propietarios
            </Link>
          }
        >
          <DataTable
            rows={property.asesoresAlta}
            getRowId={(row) => `${row.advisorId}-${row.contexto}`}
            columns={[
              { key: "clave", label: "Clave Propiedad", render: () => property.clave },
              {
                key: "asesor",
                label: "Asesor",
                render: (row) => getAdvisorById(row.advisorId)?.nombre ?? row.advisorId
              },
              { key: "nivel", label: "Nivel Asesor A/N", render: (row) => row.nivel },
              { key: "comision", label: "Com por % / $", render: (row) => row.comisionTipo },
              {
                key: "participacion",
                label: "Participacion en ALTA %",
                render: (row) => formatCompactPercent(row.participacionPorcentaje)
              },
              { key: "monto", label: "Monto $", align: "right", render: (row) => formatCurrencyMXN(row.monto) },
              { key: "alta", label: "ALTA", render: (row) => row.tipoIntervencion }
            ]}
          />

          <div className="remax-role-callout">
            <strong>Correccion del bug actual de Access</strong>
            <p>
              En la nueva plataforma un asesor puede existir en mas de un contexto sobre la misma propiedad.
              {` `}
              {roleMatrix.length > 0
                ? roleMatrix
                    .map((item) => `${item.advisor.nombre}: ${item.roles.join(", ")}`)
                    .join(" · ")
                : "Esta propiedad aun no tiene multirol, pero el modelo ya lo soporta."}
            </p>
          </div>
        </AccessSection>
      ) : null}

      {step === "propietarios" ? (
        <AccessSection
          title="Registro de PROPIETARIOS"
          action={
            <Link href={`/remax-demo/alta?step=ficha&propiedad=${property.clave}`} className="button">
              Ir a Ficha Tecnica
            </Link>
          }
        >
          <DataTable
            rows={property.propietarios}
            getRowId={(row) => row.id}
            columns={[
              { key: "clave", label: "Clave de la propiedad", render: () => property.clave },
              { key: "nombre", label: "Nombre(s)", render: (row) => row.nombre },
              { key: "telefono", label: "Telefono", render: (row) => row.telefono },
              { key: "correo", label: "Correo", render: (row) => row.correo },
              {
                key: "principal",
                label: "Principal",
                render: (row) => <YesNoBadge value={row.principal} />
              }
            ]}
          />
        </AccessSection>
      ) : null}

      {step === "ficha" ? (
        <>
          <AccessSection title="Ficha Tecnica" accent="red">
            <div className="remax-form-grid remax-form-grid-5">
              <label className="remax-field"><span>Estilo</span><input value={property.fichaTecnica.residencial.estilo} readOnly /></label>
              <label className="remax-field"><span>Proyecto</span><input value={property.fichaTecnica.residencial.proyecto} readOnly /></label>
              <label className="remax-field"><span>Acabados</span><input value={property.fichaTecnica.residencial.acabados} readOnly /></label>
              <label className="remax-field"><span>Conservacion</span><input value={property.fichaTecnica.residencial.conservacion} readOnly /></label>
              <label className="remax-field"><span>Fachada</span><input value={property.fichaTecnica.residencial.fachada} readOnly /></label>
              <label className="remax-field"><span>Ventanas</span><input value={property.fichaTecnica.residencial.ventanas} readOnly /></label>
              <label className="remax-field"><span>Cristales</span><input value={property.fichaTecnica.residencial.cristales} readOnly /></label>
              <label className="remax-field"><span>Carpinteria</span><input value={property.fichaTecnica.residencial.carpinteria} readOnly /></label>
              <label className="remax-field"><span>Puertas</span><input value={property.fichaTecnica.residencial.puertas} readOnly /></label>
              <label className="remax-field"><span>Otro</span><input value={property.fichaTecnica.residencial.otro} readOnly /></label>
            </div>
            <DataTable
              rows={property.fichaTecnica.residencial.espacios}
              getRowId={(row) => row.nombre}
              columns={[
                { key: "nombre", label: "Espacio", render: (row) => row.nombre },
                { key: "nivel", label: "Nivel", render: (row) => row.nivel },
                { key: "banos", label: "Banos", render: (row) => String(row.banos) },
                { key: "acabados", label: "Acabados", render: (row) => row.acabados }
              ]}
            />
            <div className="remax-chip-list">
              {property.fichaTecnica.residencial.amenidades.map((item) => (
                <span key={item} className="remax-chip">
                  {item}
                </span>
              ))}
            </div>
          </AccessSection>

          <AccessSection title="Modulo comercial" accent="blue">
            <div className="remax-form-grid remax-form-grid-4">
              <label className="remax-field"><span>Categoria</span><input value={property.fichaTecnica.comercial.categoria} readOnly /></label>
              <label className="remax-field"><span>Clasificacion</span><input value={property.fichaTecnica.comercial.clasificacion} readOnly /></label>
              <div className="remax-field"><span>Vigilancia</span><YesNoBadge value={property.fichaTecnica.comercial.vigilancia} /></div>
              <div className="remax-field"><span>Telefonos</span><YesNoBadge value={property.fichaTecnica.comercial.telefonos} /></div>
              <label className="remax-field"><span>Lineas</span><input value={property.fichaTecnica.comercial.lineas} readOnly /></label>
              <label className="remax-field"><span>Iluminacion</span><input value={property.fichaTecnica.comercial.iluminacion} readOnly /></label>
              <label className="remax-field"><span>Banos</span><input value={String(property.fichaTecnica.comercial.banios)} readOnly /></label>
              <label className="remax-field"><span>Estacionamiento</span><input value={property.fichaTecnica.comercial.estacionamiento} readOnly /></label>
              <label className="remax-field remax-field-span-4"><span>Observaciones</span><textarea value={property.fichaTecnica.comercial.observaciones} readOnly /></label>
            </div>
          </AccessSection>
        </>
      ) : null}
    </div>
  );
}
