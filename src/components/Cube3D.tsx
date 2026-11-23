import { useState } from "react";

const faces = [
  { label: "ENEM", t: "translateZ(90px)" },
  { label: "CS", t: "rotateY(90deg) translateZ(90px)" },
  { label: "SE", t: "rotateY(180deg) translateZ(90px)" },
  { label: "</>", t: "rotateY(-90deg) translateZ(90px)" },
  { label: "∑", t: "rotateX(90deg) translateZ(90px)" },
  { label: "λ", t: "rotateX(-90deg) translateZ(90px)" },
];

export function Cube3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <div
      className="relative flex h-[340px] w-[340px] items-center justify-center sm:h-[420px] sm:w-[420px]"
      style={{ perspective: "1000px" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -30, y: ((e.clientX - r.left) / r.width - 0.5) * 30 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="absolute h-[300px] w-[300px] rounded-full border-2 border-primary/40" style={{ animation: "ring-spin 12s linear infinite", transform: "rotateX(70deg)" }} />
      <div className="absolute h-[380px] w-[380px] rounded-full border border-accent/30" style={{ animation: "ring-spin 20s linear infinite reverse", transform: "rotateX(70deg)" }} />
      <div style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: "preserve-3d", transition: "transform .3s ease-out" }}>
        <div className="relative h-[180px] w-[180px]" style={{ transformStyle: "preserve-3d", animation: "spin3d 16s linear infinite" }}>
          {faces.map((f) => (
            <div key={f.label} className="glass absolute inset-0 flex items-center justify-center rounded-2xl shadow-glow" style={{ transform: f.t }}>
              <span className="text-gradient font-display text-4xl font-bold">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
