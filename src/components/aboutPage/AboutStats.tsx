export default function AboutStats() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Main stat */}
          <div className="lg:col-span-1 text-center lg:text-left space-y-2">
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">
              1.2M+
            </div>
            <div className="text-lg font-semibold text-foreground">
              Active Event Seekers
            </div>
            <p className="text-sm text-foreground/60">
              Connecting passionate people across 190 countries daily.
            </p>
          </div>

          {/* Two side stats */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                50K+
              </div>
              <div className="text-sm font-medium text-foreground/70">
                Monthly Events
              </div>
            </div>
            <div className="bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                4.9/5
              </div>
              <div className="text-sm font-medium text-foreground/70">
                User Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
