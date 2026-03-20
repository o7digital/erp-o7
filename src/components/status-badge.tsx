import type { ReactNode } from "react";

type Tone = "neutral" | "success" | "warning" | "danger" | "info";

function formatBadgeLabel(value: string): string {
  return value
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function detectTone(value: string): Tone {
  const normalized = value.toLowerCase();

  if (
    normalized.includes("paid") ||
    normalized.includes("accepted") ||
    normalized.includes("active") ||
    normalized.includes("connected") ||
    normalized.includes("validated")
  ) {
    return "success";
  }

  if (
    normalized.includes("warning") ||
    normalized.includes("partial") ||
    normalized.includes("due") ||
    normalized.includes("sandbox") ||
    normalized.includes("review") ||
    normalized.includes("draft") ||
    normalized.includes("not configured")
  ) {
    return "warning";
  }

  if (
    normalized.includes("rejected") ||
    normalized.includes("blocked") ||
    normalized.includes("overdue") ||
    normalized.includes("error") ||
    normalized.includes("cancelled")
  ) {
    return "danger";
  }

  if (
    normalized.includes("submitted") ||
    normalized.includes("ready") ||
    normalized.includes("sent") ||
    normalized.includes("queued") ||
    normalized.includes("issued")
  ) {
    return "info";
  }

  return "neutral";
}

export function StatusBadge({
  value,
  tone
}: {
  value: ReactNode;
  tone?: Tone;
}) {
  const resolvedTone =
    tone ?? (typeof value === "string" ? detectTone(value) : "neutral");
  const label = typeof value === "string" ? formatBadgeLabel(value) : value;

  return <span className={`badge badge-${resolvedTone}`}>{label}</span>;
}
