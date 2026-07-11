"use client";

import { useState } from "react";
import { FiSearch, FiCalendar, FiMapPin } from "react-icons/fi";

export default function Banner() {
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic (e.g., redirect or API call)
    console.log({ keyword, date, location });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 dark:from-emerald-950/20 dark:via-background dark:to-emerald-950/10 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/30 px-4 py-1.5 rounded-full mb-6">
          Evolution Through Experience
        </p>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-4xl mx-auto">
          Discover Events That Shape Your Future
        </h1>

        {/* Description */}
        <p className="mt-4 text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Connect with industry leaders, pioneers, and creative minds at the
          world's premier gatherings. Curated for the ambitious.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/explore"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Explore Now
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-medium rounded-lg transition-colors"
          >
            Watch Demo
          </a>
        </div>

        {/* Search / Filter Bar */}
        <div className="mt-12 max-w-4xl mx-auto">
          <p className="text-sm font-medium text-foreground/60 mb-3 text-left">
            Find your next event
          </p>
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-2 shadow-lg"
          >
            {/* Keyword */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                type="text"
                placeholder="Keyword (e.g. AI, Design)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-transparent border-none focus:ring-0 text-foreground placeholder:text-foreground/40 outline-none"
              />
            </div>

            {/* Separator (hidden on mobile) */}
            <div className="hidden md:block w-px h-8 bg-border/60" />

            {/* Date */}
            <div className="flex-1 relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-transparent border-none focus:ring-0 text-foreground placeholder:text-foreground/40 outline-none"
              />
            </div>

            {/* Separator */}
            <div className="hidden md:block w-px h-8 bg-border/60" />

            {/* Location */}
            <div className="flex-1 relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-transparent border-none focus:ring-0 text-foreground placeholder:text-foreground/40 outline-none"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Search Events
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
