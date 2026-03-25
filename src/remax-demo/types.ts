export type RemaxAdvisorClass = "A" | "M" | null;
export type RemaxStaffType = "asesor" | "direccion" | "administrativo" | "recepcion";
export type RemaxPropertyStatus = "Activa" | "Cerrada" | "Cancelada";
export type RemaxOperation = "Venta" | "Renta";
export type RemaxCommunicationType = "ALTA" | "BAJA" | "CANCELACION";
export type RemaxCommunicationStatus = "enviado" | "borrador" | "archivado";
export type RemaxCommissionMode = "politica" | "monto";
export type RemaxRoleContext = "Alta" | "Baja / cierre" | "Cancelacion";

export interface RemaxSelectOption {
  label: string;
  code: string;
}

export interface RemaxAdvisor {
  id: string;
  nombre: string;
  clase: RemaxAdvisorClass;
  tipoPersonal: RemaxStaffType;
  rol: string;
  comisionRate: number | null;
  activo: boolean;
}

export interface RemaxOwnerRecord {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  principal: boolean;
}

export interface RemaxAdvisorAssignment {
  advisorId: string;
  nivel: "A" | "M";
  comisionTipo: "%" | "$";
  participacionPorcentaje: number;
  monto: number;
  tipoIntervencion: string;
  contexto: RemaxRoleContext;
}

export interface RemaxValueHistory {
  id: string;
  propiedadClave: string;
  fecha: string;
  valor: number;
  moneda: "Pesos";
  posicion: string;
  motivoCambio: string;
  motivoMinuta: string;
  usuario: string;
}

export interface RemaxCommunication {
  id: string;
  tipo: RemaxCommunicationType;
  propiedadClave: string;
  fecha: string;
  asunto: string;
  destinatarios: string[];
  estado: RemaxCommunicationStatus;
  resumen: string;
  remitente: string;
  firma: string;
}

export interface RemaxPropertyAddress {
  calle: string;
  noExt: string;
  noInt: string;
  edificio?: string;
  piso?: string;
  entreCalles?: string;
  colonia: string;
  coto?: string;
  fraccionamiento?: string;
  municipio: string;
  cp: string;
  entidad: string;
  coordenadasGuiaRoji?: string;
}

export interface RemaxPropertyAgenda {
  condicionesVisitas: string;
  cajaNo: string;
  disponibilidadVisitas: string;
  estatusLlaves: string;
  telCitas: string;
  contactoCitas: string;
  origen: string;
  origenDetalle?: string;
}

export interface RemaxPropertyLinks {
  ligasA: string;
  remax: string;
  googleMap: string;
  googleEarth: string;
  ampi: string;
  fichaArchivo: string;
  ftPdf: string;
  comentarios: string;
}

export interface RemaxSurfaceValueRow {
  concepto: string;
  metros: number;
  valor: number;
  total: number;
}

export interface RemaxPropertyCharacteristics {
  supTerreno: number;
  supConstruccion: number;
  frente: number;
  fondo: number;
  frentes: number;
  recamaras: number;
  banos: number;
  medioBanos: number;
  jardin: boolean;
  estacionamientosCubiertos: number;
  estacionamientosDescubiertos: number;
  nivel: string;
  pisosTotales: number;
  exteriorInterior: string;
  noUnidades: number;
  vistaA: string;
  elevadores: number;
  edad: number;
  formaTerreno: string;
  inclinacion: string;
  ubicacion: string;
  usoSuelo: string;
  restricciones: string;
  descripcion: string;
  categoria: string;
  notas: string;
  servicios: string[];
  superficiesValores: RemaxSurfaceValueRow[];
}

export interface RemaxOperationConditions {
  modoComision: RemaxCommissionMode;
  porcentaje: number;
  monto: number;
  politicaVigente: string;
  aplicaExcepcion: boolean;
  politicaAnterior: string;
  datosConfirmados: boolean;
  comentarios: string;
}

export interface RemaxRentConditions {
  anos: number;
  formaPago: string;
  rentaAdelantada: boolean;
  rentaDeposito: boolean;
  aplicaFianza: boolean;
  afianzadora: string;
  montoFianza: number;
  fiadorSolidario: boolean;
  fiadorBienRaiz: boolean;
  contratoTransaccion: boolean;
  vigencia: string;
  contratoIntermediacion: boolean;
  seguroDanios: boolean;
  seguroResponsabilidadCivil: boolean;
  investigacion: boolean;
  costoInvestigacion: number;
  investigador: string;
  herramientaJuridica: string;
  abogado: string;
  notario: string;
  empresa: string;
  aplicaMantenimiento: boolean;
  montoMantenimiento: number;
  periodoMantenimiento: string;
  observaciones: string;
}

export interface RemaxTechnicalResidentialSpace {
  nombre: string;
  nivel: string;
  banos: number;
  acabados: string;
}

export interface RemaxTechnicalResidential {
  estilo: string;
  proyecto: string;
  acabados: string;
  conservacion: string;
  fachada: string;
  ventanas: string;
  cristales: string;
  carpinteria: string;
  puertas: string;
  otro: string;
  espacios: RemaxTechnicalResidentialSpace[];
  amenidades: string[];
}

export interface RemaxTechnicalCommercial {
  categoria: string;
  clasificacion: string;
  vigilancia: boolean;
  telefonos: boolean;
  lineas: string;
  iluminacion: string;
  banios: number;
  elevador: boolean;
  estacionamiento: string;
  observaciones: string;
}

export interface RemaxTechnicalSheet {
  residencial: RemaxTechnicalResidential;
  comercial: RemaxTechnicalCommercial;
}

export interface RemaxClosureRecord {
  fechaBaja: string;
  tipoCierre: string;
  condicionCierre: string;
  personaRegistra: string;
  comentarios: string;
  comunicadoId?: string;
}

export interface RemaxCancellationRecord {
  fechaAvisoRecepcion: string;
  fechaCancelacion: string;
  motivo: string;
  aplicaComision: boolean;
  personaRegistra: string;
  bajaPor: string;
  comentarios: string;
  comunicadoId?: string;
}

export interface RemaxProperty {
  id: string;
  folio: number;
  clave: string;
  categoria: string;
  categoriaCode: string;
  giro: string;
  giroCode: string;
  tipo: string;
  tipoCode: string;
  operacion: RemaxOperation;
  operacionCode: string;
  exclusividad: string;
  estatus: RemaxPropertyStatus;
  altaBaja: string;
  descripcionCorta: string;
  address: RemaxPropertyAddress;
  agenda: RemaxPropertyAgenda;
  fechas: {
    alta: string;
    aviso: string;
    contrato: string;
    inicioPromo: string;
  };
  referidos: {
    idRef: string;
    nombre: string;
    empresa: string;
  };
  ids: {
    ampi: string;
    remax: string;
    catastral: string;
  };
  visitaRecorrido: "Por visitar" | "Programada" | "Visitada";
  comoLlegar: RemaxPropertyLinks;
  caracteristicas: RemaxPropertyCharacteristics;
  condicionesOperacion: RemaxOperationConditions;
  condicionesRenta?: RemaxRentConditions;
  propietarios: RemaxOwnerRecord[];
  asesoresAlta: RemaxAdvisorAssignment[];
  asesoresBaja: RemaxAdvisorAssignment[];
  asesoresCancelacion: RemaxAdvisorAssignment[];
  fichaTecnica: RemaxTechnicalSheet;
  historialValores: RemaxValueHistory[];
  baja?: RemaxClosureRecord;
  cancelacion?: RemaxCancellationRecord;
}
