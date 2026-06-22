"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HeroSearch } from "@/components/landing/HeroSearch";

export function HeroSearchMount() {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMountNode(document.getElementById("hero-search-mount"));
  }, []);

  if (!mountNode) return null;

  return createPortal(<HeroSearch />, mountNode);
}
