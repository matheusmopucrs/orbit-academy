import { createFileRoute } from "@tanstack/react-router";
import { Camera, FileText, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/extra")({
  head: () => ({ meta: [{ title: "Extra — Orbit Academy" }, { name: "description", content: "Photos, college activities, old tests and other extra content." }, { property: "og:title", content: "Extra — Orbit Academy" }, { property: "og:description", content: "Photos, college activities, old tests and other extra content." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Extra,
});

const cats = [
  { icon: FileText, t: "Old tests", d: "Past exams to practice with." },
  { icon: Camera, t: "Photos", d: "Moments from classes and events." },
  { icon: Users, t: "College activities", d: "Projects and work we did at PUCRS." },
];

function Extra() {
  return (
    <>
      <PageHero kicker="Extra" title="Beyond the classroom" text="Old tests, photos, college activities and anything else worth sharing." />
      <div className="mx-auto w-[min(1100px,92%)]">
        <div className="grid gap-5 md:grid-cols-3">
          {cats.map((c) => (
            <div key={c.t} className="glass rounded-2xl p-7 transition hover:-translate-y-2 hover:shadow-glow">
              <c.icon className="h-8 w-8 text-primary" /><h3 className="mt-4 text-xl font-semibold">{c.t}</h3><p className="mt-2 text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-16 text-3xl font-bold">Gallery</h2>
        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {[...courses, ...courses].map((c, i) => (
            <img key={i} src={c.img} alt={c.title} loading="lazy" className="mb-4 w-full rounded-2xl transition duration-500 hover:scale-[1.03] hover:shadow-glow" />
          ))}
        </div>
      </div>
    </>
  );
}
