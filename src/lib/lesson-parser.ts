export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  module: string;
  order: number;
  description: string;
  minutes: number;
  body: string;
}

// Intentionally small front-matter format: single-line scalar values only.
export function parseLesson(path: string, raw: string): Lesson | null {
  const match = path.match(/\/courses\/([^/]+)\/([^/]+)\.md$/);
  const courseId = match?.[1];
  const id = match?.[2];
  if (!courseId || !id) return null;
  const normalized = raw.replace(/\r\n/g, "\n");
  const front = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  const metadata: Record<string, string> = {};
  for (const line of (front?.[1] ?? "").split("\n")) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  const body = front ? normalized.slice(front[0].length).trim() : normalized.trim();
  const title = metadata['title'] || body.match(/^#\s+(.+)$/m)?.[1] || id.replace(/^\d+-/, "").replace(/-/g, " ");
  const order = Number(metadata['order'] ?? parseInt(id, 10));
  return { id, courseId, title, module: metadata['module'] || "General", order: Number.isFinite(order) ? order : 999, description: metadata['description'] || "", minutes: Math.max(1, Math.ceil(body.split(/\s+/).length / 180)), body };
}

export function buildLessons(files: Record<string, string>): Lesson[] {
  return Object.entries(files).flatMap(([path, raw]) => {
    const lesson = parseLesson(path, raw);
    return lesson ? [lesson] : [];
  }).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}