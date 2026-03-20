"use client";

import { useEffect, useRef, useState } from "react";

/* ─── tiny helpers ──────────────────────────────────────── */
function splitLetters(word: string, baseDelay: number) {
  return word.split("").map((ch, i) => (
    <span
      key={i}
      className="letter inline-block opacity-0"
      style={{ animationDelay: `${baseDelay + i * 40}ms` }}
    >
      {ch}
    </span>
  ));
}

/* ─── Particle field ────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 55;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,200,200,${d.alpha})`;
        ctx.fill();
      }
      // draw faint connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(180,180,180,${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ─── Main component ────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  /* staggered reveal */
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const els = containerRef.current?.querySelectorAll(".reveal");
    els?.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = "1";
        el.classList.add("revealed");
      }, i * 130);
    });
    const letters = containerRef.current?.querySelectorAll(".letter");
    letters?.forEach((el) => {
      el.classList.add("letter-revealed");
    });
  }, [ready]);

  /* cursor magnetic glow */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* ── global styles injected ── */}
      <style>{`
        /* Letter drop */
        .letter {
          transform: translateY(18px) rotate(3deg);
          transition: opacity 0.55s ease, transform 0.55s cubic-bezier(.16,1,.3,1);
        }
        .letter-revealed {
          opacity: 1 !important;
          transform: translateY(0) rotate(0deg);
        }

        /* Block reveal */
        .reveal {
          transform: translateY(22px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(.16,1,.3,1);
        }
        .revealed {
          transform: translateY(0) !important;
        }

        /* Grain overlay */
        @keyframes grain {
          0%,100% { transform: translate(0,0) }
          10%      { transform: translate(-2%,-3%) }
          30%      { transform: translate(2%,2%) }
          50%      { transform: translate(-1%,3%) }
          70%      { transform: translate(3%,-1%) }
          90%      { transform: translate(-2%,1%) }
        }
        .grain::after {
          content: '';
          position: fixed; inset: -50%;
          width: 200%; height: 200%;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          opacity: 0.035;
          animation: grain 0.8s steps(1) infinite;
          z-index: 50;
        }

        /* Scanlines */
        .scanlines::before {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          z-index: 49;
        }

        /* Cursor glow */
        .cursor-glow {
          position: fixed;
          width: 500px; height: 500px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          transition: left 0.12s ease, top 0.12s ease;
          z-index: 1;
        }

        /* Scroll dot pulse */
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.2; transform: scaleX(1); }
          50%       { opacity: 0.7; transform: scaleX(1.05); }
        }
        .scroll-line { animation: scrollPulse 2.4s ease-in-out infinite; }

        /* Label shimmer */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .label-shimmer {
          background: linear-gradient(90deg, currentColor 40%, rgba(255,255,255,0.7) 50%, currentColor 60%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        /* Horizontal rule draw */
        @keyframes drawLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .draw-line {
          transform-origin: left;
          transform: scaleX(0);
          transition: none;
        }
        .draw-line.revealed {
          animation: drawLine 0.9s cubic-bezier(.16,1,.3,1) forwards;
          transform: scaleX(0) !important; /* override reveal translateY */
        }

        /* Arrow bounce */
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(5px); }
        }
        .arrow-bounce { animation: arrowBounce 1.8s ease-in-out infinite; }

        /* Glitch on hover for name */
        @keyframes glitch1 {
          0%,100% { clip-path: inset(0 0 95% 0); transform: translate(-2px,0); }
          25%      { clip-path: inset(30% 0 50% 0); transform: translate(2px,0); }
          75%      { clip-path: inset(70% 0 10% 0); transform: translate(-1px,0); }
        }
        @keyframes glitch2 {
          0%,100% { clip-path: inset(80% 0 5% 0); transform: translate(2px,0); }
          33%      { clip-path: inset(10% 0 70% 0); transform: translate(-2px,0); }
          66%      { clip-path: inset(50% 0 30% 0); transform: translate(1px,0); }
        }
        .name-wrap { position: relative; display: inline-block; overflow: hidden; }
        .name-wrap:hover .glitch-a {
          animation: glitch1 0.4s steps(1) 1;
        }
        .name-wrap:hover .glitch-b {
          animation: glitch2 0.4s steps(1) 1;
        }
        .glitch-a, .glitch-b {
          position: absolute; inset: 0;
          color: inherit;
          pointer-events: none;
          clip-path: inset(0 0 100% 0);
          user-select: none;
          aria-hidden: true;
        }
        .glitch-a { color: #6ee7f7; mix-blend-mode: screen; }
        .glitch-b { color: #f76ef7; mix-blend-mode: screen; }
      `}</style>

      {/* ── Layers ── */}
      <div className="grain scanlines" />
      <Particles />
      <div ref={glowRef} className="cursor-glow" />

      {/* ── Hero section ── */}
      <section
        ref={containerRef}
        className="relative z-10 min-h-screen flex flex-col justify-end pb-24 px-6 pt-32 max-w-5xl mx-auto"
      >
        {/* Top label */}
        <div className="reveal opacity-0 mb-12">
          <span className="label-shimmer font-mono text-xs tracking-widest uppercase border border-border px-3 py-1.5 text-dim">
            Available for remote work
          </span>
        </div>

        {/* Main heading */}
        <div className="mb-10">
          <h1 className="name-wrap font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight text-primary select-none">
            {splitLetters("Emmanuel", 200)}
            <span className="glitch-a" aria-hidden>
              Emmanuel
            </span>
            <span className="glitch-b" aria-hidden>
              Emmanuel
            </span>
          </h1>

          <div className="flex flex-col md:flex-row items-end gap-6 mt-1">
            <h1 className="name-wrap font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight text-primary select-none">
              {splitLetters("Oghene", 550)}
              <span className="glitch-a" aria-hidden>
                Oghene
              </span>
              <span className="glitch-b" aria-hidden>
                Oghene
              </span>
            </h1>
            <span className="reveal opacity-0 font-mono text-xs text-dim mb-4 tracking-wider">
              Fullstack Developer
            </span>
          </div>
        </div>

        {/* Divider — draw animation */}
        <div className="reveal draw-line opacity-0 mb-10">
          <div className="h-px bg-border w-full" />
        </div>

        {/* Positioning + CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p className="reveal opacity-0 font-body text-subtle text-sm leading-relaxed max-w-md">
            I build SaaS products end-to-end — multi-role systems, subscription
            infrastructure, and real-time features. Next.js, Node/Express,
            Postgres, MongoDB.
          </p>

          <div className="flex items-center gap-6 reveal opacity-0">
            <a
              href="#work"
              className="group flex items-center gap-3 font-mono text-xs tracking-wider uppercase text-primary hover:text-accent transition-colors duration-200"
            >
              View work
              <span className="arrow-bounce inline-block">→</span>
            </a>
            <a
              href="#contact"
              className="font-mono text-xs tracking-wider uppercase text-dim hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 reveal opacity-0 flex flex-col items-center gap-2">
          <div className="scroll-line w-px h-12 bg-gradient-to-b from-border to-transparent origin-top" />
          <div
            className="w-1 h-1 rounded-full bg-border"
            style={{
              animation: "scrollPulse 2.4s ease-in-out 0.4s infinite",
            }}
          />
        </div>
      </section>
    </>
  );
}
