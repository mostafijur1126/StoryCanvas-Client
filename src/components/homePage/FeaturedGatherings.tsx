import EventCard, { Event } from "@/components/ui/EventCard";

interface FeaturedGatheringsProps {
  events?: Event[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultEvents: Event[] = [
  {
    id: "1",
    date: "Nov 12, 2024",
    title: "Global Tech Summit 2024",
    description: "The definitive gathering for AI pioneers and software...",
    price: "$299",
  },
  {
    id: "2",
    date: "Nov 12, 2024",
    title: "Creative Workshop",
    description: "Hands-on masterclass for modern UI/UX designers a...",
    price: "Free",
  },
  {
    id: "3",
    date: "Dec 05, 2024",
    title: "SaaS Growth Expo",
    description: "Scaling strategies from the founders of the world's...",
    price: "$549",
  },
  {
    id: "4",
    date: "Jan 15, 2025",
    title: "Digital Art Forum",
    description:
      "Exploring the intersection of generative AI and traditiona...",
    price: "$120",
  },
];

export default function FeaturedGatherings({
  events = defaultEvents,
  title = "Featured Gatherings",
  subtitle = "Handpicked events trending in your industry.",
  className = "",
}: FeaturedGatheringsProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
          <p className="mt-2 text-base text-foreground/60">{subtitle}</p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
