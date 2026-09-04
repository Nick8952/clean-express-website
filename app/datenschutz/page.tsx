import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getLegal } from "@/lib/content";

const page = getLegal("datenschutz");

export const metadata: Metadata = {
  title: page.seoTitle ?? page.title,
  description: page.seoDescription,
};

export default function Datenschutz() {
  return <LegalPage slug="datenschutz" />;
}
