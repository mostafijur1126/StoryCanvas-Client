interface JourneyStep {
  title: string;
  description: string;
}

const journeySteps: JourneyStep[] = [
  {
    title: "The Spark",
    description:
      "EventHive was founded in a small garage in Seattle by three event planners frustrated by clunky management software.",
  },
  {
    title: "Virtual Pivot",
    description:
      "When the world paused, we expanded 10,000+ creators to bring their communities online through high-fidelity streaming integration.",
  },
  {
    title: "The Global Hub",
    description:
      "We now power world-class tech communities, local workshops, and everything in-between for millions of users.",
  },
];

export default function AboutJourney() {
  return (
    <section className="py-16 md:py-20 bg-muted/20 dark:bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Our Journey
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line (hidden on small screens, visible md+) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 dark:bg-emerald-800/50" />

          <div className="space-y-12 md:space-y-16">
            {journeySteps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-6 md:gap-12`}
              >
                {/* Timeline dot (visible md+) */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 dark:bg-emerald-400 border-4 border-background shadow-md z-10" />

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div className="bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {/* Empty spacer for alignment */}
                <div className="hidden md:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
