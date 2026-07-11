export default function AboutHero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50/30 via-background to-emerald-50/30 dark:from-emerald-950/10 dark:via-background dark:to-emerald-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Our Mission
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-emerald-600 dark:text-emerald-400 leading-tight">
            We believe the world is better when people come together.
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto">
            EventHive is the engine of human connection. We’re building a
            seamless infrastructure for event discovery, management, and
            participation to foster a more vibrant global community.
          </p>
        </div>
      </div>
    </section>
  );
}
