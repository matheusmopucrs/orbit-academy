# Adding course lessons

Place `.md` files in `src/content/courses/cs/` for Computer Science, `enem/` for ENEM, or `se/` for Software Engineering. Files are bundled automatically; no database or page edits are required. Publish the app after adding files to update the public site.

Use stable, lowercase, hyphen-separated filenames, such as `03-data-structures.md`. The filename becomes the lesson URL; don't rename published files without adding redirects.

```md
---
title: Data structures
module: Algorithms & Data Structures
order: 3
description: An introduction to arrays and linked lists.
---

# Data structures

Your lesson here.
```

Front matter supports single-line `title`, `module`, `order`, and `description` values, optionally surrounded by quotes. Use a numeric order; lessons with no order use the numeric filename prefix or appear last. The first H1 becomes the title when front matter is omitted. Files directly inside each course folder are loaded.

Supported: headings, lists, links, tables, blockquotes, fenced code and local/HTTPS images. Put images in `public/course-media/` and reference `/course-media/image.jpg`. Raw HTML is not enabled. Reading time is estimated automatically. Markdown links should use normal URLs rather than `.md` paths.

The two Computer Science lessons are starter content, not an official or complete PUCRS syllabus. The other course pages show their planned topics until lessons are added.