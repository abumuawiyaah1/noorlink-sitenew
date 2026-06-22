"use client";

import { LegacyContentPage } from "@/components/content/LegacyContentPage";
import { bodyHtml } from "@/lib/legacy/pages/kyc";

export function KycPage() {
  return <LegacyContentPage bodyHtml={bodyHtml} />;
}
