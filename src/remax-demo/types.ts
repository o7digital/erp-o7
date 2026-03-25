export type RemaxAdvisorClass = "A" | "M" | null;
export type RemaxStaffType = "asesor" | "direccion" | "administrativo" | "recepcion";
export type RemaxPropertyStatus = "Activa" | "Cerrada" | "Cancelada";
export type RemaxOperation = "Venta" | "Renta";
export type RemaxCommunicationType = "ALTA" | "BAJA" | "CANCELACION";
export type RemaxCommunicationStatus = "enviado" | "pendiente" | "borrador";

export interface RemaxAdvisor {
  id: string;
  nombre: string;
  clase: RemaxAdvisorClass;
  tipoPersonal: RemaxStaffType;
  rol: string;
  comisionRate: number | null;
  activo: boolean;
}

export interface RemaxProperty {
  id: string;
  clave: string;
  domicilio: string;
  colonia: string;
  ciudad: string;
  municipio: string;
  estado: string;
  tipo: string;
  giro: string;
  operacion: RemaxOperation;
  estatus: RemaxPropertyStatus;
  fechaAlta: string;
  fechaCierre?: string;
  fechaCancelacion?: string;
  precioActual: number;
  propietario: string;
  asesoresAlta: string[];
  asesoresBaja: string[];
  asesoresCancelacion: string[];
  historialValores: string[];
  comunicadoIds: string[];
  condicionesOperacion: string;
  fichaResumen: string;
}

export interface RemaxValueHistory {
  id: string;
  propiedadClave: string;
  fecha: string;
  valorAnterior: number | null;
  valorNuevo: number;
  motivo: string;
  cierre?: string;
  usuario: string;
  observaciones?: string;
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
}

export interface RemaxActivityItem {
  id: string;
  fecha: string;
  titulo: string;
  detalle: string;
  tone: "info" | "success" | "warning" | "danger";
}
