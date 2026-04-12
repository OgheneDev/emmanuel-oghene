"use client";

import { useEffect, useRef, useState } from "react";

const capabilities = [
  {
    title: "Multi-role web architecture",
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
  const [hoveredStack, setHoveredStack] = useState<string | null>(null);
  const [hoveredCap, setHoveredCap] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const typingStarted = useRef(false);

  const tagline =
    "I work remotely, communicate clearly, and ship things that work.";

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
                el.classList.add("sr-in");
              }, i * 90);
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

  /* typewriter for last bio line */
  useEffect(() => {
    const triggerEl = sectionRef.current;
    if (!triggerEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !typingStarted.current) {
          typingStarted.current = true;
          let i = 0;
          const interval = setInterval(() => {
            setTypedText(tagline.slice(0, i + 1));
            i++;
            if (i >= tagline.length) {
              clearInterval(interval);
              setTypingDone(true);
            }
          }, 38);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(triggerEl);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Reveal ── */
        .scroll-reveal {
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(.16,1,.3,1);
        }
        .sr-in { transform: translateY(0) !important; }

        /* ── Header line draw ── */
        @keyframes drawRight {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .header-line {
          transform-origin: left;
          transform: scaleX(0);
        }
        .sr-in .header-line, .header-line.sr-in {
          animation: drawRight 0.9s cubic-bezier(.16,1,.3,1) 0.2s forwards;
        }

        /* ── Bio paragraph word-by-word fade ── */
        .bio-word {
          display: inline;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .sr-in .bio-word { opacity: 1; }

        /* ── Capability card ── */
        .cap-card {
          position: relative;
          border-left: 1px solid var(--color-border, #2a2a2a);
          padding-left: 1.25rem;
          transition: border-color 0.3s ease;
          overflow: hidden;
        }
        .cap-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 1px;
          background: #fff;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.4s cubic-bezier(.16,1,.3,1);
        }
        .cap-card:hover::before { transform: scaleY(1); }

        /* Shimmer sweep on cap hover */
        .cap-card::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%);
          background-size: 200% 100%;
          background-position: 200% 0;
          transition: background-position 0.5s ease;
          pointer-events: none;
        }
        .cap-card:hover::after { background-position: -200% 0; }

        /* Cap index number */
        .cap-index {
          font-variant-numeric: tabular-nums;
          transition: opacity 0.3s ease, transform 0.3s ease;
          opacity: 0;
          transform: translateX(-4px);
        }
        .cap-card:hover .cap-index {
          opacity: 0.3;
          transform: translateX(0);
        }

        /* Cap title underline */
        .cap-title {
          position: relative;
          display: inline-block;
        }
        .cap-title::after {
          content: '';
          position: absolute; bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: currentColor;
          transition: width 0.35s ease;
        }
        .cap-card:hover .cap-title::after { width: 100%; }

        /* ── Stack pill ── */
        .stack-pill {
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
          cursor: default;
        }
        .stack-pill::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.04);
          transform: translateY(100%);
          transition: transform 0.25s ease;
        }
        .stack-pill:hover::before { transform: translateY(0); }
        .stack-pill:hover {
          border-color: rgba(255,255,255,0.25);
          color: #fff;
          transform: translateY(-2px);
        }
        .stack-pill.dimmed { opacity: 0.2; }

        /* Stagger stack items in */
        .stack-pill {
          opacity: 0;
          transform: translateY(8px) scale(0.95);
          transition:
            opacity 0.4s ease,
            transform 0.4s ease,
            border-color 0.25s ease,
            color 0.25s ease;
        }
        .sr-in .stack-pill { opacity: 1; transform: translateY(0) scale(1); }
        .sr-in .stack-pill:hover { transform: translateY(-2px) scale(1); }
        .stack-pill.dimmed { opacity: 0.15 !important; transform: scale(0.97) !important; }

        /* ── Cursor blink ── */
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        .cursor-blink { animation: blink 0.9s step-end infinite; }

        /* ── Years badge ── */
        @keyframes badgePop {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .years-badge {
          opacity: 0;
        }
        .sr-in .years-badge {
          animation: badgePop 0.5s cubic-bezier(.16,1,.3,1) 0.5s forwards;
        }

        /* ── Availability dot ── */
        @keyframes availPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(100,220,150,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(100,220,150,0); }
        }
        .avail-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgb(100,220,150);
          animation: availPulse 2.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        /* ── Section footer line ── */
        .footer-rule {
          transform-origin: left;
          transform: scaleX(0);
          transition: none;
        }
        .sr-in.footer-rule, .sr-in .footer-rule {
          animation: drawRight 1s cubic-bezier(.16,1,.3,1) 0.1s forwards;
        }
      `}</style>

      <section
        id="about"
        className="py-32 px-6 max-w-5xl mx-auto"
        ref={sectionRef}
      >
        {/* ── Section header ── */}
        <div className="scroll-reveal opacity-0 flex items-center gap-6 mb-20">
          <span className="font-mono text-xs text-dim tracking-widest uppercase">
            About
          </span>
          <div className="flex-1 h-px bg-border header-line" />
          {/* Availability indicator */}
          <div className="flex items-center gap-2">
            <div className="avail-dot" />
            <span className="font-mono text-[10px] text-dim tracking-wider">
              Open to work
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* ── Left: Bio ── */}
          <div className="space-y-8">
            {/* Years badge */}
            <div className="scroll-reveal opacity-0 flex items-center gap-4">
              <div className="years-badge inline-flex items-baseline gap-1 border border-border px-3 py-2">
                <span className="font-mono text-2xl text-primary leading-none">
                  5
                </span>
                <span className="font-mono text-[10px] text-dim tracking-widest uppercase">
                  + years
                </span>
              </div>
              <span className="font-mono text-[10px] text-dim tracking-wider">
                building web products
              </span>
            </div>

            <div className="scroll-reveal opacity-0 space-y-5">
              <p className="font-body text-subtle text-sm leading-relaxed">
                I&apos;m a fullstack developer with 5+ years building web
                products, mostly in the freelance world. That means I&apos;ve
                had to own entire products architecture decisions, database
                design, API structure, and frontend without a team to fall back
                on.
              </p>
              <p className="font-body text-subtle text-sm leading-relaxed">
                Over time I&apos;ve gravitated toward complex web products
                specifically the kind with multiple user roles, subscription
                tiers, and infrastructure that needs to be solid from day one.
              </p>

              {/* Typewriter line */}
              <p className="font-mono text-xs text-primary tracking-wide min-h-[1.5em]">
                {typedText}
                {!typingDone && <span className="cursor-blink ml-px">|</span>}
              </p>
            </div>
          </div>

          {/* ── Right: Capabilities + Stack ── */}
          <div className="space-y-12">
            {/* Capabilities */}
            <div className="space-y-5">
              {capabilities.map((cap, i) => (
                <div
                  key={cap.title}
                  className="scroll-reveal opacity-0 cap-card py-3 cursor-default"
                  onMouseEnter={() => setHoveredCap(i)}
                  onMouseLeave={() => setHoveredCap(null)}
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="cap-index font-mono text-[9px] text-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="cap-title font-mono text-xs text-primary tracking-wide">
                      {cap.title}
                    </p>
                  </div>
                  <p
                    className="font-body text-xs leading-relaxed transition-colors duration-300"
                    style={{
                      color:
                        hoveredCap === i
                          ? "var(--color-subtle, #888)"
                          : "var(--color-dim, #555)",
                    }}
                  >
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stack */}
            <div className="scroll-reveal opacity-0">
              <p className="font-mono text-[10px] text-dim tracking-widest uppercase mb-5">
                Tools &amp; stack
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.map((item, si) => (
                  <span
                    key={item}
                    className={`stack-pill font-mono text-[10px] border border-border px-2 py-1 ${
                      hoveredStack && hoveredStack !== item
                        ? "dimmed"
                        : "text-dim"
                    }`}
                    style={{ transitionDelay: `${si * 35}ms` }}
                    onMouseEnter={() => setHoveredStack(item)}
                    onMouseLeave={() => setHoveredStack(null)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer rule ── */}
        <div className="scroll-reveal opacity-0 mt-20 flex items-center gap-6">
          <div className="flex-1 h-px bg-border footer-rule" />
          <span className="font-mono text-[10px] text-dim tracking-widest uppercase">
            Based in Nigeria · Remote
          </span>
        </div>
      </section>
    </>
  );
}
