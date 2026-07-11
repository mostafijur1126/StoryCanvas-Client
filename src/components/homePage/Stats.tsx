interface StatItem {
  number: string;
  label: string;
}

interface StatsProps {
  stats?: StatItem[];
  className?: string;
}

const defaultStats: StatItem[] = [
  { number: "500+", label: "Annual Events" },
  { number: "120k", label: "Active Members" },
  { number: "45", label: "Global Hubs" },
  { number: "98%", label: "Attendee Rating" },
];

export default function Stats({
  stats = defaultStats,
  className = "",
}: StatsProps) {
  return (
    <section
      className={`py-16 md:py-20 bg-gradient-to-b from-emerald-50/30 via-background to-emerald-50/30 dark:from-emerald-950/10 dark:via-background dark:to-emerald-950/10 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base font-medium text-foreground/60 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
