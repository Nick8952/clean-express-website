import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getLegal } from "@/lib/content";

const page = getLegal("impressum");

export const metadata: Metadata = {
  title: page.seoTitle ?? page.title,
  description: page.seoDescription,
};

export default function Impressum() {
  return <LegalPage slug="impressum" />;
}
