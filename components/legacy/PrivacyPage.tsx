"use client";

import { LegacyContentPage } from "@/components/content/LegacyContentPage";
import { bodyHtml } from "@/lib/legacy/pages/privacy";

export function PrivacyPage() {
  return <LegacyContentPage bodyHtml={bodyHtml} />;
}
