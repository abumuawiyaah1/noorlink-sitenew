import type { Metadata } from "next";
import "@/styles/privacy.css";
import { PrivacyPage } from "@/components/legacy/PrivacyPage";

export const metadata: Metadata = {
  title: "Cookie Policy | NoorLink",
};

/** Placeholder until a dedicated cookie-policy.html is ported. */
export default function CookiePolicyPage() {
  return <PrivacyPage />;
}
