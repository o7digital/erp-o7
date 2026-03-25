import {
  remaxDemoAdvisors,
  remaxDemoCommunications,
  remaxDemoProperties,
  remaxDemoValueHistory
} from "@/remax-demo/data";
import type {
  RemaxActivityItem,
  RemaxAdvisor,
  RemaxCommunication,
  RemaxCommunicationType,
  RemaxProperty,
  RemaxValueHistory
} from "@/remax-demo/types";

const advisorMap = new Map(remaxDemoAdvisors.map((advisor) => [advisor.id, advisor]));
const propertyMap = new Map(remaxDemoProperties.map((property) => [property.clave, property]));
const communicationMap = new Map(
  remaxDemoCommunications.map((communication) => [communication.id, communication])
);

function sortByDateDesc<T extends { fecha: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => right.fecha.localeCompare(left.fecha));
}

export function getAdvisorById(id: string): RemaxAdvisor | undefined {
  return advisorMap.get(id);
}

export function getAdvisorsByIds(ids: string[]): RemaxAdvisor[] {
  return ids
    .map((id) => advisorMap.get(id))
    .filter((advisor): advisor is RemaxAdvisor => Boolean(advisor));
}

export function getPropertyByClave(clave: string): RemaxProperty | undefined {
  return propertyMap.get(clave);
}

export function getCommunicationById(id: string): RemaxCommunication | undefined {
  return communicationMap.get(id);
}

export function getPropertyValueHistory(clave: string): RemaxValueHistory[] {
  return [...remaxDemoValueHistory]
    .filter((event) => event.propiedadClave === clave)
    .sort((left, right) => left.fecha.localeCompare(right.fecha));
}

export function getPropertyCommunications(clave: string): RemaxCommunication[] {
  return sortByDateDesc(
    remaxDemoCommunications.filter((communication) => communication.propiedadClave === clave)
  );
}

export function getPortfolioStats(referenceMonth = "2026-03") {
  const activeProperties = remaxDemoProperties.filter((property) => property.estatus === "Activa")
    .length;
  const closedProperties = remaxDemoProperties.filter((property) => property.estatus === "Cerrada")
    .length;
  const cancelledProperties = remaxDemoProperties.filter(
    (property) => property.estatus === "Cancelada"
  ).length;
  const priceChangesThisMonth = remaxDemoValueHistory.filter(
    (event) => event.valorAnterior !== null && event.fecha.startsWith(referenceMonth)
  ).length;
  const communicationsSent = remaxDemoCommunications.filter(
    (communication) => communication.estado === "enviado"
  ).length;
  const advisorsA = remaxDemoAdvisors.filter((advisor) => advisor.clase === "A").length;
  const advisorsM = remaxDemoAdvisors.filter((advisor) => advisor.clase === "M").length;
  const adminStaff = remaxDemoAdvisors.filter(
    (advisor) => advisor.tipoPersonal === "administrativo"
  ).length;
  const receptionStaff = remaxDemoAdvisors.filter(
    (advisor) => advisor.tipoPersonal === "recepcion"
  ).length;

  return {
    activeProperties,
    closedProperties,
    cancelledProperties,
    priceChangesThisMonth,
    communicationsSent,
    advisorsA,
    advisorsM,
    adminStaff,
    receptionStaff
  };
}

export function getLatestPropertyEvents(
  kind: "alta" | "cierre" | "cancelacion",
  limit = 4
): Array<{ fecha: string; property: RemaxProperty }> {
  const items = remaxDemoProperties
    .map((property) => {
      if (kind === "alta") {
        return { fecha: property.fechaAlta, property };
      }

      if (kind === "cierre" && property.fechaCierre) {
        return { fecha: property.fechaCierre, property };
      }

      if (kind === "cancelacion" && property.fechaCancelacion) {
        return { fecha: property.fechaCancelacion, property };
      }

      return null;
    })
    .filter((item): item is { fecha: string; property: RemaxProperty } => Boolean(item));

  return items.sort((left, right) => right.fecha.localeCompare(left.fecha)).slice(0, limit);
}

export function getRecentPriceChanges(limit = 6, referenceMonth = "2026-03") {
  return sortByDateDesc(
    remaxDemoValueHistory.filter(
      (event) => event.valorAnterior !== null && event.fecha.startsWith(referenceMonth)
    )
  ).slice(0, limit);
}

export function getRecentActivity(limit = 8): RemaxActivityItem[] {
  const propertyEvents: RemaxActivityItem[] = remaxDemoProperties.flatMap((property) => {
    const items: RemaxActivityItem[] = [
      {
        id: `alta-${property.clave}`,
        fecha: property.fechaAlta,
        titulo: "Alta registrada",
        detalle: `${property.clave} · ${property.domicilio}`,
        tone: "info"
      }
    ];

    if (property.fechaCierre) {
      items.push({
        id: `cierre-${property.clave}`,
        fecha: property.fechaCierre,
        titulo: "Cierre de propiedad",
        detalle: `${property.clave} · ${property.propietario}`,
        tone: "success"
      });
    }

    if (property.fechaCancelacion) {
      items.push({
        id: `cancelacion-${property.clave}`,
        fecha: property.fechaCancelacion,
        titulo: "Cancelacion registrada",
        detalle: `${property.clave} · ${property.propietario}`,
        tone: "danger"
      });
    }

    return items;
  });

  const communicationEvents: RemaxActivityItem[] = remaxDemoCommunications.map((communication) => ({
    id: `communication-${communication.id}`,
    fecha: communication.fecha,
    titulo: `Comunicado ${communication.tipo}`,
    detalle: `${communication.propiedadClave} · ${communication.estado}`,
    tone:
      communication.tipo === "BAJA"
        ? "success"
        : communication.tipo === "CANCELACION"
          ? "danger"
          : "info"
  }));

  const priceEvents: RemaxActivityItem[] = remaxDemoValueHistory
    .filter((event) => event.valorAnterior !== null)
    .map((event) => ({
      id: `price-${event.id}`,
      fecha: event.fecha,
      titulo: "Ajuste de valor",
      detalle: `${event.propiedadClave} · ${event.motivo}`,
      tone: "warning"
    }));

  return [...propertyEvents, ...communicationEvents, ...priceEvents]
    .sort((left, right) => right.fecha.localeCompare(left.fecha))
    .slice(0, limit);
}

export function getAdvisorAssignments(advisorId: string): RemaxProperty[] {
  return remaxDemoProperties.filter((property) =>
    [
      ...property.asesoresAlta,
      ...property.asesoresBaja,
      ...property.asesoresCancelacion
    ].includes(advisorId)
  );
}

export function getAdvisorParticipation(advisorId: string) {
  const portfolio = getAdvisorAssignments(advisorId);

  return {
    total: portfolio.length,
    altas: portfolio.filter((property) => property.asesoresAlta.includes(advisorId)).length,
    bajas: portfolio.filter((property) => property.asesoresBaja.includes(advisorId)).length,
    cancelaciones: portfolio.filter((property) =>
      property.asesoresCancelacion.includes(advisorId)
    ).length,
    activasVinculadas: portfolio.filter((property) => property.estatus === "Activa").length
  };
}

export function getPropertyRoleMatrix(property: RemaxProperty) {
  const roleMap = new Map<string, Set<string>>();

  for (const advisorId of property.asesoresAlta) {
    const roles = roleMap.get(advisorId) ?? new Set<string>();
    roles.add("Alta");
    roleMap.set(advisorId, roles);
  }

  for (const advisorId of property.asesoresBaja) {
    const roles = roleMap.get(advisorId) ?? new Set<string>();
    roles.add("Baja / cierre");
    roleMap.set(advisorId, roles);
  }

  for (const advisorId of property.asesoresCancelacion) {
    const roles = roleMap.get(advisorId) ?? new Set<string>();
    roles.add("Cancelacion");
    roleMap.set(advisorId, roles);
  }

  return [...roleMap.entries()]
    .map(([advisorId, roles]) => ({
      advisor: advisorMap.get(advisorId),
      roles: [...roles]
    }))
    .filter(
      (item): item is { advisor: RemaxAdvisor; roles: string[] } => Boolean(item.advisor)
    )
    .sort((left, right) => left.advisor.nombre.localeCompare(right.advisor.nombre));
}

export function getPropertiesWithMultipleRoles() {
  return remaxDemoProperties.filter((property) =>
    getPropertyRoleMatrix(property).some((item) => item.roles.length > 1)
  );
}

export function getPriceChangeSummary() {
  const adjustments = remaxDemoValueHistory.filter((event) => event.valorAnterior !== null);
  const totalDelta = adjustments.reduce((total, event) => {
    if (event.valorAnterior === null) {
      return total;
    }

    return total + (event.valorNuevo - event.valorAnterior);
  }, 0);

  return {
    totalRecords: remaxDemoValueHistory.length,
    adjustedProperties: new Set(adjustments.map((event) => event.propiedadClave)).size,
    averageDelta: adjustments.length === 0 ? 0 : totalDelta / adjustments.length
  };
}

export function getCommunicationsByType(type: RemaxCommunicationType) {
  return sortByDateDesc(remaxDemoCommunications.filter((item) => item.tipo === type));
}
