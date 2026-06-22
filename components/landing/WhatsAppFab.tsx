"use client";

import Link from "next/link";

const WA_NUMBER = "17184729390";

export function WhatsAppFab() {
  return (
    <Link
      id="wa-btn"
      href={`https://wa.me/${WA_NUMBER}`}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp" aria-hidden="true" />
    </Link>
  );
}
