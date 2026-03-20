"use client";

import { useEffect, useRef, useState } from "react";

const links = [
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
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const ctaRef = useRef<HTMLHeadingElement>(null);

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
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* magnetic heading effect */
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.8) {
        setMagnetPos({ x: dx * 12, y: dy * 8 });
      } else {
        setMagnetPos({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* copy email */
  const copyEmail = () => {
    navigator.clipboard.writeText("emmanueloghene72@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        /* ── Reveal ── */
        .scroll-reveal {
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s cubic-bezier(.16,1,.3,1);
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

        /* ── Heading letter split ── */
        .cta-word {
          display: inline-block;
          overflow: hidden;
        }
        .cta-inner {
          display: inline-block;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.4s ease;
        }
        .sr-in .cta-inner { transform: translateY(0); opacity: 1; }

        /* Magnetic heading transition */
        .cta-heading {
          transition: transform 0.25s cubic-bezier(.16,1,.3,1);
          display: inline-block;
          cursor: default;
        }

        /* ── Link row ── */
        .link-row {
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s ease;
        }

        /* Fill wipe on hover */
        .link-row::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.03);
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        .link-row:hover::before { transform: translateX(0); }

        /* Index number */
        .link-index {
          font-variant-numeric: tabular-nums;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .link-row:hover .link-index { opacity: 0.3; transform: translateX(0); }

        /* Arrow */
        .link-arrow {
          display: inline-block;
          transition: transform 0.25s ease, opacity 0.25s ease;
          opacity: 0.4;
        }
        .link-row:hover .link-arrow {
          transform: translate(3px, -3px);
          opacity: 1;
        }

        /* Value text */
        .link-value {
          position: relative;
        }
        .link-value::after {
          content: '';
          position: absolute; bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }
        .link-row:hover .link-value::after { width: 100%; }

        /* Dim non-hovered rows */
        .link-row.dimmed { opacity: 0.3; }
        .link-row { transition: opacity 0.25s ease, border-color 0.25s ease; }

        /* ── Copy toast ── */
        @keyframes toastIn {
          from { transform: translateY(6px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes toastOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        .toast {
          animation: toastIn 0.3s ease forwards;
        }
        .toast.hiding { animation: toastOut 0.3s ease forwards; }

        /* ── Footer copyright ── */
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .footer-text {
          opacity: 0;
        }
        .sr-in .footer-text {
          animation: fadeIn 0.8s ease 0.4s forwards;
        }

        /* ── Decorative corner marks ── */
        .corner-mark {
          position: absolute;
          width: 8px; height: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .corner-mark::before,
        .corner-mark::after {
          content: '';
          position: absolute;
          background: var(--color-border, #2a2a2a);
        }
        .corner-mark.tl { top: 0; left: 0; }
        .corner-mark.tr { top: 0; right: 0; }
        .corner-mark.bl { bottom: 0; left: 0; }
        .corner-mark.br { bottom: 0; right: 0; }
        .corner-mark.tl::before { top:0; left:0; width:100%; height:1px; }
        .corner-mark.tl::after  { top:0; left:0; width:1px; height:100%; }
        .corner-mark.tr::before { top:0; right:0; width:100%; height:1px; }
        .corner-mark.tr::after  { top:0; right:0; width:1px; height:100%; }
        .corner-mark.bl::before { bottom:0; left:0; width:100%; height:1px; }
        .corner-mark.bl::after  { bottom:0; left:0; width:1px; height:100%; }
        .corner-mark.br::before { bottom:0; right:0; width:100%; height:1px; }
        .corner-mark.br::after  { bottom:0; right:0; width:1px; height:100%; }
        .cta-block:hover .corner-mark { opacity: 1; }

        /* ── Blinking cursor after "something." ── */
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        .end-cursor { animation: blink 1.1s step-end infinite; }
      `}</style>

      <section
        id="contact"
        className="py-32 px-6 max-w-5xl mx-auto"
        ref={sectionRef}
      >
        {/* ── Section header ── */}
        <div className="scroll-reveal opacity-0 flex items-center gap-6 mb-20">
          <span className="font-mono text-xs text-dim tracking-widest uppercase">
            Contact
          </span>
          <div className="flex-1 h-px bg-border header-line" />
          <span className="font-mono text-[10px] text-dim tracking-widest">
            Remote · Worldwide
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* ── Left: CTA ── */}
          <div className="scroll-reveal opacity-0 cta-block relative p-1">
            {/* Corner marks */}
            <div className="corner-mark tl" />
            <div className="corner-mark tr" />
            <div className="corner-mark bl" />
            <div className="corner-mark br" />

            <h2
              ref={ctaRef}
              className="cta-heading font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-tight text-primary mb-6 select-none"
              style={{
                transform: `translate(${magnetPos.x}px, ${magnetPos.y}px)`,
              }}
            >
              <span className="cta-word">
                <span className="cta-inner" style={{ transitionDelay: "0ms" }}>
                  Let&apos;s
                </span>
              </span>{" "}
              <span className="cta-word">
                <span className="cta-inner" style={{ transitionDelay: "80ms" }}>
                  build
                </span>
              </span>
              <br />
              <span className="cta-word">
                <span
                  className="cta-inner"
                  style={{ transitionDelay: "160ms" }}
                >
                  something
                </span>
              </span>
              <span className="cta-inner" style={{ transitionDelay: "260ms" }}>
                .<span className="end-cursor">_</span>
              </span>
            </h2>

            <p className="font-body text-subtle text-sm leading-relaxed max-w-xs">
              I&apos;m open to remote contracts and full-time roles,
              particularly with agencies and startups building SaaS products. If
              you have a project that fits, reach out.
            </p>

            {/* Copy email shortcut */}
            <button
              onClick={copyEmail}
              className="mt-8 flex items-center gap-2 font-mono text-[10px] text-dim tracking-widest uppercase hover:text-primary transition-colors duration-200 group"
            >
              <span className="inline-block w-3 h-3 border border-current opacity-50 group-hover:opacity-100 transition-opacity" />
              {copied ? "Copied!" : "Copy email"}
            </button>
          </div>

          {/* ── Right: Links ── */}
          <div className="scroll-reveal opacity-0 space-y-0">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={`link-row group flex items-center justify-between border-b border-border py-5 ${
                  hoveredLink && hoveredLink !== link.label ? "dimmed" : ""
                }`}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <div className="flex items-center gap-3">
                  <span className="link-index font-mono text-[9px] text-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] text-dim tracking-wider uppercase">
                    {link.label}
                  </span>
                </div>
                <span className="font-mono text-xs text-subtle group-hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  <span className="link-value">{link.value}</span>
                  <span className="link-arrow">↗</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
