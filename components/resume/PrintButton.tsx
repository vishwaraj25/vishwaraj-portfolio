"use client";

import React from "react";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
      className="px-4 py-1.5 rounded-full bg-[var(--page-accent)] text-[var(--page-accent-fg)] font-bold text-xs uppercase tracking-wider font-mono hover:bg-[var(--page-accent-hover)] shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
    >
      <Printer className="w-3.5 h-3.5" />
      <span>Print / Save PDF</span>
    </button>
  );
}
