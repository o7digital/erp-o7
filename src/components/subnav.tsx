"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Subnav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="subnav">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={isActive(pathname, item.href) ? "subnav-link active" : "subnav-link"}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

