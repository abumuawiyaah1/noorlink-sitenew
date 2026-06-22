"use client";

import { usePathname } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";

export function GlobalBackButton() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <BackButton />;
}
