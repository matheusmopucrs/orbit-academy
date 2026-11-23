import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, PlayCircle, ClipboardCheck } from "lucide-react";
import { Cube3D } from "@/components/Cube3D";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Learn smarter — Nexus Study" }, { name: "description", content: "A free study hub with ENEM, Computer Science (PUCRS) and Software Engineering courses, videos and tests." }, { property: "og:title", content: "Learn smarter — Nexus Study" }, { property: "og:description", content: "A free study hub with ENEM, Computer Science (PUCRS) and Software Engineering courses, videos and tests." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});

const stats = [
  { n: "3", l: "Courses" },
  { n: "100+", l: "Lessons" },
  { n: "24/7", l: "Free access" },
];
const features = [
  { icon: BookOpen, t: "Structured courses", d: "Content organized topic by topic." },
  { icon: PlayCircle, t: "Video lessons", d: "Short, clear explanations." },
  { icon: ClipboardCheck, t: "Practice tests", d: "Check what you really learned." },
];

function Index() {
  return (
    <div className="mx-auto w-[min(1100px,92%)]">
      <section className="grid min-h-[85vh] items-center gap-10 pt-10 md:grid-cols-2">
        <div className="animate-rise">
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">Study hub · 2026</span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] sm:text-7xl">
            Learn <span className="text-gradient">smarter</span>,<br />not harder.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Nexus Study brings together everything we learn — from school to college — in one place. Courses, videos, tests and the moments we shared along the way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/courses" className="bg-gradient-brand inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-primary-foreground shadow-glow transition hover:scale-105">
              Explore courses <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/extra" className="glass rounded-full px-6 py-3 font-semibold transition hover:bg-muted">See extras</Link>
          </div>
          <div className="mt-12 flex gap-10">
            {stats.map((s) => (
              <div key={s.l}><p className="font-display text-3xl font-bold text-primary">{s.n}</p><p className="text-sm text-muted-foreground">{s.l}</p></div>
            ))}
          </div>
        </div>
        <div className="flex justify-center animate-rise" style={{ animationDelay: ".2s" }}><Cube3D /></div>
      </section>
      <section className="grid gap-5 py-16 md:grid-cols-3">
        {features.map((f, i) => (
          <div key={f.t} className="glass group rounded-2xl p-7 transition hover:-translate-y-2 hover:shadow-glow animate-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <f.icon className="h-8 w-8 text-primary transition group-hover:scale-110" />
            <h3 className="mt-4 text-xl font-semibold">{f.t}</h3>
            <p className="mt-2 text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
