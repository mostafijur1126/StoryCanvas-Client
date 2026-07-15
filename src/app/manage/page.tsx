"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Eye, Trash2, LayoutGrid, LayoutList } from "lucide-react";
import { useSessionClient } from "@/core/session";
import { deleteEvent, getMyEvents } from "@/lib/api/getEvent";

type EventStatus = "Active" | "Draft" | "Past" | "Sold Out";

interface ManagedEvent {
  id: string;
  title: string;
  location: string;
  image: string;
  date: string;
  ticketsSold: number;
  ticketsTotal: number;
  revenue: number;
  status: EventStatus;
  timeframe: "upcoming" | "past";
}

const formatEventDate = (value?: string) => {
  if (!value) return "TBD";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBD";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const normalizeEvent = (event: Record<string, unknown>): ManagedEvent => {
  const getString = (value: unknown, fallback = "") => {
    if (typeof value === "string") return value;
    if (value == null) return fallback;
    try {
      return String(value);
    } catch {
      return fallback;
    }
  };
  const getNumber = (value: unknown, fallback = 0) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    }
    return fallback;
  };

  const startDate = getString(event.startDate) || getString(event.date);
  const parsedDate = startDate ? new Date(startDate) : null;
  const isPast = parsedDate ? parsedDate < new Date() : false;
  const ticketsSold = getNumber(event.ticketsSold);
  const ticketsTotal = getNumber(
    event.totalCapacity,
    getNumber(event.ticketsTotal, 100),
  );
  const ticketPrice = getNumber(event.ticketPrice, getNumber(event.price, 0));
  const revenue = getNumber(event.revenue, ticketPrice * ticketsSold);
  const rawStatus = getString(event.status);

  let status: EventStatus = isPast ? "Past" : "Active";
  if (rawStatus === "draft") {
    status = "Draft";
  } else if (rawStatus === "published") {
    status =
      ticketsSold >= ticketsTotal ? "Sold Out" : isPast ? "Past" : "Active";
  } else if (ticketsSold >= ticketsTotal) {
    status = "Sold Out";
  }

  return {
    id: getString(event._id) || getString(event.id),
    title: getString(event.title, "Untitled Event"),
    location: getString(event.venue, getString(event.location, "Location TBD")),
    image:
      getString(event.coverImageUrl) ||
      getString(event.image) ||
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=200&fit=crop",
    date: formatEventDate(startDate),
    ticketsSold: Number.isFinite(ticketsSold) ? ticketsSold : 0,
    ticketsTotal:
      Number.isFinite(ticketsTotal) && ticketsTotal > 0 ? ticketsTotal : 100,
    revenue: Number.isFinite(revenue) ? revenue : 0,
    status,
    timeframe: isPast ? "past" : "upcoming",
  };
};

const statusStyles: Record<EventStatus, string> = {
  Active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  Draft: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  Past: "bg-muted text-muted-foreground",
  "Sold Out":
    "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
};

const statCards = (events: ManagedEvent[]) => {
  const totalSales = events.reduce((sum, e) => sum + e.revenue, 0);
  const ticketsSold = events.reduce((sum, e) => sum + e.ticketsSold, 0);
  const activeEvents = events.filter((e) => e.status === "Active").length;
  const avgAttendance =
    events.length === 0
      ? 0
      : Math.round(
          (events.reduce((sum, e) => sum + e.ticketsSold / e.ticketsTotal, 0) /
            events.length) *
            100,
        );

  return [
    {
      label: "Total Sales",
      value: `$${totalSales.toLocaleString()}`,
      color: "text-foreground",
    },
    {
      label: "Tickets Sold",
      value: ticketsSold.toLocaleString(),
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Active Events",
      value: activeEvents.toString(),
      color: "text-foreground",
    },
    {
      label: "Avg Attendance",
      value: `${avgAttendance}%`,
      color: "text-emerald-600 dark:text-emerald-400",
    },
  ];
};

const ManagePage = () => {
  const [view, setView] = useState<"table" | "grid">("table");
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { session } = useSessionClient();
  const userId = session?.user?.id;
  const [events, setEvents] = useState<ManagedEvent[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchEvents = async () => {
      setLoading(true);
      try {
        if (!userId) {
          console.warn("userId is not available yet, skipping fetch");
          setLoading(false);
          return;
        }
        const res = await getMyEvents(userId);
        const payload = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
            ? res
            : [];

        if (!ignore) {
          setEvents(payload.map(normalizeEvent));
        }
      } catch (error) {
        console.error("Failed to load events", error);
        if (!ignore) {
          setEvents([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      ignore = true;
    };
  }, [userId]);

  const filteredEvents = events;

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this event?");
    if (!confirmed) return;

    try {
      await deleteEvent(id);
      setEvents((current) => current.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      {!isMounted && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      )}
      {isMounted && (
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Manage Events
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Monitor, edit, and organize your upcoming experiences.
              </p>
            </div>

            <Link
              href="/create-event"
              className="inline-flex h-fit items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              <Plus className="h-4 w-4" />
              Create New Event
            </Link>
          </div>

          {/* Stat cards */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {statCards(events).map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/40 bg-card p-4"
              >
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className={`mt-1 text-xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* View toggle */}
          <div className="mb-4 flex items-center justify-end">
            <div className="flex items-center gap-1 rounded-lg border border-border/40 p-1">
              <button
                onClick={() => setView("table")}
                aria-label="Table view"
                className={`rounded-md p-1.5 transition-colors ${
                  view === "table"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutList className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={`rounded-md p-1.5 transition-colors ${
                  view === "grid"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="rounded-2xl border border-border/40 bg-card p-12 text-center text-sm text-muted-foreground">
              Loading your events...
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="rounded-2xl border border-border/40 bg-card p-12 text-center text-sm text-muted-foreground">
              No events here yet.
            </div>
          ) : view === "table" ? (
            <div className="overflow-x-auto rounded-2xl border border-border/40 bg-card">
              <table className="w-full min-w-180 text-left text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-xs text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Event</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Tickets</th>
                    <th className="px-5 py-3 font-medium">Revenue</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event) => {
                    const percentSold = Math.round(
                      (event.ticketsSold / event.ticketsTotal) * 100,
                    );
                    return (
                      <tr
                        key={event.id}
                        className="border-b border-border/40 last:border-0"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {event.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {event.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground">
                          {event.date}
                        </td>
                        <td className="px-5 py-4">
                          <div className="w-28">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-emerald-500"
                                style={{ width: `${percentSold}%` }}
                              />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {event.ticketsSold}/{event.ticketsTotal} sold
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-foreground">
                          ${event.revenue.toLocaleString()}.00
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              statusStyles[event.status]
                            }`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/explore/${event.id}`}
                              aria-label={`View ${event.title}`}
                              className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(event.id)}
                              aria-label={`Delete ${event.title}`}
                              className="text-muted-foreground transition-colors hover:text-red-600 dark:hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => {
                const percentSold = Math.round(
                  (event.ticketsSold / event.ticketsTotal) * 100,
                );
                return (
                  <div
                    key={event.id}
                    className="overflow-hidden rounded-2xl border border-border/40 bg-card"
                  >
                    <div className="relative h-32 w-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <span
                        className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${
                          statusStyles[event.status]
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-foreground">
                        {event.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.location} • {event.date}
                      </p>

                      <div className="mt-3">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${percentSold}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {event.ticketsSold}/{event.ticketsTotal} sold
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-medium text-foreground">
                          ${event.revenue.toLocaleString()}.00
                        </span>
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/explore/${event.id}`}
                            aria-label={`View ${event.title}`}
                            className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(event.id)}
                            aria-label={`Delete ${event.title}`}
                            className="text-muted-foreground transition-colors hover:text-red-600 dark:hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagePage;
