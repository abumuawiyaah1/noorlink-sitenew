"use client";

import { LegacyContentPage } from "@/components/content/LegacyContentPage";

type LegacyHtmlPageProps = {
  bodyHtml: string;
  scripts?: string[];
  extraScripts?: string[];
  stripHeader?: boolean;
  stripFooter?: boolean;
};

/**
 * @deprecated Use LegacyContentPage or dedicated React page components.
 * Script injection is disabled — legacy `scripts` props are ignored.
 */
export function LegacyHtmlPage({
  bodyHtml,
  stripHeader = true,
  stripFooter = false,
}: LegacyHtmlPageProps) {
  return (
    <LegacyContentPage
      bodyHtml={bodyHtml}
      stripHeader={stripHeader}
      stripFooter={stripFooter}
    />
  );
}
