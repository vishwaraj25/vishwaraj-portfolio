"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getThemeName } from "@/lib/theme";

/**
 * Sets `data-theme` on <body> based on the current route so the scoped
 * CSS token blocks in globals.css take effect for the shared chrome and
 * page background. Case-study pages also set `.theme-*` on their own root
 * as an SSR-safe fallback for first paint.
 */
export function RouteTheme() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.dataset.theme = getThemeName(pathname);
  }, [pathname]);

  return null;
}
