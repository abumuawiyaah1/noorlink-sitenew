import Link from "next/link";
import { Home } from "lucide-react";
import "@/styles/back-button.css";

type BackButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export function BackButton({
  href = "/",
  label = "BACK TO HOME",
  className = "",
}: BackButtonProps) {
  return (
    <nav
      className={`back-button-anchor${className ? ` ${className}` : ""}`}
      aria-label="Return to homepage"
    >
      <Link href={href} className="back-button-card">
        <span className="back-button-card__icon" aria-hidden="true">
          <Home className="back-button-card__icon-svg" strokeWidth={2.25} />
        </span>
        <span className="back-button-card__label">{label}</span>
      </Link>
    </nav>
  );
}
