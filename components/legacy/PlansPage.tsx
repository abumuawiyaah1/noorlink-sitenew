"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function PlansPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/plans/usa");
  }, [router]);

  return (
    <main className="container" style={{ padding: "3rem 0" }}>
      <p>Redirecting to plans…</p>
    </main>
  );
}
