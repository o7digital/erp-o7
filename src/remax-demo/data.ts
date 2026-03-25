import type {
  RemaxAdvisor,
  RemaxCommunication,
  RemaxProperty,
  RemaxSelectOption
} from "@/remax-demo/types";

export const remaxCategoryOptions: RemaxSelectOption[] = [
  { label: "Exclusiva", code: "EX" },
  { label: "Opcion", code: "OP" },
  { label: "Coop", code: "CO" },
  { label: "Otro", code: "OT" }
];

export const remaxGiroOptions: RemaxSelectOption[] = [
  { label: "Residencial", code: "R" },
  { label: "Comercial", code: "C" },
  { label: "Industrial", code: "I" }
];

export const remaxTipoOptions: RemaxSelectOption[] = [
  { label: "Casa", code: "C" },
  { label: "Departamento", code: "D" },
  { label: "Bodega", code: "B" },
  { label: "Local", code: "L" },
  { label: "Terreno", code: "T" },
  { label: "Oficina", code: "O" }
];

export const remaxOperacionOptions: RemaxSelectOption[] = [
  { label: "Venta", code: "V" },
  { label: "Renta", code: "R" }
];

export const remaxDemoAdvisors: RemaxAdvisor[] = [
  {
    id: "pedro-leyva",
    nombre: "Pedro Leyva",
    clase: "A",
    tipoPersonal: "direccion",
    rol: "Director General / Asesor A",
    comisionRate: 0.075,
    activo: true
  },
  {
    id: "alejandra-rios",
    nombre: "Alejandra Rios",
    clase: "A",
    tipoPersonal: "asesor",
    rol: "Captacion residencial",
    comisionRate: 0.07,
    activo: true
  },
  {
    id: "mariana-cisneros",
    nombre: "Mariana Cisneros",
    clase: "A",
    tipoPersonal: "asesor",
    rol: "Rentas corporativas",
    comisionRate: 0.07,
    activo: true
  },
  {
    id: "andres-galvan",
    nombre: "Andres Galvan",
    clase: "A",
    tipoPersonal: "asesor",
    rol: "Industrial y logistica",
    comisionRate: 0.0725,
    activo: true
  },
  {
    id: "daniela-ibarra",
    nombre: "Daniela Ibarra",
    clase: "A",
    tipoPersonal: "asesor",
    rol: "Residencial alto valor",
    comisionRate: 0.07,
    activo: true
  },
  {
    id: "julieta-mora",
    nombre: "Julieta Mora",
    clase: "A",
    tipoPersonal: "asesor",
    rol: "Cierres y negociacion",
    comisionRate: 0.07,
    activo: true
  },
  {
    id: "ricardo-salinas",
    nombre: "Ricardo Salinas",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Prospeccion zona sur",
    comisionRate: 0.045,
    activo: true
  },
  {
    id: "sofia-campos",
    nombre: "Sofia Campos",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Apoyo comercial",
    comisionRate: 0.045,
    activo: true
  },
  {
    id: "valeria-ordonez",
    nombre: "Valeria Ordonez",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Seguimiento de inventario",
    comisionRate: 0.0425,
    activo: true
  },
  {
    id: "diego-ruiz",
    nombre: "Diego Ruiz",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Rentas residenciales",
    comisionRate: 0.045,
    activo: true
  },
  {
    id: "karla-soto",
    nombre: "Karla Soto",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Control de visitas",
    comisionRate: 0.04,
    activo: true
  },
  {
    id: "tomas-herrera",
    nombre: "Tomas Herrera",
    clase: "M",
    tipoPersonal: "asesor",
    rol: "Inventario y llaves",
    comisionRate: 0.04,
    activo: true
  },
  {
    id: "patricia-romo",
    nombre: "Patricia Romo",
    clase: null,
    tipoPersonal: "administrativo",
    rol: "Coordinacion operativa",
    comisionRate: null,
    activo: true
  },
  {
    id: "erika-valles",
    nombre: "Erika Valles",
    clase: null,
    tipoPersonal: "administrativo",
    rol: "Control de comisiones",
    comisionRate: null,
    activo: true
  },
  {
    id: "leonel-arias",
    nombre: "Leonel Arias",
    clase: null,
    tipoPersonal: "administrativo",
    rol: "Backoffice de captacion",
    comisionRate: null,
    activo: true
  },
  {
    id: "susana-montes",
    nombre: "Susana Montes",
    clase: null,
    tipoPersonal: "administrativo",
    rol: "Expedientes y contratos",
    comisionRate: null,
    activo: true
  },
  {
    id: "gabriela-perez",
    nombre: "Gabriela Perez",
    clase: null,
    tipoPersonal: "recepcion",
    rol: "Recepcion y agenda comercial",
    comisionRate: null,
    activo: true
  }
];

const defaultResidentialSheet = {
  estilo: "Contemporaneo",
  proyecto: "Remax Activa Residencial",
  acabados: "Piso porcelanato y carpinteria en maple",
  conservacion: "Muy buena",
  fachada: "Moderna",
  ventanas: "Aluminio",
  cristales: "Templado",
  carpinteria: "Encino",
  puertas: "Madera solida",
  otro: "Preparacion para minisplit",
  amenidades: ["Salon de TV", "Lavanderia", "Jardin"],
  espacios: [
    { nombre: "Sala", nivel: "PB", banos: 0, acabados: "Piso marmol" },
    { nombre: "Comedor", nivel: "PB", banos: 0, acabados: "Muro decorativo" },
    { nombre: "Rec principal", nivel: "PA", banos: 1, acabados: "Vestidor y terraza" }
  ]
};

const defaultCommercialSheet = {
  categoria: "Industrial",
  clasificacion: "Bodega operativa",
  vigilancia: true,
  telefonos: true,
  lineas: "2",
  iluminacion: "LED",
  banios: 2,
  elevador: false,
  estacionamiento: "33 cajones",
  observaciones: "Espacio listo para operacion con acceso de trailers."
};

export const remaxDemoCommunications: RemaxCommunication[] = [
  {
    id: "com-alta-ibr-op277",
    tipo: "ALTA",
    propiedadClave: "IBR-OP277",
    fecha: "2026-03-21",
    asunto: "COMUNICADO INTERNO: ALTA DE PROPIEDAD, IBR-OP277.",
    destinatarios: ["todos@remax-activa.com.mx", "inventario@remax-activa.com.mx"],
    estado: "enviado",
    resumen: "Se informa el alta de la propiedad IBR-OP277 y la apertura del expediente operativo.",
    remitente: "Inventario REMAX Activa",
    firma: "Patricia Romo | Coordinacion operativa"
  },
  {
    id: "com-baja-cbr-1748",
    tipo: "BAJA",
    propiedadClave: "CBR-1748",
    fecha: "2026-03-18",
    asunto: "COMUNICADO INTERNO: BAJA / CIERRE DE PROPIEDAD, CBR-1748.",
    destinatarios: ["todos@remax-activa.com.mx", "comisiones@remax-activa.com.mx"],
    estado: "enviado",
    resumen: "La propiedad CBR-1748 pasa a cerrada y se activa el circuito de comisiones.",
    remitente: "Inventario REMAX Activa",
    firma: "Erika Valles | Control de comisiones"
  },
  {
    id: "com-cancel-rtv-571",
    tipo: "CANCELACION",
    propiedadClave: "RTV-571",
    fecha: "2026-03-24",
    asunto: "COMUNICADO INTERNO: CANCELACION DE PROPIEDAD, RTV-571.",
    destinatarios: ["todos@remax-activa.com.mx", "direccion@remax-activa.com.mx"],
    estado: "borrador",
    resumen: "Se documenta la cancelacion de RTV-571 con motivo registrado por inventario.",
    remitente: "Inventario REMAX Activa",
    firma: "Brenda Noemi Ramirez Cardenas | Inventario"
  },
  {
    id: "com-cancel-rtr-2280",
    tipo: "CANCELACION",
    propiedadClave: "RTR-2280",
    fecha: "2026-03-24",
    asunto: "COMUNICADO INTERNO: CANCELACION DE PROPIEDAD, CIUDAD DEL SOL.",
    destinatarios: ["todos@remax-activa.com.mx"],
    estado: "enviado",
    resumen: "Se informa la cancelacion de RTR-2280 en Ciudad del Sol, Zapopan.",
    remitente: "Inventario REMAX Activa",
    firma: "Brenda Noemi Ramirez Cardenas | Inventario"
  },
  {
    id: "com-alta-icv-441",
    tipo: "ALTA",
    propiedadClave: "ICV-441",
    fecha: "2026-02-12",
    asunto: "COMUNICADO INTERNO: ALTA DE PROPIEDAD, ICV-441.",
    destinatarios: ["inventario@remax-activa.com.mx", "recepcion@remax-activa.com.mx"],
    estado: "enviado",
    resumen: "Nueva captacion residencial lista para salida comercial y ficha tecnica.",
    remitente: "Inventario REMAX Activa",
    firma: "Gabriela Perez | Recepcion"
  },
  {
    id: "com-baja-ohr-1182",
    tipo: "BAJA",
    propiedadClave: "OHR-1182",
    fecha: "2026-02-28",
    asunto: "COMUNICADO INTERNO: BAJA DE PROPIEDAD, OHR-1182.",
    destinatarios: ["comisiones@remax-activa.com.mx", "operaciones@remax-activa.com.mx"],
    estado: "archivado",
    resumen: "La oficina OHR-1182 se cierra por firma de contrato anual.",
    remitente: "Inventario REMAX Activa",
    firma: "Patricia Romo | Coordinacion operativa"
  }
];

export const remaxDemoProperties: RemaxProperty[] = [
  {
    id: "prop-ibr-op277",
    folio: 4280,
    clave: "IBR-OP277",
    categoria: "Opcion",
    categoriaCode: "OP",
    giro: "Industrial",
    giroCode: "I",
    tipo: "Bodega",
    tipoCode: "B",
    operacion: "Renta",
    operacionCode: "R",
    exclusividad: "Opcion",
    estatus: "Activa",
    altaBaja: "Alta",
    descripcionCorta: "Camino viejo a los Laureles 195, 10-14, El Zapote del Valle",
    address: {
      calle: "Camino viejo a los Laureles",
      noExt: "195",
      noInt: "10-14",
      edificio: "",
      piso: "PB",
      entreCalles: "Carretera a Chapala",
      colonia: "El Zapote del Valle",
      coto: "",
      fraccionamiento: "",
      municipio: "Tlajomulco de Zuniga",
      cp: "45679",
      entidad: "Jalisco",
      coordenadasGuiaRoji: "124-C"
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "",
      telCitas: "3314162474",
      contactoCitas: "Pedro Leyva",
      origen: "Personal",
      origenDetalle: ""
    },
    fechas: {
      alta: "2026-03-21",
      aviso: "2026-03-21",
      contrato: "2026-03-21",
      inicioPromo: "2026-03-21"
    },
    referidos: {
      idRef: "",
      nombre: "",
      empresa: ""
    },
    ids: {
      ampi: "",
      remax: "",
      catastral: ""
    },
    visitaRecorrido: "Programada",
    comoLlegar: {
      ligasA: "REMAX, Google Map, Google Earth, AMPI",
      remax: "remax-activa.com.mx/ibr-op277",
      googleMap: "maps.google.com/?q=Camino+viejo+a+los+Laureles+195",
      googleEarth: "earth.google.com/ibr-op277",
      ampi: "ampi.mx/ibr-op277",
      fichaArchivo: "IBR-OP277-zde",
      ftPdf: "IBR-OP277.pdf",
      comentarios: "Expediente completo y listo para checklist."
    },
    caracteristicas: {
      supTerreno: 564.97,
      supConstruccion: 4483.36,
      frente: 157,
      fondo: 59.61,
      frentes: 1,
      recamaras: 0,
      banos: 2,
      medioBanos: 0,
      jardin: false,
      estacionamientosCubiertos: 0,
      estacionamientosDescubiertos: 33,
      nivel: "PB",
      pisosTotales: 1,
      exteriorInterior: "Exterior",
      noUnidades: 0,
      vistaA: "",
      elevadores: 0,
      edad: 0,
      formaTerreno: "Irregular",
      inclinacion: "Plano",
      ubicacion: "Medianero",
      usoSuelo: "Industrial",
      restricciones: "",
      descripcion: "Bodega con patios de maniobra y frente operativo",
      categoria: "Industrial",
      notas: "Uso de suelo vigente y accesos para transporte pesado.",
      servicios: ["Transportes", "Parques", "Comercios", "Bancos"],
      superficiesValores: [
        { concepto: "Terreno", metros: 564.97, valor: 0, total: 0 },
        { concepto: "Areas princip.", metros: 4483.36, valor: 135, total: 605253.6 },
        { concepto: "Otras areas", metros: 0, valor: 0, total: 0 }
      ]
    },
    condicionesOperacion: {
      modoComision: "politica",
      porcentaje: 100,
      monto: 0,
      politicaVigente: "Politica de renta vigente",
      aplicaExcepcion: false,
      politicaAnterior: "",
      datosConfirmados: true,
      comentarios: "Registro de condiciones de operacion renta validado con cliente."
    },
    condicionesRenta: {
      anos: 1,
      formaPago: "Mensual",
      rentaAdelantada: true,
      rentaDeposito: true,
      aplicaFianza: false,
      afianzadora: "",
      montoFianza: 0,
      fiadorSolidario: true,
      fiadorBienRaiz: false,
      contratoTransaccion: true,
      vigencia: "12 meses",
      contratoIntermediacion: true,
      seguroDanios: true,
      seguroResponsabilidadCivil: true,
      investigacion: true,
      costoInvestigacion: 2500,
      investigador: "Control Activa",
      herramientaJuridica: "Convenio interno",
      abogado: "Lic. Sofia Murillo",
      notario: "N/A",
      empresa: "Remax Activa",
      aplicaMantenimiento: true,
      montoMantenimiento: 12000,
      periodoMantenimiento: "Mensual",
      observaciones: "Contrato con mantenimiento y validacion juridica previa."
    },
    propietarios: [
      {
        id: "owner-ibr-1",
        nombre: "Oscar Ivan Olivares Barocio",
        telefono: "3336161800",
        correo: "oolivares@eventorno.com",
        principal: true
      }
    ],
    asesoresAlta: [
      {
        advisorId: "pedro-leyva",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 100,
        monto: 605253.6,
        tipoIntervencion: "Alta",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [],
    asesoresCancelacion: [],
    fichaTecnica: {
      residencial: {
        ...defaultResidentialSheet,
        estilo: "Industrial adaptable",
        proyecto: "Operacion renta",
        acabados: "Muros y piso reforzado",
        conservacion: "Activa",
        fachada: "Nave industrial",
        ventanas: "Fijas",
        cristales: "Templado",
        carpinteria: "Metalica",
        puertas: "Cortina industrial",
        otro: "Anden de carga",
        amenidades: ["Jardin", "Lavanderia"],
        espacios: [
          { nombre: "Oficina interna", nivel: "PB", banos: 1, acabados: "Yeso y pintura" },
          { nombre: "Area operativa", nivel: "PB", banos: 1, acabados: "Piso pulido" },
          { nombre: "Patio", nivel: "PB", banos: 0, acabados: "Concreto" }
        ]
      },
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Industrial",
        clasificacion: "Bodega en renta",
        estacionamiento: "33 cajones descubiertos"
      }
    },
    historialValores: [
      {
        id: "vh-ibr-1",
        propiedadClave: "IBR-OP277",
        fecha: "2026-03-21",
        valor: 605253.6,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta de propiedad",
        usuario: "Pedro Leyva"
      }
    ]
  },
  {
    id: "prop-cbr-1748",
    folio: 2744,
    clave: "CBR-1748",
    categoria: "Coop",
    categoriaCode: "CO",
    giro: "Comercial",
    giroCode: "C",
    tipo: "Bodega",
    tipoCode: "B",
    operacion: "Renta",
    operacionCode: "R",
    exclusividad: "Coop",
    estatus: "Cerrada",
    altaBaja: "Baja",
    descripcionCorta: "Privada de las Flores 300, Parques de Santa Maria",
    address: {
      calle: "Privada de las Flores",
      noExt: "300",
      noInt: "",
      edificio: "",
      piso: "",
      entreCalles: "",
      colonia: "Parques de Santa Maria",
      coto: "",
      fraccionamiento: "",
      municipio: "San Pedro Tlaquepaque",
      cp: "45600",
      entidad: "Jalisco",
      coordenadasGuiaRoji: ""
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "14",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "Activas",
      telCitas: "3338182001",
      contactoCitas: "Alejandra Rios",
      origen: "Portal",
      origenDetalle: "Cliente informe"
    },
    fechas: {
      alta: "2022-07-13",
      aviso: "2022-07-13",
      contrato: "2022-07-13",
      inicioPromo: "2022-07-13"
    },
    referidos: {
      idRef: "RF-119",
      nombre: "Carlos Benitez",
      empresa: "CBR Holdings"
    },
    ids: {
      ampi: "CBR1748",
      remax: "RMX-CBR1748",
      catastral: "TLQ-0038-19"
    },
    visitaRecorrido: "Visitada",
    comoLlegar: {
      ligasA: "Google Map y AMPI",
      remax: "remax-activa.com.mx/cbr-1748",
      googleMap: "maps.google.com/?q=Privada+de+las+Flores+300",
      googleEarth: "",
      ampi: "ampi.mx/cbr-1748",
      fichaArchivo: "CBR-1748",
      ftPdf: "CBR-1748.pdf",
      comentarios: "Historial de valores revisado antes de cerrar."
    },
    caracteristicas: {
      supTerreno: 900,
      supConstruccion: 700,
      frente: 22,
      fondo: 38,
      frentes: 1,
      recamaras: 0,
      banos: 2,
      medioBanos: 1,
      jardin: false,
      estacionamientosCubiertos: 2,
      estacionamientosDescubiertos: 8,
      nivel: "PB",
      pisosTotales: 1,
      exteriorInterior: "Exterior",
      noUnidades: 1,
      vistaA: "Avenida principal",
      elevadores: 0,
      edad: 8,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Esquina",
      usoSuelo: "Comercial",
      restricciones: "",
      descripcion: "Bodega comercial cerrada por firma de renta.",
      categoria: "Comercial",
      notas: "Se ajusto valor previo a la firma.",
      servicios: ["Transportes", "Comercios", "Bancos"],
      superficiesValores: [
        { concepto: "Terreno", metros: 900, valor: 0, total: 0 },
        { concepto: "Construccion", metros: 700, valor: 90, total: 63000 }
      ]
    },
    condicionesOperacion: {
      modoComision: "monto",
      porcentaje: 0,
      monto: 70000,
      politicaVigente: "Monto fijo de colocacion",
      aplicaExcepcion: true,
      politicaAnterior: "Politica anterior 2022",
      datosConfirmados: true,
      comentarios: "Cierre con excepcion autorizada por direccion."
    },
    condicionesRenta: {
      anos: 3,
      formaPago: "Mensual",
      rentaAdelantada: false,
      rentaDeposito: true,
      aplicaFianza: false,
      afianzadora: "",
      montoFianza: 0,
      fiadorSolidario: true,
      fiadorBienRaiz: false,
      contratoTransaccion: true,
      vigencia: "36 meses",
      contratoIntermediacion: false,
      seguroDanios: true,
      seguroResponsabilidadCivil: true,
      investigacion: false,
      costoInvestigacion: 0,
      investigador: "",
      herramientaJuridica: "Contrato privado",
      abogado: "Lic. Andrea Ramos",
      notario: "",
      empresa: "CBR Holdings",
      aplicaMantenimiento: false,
      montoMantenimiento: 0,
      periodoMantenimiento: "",
      observaciones: "Contrato firmado y propiedad marcada como cerrada."
    },
    propietarios: [
      {
        id: "owner-cbr-1",
        nombre: "Carlos Benitez",
        telefono: "3338910022",
        correo: "cbenitez@cbrholdings.mx",
        principal: true
      }
    ],
    asesoresAlta: [
      {
        advisorId: "alejandra-rios",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 70,
        monto: 66500,
        tipoIntervencion: "Alta",
        contexto: "Alta"
      },
      {
        advisorId: "sofia-campos",
        nivel: "M",
        comisionTipo: "%",
        participacionPorcentaje: 30,
        monto: 28500,
        tipoIntervencion: "Apoyo de alta",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [
      {
        advisorId: "julieta-mora",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 60,
        monto: 42000,
        tipoIntervencion: "Cierre",
        contexto: "Baja / cierre"
      },
      {
        advisorId: "pedro-leyva",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 40,
        monto: 28000,
        tipoIntervencion: "Autorizacion cierre",
        contexto: "Baja / cierre"
      }
    ],
    asesoresCancelacion: [],
    fichaTecnica: {
      residencial: defaultResidentialSheet,
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Comercial",
        clasificacion: "Bodega cerrada"
      }
    },
    historialValores: [
      {
        id: "vh-cbr-1",
        propiedadClave: "CBR-1748",
        fecha: "2022-07-13",
        valor: 95000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta",
        usuario: "Alejandra Rios"
      },
      {
        id: "vh-cbr-2",
        propiedadClave: "CBR-1748",
        fecha: "2023-01-09",
        valor: 70000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Cambio de precio",
        motivoMinuta: "Cambio de precio",
        usuario: "Alejandra Rios"
      },
      {
        id: "vh-cbr-3",
        propiedadClave: "CBR-1748",
        fecha: "2023-01-23",
        valor: 63000,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Ajuste final",
        motivoMinuta: "Cambio de precio",
        usuario: "Julieta Mora"
      }
    ],
    baja: {
      fechaBaja: "2026-03-18",
      tipoCierre: "Cerrada",
      condicionCierre: "Contrato firmado a 36 meses",
      personaRegistra: "Erika Valles",
      comentarios: "Propiedad lista para minuta y comisiones.",
      comunicadoId: "com-baja-cbr-1748"
    }
  },
  {
    id: "prop-rtv-571",
    folio: 1,
    clave: "RTV-571",
    categoria: "Exclusiva",
    categoriaCode: "EX",
    giro: "Residencial",
    giroCode: "R",
    tipo: "Terreno",
    tipoCode: "T",
    operacion: "Venta",
    operacionCode: "V",
    exclusividad: "Exclusiva",
    estatus: "Cancelada",
    altaBaja: "Baja",
    descripcionCorta: "Pedro Salcido 27, Analco",
    address: {
      calle: "Pedro Salcido",
      noExt: "27",
      noInt: "",
      edificio: "",
      piso: "",
      entreCalles: "Cuauhtemoc y Autlahual",
      colonia: "Analco",
      coto: "",
      fraccionamiento: "",
      municipio: "Guadalajara",
      cp: "44450",
      entidad: "Jalisco",
      coordenadasGuiaRoji: ""
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "",
      telCitas: "3310022001",
      contactoCitas: "Lupita Fonseca",
      origen: "Personal",
      origenDetalle: ""
    },
    fechas: {
      alta: "2014-11-01",
      aviso: "2014-11-01",
      contrato: "2014-11-01",
      inicioPromo: "2014-11-01"
    },
    referidos: {
      idRef: "",
      nombre: "",
      empresa: ""
    },
    ids: {
      ampi: "",
      remax: "",
      catastral: ""
    },
    visitaRecorrido: "Por visitar",
    comoLlegar: {
      ligasA: "",
      remax: "",
      googleMap: "",
      googleEarth: "",
      ampi: "",
      fichaArchivo: "RTV-571",
      ftPdf: "RTV-571.pdf",
      comentarios: "Expediente de cancelacion con motivo documentado."
    },
    caracteristicas: {
      supTerreno: 320,
      supConstruccion: 0,
      frente: 12,
      fondo: 26,
      frentes: 1,
      recamaras: 0,
      banos: 0,
      medioBanos: 0,
      jardin: false,
      estacionamientosCubiertos: 0,
      estacionamientosDescubiertos: 0,
      nivel: "PB",
      pisosTotales: 0,
      exteriorInterior: "Exterior",
      noUnidades: 0,
      vistaA: "",
      elevadores: 0,
      edad: 0,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Medianero",
      usoSuelo: "Habitacional",
      restricciones: "",
      descripcion: "Terreno urbano en zona tradicional.",
      categoria: "Residencial",
      notas: "Cancelada por cambio de decision del propietario.",
      servicios: ["Escuelas", "Comercios"],
      superficiesValores: [
        { concepto: "Terreno", metros: 320, valor: 16500, total: 5280000 }
      ]
    },
    condicionesOperacion: {
      modoComision: "politica",
      porcentaje: 6,
      monto: 0,
      politicaVigente: "Venta residencial 6%",
      aplicaExcepcion: false,
      politicaAnterior: "",
      datosConfirmados: true,
      comentarios: "Sin excepciones de politica."
    },
    propietarios: [
      {
        id: "owner-rtv-1",
        nombre: "Lupita Fonseca",
        telefono: "3336688001",
        correo: "lfonseca@gmail.com",
        principal: true
      }
    ],
    asesoresAlta: [
      {
        advisorId: "valeria-ordonez",
        nivel: "M",
        comisionTipo: "%",
        participacionPorcentaje: 100,
        monto: 5280000,
        tipoIntervencion: "Alta",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [],
    asesoresCancelacion: [
      {
        advisorId: "pedro-leyva",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 50,
        monto: 2640000,
        tipoIntervencion: "Cancelacion",
        contexto: "Cancelacion"
      },
      {
        advisorId: "valeria-ordonez",
        nivel: "M",
        comisionTipo: "%",
        participacionPorcentaje: 50,
        monto: 2640000,
        tipoIntervencion: "Seguimiento cancelacion",
        contexto: "Cancelacion"
      }
    ],
    fichaTecnica: {
      residencial: {
        ...defaultResidentialSheet,
        estilo: "Terreno",
        proyecto: "Lote urbano",
        acabados: "Sin aplicar",
        conservacion: "No aplica",
        fachada: "No aplica",
        ventanas: "No aplica",
        cristales: "No aplica",
        carpinteria: "No aplica",
        puertas: "No aplica",
        otro: "Documentacion urbana",
        amenidades: ["Jardin"],
        espacios: [{ nombre: "Terreno", nivel: "PB", banos: 0, acabados: "Libre" }]
      },
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Lote",
        clasificacion: "Terreno",
        banios: 0,
        estacionamiento: "No aplica"
      }
    },
    historialValores: [
      {
        id: "vh-rtv-1",
        propiedadClave: "RTV-571",
        fecha: "2025-08-07",
        valor: 5350000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta",
        usuario: "Valeria Ordonez"
      },
      {
        id: "vh-rtv-2",
        propiedadClave: "RTV-571",
        fecha: "2026-02-14",
        valor: 5280000,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Ajuste por mercado",
        motivoMinuta: "Cambio de precio",
        usuario: "Pedro Leyva"
      }
    ],
    cancelacion: {
      fechaAvisoRecepcion: "2025-08-07",
      fechaCancelacion: "2026-04-08",
      motivo: "El propietario decide detener la comercializacion.",
      aplicaComision: true,
      personaRegistra: "Brenda Noemi Ramirez Cardenas",
      bajaPor: "Cierre",
      comentarios: "Cancelacion con comision aplicable por gestion realizada.",
      comunicadoId: "com-cancel-rtv-571"
    }
  },
  {
    id: "prop-rtr-2280",
    folio: 2280,
    clave: "RTR-2280",
    categoria: "Exclusiva",
    categoriaCode: "EX",
    giro: "Residencial",
    giroCode: "R",
    tipo: "Casa",
    tipoCode: "C",
    operacion: "Venta",
    operacionCode: "V",
    exclusividad: "Exclusiva",
    estatus: "Cancelada",
    altaBaja: "Baja",
    descripcionCorta: "Mixcoatl 1421, Ciudad del Sol",
    address: {
      calle: "Mixcoatl",
      noExt: "1421",
      noInt: "",
      edificio: "",
      piso: "",
      entreCalles: "",
      colonia: "Ciudad del Sol",
      coto: "",
      fraccionamiento: "",
      municipio: "Zapopan",
      cp: "45050",
      entidad: "Jalisco",
      coordenadasGuiaRoji: ""
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "",
      telCitas: "3331182002",
      contactoCitas: "Claudia Gilo Perez",
      origen: "Personal",
      origenDetalle: ""
    },
    fechas: {
      alta: "2025-09-02",
      aviso: "2025-09-02",
      contrato: "2025-09-02",
      inicioPromo: "2025-09-04"
    },
    referidos: {
      idRef: "REF-339",
      nombre: "Lupita Fonseca",
      empresa: ""
    },
    ids: {
      ampi: "RTR2280",
      remax: "RMX-RTR2280",
      catastral: "ZAP-8820"
    },
    visitaRecorrido: "Visitada",
    comoLlegar: {
      ligasA: "Google Map",
      remax: "remax-activa.com.mx/rtr-2280",
      googleMap: "maps.google.com/?q=Mixcoatl+1421",
      googleEarth: "",
      ampi: "",
      fichaArchivo: "RTR-2280",
      ftPdf: "RTR-2280.pdf",
      comentarios: "Comunicado enviado a todo el equipo."
    },
    caracteristicas: {
      supTerreno: 240,
      supConstruccion: 310,
      frente: 10,
      fondo: 24,
      frentes: 1,
      recamaras: 3,
      banos: 2,
      medioBanos: 1,
      jardin: true,
      estacionamientosCubiertos: 2,
      estacionamientosDescubiertos: 0,
      nivel: "PB-PA",
      pisosTotales: 2,
      exteriorInterior: "Exterior",
      noUnidades: 1,
      vistaA: "Parque",
      elevadores: 0,
      edad: 12,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Medianero",
      usoSuelo: "Habitacional",
      restricciones: "",
      descripcion: "Casa familiar en Ciudad del Sol.",
      categoria: "Residencial",
      notas: "Cancelada por decision del propietario.",
      servicios: ["Parques", "Escuelas", "Comercios"],
      superficiesValores: [
        { concepto: "Terreno", metros: 240, valor: 13000, total: 3120000 },
        { concepto: "Construccion", metros: 310, valor: 9800, total: 3038000 }
      ]
    },
    condicionesOperacion: {
      modoComision: "politica",
      porcentaje: 6,
      monto: 0,
      politicaVigente: "Venta residencial 6%",
      aplicaExcepcion: false,
      politicaAnterior: "",
      datosConfirmados: true,
      comentarios: "Operacion sin excepciones."
    },
    propietarios: [
      {
        id: "owner-rtr-1",
        nombre: "Lupita Fonseca",
        telefono: "3311110098",
        correo: "lupita.fonseca@gmail.com",
        principal: true
      }
    ],
    asesoresAlta: [
      {
        advisorId: "daniela-ibarra",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 80,
        monto: 4920000,
        tipoIntervencion: "Alta",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [],
    asesoresCancelacion: [
      {
        advisorId: "daniela-ibarra",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 50,
        monto: 2460000,
        tipoIntervencion: "Cancelacion",
        contexto: "Cancelacion"
      },
      {
        advisorId: "pedro-leyva",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 50,
        monto: 2460000,
        tipoIntervencion: "Validacion direccion",
        contexto: "Cancelacion"
      }
    ],
    fichaTecnica: {
      residencial: defaultResidentialSheet,
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Residencial",
        clasificacion: "Casa",
        banios: 3,
        estacionamiento: "2 cajones"
      }
    },
    historialValores: [
      {
        id: "vh-rtr-1",
        propiedadClave: "RTR-2280",
        fecha: "2025-09-02",
        valor: 5050000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta",
        usuario: "Daniela Ibarra"
      },
      {
        id: "vh-rtr-2",
        propiedadClave: "RTR-2280",
        fecha: "2026-01-12",
        valor: 4920000,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Ajuste comercial",
        motivoMinuta: "Cambio de precio",
        usuario: "Pedro Leyva"
      }
    ],
    cancelacion: {
      fechaAvisoRecepcion: "2026-03-24",
      fechaCancelacion: "2026-03-24",
      motivo: "Cliente retira la propiedad del mercado.",
      aplicaComision: false,
      personaRegistra: "Brenda Noemi Ramirez Cardenas",
      bajaPor: "Cancelacion",
      comentarios: "Comunicado ya enviado al equipo completo.",
      comunicadoId: "com-cancel-rtr-2280"
    }
  },
  {
    id: "prop-icv-441",
    folio: 441,
    clave: "ICV-441",
    categoria: "Exclusiva",
    categoriaCode: "EX",
    giro: "Residencial",
    giroCode: "R",
    tipo: "Casa",
    tipoCode: "C",
    operacion: "Venta",
    operacionCode: "V",
    exclusividad: "Exclusiva",
    estatus: "Activa",
    altaBaja: "Alta",
    descripcionCorta: "Paseo del Vergel 441, La Rioja",
    address: {
      calle: "Paseo del Vergel",
      noExt: "441",
      noInt: "",
      edificio: "",
      piso: "",
      entreCalles: "Camino a la Rioja",
      colonia: "La Rioja",
      coto: "Bosques",
      fraccionamiento: "Privado",
      municipio: "Monterrey",
      cp: "64985",
      entidad: "Nuevo Leon",
      coordenadasGuiaRoji: "201-B"
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "9",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "En recepcion",
      telCitas: "8181442200",
      contactoCitas: "Gabriela Perez",
      origen: "Referido",
      origenDetalle: "Cliente informe"
    },
    fechas: {
      alta: "2026-02-12",
      aviso: "2026-02-12",
      contrato: "2026-02-12",
      inicioPromo: "2026-02-16"
    },
    referidos: {
      idRef: "RF-ICV44",
      nombre: "Cliente Informe",
      empresa: "REMAX Activa"
    },
    ids: {
      ampi: "ICV441",
      remax: "RMX-ICV441",
      catastral: "MTY-552299"
    },
    visitaRecorrido: "Programada",
    comoLlegar: {
      ligasA: "REMAX y Google Map",
      remax: "remax-activa.com.mx/icv-441",
      googleMap: "maps.google.com/?q=Paseo+del+Vergel+441",
      googleEarth: "",
      ampi: "",
      fichaArchivo: "ICV-441",
      ftPdf: "ICV-441.pdf",
      comentarios: "Ficha residencial premium con dos propietarios."
    },
    caracteristicas: {
      supTerreno: 280,
      supConstruccion: 360,
      frente: 14,
      fondo: 20,
      frentes: 1,
      recamaras: 4,
      banos: 4,
      medioBanos: 1,
      jardin: true,
      estacionamientosCubiertos: 2,
      estacionamientosDescubiertos: 1,
      nivel: "PB-PA",
      pisosTotales: 2,
      exteriorInterior: "Exterior",
      noUnidades: 1,
      vistaA: "Parque interior",
      elevadores: 0,
      edad: 5,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Esquina",
      usoSuelo: "Habitacional",
      restricciones: "Reglamento condominio",
      descripcion: "Residencia de alto valor con jardin y acabados premium.",
      categoria: "Residencial",
      notas: "Ficha tecnica rica para demo de propietarios y tecnica.",
      servicios: ["Parques", "Escuelas", "Bancos", "Comercios"],
      superficiesValores: [
        { concepto: "Terreno", metros: 280, valor: 16000, total: 4480000 },
        { concepto: "Construccion", metros: 360, valor: 11250, total: 4050000 }
      ]
    },
    condicionesOperacion: {
      modoComision: "politica",
      porcentaje: 6,
      monto: 0,
      politicaVigente: "Venta residencial premium 6%",
      aplicaExcepcion: false,
      politicaAnterior: "",
      datosConfirmados: true,
      comentarios: "Checklist completo y datos confirmados."
    },
    propietarios: [
      {
        id: "owner-icv-1",
        nombre: "Marcela Ochoa",
        telefono: "8119943311",
        correo: "marcela.ochoa@gmail.com",
        principal: true
      },
      {
        id: "owner-icv-2",
        nombre: "Sergio Ochoa",
        telefono: "8119943322",
        correo: "sergio.ochoa@gmail.com",
        principal: false
      }
    ],
    asesoresAlta: [
      {
        advisorId: "alejandra-rios",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 70,
        monto: 5971000,
        tipoIntervencion: "Captacion",
        contexto: "Alta"
      },
      {
        advisorId: "ricardo-salinas",
        nivel: "M",
        comisionTipo: "%",
        participacionPorcentaje: 30,
        monto: 2559000,
        tipoIntervencion: "Prospeccion",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [],
    asesoresCancelacion: [],
    fichaTecnica: {
      residencial: {
        ...defaultResidentialSheet,
        espacios: [
          { nombre: "Sala", nivel: "PB", banos: 0, acabados: "Cantera y madera" },
          { nombre: "Comedor", nivel: "PB", banos: 0, acabados: "Piso porcelanato" },
          { nombre: "Estudio", nivel: "PB", banos: 0, acabados: "Muebles empotrados" },
          { nombre: "Rec principal", nivel: "PA", banos: 1, acabados: "Vestidor y terraza" },
          { nombre: "Rec 2", nivel: "PA", banos: 1, acabados: "Closet" }
        ]
      },
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Residencial",
        clasificacion: "Casa premium",
        banios: 4,
        estacionamiento: "2 cubiertos + 1 descubierto"
      }
    },
    historialValores: [
      {
        id: "vh-icv-1",
        propiedadClave: "ICV-441",
        fecha: "2026-02-12",
        valor: 8530000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta",
        usuario: "Alejandra Rios"
      },
      {
        id: "vh-icv-2",
        propiedadClave: "ICV-441",
        fecha: "2026-03-07",
        valor: 8350000,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Ajuste por open house",
        motivoMinuta: "Cambio de precio",
        usuario: "Pedro Leyva"
      }
    ]
  },
  {
    id: "prop-ohr-1182",
    folio: 1182,
    clave: "OHR-1182",
    categoria: "Opcion",
    categoriaCode: "OP",
    giro: "Comercial",
    giroCode: "C",
    tipo: "Oficina",
    tipoCode: "O",
    operacion: "Renta",
    operacionCode: "R",
    exclusividad: "Opcion",
    estatus: "Cerrada",
    altaBaja: "Baja",
    descripcionCorta: "Av. Patria 1182, Puerta de Hierro",
    address: {
      calle: "Av. Patria",
      noExt: "1182",
      noInt: "8B",
      edificio: "Torre Ejecutiva",
      piso: "8",
      entreCalles: "",
      colonia: "Puerta de Hierro",
      coto: "",
      fraccionamiento: "",
      municipio: "Zapopan",
      cp: "45116",
      entidad: "Jalisco",
      coordenadasGuiaRoji: ""
    },
    agenda: {
      condicionesVisitas: "Citas",
      cajaNo: "",
      disponibilidadVisitas: "Disponible",
      estatusLlaves: "Recepcion",
      telCitas: "3330001100",
      contactoCitas: "Mariana Cisneros",
      origen: "Personal",
      origenDetalle: ""
    },
    fechas: {
      alta: "2025-12-02",
      aviso: "2025-12-02",
      contrato: "2025-12-03",
      inicioPromo: "2025-12-05"
    },
    referidos: {
      idRef: "",
      nombre: "",
      empresa: ""
    },
    ids: {
      ampi: "",
      remax: "RMX-OHR1182",
      catastral: ""
    },
    visitaRecorrido: "Visitada",
    comoLlegar: {
      ligasA: "REMAX",
      remax: "remax-activa.com.mx/ohr-1182",
      googleMap: "",
      googleEarth: "",
      ampi: "",
      fichaArchivo: "OHR-1182",
      ftPdf: "OHR-1182.pdf",
      comentarios: "Caso util para mostrar asesor con rol en alta y cierre."
    },
    caracteristicas: {
      supTerreno: 180,
      supConstruccion: 180,
      frente: 10,
      fondo: 18,
      frentes: 1,
      recamaras: 0,
      banos: 2,
      medioBanos: 0,
      jardin: false,
      estacionamientosCubiertos: 4,
      estacionamientosDescubiertos: 0,
      nivel: "8",
      pisosTotales: 1,
      exteriorInterior: "Interior",
      noUnidades: 1,
      vistaA: "Zona corporativa",
      elevadores: 2,
      edad: 7,
      formaTerreno: "Regular",
      inclinacion: "Plano",
      ubicacion: "Torre",
      usoSuelo: "Oficina",
      restricciones: "",
      descripcion: "Oficina cerrada por contrato anual.",
      categoria: "Comercial",
      notas: "Pedro Leyva participa tanto en alta como en cierre.",
      servicios: ["Bancos", "Comercios", "Transportes"],
      superficiesValores: [
        { concepto: "Oficina", metros: 180, valor: 611, total: 110000 }
      ]
    },
    condicionesOperacion: {
      modoComision: "monto",
      porcentaje: 0,
      monto: 110000,
      politicaVigente: "Monto de colocacion",
      aplicaExcepcion: false,
      politicaAnterior: "",
      datosConfirmados: true,
      comentarios: "Monto fijo por renta anual."
    },
    condicionesRenta: {
      anos: 2,
      formaPago: "Mensual",
      rentaAdelantada: false,
      rentaDeposito: true,
      aplicaFianza: false,
      afianzadora: "",
      montoFianza: 0,
      fiadorSolidario: true,
      fiadorBienRaiz: false,
      contratoTransaccion: true,
      vigencia: "24 meses",
      contratoIntermediacion: true,
      seguroDanios: false,
      seguroResponsabilidadCivil: true,
      investigacion: false,
      costoInvestigacion: 0,
      investigador: "",
      herramientaJuridica: "Convenio",
      abogado: "Lic. Carlos Meza",
      notario: "",
      empresa: "Puerta de Hierro Offices",
      aplicaMantenimiento: true,
      montoMantenimiento: 9500,
      periodoMantenimiento: "Mensual",
      observaciones: "Contrato cerrado en Q1."
    },
    propietarios: [
      {
        id: "owner-ohr-1",
        nombre: "Operadora Ejecutiva PH",
        telefono: "3332150012",
        correo: "contacto@executivaph.mx",
        principal: true
      }
    ],
    asesoresAlta: [
      {
        advisorId: "mariana-cisneros",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 70,
        monto: 77000,
        tipoIntervencion: "Alta",
        contexto: "Alta"
      },
      {
        advisorId: "pedro-leyva",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 30,
        monto: 33000,
        tipoIntervencion: "Direccion comercial",
        contexto: "Alta"
      }
    ],
    asesoresBaja: [
      {
        advisorId: "pedro-leyva",
        nivel: "A",
        comisionTipo: "%",
        participacionPorcentaje: 100,
        monto: 110000,
        tipoIntervencion: "Cierre",
        contexto: "Baja / cierre"
      }
    ],
    asesoresCancelacion: [],
    fichaTecnica: {
      residencial: defaultResidentialSheet,
      comercial: {
        ...defaultCommercialSheet,
        categoria: "Comercial",
        clasificacion: "Oficina",
        estacionamiento: "4 cajones cubiertos"
      }
    },
    historialValores: [
      {
        id: "vh-ohr-1",
        propiedadClave: "OHR-1182",
        fecha: "2025-12-02",
        valor: 118000,
        moneda: "Pesos",
        posicion: "",
        motivoCambio: "Alta inicial",
        motivoMinuta: "Alta",
        usuario: "Mariana Cisneros"
      },
      {
        id: "vh-ohr-2",
        propiedadClave: "OHR-1182",
        fecha: "2026-02-14",
        valor: 110000,
        moneda: "Pesos",
        posicion: "Ultimo",
        motivoCambio: "Paquete de cierre",
        motivoMinuta: "Cambio de precio",
        usuario: "Pedro Leyva"
      }
    ],
    baja: {
      fechaBaja: "2026-02-28",
      tipoCierre: "Cerrada",
      condicionCierre: "Renta anual firmada con mantenimiento incluido",
      personaRegistra: "Patricia Romo",
      comentarios: "Ejemplo claro del bug de Access resuelto con multirol.",
      comunicadoId: "com-baja-ohr-1182"
    }
  }
];
