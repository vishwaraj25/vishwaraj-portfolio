"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getChromeTheme, isCaseStudyRoute } from "@/lib/theme";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const c = getChromeTheme(pathname);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Case studies supply their own header and navigation within the page.
  if (isCaseStudyRoute(pathname)) return null;

  // Map the shared chrome palette onto the local class names this file uses.
  const theme = {
    headerBg: isScrolled ? c.barScrolled : c.barTop,
    brandText: c.brand,
    tagText: c.tag,
    pulseDot: c.dot,
    navLink: c.navLink,
    activeLink: c.activeLink,
    divider: c.divider,
    badge: c.pill,
    dropdownBg: c.dropdown,
    dropdownItemHover: c.dropdownItemHover,
    drawerBg: c.drawer,
    socialPill: c.pill,
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${theme.headerBg}`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <Link
          href="/"
          className="group flex flex-col justify-center transition-transform hover:scale-[1.01]"
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`font-editorial text-xl tracking-tight font-bold transition-colors ${theme.brandText}`}
            >
              Vishwaraj Saxena
            </span>
            <span className={`inline-block w-2 h-2 rounded-full shadow-sm animate-pulse ${theme.pulseDot}`} />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {/* Case Studies Link / Quick Jump */}
          <div className="relative group">
            <Link
              href="/#work"
              className={`font-mono text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 py-2 ${
                pathname.startsWith("/case-studies") ? theme.activeLink : theme.navLink
              }`}
            >
              <span>Case Studies</span>
              <span className="text-[10px] opacity-70">▾</span>
            </Link>

            {/* Dropdown preview */}
            <div className="absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
              <div
                className={`w-80 p-3 rounded-2xl border shadow-2xl backdrop-blur-xl ${theme.dropdownBg}`}
              >
                <Link
                  href="/case-studies/expedition-33"
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors group/item ${theme.dropdownItemHover}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#991B1B] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold transition-colors flex items-center gap-1">
                      Clair Obscur: Expedition 33
                      <ArrowUpRight className="w-3 h-3 opacity-80" />
                    </div>
                    <div className="text-[11px] opacity-80 leading-snug mt-0.5">
                      Active turn-based combat engagement
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/#philosophy"
            className={`font-mono text-xs tracking-wider uppercase transition-colors py-2 ${theme.navLink}`}
          >
            Philosophy
          </Link>

          <Link
            href="/#about"
            className={`font-mono text-xs tracking-wider uppercase transition-colors py-2 ${theme.navLink}`}
          >
            About
          </Link>

          {/* Resume is hidden from the visible portfolio while it is reworked.
              The /resume route still builds and renders — only the entry
              points are removed, same as Swiggy and Duolingo. */}

          <div className={`h-4 w-[1px] ${theme.divider}`} />

          {/* Social links */}
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <a
              href="https://www.linkedin.com/in/vishwarajsaxena/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors flex items-center gap-1 px-2.5 py-1 rounded-lg border border-current/20 ${theme.socialPill}`}
            >
              LI <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>
            <a
              href="https://github.com/vishwaraj25"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors flex items-center gap-1 px-2.5 py-1 rounded-lg border border-current/20 ${theme.socialPill}`}
            >
              GH <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors focus:outline-none ${theme.socialPill}`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden px-6 py-6 space-y-4 shadow-2xl ${theme.drawerBg}`}
          >
            <div className="text-xs font-mono uppercase opacity-70 tracking-wider">
              Selected Breakdown
            </div>
            <div className="space-y-2">
              <Link
                href="/case-studies/expedition-33"
                onClick={closeMobileMenu}
                className="flex items-center justify-between p-3.5 rounded-xl border border-current/20"
              >
                <div className="flex items-center gap-3">
                  <Gamepad2 className="w-4 h-4 text-[#991B1B]" />
                  <div>
                    <div className="text-sm font-bold">Clair Obscur: Expedition 33</div>
                    <div className="text-xs opacity-75">Combat engagement under constraints</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>

            <div className="pt-3 border-t border-current/20 space-y-3 font-mono text-sm">
              <Link
                href="/#philosophy"
                onClick={closeMobileMenu}
                className="block opacity-90 hover:opacity-100 uppercase"
              >
                Philosophy
              </Link>
              <Link
                href="/#about"
                onClick={closeMobileMenu}
                className="block opacity-90 hover:opacity-100 uppercase"
              >
                About
              </Link>
              <div className="flex items-center gap-4 pt-2 text-xs">
                <a
                  href="https://www.linkedin.com/in/vishwarajsaxena/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href="https://github.com/vishwaraj25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
