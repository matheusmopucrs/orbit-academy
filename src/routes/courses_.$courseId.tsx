import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courses } from "@/lib/courses";
import { getCourseLessons } from "@/lib/lessons";

export const Route = createFileRoute("/courses_/$courseId")({
  loader: ({ params }) => {
    const course = courses.find((item) => item.id === params.courseId);
    if (!course) throw notFound();
    return { course, lessons: getCourseLessons(course.id) };
  },
  head: ({ loaderData }) => {
    const title = `${loaderData?.course.title ?? "Course unavailable"} — Orbit Academy`;
    const description = loaderData?.course.desc ?? "Explore the courses at Orbit Academy.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: CourseOverview,
});

function CourseOverview() {
  const { course, lessons } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const filtered = lessons.filter((lesson) => `${lesson.title} ${lesson.module}`.toLowerCase().includes(query.toLowerCase()));
  const modules = [...new Set(filtered.map((lesson) => lesson.module))];
  const first = lessons[0];
  return (
    <div className="mx-auto w-[min(1100px,92%)] pt-12 sm:pt-16">
      <Button asChild variant="ghost" className="mb-8 -ml-3"><Link to="/courses"><ArrowLeft /> All courses</Link></Button>
      <section className="grid gap-8 border-b border-border pb-12 md:grid-cols-[1fr_360px]">
        <div>
          <p className="text-sm font-semibold text-primary">{course.tag}</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{course.title}</h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{course.desc}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground"><span className="flex items-center gap-2"><BookOpen className="size-4" />{lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}</span>{lessons.length > 0 && <span className="flex items-center gap-2"><Clock className="size-4" />{lessons.reduce((sum, lesson) => sum + lesson.minutes, 0)} min reading</span>}</div>
          {first && <Button asChild className="mt-8" size="lg"><Link to="/courses/$courseId/$lessonId" params={{ courseId: course.id, lessonId: first.id }}>Start learning <ArrowRight /></Link></Button>}
        </div>
        <img src={course.img} alt={course.title} className="aspect-[4/3] w-full rounded-lg object-cover" />
      </section>
      <section className="py-10">
        <div className="flex flex-wrap items-center justify-between gap-5"><h2 className="text-2xl font-semibold">Curriculum</h2>{lessons.length > 0 && <div className="relative w-full sm:w-72"><Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input aria-label="Search lessons" placeholder="Search lessons…" value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" /></div>}</div>
        {lessons.length === 0 ? <><p className="mt-5 text-muted-foreground">Lessons are being prepared. Here’s what’s planned.</p><ul className="mt-6 divide-y divide-border">{course.topics.map((topic, i) => <li key={topic} className="flex items-center gap-5 py-5"><span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span><span>{topic}</span><span className="ml-auto text-xs text-muted-foreground">Coming soon</span></li>)}</ul></> : <>
          {modules.map((module) => <div key={module} className="mt-8"><h3 className="border-b border-border pb-3 text-sm font-semibold text-secondary">{module}</h3><div className="divide-y divide-border">{filtered.filter((lesson) => lesson.module === module).map((lesson) => <Link key={lesson.id} to="/courses/$courseId/$lessonId" params={{ courseId: course.id, lessonId: lesson.id }} className="group flex items-center gap-5 py-6 transition-colors hover:bg-muted/50"><BookOpen className="size-5 shrink-0 text-primary" /><div className="min-w-0 flex-1"><h4 className="font-semibold group-hover:text-primary">{lesson.title}</h4>{lesson.description && <p className="mt-1 text-sm text-muted-foreground">{lesson.description}</p>}</div><span className="hidden shrink-0 text-xs text-muted-foreground sm:block">{lesson.minutes} min</span><ArrowRight className="size-4 shrink-0 text-muted-foreground" /></Link>)}</div></div>)}
          {filtered.length === 0 && <p className="py-12 text-muted-foreground">No lessons match “{query}”.</p>}
        </>}
      </section>
    </div>
  );
}