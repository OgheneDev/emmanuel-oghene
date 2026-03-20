"use client";

import { useEffect, useState, useRef } from "react";

const navItems = ["Work", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* mount animation */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* scroll state */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* active section tracker */
  useEffect(() => {
    const ids = navItems.map((i) => i.toLowerCase());
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* move sliding indicator */
  useEffect(() => {
    const target = hoveredItem ?? activeSection;
    const el = target ? navLinksRef.current[target] : null;
    const indicator = indicatorRef.current;
    if (!indicator || !el) {
      if (indicator) indicator.style.opacity = "0";
      return;
    }
    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement!.getBoundingClientRect();
    indicator.style.opacity = "1";
    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
  }, [hoveredItem, activeSection]);

  return (
    <>
      <style>{`
        /* ── Navbar entrance ── */
        @keyframes navDrop {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        .nav-enter {
          animation: navDrop 0.6s cubic-bezier(.16,1,.3,1) forwards;
        }

        /* ── Logo glitch on hover ── */
        @keyframes logoGlitch {
          0%,100% { clip-path: inset(0 0 90% 0); transform: translate(-2px,0); }
          33%      { clip-path: inset(30% 0 40% 0); transform: translate(2px,0); }
          66%      { clip-path: inset(70% 0 10% 0); transform: translate(-1px,0); }
        }
        .logo-wrap { position: relative; display: inline-block; cursor: default; }
        .logo-wrap .lg { position: absolute; inset: 0; pointer-events: none; mix-blend-mode: screen; }
        .logo-wrap .lg-a { color: #6ee7f7; }
        .logo-wrap .lg-b { color: #f76ef7; }
        .logo-wrap:hover .lg-a { animation: logoGlitch 0.35s steps(1) 1; }
        .logo-wrap:hover .lg-b { animation: logoGlitch 0.35s steps(1) 1 0.05s; }

        /* ── Nav link ── */
        .nav-link {
          position: relative;
          transition: color 0.2s ease;
          letter-spacing: 0.1em;
        }

        /* Active dot */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px; left: 50%;
          transform: translateX(-50%) scale(0);
          width: 3px; height: 3px;
          border-radius: 50%;
          background: currentColor;
          transition: transform 0.25s ease, opacity 0.25s ease;
          opacity: 0;
        }
        .nav-link.is-active::after {
          transform: translateX(-50%) scale(1);
          opacity: 0.6;
        }

        /* ── Sliding pill indicator ── */
        .nav-indicator {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px;
          background: rgba(255,255,255,0.25);
          transition: transform 0.3s cubic-bezier(.16,1,.3,1), width 0.3s cubic-bezier(.16,1,.3,1), opacity 0.2s ease;
          pointer-events: none;
          opacity: 0;
        }

        /* ── Border draw on scroll ── */
        .nav-border {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          transform-origin: left;
          background: var(--color-border, #2a2a2a);
          transform: scaleX(0);
          transition: transform 0.5s cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        .nav-scrolled .nav-border { transform: scaleX(1); }

        /* ── Status dot ── */
        @keyframes statusPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(100,220,150,0.5); }
          50%      { box-shadow: 0 0 0 4px rgba(100,220,150,0); }
        }
        .status-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgb(100,220,150);
          animation: statusPulse 2.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        /* ── Item stagger entrance ── */
        .nav-item-wrap {
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .nav-mounted .nav-item-wrap { opacity: 1; transform: translateY(0); }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-bg/90 backdrop-blur-md nav-scrolled" : "bg-transparent"
        } ${mounted ? "nav-enter nav-mounted" : "opacity-0"}`}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between relative">
          {/* ── Logo ── */}
          <div className="nav-item-wrap" style={{ transitionDelay: "0ms" }}>
            <span className="logo-wrap font-mono text-xs text-dim tracking-widest uppercase">
              EO
              <span className="lg lg-a" aria-hidden>
                EO
              </span>
              <span className="lg lg-b" aria-hidden>
                EO
              </span>
            </span>
          </div>

          {/* ── Nav links ── */}
          <div className="relative flex items-center gap-8">
            {/* Sliding underline indicator */}
            <div ref={indicatorRef} className="nav-indicator" />

            {navItems.map((item, i) => (
              <div
                key={item}
                className="nav-item-wrap"
                style={{ transitionDelay: `${(i + 1) * 60}ms` }}
              >
                <a
                  ref={(el) => {
                    navLinksRef.current[item.toLowerCase()] = el;
                  }}
                  href={`#${item.toLowerCase()}`}
                  className={`nav-link font-mono text-xs tracking-wider uppercase transition-colors duration-200 ${
                    activeSection === item.toLowerCase()
                      ? "is-active text-primary"
                      : "text-dim hover:text-primary"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.toLowerCase())}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item}
                </a>
              </div>
            ))}
          </div>

          {/* ── Scrolled border draw ── */}
          <div className="nav-border" />
        </div>
      </nav>
    </>
  );
}
