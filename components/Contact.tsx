"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".scroll-reveal");
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("animate-fade-up");
                (el as HTMLElement).style.opacity = "1";
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="py-32 px-6 max-w-5xl mx-auto"
      ref={sectionRef}
    >
      {/* Section header */}
      <div className="flex items-center gap-6 mb-20 scroll-reveal opacity-0">
        <span className="font-mono text-xs text-dim tracking-widest uppercase">
          Contact
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
        {/* Left: CTA text */}
        <div className="scroll-reveal opacity-0">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-tight text-primary mb-6">
            Let&apos;s build
            <br />
            something.
          </h2>
          <p className="font-body text-subtle text-sm leading-relaxed max-w-xs">
            I&apos;m open to remote contracts and full-time roles, particularly
            with agencies and startups building SaaS products. If you have a
            project that fits, reach out.
          </p>
        </div>

        {/* Right: Links */}
        <div className="space-y-4 scroll-reveal opacity-0">
          {[
            {
              label: "Email",
              value: "emmanueloghene72@gmail.com",
              href: "mailto:emmanueloghene72@gmail.com",
            },
            {
              label: "LinkedIn",
              value: "linkedin.com/in/emmanuel-oghene",
              href: "https://www.linkedin.com/in/emmanuel-oghene-0242182ab",
            },
            {
              label: "GitHub",
              value: "github.com/OgheneDev",
              href: "https://github.com/OgheneDev",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center justify-between border-b border-border pb-4 hover:border-accent/40 transition-colors duration-200"
            >
              <span className="font-mono text-[10px] text-dim tracking-wider uppercase">
                {link.label}
              </span>
              <span className="font-mono text-xs text-subtle group-hover:text-primary transition-colors duration-200 flex items-center gap-2">
                {link.value}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
