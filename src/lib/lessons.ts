import { buildLessons } from "./lesson-parser";

const files = import.meta.glob<string>("/src/content/courses/**/*.md", { query: "?raw", import: "default", eager: true });
export const lessons = buildLessons(files);
export const getCourseLessons = (courseId: string) => lessons.filter((lesson) => lesson.courseId === courseId);