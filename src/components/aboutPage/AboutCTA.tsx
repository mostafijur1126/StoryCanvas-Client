export default function AboutCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready to start your next chapter?
        </h2>
        <p className="text-base sm:text-lg text-foreground/70 mb-8 leading-relaxed">
          Whether you’re organizing a 5-person book club or a 50,000-person
          music festival, we have the tools you need to succeed.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/organize"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
          >
            Start Hosting
          </a>
          <a
            href="/explore"
            className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-medium rounded-lg transition-colors"
          >
            Find an Event
          </a>
        </div>
      </div>
    </section>
  );
}
