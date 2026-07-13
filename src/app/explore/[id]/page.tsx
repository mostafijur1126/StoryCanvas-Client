import { getEvent } from "@/lib/api/getEvent";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, Tag, ShieldCheck } from "lucide-react";
import TicketWidget from "./TicketWidget";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (timeStr: string) => {
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
};

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const event = await getEvent(id);
  const data = event?.data;

  if (!data) notFound();

  const dateRange =
    data.startDate === data.endDate
      ? formatDate(data.startDate)
      : `${formatDate(data.startDate)} - ${formatDate(data.endDate)}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[320px] w-full md:h-[400px]">
        <Image
          src={data.coverImageUrl}
          alt={data.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm capitalize">
                {data.category}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm capitalize">
                {data.visibility}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white md:text-4xl">
              {data.title}
            </h1>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {dateRange}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {formatTime(data.startTime)} - {formatTime(data.endTime)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {data.venue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl gap-8 px-4 py-8 md:grid md:grid-cols-3 md:px-6">
        {/* Main column */}
        <div className="md:col-span-2 space-y-6">
          <section className="rounded-2xl border border-border/40 bg-card p-6">
            <h2 className="mb-3 text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              About This Event
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {data.description}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-border/40 p-3">
                <Users className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="text-sm font-medium">
                    {data.totalCapacity} seats
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border/40 p-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-sm font-medium capitalize">
                    {data.status}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border/40 bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Venue & Location
            </h2>
            <p className="text-sm text-muted-foreground">{data.venue}</p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="mt-6 md:mt-0">
          <div className="sticky top-6">
            <TicketWidget
              ticketPrice={Number(data.ticketPrice)}
              totalCapacity={Number(data.totalCapacity)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
