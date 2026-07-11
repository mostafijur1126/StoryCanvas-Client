import { FiPlus, FiSettings } from "react-icons/fi";

export interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
  price: string;
  category?: string;
  image?: string; // optional for future enhancement
}

interface EventCardProps {
  event: Event;
  className?: string;
}

export default function EventCard({ event, className = "" }: EventCardProps) {
  return (
    <div
      className={`group bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-700 ${className}`}
    >
      {/* Badge - Date or Category */}
      <div className="inline-block px-3 py-1 text-xs font-medium tracking-wide uppercase bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full mb-4">
        {event.date}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
        {event.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-2">
        {event.description}
      </p>

      {/* Footer: Price + Button */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
          {event.price}
        </span>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-white border border-emerald-600 dark:border-emerald-400 hover:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-all duration-200 hover:shadow-md"
          aria-label={`Join ${event.title}`}
        >
          Join
          <FiPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
