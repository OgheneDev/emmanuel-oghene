"use client";

import { useEffect, useRef, useState } from "react"; // useState still used for hoveredIdx

const projects = [
  {
    index: "01",
    name: "OtoNav",
    tagline: "Logistics coordination platform",
    description:
      "Solves the last-mile communication gap between business owners, dispatch riders, and customers. Instead of customers calling endlessly to track a delivery, OtoNav gives every party real-time visibility — riders share live location every minute, customers track passively, owners manage their entire dispatch operation from one dashboard.",
    stack: ["Next.js", "Node/Express", "PostgreSQL", "WebSockets"],
    tags: ["Multi-role SaaS", "Real-time", "Subscription plans"],
    highlights: [
      "RBAC across 3 roles — Owner, Rider, Customer",
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
    status: "Live",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  /* scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(".scroll-reveal");
            els.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                el.classList.add("sr-visible");
              }, i * 110);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Reveal ── */
        .scroll-reveal {
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s cubic-bezier(.16,1,.3,1);
        }
        .sr-visible { transform: translateY(0) !important; }

        /* ── Section header line draw ── */
        @keyframes drawRight {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .header-line {
          transform-origin: left;
          transform: scaleX(0);
        }
        .sr-visible .header-line, .header-line.sr-visible {
          animation: drawRight 0.9s cubic-bezier(.16,1,.3,1) 0.3s forwards;
        }

        /* ── Project row border reveal ── */
        .project-border-top {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: var(--color-border, #2a2a2a);
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.7s cubic-bezier(.16,1,.3,1);
        }
        .sr-visible .project-border-top {
          transform: scaleX(1);
        }

        /* ── Hover glow behind row ── */
        .project-row {
          position: relative;
          transition: background 0.4s ease;
        }
        .project-row::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 30% 50%, rgba(255,255,255,0.03) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .project-row:hover::before { opacity: 1; }

        /* ── Index number morph ── */
        .index-num {
          font-variant-numeric: tabular-nums;
          transition: letter-spacing 0.3s ease, opacity 0.3s ease;
        }
        .project-row:hover .index-num {
          letter-spacing: 0.2em;
          opacity: 0.6;
        }

        /* ── Tag hover pop ── */
        .tag-pill {
          transition: border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }
        .tag-pill:hover {
          border-color: rgba(255,255,255,0.3);
          color: #fff;
          transform: translateY(-1px);
        }

        /* ── Stack tech stagger fade ── */
        .tech-item {
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.35s ease, transform 0.35s ease, color 0.25s ease;
        }
        .sr-visible .tech-item { opacity: 1; transform: translateX(0); }
        .tech-item:hover { color: #fff; }

        /* ── Highlight row slide ── */
        .highlight-row {
          transform: translateX(-8px);
          opacity: 0;
          transition: transform 0.45s ease, opacity 0.45s ease;
        }
        .sr-visible .highlight-row { transform: translateX(0); opacity: 1; }

        /* ── Dash morph on highlight hover ── */
        .hl-dash {
          display: inline-block;
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .highlight-row:hover .hl-dash {
          transform: scaleX(1.8) translateX(3px);
          color: #fff;
        }

        /* ── CTA arrow pulse ── */
        @keyframes arrowSlide {
          0%,100% { transform: translateX(0); }
          50%      { transform: translateX(6px); }
        }
        .cta-arrow { display: inline-block; }
        .group\\/link:hover .cta-arrow {
          animation: arrowSlide 0.6s ease-in-out infinite;
        }

        /* ── Status badge pulse (Live only) ── */
        @keyframes livePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(var(--accent-rgb, 100,200,150), 0.4); }
          50%      { box-shadow: 0 0 0 5px rgba(var(--accent-rgb, 100,200,150), 0); }
        }
        .badge-live { animation: livePulse 2.5s ease-in-out infinite; }

        /* ── Name glitch on hover ── */
        @keyframes glitchA {
          0%,100% { clip-path: inset(0 0 92% 0); transform: translate(-2px,0); }
          33%      { clip-path: inset(40% 0 40% 0); transform: translate(2px,0); }
          66%      { clip-path: inset(75% 0 10% 0); transform: translate(-1px,0); }
        }
        @keyframes glitchB {
          0%,100% { clip-path: inset(75% 0 5% 0); transform: translate(2px,0); }
          33%      { clip-path: inset(15% 0 65% 0); transform: translate(-2px,0); }
          66%      { clip-path: inset(45% 0 40% 0); transform: translate(1px,0); }
        }
        .name-glitch { position: relative; display: inline-block; }
        .name-glitch .ga, .name-glitch .gb {
          position: absolute; inset: 0; pointer-events: none;
        }
        .name-glitch .ga { color: #6ee7f7; mix-blend-mode: screen; }
        .name-glitch .gb { color: #f76ef7; mix-blend-mode: screen; }
        .project-row:hover .name-glitch .ga { animation: glitchA 0.35s steps(1) 1; }
        .project-row:hover .name-glitch .gb { animation: glitchB 0.35s steps(1) 1; }

        /* ── Progress bar for "In progress" ── */
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 65%; }
        }
        .progress-bar {
          height: 1px;
          background: currentColor;
          width: 0%;
          opacity: 0.3;
        }
        .sr-visible .progress-bar {
          animation: progressFill 1.2s cubic-bezier(.16,1,.3,1) 0.5s forwards;
        }

        /* ── Description text highlight on hover ── */
        .desc-text {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
          background-size: 200% 100%;
          background-position: 100% 0;
          transition: background-position 0.6s ease;
          border-radius: 2px;
          padding: 0 2px;
        }
        .project-row:hover .desc-text { background-position: 0% 0; }
      `}</style>

      <section
        id="work"
        className="py-32 px-6 max-w-5xl mx-auto"
        ref={sectionRef}
      >
        {/* ── Section header ── */}
        <div className="scroll-reveal opacity-0 flex items-center gap-6 mb-20">
          <span className="font-mono text-xs text-dim tracking-widest uppercase">
            Selected work
          </span>
          <div className="flex-1 h-px bg-border header-line" />
          <span className="font-mono text-[10px] text-dim tracking-widest tabular-nums">
            {projects.length.toString().padStart(2, "0")} projects
          </span>
        </div>

        {/* ── Projects ── */}
        <div>
          {projects.map((project, idx) => (
            <div
              key={project.name}
              className="scroll-reveal opacity-0 project-row py-16 last:border-b border-border"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Animated top border */}
              <div className="project-border-top" />

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">
                {/* ── Left col ── */}
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="index-num font-mono text-xs text-dim">
                        {project.index}
                      </span>
                      <span
                        className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border ${
                          project.status === "Live"
                            ? "badge-live border-accent/40 text-accent"
                            : "border-border text-dim"
                        }`}
                      >
                        {project.status}
                      </span>
                      {project.status === "In progress" && (
                        <div className="flex-1 max-w-[60px]">
                          <div className="progress-bar text-dim" />
                        </div>
                      )}
                    </div>

                    <h2 className="name-glitch font-display text-4xl text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {project.name}
                      <span className="ga" aria-hidden>
                        {project.name}
                      </span>
                      <span className="gb" aria-hidden>
                        {project.name}
                      </span>
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
                        className="tag-pill font-mono text-[10px] text-dim tracking-wider uppercase border border-border px-2 py-1 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {project.stack.map((tech, ti) => (
                      <span
                        key={tech}
                        className="tech-item font-mono text-[10px] text-subtle cursor-default"
                        style={{ transitionDelay: `${ti * 60 + 200}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Right col ── */}
                <div className="flex flex-col justify-between gap-8">
                  <p className="desc-text font-body text-subtle text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-3">
                    {project.highlights.map((h, hi) => (
                      <div
                        key={h}
                        className="highlight-row flex items-start gap-3 cursor-default"
                        style={{ transitionDelay: `${hi * 70 + 300}ms` }}
                      >
                        <span className="hl-dash text-accent mt-1 text-xs">
                          —
                        </span>
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
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-3 font-mono text-xs tracking-wider uppercase text-primary hover:text-accent transition-colors duration-200"
                    >
                      View project
                      <span className="cta-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer tally ── */}
        <div className="scroll-reveal opacity-0 mt-16 flex items-center justify-between">
          <span className="font-mono text-[10px] text-dim tracking-widest uppercase">
            End of selected work
          </span>
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-border transition-all duration-300"
                style={{
                  background: hoveredIdx === i ? "currentColor" : undefined,
                  opacity: hoveredIdx === i ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
