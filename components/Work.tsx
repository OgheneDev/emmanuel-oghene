"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    index: "01",
    name: "OtoNav",
    tagline: "Logistics coordination platform",
    description:
      "Solves the last-mile communication gap between business owners, dispatch riders, and customers. Instead of customers calling endlessly to track a delivery, OtoNav gives every party real-time visibility riders share live location every minute, customers track passively, owners manage their entire dispatch operation from one dashboard.",
    stack: ["Next.js", "Node/Express", "PostgreSQL", "WebSockets"],
    tags: ["Multi-role SaaS", "Real-time", "Subscription plans"],
    highlights: [
      "RBAC across 3 roles Owner, Rider, Customer",
      "Live GPS tracking updated every 60s",
      "Plan-based rider seat limits with top-ups",
      "Org-level data isolation",
    ],
    link: "https://otonav.vercel.app",
    status: "Live",
  },
  {
    index: "02",
    name: "Tenon",
    tagline: "Feature entitlement API for SaaS",
    description:
      "Your payment platform handles the money. Tenon handles what each customer is allowed to do. Integrate once and get usage tracking, rate limiting, and feature gating out of the box — works with whatever payment provider you already use. Built for SaaS products that need plan-based access control without the complexity.",
    stack: ["Next.js", "Node/Express", "PostgreSQL"],
    tags: ["Developer tooling", "Billing infrastructure", "API"],
    highlights: [
      "Plan-based feature gating via API routes",
      "Usage tracking and rate limiting built-in",
      "Payment-platform agnostic — use any provider",
      "Customer and admin dashboards included",
    ],
    link: "https://tenon-org.vercel.app",
    status: "In progress",
  },
];

export default function Work() {
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
              }, i * 100);
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
      id="work"
      className="py-32 px-6 max-w-5xl mx-auto"
      ref={sectionRef}
    >
      {/* Section header */}
      <div className="flex items-center gap-6 mb-20 scroll-reveal opacity-0">
        <span className="font-mono text-xs text-dim tracking-widest uppercase">
          Selected work
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Projects */}
      <div className="space-y-0">
        {projects.map((project, idx) => (
          <div
            key={project.name}
            className="scroll-reveal opacity-0 group border-t border-border py-16 last:border-b"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">
              {/* Left col */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-xs text-dim">
                      {project.index}
                    </span>
                    <span
                      className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border ${
                        project.status === "Live"
                          ? "border-accent/40 text-accent"
                          : "border-border text-dim"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h2 className="font-display text-4xl text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.name}
                  </h2>
                  <p className="font-mono text-xs text-dim tracking-wide">
                    {project.tagline}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-dim tracking-wider uppercase border border-border px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right col */}
              <div className="flex flex-col justify-between gap-8">
                <p className="font-body text-subtle text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3">
                  {project.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-3">
                      <span className="text-accent mt-1 text-xs">—</span>
                      <span className="font-mono text-xs text-dim leading-relaxed">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div>
                  <a
                    href={project.link}
                    className="group/link inline-flex items-center gap-3 font-mono text-xs tracking-wider uppercase text-primary hover:text-accent transition-colors duration-200"
                  >
                    View project
                    <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
