"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";

interface CollapsibleEvidenceProps {
  title: string;
  badge?: string;
  source?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  accentColor?: "orange" | "crimson" | "stone";
}

export function CollapsibleEvidence({
  title,
  badge = "Evidence & Methodology",
  source,
  defaultOpen = false,
  children,
  accentColor = "stone",
}: CollapsibleEvidenceProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const borderAccent = {
    orange: "hover:border-[#FC8019]/50 focus-visible:ring-[#FC8019]/40",
    crimson: "hover:border-[#991B1B]/50 focus-visible:ring-[#991B1B]/40",
    stone: "hover:border-stone-400 focus-visible:ring-stone-400",
  }[accentColor];

  return (
    <div className="my-6 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-5 py-4 flex items-center justify-between text-left transition-colors ${borderAccent} focus:outline-none`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <FileText className="w-4 h-4 text-stone-500 shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
                {badge}
              </span>
              {source && (
                <span className="text-xs text-stone-400 dark:text-stone-500">
                  • {source}
                </span>
              )}
            </div>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              {title}
            </h4>
          </div>
        </div>
        <div className="p-1 rounded bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-stone-200/70 dark:border-stone-800/70 text-sm leading-relaxed text-stone-700 dark:text-stone-300 font-sans">
          {children}
        </div>
      )}
    </div>
  );
}
