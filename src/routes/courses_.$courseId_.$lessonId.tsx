import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courses";
import { getCourseLessons } from "@/lib/lessons";

export const Route = createFileRoute("/courses_/$courseId_/$lessonId")({
  loader: ({ params }) => {
    const course = courses.find((item) => item.id === params.courseId);
    const lessons = getCourseLessons(params.courseId);
    const lesson = lessons.find((item) => item.id === params.lessonId);
    if (!course || !lesson) throw notFound();
    return { course, lesson, lessons };
  },
  head: ({ loaderData }) => {
    const title = `${loaderData?.lesson.title ?? "Lesson unavailable"} — Orbit Academy`;
    const description = loaderData?.lesson.description || "Read course notes and lessons at Orbit Academy.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: LessonPage,
});

function LessonPage() {
  const { course, lesson, lessons } = Route.useLoaderData();
  const position = lessons.findIndex((item) => item.id === lesson.id);
  const previous = lessons[position - 1];
  const next = lessons[position + 1];
  const curriculum = <div className="mt-4 grid gap-1">{lessons.map((item) => <Link key={item.id} to="/courses/$courseId/$lessonId" params={{ courseId: course.id, lessonId: item.id }} className={"flex items-start gap-3 rounded-md px-3 py-3 text-sm transition-colors " + (item.id === lesson.id ? "bg-muted font-semibold text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")} aria-current={item.id === lesson.id ? "page" : undefined}><BookOpen className="mt-0.5 size-4 shrink-0" />{item.title}</Link>)}</div>;
  return (
    <div className="mx-auto w-[min(1100px,92%)] pt-10 sm:pt-14">
      <Button asChild variant="ghost" className="-ml-3 mb-8"><Link to="/courses/$courseId" params={{ courseId: course.id }}><ArrowLeft />{course.title}</Link></Button>
      <div className="grid items-start gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:sticky lg:top-28 lg:block"><p className="text-sm font-semibold">Course contents</p>{curriculum}</aside>
        <div className="min-w-0">
          <details className="mb-8 border-y border-border py-4 lg:hidden"><summary className="cursor-pointer font-semibold">Course contents</summary>{curriculum}</details>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5 text-sm"><span className="font-semibold text-primary">{lesson.module}</span><span className="flex items-center gap-2 text-muted-foreground"><Clock className="size-4" />{lesson.minutes} min read · {position + 1} of {lessons.length}</span></div>
          <article className="lesson-prose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.body}</ReactMarkdown></article>
          <nav aria-label="Lesson navigation" className="mt-12 flex flex-wrap justify-between gap-4 border-t border-border pt-6">
            {previous ? <Button asChild variant="outline"><Link to="/courses/$courseId/$lessonId" params={{ courseId: course.id, lessonId: previous.id }}><ArrowLeft />Previous lesson</Link></Button> : <Button asChild variant="outline"><Link to="/courses/$courseId" params={{ courseId: course.id }}><ArrowLeft />Course overview</Link></Button>}
            {next ? <Button asChild><Link to="/courses/$courseId/$lessonId" params={{ courseId: course.id, lessonId: next.id }}>Next lesson<ArrowRight /></Link></Button> : <Button asChild><Link to="/courses/$courseId" params={{ courseId: course.id }}>Back to curriculum<ArrowRight /></Link></Button>}
          </nav>
        </div>
      </div>
    </div>
  );
}