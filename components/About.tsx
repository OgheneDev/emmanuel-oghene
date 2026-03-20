"use client";

import { useEffect, useRef } from "react";

const capabilities = [
  {
    title: "Multi-role SaaS architecture",
    desc: "Org-level isolation, RBAC systems, plan-based feature access across complex user hierarchies.",
  },
  {
    title: "Subscription infrastructure",
    desc: "Billing flows, usage limits, seat management, and entitlement logic built on top of Stripe.",
  },
  {
    title: "Real-time features",
    desc: "Live tracking, event-driven updates, WebSocket architecture for time-sensitive data.",
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Stripe",
  "REST APIs",
  "WebSockets",
  "Vercel",
  "Git",
];

export default function About() {
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
              }, i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-32 px-6 max-w-5xl mx-auto"
      ref={sectionRef}
    >
      {/* Section header */}
      <div className="flex items-center gap-6 mb-20 scroll-reveal opacity-0">
        <span className="font-mono text-xs text-dim tracking-widest uppercase">
          About
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left: Bio */}
        <div className="space-y-6 scroll-reveal opacity-0">
          <p className="font-body text-subtle text-sm leading-relaxed">
            I&apos;m a fullstack developer with 5+ years building web products,
            mostly in the freelance world. That means I&apos;ve had to own
            entire products architecture decisions, database design, API
            structure, and frontend without a team to fall back on.
          </p>
          <p className="font-body text-subtle text-sm leading-relaxed">
            Over time I&apos;ve gravitated toward SaaS products specifically the
            kind with multiple user roles, subscription tiers, and
            infrastructure that needs to be solid from day one. OtoNav and Tenon
            came out of that focus.
          </p>
          <p className="font-body text-subtle text-sm leading-relaxed">
            I work remotely, communicate clearly, and ship things that work.
          </p>
        </div>

        {/* Right: Capabilities + Stack */}
        <div className="space-y-12">
          {/* Capabilities */}
          <div className="space-y-6">
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="scroll-reveal opacity-0 border-l border-border pl-5"
              >
                <p className="font-mono text-xs text-primary tracking-wide mb-2">
                  {cap.title}
                </p>
                <p className="font-body text-xs text-dim leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div className="scroll-reveal opacity-0">
            <p className="font-mono text-[10px] text-dim tracking-widest uppercase mb-4">
              Tools & stack
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[10px] text-dim border border-border px-2 py-1 hover:border-accent/40 hover:text-subtle transition-colors duration-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
