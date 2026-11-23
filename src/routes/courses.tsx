import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses — Nexus Study" }, { name: "description", content: "ENEM, Computer Science (PUCRS) and Software Engineering courses." }, { property: "og:title", content: "Courses — Nexus Study" }, { property: "og:description", content: "ENEM, Computer Science (PUCRS) and Software Engineering courses." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Courses,
});

function Courses() {
  return (
    <>
      <PageHero kicker="Courses" title="Pick your path" text="Three courses available right now, each built to help you review and go further." />
      <div className="mx-auto grid w-[min(1100px,92%)] gap-8">
        {courses.map((c, i) => (
          <article key={c.id} className="glass group grid overflow-hidden rounded-3xl transition hover:shadow-glow md:grid-cols-2 animate-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={"overflow-hidden " + (i % 2 ? "md:order-2" : "")}>
              <img src={c.img} alt={c.title} width={1280} height={832} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8 sm:p-10">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">{c.tag}</span>
              <h2 className="mt-4 text-3xl font-bold">{c.title}</h2>
              <p className="mt-3 text-muted-foreground">{c.desc}</p>
              <ul className="mt-6 grid gap-2">
                {c.topics.map((t) => <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{t}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
