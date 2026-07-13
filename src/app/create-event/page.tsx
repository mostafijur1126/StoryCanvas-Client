"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiCalendar,
  FiMapPin,
  FiFileText,
  FiImage,
  FiDollarSign,
  FiCheckCircle,
  FiCircle,
  FiSearch,
  FiInfo,
} from "react-icons/fi";
import ImageDropzone from "@/components/ui/ImageDropzone";
import { useSessionClient } from "@/core/session";
import { EventFormData, emptyEventFormData, Visibility } from "@/types/event";

const STEPS = ["Basic Info", "Logistics", "Details & Media", "Pricing"];

export default function CreateEventPage() {
  const [formData, setFormData] = useState<EventFormData>(emptyEventFormData);
  const { session } = useSessionClient();
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_URL ||
    "http://localhost:5000";

  /** Generic helper to update a single field in the form state */
  const updateField = <K extends keyof EventFormData>(
    field: K,
    value: EventFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /** Called by ImageDropzone once Cloudinary finishes uploading */
  const handleImageUploaded = (url: string, publicId: string) => {
    updateField("coverImageUrl", url);
    updateField("coverImagePublicId", publicId);
  };

  const handleImageRemove = () => {
    updateField("coverImageUrl", "");
    updateField("coverImagePublicId", "");
  };

  /**
   * Handles both "Save Draft" and "Publish Event".
   * For now this just logs the payload — swap the console.log block for
   * your real POST request when the API is ready, e.g.:
   *
   *   const res = await fetch("/api/events", {
   *     method: "POST",
   *     headers: { "Content-Type": "application/json" },
   *     body: JSON.stringify({ ...formData, status }),
   *   });
   */
  const handleSubmit = async (status: "draft" | "published") => {
    // Minimal required-field check just for the "Publish" action
    if (status === "published" && !formData.title.trim()) {
      toast.error("Please add an event title before publishing");
      return;
    }

    const payload = {
      ...formData,
      status,
      createdBy: session?.user?.id || session?.user?.email || "anonymous",
      createdAt: new Date().toISOString(),
    };

    // ---- This is where you will call your POST API later ----
    const result = await fetch(`${baseUrl}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await result.json();
    // ------------------------------------------------------------

    toast.success(
      status === "draft"
        ? "Draft saved (see console)"
        : "Event published (see console)",
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------------- Header ---------------- */}
      <header className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-gray-200/60 text-gray-600 transition-colors"
              aria-label="Go back"
            >
              <FiArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Create New Event
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("published")}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Publish Event
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Body ---------------- */}
      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* ============ LEFT: Main form ============ */}
        <div className="space-y-6">
          {/* --- Basic Information --- */}
          <Card icon={<FiInfo />} title="Basic Information">
            <Field label="Event Title">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Be descriptive (e.g. Summer Tech Workshop 2024)"
                className="input"
              />
            </Field>

            <Field label="Category">
              <select
                value={formData.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="input appearance-none bg-white"
              >
                <option value="">Select a category</option>
                <option value="workshop">Workshop</option>
                <option value="conference">Conference</option>
                <option value="concert">Concert</option>
                <option value="networking">Networking</option>
                <option value="other">Other</option>
              </select>
            </Field>
          </Card>

          {/* --- Date & Time --- */}
          <Card icon={<FiCalendar />} title="Date & Time">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Start Date">
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Start Time">
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateField("startTime", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="End Date">
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateField("endDate", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="End Time">
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateField("endTime", e.target.value)}
                  className="input"
                />
              </Field>
            </div>
          </Card>

          {/* --- Location --- */}
          <Card icon={<FiMapPin />} title="Location">
            <Field label="Venue Name / Address">
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => updateField("venue", e.target.value)}
                  placeholder="Enter a venue or address"
                  className="input pl-9"
                />
              </div>
            </Field>

            {/* Static map placeholder — swap for a real map component later */}
            <div className="h-40 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-sm text-gray-400">
              Map preview will appear here
            </div>
          </Card>

          {/* --- Description --- */}
          <Card icon={<FiFileText />} title="Description">
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Tell your attendees what to expect..."
              rows={5}
              className="input resize-none"
            />
          </Card>

          {/* --- Media (Cloudinary drag & drop) --- */}
          <Card icon={<FiImage />} title="Media">
            <Field label="Cover Image">
              <ImageDropzone
                imageUrl={formData.coverImageUrl}
                onUploaded={handleImageUploaded}
                onRemove={handleImageRemove}
              />
            </Field>
          </Card>

          {/* --- Pricing --- */}
          <Card icon={<FiDollarSign />} title="Pricing">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Ticket Price (USD)">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.ticketPrice}
                    onChange={(e) => updateField("ticketPrice", e.target.value)}
                    placeholder="0.00"
                    className="input pl-7"
                  />
                </div>
              </Field>
              <Field label="Total Capacity">
                <input
                  type="number"
                  min="0"
                  value={formData.totalCapacity}
                  onChange={(e) => updateField("totalCapacity", e.target.value)}
                  placeholder="e.g. 100"
                  className="input"
                />
              </Field>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Leave 0 for free events
            </p>
          </Card>
        </div>

        {/* ============ RIGHT: Sidebar ============ */}
        <div className="space-y-6">
          {/* --- Step Progress --- */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Step Progress
            </h3>
            <ul className="space-y-3">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-2 text-sm">
                  {i === 0 ? (
                    <FiCheckCircle className="text-emerald-600" size={16} />
                  ) : (
                    <FiCircle className="text-gray-300" size={16} />
                  )}
                  <span
                    className={
                      i === 0 ? "text-gray-900 font-medium" : "text-gray-400"
                    }
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Completion</span>
                <span>25%</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-1/4 bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* --- Visibility --- */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Visibility
            </h3>
            <div className="space-y-3">
              <VisibilityOption
                label="Public"
                description="Anyone can see and join"
                value="public"
                selected={formData.visibility}
                onSelect={(v) => updateField("visibility", v)}
              />
              <VisibilityOption
                label="Private"
                description="Only people with link can join"
                value="private"
                selected={formData.visibility}
                onSelect={(v) => updateField("visibility", v)}
              />
            </div>
          </div>

          {/* --- Pro Tip --- */}
          <div className="rounded-2xl bg-gray-900 text-white p-5">
            <div className="flex items-center gap-2 mb-2">
              <FiInfo size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold">Pro Tip</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Events with high-quality cover images and detailed descriptions
              receive 65% more engagement on average.
            </p>
          </div>
        </div>
      </main>

      {/* Shared input styling, scoped globally via a style tag so every
          `.input` class above stays consistent without repeating className strings. */}
      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          color: #111827;
          background-color: white;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .input::placeholder {
          color: #9ca3af;
        }
        .input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
        }
      `}</style>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Small presentational helper components                                */
/* --------------------------------------------------------------------- */

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-emerald-600">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-500 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

function VisibilityOption({
  label,
  description,
  value,
  selected,
  onSelect,
}: {
  label: string;
  description: string;
  value: Visibility;
  selected: Visibility;
  onSelect: (v: Visibility) => void;
}) {
  const isActive = selected === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-colors
        ${
          isActive
            ? "border-emerald-500 bg-emerald-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
    >
      <span
        className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0
          ${isActive ? "border-emerald-600" : "border-gray-300"}`}
      >
        {isActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
      </span>
      <span>
        <span className="block text-sm font-medium text-gray-900">{label}</span>
        <span className="block text-xs text-gray-400">{description}</span>
      </span>
    </button>
  );
}
