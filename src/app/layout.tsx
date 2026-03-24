import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getDemoLocale } from "@/lib/server-i18n";
import { getLocaleConfig } from "@/lib/demo-locale";

import "./globals.css";

export const metadata: Metadata = {
  title: "O7 ERP SaaS",
  description: "Application ERP SaaS interne"
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getDemoLocale();
  const config = getLocaleConfig(locale);

  return (
    <html lang={config.languageTag}>
      <body>{children}</body>
    </html>
  );
}
