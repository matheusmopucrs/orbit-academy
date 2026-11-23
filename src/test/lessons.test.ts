import { describe, expect, it } from "vitest";
import { buildLessons, parseLesson } from "@/lib/lesson-parser";
import { getCourseLessons } from "@/lib/lessons";

describe("Markdown course content", () => {
  it("loads Markdown files into the Computer Science course", () => {
    const lessons = getCourseLessons("cs");
    expect(lessons.map((lesson) => lesson.id)).toEqual(["01-computational-thinking", "02-algorithms-and-complexity"]);
    expect(lessons[0]?.body).toContain("# Computational thinking");
    expect(getCourseLessons("enem")).toEqual([]);
  });
  it("automatically includes added files and sorts by front-matter order", () => {
    const result = buildLessons({
      "/src/content/courses/cs/later.md": "---\ntitle: Later\nmodule: Algorithms\norder: 2\n---\n# Later",
      "/src/content/courses/cs/first.md": "---\ntitle: First\norder: 1\n---\n# First",
    });
    expect(result.map((lesson) => lesson.title)).toEqual(["First", "Later"]);
    expect(result[1]?.module).toBe("Algorithms");
    expect(result[0]?.body).toBe("# First");
  });
  it("supports plain Markdown and Windows line endings", () => {
    expect(parseLesson("/courses/cs/03-notes.md", "# Notes\n\nA lesson.")?.title).toBe("Notes");
    const lesson = parseLesson("/courses/cs/04-example.md", "---\r\ntitle: \"Example\"\r\norder: 4\r\n---\r\n# Body");
    expect(lesson?.title).toBe("Example");
    expect(lesson?.body).toBe("# Body");
    expect(parseLesson("/unrelated.md", "# Ignore")).toBeNull();
  });
});