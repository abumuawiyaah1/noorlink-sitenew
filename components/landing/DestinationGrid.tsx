import Link from "next/link";

const destinations = [
  {
    id: "americas",
    title: "Americas",
    subtitle: "USA, Canada, Brazil & more",
    className: "bg-americas",
    href: "/plans/usa",
  },
  {
    id: "europe",
    title: "Europe",
    subtitle: "UK, France, Germany & more",
    className: "bg-europe",
    href: "/plans/france",
  },
  {
    id: "mea",
    title: "Middle East & Africa",
    subtitle: "UAE, Turkey, Saudi, Egypt…",
    className: "bg-mea",
    href: "/hajj-umrah",
  },
  {
    id: "asia",
    title: "Asia & Oceania",
    subtitle: "Japan, Thailand, Australia…",
    className: "bg-asia",
    href: "/plans/japan",
  },
] as const;

export function DestinationGrid() {
  return (
    <section className="destinations" id="destinations">
      <div className="container">
        <div className="grid">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={dest.href}
              className={`card ${dest.className}`}
              aria-label={`View plans for ${dest.title}`}
            >
              <div className="card-overlay">
                <div className="region-title">{dest.title}</div>
                <div className="region-sub">{dest.subtitle}</div>
                <div className="arrow-btn" aria-hidden="true">
                  <i className="fas fa-arrow-right" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
