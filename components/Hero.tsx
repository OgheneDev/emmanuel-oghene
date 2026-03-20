"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("animate-fade-up");
        (el as HTMLElement).style.opacity = "1";
      }, i * 120);
    });
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col justify-end pb-24 px-6 pt-32 max-w-5xl mx-auto"
      ref={containerRef}
    >
      {/* Top label */}
      <div className="reveal opacity-0 mb-12">
        <span className="font-mono text-xs text-dim tracking-widest uppercase border border-border px-3 py-1.5">
          Available for remote work
        </span>
      </div>

      {/* Main heading */}
      <div className="mb-10">
        <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight text-primary reveal opacity-0">
          Emmanuel
        </h1>
        <div className="flex items-end gap-6">
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight text-primary reveal opacity-0">
            Oghene
          </h1>
          <span className="font-mono text-xs text-dim mb-4 reveal opacity-0 tracking-wider">
            Fullstack Developer
          </span>
        </div>
      </div>

      {/* Divider line */}
      <div className="reveal opacity-0 mb-10">
        <div className="h-px bg-border w-full" />
      </div>

      {/* Positioning statement + CTA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <p className="font-body text-subtle text-sm leading-relaxed max-w-md reveal opacity-0">
          I build SaaS products end-to-end multi-role systems, subscription
          infrastructure, and real-time features. Next.js, Node/Express,
          Postgres, MongoDB.
        </p>

        <div className="flex items-center gap-6 reveal opacity-0">
          <a
            href="#work"
            className="group flex items-center gap-3 font-mono text-xs tracking-wider uppercase text-primary hover:text-accent transition-colors duration-200"
          >
            View work
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="font-mono text-xs tracking-wider uppercase text-dim hover:text-primary transition-colors duration-200"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 reveal opacity-0 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  );
}
