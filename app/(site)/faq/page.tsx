import type { Metadata } from "next";
import "@/styles/support.css";
import { FaqPage } from "@/components/legacy/FaqPage";

export const metadata: Metadata = {
  title: "FAQ | NoorLink",
  description: "Frequently asked questions about NoorLink travel eSIMs.",
};

export default function Page() {
  return <FaqPage />;
}
