import type { RemaxAdvisor } from "@/remax-demo/types";

function getBadgeLabel(advisor: RemaxAdvisor) {
  if (advisor.tipoPersonal === "recepcion") {
    return "Recepcion";
  }

  if (advisor.tipoPersonal === "administrativo") {
    return "Staff administrativo";
  }

  if (advisor.tipoPersonal === "direccion") {
    return "Direccion / Clase A";
  }

  return `Clase ${advisor.clase}`;
}

function getBadgeClass(advisor: RemaxAdvisor) {
  if (advisor.tipoPersonal === "recepcion") {
    return "remax-advisor-badge remax-advisor-badge-recepcion";
  }

  if (advisor.tipoPersonal === "administrativo") {
    return "remax-advisor-badge remax-advisor-badge-staff";
  }

  if (advisor.clase === "A") {
    return "remax-advisor-badge remax-advisor-badge-a";
  }

  return "remax-advisor-badge remax-advisor-badge-m";
}

export function AdvisorBadge({
  advisor,
  showName = true
}: {
  advisor: RemaxAdvisor;
  showName?: boolean;
}) {
  return (
    <span className={getBadgeClass(advisor)}>
      {showName ? <strong>{advisor.nombre}</strong> : null}
      <small>{getBadgeLabel(advisor)}</small>
    </span>
  );
}
