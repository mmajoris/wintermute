"use client";

import { useState, useEffect } from "react";

export interface NavSection {
  id: string;
  label: string;
}

export default function AboutNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.set(section.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(section.id);
          }

          let best = "";
          let bestRatio = 0;
          for (const [id, ratio] of visibleSections) {
            if (ratio > bestRatio) {
              best = id;
              bestRatio = ratio;
            }
          }
          if (best) setActive(best);
        },
        { threshold: [0, 0.25, 0.5, 0.75], rootMargin: "-80px 0px -40% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-48 flex-col justify-center pl-6 z-50 gap-1">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className="text-left text-[11px] tracking-wide py-1.5 transition-all duration-300"
          style={{
            color:
              active === s.id
                ? "rgba(0, 200, 220, 0.9)"
                : "rgba(163, 163, 163, 0.35)",
            borderLeft:
              active === s.id
                ? "2px solid rgba(0, 200, 220, 0.6)"
                : "2px solid transparent",
            paddingLeft: 12,
          }}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}
