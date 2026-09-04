import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type PageMeta = {
  seoTitle: string;
  seoDescription: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    /** Nur Startseite: Titel in zwei Teilen, der zweite erscheint farbig. */
    titlePrefix?: string;
    titleAccent?: string;
    lead?: string;
  };
  body?: string;
};

export type LegalMeta = {
  title: string;
  subtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  body: string;
};

function read(dir: string, slug: string) {
  const file = path.join(process.cwd(), "content", dir, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

/** Seiten-Texte aus content/pages/<slug>.md – im CMS unter «Seiten-Texte». */
export function getPage(slug: string): PageMeta {
  const { data, content } = read("pages", slug);
  return {
    ...(data as Omit<PageMeta, "body">),
    body: (data.body as string | undefined) ?? content,
  };
}

/** Rechtstexte aus content/legal/<slug>.md – im CMS unter «Rechtstexte». */
export function getLegal(slug: string): LegalMeta {
  const { data, content } = read("legal", slug);
  return {
    ...(data as Omit<LegalMeta, "body">),
    body: (data.body as string | undefined) ?? content,
  } as LegalMeta;
}

export function toHtml(markdown: string): string {
  return marked.parse(markdown ?? "", { async: false }) as string;
}
