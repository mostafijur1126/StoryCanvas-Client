"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiCalendar, FiMapPin, FiSearch, FiStar } from "react-icons/fi";
import type { Event } from "@/types/event";

const DEFAULT_PRICE_LIMIT = 500;
const ITEMS_PER_PAGE = 4;

function normalizeEvent(event: Event | Record<string, unknown>): Event {
  const ticketPrice =
    typeof event.ticketPrice === "number"
      ? event.ticketPrice
      : typeof event.ticketPrice === "string"
        ? Number(event.ticketPrice)
        : typeof event.price === "number"
          ? event.price
          : typeof event.price === "string"
            ? Number(event.price)
            : 0;

  const startDate =
    (typeof event.startDate === "string" && event.startDate) ||
    (typeof event.date === "string" && event.date) ||
    "";

  const venue =
    (typeof event.venue === "string" && event.venue) ||
    (typeof event.location === "string" && event.location) ||
    "TBA";

  return {
    id: String(event.id ?? event._id ?? ""),
    _id: typeof event._id === "string" ? event._id : undefined,
    title: typeof event.title === "string" ? event.title : "Untitled Event",
    description:
      typeof event.description === "string"
        ? event.description
        : "No description provided yet.",
    category:
      typeof event.category === "string" && event.category.trim()
        ? event.category
        : "Other",
    date: startDate,
    startDate,
    venue,
    location: venue,
    price: ticketPrice,
    ticketPrice,
    rating: typeof event.rating === "number" ? event.rating : 4.5,
    coverImageUrl:
      typeof event.coverImageUrl === "string" ? event.coverImageUrl : undefined,
    status: typeof event.status === "string" ? event.status : undefined,
  };
}

export default function ExplorePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(DEFAULT_PRICE_LIMIT);
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const normalizedEvents = useMemo(() => events.map(normalizeEvent), [events]);

  const allCategories = useMemo(
    () =>
      Array.from(
        new Set(normalizedEvents.map((event) => event.category || "Other")),
      ).sort(),
    [normalizedEvents],
  );

  const allLocations = useMemo(
    () =>
      Array.from(
        new Set(
          normalizedEvents
            .map((event) => event.location || event.venue || "TBA")
            .filter(Boolean),
        ),
      ).sort(),
    [normalizedEvents],
  );

  const filteredEvents = useMemo(() => {
    let filtered = [...normalizedEvents];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((event) => {
        const searchable = [
          event.title,
          event.description,
          event.category,
          event.venue,
          event.location,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(q);
      });
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((event) =>
        selectedCategories.includes(event.category || "Other"),
      );
    }

    if (locationFilter !== "All Locations") {
      filtered = filtered.filter(
        (event) => (event.location || event.venue || "TBA") === locationFilter,
      );
    }

    if (dateFrom) {
      filtered = filtered.filter(
        (event) => (event.startDate || "") >= dateFrom,
      );
    }

    if (dateTo) {
      filtered = filtered.filter((event) => (event.startDate || "") <= dateTo);
    }

    const minPrice = Number(priceMin) || 0;
    const maxPrice = Number(priceMax) || DEFAULT_PRICE_LIMIT;
    filtered = filtered.filter((event) => {
      const price = Number(event.ticketPrice ?? event.price ?? 0);
      return price >= minPrice && price <= maxPrice;
    });

    if (sortBy === "latest") {
      filtered.sort((a, b) =>
        (b.startDate || "").localeCompare(a.startDate || ""),
      );
    } else if (sortBy === "price-low") {
      filtered.sort(
        (a, b) =>
          Number(a.ticketPrice ?? a.price ?? 0) -
          Number(b.ticketPrice ?? b.price ?? 0),
      );
    } else if (sortBy === "price-high") {
      filtered.sort(
        (a, b) =>
          Number(b.ticketPrice ?? b.price ?? 0) -
          Number(a.ticketPrice ?? a.price ?? 0),
      );
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
    }

    return filtered;
  }, [
    normalizedEvents,
    searchQuery,
    selectedCategories,
    locationFilter,
    dateFrom,
    dateTo,
    priceMin,
    priceMax,
    sortBy,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / ITEMS_PER_PAGE),
  );
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((value) => value !== category)
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
    setPriceMax(DEFAULT_PRICE_LIMIT);
    setCurrentPage(1);
  };

  useEffect(() => {
    let isActive = true;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL || "http://localhost:5000"}/events`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load events");
        }

        const result = await response.json();
        const payload = Array.isArray(result) ? result : (result?.data ?? []);

        if (isActive) {
          setEvents(Array.isArray(payload) ? payload : []);
        }
      } catch (error) {
        console.error("Failed to load events", error);
        if (isActive) {
          setEvents([]);
        }
      }
    };

    fetchEvents();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-20 space-y-6 bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 shadow-sm">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">
                Categories
              </h3>
              <ul className="space-y-2">
                {allCategories.map((category) => (
                  <li key={category}>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="rounded border-border text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-foreground/70 hover:text-foreground transition-colors">
                        {category}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">
                Location
              </h3>
              <select
                value={locationFilter}
                onChange={(event) => {
                  setLocationFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All Locations">All Locations</option>
                {allLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">
                Date Range
              </h3>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(event) => {
                    setDateFrom(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(event) => {
                    setDateTo(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">
                Price Range
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/60">$0</span>
                <input
                  type="range"
                  min={0}
                  max={DEFAULT_PRICE_LIMIT}
                  step={10}
                  value={priceMax}
                  onChange={(event) => {
                    setPriceMax(Number(event.target.value));
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
                  onChange={(event) => {
                    setPriceMin(Number(event.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-1/2 px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(event) => {
                    setPriceMax(Number(event.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-1/2 px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="relative w-full sm:max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                type="text"
                placeholder="Search events, categories, or venues..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-foreground/60">Sort by:</span>
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
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

          {paginatedEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">
                No events match your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedEvents.map((event) => (
                <EventCard key={event.id || event.title} event={event} />
              ))}
            </div>
          )}

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

function EventCard({ event }: { event: Event }) {
  const price = Number(event.ticketPrice ?? event.price ?? 0);
  const displayDate = event.startDate || event.date || "TBA";
  const displayLocation = event.location || event.venue || "TBA";

  const formattedDate = (() => {
    if (!displayDate || displayDate === "TBA") return "TBA";
    const parsed = new Date(displayDate);
    if (isNaN(parsed.getTime())) return displayDate;
    return parsed.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  })();

  return (
    <div className="group bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-700">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {event.coverImageUrl ? (
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-950/40 dark:to-emerald-900/20">
            <FiCalendar className="w-10 h-10 text-emerald-400" />
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide bg-background/90 backdrop-blur-sm text-emerald-700 dark:text-emerald-400 rounded-full shadow-sm">
          {event.category || "Other"}
        </span>

        {/* Price badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold bg-emerald-600 dark:bg-emerald-500 text-white rounded-full shadow-sm">
          {price === 0 ? "Free" : `$${price}`}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
          <FiStar className="w-4 h-4 fill-current" />
          <span>{Number(event.rating ?? 4.5).toFixed(1)}</span>
        </div>

        <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-1 line-clamp-1">
          {event.title}
        </h3>

        <p className="text-sm text-foreground/60 mt-2 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-foreground/60">
          <div className="flex items-center gap-1.5">
            <FiCalendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiMapPin className="w-4 h-4" />
            <span className="truncate max-w-[140px]">{displayLocation}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/40">
          <Link
            href={event.id ? `/explore/${event.id}` : "/create-event"}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-600 dark:border-emerald-400 rounded-lg hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    if (totalPages <= 5) return index + 1;
    if (currentPage <= 3) return index + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + index;
    return currentPage - 2 + index;
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
