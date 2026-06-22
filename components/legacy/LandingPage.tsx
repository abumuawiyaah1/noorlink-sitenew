"use client";

import { DestinationGridMount } from "@/components/landing/DestinationGridMount";
import { HeroSearchMount } from "@/components/landing/HeroSearchMount";
import { LandingTicker } from "@/components/landing/LandingTicker";
import { WhatsAppFab } from "@/components/landing/WhatsAppFab";
import { StaticHtmlContent } from "@/components/content/StaticHtmlContent";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { bodyHtml } from "@/lib/legacy/pages/landing";

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <LandingTicker />
      <StaticHtmlContent
        html={bodyHtml}
        stripHeader
        stripFooter
        stripTicker
        stripIds={["destination-grid-mount", "hero-search-mount"]}
        stripWhatsApp
      />
      <HeroSearchMount />
      <DestinationGridMount />
      <WhatsAppFab />
    </>
  );
}
