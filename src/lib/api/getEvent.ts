const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_URL ||
  "http://localhost:5000";

export const getEvent = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/events/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const getMyEvents = async (userId?: string | null) => {
  try {
    const url = userId
      ? `${baseUrl}/events/my-events/${encodeURIComponent(userId)}`
      : `${baseUrl}/events`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/events/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
