"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getChromeTheme } from "@/lib/theme";

export function Footer() {
  const pathname = usePathname();
  const c = getChromeTheme(pathname);

  return (
    <footer className={`border-t ${c.footerRule} ${c.footerBg} py-16 px-6 sm:px-8`}>
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b ${c.footerRule}`}>
          {/* Brand & positioning column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-2xl font-bold">
                Vishwaraj Saxena
              </span>
              <span className={`text-xs font-mono ${c.footerFaint}`}>/ Product Portfolio</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-4 space-y-3">
            <div className={`text-xs font-mono uppercase tracking-widest font-semibold ${c.footerFaint}`}>
              Selected Breakdowns
            </div>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <Link
                  href="/case-studies/swiggy-instamart"
                  className="group block"
                >
                  <span className="font-medium group-hover:underline">Swiggy Instamart</span>
                  <span className={`block text-xs font-mono mt-0.5 ${c.footerFaint}`}>Logistics</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies/expedition-33"
                  className="group block"
                >
                  <span className="font-medium group-hover:underline">Clair Obscur: Expedition 33</span>
                  <span className={`block text-xs font-mono mt-0.5 ${c.footerFaint}`}>Combat Loop</span>
                </Link>
              </li>
              <li>
                <Link href="/case-studies/duolingo" className="group block">
                  <span className="font-medium group-hover:underline">Duolingo</span>
                  <span className={`block text-xs font-mono mt-0.5 ${c.footerFaint}`}>Language Learning</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3 space-y-3">
            <div className={`text-xs font-mono uppercase tracking-widest font-semibold ${c.footerFaint}`}>
              Connect
            </div>
            <ul className="space-y-2.5 text-sm font-mono">
              <li>
                <a
                  href="https://www.linkedin.com/in/vishwarajsaxena/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-all flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vishwaraj25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-all flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@vishwaraj.dev"
                  className="hover:underline transition-all flex items-center gap-1.5"
                >
                  <span>Email Direct</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Colophon bottom bar */}
        <div className={`pt-8 text-xs font-mono ${c.footerFaint}`}>
          © 2026 Vishwaraj Saxena
        </div>
      </div>
    </footer>
  );
}
