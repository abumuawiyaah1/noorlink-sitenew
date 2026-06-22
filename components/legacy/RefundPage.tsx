"use client";

import { LegacyContentPage } from "@/components/content/LegacyContentPage";
import { bodyHtml } from "@/lib/legacy/pages/refund";

export function RefundPage() {
  return <LegacyContentPage bodyHtml={bodyHtml} />;
}
