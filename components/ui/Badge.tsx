import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "solid" | "glass" | "white" | "dark" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "glass",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    glass:
      "bg-white/15 text-white border-white/30 backdrop-blur-sm shadow-sm",
    solid:
      "bg-[var(--page-accent)] text-[var(--page-accent-fg)] border-transparent font-bold shadow-md",
    white:
      "bg-white text-stone-900 border-white font-semibold",
    dark:
      "bg-black/25 text-white border-white/20 backdrop-blur-sm",
    outline:
      "bg-transparent text-white border-white/40",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border transition-all ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
