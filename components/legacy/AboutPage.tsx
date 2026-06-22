"use client";

import { LegacyContentPage } from "@/components/content/LegacyContentPage";
import { bodyHtml } from "@/lib/legacy/pages/about";

export function AboutPage() {
  return <LegacyContentPage bodyHtml={bodyHtml} />;
}
