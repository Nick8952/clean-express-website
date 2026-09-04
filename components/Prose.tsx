import { toHtml } from "@/lib/content";

export default function Prose({ markdown }: { markdown: string }) {
  return (
    <div
      className="prose-ce max-w-prose"
      dangerouslySetInnerHTML={{ __html: toHtml(markdown) }}
    />
  );
}
