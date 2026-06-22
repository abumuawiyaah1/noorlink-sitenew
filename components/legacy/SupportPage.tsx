"use client";

import { LegacyContentPage } from "@/components/content/LegacyContentPage";
import { bodyHtml } from "@/lib/legacy/pages/support";

export function SupportPage() {
  return <LegacyContentPage bodyHtml={bodyHtml} />;
}
