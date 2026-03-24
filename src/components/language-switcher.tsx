"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  DEMO_LOCALE_COOKIE_NAME,
  demoLocaleOptions,
  type DemoLocale
} from "@/lib/demo-locale";

export function LanguageSwitcher({ locale }: { locale: DemoLocale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function setLocale(nextLocale: DemoLocale) {
    if (nextLocale === locale) {
      return;
    }

    document.cookie = `${DEMO_LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="language-switcher" aria-label="Demo language switcher">
      {demoLocaleOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === locale ? "language-button active" : "language-button"}
          onClick={() => setLocale(option.value)}
          disabled={isPending}
        >
          {option.shortLabel}
        </button>
      ))}
    </div>
  );
}
