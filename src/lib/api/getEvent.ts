const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_URL ||
  "http://localhost:5000";

const buildAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const getEvent = async (id: string, token?: string) => {
  try {
    const response = await fetch(`${baseUrl}/events/${id}`, {
      headers: buildAuthHeaders(token),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const getMyEvents = async (userId?: string | null, token?: string) => {
  try {
    const url = userId
      ? `${baseUrl}/events/my-events/${encodeURIComponent(userId)}`
      : `${baseUrl}/events`;
    console.log("Fetching events from:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: buildAuthHeaders(token),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to fetch events: ${response.status} ${response.statusText} - ${errorData}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string, token?: string) => {
  try {
    const response = await fetch(`${baseUrl}/events/${id}`, {
      method: "DELETE",
      headers: buildAuthHeaders(token),
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
