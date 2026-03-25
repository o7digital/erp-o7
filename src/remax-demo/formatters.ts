import type { RemaxProperty } from "@/remax-demo/types";

export function formatCurrencyMXN(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatDateLong(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

export function formatDateShort(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

export function formatPercent(value: number | null): string {
  if (value === null) {
    return "No aplica";
  }

  return `${(value * 100).toFixed(value * 100 % 1 === 0 ? 0 : 1)}%`;
}

export function formatCompactPercent(value: number): string {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

export function getSingleSearchParam(
  value?: string | string[]
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function formatPropertyAddress(property: RemaxProperty): string {
  const noInt = property.address.noInt ? `, ${property.address.noInt}` : "";

  return `${property.address.calle} ${property.address.noExt}${noInt}, ${property.address.colonia}, ${property.address.municipio}, ${property.address.entidad}.`;
}
