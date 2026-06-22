"use client";

import { LegacyContentPage } from "@/components/content/LegacyContentPage";
import { bodyHtml } from "@/lib/legacy/pages/faq";

export function FaqPage() {
  return <LegacyContentPage bodyHtml={bodyHtml} />;
}
