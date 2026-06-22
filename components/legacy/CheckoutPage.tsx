"use client";

import { Suspense } from "react";
import { ModernCheckoutPage } from "@/components/checkout/ModernCheckoutPage";

function CheckoutFallback() {
  return (
    <main id="main-content" className="container" style={{ padding: "3rem 0" }}>
      <p>Loading checkout…</p>
    </main>
  );
}

export function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <ModernCheckoutPage />
    </Suspense>
  );
}
