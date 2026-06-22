"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DestinationGrid } from "@/components/landing/DestinationGrid";

export function DestinationGridMount() {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMountNode(document.getElementById("destination-grid-mount"));
  }, []);

  if (!mountNode) return null;

  return createPortal(<DestinationGrid />, mountNode);
}
