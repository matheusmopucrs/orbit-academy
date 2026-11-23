import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -999, y: -999 };
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0006, vy: (Math.random() - 0.5) * 0.0006,
    }));
    const css = getComputedStyle(document.documentElement);
    const color = css.getPropertyValue("--primary").trim();
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    const move = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    resize();
    addEventListener("resize", resize);
    addEventListener("mousemove", move);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1;
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]!; const ax = a.x * w, ay = a.y * h;
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]!; const d = Math.hypot(ax - b.x * w, ay - b.y * h);
          if (d < 140) {
            ctx.strokeStyle = `color-mix(in oklab, ${color} ${Math.round((1 - d / 140) * 40)}%, transparent)`;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(b.x * w, b.y * h); ctx.stroke();
          }
        }
        const md = Math.hypot(ax - mouse.x, ay - mouse.y);
        ctx.fillStyle = color;
        ctx.globalAlpha = md < 160 ? 1 : 0.5;
        ctx.beginPath(); ctx.arc(ax, ay, md < 160 ? 2.6 : 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("mousemove", move); };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="blob left-[-10%] top-[-10%] h-[50vw] w-[50vw] bg-primary" />
      <div className="blob right-[-15%] top-[20%] h-[45vw] w-[45vw] bg-secondary" style={{ animationDelay: "-6s" }} />
      <div className="blob bottom-[-20%] left-[30%] h-[40vw] w-[40vw] bg-accent" style={{ animationDelay: "-12s" }} />
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}
