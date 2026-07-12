/**
 * types/event.ts
 * ---------------------------------------------------------------------------
 * Shared TypeScript types for the "Create Event" form.
 * Keeping these in one place means the form component, and later the API
 * call / API route, all stay in sync on what an "Event" looks like.
 * ---------------------------------------------------------------------------
 */

export type Visibility = "public" | "private";

export interface EventFormData {
  // Basic Information
  title: string;
  category: string;

  // Date & Time
  startDate: string; // yyyy-mm-dd (native <input type="date"> format)
  startTime: string; // HH:mm (native <input type="time"> format)
  endDate: string;
  endTime: string;

  // Location
  venue: string;

  // Description
  description: string;

  // Media (Cloudinary)
  coverImageUrl: string; // filled in automatically after Cloudinary upload
  coverImagePublicId: string; // Cloudinary public_id, handy for deleting/replacing later

  // Pricing
  ticketPrice: string;
  totalCapacity: string;

  // Visibility
  visibility: Visibility;
}

// Sensible starting values for a blank form
export const emptyEventFormData: EventFormData = {
  title: "",
  category: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  venue: "",
  description: "",
  coverImageUrl: "",
  coverImagePublicId: "",
  ticketPrice: "",
  totalCapacity: "",
  visibility: "public",
};
