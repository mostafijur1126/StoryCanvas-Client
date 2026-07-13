export type Visibility = "public" | "private";

export interface EventFormData {
  // Basic Information
  title: string;
  category: string;
  startDate: string; // yyyy-mm-dd (native <input type="date"> format)
  startTime: string; // HH:mm (native <input type="time"> format)
  endDate: string;
  endTime: string;
  venue: string;
  description: string;
  coverImageUrl: string; // filled in automatically after Cloudinary upload
  coverImagePublicId: string; // Cloudinary public_id, handy for deleting/replacing later
  ticketPrice: string;
  totalCapacity: string;
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
