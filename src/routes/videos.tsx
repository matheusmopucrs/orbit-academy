import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/videos")({
  head: () => ({ meta: [{ title: "Videos — Nexus Study" }, { name: "description", content: "Video lessons for every course on Nexus Study." }, { property: "og:title", content: "Videos — Nexus Study" }, { property: "og:description", content: "Video lessons for every course on Nexus Study." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Videos,
});

function Videos() {
  return (
    <>
      <PageHero kicker="Videos" title="Watch and learn" text="Short video lessons for every topic. New videos are added regularly." />
      <div className="mx-auto grid w-[min(1100px,92%)] gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.flatMap((c) => c.topics.slice(0, 3).map((t) => ({ c, t }))).map(({ c, t }) => (
          <div key={c.id + t} className="glass group cursor-pointer overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-glow">
            <div className="relative aspect-video overflow-hidden">
              <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-110 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-gradient-brand flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-glow transition group-hover:scale-125"><Play className="h-6 w-6" /></span>
              </div>
            </div>
            <div className="p-5"><p className="text-xs uppercase tracking-wider text-primary">{c.title}</p><h3 className="mt-1 font-semibold">{t}</h3></div>
          </div>
        ))}
      </div>
    </>
  );
}
