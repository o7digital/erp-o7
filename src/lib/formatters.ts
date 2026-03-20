export function formatCurrency(
  amount: number,
  currency: string,
  locale = currency === "MXN" ? "es-MX" : "fr-FR"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatDate(date: string, locale = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

