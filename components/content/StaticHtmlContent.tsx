"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { prepareLegacyBodyHtml } from "@/lib/html/sanitize";

type StaticHtmlContentProps = {
  html: string;
  stripHeader?: boolean;
  stripFooter?: boolean;
  stripTicker?: boolean;
  stripIds?: string[];
  className?: string;
  stripWhatsApp?: boolean;
};

/**
 * Renders sanitized legacy markup with Next.js link interception only.
 * No inline scripts or global helper functions.
 */
export function StaticHtmlContent({
  html,
  stripHeader = false,
  stripFooter = false,
  stripTicker = false,
  stripIds,
  className,
  stripWhatsApp = false,
}: StaticHtmlContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const safeHtml = prepareLegacyBodyHtml(html, {
    stripHeader,
    stripFooter,
    stripTicker,
    stripIds,
    stripWhatsApp,
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    function handleClick(event: MouseEvent) {
      const anchor = (event.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href.startsWith("javascript") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      event.preventDefault();
      router.push(href);
    }

    root.addEventListener("click", handleClick);
    return () => root.removeEventListener("click", handleClick);
  }, [router, safeHtml]);

  return (
    <div
      ref={rootRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
