import { cookies } from "next/headers";
import { cache } from "react";

import {
  DEMO_LOCALE_COOKIE_NAME,
  defaultDemoLocale,
  getLocaleConfig,
  isDemoLocale,
  translateText,
  type DemoLocale
} from "@/lib/demo-locale";

export const getDemoLocale = cache(async (): Promise<DemoLocale> => {
  const cookieStore = await cookies();
  const locale = cookieStore.get(DEMO_LOCALE_COOKIE_NAME)?.value;

  return locale && isDemoLocale(locale) ? locale : defaultDemoLocale;
});

export async function getDemoI18n() {
  const locale = await getDemoLocale();
  const config = getLocaleConfig(locale);

  return {
    locale,
    languageTag: config.languageTag,
    txt: (value: string) => translateText(locale, value)
  };
}
