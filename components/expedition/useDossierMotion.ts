"use client";

import { useEffect, useRef } from "react";

/** Progressive enhancement: nothing is hidden before JavaScript runs. */
export function useDossierMotion() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
        const animation = entry.target.animate(
          [
            { opacity: 0.55, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 550, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.2 });

    root.querySelectorAll("header h1, header h1 + p, main > section > h2").forEach(
      (element) => observer.observe(element),
    );

    const stopMotion = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stopMotion);
    };
  }, []);

  return ref;
}
