"use client";

import { useState, useMemo } from "react";
import { FiSearch, FiCalendar, FiMapPin, FiStar } from "react-icons/fi";

// ---------- Demo Data ----------
// Replace this with a real API call later (see comments below)
const DEMO_EVENTS = [
  {
    id: 1,
    title: "Future AI Summit 2024",
    date: "Oct 12, 2024",
    location: "San Francisco, CA",
    price: 199,
    rating: 4.9,
    category: "Tech & AI",
    description: "The largest AI conference of the year.",
  },
  {
    id: 2,
    title: "Mastering Minimalist Design",
    date: "Nov 05, 2024",
    location: "London, UK",
    price: 85,
    rating: 4.7,
    category: "Workshops",
    description: "Hands-on design workshop.",
  },
  {
    id: 3,
    title: "SaaS Growth Expo",
    date: "Dec 18, 2024",
    location: "New York, NY",
    price: 0,
    rating: 5.0,
    category: "Business & Networking",
    description: "Scaling strategies from top founders.",
  },
  {
    id: 4,
    title: "Digital Art Vernissage",
    date: "Jan 12, 2025",
    location: "Berlin, DE",
    price: 45,
    rating: 4.8,
    category: "Art & Culture",
    description: "Exploring generative AI in art.",
  },
  // Add more events for demo (at least 20 for pagination)
  ...Array.from({ length: 16 }, (_, i) => ({
    id: i + 5,
    title: `Event ${i + 5}`,
    date: `2024-${String(10 + (i % 3)).padStart(2, "0")}-${String(10 + i).padStart(2, "0")}`,
    location: ["New York", "London", "Berlin", "Paris", "Tokyo"][i % 5],
    price: Math.floor(Math.random() * 500) + 20,
    rating: (3 + Math.random() * 2).toFixed(1),
    category: [
      "Tech & AI",
      "Workshops",
      "Business & Networking",
      "Art & Culture",
    ][i % 4],
    description: "A great event to attend.",
  })),
];

// ---------- Types ----------
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  price: number;
  rating: number;
  category: string;
  description: string;
}

// ---------- Main Page ----------
export default function ExplorePage() {
  // State
  const [events, setEvents] = useState<Event[]>(DEMO_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Derived unique categories and locations for filters
  const allCategories = Array.from(new Set(events.map((e) => e.category)));
  const allLocations = Array.from(new Set(events.map((e) => e.location)));

  // Filter and sort logic
  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    // Search (title or description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q),
      );
    }

    // Category filter (multi-select)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((e) =>
        selectedCategories.includes(e.category),
      );
    }

    // Location filter
    if (locationFilter !== "All Locations") {
      filtered = filtered.filter((e) => e.location === locationFilter);
    }

    // Date range (parse dates)
    if (dateFrom) {
      const from = new Date(dateFrom);
      filtered = filtered.filter((e) => new Date(e.date) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      filtered = filtered.filter((e) => new Date(e.date) <= to);
    }

    // Price range
    filtered = filtered.filter(
      (e) => e.price >= priceMin && e.price <= priceMax,
    );

    // Sort
    if (sortBy === "latest") {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [
    events,
    searchQuery,
    selectedCategories,
    locationFilter,
    dateFrom,
    dateTo,
    priceMin,
    priceMax,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handlers
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setLocationFilter("All Locations");
    setDateFrom("");
    setDateTo("");
    setPriceMin(0);
    setPriceMax(500);
    setCurrentPage(1);
  };

  // For API integration later:
  // useEffect(() => {
  //   async function fetchEvents() {
  //     const res = await fetch('/api/events?' + new URLSearchParams({ ... }));
  //     const data = await res.json();
  //     setEvents(data);
  //   }
  //   fetchEvents();
  // }, [/* dependencies */]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Discover Next Experiences
        </h1>
        <p className="text-foreground/60 mt-1">
          {filteredEvents.length} events found across {allCategories.length}{" "}
          categories
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-6 bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 shadow-sm">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">
                Categories
              </h3>
              <ul className="space-y-2">
                {allCategories.map((cat) => (
                  <li key={cat}>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="rounded border-border text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-foreground/70 hover:text-foreground transition-colors">
                        {cat}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">
                Location
              </h3>
              <select
                value={locationFilter}
                onChange={(e) => {
                  setLocationFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All Locations">All Locations</option>
                {allLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">
                Date Range
              </h3>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">
                Price Range
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/60">$0</span>
                <input
                  type="range"
                  min={0}
                  max={500}
                  step={10}
                  value={priceMax}
                  onChange={(e) => {
                    setPriceMax(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="flex-1 accent-emerald-600"
                />
                <span className="text-sm text-foreground/60">${priceMax}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => {
                    setPriceMin(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-1/2 px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => {
                    setPriceMax(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-1/2 px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={resetFilters}
              className="w-full py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="relative w-full sm:max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                type="text"
                placeholder="Search events, organizers, or tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-foreground/60">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Event Grid */}
          {paginatedEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">
                No events match your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Sub-components ----------

// Event Card
function EventCard({ event }: { event: Event }) {
  return (
    <div className="group bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-700">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            <FiStar className="w-4 h-4 fill-current" />
            <span>{event.rating}</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-1">
            {event.title}
          </h3>
        </div>
        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
          {event.price === 0 ? "Free" : `$${event.price}`}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-sm text-foreground/60">
        <div className="flex items-center gap-1.5">
          <FiCalendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FiMapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/40 flex justify-end">
        <a
          href={`/events/${event.id}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-600 dark:border-emerald-400 rounded-lg hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-colors"
        >
          View Details
        </a>
      </div>
    </div>
  );
}

// Pagination Component
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <nav className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border border-border/60 text-foreground/60 hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-lg transition-colors ${
            currentPage === page
              ? "bg-emerald-600 text-white dark:bg-emerald-500"
              : "hover:bg-muted/50 text-foreground/70"
          }`}
        >
          {page}
        </button>
      ))}
      {totalPages > 5 && currentPage < totalPages - 2 && (
        <span className="text-foreground/40">...</span>
      )}
      {totalPages > 5 && currentPage < totalPages - 2 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 rounded-lg hover:bg-muted/50 text-foreground/70 transition-colors"
        >
          {totalPages}
        </button>
      )}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border border-border/60 text-foreground/60 hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </nav>
  );
}
